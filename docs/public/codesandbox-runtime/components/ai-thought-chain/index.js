import { withInstall } from '../../utils/index.js'
import AiThoughtChain from './src/ai-thought-chain.js'
const YhAiThoughtChain = withInstall(AiThoughtChain)
var stdin_default = YhAiThoughtChain
export * from './src/ai-thought-chain-meta.js'
export { YhAiThoughtChain, stdin_default as default }
