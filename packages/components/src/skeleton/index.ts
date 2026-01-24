import { withInstall } from '@yh-ui/utils'
import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export const YhSkeleton = withInstall(Skeleton)
export const YhSkeletonItem = withInstall(SkeletonItem)

export default YhSkeleton

export * from './src/skeleton'
