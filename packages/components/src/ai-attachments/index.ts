import { withInstall } from '@yh-ui/utils'
import AiAttachments from './src/ai-attachments.vue'

export const YhAiAttachments = withInstall(AiAttachments)
export default YhAiAttachments

export * from './src/ai-attachments'

export type AiAttachmentsInstance = InstanceType<typeof AiAttachments>
export type YhAiAttachmentsInstance = AiAttachmentsInstance

export type YhAiAttachmentsProps = import('./src/ai-attachments').AiAttachmentsProps
