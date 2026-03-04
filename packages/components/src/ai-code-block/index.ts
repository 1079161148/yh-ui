import { withInstall } from '@yh-ui/utils'
import AiCodeBlock from './src/ai-code-block.vue'

export const YhAiCodeBlock = withInstall(AiCodeBlock)
export default YhAiCodeBlock

export * from './src/ai-code-block'

export type AiCodeBlockInstance = InstanceType<typeof AiCodeBlock>
