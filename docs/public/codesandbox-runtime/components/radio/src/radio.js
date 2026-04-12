import {
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['name', 'id', 'tabindex', 'disabled', 'checked', 'value']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'label',
      {
        class: _normalizeClass($setup.radioClasses),
        style: _normalizeStyle($setup.themeStyle),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => ($setup.hovering = true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => ($setup.hovering = false))
      },
      [
        _createElementVNode(
          'span',
          {
            class: _normalizeClass($setup.ns.e('input'))
          },
          [
            _createElementVNode(
              'span',
              {
                class: _normalizeClass($setup.innerClasses)
              },
              [
                _createCommentVNode(' \u9009\u4E2D\u5706\u70B9 '),
                $setup.isChecked
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('dot'))
                      },
                      null,
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true)
              ],
              2
              /* CLASS */
            ),
            _createElementVNode(
              'input',
              {
                ref: 'inputRef',
                class: _normalizeClass($setup.ns.e('original')),
                type: 'radio',
                name: $setup.radioName,
                id: $props.id,
                tabindex: $props.tabindex,
                disabled: $setup.isDisabled,
                checked: $setup.isChecked,
                value: $props.value,
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
import { computed, ref, inject } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { radioGroupContextKey } from './radio-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhRadio'
  },
  {
    __name: 'radio',
    props: {
      modelValue: { type: [String, Number, Boolean], required: false },
      value: { type: [String, Number, Boolean], required: false },
      name: { type: String, required: false },
      label: { type: String, required: false },
      size: { type: null, required: false },
      disabled: { type: Boolean, required: false, default: false },
      border: { type: Boolean, required: false, default: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('radio')
      const radioGroup = inject(radioGroupContextKey, void 0)
      const { themeStyle } = useComponentTheme(
        'radio',
        computed(
          () => props.themeOverrides || (radioGroup == null ? void 0 : radioGroup.themeOverrides)
        )
      )
      const inputRef = ref()
      const focused = ref(false)
      const hovering = ref(false)
      const isGroup = computed(() => !!radioGroup)
      const radioSize = computed(() => {
        return props.size || (radioGroup == null ? void 0 : radioGroup.size) || 'default'
      })
      const isDisabled = computed(() => {
        return props.disabled || (radioGroup == null ? void 0 : radioGroup.disabled) || false
      })
      const radioName = computed(() => {
        return props.name || (radioGroup == null ? void 0 : radioGroup.name) || ''
      })
      const isChecked = computed(() => {
        var _a
        const value = (_a = props.value) != null ? _a : props.label
        if (isGroup.value && radioGroup) {
          return radioGroup.modelValue === value
        }
        return props.modelValue === value
      })
      const radioClasses = computed(() => [
        ns.b(),
        radioSize.value !== 'default' ? ns.m(radioSize.value) : '',
        ns.is('disabled', isDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('focused', focused.value),
        ns.is('bordered', props.border)
      ])
      const innerClasses = computed(() => [
        ns.e('inner'),
        ns.is('checked', isChecked.value),
        ns.is('disabled', isDisabled.value)
      ])
      const handleChange = () => {
        var _a
        if (isDisabled.value) return
        const value = props.value
        if (isGroup.value && radioGroup) {
          ;(_a = radioGroup.changeEvent) == null ? void 0 : _a.call(radioGroup, value)
        } else {
          emit('update:modelValue', value)
          emit('change', value)
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
      __expose({
        ref: inputRef.value,
        focus,
        blur
      })
      const __returned__ = {
        props,
        emit,
        ns,
        radioGroup,
        themeStyle,
        inputRef,
        focused,
        hovering,
        isGroup,
        radioSize,
        isDisabled,
        radioName,
        isChecked,
        radioClasses,
        innerClasses,
        handleChange,
        handleFocus,
        handleBlur,
        focus,
        blur,
        computed,
        ref,
        inject,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get radioGroupContextKey() {
          return radioGroupContextKey
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
