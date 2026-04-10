var __defProp = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
import {
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  createTextVNode as _createTextVNode
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.type)]),
        style: _normalizeStyle($setup.containerStyle)
      },
      [
        _ctx.type === 'wheel'
          ? (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createCommentVNode(
                  ' Dynamic class injection for styling decoupling based on exact content '
                ),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('wheel-container'),
                      $setup.ns.is('pure-text', $setup.isPureText)
                    ])
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('wheel-inner')),
                        style: _normalizeStyle([
                          $setup.wheelInnerStyle,
                          {
                            transform: `rotate(${$setup.wheelRotate}deg)`,
                            transition: $setup.isRotating
                              ? `transform ${_ctx.duration}ms cubic-bezier(0.15, 0, 0, 1.0)`
                              : 'none'
                          }
                        ])
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(_ctx.prizes, (prize, index) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: prize.id,
                                  class: _normalizeClass($setup.ns.e('prize-item')),
                                  style: _normalizeStyle({
                                    transform: `rotate(${(360 / _ctx.prizes.length) * index + 360 / _ctx.prizes.length / 2}deg)`
                                  })
                                },
                                [
                                  _renderSlot(_ctx.$slots, 'prize', { prize }, () => [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('prize-content'))
                                      },
                                      [
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass($setup.ns.e('prize-name')),
                                            style: _normalizeStyle({
                                              color: prize.textColor
                                            })
                                          },
                                          _toDisplayString(prize.name),
                                          7
                                          /* TEXT, CLASS, STYLE */
                                        ),
                                        prize.image
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('prize-icon'))
                                              },
                                              _toDisplayString(prize.image),
                                              3
                                              /* TEXT, CLASS */
                                            ))
                                          : _createCommentVNode('v-if', true)
                                      ],
                                      2
                                      /* CLASS */
                                    )
                                  ])
                                ],
                                6
                                /* CLASS, STYLE */
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      6
                      /* CLASS, STYLE */
                    ),
                    !_ctx.hideBtn
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('pointer')),
                            onClick: $setup.handleStart
                          },
                          [
                            _renderSlot(_ctx.$slots, 'action', {}, () => [
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('pointer-btn'))
                                },
                                [
                                  _createElementVNode(
                                    'span',
                                    null,
                                    _toDisplayString($setup.finalActionText),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                2
                                /* CLASS */
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
              64
              /* STABLE_FRAGMENT */
            ))
          : _ctx.type === 'grid'
            ? (_openBlock(),
              _createElementBlock(
                'div',
                {
                  key: 1,
                  class: _normalizeClass($setup.ns.e('grid-container'))
                },
                [
                  (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(8, (idx) => {
                      return _createElementVNode(
                        'div',
                        {
                          key: idx,
                          class: _normalizeClass([
                            $setup.ns.e('grid-item'),
                            $setup.ns.is('active', $setup.gridActiveIndex === idx - 1)
                          ]),
                          style: _normalizeStyle({
                            'grid-area': $setup.gridAreas[idx - 1]
                          })
                        },
                        [
                          _ctx.prizes[idx - 1]
                            ? _renderSlot(
                                _ctx.$slots,
                                'prize',
                                {
                                  key: 0,
                                  prize: _ctx.prizes[idx - 1]
                                },
                                () => [
                                  _ctx.prizes[idx - 1].image
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: 0,
                                          class: _normalizeClass($setup.ns.e('prize-icon'))
                                        },
                                        _toDisplayString(_ctx.prizes[idx - 1].image),
                                        3
                                        /* TEXT, CLASS */
                                      ))
                                    : _createCommentVNode('v-if', true),
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('prize-name')),
                                      style: _normalizeStyle({
                                        color: _ctx.prizes[idx - 1].textColor
                                      })
                                    },
                                    _toDisplayString(_ctx.prizes[idx - 1].name),
                                    7
                                    /* TEXT, CLASS, STYLE */
                                  )
                                ]
                              )
                            : _createCommentVNode('v-if', true)
                        ],
                        6
                        /* CLASS, STYLE */
                      )
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  )),
                  !_ctx.hideBtn
                    ? (_openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('grid-btn')),
                          onClick: $setup.handleStart,
                          style: { 'grid-area': '2 / 2' }
                        },
                        [
                          _renderSlot(_ctx.$slots, 'action', {}, () => [
                            _createTextVNode(
                              _toDisplayString($setup.finalActionText),
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
              ))
            : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch, onUnmounted } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { luckyDrawProps, luckyDrawEmits } from './lucky-draw'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhLuckyDraw' },
  {
    __name: 'lucky-draw',
    props: luckyDrawProps,
    emits: luckyDrawEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('lucky-draw')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'lucky-draw',
        computed(() => props.themeOverrides)
      )
      const isRotating = ref(false)
      const wheelRotate = ref(0)
      const gridActiveIndex = ref(-1)
      let animationFrameId = null
      const finalActionText = computed(() => {
        if (isRotating.value || props.loading) return t('luckydraw.drawing')
        return props.actionText || t('luckydraw.start')
      })
      const containerStyle = computed(() =>
        __spreadProps(__spreadValues({}, themeStyle.value), {
          width: typeof props.size === 'number' ? `${props.size}px` : props.size,
          height: typeof props.size === 'number' ? `${props.size}px` : props.size
        })
      )
      const isPureText = computed(
        () => props.prizes.length > 0 && props.prizes.every((p) => !p.image)
      )
      const defaultColors = ['#FFF4EB', '#FFFFFF']
      const wheelInnerStyle = computed(() => {
        const prizeCount = props.prizes.length
        if (prizeCount === 0) return {}
        const degreesPerPrize = 360 / prizeCount
        const gradientParts = []
        props.prizes.forEach((prize, index) => {
          const start = index * degreesPerPrize
          const end = (index + 1) * degreesPerPrize
          const color = prize.color || defaultColors[index % defaultColors.length]
          gradientParts.push(`${color} ${start}deg ${end}deg`)
        })
        return {
          background: `conic-gradient(${gradientParts.join(', ')})`
        }
      })
      const handleStart = (e) => {
        if (isRotating.value || props.loading) return
        emit('click', e)
        emit('start')
      }
      const startWheel = (id) => {
        const index = props.prizes.findIndex((p) => p.id === id)
        if (index === -1) return
        isRotating.value = true
        const prizeCount = props.prizes.length
        const degreesPerPrize = 360 / prizeCount
        const destAngle = -(index * degreesPerPrize + degreesPerPrize / 2)
        const baseRotation = (props.rounds || 8) * 360
        const currentRotation = wheelRotate.value
        let extra = (destAngle - (currentRotation % 360)) % 360
        if (extra > 0) extra -= 360
        wheelRotate.value = currentRotation + baseRotation + extra
        setTimeout(() => {
          isRotating.value = false
          emit('finish', props.prizes[index])
        }, props.duration || 4e3)
      }
      const startGrid = (id) => {
        const index = props.prizes.findIndex((p) => p.id === id)
        if (index === -1) return
        isRotating.value = true
        const prizeCount = Math.min(props.prizes.length, 8)
        const totalSteps = prizeCount * (props.rounds || 8) + index
        const startTime = Date.now()
        const tick = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / props.duration, 1)
          const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          const currentStep = Math.round(totalSteps * easedProgress)
          gridActiveIndex.value = currentStep % prizeCount
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(tick)
          } else {
            gridActiveIndex.value = index
            isRotating.value = false
            emit('finish', props.prizes[index])
          }
        }
        animationFrameId = requestAnimationFrame(tick)
      }
      watch(
        () => props.targetId,
        (newId) => {
          if (newId !== '' && newId !== void 0 && newId !== null) {
            if (props.type === 'wheel') startWheel(newId)
            else startGrid(newId)
          }
        }
      )
      onUnmounted(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      })
      const gridAreas = ['1/1', '1/2', '1/3', '2/3', '3/3', '3/2', '3/1', '2/1']
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        isRotating,
        wheelRotate,
        gridActiveIndex,
        get animationFrameId() {
          return animationFrameId
        },
        set animationFrameId(v) {
          animationFrameId = v
        },
        finalActionText,
        containerStyle,
        isPureText,
        defaultColors,
        wheelInnerStyle,
        handleStart,
        startWheel,
        startGrid,
        gridAreas,
        ref,
        computed,
        watch,
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
        get luckyDrawProps() {
          return luckyDrawProps
        },
        get luckyDrawEmits() {
          return luckyDrawEmits
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
