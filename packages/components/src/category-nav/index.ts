import { withInstall } from '@yh-ui/utils'
import CategoryNav from './src/category-nav.vue'

export const YhCategoryNav = withInstall(CategoryNav)
export default YhCategoryNav

export * from './src/category-nav'

export type CategoryNavInstance = InstanceType<typeof CategoryNav>
export type YhCategoryNavInstance = CategoryNavInstance

export type YhCategoryNavProps = import('./src/category-nav').CategoryNavProps
