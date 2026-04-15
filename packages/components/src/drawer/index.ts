import { withInstall } from '@yh-ui/utils'
import Drawer from './src/drawer.vue'

export const YhDrawer = withInstall(Drawer)
export default YhDrawer

export * from './src/drawer'

export type DrawerInstance = InstanceType<typeof Drawer>
export type YhDrawerInstance = DrawerInstance
export type YhDrawerProps = import('./src/drawer').DrawerProps
export type YhDrawerEmits = import('./src/drawer').DrawerEmits
export type YhDrawerSlots = import('./src/drawer').DrawerSlots
export type YhDrawerExpose = import('./src/drawer').DrawerExpose
