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
  withCtx as _withCtx,
  createVNode as _createVNode,
  normalizeClass as _normalizeClass,
  withModifiers as _withModifiers,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  createBlock as _createBlock,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  renderList as _renderList,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['tabindex']
const _hoisted_2 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('disabled', _ctx.disabled),
          $setup.ns.is('split', _ctx.splitButton)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        onKeydown: $setup.handleKeydown
      },
      [
        _createVNode(
          $setup['YhTooltip'],
          {
            ref: 'tooltipRef',
            visible: $setup.visible,
            'onUpdate:visible': _cache[0] || (_cache[0] = ($event) => ($setup.visible = $event)),
            trigger: _ctx.trigger,
            placement: _ctx.placement,
            disabled: _ctx.disabled,
            'show-after': _ctx.showAfter,
            'hide-after': _ctx.hideAfter,
            'z-index': _ctx.zIndex,
            teleported: _ctx.teleported,
            'popper-class': `${$setup.ns.e('popper')} ${_ctx.popperClass}`,
            'popper-style': $setup.popperStyle,
            offset: _ctx.offset,
            'show-arrow': _ctx.popperArrow,
            effect: 'light',
            onShow: $setup.handleShow,
            onHide: $setup.handleHide
          },
          {
            content: _withCtx(() => [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('menu'))
                },
                [
                  _renderSlot(_ctx.$slots, 'dropdown', {}, () => [
                    _createCommentVNode(' \u52A0\u8F7D\u72B6\u6001 '),
                    _ctx.loading
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('loading'))
                          },
                          [
                            _createVNode($setup['YhIcon'], {
                              name: 'loading',
                              spin: ''
                            }),
                            _createElementVNode(
                              'span',
                              null,
                              _toDisplayString(
                                $setup.t('dropdown.loading') ||
                                  $setup.t('select.loading') ||
                                  'Loading...'
                              ),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _ctx.items && _ctx.items.length > 0
                        ? (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 1 },
                            [
                              _createCommentVNode(' \u5FEB\u6377\u6570\u636E\u6A21\u5F0F '),
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList(_ctx.items, (item) => {
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      _Fragment,
                                      {
                                        key: item.key
                                      },
                                      [
                                        item.divided
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('divider'))
                                              },
                                              null,
                                              2
                                              /* CLASS */
                                            ))
                                          : _createCommentVNode('v-if', true),
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass([
                                              $setup.ns.e('item'),
                                              item.class,
                                              {
                                                [$setup.ns.is('disabled')]: item.disabled,
                                                [$setup.ns.is('danger')]: item.danger,
                                                [$setup.ns.is('checked')]:
                                                  _ctx.checkable && item.checked
                                              }
                                            ]),
                                            onClick: ($event) =>
                                              !item.disabled && $setup.handleItemClick(item.key)
                                          },
                                          [
                                            _ctx.checkable
                                              ? (_openBlock(),
                                                _createBlock(
                                                  $setup['YhIcon'],
                                                  {
                                                    key: 0,
                                                    name: item.checked ? 'check' : '',
                                                    class: _normalizeClass(
                                                      $setup.ns.e('check-icon')
                                                    )
                                                  },
                                                  null,
                                                  8,
                                                  ['name', 'class']
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            item.icon
                                              ? (_openBlock(),
                                                _createBlock(
                                                  $setup['YhIcon'],
                                                  {
                                                    key: 1,
                                                    name: item.icon,
                                                    class: _normalizeClass($setup.ns.e('item-icon'))
                                                  },
                                                  null,
                                                  8,
                                                  ['name', 'class']
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _createElementVNode(
                                              'span',
                                              null,
                                              _toDisplayString(item.label),
                                              1
                                              /* TEXT */
                                            )
                                          ],
                                          10,
                                          _hoisted_2
                                        )
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        : (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 2 },
                            [
                              _createCommentVNode(
                                ' \u7A7A\u72B6\u6001 - \u5F53\u65E2\u6CA1\u6709\u63D2\u69FD\u53C8\u6CA1\u6709\u6570\u636E\u65F6\u663E\u793A '
                              ),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('empty'))
                                },
                                [
                                  _renderSlot(_ctx.$slots, 'empty', {}, () => [
                                    _createTextVNode(
                                      _toDisplayString(_ctx.emptyText || $setup.t('select.noData')),
                                      1
                                      /* TEXT */
                                    )
                                  ])
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                  ])
                ],
                2
                /* CLASS */
              )
            ]),
            default: _withCtx(() => [
              _ctx.splitButton
                ? (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 0 },
                    [
                      _createVNode(
                        $setup['YhButton'],
                        {
                          type: _ctx.type || void 0,
                          size: _ctx.size,
                          plain: _ctx.plain,
                          onClick: $setup.handleButtonClick
                        },
                        {
                          default: _withCtx(() => [_renderSlot(_ctx.$slots, 'default')]),
                          _: 3
                          /* FORWARDED */
                        },
                        8,
                        ['type', 'size', 'plain']
                      ),
                      _createVNode(
                        $setup['YhButton'],
                        {
                          type: _ctx.type || void 0,
                          size: _ctx.size,
                          plain: _ctx.plain,
                          class: _normalizeClass($setup.ns.e('caret-button')),
                          onClick: _withModifiers($setup.handleDropdownClick, ['stop'])
                        },
                        {
                          default: _withCtx(() => [
                            _createVNode(
                              $setup['YhIcon'],
                              {
                                name: 'arrow-down',
                                class: _normalizeClass([
                                  $setup.ns.e('icon'),
                                  {
                                    [$setup.ns.is('active')]: $setup.visible
                                  }
                                ])
                              },
                              null,
                              8,
                              ['class']
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        },
                        8,
                        ['type', 'size', 'plain', 'class']
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
                : (_openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: 1,
                      class: _normalizeClass($setup.ns.e('trigger')),
                      tabindex: _ctx.disabled ? void 0 : _ctx.tabindex
                    },
                    [
                      _renderSlot(_ctx.$slots, 'default'),
                      _ctx.showArrow
                        ? (_openBlock(),
                          _createBlock(
                            $setup['YhIcon'],
                            {
                              key: 0,
                              name: 'arrow-down',
                              class: _normalizeClass([
                                $setup.ns.e('icon'),
                                {
                                  [$setup.ns.is('active')]: $setup.visible
                                }
                              ])
                            },
                            null,
                            8,
                            ['class']
                          ))
                        : _createCommentVNode('v-if', true)
                    ],
                    10,
                    _hoisted_1
                  ))
            ]),
            _: 3
            /* FORWARDED */
          },
          8,
          [
            'visible',
            'trigger',
            'placement',
            'disabled',
            'show-after',
            'hide-after',
            'z-index',
            'teleported',
            'popper-class',
            'popper-style',
            'offset',
            'show-arrow'
          ]
        )
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { ref, computed, provide, toRef } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { YhTooltip } from '../../tooltip'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { dropdownProps, dropdownEmits, DROPDOWN_INJECTION_KEY } from './dropdown'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhDropdown'
  },
  {
    __name: 'dropdown',
    props: dropdownProps,
    emits: dropdownEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('dropdown')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'dropdown',
        computed(() => props.themeOverrides)
      )
      const internalVisible = ref(false)
      const visible = computed({
        get: () => (props.visible !== null ? props.visible : internalVisible.value),
        set: (val) => {
          internalVisible.value = val
          emit('update:visible', val)
        }
      })
      const tooltipRef = ref(null)
      const popperStyle = computed(() => {
        const styles = __spreadValues({}, themeStyle.value)
        Object.assign(styles, props.popperStyle)
        if (props.maxHeight) {
          styles.maxHeight =
            typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
          styles.overflowY = 'auto'
        }
        return styles
      })
      const handleItemClick = (command) => {
        emit('command', command)
        if (props.hideOnClick) {
          visible.value = false
        }
      }
      const handleShow = () => {
        emit('show')
        emit('update:visible', true)
      }
      const handleHide = () => {
        emit('hide')
        emit('update:visible', false)
      }
      const handleButtonClick = (event) => {
        emit('click', event)
      }
      const handleDropdownClick = () => {
        visible.value = !visible.value
      }
      provide(DROPDOWN_INJECTION_KEY, {
        hideOnClick: toRef(props, 'hideOnClick'),
        checkable: toRef(props, 'checkable'),
        handleItemClick
      })
      const handleKeydown = (event) => {
        const { key } = event
        if (key === 'Enter' || key === ' ' || key === 'ArrowDown') {
          event.preventDefault()
          visible.value = true
        } else if (key === 'Escape') {
          visible.value = false
        }
      }
      __expose({
        /** 手动显示下拉菜单 */
        show: () => {
          visible.value = true
        },
        /** 手动隐藏下拉菜单 */
        hide: () => {
          visible.value = false
        },
        /** 当前可见状态 */
        visible
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        internalVisible,
        visible,
        tooltipRef,
        popperStyle,
        handleItemClick,
        handleShow,
        handleHide,
        handleButtonClick,
        handleDropdownClick,
        handleKeydown,
        ref,
        computed,
        provide,
        toRef,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get YhTooltip() {
          return YhTooltip
        },
        get YhButton() {
          return YhButton
        },
        get YhIcon() {
          return YhIcon
        },
        get dropdownProps() {
          return dropdownProps
        },
        get dropdownEmits() {
          return dropdownEmits
        },
        get DROPDOWN_INJECTION_KEY() {
          return DROPDOWN_INJECTION_KEY
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
