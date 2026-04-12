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
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  withModifiers as _withModifiers,
  createTextVNode as _createTextVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  vShow as _vShow,
  normalizeStyle as _normalizeStyle,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = [
  'id',
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'name',
  'aria-expanded',
  'aria-controls'
]
const _hoisted_2 = ['id']
const _hoisted_3 = ['aria-selected', 'onClick', 'onMouseenter']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'wrapperRef',
        class: _normalizeClass($setup.wrapperClasses),
        style: _normalizeStyle($setup.themeStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave,
        onClick: $setup.toggleDropdown
      },
      [
        _createCommentVNode(' \u8F93\u5165\u533A\u57DF '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('wrapper'))
          },
          [
            _createCommentVNode(' \u524D\u7F00\u56FE\u6807 '),
            _createElementVNode(
              'span',
              {
                class: _normalizeClass($setup.ns.e('prefix'))
              },
              [
                _renderSlot(_ctx.$slots, 'prefix', {}, () => [
                  (_openBlock(),
                  _createElementBlock(
                    'svg',
                    {
                      viewBox: '0 0 1024 1024',
                      width: '1em',
                      height: '1em',
                      class: _normalizeClass($setup.ns.e('icon'))
                    },
                    [
                      ...(_cache[1] ||
                        (_cache[1] = [
                          _createElementVNode(
                            'path',
                            {
                              fill: 'currentColor',
                              d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a32 32 0 0 1 32 32v192l128 64a32 32 0 0 1-28.864 57.088l-144-72A32 32 0 0 1 480 512V288a32 32 0 0 1 32-32z'
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
                ])
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u8F93\u5165\u6846 '),
            _createElementVNode(
              'input',
              {
                ref: 'inputRef',
                id: $setup.inputId,
                class: _normalizeClass($setup.ns.e('inner')),
                value: $props.editable && $setup.visible ? $setup.query : '',
                placeholder: $setup.hasValue
                  ? ''
                  : $props.placeholder || $setup.t('timeselect.placeholder'),
                disabled: $props.disabled,
                readonly: !$props.editable,
                name: $props.name,
                autocomplete: 'off',
                role: 'combobox',
                'aria-expanded': $setup.visible,
                'aria-controls': `${$setup.inputId}-listbox`,
                onInput: $setup.handleInput,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              },
              null,
              42,
              _hoisted_1
            ),
            _createCommentVNode(' \u663E\u793A\u503C '),
            $setup.hasValue && !($props.editable && $setup.visible && $setup.query)
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('display-value'))
                  },
                  _toDisplayString($setup.displayLabel),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u540E\u7F00\u56FE\u6807 '),
            _createElementVNode(
              'span',
              {
                class: _normalizeClass($setup.ns.e('suffix'))
              },
              [
                _createCommentVNode(' \u6E05\u7A7A\u6309\u94AE '),
                $setup.showClear
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass([$setup.ns.e('icon'), $setup.ns.e('clear')]),
                        onClick: _withModifiers($setup.handleClear, ['stop'])
                      },
                      [
                        ...(_cache[2] ||
                          (_cache[2] = [
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
                                  d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z'
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
                _createCommentVNode(' \u7BAD\u5934\u56FE\u6807 '),
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('icon'),
                      $setup.ns.e('arrow'),
                      {
                        'is-reverse': $setup.visible
                      }
                    ])
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
                              d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
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
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u4E0B\u62C9\u6846 '),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: 'body',
            disabled: !$props.teleported
          },
          [
            _createVNode(
              _Transition,
              {
                name: $setup.ns.b('dropdown'),
                persisted: ''
              },
              {
                default: _withCtx(() => [
                  _withDirectives(
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass([
                          $setup.ns.e('dropdown'),
                          $props.popperClass,
                          `is-${$props.effect}`
                        ]),
                        style: _normalizeStyle($props.teleported ? $setup.dropdownStyle : {}),
                        onMousedown: $setup.handleDropdownMousedown,
                        onMouseup: $setup.handleDropdownMouseup
                      },
                      [
                        _createCommentVNode(' \u65E0\u6570\u636E '),
                        $setup.filteredOptions.length === 0
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('empty'))
                              },
                              [
                                _renderSlot(_ctx.$slots, 'empty', {}, () => [
                                  _createTextVNode(
                                    _toDisplayString($setup.t('select.noData')),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ],
                              2
                              /* CLASS */
                            ))
                          : (_openBlock(),
                            _createElementBlock(
                              _Fragment,
                              { key: 1 },
                              [
                                _createCommentVNode(' \u9009\u9879\u5217\u8868 '),
                                _createElementVNode(
                                  'div',
                                  {
                                    ref: 'optionsRef',
                                    id: `${$setup.inputId}-listbox`,
                                    class: _normalizeClass($setup.ns.e('options')),
                                    role: 'listbox'
                                  },
                                  [
                                    (_openBlock(true),
                                    _createElementBlock(
                                      _Fragment,
                                      null,
                                      _renderList($setup.filteredOptions, (option, index) => {
                                        return (
                                          _openBlock(),
                                          _createElementBlock(
                                            'div',
                                            {
                                              key: option.value,
                                              class: _normalizeClass([
                                                $setup.ns.e('option'),
                                                $setup.ns.is(
                                                  'selected',
                                                  $props.modelValue === option.value
                                                ),
                                                $setup.ns.is('disabled', option.disabled),
                                                $setup.ns.is(
                                                  'hovering',
                                                  $setup.hoveredIndex === index
                                                )
                                              ]),
                                              role: 'option',
                                              'aria-selected': $props.modelValue === option.value,
                                              onMousedown:
                                                _cache[0] ||
                                                (_cache[0] = _withModifiers(() => {}, ['prevent'])),
                                              onClick: ($event) =>
                                                $setup.handleOptionClick(option, $event),
                                              onMouseenter: ($event) =>
                                                ($setup.hoveredIndex = index)
                                            },
                                            [
                                              _renderSlot(_ctx.$slots, 'option', { option }, () => [
                                                _createTextVNode(
                                                  _toDisplayString(option.label),
                                                  1
                                                  /* TEXT */
                                                )
                                              ]),
                                              $props.modelValue === option.value
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 0,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('option-check')
                                                      )
                                                    },
                                                    [
                                                      ...(_cache[4] ||
                                                        (_cache[4] = [
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
                                                                d: 'M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z'
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
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            42,
                                            _hoisted_3
                                          )
                                        )
                                      }),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ],
                                  10,
                                  _hoisted_2
                                )
                              ],
                              2112
                              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                            ))
                      ],
                      38
                      /* CLASS, STYLE, NEED_HYDRATION */
                    ),
                    [[_vShow, $setup.visible]]
                  )
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
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { computed, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useFormItem, useId, useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { generateTimeOptions, parseTimeToMinutes, isTimeInRange } from './time-select-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTimeSelect'
  },
  {
    __name: 'time-select',
    props: {
      modelValue: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      editable: { type: Boolean, required: false, default: true },
      clearable: { type: Boolean, required: false, default: true },
      size: { type: String, required: false, default: void 0 },
      placeholder: { type: String, required: false, default: '' },
      name: { type: String, required: false },
      effect: { type: String, required: false, default: 'light' },
      prefixIcon: { type: null, required: false },
      clearIcon: { type: null, required: false },
      start: { type: String, required: false, default: '09:00' },
      end: { type: String, required: false, default: '18:00' },
      step: { type: String, required: false, default: '00:30' },
      minTime: { type: String, required: false },
      maxTime: { type: String, required: false },
      valueOnClear: { type: String, required: false },
      format: { type: String, required: false, default: 'HH:mm' },
      popperClass: { type: String, required: false },
      popperStyle: { type: [String, Object], required: false },
      teleported: { type: Boolean, required: false, default: true },
      includeEndTime: { type: Boolean, required: false, default: false },
      validateEvent: { type: Boolean, required: false, default: true },
      options: { type: Array, required: false },
      disabledHours: { type: Array, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'clear', 'visible-change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('time-select')
      const { t } = useLocale()
      const inputId = useId()
      const { themeStyle } = useComponentTheme(
        'time-select',
        computed(() => props.themeOverrides)
      )
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const selectSize = computed(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const wrapperRef = ref()
      const inputRef = ref()
      const optionsRef = ref()
      const visible = ref(false)
      const focused = ref(false)
      const hovering = ref(false)
      const query = ref('')
      const hoveredIndex = ref(-1)
      const isClickingDropdown = ref(false)
      const dropdownStyle = ref({})
      const timeOptions = computed(() => {
        if (props.options && props.options.length > 0) {
          return props.options
        }
        return generateTimeOptions(
          props.start,
          props.end,
          props.step,
          props.format,
          props.includeEndTime
        )
      })
      const filteredOptions = computed(() => {
        let options = timeOptions.value
        if (props.disabledHours && props.disabledHours.length > 0) {
          options = options.map((opt) => {
            const isDisabled = props.disabledHours.some((range) => {
              if (range.length >= 2) {
                return isTimeInRange(opt.value, range[0], range[1])
              }
              return false
            })
            return __spreadProps(__spreadValues({}, opt), { disabled: opt.disabled || isDisabled })
          })
        }
        if (props.minTime) {
          const minMinutes = parseTimeToMinutes(props.minTime)
          options = options.map((opt) =>
            __spreadProps(__spreadValues({}, opt), {
              disabled: opt.disabled || parseTimeToMinutes(opt.value) < minMinutes
            })
          )
        }
        if (props.maxTime) {
          const maxMinutes = parseTimeToMinutes(props.maxTime)
          options = options.map((opt) =>
            __spreadProps(__spreadValues({}, opt), {
              disabled: opt.disabled || parseTimeToMinutes(opt.value) > maxMinutes
            })
          )
        }
        if (query.value && props.editable) {
          const q = query.value.toLowerCase()
          return options.filter(
            (opt) => opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q)
          )
        }
        return options
      })
      const displayLabel = computed(() => {
        if (!props.modelValue) return ''
        const opt = timeOptions.value.find((o) => o.value === props.modelValue)
        return opt ? opt.label : props.modelValue
      })
      const showClear = computed(
        () =>
          props.clearable &&
          !props.disabled &&
          props.modelValue !== void 0 &&
          props.modelValue !== '' &&
          (focused.value || hovering.value)
      )
      const hasValue = computed(() => props.modelValue !== void 0 && props.modelValue !== '')
      const wrapperClasses = computed(() => [
        ns.b(),
        ns.m(selectSize.value),
        ns.is('disabled', props.disabled),
        ns.is('focused', focused.value || visible.value)
      ])
      const updateDropdownPosition = () => {
        if (!wrapperRef.value || !props.teleported) return
        const rect = wrapperRef.value.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top
        const dropdownHeight = 274
        const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow
        const styles = window.getComputedStyle(wrapperRef.value)
        const primary = styles.getPropertyValue('--yh-color-primary').trim()
        const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
        dropdownStyle.value = __spreadValues(
          {
            position: 'fixed',
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            zIndex: '2000',
            '--yh-color-primary': primary,
            '--yh-color-primary-rgb': primaryRgb
          },
          showAbove
            ? { bottom: `${window.innerHeight - rect.top + 4}px` }
            : { top: `${rect.bottom + 4}px` }
        )
      }
      const scrollToSelected = () => {
        if (!optionsRef.value || !props.modelValue) return
        nextTick(() => {
          var _a
          const selectedEl =
            (_a = optionsRef.value) == null
              ? void 0
              : _a.querySelector(`.${ns.is('selected', true).slice(1)}`)
          if (selectedEl && optionsRef.value) {
            const containerHeight = optionsRef.value.clientHeight
            const scrollTop =
              selectedEl.offsetTop - containerHeight / 2 + selectedEl.offsetHeight / 2
            optionsRef.value.scrollTop = Math.max(0, scrollTop)
          }
        })
      }
      watch(visible, (val) => {
        if (val) {
          if (props.teleported) {
            nextTick(updateDropdownPosition)
          }
          scrollToSelected()
          query.value = ''
        }
        emit('visible-change', val)
      })
      onMounted(() => {
        if (props.teleported) {
          window.addEventListener('scroll', updateDropdownPosition, true)
          window.addEventListener('resize', updateDropdownPosition)
        }
      })
      onBeforeUnmount(() => {
        if (props.teleported) {
          window.removeEventListener('scroll', updateDropdownPosition, true)
          window.removeEventListener('resize', updateDropdownPosition)
        }
      })
      const handleOptionSelect = (option, event) => {
        if (option.disabled) return
        if (event) {
          event.stopPropagation()
        }
        emit('update:modelValue', option.value)
        emit('change', option.value)
        visible.value = false
        query.value = ''
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const handleClear = (event) => {
        var _a
        event.stopPropagation()
        const value = (_a = props.valueOnClear) != null ? _a : void 0
        emit('update:modelValue', value)
        emit('change', value)
        emit('clear')
        query.value = ''
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const toggleDropdown = () => {
        if (props.disabled) return
        visible.value = !visible.value
        if (visible.value) {
          nextTick(() => {
            var _a
            ;(_a = inputRef.value) == null ? void 0 : _a.focus()
          })
        }
      }
      const handleInput = (event) => {
        if (!props.editable) return
        const target = event.target
        query.value = target.value
      }
      const handleKeydown = (event) => {
        var _a, _b
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            if (!visible.value) {
              visible.value = true
            } else {
              let nextIndex = hoveredIndex.value + 1
              while (
                nextIndex < filteredOptions.value.length &&
                ((_a = filteredOptions.value[nextIndex]) == null ? void 0 : _a.disabled)
              ) {
                nextIndex++
              }
              if (nextIndex < filteredOptions.value.length) {
                hoveredIndex.value = nextIndex
              }
            }
            break
          case 'ArrowUp':
            event.preventDefault()
            let prevIndex = hoveredIndex.value - 1
            while (
              prevIndex >= 0 &&
              ((_b = filteredOptions.value[prevIndex]) == null ? void 0 : _b.disabled)
            ) {
              prevIndex--
            }
            if (prevIndex >= 0) {
              hoveredIndex.value = prevIndex
            }
            break
          case 'Enter':
            event.preventDefault()
            if (
              visible.value &&
              hoveredIndex.value >= 0 &&
              filteredOptions.value[hoveredIndex.value]
            ) {
              handleOptionSelect(filteredOptions.value[hoveredIndex.value])
            } else if (!visible.value) {
              visible.value = true
            }
            break
          case 'Escape':
            visible.value = false
            break
          case 'Tab':
            visible.value = false
            break
        }
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
      }
      const handleBlur = (event) => {
        if (isClickingDropdown.value) {
          return
        }
        focused.value = false
        visible.value = false
        emit('blur', event)
        if (props.validateEvent) {
          triggerValidate('blur')
        }
      }
      const handleDropdownMousedown = (event) => {
        event.preventDefault()
        isClickingDropdown.value = true
      }
      const handleDropdownMouseup = () => {
        setTimeout(() => {
          isClickingDropdown.value = false
        }, 0)
      }
      const handleOptionClick = (option, event) => {
        event.stopPropagation()
        handleOptionSelect(option, event)
        nextTick(() => {
          var _a
          ;(_a = inputRef.value) == null ? void 0 : _a.focus()
        })
      }
      const handleMouseEnter = () => {
        hovering.value = true
      }
      const handleMouseLeave = () => {
        hovering.value = false
      }
      const focus = () => {
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.focus()
      }
      const blur = () => {
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.blur()
      }
      __expose({
        focus,
        blur,
        inputRef: inputRef.value
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        inputId,
        themeStyle,
        form,
        formItem,
        triggerValidate,
        globalSize,
        selectSize,
        wrapperRef,
        inputRef,
        optionsRef,
        visible,
        focused,
        hovering,
        query,
        hoveredIndex,
        isClickingDropdown,
        dropdownStyle,
        timeOptions,
        filteredOptions,
        displayLabel,
        showClear,
        hasValue,
        wrapperClasses,
        updateDropdownPosition,
        scrollToSelected,
        handleOptionSelect,
        handleClear,
        toggleDropdown,
        handleInput,
        handleKeydown,
        handleFocus,
        handleBlur,
        handleDropdownMousedown,
        handleDropdownMouseup,
        handleOptionClick,
        handleMouseEnter,
        handleMouseLeave,
        focus,
        blur,
        computed,
        ref,
        nextTick,
        watch,
        onMounted,
        onBeforeUnmount,
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
        },
        get generateTimeOptions() {
          return generateTimeOptions
        },
        get parseTimeToMinutes() {
          return parseTimeToMinutes
        },
        get isTimeInRange() {
          return isTimeInRange
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
