import { withInstall } from '@yh-ui/utils'
import AiAgentCard from './src/ai-agent-card.vue'

export const YhAiAgentCard = withInstall(AiAgentCard)
export default YhAiAgentCard

export * from './src/ai-agent-card'

export type AiAgentCardInstance = InstanceType<typeof AiAgentCard>
export type YhAiAgentCardInstance = AiAgentCardInstance
export type YhAiAgentCardProps = import('./src/ai-agent-card').AiAgentCardProps
export type YhAiAgentCardEmits = import('./src/ai-agent-card').AiAgentCardEmits
export type YhAiAgentCardSlots = import('./src/ai-agent-card').AiAgentCardSlots
export type YhAgentCapability = import('./src/ai-agent-card').AgentCapability
export type YhAgentStats = import('./src/ai-agent-card').AgentStats
export type YhAgentData = import('./src/ai-agent-card').AgentData
