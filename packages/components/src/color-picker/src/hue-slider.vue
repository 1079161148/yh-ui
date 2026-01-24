<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  h: number
}>()

const emit = defineEmits<{
  (e: 'update', h: number): void
}>()

const sliderRef = ref<HTMLElement>()

const handleStyle = computed(() => ({
  left: `${(props.h / 360) * 100}%`
}))

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!sliderRef.value) return
  const rect = sliderRef.value.getBoundingClientRect()
  const clientX = (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX

  let left = ((clientX - rect.left) / rect.width) * 100
  left = Math.max(0, Math.min(100, left))

  emit('update', Math.round((left / 100) * 360))
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
  <div ref="sliderRef" class="yh-color-hue-slider" @mousedown="handleMouseDown">
    <div class="yh-color-hue-slider__handle" :style="handleStyle"></div>
  </div>
</template>

<style lang="scss">
.yh-color-hue-slider {
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  cursor: pointer;

  &__handle {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}
</style>
