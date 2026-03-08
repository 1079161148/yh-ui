/** * YhCarouselItem - 轮播项（性能优化版） * 优化点：懒渲染 / CSS 动画 / 样式缓存 / 稳定索引 */
<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  shallowRef,
  useAttrs,
  nextTick,
  type CSSProperties
} from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { CAROUSEL_INJECTION_KEY } from './carousel'
import { carouselItemProps } from './carousel-item'

defineOptions({
  name: 'YhCarouselItem'
})

const _props = defineProps(carouselItemProps)
const _attrs = useAttrs()

const ns = useNamespace('carousel-item')
const carouselContext = inject(CAROUSEL_INJECTION_KEY)

// 使用浅层 ref 避免深层响应
const index = shallowRef(-1)

// ========== 懒渲染：只渲染可见项 ==========
const isVisible = computed(() => {
  if (!carouselContext?.shouldRenderItem) return true
  return carouselContext.shouldRenderItem(index.value)
})

// ========== 计算属性缓存（避免重复计算）==========
const active = computed(() => carouselContext?.currentIndex.value === index.value)

const itemClasses = computed(() => [
  ns.b(),
  carouselContext?.effect.value && ns.is(carouselContext.effect.value),
  ns.is('active', active.value),
  // 添加可见性类，用于 CSS 动画
  isVisible.value ? ns.is('visible') : ns.is('hidden')
])

// ========== 核心样式计算（带缓存）==========
const itemStyle = computed((): CSSProperties => {
  if (!carouselContext || !isVisible.value) {
    return { display: 'none' } // 不渲染隐藏项
  }

  const { effect, currentIndex, prevIndex, itemCount } = carouselContext
  const total = itemCount.value
  const cur = currentIndex.value
  const prev = prevIndex.value
  const selfIdx = index.value

  if (total <= 0 || selfIdx === -1) return {}

  const isActive = selfIdx === cur
  const isPrev = selfIdx === prev

  // ========== Fade 效果 ==========
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

  // ========== 遮罩效果（dissolve/cloud/wave/radial/fiber）==========
  const maskEffects = ['dissolve', 'cloud', 'wave', 'radial', 'fiber']
  if (maskEffects.includes(effect.value)) {
    const isTop = isActive
    const isShow = isActive || isPrev

    const baseStyle: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: isTop ? 2 : isPrev ? 1 : 0,
      opacity: isShow ? 1 : 0,
      transition: `all ${carouselContext.props.duration}ms var(--yh-carousel-transition-timing)`
    }

    // 根据效果类型添加遮罩样式
    if (effect.value === 'radial') {
      return { ...baseStyle, clipPath: `circle(${isTop ? 150 : 0}% at center)` }
    } else if (effect.value === 'wave') {
      return {
        ...baseStyle,
        WebkitMaskImage:
          'linear-gradient(135deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)',
        maskImage:
          'linear-gradient(135deg, black 25%, transparent 25%, transparent 50%, black 50%, black 75%, transparent 75%, transparent)',
        WebkitMaskSize: '200% 200%',
        maskSize: '200% 200%',
        WebkitMaskPosition: `${isTop ? '0% 0%' : '100% 100%'}`,
        maskPosition: `${isTop ? '0% 0%' : '100% 100%'}`
      }
    } else if (effect.value === 'cloud') {
      return {
        ...baseStyle,
        WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
        maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: `${isTop ? 3000 : 0}%`,
        maskSize: `${isTop ? 3000 : 0}%`
      }
    } else if (effect.value === 'fiber') {
      return {
        ...baseStyle,
        WebkitMaskImage:
          'repeating-linear-gradient(45deg, black 0%, black 5%, transparent 5%, transparent 10%)',
        maskImage:
          'repeating-linear-gradient(45deg, black 0%, black 5%, transparent 5%, transparent 10%)',
        WebkitMaskSize: '200% 200%',
        maskSize: '200% 200%',
        WebkitMaskPosition: `${isTop ? '0% 0%' : '100% 100%'}`,
        maskPosition: `${isTop ? '0% 0%' : '100% 100%'}`
      }
    } else if (effect.value === 'dissolve') {
      return {
        ...baseStyle,
        opacity: isTop ? 1 : 0,
        filter: isTop ? 'blur(0px) contrast(1)' : 'blur(15px) contrast(2) grayscale(100%)',
        transform: `scale(${isTop ? 1 : 1.1})`
      }
    }

    return baseStyle
  }

  // ========== 3D 效果计算 ==========
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

  // 统一过渡样式
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

// ========== 生命周期 ==========
let itemId = ''
onMounted(() => {
  if (carouselContext) {
    // 生成稳定的顺序 ID（基于当前 items 数量）
    itemId = `yh-carousel-item-${Math.random().toString(36).substring(2, 9)}`
    carouselContext.addItem(itemId)
    nextTick(() => {
      index.value = carouselContext!.getItemIndex(itemId)
    })
  }
})

onUnmounted(() => {
  if (carouselContext && itemId) {
    carouselContext.removeItem(itemId)
  }
})
</script>

<template>
  <div v-if="isVisible" :class="itemClasses" :style="itemStyle">
    <slot />
  </div>
  <!-- 不渲染时作为占位符保持 DOM 结构 -->
  <div v-else :class="itemClasses" style="display: none">
    <slot />
  </div>
</template>
