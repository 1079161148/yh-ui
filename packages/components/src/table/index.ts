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
export type YhTableInstance = TableInstance
export type YhTableColumnInstance = TableColumnInstance
export type YhTableProps = import('./src/table').TableProps
export type YhTableEmits = import('./src/table').TableEmits
export type YhTableExpose = import('./src/table').TableExpose
export type YhTableColumn = import('./src/table').TableColumn
export type YhTablePaginationConfig = import('./src/table').TablePaginationConfig
export type YhTableSelectionConfig = import('./src/table').TableSelectionConfig
export type YhTableExpandConfig = import('./src/table').TableExpandConfig
export type YhTableTreeConfig = import('./src/table').TableTreeConfig
export type YhTableToolbarConfig = import('./src/table').TableToolbarConfig
export type YhTableExportConfig = import('./src/table').TableExportConfig
export type YhTableLoadingConfig = import('./src/table').TableLoadingConfig
export type YhTableEmptyConfig = import('./src/table').TableEmptyConfig
