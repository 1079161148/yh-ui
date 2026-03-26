import { withInstall } from '@yh-ui/utils'
import AiMermaid from './src/ai-mermaid.vue'

export const YhAiMermaid = withInstall(AiMermaid)
export default YhAiMermaid

export * from './src/ai-mermaid'

export type AiMermaidInstance = InstanceType<typeof AiMermaid>
export type YhAiMermaidInstance = AiMermaidInstance

export type YhAiMermaidProps = import('./src/ai-mermaid').AiMermaidProps
