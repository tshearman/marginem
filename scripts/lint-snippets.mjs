#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const contentDir = path.join(projectRoot, "src", "content");
const snippetsDir = path.join(projectRoot, "src", "content", "snippets");

const LANGUAGE_CONFIG = {
  javascript: {
    label: "JavaScript",
    extension: ".js",
    run: (file) =>
      runCommand(process.env.CODE_LINT_JS ?? "biome", [
        "lint",
        "--error-on-warnings",
        file
      ])
  },
  python: {
    label: "Python",
    extension: ".py",
    run: (file) =>
      runCommand(process.env.CODE_LINT_PYTHON ?? "ruff", ["check", file])
  },
  haskell: {
    label: "Haskell",
    extension: ".hs",
    run: (file) =>
      runCommand(process.env.CODE_LINT_HASKELL ?? "hlint", ["--quiet", file])
  },
  lisp: {
    label: "Common Lisp",
    extension: ".lisp",
    run: (file) =>
      runCommand(process.env.CODE_LINT_LISP ?? "sbcl", ["--script", file])
  }
};

const LANGUAGE_ALIASES = {
  js: "javascript",
  javascript: "javascript",
  ts: "javascript",
  typescript: "javascript",
  py: "python",
  python: "python",
  hs: "haskell",
  haskell: "haskell",
  lisp: "lisp",
  commonlisp: "lisp",
  cl: "lisp"
};

const SNIPPET_EXTENSIONS = new Map([
  [".js", "javascript"],
  [".ts", "javascript"],
  [".py", "python"],
  [".hs", "haskell"],
  [".lisp", "lisp"]
]);

const failures = [];
const SUCCESS_COLOR = "\u001B[32m";
const RESET_COLOR = "\u001B[0m";

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
    input: options.input ?? null,
    timeout: options.timeout ?? 120000
  });

  if (result.error) {
    if (result.error.code === "ENOENT") {
      return {
        success: false,
        output: `Command "${command}" was not found. Ensure it is available in your dev shell.`,
        status: result.status ?? null,
        command: [command, ...args].join(" ")
      };
    }
    return {
      success: false,
      output: result.error.message,
      status: result.status ?? null,
      command: [command, ...args].join(" ")
    };
  }

  const combined = [result.stdout, result.stderr]
    .filter(Boolean)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .join("\n");

  return {
    success: result.status === 0,
    output: combined,
    status: result.status ?? null,
    command: [command, ...args].join(" ")
  };
}

function normalizeLanguage(id) {
  if (!id) return null;
  return LANGUAGE_ALIASES[id.toLowerCase()] ?? null;
}

function parseMeta(meta = "") {
  const options = {};
  const regex = /(\w+)=("[^"]*"|'[^']*'|\S+)/g;
  let match;
  while ((match = regex.exec(meta)) !== null) {
    const [, key, raw] = match;
    options[key] = raw.replace(/^['"]|['"]$/g, "");
  }
  return options;
}

function extractCodeBlocks(source) {
  const blocks = [];
  const fence = /```(\w+)([^\n`]*)?\n([\s\S]*?)```/g;
  let match;
  while ((match = fence.exec(source)) !== null) {
    const [full, lang, rawMeta, code] = match;
    const before = source.slice(0, match.index);
    const line = before.split("\n").length;
    blocks.push({
      lang: lang ?? "",
      meta: (rawMeta ?? "").trim(),
      code,
      line,
      raw: full
    });
  }
  return blocks;
}

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

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function lintCodeBlock(block, filePath, languageOverride) {
  const language = languageOverride ?? normalizeLanguage(block.lang);
  if (!language) return;
  const config = LANGUAGE_CONFIG[language];
  if (!config) return;

  const options = parseMeta(block.meta);
  let targetPath;
  let cleanup;

  if (options.src) {
    targetPath = path.resolve(path.dirname(filePath), options.src);
    if (!(await fileExists(targetPath))) {
      failures.push({
        context: `${filePath}:${block.line} (${config.label})`,
        message: `Referenced source "${options.src}" was not found.`
      });
      return;
    }
  } else {
    const { file, dispose } = await writeTempSnippet(
      block.code ?? "",
      config.extension
    );
    targetPath = file;
    cleanup = dispose;
  }

  const result = config.run(targetPath);
  const lintOutput =
    result.output ||
    `Command "${result.command}" exited with code ${result.status ?? "unknown"}.`;
  if (!result.success) {
    failures.push({
      context: `${filePath}:${block.line} (${config.label})`,
      message: `${lintOutput}\n  Command: ${result.command}\n  Snippet: ${targetPath}`
    });
  }

  if (cleanup) {
    await cleanup();
  }
}

async function lintMdxFilesForLanguage(mdxFiles, languageId) {
  if (!LANGUAGE_CONFIG[languageId]) return;
  for (const file of mdxFiles) {
    const contents = await fs.readFile(file, "utf8");
    const blocks = extractCodeBlocks(contents);
    for (const block of blocks) {
      const blockLanguage = normalizeLanguage(block.lang);
      if (blockLanguage !== languageId) continue;
      await lintCodeBlock(block, file, languageId);
    }
  }
}

async function writeTempSnippet(contents, extension) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mdx-lint-"));
  const file = path.join(dir, `snippet${extension}`);
  await fs.writeFile(file, contents, "utf8");
  return {
    file,
    dispose: async () => {
      await fs.rm(dir, { recursive: true, force: true });
    }
  };
}

async function lintSnippetFilesForLanguage(snippetFiles, languageId) {
  const config = LANGUAGE_CONFIG[languageId];
  if (!config) return;
  for (const file of snippetFiles) {
    const language = SNIPPET_EXTENSIONS.get(path.extname(file));
    if (language !== languageId) continue;
    const result = config.run(file);
    const lintOutput =
      result.output ||
      `Command "${result.command}" exited with code ${result.status ?? "unknown"}.`;
    if (!result.success) {
      failures.push({
        context: `${file} (${config.label})`,
        message: `${lintOutput}\n  Command: ${result.command}`
      });
    }
  }
}

async function lintLanguage(languageId, mdxFiles, snippetFiles) {
  const errorsBefore = failures.length;
  await lintMdxFilesForLanguage(mdxFiles, languageId);
  await lintSnippetFilesForLanguage(snippetFiles, languageId);
  if (failures.length === errorsBefore) {
    const label = LANGUAGE_CONFIG[languageId]?.label ?? languageId;
    console.log(
      `${SUCCESS_COLOR}${label} code blocks and snippets passed lint.${RESET_COLOR}`
    );
  }
}

async function main() {
  const mdxFiles = await listFiles(contentDir, (file) => file.endsWith(".mdx"));
  const snippetFiles = await listFiles(snippetsDir, (file) =>
    SNIPPET_EXTENSIONS.has(path.extname(file))
  );

  for (const languageId of Object.keys(LANGUAGE_CONFIG)) {
    await lintLanguage(languageId, mdxFiles, snippetFiles);
  }

  if (failures.length) {
    console.error("Lint issues detected in code blocks or snippets:");
    for (const failure of failures) {
      console.error(`\n- ${failure.context}\n  ${failure.message}`);
    }
    process.exit(1);
  } else {
    console.log(
      "All MDX code blocks and snippet files passed their language-specific linters."
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
