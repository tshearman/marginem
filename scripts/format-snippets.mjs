#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const contentDir = path.join(projectRoot, "src", "content");
const snippetsDir = path.join(projectRoot, "src", "snippets");

const FORMATTERS = {
  javascript: {
    label: "JavaScript",
    extension: ".js",
    run: (file) =>
      runCommand(process.env.CODE_FORMAT_JS ?? "biome", [
        "format",
        "--write",
        file
      ])
  },
  python: {
    label: "Python",
    extension: ".py",
    run: (file) =>
      runCommand(process.env.CODE_FORMAT_PYTHON ?? "ruff", [
        "format",
        file
      ])
  },
  haskell: {
    label: "Haskell",
    extension: ".hs",
    run: (file) =>
      runCommand(process.env.CODE_FORMAT_HASKELL ?? "ormolu", [
        "--mode",
        "inplace",
        file
      ])
  },
  lisp: {
    label: "Common Lisp",
    extension: ".lisp",
    run: (file) => {
      const formatter =
        process.env.CODE_FORMAT_LISP ??
        path.join(projectRoot, "scripts", "format-lisp.lisp");
      return runCommand("sbcl", ["--script", formatter, file]);
    }
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
const formattedFiles = new Set();

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
      raw: full,
      start: match.index,
      end: match.index + full.length
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

async function writeTempSnippet(contents, extension) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mdx-format-"));
  const file = path.join(dir, `snippet${extension}`);
  await fs.writeFile(file, contents, "utf8");
  return {
    file,
    dispose: async () => {
      await fs.rm(dir, { recursive: true, force: true });
    }
  };
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function rebuildBlock(block, formattedCode) {
  const trimmed = formattedCode.replace(/\s+$/, "");
  const headerEnd = block.raw.indexOf("\n");
  const prefix = block.raw.slice(0, headerEnd + 1);
  const suffix = block.raw.slice(block.raw.lastIndexOf("```"));
  return `${prefix}${trimmed}\n${suffix}`;
}

async function formatCodeBlock(block, filePath, replacements) {
  const language = normalizeLanguage(block.lang);
  if (!language) return;
  const config = FORMATTERS[language];
  if (!config || typeof config.run !== "function") return;

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
  if (!result.success) {
    failures.push({
      context: `${filePath}:${block.line} (${config.label})`,
      message:
        (result.output &&
          `${result.output}\n  Command: ${result.command}\n  Snippet: ${targetPath}`) ||
        `Command "${result.command}" exited with code ${result.status ?? "unknown"}`
    });
    if (cleanup) await cleanup();
    return;
  }

  if (!options.src) {
    const formatted = await fs.readFile(targetPath, "utf8");
    const normalizedNew = formatted.replace(/\s+$/, "");
    const normalizedOld = (block.code ?? "").replace(/\s+$/, "");
    if (normalizedNew !== normalizedOld) {
      replacements.push({
        start: block.start,
        end: block.end,
        replacement: rebuildBlock(block, formatted)
      });
      formattedFiles.add(filePath);
    }
  } else {
    formattedFiles.add(targetPath);
  }

  if (cleanup) {
    await cleanup();
  }
}

async function formatMdxFiles() {
  const files = await listFiles(contentDir, (file) => file.endsWith(".mdx"));
  for (const file of files) {
    const contents = await fs.readFile(file, "utf8");
    const blocks = extractCodeBlocks(contents);
    const replacements = [];
    for (const block of blocks) {
      await formatCodeBlock(block, file, replacements);
    }
    if (replacements.length) {
      const updated = applyReplacements(contents, replacements);
      await fs.writeFile(file, updated);
    }
  }
}

async function formatSnippetFiles() {
  const files = await listFiles(snippetsDir, (file) =>
    SNIPPET_EXTENSIONS.has(path.extname(file))
  );

  for (const file of files) {
    const language = SNIPPET_EXTENSIONS.get(path.extname(file));
    const config = FORMATTERS[language];
    if (!config || typeof config.run !== "function") continue;
    const result = config.run(file);
    if (!result.success) {
      failures.push({
        context: `${file} (${config.label})`,
        message:
          result.output ||
          `Command "${result.command}" exited with code ${result.status ?? "unknown"}`
      });
    } else {
      formattedFiles.add(file);
    }
  }
}

function applyReplacements(source, replacements) {
  let updated = source;
  replacements
    .sort((a, b) => b.start - a.start)
    .forEach(({ start, end, replacement }) => {
      updated = `${updated.slice(0, start)}${replacement}${updated.slice(end)}`;
    });
  return updated;
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
  } else {
    if (formattedFiles.size) {
      console.log("Formatted files:");
      for (const file of formattedFiles) {
        console.log(`- ${path.relative(projectRoot, file)}`);
      }
    } else {
      console.log("All code blocks and snippet files were already formatted.");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
