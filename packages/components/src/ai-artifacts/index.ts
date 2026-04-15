import { withInstall } from '@yh-ui/utils'
import AiArtifacts from './src/ai-artifacts.vue'

export const YhAiArtifacts = withInstall(AiArtifacts)
export default YhAiArtifacts

export * from './src/ai-artifacts'

export type AiArtifactsInstance = InstanceType<typeof AiArtifacts>
export type YhAiArtifactsInstance = AiArtifactsInstance
export type YhAiArtifactsProps = import('./src/ai-artifacts').AiArtifactsProps
export type YhAiArtifactsEmits = import('./src/ai-artifacts').AiArtifactsEmits
export type YhAiArtifactsSlots = import('./src/ai-artifacts').AiArtifactsSlots
export type YhArtifactType = import('./src/ai-artifacts').ArtifactType
export type YhArtifactVersion = import('./src/ai-artifacts').ArtifactVersion
export type YhArtifactEChartsOption = import('./src/ai-artifacts').ArtifactEChartsOption
export type YhArtifactData = import('./src/ai-artifacts').ArtifactData
