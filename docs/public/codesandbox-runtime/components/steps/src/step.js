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
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  Fragment as _Fragment
} from 'vue'
const _hoisted_1 = ['innerHTML']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.stepClass),
        style: _normalizeStyle($setup.stepStyle),
        onClick: $setup.handleClick
      },
      [
        _createCommentVNode(' \u65F6\u95F4\u4FE1\u606F\uFF08\u65F6\u95F4\u7EBF\u6A21\u5F0F\uFF09 '),
        ((_a = $setup.stepsContext) == null ? void 0 : _a.props.showTimeline) && _ctx.time
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('time'))
              },
              [
                _renderSlot(_ctx.$slots, 'time', {}, () => [
                  _createTextVNode(
                    _toDisplayString(_ctx.time),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u8FDE\u63A5\u7EBF '),
        !$setup.isLast
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('line'))
              },
              [
                _createElementVNode(
                  'i',
                  {
                    class: _normalizeClass($setup.ns.e('line-inner')),
                    style: _normalizeStyle(
                      ((_b = $setup.stepsContext) == null ? void 0 : _b.props.showProgress)
                        ? {
                            width: `${$setup.progressPercent}%`
                          }
                        : {}
                    )
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u56FE\u6807\u533A '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass([$setup.ns.e('head'), $setup.ns.is($setup.currentStatus, true)])
          },
          [
            _renderSlot(_ctx.$slots, 'icon', {}, () => [
              _createCommentVNode(' \u81EA\u5B9A\u4E49\u56FE\u6807 '),
              _ctx.icon
                ? (_openBlock(),
                  _createElementBlock(
                    'span',
                    {
                      key: 0,
                      class: _normalizeClass([$setup.ns.e('icon'), _ctx.icon])
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
                        _createCommentVNode(' \u5185\u7F6E\u72B6\u6001\u56FE\u6807 '),
                        (_openBlock(),
                        _createElementBlock(
                          'svg',
                          {
                            class: _normalizeClass($setup.ns.e('icon-inner')),
                            viewBox: '0 0 1024 1024',
                            width: '20',
                            height: '20'
                          },
                          [
                            _createCommentVNode(' eslint-disable-next-line vue/no-v-html '),
                            _createElementVNode(
                              'g',
                              { innerHTML: $setup.statusIconSvg },
                              null,
                              8,
                              _hoisted_1
                            )
                          ],
                          2
                          /* CLASS */
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
                        _createCommentVNode(' \u6570\u5B57 '),
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('number'))
                          },
                          _toDisplayString($setup.stepIndex + 1),
                          3
                          /* TEXT, CLASS */
                        )
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
            ])
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u4E3B\u4F53\u5185\u5BB9 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('main'))
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass([
                  $setup.ns.e('title'),
                  $setup.ns.is($setup.currentStatus, true)
                ])
              },
              [
                _renderSlot(_ctx.$slots, 'title', {}, () => [
                  _createTextVNode(
                    _toDisplayString(_ctx.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ),
            _ctx.description || _ctx.$slots.description
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('description'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'description', {}, () => [
                      _createTextVNode(
                        _toDisplayString(_ctx.description),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(
              ' \u81EA\u5B9A\u4E49\u5185\u5BB9\uFF08\u5EF6\u8FDF\u52A0\u8F7D\u652F\u6301\uFF09 '
            ),
            _ctx.$slots.default && ($setup.hasRendered || !_ctx.lazy)
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('content'))
                  },
                  [_renderSlot(_ctx.$slots, 'default')],
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
    )
  )
}
import { computed, inject, onMounted, onUnmounted, getCurrentInstance, watch, ref } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { stepProps } from './step-meta.js'
import { STEPS_INJECTION_KEY } from './steps-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhStep'
  },
  {
    __name: 'step',
    props: stepProps,
    setup(__props, { expose: __expose }) {
      var _a
      __expose()
      const props = __props
      const ns = useNamespace('step')
      const { themeStyle } = useComponentTheme(
        'step',
        computed(() => props.themeOverrides)
      )
      const instance = getCurrentInstance()
      const uid = (_a = instance == null ? void 0 : instance.uid) != null ? _a : 0
      const stepsContext = inject(STEPS_INJECTION_KEY)
      const hasRendered = ref(!props.lazy)
      const stepIndex = computed(() => {
        var _a2
        return (_a2 =
          stepsContext == null
            ? void 0
            : stepsContext.steps.value.findIndex((s) => s.uid === uid)) != null
          ? _a2
          : 0
      })
      const currentStatus = computed(() => {
        var _a2, _b, _c
        if (props.status) return props.status
        const active =
          (_a2 = stepsContext == null ? void 0 : stepsContext.props.active) != null ? _a2 : 0
        const finishStatus =
          (_b = stepsContext == null ? void 0 : stepsContext.props.finishStatus) != null
            ? _b
            : 'finish'
        const processStatus =
          (_c = stepsContext == null ? void 0 : stepsContext.props.processStatus) != null
            ? _c
            : 'process'
        if (stepIndex.value < active) {
          return finishStatus
        } else if (stepIndex.value === active) {
          return processStatus
        }
        return 'wait'
      })
      const isActive = computed(() => {
        var _a2
        return (
          stepIndex.value ===
          ((_a2 = stepsContext == null ? void 0 : stepsContext.props.active) != null ? _a2 : 0)
        )
      })
      watch(isActive, (active) => {
        if (active && props.lazy) {
          hasRendered.value = true
        }
      })
      const isLast = computed(() => {
        var _a2
        const total =
          (_a2 = stepsContext == null ? void 0 : stepsContext.steps.value.length) != null ? _a2 : 0
        return stepIndex.value === total - 1
      })
      const progressPercent = computed(() => {
        var _a2
        if (!(stepsContext == null ? void 0 : stepsContext.props.showProgress)) return 0
        const active =
          (_a2 = stepsContext == null ? void 0 : stepsContext.props.active) != null ? _a2 : 0
        if (stepIndex.value < active) {
          return 100
        } else if (stepIndex.value === active) {
          return props.progress
        }
        return 0
      })
      const _actualDirection = computed(() => {
        var _a2
        if (stepsContext == null ? void 0 : stepsContext.isResponsiveVertical.value)
          return 'vertical'
        return (_a2 = stepsContext == null ? void 0 : stepsContext.props.direction) != null
          ? _a2
          : 'horizontal'
      })
      const stepStyle = computed(() => {
        const styles = __spreadValues({}, themeStyle.value)
        const space = stepsContext == null ? void 0 : stepsContext.props.space
        if (!space) return styles
        const spaceValue = typeof space === 'number' ? `${space}px` : space
        styles.flexBasis = spaceValue
        if (!isLast.value) {
          styles.maxWidth = spaceValue
        }
        return styles
      })
      const handleClick = () => {
        stepsContext == null
          ? void 0
          : stepsContext.handleStepClick(stepIndex.value, props.disabled)
      }
      onMounted(() => {
        stepsContext == null
          ? void 0
          : stepsContext.registerStep({
              uid,
              title: props.title,
              description: props.description,
              icon: props.icon,
              status: currentStatus.value,
              disabled: props.disabled,
              time: props.time,
              progress: props.progress
            })
      })
      watch(
        () => ({
          title: props.title,
          description: props.description,
          icon: props.icon,
          status: currentStatus.value,
          disabled: props.disabled,
          time: props.time,
          progress: props.progress
        }),
        (config) => {
          stepsContext == null
            ? void 0
            : stepsContext.registerStep(
                __spreadValues(
                  {
                    uid
                  },
                  config
                )
              )
        }
      )
      onUnmounted(() => {
        stepsContext == null ? void 0 : stepsContext.unregisterStep(uid)
      })
      const statusIconSvg = computed(() => {
        if (currentStatus.value === 'finish' || currentStatus.value === 'success') {
          return '<path fill="currentColor" d="M406.6 600.6L281.5 475.5a32 32 0 0 0-45.3 45.2l147.5 147.5a32 32 0 0 0 45.2 0l294.6-294.6a32 32 0 0 0-45.2-45.2L406.6 600.6z"/>'
        }
        if (currentStatus.value === 'error') {
          return '<path fill="currentColor" d="M560.4 512l133.9-133.9a32 32 0 1 0-45.2-45.3L515.2 466.7 381.3 332.8a32 32 0 1 0-45.3 45.3L469.9 512 336 645.9a32 32 0 1 0 45.3 45.2l133.9-133.9 133.9 133.9a32 32 0 1 0 45.2-45.2L560.4 512z"/>'
        }
        return ''
      })
      const stepClass = computed(() => [
        ns.b(),
        ns.is('simple', stepsContext == null ? void 0 : stepsContext.props.simple),
        ns.is(currentStatus.value, true),
        ns.is('last', isLast.value),
        ns.is('center', stepsContext == null ? void 0 : stepsContext.props.alignCenter),
        ns.is('disabled', props.disabled),
        ns.is(
          'clickable',
          (stepsContext == null ? void 0 : stepsContext.props.clickable) && !props.disabled
        ),
        ns.is('timeline', stepsContext == null ? void 0 : stepsContext.props.showTimeline),
        ns.is(
          'label-vertical',
          (stepsContext == null ? void 0 : stepsContext.props.labelPlacement) === 'vertical'
        )
      ])
      const __returned__ = {
        props,
        ns,
        themeStyle,
        instance,
        uid,
        stepsContext,
        hasRendered,
        stepIndex,
        currentStatus,
        isActive,
        isLast,
        progressPercent,
        _actualDirection,
        stepStyle,
        handleClick,
        statusIconSvg,
        stepClass,
        computed,
        inject,
        onMounted,
        onUnmounted,
        getCurrentInstance,
        watch,
        ref,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get stepProps() {
          return stepProps
        },
        get STEPS_INJECTION_KEY() {
          return STEPS_INJECTION_KEY
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
