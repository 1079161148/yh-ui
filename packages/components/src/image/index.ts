/**
 * Image Component
 * @description 图片组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Image from './src/image.vue'
import ImageViewer from './src/image-viewer.vue'

export const YhImage = withInstall(Image)
export const YhImageViewer = withInstall(ImageViewer)

export default YhImage

export * from './src/image'
export * from './src/image-viewer'

export type ImageInstance = InstanceType<typeof Image>
export type ImageViewerInstance = InstanceType<typeof ImageViewer>
export type YhImageInstance = ImageInstance
export type YhImageViewerInstance = ImageViewerInstance
export type YhImageProps = import('./src/image').ImageProps
export type YhImageEmits = import('./src/image').ImageEmits
export type YhImageSlots = import('./src/image').ImageSlots
export type YhImageViewerProps = import('./src/image-viewer').ImageViewerProps
export type YhImageViewerEmits = import('./src/image-viewer').ImageViewerEmits
export type YhImageViewerSlots = import('./src/image-viewer').ImageViewerSlots
export type YhImageViewerExpose = import('./src/image-viewer').ImageViewerExpose
