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
  createCommentVNode as _createCommentVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = ['id', 'data-placement']
const _hoisted_2 = ['innerHTML']
const _hoisted_3 = { key: 1 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        ref: 'triggerRef',
        onMouseenter: _cache[2] || (_cache[2] = ($event) => $setup.handleTrigger($event, 'hover')),
        onMouseleave:
          _cache[3] ||
          (_cache[3] = ($event) => $setup.triggers.has('hover') && $setup.toggleVisible(false)),
        onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleTrigger($event, 'click')),
        onContextmenu:
          _cache[5] || (_cache[5] = ($event) => $setup.handleTrigger($event, 'contextmenu')),
        onFocusin: _cache[6] || (_cache[6] = ($event) => $setup.handleTrigger($event, 'focus')),
        onFocusout:
          _cache[7] ||
          (_cache[7] = ($event) => $setup.triggers.has('focus') && $setup.toggleVisible(false))
      },
      [
        _renderSlot(_ctx.$slots, 'default'),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: 'body',
            disabled: !_ctx.teleported
          },
          [
            _createVNode(
              _Transition,
              { name: _ctx.transition },
              {
                default: _withCtx(() => [
                  $setup.shouldRender
                    ? _withDirectives(
                        (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            id: $setup.tooltipId,
                            ref: 'popperRef',
                            class: _normalizeClass($setup.popperClasses),
                            style: _normalizeStyle($setup.computedPopperStyle),
                            'data-placement': $setup.actualPlacement,
                            onMouseenter:
                              _cache[0] ||
                              (_cache[0] = ($event) =>
                                _ctx.interactive && $setup.toggleVisible(true)),
                            onMouseleave:
                              _cache[1] ||
                              (_cache[1] = ($event) =>
                                _ctx.interactive &&
                                $setup.triggers.has('hover') &&
                                $setup.toggleVisible(false))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass([
                                  $setup.ns.e('content'),
                                  $setup.props.contentClass
                                ]),
                                style: _normalizeStyle($setup.computedContentStyle)
                              },
                              [
                                _renderSlot(_ctx.$slots, 'content', {}, () => [
                                  _createCommentVNode(' eslint-disable-next-line vue/no-v-html '),
                                  _ctx.rawContent
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 0,
                                          innerHTML: _ctx.content
                                        },
                                        null,
                                        8,
                                        _hoisted_2
                                      ))
                                    : (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        _hoisted_3,
                                        _toDisplayString(_ctx.content),
                                        1
                                        /* TEXT */
                                      ))
                                ])
                              ],
                              6
                              /* CLASS, STYLE */
                            ),
                            _createCommentVNode(
                              ' \u5C0F\u4E09\u89D2 - \u4F7F\u7528 Floating UI \u5B98\u65B9\u63A8\u8350\u7684 SVG \u8DEF\u5F84\u65B9\u6848 '
                            ),
                            _ctx.showArrow
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    ref: 'arrowRef',
                                    class: _normalizeClass($setup.ns.e('arrow-wrapper')),
                                    style: _normalizeStyle($setup.arrowStyle)
                                  },
                                  [
                                    (_openBlock(),
                                    _createElementBlock(
                                      'svg',
                                      {
                                        class: _normalizeClass($setup.ns.e('arrow')),
                                        width: '12',
                                        height: '12',
                                        viewBox: '0 0 12 12',
                                        xmlns: 'http://www.w3.org/2000/svg'
                                      },
                                      [
                                        ...(_cache[8] ||
                                          (_cache[8] = [
                                            _createElementVNode(
                                              'path',
                                              { d: 'M0,0 L6,6 L12,0' },
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
                                  6
                                  /* CLASS, STYLE */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          46,
                          _hoisted_1
                        )),
                        [[_vShow, $setup.showPopper]]
                      )
                    : _createCommentVNode('v-if', true)
                ]),
                _: 3
                /* FORWARDED */
              },
              8,
              ['name']
            )
          ],
          8,
          ['disabled']
        ))
      ],
      34
      /* CLASS, NEED_HYDRATION */
    )
  )
}
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom'
import { useId, useEventListener } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { tooltipProps, tooltipEmits } from './tooltip-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTooltip'
  },
  {
    __name: 'tooltip',
    props: tooltipProps,
    emits: tooltipEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('tooltip')
      const tooltipId = useId()
      const { themeStyle } = useComponentTheme(
        'tooltip',
        computed(() => props.themeOverrides)
      )
      const triggerRef = ref(null)
      const popperRef = ref(null)
      const arrowRef = ref(null)
      const visible = ref(false)
      const popperStyle = ref({})
      const arrowStyle = ref({})
      const computedPopperStyle = computed(() => {
        const styles = __spreadValues(__spreadValues({}, themeStyle.value), popperStyle.value)
        if (typeof props.popperStyle === 'object') {
          Object.assign(styles, props.popperStyle)
        }
        return styles
      })
      const computedContentStyle = computed(() => {
        const styles = {
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
          overflowY: props.scrollable ? 'auto' : 'visible'
        }
        if (typeof props.contentStyle === 'object') {
          Object.assign(styles, props.contentStyle)
        }
        return styles
      })
      const actualPlacement = ref(props.placement)
      let cleanup = null
      let showTimer = null
      let hideTimer = null
      const showPopper = computed(() => {
        if (props.disabled) return false
        return props.visible !== null ? props.visible : visible.value
      })
      const shouldRender = computed(() => props.persistent || showPopper.value)
      const popperClasses = computed(() => [
        ns.e('popper'),
        ns.is(props.effect, true),
        // 使用 is-dark / is-light 更加稳定
        ns.em('popper', props.effect),
        ns.is('interactive', props.interactive),
        props.popperClass
      ])
      const updatePosition = async () => {
        if (!triggerRef.value || !popperRef.value || typeof window === 'undefined') return
        const { x, y, placement, middlewareData } = await computePosition(
          triggerRef.value,
          popperRef.value,
          {
            placement: props.placement,
            middleware: [
              offset(props.offset[1]),
              flip(),
              shift({ padding: 5 }),
              props.showArrow ? arrow({ element: arrowRef.value }) : null
            ].filter((item) => item !== null)
          }
        )
        popperStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: String(props.zIndex)
        }
        actualPlacement.value = placement
        if (middlewareData.arrow && arrowRef.value) {
          const { x: ax, y: ay } = middlewareData.arrow
          const side = placement.split('-')[0]
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
          }[side]
          arrowStyle.value = {
            left: ax != null ? `${ax}px` : '',
            top: ay != null ? `${ay}px` : '',
            [staticSide]: '-12px'
          }
        }
      }
      const handleMouseMove = async (e) => {
        if (!props.followCursor || !visible.value || typeof window === 'undefined') return
        const virtualElement = {
          getBoundingClientRect: () => {
            const rect = {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              left: e.clientX,
              right: e.clientX,
              bottom: e.clientY,
              toJSON: () => ({})
            }
            return rect
          }
        }
        const { x, y } = await computePosition(virtualElement, popperRef.value, {
          placement: props.placement,
          middleware: [offset(10), flip(), shift()]
        })
        popperStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: String(props.zIndex)
        }
      }
      const toggleVisible = (value) => {
        if (props.disabled) return
        if (showTimer) {
          clearTimeout(showTimer)
          showTimer = null
        }
        if (hideTimer) {
          clearTimeout(hideTimer)
          hideTimer = null
        }
        if (value) {
          const delay = props.showAfter
          if (delay <= 0) {
            visible.value = true
            emit('update:visible', true)
            emit('show')
            nextTick(startAutoUpdate)
          } else {
            showTimer = setTimeout(() => {
              visible.value = true
              emit('update:visible', true)
              emit('show')
              nextTick(startAutoUpdate)
            }, delay)
          }
        } else {
          const delay = props.hideAfter
          if (delay <= 0) {
            visible.value = false
            emit('update:visible', false)
            emit('hide')
            stopAutoUpdate()
          } else {
            hideTimer = setTimeout(() => {
              visible.value = false
              emit('update:visible', false)
              emit('hide')
              stopAutoUpdate()
            }, delay)
          }
        }
      }
      const startAutoUpdate = async () => {
        if (cleanup) cleanup()
        if (
          triggerRef.value &&
          popperRef.value &&
          !props.followCursor &&
          typeof window !== 'undefined'
        ) {
          cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition)
        }
      }
      const stopAutoUpdate = () => {
        if (cleanup) {
          cleanup()
          cleanup = null
        }
      }
      const triggers = computed(() => {
        const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger]
        return new Set(t)
      })
      const handleTrigger = (e, type) => {
        if (!triggers.value.has(type)) return
        if (type === 'hover') {
          toggleVisible(true)
        } else if (type === 'click') {
          const isShowing = (visible.value && !hideTimer) || showTimer
          toggleVisible(!isShowing)
        } else if (type === 'contextmenu') {
          e.preventDefault()
          toggleVisible(true)
        } else if (type === 'focus') {
          toggleVisible(true)
        }
      }
      useEventListener(
        () => window,
        'click',
        (e) => {
          var _a, _b
          const me = e
          if (!visible.value) return
          const needsClose = triggers.value.has('click') || triggers.value.has('contextmenu')
          if (!needsClose) return
          const target = me.target
          if (
            !((_a = triggerRef.value) == null ? void 0 : _a.contains(target)) &&
            !((_b = popperRef.value) == null ? void 0 : _b.contains(target))
          ) {
            toggleVisible(false)
          }
        }
      )
      watch(
        () => props.visible,
        (val) => {
          if (val !== null && val !== visible.value) {
            visible.value = val
            if (val) nextTick(startAutoUpdate)
            else stopAutoUpdate()
          }
        },
        { immediate: true }
      )
      watch(
        () => props.followCursor,
        (val) => {
          if (typeof window === 'undefined') return
          if (val) {
            window.addEventListener('mousemove', handleMouseMove)
          } else {
            window.removeEventListener('mousemove', handleMouseMove)
          }
        }
      )
      onMounted(() => {
        if (props.followCursor && typeof window !== 'undefined') {
          window.addEventListener('mousemove', handleMouseMove)
        }
      })
      onUnmounted(() => {
        stopAutoUpdate()
        if (typeof window !== 'undefined') {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      })
      __expose({
        updatePosition,
        visible,
        triggerRef,
        popperRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        tooltipId,
        themeStyle,
        triggerRef,
        popperRef,
        arrowRef,
        visible,
        popperStyle,
        arrowStyle,
        computedPopperStyle,
        computedContentStyle,
        actualPlacement,
        get cleanup() {
          return cleanup
        },
        set cleanup(v) {
          cleanup = v
        },
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
        showPopper,
        shouldRender,
        popperClasses,
        updatePosition,
        handleMouseMove,
        toggleVisible,
        startAutoUpdate,
        stopAutoUpdate,
        triggers,
        handleTrigger,
        ref,
        computed,
        watch,
        onMounted,
        onUnmounted,
        nextTick,
        get computePosition() {
          return computePosition
        },
        get offset() {
          return offset
        },
        get flip() {
          return flip
        },
        get shift() {
          return shift
        },
        get arrow() {
          return arrow
        },
        get autoUpdate() {
          return autoUpdate
        },
        get useNamespace() {
          return useNamespace
        },
        get useId() {
          return useId
        },
        get useEventListener() {
          return useEventListener
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tooltipProps() {
          return tooltipProps
        },
        get tooltipEmits() {
          return tooltipEmits
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
