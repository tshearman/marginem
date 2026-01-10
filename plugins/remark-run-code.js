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

      const { output, success } = executeSnippet(node.value, file?.path);
      const status = success ? 'ok' : 'error';
      parent.children.splice(index + 1, 0, {
        type: 'code',
        lang: 'plaintext',
        meta: `result ${status}`,
        value: output || '(no output)'
      });
    });
  };
}
