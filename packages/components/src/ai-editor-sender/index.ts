import { withInstall } from '@yh-ui/utils'
import AiEditorSender from './src/ai-editor-sender.vue'

export const YhAiEditorSender = withInstall(AiEditorSender)
export default YhAiEditorSender

export * from './src/ai-editor-sender'

export type AiEditorSenderInstance = InstanceType<typeof AiEditorSender>
export type YhAiEditorSenderInstance = AiEditorSenderInstance
export type YhAiEditorSenderProps = import('./src/ai-editor-sender').AiEditorSenderProps
export type YhAiEditorSenderEmits = import('./src/ai-editor-sender').AiEditorSenderEmits
export type YhAiEditorSenderSlots = import('./src/ai-editor-sender').AiEditorSenderSlots
export type YhAiEditorSenderExpose = import('./src/ai-editor-sender').AiEditorSenderExpose
export type YhAiEditorAttachmentItem = import('./src/ai-editor-sender').AiEditorAttachmentItem
export type YhAiCommandItem = import('./src/ai-editor-sender').AiCommandItem
export type YhCommandPanelPosition = import('./src/ai-editor-sender').CommandPanelPosition
export type YhCommandPanelAlign = import('./src/ai-editor-sender').CommandPanelAlign
