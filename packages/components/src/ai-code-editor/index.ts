import { withInstall } from '@yh-ui/utils'
import AiCodeEditor from './src/ai-code-editor.vue'

export const YhAiCodeEditor = withInstall(AiCodeEditor)
export default YhAiCodeEditor

export * from './src/ai-code-editor'

export type AiCodeEditorInstance = InstanceType<typeof AiCodeEditor>
export type YhAiCodeEditorInstance = AiCodeEditorInstance
export type YhAiCodeEditorProps = import('./src/ai-code-editor').AiCodeEditorProps
export type YhAiCodeEditorEmits = import('./src/ai-code-editor').AiCodeEditorEmits
export type YhAiCodeEditorSlots = import('./src/ai-code-editor').AiCodeEditorSlots
export type YhAiCodeEditorExpose = import('./src/ai-code-editor').AiCodeEditorExpose
