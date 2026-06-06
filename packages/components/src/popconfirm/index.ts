import { withInstall } from '@yh-ui/utils'
import Popconfirm from './src/popconfirm.vue'

export const YhPopconfirm = withInstall(Popconfirm)
export default YhPopconfirm

export * from './src/popconfirm'
export type { PopconfirmInstance } from './src/instance'
export type YhPopconfirmInstance = import('./src/instance').PopconfirmInstance
export type YhPopconfirmProps = import('./src/popconfirm').PopconfirmProps
export type YhPopconfirmEmits = import('./src/popconfirm').PopconfirmEmits
export type YhPopconfirmSlots = import('./src/popconfirm').PopconfirmSlots
export type YhPopconfirmExpose = import('./src/popconfirm').PopconfirmExpose
