/**
 * useMessage — Vue 3 组合式 API
 *
 * @description 在 <script setup> 中获取 YhMessage 实例，
 * 与 Vue 3 生态（Naive UI、Ant Design Vue）保持 API 一致。
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMessage } from '@yh-ui/components'
 * const message = useMessage()
 * message.success('操作成功')
 * </script>
 * ```
 */
import YhMessage from '../index'
import type { MessageFn } from './message'

/**
 * 获取全局 Message 服务实例。
 * 无需注入，直接返回全局单例 API，与 `YhMessage` 完全等价。
 */
export function useMessage(): MessageFn {
  return YhMessage as unknown as MessageFn
}
