import { withInstall } from '@yh-ui/utils'
import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'
import DropdownMenu from './src/dropdown-menu.vue'

export const YhDropdown = withInstall(Dropdown)
export const YhDropdownItem = withInstall(DropdownItem)
export const YhDropdownMenu = withInstall(DropdownMenu)

export default YhDropdown

export * from './src/dropdown'
