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
import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.badgeClasses)
      },
      [
        _createCommentVNode(' \u88AB\u5305\u88F9\u7684\u5143\u7D20 '),
        _renderSlot(_ctx.$slots, 'default'),
        _createCommentVNode(' \u5FBD\u6807\u5185\u5BB9 '),
        _createVNode(
          _Transition,
          {
            name: 'yh-zoom-in-center',
            appear: ''
          },
          {
            default: _withCtx(() => [
              $setup.isShow
                ? (_openBlock(),
                  _createElementBlock(
                    'span',
                    {
                      key: 0,
                      class: _normalizeClass($setup.contentClasses),
                      style: _normalizeStyle($setup.contentStyles)
                    },
                    [
                      _createCommentVNode(' \u81EA\u5B9A\u4E49\u5185\u5BB9\u63D2\u69FD '),
                      _ctx.$slots.content
                        ? _renderSlot(_ctx.$slots, 'content', { key: 0 })
                        : (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 1 },
                            [
                              _createCommentVNode(' \u9ED8\u8BA4\u5185\u5BB9 '),
                              _createTextVNode(
                                _toDisplayString($setup.content),
                                1
                                /* TEXT */
                              )
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))
                    ],
                    6
                    /* CLASS, STYLE */
                  ))
                : _createCommentVNode('v-if', true)
            ]),
            _: 3
            /* FORWARDED */
          }
        )
      ],
      2
      /* CLASS */
    )
  )
}
import { computed, useSlots } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { badgeTypes } from './badge'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhBadge'
  },
  {
    __name: 'badge',
    props: {
      value: { type: [String, Number], required: false },
      max: { type: Number, required: false, default: 99 },
      isDot: { type: Boolean, required: false, default: false },
      hidden: { type: Boolean, required: false, default: false },
      type: { type: null, required: false, default: 'danger' },
      showBorder: { type: Boolean, required: false, default: true },
      color: { type: String, required: false },
      offset: { type: Array, required: false },
      showZero: { type: Boolean, required: false, default: false },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const _types = badgeTypes
      const { themeStyle } = useComponentTheme(
        'badge',
        computed(() => props.themeOverrides)
      )
      const slots = useSlots()
      const ns = useNamespace('badge')
      const hasDefaultSlot = computed(() => !!slots.default)
      const content = computed(() => {
        if (props.isDot) return ''
        if (slots.content) return ''
        const { value, max } = props
        if (typeof value === 'number' && typeof max === 'number') {
          return value > max ? `${max}+` : value === 0 && !props.showZero ? '' : value
        }
        return value
      })
      const isShow = computed(() => {
        if (props.hidden) return false
        if (props.isDot) return true
        if (slots.content) return true
        const hasContent =
          content.value !== '' && content.value !== null && content.value !== void 0
        return hasContent
      })
      const badgeClasses = computed(() => [
        ns.b(),
        hasDefaultSlot.value ? ns.m('fixed') : ns.m('standalone')
      ])
      const contentClasses = computed(() => [
        ns.e('content'),
        ns.em('content', props.type),
        ns.is('dot', props.isDot),
        ns.is('fixed', hasDefaultSlot.value),
        !props.showBorder && ns.is('no-border')
      ])
      const contentStyles = computed(() => {
        const styles = {}
        if (props.color) {
          styles.backgroundColor = props.color
          if (props.showBorder) {
            styles.borderColor = props.color
          }
        }
        if (props.offset && hasDefaultSlot.value) {
          const [x, y] = props.offset
          styles.transform = `translate(${x}px, ${y}px)`
        }
        return __spreadValues(__spreadValues({}, themeStyle.value), styles)
      })
      const __returned__ = {
        props,
        _types,
        themeStyle,
        slots,
        ns,
        hasDefaultSlot,
        content,
        isShow,
        badgeClasses,
        contentClasses,
        contentStyles,
        computed,
        useSlots,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get badgeTypes() {
          return badgeTypes
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
