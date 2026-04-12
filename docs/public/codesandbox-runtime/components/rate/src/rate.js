import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  createCommentVNode as _createCommentVNode,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  toDisplayString as _toDisplayString
} from 'vue'
const _hoisted_1 = ['onMousemove', 'onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m($setup.actualSize),
          $setup.ns.is('disabled', _ctx.disabled)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        onMouseleave: $setup.handleMouseLeave
      },
      [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.max, (item) => {
            return (
              _openBlock(),
              _createElementBlock(
                'div',
                {
                  key: item,
                  class: _normalizeClass([
                    $setup.ns.e('item'),
                    $setup.ns.is('hover', $setup.hoverIndex === item)
                  ]),
                  style: _normalizeStyle({
                    width: $setup.iconSize + 'px',
                    height: $setup.iconSize + 'px'
                  }),
                  onMousemove: ($event) => $setup.handleMouseMove(item, $event),
                  onClick: ($event) => $setup.handleItemClick(item)
                },
                [
                  _renderSlot(
                    _ctx.$slots,
                    'icon',
                    {
                      index: item,
                      width: $setup.getStarWidth(item),
                      activeColor: $setup.activeColor,
                      voidColor: $setup.voidColorValue
                    },
                    () => [
                      _createCommentVNode(' \u57FA\u7840\u5C42\uFF1A\u5E95\u8272\u661F\u661F '),
                      (_openBlock(),
                      _createElementBlock(
                        'svg',
                        {
                          class: _normalizeClass([$setup.ns.e('star-icon'), $setup.ns.is('void')]),
                          style: _normalizeStyle({
                            color: $setup.voidColorValue
                          }),
                          viewBox: '0 0 1024 1024'
                        },
                        [
                          _createElementVNode('path', {
                            d: $setup.starPath,
                            fill: 'currentColor'
                          })
                        ],
                        6
                        /* CLASS, STYLE */
                      )),
                      _createCommentVNode(
                        ' \u586B\u5145\u5C42\uFF1A\u91D1\u8272\u661F\u661F\uFF08\u5E26\u88C1\u526A\uFF09 '
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('star-content')),
                          style: _normalizeStyle({
                            width: $setup.getStarWidth(item),
                            color: $setup.activeColor
                          })
                        },
                        [
                          (_openBlock(),
                          _createElementBlock(
                            'svg',
                            {
                              class: _normalizeClass($setup.ns.e('star-icon')),
                              style: _normalizeStyle({
                                width: $setup.iconSize + 'px'
                              }),
                              viewBox: '0 0 1024 1024'
                            },
                            [
                              _createElementVNode('path', {
                                d: $setup.starPath,
                                fill: 'currentColor'
                              })
                            ],
                            6
                            /* CLASS, STYLE */
                          ))
                        ],
                        6
                        /* CLASS, STYLE */
                      )
                    ]
                  )
                ],
                46,
                _hoisted_1
              )
            )
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        _ctx.showScore || _ctx.showText
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('text')),
                style: _normalizeStyle({
                  color: _ctx.textColor
                })
              },
              _toDisplayString($setup.rateText),
              7
              /* TEXT, CLASS, STYLE */
            ))
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { computed, ref, watch } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { rateProps, rateEmits } from './rate-meta.js'
const starPath =
  'M512 747.52l-228.16 119.84 43.52-254.08L142.08 434.24l255.04-37.12L512 166.08l114.88 231.04 255.04 37.12-184.64 179.2 43.52 254.08z'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhRate'
  },
  {
    __name: 'rate',
    props: rateProps,
    emits: rateEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('rate')
      const { tRaw } = useLocale()
      const { themeStyle } = useComponentTheme(
        'rate',
        computed(() => props.themeOverrides)
      )
      const { globalSize } = useConfig()
      const currentValue = ref(props.modelValue)
      const hoverIndex = ref(-1)
      const isPointerAtLeftHalf = ref(props.modelValue !== Math.floor(props.modelValue))
      watch(
        () => props.modelValue,
        (val) => {
          currentValue.value = val
          isPointerAtLeftHalf.value = val !== Math.floor(val)
        },
        { immediate: true }
      )
      const activeColor = computed(() => {
        if (typeof props.colors === 'string') return props.colors
        if (Array.isArray(props.colors)) {
          const v = currentValue.value
          if (v <= 2) return props.colors[0] || '#F7BA2A'
          if (v <= 4) return props.colors[1] || '#F7BA2A'
          return props.colors[2] || '#F7BA2A'
        }
        return '#F7BA2A'
      })
      const voidColorValue = computed(() =>
        props.disabled ? props.disabledVoidColor : props.voidColor
      )
      const getStarWidth = (item) => {
        if (item <= Math.floor(currentValue.value)) return '100%'
        if (item === Math.ceil(currentValue.value) && currentValue.value % 1 !== 0) {
          return (currentValue.value % 1) * 100 + '%'
        }
        return '0%'
      }
      const handleMouseMove = (item, e) => {
        if (props.disabled) return
        hoverIndex.value = item
        if (props.allowHalf) {
          const target = e.currentTarget
          const rect = target.getBoundingClientRect()
          isPointerAtLeftHalf.value = (e.clientX - rect.left) * 2 <= rect.width
          currentValue.value = isPointerAtLeftHalf.value ? item - 0.5 : item
        } else {
          currentValue.value = item
        }
      }
      const handleMouseLeave = () => {
        if (props.disabled) return
        currentValue.value = props.modelValue
        hoverIndex.value = -1
        isPointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue)
      }
      const handleItemClick = (item) => {
        if (props.disabled) return
        let val = props.allowHalf && isPointerAtLeftHalf.value ? item - 0.5 : item
        if (props.clearable && val === props.modelValue) val = 0
        emit('update:modelValue', val)
        emit('change', val)
      }
      const rateText = computed(() => {
        if (props.showScore)
          return props.scoreTemplate.replace('{value}', String(currentValue.value))
        if (props.showText) {
          const texts = props.texts.length > 0 ? props.texts : tRaw('rate.texts')
          return texts[Math.ceil(currentValue.value) - 1] || ''
        }
        return ''
      })
      const actualSize = computed(() => props.size || globalSize.value || 'default')
      const iconSize = computed(
        () => ({ large: 24, default: 20, small: 16 })[actualSize.value] || 20
      )
      const __returned__ = {
        props,
        emit,
        ns,
        tRaw,
        themeStyle,
        globalSize,
        currentValue,
        hoverIndex,
        isPointerAtLeftHalf,
        activeColor,
        voidColorValue,
        getStarWidth,
        handleMouseMove,
        handleMouseLeave,
        handleItemClick,
        rateText,
        actualSize,
        iconSize,
        starPath,
        computed,
        ref,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get rateProps() {
          return rateProps
        },
        get rateEmits() {
          return rateEmits
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
