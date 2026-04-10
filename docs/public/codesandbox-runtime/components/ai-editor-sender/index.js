import { withInstall } from '../../utils/index.js'
import AiEditorSender from './src/ai-editor-sender.js'
const YhAiEditorSender = withInstall(AiEditorSender)
var stdin_default = YhAiEditorSender
export * from './src/ai-editor-sender.js'
export { YhAiEditorSender, stdin_default as default }
