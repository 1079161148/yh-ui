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
  vModelText as _vModelText,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  withDirectives as _withDirectives,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  createTextVNode as _createTextVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  createBlock as _createBlock,
  withCtx as _withCtx,
  createVNode as _createVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['placeholder', 'disabled', 'aria-label']
const _hoisted_2 = ['disabled']
const _hoisted_3 = ['value', 'disabled', 'placeholder']
const _hoisted_4 = ['value', 'disabled', 'placeholder']
const _hoisted_5 = ['value', 'disabled', 'placeholder']
const _hoisted_6 = ['value', 'disabled', 'placeholder']
const _hoisted_7 = ['value', 'disabled', 'placeholder']
const _hoisted_8 = ['value', 'disabled', 'placeholder']
const _hoisted_9 = ['value', 'disabled', 'placeholder']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([$setup.ns.b(), $setup.ns.is('disabled', _ctx.disabled)]),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' \u667A\u80FD\u8BC6\u522B\u533A '),
        _ctx.showParser
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('parser'))
              },
              [
                _withDirectives(
                  _createElementVNode(
                    'textarea',
                    {
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = ($event) => ($setup.rawText = $event)),
                      class: _normalizeClass($setup.ns.e('parser-input')),
                      placeholder: $setup.placeholder,
                      disabled: _ctx.disabled,
                      rows: '3',
                      'aria-label': $setup.t('smartaddress.parse')
                    },
                    null,
                    10,
                    _hoisted_1
                  ),
                  [[_vModelText, $setup.rawText]]
                ),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('parser-actions'))
                  },
                  [
                    $setup.parseTip
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass([
                              $setup.ns.e('parser-tip'),
                              $setup.ns.is('success', $setup.parseStatus === 'success'),
                              $setup.ns.is('error', $setup.parseStatus === 'error')
                            ])
                          },
                          _toDisplayString($setup.parseTip),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createElementVNode(
                      'button',
                      {
                        class: _normalizeClass($setup.ns.e('parse-btn')),
                        disabled: _ctx.disabled || !$setup.rawText.trim(),
                        onClick: $setup.handleParse
                      },
                      [
                        _renderSlot(_ctx.$slots, 'parse-icon', {}, () => [
                          _cache[12] ||
                            (_cache[12] = _createTextVNode(
                              '\u2726',
                              -1
                              /* CACHED */
                            ))
                        ]),
                        _createTextVNode(
                          ' ' + _toDisplayString($setup.btnText),
                          1
                          /* TEXT */
                        )
                      ],
                      10,
                      _hoisted_2
                    )
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u7ED3\u6784\u5316\u5B57\u6BB5 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass([
              $setup.ns.e('fields'),
              $setup.ns.is('top', _ctx.labelPlacement === 'top')
            ])
          },
          [
            _createCommentVNode(' \u59D3\u540D '),
            _ctx.showName
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('field'))
                  },
                  [
                    _createElementVNode(
                      'label',
                      {
                        class: _normalizeClass([
                          $setup.ns.e('label'),
                          $setup.ns.is('required', _ctx.required)
                        ])
                      },
                      _toDisplayString($setup.t('smartaddress.name')),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'input',
                      {
                        class: _normalizeClass($setup.ns.e('input')),
                        value: $setup.innerVal.name,
                        disabled: _ctx.disabled,
                        placeholder: `${$setup.t('smartaddress.name')}...`,
                        onInput:
                          _cache[1] ||
                          (_cache[1] = (e) => $setup.updateField('name', e.target.value))
                      },
                      null,
                      42,
                      _hoisted_3
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u624B\u673A\u53F7 '),
            _ctx.showPhone
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('field'))
                  },
                  [
                    _createElementVNode(
                      'label',
                      {
                        class: _normalizeClass([
                          $setup.ns.e('label'),
                          $setup.ns.is('required', _ctx.required)
                        ])
                      },
                      _toDisplayString($setup.t('smartaddress.phone')),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'input',
                      {
                        class: _normalizeClass($setup.ns.e('input')),
                        value: $setup.innerVal.phone,
                        disabled: _ctx.disabled,
                        type: 'tel',
                        inputmode: 'numeric',
                        maxlength: '11',
                        placeholder: `${$setup.t('smartaddress.phone')}...`,
                        onInput:
                          _cache[2] ||
                          (_cache[2] = (e) => $setup.updateField('phone', e.target.value))
                      },
                      null,
                      42,
                      _hoisted_4
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(
              ' \u7701/\u5E02/\u533A \u4E09\u4E2A\u4E0B\u62C9\uFF08\u5F53\u524D\u7B80\u5316\u4E3A input\uFF0C\u53EF\u7531\u5916\u90E8\u63D2\u69FD\u66FF\u6362\u4E3A Cascader\uFF09 '
            ),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass([$setup.ns.e('field'), $setup.ns.e('region')])
              },
              [
                _createElementVNode(
                  'label',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('label'),
                      $setup.ns.is('required', _ctx.required)
                    ])
                  },
                  _toDisplayString($setup.t('smartaddress.province')),
                  3
                  /* TEXT, CLASS */
                ),
                _renderSlot(
                  _ctx.$slots,
                  'region',
                  {
                    value: $setup.innerVal,
                    update: $setup.updateField
                  },
                  () => [
                    _createCommentVNode(' \u8F93\u5165\u6846\u6A21\u5F0F '),
                    _ctx.regionType === 'input'
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('region-inputs'))
                          },
                          [
                            _createElementVNode(
                              'input',
                              {
                                class: _normalizeClass($setup.ns.e('input')),
                                value: $setup.innerVal.province,
                                disabled: _ctx.disabled,
                                placeholder: $setup.t('smartaddress.province'),
                                onInput:
                                  _cache[3] ||
                                  (_cache[3] = (e) =>
                                    $setup.updateField('province', e.target.value))
                              },
                              null,
                              42,
                              _hoisted_5
                            ),
                            _createElementVNode(
                              'input',
                              {
                                class: _normalizeClass($setup.ns.e('input')),
                                value: $setup.innerVal.city,
                                disabled: _ctx.disabled,
                                placeholder: $setup.t('smartaddress.city'),
                                onInput:
                                  _cache[4] ||
                                  (_cache[4] = (e) => $setup.updateField('city', e.target.value))
                              },
                              null,
                              42,
                              _hoisted_6
                            ),
                            _createElementVNode(
                              'input',
                              {
                                class: _normalizeClass($setup.ns.e('input')),
                                value: $setup.innerVal.district,
                                disabled: _ctx.disabled,
                                placeholder: $setup.t('smartaddress.district'),
                                onInput:
                                  _cache[5] ||
                                  (_cache[5] = (e) =>
                                    $setup.updateField('district', e.target.value))
                              },
                              null,
                              42,
                              _hoisted_7
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _ctx.regionType === 'select'
                        ? (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 1 },
                            [
                              _createCommentVNode(' \u4E0B\u62C9\u6846\u6A21\u5F0F '),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('region-inputs'))
                                },
                                [
                                  _createVNode(
                                    $setup['YhSelect'],
                                    {
                                      'model-value': $setup.innerVal.province,
                                      disabled: _ctx.disabled,
                                      placeholder: $setup.t('smartaddress.province'),
                                      style: { flex: '1', 'min-width': '0' },
                                      'onUpdate:modelValue':
                                        _cache[6] ||
                                        (_cache[6] = (val) => {
                                          $setup.updateField('province', val)
                                          $setup.updateField('city', '')
                                          $setup.updateField('district', '')
                                        })
                                    },
                                    {
                                      default: _withCtx(() => [
                                        (_openBlock(true),
                                        _createElementBlock(
                                          _Fragment,
                                          null,
                                          _renderList($setup.provinceOptions, (opt) => {
                                            return (
                                              _openBlock(),
                                              _createBlock(
                                                $setup['YhOption'],
                                                {
                                                  key: opt.value,
                                                  label: opt.label,
                                                  value: opt.value
                                                },
                                                null,
                                                8,
                                                ['label', 'value']
                                              )
                                            )
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 1
                                      /* STABLE */
                                    },
                                    8,
                                    ['model-value', 'disabled', 'placeholder']
                                  ),
                                  _createVNode(
                                    $setup['YhSelect'],
                                    {
                                      'model-value': $setup.innerVal.city,
                                      disabled: _ctx.disabled,
                                      placeholder: $setup.t('smartaddress.city'),
                                      style: { flex: '1', 'min-width': '0' },
                                      'onUpdate:modelValue':
                                        _cache[7] ||
                                        (_cache[7] = (val) => {
                                          $setup.updateField('city', val)
                                          $setup.updateField('district', '')
                                        })
                                    },
                                    {
                                      default: _withCtx(() => [
                                        (_openBlock(true),
                                        _createElementBlock(
                                          _Fragment,
                                          null,
                                          _renderList($setup.cityOptions, (opt) => {
                                            return (
                                              _openBlock(),
                                              _createBlock(
                                                $setup['YhOption'],
                                                {
                                                  key: opt.value,
                                                  label: opt.label,
                                                  value: opt.value
                                                },
                                                null,
                                                8,
                                                ['label', 'value']
                                              )
                                            )
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 1
                                      /* STABLE */
                                    },
                                    8,
                                    ['model-value', 'disabled', 'placeholder']
                                  ),
                                  _createVNode(
                                    $setup['YhSelect'],
                                    {
                                      'model-value': $setup.innerVal.district,
                                      disabled: _ctx.disabled,
                                      placeholder: $setup.t('smartaddress.district'),
                                      style: { flex: '1', 'min-width': '0' },
                                      'onUpdate:modelValue':
                                        _cache[8] ||
                                        (_cache[8] = (val) => $setup.updateField('district', val))
                                    },
                                    {
                                      default: _withCtx(() => [
                                        (_openBlock(true),
                                        _createElementBlock(
                                          _Fragment,
                                          null,
                                          _renderList($setup.districtOptions, (opt) => {
                                            return (
                                              _openBlock(),
                                              _createBlock(
                                                $setup['YhOption'],
                                                {
                                                  key: opt.value,
                                                  label: opt.label,
                                                  value: opt.value
                                                },
                                                null,
                                                8,
                                                ['label', 'value']
                                              )
                                            )
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 1
                                      /* STABLE */
                                    },
                                    8,
                                    ['model-value', 'disabled', 'placeholder']
                                  )
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                        : _ctx.regionType === 'cascader'
                          ? (_openBlock(),
                            _createElementBlock(
                              _Fragment,
                              { key: 2 },
                              [
                                _createCommentVNode(' \u7EA7\u8054\u6A21\u5F0F '),
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('region-inputs'))
                                  },
                                  [
                                    _createVNode(
                                      $setup['YhCascader'],
                                      {
                                        modelValue: $setup.regionCascaderValue,
                                        'onUpdate:modelValue':
                                          _cache[9] ||
                                          (_cache[9] = ($event) =>
                                            ($setup.regionCascaderValue = $event)),
                                        options: $setup.cascaderOptions,
                                        disabled: _ctx.disabled,
                                        placeholder: $setup.t('smartaddress.province'),
                                        style: { width: '100%' }
                                      },
                                      null,
                                      8,
                                      ['modelValue', 'options', 'disabled', 'placeholder']
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              2112
                              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                            ))
                          : _createCommentVNode('v-if', true)
                  ]
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u8857\u9053\uFF08\u53EF\u9009\uFF09 '),
            _ctx.showStreet
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 2,
                    class: _normalizeClass($setup.ns.e('field'))
                  },
                  [
                    _createElementVNode(
                      'label',
                      {
                        class: _normalizeClass($setup.ns.e('label'))
                      },
                      _toDisplayString($setup.t('smartaddress.street')),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'input',
                      {
                        class: _normalizeClass($setup.ns.e('input')),
                        value: $setup.innerVal.street,
                        disabled: _ctx.disabled,
                        placeholder: `${$setup.t('smartaddress.street')}...`,
                        onInput:
                          _cache[10] ||
                          (_cache[10] = (e) => $setup.updateField('street', e.target.value))
                      },
                      null,
                      42,
                      _hoisted_8
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u8BE6\u7EC6\u5730\u5740 '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('field'))
              },
              [
                _createElementVNode(
                  'label',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('label'),
                      $setup.ns.is('required', _ctx.required)
                    ])
                  },
                  _toDisplayString($setup.t('smartaddress.detail')),
                  3
                  /* TEXT, CLASS */
                ),
                _createElementVNode(
                  'input',
                  {
                    class: _normalizeClass($setup.ns.e('input')),
                    value: $setup.innerVal.detail,
                    disabled: _ctx.disabled,
                    placeholder: `${$setup.t('smartaddress.detail')}...`,
                    onInput:
                      _cache[11] ||
                      (_cache[11] = (e) => $setup.updateField('detail', e.target.value))
                  },
                  null,
                  42,
                  _hoisted_9
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u81EA\u5B9A\u4E49\u6269\u5C55\u5B57\u6BB5\u533A '),
            _renderSlot(_ctx.$slots, 'extra', {
              value: $setup.innerVal,
              update: $setup.updateField
            })
          ],
          2
          /* CLASS */
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, reactive } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useLocale } from '../../../hooks/index.js'
import { smartAddressProps, smartAddressEmits } from './smart-address-meta.js'
import { parseAddress } from './use-address-parser.js'
import { YhSelect, YhOption } from '../../select.js'
import { YhCascader } from '../../cascader.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhSmartAddress' },
  {
    __name: 'smart-address',
    props: smartAddressProps,
    emits: smartAddressEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('smart-address')
      const { themeStyle } = useComponentTheme(
        'smart-address',
        computed(() => props.themeOverrides)
      )
      const { t, tRaw } = useLocale()
      const rawText = ref('')
      const parseStatus = ref('idle')
      const parseTip = ref('')
      function getValueByLabel(options, label) {
        if (!label) return null
        const match = options.find((opt) => opt[props.labelField] === label)
        return match ? match[props.valueField] : null
      }
      function handleParse() {
        if (!rawText.value.trim()) return
        const getKw = (p) => {
          const res = tRaw(p)
          return Array.isArray(res) ? res : void 0
        }
        const parseOptions = {
          provinceKeywords: getKw('smartaddress.provinceKeywords'),
          cityKeywords: getKw('smartaddress.cityKeywords'),
          districtKeywords: getKw('smartaddress.districtKeywords'),
          streetKeywords: getKw('smartaddress.streetKeywords')
        }
        const result = props.parser
          ? props.parser(rawText.value)
          : parseAddress(rawText.value, parseOptions)
        const hasRegion = result.province || result.city || result.district || result.detail
        if (!hasRegion && !result.phone && !result.name) {
          parseStatus.value = 'error'
          parseTip.value = t('smartaddress.parseFailed')
          return
        }
        const provinceVal = getValueByLabel(props.regionOptions, result.province) || result.province
        let cityVal = result.city
        const provinceMatch = props.regionOptions.find(
          (opt) => opt[props.labelField] === result.province
        )
        const provinceChildren =
          (provinceMatch == null ? void 0 : provinceMatch[props.childrenField]) || []
        if (provinceChildren.length) {
          cityVal = getValueByLabel(provinceChildren, result.city) || result.city
        }
        let districtVal = result.district
        const cityMatch = provinceChildren.find((opt) => opt[props.labelField] === result.city)
        const cityChildren = (cityMatch == null ? void 0 : cityMatch[props.childrenField]) || []
        if (cityChildren.length) {
          districtVal = getValueByLabel(cityChildren, result.district) || result.district
        }
        const newVal = {
          name: result.name || innerVal.name,
          phone: result.phone || innerVal.phone,
          province: provinceVal || innerVal.province,
          city: cityVal || innerVal.city,
          district: districtVal || innerVal.district,
          street: result.street || innerVal.street,
          detail: result.detail || innerVal.detail
        }
        Object.assign(innerVal, newVal)
        parseStatus.value = 'success'
        parseTip.value = t('smartaddress.parseSuccess')
        rawText.value = ''
        emit('update:modelValue', __spreadValues({}, innerVal))
        emit('parsed', result)
        emit('change', __spreadValues({}, innerVal))
        setTimeout(() => {
          parseStatus.value = 'idle'
          parseTip.value = ''
        }, 3e3)
      }
      const innerVal = reactive(__spreadValues({}, props.modelValue))
      function updateField(field, value) {
        innerVal[field] = value
        emit('update:modelValue', __spreadValues({}, innerVal))
        emit('change', __spreadValues({}, innerVal))
      }
      const provinceOptions = computed(() => {
        return props.regionOptions.map((p) => ({
          label: p[props.labelField] || '',
          value: p[props.valueField] || ''
        }))
      })
      const cityOptions = computed(() => {
        if (!innerVal.province) return []
        const p = props.regionOptions.find((opt) => opt[props.valueField] === innerVal.province)
        const children = (p == null ? void 0 : p[props.childrenField]) || []
        if (children.length) {
          return children.map((c) => ({
            label: c[props.labelField] || '',
            value: c[props.valueField] || ''
          }))
        }
        return []
      })
      const districtOptions = computed(() => {
        if (!innerVal.province || !innerVal.city) return []
        const p = props.regionOptions.find((opt) => opt[props.valueField] === innerVal.province)
        const provinceChildren = (p == null ? void 0 : p[props.childrenField]) || []
        if (provinceChildren.length) {
          const c = provinceChildren.find((child) => child[props.valueField] === innerVal.city)
          const cityChildren = (c == null ? void 0 : c[props.childrenField]) || []
          if (cityChildren.length) {
            return cityChildren.map((d) => ({
              label: d[props.labelField] || '',
              value: d[props.valueField] || ''
            }))
          }
        }
        return []
      })
      const cascaderOptions = computed(() => {
        const transform = (opts) => {
          return opts.map((opt) => ({
            label: opt[props.labelField] || '',
            value: opt[props.valueField] || '',
            children: opt[props.childrenField] ? transform(opt[props.childrenField]) : void 0
          }))
        }
        return transform(props.regionOptions)
      })
      const regionCascaderValue = computed({
        get() {
          const vals = []
          if (innerVal.province) vals.push(innerVal.province)
          if (innerVal.city) vals.push(innerVal.city)
          if (innerVal.district) vals.push(innerVal.district)
          return vals
        },
        set(val) {
          const arr = val
          if (Array.isArray(arr)) {
            updateField('province', arr[0] || '')
            updateField('city', arr[1] || '')
            updateField('district', arr[2] || '')
          } else {
            updateField('province', '')
            updateField('city', '')
            updateField('district', '')
          }
        }
      })
      const placeholder = computed(() => props.parsePlaceholder || t('smartaddress.placeholder'))
      const btnText = computed(() => props.parseButtonText || t('smartaddress.parse'))
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        t,
        tRaw,
        rawText,
        parseStatus,
        parseTip,
        getValueByLabel,
        handleParse,
        innerVal,
        updateField,
        provinceOptions,
        cityOptions,
        districtOptions,
        cascaderOptions,
        regionCascaderValue,
        placeholder,
        btnText,
        ref,
        computed,
        reactive,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useLocale() {
          return useLocale
        },
        get smartAddressProps() {
          return smartAddressProps
        },
        get smartAddressEmits() {
          return smartAddressEmits
        },
        get parseAddress() {
          return parseAddress
        },
        get YhSelect() {
          return YhSelect
        },
        get YhOption() {
          return YhOption
        },
        get YhCascader() {
          return YhCascader
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
