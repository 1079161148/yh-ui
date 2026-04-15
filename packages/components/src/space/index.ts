import { withInstall } from '@yh-ui/utils'
import Space from './src/space.vue'

export const YhSpace = withInstall(Space)
export default YhSpace
export * from './src/space'
export type { SpaceProps, SpaceSlots } from './src/space'
export type SpaceInstance = InstanceType<typeof Space>
export type YhSpaceInstance = SpaceInstance
export type YhSpaceProps = import('./src/space').SpaceProps
export type YhSpaceSlots = import('./src/space').SpaceSlots
export type YhSpaceSize = import('./src/space').SpaceSize
export type YhSpaceDirection = import('./src/space').SpaceDirection
export type YhSpaceAlign = import('./src/space').SpaceAlign
export type YhSpaceJustify = import('./src/space').SpaceJustify
