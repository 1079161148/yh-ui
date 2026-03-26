import { withInstall } from '@yh-ui/utils'
import LuckyDraw from './src/lucky-draw.vue'

export const YhLuckyDraw = withInstall(LuckyDraw)
export default YhLuckyDraw

export * from './src/lucky-draw'

export type LuckyDrawInstance = InstanceType<typeof LuckyDraw>
export type YhLuckyDrawInstance = LuckyDrawInstance

export type YhLuckyDrawProps = import('./src/lucky-draw').LuckyDrawProps
