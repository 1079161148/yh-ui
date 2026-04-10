import {
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeClass as _normalizeClass,
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  withModifiers as _withModifiers,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['value', 'name', 'id', 'placeholder', 'disabled', 'readonly']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.inputNumberClasses),
        style: _normalizeStyle($setup.themeStyle),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => ($setup.hovering = true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => ($setup.hovering = false))
      },
      [
        $props.controls && $props.controlsPosition !== 'right'
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 0,
                class: _normalizeClass([
                  $setup.ns.e('decrease'),
                  $setup.ns.is('disabled', $setup.minDisabled || $setup.mergedDisabled)
                ]),
                onClick: $setup.decrease
              },
              [
                _renderSlot(_ctx.$slots, 'decreaseIcon', {}, () => [
                  _cache[2] ||
                    (_cache[2] = _createElementVNode(
                      'svg',
                      {
                        viewBox: '0 0 1024 1024',
                        width: '1em',
                        height: '1em'
                      },
                      [
                        _createElementVNode('path', {
                          fill: 'currentColor',
                          d: 'M128 544h768a32 32 0 0 0 0-64H128a32 32 0 0 0 0 64z'
                        })
                      ],
                      -1
                      /* CACHED */
                    ))
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('wrapper'))
          },
          [
            $setup.hasPrefix
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('prefix'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'prefix', {}, () => [
                      $props.prefix
                        ? (_openBlock(),
                          _createElementBlock(
                            'span',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('prefix-text'))
                            },
                            _toDisplayString($props.prefix),
                            3
                            /* TEXT, CLASS */
                          ))
                        : _createCommentVNode('v-if', true),
                      $props.prefixIcon && typeof $props.prefixIcon !== 'string'
                        ? (_openBlock(),
                          _createBlock(_resolveDynamicComponent($props.prefixIcon), { key: 1 }))
                        : _createCommentVNode('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createElementVNode(
              'input',
              {
                ref: 'inputRef',
                type: 'text',
                class: _normalizeClass($setup.ns.e('inner')),
                value: $setup.displayValue,
                name: $props.name,
                id: $props.id || $setup.inputId,
                placeholder: $props.placeholder || $setup.t('input.placeholder'),
                disabled: $setup.mergedDisabled,
                readonly: $props.readonly,
                autocomplete: 'off',
                onInput: $setup.handleInput,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              },
              null,
              42,
              _hoisted_1
            ),
            $setup.hasSuffix
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('suffix'))
                  },
                  [
                    $setup.showClear
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('clear')),
                            onClick: _withModifiers($setup.handleClear, ['stop'])
                          },
                          [
                            ...(_cache[3] ||
                              (_cache[3] = [
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
                                      d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-160-448l128 128-128 128 45.248 45.248L525.248 621.248l128 128L698.496 704l-128-128 128-128L653.248 402.752 525.248 530.752l-128-128z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                )
                              ]))
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _renderSlot(_ctx.$slots, 'suffix', {}, () => [
                      $props.suffix
                        ? (_openBlock(),
                          _createElementBlock(
                            'span',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('suffix-text'))
                            },
                            _toDisplayString($props.suffix),
                            3
                            /* TEXT, CLASS */
                          ))
                        : _createCommentVNode('v-if', true),
                      $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                        ? (_openBlock(),
                          _createBlock(_resolveDynamicComponent($props.suffixIcon), { key: 1 }))
                        : _createCommentVNode('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        $props.controls && $props.controlsPosition !== 'right'
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 1,
                class: _normalizeClass([
                  $setup.ns.e('increase'),
                  $setup.ns.is('disabled', $setup.maxDisabled || $setup.mergedDisabled)
                ]),
                onClick: $setup.increase
              },
              [
                _renderSlot(_ctx.$slots, 'increaseIcon', {}, () => [
                  _cache[4] ||
                    (_cache[4] = _createElementVNode(
                      'svg',
                      {
                        viewBox: '0 0 1024 1024',
                        width: '1em',
                        height: '1em'
                      },
                      [
                        _createElementVNode('path', {
                          fill: 'currentColor',
                          d: 'M544 128v352h352a32 32 0 0 1 0 64H544v352a32 32 0 0 1-64 0V544H128a32 32 0 0 1 0-64h352V128a32 32 0 0 1 64 0z'
                        })
                      ],
                      -1
                      /* CACHED */
                    ))
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        $props.controls && $props.controlsPosition === 'right'
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 2,
                class: _normalizeClass($setup.ns.e('controls'))
              },
              [
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('increase'),
                      $setup.ns.is('disabled', $setup.maxDisabled || $setup.mergedDisabled)
                    ]),
                    onClick: $setup.increase
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
                              d: 'M488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('decrease'),
                      $setup.ns.is('disabled', $setup.minDisabled || $setup.mergedDisabled)
                    ]),
                    onClick: $setup.decrease
                  },
                  [
                    ...(_cache[6] ||
                      (_cache[6] = [
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
                              d: 'M488.832 679.68l-339.84-356.672a32 32 0 0 1 0-44.16l.384-.384a29.44 29.44 0 0 1 42.688 0l320 335.872 319.872-335.872a29.44 29.44 0 0 1 42.688 0l.384.384a32 32 0 0 1 0 44.16L535.168 679.68a32 32 0 0 1-46.336 0z'
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
            ))
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { computed, ref, useSlots, nextTick } from 'vue'
import { useFormItem, useId, useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useConfig } from '../../../hooks/use-config/index.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhInputNumber'
  },
  {
    __name: 'input-number',
    props: {
      modelValue: { type: Number, required: false },
      min: { type: Number, required: false, default: -Infinity },
      max: { type: Number, required: false, default: Infinity },
      step: { type: Number, required: false, default: 1 },
      stepStrictly: { type: Boolean, required: false, default: false },
      precision: { type: Number, required: false },
      size: { type: null, required: false, default: void 0 },
      readonly: { type: Boolean, required: false, default: false },
      disabled: { type: Boolean, required: false, default: false },
      controlsPosition: { type: null, required: false, default: '' },
      controls: { type: Boolean, required: false, default: true },
      name: { type: String, required: false },
      placeholder: { type: String, required: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      valueOnClear: { type: [Number, null, String], required: false, default: null },
      prefix: { type: String, required: false },
      suffix: { type: String, required: false },
      prefixIcon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      clearable: { type: Boolean, required: false, default: false },
      validateEvent: { type: Boolean, required: false, default: true },
      validator: { type: Function, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change', 'input', 'focus', 'blur', 'clear'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('input-number')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'input-number',
        computed(() => props.themeOverrides)
      )
      const inputRef = ref()
      const inputId = useId()
      const focused = ref(false)
      const hovering = ref(false)
      const userInput = ref(null)
      const validationError = ref('')
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const mergedDisabled = computed(
        () => props.disabled || (form == null ? void 0 : form.disabled) || false
      )
      const mergedSize = computed(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const numPrecision = computed(() => {
        if (props.precision !== void 0) return props.precision
        const stepPrecision = getPrecision(props.step)
        if (props.modelValue !== void 0) {
          return Math.max(getPrecision(props.modelValue), stepPrecision)
        }
        return stepPrecision
      })
      const getPrecision = (value) => {
        if (value === void 0) return 0
        const valueString = value.toString()
        const dotPosition = valueString.indexOf('.')
        return dotPosition !== -1 ? valueString.length - dotPosition - 1 : 0
      }
      const toPrecision = (num, pre) => {
        const precision = pre != null ? pre : numPrecision.value
        return Number(Number(num).toFixed(precision))
      }
      const displayValue = computed(() => {
        if (userInput.value !== null) return userInput.value
        let currentValue = props.modelValue
        if (currentValue === void 0 || currentValue === null || Number.isNaN(currentValue))
          return ''
        if (props.precision !== void 0) return Number(currentValue).toFixed(props.precision)
        return toPrecision(currentValue).toString()
      })
      const minDisabled = computed(
        () => props.modelValue !== void 0 && props.modelValue <= props.min
      )
      const maxDisabled = computed(
        () => props.modelValue !== void 0 && props.modelValue >= props.max
      )
      const showClear = computed(
        () =>
          props.clearable &&
          !mergedDisabled.value &&
          !props.readonly &&
          props.modelValue !== void 0 &&
          props.modelValue !== null &&
          (focused.value || hovering.value)
      )
      const hasPrefix = computed(() => !!props.prefix || !!props.prefixIcon || !!slots.prefix)
      const hasSuffix = computed(
        () => !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value
      )
      const inputNumberClasses = computed(() => [
        ns.b(),
        ns.m(mergedSize.value),
        ns.is('disabled', mergedDisabled.value),
        ns.is('focused', focused.value),
        ns.is('controls-right', props.controlsPosition === 'right'),
        ns.is('without-controls', !props.controls),
        ns.is('has-prefix', hasPrefix.value),
        ns.is('has-suffix', hasSuffix.value),
        ns.is('error', (formItem == null ? void 0 : formItem.validateStatus) === 'error')
      ])
      const validate = (value) => {
        if (props.validator) {
          const result = props.validator(value)
          if (typeof result === 'string') {
            validationError.value = result
            return false
          }
          if (!result) {
            validationError.value = t('form.validationFailed')
            return false
          }
        }
        validationError.value = ''
        return true
      }
      const setCurrentValue = (newValue, emitChange = true) => {
        const oldValue = props.modelValue
        if (newValue !== void 0 && newValue !== null) {
          if (Number.isNaN(newValue)) return
          if (props.stepStrictly) {
            newValue = toPrecision(
              Math.round(newValue / props.step) * props.step,
              numPrecision.value
            )
          }
          if (props.precision !== void 0) newValue = toPrecision(newValue, props.precision)
          if (newValue > props.max) newValue = props.max
          if (newValue < props.min) newValue = props.min
        }
        if (oldValue === newValue) return
        if (props.validateEvent) validate(newValue)
        userInput.value = null
        emit('update:modelValue', newValue)
        if (props.validateEvent) {
          nextTick(() => {
            triggerValidate('change')
          })
        }
        if (emitChange) emit('change', newValue, oldValue)
      }
      const increase = () => {
        var _a
        if (mergedDisabled.value || props.readonly || maxDisabled.value) return
        setCurrentValue(toPrecision(((_a = props.modelValue) != null ? _a : 0) + props.step))
      }
      const decrease = () => {
        var _a
        if (mergedDisabled.value || props.readonly || minDisabled.value) return
        setCurrentValue(toPrecision(((_a = props.modelValue) != null ? _a : 0) - props.step))
      }
      const handleClear = () => {
        if (mergedDisabled.value || props.readonly) return
        setCurrentValue(void 0)
        emit('clear')
      }
      const handleInput = (event) => {
        const target = event.target
        userInput.value = target.value
        emit('input', target.value === '' ? void 0 : Number(target.value))
      }
      const handleChange = (event) => {
        const target = event.target
        const value = target.value
        userInput.value = null
        if (value === '') {
          const clearVal =
            props.valueOnClear === 'min'
              ? props.min
              : props.valueOnClear === 'max'
                ? props.max
                : props.valueOnClear
          setCurrentValue(clearVal === null ? void 0 : clearVal)
          return
        }
        const newValue = Number(value)
        if (!Number.isNaN(newValue)) setCurrentValue(newValue)
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
      }
      const handleBlur = (event) => {
        focused.value = false
        userInput.value = null
        emit('blur', event)
        if (props.validateEvent) {
          nextTick(() => {
            triggerValidate('blur')
          })
        }
      }
      const handleKeydown = (event) => {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          increase()
        } else if (event.key === 'ArrowDown') {
          event.preventDefault()
          decrease()
        }
      }
      __expose({
        focus: () => {
          var _a
          return (_a = inputRef.value) == null ? void 0 : _a.focus()
        },
        blur: () => {
          var _a
          return (_a = inputRef.value) == null ? void 0 : _a.blur()
        },
        clear: handleClear
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        t,
        themeStyle,
        inputRef,
        inputId,
        focused,
        hovering,
        userInput,
        validationError,
        form,
        formItem,
        triggerValidate,
        globalSize,
        mergedDisabled,
        mergedSize,
        numPrecision,
        getPrecision,
        toPrecision,
        displayValue,
        minDisabled,
        maxDisabled,
        showClear,
        hasPrefix,
        hasSuffix,
        inputNumberClasses,
        validate,
        setCurrentValue,
        increase,
        decrease,
        handleClear,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleKeydown,
        computed,
        ref,
        useSlots,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useId() {
          return useId
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useConfig() {
          return useConfig
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
