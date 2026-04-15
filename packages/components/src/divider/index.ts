import { withInstall } from '@yh-ui/utils'
import Divider from './src/divider.vue'

export const YhDivider = withInstall(Divider)
export default YhDivider
export * from './src/divider'

export type DividerInstance = InstanceType<typeof Divider>
export type YhDividerInstance = DividerInstance
export type YhDividerProps = import('./src/divider').DividerProps
