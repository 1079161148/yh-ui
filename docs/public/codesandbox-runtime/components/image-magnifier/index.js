import { withInstall } from '../../utils/index.js'
import ImageMagnifier from './src/image-magnifier.js'
const YhImageMagnifier = withInstall(ImageMagnifier)
var stdin_default = YhImageMagnifier
export * from './src/image-magnifier.js'
export { YhImageMagnifier, stdin_default as default }
