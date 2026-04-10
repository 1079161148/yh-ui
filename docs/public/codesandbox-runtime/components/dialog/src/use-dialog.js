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
import { h, render, getCurrentInstance } from 'vue'
import Dialog from './dialog.js'
function useDialog() {
  var _a, _b, _c
  const instance = getCurrentInstance()
  const appContext =
    (instance == null ? void 0 : instance.appContext) ||
    ((_c =
      (_b = (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$root) == null
        ? void 0
        : _b._context) != null
      ? _c
      : null)
  const showDialog = (options) => {
    return new Promise((resolve) => {
      const container = document.createElement('div')
      const renderDialog = (visible) => {
        const props = __spreadProps(__spreadValues({}, options), {
          modelValue: visible,
          // 核心：监听彻底销毁事件，清理 DOM
          onClosed: () => {
            var _a2
            ;(_a2 = options.onClosed) == null ? void 0 : _a2.call(options)
            render(null, container)
            container.remove()
          },
          // 确定
          onConfirm: () => {
            var _a2
            ;(_a2 = options.onConfirm) == null ? void 0 : _a2.call(options)
            resolve({ action: 'confirm' })
            renderDialog(false)
          },
          // 取消
          onCancel: () => {
            var _a2
            ;(_a2 = options.onCancel) == null ? void 0 : _a2.call(options)
            resolve({ action: 'cancel' })
            renderDialog(false)
          },
          // 监听 v-model 变化 (处理 ESC、点击遮罩等导致的关闭)
          'onUpdate:modelValue': (val) => {
            if (!val) {
              resolve({ action: 'close' })
              renderDialog(false)
            }
          }
        })
        const slots = {}
        if (options.header) {
          slots.header =
            typeof options.header === 'function' ? options.header : () => [h(options.header)]
        }
        if (options.default) {
          slots.default =
            typeof options.default === 'function' ? options.default : () => [h(options.default)]
        }
        if (options.footer) {
          slots.footer =
            typeof options.footer === 'function' ? options.footer : () => [h(options.footer)]
        }
        const vnode = h(Dialog, props, slots)
        if (appContext || options.appContext) {
          vnode.appContext = options.appContext || appContext
        }
        render(vnode, container)
      }
      renderDialog(true)
      document.body.appendChild(container)
    })
  }
  return {
    showDialog
  }
}
export { useDialog }
