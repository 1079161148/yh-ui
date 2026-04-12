import { withInstall, withNoopInstall } from '../../utils/index.js'
import Table from './src/table.js'
import TableColumn from './src/table-column.js'
const YhTable = withInstall(Table, {
  TableColumn
})
const YhTableColumn = withNoopInstall(TableColumn)
var stdin_default = YhTable
export * from './src/table-meta.js'
export { YhTable, YhTableColumn, stdin_default as default }
