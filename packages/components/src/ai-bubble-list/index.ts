import { withInstall } from '@yh-ui/utils'
import AiBubbleList from './src/ai-bubble-list.vue'

export const YhAiBubbleList = withInstall(AiBubbleList)
export default YhAiBubbleList

export * from './src/ai-bubble-list'

export type AiBubbleListInstance = InstanceType<typeof AiBubbleList>
export type YhAiBubbleListInstance = AiBubbleListInstance

export type YhAiBubbleListProps = import('./src/ai-bubble-list').AiBubbleListProps
