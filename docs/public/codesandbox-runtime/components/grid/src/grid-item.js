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
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.itemClasses),
        style: _normalizeStyle($setup.itemStyle)
      },
      [_renderSlot(_ctx.$slots, 'default')],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, inject } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhGridItem' },
  {
    __name: 'grid-item',
    props: {
      span: { type: Number, required: false, default: 1 },
      offset: { type: Number, required: false, default: 0 },
      suffix: { type: Boolean, required: false, default: false },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('grid-item')
      const { themeStyle } = useComponentTheme(
        'grid-item',
        computed(() => props.themeOverrides)
      )
      const gridContext = inject(
        'yh-grid',
        computed(() => ({
          cols: 12,
          collapsed: false,
          collapsedRows: 1
        }))
      )
      const itemStyle = computed(() => {
        const style = __spreadValues({}, themeStyle.value)
        if (props.span > 1) {
          style.gridColumn = `span ${props.span}`
        }
        if (props.offset > 0) {
          style.gridColumnStart = props.offset + 1
          style.gridColumn = `${props.offset + 1} / span ${props.span}`
        }
        if (props.suffix) {
          const cols = gridContext.value.cols
          style.gridColumnStart = cols - props.span + 1
          style.gridColumn = `${cols - props.span + 1} / span ${props.span}`
        }
        return style
      })
      const itemClasses = computed(() => [ns.b(), props.suffix && ns.is('suffix')])
      const __returned__ = {
        props,
        ns,
        themeStyle,
        gridContext,
        itemStyle,
        itemClasses,
        computed,
        inject,
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
