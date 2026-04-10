import { withInstall } from '../../utils/index.js'
import AiConversations from './src/ai-conversations.js'
const YhAiConversations = withInstall(AiConversations)
var stdin_default = YhAiConversations
export * from './src/ai-conversations.js'
export { YhAiConversations, stdin_default as default }
