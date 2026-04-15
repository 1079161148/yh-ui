import { withInstall } from '@yh-ui/utils'
import Tree from './src/tree.vue'
import TreeNode from './src/tree-node.vue'

export const YhTree = withInstall(Tree)
export const YhTreeNode = withInstall(TreeNode)
export default YhTree

export * from './src/tree'

export type TreeInstance = InstanceType<typeof Tree>
export type TreeNodeInstance = InstanceType<typeof TreeNode>
export type YhTreeInstance = TreeInstance
export type YhTreeNodeInstance = TreeNodeInstance
export type YhTreeProps = import('./src/tree').TreeProps
export type YhTreeEmits = import('./src/tree').TreeEmits
export type YhTreeNodeData = import('./src/tree').TreeNodeData
export type YhTreeNode = import('./src/tree').TreeNode
export type YhTreeNodeSlotData = import('./src/tree').TreeNodeSlotData
