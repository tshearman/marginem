import vm from 'node:vm';
import { visit } from 'unist-util-visit';

function executeSnippet(code, filePath) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.join(' '))
    },
    process: { env: {} }
  };
  try {
    const script = new vm.Script(code, { filename: filePath ?? 'mdx-snippet.js' });
    const context = vm.createContext(sandbox);
    const result = script.runInContext(context, { timeout: 500 });
    if (typeof result !== 'undefined') {
      logs.push(String(result));
    }
    return { output: logs.join('\n'), success: true };
  } catch (error) {
    return { output: String(error), success: false };
  }
}

export default function remarkRunCode() {
  return function transformer(tree, file) {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const meta = node.meta ?? '';
      if (!meta.includes('run')) return;
      const language = node.lang ?? 'js';
      if (!['js', 'javascript'].includes(language)) return;

      const { output } = executeSnippet(node.value, file?.path);
      const lines = (output || '(no output)').split('\n').map((line) => `> ${line}`);
      const suffix = ['', ...lines].join('\n');
      node.value = `${node.value.replace(/\s+$/, '')}\n\n${suffix}`;
    });
  };
}
