import { withInstall } from '@yh-ui/utils'
import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export const YhSkeleton = withInstall(Skeleton)
export const YhSkeletonItem = withInstall(SkeletonItem)

export default YhSkeleton

export * from './src/skeleton'

export type SkeletonInstance = InstanceType<typeof Skeleton>
export type SkeletonItemInstance = InstanceType<typeof SkeletonItem>
export type YhSkeletonInstance = SkeletonInstance
export type YhSkeletonItemInstance = SkeletonItemInstance
export type YhSkeletonProps = import('./src/skeleton').SkeletonProps
export type YhSkeletonSlots = import('./src/skeleton').SkeletonSlots
export type YhSkeletonItemProps = import('./src/skeleton').SkeletonItemProps
export type YhSkeletonItemVariant = import('./src/skeleton').SkeletonItemVariant
