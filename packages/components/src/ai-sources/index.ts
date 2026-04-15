import { withInstall } from '@yh-ui/utils'
import AiSources from './src/ai-sources.vue'

export const YhAiSources = withInstall(AiSources)
export default YhAiSources

export * from './src/ai-sources'

export type AiSourcesInstance = InstanceType<typeof AiSources>
export type YhAiSourcesInstance = AiSourcesInstance
export type YhAiSourcesProps = import('./src/ai-sources').AiSourcesProps
export type YhAiSourcesEmits = import('./src/ai-sources').AiSourcesEmits
export type YhAiSourcesSlots = import('./src/ai-sources').AiSourcesSlots
export type YhAiSourcesExpose = import('./src/ai-sources').AiSourcesExpose
export type YhAiSourceItem = import('./src/ai-sources').AiSourceItem
