#!/usr/bin/env node
/*
 * Fails if a staged markdown/MDX file has whitespace immediately before a
 * footnote reference (e.g. `see [^foo]` instead of `see[^foo]`). The space
 * renders as a real space in HTML and lets the line break between the word
 * and the superscript.
 *
 * Run by .githooks/pre-commit. Pass --all to scan the whole tree instead of
 * just the staged set (useful for one-off audits).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const scanAll = process.argv.includes("--all");

const FOOTNOTE_SPACE = /[ \t]\[\^[^\]\s]+\]/;

function stagedMarkdownFiles() {
  const res = spawnSync(
    "git",
    ["diff", "--cached", "--name-only", "--diff-filter=AM", "-z"],
    { cwd: projectRoot, encoding: "buffer" },
  );
  if (res.status !== 0) {
    process.stderr.write(res.stderr?.toString() ?? "");
    process.exit(res.status ?? 1);
  }
  return res.stdout
    .toString("utf8")
    .split("\0")
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

function allMarkdownFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...allMarkdownFiles(full));
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      out.push(path.relative(projectRoot, full));
    }
  }
  return out;
}

const files = scanAll
  ? allMarkdownFiles(projectRoot)
  : stagedMarkdownFiles();

const problems = [];
for (const file of files) {
  const abs = path.join(projectRoot, file);
  if (!fs.existsSync(abs)) continue;
  const lines = fs.readFileSync(abs, "utf8").split("\n");
  lines.forEach((line, idx) => {
    const m = line.match(FOOTNOTE_SPACE);
    if (m) problems.push({ file, line: idx + 1, snippet: line.trim() });
  });
}

if (problems.length === 0) process.exit(0);

console.error("Footnote references must attach directly to the preceding word.");
console.error("Found whitespace before [^ref]:");
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  ${p.snippet}`);
}
process.exit(1);
