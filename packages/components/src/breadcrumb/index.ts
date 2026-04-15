import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'

export const YhBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem
})
export const YhBreadcrumbItem = withNoopInstall(BreadcrumbItem)

export default YhBreadcrumb
export * from './src/breadcrumb'

export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>
export type BreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>
export type YhBreadcrumbInstance = BreadcrumbInstance
export type YhBreadcrumbItemInstance = BreadcrumbItemInstance
export type YhBreadcrumbProps = import('./src/breadcrumb').BreadcrumbProps
export type YhBreadcrumbSlots = import('./src/breadcrumb').BreadcrumbSlots
export type YhBreadcrumbItemProps = import('./src/breadcrumb').BreadcrumbItemProps
export type YhBreadcrumbItemSlots = import('./src/breadcrumb').BreadcrumbItemSlots
