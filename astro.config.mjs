import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkRunCode, {
	getSnippetDependents,
} from "./plugins/remark-run-code.js";
import rehypePrism from "rehype-prism-plus";
import remarkObsidianLinks from "./plugins/remark-obsidian-links.js";
import { visualizer } from "rollup-plugin-visualizer";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const snippetsDir = path.join(rootDir, "content", "snippets");
const runCodeEnabled =
	process.env.RUN_CODE_SNIPPETS === "true" ||
	(!process.env.CF_PAGES && process.env.RUN_CODE_SNIPPETS !== "false");

// Re-render posts that pull a runnable snippet from content/snippets when that
// snippet file changes.
const watchSnippets = () => ({
	name: "watch-snippets",
	configureServer(server) {
		server.watcher.add(path.join(snippetsDir, "**/*"));
		const triggerReload = async (filePath) => {
			if (!filePath) return;
			const absPath = path.resolve(filePath);
			if (!absPath.startsWith(snippetsDir)) return;
			const dependents = getSnippetDependents(absPath);
			if (!dependents.size) return;
			for (const dependent of dependents) {
				const modules = server.moduleGraph.getModulesByFile(dependent);
				for (const mod of modules ?? []) {
					server.moduleGraph.invalidateModule(mod);
				}
			}
			server.ws.send({ type: "full-reload", path: "*" });
		};
		server.watcher.on("add", triggerReload);
		server.watcher.on("change", triggerReload);
		server.watcher.on("unlink", triggerReload);
	},
});

// Static output: the site is plain files on Cloudflare Pages, and the
// subscribe API runs as Pages Functions from src/functions (see wrangler.toml).
export default defineConfig({
	site: "https://marginem.io",
	integrations: [mdx()],
	markdown: {
		// Astro's built-in Prism is off; rehype-prism-plus highlights and adds
		// line numbers. Keep in sync with renderGardenMarkdown in src/lib/garden.ts.
		syntaxHighlight: false,
		remarkPlugins: [
			remarkMath,
			...(runCodeEnabled ? [remarkRunCode] : []),
			remarkObsidianLinks,
		],
		rehypePlugins: [
			rehypeKatex,
			[rehypePrism, { showLineNumbers: true, defaultLanguage: "plaintext" }],
		],
	},
	experimental: {
		/* Astro's Fonts API hashes the files, generates preload links, and
		 * synthesises a fallback @font-face whose metrics match the first
		 * named family in `fallbacks` (Courier New). It does not subset local
		 * files; scripts/subset-fonts.mjs produces these WOFF2s. */
		fonts: [
			{
				name: "iA Writer Duo",
				cssVariable: "--font-ia-writer",
				provider: fontProviders.local(),
				fallbacks: ["Courier New", "Courier", "monospace"],
				options: {
					variants: [
						{
							weight: 400,
							style: "normal",
							src: ["./assets/fonts/iAWriterDuoS-Regular.woff2"],
						},
						{
							weight: 400,
							style: "italic",
							src: ["./assets/fonts/iAWriterDuoS-Italic.woff2"],
						},
						{
							weight: 700,
							style: "normal",
							src: ["./assets/fonts/iAWriterDuoS-Bold.woff2"],
						},
						{
							weight: 700,
							style: "italic",
							src: ["./assets/fonts/iAWriterDuoS-BoldItalic.woff2"],
						},
					],
				},
			},
		],
	},
	prefetch: {
		// Hover as the safe baseline for any internal link we don't think
		// about — opt-in `data-astro-prefetch="viewport"` on high-intent
		// surfaces (masthead nav, archive/listing entries, homepage cards).
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	vite: {
		plugins: [
			watchSnippets(),
			visualizer({
				// Outside dist/ so it never gets deployed. `.astro/` is Astro's
				// existing build cache directory and is already gitignored.
				filename: ".astro/stats.html",
				open: false,
			}),
		],
		build: {
			chunkSizeWarningLimit: 1500,
		},
		server: {
			// Tool folders, not site source. .direnv links to whole nixpkgs
			// source trees (~100k files), which exhausts macOS's open-file limit
			// ("EMFILE: too many open files") when the watcher follows them.
			watch: { ignored: ["**/.direnv/**", "**/.venv/**", "**/.uv-cache/**"] },
		},
	},
});
