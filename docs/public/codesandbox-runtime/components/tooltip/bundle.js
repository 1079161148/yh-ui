// docs/public/codesandbox-runtime/components/tooltip/src/tooltip.js
import {
  renderSlot as _renderSlot,
  createCommentVNode as _createCommentVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
import {
  ref as ref12,
  computed as computed11,
  watch as watch4,
  onMounted as onMounted3,
  onUnmounted as onUnmounted4,
  nextTick
} from 'vue'
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom'

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

// docs/public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed, inject as inject2, unref as unref2 } from 'vue'
var zIndexContextKey = Symbol('zIndexContextKey')
var zIndexCounterKey = Symbol('zIndexCounterKey')

// docs/public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed3, onUnmounted } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed5, unref as unref4, watch } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject3, computed as computed4, unref as unref3 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')

// docs/public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from 'dayjs'
var _a
var dayjs =
  'default' in dayjsModule ? ((_a = dayjsModule.default) != null ? _a : dayjsModule) : dayjsModule

// docs/public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import 'dayjs/locale/en'

// docs/public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed6, inject as inject4, unref as unref5, useId as useVueId } from 'vue'
var idInjectionKey = Symbol('idInjectionKey')
var useId = (idOverrides) => {
  const injectedId = inject4(idInjectionKey, void 0)
  const nativeId = useVueId()
  const id = computed6(() => {
    const override = unref5(idOverrides)
    if (override) return override
    const injected = unref5(injectedId)
    if (injected) return injected
    return nativeId
  })
  return id
}

// docs/public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')

// docs/public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed7, unref as unref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from 'vue'
function useEventListener(target, event, handler, options) {
  if (typeof window === 'undefined') return
  const getTarget = () => {
    if (typeof target === 'function') {
      return target()
    }
    return unref7(target)
  }
  const add = () => {
    const el = getTarget()
    if (el) {
      el.addEventListener(event, handler, options)
    }
  }
  const remove = () => {
    const el = getTarget()
    if (el) {
      el.removeEventListener(event, handler, options)
    }
  }
  onMounted(add)
  onBeforeUnmount(remove)
  if (isRef(target)) {
    watch2(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options)
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options)
      }
    })
  }
}

// docs/public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from 'vue'

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject6, provide, computed as computed10, unref as unref9 } from 'vue'
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
  const globalThemes = inject6(COMPONENT_THEME_KEY, {})
  const mergedVars = computed10(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref9(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed10(() => {
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
  const hasCustomTheme = computed10(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/tooltip/src/tooltip-meta.js
var tooltipProps = {
  /** 显示内容 */
  content: {
    type: String,
    default: ''
  },
  /** 出现位置 */
  placement: {
    type: String,
    default: 'top'
  },
  /** 触发方式 */
  trigger: {
    type: [String, Array],
    default: 'hover'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 消失延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 200
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 手动控制显示隐藏 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：dark / light 或自定义名称 */
  effect: {
    type: String,
    default: 'dark'
  },
  /** 是否跟随鼠标移动 (高级功能) */
  followCursor: {
    type: Boolean,
    default: false
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /** 手动控制动画名称 */
  transition: {
    type: String,
    default: 'yh-tooltip-fade'
  },
  /** 是否在隐藏时销毁 DOM 节点 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 是否作为 HTML 字符串渲染 content 属性 */
  rawContent: {
    type: Boolean,
    default: false
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: 'auto'
  },
  /** 弹出层最大高度 */
  maxHeight: {
    type: [String, Number],
    default: 'none'
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 弹出内容自定义类名 */
  contentClass: {
    type: String,
    default: ''
  },
  /** 弹出内容自定义样式 */
  contentStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头自定义类名 */
  arrowClass: {
    type: String,
    default: ''
  },
  /** 箭头自定义样式 */
  arrowStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头容器自定义类名 */
  arrowWrapperClass: {
    type: String,
    default: ''
  },
  /** 箭头容器自定义样式 */
  arrowWrapperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var tooltipEmits = {
  'update:visible': (visible) => typeof visible === 'boolean',
  show: () => true,
  hide: () => true
}

// docs/public/codesandbox-runtime/components/tooltip/src/tooltip.js
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
var _hoisted_1 = ['id', 'data-placement']
var _hoisted_2 = ['innerHTML']
var _hoisted_3 = { key: 1 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        ref: 'triggerRef',
        onMouseenter: _cache[2] || (_cache[2] = ($event) => $setup.handleTrigger($event, 'hover')),
        onMouseleave:
          _cache[3] ||
          (_cache[3] = ($event) => $setup.triggers.has('hover') && $setup.toggleVisible(false)),
        onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleTrigger($event, 'click')),
        onContextmenu:
          _cache[5] || (_cache[5] = ($event) => $setup.handleTrigger($event, 'contextmenu')),
        onFocusin: _cache[6] || (_cache[6] = ($event) => $setup.handleTrigger($event, 'focus')),
        onFocusout:
          _cache[7] ||
          (_cache[7] = ($event) => $setup.triggers.has('focus') && $setup.toggleVisible(false))
      },
      [
        _renderSlot(_ctx.$slots, 'default'),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: 'body',
            disabled: !_ctx.teleported
          },
          [
            _createVNode(
              _Transition,
              { name: _ctx.transition },
              {
                default: _withCtx(() => [
                  $setup.shouldRender
                    ? _withDirectives(
                        (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            id: $setup.tooltipId,
                            ref: 'popperRef',
                            class: _normalizeClass($setup.popperClasses),
                            style: _normalizeStyle($setup.computedPopperStyle),
                            'data-placement': $setup.actualPlacement,
                            onMouseenter:
                              _cache[0] ||
                              (_cache[0] = ($event) =>
                                _ctx.interactive && $setup.toggleVisible(true)),
                            onMouseleave:
                              _cache[1] ||
                              (_cache[1] = ($event) =>
                                _ctx.interactive &&
                                $setup.triggers.has('hover') &&
                                $setup.toggleVisible(false))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass([
                                  $setup.ns.e('content'),
                                  $setup.props.contentClass
                                ]),
                                style: _normalizeStyle($setup.computedContentStyle)
                              },
                              [
                                _renderSlot(_ctx.$slots, 'content', {}, () => [
                                  _createCommentVNode(' eslint-disable-next-line vue/no-v-html '),
                                  _ctx.rawContent
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 0,
                                          innerHTML: _ctx.content
                                        },
                                        null,
                                        8,
                                        _hoisted_2
                                      ))
                                    : (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        _hoisted_3,
                                        _toDisplayString(_ctx.content),
                                        1
                                        /* TEXT */
                                      ))
                                ])
                              ],
                              6
                              /* CLASS, STYLE */
                            ),
                            _createCommentVNode(
                              ' \u5C0F\u4E09\u89D2 - \u4F7F\u7528 Floating UI \u5B98\u65B9\u63A8\u8350\u7684 SVG \u8DEF\u5F84\u65B9\u6848 '
                            ),
                            _ctx.showArrow
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    ref: 'arrowRef',
                                    class: _normalizeClass($setup.ns.e('arrow-wrapper')),
                                    style: _normalizeStyle($setup.arrowStyle)
                                  },
                                  [
                                    (_openBlock(),
                                    _createElementBlock(
                                      'svg',
                                      {
                                        class: _normalizeClass($setup.ns.e('arrow')),
                                        width: '12',
                                        height: '12',
                                        viewBox: '0 0 12 12',
                                        xmlns: 'http://www.w3.org/2000/svg'
                                      },
                                      [
                                        ...(_cache[8] ||
                                          (_cache[8] = [
                                            _createElementVNode(
                                              'path',
                                              { d: 'M0,0 L6,6 L12,0' },
                                              null,
                                              -1
                                              /* CACHED */
                                            )
                                          ]))
                                      ],
                                      2
                                      /* CLASS */
                                    ))
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          46,
                          _hoisted_1
                        )),
                        [[_vShow, $setup.showPopper]]
                      )
                    : _createCommentVNode('v-if', true)
                ]),
                _: 3
                /* FORWARDED */
              },
              8,
              ['name']
            )
          ],
          8,
          ['disabled']
        ))
      ],
      34
      /* CLASS, NEED_HYDRATION */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTooltip'
  },
  {
    __name: 'tooltip',
    props: tooltipProps,
    emits: tooltipEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('tooltip')
      const tooltipId = useId()
      const { themeStyle } = useComponentTheme(
        'tooltip',
        computed11(() => props.themeOverrides)
      )
      const triggerRef = ref12(null)
      const popperRef = ref12(null)
      const arrowRef = ref12(null)
      const visible = ref12(false)
      const popperStyle = ref12({})
      const arrowStyle = ref12({})
      const computedPopperStyle = computed11(() => {
        const styles = __spreadValues2(__spreadValues2({}, themeStyle.value), popperStyle.value)
        if (typeof props.popperStyle === 'object') {
          Object.assign(styles, props.popperStyle)
        }
        return styles
      })
      const computedContentStyle = computed11(() => {
        const styles = {
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
          overflowY: props.scrollable ? 'auto' : 'visible'
        }
        if (typeof props.contentStyle === 'object') {
          Object.assign(styles, props.contentStyle)
        }
        return styles
      })
      const actualPlacement = ref12(props.placement)
      let cleanup = null
      let showTimer = null
      let hideTimer = null
      const showPopper = computed11(() => {
        if (props.disabled) return false
        return props.visible !== null ? props.visible : visible.value
      })
      const shouldRender = computed11(() => props.persistent || showPopper.value)
      const popperClasses = computed11(() => [
        ns.e('popper'),
        ns.is(props.effect, true),
        // 使用 is-dark / is-light 更加稳定
        ns.em('popper', props.effect),
        ns.is('interactive', props.interactive),
        props.popperClass
      ])
      const updatePosition = async () => {
        if (!triggerRef.value || !popperRef.value || typeof window === 'undefined') return
        const { x, y, placement, middlewareData } = await computePosition(
          triggerRef.value,
          popperRef.value,
          {
            placement: props.placement,
            middleware: [
              offset(props.offset[1]),
              flip(),
              shift({ padding: 5 }),
              props.showArrow ? arrow({ element: arrowRef.value }) : null
            ].filter((item) => item !== null)
          }
        )
        popperStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: String(props.zIndex)
        }
        actualPlacement.value = placement
        if (middlewareData.arrow && arrowRef.value) {
          const { x: ax, y: ay } = middlewareData.arrow
          const side = placement.split('-')[0]
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
          }[side]
          arrowStyle.value = {
            left: ax != null ? `${ax}px` : '',
            top: ay != null ? `${ay}px` : '',
            [staticSide]: '-12px'
          }
        }
      }
      const handleMouseMove = async (e) => {
        if (!props.followCursor || !visible.value || typeof window === 'undefined') return
        const virtualElement = {
          getBoundingClientRect: () => {
            const rect = {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              left: e.clientX,
              right: e.clientX,
              bottom: e.clientY,
              toJSON: () => ({})
            }
            return rect
          }
        }
        const { x, y } = await computePosition(virtualElement, popperRef.value, {
          placement: props.placement,
          middleware: [offset(10), flip(), shift()]
        })
        popperStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: String(props.zIndex)
        }
      }
      const toggleVisible = (value) => {
        if (props.disabled) return
        if (showTimer) {
          clearTimeout(showTimer)
          showTimer = null
        }
        if (hideTimer) {
          clearTimeout(hideTimer)
          hideTimer = null
        }
        if (value) {
          const delay = props.showAfter
          if (delay <= 0) {
            visible.value = true
            emit('update:visible', true)
            emit('show')
            nextTick(startAutoUpdate)
          } else {
            showTimer = setTimeout(() => {
              visible.value = true
              emit('update:visible', true)
              emit('show')
              nextTick(startAutoUpdate)
            }, delay)
          }
        } else {
          const delay = props.hideAfter
          if (delay <= 0) {
            visible.value = false
            emit('update:visible', false)
            emit('hide')
            stopAutoUpdate()
          } else {
            hideTimer = setTimeout(() => {
              visible.value = false
              emit('update:visible', false)
              emit('hide')
              stopAutoUpdate()
            }, delay)
          }
        }
      }
      const startAutoUpdate = async () => {
        if (cleanup) cleanup()
        if (
          triggerRef.value &&
          popperRef.value &&
          !props.followCursor &&
          typeof window !== 'undefined'
        ) {
          cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition)
        }
      }
      const stopAutoUpdate = () => {
        if (cleanup) {
          cleanup()
          cleanup = null
        }
      }
      const triggers = computed11(() => {
        const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger]
        return new Set(t)
      })
      const handleTrigger = (e, type) => {
        if (!triggers.value.has(type)) return
        if (type === 'hover') {
          toggleVisible(true)
        } else if (type === 'click') {
          const isShowing = (visible.value && !hideTimer) || showTimer
          toggleVisible(!isShowing)
        } else if (type === 'contextmenu') {
          e.preventDefault()
          toggleVisible(true)
        } else if (type === 'focus') {
          toggleVisible(true)
        }
      }
      useEventListener(
        () => window,
        'click',
        (e) => {
          var _a2, _b
          const me = e
          if (!visible.value) return
          const needsClose = triggers.value.has('click') || triggers.value.has('contextmenu')
          if (!needsClose) return
          const target = me.target
          if (
            !((_a2 = triggerRef.value) == null ? void 0 : _a2.contains(target)) &&
            !((_b = popperRef.value) == null ? void 0 : _b.contains(target))
          ) {
            toggleVisible(false)
          }
        }
      )
      watch4(
        () => props.visible,
        (val) => {
          if (val !== null && val !== visible.value) {
            visible.value = val
            if (val) nextTick(startAutoUpdate)
            else stopAutoUpdate()
          }
        },
        { immediate: true }
      )
      watch4(
        () => props.followCursor,
        (val) => {
          if (typeof window === 'undefined') return
          if (val) {
            window.addEventListener('mousemove', handleMouseMove)
          } else {
            window.removeEventListener('mousemove', handleMouseMove)
          }
        }
      )
      onMounted3(() => {
        if (props.followCursor && typeof window !== 'undefined') {
          window.addEventListener('mousemove', handleMouseMove)
        }
      })
      onUnmounted4(() => {
        stopAutoUpdate()
        if (typeof window !== 'undefined') {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      })
      __expose({
        updatePosition,
        visible,
        triggerRef,
        popperRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        tooltipId,
        themeStyle,
        triggerRef,
        popperRef,
        arrowRef,
        visible,
        popperStyle,
        arrowStyle,
        computedPopperStyle,
        computedContentStyle,
        actualPlacement,
        get cleanup() {
          return cleanup
        },
        set cleanup(v) {
          cleanup = v
        },
        get showTimer() {
          return showTimer
        },
        set showTimer(v) {
          showTimer = v
        },
        get hideTimer() {
          return hideTimer
        },
        set hideTimer(v) {
          hideTimer = v
        },
        showPopper,
        shouldRender,
        popperClasses,
        updatePosition,
        handleMouseMove,
        toggleVisible,
        startAutoUpdate,
        stopAutoUpdate,
        triggers,
        handleTrigger,
        ref: ref12,
        computed: computed11,
        watch: watch4,
        onMounted: onMounted3,
        onUnmounted: onUnmounted4,
        nextTick,
        get computePosition() {
          return computePosition
        },
        get offset() {
          return offset
        },
        get flip() {
          return flip
        },
        get shift() {
          return shift
        },
        get arrow() {
          return arrow
        },
        get autoUpdate() {
          return autoUpdate
        },
        get useNamespace() {
          return useNamespace
        },
        get useId() {
          return useId
        },
        get useEventListener() {
          return useEventListener
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tooltipProps() {
          return tooltipProps
        },
        get tooltipEmits() {
          return tooltipEmits
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default2 = __sfc__
export { stdin_default2 as default }
