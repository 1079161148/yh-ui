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
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  Fragment as _Fragment,
  withModifiers as _withModifiers
} from 'vue'
const _hoisted_1 = [
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'maxlength',
  'minlength',
  'rows',
  'name',
  'id',
  'tabindex',
  'autocomplete',
  'autofocus',
  'aria-label',
  'inputmode'
]
const _hoisted_2 = [
  'type',
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'maxlength',
  'minlength',
  'name',
  'id',
  'tabindex',
  'list',
  'autocomplete',
  'autofocus',
  'aria-label',
  'inputmode',
  'aria-invalid',
  'aria-describedby'
]
const _hoisted_3 = {
  key: 0,
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  style: { overflow: 'visible' }
}
const _hoisted_4 = {
  key: 1,
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  style: { overflow: 'visible' }
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'wrapperRef',
        class: _normalizeClass($setup.wrapperClasses),
        style: _normalizeStyle($setup.wrapperStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave
      },
      [
        _createCommentVNode(' \u524D\u7F6E\u5143\u7D20 '),
        $setup.hasPrepend
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('prepend'))
              },
              [_renderSlot(_ctx.$slots, 'prepend')],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u8F93\u5165\u6846\u5305\u88C5\u5668 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('wrapper'))
          },
          [
            _createCommentVNode(' \u524D\u7F6E\u56FE\u6807/\u6587\u672C/\u5185\u5BB9 '),
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
                      _createCommentVNode(' Feature 6: prefix string prop '),
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
                        : $props.prefixIcon && typeof $props.prefixIcon !== 'string'
                          ? (_openBlock(),
                            _createBlock(
                              _resolveDynamicComponent($props.prefixIcon),
                              {
                                key: 1,
                                class: _normalizeClass($setup.ns.e('icon'))
                              },
                              null,
                              8,
                              ['class']
                            ))
                          : $props.prefixIcon
                            ? (_openBlock(),
                              _createElementBlock(
                                'span',
                                {
                                  key: 2,
                                  class: _normalizeClass($setup.ns.e('icon'))
                                },
                                _toDisplayString($props.prefixIcon),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u6587\u672C\u57DF '),
            $setup.isTextarea
              ? (_openBlock(),
                _createElementBlock(
                  'textarea',
                  {
                    key: 1,
                    ref: 'textareaRef',
                    class: _normalizeClass($setup.inputClasses),
                    value: $setup.nativeInputValue,
                    placeholder: $props.placeholder || $setup.t('input.placeholder'),
                    disabled: $props.disabled,
                    readonly: $props.readonly,
                    maxlength: $props.maxlength,
                    minlength: $props.minlength,
                    rows: $props.rows,
                    name: $props.name,
                    id: $props.id,
                    tabindex: $props.tabindex,
                    autocomplete: $props.autocomplete,
                    autofocus: $props.autofocus,
                    'aria-label': $props.ariaLabel || $props.label,
                    inputmode: $props.inputmode,
                    style: _normalizeStyle($setup.textareaStyle),
                    onInput: $setup.handleInput,
                    onChange: $setup.handleChange,
                    onFocus: $setup.handleFocus,
                    onBlur: $setup.handleBlur,
                    onKeydown: $setup.handleKeydown,
                    onKeyup: $setup.handleKeyup,
                    onCompositionstart: $setup.handleCompositionStart,
                    onCompositionupdate: $setup.handleCompositionUpdate,
                    onCompositionend: $setup.handleCompositionEnd
                  },
                  null,
                  46,
                  _hoisted_1
                ))
              : (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 2 },
                  [
                    _createCommentVNode(' \u666E\u901A\u8F93\u5165\u6846 '),
                    _createElementVNode(
                      'input',
                      {
                        ref: 'inputRef',
                        class: _normalizeClass($setup.inputClasses),
                        type: $props.showPassword
                          ? $setup.passwordVisible
                            ? 'text'
                            : 'password'
                          : $props.type,
                        value: $setup.nativeInputValue,
                        placeholder: $props.placeholder || $setup.t('input.placeholder'),
                        disabled: $props.disabled,
                        readonly: $props.readonly,
                        maxlength: $props.maxlength,
                        minlength: $props.minlength,
                        name: $props.name,
                        id: $props.id,
                        tabindex: $props.tabindex,
                        list: $props.list,
                        autocomplete: $props.autocomplete,
                        autofocus: $props.autofocus,
                        style: _normalizeStyle($props.inputStyle),
                        'aria-label': $props.ariaLabel || $props.label,
                        inputmode: $props.inputmode,
                        'aria-invalid': $setup.mergedStatus === 'error',
                        'aria-describedby':
                          $setup.mergedStatus === 'error'
                            ? (_a = $setup.formItem) == null
                              ? void 0
                              : _a.errorId
                            : void 0,
                        onInput: $setup.handleInput,
                        onChange: $setup.handleChange,
                        onFocus: $setup.handleFocus,
                        onBlur: $setup.handleBlur,
                        onKeydown: $setup.handleKeydown,
                        onKeyup: $setup.handleKeyup,
                        onCompositionstart: $setup.handleCompositionStart,
                        onCompositionupdate: $setup.handleCompositionUpdate,
                        onCompositionend: $setup.handleCompositionEnd
                      },
                      null,
                      46,
                      _hoisted_2
                    )
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )),
            _createCommentVNode(' \u540E\u7F6E\u56FE\u6807/\u6587\u672C/\u5185\u5BB9 '),
            $setup.hasSuffix
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 3,
                    class: _normalizeClass($setup.ns.e('suffix'))
                  },
                  [
                    _createCommentVNode(' Feature 2: \u52A0\u8F7D\u72B6\u6001\u56FE\u6807 '),
                    $setup.isLoading
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass([$setup.ns.e('icon'), $setup.ns.e('loading')])
                          },
                          [
                            _renderSlot(_ctx.$slots, 'loadingIcon', {}, () => [
                              _cache[1] ||
                                (_cache[1] = _createElementVNode(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    width: '1em',
                                    height: '1em',
                                    class: 'yh-input__loading-spin'
                                  },
                                  [
                                    _createElementVNode('path', {
                                      fill: 'currentColor',
                                      d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z'
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
                    _createCommentVNode(' \u6E05\u7A7A\u6309\u94AE '),
                    $setup.showClear && !$setup.isLoading
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 1,
                            class: _normalizeClass([$setup.ns.e('icon'), $setup.ns.e('clear')]),
                            onMousedown:
                              _cache[0] || (_cache[0] = _withModifiers(() => {}, ['prevent'])),
                            onClick: _withModifiers($setup.handleClear, ['stop'])
                          },
                          [
                            _renderSlot(_ctx.$slots, 'clearIcon', {}, () => [
                              _cache[2] ||
                                (_cache[2] = _createElementVNode(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    width: '1em',
                                    height: '1em'
                                  },
                                  [
                                    _createElementVNode('path', {
                                      fill: 'currentColor',
                                      d: 'm466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512zM512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                ))
                            ])
                          ],
                          34
                          /* CLASS, NEED_HYDRATION */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createCommentVNode(' \u5BC6\u7801\u5207\u6362\u6309\u94AE '),
                    $setup.showPasswordIcon
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 2,
                            class: _normalizeClass([$setup.ns.e('icon'), $setup.ns.e('password')]),
                            onClick: _withModifiers($setup.handlePasswordToggle, ['stop'])
                          },
                          [
                            $setup.passwordVisible
                              ? (_openBlock(),
                                _createElementBlock('svg', _hoisted_3, [
                                  ...(_cache[3] ||
                                    (_cache[3] = [
                                      _createElementVNode(
                                        'path',
                                        { d: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z' },
                                        null,
                                        -1
                                        /* CACHED */
                                      ),
                                      _createElementVNode(
                                        'circle',
                                        {
                                          cx: '12',
                                          cy: '12',
                                          r: '3'
                                        },
                                        null,
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ]))
                              : (_openBlock(),
                                _createElementBlock('svg', _hoisted_4, [
                                  ...(_cache[4] ||
                                    (_cache[4] = [
                                      _createElementVNode(
                                        'path',
                                        {
                                          d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
                                        },
                                        null,
                                        -1
                                        /* CACHED */
                                      ),
                                      _createElementVNode(
                                        'line',
                                        {
                                          x1: '3',
                                          y1: '3',
                                          x2: '21',
                                          y2: '21'
                                        },
                                        null,
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ]))
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createCommentVNode(' \u540E\u7F6E\u56FE\u6807/\u6587\u672C\u63D2\u69FD '),
                    _renderSlot(_ctx.$slots, 'suffix', {}, () => [
                      _createCommentVNode(' Feature 6: suffix string prop '),
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
                        : $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                          ? (_openBlock(),
                            _createBlock(
                              _resolveDynamicComponent($props.suffixIcon),
                              {
                                key: 1,
                                class: _normalizeClass($setup.ns.e('icon'))
                              },
                              null,
                              8,
                              ['class']
                            ))
                          : $props.suffixIcon
                            ? (_openBlock(),
                              _createElementBlock(
                                'span',
                                {
                                  key: 2,
                                  class: _normalizeClass($setup.ns.e('icon'))
                                },
                                _toDisplayString($props.suffixIcon),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(
              ' \u5B57\u6570\u7EDF\u8BA1 (\u8F93\u5165\u6846\u5185\u90E8\uFF0C\u4EC5\u9488\u5BF9 type=text) '
            ),
            $setup.showWordLimitCount && !$setup.isTextarea
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 4,
                    class: _normalizeClass($setup.ns.e('count'))
                  },
                  _toDisplayString($setup.textLength) + ' / ' + _toDisplayString($props.maxlength),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u540E\u7F6E\u5143\u7D20 '),
        $setup.hasAppend
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('append'))
              },
              [_renderSlot(_ctx.$slots, 'append')],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u5B57\u6570\u7EDF\u8BA1 (Textarea \u5916\u90E8\u53F3\u4E0B\u89D2) '),
        $setup.showWordLimitCount && $setup.isTextarea
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 2,
                class: _normalizeClass([$setup.ns.e('count'), $setup.ns.em('count', 'textarea')])
              },
              _toDisplayString($setup.textLength) + ' / ' + _toDisplayString($props.maxlength),
              3
              /* TEXT, CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { computed, ref, watch, nextTick, useSlots, onMounted } from 'vue'
import { useFormItem, useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { calcTextareaHeight } from './utils.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhInput'
  },
  {
    __name: 'input',
    props: {
      modelValue: { type: [String, Number], required: false },
      type: { type: null, required: false, default: 'text' },
      size: { type: null, required: false, default: void 0 },
      variant: { type: null, required: false, default: 'default' },
      status: { type: null, required: false, default: '' },
      loading: { type: Boolean, required: false, default: false },
      placeholder: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      readonly: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: false },
      clearOnEscape: { type: Boolean, required: false, default: false },
      selectOnFocus: { type: Boolean, required: false, default: false },
      showPassword: { type: Boolean, required: false, default: false },
      showWordLimit: { type: Boolean, required: false, default: false },
      countConfig: { type: Object, required: false },
      maxlength: { type: [Number, String], required: false },
      minlength: { type: [Number, String], required: false },
      prefixIcon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      clearIcon: { type: null, required: false },
      prefix: { type: String, required: false },
      suffix: { type: String, required: false },
      list: { type: String, required: false },
      autofocus: { type: Boolean, required: false, default: false },
      autocomplete: { type: String, required: false, default: 'off' },
      name: { type: String, required: false },
      form: { type: String, required: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      ariaLabel: { type: String, required: false, default: void 0 },
      label: { type: String, required: false, default: void 0 },
      inputmode: { type: String, required: false, default: void 0 },
      modelModifiers: { type: Object, required: false, default: () => ({}) },
      validateEvent: { type: Boolean, required: false, default: true },
      inputStyle: { type: [String, Object], required: false },
      formatter: { type: Function, required: false },
      parser: { type: Function, required: false },
      rows: { type: Number, required: false, default: 2 },
      autosize: { type: [Boolean, Object], required: false },
      resize: { type: String, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: [
      'update:modelValue',
      'input',
      'change',
      'focus',
      'blur',
      'clear',
      'keydown',
      'keyup',
      'compositionstart',
      'compositionupdate',
      'compositionend'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('input')
      const { t } = useLocale()
      const inputRef = ref()
      const textareaRef = ref()
      const wrapperRef = ref()
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { themeStyle } = useComponentTheme(
        'input',
        computed(() => props.themeOverrides)
      )
      const { globalSize } = useConfig()
      const inputSize = computed(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const focused = ref(false)
      const hovering = ref(false)
      const isComposing = ref(false)
      const passwordVisible = ref(false)
      const textareaCalcStyle = ref({})
      const inputOrTextarea = computed(() => inputRef.value || textareaRef.value)
      const isTextarea = computed(() => props.type === 'textarea')
      const nativeInputValue = computed(() => {
        const value =
          props.modelValue === null || props.modelValue === void 0 ? '' : String(props.modelValue)
        if (props.formatter && !isTextarea.value) {
          return props.formatter(value)
        }
        return value
      })
      const showClear = computed(
        () =>
          props.clearable &&
          !props.disabled &&
          !props.readonly &&
          !!nativeInputValue.value &&
          (focused.value || hovering.value)
      )
      const showPasswordIcon = computed(
        () => props.showPassword && !props.disabled && !props.readonly && !!nativeInputValue.value
      )
      const textLength = computed(() => {
        var _a
        const value =
          props.modelValue === null || props.modelValue === void 0 ? '' : String(props.modelValue)
        if ((_a = props.countConfig) == null ? void 0 : _a.calculate) {
          return props.countConfig.calculate(value)
        }
        return value.length
      })
      const showWordLimitCount = computed(
        () =>
          props.showWordLimit &&
          !!props.maxlength &&
          (props.type === 'text' || props.type === 'textarea') &&
          !props.disabled &&
          !props.readonly
      )
      const inputExceed = computed(
        () => showWordLimitCount.value && textLength.value > Number(props.maxlength)
      )
      const isLoading = computed(() => props.loading && !props.disabled)
      const hasPrepend = computed(() => !!slots.prepend)
      const hasAppend = computed(() => !!slots.append)
      const hasPrefix = computed(() => !!slots.prefix || !!props.prefixIcon || !!props.prefix)
      const hasSuffix = computed(
        () =>
          !!slots.suffix ||
          !!props.suffixIcon ||
          !!props.suffix ||
          showClear.value ||
          showPasswordIcon.value ||
          isLoading.value
      )
      const mergedStatus = computed(() => {
        if (props.status) return props.status
        if ((formItem == null ? void 0 : formItem.validateStatus) === 'error') return 'error'
        if ((formItem == null ? void 0 : formItem.validateStatus) === 'success') return 'success'
        return ''
      })
      const wrapperClasses = computed(() => [
        ns.b(),
        ns.m(inputSize.value),
        ns.is('disabled', props.disabled),
        ns.is('focused', focused.value),
        ns.is('textarea', isTextarea.value),
        ns.is('exceed', inputExceed.value),
        ns.is('loading', isLoading.value),
        // Feature 1: Variant
        props.variant && props.variant !== 'default' ? ns.m(`variant-${props.variant}`) : '',
        // Feature 3: Status
        mergedStatus.value ? ns.m(`status-${mergedStatus.value}`) : '',
        {
          [ns.b('group')]: hasPrepend.value || hasAppend.value,
          [ns.is('prepend')]: hasPrepend.value,
          [ns.is('append')]: hasAppend.value
        }
      ])
      const wrapperStyle = computed(() => __spreadValues({}, themeStyle.value))
      const inputClasses = computed(() => [ns.e('inner'), ns.is('disabled', props.disabled)])
      const textareaStyle = computed(() => {
        return [props.inputStyle, textareaCalcStyle.value, { resize: props.resize }]
      })
      const setNativeInputValue = () => {
        const input = inputOrTextarea.value
        if (!input || input.value === nativeInputValue.value) return
        input.value = nativeInputValue.value
      }
      const handleInput = (event) => {
        var _a, _b
        const target = event.target
        let value = target.value
        if (isComposing.value) return
        if (props.parser) {
          value = props.parser(value)
        }
        if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
          value = value.trim()
        }
        if ((_b = props.modelModifiers) == null ? void 0 : _b.number) {
          const n = parseFloat(value)
          emit('update:modelValue', isNaN(n) ? value : n)
          emit('input', isNaN(n) ? value : n)
        } else {
          emit('update:modelValue', value)
          emit('input', value)
        }
      }
      const handleChange = (event) => {
        const target = event.target
        emit('change', target.value)
        if (props.validateEvent) {
          nextTick(() => {
            triggerValidate('change')
          })
        }
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
        if (props.selectOnFocus) {
          nextTick(() => {
            var _a
            ;(_a = inputOrTextarea.value) == null ? void 0 : _a.select()
          })
        }
      }
      const handleBlur = (event) => {
        focused.value = false
        emit('blur', event)
        if (props.validateEvent) {
          nextTick(() => {
            triggerValidate('blur')
          })
        }
      }
      const handleMouseEnter = () => {
        hovering.value = true
      }
      const handleMouseLeave = () => {
        hovering.value = false
      }
      const handleClear = () => {
        emit('update:modelValue', '')
        emit('change', '')
        emit('clear')
        emit('input', '')
        const input = inputOrTextarea.value
        if (input) {
          input.value = ''
        }
        nextTick(() => {
          focus()
        })
      }
      const handleKeydown = (event) => {
        if (props.clearOnEscape && event.key === 'Escape' && !props.disabled && !props.readonly) {
          handleClear()
        }
        emit('keydown', event)
      }
      const handleKeyup = (event) => {
        emit('keyup', event)
      }
      const handlePasswordToggle = () => {
        passwordVisible.value = !passwordVisible.value
        nextTick(() => {
          focus()
        })
      }
      const handleCompositionStart = (event) => {
        isComposing.value = true
        emit('compositionstart', event)
      }
      const handleCompositionUpdate = (event) => {
        emit('compositionupdate', event)
      }
      const handleCompositionEnd = (event) => {
        if (isComposing.value) {
          isComposing.value = false
          handleInput(event)
        }
        emit('compositionend', event)
      }
      const focus = () => {
        var _a
        ;(_a = inputOrTextarea.value) == null ? void 0 : _a.focus()
      }
      const blur = () => {
        var _a
        ;(_a = inputOrTextarea.value) == null ? void 0 : _a.blur()
      }
      const select = () => {
        var _a
        ;(_a = inputOrTextarea.value) == null ? void 0 : _a.select()
      }
      const clear = () => {
        handleClear()
      }
      const resizeTextarea = () => {
        const { type, autosize } = props
        if (type !== 'textarea') return
        if (!autosize) {
          textareaCalcStyle.value = {}
          return
        }
        const minRows = typeof autosize === 'object' ? autosize.minRows : void 0
        const maxRows = typeof autosize === 'object' ? autosize.maxRows : void 0
        const textarea = textareaRef.value
        if (!textarea) return
        const style = calcTextareaHeight(textarea, minRows, maxRows)
        textareaCalcStyle.value = {
          height: style.height,
          minHeight: style.minHeight
        }
      }
      watch(
        () => props.modelValue,
        () => {
          nextTick(() => {
            setNativeInputValue()
            resizeTextarea()
          })
        }
      )
      onMounted(() => {
        setNativeInputValue()
        resizeTextarea()
        if (props.autofocus) {
          focus()
        }
      })
      __expose({
        ref: inputOrTextarea.value,
        wrapperRef: wrapperRef.value,
        focus,
        blur,
        select,
        clear,
        get textLength() {
          return textLength.value
        }
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        t,
        inputRef,
        textareaRef,
        wrapperRef,
        form,
        formItem,
        triggerValidate,
        themeStyle,
        globalSize,
        inputSize,
        focused,
        hovering,
        isComposing,
        passwordVisible,
        textareaCalcStyle,
        inputOrTextarea,
        isTextarea,
        nativeInputValue,
        showClear,
        showPasswordIcon,
        textLength,
        showWordLimitCount,
        inputExceed,
        isLoading,
        hasPrepend,
        hasAppend,
        hasPrefix,
        hasSuffix,
        mergedStatus,
        wrapperClasses,
        wrapperStyle,
        inputClasses,
        textareaStyle,
        setNativeInputValue,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleMouseEnter,
        handleMouseLeave,
        handleClear,
        handleKeydown,
        handleKeyup,
        handlePasswordToggle,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
        focus,
        blur,
        select,
        clear,
        resizeTextarea,
        computed,
        ref,
        watch,
        nextTick,
        useSlots,
        onMounted,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
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
        get calcTextareaHeight() {
          return calcTextareaHeight
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
