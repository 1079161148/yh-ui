// docs/public/codesandbox-runtime/components/scrollbar/src/scrollbar.js
import {
  renderSlot as _renderSlot,
  resolveDynamicComponent as _resolveDynamicComponent,
  normalizeClass as _normalizeClass2,
  normalizeStyle as _normalizeStyle2,
  withCtx as _withCtx2,
  openBlock as _openBlock2,
  createBlock as _createBlock2,
  createElementVNode as _createElementVNode2,
  createVNode as _createVNode,
  Fragment as _Fragment,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode
} from 'vue'
import {
  computed as computed3,
  onMounted,
  onBeforeUnmount as onBeforeUnmount2,
  provide as provide2,
  ref as ref3,
  watch,
  nextTick
} from 'vue'

// docs/public/codesandbox-runtime/components/scrollbar/src/scrollbar-meta.js
var SCROLLBAR_INJECTION_KEY = Symbol('scrollbarContext')
var scrollbarProps = {
  /**
   * @description 滚动条高度
   */
  height: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description 滚动条最大高度
   */
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  /**
   * @description 是否使用原生滚动条
   */
  native: {
    type: Boolean,
    default: false
  },
  /**
   * @description 滚动条是否总是显示
   */
  always: {
    type: Boolean,
    default: false
  },
  /**
   * @description 滚动块的最小尺寸
   */
  minSize: {
    type: Number,
    default: 20
  },
  /**
   * @description 视图的自定义类名
   */
  viewClass: {
    type: String,
    default: ''
  },
  /**
   * @description 视图的自定义样式
   */
  viewStyle: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * @description 是否不检查容器尺寸变化
   */
  noresize: Boolean,
  /**
   * @description 标签定义
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var scrollbarEmits = {
  scroll: ({ scrollLeft, scrollTop }) =>
    typeof scrollLeft === 'number' && typeof scrollTop === 'number'
}

// docs/public/codesandbox-runtime/components/scrollbar/src/thumb.js
import {
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  openBlock as _openBlock,
  createBlock as _createBlock
} from 'vue'
import { computed, inject as inject2, onBeforeUnmount, ref as ref2 } from 'vue'

// docs/public/codesandbox-runtime/components/scrollbar/src/util.js
var BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}
var renderThumbStyle = ({ size, move, bar }) => {
  const style = {}
  const translate = `translate${bar.axis}(${move}%)`
  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate
  return style
}

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

// docs/public/codesandbox-runtime/components/scrollbar/src/thumb.js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Transition,
      {
        name: $setup.ns.b('fade'),
        persisted: ''
      },
      {
        default: _withCtx(() => [
          _withDirectives(
            _createElementVNode(
              'div',
              {
                ref: 'instance',
                class: _normalizeClass([$setup.ns.e('bar'), $setup.ns.is($setup.bar.key)]),
                onMousedown: $setup.clickTrackHandler
              },
              [
                _createElementVNode(
                  'div',
                  {
                    ref: 'thumb',
                    class: _normalizeClass($setup.ns.e('thumb')),
                    style: _normalizeStyle($setup.thumbStyle),
                    onMousedown: $setup.clickThumbHandler
                  },
                  null,
                  38
                  /* CLASS, STYLE, NEED_HYDRATION */
                )
              ],
              34
              /* CLASS, NEED_HYDRATION */
            ),
            [[_vShow, $props.always || $setup.visible]]
          )
        ]),
        _: 1
        /* STABLE */
      },
      8,
      ['name']
    )
  )
}
var __sfc__ = {
  __name: 'thumb',
  props: {
    vertical: { type: Boolean, required: false, default: false },
    size: { type: String, required: true, default: '' },
    move: { type: Number, required: true, default: 0 },
    ratio: { type: Number, required: true },
    always: { type: Boolean, required: false, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props
    const ns = useNamespace('scrollbar')
    const scrollbar = inject2(SCROLLBAR_INJECTION_KEY)
    if (!scrollbar) {
      throw new Error('YhThumb must be used within a YhScrollbar component')
    }
    const instance = ref2()
    const thumb = ref2()
    const thumbState = ref2({})
    const visible = ref2(false)
    let cursorDown = false
    let cursorLeave = false
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    )
    const clickTrackHandler = (e) => {
      var _a
      if (
        !thumb.value ||
        !instance.value ||
        !((_a = scrollbar.wrapElement) == null ? void 0 : _a.value)
      )
        return
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      )
      const thumbHalf = thumb.value[bar.value.offset] / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100 * props.ratio) / instance.value[bar.value.offset]
      scrollbar.wrapElement.value[bar.value.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.value[bar.value.scrollSize]) / 100
    }
    const clickThumbHandler = (e) => {
      var _a
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) return
      ;(_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges()
      startDrag(e)
      const el = e.currentTarget
      if (!el) return
      thumbState.value[bar.value.axis] =
        el[bar.value.offset] -
        (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
    }
    const startDrag = (e) => {
      e.stopImmediatePropagation()
      cursorDown = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }
    const mouseMoveDocumentHandler = (e) => {
      var _a
      if (
        !instance.value ||
        !thumb.value ||
        !((_a = scrollbar.wrapElement) == null ? void 0 : _a.value)
      )
        return
      if (cursorDown === false) return
      const prevPage = thumbState.value[bar.value.axis]
      if (!prevPage) return
      const offset =
        (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100 * props.ratio) / instance.value[bar.value.offset]
      scrollbar.wrapElement.value[bar.value.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.value[bar.value.scrollSize]) / 100
    }
    const mouseUpDocumentHandler = () => {
      cursorDown = false
      thumbState.value[bar.value.axis] = 0
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = null
      if (cursorLeave) visible.value = false
    }
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.value = !!props.size
    }
    let timeout = null
    __expose({
      handleScrollbarAppearance: () => {
        if (timeout) clearTimeout(timeout)
        mouseMoveScrollbarHandler()
        timeout = setTimeout(() => {
          if (!cursorDown) visible.value = false
          timeout = null
        }, 1e3)
      }
    })
    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
    })
    const __returned__ = {
      props,
      ns,
      scrollbar,
      instance,
      thumb,
      thumbState,
      visible,
      get cursorDown() {
        return cursorDown
      },
      set cursorDown(v) {
        cursorDown = v
      },
      get cursorLeave() {
        return cursorLeave
      },
      set cursorLeave(v) {
        cursorLeave = v
      },
      bar,
      thumbStyle,
      clickTrackHandler,
      clickThumbHandler,
      startDrag,
      mouseMoveDocumentHandler,
      mouseUpDocumentHandler,
      mouseMoveScrollbarHandler,
      get timeout() {
        return timeout
      },
      set timeout(v) {
        timeout = v
      },
      computed,
      inject: inject2,
      onBeforeUnmount,
      ref: ref2,
      get BAR_MAP() {
        return BAR_MAP
      },
      get renderThumbStyle() {
        return renderThumbStyle
      },
      get SCROLLBAR_INJECTION_KEY() {
        return SCROLLBAR_INJECTION_KEY
      },
      get useNamespace() {
        return useNamespace
      }
    }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }
}
__sfc__.render = render
var stdin_default = __sfc__

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject3, provide, computed as computed2, unref as unref2 } from 'vue'
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
    const local = unref2(localOverrides) || {}
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

// docs/public/codesandbox-runtime/components/scrollbar/src/scrollbar.js
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock2(),
    _createElementBlock(
      'div',
      {
        ref: 'scrollbar',
        class: _normalizeClass2($setup.ns.b()),
        style: _normalizeStyle2($setup.themeStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave
      },
      [
        _createElementVNode2(
          'div',
          {
            ref: 'wrap',
            class: _normalizeClass2([
              $setup.ns.e('wrap'),
              _ctx.native ? '' : $setup.ns.em('wrap', 'hidden-native')
            ]),
            style: _normalizeStyle2($setup.wrapStyle),
            onScroll: $setup.handleScroll
          },
          [
            (_openBlock2(),
            _createBlock2(
              _resolveDynamicComponent(_ctx.tag),
              {
                ref: 'resize',
                class: _normalizeClass2([$setup.ns.e('view'), _ctx.viewClass]),
                style: _normalizeStyle2(_ctx.viewStyle)
              },
              {
                default: _withCtx2(() => [_renderSlot(_ctx.$slots, 'default')]),
                _: 3
                /* FORWARDED */
              },
              8,
              ['class', 'style']
            ))
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        ),
        !_ctx.native
          ? (_openBlock2(),
            _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createVNode(
                  $setup['Thumb'],
                  {
                    ref: 'horizontalThumb',
                    move: $setup.moveX,
                    ratio: $setup.ratioX,
                    size: $setup.sizeWidth,
                    always: _ctx.always
                  },
                  null,
                  8,
                  ['move', 'ratio', 'size', 'always']
                ),
                _createVNode(
                  $setup['Thumb'],
                  {
                    ref: 'verticalThumb',
                    move: $setup.moveY,
                    ratio: $setup.ratioY,
                    size: $setup.sizeHeight,
                    always: _ctx.always,
                    vertical: ''
                  },
                  null,
                  8,
                  ['move', 'ratio', 'size', 'always']
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhScrollbar'
  },
  {
    __name: 'scrollbar',
    props: scrollbarProps,
    emits: scrollbarEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('scrollbar')
      const { themeStyle } = useComponentTheme('scrollbar', props.themeOverrides)
      const scrollbar = ref3()
      const wrap = ref3()
      const resize = ref3()
      const sizeWidth = ref3('0')
      const sizeHeight = ref3('0')
      const moveX = ref3(0)
      const moveY = ref3(0)
      const ratioY = ref3(1)
      const ratioX = ref3(1)
      const horizontalThumb = ref3()
      const verticalThumb = ref3()
      const wrapStyle = computed3(() => {
        const style = {}
        if (props.height)
          style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        if (props.maxHeight)
          style.maxHeight =
            typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
        return style
      })
      const handleScroll = () => {
        var _a, _b
        if (wrap.value) {
          const offsetHeight = wrap.value.offsetHeight - 4
          const offsetWidth = wrap.value.offsetWidth - 4
          moveY.value = ((wrap.value.scrollTop * 100) / offsetHeight) * ratioY.value
          moveX.value = ((wrap.value.scrollLeft * 100) / offsetWidth) * ratioX.value
          emit('scroll', {
            scrollTop: wrap.value.scrollTop,
            scrollLeft: wrap.value.scrollLeft
          })
          if (!props.native) {
            ;(_a = horizontalThumb.value) == null ? void 0 : _a.handleScrollbarAppearance()
            ;(_b = verticalThumb.value) == null ? void 0 : _b.handleScrollbarAppearance()
          }
        }
      }
      const handleMouseEnter = () => {
        var _a, _b
        if (!props.native) {
          ;(_a = horizontalThumb.value) == null ? void 0 : _a.handleScrollbarAppearance()
          ;(_b = verticalThumb.value) == null ? void 0 : _b.handleScrollbarAppearance()
        }
      }
      const handleMouseLeave = () => {}
      const update = () => {
        if (!wrap.value) return
        const offsetHeight = wrap.value.offsetHeight
        const offsetWidth = wrap.value.offsetWidth
        if (offsetHeight === 0 || offsetWidth === 0) return
        const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight
        const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth
        const height = originalHeight < offsetHeight ? Math.max(originalHeight, props.minSize) : 0
        const width = originalWidth < offsetWidth ? Math.max(originalWidth, props.minSize) : 0
        ratioY.value =
          originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))
        ratioX.value =
          originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))
        sizeHeight.value = height > 0 ? `${height}px` : ''
        sizeWidth.value = width > 0 ? `${width}px` : ''
      }
      provide2(SCROLLBAR_INJECTION_KEY, {
        wrapElement: wrap
      })
      let resizeObserver = null
      onMounted(() => {
        if (!props.native) {
          nextTick(update)
        }
        if (!props.noresize && resize.value) {
          resizeObserver = new ResizeObserver(update)
          resizeObserver.observe(resize.value)
        }
      })
      onBeforeUnmount2(() => {
        if (resizeObserver) {
          resizeObserver.disconnect()
          resizeObserver = null
        }
      })
      watch(
        () => props.noresize,
        (noresize) => {
          if (noresize) {
            resizeObserver == null ? void 0 : resizeObserver.disconnect()
          } else if (resize.value) {
            resizeObserver = new ResizeObserver(update)
            resizeObserver.observe(resize.value)
          }
        }
      )
      __expose({
        wrap,
        update,
        scrollTo(options, y) {
          var _a, _b
          if (typeof options === 'object') {
            ;(_a = wrap.value) == null ? void 0 : _a.scrollTo(options)
          } else if (typeof options === 'number' && typeof y === 'number') {
            ;(_b = wrap.value) == null ? void 0 : _b.scrollTo(options, y)
          }
        },
        setScrollTop(value) {
          if (wrap.value) wrap.value.scrollTop = value
        },
        setScrollLeft(value) {
          if (wrap.value) wrap.value.scrollLeft = value
        }
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        scrollbar,
        wrap,
        resize,
        sizeWidth,
        sizeHeight,
        moveX,
        moveY,
        ratioY,
        ratioX,
        horizontalThumb,
        verticalThumb,
        wrapStyle,
        handleScroll,
        handleMouseEnter,
        handleMouseLeave,
        update,
        get resizeObserver() {
          return resizeObserver
        },
        set resizeObserver(v) {
          resizeObserver = v
        },
        computed: computed3,
        onMounted,
        onBeforeUnmount: onBeforeUnmount2,
        provide: provide2,
        ref: ref3,
        watch,
        nextTick,
        get scrollbarProps() {
          return scrollbarProps
        },
        get scrollbarEmits() {
          return scrollbarEmits
        },
        get SCROLLBAR_INJECTION_KEY() {
          return SCROLLBAR_INJECTION_KEY
        },
        Thumb: stdin_default,
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
__sfc__2.render = render2
var stdin_default2 = __sfc__2
export { stdin_default2 as default }
