import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['aria-label']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.themeStyle),
        role: 'navigation',
        'aria-label': $setup.t('breadcrumb.label')
      },
      [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.breadcrumbItems, (item, index) => {
            return (_openBlock(), _createBlock(_resolveDynamicComponent(item), { key: index }))
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      14,
      _hoisted_1
    )
  )
}
import { provide, toRefs, useSlots, computed, h, Fragment } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { breadcrumbProps } from './breadcrumb-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhBreadcrumb'
  },
  {
    __name: 'breadcrumb',
    props: breadcrumbProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('breadcrumb')
      const { t } = useLocale()
      const slots = useSlots()
      const { themeStyle } = useComponentTheme(
        'breadcrumb',
        computed(() => props.themeOverrides)
      )
      provide('breadcrumbProps', toRefs(props))
      const breadcrumbItems = computed(() => {
        var _a
        const children = ((_a = slots.default) == null ? void 0 : _a.call(slots)) || []
        const items = children.flatMap((child) => {
          if (child.type === Fragment) return child.children || []
          return [child]
        })
        if (props.maxItems <= 0 || items.length <= props.maxItems) {
          return items
        }
        const first = items[0]
        const ellipsisItem = h(
          'span',
          { class: ns.e('ellipsis'), title: t('breadcrumb.more') },
          '...'
        )
        const result = [first, ellipsisItem, ...items.slice(items.length - (props.maxItems - 1))]
        return result
      })
      const __returned__ = {
        props,
        ns,
        t,
        slots,
        themeStyle,
        breadcrumbItems,
        provide,
        toRefs,
        useSlots,
        computed,
        h,
        Fragment,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get breadcrumbProps() {
          return breadcrumbProps
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
