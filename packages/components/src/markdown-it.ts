import * as markdownItModule from 'markdown-it'

const MarkdownIt = (
  'default' in markdownItModule ? (markdownItModule.default ?? markdownItModule) : markdownItModule
) as any

export default MarkdownIt
