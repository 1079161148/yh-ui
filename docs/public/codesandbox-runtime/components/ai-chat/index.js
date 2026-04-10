import { withInstall } from '../../utils/index.js'
import AiChat from './src/ai-chat.js'
const YhAiChat = withInstall(AiChat)
var stdin_default = YhAiChat
export * from './src/ai-chat.js'
export { YhAiChat, stdin_default as default }
