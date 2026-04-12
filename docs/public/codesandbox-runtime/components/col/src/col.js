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
        class: _normalizeClass($setup.classes),
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
import { computed, inject } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { colProps } from './col-meta.js'
import { rowContextKey } from '../../row/src/row.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCol'
  },
  {
    __name: 'col',
    props: colProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('col')
      const { themeStyle } = useComponentTheme(
        'col',
        computed(() => props.themeOverrides)
      )
      const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })
      const style = computed(() => {
        const styles = __spreadValues({}, themeStyle.value)
        if (gutter.value) {
          styles.paddingLeft = `${gutter.value / 2}px`
          styles.paddingRight = `${gutter.value / 2}px`
        }
        return styles
      })
      const classes = computed(() => {
        const classes2 = []
        const pos = ['span', 'offset', 'pull', 'push']
        pos.forEach((prop) => {
          const size = props[prop]
          if (typeof size === 'number') {
            if (prop === 'span') classes2.push(ns.b(`${size}`))
            else if (size > 0) classes2.push(ns.b(`${prop}-${size}`))
          }
        })
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
        sizes.forEach((size) => {
          if (typeof props[size] === 'number') {
            classes2.push(ns.b(`${size}-${props[size]}`))
          } else if (typeof props[size] === 'object' && props[size] !== null) {
            const sizeProps = props[size]
            Object.keys(sizeProps).forEach((prop) => {
              const propValue = sizeProps[prop]
              if (typeof propValue === 'number') {
                classes2.push(
                  prop !== 'span'
                    ? ns.b(`${size}-${prop}-${propValue}`)
                    : ns.b(`${size}-${propValue}`)
                )
              }
            })
          }
        })
        return [ns.b(), ...classes2]
      })
      const __returned__ = {
        props,
        ns,
        themeStyle,
        gutter,
        style,
        classes,
        computed,
        inject,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get colProps() {
          return colProps
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
