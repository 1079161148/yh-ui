// docs/public/codesandbox-runtime/components/skeleton/src/skeleton.js
import {
  renderSlot as _renderSlot2,
  createCommentVNode as _createCommentVNode2,
  createVNode as _createVNode,
  normalizeClass as _normalizeClass2,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2,
  createBlock as _createBlock,
  renderList as _renderList2,
  Fragment as _Fragment2,
  normalizeStyle as _normalizeStyle2,
  createElementVNode as _createElementVNode2
} from 'vue'
import { ref as ref2, watch, onMounted, computed as computed3 } from 'vue'

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

// docs/public/codesandbox-runtime/components/skeleton/src/skeleton-meta.js
var skeletonItemProps = {
  /** 骨架屏种类 */
  variant: {
    type: String,
    default: 'text'
  },
  /** 宽度 */
  width: {
    type: [String, Number]
  },
  /** 高度 */
  height: {
    type: [String, Number]
  },
  /** 是否开启闪烁动画 */
  animated: {
    type: Boolean,
    default: true
  },
  /** 是否为圆角 */
  round: {
    type: Boolean,
    default: false
  },
  /** 为 true 时，圆角半径为 0 */
  sharp: {
    type: Boolean,
    default: false
  },
  /** 重复次数 */
  repeat: {
    type: Number,
    default: 1
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var skeletonProps = {
  /** 是否显示加载中渲染 */
  loading: {
    type: Boolean,
    default: true
  },
  /** 是否开启闪烁动画 */
  animated: {
    type: Boolean,
    default: true
  },
  /** 渲染的行数 */
  rows: {
    type: Number,
    default: 3
  },
  /** 渲染标题 */
  title: {
    type: Boolean,
    default: false
  },
  /** 渲染头衔 */
  avatar: {
    type: Boolean,
    default: false
  },
  /** 节流延迟渲染（ms） */
  throttle: {
    type: Number,
    default: 0
  },
  /** 自创高级：视口内才开始动画 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}

// docs/public/codesandbox-runtime/components/skeleton/src/skeleton-item.js
import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle
} from 'vue'
import { computed as computed2 } from 'vue'
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
var _hoisted_1 = {
  key: 0,
  style: { display: 'contents' }
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.props.repeat > 1
    ? (_openBlock(),
      _createElementBlock('div', _hoisted_1, [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.props.repeat, (i) => {
            return (
              _openBlock(),
              _createElementBlock(
                'div',
                {
                  key: i,
                  class: _normalizeClass($setup.classes),
                  style: _normalizeStyle($setup.style)
                },
                [
                  _ctx.variant === 'image'
                    ? _renderSlot(_ctx.$slots, 'image', { key: 0 }, () => [
                        _cache[0] ||
                          (_cache[0] = _createElementVNode(
                            'svg',
                            {
                              viewBox: '0 0 1024 1024',
                              width: '24',
                              height: '24'
                            },
                            [
                              _createElementVNode('path', {
                                fill: 'currentColor',
                                d: 'M160 160v640h704V160H160zm704-64c35.3 0 64 28.7 64 64v640c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h704zM320 320a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM320 576a32 32 0 0 0-32 32v128h64v-64l128-128 160 160 128-128 96 96v-128h64v192c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64v-192h64v128l128-128 128 128 192-192 128 128v-64h-64z'
                              })
                            ],
                            -1
                            /* CACHED */
                          ))
                      ])
                    : _createCommentVNode('v-if', true)
                ],
                6
                /* CLASS, STYLE */
              )
            )
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    : (_openBlock(),
      _createElementBlock(
        'div',
        {
          key: 1,
          class: _normalizeClass($setup.classes),
          style: _normalizeStyle($setup.style)
        },
        [
          _ctx.variant === 'image'
            ? _renderSlot(_ctx.$slots, 'image', { key: 0 }, () => [
                _cache[1] ||
                  (_cache[1] = _createElementVNode(
                    'svg',
                    {
                      viewBox: '0 0 1024 1024',
                      width: '24',
                      height: '24'
                    },
                    [
                      _createElementVNode('path', {
                        fill: 'currentColor',
                        d: 'M160 160v640h704V160H160zm704-64c35.3 0 64 28.7 64 64v640c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h704zM320 320a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM320 576a32 32 0 0 0-32 32v128h64v-64l128-128 160 160 128-128 96 96v-128h64v192c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64v-192h64v128l128-128 128 128 192-192 128 128v-64h-64z'
                      })
                    ],
                    -1
                    /* CACHED */
                  ))
              ])
            : _createCommentVNode('v-if', true)
        ],
        6
        /* CLASS, STYLE */
      ))
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSkeletonItem'
  },
  {
    __name: 'skeleton-item',
    props: skeletonItemProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('skeleton-item')
      const { themeStyle } = useComponentTheme(
        'skeleton-item',
        computed2(() => props.themeOverrides)
      )
      const style = computed2(() => {
        const s = __spreadValues2({}, themeStyle.value)
        if (props.width) {
          s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
        }
        if (props.height) {
          s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        }
        return s
      })
      const classes = computed2(() => [
        ns.b(),
        ns.m(props.variant),
        ns.is('animated', props.animated),
        ns.is('round', props.round),
        ns.is('sharp', props.sharp)
      ])
      const __returned__ = {
        props,
        ns,
        themeStyle,
        style,
        classes,
        computed: computed2,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get skeletonItemProps() {
          return skeletonItemProps
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__

// docs/public/codesandbox-runtime/components/skeleton/src/skeleton.js
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.uiLoading
    ? (_openBlock2(),
      _createElementBlock2(
        'div',
        {
          key: 0,
          ref: 'skeletonRef',
          class: _normalizeClass2($setup.containerClass),
          style: _normalizeStyle2($setup.themeStyle)
        },
        [
          _renderSlot2(_ctx.$slots, 'template', {}, () => [
            _createCommentVNode2(' \u9ED8\u8BA4\u5E03\u5C40\uFF1AAvatar + Title + Rows '),
            _ctx.avatar
              ? (_openBlock2(),
                _createElementBlock2(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass2($setup.ns.e('header'))
                  },
                  [
                    _createVNode(
                      $setup['YhSkeletonItem'],
                      {
                        variant: 'circle',
                        width: 48,
                        height: 48,
                        animated: $setup.isIntersecting && _ctx.animated
                      },
                      null,
                      8,
                      ['animated']
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode2('v-if', true),
            _createElementVNode2(
              'div',
              {
                class: _normalizeClass2($setup.ns.e('content'))
              },
              [
                _ctx.title
                  ? (_openBlock2(),
                    _createBlock(
                      $setup['YhSkeletonItem'],
                      {
                        key: 0,
                        variant: 'h3',
                        style: { width: '40%', 'margin-bottom': '16px' },
                        animated: $setup.isIntersecting && _ctx.animated
                      },
                      null,
                      8,
                      ['animated']
                    ))
                  : _createCommentVNode2('v-if', true),
                (_openBlock2(true),
                _createElementBlock2(
                  _Fragment2,
                  null,
                  _renderList2(_ctx.rows, (i) => {
                    return (
                      _openBlock2(),
                      _createBlock(
                        $setup['YhSkeletonItem'],
                        {
                          key: i,
                          variant: 'text',
                          style: _normalizeStyle2({
                            width: i === _ctx.rows && _ctx.rows > 1 ? '60%' : '100%',
                            marginBottom: i === _ctx.rows ? '0' : '12px'
                          }),
                          animated: $setup.isIntersecting && _ctx.animated
                        },
                        null,
                        8,
                        ['style', 'animated']
                      )
                    )
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            )
          ])
        ],
        6
        /* CLASS, STYLE */
      ))
    : _renderSlot2(_ctx.$slots, 'default', { key: 1 })
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSkeleton'
  },
  {
    __name: 'skeleton',
    props: skeletonProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('skeleton')
      const { themeStyle } = useComponentTheme(
        'skeleton',
        computed3(() => props.themeOverrides)
      )
      const uiLoading = ref2(props.loading && props.throttle <= 0)
      let timeout = null
      watch(
        () => props.loading,
        (val) => {
          if (timeout) clearTimeout(timeout)
          if (val) {
            if (props.throttle <= 0) {
              uiLoading.value = true
            } else {
              timeout = setTimeout(() => {
                uiLoading.value = true
              }, props.throttle)
            }
          } else {
            uiLoading.value = false
          }
        },
        { immediate: true }
      )
      const containerClass = computed3(() => [ns.b(), ns.is('animated', props.animated)])
      const isIntersecting = ref2(false)
      const skeletonRef = ref2(null)
      onMounted(() => {
        if (props.lazy && skeletonRef.value) {
          const observer = new IntersectionObserver(
            (entries) => {
              isIntersecting.value = entries[0].isIntersecting
            },
            { threshold: 0.1 }
          )
          observer.observe(skeletonRef.value)
        } else {
          isIntersecting.value = true
        }
      })
      const __returned__ = {
        props,
        ns,
        themeStyle,
        uiLoading,
        get timeout() {
          return timeout
        },
        set timeout(v) {
          timeout = v
        },
        containerClass,
        isIntersecting,
        skeletonRef,
        ref: ref2,
        watch,
        onMounted,
        computed: computed3,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get skeletonProps() {
          return skeletonProps
        },
        YhSkeletonItem: stdin_default
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default2 = __sfc__2
export { stdin_default2 as default }
