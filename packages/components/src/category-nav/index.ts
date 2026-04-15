import { withInstall } from '@yh-ui/utils'
import CategoryNav from './src/category-nav.vue'

export const YhCategoryNav = withInstall(CategoryNav)
export default YhCategoryNav

export * from './src/category-nav'

export type CategoryNavInstance = InstanceType<typeof CategoryNav>
export type YhCategoryNavInstance = CategoryNavInstance

export type YhCategoryNavProps = import('./src/category-nav').CategoryNavProps
export type YhCategoryNavEmits = import('./src/category-nav').CategoryNavEmits
export type YhCategoryNavSlots = import('./src/category-nav').CategoryNavSlots
export type YhCategoryItem = import('./src/category-nav').CategoryItem
export type YhCategorySubItem = import('./src/category-nav').CategorySubItem
