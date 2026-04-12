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
import { defineComponent, h, computed, provide } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const rowProps = {
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: 'start'
  },
  align: {
    type: String,
    default: 'top'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const rowContextKey = Symbol('rowContextKey')
var stdin_default = defineComponent({
  name: 'YhRow',
  props: rowProps,
  setup(props, { slots }) {
    const ns = useNamespace('row')
    const gutter = computed(() => props.gutter)
    const { themeStyle } = useComponentTheme(
      'row',
      computed(() => props.themeOverrides)
    )
    provide(rowContextKey, {
      gutter
    })
    const style = computed(() => {
      const styles = __spreadValues({}, themeStyle.value)
      if (!props.gutter) {
        return styles
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
      return styles
    })
    const classes = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== 'start'),
      ns.is(`align-${props.align}`, props.align !== 'top')
    ])
    return () => {
      var _a
      return h(
        props.tag,
        {
          class: classes.value,
          style: style.value
        },
        (_a = slots.default) == null ? void 0 : _a.call(slots)
      )
    }
  }
})
export { stdin_default as default, rowContextKey, rowProps }
