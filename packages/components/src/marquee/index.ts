import { withInstall } from '@yh-ui/utils'
import Marquee from './src/marquee.vue'

export const YhMarquee = withInstall(Marquee)
export default YhMarquee

export * from './src/marquee'

export type MarqueeInstance = InstanceType<typeof Marquee>
export type YhMarqueeInstance = MarqueeInstance
export type YhMarqueeProps = import('./src/marquee').MarqueeProps
export type YhMarqueeEmits = import('./src/marquee').MarqueeEmits
export type YhMarqueeSlots = import('./src/marquee').MarqueeSlots
export type YhMarqueeExpose = import('./src/marquee').MarqueeExpose
export type YhMarqueeDirection = import('./src/marquee').MarqueeDirection
