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
  resolveDynamicComponent as _resolveDynamicComponent,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createBlock as _createBlock,
  toDisplayString as _toDisplayString,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  withModifiers as _withModifiers,
  Fragment as _Fragment,
  renderList as _renderList,
  vShow as _vShow,
  normalizeStyle as _normalizeStyle,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport
} from 'vue'
const _hoisted_1 = [
  'id',
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'maxlength',
  'rows',
  'autofocus',
  'aria-expanded',
  'aria-controls',
  'aria-activedescendant'
]
const _hoisted_2 = [
  'id',
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'maxlength',
  'autofocus',
  'aria-expanded',
  'aria-controls',
  'aria-activedescendant'
]
const _hoisted_3 = ['id']
const _hoisted_4 = ['id', 'aria-selected', 'aria-disabled', 'onClick', 'onMouseenter']
const _hoisted_5 = ['src', 'alt']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'wrapperRef',
        class: _normalizeClass($setup.wrapperClasses),
        style: _normalizeStyle($setup.themeStyle),
        onMouseenter: _cache[4] || (_cache[4] = ($event) => ($setup.hovering = true)),
        onMouseleave: _cache[5] || (_cache[5] = ($event) => ($setup.hovering = false))
      },
      [
        _createCommentVNode(' \u524D\u7F00 '),
        $setup.slots.prefix || $props.prefixIcon
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('prefix'))
              },
              [
                _renderSlot(_ctx.$slots, 'prefix', {}, () => [
                  $props.prefixIcon && typeof $props.prefixIcon !== 'string'
                    ? (_openBlock(),
                      _createBlock(
                        _resolveDynamicComponent($props.prefixIcon),
                        {
                          key: 0,
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
                            key: 1,
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
        _createCommentVNode(' \u8F93\u5165\u6846 '),
        $props.type === 'textarea'
          ? (_openBlock(),
            _createElementBlock(
              'textarea',
              {
                key: 1,
                id: $setup.inputId,
                ref: 'inputRef',
                class: _normalizeClass($setup.ns.e('inner')),
                value: $props.modelValue,
                placeholder: $props.placeholder || $setup.t('mention.placeholder'),
                disabled: $setup.mentionDisabled,
                readonly: $props.readonly,
                maxlength: $props.maxlength,
                rows: $props.rows,
                autofocus: $props.autofocus,
                role: 'combobox',
                'aria-expanded': $setup.dropdownVisible,
                'aria-autocomplete': 'list',
                'aria-controls': `${$setup.inputId}-listbox`,
                'aria-activedescendant':
                  $setup.highlightedIndex >= 0
                    ? `${$setup.inputId}-option-${$setup.highlightedIndex}`
                    : void 0,
                onInput: $setup.handleInput,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              },
              null,
              42,
              _hoisted_1
            ))
          : (_openBlock(),
            _createElementBlock(
              'input',
              {
                key: 2,
                id: $setup.inputId,
                ref: 'inputRef',
                class: _normalizeClass($setup.ns.e('inner')),
                type: 'text',
                value: $props.modelValue,
                placeholder: $props.placeholder || $setup.t('mention.placeholder'),
                disabled: $setup.mentionDisabled,
                readonly: $props.readonly,
                maxlength: $props.maxlength,
                autofocus: $props.autofocus,
                role: 'combobox',
                'aria-expanded': $setup.dropdownVisible,
                'aria-autocomplete': 'list',
                'aria-controls': `${$setup.inputId}-listbox`,
                'aria-activedescendant':
                  $setup.highlightedIndex >= 0
                    ? `${$setup.inputId}-option-${$setup.highlightedIndex}`
                    : void 0,
                onInput: $setup.handleInput,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              },
              null,
              42,
              _hoisted_2
            )),
        _createCommentVNode(' \u540E\u7F00 / \u6E05\u7A7A '),
        $setup.slots.suffix || $props.suffixIcon || $setup.showClear || $props.showWordLimit
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 3,
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
                        onMousedown:
                          _cache[0] || (_cache[0] = _withModifiers(() => {}, ['prevent'])),
                        onClick: _withModifiers($setup.handleClear, ['stop']),
                        'aria-label': 'Clear'
                      },
                      [
                        ...(_cache[6] ||
                          (_cache[6] = [
                            _createElementVNode(
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
                                  d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      34
                      /* CLASS, NEED_HYDRATION */
                    ))
                  : _createCommentVNode('v-if', true),
                _createCommentVNode(' \u5B57\u6570\u7EDF\u8BA1 '),
                $props.showWordLimit && $props.maxlength
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 1,
                        class: _normalizeClass($setup.ns.e('count'))
                      },
                      _toDisplayString($setup.textLength) +
                        ' / ' +
                        _toDisplayString($props.maxlength),
                      3
                      /* TEXT, CLASS */
                    ))
                  : _createCommentVNode('v-if', true),
                _createCommentVNode(' \u81EA\u5B9A\u4E49\u540E\u7F00 '),
                _renderSlot(_ctx.$slots, 'suffix', {}, () => [
                  $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                    ? (_openBlock(),
                      _createBlock(
                        _resolveDynamicComponent($props.suffixIcon),
                        {
                          key: 0,
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
                            key: 1,
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
        _createCommentVNode(' \u4E0B\u62C9\u9762\u677F '),
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
                        ref: 'dropdownRef',
                        id: `${$setup.inputId}-listbox`,
                        class: _normalizeClass([$setup.ns.e('dropdown'), $props.popperClass]),
                        style: _normalizeStyle(
                          $props.teleported
                            ? __spreadValues(
                                __spreadValues({}, $setup.themeStyle),
                                $setup.dropdownStyle
                              )
                            : $setup.themeStyle
                        ),
                        role: 'listbox',
                        onMousedown:
                          _cache[2] || (_cache[2] = ($event) => ($setup.isClickingDropdown = true)),
                        onMouseup:
                          _cache[3] || (_cache[3] = ($event) => ($setup.isClickingDropdown = false))
                      },
                      [
                        _createCommentVNode(' \u52A0\u8F7D\u4E2D '),
                        $props.loading
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('loading'))
                              },
                              [
                                _renderSlot(_ctx.$slots, 'loading', {}, () => [
                                  (_openBlock(),
                                  _createElementBlock(
                                    'svg',
                                    {
                                      class: _normalizeClass($setup.ns.e('loading-icon')),
                                      viewBox: '0 0 1024 1024',
                                      xmlns: 'http://www.w3.org/2000/svg'
                                    },
                                    [
                                      ...(_cache[7] ||
                                        (_cache[7] = [
                                          _createElementVNode(
                                            'path',
                                            {
                                              fill: 'currentColor',
                                              d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z'
                                            },
                                            null,
                                            -1
                                            /* CACHED */
                                          )
                                        ]))
                                    ],
                                    2
                                    /* CLASS */
                                  )),
                                  _createElementVNode(
                                    'span',
                                    null,
                                    _toDisplayString(
                                      $props.loadingText || $setup.t('mention.loading')
                                    ),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ],
                              2
                              /* CLASS */
                            ))
                          : !$props.loading && $setup.filteredOptions.length === 0
                            ? (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 1 },
                                [
                                  _createCommentVNode(' \u65E0\u6570\u636E '),
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('empty'))
                                    },
                                    [
                                      _renderSlot(_ctx.$slots, 'empty', {}, () => [
                                        _createElementVNode(
                                          'span',
                                          null,
                                          _toDisplayString(
                                            $props.noDataText || $setup.t('mention.noData')
                                          ),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                            : (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 2 },
                                [
                                  _createCommentVNode(
                                    ' \u9009\u9879\u5217\u8868\uFF08\u5206\u7EC4\u652F\u6301\uFF09 '
                                  ),
                                  (_openBlock(true),
                                  _createElementBlock(
                                    _Fragment,
                                    null,
                                    _renderList($setup.groupedOptions, ([group, groupOpts]) => {
                                      return (
                                        _openBlock(),
                                        _createElementBlock(
                                          _Fragment,
                                          { key: group },
                                          [
                                            _createCommentVNode(' \u5206\u7EC4\u6807\u9898 '),
                                            group
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'div',
                                                  {
                                                    key: 0,
                                                    class: _normalizeClass(
                                                      $setup.ns.e('group-label')
                                                    )
                                                  },
                                                  _toDisplayString(group),
                                                  3
                                                  /* TEXT, CLASS */
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _createCommentVNode(' \u9009\u9879\u6761\u76EE '),
                                            (_openBlock(true),
                                            _createElementBlock(
                                              _Fragment,
                                              null,
                                              _renderList(groupOpts, (option) => {
                                                var _a, _b
                                                return (
                                                  _openBlock(),
                                                  _createElementBlock(
                                                    'div',
                                                    {
                                                      key: option.value,
                                                      id: `${$setup.inputId}-option-${$setup.filteredOptions.indexOf(option)}`,
                                                      class: _normalizeClass([
                                                        $setup.ns.e('option'),
                                                        $setup.ns.is(
                                                          'highlighted',
                                                          $setup.filteredOptions.indexOf(option) ===
                                                            $setup.highlightedIndex
                                                        ),
                                                        $setup.ns.is('disabled', !!option.disabled)
                                                      ]),
                                                      role: 'option',
                                                      'aria-selected':
                                                        $setup.filteredOptions.indexOf(option) ===
                                                        $setup.highlightedIndex,
                                                      'aria-disabled': option.disabled,
                                                      onMousedown:
                                                        _cache[1] ||
                                                        (_cache[1] = _withModifiers(() => {}, [
                                                          'prevent'
                                                        ])),
                                                      onClick: ($event) =>
                                                        $setup.selectOption(option),
                                                      onMouseenter: ($event) =>
                                                        ($setup.highlightedIndex =
                                                          $setup.filteredOptions.indexOf(option))
                                                    },
                                                    [
                                                      _renderSlot(
                                                        _ctx.$slots,
                                                        'option',
                                                        {
                                                          option,
                                                          keyword:
                                                            (_b =
                                                              (_a = $setup.triggerPos) == null
                                                                ? void 0
                                                                : _a.keyword) != null
                                                              ? _b
                                                              : ''
                                                        },
                                                        () => {
                                                          var _a2, _b2
                                                          return [
                                                            _createCommentVNode(' \u5934\u50CF '),
                                                            option.avatar
                                                              ? (_openBlock(),
                                                                _createElementBlock(
                                                                  'img',
                                                                  {
                                                                    key: 0,
                                                                    src: option.avatar,
                                                                    class: _normalizeClass(
                                                                      $setup.ns.e('option-avatar')
                                                                    ),
                                                                    alt:
                                                                      (_a2 = option.label) != null
                                                                        ? _a2
                                                                        : option.value
                                                                  },
                                                                  null,
                                                                  10,
                                                                  _hoisted_5
                                                                ))
                                                              : _createCommentVNode('v-if', true),
                                                            _createElementVNode(
                                                              'div',
                                                              {
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('option-content')
                                                                )
                                                              },
                                                              [
                                                                _createElementVNode(
                                                                  'span',
                                                                  {
                                                                    class: _normalizeClass(
                                                                      $setup.ns.e('option-label')
                                                                    )
                                                                  },
                                                                  _toDisplayString(
                                                                    (_b2 = option.label) != null
                                                                      ? _b2
                                                                      : option.value
                                                                  ),
                                                                  3
                                                                  /* TEXT, CLASS */
                                                                ),
                                                                option.description
                                                                  ? (_openBlock(),
                                                                    _createElementBlock(
                                                                      'span',
                                                                      {
                                                                        key: 0,
                                                                        class: _normalizeClass(
                                                                          $setup.ns.e('option-desc')
                                                                        )
                                                                      },
                                                                      _toDisplayString(
                                                                        option.description
                                                                      ),
                                                                      3
                                                                      /* TEXT, CLASS */
                                                                    ))
                                                                  : _createCommentVNode(
                                                                      'v-if',
                                                                      true
                                                                    )
                                                              ],
                                                              2
                                                              /* CLASS */
                                                            )
                                                          ]
                                                        }
                                                      )
                                                    ],
                                                    42,
                                                    _hoisted_4
                                                  )
                                                )
                                              }),
                                              128
                                              /* KEYED_FRAGMENT */
                                            ))
                                          ],
                                          64
                                          /* STABLE_FRAGMENT */
                                        )
                                      )
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              ))
                      ],
                      46,
                      _hoisted_3
                    ),
                    [[_vShow, $setup.dropdownVisible]]
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
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { useFormItem, useId, useZIndex, useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhMention' },
  {
    __name: 'mention',
    props: {
      modelValue: { type: String, required: false, default: '' },
      options: { type: Array, required: false, default: () => [] },
      triggers: { type: Array, required: false, default: () => ['@'] },
      type: { type: String, required: false, default: 'input' },
      placement: { type: null, required: false, default: 'bottom' },
      placeholder: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      readonly: { type: Boolean, required: false, default: false },
      size: { type: null, required: false, default: void 0 },
      maxlength: { type: Number, required: false },
      clearable: { type: Boolean, required: false, default: false },
      showWordLimit: { type: Boolean, required: false, default: false },
      prefixIcon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      maxCount: { type: Number, required: false, default: 8 },
      filterOption: { type: [Function, Boolean], required: false, default: void 0 },
      loading: { type: Boolean, required: false, default: false },
      loadingText: { type: String, required: false, default: void 0 },
      noDataText: { type: String, required: false, default: void 0 },
      teleported: { type: Boolean, required: false, default: true },
      popperClass: { type: String, required: false, default: '' },
      split: { type: String, required: false, default: ' ' },
      wholeWord: { type: Boolean, required: false, default: false },
      autofocus: { type: Boolean, required: false, default: false },
      rows: { type: Number, required: false, default: 3 },
      autosize: { type: [Boolean, Object], required: false },
      debounce: { type: Number, required: false, default: 100 },
      validateEvent: { type: Boolean, required: false, default: true },
      themeOverrides: { type: null, required: false }
    },
    emits: [
      'update:modelValue',
      'input',
      'change',
      'focus',
      'blur',
      'clear',
      'search',
      'select',
      'open',
      'close',
      'keydown'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('mention')
      const inputId = useId()
      const { t } = useLocale()
      const { nextZIndex } = useZIndex()
      const { themeStyle } = useComponentTheme(
        'mention',
        computed(() => props.themeOverrides)
      )
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const mentionSize = computed(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const mentionDisabled = computed(
        () => props.disabled || (form == null ? void 0 : form.disabled) || false
      )
      const inputRef = ref()
      const wrapperRef = ref()
      const dropdownRef = ref()
      const focused = ref(false)
      const hovering = ref(false)
      const dropdownVisible = ref(false)
      const isClickingDropdown = ref(false)
      const highlightedIndex = ref(-1)
      const dropdownZIndex = ref(nextZIndex())
      const triggerPos = ref(null)
      const filteredOptions = computed(() => {
        var _a, _b
        const keyword =
          (_b = (_a = triggerPos.value) == null ? void 0 : _a.keyword) != null ? _b : ''
        return props.options.filter((opt) => {
          var _a2
          if (props.filterOption === false) return true
          if (typeof props.filterOption === 'function') {
            return props.filterOption(keyword, opt)
          }
          const text = ((_a2 = opt.label) != null ? _a2 : opt.value).toLowerCase()
          return text.includes(keyword.toLowerCase())
        })
      })
      const groupedOptions = computed(() => {
        var _a
        const map = /* @__PURE__ */ new Map()
        for (const opt of filteredOptions.value) {
          const g = (_a = opt.group) != null ? _a : ''
          if (!map.has(g)) map.set(g, [])
          map.get(g).push(opt)
        }
        return map
      })
      const wrapperClasses = computed(() => [
        ns.b(),
        ns.m(mentionSize.value),
        ns.is('disabled', mentionDisabled.value),
        ns.is('focused', focused.value),
        ns.is('textarea', props.type === 'textarea'),
        !!slots.prefix || !!props.prefixIcon ? ns.is('prefix', true) : '',
        !!slots.suffix || !!props.suffixIcon || props.clearable ? ns.is('suffix', true) : ''
      ])
      const dropdownStyle = ref({})
      const updateDropdownPosition = () => {
        if (!wrapperRef.value || !props.teleported) return
        const rect = wrapperRef.value.getBoundingClientRect()
        const style = {
          position: 'fixed',
          zIndex: String(dropdownZIndex.value),
          minWidth: `${rect.width}px`
        }
        if (props.placement === 'top') {
          style.bottom = `${window.innerHeight - rect.top + 4}px`
          style.left = `${rect.left}px`
        } else {
          style.top = `${rect.bottom + 4}px`
          style.left = `${rect.left}px`
        }
        dropdownStyle.value = style
      }
      watch(dropdownVisible, (val) => {
        if (val) {
          dropdownZIndex.value = nextZIndex()
          nextTick(updateDropdownPosition)
          emit('open')
        } else {
          emit('close')
        }
      })
      const parseTrigger = (value, cursorIndex) => {
        for (const trigger of props.triggers) {
          const segment = value.substring(0, cursorIndex)
          const lastIdx = segment.lastIndexOf(trigger)
          if (lastIdx === -1) continue
          const after = segment.substring(lastIdx + trigger.length)
          if (/\s/.test(after)) continue
          const before = segment[lastIdx - 1]
          if (before !== void 0 && !/[\s\n]/.test(before)) continue
          return {
            index: lastIdx,
            trigger,
            keyword: after
          }
        }
        return null
      }
      let debounceTimer = null
      const debouncedSearch = (keyword, trigger) => {
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          emit('search', keyword, trigger)
        }, props.debounce)
      }
      const handleInput = (event) => {
        const target = event.target
        const value = target.value
        const rawCursor = target.selectionStart
        const cursor =
          rawCursor === null || (rawCursor === 0 && value.length > 0) ? value.length : rawCursor
        emit('update:modelValue', value)
        emit('input', value)
        const hit = parseTrigger(value, cursor)
        if (hit) {
          triggerPos.value = hit
          dropdownVisible.value = true
          highlightedIndex.value = 0
          debouncedSearch(hit.keyword, hit.trigger)
        } else {
          dropdownVisible.value = false
          triggerPos.value = null
        }
      }
      const handleChange = (event) => {
        const target = event.target
        emit('change', target.value)
        if (props.validateEvent) triggerValidate('change')
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
      }
      const handleBlur = (event) => {
        setTimeout(() => {
          if (!isClickingDropdown.value) {
            focused.value = false
            dropdownVisible.value = false
            triggerPos.value = null
            emit('blur', event)
            if (props.validateEvent) triggerValidate('blur')
          }
        }, 150)
      }
      const handleKeydown = (event) => {
        emit('keydown', event)
        if (!dropdownVisible.value) return
        const total = filteredOptions.value.length
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            highlightedIndex.value = (highlightedIndex.value + 1) % total
            break
          case 'ArrowUp':
            event.preventDefault()
            highlightedIndex.value = (highlightedIndex.value - 1 + total) % total
            break
          case 'Enter':
            event.preventDefault()
            if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
              selectOption(filteredOptions.value[highlightedIndex.value])
            }
            break
          case 'Escape':
            event.preventDefault()
            dropdownVisible.value = false
            triggerPos.value = null
            break
          case 'Tab':
            if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
              event.preventDefault()
              selectOption(filteredOptions.value[highlightedIndex.value])
            } else {
              dropdownVisible.value = false
            }
            break
        }
      }
      const selectOption = (option) => {
        var _a, _b
        if (option.disabled || !triggerPos.value) return
        const { index, trigger } = triggerPos.value
        const before = ((_a = props.modelValue) != null ? _a : '').substring(0, index)
        const after = (() => {
          var _a2, _b2, _c, _d
          const cursor =
            (_c = (_a2 = inputRef.value) == null ? void 0 : _a2.selectionStart) != null
              ? _c
              : ((_b2 = props.modelValue) != null ? _b2 : '').length
          return ((_d = props.modelValue) != null ? _d : '').substring(cursor)
        })()
        const label = (_b = option.label) != null ? _b : option.value
        const insertText = props.wholeWord
          ? `${trigger}${label}${props.split}`
          : `${trigger}${label}${props.split}`
        const newValue = before + insertText + after
        emit('update:modelValue', newValue)
        emit('select', option, trigger)
        dropdownVisible.value = false
        triggerPos.value = null
        nextTick(() => {
          const el = inputRef.value
          if (!el) return
          const pos = before.length + insertText.length
          el.setSelectionRange(pos, pos)
          el.focus()
        })
        if (props.validateEvent) triggerValidate('change')
      }
      const showClear = computed(
        () =>
          props.clearable &&
          !mentionDisabled.value &&
          !props.readonly &&
          !!props.modelValue &&
          (focused.value || hovering.value)
      )
      const handleClear = () => {
        emit('update:modelValue', '')
        emit('change', '')
        emit('clear')
        dropdownVisible.value = false
        triggerPos.value = null
        nextTick(() => focus())
      }
      const handleOutsideClick = (e) => {
        var _a, _b
        const target = e.target
        if (
          ((_a = wrapperRef.value) == null ? void 0 : _a.contains(target)) ||
          ((_b = dropdownRef.value) == null ? void 0 : _b.contains(target))
        )
          return
        dropdownVisible.value = false
        triggerPos.value = null
      }
      const handleResize = () => {
        if (dropdownVisible.value) updateDropdownPosition()
      }
      onMounted(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('click', handleOutsideClick)
          window.addEventListener('resize', handleResize)
          if (props.teleported) {
            window.addEventListener('scroll', handleResize, true)
          }
        }
      })
      onBeforeUnmount(() => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('click', handleOutsideClick)
          window.removeEventListener('resize', handleResize)
          if (props.teleported) {
            window.removeEventListener('scroll', handleResize, true)
          }
        }
        if (debounceTimer) clearTimeout(debounceTimer)
      })
      const insertMention = (option, trigger) => {
        var _a, _b, _c, _d, _e
        const t2 = (_a = trigger != null ? trigger : props.triggers[0]) != null ? _a : '@'
        const label = (_b = option.label) != null ? _b : option.value
        const insertText = `${t2}${label}${props.split}`
        const current = (_c = props.modelValue) != null ? _c : ''
        const cursor =
          (_e = (_d = inputRef.value) == null ? void 0 : _d.selectionStart) != null
            ? _e
            : current.length
        const newValue = current.substring(0, cursor) + insertText + current.substring(cursor)
        emit('update:modelValue', newValue)
      }
      const focus = () => {
        var _a
        return (_a = inputRef.value) == null ? void 0 : _a.focus()
      }
      const blur = () => {
        var _a
        return (_a = inputRef.value) == null ? void 0 : _a.blur()
      }
      const clear = () => handleClear()
      __expose({
        get ref() {
          return inputRef.value
        },
        get wrapperRef() {
          return wrapperRef.value
        },
        focus,
        blur,
        clear,
        insertMention
      })
      const textLength = computed(() => {
        var _a
        return ((_a = props.modelValue) != null ? _a : '').length
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        inputId,
        t,
        nextZIndex,
        themeStyle,
        form,
        formItem,
        triggerValidate,
        globalSize,
        mentionSize,
        mentionDisabled,
        inputRef,
        wrapperRef,
        dropdownRef,
        focused,
        hovering,
        dropdownVisible,
        isClickingDropdown,
        highlightedIndex,
        dropdownZIndex,
        triggerPos,
        filteredOptions,
        groupedOptions,
        wrapperClasses,
        dropdownStyle,
        updateDropdownPosition,
        parseTrigger,
        get debounceTimer() {
          return debounceTimer
        },
        set debounceTimer(v) {
          debounceTimer = v
        },
        debouncedSearch,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleKeydown,
        selectOption,
        showClear,
        handleClear,
        handleOutsideClick,
        handleResize,
        insertMention,
        focus,
        blur,
        clear,
        textLength,
        ref,
        computed,
        watch,
        nextTick,
        onMounted,
        onBeforeUnmount,
        useSlots,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useId() {
          return useId
        },
        get useZIndex() {
          return useZIndex
        },
        get useLocale() {
          return useLocale
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
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
