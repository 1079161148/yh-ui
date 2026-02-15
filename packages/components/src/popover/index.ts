import { withInstall } from '@yh-ui/utils'
import Popover from './src/popover.vue'

export const YhPopover = withInstall(Popover)
export default YhPopover

export * from './src/popover'

export type PopoverInstance = InstanceType<typeof Popover>
