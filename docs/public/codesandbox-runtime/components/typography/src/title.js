import {
  renderSlot as _renderSlot,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  resolveDynamicComponent as _resolveDynamicComponent,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  withCtx as _withCtx,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = { key: 0 }
const _hoisted_2 = { key: 1 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _resolveDynamicComponent($setup.tagName),
      {
        class: _normalizeClass($setup.titleClasses),
        style: _normalizeStyle($setup.themeStyle)
      },
      {
        default: _withCtx(() => [
          $props.mark
            ? (_openBlock(),
              _createElementBlock('mark', _hoisted_1, [_renderSlot(_ctx.$slots, 'default')]))
            : $props.code
              ? (_openBlock(),
                _createElementBlock('code', _hoisted_2, [_renderSlot(_ctx.$slots, 'default')]))
              : _renderSlot(_ctx.$slots, 'default', { key: 2 })
        ]),
        _: 3
        /* FORWARDED */
      },
      8,
      ['class', 'style']
    )
  )
}
import { computed } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhTypographyTitle' },
  {
    __name: 'title',
    props: {
      level: { type: Number, required: false, default: 1 },
      type: { type: String, required: false },
      bold: { type: Boolean, required: false, default: true },
      delete: { type: Boolean, required: false, default: false },
      underline: { type: Boolean, required: false, default: false },
      italic: { type: Boolean, required: false, default: false },
      mark: { type: Boolean, required: false, default: false },
      code: { type: Boolean, required: false, default: false },
      ellipsis: { type: Boolean, required: false, default: false },
      tag: { type: String, required: false },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('typography')
      const { themeStyle } = useComponentTheme(
        'typography',
        computed(() => props.themeOverrides)
      )
      const tagName = computed(() => props.tag || `h${props.level}`)
      const titleClasses = computed(() => [
        ns.e('title'),
        ns.em('title', `h${props.level}`),
        props.type && ns.em('title', props.type),
        props.bold && ns.is('bold'),
        props.delete && ns.is('delete'),
        props.underline && ns.is('underline'),
        props.italic && ns.is('italic'),
        props.mark && ns.is('mark'),
        props.code && ns.is('code'),
        props.ellipsis && ns.is('ellipsis')
      ])
      const __returned__ = {
        props,
        ns,
        themeStyle,
        tagName,
        titleClasses,
        computed,
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
