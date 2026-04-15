var __defProp = Object.defineProperty
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
import { createVNode, render, reactive, h, isVNode, Transition, computed } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { YhSpin } from '../../spin/index.js'
const createLoading = (options = {}, appContext) => {
  const resolvedOptions = __spreadValues(
    {
      target: document.body,
      body: false,
      fullscreen: true,
      lock: false,
      glass: false
    },
    options
  )
  const state = reactive({
    visible: true
  })
  const component = {
    setup() {
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'loading',
        computed(() => resolvedOptions.themeOverrides)
      )
      return () =>
        h(
          Transition,
          { name: 'yh-loading-fade', appear: true },
          {
            default: () => {
              var _a
              return state.visible
                ? h(
                    'div',
                    {
                      class: [
                        'yh-loading-mask',
                        resolvedOptions.customClass,
                        {
                          'is-fullscreen': resolvedOptions.fullscreen,
                          'is-glass': resolvedOptions.glass
                        }
                      ],
                      style: [{ backgroundColor: resolvedOptions.background }, themeStyle.value]
                    },
                    [
                      h('div', { class: 'yh-loading-spinner' }, [
                        resolvedOptions.spinner
                          ? typeof resolvedOptions.spinner === 'string'
                            ? h('i', { class: resolvedOptions.spinner })
                            : isVNode(resolvedOptions.spinner)
                              ? resolvedOptions.spinner
                              : h(resolvedOptions.spinner)
                          : h(YhSpin, {
                              tip: (_a = resolvedOptions.text) != null ? _a : t('loading.text'),
                              size: resolvedOptions.fullscreen ? 'large' : 'default',
                              vertical: true,
                              color: resolvedOptions.color,
                              dot: resolvedOptions.dot,
                              type: resolvedOptions.spinnerType || 'circle',
                              show: true
                            })
                      ])
                    ]
                  )
                : null
            }
          }
        )
    }
  }
  const container = document.createElement('div')
  container.style.display = 'contents'
  const vnode = createVNode(component)
  if (appContext) {
    vnode.appContext = appContext
  }
  render(vnode, container)
  let target = document.body
  if (resolvedOptions.fullscreen) {
    target = document.body
  } else if (resolvedOptions.target) {
    target =
      typeof resolvedOptions.target === 'string'
        ? document.querySelector(resolvedOptions.target)
        : resolvedOptions.target
  }
  if (!target) target = document.body
  const isRelative =
    target.style.position === 'relative' || target.classList.contains('yh-loading-parent--relative')
  if (!resolvedOptions.fullscreen && !isRelative) {
    target.classList.add('yh-loading-parent--relative')
  }
  target.appendChild(container)
  if (resolvedOptions.lock) {
    target.style.overflow = 'hidden'
  }
  const instance = {
    close: () => {
      state.visible = false
      setTimeout(() => {
        render(null, container)
        container.remove()
        if (!resolvedOptions.fullscreen) {
          target.classList.remove('yh-loading-parent--relative')
        }
        if (resolvedOptions.lock) {
          target.style.overflow = ''
        }
      }, 400)
    },
    get visible() {
      return state.visible
    }
  }
  return instance
}
const Loading = {
  service: createLoading
}
export { Loading }
