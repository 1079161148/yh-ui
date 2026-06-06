import { withInstall } from '@yh-ui/utils'
import AiWelcome from './src/ai-welcome.vue'

export const YhAiWelcome = withInstall(AiWelcome)
export default YhAiWelcome

export * from './src/ai-welcome'

export type AiWelcomeInstance = InstanceType<typeof AiWelcome>
export type YhAiWelcomeInstance = AiWelcomeInstance
export type YhAiWelcomeProps = import('./src/ai-welcome').AiWelcomeProps
export type YhAiWelcomeEmits = import('./src/ai-welcome').AiWelcomeEmits
export type YhAiWelcomeSlots = import('./src/ai-welcome').AiWelcomeSlots
export type YhAiSuggestion = import('./src/ai-welcome').AiSuggestion
