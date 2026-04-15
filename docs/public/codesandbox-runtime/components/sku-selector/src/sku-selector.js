import {
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  createElementVNode as _createElementVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['aria-checked', 'aria-disabled', 'onClick']
const _hoisted_2 = ['src', 'alt']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m(_ctx.size),
          $setup.ns.is('disabled', _ctx.disabled)
        ]),
        style: _normalizeStyle([
          $setup.themeStyle,
          {
            '--yh-sku-img-size': $setup.imgSizePx
          }
        ]),
        role: 'group'
      },
      [
        _ctx.showSelectedSummary
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('summary'))
              },
              [
                _renderSlot(
                  _ctx.$slots,
                  'summary',
                  {
                    summary: $setup.selectedSummary,
                    sku: $setup.selectedSku
                  },
                  () => [
                    $setup.selectedSummary
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('summary-text'))
                          },
                          _toDisplayString($setup.selectedSummary),
                          3
                          /* TEXT, CLASS */
                        ))
                      : (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 1,
                            class: _normalizeClass($setup.ns.e('summary-placeholder'))
                          },
                          _toDisplayString($setup.summaryPlaceholder),
                          3
                          /* TEXT, CLASS */
                        ))
                  ]
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.specs, (spec, index) => {
            return (
              _openBlock(),
              _createElementBlock(
                'div',
                {
                  key: spec.id,
                  class: _normalizeClass($setup.ns.e('item'))
                },
                [
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('label'))
                    },
                    [
                      _renderSlot(_ctx.$slots, 'label', { spec }, () => [
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('label-name'))
                          },
                          _toDisplayString(spec.name),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  ),
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass([
                        $setup.ns.e('values'),
                        spec.mode ? $setup.ns.em('values', spec.mode) : ''
                      ])
                    },
                    [
                      (_openBlock(true),
                      _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(spec.values, (value) => {
                          return (
                            _openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: value.id,
                                class: _normalizeClass([
                                  $setup.ns.e('value'),
                                  spec.mode ? $setup.ns.em('value', spec.mode) : '',
                                  $setup.ns.is('active', $setup.isValueActive(value.id)),
                                  $setup.ns.is(
                                    'disabled',
                                    !$setup.isValueSelectable(index, value.id)
                                  )
                                ]),
                                role: 'radio',
                                'aria-checked': $setup.isValueActive(value.id),
                                'aria-disabled': !$setup.isValueSelectable(index, value.id),
                                onClick: ($event) => $setup.handleValueClick(index, spec, value)
                              },
                              [
                                _renderSlot(
                                  _ctx.$slots,
                                  'value',
                                  {
                                    value,
                                    spec,
                                    active: $setup.isValueActive(value.id),
                                    disabled: !$setup.isValueSelectable(index, value.id)
                                  },
                                  () => [
                                    spec.mode === 'color'
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'span',
                                          {
                                            key: 0,
                                            class: _normalizeClass($setup.ns.e('color-swatch')),
                                            style: _normalizeStyle({
                                              backgroundColor: value.color
                                            })
                                          },
                                          null,
                                          6
                                          /* CLASS, STYLE */
                                        ))
                                      : spec.mode === 'image'
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'span',
                                            {
                                              key: 1,
                                              class: _normalizeClass($setup.ns.e('img-wrap'))
                                            },
                                            [
                                              value.image
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'img',
                                                    {
                                                      key: 0,
                                                      src: value.image,
                                                      alt: value.name,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('item-img')
                                                      )
                                                    },
                                                    null,
                                                    10,
                                                    _hoisted_2
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            2
                                            /* CLASS */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass($setup.ns.e('value-name'))
                                      },
                                      _toDisplayString(value.name),
                                      3
                                      /* TEXT, CLASS */
                                    ),
                                    value.tag
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'span',
                                          {
                                            key: 2,
                                            class: _normalizeClass($setup.ns.e('value-tag'))
                                          },
                                          _toDisplayString(value.tag),
                                          3
                                          /* TEXT, CLASS */
                                        ))
                                      : _createCommentVNode('v-if', true)
                                  ]
                                )
                              ],
                              10,
                              _hoisted_1
                            )
                          )
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            )
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed } from 'vue'
import { useLocale, useSKU } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { skuSelectorProps, skuSelectorEmits } from './sku-selector-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhSkuSelector' },
  {
    __name: 'sku-selector',
    props: skuSelectorProps,
    emits: skuSelectorEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('sku-selector')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'sku-selector',
        computed(() => props.themeOverrides)
      )
      const { selectedValueIds, isValueSelectable, selectedSku, toggleValue } = useSKU(
        props.specs,
        props.skus,
        props.modelValue
      )
      const handleValueClick = (index, spec, value) => {
        emit('select', spec, value)
        if (isValueActive(value.id) && !props.allowUnselect) return
        if (props.disabled || !isValueSelectable(index, value.id)) return
        toggleValue(index, value.id)
        emit('update:modelValue', [...selectedValueIds.value])
        emit('change', selectedSku.value, [...selectedValueIds.value])
      }
      const isValueActive = (valueId) => {
        return selectedValueIds.value.includes(valueId)
      }
      const summaryPrefixText = computed(() => props.summaryPrefix || t('skuselector.selected'))
      const summaryPlaceholder = computed(() => t('skuselector.placeholder'))
      const selectedSummary = computed(() => {
        if (!props.showSelectedSummary) return ''
        const names = props.specs
          .map((spec) => {
            var _a, _b
            const selectedId = selectedValueIds.value.find((id) =>
              spec.values.some((v) => v.id === id)
            )
            return (_b =
              (_a = spec.values.find((v) => v.id === selectedId)) == null ? void 0 : _a.name) !=
              null
              ? _b
              : ''
          })
          .filter(Boolean)
        return names.length ? `${summaryPrefixText.value}: ${names.join(' / ')}` : ''
      })
      const imgSizePx = computed(() => `${props.imageSize}px`)
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        selectedValueIds,
        isValueSelectable,
        selectedSku,
        toggleValue,
        handleValueClick,
        isValueActive,
        summaryPrefixText,
        summaryPlaceholder,
        selectedSummary,
        imgSizePx,
        computed,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useSKU() {
          return useSKU
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get skuSelectorProps() {
          return skuSelectorProps
        },
        get skuSelectorEmits() {
          return skuSelectorEmits
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
