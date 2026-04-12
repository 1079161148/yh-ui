// docs/public/codesandbox-runtime/components/switch/src/switch.js
import {
  withModifiers as _withModifiers,
  withKeys as _withKeys,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  resolveDynamicComponent as _resolveDynamicComponent,
  openBlock as _openBlock,
  createBlock as _createBlock,
  toDisplayString as _toDisplayString,
  createElementBlock as _createElementBlock,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle
} from 'vue'
import { computed as computed11, ref as ref12, nextTick } from 'vue'

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

// docs/public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed, inject as inject2, unref as unref2 } from 'vue'
var zIndexContextKey = Symbol('zIndexContextKey')
var zIndexCounterKey = Symbol('zIndexCounterKey')

// docs/public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed3, onUnmounted } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed5, unref as unref4, watch } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject3, computed as computed4, unref as unref3 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')
var useConfig = () => {
  const configRef = inject3(configProviderContextKey, null)
  const globalSize = computed4(() => {
    const config = unref3(configRef)
    return (config == null ? void 0 : config.size) || 'default'
  })
  const globalZIndex = computed4(() => {
    const config = unref3(configRef)
    return (config == null ? void 0 : config.zIndex) || 2e3
  })
  const globalLocale = computed4(() => {
    const config = unref3(configRef)
    return config == null ? void 0 : config.locale
  })
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  }
}

// docs/public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from 'dayjs'
var _a
var dayjs =
  'default' in dayjsModule ? ((_a = dayjsModule.default) != null ? _a : dayjsModule) : dayjsModule

// docs/public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import 'dayjs/locale/en'

// docs/public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed6, inject as inject4, unref as unref5, useId as useVueId } from 'vue'
var idInjectionKey = Symbol('idInjectionKey')

// docs/public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')
var useFormItem = () => {
  const form = inject5(FormContextKey, void 0)
  const formItem = inject5(FormItemContextKey, void 0)
  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger) => {
      if (formItem) {
        return formItem.validate(trigger).catch(() => {
          return false
        })
      }
      return Promise.resolve(true)
    }
  }
}

// docs/public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed7, unref as unref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from 'vue'

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject6, provide, computed as computed10, unref as unref9 } from 'vue'
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
  const globalThemes = inject6(COMPONENT_THEME_KEY, {})
  const mergedVars = computed10(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref9(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed10(() => {
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
  const hasCustomTheme = computed10(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/switch/src/switch-meta.js
var switchProps = {
  /** 绑定值，必须等于 active-value 或 inactive-value，默认为 Boolean 类型 */
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否显示加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** switch 的大小 */
  size: {
    type: String,
    default: ''
  },
  /** switch 的宽度 */
  width: {
    type: [String, Number],
    default: ''
  },
  /** 无论图标或文本是否显示在点内，只会呈现文本的第一个字符 */
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  /** switch 状态为 on 时所显示图标，设置此项会忽略 active-text */
  activeIcon: {
    type: [String, Object],
    default: void 0
  },
  /** switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text */
  inactiveIcon: {
    type: [String, Object],
    default: void 0
  },
  /** on 状态下显示的图标组件 */
  activeActionIcon: {
    type: [String, Object],
    default: void 0
  },
  /** off 状态下显示的图标组件 */
  inactiveActionIcon: {
    type: [String, Object],
    default: void 0
  },
  /** switch 打开时的文字描述 */
  activeText: {
    type: String,
    default: ''
  },
  /** switch 关闭时的文字描述 */
  inactiveText: {
    type: String,
    default: ''
  },
  /** switch 状态为 on 时的值 */
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  /** switch 状态为 off 时的值 */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /** switch 对应的 name 属性 */
  name: {
    type: String,
    default: ''
  },
  /** 改变 switch 状态时是否触发表单的校验 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** switch 状态改变前的钩子，返回 false 或者返回 Promise 且被 reject 则停止切换 */
  beforeChange: {
    type: Function,
    default: void 0
  },
  /** input 的 id */
  id: {
    type: String,
    default: void 0
  },
  /** input 的 tabindex */
  tabindex: {
    type: [String, Number],
    default: void 0
  },
  /** 等价于原生 input aria-label 属性 */
  ariaLabel: {
    type: String,
    default: void 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var switchEmits = {
  'update:modelValue': (_val) => true,
  change: (_val) => true
}

// docs/public/codesandbox-runtime/components/switch/src/switch.js
var __defProp2 = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols
var __hasOwnProp2 = Object.prototype.hasOwnProperty
var __propIsEnum2 = Object.prototype.propertyIsEnumerable
var __defNormalProp2 = (obj, key, value) =>
  key in obj
    ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
    }
  return a
}
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
var _hoisted_1 = ['aria-checked', 'aria-disabled']
var _hoisted_2 = ['id', 'name', 'disabled', 'checked', 'tabindex', 'aria-label']
var _hoisted_3 = { key: 1 }
var _hoisted_4 = { key: 1 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.switchClass),
        style: _normalizeStyle($setup.switchStyle),
        role: 'switch',
        'aria-checked': $setup.isChecked,
        'aria-disabled': $setup.isDisabled,
        onClick: $setup.handleClick
      },
      [
        _createElementVNode(
          'input',
          {
            ref: 'inputRef',
            class: _normalizeClass($setup.ns.e('input')),
            type: 'checkbox',
            id: $setup.props.id,
            name: $setup.props.name,
            disabled: !$setup.isInteractive,
            checked: $setup.isChecked,
            tabindex: $setup.props.tabindex,
            'aria-label': $setup.props.ariaLabel,
            onChange: _cache[0] || (_cache[0] = _withModifiers(() => {}, ['stop'])),
            onKeydown: _withKeys($setup.handleClick, ['enter'])
          },
          null,
          42,
          _hoisted_2
        ),
        _createCommentVNode(' \u5DE6\u4FA7\u6807\u7B7E\uFF08\u975E\u5185\u5D4C\u6A21\u5F0F\uFF09 '),
        !$setup.props.inlinePrompt && ($setup.props.inactiveIcon || $setup.props.inactiveText)
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 0,
                class: _normalizeClass([
                  $setup.ns.e('label'),
                  $setup.ns.e('label--left'),
                  $setup.ns.is('active', !$setup.isChecked)
                ])
              },
              [
                _renderSlot(_ctx.$slots, 'inactive', {}, () => [
                  $setup.props.inactiveIcon
                    ? (_openBlock(),
                      _createBlock(
                        _resolveDynamicComponent($setup.props.inactiveIcon),
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('icon'))
                        },
                        null,
                        8,
                        ['class']
                      ))
                    : $setup.props.inactiveText
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          _hoisted_3,
                          _toDisplayString($setup.props.inactiveText),
                          1
                          /* TEXT */
                        ))
                      : _createCommentVNode('v-if', true)
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u5F00\u5173\u6838\u5FC3 '),
        _createElementVNode(
          'span',
          {
            class: _normalizeClass($setup.ns.e('core')),
            style: _normalizeStyle($setup.coreStyle)
          },
          [
            _createCommentVNode(' \u5185\u5D4C\u5185\u5BB9 '),
            $setup.props.inlinePrompt
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('inner'))
                  },
                  [
                    $setup.isChecked
                      ? _renderSlot(_ctx.$slots, 'active', { key: 0 }, () => [
                          $setup.props.activeIcon
                            ? (_openBlock(),
                              _createBlock(
                                _resolveDynamicComponent($setup.props.activeIcon),
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('icon'))
                                },
                                null,
                                8,
                                ['class']
                              ))
                            : $setup.props.activeText
                              ? (_openBlock(),
                                _createElementBlock(
                                  'span',
                                  {
                                    key: 1,
                                    class: _normalizeClass($setup.ns.e('inner-text'))
                                  },
                                  _toDisplayString($setup.props.activeText.substring(0, 3)),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode('v-if', true)
                        ])
                      : _renderSlot(_ctx.$slots, 'inactive', { key: 1 }, () => [
                          $setup.props.inactiveIcon
                            ? (_openBlock(),
                              _createBlock(
                                _resolveDynamicComponent($setup.props.inactiveIcon),
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('icon'))
                                },
                                null,
                                8,
                                ['class']
                              ))
                            : $setup.props.inactiveText
                              ? (_openBlock(),
                                _createElementBlock(
                                  'span',
                                  {
                                    key: 1,
                                    class: _normalizeClass($setup.ns.e('inner-text'))
                                  },
                                  _toDisplayString($setup.props.inactiveText.substring(0, 3)),
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
            _createCommentVNode(' \u6ED1\u5757\uFF08action\uFF09 '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('action'))
              },
              [
                _createCommentVNode(' Loading \u56FE\u6807 '),
                $setup.props.loading
                  ? (_openBlock(),
                    _createElementBlock(
                      'svg',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('loading-icon')),
                        viewBox: '0 0 1024 1024',
                        xmlns: 'http://www.w3.org/2000/svg'
                      },
                      [
                        ...(_cache[1] ||
                          (_cache[1] = [
                            _createElementVNode(
                              'path',
                              {
                                fill: 'currentColor',
                                d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z'
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
                  : (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createCommentVNode(' \u81EA\u5B9A\u4E49 action \u56FE\u6807 '),
                        $setup.isChecked
                          ? _renderSlot(_ctx.$slots, 'active-action', { key: 0 }, () => [
                              $setup.props.activeActionIcon
                                ? (_openBlock(),
                                  _createBlock(
                                    _resolveDynamicComponent($setup.props.activeActionIcon),
                                    { key: 0 }
                                  ))
                                : _createCommentVNode('v-if', true)
                            ])
                          : _renderSlot(_ctx.$slots, 'inactive-action', { key: 1 }, () => [
                              $setup.props.inactiveActionIcon
                                ? (_openBlock(),
                                  _createBlock(
                                    _resolveDynamicComponent($setup.props.inactiveActionIcon),
                                    { key: 0 }
                                  ))
                                : _createCommentVNode('v-if', true)
                            ])
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
              ],
              2
              /* CLASS */
            )
          ],
          6
          /* CLASS, STYLE */
        ),
        _createCommentVNode(' \u53F3\u4FA7\u6807\u7B7E\uFF08\u975E\u5185\u5D4C\u6A21\u5F0F\uFF09 '),
        !$setup.props.inlinePrompt && ($setup.props.activeIcon || $setup.props.activeText)
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 1,
                class: _normalizeClass([
                  $setup.ns.e('label'),
                  $setup.ns.e('label--right'),
                  $setup.ns.is('active', $setup.isChecked)
                ])
              },
              [
                _renderSlot(_ctx.$slots, 'active', {}, () => [
                  $setup.props.activeIcon
                    ? (_openBlock(),
                      _createBlock(
                        _resolveDynamicComponent($setup.props.activeIcon),
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('icon'))
                        },
                        null,
                        8,
                        ['class']
                      ))
                    : $setup.props.activeText
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          _hoisted_4,
                          _toDisplayString($setup.props.activeText),
                          1
                          /* TEXT */
                        ))
                      : _createCommentVNode('v-if', true)
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      14,
      _hoisted_1
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSwitch'
  },
  {
    __name: 'switch',
    props: switchProps,
    emits: switchEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('switch')
      const { form, validate } = useFormItem()
      const { themeStyle } = useComponentTheme(
        'switch',
        computed11(() => props.themeOverrides)
      )
      const { globalSize } = useConfig()
      const inputRef = ref12()
      const isChecked = computed11(() => props.modelValue === props.activeValue)
      const isDisabled = computed11(() => {
        return props.disabled || (form == null ? void 0 : form.disabled) === true
      })
      const isInteractive = computed11(() => {
        return !isDisabled.value && !props.loading
      })
      const actualWidth = computed11(() => {
        if (!props.width) return void 0
        return typeof props.width === 'number' ? `${props.width}px` : props.width
      })
      const handleClick = () => {
        if (!isInteractive.value) return
        handleChange()
      }
      const handleChange = async () => {
        const { beforeChange } = props
        const newValue = isChecked.value ? props.inactiveValue : props.activeValue
        if (!beforeChange) {
          updateValue(newValue)
          return
        }
        try {
          const result = beforeChange()
          const shouldChange = result instanceof Promise ? await result : result
          if (shouldChange !== false) {
            updateValue(newValue)
          }
        } catch (e) {}
      }
      const updateValue = (val) => {
        emit('update:modelValue', val)
        emit('change', val)
        if (props.validateEvent) {
          validate('change')
        }
        nextTick(() => {
          if (inputRef.value) {
            inputRef.value.checked = isChecked.value
          }
        })
      }
      const focus = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
      }
      const switchStyle = computed11(() =>
        __spreadProps(__spreadValues2({}, themeStyle.value), {
          '--yh-switch-width': actualWidth.value
        })
      )
      const switchClass = computed11(() => [
        ns.b(),
        ns.m(props.size || globalSize.value || 'default'),
        ns.is('disabled', isDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('loading', props.loading)
      ])
      const coreStyle = computed11(() => {
        const style = {}
        if (actualWidth.value) {
          style.width = actualWidth.value
        }
        return style
      })
      __expose({
        focus,
        checked: isChecked
      })
      const __returned__ = {
        props,
        emit,
        ns,
        form,
        validate,
        themeStyle,
        globalSize,
        inputRef,
        isChecked,
        isDisabled,
        isInteractive,
        actualWidth,
        handleClick,
        handleChange,
        updateValue,
        focus,
        switchStyle,
        switchClass,
        coreStyle,
        computed: computed11,
        ref: ref12,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get switchProps() {
          return switchProps
        },
        get switchEmits() {
          return switchEmits
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
