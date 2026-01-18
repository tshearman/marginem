#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { VFile } from "vfile";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkRunCode from "../plugins/remark-run-code.js";
import remarkObsidianLinks from "../plugins/remark-obsidian-links.js";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const contentDir = path.join(projectRoot, "src", "content");

const failures = [];
const snippetFailures = [];
const GREEN = "\u001B[32m";
const RED = "\u001B[31m";
const RESET = "\u001B[0m";
let totalBlocks = 0;
let passedBlocks = 0;
let failedBlocks = 0;

async function listFiles(dir, predicate) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await listFiles(entryPath, predicate)));
		} else if (!predicate || predicate(entryPath)) {
			files.push(entryPath);
		}
	}
	return files;
}

async function runBlocks(filePath, processor) {
	const contents = await fs.readFile(filePath, "utf8");
	try {
		const file = new VFile({ value: contents, path: filePath });
		const tree = processor.parse(file);
		await processor.run(tree, file);
	} catch (error) {
		failures.push({
			file: filePath,
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

async function main() {
	const startTime = Date.now();
	const mdxFiles = await listFiles(contentDir, (file) => file.endsWith(".mdx"));
	const handleResult = (result) => {
		totalBlocks += 1;
		if (result.success) {
			passedBlocks += 1;
			return;
		}
		failedBlocks += 1;
		const location = result.filePath ?? "MDX snippet";
		const line = result.line ? `:${result.line}` : "";
		snippetFailures.push({
			context: `${location}${line} (${result.language})`,
			message: result.output || "(no output)",
		});
	};
	const processor = unified()
		.use(remarkParse)
		.use(remarkMdx)
		.use(remarkMath)
		.use(remarkGfm)
		.use(remarkRunCode, { continueOnError: true, onResult: handleResult })
		.use(remarkObsidianLinks);

	for (const filePath of mdxFiles) {
		await runBlocks(filePath, processor);
	}

	if (failures.length || snippetFailures.length) {
		console.error("Runnable code blocks failed:");
		for (const failure of snippetFailures) {
			console.error(`\n- ${failure.context}\n  ${failure.message}`);
		}
		for (const failure of failures) {
			console.error(`\n- ${failure.file}\n  ${failure.error}`);
		}
	}

	const durationMs = Math.round(Date.now() - startTime);
	const averageMs =
		totalBlocks > 0 ? Math.round(durationMs / totalBlocks) : 0;
	const timingSuffix =
		totalBlocks > 0
			? `in ${durationMs}ms (${averageMs}ms/block)`
			: `in ${durationMs}ms`;
	console.log(
		`${GREEN}${passedBlocks} passed${RESET}, ${RED}${failedBlocks} failed${RESET} ${timingSuffix}.`,
	);

	if (failures.length || snippetFailures.length) {
		process.exit(1);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
