import { withInstall, withInstallDirective } from '@yh-ui/utils'
import InfiniteScroll from './src/infinite-scroll.vue'
import { vInfiniteScroll } from './src/directive'

export const YhInfiniteScroll = withInstall(InfiniteScroll, {
  directive: vInfiniteScroll
})

export const vYhInfiniteScroll = withInstallDirective(vInfiniteScroll, 'infinite-scroll')

export default YhInfiniteScroll

export * from './src/infinite-scroll'
export * from './src/directive'

export type InfiniteScrollInstance = InstanceType<typeof InfiniteScroll>
export type YhInfiniteScrollInstance = InfiniteScrollInstance
export type YhInfiniteScrollProps = import('./src/infinite-scroll').InfiniteScrollProps
export type YhInfiniteScrollEmits = import('./src/infinite-scroll').InfiniteScrollEmits
export type YhInfiniteScrollSlots = import('./src/infinite-scroll').InfiniteScrollSlots
export type YhInfiniteScrollExpose = import('./src/infinite-scroll').InfiniteScrollExpose
