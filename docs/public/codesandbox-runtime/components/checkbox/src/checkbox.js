import {
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['name', 'id', 'tabindex', 'disabled', 'checked']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'label',
      {
        class: _normalizeClass($setup.checkboxClasses),
        style: _normalizeStyle($setup.themeStyle),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => ($setup.hovering = true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => ($setup.hovering = false))
      },
      [
        _createElementVNode(
          'span',
          {
            class: _normalizeClass([
              $setup.ns.e('input'),
              $setup.ns.is('disabled', $setup.actualDisabled),
              $setup.ns.is('checked', $setup.isChecked),
              $setup.ns.is('indeterminate', $setup.props.indeterminate)
            ])
          },
          [
            _createElementVNode(
              'span',
              {
                class: _normalizeClass($setup.innerClasses)
              },
              null,
              2
              /* CLASS */
            ),
            _createElementVNode(
              'input',
              {
                ref: 'inputRef',
                class: _normalizeClass($setup.ns.e('original')),
                type: 'checkbox',
                name: $props.name,
                id: $props.id,
                tabindex: $props.tabindex,
                disabled: $setup.actualDisabled,
                checked: $setup.isChecked,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur
              },
              null,
              42,
              _hoisted_1
            )
          ],
          2
          /* CLASS */
        ),
        _ctx.$slots.default || $props.label
          ? (_openBlock(),
            _createElementBlock(
              'span',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('label'))
              },
              [
                _renderSlot(_ctx.$slots, 'default', {}, () => [
                  _createTextVNode(
                    _toDisplayString($props.label),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { computed, ref, inject, onMounted, watch } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { checkboxGroupContextKey } from './checkbox-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCheckbox'
  },
  {
    __name: 'checkbox',
    props: {
      modelValue: { type: [String, Number, Boolean], required: false },
      trueValue: { type: [String, Number, Boolean], required: false, default: true },
      falseValue: { type: [String, Number, Boolean], required: false, default: false },
      value: { type: [String, Number, Boolean], required: false },
      name: { type: String, required: false },
      label: { type: String, required: false },
      size: { type: null, required: false, default: 'default' },
      disabled: { type: Boolean, required: false, default: false },
      indeterminate: { type: Boolean, required: false, default: false },
      border: { type: Boolean, required: false, default: false },
      validateEvent: { type: Boolean, required: false, default: true },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      checked: { type: Boolean, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('checkbox')
      const checkboxGroup = inject(checkboxGroupContextKey, void 0)
      const { themeStyle } = useComponentTheme(
        'checkbox',
        computed(
          () =>
            props.themeOverrides || (checkboxGroup == null ? void 0 : checkboxGroup.themeOverrides)
        )
      )
      const inputRef = ref()
      const focused = ref(false)
      const hovering = ref(false)
      const { globalSize } = useConfig()
      const isGroup = computed(() => !!checkboxGroup)
      const checkboxSize = computed(() => {
        return (
          (props.size !== 'default'
            ? props.size
            : checkboxGroup == null
              ? void 0
              : checkboxGroup.size) ||
          globalSize.value ||
          'default'
        )
      })
      const isDisabled = computed(() => {
        return props.disabled || (checkboxGroup == null ? void 0 : checkboxGroup.disabled) || false
      })
      const isLimitDisabled = computed(() => {
        if (isGroup.value && checkboxGroup) {
          const modelValue = checkboxGroup.modelValue || []
          const isChecked2 = modelValue.includes(props.value)
          if (
            checkboxGroup.max !== void 0 &&
            modelValue.length >= checkboxGroup.max &&
            !isChecked2
          ) {
            return true
          }
          if (
            checkboxGroup.min !== void 0 &&
            modelValue.length <= checkboxGroup.min &&
            isChecked2
          ) {
            return true
          }
        }
        return false
      })
      const actualDisabled = computed(() => isDisabled.value || isLimitDisabled.value)
      const isChecked = computed(() => {
        if (isGroup.value && checkboxGroup) {
          return (checkboxGroup.modelValue || []).includes(props.value)
        }
        return props.modelValue === props.trueValue
      })
      const checkboxClasses = computed(() => [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is('disabled', actualDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('indeterminate', props.indeterminate),
        ns.is('focused', focused.value),
        ns.is('border', props.border)
      ])
      const innerClasses = computed(() => [ns.e('inner')])
      const handleChange = (event) => {
        var _a
        if (actualDisabled.value) return
        const target = event.target
        if (isGroup.value && checkboxGroup) {
          const currentValue = [...(checkboxGroup.modelValue || [])]
          const value = props.value
          if (target.checked) {
            if (!currentValue.includes(value)) {
              currentValue.push(value)
            }
          } else {
            const index = currentValue.indexOf(value)
            if (index > -1) {
              currentValue.splice(index, 1)
            }
          }
          ;(_a = checkboxGroup.changeEvent) == null ? void 0 : _a.call(checkboxGroup, currentValue)
        } else {
          const newValue = target.checked ? props.trueValue : props.falseValue
          emit('update:modelValue', newValue)
          emit('change', newValue)
        }
      }
      const handleFocus = () => {
        focused.value = true
      }
      const handleBlur = () => {
        focused.value = false
      }
      const focus = () => {
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.focus()
      }
      const blur = () => {
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.blur()
      }
      watch(
        () => props.checked,
        (val) => {
          if (val !== void 0 && !isGroup.value) {
            const newValue = val ? props.trueValue : props.falseValue
            if (props.modelValue !== newValue) {
              emit('update:modelValue', newValue)
            }
          }
        },
        { immediate: true }
      )
      onMounted(() => {
        if (inputRef.value && props.checked !== void 0 && !isGroup.value) {
          inputRef.value.checked = isChecked.value
        }
      })
      __expose({
        get ref() {
          return inputRef.value
        },
        get checked() {
          return isChecked.value
        },
        focus,
        blur
      })
      const __returned__ = {
        props,
        emit,
        ns,
        checkboxGroup,
        themeStyle,
        inputRef,
        focused,
        hovering,
        globalSize,
        isGroup,
        checkboxSize,
        isDisabled,
        isLimitDisabled,
        actualDisabled,
        isChecked,
        checkboxClasses,
        innerClasses,
        handleChange,
        handleFocus,
        handleBlur,
        focus,
        blur,
        computed,
        ref,
        inject,
        onMounted,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
        },
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
