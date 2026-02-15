import { withInstall } from '@yh-ui/utils'
import Drawer from './src/drawer.vue'

export const YhDrawer = withInstall(Drawer)
export default YhDrawer

export * from './src/drawer'

export type DrawerInstance = InstanceType<typeof Drawer>
