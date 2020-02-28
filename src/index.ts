import shiki from 'shiki';
import { TTheme } from 'shiki-themes';
import { TLang } from 'shiki-languages';
import { Node } from 'unist';
import visit from 'unist-util-visit';

export interface RemarkShikiOptions {
  theme: TTheme;
}

export interface RemarkNode extends Node {
  type: string;
  value: string;
  lang: null | TLang;
}

export default async function(
  { markdownAST }: any,
  options: RemarkShikiOptions
) {
  let theme = options.theme || 'nord';
  let shikiTheme;

  try {
    shikiTheme = shiki.getTheme(theme);
  } catch (_) {
    try {
      shikiTheme = shiki.loadTheme(theme);
    } catch (_) {
      throw new Error('Unable to load theme: ' + theme);
    }
  }

  const highlighter = await shiki.getHighlighter({
    theme: shikiTheme,
  });

  visit(markdownAST, 'code', (node: RemarkNode) => {
    node.type = 'html';
    node.children = undefined;

    if (!node.lang) {
      node.value = `<pre class="shiki-unknown"><code>${node.value}</code></pre>`;
      return;
    }

    node.value = highlighter.codeToHtml!(node.value, node.lang as TLang);
  });

  return markdownAST;
}
