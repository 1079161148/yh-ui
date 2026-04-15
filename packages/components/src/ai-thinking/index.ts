import { withInstall } from '@yh-ui/utils'
import AiThinking from './src/ai-thinking.vue'

export const YhAiThinking = withInstall(AiThinking)
export default YhAiThinking

export * from './src/ai-thinking'

export type AiThinkingInstance = InstanceType<typeof AiThinking>
export type YhAiThinkingInstance = AiThinkingInstance
export type YhAiThinkingProps = import('./src/ai-thinking').AiThinkingProps
export type YhAiThinkingEmits = import('./src/ai-thinking').AiThinkingEmits
export type YhAiThinkingSlots = import('./src/ai-thinking').AiThinkingSlots
export type YhAiThinkingStatus = import('./src/ai-thinking').AiThinkingStatus
