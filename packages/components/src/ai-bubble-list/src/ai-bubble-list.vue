<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useVirtualScroll } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import YhAiBubble from '../../ai-bubble/src/ai-bubble.vue'
import { aiBubbleListProps, type AiBubbleListItem } from './ai-bubble-list'

defineOptions({
  name: 'YhAiBubbleList'
})

const props = defineProps(aiBubbleListProps)
const ns = useNamespace('ai-bubble-list')
const { themeStyle } = useComponentTheme(
  'ai-bubble-list',
  computed(() => props.themeOverrides)
)

const measuredHeight = ref(0)
let containerResizeObserver: ResizeObserver | null = null

const resolvedContainerHeight = computed(() => {
  if (typeof props.height === 'number') return props.height
  if (typeof props.height === 'string' && props.height.endsWith('px')) {
    return parseInt(props.height, 10)
  }
  return measuredHeight.value || 400
})

// 虚拟滚动逻辑
const { visibleItems, totalHeight, offsetY, startIndex, onScroll, scrollToIndex, containerRef } =
  useVirtualScroll({
    items: computed(() => props.items),
    itemHeight: props.itemHeight,
    containerHeight: resolvedContainerHeight,
    overscan: 5
  })

const scrollRef = containerRef

// 自动滚动到底部
const scrollToBottom = () => {
  if (!props.autoScroll) return

  nextTick(() => {
    if (props.virtualScroll) {
      scrollToIndex(props.items.length - 1)
    } else if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  })
}

watch(
  () => props.items,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

onMounted(() => {
  if (scrollRef.value) {
    measuredHeight.value = scrollRef.value.clientHeight
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      containerResizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          measuredHeight.value = entry.contentRect.height
        }
      })
      containerResizeObserver.observe(scrollRef.value)
    }
  }
  if (props.items.length > 0) {
    scrollToBottom()
  }
})

onBeforeUnmount(() => {
  if (containerResizeObserver) {
    containerResizeObserver.disconnect()
    containerResizeObserver = null
  }
})

// 暴露 API
defineExpose({
  scrollToBottom,
  scrollToIndex,
  scrollRef
})
</script>

<template>
  <div
    :class="[ns.b(), ns.is('virtual', virtualScroll)]"
    :style="[themeStyle, { height: typeof height === 'number' ? height + 'px' : height }]"
    ref="scrollRef"
    @scroll="virtualScroll ? onScroll($event) : undefined"
  >
    <!-- 虚拟滚动模式 -->
    <template v-if="virtualScroll">
      <div :class="ns.e('virtual-phantom')" :style="{ height: totalHeight + 'px' }"></div>
      <div :class="ns.e('virtual-content')" :style="{ transform: `translateY(${offsetY}px)` }">
        <div
          v-for="(item, index) in visibleItems as AiBubbleListItem[]"
          :key="(item.id as string | number) || startIndex + index"
          :class="ns.e('item')"
        >
          <slot name="bubble" :item="item" :index="startIndex + index">
            <yh-ai-bubble v-bind="item" />
          </slot>
        </div>
      </div>
    </template>

    <!-- 普通滚动模式 -->
    <div v-else :class="ns.e('content')">
      <div
        v-for="(item, index) in items as AiBubbleListItem[]"
        :key="(item.id as string | number) || index"
        :class="ns.e('item')"
      >
        <slot name="bubble" :item="item" :index="index">
          <yh-ai-bubble v-bind="item" />
        </slot>
      </div>
    </div>

    <!-- 加载中状态 -->
    <div v-if="loading" :class="ns.e('loading')">
      <slot name="loading">
        <yh-ai-bubble role="assistant" loading variant="borderless" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-bubble-list.scss';
</style>
