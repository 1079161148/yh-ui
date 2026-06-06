import { withInstall } from '@yh-ui/utils'
import AiActionGroup from './src/ai-action-group.vue'

export const YhAiActionGroup = withInstall(AiActionGroup)
export default YhAiActionGroup

export * from './src/ai-action-group'

export type AiActionGroupInstance = InstanceType<typeof AiActionGroup>
export type YhAiActionGroupInstance = AiActionGroupInstance
export type YhAiActionGroupProps = import('./src/ai-action-group').AiActionGroupProps
export type YhAiActionGroupEmits = import('./src/ai-action-group').AiActionGroupEmits
export type YhAiActionGroupSlots = import('./src/ai-action-group').AiActionGroupSlots
export type YhAiActionItem = import('./src/ai-action-group').ActionItem
