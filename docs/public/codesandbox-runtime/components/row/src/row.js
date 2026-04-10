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
  renderSlot as _renderSlot,
  resolveDynamicComponent as _resolveDynamicComponent,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  withCtx as _withCtx,
  openBlock as _openBlock,
  createBlock as _createBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _resolveDynamicComponent(_ctx.tag),
      {
        class: _normalizeClass($setup.rowClasses),
        style: _normalizeStyle($setup.style)
      },
      {
        default: _withCtx(() => [_renderSlot(_ctx.$slots, 'default')]),
        _: 3
        /* FORWARDED */
      },
      8,
      ['class', 'style']
    )
  )
}
import { computed, provide } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { rowProps, rowContextKey } from './row'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhRow'
  },
  {
    __name: 'row',
    props: rowProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('row')
      const { themeStyle } = useComponentTheme(
        'row',
        computed(() => props.themeOverrides)
      )
      const gutter = computed(() => props.gutter)
      provide(rowContextKey, {
        gutter
      })
      const style = computed(() => {
        const styles = __spreadValues({}, themeStyle.value)
        if (!props.gutter) {
          return styles
        }
        styles.marginLeft = `-${props.gutter / 2}px`
        styles.marginRight = `-${props.gutter / 2}px`
        return styles
      })
      const rowClasses = computed(() => [
        ns.b(),
        ns.is(`justify-${props.justify}`, props.justify !== 'start'),
        ns.is(`align-${props.align}`, props.align !== 'top')
      ])
      const __returned__ = {
        props,
        ns,
        themeStyle,
        gutter,
        style,
        rowClasses,
        computed,
        provide,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get rowProps() {
          return rowProps
        },
        get rowContextKey() {
          return rowContextKey
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
