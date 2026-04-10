// docs/public/codesandbox-runtime/components/card/src/card.js
import {
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  Fragment as _Fragment
} from 'vue'
import { computed as computed3 } from 'vue'

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

// docs/public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject2, computed, unref as unref2 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')
var useConfig = () => {
  const configRef = inject2(configProviderContextKey, null)
  const globalSize = computed(() => {
    const config = unref2(configRef)
    return (config == null ? void 0 : config.size) || 'default'
  })
  const globalZIndex = computed(() => {
    const config = unref2(configRef)
    return (config == null ? void 0 : config.zIndex) || 2e3
  })
  const globalLocale = computed(() => {
    const config = unref2(configRef)
    return config == null ? void 0 : config.locale
  })
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  }
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject3, provide, computed as computed2, unref as unref3 } from 'vue'
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
  const globalThemes = inject3(COMPONENT_THEME_KEY, {})
  const mergedVars = computed2(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref3(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed2(() => {
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
  const hasCustomTheme = computed2(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/card/src/card.js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.cardClasses),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' \u52A0\u8F7D\u72B6\u6001 '),
        $props.loading
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('loading'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('loading-content'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('skeleton-header'))
                      },
                      null,
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('skeleton-paragraph'))
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('skeleton-line'))
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('skeleton-line'))
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('skeleton-line'))
                          },
                          null,
                          2
                          /* CLASS */
                        )
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ))
          : (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createCommentVNode(' \u6B63\u5E38\u5185\u5BB9 '),
                _createCommentVNode(' \u5361\u7247\u5934\u90E8 '),
                _ctx.$slots.header || $props.header || _ctx.$slots.extra
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.headerClasses),
                        style: _normalizeStyle($props.headerStyle)
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('header-wrapper'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('header-title'))
                              },
                              [
                                _renderSlot(_ctx.$slots, 'header', {}, () => [
                                  _createTextVNode(
                                    _toDisplayString($props.header),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ],
                              2
                              /* CLASS */
                            ),
                            _ctx.$slots.extra
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e('header-extra'))
                                  },
                                  [_renderSlot(_ctx.$slots, 'extra')],
                                  2
                                  /* CLASS */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    ))
                  : _createCommentVNode('v-if', true),
                _createCommentVNode(' \u5361\u7247\u4E3B\u4F53 '),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.bodyClasses),
                    style: _normalizeStyle($props.bodyStyle)
                  },
                  [_renderSlot(_ctx.$slots, 'default')],
                  6
                  /* CLASS, STYLE */
                ),
                _createCommentVNode(' \u5361\u7247\u5E95\u90E8 '),
                _ctx.$slots.footer
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 1,
                        class: _normalizeClass($setup.footerClasses)
                      },
                      [_renderSlot(_ctx.$slots, 'footer')],
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCard'
  },
  {
    __name: 'card',
    props: {
      header: { type: String, required: false },
      bodyStyle: { type: Object, required: false },
      headerStyle: { type: Object, required: false },
      shadow: { type: null, required: false, default: 'always' },
      bordered: { type: Boolean, required: false, default: true },
      hoverable: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: 'default' },
      loading: { type: Boolean, required: false, default: false },
      bodyPadding: { type: Boolean, required: false, default: true },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('card')
      const { globalSize } = useConfig()
      const { themeStyle } = useComponentTheme(
        'card',
        computed3(() => props.themeOverrides)
      )
      const cardClasses = computed3(() => [
        ns.b(),
        ns.m(props.shadow),
        ns.m(props.size || globalSize.value || 'default'),
        ns.is('bordered', props.bordered),
        ns.is('hoverable', props.hoverable),
        ns.is('loading', props.loading)
      ])
      const headerClasses = computed3(() => [ns.e('header')])
      const bodyClasses = computed3(() => [
        ns.e('body'),
        !props.bodyPadding && ns.em('body', 'no-padding')
      ])
      const footerClasses = computed3(() => [ns.e('footer')])
      const __returned__ = {
        props,
        ns,
        globalSize,
        themeStyle,
        cardClasses,
        headerClasses,
        bodyClasses,
        footerClasses,
        computed: computed3,
        get useNamespace() {
          return useNamespace
        },
        get useConfig() {
          return useConfig
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
