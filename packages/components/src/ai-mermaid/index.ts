import { withInstall } from '@yh-ui/utils'
import AiMermaid from './src/ai-mermaid.vue'

export const YhAiMermaid = withInstall(AiMermaid)
export default YhAiMermaid

export * from './src/ai-mermaid'

export type AiMermaidInstance = InstanceType<typeof AiMermaid>
export type YhAiMermaidInstance = AiMermaidInstance

export type YhAiMermaidProps = import('./src/ai-mermaid').AiMermaidProps
export type YhAiMermaidEmits = import('./src/ai-mermaid').AiMermaidEmits
export type YhAiMermaidSlots = import('./src/ai-mermaid').AiMermaidSlots
export type YhMermaidConfig = import('./src/ai-mermaid').MermaidConfig
export type YhMermaidActions = import('./src/ai-mermaid').MermaidActions
export type YhRenderType = import('./src/ai-mermaid').RenderType
