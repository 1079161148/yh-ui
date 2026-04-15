import { withInstall } from '@yh-ui/utils'
import AiSender from './src/ai-sender.vue'

export const YhAiSender = withInstall(AiSender)
export default YhAiSender

export * from './src/ai-sender'

export type AiSenderInstance = InstanceType<typeof AiSender>
export type YhAiSenderInstance = AiSenderInstance
export type YhAiSenderProps = import('./src/ai-sender').AiSenderProps
export type YhAiSenderEmits = import('./src/ai-sender').AiSenderEmits
export type YhAiSenderSlots = import('./src/ai-sender').AiSenderSlots
export type YhAiCommand = import('./src/ai-sender').AiCommand
export type YhAiAttachment = import('./src/ai-sender').AiAttachment
