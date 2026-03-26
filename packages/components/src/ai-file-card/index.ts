import { withInstall } from '@yh-ui/utils'
import AiFileCard from './src/ai-file-card.vue'

export const YhAiFileCard = withInstall(AiFileCard)
export default YhAiFileCard

export * from './src/ai-file-card'

export type AiFileCardInstance = InstanceType<typeof AiFileCard>
export type YhAiFileCardInstance = AiFileCardInstance

export type YhAiFileCardProps = import('./src/ai-file-card').AiFileCardProps
