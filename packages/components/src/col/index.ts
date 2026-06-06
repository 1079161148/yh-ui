import { withInstall } from '@yh-ui/utils'
import Col from './src/col.vue'

export const YhCol = withInstall(Col)
export default YhCol
export * from './src/col'

export type ColInstance = InstanceType<typeof Col>
export type YhColResponsiveValue = import('./src/col').ColResponsiveValue
export type YhColProps = import('./src/col').ColProps
export type YhColSlots = import('./src/col').ColSlots
export type YhColInstance = ColInstance
