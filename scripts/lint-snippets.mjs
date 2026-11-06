#!/usr/bin/env node
// Lint fenced code blocks in content MDX and the files in content/snippets
// with each language's linter. format-snippets.mjs reuses the helpers below.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseMetaOptions } from "../plugins/remark-run-code.js";

export const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
export const contentDir = path.join(projectRoot, "content");
export const snippetsDir = path.join(contentDir, "snippets");

const LINTERS = {
	javascript: {
		label: "JavaScript",
		extension: ".js",
		run: (file) =>
			runCommand(process.env.CODE_LINT_JS ?? "biome", [
				"lint",
				"--error-on-warnings",
				file,
			]),
	},
	typescript: {
		label: "TypeScript",
		extension: ".ts",
		run: (file) =>
			runCommand(
				process.env.CODE_LINT_TS ?? process.env.CODE_LINT_TYPESCRIPT ?? "biome",
				["lint", "--error-on-warnings", file],
			),
	},
	python: {
		label: "Python",
		extension: ".py",
		run: (file) =>
			runCommand(process.env.CODE_LINT_PYTHON ?? "ruff", ["check", file]),
	},
	haskell: {
		label: "Haskell",
		extension: ".hs",
		run: (file) =>
			runCommand(process.env.CODE_LINT_HASKELL ?? "hlint", ["--quiet", file]),
	},
	lisp: {
		label: "Common Lisp",
		extension: ".lisp",
		run: (file) =>
			runCommand(process.env.CODE_LINT_LISP ?? "sbcl", ["--script", file]),
	},
};

const LANGUAGE_ALIASES = {
	js: "javascript",
	javascript: "javascript",
	ts: "typescript",
	tsx: "typescript",
	typescript: "typescript",
	py: "python",
	python: "python",
	hs: "haskell",
	haskell: "haskell",
	lisp: "lisp",
	commonlisp: "lisp",
	cl: "lisp",
};

export const SNIPPET_EXTENSIONS = new Map([
	[".js", "javascript"],
	[".ts", "typescript"],
	[".py", "python"],
	[".hs", "haskell"],
	[".lisp", "lisp"],
]);

/** Run a tool synchronously; returns { success, output, status, command }. */
export function runCommand(command, args) {
	const result = spawnSync(command, args, {
		cwd: projectRoot,
		encoding: "utf8",
		timeout: 120000,
	});
	const commandLine = [command, ...args].join(" ");

	if (result.error) {
		return {
			success: false,
			output:
				result.error.code === "ENOENT"
					? `Command "${command}" was not found. Ensure it is available in your dev shell.`
					: result.error.message,
			status: result.status ?? null,
			command: commandLine,
		};
	}

	const output = [result.stdout, result.stderr]
		.map((chunk) => chunk?.trim())
		.filter(Boolean)
		.join("\n");
	return {
		success: result.status === 0,
		output,
		status: result.status ?? null,
		command: commandLine,
	};
}

export function normalizeLanguage(id) {
	if (!id) return null;
	return LANGUAGE_ALIASES[id.toLowerCase()] ?? null;
}

/** Fenced code blocks with their language, meta, body, line, and offsets. */
export function extractCodeBlocks(source) {
	return Array.from(
		source.matchAll(/```(\w+)([^\n`]*)?\n([\s\S]*?)```/g),
		(match) => {
			const [raw, lang, rawMeta, code] = match;
			return {
				lang,
				meta: (rawMeta ?? "").trim(),
				code,
				line: source.slice(0, match.index).split("\n").length,
				raw,
				start: match.index,
				end: match.index + raw.length,
			};
		},
	);
}

export async function listFiles(dir, predicate) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await listFiles(entryPath, predicate)));
		} else if (predicate(entryPath)) {
			files.push(entryPath);
		}
	}
	return files;
}

/**
 * Resolve the file a tool should run on: the block's `src=` file, or a temp
 * file holding the block body. Returns { file, error?, dispose }.
 */
export async function snippetFileFor(block, mdxPath, extension) {
	const { src } = parseMetaOptions(block.meta);
	if (src) {
		const file = path.resolve(path.dirname(mdxPath), src);
		return {
			file,
			isTemp: false,
			error: existsSync(file)
				? undefined
				: `Referenced source "${src}" was not found.`,
			dispose: async () => {},
		};
	}
	const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mdx-snippet-"));
	const file = path.join(dir, `snippet${extension}`);
	await fs.writeFile(file, block.code ?? "", "utf8");
	return {
		file,
		isTemp: true,
		dispose: () => fs.rm(dir, { recursive: true, force: true }),
	};
}

const failures = [];

const recordFailure = (context, result, extra = "") => {
	const output =
		result.output ||
		`Command "${result.command}" exited with code ${
			result.status ?? "unknown"
		}.`;
	failures.push({
		context,
		message: `${output}\n  Command: ${result.command}${extra}`,
	});
};

async function lintLanguage(languageId, mdxFiles, snippetFiles) {
	const config = LINTERS[languageId];
	const failuresBefore = failures.length;

	for (const mdxPath of mdxFiles) {
		const blocks = extractCodeBlocks(await fs.readFile(mdxPath, "utf8"));
		for (const block of blocks) {
			if (normalizeLanguage(block.lang) !== languageId) continue;
			const context = `${mdxPath}:${block.line} (${config.label})`;
			const snippet = await snippetFileFor(block, mdxPath, config.extension);
			if (snippet.error) {
				failures.push({ context, message: snippet.error });
				continue;
			}
			const result = config.run(snippet.file);
			if (!result.success) {
				recordFailure(context, result, `\n  Snippet: ${snippet.file}`);
			}
			await snippet.dispose();
		}
	}

	for (const file of snippetFiles) {
		if (SNIPPET_EXTENSIONS.get(path.extname(file)) !== languageId) continue;
		const result = config.run(file);
		if (!result.success) recordFailure(`${file} (${config.label})`, result);
	}

	if (failures.length === failuresBefore) {
		console.log(
			`\u001B[32m${config.label} code blocks and snippets passed lint.\u001B[0m`,
		);
	}
}

async function main() {
	const mdxFiles = await listFiles(contentDir, (file) => file.endsWith(".mdx"));
	const snippetFiles = await listFiles(snippetsDir, (file) =>
		SNIPPET_EXTENSIONS.has(path.extname(file)),
	);

	for (const languageId of Object.keys(LINTERS)) {
		await lintLanguage(languageId, mdxFiles, snippetFiles);
	}

	if (failures.length) {
		console.error("Lint issues detected in code blocks or snippets:");
		for (const failure of failures) {
			console.error(`\n- ${failure.context}\n  ${failure.message}`);
		}
		process.exit(1);
	}
	console.log(
		"All MDX code blocks and snippet files passed their language-specific linters.",
	);
}

// Only run when executed directly (tests and format-snippets import helpers).
if (
	process.argv[1] &&
	path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	main().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}
