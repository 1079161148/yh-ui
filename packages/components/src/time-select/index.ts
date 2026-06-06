/**
 * TimeSelect Component
 * @description 时间选择器组件导出
 */

import { withInstall } from '@yh-ui/utils'
import TimeSelect from './src/time-select.vue'

export const YhTimeSelect = withInstall(TimeSelect)

export default YhTimeSelect

export * from './src/time-select'

export type TimeSelectInstance = InstanceType<typeof TimeSelect>
export type YhTimeSelectInstance = TimeSelectInstance
export type YhTimeSelectProps = import('./src/time-select').TimeSelectProps
export type YhTimeSelectEmits = import('./src/time-select').TimeSelectEmits
export type YhTimeSelectSlots = import('./src/time-select').TimeSelectSlots
export type YhTimeSelectExpose = import('./src/time-select').TimeSelectExpose
export type YhTimeSelectSize = import('./src/time-select').TimeSelectSize
export type YhTimeSelectOption = import('./src/time-select').TimeOption
