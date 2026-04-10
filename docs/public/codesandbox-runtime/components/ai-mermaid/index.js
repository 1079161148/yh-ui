import { withInstall } from '../../utils/index.js'
import AiMermaid from './src/ai-mermaid.js'
const YhAiMermaid = withInstall(AiMermaid)
var stdin_default = YhAiMermaid
export * from './src/ai-mermaid.js'
export { YhAiMermaid, stdin_default as default }
