import { withInstall } from '../../utils/index.js'
import Image from './src/image.js'
import ImageViewer from './src/image-viewer.js'
const YhImage = withInstall(Image)
const YhImageViewer = withInstall(ImageViewer)
var stdin_default = YhImage
export * from './src/image-meta.js'
export * from './src/image-viewer-meta.js'
export { YhImage, YhImageViewer, stdin_default as default }
