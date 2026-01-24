<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  h: number
  s: number
  v: number
}>()

const emit = defineEmits<{
  (e: 'update', s: number, v: number): void
}>()

const panelRef = ref<HTMLElement>()
const cursorRef = ref<HTMLElement>()

const cursorStyle = computed(() => ({
  left: `${props.s}%`,
  top: `${100 - props.v}%`
}))

const backgroundStyle = computed(() => ({
  backgroundColor: `hsl(${props.h}, 100%, 50%)`
}))

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!panelRef.value) return
  const rect = panelRef.value.getBoundingClientRect()
  const clientX = (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX
  const clientY = (event as MouseEvent).clientY ?? (event as TouchEvent).touches[0].clientY

  let left = ((clientX - rect.left) / rect.width) * 100
  let top = ((clientY - rect.top) / rect.height) * 100

  left = Math.max(0, Math.min(100, left))
  top = Math.max(0, Math.min(100, top))

  emit('update', Math.round(left), Math.round(100 - top))
}

const handleMouseDown = (event: MouseEvent) => {
  handleDrag(event)
  const onMouseMove = (e: MouseEvent) => handleDrag(e)
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <div ref="panelRef" class="yh-color-sv-panel" :style="backgroundStyle" @mousedown="handleMouseDown">
    <div class="yh-color-sv-panel__white"></div>
    <div class="yh-color-sv-panel__black"></div>
    <div class="yh-color-sv-panel__cursor" :style="cursorStyle"></div>
  </div>
</template>

<style lang="scss">
.yh-color-sv-panel {
  position: relative;
  width: 100%;
  height: 180px;
  cursor: crosshair;
  background-color: red;
  border-radius: 4px;
  overflow: hidden;

  &__white,
  &__black {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__white {
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
  }

  &__black {
    background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
  }

  &__cursor {
    position: absolute;
    width: 6px;
    height: 6px;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    transform: translate(-3px, -3px);
  }
}
</style>
