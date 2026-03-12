<template>
  <div v-if="selectionRect" class="yh-flow-selection-box" :style="selectionBoxStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SelectionRect } from '../types'

const props = defineProps<{
  selectionRect: SelectionRect | null
  transform: { x: number; y: number; zoom: number }
}>()

const selectionBoxStyle = computed(() => {
  if (!props.selectionRect) return {}

  // 将画布坐标转换为屏幕坐标
  const x = props.selectionRect.x * props.transform.zoom + props.transform.x
  const y = props.selectionRect.y * props.transform.zoom + props.transform.y
  const width = props.selectionRect.width * props.transform.zoom
  const height = props.selectionRect.height * props.transform.zoom

  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`
  }
})
</script>

<style scoped>
.yh-flow-selection-box {
  position: absolute;
  border: 1px solid rgba(59, 130, 246, 0.8);
  background: rgba(59, 130, 246, 0.1);
  pointer-events: none;
  z-index: 1000;
}
</style>
