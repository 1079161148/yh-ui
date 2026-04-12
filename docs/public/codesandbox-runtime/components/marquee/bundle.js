// docs/public/codesandbox-runtime/components/marquee/src/marquee.js
import {
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeStyle as _normalizeStyle
} from 'vue'
import { ref as ref2, computed as computed2, onMounted, onUnmounted, watch, nextTick } from 'vue'

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

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
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
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
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
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/marquee/src/marquee-meta.js
var marqueeDirections = ['horizontal', 'vertical']
var marqueeProps = {
  /** 滚动方向 */
  direction: {
    type: String,
    default: 'horizontal',
    validator: (val) => marqueeDirections.includes(val)
  },
  /** 动画持续时间（秒），数值越小速度越快 */
  duration: {
    type: Number,
    default: 20
  },
  /** 是否反向滚动 */
  reverse: {
    type: Boolean,
    default: false
  },
  /** 鼠标悬停时是否暂停 */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /** 点击时是否暂停 */
  pauseOnClick: {
    type: Boolean,
    default: false
  },
  /** 内容项之间的间距 */
  gap: {
    type: [Number, String],
    default: 0
  },
  /** 是否开启边缘渐变遮罩 */
  gradient: {
    type: Boolean,
    default: false
  },
  /** 渐变遮罩颜色 */
  gradientColor: {
    type: String,
    default: '#ffffff'
  },
  /** 渐变遮罩宽度 */
  gradientWidth: {
    type: [Number, String],
    default: '40px'
  },
  /** 是否自动填充，确保内容不足时也能实现无缝滚动 */
  autoFill: {
    type: Boolean,
    default: true
  },
  /** 是否播放动画 */
  play: {
    type: Boolean,
    default: true
  },
  /** 循环次数 (0 为无限循环) */
  loop: {
    type: Number,
    default: 0
  },
  /** 滚动速度 (像素/秒)，设置后将忽略 duration */
  speed: {
    type: Number,
    default: 0
  },
  /** 首次启动动画前的延迟时间 (秒) */
  delay: {
    type: Number,
    default: 0
  },
  /** 每一轮循环结束后的停顿时间 (秒) */
  loopDelay: {
    type: Number,
    default: 0
  },
  /** 当组件离开视口时是否自动暂停动画 (性能优化) */
  pauseOnHidden: {
    type: Boolean,
    default: true
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var marqueeEmits = {
  /** 每次滚动循环完成时触发 */
  cycleComplete: () => true
}

// docs/public/codesandbox-runtime/components/marquee/src/marquee.js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'containerRef',
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m(_ctx.direction),
          {
            [$setup.ns.m('pause-on-hover')]: _ctx.pauseOnHover,
            [$setup.ns.m('pause-on-click')]: _ctx.pauseOnClick,
            [$setup.ns.m('gradient')]: _ctx.gradient
          }
        ]),
        style: _normalizeStyle([$setup.themeStyle, $setup.marqueeStyle, $setup.overlayStyle])
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content')),
            onAnimationiteration: $setup.handleAnimationIteration
          },
          [
            _createElementVNode(
              'div',
              {
                ref: 'contentRef',
                class: _normalizeClass($setup.ns.e('item'))
              },
              [_renderSlot(_ctx.$slots, 'default')],
              2
              /* CLASS */
            ),
            _createCommentVNode(
              ' \u514B\u9686\u5185\u5BB9\u4EE5\u5B9E\u73B0\u65E0\u7F1D\u6EDA\u52A8 '
            ),
            (_openBlock(true),
            _createElementBlock(
              _Fragment,
              null,
              _renderList($setup.cloneCount, (i) => {
                return (
                  _openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: i,
                      class: _normalizeClass($setup.ns.e('item')),
                      'aria-hidden': 'true'
                    },
                    [_renderSlot(_ctx.$slots, 'default')],
                    2
                    /* CLASS */
                  )
                )
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ),
        _createCommentVNode(' \u6E10\u53D8\u8499\u5C42 '),
        _ctx.gradient
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('overlay'))
              },
              null,
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhMarquee'
  },
  {
    __name: 'marquee',
    props: marqueeProps,
    emits: marqueeEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('marquee')
      const { themeStyle } = useComponentTheme(
        'marquee',
        computed2(() => props.themeOverrides)
      )
      const containerRef = ref2(null)
      const contentRef = ref2(null)
      const cloneCount = ref2(1)
      const isReady = ref2(false)
      const isHidden = ref2(false)
      const isLoopPaused = ref2(false)
      const computedDuration = computed2(() => {
        if (props.speed > 0 && contentRef.value) {
          const size =
            props.direction === 'horizontal'
              ? contentRef.value.scrollWidth
              : contentRef.value.scrollHeight
          return size / props.speed
        }
        return props.duration
      })
      const marqueeStyle = computed2(() => {
        const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
        const durationValue = `${computedDuration.value}s`
        const iterationCount = props.loop > 0 ? props.loop : 'infinite'
        return {
          '--yh-marquee-gap': gapValue,
          '--yh-marquee-duration': durationValue,
          '--yh-marquee-iteration-count': iterationCount,
          '--yh-marquee-direction': props.reverse ? 'reverse' : 'normal',
          '--yh-marquee-play-state':
            props.play && !isHidden.value && !isLoopPaused.value ? 'running' : 'paused',
          '--yh-marquee-clone-count': cloneCount.value,
          'animation-delay': `${props.delay}s`
        }
      })
      const overlayStyle = computed2(() => {
        const color = props.gradientColor
        const width =
          typeof props.gradientWidth === 'number' ? `${props.gradientWidth}px` : props.gradientWidth
        return {
          '--yh-marquee-gradient-color': color,
          '--yh-marquee-gradient-width': width
        }
      })
      const calculateClones = async () => {
        if (!containerRef.value || !contentRef.value) return
        await nextTick()
        const containerSize =
          props.direction === 'horizontal'
            ? containerRef.value.offsetWidth
            : containerRef.value.offsetHeight
        const contentSize =
          props.direction === 'horizontal'
            ? contentRef.value.scrollWidth
            : contentRef.value.scrollHeight
        if (contentSize === 0) return
        if (props.autoFill) {
          const needed = Math.ceil(containerSize / contentSize)
          cloneCount.value = Math.max(1, needed)
        } else {
          cloneCount.value = 1
        }
      }
      const handleAnimationIteration = () => {
        emit('cycleComplete')
        if (props.loopDelay > 0) {
          isLoopPaused.value = true
          setTimeout(() => {
            isLoopPaused.value = false
          }, props.loopDelay * 1e3)
        }
      }
      watch([() => props.autoFill, () => props.direction, () => props.gap], calculateClones)
      onMounted(() => {
        calculateClones()
        isReady.value = true
        if (
          props.pauseOnHidden &&
          typeof IntersectionObserver !== 'undefined' &&
          containerRef.value
        ) {
          const observer = new IntersectionObserver(
            (entries) => {
              isHidden.value = !entries[0].isIntersecting
            },
            { threshold: 0 }
          )
          observer.observe(containerRef.value)
          onUnmounted(() => observer.disconnect())
        }
      })
      __expose({
        /** 手动重新计算克隆数量（通常在动态改变内容高度/宽度时调用） */
        calculateClones,
        /** 容器 DOM 引用 */
        containerRef,
        /** 内容 DOM 引用 */
        contentRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        containerRef,
        contentRef,
        cloneCount,
        isReady,
        isHidden,
        isLoopPaused,
        computedDuration,
        marqueeStyle,
        overlayStyle,
        calculateClones,
        handleAnimationIteration,
        ref: ref2,
        computed: computed2,
        onMounted,
        onUnmounted,
        watch,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get marqueeProps() {
          return marqueeProps
        },
        get marqueeEmits() {
          return marqueeEmits
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
