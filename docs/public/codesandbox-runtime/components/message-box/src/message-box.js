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
var __objRest = (source, exclude) => {
  var target = {}
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop]
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop]
    }
  return target
}
import {
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  createVNode as _createVNode,
  resolveDynamicComponent as _resolveDynamicComponent,
  normalizeProps as _normalizeProps,
  guardReactiveProps as _guardReactiveProps,
  createBlock as _createBlock,
  mergeProps as _mergeProps,
  withKeys as _withKeys,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['aria-label']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Transition,
      {
        name: $setup.ns.b('fade')
      },
      {
        default: _withCtx(() => [
          $setup.visible
            ? (_openBlock(),
              _createElementBlock(
                'div',
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.b('wrapper')),
                  onMousedown: $setup.handleWrapperMousedown,
                  onClick: $setup.handleWrapperClick,
                  role: 'dialog',
                  'aria-modal': 'true'
                },
                [
                  _createElementVNode(
                    'div',
                    {
                      ref: 'boxRef',
                      class: _normalizeClass([
                        $setup.ns.b(),
                        $setup.state.options.customClass,
                        {
                          [$setup.ns.m('glass')]: $setup.state.options.glass
                        },
                        {
                          [$setup.ns.m('center')]: $setup.state.options.center
                        },
                        {
                          'is-dragging': $setup.isDragging
                        }
                      ]),
                      style: _normalizeStyle([$setup.boxStyle, $setup.themeStyle])
                    },
                    [
                      $setup.state.options.glass
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('bg'))
                            },
                            null,
                            2
                            /* CLASS */
                          ))
                        : _createCommentVNode('v-if', true),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass([
                            $setup.ns.e('header'),
                            {
                              'is-draggable': $setup.state.options.draggable
                            }
                          ]),
                          onMousedown: $setup.onMousedown
                        },
                        [
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('title'))
                            },
                            _toDisplayString(
                              $setup.state.options.title || $setup.t('messagebox.title')
                            ),
                            3
                            /* TEXT, CLASS */
                          ),
                          $setup.state.options.showClose !== false
                            ? (_openBlock(),
                              _createElementBlock(
                                'button',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('close')),
                                  onClick:
                                    _cache[0] ||
                                    (_cache[0] = ($event) => $setup.handleAction('close')),
                                  'aria-label': $setup.t('messagebox.close')
                                },
                                [
                                  _createVNode(
                                    $setup['YhIcon'],
                                    {
                                      svg: $setup.IconClose.svg,
                                      'view-box': $setup.IconClose.viewBox
                                    },
                                    null,
                                    8,
                                    ['svg', 'view-box']
                                  )
                                ],
                                10,
                                _hoisted_1
                              ))
                            : _createCommentVNode('v-if', true)
                        ],
                        34
                        /* CLASS, NEED_HYDRATION */
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('content'))
                        },
                        [
                          $setup.state.options.iconType || $setup.state.options.icon
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 0,
                                  class: _normalizeClass([
                                    $setup.ns.e('status'),
                                    $setup.ns.is($setup.state.options.iconType || '')
                                  ])
                                },
                                [
                                  $setup.state.options.icon
                                    ? (_openBlock(),
                                      _createBlock(
                                        _resolveDynamicComponent(
                                          typeof $setup.state.options.icon === 'string'
                                            ? $setup.YhIcon
                                            : $setup.state.options.icon
                                        ),
                                        _normalizeProps(
                                          _mergeProps(
                                            { key: 0 },
                                            typeof $setup.state.options.icon === 'string'
                                              ? {
                                                  name: $setup.state.options.icon
                                                }
                                              : {}
                                          )
                                        ),
                                        null,
                                        16
                                        /* FULL_PROPS */
                                      ))
                                    : $setup.state.options.iconType
                                      ? (_openBlock(),
                                        _createBlock(
                                          $setup['YhIcon'],
                                          {
                                            key: 1,
                                            svg: $setup.getStatusIcon($setup.state.options.iconType)
                                              .svg,
                                            'view-box': $setup.getStatusIcon(
                                              $setup.state.options.iconType
                                            ).viewBox
                                          },
                                          null,
                                          8,
                                          ['svg', 'view-box']
                                        ))
                                      : _createCommentVNode('v-if', true)
                                ],
                                2
                                /* CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('message'))
                            },
                            [_createVNode($setup['MessageContent'])],
                            2
                            /* CLASS */
                          )
                        ],
                        2
                        /* CLASS */
                      ),
                      $setup.state.options.type === 'prompt'
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 1,
                              class: _normalizeClass($setup.ns.e('input'))
                            },
                            [
                              _createVNode(
                                $setup['YhInput'],
                                {
                                  ref: 'inputRef',
                                  modelValue: $setup.state.inputValue,
                                  'onUpdate:modelValue':
                                    _cache[1] ||
                                    (_cache[1] = ($event) => ($setup.state.inputValue = $event)),
                                  placeholder: $setup.state.options.inputPlaceholder,
                                  class: _normalizeClass({
                                    'is-error': !!$setup.state.validateError
                                  }),
                                  onKeyup:
                                    _cache[2] ||
                                    (_cache[2] = _withKeys(
                                      ($event) => $setup.handleAction('confirm'),
                                      ['enter']
                                    )),
                                  onBlur: $setup.validate,
                                  onInput:
                                    _cache[3] ||
                                    (_cache[3] = ($event) =>
                                      $setup.state.validateError && $setup.validate())
                                },
                                null,
                                8,
                                ['modelValue', 'placeholder', 'class']
                              ),
                              _createVNode(
                                _Transition,
                                {
                                  name: 'yh-zoom-in-top',
                                  persisted: ''
                                },
                                {
                                  default: _withCtx(() => [
                                    _withDirectives(
                                      _createElementVNode(
                                        'div',
                                        {
                                          class: _normalizeClass($setup.ns.e('err-msg'))
                                        },
                                        _toDisplayString($setup.state.validateError),
                                        3
                                        /* TEXT, CLASS */
                                      ),
                                      [[_vShow, $setup.state.validateError]]
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }
                              )
                            ],
                            2
                            /* CLASS */
                          ))
                        : _createCommentVNode('v-if', true),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('footer'))
                        },
                        [
                          $setup.state.options.showCancelButton !== false
                            ? (_openBlock(),
                              _createBlock(
                                $setup['YhButton'],
                                {
                                  key: 0,
                                  size: 'small',
                                  round: $setup.state.options.roundButton,
                                  loading:
                                    $setup.state.cancelLoading ||
                                    $setup.state.options.cancelButtonLoading,
                                  disabled:
                                    $setup.state.confirmLoading || $setup.state.cancelLoading,
                                  onClick:
                                    _cache[4] ||
                                    (_cache[4] = ($event) => $setup.handleAction('cancel'))
                                },
                                {
                                  default: _withCtx(() => [
                                    _createTextVNode(
                                      _toDisplayString(
                                        $setup.state.options.cancelButtonText ||
                                          $setup.t('messagebox.cancel')
                                      ),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                },
                                8,
                                ['round', 'loading', 'disabled']
                              ))
                            : _createCommentVNode('v-if', true),
                          $setup.state.options.showConfirmButton !== false
                            ? (_openBlock(),
                              _createBlock(
                                $setup['YhButton'],
                                {
                                  key: 1,
                                  ref: 'confirmRef',
                                  type: 'primary',
                                  size: 'small',
                                  loading:
                                    $setup.state.confirmLoading ||
                                    $setup.state.options.confirmButtonLoading,
                                  disabled:
                                    $setup.state.confirmLoading || $setup.state.cancelLoading,
                                  round: $setup.state.options.roundButton,
                                  onClick:
                                    _cache[5] ||
                                    (_cache[5] = ($event) => $setup.handleAction('confirm'))
                                },
                                {
                                  default: _withCtx(() => [
                                    _createTextVNode(
                                      _toDisplayString(
                                        $setup.state.options.confirmButtonText ||
                                          $setup.t('messagebox.confirm')
                                      ),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                },
                                8,
                                ['loading', 'disabled', 'round']
                              ))
                            : _createCommentVNode('v-if', true)
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    6
                    /* CLASS, STYLE */
                  )
                ],
                34
                /* CLASS, NEED_HYDRATION */
              ))
            : _createCommentVNode('v-if', true)
        ]),
        _: 1
        /* STABLE */
      },
      8,
      ['name']
    )
  )
}
import {
  ref,
  reactive,
  computed,
  watch,
  h,
  onMounted,
  onUnmounted,
  markRaw,
  nextTick,
  shallowReactive
} from 'vue'
import { useScrollLock, useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { YhButton } from '../../button'
import { YhInput } from '../../input'
import { YhIcon, IconClose, IconSuccess, IconWarning, IconError, IconInfo } from '../../icon'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhMessageBox',
    inheritAttrs: false
  },
  {
    __name: 'message-box',
    props: {
      title: { type: String, required: false },
      message: { type: [String, Object, Function], required: false },
      type: { type: String, required: false },
      dangerouslyUseHTMLString: { type: Boolean, required: false },
      iconType: { type: String, required: false },
      icon: { type: null, required: false },
      confirmButtonText: { type: String, required: false },
      cancelButtonText: { type: String, required: false },
      showCancelButton: { type: Boolean, required: false },
      showConfirmButton: { type: Boolean, required: false },
      showClose: { type: Boolean, required: false },
      closeOnClickModal: { type: Boolean, required: false },
      closeOnPressEscape: { type: Boolean, required: false },
      lockScroll: { type: Boolean, required: false },
      glass: { type: Boolean, required: false },
      center: { type: Boolean, required: false },
      roundButton: { type: Boolean, required: false },
      draggable: { type: Boolean, required: false },
      draggableBoundary: { type: Boolean, required: false },
      width: { type: [String, Number], required: false },
      customClass: { type: String, required: false },
      inputPlaceholder: { type: String, required: false },
      inputValue: { type: String, required: false },
      inputPattern: { type: null, required: false },
      inputValidator: { type: Function, required: false },
      inputErrorMessage: { type: String, required: false },
      beforeClose: { type: Function, required: false },
      callback: { type: Function, required: false },
      appContext: { type: [Object, null], required: false },
      autofocus: { type: Boolean, required: false },
      appendTo: { type: null, required: false },
      confirmButtonLoading: { type: Boolean, required: false },
      cancelButtonLoading: { type: Boolean, required: false },
      loadingIcon: { type: null, required: false },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      const ns = useNamespace('message-box')
      const { t } = useLocale()
      const DEFAULT_OPTIONS = {
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        showClose: true,
        lockScroll: true,
        draggableBoundary: true,
        autofocus: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        width: 420
      }
      const props = __props
      const { themeStyle } = useComponentTheme(
        'message-box',
        computed(() => state.options.themeOverrides)
      )
      const visible = ref(
        typeof window === 'undefined' ||
          !!props.title ||
          !!props.message ||
          !!props.type ||
          !!props.glass
      )
      const boxRef = ref(null)
      const inputRef = ref(null)
      const confirmRef = ref(null)
      const state = shallowReactive({
        options: Object.assign({}, DEFAULT_OPTIONS, props),
        confirmLoading: false,
        cancelLoading: false,
        inputValue: props.inputValue || '',
        validateError: ''
      })
      watch(
        props,
        (val) => {
          state.options = __spreadValues(__spreadValues({}, state.options), val)
        },
        { deep: true }
      )
      watch(
        () => visible.value,
        async (val) => {
          var _a, _b, _c, _d
          if (val && state.options.autofocus !== false) {
            await nextTick()
            if (state.options.type === 'prompt') {
              ;(_b = (_a = inputRef.value) == null ? void 0 : _a.focus) == null
                ? void 0
                : _b.call(_a)
            } else {
              const el = ((_c = confirmRef.value) == null ? void 0 : _c.$el) || confirmRef.value
              ;(_d = el == null ? void 0 : el.focus) == null ? void 0 : _d.call(el)
            }
          }
        }
      )
      const shouldLockScroll = computed(() => !!(visible.value && state.options.lockScroll))
      useScrollLock(shouldLockScroll)
      const isDragging = ref(false)
      const transform = reactive({ x: 0, y: 0 })
      const onMousedown = (e) => {
        if (!state.options.draggable || !boxRef.value) return
        if (e.target.closest(`.${ns.e('close')}`)) return
        isDragging.value = true
        e.preventDefault()
        const startX = e.clientX
        const startY = e.clientY
        const { x: initialX, y: initialY } = transform
        const onMousemove = (moveE) => {
          if (!isDragging.value) return
          const deltaX = moveE.clientX - startX
          const deltaY = moveE.clientY - startY
          let nextX = initialX + deltaX
          let nextY = initialY + deltaY
          if (state.options.draggableBoundary && boxRef.value) {
            const rect = boxRef.value.getBoundingClientRect()
            const viewportW = window.innerWidth
            const viewportH = window.innerHeight
            const maxX = Math.max(0, (viewportW - rect.width) / 2)
            const maxY = Math.max(0, (viewportH - rect.height) / 2)
            nextX = Math.max(-maxX, Math.min(maxX, nextX))
            nextY = Math.max(-maxY, Math.min(maxY, nextY))
          }
          transform.x = nextX
          transform.y = nextY
        }
        const onMouseup = () => {
          isDragging.value = false
          document.removeEventListener('mousemove', onMousemove)
          document.removeEventListener('mouseup', onMouseup)
        }
        document.addEventListener('mousemove', onMousemove)
        document.addEventListener('mouseup', onMouseup)
      }
      let isMousedownOnWrapper = false
      const handleWrapperMousedown = (e) => {
        isMousedownOnWrapper = e.target === e.currentTarget
      }
      const handleWrapperClick = (e) => {
        if (isMousedownOnWrapper && e.target === e.currentTarget) {
          if (state.options.closeOnClickModal) {
            handleAction('close')
          }
        }
        isMousedownOnWrapper = false
      }
      const validate = () => {
        if (state.options.type !== 'prompt') return true
        const { inputPattern, inputValidator, inputErrorMessage } = state.options
        const value = state.inputValue
        if (inputPattern && !inputPattern.test(value)) {
          state.validateError = inputErrorMessage || t('messagebox.error')
          return false
        }
        if (inputValidator) {
          const result = inputValidator(value)
          if (typeof result === 'string') {
            state.validateError = result
            return false
          } else if (result === false) {
            state.validateError = inputErrorMessage || t('messagebox.error')
            return false
          }
        }
        state.validateError = ''
        return true
      }
      watch(
        () => state.inputValue,
        () => {
          if (state.options.type === 'prompt' && state.validateError) {
            validate()
          }
        }
      )
      const open = (options) => {
        const _a = options,
          { appContext } = _a,
          rest = __objRest(_a, ['appContext'])
        state.options = __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_OPTIONS), rest), {
          appContext: appContext ? markRaw(appContext) : null
        })
        state.inputValue = options.inputValue || ''
        state.validateError = ''
        state.confirmLoading = false
        state.cancelLoading = false
        transform.x = 0
        transform.y = 0
        visible.value = true
      }
      const close = () => {
        visible.value = false
      }
      const handleAction = (action) => {
        if (action === 'confirm' && !validate()) {
          return
        }
        if (state.options.beforeClose) {
          state.options.beforeClose(action, exposed, () => {
            state.confirmLoading = false
            state.cancelLoading = false
            doClose(action)
          })
        } else {
          doClose(action)
        }
      }
      let _callback
      const setCallback = (cb) => {
        _callback = cb
      }
      const doClose = (action) => {
        close()
        if (_callback) {
          _callback({
            action,
            value: state.inputValue
          })
        }
      }
      const onKeydown = (e) => {
        if (visible.value && state.options.closeOnPressEscape && e.code === 'Escape') {
          handleAction('close')
        }
      }
      onMounted(() => document.addEventListener('keydown', onKeydown))
      onUnmounted(() => {
        document.removeEventListener('keydown', onKeydown)
      })
      const MessageContent = () => {
        const { message, dangerouslyUseHTMLString } = state.options
        if (!message) return null
        if (typeof message === 'function') return message()
        if (typeof message === 'object') return message
        if (dangerouslyUseHTMLString) {
          return h('div', { class: ns.e('html'), innerHTML: message })
        }
        return h('span', message)
      }
      const boxStyle = computed(() => ({
        width:
          typeof state.options.width === 'number'
            ? `${state.options.width}px`
            : state.options.width,
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }))
      const exposed = reactive({
        open,
        close,
        setCallback,
        get confirmLoading() {
          return state.confirmLoading
        },
        set confirmLoading(val) {
          state.confirmLoading = val
        },
        get cancelLoading() {
          return state.cancelLoading
        },
        set cancelLoading(val) {
          state.cancelLoading = val
        }
      })
      __expose(exposed)
      const getStatusIcon = (type) => {
        switch (type) {
          case 'success':
            return IconSuccess
          case 'warning':
            return IconWarning
          case 'error':
            return IconError
          default:
            return IconInfo
        }
      }
      const __returned__ = {
        ns,
        t,
        DEFAULT_OPTIONS,
        props,
        themeStyle,
        visible,
        boxRef,
        inputRef,
        confirmRef,
        state,
        shouldLockScroll,
        isDragging,
        transform,
        onMousedown,
        get isMousedownOnWrapper() {
          return isMousedownOnWrapper
        },
        set isMousedownOnWrapper(v) {
          isMousedownOnWrapper = v
        },
        handleWrapperMousedown,
        handleWrapperClick,
        validate,
        open,
        close,
        handleAction,
        get _callback() {
          return _callback
        },
        set _callback(v) {
          _callback = v
        },
        setCallback,
        doClose,
        onKeydown,
        MessageContent,
        boxStyle,
        exposed,
        getStatusIcon,
        ref,
        reactive,
        computed,
        watch,
        h,
        onMounted,
        onUnmounted,
        markRaw,
        nextTick,
        shallowReactive,
        get useNamespace() {
          return useNamespace
        },
        get useScrollLock() {
          return useScrollLock
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get YhButton() {
          return YhButton
        },
        get YhInput() {
          return YhInput
        },
        get YhIcon() {
          return YhIcon
        },
        get IconClose() {
          return IconClose
        },
        get IconSuccess() {
          return IconSuccess
        },
        get IconWarning() {
          return IconWarning
        },
        get IconError() {
          return IconError
        },
        get IconInfo() {
          return IconInfo
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
