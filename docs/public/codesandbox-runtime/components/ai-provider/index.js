import { withInstall } from '../../utils/index.js'
import AiProvider from './src/ai-provider.js'
const YhAiProvider = withInstall(AiProvider)
var stdin_default = YhAiProvider
export * from './src/ai-provider-meta.js'
export * from './src/use-ai-provider.js'
export { YhAiProvider, stdin_default as default }
