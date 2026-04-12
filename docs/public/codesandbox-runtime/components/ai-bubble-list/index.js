import { withInstall } from '../../utils/index.js'
import AiBubbleList from './src/ai-bubble-list.js'
const YhAiBubbleList = withInstall(AiBubbleList)
var stdin_default = YhAiBubbleList
export * from './src/ai-bubble-list-meta.js'
export { YhAiBubbleList, stdin_default as default }
