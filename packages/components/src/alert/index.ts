import { withInstall } from '@yh-ui/utils'
import Alert from './src/alert.vue'

export const YhAlert = withInstall(Alert)
export default YhAlert

export * from './src/alert'

export type AlertInstance = InstanceType<typeof Alert>
export type YhAlertInstance = AlertInstance
export type YhAlertProps = import('./src/alert').AlertProps
export type YhAlertEmits = import('./src/alert').AlertEmits
export type YhAlertSlots = import('./src/alert').AlertSlots
export type YhAlertType = import('./src/alert').AlertType
export type YhAlertEffect = import('./src/alert').AlertEffect
