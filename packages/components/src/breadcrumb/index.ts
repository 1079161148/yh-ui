import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'

export const YhBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem
})
export const YhBreadcrumbItem = withNoopInstall(BreadcrumbItem)

export default YhBreadcrumb
export * from './src/breadcrumb'
