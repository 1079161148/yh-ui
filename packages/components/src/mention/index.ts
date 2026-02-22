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
