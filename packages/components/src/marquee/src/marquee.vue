<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick, type CSSProperties } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { marqueeProps, marqueeEmits } from './marquee'

/**
 * YhMarquee - 跑马灯组件
 * @description 高性能无缝循环滚动组件，支持双向滚动、边际渐变、硬件加速。
 */
defineOptions({
  name: 'YhMarquee'
})

const props = defineProps(marqueeProps)
const emit = defineEmits(marqueeEmits)
const ns = useNamespace('marquee')

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const cloneCount = ref(1)
const isReady = ref(false)
const isHidden = ref(false)
const isLoopPaused = ref(false)

// 计算距离和持续时间
const computedDuration = computed(() => {
  if (props.speed > 0 && contentRef.value) {
    const size = props.direction === 'horizontal'
      ? contentRef.value.scrollWidth
      : contentRef.value.scrollHeight
    return size / props.speed
  }
  return props.duration
})

const marqueeStyle = computed((): CSSProperties => {
  const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  const durationValue = `${computedDuration.value}s`
  const iterationCount = props.loop > 0 ? props.loop : 'infinite'

  return {
    '--yh-marquee-gap': gapValue,
    '--yh-marquee-duration': durationValue,
    '--yh-marquee-iteration-count': iterationCount,
    '--yh-marquee-direction': props.reverse ? 'reverse' : 'normal',
    '--yh-marquee-play-state': (props.play && !isHidden.value && !isLoopPaused.value) ? 'running' : 'paused',
    '--yh-marquee-clone-count': cloneCount.value,
    'animation-delay': `${props.delay}s`
  } as CSSProperties
})

const overlayStyle = computed((): CSSProperties => {
  const color = props.gradientColor
  const width = typeof props.gradientWidth === 'number' ? `${props.gradientWidth}px` : props.gradientWidth

  return {
    '--yh-marquee-gradient-color': color,
    '--yh-marquee-gradient-width': width
  } as CSSProperties
})

const calculateClones = async () => {
  if (!containerRef.value || !contentRef.value) return

  await nextTick()
  const containerSize = props.direction === 'horizontal'
    ? containerRef.value.offsetWidth
    : containerRef.value.offsetHeight

  const contentSize = props.direction === 'horizontal'
    ? contentRef.value.scrollWidth
    : contentRef.value.scrollHeight

  if (contentSize === 0) return

  // 核心逻辑：计算需要克隆多少份以填满容器并实现无缝衔接
  // 至少克隆 1 份以实现循环效果
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
    }, props.loopDelay * 1000)
  }
}

// 响应式监听
watch([() => props.autoFill, () => props.direction, () => props.gap], calculateClones)

onMounted(() => {
  calculateClones()
  isReady.value = true

  // 启动视口观察
  if (props.pauseOnHidden && typeof IntersectionObserver !== 'undefined' && containerRef.value) {
    const observer = new IntersectionObserver((entries) => {
      isHidden.value = !entries[0].isIntersecting
    }, { threshold: 0 })
    observer.observe(containerRef.value)
    onUnmounted(() => observer.disconnect())
  }
})

defineExpose({
  /** 手动重新计算克隆数量（通常在动态改变内容高度/宽度时调用） */
  calculateClones,
  /** 容器 DOM 引用 */
  containerRef,
  /** 内容 DOM 引用 */
  contentRef
})
</script>

<template>
  <div ref="containerRef" :class="[
    ns.b(),
    ns.m(direction),
    {
      [ns.m('pause-on-hover')]: pauseOnHover,
      [ns.m('pause-on-click')]: pauseOnClick,
      [ns.m('gradient')]: gradient
    }
  ]" :style="[marqueeStyle, overlayStyle]">
    <div :class="ns.e('content')" @animationiteration="handleAnimationIteration">
      <div ref="contentRef" :class="ns.e('item')">
        <slot />
      </div>

      <!-- 克隆内容以实现无缝滚动 -->
      <div v-for="i in cloneCount" :key="i" :class="ns.e('item')" aria-hidden="true">
        <slot />
      </div>
    </div>

    <!-- 渐变蒙层 -->
    <div v-if="gradient" :class="ns.e('overlay')" />
  </div>
</template>

<style lang="scss">
@use './marquee.scss';
</style>
