import * as markdownItModule from "markdown-it";
const MarkdownIt = "default" in markdownItModule ? markdownItModule.default ?? markdownItModule : markdownItModule;
export default MarkdownIt;
