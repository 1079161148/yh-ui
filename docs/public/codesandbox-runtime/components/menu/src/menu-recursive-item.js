import {
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  resolveComponent as _resolveComponent,
  createBlock as _createBlock,
  withCtx as _withCtx,
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  createSlots as _createSlots
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_yh_menu_recursive_item = _resolveComponent('yh-menu-recursive-item')
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createCommentVNode(' \u5206\u7EC4\u6A21\u5F0F '),
        $props.item.group
          ? (_openBlock(),
            _createBlock(
              $setup['YhMenuItemGroup'],
              {
                key: 0,
                title: $props.item[$setup.labelField] || $props.item.label || ''
              },
              {
                default: _withCtx(() => [
                  (_openBlock(true),
                  _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($props.item.children, (child, idx) => {
                      return (
                        _openBlock(),
                        _createBlock(
                          _component_yh_menu_recursive_item,
                          {
                            key: child[$setup.keyField] || child.index || idx || '',
                            item: child
                          },
                          null,
                          8,
                          ['item']
                        )
                      )
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              },
              8,
              ['title']
            ))
          : $props.item.children && $props.item.children.length > 0
            ? (_openBlock(),
              _createElementBlock(
                _Fragment,
                { key: 1 },
                [
                  _createCommentVNode(' \u5B50\u83DC\u5355\u6A21\u5F0F '),
                  _createVNode(
                    $setup['YhSubMenu'],
                    {
                      index: $props.item[$setup.keyField] || $props.item.index || '',
                      label: $props.item[$setup.labelField] || $props.item.label || '',
                      disabled: $props.item.disabled
                    },
                    _createSlots(
                      {
                        default: _withCtx(() => [
                          (_openBlock(true),
                          _createElementBlock(
                            _Fragment,
                            null,
                            _renderList($props.item.children, (child, idx) => {
                              return (
                                _openBlock(),
                                _createBlock(
                                  _component_yh_menu_recursive_item,
                                  {
                                    key: child[$setup.keyField] || child.index || idx || '',
                                    item: child
                                  },
                                  null,
                                  8,
                                  ['item']
                                )
                              )
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      [
                        $props.item.icon
                          ? {
                              name: 'title',
                              fn: _withCtx(() => [
                                _createVNode(
                                  $setup['YhIcon'],
                                  {
                                    name: $props.item.icon
                                  },
                                  null,
                                  8,
                                  ['name']
                                ),
                                _createElementVNode(
                                  'span',
                                  null,
                                  _toDisplayString(
                                    $props.item[$setup.labelField] || $props.item.label
                                  ),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              key: '0'
                            }
                          : void 0
                      ]
                    ),
                    1032,
                    ['index', 'label', 'disabled']
                  )
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              ))
            : (_openBlock(),
              _createElementBlock(
                _Fragment,
                { key: 2 },
                [
                  _createCommentVNode(' \u666E\u901A\u83DC\u5355\u9879 '),
                  _createVNode(
                    $setup['YhMenuItem'],
                    {
                      index: $props.item[$setup.keyField] || $props.item.index || '',
                      label: $props.item[$setup.labelField] || $props.item.label || '',
                      disabled: $props.item.disabled
                    },
                    _createSlots(
                      {
                        _: 2
                        /* DYNAMIC */
                      },
                      [
                        $props.item.icon
                          ? {
                              name: 'default',
                              fn: _withCtx(() => [
                                _createVNode(
                                  $setup['YhIcon'],
                                  {
                                    name: $props.item.icon
                                  },
                                  null,
                                  8,
                                  ['name']
                                ),
                                _createElementVNode(
                                  'span',
                                  null,
                                  _toDisplayString(
                                    $props.item[$setup.labelField] || $props.item.label
                                  ),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              key: '0'
                            }
                          : void 0
                      ]
                    ),
                    1032,
                    ['index', 'label', 'disabled']
                  )
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              ))
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )
  )
}
import { inject, unref } from 'vue'
import { YhIcon } from '../../icon.js'
import YhMenuItem from './menu-item.js'
import YhSubMenu from './sub-menu.js'
import YhMenuItemGroup from './menu-item-group.js'
import { MENU_INJECTION_KEY } from './menu-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhMenuRecursiveItem'
  },
  {
    __name: 'menu-recursive-item',
    props: {
      item: { type: Object, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const menu = inject(MENU_INJECTION_KEY)
      const keyField = unref(menu == null ? void 0 : menu.keyField) || 'key'
      const labelField = unref(menu == null ? void 0 : menu.labelField) || 'label'
      const __returned__ = {
        menu,
        keyField,
        labelField,
        inject,
        unref,
        get YhIcon() {
          return YhIcon
        },
        YhMenuItem,
        YhSubMenu,
        YhMenuItemGroup,
        get MENU_INJECTION_KEY() {
          return MENU_INJECTION_KEY
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
