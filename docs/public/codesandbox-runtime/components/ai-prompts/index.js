import { withInstall } from '../../utils/index.js'
import AiPrompts from './src/ai-prompts.js'
const YhAiPrompts = withInstall(AiPrompts)
var stdin_default = YhAiPrompts
export * from './src/ai-prompts-meta.js'
export { YhAiPrompts, stdin_default as default }
