import { withInstall } from '@yh-ui/utils'
import Waterfall from './src/waterfall.vue'

export const YhWaterfall = withInstall(Waterfall)
export default YhWaterfall

export * from './src/waterfall'

/** 泛型组件无法直接使用 InstanceType，手动定义暴露 API */
export interface WaterfallInstance {
  /** 触发重新布局 */
  layout: () => void
}

export type YhWaterfallInstance = WaterfallInstance
export type YhWaterfallCols = import('./src/waterfall').WaterfallCols
export type YhWaterfallItemBase = import('./src/waterfall').WaterfallItemBase
export type YhWaterfallProps = import('./src/waterfall').WaterfallProps
export type YhWaterfallSlots = import('./src/waterfall').WaterfallSlots
export type YhWaterfallExpose = import('./src/waterfall').WaterfallExpose
