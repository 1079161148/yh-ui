import { withInstall } from '@yh-ui/utils'
import BackTop from './src/back-top.vue'

export const YhBackTop = withInstall(BackTop)
export default YhBackTop

export * from './src/back-top'

export type BackTopInstance = InstanceType<typeof BackTop>
