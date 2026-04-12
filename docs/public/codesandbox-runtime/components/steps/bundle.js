// docs/public/codesandbox-runtime/components/steps/src/steps.js
import {
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
import {
  computed as computed2,
  provide as provide2,
  ref as ref2,
  onMounted,
  onUnmounted
} from 'vue'

// docs/public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from 'vue'
var defaultNamespace = 'yh'
var statePrefix = 'is-'
var namespaceContextKey = Symbol('namespaceContextKey')
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}
var useNamespace = (block) => {
  const namespace = useGlobalNamespace()
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }
  const e = (element) => {
    return element ? `${b()}__${element}` : ''
  }
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : ''
  }
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`
    }
    return value ? `${statePrefix}${state}` : ''
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`
  }
  const cssVarObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`
  }
  const cssVarBlockObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
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
var COMPONENT_THEME_KEY = Symbol('component-theme')
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style = {}
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })
    return style
  })
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/steps/src/steps-meta.js
var stepsProps = {
  /** 当前激活步骤 */
  active: {
    type: Number,
    default: 0
  },
  /** 布局方向 */
  direction: {
    type: String,
    default: 'horizontal'
  },
  /** 居中显示 */
  alignCenter: {
    type: Boolean,
    default: false
  },
  /** 简洁风格 */
  simple: {
    type: Boolean,
    default: false
  },
  /** 点状进度 */
  progressDot: {
    type: [Boolean, String],
    default: false
  },
  /** 设置结束步骤的状态 */
  finishStatus: {
    type: String,
    default: 'finish'
  },
  /** 设置当前步骤的状态 */
  processStatus: {
    type: String,
    default: 'process'
  },
  /** 每个 step 的间距 */
  space: {
    type: [Number, String],
    default: ''
  },
  /** 可点击切换步骤 */
  clickable: {
    type: Boolean,
    default: false
  },
  // ========== 新增功能 ==========
  /** 尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 响应式布局 - 小屏幕自动切换为垂直 */
  responsive: {
    type: Boolean,
    default: false
  },
  /** 响应式断点（px） */
  responsiveBreakpoint: {
    type: Number,
    default: 768
  },
  /** 描述标签位置 */
  labelPlacement: {
    type: String,
    default: 'horizontal'
  },
  /** 显示进度条连接线 */
  showProgress: {
    type: Boolean,
    default: false
  },
  /** 显示时间线 */
  showTimeline: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var stepsEmits = {
  change: (index) => typeof index === 'number'
}
var STEPS_INJECTION_KEY = Symbol('yhSteps')

// docs/public/codesandbox-runtime/components/steps/src/steps.js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.stepsClass),
        style: _normalizeStyle($setup.themeStyle)
      },
      [_renderSlot(_ctx.$slots, 'default')],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSteps'
  },
  {
    __name: 'steps',
    props: stepsProps,
    emits: stepsEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('steps')
      const { themeStyle } = useComponentTheme(
        'steps',
        computed2(() => props.themeOverrides)
      )
      const steps = ref2([])
      const isResponsiveVertical = ref2(false)
      const checkResponsive = () => {
        if (props.responsive) {
          isResponsiveVertical.value = window.innerWidth < props.responsiveBreakpoint
        } else {
          isResponsiveVertical.value = false
        }
      }
      onMounted(() => {
        if (props.responsive) {
          checkResponsive()
          window.addEventListener('resize', checkResponsive)
        }
      })
      onUnmounted(() => {
        if (props.responsive) {
          window.removeEventListener('resize', checkResponsive)
        }
      })
      const registerStep = (step) => {
        const index = steps.value.findIndex((s) => s.uid === step.uid)
        if (index === -1) {
          steps.value.push(step)
        } else {
          steps.value[index] = step
        }
        steps.value.sort((a, b) => a.uid - b.uid)
      }
      const unregisterStep = (uid) => {
        const index = steps.value.findIndex((s) => s.uid === uid)
        if (index > -1) {
          steps.value.splice(index, 1)
        }
      }
      const handleStepClick = (index, disabled) => {
        if (!props.clickable || disabled) return
        emit('change', index)
      }
      provide2(STEPS_INJECTION_KEY, {
        props,
        steps,
        isResponsiveVertical,
        registerStep,
        unregisterStep,
        handleStepClick
      })
      const actualDirection = computed2(() => {
        if (isResponsiveVertical.value) return 'vertical'
        return props.direction
      })
      const stepsClass = computed2(() => [
        ns.b(),
        ns.m(actualDirection.value),
        ns.m(`size-${props.size}`),
        ns.m(`label-${props.labelPlacement}`),
        ns.is('simple', props.simple),
        ns.is('center', props.alignCenter),
        ns.is('dot', props.progressDot === true || props.progressDot === 'dot'),
        ns.is('navigation', props.progressDot === 'navigation'),
        ns.is('clickable', props.clickable),
        ns.is('progress', props.showProgress),
        ns.is('timeline', props.showTimeline),
        ns.is('responsive', props.responsive)
      ])
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        steps,
        isResponsiveVertical,
        checkResponsive,
        registerStep,
        unregisterStep,
        handleStepClick,
        actualDirection,
        stepsClass,
        computed: computed2,
        provide: provide2,
        ref: ref2,
        onMounted,
        onUnmounted,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get stepsProps() {
          return stepsProps
        },
        get stepsEmits() {
          return stepsEmits
        },
        get STEPS_INJECTION_KEY() {
          return STEPS_INJECTION_KEY
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
