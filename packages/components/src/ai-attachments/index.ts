import { withInstall } from '@yh-ui/utils'
import AiAttachments from './src/ai-attachments.vue'

export const YhAiAttachments = withInstall(AiAttachments)
export default YhAiAttachments

export * from './src/ai-attachments'

export type AiAttachmentsInstance = InstanceType<typeof AiAttachments>
export type YhAiAttachmentsInstance = AiAttachmentsInstance

export type YhAiAttachmentsProps = import('./src/ai-attachments').AiAttachmentsProps
export type YhAiAttachmentsEmits = import('./src/ai-attachments').AiAttachmentsEmits
export type YhAiAttachmentsSlots = import('./src/ai-attachments').AiAttachmentsSlots
export type YhOverflowMode = import('./src/ai-attachments').OverflowMode
export type YhAttachmentItem = import('./src/ai-attachments').AttachmentItem
export type YhPlaceholderType = import('./src/ai-attachments').PlaceholderType
