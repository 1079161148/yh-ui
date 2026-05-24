import type { App } from 'vue'
import { withInstallFunction } from '@yh-ui/utils'
import Notification, { setNotificationDefaultAppContext } from './src/method'

export const YhNotification = withInstallFunction(Notification, '$notify')

YhNotification.install = (app: App) => {
  setNotificationDefaultAppContext(app._context)
  app.config.globalProperties.$notify = YhNotification
}

export default YhNotification

export * from './src/notification'

export type YhNotificationProps = import('./src/notification').NotificationProps
export type YhNotificationEmits = import('./src/notification').NotificationEmits
export type YhNotificationSlots = import('./src/notification').NotificationSlots
export type YhNotificationExpose = import('./src/notification').NotificationExpose
export type YhNotificationInstance = import('./src/notification').NotificationInstance
export type YhNotificationOptions = import('./src/notification').NotificationOptions
export type YhNotificationHandler = import('./src/notification').NotificationHandler
export type YhNotificationContext = import('./src/notification').NotificationContext
export type YhNotificationFn = import('./src/notification').NotificationFn
export type YhNotificationType = import('./src/notification').NotificationType
export type YhNotificationPosition = import('./src/notification').NotificationPosition
