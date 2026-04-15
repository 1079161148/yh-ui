/**
 * Mention Component
 * @description 提及组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Mention from './src/mention.vue'

export const YhMention = withInstall(Mention)

export default YhMention

export * from './src/mention'

export type MentionInstance = InstanceType<typeof Mention>
export type YhMentionInstance = MentionInstance
export type YhMentionProps = import('./src/mention').MentionProps
export type YhMentionEmits = import('./src/mention').MentionEmits
export type YhMentionSlots = import('./src/mention').MentionSlots
export type YhMentionExpose = import('./src/mention').MentionExpose
export type YhMentionOption = import('./src/mention').MentionOption
export type YhMentionTriggerPosition = import('./src/mention').MentionTriggerPosition
export type YhMentionPlacement = import('./src/mention').MentionPlacement
export type YhMentionSize = import('./src/mention').MentionSize
