var _a
import * as markdownItModule from 'markdown-it'
const MarkdownIt =
  'default' in markdownItModule
    ? (_a = markdownItModule.default) != null
      ? _a
      : markdownItModule
    : markdownItModule
var stdin_default = MarkdownIt
export { stdin_default as default }
