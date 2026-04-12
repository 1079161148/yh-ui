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
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  withModifiers as _withModifiers,
  renderSlot as _renderSlot,
  createTextVNode as _createTextVNode,
  withCtx as _withCtx,
  createVNode as _createVNode,
  vShow as _vShow,
  normalizeStyle as _normalizeStyle,
  withDirectives as _withDirectives,
  Transition as _Transition,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = ['onClick']
const _hoisted_2 = ['id', 'value', 'placeholder', 'disabled', 'readonly', 'aria-expanded']
const _hoisted_3 = ['onClick']
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
            _createCommentVNode(' \u591A\u9009\u6807\u7B7E '),
            $setup.isMultiple
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.displayTags, (tag) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'span',
                            {
                              key: tag.path.join(','),
                              class: _normalizeClass([
                                $setup.ns.e('tag'),
                                $props.tagType ? `yh-tag--${$props.tagType}` : ''
                              ])
                            },
                            [
                              _createElementVNode(
                                'span',
                                {
                                  class: _normalizeClass($setup.ns.e('tag-text'))
                                },
                                _toDisplayString(tag.text),
                                3
                                /* TEXT, CLASS */
                              ),
                              _createElementVNode(
                                'span',
                                {
                                  class: _normalizeClass($setup.ns.e('tag-close')),
                                  onClick: ($event) => $setup.handleRemoveTag(tag.path, $event)
                                },
                                [
                                  ...(_cache[0] ||
                                    (_cache[0] = [
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
                                            d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'
                                          })
                                        ],
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ],
                                10,
                                _hoisted_1
                              )
                            ],
                            2
                            /* CLASS */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    $setup.collapsedCount > 0
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('tag'))
                          },
                          ' +' + _toDisplayString($setup.collapsedCount),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u8F93\u5165\u6846 '),
            _createElementVNode(
              'input',
              {
                ref: 'inputRef',
                id: $setup.inputId,
                class: _normalizeClass($setup.ns.e('inner')),
                value: $props.filterable ? $setup.query : '',
                placeholder: $setup.hasValue
                  ? ''
                  : $props.placeholder || $setup.t('cascader.placeholder'),
                disabled: $props.disabled,
                readonly: !$props.filterable,
                autocomplete: 'off',
                role: 'combobox',
                'aria-expanded': $setup.visible,
                onInput: $setup.handleInput,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur
              },
              null,
              42,
              _hoisted_2
            ),
            _createCommentVNode(' \u5355\u9009\u663E\u793A\u503C '),
            !$setup.isMultiple && $setup.hasValue && !$setup.query
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('selected-value'))
                  },
                  _toDisplayString($setup.presentText),
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
                        ...(_cache[1] ||
                          (_cache[1] = [
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
                        ref: 'dropdownRef',
                        class: _normalizeClass([$setup.ns.e('dropdown'), $props.popperClass]),
                        style: _normalizeStyle($props.teleported ? $setup.dropdownStyle : {}),
                        onMousedown: $setup.handleDropdownMousedown,
                        onMouseup: $setup.handleDropdownMouseup
                      },
                      [
                        _createCommentVNode(' \u8FC7\u6EE4\u5EFA\u8BAE '),
                        $props.filterable && $setup.query && $setup.filteredSuggestions.length > 0
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('suggestions'))
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList($setup.filteredSuggestions, (suggestion) => {
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: suggestion.path.join(','),
                                          class: _normalizeClass([
                                            $setup.ns.e('suggestion'),
                                            $setup.ns.is(
                                              'checked',
                                              $setup.isChecked(suggestion.path)
                                            )
                                          ]),
                                          onClick: _withModifiers(
                                            ($event) => $setup.handleSelectSuggestion(suggestion),
                                            ['stop']
                                          )
                                        },
                                        _toDisplayString(suggestion.labels.join($props.separator)),
                                        11,
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
                          : $props.filterable &&
                              $setup.query &&
                              $setup.filteredSuggestions.length === 0
                            ? (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 1 },
                                [
                                  _createCommentVNode(' \u65E0\u5339\u914D\u6570\u636E '),
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('empty'))
                                    },
                                    [
                                      _renderSlot(_ctx.$slots, 'empty', {}, () => [
                                        _createTextVNode(
                                          _toDisplayString($setup.t('cascader.noMatch')),
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
                                  _createCommentVNode(' \u7EA7\u8054\u9762\u677F '),
                                  _createVNode(
                                    $setup['CascaderPanel'],
                                    {
                                      options: $props.options,
                                      'expanded-path': $setup.expandedPath,
                                      config: $setup.config,
                                      'is-multiple': $setup.isMultiple,
                                      virtual: $props.virtual,
                                      'item-height': $props.virtualItemHeight,
                                      onExpand: $setup.handleExpand,
                                      onCheck: $setup.handleCheck,
                                      'is-checked': $setup.isChecked
                                    },
                                    {
                                      default: _withCtx(({ node, data }) => [
                                        _renderSlot(_ctx.$slots, 'default', {
                                          node,
                                          data
                                        })
                                      ]),
                                      _: 3
                                      /* FORWARDED */
                                    },
                                    8,
                                    [
                                      'options',
                                      'expanded-path',
                                      'config',
                                      'is-multiple',
                                      'virtual',
                                      'item-height'
                                    ]
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
import { computed, ref, watch, nextTick, provide, onMounted, onBeforeUnmount } from 'vue'
import { useFormItem, useId, useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { CascaderContextKey, defaultCascaderConfig } from './cascader-meta.js'
import CascaderPanel from './cascader-panel.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCascader'
  },
  {
    __name: 'cascader',
    props: {
      modelValue: { type: [String, Number, Array], required: false },
      options: { type: Array, required: false },
      placeholder: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: void 0 },
      filterable: { type: Boolean, required: false, default: false },
      filterMethod: { type: Function, required: false },
      separator: { type: String, required: false, default: ' / ' },
      showAllLevels: { type: Boolean, required: false, default: true },
      collapseTags: { type: Boolean, required: false, default: false },
      collapseTagsTooltip: { type: Boolean, required: false, default: false },
      maxCollapseTags: { type: Number, required: false, default: 1 },
      multiple: { type: Boolean, required: false, default: false },
      checkStrictly: { type: Boolean, required: false, default: false },
      expandTrigger: { type: String, required: false, default: void 0 },
      emitPath: { type: Boolean, required: false, default: true },
      virtual: { type: Boolean, required: false, default: false },
      virtualItemHeight: { type: Number, required: false, default: 34 },
      props: { type: Object, required: false },
      popperClass: { type: String, required: false },
      teleported: { type: Boolean, required: false, default: true },
      tagType: { type: String, required: false, default: '' },
      validateEvent: { type: Boolean, required: false, default: true },
      themeOverrides: { type: null, required: false }
    },
    emits: [
      'update:modelValue',
      'change',
      'focus',
      'blur',
      'clear',
      'expand-change',
      'visible-change'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('cascader')
      const { t } = useLocale()
      const inputId = useId()
      const { themeStyle } = useComponentTheme(
        'cascader',
        computed(() => props.themeOverrides)
      )
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const cascaderSize = computed(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const config = computed(() => {
        var _a, _b, _c, _d, _e, _f
        return __spreadProps(
          __spreadValues(__spreadValues({}, defaultCascaderConfig), props.props),
          {
            // 直接属性覆盖
            multiple:
              props.multiple || ((_a = props.props) == null ? void 0 : _a.multiple) || false,
            checkStrictly:
              props.checkStrictly ||
              ((_b = props.props) == null ? void 0 : _b.checkStrictly) ||
              false,
            expandTrigger:
              props.expandTrigger ||
              ((_c = props.props) == null ? void 0 : _c.expandTrigger) ||
              'click',
            emitPath:
              (_f =
                (_e = props.emitPath) != null
                  ? _e
                  : (_d = props.props) == null
                    ? void 0
                    : _d.emitPath) != null
                ? _f
                : true
          }
        )
      })
      const wrapperRef = ref()
      const inputRef = ref()
      const dropdownRef = ref()
      const visible = ref(false)
      const focused = ref(false)
      const hovering = ref(false)
      const query = ref('')
      const expandedPath = ref([])
      const isClickingDropdown = ref(false)
      const dropdownStyle = ref({})
      const updateDropdownPosition = () => {
        if (!wrapperRef.value || !props.teleported) return
        const rect = wrapperRef.value.getBoundingClientRect()
        const styles = window.getComputedStyle(wrapperRef.value)
        const primary = styles.getPropertyValue('--yh-color-primary').trim()
        const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
        const primaryLight9 = styles.getPropertyValue('--yh-color-primary-light-9').trim()
        dropdownStyle.value = {
          position: 'fixed',
          top: `${rect.bottom + 4}px`,
          left: `${rect.left}px`,
          minWidth: `${rect.width}px`,
          zIndex: '2000',
          '--yh-color-primary': primary,
          '--yh-color-primary-rgb': primaryRgb,
          '--yh-color-primary-light-9': primaryLight9
        }
      }
      watch(visible, (val) => {
        if (val && props.teleported) {
          nextTick(updateDropdownPosition)
        }
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
      const isMultiple = computed(() => config.value.multiple)
      const getPathLabels = (path) => {
        const labels = []
        let currentOptions = props.options || []
        for (const value of path) {
          const valKey = config.value.value
          const labelKey = config.value.label
          const childrenKey = config.value.children
          const option = currentOptions.find((o) => o[valKey] === value)
          if (option) {
            labels.push(String(option[labelKey] || ''))
            currentOptions = option[childrenKey] || []
          }
        }
        return labels
      }
      const findPathByValue = (targetValue, options) => {
        const valKey = config.value.value
        const childrenKey = config.value.children
        for (const option of options) {
          const val = option[valKey]
          const children = option[childrenKey]
          if (val === targetValue) return [val]
          if (children && children.length > 0) {
            const path = findPathByValue(targetValue, children)
            if (path) return [val, ...path]
          }
        }
        return null
      }
      const presentText = computed(() => {
        if (isMultiple.value) return ''
        const value = props.modelValue
        if (value === void 0 || value === null) return ''
        let path = []
        if (Array.isArray(value)) {
          path = value
        } else {
          path = findPathByValue(value, props.options || []) || []
        }
        if (path.length === 0) return ''
        const labels = getPathLabels(path)
        return props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
      })
      const presentTags = computed(() => {
        if (!isMultiple.value) return []
        const values = props.modelValue
        if (!Array.isArray(values) || values.length === 0) return []
        return values.map((v) => {
          let path = []
          if (Array.isArray(v)) {
            path = v
          } else {
            path = findPathByValue(v, props.options || []) || []
          }
          const labels = getPathLabels(path)
          return {
            path,
            text: props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
          }
        })
      })
      const displayTags = computed(() => {
        if (props.collapseTags) {
          return presentTags.value.slice(0, props.maxCollapseTags)
        }
        return presentTags.value
      })
      const collapsedCount = computed(() => {
        if (!isMultiple.value || !props.collapseTags) return 0
        return Math.max(0, presentTags.value.length - props.maxCollapseTags)
      })
      const showClear = computed(() => {
        if (!props.clearable || props.disabled || !hovering.value) return false
        if (isMultiple.value) {
          return Array.isArray(props.modelValue) && props.modelValue.length > 0
        } else {
          return (
            props.modelValue !== void 0 &&
            props.modelValue !== null &&
            (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
          )
        }
      })
      const hasValue = computed(() => {
        if (isMultiple.value) {
          return Array.isArray(props.modelValue) && props.modelValue.length > 0
        }
        return (
          props.modelValue !== void 0 &&
          props.modelValue !== null &&
          (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
        )
      })
      const filteredSuggestions = computed(() => {
        if (!props.filterable || !query.value) return []
        const results = []
        const keyword = query.value.toLowerCase()
        const traverse = (options, path, labels) => {
          const valKey = config.value.value
          const labelKey = config.value.label
          const childrenKey = config.value.children
          for (const option of options) {
            const value = option[valKey]
            const label = String(option[labelKey] || '')
            const children = option[childrenKey]
            const currentPath = [...path, value]
            const currentLabels = [...labels, label]
            const fullPathLabel = currentLabels.join(props.separator || ' / ').toLowerCase()
            const matches = props.filterMethod
              ? props.filterMethod(option, query.value)
              : fullPathLabel.includes(keyword)
            const isLeafNode = !children || children.length === 0
            if (matches && (isLeafNode || config.value.checkStrictly)) {
              results.push({ path: currentPath, labels: currentLabels })
            }
            if (children && children.length > 0) {
              traverse(children, currentPath, currentLabels)
            }
          }
        }
        traverse(props.options || [], [], [])
        return results
      })
      const wrapperClasses = computed(() => [
        ns.b(),
        ns.m(cascaderSize.value),
        ns.is('disabled', props.disabled),
        ns.is('focused', focused.value || visible.value)
      ])
      const handleExpand = (option, level) => {
        const value = option[config.value.value]
        expandedPath.value = [...expandedPath.value.slice(0, level), value]
        emit('expand-change', expandedPath.value)
      }
      const handleCheck = (option, path) => {
        const disabledKey = config.value.disabled
        if (option[disabledKey]) return
        if (isMultiple.value) {
          const values = (props.modelValue || []).slice()
          const pathStr = path.join(',')
          const index = values.findIndex((v) => v.join(',') === pathStr)
          if (index > -1) {
            values.splice(index, 1)
          } else {
            values.push(path)
          }
          emit('update:modelValue', values)
          emit('change', values)
        } else {
          const value = config.value.emitPath ? path : path[path.length - 1]
          emit('update:modelValue', value)
          emit('change', value)
          visible.value = false
        }
        if (props.validateEvent) {
          triggerValidate('change')
        }
        query.value = ''
      }
      const isChecked = (path) => {
        if (isMultiple.value) {
          const values = props.modelValue
          if (!values || !Array.isArray(values)) return false
          const pathStr = path.join(',')
          return values.some((v) => Array.isArray(v) && v.join(',') === pathStr)
        }
        const value = props.modelValue
        if (value === void 0 || value === null) return false
        if (config.value.emitPath) {
          if (!Array.isArray(value)) return false
          return value.join(',') === path.join(',')
        } else {
          return value === path[path.length - 1]
        }
      }
      const handleRemoveTag = (path, event) => {
        event.stopPropagation()
        if (props.disabled) return
        const values = (props.modelValue || []).slice()
        const pathStr = path.join(',')
        const index = values.findIndex((v) => v.join(',') === pathStr)
        if (index > -1) {
          values.splice(index, 1)
          emit('update:modelValue', values)
          emit('change', values)
          if (props.validateEvent) {
            triggerValidate('change')
          }
        }
      }
      const handleClear = (event) => {
        event.stopPropagation()
        const value = isMultiple.value || config.value.emitPath ? [] : void 0
        emit('update:modelValue', value)
        emit('change', value)
        emit('clear')
        query.value = ''
        expandedPath.value = []
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const toggleDropdown = () => {
        if (props.disabled) return
        visible.value = !visible.value
        emit('visible-change', visible.value)
        if (visible.value) {
          nextTick(() => {
            var _a
            if (props.filterable) {
              ;(_a = inputRef.value) == null ? void 0 : _a.focus()
            }
          })
        }
      }
      const handleSelectSuggestion = (suggestion) => {
        if (isMultiple.value) {
          const values = (props.modelValue || []).slice()
          const pathStr = suggestion.path.join(',')
          const index = values.findIndex((v) => v.join(',') === pathStr)
          if (index === -1) {
            values.push(suggestion.path)
            emit('update:modelValue', values)
            emit('change', values)
          }
        } else {
          const value = config.value.emitPath
            ? suggestion.path
            : suggestion.path[suggestion.path.length - 1]
          emit('update:modelValue', value)
          emit('change', value)
          visible.value = false
        }
        query.value = ''
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const handleInput = (event) => {
        const target = event.target
        query.value = target.value
        if (!visible.value && query.value) {
          visible.value = true
          emit('visible-change', true)
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
        emit('visible-change', false)
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
      const handleMouseEnter = () => {
        hovering.value = true
      }
      const handleMouseLeave = () => {
        hovering.value = false
      }
      const getCheckedNodes = (leafOnly = false) => {
        var _a, _b
        const nodes = []
        const findNode = (options, path, index) => {
          if (index >= path.length) return null
          const valKey = config.value.value
          const childrenKey = config.value.children
          const option = options.find((o) => o[valKey] === path[index])
          if (!option) return null
          if (index === path.length - 1) return option
          return findNode(option[childrenKey] || [], path, index + 1)
        }
        if (isMultiple.value) {
          const values = props.modelValue
          if (values && Array.isArray(values)) {
            for (const path of values) {
              const node = findNode(props.options || [], path, 0)
              if (
                node &&
                (!leafOnly || !((_a = node[config.value.children]) == null ? void 0 : _a.length))
              ) {
                nodes.push(node)
              }
            }
          }
        } else {
          const value = props.modelValue
          if (value) {
            const path = Array.isArray(value) ? value : findPathByValue(value, props.options || [])
            if (path) {
              const node = findNode(props.options || [], path, 0)
              if (
                node &&
                (!leafOnly || !((_b = node[config.value.children]) == null ? void 0 : _b.length))
              ) {
                nodes.push(node)
              }
            }
          }
        }
        return nodes
      }
      const focus = () => {
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.focus()
      }
      const blur = () => {
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.blur()
      }
      provide(CascaderContextKey, {
        props,
        config: computed(() => config.value),
        expandedPath: computed(() => expandedPath.value),
        checkedValue: computed(() => props.modelValue),
        handleExpand,
        handleCheck,
        isChecked
      })
      __expose({
        focus,
        blur,
        getCheckedNodes,
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
        cascaderSize,
        config,
        wrapperRef,
        inputRef,
        dropdownRef,
        visible,
        focused,
        hovering,
        query,
        expandedPath,
        isClickingDropdown,
        dropdownStyle,
        updateDropdownPosition,
        isMultiple,
        getPathLabels,
        findPathByValue,
        presentText,
        presentTags,
        displayTags,
        collapsedCount,
        showClear,
        hasValue,
        filteredSuggestions,
        wrapperClasses,
        handleExpand,
        handleCheck,
        isChecked,
        handleRemoveTag,
        handleClear,
        toggleDropdown,
        handleSelectSuggestion,
        handleInput,
        handleFocus,
        handleBlur,
        handleDropdownMousedown,
        handleDropdownMouseup,
        handleMouseEnter,
        handleMouseLeave,
        getCheckedNodes,
        focus,
        blur,
        computed,
        ref,
        watch,
        nextTick,
        provide,
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
        get CascaderContextKey() {
          return CascaderContextKey
        },
        get defaultCascaderConfig() {
          return defaultCascaderConfig
        },
        CascaderPanel
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
