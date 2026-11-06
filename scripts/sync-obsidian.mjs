import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "@astrojs/markdown-remark";
import {
	isGardenPublished,
	isIgnoredDirName,
	isIgnoredFileName,
} from "../src/lib/obsidian-utils.js";

// Copy published garden notes and commonplace notes from an Obsidian vault
// into content/garden and content/commonplace, using the same publish rules as
// src/lib/garden.ts and src/lib/commonplace.ts.
//
// Usage: npm run sync:obsidian -- [--vault <path>] [--no-clean]

const REPO_ROOT = process.cwd();
const CONTENT_DIR = "content";

const parseEnvFile = (filePath) => {
	if (!fs.existsSync(filePath)) return;
	const raw = fs.readFileSync(filePath, "utf8");
	for (const line of raw.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const [key, ...rest] = trimmed.split("=");
		if (!key) continue;
		const value = rest.join("=").trim();
		if (!value) continue;
		const normalized = value.replace(/^['"]|['"]$/g, "");
		if (!(key in process.env)) process.env[key] = normalized;
	}
};

const loadEnv = () => {
	// Prefer unified local dev secrets in .dev.vars; fall back to .env if present.
	parseEnvFile(path.join(REPO_ROOT, ".dev.vars"));
	parseEnvFile(path.join(REPO_ROOT, ".env"));
};

const parseArgs = (argv) => {
	const args = new Map();
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (!arg.startsWith("--")) continue;
		const [key, inlineValue] = arg.split("=");
		if (inlineValue !== undefined) {
			args.set(key, inlineValue);
			continue;
		}
		const next = argv[index + 1];
		if (next && !next.startsWith("--")) {
			args.set(key, next);
			index += 1;
			continue;
		}
		args.set(key, true);
	}
	return args;
};

const args = parseArgs(process.argv.slice(2));
loadEnv();
const commonplacePath = process.env.OBSIDIAN_COMMONPLACE_PATH ?? "commonplace";
const vaultPath = args.get("--vault") || process.env.OBSIDIAN_VAULT;

if (!vaultPath || vaultPath === true) {
	throw new Error(
		"Missing vault path. Set OBSIDIAN_VAULT in your .env file or shell, or pass --vault <path>.",
	);
}

const vaultRoot = path.resolve(REPO_ROOT, vaultPath);
if (!fs.existsSync(vaultRoot) || !fs.statSync(vaultRoot).isDirectory()) {
	throw new Error(`Vault path not found: ${vaultRoot}`);
}

const commonplaceRoot = path.join(vaultRoot, commonplacePath);
const targetGardenRoot = path.join(REPO_ROOT, CONTENT_DIR, "garden");
const targetCommonplaceRoot = path.join(REPO_ROOT, CONTENT_DIR, "commonplace");

const cleanDir = (dir) => {
	fs.rmSync(dir, { recursive: true, force: true });
	fs.mkdirSync(dir, { recursive: true });
};

if (!args.has("--no-clean")) {
	cleanDir(targetGardenRoot);
	cleanDir(targetCommonplaceRoot);
} else {
	fs.mkdirSync(targetGardenRoot, { recursive: true });
	fs.mkdirSync(targetCommonplaceRoot, { recursive: true });
}

const isMarkdownFile = (fileName) => /\.md$/i.test(fileName);

const readFrontmatter = (filePath) => {
	const raw = fs.readFileSync(filePath, "utf8");
	try {
		const { frontmatter } = parseFrontmatter(raw, { frontmatter: "remove" });
		return frontmatter ?? {};
	} catch (error) {
		console.warn(
			`[obsidian] Skipping frontmatter parse for ${filePath}: ${
				error?.message ?? error
			}`,
		);
		return {};
	}
};

const ensureDirForFile = (filePath) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
};

const copyFile = (sourcePath, targetPath) => {
	ensureDirForFile(targetPath);
	fs.copyFileSync(sourcePath, targetPath);
};

const walk = (dir, onFile, shouldSkipPath) => {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (isIgnoredDirName(entry.name)) continue;
			if (shouldSkipPath?.(fullPath)) continue;
			walk(fullPath, onFile, shouldSkipPath);
			continue;
		}
		if (!entry.isFile()) continue;
		if (isIgnoredFileName(entry.name)) continue;
		onFile(fullPath);
	}
};

let gardenCopied = 0;
let commonplaceCopied = 0;

if (fs.existsSync(commonplaceRoot)) {
	walk(commonplaceRoot, (filePath) => {
		if (!isMarkdownFile(filePath)) return;
		const frontmatter = readFrontmatter(filePath);
		if (frontmatter?.published === false) return;
		const relativePath = path.relative(commonplaceRoot, filePath);
		const targetPath = path.join(targetCommonplaceRoot, relativePath);
		copyFile(filePath, targetPath);
		commonplaceCopied += 1;
	});
}

const normalizePath = (value) => value.split(path.sep).join("/");
const isWithinSubpath = (candidatePath, subpath) => {
	const normalized = normalizePath(path.relative(vaultRoot, candidatePath));
	return (
		normalized === normalizePath(subpath) ||
		normalized.startsWith(`${normalizePath(subpath)}/`)
	);
};

walk(
	vaultRoot,
	(filePath) => {
		if (!isMarkdownFile(filePath)) return;
		const relativePath = path.relative(vaultRoot, filePath);
		if (isWithinSubpath(filePath, commonplacePath)) return;
		const frontmatter = readFrontmatter(filePath);
		if (!isGardenPublished(frontmatter)) return;
		const targetPath = path.join(targetGardenRoot, relativePath);
		copyFile(filePath, targetPath);
		gardenCopied += 1;
	},
	(fullPath) => isWithinSubpath(fullPath, commonplacePath),
);

console.log(
	`Synced ${gardenCopied} garden notes, ${commonplaceCopied} commonplace notes.`,
);
