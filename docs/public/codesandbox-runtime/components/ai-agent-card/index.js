import { withInstall } from '../../utils/index.js'
import AiAgentCard from './src/ai-agent-card.js'
const YhAiAgentCard = withInstall(AiAgentCard)
var stdin_default = YhAiAgentCard
export * from './src/ai-agent-card.js'
export { YhAiAgentCard, stdin_default as default }
