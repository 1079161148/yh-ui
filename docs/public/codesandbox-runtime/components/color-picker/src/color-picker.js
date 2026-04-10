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
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  createBlock as _createBlock,
  renderList as _renderList,
  Fragment as _Fragment,
  withModifiers as _withModifiers,
  Transition as _Transition,
  withCtx as _withCtx,
  Teleport as _Teleport
} from 'vue'
const _hoisted_1 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em',
  class: 'yh-color-picker__empty'
}
const _hoisted_2 = ['title']
const _hoisted_3 = ['onClick']
const _hoisted_4 = ['title']
const _hoisted_5 = ['value']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'triggerRef',
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m(_ctx.size),
          $setup.ns.is('disabled', _ctx.disabled)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        onClick: $setup.togglePopper
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('trigger'))
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('color')),
                style: _normalizeStyle({
                  backgroundColor: _ctx.modelValue || 'transparent'
                })
              },
              [
                !_ctx.modelValue
                  ? (_openBlock(),
                    _createElementBlock('svg', _hoisted_1, [
                      ...(_cache[4] ||
                        (_cache[4] = [
                          _createElementVNode(
                            'path',
                            {
                              fill: 'currentColor',
                              d: 'M764.288 214.592L512 466.88L259.712 214.592l-45.12 45.12L466.88 512l-252.288 252.288l45.12 45.12L512 557.12l252.288 252.288l45.12-45.12L557.12 512l252.288-252.288z'
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ]))
                    ]))
                  : _createCommentVNode('v-if', true)
              ],
              6
              /* CLASS, STYLE */
            ),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('icon'))
              },
              [
                ...(_cache[5] ||
                  (_cache[5] = [
                    _createElementVNode(
                      'svg',
                      {
                        viewBox: '0 0 1024 1024',
                        width: '1em',
                        height: '1em'
                      },
                      [
                        _createElementVNode('path', {
                          fill: 'currentColor',
                          d: 'M831.872 340.864L512 652.672L192.128 340.864l-45.248 45.248L512 743.168l365.12-357.056z'
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ]))
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        (_openBlock(),
        _createBlock(_Teleport, { to: 'body' }, [
          _createVNode(
            _Transition,
            { name: 'yh-fade' },
            {
              default: _withCtx(() => [
                $setup.visible
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        ref: 'popperRef',
                        class: _normalizeClass([$setup.ns.e('panel'), _ctx.popperClass]),
                        style: _normalizeStyle($setup.popperStyle),
                        onClick: _cache[3] || (_cache[3] = _withModifiers(() => {}, ['stop']))
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('main'))
                          },
                          [
                            _createVNode(
                              $setup['SVPanel'],
                              {
                                h: $setup.color.h,
                                s: $setup.color.s,
                                v: $setup.color.v,
                                onUpdate:
                                  _cache[0] ||
                                  (_cache[0] = (s, v) => {
                                    $setup.color.s = s
                                    $setup.color.v = v
                                    $setup.updateColor()
                                  })
                              },
                              null,
                              8,
                              ['h', 's', 'v']
                            ),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('contrast-advisor')),
                                title: $setup.t('colorpicker.suggestionDark')
                              },
                              [
                                _createElementVNode(
                                  'span',
                                  {
                                    class: _normalizeClass($setup.ns.e('contrast-dot')),
                                    style: _normalizeStyle({
                                      backgroundColor: $setup.contrastInfo.isDark ? '#fff' : '#000'
                                    })
                                  },
                                  null,
                                  6
                                  /* CLASS, STYLE */
                                ),
                                _createTextVNode(
                                  ' ' + _toDisplayString($setup.contrastInfo.suggestion),
                                  1
                                  /* TEXT */
                                )
                              ],
                              10,
                              _hoisted_2
                            ),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('sliders'))
                              },
                              [
                                _createVNode(
                                  $setup['HueSlider'],
                                  {
                                    h: $setup.color.h,
                                    onUpdate:
                                      _cache[1] ||
                                      (_cache[1] = (h) => {
                                        $setup.color.h = h
                                        $setup.updateColor()
                                      })
                                  },
                                  null,
                                  8,
                                  ['h']
                                ),
                                _ctx.showAlpha
                                  ? (_openBlock(),
                                    _createBlock(
                                      $setup['AlphaSlider'],
                                      {
                                        key: 0,
                                        a: $setup.color.a,
                                        color: $setup.baseColor,
                                        onUpdate:
                                          _cache[2] ||
                                          (_cache[2] = (a) => {
                                            $setup.color.a = a
                                            $setup.updateColor()
                                          })
                                      },
                                      null,
                                      8,
                                      ['a', 'color']
                                    ))
                                  : _createCommentVNode('v-if', true)
                              ],
                              2
                              /* CLASS */
                            )
                          ],
                          2
                          /* CLASS */
                        ),
                        _ctx.predefine.length > 0
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('predefine'))
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList(_ctx.predefine, (c) => {
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: c,
                                          class: _normalizeClass($setup.ns.e('predefine-item')),
                                          style: _normalizeStyle({
                                            backgroundColor: c
                                          }),
                                          onClick: ($event) => $setup.handlePredefineClick(c)
                                        },
                                        null,
                                        14,
                                        _hoisted_3
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
                          : _createCommentVNode('v-if', true),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('footer'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('tools'))
                              },
                              [
                                $setup.isEyeDropperSupported
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'div',
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e('eye-dropper')),
                                        onClick: $setup.handleEyeDropper,
                                        title: $setup.t('colorpicker.eyeDropper')
                                      },
                                      [
                                        ...(_cache[6] ||
                                          (_cache[6] = [
                                            _createElementVNode(
                                              'svg',
                                              {
                                                viewBox: '0 0 1024 1024',
                                                width: '1.2em',
                                                height: '1.2em'
                                              },
                                              [
                                                _createElementVNode('path', {
                                                  fill: 'currentColor',
                                                  d: 'M148.65 892.42c-29.6 0-53.59-24-53.59-53.59 0-14.28 5.68-27.97 15.76-38.05L511.45 400.1c11.02-11.02 26.23-16.71 42.84-16.03l68.74 3c14.77.65 26.79 12.67 27.44 27.44l3 68.74c.68 16.61-5.01 31.81-16.03 42.84L236.78 926.75a53.48 53.48 0 0 1-38.05 15.76c-16.63-.04-33.31-7.04-50.08-50.09zm522.61-460.67l-26.68 26.68c34.78 35.8 70.9 71.55 107.5 107.22l26.68-26.68c-36.63-35.61-72.76-71.38-107.5-107.22zm256.4-180.25l-20.91-20.91c-43.11-43.11-113-43.11-156.11 0L575.48 405.74c-4.47 4.47-7.16 10.4-7.58 16.68l-4.52 103.88c-.37 8.52 3.01 16.59 9.53 22.73s15.17 9.17 23.63 8.35L711.66 550c6.26-.49 12.1-3.26 16.5-7.78l175.16-180.36c43.11-43.11 43.11-113 0-156.11z'
                                                })
                                              ],
                                              -1
                                              /* CACHED */
                                            )
                                          ]))
                                      ],
                                      10,
                                      _hoisted_4
                                    ))
                                  : _createCommentVNode('v-if', true),
                                _createElementVNode(
                                  'input',
                                  {
                                    class: _normalizeClass($setup.ns.e('value')),
                                    value: $setup.inputValue,
                                    onChange: $setup.handleInputChange,
                                    spellcheck: 'false'
                                  },
                                  null,
                                  42,
                                  _hoisted_5
                                )
                              ],
                              2
                              /* CLASS */
                            ),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('btns'))
                              },
                              [
                                _createElementVNode(
                                  'button',
                                  {
                                    class: _normalizeClass($setup.ns.e('btn-clear')),
                                    onClick: $setup.handleClear
                                  },
                                  _toDisplayString($setup.t('colorpicker.clear')),
                                  3
                                  /* TEXT, CLASS */
                                ),
                                _createElementVNode(
                                  'button',
                                  {
                                    class: _normalizeClass($setup.ns.e('btn-confirm')),
                                    onClick: $setup.handleConfirm
                                  },
                                  _toDisplayString($setup.t('colorpicker.confirm')),
                                  3
                                  /* TEXT, CLASS */
                                )
                              ],
                              2
                              /* CLASS */
                            )
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
              _: 1
              /* STABLE */
            }
          )
        ]))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { colorPickerProps, colorPickerEmits } from './color-picker'
import SVPanel from './sv-panel.js'
import HueSlider from './hue-slider.js'
import AlphaSlider from './alpha-slider.js'
import { parseColor, formatColor, hsvToRgb, getLuminance } from './utils'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhColorPicker'
  },
  {
    __name: 'color-picker',
    props: colorPickerProps,
    emits: colorPickerEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('color-picker')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'color-picker',
        computed(() => props.themeOverrides)
      )
      const visible = ref(false)
      const color = ref(parseColor(props.modelValue))
      const inputValue = ref(props.modelValue || '')
      const triggerRef = ref()
      const popperRef = ref()
      const rgb = computed(() => hsvToRgb(color.value.h, color.value.s, color.value.v))
      const baseColor = computed(() => `hsl(${color.value.h}, 100%, 50%)`)
      const currentColor = computed(() => formatColor(color.value, props.showAlpha ? 'rgb' : 'hex'))
      const contrastInfo = computed(() => {
        const l = getLuminance(rgb.value.r, rgb.value.g, rgb.value.b)
        return {
          isDark: l < 0.5,
          suggestion: l < 0.5 ? t('colorpicker.suggestionDark') : t('colorpicker.suggestionLight')
        }
      })
      watch(
        () => props.modelValue,
        (val) => {
          const parsed = parseColor(val)
          if (JSON.stringify(parsed) !== JSON.stringify(color.value)) {
            color.value = parsed
          }
          inputValue.value = val || ''
        }
      )
      watch(currentColor, (val) => {
        inputValue.value = val
      })
      const updateColor = () => {
        const val = currentColor.value
        emit('update:modelValue', val)
        emit('activeChange', val)
      }
      const handleInputChange = (event) => {
        const target = event.target
        const text = target.value
        const parsed = parseColor(text)
        color.value = parsed
        updateColor()
      }
      const handleConfirm = () => {
        emit('change', currentColor.value)
        visible.value = false
      }
      const handleClear = () => {
        inputValue.value = ''
        color.value = { h: 0, s: 0, v: 100, a: 1 }
        emit('update:modelValue', '')
        emit('change', '')
        visible.value = false
      }
      const isEyeDropperSupported = ref(false)
      onMounted(() => {
        isEyeDropperSupported.value = typeof window.EyeDropper !== 'undefined'
      })
      const handleEyeDropper = async () => {
        if (!isEyeDropperSupported.value) return
        const eyeDropper = new window.EyeDropper()
        try {
          const result = await eyeDropper.open()
          color.value = parseColor(result.sRGBHex)
          updateColor()
        } catch (e) {}
      }
      const togglePopper = () => {
        if (props.disabled) return
        visible.value = !visible.value
      }
      const handleClickOutside = (e) => {
        if (
          visible.value &&
          triggerRef.value &&
          !triggerRef.value.contains(e.target) &&
          popperRef.value &&
          !popperRef.value.contains(e.target)
        ) {
          visible.value = false
        }
      }
      const handlePredefineClick = (c) => {
        color.value = parseColor(c)
        updateColor()
      }
      onMounted(() => {
        document.addEventListener('click', handleClickOutside)
      })
      onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside)
      })
      const popperStyle = ref({})
      watch(visible, (val) => {
        if (val && triggerRef.value) {
          const rect = triggerRef.value.getBoundingClientRect()
          const styles = window.getComputedStyle(triggerRef.value)
          const primary = styles.getPropertyValue('--yh-color-primary').trim()
          const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
          popperStyle.value = __spreadProps(__spreadValues({}, themeStyle.value), {
            top: `${rect.bottom + window.scrollY + 8}px`,
            left: `${rect.left + window.scrollX}px`,
            position: 'absolute',
            zIndex: 3e3,
            '--yh-color-primary': primary,
            '--yh-color-primary-rgb': primaryRgb
          })
        }
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        visible,
        color,
        inputValue,
        triggerRef,
        popperRef,
        rgb,
        baseColor,
        currentColor,
        contrastInfo,
        updateColor,
        handleInputChange,
        handleConfirm,
        handleClear,
        isEyeDropperSupported,
        handleEyeDropper,
        togglePopper,
        handleClickOutside,
        handlePredefineClick,
        popperStyle,
        ref,
        computed,
        watch,
        onMounted,
        onBeforeUnmount,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get colorPickerProps() {
          return colorPickerProps
        },
        get colorPickerEmits() {
          return colorPickerEmits
        },
        SVPanel,
        HueSlider,
        AlphaSlider,
        get parseColor() {
          return parseColor
        },
        get formatColor() {
          return formatColor
        },
        get hsvToRgb() {
          return hsvToRgb
        },
        get getLuminance() {
          return getLuminance
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
