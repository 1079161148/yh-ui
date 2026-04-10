// docs/public/codesandbox-runtime/components/tag/src/tag.js
import {
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  createElementVNode as _createElementVNode,
  normalizeStyle as _normalizeStyle,
  Fragment as _Fragment
} from 'vue'
import { computed as computed3, ref as ref2, nextTick, useSlots } from 'vue'

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

// docs/public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject2, computed, unref as unref2 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')
var useConfig = () => {
  const configRef = inject2(configProviderContextKey, null)
  const globalSize = computed(() => {
    const config = unref2(configRef)
    return (config == null ? void 0 : config.size) || 'default'
  })
  const globalZIndex = computed(() => {
    const config = unref2(configRef)
    return (config == null ? void 0 : config.zIndex) || 2e3
  })
  const globalLocale = computed(() => {
    const config = unref2(configRef)
    return config == null ? void 0 : config.locale
  })
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  }
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject3, provide, computed as computed2, unref as unref3 } from 'vue'
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
  const globalThemes = inject3(COMPONENT_THEME_KEY, {})
  const mergedVars = computed2(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref3(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed2(() => {
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
  const hasCustomTheme = computed2(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/tag/src/tag.js
var __defProp2 = Object.defineProperty
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
var _hoisted_1 = ['value']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createCommentVNode(' \u7F16\u8F91\u6A21\u5F0F '),
        $props.editable && $setup.isEditing
          ? (_openBlock(),
            _createElementBlock(
              'input',
              {
                key: 0,
                ref: 'inputRef',
                class: _normalizeClass([$setup.ns.e('input'), $setup.ns.m($props.size)]),
                value: $setup.editValue,
                onInput: $setup.handleEditInput,
                onBlur: $setup.handleEditConfirm,
                onKeydown: $setup.handleEditKeydown
              },
              null,
              42,
              _hoisted_1
            ))
          : (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createCommentVNode(' \u666E\u901A\u6A21\u5F0F '),
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass($setup.tagClasses),
                    style: _normalizeStyle($setup.tagStyle),
                    onClick: $setup.handleClick,
                    onDblclick: $setup.startEdit
                  },
                  [
                    _createCommentVNode(' \u5DE6\u4FA7\u56FE\u6807 '),
                    $setup.hasIcon
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('icon'))
                          },
                          [
                            _renderSlot(_ctx.$slots, 'icon', {}, () => [
                              $props.icon && typeof $props.icon !== 'string'
                                ? (_openBlock(),
                                  _createBlock(_resolveDynamicComponent($props.icon), { key: 0 }))
                                : _createCommentVNode('v-if', true)
                            ])
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createCommentVNode(' \u5185\u5BB9 '),
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('content'))
                      },
                      [_renderSlot(_ctx.$slots, 'default')],
                      2
                      /* CLASS */
                    ),
                    _createCommentVNode(' \u53F3\u4FA7\u56FE\u6807 '),
                    $setup.hasSuffixIcon
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 1,
                            class: _normalizeClass($setup.ns.e('suffix-icon'))
                          },
                          [
                            _renderSlot(_ctx.$slots, 'suffixIcon', {}, () => [
                              $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                                ? (_openBlock(),
                                  _createBlock(_resolveDynamicComponent($props.suffixIcon), {
                                    key: 0
                                  }))
                                : _createCommentVNode('v-if', true)
                            ])
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createCommentVNode(' \u5173\u95ED\u6309\u94AE '),
                    $props.closable
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 2,
                            class: _normalizeClass($setup.ns.e('close')),
                            onClick: $setup.handleClose
                          },
                          [
                            _renderSlot(_ctx.$slots, 'closeIcon', {}, () => [
                              _cache[0] ||
                                (_cache[0] = _createElementVNode(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    width: '1em',
                                    height: '1em'
                                  },
                                  [
                                    _createElementVNode('path', {
                                      fill: 'currentColor',
                                      d: 'M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                ))
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
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            ))
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTag'
  },
  {
    __name: 'tag',
    props: {
      type: { type: null, required: false, default: 'primary' },
      size: { type: null, required: false, default: 'default' },
      effect: { type: null, required: false, default: 'light' },
      closable: { type: Boolean, required: false, default: false },
      disableTransitions: { type: Boolean, required: false, default: false },
      hit: { type: Boolean, required: false, default: false },
      color: { type: String, required: false },
      round: { type: Boolean, required: false, default: false },
      checkable: { type: Boolean, required: false, default: false },
      checked: { type: Boolean, required: false, default: false },
      editable: { type: Boolean, required: false, default: false },
      icon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['close', 'click', 'update:checked', 'change', 'edit'],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('tag')
      const { globalSize } = useConfig()
      const { themeStyle } = useComponentTheme(
        'tag',
        computed3(() => props.themeOverrides)
      )
      const isEditing = ref2(false)
      const editValue = ref2('')
      const inputRef = ref2()
      const hasIcon = computed3(() => !!props.icon || !!slots.icon)
      const hasSuffixIcon = computed3(() => !!props.suffixIcon || !!slots.suffixIcon)
      const tagClasses = computed3(() => [
        ns.b(),
        ns.m(props.type),
        ns.m(props.size || globalSize.value || 'default'),
        ns.m(props.effect),
        ns.is('closable', props.closable),
        ns.is('hit', props.hit),
        ns.is('round', props.round),
        ns.is('checkable', props.checkable),
        ns.is('checked', props.checkable && props.checked),
        ns.is('editable', props.editable),
        ns.is('has-icon', hasIcon.value),
        ns.is('has-suffix-icon', hasSuffixIcon.value)
      ])
      const tagStyle = computed3(() => {
        const base = themeStyle.value
        if (!props.color) return base
        const style = {}
        if (props.effect === 'dark') {
          style['--yh-tag-bg-color'] = props.color
          style['--yh-tag-border-color'] = props.color
          style['--yh-tag-text-color'] = '#fff'
        } else if (props.effect === 'light') {
          style['--yh-tag-bg-color'] = `${props.color}20`
          style['--yh-tag-border-color'] = `${props.color}40`
          style['--yh-tag-text-color'] = props.color
        } else {
          style['--yh-tag-bg-color'] = 'transparent'
          style['--yh-tag-border-color'] = props.color
          style['--yh-tag-text-color'] = props.color
        }
        return __spreadValues2(__spreadValues2({}, base), style)
      })
      const handleClick = (event) => {
        if (props.checkable) {
          const newChecked = !props.checked
          emit('update:checked', newChecked)
          emit('change', newChecked)
        }
        emit('click', event)
      }
      const handleClose = (event) => {
        event.stopPropagation()
        emit('close', event)
      }
      const startEdit = () => {
        if (!props.editable) return
        isEditing.value = true
        nextTick(() => {
          var _a, _b
          ;(_a = inputRef.value) == null ? void 0 : _a.focus()
          ;(_b = inputRef.value) == null ? void 0 : _b.select()
        })
      }
      const handleEditInput = (event) => {
        editValue.value = event.target.value
      }
      const handleEditConfirm = () => {
        isEditing.value = false
        if (editValue.value.trim()) {
          emit('edit', editValue.value.trim())
        }
        editValue.value = ''
      }
      const handleEditKeydown = (event) => {
        if (event.key === 'Enter') {
          handleEditConfirm()
        } else if (event.key === 'Escape') {
          isEditing.value = false
          editValue.value = ''
        }
      }
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        globalSize,
        themeStyle,
        isEditing,
        editValue,
        inputRef,
        hasIcon,
        hasSuffixIcon,
        tagClasses,
        tagStyle,
        handleClick,
        handleClose,
        startEdit,
        handleEditInput,
        handleEditConfirm,
        handleEditKeydown,
        computed: computed3,
        ref: ref2,
        nextTick,
        useSlots,
        get useNamespace() {
          return useNamespace
        },
        get useConfig() {
          return useConfig
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
