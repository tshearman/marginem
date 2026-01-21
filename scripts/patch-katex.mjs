import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("node_modules/katex/dist");
const targets = ["katex.js", "katex.mjs", "katex.min.js"];
const patterns = [
  { find: /\nMM(?=\d)/g, replace: "\nM" },
  { find: /\\nMM(?=\d)/g, replace: "\\nM" },
];

for (const target of targets) {
  const filePath = path.join(distDir, target);
  if (!fs.existsSync(filePath)) {
    console.warn(`[patch-katex] Missing ${filePath}`);
    continue;
  }

  const contents = fs.readFileSync(filePath, "utf8");
  let updated = contents;
  let changed = false;

  for (const { find, replace } of patterns) {
    if (find.test(updated)) {
      updated = updated.replace(find, replace);
      changed = true;
    }
  }

  if (!changed) {
    continue;
  }
  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`[patch-katex] Patched ${filePath}`);
}
