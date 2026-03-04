import { withInstall } from '@yh-ui/utils'
import AiAgentCard from './src/ai-agent-card.vue'

export const YhAiAgentCard = withInstall(AiAgentCard)
export default YhAiAgentCard

export * from './src/ai-agent-card'

export type AiAgentCardInstance = InstanceType<typeof AiAgentCard>
