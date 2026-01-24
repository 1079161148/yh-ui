<script setup lang="ts">
import { ref, watch, onMounted, computed, useSlots } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { skeletonProps } from './skeleton'
import YhSkeletonItem from './skeleton-item.vue'

defineOptions({
  name: 'YhSkeleton'
})

const props = defineProps(skeletonProps)
const ns = useNamespace('skeleton')
const slots = useSlots()

const uiLoading = ref(props.loading && props.throttle <= 0)
let timeout: ReturnType<typeof setTimeout> | null = null

// 节流显示逻辑
watch(() => props.loading, (val) => {
  if (timeout) clearTimeout(timeout)
  if (val) {
    if (props.throttle <= 0) {
      uiLoading.value = true
    } else {
      timeout = setTimeout(() => {
        uiLoading.value = true
      }, props.throttle)
    }
  } else {
    uiLoading.value = false
  }
}, { immediate: true })

// 辅助类名
const containerClass = computed(() => [
  ns.b(),
  ns.is('animated', props.animated)
])

// 响应式交替显示
/** 自创高级：视口感应延迟加载 */
const isIntersecting = ref(false)
const skeletonRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (props.lazy && skeletonRef.value) {
    const observer = new IntersectionObserver((entries) => {
      isIntersecting.value = entries[0].isIntersecting
    }, { threshold: 0.1 })
    observer.observe(skeletonRef.value)
  } else {
    isIntersecting.value = true
  }
})

</script>

<template>
  <div v-if="uiLoading" ref="skeletonRef" :class="containerClass">
    <slot name="template">
      <!-- 默认布局：Avatar + Title + Rows -->
      <div v-if="avatar" :class="ns.e('header')">
        <yh-skeleton-item variant="circle" :width="48" :height="48" :animated="isIntersecting && animated" />
      </div>
      <div :class="ns.e('content')">
        <yh-skeleton-item v-if="title" variant="h3" style="width: 40%; margin-bottom: 16px"
          :animated="isIntersecting && animated" />
        <yh-skeleton-item v-for="i in rows" :key="i" variant="text" :style="{
          width: i === rows && rows > 1 ? '60%' : '100%',
          marginBottom: i === rows ? '0' : '12px'
        }" :animated="isIntersecting && animated" />
      </div>
    </slot>
  </div>
  <slot v-else />
</template>

<style lang="scss">
@use './skeleton.scss';
</style>
