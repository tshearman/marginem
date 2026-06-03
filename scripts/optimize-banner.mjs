#!/usr/bin/env node
/**
 * Per-post banner pipeline.
 *
 * Reads blog MDX frontmatter for `heroImage:` URLs, downloads each remote
 * image once (cached), runs it through a contrast-boost + grayscale +
 * Atkinson dither pipeline, and writes:
 *
 *   src/assets/banners/posts/<slug>.webp           — dithered B&W banner
 *   src/assets/banners/posts/_sources/<slug>.<ext> — raw download (cache)
 *   src/assets/banners/posts/_sources/<slug>.url   — source URL (cache key)
 *
 * It also writes src/assets/post-banners.ts — a map from heroImage URL to
 * the fingerprinted Astro asset URL of the dithered banner. PostLayout.astro
 * imports that map and forwards the resolved src down to <Banner>.
 *
 * Run via `npm run banner:image` (auto-runs as `prebuild` and as part of the
 * cloudflare build script). Cached entries are skipped — only newly added or
 * URL-changed banners get fetched + dithered.
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const BLOG_DIR = path.join(root, "content/blog");
const POSTS_DIR = path.join(root, "src/assets/banners/posts");
const SOURCES_DIR = path.join(POSTS_DIR, "_sources");
const MAP_OUT = path.join(root, "src/assets/post-banners.ts");

const TARGET_W = 1720;
const TARGET_H = 780; // matches the runtime banner aspect (~2.2:1)

/** Atkinson dithering — distributes 6/8 of the quantization error to six
 *  forward+below neighbours (drops the remaining 2/8). Looks lighter and
 *  more graphic than Floyd-Steinberg; matches the brutalist B&W aesthetic. */
function atkinsonDither(width, height, gray) {
	const buf = new Float32Array(gray.length);
	for (let i = 0; i < gray.length; i++) buf[i] = gray[i];
	const out = new Uint8Array(gray.length);
	const dxs = [1, 2, -1, 0, 1, 0];
	const dys = [0, 0, 1, 1, 1, 2];
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = y * width + x;
			const old = buf[i];
			const next = old < 128 ? 0 : 255;
			out[i] = next;
			const err = (old - next) / 8;
			for (let k = 0; k < 6; k++) {
				const nx = x + dxs[k];
				const ny = y + dys[k];
				if (nx >= 0 && nx < width && ny < height)
					buf[ny * width + nx] += err;
			}
		}
	}
	return out;
}

/** Pull `heroImage: "..."` out of an MDX YAML frontmatter block. Single
 *  regex — we don't want a YAML parser dep for one field. */
function extractHeroImage(content) {
	const fm = content.match(/^---\n([\s\S]*?)\n---/);
	if (!fm) return null;
	const m = fm[1].match(/^heroImage:\s*"?([^"\n]+?)"?\s*$/m);
	return m ? m[1].trim() : null;
}

const slugify = (s) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

/** Turn a kebab slug into a valid JS identifier suitable for an `import`
 *  binding (post-banners.ts uses one binding per banner). */
function toIdent(slug) {
	const cleaned = slug.replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) =>
		c ? c.toUpperCase() : "",
	);
	if (!cleaned) return "_anon";
	if (/^[0-9]/.test(cleaned)) return `_${cleaned}`;
	return cleaned;
}

async function downloadImage(url) {
	const res = await fetch(url);
	if (!res.ok)
		throw new Error(`fetch ${url}: ${res.status} ${res.statusText}`);
	return Buffer.from(await res.arrayBuffer());
}

/** Crop → resize → contrast → grayscale → Atkinson dither → WebP. */
async function ditherAndEncode(srcBuffer) {
	const meta = await sharp(srcBuffer).metadata();
	const sw = meta.width;
	const sh = meta.height;
	if (!sw || !sh) throw new Error("could not read source image metadata");

	// Crop to the banner aspect, centered vertically — matches the runtime
	// cover-scale behavior so the visible slice is consistent.
	const cropW = sw;
	const cropH = Math.round(sw / (TARGET_W / TARGET_H));
	const cropTop = Math.max(0, Math.round((sh - cropH) / 2));
	const effectiveCropH = Math.min(cropH, sh - cropTop);

	const { data, info } = await sharp(srcBuffer)
		.extract({ left: 0, top: cropTop, width: cropW, height: effectiveCropH })
		.resize(TARGET_W, TARGET_H, { fit: "fill" })
		// Stretch the histogram across the full 0–255 range first…
		.normalise()
		// …then push midtones away from the threshold to get more solid blacks
		// and whites with dither concentrated at transition zones (the brutalist
		// stark look rather than soft halftone).
		.linear(1.4, -50)
		.grayscale()
		.toColorspace("b-w")
		.raw()
		.toBuffer({ resolveWithObject: true });

	const dithered = atkinsonDither(info.width, info.height, data);

	return await sharp(dithered, {
		raw: { width: info.width, height: info.height, channels: 1 },
	})
		.webp({ quality: 90, effort: 6, nearLossless: true })
		.toBuffer();
}

async function processPost(file) {
	const slug = slugify(file.replace(/\.mdx?$/, ""));
	const content = await readFile(path.join(BLOG_DIR, file), "utf8");
	const heroImage = extractHeroImage(content);
	if (!heroImage) return null;
	if (!/^https?:\/\//i.test(heroImage)) {
		console.log(`  ${slug}: skipping non-remote heroImage (${heroImage})`);
		return null;
	}

	const urlPathExt =
		path.extname(new URL(heroImage).pathname).toLowerCase() || ".jpg";
	const safeExt = /^\.(jpe?g|png|webp)$/i.test(urlPathExt)
		? urlPathExt
		: ".jpg";
	const rawPath = path.join(SOURCES_DIR, `${slug}${safeExt}`);
	const outPath = path.join(POSTS_DIR, `${slug}.webp`);
	const urlCachePath = path.join(SOURCES_DIR, `${slug}.url`);

	const cacheHit =
		existsSync(outPath) &&
		existsSync(urlCachePath) &&
		(await readFile(urlCachePath, "utf8")).trim() === heroImage;

	if (cacheHit) {
		console.log(`  ${slug}: cache hit, skipping`);
		return { slug, heroImage };
	}

	console.log(`  ${slug}: fetching ${heroImage}`);
	const srcBuf = await downloadImage(heroImage);
	await mkdir(SOURCES_DIR, { recursive: true });
	await writeFile(rawPath, srcBuf);

	console.log(`  ${slug}: dithering`);
	const outBuf = await ditherAndEncode(srcBuf);
	await mkdir(POSTS_DIR, { recursive: true });
	await writeFile(outPath, outBuf);
	await writeFile(urlCachePath, `${heroImage}\n`);

	console.log(
		`  ${slug}: wrote ${path.relative(root, outPath)} (${(outBuf.length / 1024).toFixed(1)}KB)`,
	);
	return { slug, heroImage };
}

async function writeMap(entries) {
	const importLines = entries
		.map(
			({ slug }) =>
				`import ${toIdent(slug)} from "./banners/posts/${slug}.webp?url";`,
		)
		.join("\n");
	const mapBody = entries
		.map(({ slug, heroImage }) => `\t"${heroImage}":\n\t\t${toIdent(slug)},`)
		.join("\n");
	const content = `// Auto-generated by scripts/optimize-banner.mjs — do not edit by hand.
//
// Maps a blog post's frontmatter \`heroImage:\` URL → the fingerprinted Astro
// asset URL of the dithered B&W banner. PostLayout.astro looks up the URL
// here and forwards it via BaseLayout's \`bannerSrc\` prop; misses fall
// through to Banner.astro's own default (the site-wide notebook banner).

${importLines}

export const POST_BANNERS: Record<string, string> = {
${mapBody}
};
`;
	await writeFile(MAP_OUT, content);
}

const main = async () => {
	if (!existsSync(BLOG_DIR)) {
		console.warn(`no blog dir found at ${BLOG_DIR} — writing empty map`);
		await writeMap([]);
		return;
	}
	const files = (await readdir(BLOG_DIR))
		.filter((f) => /\.mdx?$/.test(f))
		.sort();
	console.log(`scanning ${files.length} blog MDX file(s)…`);

	const entries = [];
	for (const f of files) {
		try {
			const result = await processPost(f);
			if (result) entries.push(result);
		} catch (err) {
			console.error(`  failed to process ${f}: ${err.message}`);
		}
	}
	await writeMap(entries);
	console.log(
		`wrote ${entries.length} entries to ${path.relative(root, MAP_OUT)}`,
	);
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
