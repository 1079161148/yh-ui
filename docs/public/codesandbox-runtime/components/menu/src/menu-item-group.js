import {
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'li',
      {
        class: _normalizeClass($setup.ns.b()),
        role: 'group'
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('title'))
          },
          [
            _renderSlot(_ctx.$slots, 'title', {}, () => [
              _createTextVNode(
                _toDisplayString(_ctx.title),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        ),
        _createElementVNode(
          'ul',
          {
            class: _normalizeClass($setup.ns.e('list'))
          },
          [_renderSlot(_ctx.$slots, 'default')],
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    )
  )
}
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { menuItemGroupProps } from './menu-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhMenuItemGroup'
  },
  {
    __name: 'menu-item-group',
    props: menuItemGroupProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const ns = useNamespace('menu-item-group')
      const __returned__ = {
        ns,
        get useNamespace() {
          return useNamespace
        },
        get menuItemGroupProps() {
          return menuItemGroupProps
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
