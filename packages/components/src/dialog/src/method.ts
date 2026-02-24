import { h, render, type AppContext, type Component, type Slots, type Slot } from 'vue'
import Dialog from './dialog.vue'
import type { DialogProps } from './dialog'
import type { UseDialogOptions, DialogAction } from './use-dialog'

/**
 * 默认配置
 */
const defaults: Partial<DialogProps> = {
  width: '50%',
  top: '15vh',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  draggable: false,
  modal: true,
  showClose: true,
  zIndex: 2000
}

/**
 * Dialog 函数式调用方法集
 */
export interface DialogMethod {
  (options: UseDialogOptions): Promise<{ action: DialogAction }>
  /** 显示弹窗 */
  show: (options: UseDialogOptions) => Promise<{ action: DialogAction }>
  /** 成功提示弹窗 */
  success: (content: string | UseDialogOptions, title?: string) => Promise<{ action: DialogAction }>
  /** 警告提示弹窗 */
  warning: (content: string | UseDialogOptions, title?: string) => Promise<{ action: DialogAction }>
  /** 错误提示弹窗 */
  error: (content: string | UseDialogOptions, title?: string) => Promise<{ action: DialogAction }>
  /** 信息提示弹窗 */
  info: (content: string | UseDialogOptions, title?: string) => Promise<{ action: DialogAction }>
}

/**
 * 创建并显示 Dialog 实例
 */
const createDialog = (
  options: UseDialogOptions,
  appContext?: AppContext | null
): Promise<{ action: DialogAction }> => {
  if (typeof window === 'undefined') return Promise.reject('Dialog cannot be used on server side.')

  return new Promise((resolve) => {
    // 1. 创建挂载容器
    const container = document.createElement('div')

    // 2. 状态渲染逻辑
    const renderDialog = (visible: boolean) => {
      const props = {
        ...defaults,
        ...(options as Record<string, unknown>),
        modelValue: visible,
        // 动画结束清理
        onClosed: () => {
          options.onClosed?.()
          render(null, container)
          container.remove()
        },
        onConfirm: () => {
          options.onConfirm?.()
          resolve({ action: 'confirm' })
          renderDialog(false)
        },
        onCancel: () => {
          options.onCancel?.()
          resolve({ action: 'cancel' })
          renderDialog(false)
        },
        'onUpdate:modelValue': (val: boolean) => {
          if (!val) {
            resolve({ action: 'close' })
            renderDialog(false)
          }
        }
      }

      // 处理插槽
      const slots: Record<string, Slot> = {}
      if (options.header) {
        slots.header = (
          typeof options.header === 'function'
            ? options.header
            : () => [h(options.header as string | Component)]
        ) as Slot
      }
      if (options.default) {
        slots.default = (
          typeof options.default === 'function'
            ? options.default
            : () => [h(options.default as string | Component)]
        ) as Slot
      }
      if (options.footer) {
        slots.footer = (
          typeof options.footer === 'function'
            ? options.footer
            : () => [h(options.footer as string | Component)]
        ) as Slot
      }

      // 创建 VNode
      const vnode = h(Dialog, props, slots as Slots)

      // 注入上下文
      if (appContext || options.appContext) {
        vnode.appContext = options.appContext || appContext || null
      }

      // 渲染
      render(vnode, container)
    }

    // 初始渲染
    renderDialog(true)
    document.body.appendChild(container)
  })
}

/**
 * 构造便捷方法
 */
const DialogMethod = ((options: UseDialogOptions) => createDialog(options)) as DialogMethod

DialogMethod.show = (options: UseDialogOptions) => createDialog(options)

const createTypeMethod = (type: 'success' | 'warning' | 'error' | 'info') => {
  return (content: string | UseDialogOptions, title?: string) => {
    const options = typeof content === 'string' ? { content, title, type } : { ...content, type }
    return createDialog(options)
  }
}

DialogMethod.success = createTypeMethod('success')
DialogMethod.warning = createTypeMethod('warning')
DialogMethod.error = createTypeMethod('error')
DialogMethod.info = createTypeMethod('info')

export default DialogMethod
