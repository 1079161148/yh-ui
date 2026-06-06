import { withInstall } from '@yh-ui/utils'
import AiCodeBlock from './src/ai-code-block.vue'

export const YhAiCodeBlock = withInstall(AiCodeBlock)
export default YhAiCodeBlock

export * from './src/ai-code-block'

export type AiCodeBlockInstance = InstanceType<typeof AiCodeBlock>
export type YhAiCodeBlockInstance = AiCodeBlockInstance
export type YhAiCodeBlockProps = import('./src/ai-code-block').AiCodeBlockProps
export type YhAiCodeBlockEmits = import('./src/ai-code-block').AiCodeBlockEmits
export type YhAiCodeBlockSlots = import('./src/ai-code-block').AiCodeBlockSlots
