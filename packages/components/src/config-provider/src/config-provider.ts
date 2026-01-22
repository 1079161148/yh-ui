import { defineComponent, provide, renderSlot, watch, computed, ref, h, onMounted } from 'vue'
import type { PropType, InjectionKey, ExtractPropTypes, ComputedRef } from 'vue'
import { useTheme, ThemeManager } from '@yh-ui/theme'
import type { PresetTheme } from '@yh-ui/theme'
import type { Language } from './locale'
import { zhCn } from './locale'

export interface ConfigProviderContext {
  size?: 'small' | 'default' | 'large'
  zIndex?: number
  locale?: Language
  message?: {
    max?: number
    duration?: number
    offset?: number
  }
}

export const configProviderContextKey: InjectionKey<ComputedRef<ConfigProviderContext>> = Symbol(
  'configProviderContextKey'
)

export const configProviderProps = {
  theme: {
    type: String as PropType<string | PresetTheme>,
    default: 'default'
  },
  locale: {
    type: Object as PropType<Language>,
    default: zhCn
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  zIndex: {
    type: Number,
    default: 2000
  },
  message: {
    type: Object as PropType<ConfigProviderContext['message']>,
    default: () => ({})
  },
  global: {
    type: Boolean,
    default: true
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export default defineComponent({
  name: 'YhConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const containerRef = ref<HTMLElement | null>(null)
    // 标记是否已初始化（mounted）
    const isMounted = ref(false)
    // 为非全局模式创建独立的主题管理器实例（延迟创建，等待 mounted 设置 scope）
    let themeManager: ThemeManager | null = null

    // 有效的预设主题名称
    const validPresets = ['default', 'dark', 'blue', 'green', 'purple', 'orange']

    // 判断主题是否为有效的预设名称
    const isValidPreset = (theme: string | PresetTheme): boolean => {
      return validPresets.includes(theme as string)
    }

    // 获取或创建主题管理器
    const getThemeManager = (): ThemeManager => {
      if (props.global) {
        return useTheme()
      }
      if (!themeManager) {
        // 延迟创建，不在构造函数中初始化
        themeManager = new ThemeManager({ preset: 'default' })
      }
      return themeManager
    }

    // 统一处理主题切换（带作用域支持）
    const applyTheme = (theme: string | PresetTheme, el?: HTMLElement | null) => {
      if (!theme) return

      const manager = getThemeManager()

      // 如果是非全局模式且提供了容器元素，设置作用域
      if (!props.global && el) {
        manager.apply({ scope: el })
      }

      if (isValidPreset(theme)) {
        manager.setThemePreset(theme as PresetTheme)
      } else if (typeof theme === 'string' && theme.startsWith('#')) {
        manager.setThemeColor(theme)
      }
    }

    // 初始化
    onMounted(() => {
      isMounted.value = true

      if (!props.global && containerRef.value) {
        // 非全局模式：初始化主题管理器并设置作用域
        const manager = getThemeManager()
        const initialPreset = isValidPreset(props.theme) ? (props.theme as PresetTheme) : 'default'

        // 应用初始配置到容器
        manager.apply({
          scope: containerRef.value,
          preset: initialPreset
        })

        // 如果主题是自定义颜色值，额外应用
        if (!isValidPreset(props.theme) && props.theme.startsWith('#')) {
          manager.setThemeColor(props.theme)
        }
      } else if (props.global) {
        // 全局模式：直接应用主题
        applyTheme(props.theme)
      }
    })

    // 监听主题变化
    watch(
      () => props.theme,
      (newTheme) => {
        // 只有在 mounted 后才处理变化，避免在服务端渲染或初始化阶段出错
        if (isMounted.value) {
          applyTheme(newTheme, containerRef.value)
        }
      }
    )

    const config = computed<ConfigProviderContext>(() => ({
      size: props.size,
      zIndex: props.zIndex,
      locale: props.locale,
      message: props.message
    }))

    // 注意：提供 computed 本身而不是 .value，确保子组件能响应式获取更新
    provide(configProviderContextKey, config)

    return () => {
      // 非全局模式：使用普通 div 容器（不要用 display:contents，否则 CSS 变量无法继承）
      // 全局模式：可以使用 fragment 风格
      return h(
        'div',
        {
          ref: containerRef,
          class: 'yh-config-provider'
        },
        [renderSlot(slots, 'default')]
      )
    }
  }
})
