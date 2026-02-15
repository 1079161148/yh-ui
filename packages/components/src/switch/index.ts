import { withInstall } from '@yh-ui/utils'
import Switch from './src/switch.vue'

export const YhSwitch = withInstall(Switch)
export default YhSwitch
export * from './src/switch'

export type SwitchInstance = InstanceType<typeof Switch>
