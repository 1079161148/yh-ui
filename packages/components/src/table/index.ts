/**
 * Table Component
 * @description 高性能表格组件导出
 */

import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Table from './src/table.vue'
import TableColumn from './src/table-column.vue'

export const YhTable = withInstall(Table, {
  TableColumn
})

export const YhTableColumn = withNoopInstall(TableColumn)

export default YhTable

export * from './src/table'

export type TableInstance = InstanceType<typeof Table>
export type TableColumnInstance = InstanceType<typeof TableColumn>
