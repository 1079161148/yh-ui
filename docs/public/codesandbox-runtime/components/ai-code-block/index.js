import { withInstall } from '../../utils/index.js'
import AiCodeBlock from './src/ai-code-block.js'
const YhAiCodeBlock = withInstall(AiCodeBlock)
var stdin_default = YhAiCodeBlock
export * from './src/ai-code-block-meta.js'
export { YhAiCodeBlock, stdin_default as default }
