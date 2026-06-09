type ViewerModule = typeof import('viewerjs')

export async function loadViewer(): Promise<ViewerModule['default']> {
  try {
    const [viewerModule] = await Promise.all([
      import('viewerjs'),
      // @ts-ignore
      import('viewerjs/dist/viewer.css')
    ])
    return (
      'default' in viewerModule ? (viewerModule.default ?? viewerModule) : viewerModule
    ) as ViewerModule['default']
  } catch (err) {
    console.error(
      '[YhViewer] 无法加载 viewerjs。如果需要使用图片/文件预览功能，请在您的项目中安装 "viewerjs" 依赖。',
      err
    )
    throw new Error('未安装 viewerjs 依赖。请安装 "viewerjs" 以使用预览功能。')
  }
}
