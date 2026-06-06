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

import crypto from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const BLOG_DIR = path.join(root, "content/blog");
const BANNERS_DIR = path.join(root, "src/assets/banners");
const POSTS_DIR = path.join(BANNERS_DIR, "posts");
const SOURCES_DIR = path.join(POSTS_DIR, "_sources");
const RAW_OUT_DIR = path.join(BANNERS_DIR, "_optimized");
const MAP_OUT = path.join(root, "src/assets/post-banners.ts");

const TARGET_W = 1720;
// 1720 × 800 covers every Banner usage: max CSS width 860 × 2dpr = 1720, max
// canvas height 300 CSS px × 2dpr = 600 device px visible, plus ~100 px buffer
// top/bottom. Bumping any geometry or encode setting auto-invalidates the
// cache (these all participate in the cache key).
const TARGET_H = 800;
const RAW_INPUT_RE = /\.(webp|png|jpe?g)$/i;

// Encode settings. Changing any of these auto-busts the cache for the
// affected pipeline — they're folded into the cache key string.
const RAW_QUALITY = 85;
const RAW_EFFORT = 6;
const DITHER_QUALITY = 90;
const DITHER_EFFORT = 6;
const DITHER_NEAR_LOSSLESS = true;

const RAW_ENCODE_TAG = `webp-q${RAW_QUALITY}-e${RAW_EFFORT}-flatten`;
const DITHER_ENCODE_TAG = `webp-q${DITHER_QUALITY}-e${DITHER_EFFORT}-nl${DITHER_NEAR_LOSSLESS}`;

// Force a full re-encode on production deploys so the cache can never serve a
// stale artifact to prod. CF_PAGES is set by Cloudflare Pages' build env.
// Locally, pass `--banner-rebuild` to npm (e.g. `npm run build --banner-rebuild`)
// — npm exposes that as `npm_config_banner_rebuild` to the whole script chain,
// including the prebuild hook. FORCE_BANNER_REBUILD=true is the bare-env
// fallback for non-npm invocations. Local dev otherwise keeps the cache warm.
const npmFlag = process.env.npm_config_banner_rebuild;
const FORCE_REBUILD =
  Boolean(process.env.CF_PAGES) ||
  process.env.FORCE_BANNER_REBUILD === "true" ||
  (npmFlag != null && npmFlag !== "" && npmFlag !== "false");
if (FORCE_REBUILD) {
  console.log("Banner pipeline: forced rebuild (cache disabled).");
}

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
        if (nx >= 0 && nx < width && ny < height) buf[ny * width + nx] += err;
      }
    }
  }
  return out;
}

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
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status} ${res.statusText}`);
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
    // and whites with dither concentrated at transition zones.
    .linear(1.4, -50)
    .grayscale()
    .toColorspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const dithered = atkinsonDither(info.width, info.height, data);

  return await sharp(dithered, {
    raw: { width: info.width, height: info.height, channels: 1 },
  })
    .webp({
      quality: DITHER_QUALITY,
      effort: DITHER_EFFORT,
      nearLossless: DITHER_NEAR_LOSSLESS,
    })
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

  // Cache key includes geometry + encode tag so any change to TARGET_W/H or
  // the dither encode settings auto-invalidates existing outputs.
  const cacheKey = `${heroImage}\n${TARGET_W}x${TARGET_H}\n${DITHER_ENCODE_TAG}`;
  const cacheHit =
    !FORCE_REBUILD &&
    existsSync(outPath) &&
    existsSync(urlCachePath) &&
    (await readFile(urlCachePath, "utf8")).trim() === cacheKey;

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
  await writeFile(urlCachePath, `${cacheKey}\n`);

  console.log(
    `  ${slug}: wrote ${path.relative(root, outPath)} (${(outBuf.length / 1024).toFixed(1)}KB)`,
  );
  return { slug, heroImage };
}

/**
 * Raw banner pipeline (site-wide / aux banners).
 *
 * Input:  src/assets/banners/<name>.<ext>   (top-level files, any size)
 * Output: src/assets/banners/_optimized/<name>.webp  (1720 × 800, alpha stripped)
 * Cache:  src/assets/banners/_optimized/<name>.hash  (sha1 of source bytes)
 *
 * Resize-to-fit width (no enlargement), centered vertical crop to TARGET_H,
 * flatten onto black (matches the runtime's fillRect before drawImage), and
 * re-encode webp at build-time-only quality. Consumers import the optimized
 * path directly (e.g. Banner.astro's default src).
 */
async function discoverRawBanners() {
  if (!existsSync(BANNERS_DIR)) return [];
  const entries = await readdir(BANNERS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && RAW_INPUT_RE.test(e.name))
    .map((e) => path.join(BANNERS_DIR, e.name))
    .sort();
}

async function processRawBanner(srcPath) {
  const base = path.basename(srcPath, path.extname(srcPath));
  const outPath = path.join(RAW_OUT_DIR, `${base}.webp`);
  const hashPath = path.join(RAW_OUT_DIR, `${base}.hash`);

  const srcBuf = await readFile(srcPath);
  const hash = crypto.createHash("sha1").update(srcBuf).digest("hex");
  // Cache key folds in source bytes, geometry, AND encode params so changing
  // RAW_QUALITY/RAW_EFFORT auto-invalidates the cached output.
  const cacheKey = `${hash}\n${TARGET_W}x${TARGET_H}\n${RAW_ENCODE_TAG}`;

  if (!FORCE_REBUILD && existsSync(outPath) && existsSync(hashPath)) {
    const cached = (await readFile(hashPath, "utf8")).trim();
    if (cached === cacheKey) {
      console.log(`  ${base}: cache hit, skipping`);
      return { base, outPath };
    }
  }

  console.log(`  ${base}: optimizing`);

  // Resize-to-fit width first, then read the resized height to compute the
  // centered vertical crop. One intermediate buffer keeps both passes honest.
  const resized = await sharp(srcBuf)
    .resize({ width: TARGET_W, withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });

  const cropH = Math.min(TARGET_H, resized.info.height);
  const cropTop = Math.max(0, Math.round((resized.info.height - cropH) / 2));

  const outBuf = await sharp(resized.data)
    .extract({
      left: 0,
      top: cropTop,
      width: resized.info.width,
      height: cropH,
    })
    .flatten({ background: "#000" })
    .webp({ quality: RAW_QUALITY, effort: RAW_EFFORT })
    .toBuffer();

  await mkdir(RAW_OUT_DIR, { recursive: true });
  await writeFile(outPath, outBuf);
  await writeFile(hashPath, `${cacheKey}\n`);

  console.log(
    `  ${base}: wrote ${path.relative(root, outPath)} (${(outBuf.length / 1024).toFixed(1)}KB, was ${(srcBuf.length / 1024).toFixed(1)}KB)`,
  );
  return { base, outPath };
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
  // Raw banner pipeline first — independent of the blog scan and has no map
  // output; consumers import the optimized path directly.
  const rawBanners = await discoverRawBanners();
  console.log(`scanning ${rawBanners.length} raw banner(s)…`);
  for (const srcPath of rawBanners) {
    try {
      await processRawBanner(srcPath);
    } catch (err) {
      console.error(`  failed to process ${srcPath}: ${err.message}`);
    }
  }

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
