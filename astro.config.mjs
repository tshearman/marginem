import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkRunCode, {
	getSnippetDependents,
} from "./plugins/remark-run-code.js";
import rehypePrism from "rehype-prism-plus";
import "prismjs/components/prism-haskell.js";
import "prismjs/components/prism-lisp.js";
import remarkObsidianLinks from "./plugins/remark-obsidian-links.js";
import { visualizer } from "rollup-plugin-visualizer";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(rootDir, "content");
const snippetsDir = path.join(contentDir, "snippets");
const isCloudflarePages = Boolean(process.env.CF_PAGES);
const isPagesFunctions = process.env.PAGES_FUNCTIONS === "true";
const runCodeEnabled =
	process.env.RUN_CODE_SNIPPETS === "true" ||
	(!isCloudflarePages && process.env.RUN_CODE_SNIPPETS !== "false");

const watchSnippets = () => ({
	name: "watch-snippets",
	configureServer(server) {
		const snippetGlob = path.join(snippetsDir, "**/*");
		server.watcher.add(snippetGlob);
		const triggerReload = async (filePath) => {
			if (!filePath) return;
			const absPath = path.resolve(filePath);
			if (!absPath.startsWith(snippetsDir)) return;
			const dependents = Array.from(getSnippetDependents(absPath));
			if (!dependents.length) return;
			for (const dependent of dependents) {
				const modules = await server.moduleGraph.getModulesByFile(dependent);
				if (modules) {
					for (const mod of modules) {
						server.moduleGraph.invalidateModule(mod);
					}
				}
			}
			server.ws.send({ type: "full-reload", path: "*" });
		};
		server.watcher.on("add", triggerReload);
		server.watcher.on("change", triggerReload);
		server.watcher.on("unlink", triggerReload);
	},
});

export default defineConfig({
	site: "https://marginem.io",
	output: isPagesFunctions ? "static" : "server",
	adapter: isPagesFunctions
		? undefined
		: cloudflare({
				platform: "pages",
				imageService: "compile",
			}),
	integrations: [mdx()],
	image: isPagesFunctions
		? undefined
		: {
				service: {
					entrypoint: "astro/assets/services/compile",
				},
			},
	markdown: {
		syntaxHighlight: "prism",
		prism: {
			theme: "prism-solarizedlight",
		},
		remarkPlugins: [
			remarkMath,
			remarkGfm,
			...(runCodeEnabled ? [remarkRunCode] : []),
			remarkObsidianLinks,
		],
		rehypePlugins: [rehypeKatex, [rehypePrism, { showLineNumbers: true }]],
	},
	experimental: {
		/* Astro's Fonts API handles subsetting, hashing, preload-link
		 * generation, and synthesises a fallback @font-face whose metrics
		 * match the first named family in `fallbacks` — here, Courier New.
		 * That replaces the hand-tuned size-adjust / ascent / descent
		 * overrides we used to keep in fonts.css. */
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
		ssr: {
			external: ["node:fs", "node:path"],
		},
		plugins: [
			watchSnippets(),
			visualizer({
				filename: "dist/stats.html",
				open: false,
			}),
		],
		build: {
			chunkSizeWarningLimit: 1500,
		},
	},
});
