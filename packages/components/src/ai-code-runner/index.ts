import { withInstall } from '@yh-ui/utils'
import AiCodeRunner from './src/ai-code-runner.vue'

export const YhAiCodeRunner = withInstall(AiCodeRunner)
export default YhAiCodeRunner

export * from './src/ai-code-runner'

export type AiCodeRunnerInstance = InstanceType<typeof AiCodeRunner>
