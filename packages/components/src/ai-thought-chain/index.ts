import { withInstall } from '@yh-ui/utils'
import AiThoughtChain from './src/ai-thought-chain.vue'

export const YhAiThoughtChain = withInstall(AiThoughtChain)
export default YhAiThoughtChain

export * from './src/ai-thought-chain'

export type AiThoughtChainInstance = InstanceType<typeof AiThoughtChain>
export type YhAiThoughtChainInstance = AiThoughtChainInstance
export type YhAiThoughtChainProps = import('./src/ai-thought-chain').AiThoughtChainProps
export type YhAiThoughtChainEmits = import('./src/ai-thought-chain').AiThoughtChainEmits
export type YhAiThoughtChainSlots = import('./src/ai-thought-chain').AiThoughtChainSlots
export type YhAiThoughtStatus = import('./src/ai-thought-chain').AiThoughtStatus
export type YhAiThoughtItem = import('./src/ai-thought-chain').AiThoughtItem
