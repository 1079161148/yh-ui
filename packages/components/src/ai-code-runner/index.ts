import { withInstall } from '@yh-ui/utils'
import AiCodeRunner from './src/ai-code-runner.vue'

export const YhAiCodeRunner = withInstall(AiCodeRunner)
export default YhAiCodeRunner

export * from './src/ai-code-runner'

export type AiCodeRunnerInstance = InstanceType<typeof AiCodeRunner>
export type YhAiCodeRunnerInstance = AiCodeRunnerInstance
export type YhAiCodeRunnerProps = import('./src/ai-code-runner').AiCodeRunnerProps
export type YhAiCodeRunnerEmits = import('./src/ai-code-runner').AiCodeRunnerEmits
export type YhAiCodeRunnerSlots = import('./src/ai-code-runner').AiCodeRunnerSlots
export type YhAiCodeRunnerExpose = import('./src/ai-code-runner').AiCodeRunnerExpose
