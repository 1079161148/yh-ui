import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderList as _renderList,
  Fragment as _Fragment,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.rootClass),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' \u6807\u9898 '),
        _renderSlot(_ctx.$slots, 'prefix', {}, () => [
          _ctx.title
            ? (_openBlock(),
              _createElementBlock(
                'span',
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e('title'))
                },
                _toDisplayString(_ctx.title),
                3
                /* TEXT, CLASS */
              ))
            : _createCommentVNode('v-if', true)
        ]),
        _createCommentVNode(' \u4E3B\u4F53\u5185\u5BB9 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content'))
          },
          [
            _createCommentVNode(
              ' \u9ED8\u8BA4\u63D2\u69FD\uFF1A\u5B8C\u5168\u81EA\u5B9A\u4E49\u6E32\u67D3 '
            ),
            _renderSlot(
              _ctx.$slots,
              'default',
              {
                current: $setup.formatContext,
                remaining: $setup.remain,
                formatted: $setup.displayText,
                status: $setup.status,
                isWarning: $setup.isWarning,
                isFinished: $setup.isFinished
              },
              () => [
                _createCommentVNode(' \u7FFB\u724C\u6A21\u5F0F '),
                _ctx.flipAnimation
                  ? (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      { key: 0 },
                      _renderList($setup.digits, (digit, idx) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            _Fragment,
                            {
                              key: digit.key
                            },
                            [
                              _createCommentVNode(' \u5206\u9694\u7B26 '),
                              idx > 0
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'span',
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e('separator'))
                                    },
                                    [
                                      _renderSlot(_ctx.$slots, 'separator', {}, () => [
                                        _createTextVNode(
                                          _toDisplayString(_ctx.separator),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('block'))
                                },
                                [
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('flip-card'))
                                    },
                                    [
                                      _renderSlot(
                                        _ctx.$slots,
                                        `${digit.key}-cell`,
                                        {
                                          value: digit.value
                                        },
                                        () => [
                                          _createElementVNode(
                                            'span',
                                            {
                                              class: _normalizeClass($setup.ns.e('value')),
                                              style: _normalizeStyle($setup.valueStyleComputed)
                                            },
                                            _toDisplayString(digit.value),
                                            7
                                            /* TEXT, CLASS, STYLE */
                                          )
                                        ]
                                      )
                                    ],
                                    2
                                    /* CLASS */
                                  ),
                                  digit.label
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 0,
                                          class: _normalizeClass($setup.ns.e('label'))
                                        },
                                        _toDisplayString(digit.label),
                                        3
                                        /* TEXT, CLASS */
                                      ))
                                    : _createCommentVNode('v-if', true)
                                ],
                                2
                                /* CLASS */
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
                  : (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createCommentVNode(' \u5E38\u89C4\u6A21\u5F0F '),
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('value')),
                            style: _normalizeStyle($setup.valueStyleComputed)
                          },
                          [
                            _renderSlot(_ctx.$slots, 'value', { text: $setup.displayText }, () => [
                              _createTextVNode(
                                _toDisplayString($setup.displayText),
                                1
                                /* TEXT */
                              )
                            ])
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
              ]
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u540E\u7F00 '),
        _renderSlot(_ctx.$slots, 'suffix', {}, () => [
          _ctx.suffix
            ? (_openBlock(),
              _createElementBlock(
                'span',
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e('suffix'))
                },
                _toDisplayString(_ctx.suffix),
                3
                /* TEXT, CLASS */
              ))
            : _createCommentVNode('v-if', true)
        ])
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import {
  countdownProps,
  countdownEmits,
  createFormatContext,
  formatCountdown,
  isTargetTimestamp
} from './countdown-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCountdown'
  },
  {
    __name: 'countdown',
    props: countdownProps,
    emits: countdownEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('countdown')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'countdown',
        computed(() => props.themeOverrides)
      )
      const status = ref('pending')
      const remain = ref(getInitialRemain())
      const startTime = ref(0)
      const pausedRemain = ref(remain.value)
      const hasWarned = ref(false)
      const rafId = ref(null)
      const prevUpdateTime = ref(0)
      const formatContext = computed(() => createFormatContext(remain.value))
      const displayText = computed(() => formatCountdown(props.format, formatContext.value))
      const shouldShowDays = computed(() => {
        if (props.showDays === true) return true
        if (props.showDays === false) return false
        return formatContext.value.days > 0
      })
      const isWarning = computed(() => {
        if (!props.warningThreshold) return false
        return remain.value > 0 && remain.value <= props.warningThreshold
      })
      const isFinished = computed(() => status.value === 'finished')
      const rootClass = computed(() => [
        ns.b(),
        ns.is('finished', isFinished.value),
        ns.is('warning', isWarning.value),
        ns.is('paused', status.value === 'paused'),
        ns.is('flip', props.flipAnimation),
        ns.is('monospace', props.useMonospaceFont)
      ])
      const valueStyleComputed = computed(() => {
        if (typeof props.valueStyle === 'string') {
          return props.valueStyle
        }
        return props.valueStyle
      })
      function getInitialRemain() {
        var _a
        const serverOffset = (_a = props.serverTimeOffset) != null ? _a : 0
        const now = Date.now() + serverOffset
        const value = props.value
        if (isTargetTimestamp(value)) {
          const target = value instanceof Date ? value.getTime() : value
          return Math.max(0, target - now)
        }
        return Math.max(0, value instanceof Date ? value.getTime() : value)
      }
      function tick() {
        if (status.value !== 'running') return
        const now = performance.now()
        const elapsed = now - startTime.value
        const newRemain = Math.max(0, pausedRemain.value - elapsed)
        const shouldUpdate =
          now - prevUpdateTime.value >= props.interval ||
          newRemain === 0 ||
          Math.floor(remain.value / props.precision) !== Math.floor(newRemain / props.precision)
        if (shouldUpdate) {
          remain.value = newRemain
          prevUpdateTime.value = now
          emit('change', formatContext.value)
          if (props.warningThreshold && !hasWarned.value && isWarning.value) {
            hasWarned.value = true
            emit('warning', formatContext.value)
          }
        }
        if (newRemain <= 0) {
          finish()
          return
        }
        rafId.value = requestAnimationFrame(tick)
      }
      function start() {
        if (status.value === 'running') return
        if (status.value === 'pending' || status.value === 'finished') {
          pausedRemain.value = getInitialRemain()
          hasWarned.value = false
        }
        remain.value = pausedRemain.value
        if (remain.value <= 0) {
          finish()
          return
        }
        startTime.value = performance.now()
        prevUpdateTime.value = startTime.value
        status.value = 'running'
        emit('start')
        emit('statusChange', 'running')
        rafId.value = requestAnimationFrame(tick)
      }
      function pause() {
        if (status.value !== 'running') return
        if (rafId.value) {
          cancelAnimationFrame(rafId.value)
          rafId.value = null
        }
        const elapsed = performance.now() - startTime.value
        pausedRemain.value = Math.max(0, pausedRemain.value - elapsed)
        remain.value = pausedRemain.value
        status.value = 'paused'
        emit('pause')
        emit('statusChange', 'paused')
      }
      function resume() {
        if (status.value !== 'paused') return
        startTime.value = performance.now()
        prevUpdateTime.value = startTime.value
        status.value = 'running'
        emit('resume')
        emit('statusChange', 'running')
        rafId.value = requestAnimationFrame(tick)
      }
      function reset() {
        if (rafId.value) {
          cancelAnimationFrame(rafId.value)
          rafId.value = null
        }
        pausedRemain.value = getInitialRemain()
        remain.value = pausedRemain.value
        hasWarned.value = false
        status.value = 'pending'
        emit('reset')
        emit('statusChange', 'pending')
        if (props.autoStart) {
          start()
        }
      }
      function finish() {
        if (rafId.value) {
          cancelAnimationFrame(rafId.value)
          rafId.value = null
        }
        remain.value = 0
        status.value = 'finished'
        emit('finish')
        emit('statusChange', 'finished')
      }
      function getRemain() {
        return remain.value
      }
      function getStatus() {
        return status.value
      }
      watch(
        () => props.value,
        () => {
          reset()
        }
      )
      onMounted(() => {
        if (props.autoStart && remain.value > 0) {
          start()
        } else if (remain.value <= 0) {
          status.value = 'finished'
          emit('finish')
          emit('statusChange', 'finished')
        }
      })
      onUnmounted(() => {
        if (rafId.value) {
          cancelAnimationFrame(rafId.value)
          rafId.value = null
        }
      })
      __expose({
        start,
        pause,
        resume,
        reset,
        getRemain,
        getStatus
      })
      const digits = computed(() => {
        var _a, _b, _c, _d, _e
        const ctx = formatContext.value
        const result = []
        if (shouldShowDays.value) {
          result.push({
            key: 'days',
            value: ctx.DD,
            label: ((_a = props.labels) == null ? void 0 : _a.days) || t('countdown.days')
          })
        }
        if (props.showHours) {
          result.push({
            key: 'hours',
            value: ctx.HH,
            label: ((_b = props.labels) == null ? void 0 : _b.hours) || t('countdown.hours')
          })
        }
        if (props.showMinutes) {
          result.push({
            key: 'minutes',
            value: ctx.mm,
            label: ((_c = props.labels) == null ? void 0 : _c.minutes) || t('countdown.minutes')
          })
        }
        if (props.showSeconds) {
          result.push({
            key: 'seconds',
            value: ctx.ss,
            label: ((_d = props.labels) == null ? void 0 : _d.seconds) || t('countdown.seconds')
          })
        }
        if (props.showMilliseconds) {
          result.push({
            key: 'milliseconds',
            value: ctx.SSS,
            label:
              ((_e = props.labels) == null ? void 0 : _e.milliseconds) ||
              t('countdown.milliseconds')
          })
        }
        return result
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        status,
        remain,
        startTime,
        pausedRemain,
        hasWarned,
        rafId,
        prevUpdateTime,
        formatContext,
        displayText,
        shouldShowDays,
        isWarning,
        isFinished,
        rootClass,
        valueStyleComputed,
        getInitialRemain,
        tick,
        start,
        pause,
        resume,
        reset,
        finish,
        getRemain,
        getStatus,
        digits,
        ref,
        computed,
        watch,
        onMounted,
        onUnmounted,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get countdownProps() {
          return countdownProps
        },
        get countdownEmits() {
          return countdownEmits
        },
        get createFormatContext() {
          return createFormatContext
        },
        get formatCountdown() {
          return formatCountdown
        },
        get isTargetTimestamp() {
          return isTargetTimestamp
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
