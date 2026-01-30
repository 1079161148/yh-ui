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
