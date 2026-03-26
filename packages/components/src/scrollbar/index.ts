import { withInstall } from '@yh-ui/utils'
import Scrollbar from './src/scrollbar.vue'

export const YhScrollbar = withInstall(Scrollbar)
export default YhScrollbar

export * from './src/scrollbar'

export type ScrollbarInstance = InstanceType<typeof Scrollbar>
export type YhScrollbarInstance = ScrollbarInstance

export type YhScrollbarProps = import('./src/scrollbar').ScrollbarProps
