import { withInstall } from '@yh-ui/utils'
import Spin from './src/spin.vue'

export const YhSpin = withInstall(Spin)
export default YhSpin

export * from './src/spin'

export type SpinInstance = InstanceType<typeof Spin>
