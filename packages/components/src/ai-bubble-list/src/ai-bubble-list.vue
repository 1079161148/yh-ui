<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
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

const scrollRef = ref<HTMLElement | null>(null)

// 虚拟滚动逻辑
const { visibleItems, totalHeight, offsetY, startIndex, onScroll, scrollToIndex } =
  useVirtualScroll({
    items: computed(() => props.items),
    itemHeight: props.itemHeight,
    containerHeight: typeof props.height === 'number' ? props.height : parseInt(props.height),
    overscan: 5
  })

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
  if (props.items.length > 0) {
    scrollToBottom()
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
