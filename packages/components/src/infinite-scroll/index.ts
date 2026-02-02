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
