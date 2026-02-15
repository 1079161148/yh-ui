import { withInstall } from '@yh-ui/utils'
import Marquee from './src/marquee.vue'

export const YhMarquee = withInstall(Marquee)
export default YhMarquee

export * from './src/marquee'

export type MarqueeInstance = InstanceType<typeof Marquee>
