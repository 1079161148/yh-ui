import { withInstall } from '../../utils/index.js'
import Tree from './src/tree.js'
import TreeNode from './src/tree-node.js'
const YhTree = withInstall(Tree)
const YhTreeNode = withInstall(TreeNode)
var stdin_default = YhTree
export * from './src/tree.js'
export { YhTree, YhTreeNode, stdin_default as default }
