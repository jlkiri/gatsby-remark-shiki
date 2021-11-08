import shiki from 'shiki';
import { Theme } from 'shiki-themes';
import { Lang, ILanguageRegistration } from 'shiki-languages';
import { Node } from 'unist';
import visit from 'unist-util-visit';

export interface RemarkShikiOptions {
  theme: Theme;
  langs?: ILanguageRegistration[];
}

export interface RemarkNode extends Node {
  type: string;
  value: string;
  lang: null | Lang;
}

export default async function(
  { markdownAST }: any,
  options: RemarkShikiOptions
) {
  let theme = options.theme || 'nord';

  let highlighter: shiki.Highlighter;
  try {
    highlighter = await shiki.getHighlighter({
      theme,
      langs: options.langs || [],
    });
  } catch (_) {
    throw new Error('Unable to load theme: ' + theme);
  }

  visit(markdownAST, 'code', (node: RemarkNode) => {
    node.type = 'html';
    node.children = undefined;

    if (!node.lang) {
      node.value = `<pre class="shiki-unknown"><code>${node.value}</code></pre>`;
      return;
    }

    node.value = highlighter.codeToHtml!(node.value, node.lang as Lang);
  });

  return markdownAST;
}
