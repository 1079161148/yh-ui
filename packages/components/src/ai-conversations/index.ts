import { withInstall } from '@yh-ui/utils'
import AiConversations from './src/ai-conversations.vue'

export const YhAiConversations = withInstall(AiConversations)

export default YhAiConversations
export * from './src/ai-conversations'

export type AiConversationsInstance = InstanceType<typeof AiConversations>
export type YhAiConversationsInstance = AiConversationsInstance
export type YhAiConversationsProps = import('./src/ai-conversations').AiConversationsProps
export type YhAiConversationsEmits = import('./src/ai-conversations').AiConversationsEmits
export type YhAiConversationsSlots = import('./src/ai-conversations').AiConversationsSlots
export type YhAiConversationsExpose = import('./src/ai-conversations').AiConversationsExpose
