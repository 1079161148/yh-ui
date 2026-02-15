import { withInstall } from '@yh-ui/utils'
import Row from './src/row.vue'

export const YhRow = withInstall(Row)
export default YhRow
export * from './src/row'

export type RowInstance = InstanceType<typeof Row>
