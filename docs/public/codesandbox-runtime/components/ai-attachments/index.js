import { withInstall } from '../../utils/index.js'
import AiAttachments from './src/ai-attachments.js'
const YhAiAttachments = withInstall(AiAttachments)
var stdin_default = YhAiAttachments
export * from './src/ai-attachments-meta.js'
export { YhAiAttachments, stdin_default as default }
