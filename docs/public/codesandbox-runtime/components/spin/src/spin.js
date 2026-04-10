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
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  mergeProps as _mergeProps,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = {
  key: 0,
  style: {
    width: '0',
    height: '0',
    position: 'absolute',
    visibility: 'hidden',
    'pointer-events': 'none'
  }
}
const _hoisted_2 = ['id']
const _hoisted_3 = ['offset', 'stop-color']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        $setup.visible && $setup.isGradient
          ? (_openBlock(),
            _createElementBlock('svg', _hoisted_1, [
              _createElementVNode('defs', null, [
                _createElementVNode(
                  'linearGradient',
                  {
                    id: $setup.gradientId,
                    x1: '0%',
                    y1: '0%',
                    x2: '100%',
                    y2: '100%'
                  },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.gradientStops, (stop, i) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'stop',
                            {
                              key: i,
                              offset: stop.offset,
                              'stop-color': stop.color
                            },
                            null,
                            8,
                            _hoisted_3
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  8,
                  _hoisted_2
                )
              ])
            ]))
          : _createCommentVNode('v-if', true),
        _ctx.$slots.default
          ? (_openBlock(),
            _createElementBlock(
              'div',
              _mergeProps(
                {
                  key: 1,
                  class: $setup.ns.b('wrapper')
                },
                _ctx.$attrs
              ),
              [
                _renderSlot(_ctx.$slots, 'default'),
                _createVNode(
                  _Transition,
                  { name: 'yh-spin-fade' },
                  {
                    default: _withCtx(() => [
                      $setup.visible
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: _normalizeClass($setup.spinClasses),
                              style: _normalizeStyle($setup.spinStyle)
                            },
                            [
                              _ctx.glass
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e('mask'))
                                    },
                                    null,
                                    2
                                    /* CLASS */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('container'))
                                },
                                [
                                  _createCommentVNode(
                                    ' Dot \u6A21\u5F0F (\u517C\u5BB9\u65E7\u7248) '
                                  ),
                                  _ctx.dot
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: 0,
                                          class: _normalizeClass($setup.ns.e('dots'))
                                        },
                                        [
                                          (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            null,
                                            _renderList(4, (i) => {
                                              return _createElementVNode('i', { key: i })
                                            }),
                                            64
                                            /* STABLE_FRAGMENT */
                                          ))
                                        ],
                                        2
                                        /* CLASS */
                                      ))
                                    : _ctx.type === 'chaser'
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          _Fragment,
                                          { key: 1 },
                                          [
                                            _createCommentVNode(
                                              ' Chaser \u6A21\u5F0F (\u8FFD\u9010\u70B9) '
                                            ),
                                            _createElementVNode(
                                              'div',
                                              {
                                                class: _normalizeClass($setup.ns.e('chaser')),
                                                style: _normalizeStyle({
                                                  width: $setup.sizePx + 'px',
                                                  height: $setup.sizePx + 'px'
                                                })
                                              },
                                              [
                                                (_openBlock(),
                                                _createElementBlock(
                                                  _Fragment,
                                                  null,
                                                  _renderList(8, (i) => {
                                                    return _createElementVNode('i', { key: i })
                                                  }),
                                                  64
                                                  /* STABLE_FRAGMENT */
                                                ))
                                              ],
                                              6
                                              /* CLASS, STYLE */
                                            )
                                          ],
                                          2112
                                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                        ))
                                      : _ctx.type === 'gear'
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            { key: 2 },
                                            [
                                              _createCommentVNode(
                                                ' Gear \u6A21\u5F0F (\u9F7F\u8F6E\u7EBF) '
                                              ),
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass($setup.ns.e('gear')),
                                                  style: _normalizeStyle({
                                                    width: $setup.sizePx + 'px',
                                                    height: $setup.sizePx + 'px'
                                                  })
                                                },
                                                [
                                                  (_openBlock(),
                                                  _createElementBlock(
                                                    _Fragment,
                                                    null,
                                                    _renderList(12, (i) => {
                                                      return _createElementVNode('i', { key: i })
                                                    }),
                                                    64
                                                    /* STABLE_FRAGMENT */
                                                  ))
                                                ],
                                                6
                                                /* CLASS, STYLE */
                                              )
                                            ],
                                            2112
                                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                          ))
                                        : _ctx.type === 'dual-ring'
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              _Fragment,
                                              { key: 3 },
                                              [
                                                _createCommentVNode(' Dual Ring \u6A21\u5F0F '),
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('dual-ring')
                                                    ),
                                                    style: _normalizeStyle({
                                                      width: $setup.sizePx + 'px',
                                                      height: $setup.sizePx + 'px'
                                                    })
                                                  },
                                                  null,
                                                  6
                                                  /* CLASS, STYLE */
                                                )
                                              ],
                                              2112
                                              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                            ))
                                          : _ctx.type === 'rect'
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 4 },
                                                [
                                                  _createCommentVNode(
                                                    ' Rect \u6A21\u5F0F (\u77E9\u9635\u5757) '
                                                  ),
                                                  _createElementVNode(
                                                    'div',
                                                    {
                                                      class: _normalizeClass($setup.ns.e('rect')),
                                                      style: _normalizeStyle({
                                                        width: $setup.sizePx + 'px',
                                                        height: $setup.sizePx + 'px'
                                                      })
                                                    },
                                                    [
                                                      (_openBlock(),
                                                      _createElementBlock(
                                                        _Fragment,
                                                        null,
                                                        _renderList(9, (i) => {
                                                          return _createElementVNode('i', {
                                                            key: i
                                                          })
                                                        }),
                                                        64
                                                        /* STABLE_FRAGMENT */
                                                      ))
                                                    ],
                                                    6
                                                    /* CLASS, STYLE */
                                                  )
                                                ],
                                                2112
                                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                              ))
                                            : (_openBlock(),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 5 },
                                                [
                                                  _createCommentVNode(
                                                    ' \u9ED8\u8BA4 Circle \u6A21\u5F0F (SVG) '
                                                  ),
                                                  (_openBlock(),
                                                  _createElementBlock(
                                                    'svg',
                                                    {
                                                      class: _normalizeClass($setup.ns.e('svg')),
                                                      viewBox: '0 0 50 50',
                                                      style: _normalizeStyle({
                                                        width: $setup.sizePx + 'px',
                                                        height: $setup.sizePx + 'px'
                                                      })
                                                    },
                                                    [
                                                      _createElementVNode(
                                                        'circle',
                                                        {
                                                          class: _normalizeClass(
                                                            $setup.ns.e('circle')
                                                          ),
                                                          cx: '25',
                                                          cy: '25',
                                                          r: '20',
                                                          fill: 'none',
                                                          'stroke-width': '5',
                                                          style: _normalizeStyle({
                                                            stroke: $setup.isGradient
                                                              ? `url(#${$setup.gradientId})`
                                                              : 'currentColor'
                                                          })
                                                        },
                                                        null,
                                                        6
                                                        /* CLASS, STYLE */
                                                      )
                                                    ],
                                                    6
                                                    /* CLASS, STYLE */
                                                  ))
                                                ],
                                                2112
                                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                              )),
                                  _ctx.tip || _ctx.$slots.tip
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: 6,
                                          class: _normalizeClass($setup.ns.e('tip'))
                                        },
                                        [
                                          _renderSlot(_ctx.$slots, 'tip', {}, () => [
                                            _createTextVNode(
                                              _toDisplayString(_ctx.tip || $setup.t('spin.text')),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ],
                                        2
                                        /* CLASS */
                                      ))
                                    : _createCommentVNode('v-if', true)
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            6
                            /* CLASS, STYLE */
                          ))
                        : _createCommentVNode('v-if', true)
                    ]),
                    _: 3
                    /* FORWARDED */
                  }
                )
              ],
              16
              /* FULL_PROPS */
            ))
          : (_openBlock(),
            _createBlock(
              _Transition,
              {
                key: 2,
                name: 'yh-spin-fade'
              },
              {
                default: _withCtx(() => [
                  $setup.visible
                    ? (_openBlock(),
                      _createElementBlock(
                        'div',
                        _mergeProps({ key: 0 }, _ctx.$attrs, {
                          class: $setup.spinClasses,
                          style: $setup.spinStyle
                        }),
                        [
                          _ctx.glass
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('mask'))
                                },
                                null,
                                2
                                /* CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('container'))
                            },
                            [
                              _createCommentVNode(' Dot \u6A21\u5F0F (\u517C\u5BB9\u65E7\u7248) '),
                              _ctx.dot
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e('dots'))
                                    },
                                    [
                                      (_openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        null,
                                        _renderList(4, (i) => {
                                          return _createElementVNode('i', { key: i })
                                        }),
                                        64
                                        /* STABLE_FRAGMENT */
                                      ))
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                : _ctx.type === 'chaser'
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      _Fragment,
                                      { key: 1 },
                                      [
                                        _createCommentVNode(' Chaser \u6A21\u5F0F '),
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass($setup.ns.e('chaser')),
                                            style: _normalizeStyle({
                                              width: $setup.sizePx + 'px',
                                              height: $setup.sizePx + 'px'
                                            })
                                          },
                                          [
                                            (_openBlock(),
                                            _createElementBlock(
                                              _Fragment,
                                              null,
                                              _renderList(8, (i) => {
                                                return _createElementVNode('i', { key: i })
                                              }),
                                              64
                                              /* STABLE_FRAGMENT */
                                            ))
                                          ],
                                          6
                                          /* CLASS, STYLE */
                                        )
                                      ],
                                      2112
                                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                    ))
                                  : _ctx.type === 'gear'
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        { key: 2 },
                                        [
                                          _createCommentVNode(' Gear \u6A21\u5F0F '),
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass($setup.ns.e('gear')),
                                              style: _normalizeStyle({
                                                width: $setup.sizePx + 'px',
                                                height: $setup.sizePx + 'px'
                                              })
                                            },
                                            [
                                              (_openBlock(),
                                              _createElementBlock(
                                                _Fragment,
                                                null,
                                                _renderList(12, (i) => {
                                                  return _createElementVNode('i', { key: i })
                                                }),
                                                64
                                                /* STABLE_FRAGMENT */
                                              ))
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          )
                                        ],
                                        2112
                                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                      ))
                                    : _ctx.type === 'dual-ring'
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          _Fragment,
                                          { key: 3 },
                                          [
                                            _createCommentVNode(' Dual Ring \u6A21\u5F0F '),
                                            _createElementVNode(
                                              'div',
                                              {
                                                class: _normalizeClass($setup.ns.e('dual-ring')),
                                                style: _normalizeStyle({
                                                  width: $setup.sizePx + 'px',
                                                  height: $setup.sizePx + 'px'
                                                })
                                              },
                                              null,
                                              6
                                              /* CLASS, STYLE */
                                            )
                                          ],
                                          2112
                                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                        ))
                                      : _ctx.type === 'rect'
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            { key: 4 },
                                            [
                                              _createCommentVNode(' Rect \u6A21\u5F0F '),
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass($setup.ns.e('rect')),
                                                  style: _normalizeStyle({
                                                    width: $setup.sizePx + 'px',
                                                    height: $setup.sizePx + 'px'
                                                  })
                                                },
                                                [
                                                  (_openBlock(),
                                                  _createElementBlock(
                                                    _Fragment,
                                                    null,
                                                    _renderList(9, (i) => {
                                                      return _createElementVNode('i', { key: i })
                                                    }),
                                                    64
                                                    /* STABLE_FRAGMENT */
                                                  ))
                                                ],
                                                6
                                                /* CLASS, STYLE */
                                              )
                                            ],
                                            2112
                                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                          ))
                                        : (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            { key: 5 },
                                            [
                                              _createCommentVNode(
                                                ' \u9ED8\u8BA4 Circle \u6A21\u5F0F '
                                              ),
                                              (_openBlock(),
                                              _createElementBlock(
                                                'svg',
                                                {
                                                  class: _normalizeClass($setup.ns.e('svg')),
                                                  viewBox: '0 0 50 50',
                                                  style: _normalizeStyle({
                                                    width: $setup.sizePx + 'px',
                                                    height: $setup.sizePx + 'px'
                                                  })
                                                },
                                                [
                                                  _createElementVNode(
                                                    'circle',
                                                    {
                                                      class: _normalizeClass($setup.ns.e('circle')),
                                                      cx: '25',
                                                      cy: '25',
                                                      r: '20',
                                                      fill: 'none',
                                                      'stroke-width': '5',
                                                      style: _normalizeStyle({
                                                        stroke: $setup.isGradient
                                                          ? `url(#${$setup.gradientId})`
                                                          : 'currentColor'
                                                      })
                                                    },
                                                    null,
                                                    6
                                                    /* CLASS, STYLE */
                                                  )
                                                ],
                                                6
                                                /* CLASS, STYLE */
                                              ))
                                            ],
                                            2112
                                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                          )),
                              _ctx.tip || _ctx.$slots.default || _ctx.$slots.tip
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 6,
                                      class: _normalizeClass($setup.ns.e('tip'))
                                    },
                                    [
                                      _renderSlot(_ctx.$slots, 'tip', {}, () => [
                                        _renderSlot(_ctx.$slots, 'default', {}, () => [
                                          _createTextVNode(
                                            _toDisplayString(_ctx.tip || $setup.t('spin.text')),
                                            1
                                            /* TEXT */
                                          )
                                        ])
                                      ])
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                : _createCommentVNode('v-if', true)
                            ],
                            2
                            /* CLASS */
                          )
                        ],
                        16
                        /* FULL_PROPS */
                      ))
                    : _createCommentVNode('v-if', true)
                ]),
                _: 3
                /* FORWARDED */
              }
            ))
      ],
      64
      /* STABLE_FRAGMENT */
    )
  )
}
import { ref, watch, computed, useSlots, useId } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { spinProps } from './spin'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSpin',
    inheritAttrs: false
  },
  {
    __name: 'spin',
    props: spinProps,
    emits: ['show', 'hide'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const ns = useNamespace('spin')
      const { t } = useLocale()
      const gradientId = useId()
      const { themeStyle } = useComponentTheme(
        'spin',
        computed(() => props.themeOverrides)
      )
      const emit = __emit
      const internalVisible = ref(false)
      const visible = computed(() => (props.delay === 0 ? props.show : internalVisible.value))
      let timer = null
      const handleShow = () => {
        if (props.delay > 0) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            internalVisible.value = true
            emit('show')
          }, props.delay)
        } else {
          internalVisible.value = true
          emit('show')
        }
      }
      const handleHide = () => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        internalVisible.value = false
        emit('hide')
      }
      const sizePx = computed(() => {
        if (typeof props.size === 'number') return props.size
        const map = { small: 20, default: 32, large: 48 }
        return map[props.size] || 32
      })
      const isGradient = computed(() => {
        if (typeof props.color === 'string') {
          return props.color.includes('gradient')
        }
        return (
          (typeof props.color === 'object' && props.color !== null) || Array.isArray(props.color)
        )
      })
      const gradientStops = computed(() => {
        var _a
        const { color } = props
        if (!isGradient.value || !color) return []
        if (typeof color === 'string') {
          const colorRegex =
            /(?:#[a-fA-F0-9]{3,8}|rgba?\s*\([^)]+\)|hsla?\s*\([^)]+\)|(?:\b[a-z]{3,}\b))/gi
          const matchedColors =
            (_a = color.match(colorRegex)) == null
              ? void 0
              : _a.filter((c) => !/gradient|deg|to|top|bottom|left|right/i.test(c))
          if (matchedColors && matchedColors.length > 0) {
            const len = matchedColors.length
            return matchedColors.map((c, i) => ({
              color: c.trim(),
              offset: `${(i / (len - 1 || 1)) * 100}%`
            }))
          }
          return []
        }
        if (Array.isArray(color)) {
          const len = color.length
          return color.map((c, i) => ({
            color: c,
            offset: `${(i / (len - 1 || 1)) * 100}%`
          }))
        }
        return Object.entries(color).map(([offset, c]) => ({
          offset,
          color: c
        }))
      })
      const spinStyle = computed(() => {
        const style = {}
        if (!props.color) return style
        if (isGradient.value) {
          style['--yh-spin-color-is-gradient'] = 'true'
          if (typeof props.color === 'string') {
            style['--yh-spin-gradient'] = props.color
          } else {
            const stops = gradientStops.value.map((s) => `${s.color} ${s.offset}`).join(', ')
            style['--yh-spin-gradient'] = `linear-gradient(135deg, ${stops})`
          }
        } else {
          style.color = props.color
        }
        return __spreadValues(__spreadValues({}, themeStyle.value), style)
      })
      watch(
        () => props.show,
        (val) => {
          if (val) handleShow()
          else handleHide()
        },
        { immediate: true }
      )
      const spinClasses = computed(() => [
        ns.b(),
        ns.m(typeof props.size === 'string' ? props.size : 'custom'),
        ns.is('vertical', props.vertical),
        ns.is('glass', props.glass || !!useSlots().default),
        ns.is('dot', props.dot),
        ns.is('gradient', isGradient.value)
      ])
      __expose({
        /** 是否可见 */
        visible
      })
      const __returned__ = {
        props,
        ns,
        t,
        gradientId,
        themeStyle,
        emit,
        internalVisible,
        visible,
        get timer() {
          return timer
        },
        set timer(v) {
          timer = v
        },
        handleShow,
        handleHide,
        sizePx,
        isGradient,
        gradientStops,
        spinStyle,
        spinClasses,
        ref,
        watch,
        computed,
        useSlots,
        useId,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get spinProps() {
          return spinProps
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
