import { withInstall } from '@yh-ui/utils'
import AiBubble from './src/ai-bubble.vue'

export const YhAiBubble = withInstall(AiBubble)
export default YhAiBubble

export * from './src/ai-bubble'

export type AiBubbleInstance = InstanceType<typeof AiBubble>
export type YhAiBubbleInstance = AiBubbleInstance
export type YhAiBubbleProps = import('./src/ai-bubble').AiBubbleProps
export type YhAiBubbleSlots = import('./src/ai-bubble').AiBubbleSlots
export type YhAiCitation = import('./src/ai-bubble').AiCitation
export type YhAiMultimodal = import('./src/ai-bubble').AiMultimodal
export type YhAiCodeBlockOptions = import('./src/ai-bubble').AiCodeBlockOptions
export type YhAiMermaidConfig = import('./src/ai-bubble').AiMermaidConfig
export type YhAiStructuredTableData = import('./src/ai-bubble').AiStructuredTableData
export type YhAiLatexOptions = import('./src/ai-bubble').AiLatexOptions
export type YhAiFilePreviewOptions = import('./src/ai-bubble').AiFilePreviewOptions
export type YhAiStructuredData = import('./src/ai-bubble').AiStructuredData
export type YhAiMarkdownOptions = import('./src/ai-bubble').AiMarkdownOptions
