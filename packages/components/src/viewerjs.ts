import * as viewerModule from 'viewerjs'

type ViewerModule = typeof import('viewerjs')

const Viewer = (
  'default' in viewerModule ? (viewerModule.default ?? viewerModule) : viewerModule
) as ViewerModule['default']

export default Viewer
