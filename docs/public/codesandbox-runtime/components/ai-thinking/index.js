import { withInstall } from '../../utils/index.js'
import AiThinking from './src/ai-thinking.js'
const YhAiThinking = withInstall(AiThinking)
var stdin_default = YhAiThinking
export * from './src/ai-thinking.js'
export { YhAiThinking, stdin_default as default }
