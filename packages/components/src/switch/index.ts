import { withInstall } from '@yh-ui/utils'
import Switch from './src/switch.vue'

export const YhSwitch = withInstall(Switch)
export default YhSwitch
export * from './src/switch'

export type SwitchInstance = InstanceType<typeof Switch>
export type YhSwitchInstance = SwitchInstance
export type YhSwitchProps = import('./src/switch').SwitchProps
export type YhSwitchEmits = import('./src/switch').SwitchEmits
export type YhSwitchSlots = import('./src/switch').SwitchSlots
export type YhSwitchExpose = import('./src/switch').SwitchExpose
