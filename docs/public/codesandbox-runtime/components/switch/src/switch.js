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
const _hoisted_1 = ['aria-checked', 'aria-disabled']
const _hoisted_2 = ['id', 'name', 'disabled', 'checked', 'tabindex', 'aria-label']
const _hoisted_3 = { key: 1 }
const _hoisted_4 = { key: 1 }
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
import { computed, ref, nextTick } from 'vue'
import { useFormItem } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { switchProps, switchEmits } from './switch'
const __sfc__ = /* @__PURE__ */ Object.assign(
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
        computed(() => props.themeOverrides)
      )
      const { globalSize } = useConfig()
      const inputRef = ref()
      const isChecked = computed(() => props.modelValue === props.activeValue)
      const isDisabled = computed(() => {
        return props.disabled || (form == null ? void 0 : form.disabled) === true
      })
      const isInteractive = computed(() => {
        return !isDisabled.value && !props.loading
      })
      const actualWidth = computed(() => {
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
        var _a
        ;(_a = inputRef.value) == null ? void 0 : _a.focus()
      }
      const switchStyle = computed(() =>
        __spreadProps(__spreadValues({}, themeStyle.value), {
          '--yh-switch-width': actualWidth.value
        })
      )
      const switchClass = computed(() => [
        ns.b(),
        ns.m(props.size || globalSize.value || 'default'),
        ns.is('disabled', isDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('loading', props.loading)
      ])
      const coreStyle = computed(() => {
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
        computed,
        ref,
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
var stdin_default = __sfc__
export { stdin_default as default }
