import { createVNode, render, isVNode } from 'vue'
import MessageBoxConstructor from './message-box.vue'
import type { AppContext } from 'vue'
import type {
  MessageBoxOptions,
  MessageBoxHandler,
  MessageBoxAction,
  MessageBoxInstance
} from './message-box'

const isServer = typeof window === 'undefined'
let defaultAppContext: AppContext | null = null
let defaults: MessageBoxOptions = {
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  showClose: true,
  draggableBoundary: true
}

export const setMessageBoxDefaultAppContext = (appContext?: AppContext | null) => {
  defaultAppContext = appContext ?? null
}

const showMessage = (
  options: MessageBoxOptions,
  appContext?: AppContext | null
): Promise<{ value?: string; action: MessageBoxAction }> => {
  if (isServer) return Promise.reject('MessageBox cannot be used on server side.')

  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    const vnode = createVNode(MessageBoxConstructor)
    const resolvedAppContext = appContext ?? options.appContext ?? defaultAppContext

    // 注入应用上下文以支持全局属性/组件继承
    vnode.appContext = resolvedAppContext

    // 优先挂载到 ConfigProvider 容器，确保函数式弹层继承页面级主题变量。
    let appendTo: HTMLElement | null = document.querySelector('.yh-config-provider')
    if (options.appendTo) {
      if (typeof options.appendTo === 'string') {
        appendTo = document.querySelector(options.appendTo)
      } else {
        appendTo = options.appendTo
      }
    }

    // 将容器挂载到目标元素，确保外部样式生效
    if (appendTo) {
      appendTo.appendChild(container)
    } else {
      document.body.appendChild(container)
    }

    render(vnode, container)

    const vm = vnode.component!.exposed as MessageBoxInstance

    vm.setCallback((res) => {
      // 执行 options.callback
      if (options.callback) {
        options.callback(res.action, vm)
      }

      // 处理 Promise 返回
      if (res.action === 'confirm') {
        resolve({ action: 'confirm', value: res.value })
      } else {
        reject(res.action)
      }

      // 等待动画结束清理 DOM
      setTimeout(() => {
        render(null, container)
        container.remove()
      }, 500)
    })

    vm.open({ ...defaults, ...options })
  })
}

const MessageBox: MessageBoxHandler = ((
  options: MessageBoxOptions | string,
  appContext?: AppContext | null
) => {
  const opts: MessageBoxOptions =
    typeof options === 'string' || isVNode(options) ? { message: options } : options
  return showMessage(opts, appContext)
}) as MessageBoxHandler

MessageBox.alert = (message, title, options, appContext): Promise<void> => {
  if (typeof title === 'object') {
    appContext = options as AppContext | null
    options = title
    title = ''
  } else if (typeof options === 'object' && 'app' in options && options.app) {
    appContext = options as AppContext | null
    options = undefined
  }
  return showMessage(
    {
      ...(options as MessageBoxOptions),
      message,
      title: title as string,
      type: 'alert',
      showCancelButton: false
    },
    appContext
  ) as unknown as Promise<void>
}

MessageBox.confirm = (message, title, options, appContext): Promise<MessageBoxAction> => {
  if (typeof title === 'object') {
    appContext = options as AppContext | null
    options = title
    title = ''
  }
  return showMessage(
    {
      ...(options as MessageBoxOptions),
      message,
      title: title as string,
      type: 'confirm',
      showCancelButton: true
    },
    appContext
  ) as unknown as Promise<MessageBoxAction>
}

MessageBox.prompt = (
  message,
  title,
  options,
  appContext
): Promise<{ value: string; action: 'confirm' }> => {
  if (typeof title === 'object') {
    appContext = options as AppContext | null
    options = title
    title = ''
  }
  return showMessage(
    {
      ...(options as MessageBoxOptions),
      message,
      title: title as string,
      type: 'prompt',
      showCancelButton: true
    },
    appContext
  ) as unknown as Promise<{ value: string; action: 'confirm' }>
}

MessageBox.setDefaults = (newDefaults: MessageBoxOptions) => {
  defaults = { ...defaults, ...newDefaults }
}

export default MessageBox
