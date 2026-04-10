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
const _hoisted_3 = { key: 2 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _resolveDynamicComponent($props.tag),
      {
        class: _normalizeClass($setup.textClasses),
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
              : $props.keyboard
                ? (_openBlock(),
                  _createElementBlock('kbd', _hoisted_3, [_renderSlot(_ctx.$slots, 'default')]))
                : _renderSlot(_ctx.$slots, 'default', { key: 3 })
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
  { name: 'YhTypographyText' },
  {
    __name: 'text',
    props: {
      type: { type: String, required: false },
      bold: { type: Boolean, required: false, default: false },
      delete: { type: Boolean, required: false, default: false },
      underline: { type: Boolean, required: false, default: false },
      italic: { type: Boolean, required: false, default: false },
      mark: { type: Boolean, required: false, default: false },
      code: { type: Boolean, required: false, default: false },
      keyboard: { type: Boolean, required: false, default: false },
      ellipsis: { type: Boolean, required: false, default: false },
      size: { type: String, required: false },
      tag: { type: String, required: false, default: 'span' },
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
      const textClasses = computed(() => [
        ns.e('text'),
        props.type && ns.em('text', props.type),
        props.size && ns.em('text', props.size),
        props.bold && ns.is('bold'),
        props.delete && ns.is('delete'),
        props.underline && ns.is('underline'),
        props.italic && ns.is('italic'),
        props.code && ns.is('code'),
        props.keyboard && ns.is('keyboard'),
        props.ellipsis && ns.is('ellipsis')
      ])
      const __returned__ = {
        props,
        ns,
        themeStyle,
        textClasses,
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
