// docs/public/codesandbox-runtime/components/icon/src/icon.js
import {
  createCommentVNode as _createCommentVNode,
  resolveDynamicComponent as _resolveDynamicComponent,
  openBlock as _openBlock,
  createBlock as _createBlock,
  createElementBlock as _createElementBlock,
  Fragment as _Fragment,
  renderSlot as _renderSlot,
  mergeProps as _mergeProps
} from 'vue'
import { computed as computed2, useSlots } from 'vue'

// docs/public/codesandbox-runtime/components/icon/src/icon-meta.js
var iconProps = {
  /**
   * 图标名称（使用内置图标时）
   */
  name: {
    type: String,
    default: ''
  },
  /**
   * SVG 字符串（直接渲染 SVG）
   */
  svg: {
    type: String,
    default: ''
  },
  /**
   * 图标组件（传入 Vue 组件）
   */
  icon: {
    type: Object,
    default: void 0
  },
  /**
   * 图标尺寸
   * - number: 像素值
   * - string: CSS 尺寸值（如 '1em', '24px'）
   */
  size: {
    type: [Number, String],
    default: void 0
  },
  /**
   * 图标颜色
   * - 默认继承父元素的 color
   */
  color: {
    type: String,
    default: void 0
  },
  /**
   * 是否启用旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  },
  /**
   * 旋转角度（度数）
   */
  rotate: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var iconRegistry = /* @__PURE__ */ new Map()
function getIcon(name) {
  return iconRegistry.get(name)
}

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

// docs/public/codesandbox-runtime/components/icon/src/icon.js
var __defProp2 = Object.defineProperty
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols
var __hasOwnProp2 = Object.prototype.hasOwnProperty
var __propIsEnum2 = Object.prototype.propertyIsEnumerable
var __defNormalProp2 = (obj, key, value) =>
  key in obj
    ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
    }
  return a
}
var _hoisted_1 = ['viewBox', 'innerHTML']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'i',
      _mergeProps(
        {
          class: $setup.iconClass,
          style: $setup.iconStyle
        },
        _ctx.$attrs
      ),
      [
        _createCommentVNode(' \u4F7F\u7528\u4F20\u5165\u7684\u56FE\u6807\u7EC4\u4EF6 '),
        $setup.useIconComponent
          ? (_openBlock(),
            _createBlock(_resolveDynamicComponent(_ctx.icon), {
              key: 0,
              class: 'yh-icon__inner'
            }))
          : $setup.svgContent && !$setup.hasSlot
            ? (_openBlock(),
              _createElementBlock(
                _Fragment,
                { key: 1 },
                [
                  _createCommentVNode(' \u4F7F\u7528 SVG \u5B57\u7B26\u4E32\u6E32\u67D3 '),
                  _createCommentVNode(' eslint-disable vue/no-v-html '),
                  (_openBlock(),
                  _createElementBlock(
                    'svg',
                    {
                      class: 'yh-icon__svg',
                      viewBox: $setup.viewBox,
                      xmlns: 'http://www.w3.org/2000/svg',
                      'aria-hidden': 'true',
                      innerHTML: $setup.svgContent
                    },
                    null,
                    8,
                    _hoisted_1
                  ))
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              ))
            : $setup.hasSlot
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 2 },
                  [
                    _createCommentVNode(' eslint-enable vue/no-v-html '),
                    _createCommentVNode(' \u4F7F\u7528\u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9 '),
                    _renderSlot(_ctx.$slots, 'default')
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode('v-if', true)
      ],
      16
      /* FULL_PROPS */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhIcon',
    inheritAttrs: false
  },
  {
    __name: 'icon',
    props: iconProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const slots = useSlots()
      const ns = useNamespace('icon')
      const { themeStyle } = useComponentTheme(
        'icon',
        computed2(() => props.themeOverrides)
      )
      const iconStyle = computed2(() => {
        const style = __spreadValues2({}, themeStyle.value)
        if (props.size) {
          const size = typeof props.size === 'number' ? `${props.size}px` : props.size
          style.fontSize = size
          style.width = size
          style.height = size
        }
        if (props.color) {
          style.color = props.color
        }
        if (props.rotate) {
          style.transform = `rotate(${props.rotate}deg)`
        }
        return style
      })
      const iconClass = computed2(() => [
        ns.b(),
        {
          [ns.m('spin')]: props.spin
        }
      ])
      const svgContent = computed2(() => {
        if (props.svg) {
          return props.svg
        }
        if (props.name) {
          const icon = getIcon(props.name)
          if (icon) {
            return icon.svg
          }
        }
        if (props.icon && '__svg' in props.icon) {
          return props.icon.__svg
        }
        return ''
      })
      const viewBox = computed2(() => {
        if (props.name) {
          const icon = getIcon(props.name)
          if (icon == null ? void 0 : icon.viewBox) {
            return icon.viewBox
          }
        }
        if (props.icon && '__viewBox' in props.icon) {
          return props.icon.__viewBox
        }
        return '0 0 24 24'
      })
      const hasSlot = computed2(() => !!slots.default)
      const useIconComponent = computed2(() => {
        return props.icon && !('__svg' in props.icon)
      })
      const __returned__ = {
        props,
        slots,
        ns,
        themeStyle,
        iconStyle,
        iconClass,
        svgContent,
        viewBox,
        hasSlot,
        useIconComponent,
        computed: computed2,
        useSlots,
        get iconProps() {
          return iconProps
        },
        get getIcon() {
          return getIcon
        },
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
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
