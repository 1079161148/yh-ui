import {
  createVNode,
  render,
  reactive,
  h,
  isVNode,
  Transition,
  type AppContext,
  type VNode,
  type Component,
  computed,
  onBeforeUnmount
} from 'vue'
import { useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
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
  /** 主题覆盖变量 */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface LoadingInstance {
  close: () => void
  readonly visible: boolean
}

let defaultAppContext: AppContext | null = null

export const setLoadingDefaultAppContext = (appContext?: AppContext | null) => {
  defaultAppContext = appContext ?? null
}

const createLoading = (options: LoadingOptions = {}, appContext?: AppContext): LoadingInstance => {
  const defaultTarget = document.querySelector<HTMLElement>('.yh-config-provider') ?? document.body
  const resolvedOptions = {
    target: defaultTarget,
    body: false,
    fullscreen: true,
    lock: false,
    glass: false,
    ...options
  }

  const state = reactive({
    visible: true
  })

  let target: HTMLElement =
    typeof resolvedOptions.target === 'string'
      ? (document.querySelector<HTMLElement>(resolvedOptions.target) ?? document.body)
      : resolvedOptions.target
  if (!target) target = document.body

  if (resolvedOptions.fullscreen) {
    target = defaultTarget
  }

  const parent =
    !resolvedOptions.fullscreen && resolvedOptions.body && target !== document.body
      ? document.body
      : target
  const bodyWrappedTarget =
    !resolvedOptions.fullscreen && parent === document.body && target !== document.body
  const maskStyle = reactive<Record<string, string>>({})
  let resizeObserver: ResizeObserver | null = null

  const syncMaskStyle = () => {
    Object.keys(maskStyle).forEach((key) => delete maskStyle[key])
    if (!bodyWrappedTarget) return

    const rect = target.getBoundingClientRect()
    maskStyle.top = `${window.scrollY + rect.top}px`
    maskStyle.left = `${window.scrollX + rect.left}px`
    maskStyle.right = 'auto'
    maskStyle.bottom = 'auto'
    maskStyle.width = `${rect.width}px`
    maskStyle.height = `${rect.height}px`
  }

  const syncMaskPosition = () => {
    syncMaskStyle()
  }

  const component = {
    setup() {
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'loading',
        computed(() => resolvedOptions.themeOverrides)
      )

      onBeforeUnmount(() => {
        window.removeEventListener('resize', syncMaskPosition)
        window.removeEventListener('scroll', syncMaskPosition, true)
        resizeObserver?.disconnect()
        resizeObserver = null
      })

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
                      style: [
                        { backgroundColor: resolvedOptions.background },
                        themeStyle.value,
                        maskStyle
                      ]
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
                              tip: resolvedOptions.text ?? t('loading.text'),
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
  const resolvedAppContext = appContext ?? defaultAppContext
  if (resolvedAppContext) {
    vnode.appContext = resolvedAppContext
  }
  render(vnode, container)

  // 内部自动维护定位状态，防止闪烁
  const computedPosition = window.getComputedStyle(target).position
  const needsRelativeParent =
    !resolvedOptions.fullscreen && !bodyWrappedTarget && computedPosition === 'static'
  if (needsRelativeParent) {
    target.classList.add('yh-loading-parent--relative')
  }

  if (bodyWrappedTarget) {
    syncMaskStyle()
    window.addEventListener('resize', syncMaskPosition)
    window.addEventListener('scroll', syncMaskPosition, true)
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncMaskPosition)
      resizeObserver.observe(target)
    }
  }

  parent.appendChild(container)

  const lockTarget = resolvedOptions.fullscreen ? document.body : target
  const originalOverflow = lockTarget.style.overflow
  if (resolvedOptions.lock) {
    lockTarget.style.overflow = 'hidden'
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
        if (needsRelativeParent) {
          target.classList.remove('yh-loading-parent--relative')
        }

        if (resolvedOptions.lock) {
          lockTarget.style.overflow = originalOverflow
        }

        window.removeEventListener('resize', syncMaskPosition)
        window.removeEventListener('scroll', syncMaskPosition, true)
        resizeObserver?.disconnect()
        resizeObserver = null
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
