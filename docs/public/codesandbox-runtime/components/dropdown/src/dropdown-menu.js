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
        class: _normalizeClass($setup.ns.e('menu-wrapper')),
        style: _normalizeStyle($setup.themeStyle)
      },
      [_renderSlot(_ctx.$slots, 'default')],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { dropdownMenuProps } from './dropdown-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhDropdownMenu'
  },
  {
    __name: 'dropdown-menu',
    props: dropdownMenuProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('dropdown')
      const { themeStyle } = useComponentTheme(
        'dropdown-menu',
        computed(() => props.themeOverrides)
      )
      const __returned__ = {
        props,
        ns,
        themeStyle,
        computed,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get dropdownMenuProps() {
          return dropdownMenuProps
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
