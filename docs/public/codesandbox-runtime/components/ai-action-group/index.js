import { withInstall } from '../../utils/index.js'
import AiActionGroup from './src/ai-action-group.js'
const YhAiActionGroup = withInstall(AiActionGroup)
var stdin_default = YhAiActionGroup
export * from './src/ai-action-group-meta.js'
export { YhAiActionGroup, stdin_default as default }
