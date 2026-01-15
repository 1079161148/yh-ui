/**
 * Cascader Component
 * @description 级联选择器组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Cascader from './src/cascader.vue'
import CascaderPanel from './src/cascader-panel.vue'

export const YhCascader = withInstall(Cascader)
export const YhCascaderPanel = withInstall(CascaderPanel)

export default YhCascader

export * from './src/cascader'

export type CascaderInstance = InstanceType<typeof Cascader>
export type CascaderPanelInstance = InstanceType<typeof CascaderPanel>
