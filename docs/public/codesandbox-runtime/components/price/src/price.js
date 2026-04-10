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
  createElementVNode as _createElementVNode,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m($setup.props.size),
          $setup.ns.is('line-through', $setup.props.lineThrough),
          $setup.ns.is('bold', $setup.props.bold),
          $setup.ns.is('split', $setup.props.split),
          $setup.ns.is('gradient', !!$setup.props.gradient)
        ]),
        style: _normalizeStyle($setup.containerStyle)
      },
      [
        _createCommentVNode(' \u6807\u7B7E\u533A\u57DF '),
        $setup.props.tag || _ctx.$slots.tag
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass([
                  $setup.ns.e('tag'),
                  $setup.ns.em('tag', $setup.props.tagType)
                ])
              },
              [
                _renderSlot(_ctx.$slots, 'tag', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.tag),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u524D\u7F00/\u7EA6\u7B49\u4E8E '),
        $setup.props.approx
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('approx'))
              },
              '~',
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        $setup.props.prefix
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 2,
                class: _normalizeClass($setup.ns.e('prefix'))
              },
              [
                _renderSlot(_ctx.$slots, 'prefix', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.prefix),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u7B26\u53F7\u5BB9\u5668 '),
        $setup.props.symbolPosition === 'before'
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 3,
                class: _normalizeClass($setup.ns.e('symbol'))
              },
              [
                _renderSlot(_ctx.$slots, 'symbol', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.symbol),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u4EF7\u683C\u6570\u503C\u4E3B\u4F53 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('main'))
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('integer'))
              },
              _toDisplayString($setup.mainParts.integer),
              3
              /* TEXT, CLASS */
            ),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('decimal'))
              },
              _toDisplayString($setup.mainParts.decimal),
              3
              /* TEXT, CLASS */
            ),
            _createCommentVNode(' \u533A\u95F4\u6A21\u5F0F '),
            $setup.maxParts
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('separator'))
                      },
                      '-',
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('integer'))
                      },
                      _toDisplayString($setup.maxParts.integer),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('decimal'))
                      },
                      _toDisplayString($setup.maxParts.decimal),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        $setup.props.symbolPosition === 'after'
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 4,
                class: _normalizeClass($setup.ns.e('symbol'))
              },
              [
                _renderSlot(_ctx.$slots, 'symbol', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.symbol),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u5355\u4F4D/\u540E\u7F00 '),
        $setup.props.unit || _ctx.$slots.unit
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 5,
                class: _normalizeClass($setup.ns.e('unit'))
              },
              [
                _renderSlot(_ctx.$slots, 'unit', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.unit),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        $setup.props.suffix
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 6,
                class: _normalizeClass($setup.ns.e('suffix'))
              },
              [
                _renderSlot(_ctx.$slots, 'suffix', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.suffix),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u539F\u4EF7/\u5212\u7EBF\u4EF7\u5BF9\u6BD4 '),
        _ctx.deleteValue !== void 0 && $setup.deleteParts
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 7,
                class: _normalizeClass($setup.ns.e('delete'))
              },
              [
                _ctx.deleteLabel
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('delete-label'))
                      },
                      _toDisplayString(_ctx.deleteLabel),
                      3
                      /* TEXT, CLASS */
                    ))
                  : _createCommentVNode('v-if', true),
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass($setup.ns.e('delete-symbol'))
                  },
                  _toDisplayString(_ctx.symbol),
                  3
                  /* TEXT, CLASS */
                ),
                _createElementVNode(
                  'span',
                  null,
                  _toDisplayString($setup.deleteParts.integer) +
                    _toDisplayString($setup.deleteParts.decimal),
                  1
                  /* TEXT */
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
import { ref, computed, onMounted, watch } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { priceProps } from './price'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhPrice' },
  {
    __name: 'price',
    props: priceProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('price')
      const displayValue = ref(props.animated ? 0 : Number(props.value))
      const displayMax = ref(props.animated ? 0 : Number(props.maxValue))
      let rafId = null
      const startAnimation = (fromValue, toValue, setter) => {
        const duration = 1e3
        const startTime = performance.now()
        const from = fromValue
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          setter(from + (toValue - from) * easeProgress)
          if (progress < 1) {
            rafId = requestAnimationFrame(animate)
          } else {
            setter(toValue)
          }
        }
        rafId = requestAnimationFrame(animate)
      }
      const triggerAllAnimations = () => {
        if (rafId) cancelAnimationFrame(rafId)
        startAnimation(displayValue.value, Number(props.value), (v) => (displayValue.value = v))
        if (props.maxValue !== void 0) {
          startAnimation(displayMax.value, Number(props.maxValue), (v) => (displayMax.value = v))
        }
      }
      onMounted(() => {
        if (props.animated) {
          triggerAllAnimations()
        }
      })
      watch(
        () => [props.value, props.maxValue],
        () => {
          if (props.animated) {
            triggerAllAnimations()
          } else {
            displayValue.value = Number(props.value)
            displayMax.value = Number(props.maxValue)
          }
        },
        { deep: true }
      )
      const format = (val) => {
        const num = isNaN(val) ? 0 : val
        const fixed = num.toFixed(props.precision)
        if (props.thousandth) {
          const parts = fixed.split('.')
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return parts.join('.')
        }
        return fixed
      }
      const getParts = (formatted) => {
        const parts = formatted.split('.')
        return {
          integer: parts[0],
          decimal: parts[1] ? `.${parts[1]}` : ''
        }
      }
      const mainParts = computed(() => getParts(format(displayValue.value)))
      const maxParts = computed(() =>
        props.maxValue !== void 0 ? getParts(format(displayMax.value)) : null
      )
      const deleteParts = computed(() =>
        props.deleteValue !== void 0 ? getParts(format(Number(props.deleteValue))) : null
      )
      const containerStyle = computed(() => {
        const styles = {
          '--yh-price-integer-size': typeof props.size === 'number' ? `${props.size}px` : void 0,
          '--yh-price-decimal-scale': props.decimalScale.toString()
        }
        if (props.gradient) {
          const colors = Array.isArray(props.gradient) ? props.gradient : ['#ff4d4f', '#ff7875']
          styles['background-image'] = `linear-gradient(to right, ${colors.join(', ')})`
          styles['-webkit-background-clip'] = 'text'
          styles['background-clip'] = 'text'
          styles['color'] = 'transparent'
        }
        return __spreadValues(__spreadValues({}, styles), props.themeOverrides)
      })
      const __returned__ = {
        props,
        ns,
        displayValue,
        displayMax,
        get rafId() {
          return rafId
        },
        set rafId(v) {
          rafId = v
        },
        startAnimation,
        triggerAllAnimations,
        format,
        getParts,
        mainParts,
        maxParts,
        deleteParts,
        containerStyle,
        ref,
        computed,
        onMounted,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get priceProps() {
          return priceProps
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
