import * as markdownItModule from 'markdown-it'

type MarkdownItModule = typeof import('markdown-it')

const MarkdownIt = (
  'default' in markdownItModule ? (markdownItModule.default ?? markdownItModule) : markdownItModule
) as MarkdownItModule['default']

export default MarkdownIt
