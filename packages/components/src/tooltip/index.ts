import { withInstall } from '@yh-ui/utils'
import Tooltip from './src/tooltip.vue'

export const YhTooltip = withInstall(Tooltip)
export default YhTooltip

export * from './src/tooltip'

export type TooltipInstance = InstanceType<typeof Tooltip>
export type YhTooltipInstance = TooltipInstance
export type YhTooltipProps = import('./src/tooltip').TooltipProps
export type YhTooltipEmits = import('./src/tooltip').TooltipEmits
export type YhTooltipSlots = import('./src/tooltip').TooltipSlots
export type YhTooltipExpose = import('./src/tooltip').TooltipExpose
export type YhTooltipPlacement = import('./src/tooltip').TooltipPlacement
export type YhTooltipTrigger = import('./src/tooltip').TooltipTrigger
