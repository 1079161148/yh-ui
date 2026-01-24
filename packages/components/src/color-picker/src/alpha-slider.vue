<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  a: number
  color: string // Base color without alpha
}>()

const emit = defineEmits<{
  (e: 'update', a: number): void
}>()

const sliderRef = ref<HTMLElement>()

const backgroundStyle = computed(() => ({
  background: `linear-gradient(to right, rgba(255,255,255,0) 0%, ${props.color} 100%)`
}))

const handleStyle = computed(() => ({
  left: `${props.a * 100}%`
}))

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!sliderRef.value) return
  const rect = sliderRef.value.getBoundingClientRect()
  const clientX = (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX

  let left = ((clientX - rect.left) / rect.width)
  left = Math.max(0, Math.min(1, left))

  emit('update', Number(left.toFixed(2)))
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
  <div class="yh-color-alpha-slider">
    <div ref="sliderRef" class="yh-color-alpha-slider__bar" :style="backgroundStyle" @mousedown="handleMouseDown"></div>
    <div class="yh-color-alpha-slider__handle" :style="handleStyle"></div>
  </div>
</template>

<style lang="scss">
.yh-color-alpha-slider {
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADohU2HAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAStandardS/B6AAAAXklEQVQoU2P4//8/A6UApsGs+P///wMNoAAmwakApsGs+P///wMNoAAmwakApsGs+P///wMNoAAmwakApsGs+P///wMNoAAmwakApsGs+P///wMNoAAmwakApsGs+P///wMNoAAmwakAAAAASUVORK5CYII=');
  cursor: pointer;

  &__bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
  }

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
