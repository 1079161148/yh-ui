import { type AppContext, type VNode, type Component } from 'vue'
import type { DialogProps } from './dialog'
/**
 * useDialog 选项
 * 继承所有 DialogProps，并扩展支持函数式调用的特有属性
 */
export interface UseDialogOptions extends Partial<DialogProps> {
  /** 弹窗内容，支持字符串、渲染函数或组件对象 */
  content?: string | (() => VNode | string) | Component
  /** 弹窗标题，支持字符串或渲染函数 */
  title?: string | (() => VNode | string)
  /** 底部操作区域，支持渲染函数 */
  action?: () => VNode
  /** 默认插槽 (等同于 content) */
  default?: string | (() => VNode | string) | Component
  /** 头部插槽 (等同于 title) */
  header?: string | (() => VNode | string) | Component
  /** 底部插槽 (等同于 action) */
  footer?: () => VNode | Component
  /** 是否在关闭后销毁容器 */
  destroyOnClose?: boolean
  /** 应用上下文 */
  appContext?: AppContext | null
  /** 确认回调 */
  onConfirm?: () => void
  /** 取消回调 */
  onCancel?: () => void
  /** 关闭回调 */
  onClose?: () => void
  /** 关闭动画结束回调 */
  onClosed?: () => void
}
/**
 * 对话框关闭时的动作反馈
 */
export type DialogAction = 'confirm' | 'cancel' | 'close'
/**
 * useDialog 返回值
 */
export interface UseDialogReturn {
  /** 显示对话框 */
  showDialog: (options: UseDialogOptions) => Promise<{
    action: DialogAction
  }>
}
/**
 * YhDialog 函数式调用 Hook
 * @description 基于组合式 API 的弹窗调用工具，自动继承应用上下文 (AppContext)，支持 Promise 异步反馈。
 * @example
 * const { showDialog } = useDialog()
 * const { action } = await showDialog({ title: '温馨提示', content: '您确定要退出当前系统吗？' })
 */
export declare function useDialog(): UseDialogReturn
