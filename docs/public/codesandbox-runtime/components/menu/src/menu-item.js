import {
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  withCtx as _withCtx,
  createVNode as _createVNode,
  withKeys as _withKeys,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['tabindex']
const _hoisted_2 = { style: { 'max-width': '300px', 'word-break': 'break-all' } }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b
  return (
    _openBlock(),
    _createElementBlock(
      'li',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          {
            [$setup.ns.is('active')]: $setup.isActive,
            [$setup.ns.is('disabled')]: _ctx.disabled
          }
        ]),
        style: _normalizeStyle($setup.itemStyle),
        role: 'menuitem',
        tabindex: _ctx.disabled ? -1 : 0,
        onClick: $setup.handleClick,
        onMouseenter: $setup.handleMouseEnter,
        onKeydown: _withKeys($setup.handleClick, ['enter'])
      },
      [
        _createVNode(
          $setup['YhTooltip'],
          {
            content: $setup.props.label || '',
            disabled: ((_a = $setup.menu) == null ? void 0 : _a.collapse.value)
              ? false
              : !$setup.isOverflow,
            placement: ((_b = $setup.menu) == null ? void 0 : _b.collapse.value) ? 'right' : 'top',
            effect: 'dark',
            'show-after': 200,
            'show-arrow': true,
            style: { flex: '1', 'min-width': '0', overflow: 'hidden' }
          },
          {
            content: _withCtx(() => [
              _createElementVNode('div', _hoisted_2, [
                $setup.renderLabelContent
                  ? (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 0 },
                      [
                        typeof $setup.renderLabelContent === 'string'
                          ? (_openBlock(),
                            _createElementBlock(
                              _Fragment,
                              { key: 0 },
                              [
                                _createTextVNode(
                                  _toDisplayString($setup.renderLabelContent),
                                  1
                                  /* TEXT */
                                )
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          : (_openBlock(),
                            _createBlock(_resolveDynamicComponent($setup.renderLabelContent), {
                              key: 1
                            }))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  : _renderSlot(_ctx.$slots, 'default', { key: 1 }, () => [
                      _createTextVNode(
                        _toDisplayString($setup.props.label),
                        1
                        /* TEXT */
                      )
                    ])
              ])
            ]),
            default: _withCtx(() => [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('content'))
                },
                [
                  $setup.renderLabelContent
                    ? (_openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: 0,
                          ref: 'contentRef',
                          class: _normalizeClass($setup.ns.e('label'))
                        },
                        [
                          typeof $setup.renderLabelContent === 'string'
                            ? (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 0 },
                                [
                                  _createTextVNode(
                                    _toDisplayString($setup.renderLabelContent),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              ))
                            : (_openBlock(),
                              _createBlock(_resolveDynamicComponent($setup.renderLabelContent), {
                                key: 1
                              }))
                        ],
                        2
                        /* CLASS */
                      ))
                    : (_openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: 1,
                          ref: 'contentRef',
                          class: _normalizeClass($setup.ns.e('label'))
                        },
                        [
                          _renderSlot(_ctx.$slots, 'default', {}, () => [
                            _createTextVNode(
                              _toDisplayString($setup.props.label),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      ))
                ],
                2
                /* CLASS */
              )
            ]),
            _: 3
            /* FORWARDED */
          },
          8,
          ['content', 'disabled', 'placement']
        )
      ],
      46,
      _hoisted_1
    )
  )
}
import { inject, computed, ref, onMounted } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { YhTooltip } from '../../tooltip'
import { menuItemProps, MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './menu'
import { onBeforeUnmount } from 'vue'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhMenuItem'
  },
  {
    __name: 'menu-item',
    props: menuItemProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('menu-item')
      const menu = inject(MENU_INJECTION_KEY, null)
      const subMenu = inject(SUB_MENU_INJECTION_KEY, null)
      const indexPath = computed(() => {
        if (subMenu) {
          return [...subMenu.indexPath, props.index]
        }
        return [props.index]
      })
      const isActive = computed(
        () => (menu == null ? void 0 : menu.activeIndex.value) === props.index
      )
      const itemStyle = computed(() => {
        var _a, _b, _c
        const styles = {}
        if ((menu == null ? void 0 : menu.mode.value) === 'vertical' && !menu.collapse.value) {
          const level = subMenu ? subMenu.level + 1 : 0
          const isRoot = level === 0
          const indent = isRoot
            ? (_b = (_a = menu.rootIndent.value) != null ? _a : menu.indent.value) != null
              ? _b
              : 32
            : (_c = menu.indent.value) != null
              ? _c
              : 32
          styles.paddingLeft = `${20 + level * indent}px`
        }
        return styles
      })
      const handleClick = () => {
        if (props.disabled) return
        menu == null ? void 0 : menu.handleSelect(props.index, indexPath.value)
      }
      const contentRef = ref(null)
      const isOverflow = ref(false)
      const checkOverflow = () => {
        if (contentRef.value) {
          const el = contentRef.value
          isOverflow.value = el.scrollWidth > el.offsetWidth
        }
      }
      let observer = null
      onMounted(() => {
        checkOverflow()
        if (contentRef.value) {
          observer = new ResizeObserver(checkOverflow)
          observer.observe(contentRef.value)
        }
      })
      onBeforeUnmount(() => {
        observer == null ? void 0 : observer.disconnect()
      })
      const handleMouseEnter = () => {
        checkOverflow()
      }
      const renderLabelContent = computed(() => {
        var _a
        if ((_a = menu == null ? void 0 : menu.renderLabel) == null ? void 0 : _a.value) {
          return menu.renderLabel.value({
            index: props.index,
            label: props.label
          })
        }
        return null
      })
      const __returned__ = {
        props,
        ns,
        menu,
        subMenu,
        indexPath,
        isActive,
        itemStyle,
        handleClick,
        contentRef,
        isOverflow,
        checkOverflow,
        get observer() {
          return observer
        },
        set observer(v) {
          observer = v
        },
        handleMouseEnter,
        renderLabelContent,
        inject,
        computed,
        ref,
        onMounted,
        get useNamespace() {
          return useNamespace
        },
        get YhTooltip() {
          return YhTooltip
        },
        get menuItemProps() {
          return menuItemProps
        },
        get MENU_INJECTION_KEY() {
          return MENU_INJECTION_KEY
        },
        get SUB_MENU_INJECTION_KEY() {
          return SUB_MENU_INJECTION_KEY
        },
        onBeforeUnmount
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
