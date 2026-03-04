import { withInstall } from '@yh-ui/utils'
import AiCodeEditor from './src/ai-code-editor.vue'

export const YhAiCodeEditor = withInstall(AiCodeEditor)
export default YhAiCodeEditor

export * from './src/ai-code-editor'

export type AiCodeEditorInstance = InstanceType<typeof AiCodeEditor>
