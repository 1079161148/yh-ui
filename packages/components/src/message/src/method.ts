/**
 * Message 方法
 * @description 函数式调用消息提示
 * @reference 市面组件库 Message 实现
 */

import { createVNode, render, shallowReactive, type VNodeProps } from 'vue'
import MessageConstructor from './message.vue'
import type {
  MessageOptions,
  MessageFn,
  MessageHandler,
  MessagePlacement,
  MessageContext
} from './message'
import './message.scss'

// 消息实例上下文列表（使用上下文对象而非组件实例）
const instances: MessageContext[] = []
let seed = 1

/**
 * 计算偏移量
 * @param placement 位置
 * @param offset 初始偏移
 */
const getOffset = (placement: MessagePlacement, offset: number): number => {
  return instances
    .filter((ctx) => ctx.props.placement === placement)
    .reduce((acc, ctx) => {
      const el = ctx.handler.el
      if (el) {
        return acc + el.offsetHeight + 16
      }
      return acc
    }, offset)
}

/**
 * 创建并显示消息
 */
const createMessage = (options: MessageOptions): MessageHandler => {
  const placement = options.placement || 'top'
  const defOffset = placement.startsWith('top') ? 64 : 20

  // 1. 分组合并逻辑
  if (options.grouping) {
    const existingCtx = instances.find((ctx) => {
      return (
        ctx.props.message === options.message &&
        (ctx.props.type || 'info') === (options.type || 'info') &&
        !ctx.handler.closed
      )
    })

    if (existingCtx) {
      // 如果找到相同内容的消息，增加重复计数
      existingCtx.props.repeatNum = (existingCtx.props.repeatNum || 1) + 1
      return existingCtx.handler
    }
  }

  // 2. 正常显示逻辑
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  // 使用 shallowReactive 创建可变的 props 对象（市面组件库 方式）
  const props = shallowReactive<MessageOptions>({
    ...options,
    id,
    placement,
    offset: getOffset(placement, options.offset || defOffset),
    repeatNum: options.repeatNum || 1,
    onClose: () => {
      closeMessage(id)
      userOnClose?.()
    }
  })

  const container = document.createElement('div')
  container.className = `yh-message-container_${id}`
  container.style.pointerEvents = 'none'

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
  const vnode = createVNode(MessageConstructor, vnodeProps, null)

  render(vnode, container)
  document.body.appendChild(container)

  // 获取组件实例用于调用 close 方法
  const vm = vnode.component!

  // 定义 exposed 的类型
  interface MessageExposed {
    visible: import('vue').Ref<boolean>
    close: () => void
  }

  // 创建处理器
  const handler: MessageHandler = {
    close: () => {
      handler.closed = true
      ;(vm.exposed as MessageExposed).close()
    },
    get el() {
      return vm.proxy?.$el as HTMLElement
    },
    closed: false
  }

  // 创建上下文
  const context: MessageContext = {
    id,
    props,
    handler,
    vnode
  }

  instances.push(context)

  return handler
}

/**
 * 关闭消息并重排同一位置的消息
 */
const closeMessage = (id: string) => {
  const index = instances.findIndex((ctx) => ctx.id === id)
  if (index === -1) return

  const ctx = instances[index]
  const placement = ctx.props.placement!
  const offset = ctx.props.offset!
  const height = ctx.handler.el?.offsetHeight || 0

  instances.splice(index, 1)

  // 仅更新同一位置且在当前消息之后的消息位置
  const samePlacementInstances = instances.filter((c) => c.props.placement === placement)

  for (let i = 0; i < samePlacementInstances.length; i++) {
    const currentCtx = samePlacementInstances[i]

    // 如果实例的原本 offset 大于被删除实例的 offset，则向上平移
    if (currentCtx.props.offset! > offset) {
      const nextEl = currentCtx.handler.el
      if (!nextEl) continue

      const newPos = currentCtx.props.offset! - height - 16
      // 直接修改 shallowReactive 对象的属性
      currentCtx.props.offset = newPos

      if (placement.startsWith('top')) {
        nextEl.style.top = `${newPos}px`
      } else {
        nextEl.style.bottom = `${newPos}px`
      }
    }
  }
}

const closeAll = () => {
  // 必须复制一份副本进行遍历，因为 close 操作会触发 splice 从而改变原数组
  const activeInstances = [...instances]
  activeInstances.forEach((ctx) => {
    ctx.handler.close()
  })
}

const Message = ((options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createMessage(options)
}) as MessageFn

Message.success = (message: string | MessageOptions) => {
  const options = typeof message === 'string' ? { message } : message
  return createMessage({ ...options, type: 'success' })
}

Message.warning = (message: string | MessageOptions) => {
  const options = typeof message === 'string' ? { message } : message
  return createMessage({ ...options, type: 'warning' })
}

Message.info = (message: string | MessageOptions) => {
  const options = typeof message === 'string' ? { message } : message
  return createMessage({ ...options, type: 'info' })
}

Message.error = (message: string | MessageOptions) => {
  const options = typeof message === 'string' ? { message } : message
  return createMessage({ ...options, type: 'error' })
}

Message.closeAll = closeAll

export default Message
