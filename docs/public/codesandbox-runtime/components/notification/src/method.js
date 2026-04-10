var __defProp = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
import { createVNode, render, shallowReactive } from 'vue'
import NotificationConstructor from './notification.js'
import './notification.css'
const instances = {
  'top-right': [],
  'top-left': [],
  'top-center': [],
  'bottom-right': [],
  'bottom-left': [],
  'bottom-center': []
}
let seed = 1
const getOffset = (position, offset) => {
  const list = instances[position]
  return list.reduce((acc, ctx) => {
    const el = ctx.handler.el
    if (el) {
      return acc + el.offsetHeight + 16
    }
    return acc
  }, offset)
}
const createNotification = (options) => {
  const id = `notification_${seed++}`
  const position = options.position || 'top-right'
  const userOnClose = options.onClose
  const max = options.max
  if (max !== void 0 && max > 0) {
    const list = instances[position]
    const toCloseCount = list.length + 1 - max
    for (let i = 0; i < toCloseCount && i < list.length; i++) {
      const ctx = list[i]
      if (ctx) {
        ctx.handler.close()
      }
    }
  }
  const props = shallowReactive(
    __spreadProps(__spreadValues({}, options), {
      id,
      position,
      offset: getOffset(position, options.offset || 16),
      onClose: () => {
        closeNotification(id, position)
        userOnClose == null ? void 0 : userOnClose()
      }
    })
  )
  const container = document.createElement('div')
  container.className = `yh-notification-container_${id}`
  const onDestroy = () => {
    render(null, container)
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }
  const vnodeProps = __spreadProps(__spreadValues({}, props), {
    onDestroy
  })
  const vnode = createVNode(NotificationConstructor, vnodeProps, null)
  render(vnode, container)
  document.body.appendChild(container)
  const vm = vnode.component
  const handler = {
    close: () => {
      vm.exposed.close()
    },
    get el() {
      var _a
      return (_a = vm.proxy) == null ? void 0 : _a.$el
    }
  }
  const context = {
    id,
    props,
    handler,
    vnode
  }
  instances[position].push(context)
  return handler
}
const closeNotification = (id, position) => {
  var _a
  const list = instances[position]
  const index = list.findIndex((ctx2) => ctx2.id === id)
  if (index === -1) return
  const ctx = list[index]
  const offset = ctx.props.offset
  const height = ((_a = ctx.handler.el) == null ? void 0 : _a.offsetHeight) || 0
  list.splice(index, 1)
  for (let i = index; i < list.length; i++) {
    const nextCtx = list[i]
    if (nextCtx.props.offset > offset) {
      const nextEl = nextCtx.handler.el
      if (!nextEl) continue
      const newPos = nextCtx.props.offset - height - 16
      nextCtx.props.offset = newPos
      if (position.startsWith('top')) {
        nextEl.style.top = `${newPos}px`
      } else {
        nextEl.style.bottom = `${newPos}px`
      }
    }
  }
}
const closeAll = () => {
  Object.values(instances).forEach((list) => {
    ;[...list].forEach((ctx) => {
      ctx.handler.close()
    })
  })
}
const Notification = (options) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createNotification(options)
}
Notification.success = (title, message) => {
  const options =
    typeof message === 'string' ? { title, message } : __spreadValues({ title }, message || {})
  return createNotification(__spreadProps(__spreadValues({}, options), { type: 'success' }))
}
Notification.warning = (title, message) => {
  const options =
    typeof message === 'string' ? { title, message } : __spreadValues({ title }, message || {})
  return createNotification(__spreadProps(__spreadValues({}, options), { type: 'warning' }))
}
Notification.info = (title, message) => {
  const options =
    typeof message === 'string' ? { title, message } : __spreadValues({ title }, message || {})
  return createNotification(__spreadProps(__spreadValues({}, options), { type: 'info' }))
}
Notification.error = (title, message) => {
  const options =
    typeof message === 'string' ? { title, message } : __spreadValues({ title }, message || {})
  return createNotification(__spreadProps(__spreadValues({}, options), { type: 'error' }))
}
Notification.closeAll = closeAll
var stdin_default = Notification
export { stdin_default as default }
