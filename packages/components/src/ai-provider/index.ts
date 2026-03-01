import { withInstall } from '@yh-ui/utils'
import AiProvider from './src/ai-provider.vue'

export const YhAiProvider = withInstall(AiProvider)
export default YhAiProvider

export * from './src/ai-provider'
export * from './src/use-ai-provider'
