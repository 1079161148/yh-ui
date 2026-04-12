import {
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  withCtx as _withCtx,
  createVNode as _createVNode,
  normalizeStyle as _normalizeStyle,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition
} from 'vue'
const _hoisted_1 = { style: { 'max-width': '300px', 'word-break': 'break-all' } }
const _hoisted_2 = { style: { 'max-width': '300px', 'word-break': 'break-all' } }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d
  return (
    _openBlock(),
    _createElementBlock(
      'li',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('opened', $setup.isOpened),
          $setup.ns.is('active', $setup.isActive),
          $setup.ns.is('disabled', _ctx.disabled),
          $setup.ns.is('popup', $setup.isPopup)
        ]),
        role: 'menuitem',
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave
      },
      [
        _createCommentVNode(' \u5F39\u51FA\u6A21\u5F0F '),
        $setup.isPopup
          ? (_openBlock(),
            _createBlock(
              $setup['YhTooltip'],
              {
                key: 0,
                visible: $setup.isOpened,
                placement: $setup.popperPlacement,
                'z-index': (_a = $setup.menu) == null ? void 0 : _a.popperZIndex.value,
                teleported: (_b = $setup.menu) == null ? void 0 : _b.teleported.value,
                'popper-class': $setup.mergedPopperClass,
                'popper-style': $setup.mergedPopperStyle,
                offset: [0, $setup.mergedPopperOffset],
                'show-arrow': false,
                effect: $setup.mergedPopperEffect,
                trigger: 'click',
                persistent: (_c = $setup.menu) == null ? void 0 : _c.persistent.value
              },
              {
                content: _withCtx(() => [
                  _createElementVNode(
                    'ul',
                    {
                      class: _normalizeClass($setup.ns.e('menu')),
                      onMouseenter: $setup.handleMouseEnter,
                      onMouseleave: $setup.handleMouseLeave
                    },
                    [_renderSlot(_ctx.$slots, 'default')],
                    34
                    /* CLASS, NEED_HYDRATION */
                  )
                ]),
                default: _withCtx(() => {
                  var _a2
                  return [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('title')),
                        style: _normalizeStyle($setup.titleStyle),
                        onClick: $setup.handleTitleClick,
                        onMouseenter: $setup.handleMouseEnterHeader
                      },
                      [
                        _createVNode(
                          $setup['YhTooltip'],
                          {
                            disabled:
                              ((_a2 = $setup.menu) == null ? void 0 : _a2.collapse.value) ||
                              !$setup.isTitleOverflow,
                            placement: 'top',
                            effect: 'dark',
                            'show-after': 200,
                            'show-arrow': true,
                            style: { flex: '1', 'min-width': '0', overflow: 'hidden' }
                          },
                          {
                            content: _withCtx(() => [
                              _createElementVNode('div', _hoisted_1, [
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
                                            _createBlock(
                                              _resolveDynamicComponent($setup.renderLabelContent),
                                              { key: 1 }
                                            ))
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    ))
                                  : _renderSlot(_ctx.$slots, 'title', { key: 1 }, () => [
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
                                  class: _normalizeClass($setup.ns.e('title-content'))
                                },
                                [
                                  $setup.renderLabelContent
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: 0,
                                          ref: 'titleContentRef',
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
                                              _createBlock(
                                                _resolveDynamicComponent($setup.renderLabelContent),
                                                { key: 1 }
                                              ))
                                        ],
                                        2
                                        /* CLASS */
                                      ))
                                    : (_openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: 1,
                                          ref: 'titleContentRef',
                                          class: _normalizeClass($setup.ns.e('label'))
                                        },
                                        [
                                          _renderSlot(_ctx.$slots, 'title', {}, () => [
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
                          ['disabled']
                        ),
                        _createVNode(
                          $setup['YhIcon'],
                          {
                            name: $setup.arrowIcon,
                            class: _normalizeClass([
                              $setup.ns.e('icon-arrow'),
                              {
                                [$setup.ns.is('opened')]: $setup.isOpened && $setup.shouldIconRotate
                              }
                            ])
                          },
                          null,
                          8,
                          ['name', 'class']
                        )
                      ],
                      38
                      /* CLASS, STYLE, NEED_HYDRATION */
                    )
                  ]
                }),
                _: 3
                /* FORWARDED */
              },
              8,
              [
                'visible',
                'placement',
                'z-index',
                'teleported',
                'popper-class',
                'popper-style',
                'offset',
                'effect',
                'persistent'
              ]
            ))
          : (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createCommentVNode(' \u5185\u8054\u6A21\u5F0F '),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('title')),
                    style: _normalizeStyle($setup.titleStyle),
                    onClick: $setup.handleTitleClick,
                    onMouseenter: $setup.handleMouseEnterHeader
                  },
                  [
                    _createVNode(
                      $setup['YhTooltip'],
                      {
                        disabled:
                          ((_d = $setup.menu) == null ? void 0 : _d.collapse.value) ||
                          !$setup.isTitleOverflow,
                        placement: 'top',
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
                                        _createBlock(
                                          _resolveDynamicComponent($setup.renderLabelContent),
                                          { key: 1 }
                                        ))
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                ))
                              : _renderSlot(_ctx.$slots, 'title', { key: 1 }, () => [
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
                              class: _normalizeClass($setup.ns.e('title-content'))
                            },
                            [
                              $setup.renderLabelContent
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 0,
                                      ref: 'titleContentRef',
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
                                          _createBlock(
                                            _resolveDynamicComponent($setup.renderLabelContent),
                                            { key: 1 }
                                          ))
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                : (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 1,
                                      ref: 'titleContentRef',
                                      class: _normalizeClass($setup.ns.e('label'))
                                    },
                                    [
                                      _renderSlot(_ctx.$slots, 'title', {}, () => [
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
                      ['disabled']
                    ),
                    _createVNode(
                      $setup['YhIcon'],
                      {
                        name: $setup.arrowIcon,
                        class: _normalizeClass([
                          $setup.ns.e('icon-arrow'),
                          {
                            [$setup.ns.is('opened')]: $setup.isOpened && $setup.shouldIconRotate
                          }
                        ])
                      },
                      null,
                      8,
                      ['name', 'class']
                    )
                  ],
                  38
                  /* CLASS, STYLE, NEED_HYDRATION */
                ),
                _createVNode(
                  _Transition,
                  {
                    name: 'yh-collapse',
                    persisted: ''
                  },
                  {
                    default: _withCtx(() => [
                      _withDirectives(
                        _createElementVNode(
                          'ul',
                          {
                            class: _normalizeClass($setup.ns.e('menu'))
                          },
                          [_renderSlot(_ctx.$slots, 'default')],
                          2
                          /* CLASS */
                        ),
                        [[_vShow, $setup.isOpened]]
                      )
                    ]),
                    _: 3
                    /* FORWARDED */
                  }
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
      ],
      34
      /* CLASS, NEED_HYDRATION */
    )
  )
}
import { ref, inject, computed, unref, provide, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { YhIcon } from '../../icon.js'
import { YhTooltip } from '../../tooltip.js'
import { subMenuProps, MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './menu-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSubMenu'
  },
  {
    __name: 'sub-menu',
    props: subMenuProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('sub-menu')
      const menu = inject(MENU_INJECTION_KEY, null)
      const parentSubMenu = inject(SUB_MENU_INJECTION_KEY, null)
      const level = computed(() => (parentSubMenu ? parentSubMenu.level + 1 : 0))
      const indexPath = computed(() => {
        if (parentSubMenu) {
          return [...parentSubMenu.indexPath, props.index]
        }
        return [props.index]
      })
      const opened = ref(false)
      const isOpened = computed(() => {
        if (menu) {
          if (menu.expandAll.value && menu.mode.value === 'vertical' && !menu.collapse.value) {
            return true
          }
          return menu.openedMenus.value.includes(props.index)
        }
        return opened.value
      })
      const isPopup = computed(() => {
        if (!menu) return false
        return (
          menu.mode.value === 'horizontal' ||
          (menu.mode.value === 'vertical' && menu.collapse.value)
        )
      })
      const titleStyle = computed(() => {
        var _a, _b, _c
        const styles = {}
        if (menu == null ? void 0 : menu.textColor.value) {
          styles.color = menu.textColor.value
        }
        if ((menu == null ? void 0 : menu.mode.value) === 'vertical' && !menu.collapse.value) {
          const isRoot = level.value === 0
          const indent = isRoot
            ? (_b = (_a = menu.rootIndent.value) != null ? _a : menu.indent.value) != null
              ? _b
              : 32
            : (_c = menu.indent.value) != null
              ? _c
              : 32
          styles.paddingLeft = `${20 + level.value * indent}px`
        }
        return styles
      })
      const popperPlacement = computed(() => {
        if (!menu) return 'right-start'
        if (menu.mode.value === 'horizontal') {
          return level.value === 0 ? 'bottom-start' : 'right-start'
        }
        return 'right-start'
      })
      let showTimer = null
      let hideTimer = null
      const mergedShowTimeout = computed(() => {
        var _a, _b
        return (_b =
          (_a = props.showTimeout) != null ? _a : menu == null ? void 0 : menu.showTimeout.value) !=
          null
          ? _b
          : 300
      })
      const mergedHideTimeout = computed(() => {
        var _a, _b
        return (_b =
          (_a = props.hideTimeout) != null ? _a : menu == null ? void 0 : menu.hideTimeout.value) !=
          null
          ? _b
          : 300
      })
      const mergedPopperOffset = computed(() => {
        var _a, _b
        return (_b =
          (_a = props.popperOffset) != null
            ? _a
            : menu == null
              ? void 0
              : menu.popperOffset.value) != null
          ? _b
          : 6
      })
      const mergedPopperClass = computed(() => {
        const classes = [ns.e('popper')]
        if (menu == null ? void 0 : menu.popperClass.value) classes.push(menu.popperClass.value)
        if (props.popperClass) classes.push(props.popperClass)
        return classes.join(' ')
      })
      const mergedPopperStyle = computed(() => {
        return unref(menu == null ? void 0 : menu.popperStyle) || {}
      })
      const mergedPopperEffect = computed(() => {
        var _a
        return (_a = menu == null ? void 0 : menu.popperEffect.value) != null ? _a : 'light'
      })
      const clearTimers = () => {
        if (showTimer) {
          clearTimeout(showTimer)
          showTimer = null
        }
        if (hideTimer) {
          clearTimeout(hideTimer)
          hideTimer = null
        }
      }
      const handleMouseEnter = () => {
        if (props.disabled || !isPopup.value) return
        if ((menu == null ? void 0 : menu.menuTrigger.value) !== 'hover') return
        clearTimers()
        showTimer = setTimeout(() => {
          if (!isOpened.value) {
            menu == null ? void 0 : menu.handleOpen(props.index, indexPath.value)
          }
        }, mergedShowTimeout.value)
      }
      const handleMouseLeave = () => {
        if (props.disabled || !isPopup.value) return
        if ((menu == null ? void 0 : menu.menuTrigger.value) !== 'hover') return
        clearTimers()
        hideTimer = setTimeout(() => {
          if (isOpened.value) {
            menu == null ? void 0 : menu.handleClose(props.index, indexPath.value)
          }
        }, mergedHideTimeout.value)
      }
      const handleTitleClick = () => {
        if (props.disabled) return
        if (isPopup.value && (menu == null ? void 0 : menu.menuTrigger.value) === 'hover') {
          return
        }
        if (isOpened.value) {
          menu == null ? void 0 : menu.handleClose(props.index, indexPath.value)
        } else {
          menu == null ? void 0 : menu.handleOpen(props.index, indexPath.value)
        }
      }
      const isActive = computed(() => {
        if (!menu || !menu.activeIndex.value) return false
        const activeIndex = menu.activeIndex.value
        const selfIndex = props.index
        return activeIndex === selfIndex || activeIndex.startsWith(`${selfIndex}-`)
      })
      const arrowIcon = computed(() => {
        if ((menu == null ? void 0 : menu.mode.value) === 'horizontal') {
          return level.value === 0 ? 'arrow-down' : 'arrow-right'
        }
        if ((menu == null ? void 0 : menu.mode.value) === 'vertical' && menu.collapse.value) {
          return 'arrow-right'
        }
        return 'arrow-down'
      })
      const shouldIconRotate = computed(() => arrowIcon.value === 'arrow-down')
      provide(SUB_MENU_INJECTION_KEY, {
        level: level.value,
        indexPath: indexPath.value
      })
      const titleContentRef = ref(null)
      const isTitleOverflow = ref(false)
      const checkTitleOverflow = () => {
        if (titleContentRef.value) {
          const el = titleContentRef.value
          isTitleOverflow.value = el.scrollWidth > el.offsetWidth
        }
      }
      let observer = null
      onMounted(() => {
        checkTitleOverflow()
        if (titleContentRef.value) {
          observer = new ResizeObserver(checkTitleOverflow)
          observer.observe(titleContentRef.value)
        }
      })
      const handleMouseEnterHeader = () => {
        checkTitleOverflow()
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
      onBeforeUnmount(() => {
        clearTimers()
        observer == null ? void 0 : observer.disconnect()
      })
      const __returned__ = {
        props,
        ns,
        menu,
        parentSubMenu,
        level,
        indexPath,
        opened,
        isOpened,
        isPopup,
        titleStyle,
        popperPlacement,
        get showTimer() {
          return showTimer
        },
        set showTimer(v) {
          showTimer = v
        },
        get hideTimer() {
          return hideTimer
        },
        set hideTimer(v) {
          hideTimer = v
        },
        mergedShowTimeout,
        mergedHideTimeout,
        mergedPopperOffset,
        mergedPopperClass,
        mergedPopperStyle,
        mergedPopperEffect,
        clearTimers,
        handleMouseEnter,
        handleMouseLeave,
        handleTitleClick,
        isActive,
        arrowIcon,
        shouldIconRotate,
        titleContentRef,
        isTitleOverflow,
        checkTitleOverflow,
        get observer() {
          return observer
        },
        set observer(v) {
          observer = v
        },
        handleMouseEnterHeader,
        renderLabelContent,
        ref,
        inject,
        computed,
        unref,
        provide,
        onMounted,
        onBeforeUnmount,
        get useNamespace() {
          return useNamespace
        },
        get YhIcon() {
          return YhIcon
        },
        get YhTooltip() {
          return YhTooltip
        },
        get subMenuProps() {
          return subMenuProps
        },
        get MENU_INJECTION_KEY() {
          return MENU_INJECTION_KEY
        },
        get SUB_MENU_INJECTION_KEY() {
          return SUB_MENU_INJECTION_KEY
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
