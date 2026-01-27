import { withInstall } from '@yh-ui/utils'
import Popconfirm from './src/popconfirm.vue'

export const YhPopconfirm = withInstall(Popconfirm)
export default YhPopconfirm

export * from './src/popconfirm'
export type { PopconfirmInstance } from './src/instance'
