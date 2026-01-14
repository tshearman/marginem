import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { visit } from 'unist-util-visit';

const PYTHON_COMMAND = process.env.REMARK_RUN_CODE_PYTHON ?? 'python3';

function executeJavascriptSnippet(code, filePath) {
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

function executePythonSnippet(code) {
  try {
    const result = spawnSync(PYTHON_COMMAND, ['-c', code], {
      encoding: 'utf8'
    });
    if (result.error) {
      return { output: String(result.error), success: false };
    }
    const chunks = [];
    if (result.stdout) chunks.push(result.stdout.trim());
    if (result.stderr) chunks.push(result.stderr.trim());
    if (result.status !== 0) {
      chunks.push(`(python exited with code ${result.status ?? 'unknown'})`);
    }
    const output = chunks.filter(Boolean).join('\n') || '(no output)';
    return { output, success: result.status === 0 };
  } catch (error) {
    return { output: String(error), success: false };
  }
}

function executeSnippet(code, filePath, language) {
  if (language === 'python' || language === 'py') {
    return executePythonSnippet(code);
  }
  return executeJavascriptSnippet(code, filePath);
}

export default function remarkRunCode() {
  return function transformer(tree, file) {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const meta = node.meta ?? '';
      if (!meta.includes('run')) return;
      const language = node.lang ?? 'js';
      if (!['js', 'javascript', 'python', 'py'].includes(language)) return;

      const { output, success } = executeSnippet(node.value, file?.path, language);
      if (!success) {
        const location = file?.path ? `${file.path}` : 'MDX snippet';
        throw new Error(
          `Runnable ${language} snippet failed in ${location}:\n${output || '(no output)'}`
        );
      }
      const lines = (output || '(no output)').split('\n').map((line) => `> ${line}`);
      const suffix = ['', ...lines].join('\n');
      node.value = `${node.value.replace(/\s+$/, '')}\n\n${suffix}`;
    });
  };
}
