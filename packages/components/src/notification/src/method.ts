/**
 * Notification 方法
 * @description 函数式调用通知
 */

import { createVNode, render, shallowReactive, type VNodeProps } from 'vue'
import NotificationConstructor from './notification.vue'
import type {
  NotificationOptions,
  NotificationFn,
  NotificationHandler,
  NotificationPosition,
  NotificationContext
} from './notification'
import './notification.scss'

// 每个位置的通知上下文列表
const instances: Record<NotificationPosition, NotificationContext[]> = {
  'top-right': [],
  'top-left': [],
  'top-center': [],
  'bottom-right': [],
  'bottom-left': [],
  'bottom-center': []
}

let seed = 1

/**
 * 计算偏移量
 */
const getOffset = (position: NotificationPosition, offset: number): number => {
  const list = instances[position]
  return list.reduce((acc, ctx) => {
    const el = ctx.handler.el
    if (el) {
      return acc + el.offsetHeight + 16
    }
    return acc
  }, offset)
}

/**
 * 创建通知
 */
const createNotification = (options: NotificationOptions): NotificationHandler => {
  const id = `notification_${seed++}`
  const position = options.position || 'top-right'
  const userOnClose = options.onClose
  const max = options.max

  // 若设置了 max，先检查并关闭超出数量的通知
  if (max !== undefined && max > 0) {
    const list = instances[position]
    // 计算需要关闭的数量：当前数量 + 1（即将创建的）- max
    const toCloseCount = list.length + 1 - max
    // 从最早的通知开始关闭
    for (let i = 0; i < toCloseCount && i < list.length; i++) {
      const ctx = list[i]
      if (ctx) {
        ctx.handler.close()
      }
    }
  }

  // 使用 shallowReactive 创建可变的 props 对象
  const props = shallowReactive<NotificationOptions>({
    ...options,
    id,
    position,
    offset: getOffset(position, options.offset || 16),
    onClose: () => {
      closeNotification(id, position)
      userOnClose?.()
    }
  })

  // 创建容器
  const container = document.createElement('div')
  container.className = `yh-notification-container_${id}`

  // 销毁函数
  const onDestroy = () => {
    render(null, container)
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }

  // 使用 VNodeProps 类型来创建 VNode
  const vnodeProps = {
    ...props,
    onDestroy
  } as VNodeProps & { onDestroy: () => void }
  const vnode = createVNode(NotificationConstructor, vnodeProps, null)

  // 渲染
  render(vnode, container)
  document.body.appendChild(container)

  // 获取组件实例
  const vm = vnode.component!

  // 定义 exposed 的类型
  interface NotificationExposed {
    close: () => void
  }

  // 创建处理器
  const handler: NotificationHandler = {
    close: () => {
      ;(vm.exposed as NotificationExposed).close()
    },
    get el() {
      return vm.proxy?.$el as HTMLElement
    }
  }

  // 创建上下文
  const context: NotificationContext = {
    id,
    props,
    handler,
    vnode
  }

  instances[position].push(context)

  // 返回处理器
  return handler
}

/**
 * 关闭通知
 */
const closeNotification = (id: string, position: NotificationPosition) => {
  const list = instances[position]
  const index = list.findIndex((ctx) => ctx.id === id)
  if (index === -1) return

  const ctx = list[index]
  const offset = ctx.props.offset!
  const height = ctx.handler.el?.offsetHeight || 0

  list.splice(index, 1)

  // 更新后续通知的位置
  for (let i = index; i < list.length; i++) {
    const nextCtx = list[i]

    // 如果实例的原本 offset 大于被删除实例的 offset，则向上平移
    if (nextCtx.props.offset! > offset) {
      const nextEl = nextCtx.handler.el
      if (!nextEl) continue

      const newPos = nextCtx.props.offset! - height - 16
      // 直接修改 shallowReactive 对象的属性
      nextCtx.props.offset = newPos

      if (position.startsWith('top')) {
        nextEl.style.top = `${newPos}px`
      } else {
        nextEl.style.bottom = `${newPos}px`
      }
    }
  }
}

/**
 * 关闭所有通知
 */
const closeAll = () => {
  Object.values(instances).forEach((list) => {
    // 复制列表，避免在迭代过程中修改
    ;[...list].forEach((ctx) => {
      ctx.handler.close()
    })
  })
}

// Notification 方法
const Notification = ((options: NotificationOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createNotification(options)
}) as NotificationFn

// 便捷方法
Notification.success = (title: string, message?: string | NotificationOptions) => {
  const options = typeof message === 'string' ? { title, message } : { title, ...(message || {}) }
  return createNotification({ ...options, type: 'success' })
}

Notification.warning = (title: string, message?: string | NotificationOptions) => {
  const options = typeof message === 'string' ? { title, message } : { title, ...(message || {}) }
  return createNotification({ ...options, type: 'warning' })
}

Notification.info = (title: string, message?: string | NotificationOptions) => {
  const options = typeof message === 'string' ? { title, message } : { title, ...(message || {}) }
  return createNotification({ ...options, type: 'info' })
}

Notification.error = (title: string, message?: string | NotificationOptions) => {
  const options = typeof message === 'string' ? { title, message } : { title, ...(message || {}) }
  return createNotification({ ...options, type: 'error' })
}

Notification.closeAll = closeAll

export default Notification
