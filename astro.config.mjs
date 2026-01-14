import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkRunCode, { getSnippetDependents } from './plugins/remark-run-code.js';
import rehypePrism from 'rehype-prism-plus';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const snippetsDir = path.join(rootDir, 'src/snippets');

const watchSnippets = () => ({
  name: 'watch-snippets',
  configureServer(server) {
    const snippetGlob = path.join(snippetsDir, '**/*');
    server.watcher.add(snippetGlob);
    const triggerReload = async (filePath) => {
      if (!filePath) return;
      const absPath = path.resolve(filePath);
      if (!absPath.startsWith(snippetsDir)) return;
      const dependents = Array.from(getSnippetDependents(absPath));
      for (const dependent of dependents) {
        const modules = await server.moduleGraph.getModulesByFile(dependent);
        if (modules) {
          modules.forEach((mod) => server.moduleGraph.invalidateModule(mod));
        }
      }
      server.ws.send({ type: 'full-reload', path: '*' });
    };
    server.watcher.on('add', triggerReload);
    server.watcher.on('change', triggerReload);
    server.watcher.on('unlink', triggerReload);
  }
});

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'prism',
    prism: {
      theme: 'prism-solarizedlight'
    },
    remarkPlugins: [remarkMath, remarkGfm, remarkRunCode],
    rehypePlugins: [rehypeKatex, [rehypePrism, { showLineNumbers: true }]]
  },
  vite: {
    plugins: [watchSnippets()]
  }
});
