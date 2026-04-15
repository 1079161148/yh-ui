import { withInstall } from '@yh-ui/utils'
import AiPrompts from './src/ai-prompts.vue'

export const YhAiPrompts = withInstall(AiPrompts)

export default YhAiPrompts
export * from './src/ai-prompts'

export type AiPromptsInstance = InstanceType<typeof AiPrompts>
export type YhAiPromptsInstance = AiPromptsInstance
export type YhAiPromptsProps = import('./src/ai-prompts').AiPromptsProps
export type YhAiPromptsEmits = import('./src/ai-prompts').AiPromptsEmits
export type YhAiPromptsSlots = import('./src/ai-prompts').AiPromptsSlots
export type YhAiPromptItem = import('./src/ai-prompts').AiPromptItem
