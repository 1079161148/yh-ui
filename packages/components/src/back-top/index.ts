import { withInstall } from '@yh-ui/utils'
import BackTop from './src/back-top.vue'

export const YhBackTop = withInstall(BackTop)
export default YhBackTop

export * from './src/back-top'

export type BackTopInstance = InstanceType<typeof BackTop>
export type YhBackTopInstance = BackTopInstance
export type YhBackTopProps = import('./src/back-top').BackTopProps
export type YhBackTopEmits = import('./src/back-top').BackTopEmits
export type YhBackTopSlots = import('./src/back-top').BackTopSlots
