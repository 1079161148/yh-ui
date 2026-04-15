import { withInstall } from '@yh-ui/utils'
import Cascader from './src/cascader.vue'
import CascaderPanel from './src/cascader-panel.vue'

export const YhCascader = withInstall(Cascader)
export const YhCascaderPanel = withInstall(CascaderPanel)

export default YhCascader

export * from './src/cascader'

export type CascaderInstance = InstanceType<typeof Cascader>
export type CascaderPanelInstance = InstanceType<typeof CascaderPanel>
export type YhCascaderInstance = CascaderInstance
export type YhCascaderPanelInstance = CascaderPanelInstance
export type YhCascaderProps = import('./src/cascader').CascaderProps
export type YhCascaderEmits = import('./src/cascader').CascaderEmits
export type YhCascaderExpose = import('./src/cascader').CascaderExpose
export type YhCascaderOption = import('./src/cascader').CascaderOption
