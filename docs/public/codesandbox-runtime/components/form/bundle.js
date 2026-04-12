// docs/public/codesandbox-runtime/components/form/src/form.js
import {
  renderSlot as _renderSlot,
  withModifiers as _withModifiers,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
import { provide as provide2, reactive, toRefs, computed as computed11 } from 'vue'

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

// docs/public/codesandbox-runtime/components/form/src/form-meta.js
var formProps = {
  /**
   * 表单数据对象
   */
  model: {
    type: Object,
    required: true
  },
  /**
   * 表单验证规则
   */
  rules: {
    type: Object,
    default: () => ({})
  },
  /**
   * 标签宽度
   */
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  /**
   * 标签位置
   */
  labelPosition: {
    type: String,
    default: 'right'
  },
  /**
   * 标签后缀
   */
  labelSuffix: {
    type: String,
    default: ''
  },
  /**
   * 是否显示校验错误信息
   */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
   * 校验由于失败滚动到第一个错误表单项
   */
  scrollToError: {
    type: Boolean,
    default: false
  },
  /**
   * 滚动到错误表单项的配置
   */
  scrollIntoViewOptions: {
    type: [Object, Boolean],
    default: false
  },
  /**
   * 滚动到错误表单项时的偏移量 (仅当 scrollToError 为 true 时有效)
   */
  scrollToErrorOffset: {
    type: Number,
    default: 0
  },
  /**
   * 是否禁用该表单内所有组件
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示必填星号
   */
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  /**
   * 表单内组件的尺寸
   */
  size: {
    type: String,
    default: 'default'
  },
  /**
   * 是否显示校验图标
   */
  statusIcon: {
    type: Boolean,
    default: false
  },
  /**
   * 布局模式
   */
  layout: {
    type: String,
    default: 'horizontal'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}

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

// docs/public/codesandbox-runtime/components/form/src/form.js
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
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'form',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m(_ctx.layout),
          $setup.ns.m(_ctx.size),
          $setup.ns.m(`label-${_ctx.labelPosition}`)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        onSubmit: _cache[0] || (_cache[0] = _withModifiers(() => {}, ['prevent']))
      },
      [_renderSlot(_ctx.$slots, 'default')],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhForm'
  },
  {
    __name: 'form',
    props: formProps,
    emits: ['validate'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('form')
      const { themeStyle } = useComponentTheme(
        'form',
        computed11(() => props.themeOverrides)
      )
      const fields = []
      const addField = (field) => {
        if (field.prop) {
          fields.push(field)
        }
      }
      const removeField = (field) => {
        if (field.prop) {
          const index = fields.indexOf(field)
          if (index > -1) fields.splice(index, 1)
        }
      }
      const validate = async (propsToValidateOrCb = [], callback) => {
        let innerCallback = callback
        let propsToValidate = []
        if (typeof propsToValidateOrCb === 'function') {
          innerCallback = propsToValidateOrCb
          propsToValidate = []
        } else {
          propsToValidate = propsToValidateOrCb
        }
        const propList = Array.isArray(propsToValidate)
          ? propsToValidate
          : propsToValidate
            ? [propsToValidate]
            : []
        const fieldsToValidate =
          propList.length > 0 ? fields.filter((field) => propList.includes(field.prop)) : fields
        if (fieldsToValidate.length === 0 && propList.length === 0) {
          innerCallback == null ? void 0 : innerCallback(true)
          return true
        }
        let isValid = true
        const invalidFields = {}
        for (const field of fieldsToValidate) {
          try {
            await field.validate('')
          } catch (error) {
            isValid = false
            if (field.prop) {
              invalidFields[field.prop] = error
            }
          }
        }
        if (context.scrollToError && !isValid) {
          const firstProp = Object.keys(invalidFields)[0]
          if (firstProp) scrollToField(firstProp)
        }
        innerCallback == null ? void 0 : innerCallback(isValid, invalidFields)
        emit('validate', isValid, invalidFields)
        if (!isValid) {
          if (innerCallback) {
            return false
          }
          return Promise.reject(invalidFields)
        }
        return true
      }
      const resetFields = (props2 = []) => {
        const propsToReset = Array.isArray(props2) ? props2 : props2 ? [props2] : []
        const fieldsToReset =
          propsToReset.length > 0
            ? fields.filter((field) => propsToReset.includes(field.prop))
            : fields
        fieldsToReset.forEach((field) => field.resetField())
      }
      const clearValidate = (props2 = []) => {
        const propsArray = Array.isArray(props2) ? props2 : props2 ? [props2] : []
        const fieldsToClear =
          propsArray.length > 0
            ? fields.filter(
                (field) =>
                  field.prop &&
                  (typeof propsArray === 'string'
                    ? propsArray === field.prop
                    : propsArray.includes(field.prop))
              )
            : fields
        fieldsToClear.forEach((field) => field.clearValidate())
      }
      const scrollToField = (prop) => {
        const field = fields.find((f) => f.prop === prop)
        if (field) {
          const el = document.querySelector(`[data-prop="${prop}"]`)
          if (el) {
            if (props.scrollToErrorOffset) {
              const top =
                el.getBoundingClientRect().top + window.pageYOffset - props.scrollToErrorOffset
              window.scrollTo({
                top,
                behavior:
                  typeof context.scrollIntoViewOptions === 'object'
                    ? context.scrollIntoViewOptions.behavior
                    : 'smooth'
              })
            } else {
              const options =
                typeof context.scrollIntoViewOptions === 'object'
                  ? context.scrollIntoViewOptions
                  : { behavior: 'smooth', block: 'center' }
              el.scrollIntoView(options)
            }
          }
        }
      }
      const context = reactive(
        __spreadProps(__spreadValues2({}, toRefs(props)), {
          addField,
          removeField
        })
      )
      provide2(FormContextKey, context)
      __expose({
        validate,
        resetFields,
        clearValidate,
        scrollToField
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        fields,
        addField,
        removeField,
        validate,
        resetFields,
        clearValidate,
        scrollToField,
        context,
        provide: provide2,
        reactive,
        toRefs,
        computed: computed11,
        get formProps() {
          return formProps
        },
        get FormContextKey() {
          return FormContextKey
        },
        get useNamespace() {
          return useNamespace
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
var stdin_default2 = __sfc__
export { stdin_default2 as default }
