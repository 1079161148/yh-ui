/**
 * useNotification — Vue 3 组合式 API
 *
 * @description 在 <script setup> 中获取 YhNotification 实例，
 * 与 Vue 3 生态（Naive UI、Ant Design Vue）保持 API 一致。
 *
 * @example
 * ```vue
 * <script setup>
 * import { useNotification } from '@yh-ui/components'
 * const notification = useNotification()
 * notification.success('成功', '操作已完成')
 * </script>
 * ```
 */
import YhNotification from '../index'
import type { NotificationFn } from './notification'

/**
 * 获取全局 Notification 服务实例。
 * 无需注入，直接返回全局单例 API，与 `YhNotification` 完全等价。
 */
export function useNotification(): NotificationFn {
  return YhNotification as unknown as NotificationFn
}
