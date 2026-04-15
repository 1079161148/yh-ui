import { withInstall } from '@yh-ui/utils'
import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import MenuItemGroup from './src/menu-item-group.vue'
import SubMenu from './src/sub-menu.vue'

export const YhMenu = withInstall(Menu)
export const YhMenuItem = withInstall(MenuItem)
export const YhMenuItemGroup = withInstall(MenuItemGroup)
export const YhSubMenu = withInstall(SubMenu)

export default YhMenu

export * from './src/menu'

export type MenuInstance = InstanceType<typeof Menu>
export type MenuItemInstance = InstanceType<typeof MenuItem>
export type MenuItemGroupInstance = InstanceType<typeof MenuItemGroup>
export type SubMenuInstance = InstanceType<typeof SubMenu>
export type YhMenuInstance = MenuInstance
export type YhMenuItemInstance = MenuItemInstance
export type YhMenuItemGroupInstance = MenuItemGroupInstance
export type YhSubMenuInstance = SubMenuInstance
export type YhMenuProps = import('./src/menu').MenuProps
export type YhMenuEmits = import('./src/menu').MenuEmits
export type YhMenuSlots = import('./src/menu').MenuSlots
export type YhMenuExpose = import('./src/menu').MenuExpose
export type YhMenuMode = import('./src/menu').MenuMode
export type YhMenuTrigger = import('./src/menu').MenuTrigger
export type YhMenuItemData = import('./src/menu').MenuItemData
export type YhMenuItemProps = import('./src/menu').MenuItemProps
export type YhMenuItemGroupProps = import('./src/menu').MenuItemGroupProps
export type YhSubMenuProps = import('./src/menu').SubMenuProps
