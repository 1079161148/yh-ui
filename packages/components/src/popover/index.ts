import { withInstall } from '@yh-ui/utils'
import Popover from './src/popover.vue'

export const YhPopover = withInstall(Popover)
export default YhPopover

export * from './src/popover'

export type PopoverInstance = InstanceType<typeof Popover>
export type YhPopoverInstance = PopoverInstance
export type YhPopoverProps = import('./src/popover').PopoverProps
export type YhPopoverEmits = import('./src/popover').PopoverEmits
export type YhPopoverSlots = import('./src/popover').PopoverSlots
export type YhPopoverExpose = import('./src/popover').PopoverExpose
export type YhPopoverTrigger = import('./src/popover').PopoverTrigger
