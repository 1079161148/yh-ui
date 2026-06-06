import { withInstall } from '@yh-ui/utils'
import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'
import DropdownMenu from './src/dropdown-menu.vue'

export const YhDropdown = withInstall(Dropdown)
export const YhDropdownItem = withInstall(DropdownItem)
export const YhDropdownMenu = withInstall(DropdownMenu)

export default YhDropdown

export * from './src/dropdown'

export type DropdownInstance = InstanceType<typeof Dropdown>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
export type DropdownMenuInstance = InstanceType<typeof DropdownMenu>
export type YhDropdownInstance = DropdownInstance
export type YhDropdownItemInstance = DropdownItemInstance
export type YhDropdownMenuInstance = DropdownMenuInstance
export type YhDropdownProps = import('./src/dropdown').DropdownProps
export type YhDropdownEmits = import('./src/dropdown').DropdownEmits
export type YhDropdownSlots = import('./src/dropdown').DropdownSlots
export type YhDropdownExpose = import('./src/dropdown').DropdownExpose
export type YhDropdownTrigger = import('./src/dropdown').DropdownTrigger
export type YhDropdownItemData = import('./src/dropdown').DropdownItemData
export type YhDropdownItemProps = import('./src/dropdown').DropdownItemProps
export type YhDropdownMenuProps = import('./src/dropdown').DropdownMenuProps
