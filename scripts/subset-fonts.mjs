#!/usr/bin/env node
/**
 * One-shot iA Writer Duo subsetter.
 *
 * Reads the TTF source files in `assets/fonts-source/`, subsets each face to
 * the codepoints we actually render (Basic Latin + Latin-1 Sup + General
 * Punctuation + Currency + a small allowlist of arrows/marks), converts to
 * WOFF2, and writes the result to `assets/fonts/`.
 *
 * The emitted WOFF2s are committed to git and consumed by Astro's Fonts API
 * (see `experimental.fonts` in astro.config.mjs). Astro hashes and serves
 * them as-is — it does NOT subset or convert local files, which is why this
 * pre-step exists. Re-run `npm run fonts:build` when the TTFs change or when
 * site content introduces a glyph outside the subset.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import subsetFont from "subset-font";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const SOURCE_DIR = path.join(root, "assets/fonts-source");
const OUT_DIR = path.join(root, "assets/fonts");

const FACES = [
	"iAWriterDuoS-Regular.ttf",
	"iAWriterDuoS-Italic.ttf",
	"iAWriterDuoS-Bold.ttf",
	"iAWriterDuoS-BoldItalic.ttf",
];

/* Codepoints to keep. If a new glyph creeps into site content, either add it
 * here and re-run, or accept the OS fallback for that character. */
const SUBSET_RANGES = [
	[0x0000, 0x007f], // Basic Latin (ASCII)
	[0x00a0, 0x00ff], // Latin-1 Supplement (accented chars, ©, °, …)
	[0x2000, 0x206f], // General Punctuation (em/en dash, curly quotes, ellipsis, NBSP)
	[0x20a0, 0x20cf], // Currency (€, £, ¥, etc.)
];
const EXTRA_CODEPOINTS = [
	0x2122, // ™
	0x2190, // ←
	0x2192, // →
	0x2191, // ↑
	0x2193, // ↓
	0x21a9, // ↩  — footnote backref link in post body
];

const buildSubsetText = () => {
	const chars = [];
	for (const [start, end] of SUBSET_RANGES) {
		for (let cp = start; cp <= end; cp++) chars.push(String.fromCodePoint(cp));
	}
	for (const cp of EXTRA_CODEPOINTS) chars.push(String.fromCodePoint(cp));
	return chars.join("");
};

const main = async () => {
	await mkdir(OUT_DIR, { recursive: true });
	const subsetText = buildSubsetText();
	console.log(
		`Subsetting to ${subsetText.length} codepoints across ${SUBSET_RANGES.length} ranges + ${EXTRA_CODEPOINTS.length} extras.`,
	);

	let totalBefore = 0;
	let totalAfter = 0;
	for (const file of FACES) {
		const srcPath = path.join(SOURCE_DIR, file);
		const buf = await readFile(srcPath);
		const out = await subsetFont(buf, subsetText, { targetFormat: "woff2" });
		const woff2Name = file.replace(/\.ttf$/, ".woff2");
		await writeFile(path.join(OUT_DIR, woff2Name), out);
		totalBefore += buf.byteLength;
		totalAfter += out.byteLength;
		console.log(
			`  ${file}  ${(buf.byteLength / 1024).toFixed(1)} KB → ${woff2Name}  ${(out.byteLength / 1024).toFixed(1)} KB`,
		);
	}
	console.log(
		`Total: ${(totalBefore / 1024).toFixed(1)} KB (TTF) → ${(totalAfter / 1024).toFixed(1)} KB (WOFF2)`,
	);
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
