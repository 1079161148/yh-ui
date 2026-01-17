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
