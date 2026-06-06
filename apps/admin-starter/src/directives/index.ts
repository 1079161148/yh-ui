import type { App } from 'vue'
import { vPermission } from './permission'

export function registerDirectives(app: App) {
  app.directive('permission', vPermission)
}
