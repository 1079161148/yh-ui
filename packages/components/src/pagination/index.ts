/**
 * Pagination Component
 * @description 分页组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Pagination from './src/pagination.vue'

export const YhPagination = withInstall(Pagination)

export default YhPagination

export * from './src/pagination'

export type PaginationInstance = InstanceType<typeof Pagination>
export type YhPaginationInstance = PaginationInstance
export type YhPaginationProps = import('./src/pagination').PaginationProps
export type YhPaginationEmits = import('./src/pagination').PaginationEmits
export type YhPaginationExpose = import('./src/pagination').PaginationExpose
export type YhPaginationSlots = import('./src/pagination').PaginationSlots
export type YhPaginationLayout = import('./src/pagination').PaginationLayout
