import { withInstall } from '@yh-ui/utils'
import Watermark from './src/watermark.vue'

export const YhWatermark = withInstall(Watermark)
export default YhWatermark

export * from './src/watermark'

export type WatermarkInstance = InstanceType<typeof Watermark>
export type YhWatermarkInstance = WatermarkInstance
export type YhWatermarkProps = import('./src/watermark').WatermarkProps
export type YhWatermarkFont = import('./src/watermark').WatermarkFont
export type YhWatermarkSlots = import('./src/watermark').WatermarkSlots
export type YhWatermarkExpose = import('./src/watermark').WatermarkExpose
