import { withInstall } from '@yh-ui/utils'
import Badge from './src/badge.vue'

export const YhBadge = withInstall(Badge)
export default YhBadge

export * from './src/badge'

export type BadgeInstance = InstanceType<typeof Badge>
export type YhBadgeInstance = BadgeInstance
export type YhBadgeProps = import('./src/badge').BadgeProps
export type YhBadgeSlots = import('./src/badge').BadgeSlots
export type YhBadgeType = import('./src/badge').BadgeType
