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
const _hoisted_1 = {
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
import { computed } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { skeletonItemProps } from './skeleton-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
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
        computed(() => props.themeOverrides)
      )
      const style = computed(() => {
        const s = __spreadValues({}, themeStyle.value)
        if (props.width) {
          s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
        }
        if (props.height) {
          s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        }
        return s
      })
      const classes = computed(() => [
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
        computed,
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
export { stdin_default as default }
