import { withInstall } from '@yh-ui/utils'
import AiFileCard from './src/ai-file-card.vue'

export const YhAiFileCard = withInstall(AiFileCard)
export default YhAiFileCard

export * from './src/ai-file-card'

export type AiFileCardInstance = InstanceType<typeof AiFileCard>
export type YhAiFileCardInstance = AiFileCardInstance

export type YhAiFileCardProps = import('./src/ai-file-card').AiFileCardProps
export type YhAiFileCardEmits = import('./src/ai-file-card').AiFileCardEmits
export type YhAiFileCardSlots = import('./src/ai-file-card').AiFileCardSlots
export type YhPresetFileIcons = import('./src/ai-file-card').PresetFileIcons
export type YhFileCardType = import('./src/ai-file-card').FileCardType
export type YhFileCardSize = import('./src/ai-file-card').FileCardSize
export type YhFileCardProps = import('./src/ai-file-card').FileCardProps
export type YhFileCardListItem = import('./src/ai-file-card').FileCardListItem
export type YhFileCardListProps = import('./src/ai-file-card').FileCardListProps
