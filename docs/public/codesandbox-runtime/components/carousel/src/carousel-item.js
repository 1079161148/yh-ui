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
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  createElementVNode as _createElementVNode,
  Fragment as _Fragment
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.isVisible
    ? (_openBlock(),
      _createElementBlock(
        'div',
        {
          key: 0,
          class: _normalizeClass($setup.itemClasses),
          style: _normalizeStyle($setup.itemStyle)
        },
        [_renderSlot(_ctx.$slots, 'default')],
        6
        /* CLASS, STYLE */
      ))
    : (_openBlock(),
      _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode(
            ' \u4E0D\u6E32\u67D3\u65F6\u4F5C\u4E3A\u5360\u4F4D\u7B26\u4FDD\u6301 DOM \u7ED3\u6784 '
          ),
          _createElementVNode(
            'div',
            {
              class: _normalizeClass($setup.itemClasses),
              style: { display: 'none' }
            },
            [_renderSlot(_ctx.$slots, 'default')],
            2
            /* CLASS */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
}
import { computed, inject, onMounted, onUnmounted, shallowRef, useAttrs, nextTick } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { CAROUSEL_INJECTION_KEY } from './carousel-meta.js'
import { carouselItemProps } from './carousel-item-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCarouselItem'
  },
  {
    __name: 'carousel-item',
    props: carouselItemProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const _props = __props
      const _attrs = useAttrs()
      const ns = useNamespace('carousel-item')
      const carouselContext = inject(CAROUSEL_INJECTION_KEY)
      const index = shallowRef(-1)
      const isVisible = computed(() => {
        if (!(carouselContext == null ? void 0 : carouselContext.shouldRenderItem)) return true
        return carouselContext.shouldRenderItem(index.value)
      })
      const active = computed(
        () =>
          (carouselContext == null ? void 0 : carouselContext.currentIndex.value) === index.value
      )
      const itemClasses = computed(() => [
        ns.b(),
        (carouselContext == null ? void 0 : carouselContext.effect.value) &&
          ns.is(carouselContext.effect.value),
        ns.is('active', active.value),
        // 添加可见性类，用于 CSS 动画
        isVisible.value ? ns.is('visible') : ns.is('hidden')
      ])
      const itemStyle = computed(() => {
        if (!carouselContext || !isVisible.value) {
          return { display: 'none' }
        }
        const { effect, currentIndex, prevIndex, itemCount } = carouselContext
        const total = itemCount.value
        const cur = currentIndex.value
        const prev = prevIndex.value
        const selfIdx = index.value
        if (total <= 0 || selfIdx === -1) return {}
        const isActive = selfIdx === cur
        const isPrev = selfIdx === prev
        if (effect.value === 'fade') {
          return {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isActive ? 1 : 0,
            zIndex: isActive ? 2 : 1,
            transition: `opacity ${carouselContext.props.duration}ms var(--yh-carousel-transition-timing)`
          }
        }
        const maskEffects = ['dissolve', 'cloud', 'wave', 'radial', 'fiber']
        if (maskEffects.includes(effect.value)) {
          const isTop = isActive
          const isShow = isActive || isPrev
          const baseStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: isTop ? 2 : isPrev ? 1 : 0,
            opacity: isShow ? 1 : 0,
            transition: `all ${carouselContext.props.duration}ms var(--yh-carousel-transition-timing)`
          }
          if (effect.value === 'radial') {
            return __spreadProps(__spreadValues({}, baseStyle), {
              clipPath: `circle(${isTop ? 150 : 0}% at center)`
            })
          } else if (effect.value === 'wave') {
            return __spreadProps(__spreadValues({}, baseStyle), {
              WebkitMaskImage:
                'linear-gradient(135deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)',
              maskImage:
                'linear-gradient(135deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)',
              WebkitMaskSize: '200% 200%',
              maskSize: '200% 200%',
              WebkitMaskPosition: `${isTop ? '0% 0%' : '100% 100%'}`,
              maskPosition: `${isTop ? '0% 0%' : '100% 100%'}`
            })
          } else if (effect.value === 'cloud') {
            return __spreadProps(__spreadValues({}, baseStyle), {
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
              maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: `${isTop ? 3e3 : 0}%`,
              maskSize: `${isTop ? 3e3 : 0}%`
            })
          } else if (effect.value === 'fiber') {
            return __spreadProps(__spreadValues({}, baseStyle), {
              WebkitMaskImage:
                'repeating-linear-gradient(45deg, black 0%, black 5%, transparent 5%, transparent 10%)',
              maskImage:
                'repeating-linear-gradient(45deg, black 0%, black 5%, transparent 5%, transparent 10%)',
              WebkitMaskSize: '200% 200%',
              maskSize: '200% 200%',
              WebkitMaskPosition: `${isTop ? '0% 0%' : '100% 100%'}`,
              maskPosition: `${isTop ? '0% 0%' : '100% 100%'}`
            })
          } else if (effect.value === 'dissolve') {
            return __spreadProps(__spreadValues({}, baseStyle), {
              opacity: isTop ? 1 : 0,
              filter: isTop ? 'blur(0px) contrast(1)' : 'blur(15px) contrast(2) grayscale(100%)',
              transform: `scale(${isTop ? 1 : 1.1})`
            })
          }
          return baseStyle
        }
        let offset = selfIdx - cur
        if (carouselContext.props.loop) {
          if (offset > total / 2) offset -= total
          else if (offset <= -total / 2) offset += total
        }
        const absOffset = Math.abs(offset)
        const inStage = absOffset <= 2
        let transform = ''
        let zIndex = 10 - absOffset
        let opacity = inStage ? 1 : 0
        const duration = carouselContext.props.duration
        const transition = `all ${duration}ms var(--yh-carousel-transition-timing)`
        switch (effect.value) {
          case 'card': {
            const scale = isActive ? 1 : 0.83
            const translateX = offset * 55
            const translateZ = isActive ? 0 : -200
            const rotateY = offset * -30
            opacity = inStage ? (isActive ? 1 : 0.7) : 0
            transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
            break
          }
          case 'coverflow': {
            const scale = isActive ? 1 : 0.8
            const translateX = offset * 70
            const translateZ = isActive ? 0 : -300
            const rotateY = offset * -50
            opacity = absOffset <= 2 ? 1 : 0
            transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
            break
          }
          case 'zoom': {
            const scale = isActive ? 1 : 0.8 - absOffset * 0.15
            const translateX = offset * 50
            opacity = inStage ? 1 - absOffset * 0.3 : 0
            transform = `translateX(${translateX}%) scale(${scale})`
            break
          }
          case 'perspective': {
            const translateX = offset * 65
            const translateZ = isActive ? 0 : -100 * absOffset
            const rotateX = isActive ? 0 : 15
            const rotateY = offset * -15
            opacity = inStage ? 1 - absOffset * 0.2 : 0
            transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            break
          }
          case 'cube': {
            const rotateY = offset * -90
            const translateZ = 400
            opacity = inStage ? 1 : 0
            transform = isActive
              ? `translateZ(${translateZ}px) rotateY(${-rotateY}deg) translateZ(-${translateZ}px)`
              : `translateZ(${translateZ}px) rotateY(${rotateY}deg) translateZ(-${translateZ}px)`
            break
          }
          case 'flip': {
            const rotateY = offset * -60
            opacity = inStage ? (absOffset <= 1 ? 1 : 0.5) : 0
            const scale = isActive ? 1 : 0.85
            transform = `rotateY(${rotateY}deg) scale(${scale})`
            break
          }
          case 'cylinder': {
            const rotateY = offset * -40
            const translateZ = 300
            opacity = absOffset <= 2 ? (isActive ? 1 : 0.7) : 0
            transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) translateZ(-${translateZ}px) scale(${isActive ? 1 : 0.8})`
            break
          }
          case 'stack': {
            const translateY = offset * 30
            const translateZ = -offset * 80
            const rotateX = offset * -5
            const scale = isActive ? 1 : 1 - absOffset * 0.15
            opacity = inStage ? 1 - absOffset * 0.2 : 0
            transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`
            break
          }
          case 'parallax': {
            const translateX = offset * 40
            const translateZ = -offset * 60
            const rotateY = offset * -20
            const scale = isActive ? 1 : 1 - absOffset * 0.1
            opacity = inStage ? 1 - absOffset * 0.15 : 0
            transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
            break
          }
          case 'popout': {
            const translateX = offset * 60
            const translateZ = isActive ? 200 : -100 * absOffset
            const rotateY = offset * -25
            const scale = isActive ? 1.1 : 0.85 - absOffset * 0.1
            opacity = inStage ? 1 - absOffset * 0.2 : 0
            transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
            break
          }
          case 'rotate3d': {
            const rotateX = offset * 15
            const rotateY = offset * -30
            const rotateZ = offset * -10
            const translateZ = isActive ? 0 : -150 * absOffset
            const scale = isActive ? 1 : 0.9 - absOffset * 0.1
            opacity = inStage ? 1 - absOffset * 0.25 : 0
            transform = `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`
            break
          }
          case 'cards': {
            const scale = isActive ? 1 : 0.88
            const translateX = offset * 52
            const translateZ = isActive ? 0 : -180
            const rotateY = offset * -22
            opacity = absOffset <= 2 ? (isActive ? 1 : 0.85) : 0
            transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
            break
          }
          case 'fold': {
            const rotateY = offset * -72
            const translateZ = 280
            const scale = isActive ? 1 : 0.82
            opacity = inStage ? (isActive ? 1 : 0.75) : 0
            transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) translateZ(-${translateZ}px) scale(${scale})`
            break
          }
          default:
            return {}
        }
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform,
          zIndex,
          opacity,
          transition,
          willChange: 'transform, opacity'
        }
      })
      let itemId = ''
      onMounted(() => {
        if (carouselContext) {
          itemId = `yh-carousel-item-${Math.random().toString(36).substring(2, 9)}`
          carouselContext.addItem(itemId)
          nextTick(() => {
            index.value = carouselContext.getItemIndex(itemId)
          })
        }
      })
      onUnmounted(() => {
        if (carouselContext && itemId) {
          carouselContext.removeItem(itemId)
        }
      })
      const __returned__ = {
        _props,
        _attrs,
        ns,
        carouselContext,
        index,
        isVisible,
        active,
        itemClasses,
        itemStyle,
        get itemId() {
          return itemId
        },
        set itemId(v) {
          itemId = v
        },
        computed,
        inject,
        onMounted,
        onUnmounted,
        shallowRef,
        useAttrs,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get CAROUSEL_INJECTION_KEY() {
          return CAROUSEL_INJECTION_KEY
        },
        get carouselItemProps() {
          return carouselItemProps
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
