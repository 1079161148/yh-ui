import { withInstall } from '@yh-ui/utils'
import ImageMagnifier from './src/image-magnifier.vue'

export const YhImageMagnifier = withInstall(ImageMagnifier)
export default YhImageMagnifier

export * from './src/image-magnifier'

export type ImageMagnifierInstance = InstanceType<typeof ImageMagnifier>
export type YhImageMagnifierInstance = ImageMagnifierInstance

export type YhImageMagnifierProps = import('./src/image-magnifier').ImageMagnifierProps
export type YhImageMagnifierEmits = import('./src/image-magnifier').ImageMagnifierEmits
export type YhImageMagnifierSlots = import('./src/image-magnifier').ImageMagnifierSlots
export type YhImageMagnifierExpose = import('./src/image-magnifier').ImageMagnifierExpose
export type YhImageMagnifierImage = import('./src/image-magnifier').ImageMagnifierImage
export type YhImageMagnifierPosition = import('./src/image-magnifier').ImageMagnifierPosition
export type YhImageMagnifierMaskShape = import('./src/image-magnifier').ImageMagnifierMaskShape
