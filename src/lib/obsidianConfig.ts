import fs from "node:fs";
import path from "node:path";
import { CONTENT_DIR } from "./site";

export const loadObsidianConfig = () => ({
	vaultPath: process.env.OBSIDIAN_VAULT,
	commonplacePath: process.env.OBSIDIAN_COMMONPLACE_PATH ?? "commonplace",
});

const isDirectory = (value: string) =>
	fs.existsSync(value) && fs.statSync(value).isDirectory();

/** The live vault named by OBSIDIAN_VAULT, or null when unset/missing. */
export const resolveLocalVaultRoot = () => {
	const { vaultPath } = loadObsidianConfig();
	if (!vaultPath) return null;
	const resolved = path.resolve(vaultPath);
	if (isDirectory(resolved)) return resolved;
	console.warn(
		`[obsidian] Vault path "${resolved}" does not exist or is not a directory.`,
	);
	return null;
};

/** The live vault if configured, else the notes synced into content/garden. */
export const resolveGardenRoot = () => {
	const synced = path.resolve(CONTENT_DIR, "garden");
	return resolveLocalVaultRoot() ?? (isDirectory(synced) ? synced : null);
};

export const normalizeVaultPath = (value: string) =>
	value.split(path.sep).join("/");
