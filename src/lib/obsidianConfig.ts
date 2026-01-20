import fs from "node:fs";
import path from "node:path";

export type ObsidianConfig = {
	vaultPath?: string | null;
	commonplacePath: string;
};

const DEFAULT_CONFIG: ObsidianConfig = {
	vaultPath: null,
	commonplacePath: "commonplace",
};

export const loadObsidianConfig = (): ObsidianConfig => ({
	vaultPath: process.env.OBSIDIAN_VAULT ?? DEFAULT_CONFIG.vaultPath,
	commonplacePath:
		process.env.OBSIDIAN_COMMONPLACE_PATH ?? DEFAULT_CONFIG.commonplacePath,
});

const resolveCandidatePath = (value: string) =>
	path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);

export const resolveLocalVaultRoot = () => {
	const config = loadObsidianConfig();
	const candidates = [];
	if (config.vaultPath) {
		candidates.push(resolveCandidatePath(config.vaultPath));
	}

	for (const candidate of candidates) {
		if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
			return candidate;
		}
	}

	if (config.vaultPath) {
		console.warn(
			`[obsidian] Vault path "${resolveCandidatePath(
				config.vaultPath,
			)}" does not exist or is not a directory.`,
		);
	}
	return null;
};

export const resolveGardenRoot = () => {
	const localVault = resolveLocalVaultRoot();
	if (localVault) return localVault;

	const candidates = [
		path.resolve(process.cwd(), "src/content/garden"),
		path.resolve(process.cwd(), "data/obsidian-vault-sample"),
	];

	for (const candidate of candidates) {
		if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
			return candidate;
		}
	}

	return null;
};

export const resolveVaultSubpath = (vaultRoot: string, subpath: string) =>
	path.resolve(vaultRoot, subpath);

export const normalizeVaultPath = (value: string) =>
	value.split(path.sep).join("/");
