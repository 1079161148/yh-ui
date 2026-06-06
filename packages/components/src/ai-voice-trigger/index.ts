import { withInstall } from '@yh-ui/utils'
import AiVoiceTrigger from './src/ai-voice-trigger.vue'

export const YhAiVoiceTrigger = withInstall(AiVoiceTrigger)
export default YhAiVoiceTrigger

export * from './src/ai-voice-trigger'

export type AiVoiceTriggerInstance = InstanceType<typeof AiVoiceTrigger>
export type YhAiVoiceTriggerInstance = AiVoiceTriggerInstance
export type YhAiVoiceTriggerProps = import('./src/ai-voice-trigger').AiVoiceTriggerProps
export type YhAiVoiceTriggerEmits = import('./src/ai-voice-trigger').AiVoiceTriggerEmits
export type YhAiVoiceTriggerEmitMap = import('./src/ai-voice-trigger').AiVoiceTriggerEmitMap
export type YhAiVoiceTriggerSlots = import('./src/ai-voice-trigger').AiVoiceTriggerSlots
