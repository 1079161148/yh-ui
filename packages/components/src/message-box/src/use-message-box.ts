/**
 * useMessageBox — Vue 3 组合式 API
 *
 * @description 在 <script setup> 中获取 YhMessageBox 实例，
 * 与 Vue 3 生态（Naive UI、Ant Design Vue）保持 API 一致。
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMessageBox } from '@yh-ui/components'
 * const messageBox = useMessageBox()
 * await messageBox.confirm('确认删除？', '提示')
 * </script>
 * ```
 */
import YhMessageBox from '../index'
import type { MessageBoxHandler } from './message-box'

/**
 * 获取全局 MessageBox 服务实例。
 * 无需注入，直接返回全局单例 API，与 `YhMessageBox` 完全等价。
 */
export function useMessageBox(): MessageBoxHandler {
  return YhMessageBox as unknown as MessageBoxHandler
}
