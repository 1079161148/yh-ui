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
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  Teleport as _Teleport,
  openBlock as _openBlock,
  createBlock as _createBlock,
  createElementBlock as _createElementBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'root',
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.placeholderStyle)
      },
      [
        _createCommentVNode(
          ' \u4F7F\u7528 Teleport \u89E3\u51B3\u7236\u7EA7 transform \u5BFC\u81F4\u7684\u5B9A\u4F4D\u964D\u7EA7\uFF08\u8D85\u8D8A\u6807\u51C6\u5B9E\u73B0\uFF09 '
        ),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: $setup.props.appendTo,
            disabled: !$setup.props.teleported || !$setup.fixed
          },
          [
            _createElementVNode(
              'div',
              {
                ref: 'content',
                class: _normalizeClass([
                  $setup.ns.e('inner'),
                  { [$setup.ns.is('fixed')]: $setup.fixed }
                ]),
                style: _normalizeStyle($setup.affixStyle)
              },
              [_renderSlot(_ctx.$slots, 'default', { fixed: $setup.fixed })],
              6
              /* CLASS, STYLE */
            )
          ],
          8,
          ['to', 'disabled']
        ))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef, nextTick } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { affixProps, affixEmits } from './affix-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAffix'
  },
  {
    __name: 'affix',
    props: affixProps,
    emits: affixEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('affix')
      const { themeStyle } = useComponentTheme(
        'affix',
        computed(() => props.themeOverrides)
      )
      const root = shallowRef()
      const content = shallowRef()
      const target = shallowRef()
      const fixed = ref(false)
      const _scrollTop = ref(0)
      const transform = ref(0)
      const isIntersecting = ref(false)
      const rootRect = ref({
        top: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0
      })
      const updateRect = () => {
        if (!root.value) return
        const rect = root.value.getBoundingClientRect()
        rootRect.value = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      }
      const update = () => {
        if (!root.value || props.disabled) return
        if (!isIntersecting.value && !fixed.value) return
        updateRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        let shouldFix = false
        if (props.position === 'top') {
          if (props.target) {
            const targetRect = target.value.getBoundingClientRect()
            shouldFix = props.offset > rootRect.value.top && targetRect.bottom > 0
            const diff = targetRect.bottom - props.offset - rootRect.value.height
            transform.value = diff < 0 ? diff : 0
          } else {
            shouldFix = props.offset > rootRect.value.top
          }
        } else {
          if (props.target) {
            const targetRect = target.value.getBoundingClientRect()
            shouldFix =
              viewportHeight - props.offset < rootRect.value.bottom &&
              targetRect.top < viewportHeight
            const diff = viewportHeight - targetRect.top - props.offset - rootRect.value.height
            transform.value = diff < 0 ? diff : 0
          } else {
            shouldFix = viewportHeight - props.offset < rootRect.value.bottom
          }
        }
        if (shouldFix !== fixed.value) {
          fixed.value = shouldFix
          emit('change', shouldFix)
        }
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop
        _scrollTop.value = currentScrollTop
        emit('scroll', { scrollTop: currentScrollTop, fixed: fixed.value })
      }
      const handleScroll = () => {
        update()
      }
      let io = null
      let ro = null
      const initObservers = () => {
        io = new IntersectionObserver(
          (entries) => {
            isIntersecting.value = entries[0].isIntersecting
            if (isIntersecting.value) update()
          },
          {
            rootMargin: '500px 0px 500px 0px'
          }
        )
        if (root.value) io.observe(root.value)
        ro = new ResizeObserver(() => update())
        if (root.value) ro.observe(root.value)
        if (content.value) ro.observe(content.value)
        if (target.value) ro.observe(target.value)
      }
      onMounted(() => {
        if (props.target) {
          target.value = document.querySelector(props.target)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)
        initObservers()
        update()
      })
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
        io == null ? void 0 : io.disconnect()
        ro == null ? void 0 : ro.disconnect()
      })
      watch(
        () => [props.offset, props.position, props.target, props.disabled],
        () => {
          nextTick(update)
        },
        { deep: true }
      )
      const placeholderStyle = computed(() => {
        return __spreadProps(__spreadValues({}, themeStyle.value), {
          height: fixed.value ? `${rootRect.value.height}px` : '',
          width: fixed.value ? `${rootRect.value.width}px` : ''
        })
      })
      const affixStyle = computed(() => {
        if (!fixed.value) return {}
        const offset = `${props.offset}px`
        const style = __spreadValues(
          {
            position: 'fixed',
            zIndex: props.zIndex,
            width: `${rootRect.value.width}px`,
            left: `${rootRect.value.left}px`,
            // 通过 transform translateY 结合 transform.value 实现容器边缘推开动画
            transform: `translateY(${transform.value}px)`,
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          props.affixStyle
        )
        if (props.position === 'top') {
          style.top = offset
        } else {
          style.bottom = offset
        }
        return style
      })
      __expose({
        update,
        fixed,
        scrollTop: _scrollTop
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        root,
        content,
        target,
        fixed,
        _scrollTop,
        transform,
        isIntersecting,
        rootRect,
        updateRect,
        update,
        handleScroll,
        get io() {
          return io
        },
        set io(v) {
          io = v
        },
        get ro() {
          return ro
        },
        set ro(v) {
          ro = v
        },
        initObservers,
        placeholderStyle,
        affixStyle,
        ref,
        computed,
        watch,
        onMounted,
        onBeforeUnmount,
        shallowRef,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get affixProps() {
          return affixProps
        },
        get affixEmits() {
          return affixEmits
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
