import { withInstall } from '@yh-ui/utils'
import AiMention from './src/ai-mention.vue'

export const YhAiMention = withInstall(AiMention)
export default YhAiMention

export * from './src/ai-mention'

export type AiMentionInstance = InstanceType<typeof AiMention>
export type YhAiMentionInstance = AiMentionInstance
export type YhAiMentionProps = import('./src/ai-mention').AiMentionProps
export type YhAiMentionEmits = import('./src/ai-mention').AiMentionEmits
export type YhAiMentionSlots = import('./src/ai-mention').AiMentionSlots
export type YhAiMentionExpose = import('./src/ai-mention').AiMentionExpose
export type YhAiMentionType = import('./src/ai-mention').AiMentionType
export type YhAiMentionOption = import('./src/ai-mention').AiMentionOption
export type YhAiMentionFileNode = import('./src/ai-mention').AiMentionFileNode
export type YhAiMentionFileLoader = import('./src/ai-mention').AiMentionFileLoader
