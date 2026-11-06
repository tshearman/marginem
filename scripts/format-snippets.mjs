#!/usr/bin/env node
// Format fenced code blocks in content MDX (rewriting the block in place) and
// the files in content/snippets with each language's formatter.
import fs from "node:fs/promises";
import path from "node:path";
import {
	SNIPPET_EXTENSIONS,
	contentDir,
	extractCodeBlocks,
	listFiles,
	normalizeLanguage,
	projectRoot,
	runCommand,
	snippetFileFor,
	snippetsDir,
} from "./lint-snippets.mjs";

const FORMATTERS = {
	javascript: {
		label: "JavaScript",
		extension: ".js",
		run: (file) =>
			runCommand(process.env.CODE_FORMAT_JS ?? "biome", [
				"format",
				"--write",
				file,
			]),
	},
	typescript: {
		label: "TypeScript",
		extension: ".ts",
		run: (file) =>
			runCommand(process.env.CODE_FORMAT_TS ?? "biome", [
				"format",
				"--write",
				file,
			]),
	},
	python: {
		label: "Python",
		extension: ".py",
		run: (file) =>
			runCommand(process.env.CODE_FORMAT_PYTHON ?? "ruff", ["format", file]),
	},
	haskell: {
		label: "Haskell",
		extension: ".hs",
		run: (file) =>
			runCommand(process.env.CODE_FORMAT_HASKELL ?? "ormolu", [
				"--mode",
				"inplace",
				file,
			]),
	},
	lisp: {
		label: "Common Lisp",
		extension: ".lisp",
		run: (file) =>
			runCommand("sbcl", [
				"--script",
				process.env.CODE_FORMAT_LISP ??
					path.join(projectRoot, "scripts", "format-lisp.lisp"),
				file,
			]),
	},
};

const failures = [];
const formattedFiles = new Set();

const recordFailure = (context, result, extra = "") => {
	failures.push({
		context,
		message: result.output
			? `${result.output}\n  Command: ${result.command}${extra}`
			: `Command "${result.command}" exited with code ${
					result.status ?? "unknown"
				}`,
	});
};

/** Format one block; returns its replacement text when the code changed. */
async function formatCodeBlock(block, mdxPath) {
	const config = FORMATTERS[normalizeLanguage(block.lang)];
	if (!config) return null;

	const context = `${mdxPath}:${block.line} (${config.label})`;
	const snippet = await snippetFileFor(block, mdxPath, config.extension);
	if (snippet.error) {
		failures.push({ context, message: snippet.error });
		return null;
	}
	try {
		const result = config.run(snippet.file);
		if (!result.success) {
			recordFailure(context, result, `\n  Snippet: ${snippet.file}`);
			return null;
		}
		if (!snippet.isTemp) {
			formattedFiles.add(snippet.file);
			return null;
		}
		const formatted = (await fs.readFile(snippet.file, "utf8")).trimEnd();
		if (formatted === (block.code ?? "").trimEnd()) return null;
		formattedFiles.add(mdxPath);
		// Keep the opening fence line and closing fence, swap the body.
		const header = block.raw.slice(0, block.raw.indexOf("\n") + 1);
		const footer = block.raw.slice(block.raw.lastIndexOf("```"));
		return `${header}${formatted}\n${footer}`;
	} finally {
		await snippet.dispose();
	}
}

async function formatMdxFiles() {
	const files = await listFiles(contentDir, (file) => file.endsWith(".mdx"));
	for (const file of files) {
		let contents = await fs.readFile(file, "utf8");
		// Apply replacements back to front so earlier offsets stay valid.
		const blocks = extractCodeBlocks(contents).reverse();
		let changed = false;
		for (const block of blocks) {
			const replacement = await formatCodeBlock(block, file);
			if (replacement === null) continue;
			contents = `${contents.slice(
				0,
				block.start,
			)}${replacement}${contents.slice(block.end)}`;
			changed = true;
		}
		if (changed) await fs.writeFile(file, contents);
	}
}

async function formatSnippetFiles() {
	const files = await listFiles(snippetsDir, (file) =>
		SNIPPET_EXTENSIONS.has(path.extname(file)),
	);
	for (const file of files) {
		const config = FORMATTERS[SNIPPET_EXTENSIONS.get(path.extname(file))];
		const result = config.run(file);
		if (result.success) formattedFiles.add(file);
		else recordFailure(`${file} (${config.label})`, result);
	}
}

async function main() {
	await formatMdxFiles();
	await formatSnippetFiles();

	if (failures.length) {
		console.error("Formatting issues detected in code blocks or snippets:");
		for (const failure of failures) {
			console.error(`\n- ${failure.context}\n  ${failure.message}`);
		}
		process.exit(1);
	}
	if (!formattedFiles.size) {
		console.log("All code blocks and snippet files were already formatted.");
		return;
	}
	console.log("Formatted files:");
	for (const file of formattedFiles) {
		console.log(`- ${path.relative(projectRoot, file)}`);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
