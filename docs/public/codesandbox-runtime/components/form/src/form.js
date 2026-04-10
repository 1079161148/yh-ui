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
  renderSlot as _renderSlot,
  withModifiers as _withModifiers,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
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
import { provide, reactive, toRefs, computed } from 'vue'
import { formProps, FormContextKey } from './form'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
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
        computed(() => props.themeOverrides)
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
        __spreadProps(__spreadValues({}, toRefs(props)), {
          addField,
          removeField
        })
      )
      provide(FormContextKey, context)
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
        provide,
        reactive,
        toRefs,
        computed,
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
var stdin_default = __sfc__
export { stdin_default as default }
