import { withInstall } from '../../utils/index.js'
import AiWelcome from './src/ai-welcome.js'
const YhAiWelcome = withInstall(AiWelcome)
var stdin_default = YhAiWelcome
export * from './src/ai-welcome.js'
export { YhAiWelcome, stdin_default as default }
