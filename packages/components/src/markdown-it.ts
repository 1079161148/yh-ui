type MarkdownItModule = typeof import('markdown-it')

export async function loadMarkdown(): Promise<MarkdownItModule['default']> {
  try {
    const markdownItModule = await import('markdown-it')
    return (
      'default' in markdownItModule
        ? (markdownItModule.default ?? markdownItModule)
        : markdownItModule
    ) as MarkdownItModule['default']
  } catch (err) {
    console.error(
      '[YhMarkdown] 无法加载 markdown-it。如果需要使用 Markdown 渲染功能，请在您的项目中安装 "markdown-it" 依赖。',
      err
    )
    throw new Error('未安装 markdown-it 依赖。请安装 "markdown-it" 以渲染 Markdown 内容。')
  }
}
