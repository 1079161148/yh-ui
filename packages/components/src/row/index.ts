import { withInstall } from '@yh-ui/utils'
import Row from './src/row.vue'

export const YhRow = withInstall(Row)
export default YhRow
export * from './src/row'

export type RowInstance = InstanceType<typeof Row>
export type YhRowJustify = import('./src/row').RowJustify
export type YhRowAlign = import('./src/row').RowAlign
export type YhRowProps = import('./src/row').RowProps
export type YhRowSlots = import('./src/row').RowSlots
export type YhRowContext = import('./src/row').RowContext
export type YhRowInstance = RowInstance
