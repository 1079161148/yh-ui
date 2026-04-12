import {
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  renderSlot as _renderSlot,
  createVNode as _createVNode,
  withModifiers as _withModifiers,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeStyle as _normalizeStyle,
  createTextVNode as _createTextVNode,
  withCtx as _withCtx,
  createBlock as _createBlock,
  vShow as _vShow,
  withDirectives as _withDirectives
} from 'vue'
const _hoisted_1 = { style: { 'white-space': 'pre-wrap' } }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is($setup.status),
          $setup.ns.m($setup.variant),
          $setup.ns.is('selectable', $setup.selectable),
          $setup.ns.is('selected', $setup.selected)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        onClick: $setup.handleCardClick
      },
      [
        _createCommentVNode(' \u4E3B\u4F53\u5185\u5BB9\u533A\u57DF\u5305\u88F9 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content'))
          },
          [
            _createCommentVNode(' \u5DE6\u4FA7\u91D1\u989D\u533A\u57DF '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('amount-side'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('amount'))
                  },
                  [
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('symbol'))
                      },
                      _toDisplayString($setup.symbol),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'span',
                      null,
                      _toDisplayString($setup.amount),
                      1
                      /* TEXT */
                    )
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('threshold'))
                  },
                  _toDisplayString($setup.thresholdText),
                  3
                  /* TEXT, CLASS */
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u53F3\u4FA7\u5185\u5BB9\u533A\u57DF '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('main-side'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('info'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('title-row'))
                      },
                      [
                        _renderSlot(_ctx.$slots, 'title', {}, () => [
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('title'))
                            },
                            _toDisplayString($setup.title),
                            3
                            /* TEXT, CLASS */
                          )
                        ]),
                        $setup.selectable
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('checkbox')),
                                onClick:
                                  _cache[0] || (_cache[0] = _withModifiers(() => {}, ['stop']))
                              },
                              [
                                _createVNode(
                                  $setup['YhCheckbox'],
                                  {
                                    'model-value': $setup.selected,
                                    'onUpdate:modelValue': $setup.handleCheckChange
                                  },
                                  null,
                                  8,
                                  ['model-value']
                                )
                              ],
                              2
                              /* CLASS */
                            ))
                          : _createCommentVNode('v-if', true)
                      ],
                      2
                      /* CLASS */
                    ),
                    _renderSlot(_ctx.$slots, 'description', {}, () => [
                      $setup.description
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('description'))
                            },
                            _toDisplayString($setup.description),
                            3
                            /* TEXT, CLASS */
                          ))
                        : _createCommentVNode('v-if', true)
                    ]),
                    _createCommentVNode(' \u75AF\u62A2\u8FDB\u5EA6\u6761 '),
                    $setup.percent !== void 0
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('progress'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('progress-bar'))
                              },
                              [
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('progress-inner')),
                                    style: _normalizeStyle({
                                      width: $setup.percent + '%'
                                    })
                                  },
                                  null,
                                  6
                                  /* CLASS, STYLE */
                                )
                              ],
                              2
                              /* CLASS */
                            ),
                            $setup.percentText
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e('progress-text'))
                                  },
                                  _toDisplayString($setup.percentText),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('footer'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('valid-period'))
                      },
                      _toDisplayString($setup.validPeriod),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('action-area')),
                        onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ['stop']))
                      },
                      [
                        _renderSlot(_ctx.$slots, 'action', {}, () => [
                          $setup.finalActionText
                            ? (_openBlock(),
                              _createBlock(
                                $setup['YhButton'],
                                {
                                  key: 0,
                                  type: 'primary',
                                  size: 'small',
                                  disabled: !$setup.isAvailable,
                                  class: _normalizeClass($setup.ns.e('action-btn')),
                                  onClick: $setup.handleActionClick
                                },
                                {
                                  default: _withCtx(() => [
                                    _createTextVNode(
                                      _toDisplayString($setup.finalActionText),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                },
                                8,
                                ['disabled', 'class']
                              ))
                            : _createCommentVNode('v-if', true)
                        ])
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u6D6E\u52A8\u89D2\u6807 '),
            _renderSlot(_ctx.$slots, 'badge', {}, () => [
              $setup.badge
                ? (_openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: _normalizeClass([
                        $setup.ns.e('badge'),
                        $setup.ns.em('badge', $setup.badgeType)
                      ])
                    },
                    _toDisplayString($setup.badge),
                    3
                    /* TEXT, CLASS */
                  ))
                : _createCommentVNode('v-if', true)
            ]),
            _createCommentVNode(' \u72B6\u6001\u6C34\u5370 '),
            $setup.statusSealText
              ? _renderSlot(
                  _ctx.$slots,
                  'seal',
                  {
                    key: 0,
                    status: $setup.status
                  },
                  () => [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass([$setup.ns.e('seal'), $setup.ns.is($setup.status)])
                      },
                      _toDisplayString($setup.statusSealText),
                      3
                      /* TEXT, CLASS */
                    )
                  ]
                )
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5E95\u90E8\u4F7F\u7528\u89C4\u5219\u5C55\u5F00\u533A '),
        $setup.rules || _ctx.$slots.rules
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass([
                  $setup.ns.e('rules'),
                  $setup.ns.is('expanded', $setup.rulesExpanded)
                ])
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('rules-trigger')),
                    onClick:
                      _cache[2] ||
                      (_cache[2] = _withModifiers(
                        ($event) => ($setup.rulesExpanded = !$setup.rulesExpanded),
                        ['stop']
                      ))
                  },
                  [
                    _createElementVNode(
                      'span',
                      null,
                      _toDisplayString($setup.finalRuleTitle),
                      1
                      /* TEXT */
                    ),
                    (_openBlock(),
                    _createElementBlock(
                      'svg',
                      {
                        class: _normalizeClass($setup.ns.e('rules-icon')),
                        viewBox: '0 0 1024 1024',
                        width: '12',
                        height: '12'
                      },
                      [
                        ...(_cache[3] ||
                          (_cache[3] = [
                            _createElementVNode(
                              'path',
                              {
                                d: 'M512 704c-12.8 0-25.6-5.12-35.84-15.36L155.52 368c-19.84-19.84-19.84-51.84 0-71.68s51.84-19.84 71.68 0L512 600.96l284.8-284.8c19.84-19.84 51.84-19.84 71.68 0s19.84 51.84 0 71.68L547.84 688.64C537.6 698.88 524.8 704 512 704z',
                                fill: 'currentColor'
                              },
                              null,
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    ))
                  ],
                  2
                  /* CLASS */
                ),
                _createCommentVNode(' \u6298\u53E0\u9762\u677F\u5185\u5BB9 '),
                _withDirectives(
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('rules-content'))
                    },
                    [
                      _renderSlot(_ctx.$slots, 'rules', {}, () => [
                        _createElementVNode(
                          'div',
                          _hoisted_1,
                          _toDisplayString($setup.rules),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  ),
                  [[_vShow, $setup.rulesExpanded]]
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, toRefs, ref } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { couponCardProps, couponCardEmits } from './coupon-card-meta.js'
import { YhButton } from '../../button.js'
import { YhCheckbox } from '../../checkbox.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhCouponCard' },
  {
    __name: 'coupon-card',
    props: couponCardProps,
    emits: couponCardEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const {
        title,
        description,
        amount,
        symbol,
        threshold,
        validPeriod,
        status,
        actionText,
        selectable,
        selected,
        variant,
        badge,
        badgeType,
        percent,
        percentText,
        rules,
        ruleTitle
      } = toRefs(props)
      const rulesExpanded = ref(false)
      const ns = useNamespace('coupon-card')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'coupon-card',
        computed(() => props.themeOverrides)
      )
      const isAvailable = computed(() => status.value === 'available')
      const isUsed = computed(() => status.value === 'used')
      const isExpired = computed(() => status.value === 'expired')
      const thresholdText = computed(() => {
        const val = Number(threshold.value)
        if (!isNaN(val) && val > 0) {
          return t('couponcard.limit', { threshold: val })
        }
        if (typeof threshold.value === 'string' && threshold.value) {
          return threshold.value
        }
        return t('couponcard.noThreshold')
      })
      const statusSealText = computed(() => {
        if (isUsed.value) return t('couponcard.used')
        if (isExpired.value) return t('couponcard.expired')
        return ''
      })
      const finalActionText = computed(() => {
        if (actionText.value) return actionText.value
        if (isUsed.value) return t('couponcard.used')
        if (isExpired.value) return t('couponcard.expired')
        return t('couponcard.available')
      })
      const finalRuleTitle = computed(() => {
        if (ruleTitle.value) return ruleTitle.value
        return t('couponcard.ruleTitle')
      })
      const handleActionClick = (e) => {
        if (!isAvailable.value) return
        e.stopPropagation()
        emit('action', e)
      }
      const handleCardClick = (e) => {
        emit('click', e)
      }
      const handleCheckChange = (val) => {
        emit('update:selected', !!val)
      }
      const __returned__ = {
        props,
        emit,
        title,
        description,
        amount,
        symbol,
        threshold,
        validPeriod,
        status,
        actionText,
        selectable,
        selected,
        variant,
        badge,
        badgeType,
        percent,
        percentText,
        rules,
        ruleTitle,
        rulesExpanded,
        ns,
        t,
        themeStyle,
        isAvailable,
        isUsed,
        isExpired,
        thresholdText,
        statusSealText,
        finalActionText,
        finalRuleTitle,
        handleActionClick,
        handleCardClick,
        handleCheckChange,
        computed,
        toRefs,
        ref,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get couponCardProps() {
          return couponCardProps
        },
        get couponCardEmits() {
          return couponCardEmits
        },
        get YhButton() {
          return YhButton
        },
        get YhCheckbox() {
          return YhCheckbox
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
