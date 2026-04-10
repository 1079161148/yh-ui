import { withInstall } from '../../utils/index.js'
import AiSender from './src/ai-sender.js'
const YhAiSender = withInstall(AiSender)
var stdin_default = YhAiSender
export * from './src/ai-sender.js'
export { YhAiSender, stdin_default as default }
