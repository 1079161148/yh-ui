import { withInstall } from '@yh-ui/utils'
import AiChat from './src/ai-chat.vue'

export const YhAiChat = withInstall(AiChat)
export default YhAiChat

export * from './src/ai-chat'

export type AiChatInstance = InstanceType<typeof AiChat>
export type YhAiChatInstance = AiChatInstance
export type YhAiChatProps = import('./src/ai-chat').AiChatProps
export type YhAiChatEmits = import('./src/ai-chat').AiChatEmits
export type YhAiChatSlots = import('./src/ai-chat').AiChatSlots
export type YhAiChatMessage = import('./src/ai-chat').AiChatMessage
