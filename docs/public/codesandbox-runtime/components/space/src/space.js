var __defProp = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m($props.direction),
          $setup.ns.is('wrap', $props.wrap),
          $setup.ns.is('fill', $props.fill)
        ]),
        style: _normalizeStyle($setup.spaceStyle)
      },
      [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.children, (child, idx) => {
            return (
              _openBlock(),
              _createElementBlock(
                _Fragment,
                { key: idx },
                [
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('item'))
                    },
                    [(_openBlock(), _createBlock(_resolveDynamicComponent(child)))],
                    2
                    /* CLASS */
                  ),
                  _createCommentVNode(
                    ' \u95F4\u9694\u7B26\uFF1A\u652F\u6301 #spacer \u63D2\u69FD\u548C spacer prop '
                  ),
                  $setup.showSpacer && idx < $setup.children.length - 1
                    ? (_openBlock(),
                      _createElementBlock(
                        'span',
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('spacer')),
                          'aria-hidden': 'true'
                        },
                        [
                          _renderSlot(_ctx.$slots, 'spacer', {}, () => [
                            _createTextVNode(
                              _toDisplayString($props.spacer),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      ))
                    : _createCommentVNode('v-if', true)
                ],
                64
                /* STABLE_FRAGMENT */
              )
            )
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        _createCommentVNode(
          ' \u9ED8\u8BA4\u63D2\u69FD\u964D\u7EA7\uFF08\u5F53\u65E0 children \u8BA1\u7B97\u65F6\uFF09 '
        ),
        !$setup.children.length
          ? _renderSlot(_ctx.$slots, 'default', { key: 0 })
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, useSlots, Fragment, Comment, Text } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhSpace' },
  {
    __name: 'space',
    props: {
      direction: { type: String, required: false, default: 'horizontal' },
      size: { type: [String, Number, Array], required: false, default: 'small' },
      align: { type: String, required: false, default: 'center' },
      justify: { type: String, required: false, default: 'start' },
      wrap: { type: Boolean, required: false, default: false },
      fill: { type: Boolean, required: false, default: false },
      spacer: { type: [String, Number], required: false },
      style: { type: [Object, String], required: false },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const slots = useSlots()
      const ns = useNamespace('space')
      const { themeStyle } = useComponentTheme(
        'space',
        computed(() => props.themeOverrides)
      )
      const sizeMap = {
        mini: 4,
        small: 8,
        medium: 16,
        large: 24
      }
      function resolveSize(s) {
        var _a
        if (typeof s === 'number') return `${s}px`
        return `${(_a = sizeMap[s]) != null ? _a : 8}px`
      }
      const gapStyle = computed(() => {
        const size = props.size
        if (Array.isArray(size)) {
          return { columnGap: resolveSize(size[0]), rowGap: resolveSize(size[1]) }
        }
        const val = resolveSize(size)
        return props.direction === 'vertical' ? { rowGap: val } : { gap: val }
      })
      const spaceStyle = computed(() =>
        __spreadValues(
          __spreadValues(
            __spreadProps(__spreadValues({}, themeStyle.value), {
              display: 'inline-flex',
              flexDirection: props.direction === 'vertical' ? 'column' : 'row',
              flexWrap: props.wrap ? 'wrap' : 'nowrap',
              alignItems: props.align,
              justifyContent: props.justify,
              width: props.fill ? '100%' : void 0
            }),
            gapStyle.value
          ),
          typeof props.style === 'object' ? props.style : {}
        )
      )
      function flattenVNodes(vnodes) {
        const result = []
        for (const vnode of vnodes) {
          if (vnode.type === Comment) continue
          if (vnode.type === Text && typeof vnode.children === 'string' && !vnode.children.trim())
            continue
          if (vnode.type === Fragment && Array.isArray(vnode.children)) {
            result.push(...flattenVNodes(vnode.children))
          } else if (Array.isArray(vnode)) {
            result.push(...flattenVNodes(vnode))
          } else {
            result.push(vnode)
          }
        }
        return result
      }
      const children = computed(() => {
        var _a
        const defaultSlot = (_a = slots.default) == null ? void 0 : _a.call(slots)
        if (!defaultSlot) return []
        return flattenVNodes(defaultSlot)
      })
      const showSpacer = computed(() => {
        return (props.spacer !== void 0 && props.spacer !== null) || !!slots.spacer
      })
      const __returned__ = {
        props,
        slots,
        ns,
        themeStyle,
        sizeMap,
        resolveSize,
        gapStyle,
        spaceStyle,
        flattenVNodes,
        children,
        showSpacer,
        computed,
        useSlots,
        Fragment,
        Comment,
        Text,
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
