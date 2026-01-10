import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkRunCode from './plugins/remark-run-code.js';
import rehypePrism from 'rehype-prism-plus';


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
  }
});
