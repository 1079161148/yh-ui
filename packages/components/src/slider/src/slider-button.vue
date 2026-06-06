<script setup lang="ts">
import { ref, computed, onBeforeUnmount, inject } from 'vue'
import { useNamespace } from '@yh-ui/hooks'

interface Props {
  modelValue: number
  vertical: boolean
  disabled: boolean
  min: number
  max: number
  step: number
  showTooltip: boolean
  formatTooltip?: (val: number) => string | number
  tooltipClass?: string
  placement?: string
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  disabled: false,
  showTooltip: true,
  placement: 'top',
  formatTooltip: undefined,
  tooltipClass: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'input', value: number): void
  (e: 'change', value: number): void
}>()

const ns = useNamespace('slider')
const slider = inject<{ sliderRef?: import('vue').Ref<HTMLElement | undefined> }>('slider')

const dragging = ref(false)
const hovering = ref(false)
const isClick = ref(false)
const startX = ref(0)
const startY = ref(0)
const startPosition = ref(0)
const newPosition = ref(0)

const tooltipVisible = computed(() => props.showTooltip && (dragging.value || hovering.value))

const currentPosition = computed(() => {
  return `${((props.modelValue - props.min) / (props.max - props.min)) * 100}%`
})

const wrapperStyle = computed(() => {
  return props.vertical
    ? { bottom: currentPosition.value, top: 'auto' }
    : { left: currentPosition.value, top: '50%' }
})

const displayValue = computed(() => {
  if (props.formatTooltip) {
    return props.formatTooltip(props.modelValue)
  }
  return props.modelValue
})

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

const onButtonDown = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return
  event.preventDefault()
  onDragStart(event)
  window.addEventListener('mousemove', onDragging)
  window.addEventListener('touchmove', onDragging)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
  window.addEventListener('contextmenu', onDragEnd)
}

const onDragStart = (event: MouseEvent | TouchEvent) => {
  dragging.value = true
  isClick.value = true
  if (event instanceof MouseEvent) {
    startX.value = event.clientX
    startY.value = event.clientY
  } else {
    startX.value = event.touches[0].clientX
    startY.value = event.touches[0].clientY
  }
  startPosition.value = parseFloat(currentPosition.value)
  newPosition.value = startPosition.value
}

const onDragging = (event: MouseEvent | TouchEvent) => {
  if (dragging.value) {
    isClick.value = false
    let diff = 0
    const sliderSize = getSliderSize()
    if (sliderSize > 0) {
      if (event instanceof MouseEvent) {
        if (props.vertical) {
          diff = ((startY.value - event.clientY) / sliderSize) * 100
        } else {
          diff = ((event.clientX - startX.value) / sliderSize) * 100
        }
      } else {
        if (props.vertical) {
          diff = ((startY.value - event.touches[0].clientY) / sliderSize) * 100
        } else {
          diff = ((event.touches[0].clientX - startX.value) / sliderSize) * 100
        }
      }
      newPosition.value = startPosition.value + diff
      setPosition(newPosition.value)
    }
  }
}

const onDragEnd = () => {
  if (dragging.value) {
    setTimeout(() => {
      dragging.value = false
      if (!isClick.value) {
        setPosition(newPosition.value)
      }
      emit('change', props.modelValue)
    }, 0)
    window.removeEventListener('mousemove', onDragging)
    window.removeEventListener('touchmove', onDragging)
    window.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('touchend', onDragEnd)
    window.removeEventListener('contextmenu', onDragEnd)
  }
}

const getSliderSize = () => {
  if (!slider?.sliderRef?.value) return 0
  return props.vertical ? slider.sliderRef.value.offsetHeight : slider.sliderRef.value.offsetWidth
}

const setPosition = (percent: number) => {
  if (percent < 0) percent = 0
  if (percent > 100) percent = 100
  const lengthPerStep = 100 / ((props.max - props.min) / props.step)
  const steps = Math.round(percent / lengthPerStep)
  let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
  value = parseFloat(value.toFixed(getPrecision(props.step)))
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
    emit('input', value)
  }
}

const getPrecision = (step: number) => {
  const stepStr = step.toString()
  const dotIndex = stepStr.indexOf('.')
  return dotIndex > -1 ? stepStr.length - dotIndex - 1 : 0
}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDragging)
  window.removeEventListener('touchmove', onDragging)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchend', onDragEnd)
  window.removeEventListener('contextmenu', onDragEnd)
})

defineExpose({
  onButtonDown
})
</script>

<template>
  <div
    ref="button"
    :class="[ns.e('button-wrapper'), ns.is('dragging', dragging)]"
    :style="wrapperStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
  >
    <slot name="thumb" :value="modelValue">
      <div :class="[ns.e('button'), ns.is('hover', hovering), ns.is('dragging', dragging)]"></div>
    </slot>
    <transition name="yh-fade">
      <div v-if="tooltipVisible" :class="[ns.e('tooltip'), tooltipClass]">
        <div :class="ns.e('tooltip-content')">
          {{ displayValue }}
        </div>
        <div :class="ns.e('tooltip-arrow')"></div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@use './slider.scss';
</style>
