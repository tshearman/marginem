import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
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
const snippetsDir = path.join(rootDir, "src/content/snippets");
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
	integrations: [mdx(), preact()],
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
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true
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
