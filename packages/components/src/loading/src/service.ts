import {
  createVNode,
  render,
  reactive,
  h,
  markRaw,
  isVNode,
  Transition,
  type AppContext,
  type VNode,
  type Component
} from 'vue'
import { YhSpin, type LoadingSpinnerType } from '../../spin'

export interface LoadingOptions {
  target?: string | HTMLElement
  body?: boolean
  fullscreen?: boolean
  lock?: boolean
  text?: string
  spinner?: string | Component | VNode
  background?: string
  customClass?: string
  glass?: boolean
  color?: string | string[] | Record<string, string>
  dot?: boolean
  spinnerType?: LoadingSpinnerType
}

export interface LoadingInstance {
  close: () => void
  readonly visible: boolean
}

const createLoading = (options: LoadingOptions = {}, appContext?: AppContext): LoadingInstance => {
  const resolvedOptions = {
    target: document.body,
    body: false,
    fullscreen: true,
    lock: false,
    glass: false,
    ...options
  }

  const state = reactive({
    visible: true
  })

  const component = {
    setup() {
      return () =>
        h(
          Transition,
          { name: 'yh-loading-fade', appear: true },
          {
            default: () =>
              state.visible
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
                      style: {
                        backgroundColor: resolvedOptions.background
                      }
                    },
                    [
                      h('div', { class: 'yh-loading-spinner' }, [
                        resolvedOptions.spinner
                          ? typeof resolvedOptions.spinner === 'string'
                            ? h('i', { class: resolvedOptions.spinner })
                            : isVNode(resolvedOptions.spinner)
                              ? resolvedOptions.spinner
                              : h(resolvedOptions.spinner as Component)
                          : h(YhSpin, {
                              tip: resolvedOptions.text,
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

  let target: HTMLElement = document.body
  if (resolvedOptions.fullscreen) {
    target = document.body
  } else if (resolvedOptions.target) {
    target =
      typeof resolvedOptions.target === 'string'
        ? (document.querySelector(resolvedOptions.target) as HTMLElement)
        : resolvedOptions.target
  }
  if (!target) target = document.body

  // 内部自动维护定位状态，防止闪烁
  const isRelative =
    target.style.position === 'relative' || target.classList.contains('yh-loading-parent--relative')
  if (!resolvedOptions.fullscreen && !isRelative) {
    target.classList.add('yh-loading-parent--relative')
  }

  target.appendChild(container)

  if (resolvedOptions.lock) {
    target.style.overflow = 'hidden'
  }

  const instance: LoadingInstance = {
    close: () => {
      // 1. 触发可见性改变（开启 Transition 动画）
      state.visible = false

      // 2. 延迟执行物理移除（必须等待动画完成）
      setTimeout(() => {
        render(null, container)
        container.remove()

        // 只有在 DOM 彻底消失后，才允许恢复父元素的定位状态
        if (!resolvedOptions.fullscreen) {
          target.classList.remove('yh-loading-parent--relative')
        }

        if (resolvedOptions.lock) {
          target.style.overflow = ''
        }
      }, 400) // 略晚于 CSS 的 0.3s
    },
    get visible() {
      return state.visible
    }
  }

  return instance
}

export const Loading = {
  service: createLoading
}
