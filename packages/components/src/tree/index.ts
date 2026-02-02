import { withInstall } from '@yh-ui/utils'
import Tree from './src/tree.vue'
import TreeNode from './src/tree-node.vue'

export const YhTree = withInstall(Tree)
export const YhTreeNode = withInstall(TreeNode)
export default YhTree

export * from './src/tree'
