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
