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
  resolveDynamicComponent as _resolveDynamicComponent,
  openBlock as _openBlock,
  createBlock as _createBlock,
  createElementBlock as _createElementBlock,
  Fragment as _Fragment,
  renderSlot as _renderSlot,
  mergeProps as _mergeProps
} from 'vue'
const _hoisted_1 = ['viewBox', 'innerHTML']
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
import { computed, useSlots } from 'vue'
import { iconProps, getIcon } from './icon-meta.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
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
        computed(() => props.themeOverrides)
      )
      const iconStyle = computed(() => {
        const style = __spreadValues({}, themeStyle.value)
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
      const iconClass = computed(() => [
        ns.b(),
        {
          [ns.m('spin')]: props.spin
        }
      ])
      const svgContent = computed(() => {
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
      const viewBox = computed(() => {
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
      const hasSlot = computed(() => !!slots.default)
      const useIconComponent = computed(() => {
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
        computed,
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
