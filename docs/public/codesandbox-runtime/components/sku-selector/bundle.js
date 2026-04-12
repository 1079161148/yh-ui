// docs/public/codesandbox-runtime/components/sku-selector/src/sku-selector.js
import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderList as _renderList,
  Fragment as _Fragment,
  createElementVNode as _createElementVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
import { computed as computed11 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from 'vue'
var defaultNamespace = 'yh'
var statePrefix = 'is-'
var namespaceContextKey = Symbol('namespaceContextKey')
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}
var useNamespace = (block) => {
  const namespace = useGlobalNamespace()
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }
  const e = (element) => {
    return element ? `${b()}__${element}` : ''
  }
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : ''
  }
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`
    }
    return value ? `${statePrefix}${state}` : ''
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`
  }
  const cssVarObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`
  }
  const cssVarBlockObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
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
var COMPONENT_THEME_KEY = Symbol('component-theme')
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style = {}
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })
    return style
  })
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed as computed2, inject as inject3, unref as unref3 } from 'vue'
var zIndexContextKey = Symbol('zIndexContextKey')
var zIndexCounterKey = Symbol('zIndexCounterKey')

// docs/public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed3 } from 'vue'
function useSKU(specs, skus, initialSelection = []) {
  const selectedValueIds = ref2(initialSelection)
  const pathDict = computed3(() => {
    const dict = {}
    skus.forEach((sku) => {
      if (sku.stock <= 0) return
      const powerSet = getPowerSet(sku.specValueIds)
      powerSet.forEach((path) => {
        const key = path.join(',')
        dict[key] = (dict[key] || 0) + sku.stock
      })
    })
    return dict
  })
  const isValueSelectable = (specIndex, valueId) => {
    const tempSelected = [...selectedValueIds.value]
    if (tempSelected[specIndex] === valueId) {
      tempSelected[specIndex] = ''
    } else {
      tempSelected[specIndex] = valueId
    }
    const query = tempSelected
      .filter((v) => !!v)
      .sort((a, b) => String(a).localeCompare(String(b)))
      .join(',')
    if (!query) return true
    return !!pathDict.value[query]
  }
  const toggleValue = (specIndex, valueId) => {
    if (selectedValueIds.value[specIndex] === valueId) {
      selectedValueIds.value[specIndex] = ''
    } else {
      selectedValueIds.value[specIndex] = valueId
    }
  }
  const selectedSku = computed3(() => {
    const completeSelection = selectedValueIds.value.every((v) => !!v)
    if (!completeSelection || selectedValueIds.value.length < specs.length) return null
    const targetKey = [...selectedValueIds.value]
      .sort((a, b) => String(a).localeCompare(String(b)))
      .join(',')
    return (
      skus.find(
        (sku) =>
          [...sku.specValueIds].sort((a, b) => String(a).localeCompare(String(b))).join(',') ===
          targetKey
      ) || null
    )
  })
  function getPowerSet(arr) {
    const result = [[]]
    for (const item of arr) {
      const size = result.length
      for (let i = 0; i < size; i++) {
        result.push([...result[i], item])
      }
    }
    return result
      .filter((v) => v.length > 0)
      .map((v) => [...v].sort((a, b) => String(a).localeCompare(String(b))))
  }
  return {
    selectedValueIds,
    isValueSelectable,
    selectedSku,
    toggleValue
  }
}

// docs/public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed4, onUnmounted } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed6, unref as unref5, watch } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject4, computed as computed5, unref as unref4 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')

// docs/public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from 'dayjs'
var _a
var dayjs =
  'default' in dayjsModule ? ((_a = dayjsModule.default) != null ? _a : dayjsModule) : dayjsModule

// docs/public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import 'dayjs/locale/en'

// docs/public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed7, inject as inject5, unref as unref6, useId as useVueId } from 'vue'
var idInjectionKey = Symbol('idInjectionKey')

// docs/public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject6 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')

// docs/public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed8, unref as unref7 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed10 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from 'vue'

// docs/public/codesandbox-runtime/components/sku-selector/src/sku-selector-meta.js
var skuSelectorProps = {
  /** 规格列表 */
  specs: {
    type: Array,
    default: () => []
  },
  /** SKU 列表 */
  skus: {
    type: Array,
    default: () => []
  },
  /** 当前选中的规格值 ID 列表（支持 v-model） */
  modelValue: {
    type: Array,
    default: () => []
  },
  /** 是否开启库存检查，库存为 0 的组合将自动置灰 */
  checkStock: {
    type: Boolean,
    default: true
  },
  /** 整体是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否允许点击已选中项来取消选中 */
  allowUnselect: {
    type: Boolean,
    default: true
  },
  /** 规格选项的尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 图片规格的图片高度（px） */
  imageSize: {
    type: Number,
    default: 80
  },
  /** 是否显示已选规格的汇总文本，如 "已选：红色/L" */
  showSelectedSummary: {
    type: Boolean,
    default: false
  },
  /** 汇总文本前缀 */
  summaryPrefix: {
    type: String,
    default: '\u5DF2\u9009'
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
}
var skuSelectorEmits = {
  'update:modelValue': (value) => Array.isArray(value),
  /** 每次选中结果变化时触发，sku 为 null 表示未完整选中 */
  change: (_sku, _selectedValues) => true,
  /** 点击某个规格值时触发（无论是否可选） */
  select: (_spec, _value) => true
}

// docs/public/codesandbox-runtime/components/sku-selector/src/sku-selector.js
var _hoisted_1 = ['aria-checked', 'aria-disabled', 'onClick']
var _hoisted_2 = ['src', 'alt']
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
        _createCommentVNode(' \u5DF2\u9009\u6C47\u603B '),
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
                          '\u8BF7\u9009\u62E9\u89C4\u683C',
                          2
                          /* CLASS */
                        ))
                  ]
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u89C4\u683C\u884C '),
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
                  _createCommentVNode(' \u89C4\u683C\u6807\u9898 '),
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
                  _createCommentVNode(' \u89C4\u683C\u503C\u5217\u8868 '),
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
                                    _createCommentVNode(' \u8272\u5757\u6A21\u5F0F '),
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
                                            _Fragment,
                                            { key: 1 },
                                            [
                                              _createCommentVNode(' \u56FE\u7247\u6A21\u5F0F '),
                                              _createElementVNode(
                                                'span',
                                                {
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
                                              )
                                            ],
                                            2112
                                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                    _createCommentVNode(
                                      ' \u9ED8\u8BA4\uFF1A\u6587\u5B57 + \u6807\u7B7E '
                                    ),
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
var __sfc__ = /* @__PURE__ */ Object.assign(
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
      const { themeStyle } = useComponentTheme(
        'sku-selector',
        computed11(() => props.themeOverrides)
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
      const selectedSummary = computed11(() => {
        if (!props.showSelectedSummary) return ''
        const names = props.specs
          .map((spec) => {
            var _a2, _b
            const selectedId = selectedValueIds.value.find((id) =>
              spec.values.some((v) => v.id === id)
            )
            return (_b =
              (_a2 = spec.values.find((v) => v.id === selectedId)) == null ? void 0 : _a2.name) !=
              null
              ? _b
              : ''
          })
          .filter(Boolean)
        return names.length ? `${props.summaryPrefix}\uFF1A${names.join(' / ')}` : ''
      })
      const imgSizePx = computed11(() => `${props.imageSize}px`)
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        selectedValueIds,
        isValueSelectable,
        selectedSku,
        toggleValue,
        handleValueClick,
        isValueActive,
        selectedSummary,
        imgSizePx,
        computed: computed11,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useSKU() {
          return useSKU
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
var stdin_default2 = __sfc__
export { stdin_default2 as default }
