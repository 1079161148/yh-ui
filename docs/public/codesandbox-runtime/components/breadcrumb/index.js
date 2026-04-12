import { withInstall, withNoopInstall } from '../../utils/index.js'
import Breadcrumb from './src/breadcrumb.js'
import BreadcrumbItem from './src/breadcrumb-item.js'
const YhBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem
})
const YhBreadcrumbItem = withNoopInstall(BreadcrumbItem)
var stdin_default = YhBreadcrumb
export * from './src/breadcrumb-meta.js'
export { YhBreadcrumb, YhBreadcrumbItem, stdin_default as default }
