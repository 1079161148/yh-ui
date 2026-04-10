import {
  renderSlot as _renderSlot,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createBlock as _createBlock,
  createCommentVNode as _createCommentVNode,
  resolveDynamicComponent as _resolveDynamicComponent,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  withCtx as _withCtx
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c
  return (
    _openBlock(),
    _createBlock(
      _resolveDynamicComponent($props.tag),
      {
        class: _normalizeClass($setup.groupClasses),
        style: _normalizeStyle($setup.themeStyle),
        role: 'group',
        'aria-labelledby': $setup.labelId,
        'aria-invalid': ((_a = $setup.formItem) == null ? void 0 : _a.validateStatus) === 'error',
        'aria-describedby':
          ((_b = $setup.formItem) == null ? void 0 : _b.validateStatus) === 'error'
            ? (_c = $setup.formItem) == null
              ? void 0
              : _c.errorId
            : void 0
      },
      {
        default: _withCtx(() => [
          _renderSlot(_ctx.$slots, 'default', {}, () => [
            $props.options && $props.options.length
              ? (_openBlock(true),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  _renderList($props.options, (item) => {
                    return (
                      _openBlock(),
                      _createBlock(
                        $setup['YhCheckbox'],
                        {
                          key: String(item.value),
                          value: item.value,
                          label: item.label,
                          disabled: item.disabled
                        },
                        null,
                        8,
                        ['value', 'label', 'disabled']
                      )
                    )
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              : _createCommentVNode('v-if', true)
          ])
        ]),
        _: 3
        /* FORWARDED */
      },
      8,
      ['class', 'style', 'aria-labelledby', 'aria-invalid', 'aria-describedby']
    )
  )
}
import { computed, provide, toRefs } from 'vue'
import { useFormItem, useId } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import YhCheckbox from './checkbox.js'
import { checkboxGroupContextKey } from './checkbox'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCheckboxGroup'
  },
  {
    __name: 'checkbox-group',
    props: {
      modelValue: { type: Array, required: false, default: () => [] },
      options: { type: Array, required: false },
      size: { type: null, required: false },
      disabled: { type: Boolean, required: false, default: false },
      min: { type: Number, required: false },
      max: { type: Number, required: false },
      validateEvent: { type: Boolean, required: false, default: true },
      textColor: { type: String, required: false },
      fill: { type: String, required: false },
      tag: { type: null, required: false, default: 'div' },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('checkbox-group')
      const { formItem } = useFormItem()
      const { validate } = useFormItem()
      const labelId = useId().value
      const { globalSize } = useConfig()
      const changeEvent = (value) => {
        emit('update:modelValue', value)
        emit('change', value)
        if (props.validateEvent) {
          validate('change')
        }
      }
      const { themeStyle } = useComponentTheme(
        'checkbox-group',
        computed(() => props.themeOverrides)
      )
      const { modelValue, size, disabled, min, max } = toRefs(props)
      provide(checkboxGroupContextKey, {
        get modelValue() {
          return modelValue.value
        },
        get size() {
          return (size == null ? void 0 : size.value) || globalSize.value || 'default'
        },
        get disabled() {
          return disabled.value
        },
        get min() {
          return min == null ? void 0 : min.value
        },
        get max() {
          return max == null ? void 0 : max.value
        },
        get themeOverrides() {
          return props.themeOverrides
        },
        changeEvent
      })
      const groupClasses = computed(() => [ns.b()])
      const __returned__ = {
        props,
        emit,
        ns,
        formItem,
        validate,
        labelId,
        globalSize,
        changeEvent,
        themeStyle,
        modelValue,
        size,
        disabled,
        min,
        max,
        groupClasses,
        computed,
        provide,
        toRefs,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useId() {
          return useId
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useConfig() {
          return useConfig
        },
        YhCheckbox,
        get checkboxGroupContextKey() {
          return checkboxGroupContextKey
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
