import { withInstall } from '@yh-ui/utils'
import TreeSelect from './src/tree-select.vue'

export const YhTreeSelect = withInstall(TreeSelect)
export default YhTreeSelect

export * from './src/tree-select'

export type TreeSelectInstance = InstanceType<typeof TreeSelect>
export type YhTreeSelectInstance = TreeSelectInstance
export type YhTreeSelectProps = import('./src/tree-select').TreeSelectProps
export type YhTreeSelectEmits = import('./src/tree-select').TreeSelectEmits
export type YhTreeSelectNode = import('./src/tree-select').TreeSelectNode
export type YhTreeOption = import('./src/tree-select').TreeOption
export type YhTreeKey = import('./src/tree-select').TreeKey
export type YhTreeCheckedInfo = import('./src/tree-select').TreeCheckedInfo
export type YhTreePropsAlias = import('./src/tree-select').TreePropsAlias
