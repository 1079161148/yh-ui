import {
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  Fragment as _Fragment,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  renderList as _renderList
} from 'vue'
const _hoisted_1 = ['aria-valuenow']
const _hoisted_2 = ['innerHTML']
const _hoisted_3 = ['viewBox']
const _hoisted_4 = { key: 0 }
const _hoisted_5 = ['id']
const _hoisted_6 = ['offset', 'stop-color']
const _hoisted_7 = ['d', 'stroke', 'stroke-width', 'stroke-linecap']
const _hoisted_8 = ['d', 'stroke', 'stroke-linecap', 'stroke-width']
const _hoisted_9 = ['width', 'height', 'innerHTML']
const _hoisted_10 = ['innerHTML']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.progressClass),
        style: _normalizeStyle($setup.themeStyle),
        role: 'progressbar',
        'aria-valuenow': $setup.percentages[0],
        'aria-valuemin': '0',
        'aria-valuemax': '100'
      },
      [
        _createCommentVNode(' \u7EBF\u578B\u8FDB\u5EA6\u6761 '),
        _ctx.type === 'line'
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('bar'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('outer')),
                    style: _normalizeStyle({
                      height: `${_ctx.strokeWidth}px`,
                      backgroundColor: _ctx.defineBackgroundColor
                    })
                  },
                  [
                    _ctx.secondaryPercentage > 0
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('secondary-inner')),
                            style: _normalizeStyle($setup.secondaryBarStyle)
                          },
                          null,
                          6
                          /* CLASS, STYLE */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass([
                          $setup.ns.e('inner'),
                          $setup.ns.is('indeterminate', _ctx.indeterminate),
                          $setup.ns.is('striped', _ctx.striped),
                          $setup.ns.is('striped-flow', _ctx.stripedFlow)
                        ]),
                        style: _normalizeStyle($setup.barStyle)
                      },
                      [
                        _ctx.showText && _ctx.textInside && !_ctx.indeterminate
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('innerText'))
                              },
                              [
                                _renderSlot(
                                  _ctx.$slots,
                                  'default',
                                  {
                                    percentage: $setup.percentages[0]
                                  },
                                  () => [
                                    _ctx.icon
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'i',
                                          {
                                            key: 0,
                                            class: _normalizeClass(_ctx.icon)
                                          },
                                          null,
                                          2
                                          /* CLASS */
                                        ))
                                      : $setup.statusIconSvg
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            { key: 1 },
                                            [
                                              _createCommentVNode(' eslint-disable vue/no-v-html '),
                                              (_openBlock(),
                                              _createElementBlock(
                                                'svg',
                                                {
                                                  viewBox: '0 0 1024 1024',
                                                  width: '16',
                                                  height: '16',
                                                  style: { 'vertical-align': 'middle' },
                                                  innerHTML: $setup.statusIconSvg
                                                },
                                                null,
                                                8,
                                                _hoisted_2
                                              ))
                                            ],
                                            2112
                                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                          ))
                                        : (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            { key: 2 },
                                            [
                                              _createCommentVNode(' eslint-enable vue/no-v-html '),
                                              _createElementVNode(
                                                'span',
                                                null,
                                                _toDisplayString($setup.content),
                                                1
                                                /* TEXT */
                                              )
                                            ],
                                            2112
                                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                          ))
                                  ]
                                )
                              ],
                              2
                              /* CLASS */
                            ))
                          : _createCommentVNode('v-if', true)
                      ],
                      6
                      /* CLASS, STYLE */
                    ),
                    _ctx.steps > 0
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 1,
                            class: _normalizeClass($setup.ns.e('steps'))
                          },
                          [
                            (_openBlock(true),
                            _createElementBlock(
                              _Fragment,
                              null,
                              _renderList(_ctx.steps, (step) => {
                                return (
                                  _openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: step,
                                      class: _normalizeClass($setup.ns.e('step-item')),
                                      style: _normalizeStyle({
                                        left: `${(100 / _ctx.steps) * step}%`
                                      })
                                    },
                                    null,
                                    6
                                    /* CLASS, STYLE */
                                  )
                                )
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ],
              2
              /* CLASS */
            ))
          : (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createCommentVNode(' \u73AF\u5F62/\u4EEA\u8868\u76D8\u8FDB\u5EA6\u6761 '),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('circle')),
                    style: _normalizeStyle({
                      height: `${_ctx.width}px`,
                      width: `${_ctx.width}px`
                    })
                  },
                  [
                    (_openBlock(),
                    _createElementBlock(
                      'svg',
                      {
                        viewBox: `0 0 ${_ctx.width} ${_ctx.width}`,
                        class: _normalizeClass($setup.ns.e('svg'))
                      },
                      [
                        _createCommentVNode(' \u5B9A\u4E49\u6E10\u53D8 '),
                        $setup.isGradient
                          ? (_openBlock(),
                            _createElementBlock('defs', _hoisted_4, [
                              _createElementVNode(
                                'linearGradient',
                                {
                                  id: `${$setup.componentId}-gradient`,
                                  x1: '0%',
                                  y1: '0%',
                                  x2: '100%',
                                  y2: '0%'
                                },
                                [
                                  (_openBlock(true),
                                  _createElementBlock(
                                    _Fragment,
                                    null,
                                    _renderList($setup.getGradientStops, (stop, i) => {
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
                                          _hoisted_6
                                        )
                                      )
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ],
                                8,
                                _hoisted_5
                              )
                            ]))
                          : _createCommentVNode('v-if', true),
                        _createCommentVNode(' \u5FAA\u73AF\u6E32\u67D3\u591A\u73AF '),
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.percentages, (p, index) => {
                            return (
                              _openBlock(),
                              _createElementBlock('g', { key: index }, [
                                _createElementVNode(
                                  'path',
                                  {
                                    class: _normalizeClass($setup.ns.e('circle-track')),
                                    d: $setup.getCircleParams(index).path,
                                    stroke: _ctx.defineBackgroundColor || '#e5e9f2',
                                    'stroke-width': _ctx.strokeWidth,
                                    fill: 'none',
                                    'stroke-linecap': _ctx.strokeLinecap,
                                    style: _normalizeStyle($setup.getCircleParams(index).trackStyle)
                                  },
                                  null,
                                  14,
                                  _hoisted_7
                                ),
                                _createElementVNode(
                                  'path',
                                  {
                                    class: _normalizeClass($setup.ns.e('circle-path')),
                                    d: $setup.getCircleParams(index).path,
                                    stroke: $setup.getColor(p, index),
                                    fill: 'none',
                                    'stroke-linecap': _ctx.strokeLinecap,
                                    'stroke-width': p > 0 ? _ctx.strokeWidth : 0,
                                    style: _normalizeStyle($setup.getCircleParams(index).pathStyle)
                                  },
                                  null,
                                  14,
                                  _hoisted_8
                                )
                              ])
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      10,
                      _hoisted_3
                    )),
                    _createCommentVNode(' \u73AF\u578B\u4E2D\u5FC3\u5185\u5BB9\u533A '),
                    _ctx.showText && !_ctx.indeterminate
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('text')),
                            style: _normalizeStyle({
                              fontSize: `${_ctx.width * 0.16}px`
                            })
                          },
                          [
                            _renderSlot(
                              _ctx.$slots,
                              'default',
                              {
                                percentage: $setup.percentages[0]
                              },
                              () => [
                                _ctx.icon
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'i',
                                      {
                                        key: 0,
                                        class: _normalizeClass([_ctx.icon, $setup.ns.e('icon')]),
                                        style: _normalizeStyle({
                                          color: $setup.getColor($setup.percentages[0], 0)
                                        })
                                      },
                                      null,
                                      6
                                      /* CLASS, STYLE */
                                    ))
                                  : $setup.statusIconSvg
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        { key: 1 },
                                        [
                                          _createCommentVNode(' eslint-disable vue/no-v-html '),
                                          (_openBlock(),
                                          _createElementBlock(
                                            'svg',
                                            {
                                              viewBox: '0 0 1024 1024',
                                              width: _ctx.width * 0.22,
                                              height: _ctx.width * 0.22,
                                              style: _normalizeStyle({
                                                color: $setup.getColor($setup.percentages[0], 0),
                                                verticalAlign: 'middle'
                                              }),
                                              innerHTML: $setup.statusIconSvg
                                            },
                                            null,
                                            12,
                                            _hoisted_9
                                          ))
                                        ],
                                        2112
                                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                      ))
                                    : (_openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        { key: 2 },
                                        [
                                          _createCommentVNode(' eslint-enable vue/no-v-html '),
                                          _createElementVNode(
                                            'span',
                                            null,
                                            _toDisplayString($setup.content),
                                            1
                                            /* TEXT */
                                          )
                                        ],
                                        2112
                                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                      ))
                              ]
                            )
                          ],
                          6
                          /* CLASS, STYLE */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )),
        _createCommentVNode(' \u5916\u90E8\u6587\u5B57\u533A '),
        _ctx.type === 'line' && _ctx.showText && !_ctx.textInside && !_ctx.indeterminate
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 2,
                class: _normalizeClass($setup.ns.e('text')),
                style: _normalizeStyle({
                  fontSize: `${Math.max(12, _ctx.strokeWidth * 0.8)}px`
                })
              },
              [
                _renderSlot(
                  _ctx.$slots,
                  'default',
                  {
                    percentage: $setup.percentages[0]
                  },
                  () => [
                    _ctx.icon
                      ? (_openBlock(),
                        _createElementBlock(
                          'i',
                          {
                            key: 0,
                            class: _normalizeClass([_ctx.icon, $setup.ns.e('icon')]),
                            style: _normalizeStyle({
                              color: $setup.getColor($setup.percentages[0], 0)
                            })
                          },
                          null,
                          6
                          /* CLASS, STYLE */
                        ))
                      : $setup.statusIconSvg
                        ? (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 1 },
                            [
                              _createCommentVNode(' eslint-disable vue/no-v-html '),
                              (_openBlock(),
                              _createElementBlock(
                                'svg',
                                {
                                  viewBox: '0 0 1024 1024',
                                  width: '16',
                                  height: '16',
                                  style: _normalizeStyle({
                                    color: $setup.getColor($setup.percentages[0], 0),
                                    verticalAlign: 'middle'
                                  }),
                                  innerHTML: $setup.statusIconSvg
                                },
                                null,
                                12,
                                _hoisted_10
                              ))
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                        : (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 2 },
                            [
                              _createCommentVNode(' eslint-enable vue/no-v-html '),
                              _createElementVNode(
                                'span',
                                null,
                                _toDisplayString($setup.content),
                                1
                                /* TEXT */
                              )
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                  ]
                )
              ],
              6
              /* CLASS, STYLE */
            ))
          : _createCommentVNode('v-if', true)
      ],
      14,
      _hoisted_1
    )
  )
}
import { computed, useId } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { progressProps } from './progress'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhProgress'
  },
  {
    __name: 'progress',
    props: progressProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('progress')
      const componentId = useId()
      const { themeStyle } = useComponentTheme(
        'progress',
        computed(() => props.themeOverrides)
      )
      const percentages = computed(() => {
        return Array.isArray(props.percentage) ? props.percentage : [props.percentage]
      })
      const isGradient = computed(() => {
        if (typeof props.color === 'object' && props.color !== null) {
          if (Array.isArray(props.color) && Array.isArray(props.percentage)) {
            return false
          }
          return true
        }
        return false
      })
      const getGradientStops = computed(() => {
        if (!isGradient.value) return []
        if (Array.isArray(props.color)) {
          const len = props.color.length
          return props.color.map((c, i) => ({
            offset: `${len > 1 ? (i / (len - 1)) * 100 : 0}%`,
            color: c
          }))
        }
        return Object.entries(props.color).map(([offset, color]) => ({
          offset,
          color
        }))
      })
      const barStyle = computed(() => {
        const style = {
          width: props.indeterminate ? void 0 : `${percentages.value[0]}%`,
          '--yh-progress-duration': `${props.duration}s`
        }
        if (isGradient.value) {
          const stops = getGradientStops.value.map((s) => `${s.color} ${s.offset}`).join(', ')
          style.backgroundImage = `linear-gradient(to right, ${stops})`
        } else {
          style.backgroundColor = getColor(percentages.value[0], 0)
        }
        return style
      })
      const getColor = (percentage, index) => {
        if (typeof props.color === 'function') return props.color(percentage)
        if (typeof props.color === 'string' && props.color !== '') return props.color
        if (
          Array.isArray(props.percentage) &&
          Array.isArray(props.color) &&
          typeof index === 'number'
        ) {
          return props.color[index] || props.color[props.color.length - 1]
        }
        if (isGradient.value) return `url(#${componentId}-gradient)`
        return ''
      }
      const getCircleParams = (index) => {
        const layerGap = 4
        const layerStrokeWidth = props.strokeWidth
        const r = props.width / 2 - props.strokeWidth / 2 - index * (layerStrokeWidth + layerGap)
        const p = 2 * Math.PI * r
        const isDashboard = props.type === 'dashboard'
        const rate = isDashboard ? 0.75 : 1
        const path = `
    M ${props.width / 2} ${props.width / 2}
    m 0 ${isDashboard ? '' : '-'}${r}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
  `
        const offset = (-1 * p * (1 - rate)) / 2
        const pathStyle = {
          strokeDasharray: `${p * rate * (percentages.value[index] / 100)}px, ${p}px`,
          strokeDashoffset: `${offset}px`,
          transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        }
        const trackStyle = {
          strokeDasharray: `${p * rate}px, ${p}px`,
          strokeDashoffset: `${offset}px`
        }
        return { path, pathStyle, trackStyle, r, p }
      }
      const secondaryBarStyle = computed(() => ({
        width: `${props.secondaryPercentage}%`
      }))
      const content = computed(() => {
        if (props.format) return props.format(percentages.value[0])
        return `${percentages.value[0]}%`
      })
      const statusIconSvg = computed(() => {
        if (props.status === 'success') {
          return `<path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />`
        }
        if (props.status === 'exception') {
          return `<path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm165.4 533.4a32 32 0 0 0 0-45.2L557.3 532l120.1-120.1a32 32 0 0 0-45.2-45.2L512 486.8 391.9 366.7a32 32 0 0 0-45.2 45.2L466.8 532l-120.1 120.1a32 32 0 1 0 45.2 45.2L512 577.2l120.1 120.1a32 32 0 0 0 45.2 0z" />`
        }
        if (props.status === 'warning' || props.status === 'info') {
          return `<path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm0 160a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0V448a32 32 0 0 0-32-32z" />`
        }
        return ''
      })
      const progressClass = computed(() => [
        ns.b(),
        ns.m(props.type),
        ns.is(props.status, !!props.status),
        ns.is('without-text', !props.showText || props.indeterminate),
        ns.is('text-inside', props.textInside),
        ns.is('animated', props.animated)
      ])
      const __returned__ = {
        props,
        ns,
        componentId,
        themeStyle,
        percentages,
        isGradient,
        getGradientStops,
        barStyle,
        getColor,
        getCircleParams,
        secondaryBarStyle,
        content,
        statusIconSvg,
        progressClass,
        computed,
        useId,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get progressProps() {
          return progressProps
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
