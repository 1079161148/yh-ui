import { withInstall } from '@yh-ui/utils'
import Scrollbar from './src/scrollbar.vue'

export const YhScrollbar = withInstall(Scrollbar)
export default YhScrollbar

export * from './src/scrollbar'

export type ScrollbarInstance = InstanceType<typeof Scrollbar>
export type YhScrollbarInstance = ScrollbarInstance

export type YhScrollbarProps = import('./src/scrollbar').ScrollbarProps
export type YhScrollbarEmits = import('./src/scrollbar').ScrollbarEmits
export type YhScrollbarSlots = import('./src/scrollbar').ScrollbarSlots
export type YhScrollbarExpose = import('./src/scrollbar').ScrollbarExpose
export type YhScrollbarScrollPayload = import('./src/scrollbar').ScrollbarScrollPayload
export type YhScrollbarScrollToArg = import('./src/scrollbar').ScrollbarScrollToArg
