import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { visit } from "unist-util-visit";

const PYTHON_COMMAND = process.env.REMARK_RUN_CODE_PYTHON ?? "python3";
const HASKELL_COMMAND = process.env.REMARK_RUN_CODE_HASKELL ?? "runghc";
const LISP_COMMAND = process.env.REMARK_RUN_CODE_LISP ?? "sbcl";

const snippetToConsumers = new Map();
const consumerToSnippets = new Map();

const normalizePath = (filePath) => path.resolve(filePath);

function registerSnippetDependency(snippetPath, consumerPath) {
	if (!snippetPath || !consumerPath) return;
	const normalizedSnippet = normalizePath(snippetPath);
	const normalizedConsumer = normalizePath(consumerPath);
	let consumers = snippetToConsumers.get(normalizedSnippet);
	if (!consumers) {
		consumers = new Set();
		snippetToConsumers.set(normalizedSnippet, consumers);
	}
	consumers.add(normalizedConsumer);

	let snippets = consumerToSnippets.get(normalizedConsumer);
	if (!snippets) {
		snippets = new Set();
		consumerToSnippets.set(normalizedConsumer, snippets);
	}
	snippets.add(normalizedSnippet);
}

function resetConsumerDependencies(consumerPath) {
	if (!consumerPath) return;
	const normalizedConsumer = normalizePath(consumerPath);
	const snippets = consumerToSnippets.get(normalizedConsumer);
	if (!snippets) return;
	for (const snippetPath of snippets) {
		const normalizedSnippet = normalizePath(snippetPath);
		const consumers = snippetToConsumers.get(normalizedSnippet);
		if (consumers) {
			consumers.delete(normalizedConsumer);
			if (!consumers.size) {
				snippetToConsumers.delete(normalizedSnippet);
			}
		}
	}
	consumerToSnippets.delete(normalizedConsumer);
}

export function getSnippetDependents(snippetPath) {
	if (!snippetPath) return new Set();
	const normalizedSnippet = normalizePath(snippetPath);
	const dependents = snippetToConsumers.get(normalizedSnippet);
	return new Set(dependents ?? []);
}

function executeJavascriptSnippet(code, filePath) {
	const logs = [];
	const sandbox = {
		console: {
			log: (...args) => logs.push(args.join(" ")),
		},
		process: { env: {} },
	};
	try {
		const script = new vm.Script(code, {
			filename: filePath ?? "mdx-snippet.js",
		});
		const context = vm.createContext(sandbox);
		const result = script.runInContext(context, { timeout: 500 });
		if (typeof result !== "undefined") {
			logs.push(String(result));
		}
		return { output: logs.join("\n"), success: true };
	} catch (error) {
		return { output: String(error), success: false };
	}
}

function executePythonSnippet(code) {
	try {
		const result = spawnSync(PYTHON_COMMAND, ["-c", code], {
			encoding: "utf8",
		});
		if (result.error) {
			return { output: String(result.error), success: false };
		}
		const chunks = [];
		if (result.stdout) chunks.push(result.stdout.trim());
		if (result.stderr) chunks.push(result.stderr.trim());
		if (result.status !== 0) {
			chunks.push(`(python exited with code ${result.status ?? "unknown"})`);
		}
		const output = chunks.filter(Boolean).join("\n") || "(no output)";
		return { output, success: result.status === 0 };
	} catch (error) {
		return { output: String(error), success: false };
	}
}

function executeHaskellSnippet(code, sourcePath, contextPath) {
	let tempDir;
	let targetPath = sourcePath;
	try {
		if (!targetPath) {
			tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "remark-hs-"));
			const fileName = contextPath
				? `${path.basename(contextPath)}.hs`
				: "snippet.hs";
			targetPath = path.join(tempDir, fileName);
			fs.writeFileSync(targetPath, code, "utf8");
		}
		const result = spawnSync(HASKELL_COMMAND, [targetPath], {
			encoding: "utf8",
		});
		const chunks = [];
		if (result.stdout) chunks.push(result.stdout.trim());
		if (result.stderr) chunks.push(result.stderr.trim());
		if (result.error) chunks.push(String(result.error));
		if (result.status !== 0) {
			chunks.push(`(haskell exited with code ${result.status ?? "unknown"})`);
		}
		const output = chunks.filter(Boolean).join("\n") || "(no output)";
		return { output, success: result.status === 0 };
	} catch (error) {
		return { output: String(error), success: false };
	} finally {
		if (tempDir) {
			fs.rmSync(tempDir, { recursive: true, force: true });
		}
	}
}

function executeLispSnippet(code, sourcePath, contextPath) {
	let tempDir;
	let targetPath = sourcePath;
	try {
		if (!targetPath) {
			tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "remark-lisp-"));
			const fileName = contextPath
				? `${path.basename(contextPath)}.lisp`
				: "snippet.lisp";
			targetPath = path.join(tempDir, fileName);
			fs.writeFileSync(targetPath, code, "utf8");
		}
		const result = spawnSync(LISP_COMMAND, ["--script", targetPath], {
			encoding: "utf8",
		});
		const chunks = [];
		if (result.stdout) chunks.push(result.stdout.trim());
		if (result.stderr) chunks.push(result.stderr.trim());
		if (result.error) chunks.push(String(result.error));
		if (result.status !== 0) {
			chunks.push(`(lisp exited with code ${result.status ?? "unknown"})`);
		}
		const output = chunks.filter(Boolean).join("\n") || "(no output)";
		return { output, success: result.status === 0 };
	} catch (error) {
		return { output: String(error), success: false };
	} finally {
		if (tempDir) {
			fs.rmSync(tempDir, { recursive: true, force: true });
		}
	}
}

function parseMetaOptions(meta = "") {
	const options = {};
	const regex = /(\w+)=("[^"]*"|'[^']*'|[^\s]+)/g;
	let match = regex.exec(meta);
	while (match !== null) {
		const [, key, rawValue] = match;
		options[key] = rawValue.replace(/^['"]|['"]$/g, "");
		match = regex.exec(meta);
	}
	return options;
}

function loadSourceFromMeta(options, filePath) {
	const sourcePath = options.src ?? options.source ?? options.file;
	if (!sourcePath) return null;
	const baseDir = filePath ? path.dirname(filePath) : process.cwd();
	const resolvedPath = path.resolve(baseDir, sourcePath);
	try {
		const contents = fs.readFileSync(resolvedPath, "utf8");
		if (filePath) {
			registerSnippetDependency(resolvedPath, filePath);
		}
		return { contents, resolvedPath };
	} catch (error) {
		throw new Error(
			`Failed to load snippet source "${sourcePath}": ${error.message}`,
		);
	}
}

function executeSnippet(code, filePath, language, sourcePath) {
	if (language === "python" || language === "py") {
		return executePythonSnippet(code);
	}
	if (language === "haskell" || language === "hs") {
		return executeHaskellSnippet(code, sourcePath, filePath);
	}
	if (language === "lisp" || language === "commonlisp" || language === "cl") {
		return executeLispSnippet(code, sourcePath, filePath);
	}
	return executeJavascriptSnippet(code, filePath);
}

export default function remarkRunCode() {
	return function transformer(tree, file) {
		const consumerPath = file?.path ? normalizePath(file.path) : undefined;
		if (consumerPath) {
			resetConsumerDependencies(consumerPath);
		}
		visit(tree, "code", (node, index, parent) => {
			if (!parent || typeof index !== "number") return;
			const meta = node.meta ?? "";
			if (!meta.includes("run")) return;
			const options = parseMetaOptions(meta);
			const language = node.lang ?? "js";
			if (
				![
					"js",
					"javascript",
					"python",
					"py",
					"haskell",
					"hs",
					"lisp",
					"commonlisp",
					"cl",
				].includes(language)
			)
				return;

			let snippetValue = node.value;
			const sourceResult = loadSourceFromMeta(options, file?.path);
			if (sourceResult) {
				snippetValue = sourceResult.contents;
				node.value = sourceResult.contents.replace(/\s+$/, "");
			}

			const contextPath = sourceResult?.resolvedPath ?? file?.path;
			const resolvedSourcePath = sourceResult?.resolvedPath;
			const { output, success } = executeSnippet(
				snippetValue,
				contextPath,
				language,
				resolvedSourcePath,
			);
			if (!success) {
				const location = file?.path ? `${file.path}` : "MDX snippet";
				throw new Error(
					`Runnable ${language} snippet failed in ${location}:\n${
						output || "(no output)"
					}`,
				);
			}
			const lines = (output || "(no output)")
				.split("\n")
				.map((line) => `> ${line}`);
			const suffix = ["", ...lines].join("\n");
			node.value = `${node.value.replace(/\s+$/, "")}\n\n${suffix}`;
		});
	};
}
