import { defineComponent, provide, renderSlot, watch, computed, ref, h, onMounted } from 'vue'
import { useTheme, ThemeManager } from '../../../theme/index.js'
import { zhCn } from '../../../locale/index.js'
import { configProviderContextKey } from '../../../hooks/index.js'
const configProviderProps = {
  theme: {
    type: String,
    default: 'default'
  },
  locale: {
    type: Object,
    default: zhCn
  },
  size: {
    type: String,
    default: 'default'
  },
  zIndex: {
    type: Number,
    default: 2e3
  },
  message: {
    type: Object,
    default: () => ({})
  },
  global: {
    type: Boolean,
    default: true
  }
}
var stdin_default = defineComponent({
  name: 'YhConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const containerRef = ref(null)
    const isMounted = ref(false)
    let themeManager = null
    const validPresets = ['default', 'dark', 'blue', 'green', 'purple', 'orange']
    const isValidPreset = (theme) => {
      return validPresets.includes(theme)
    }
    const getThemeManager = () => {
      if (props.global) {
        return useTheme()
      }
      if (!themeManager) {
        themeManager = new ThemeManager({ preset: 'default' })
      }
      return themeManager
    }
    const applyTheme = (theme, el) => {
      if (!theme) return
      const manager = getThemeManager()
      if (!props.global && el) {
        manager.apply({ scope: el })
      }
      if (isValidPreset(theme)) {
        manager.setThemePreset(theme)
      } else if (typeof theme === 'string' && theme.startsWith('#')) {
        manager.setThemeColor(theme)
      }
    }
    onMounted(() => {
      isMounted.value = true
      if (!props.global && containerRef.value) {
        const manager = getThemeManager()
        const initialPreset = isValidPreset(props.theme) ? props.theme : 'default'
        manager.apply({
          scope: containerRef.value,
          preset: initialPreset
        })
        if (!isValidPreset(props.theme) && props.theme.startsWith('#')) {
          manager.setThemeColor(props.theme)
        }
      } else if (props.global) {
        applyTheme(props.theme)
      }
    })
    watch(
      () => props.theme,
      (newTheme) => {
        if (isMounted.value) {
          applyTheme(newTheme, containerRef.value)
        }
      }
    )
    const config = computed(() => ({
      size: props.size,
      zIndex: props.zIndex,
      locale: props.locale,
      message: props.message
    }))
    const themeStyles = computed(() => {
      const manager = getThemeManager()
      const themeState = manager.state
      void themeState.theme
      void themeState.dark
      void themeState.density
      void themeState.colorBlindMode
      void themeState.algorithm
      void themeState.componentThemeVersion
      void themeState.breakpoint
      void JSON.stringify(themeState.colors)
      const colors = {}
      if (!isValidPreset(props.theme) && props.theme.startsWith('#')) {
        colors.primary = props.theme
      }
      return manager.getThemeStyles(colors)
    })
    provide(configProviderContextKey, config)
    return () => {
      return h(
        'div',
        {
          ref: containerRef,
          class: 'yh-config-provider',
          style: themeStyles.value
        },
        [renderSlot(slots, 'default')]
      )
    }
  }
})
export { configProviderProps, stdin_default as default }
