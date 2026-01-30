<script setup lang="ts">
import { computed, provide, ref, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { stepsProps, stepsEmits, STEPS_INJECTION_KEY } from './steps'
import type { StepConfig } from './steps'

defineOptions({
  name: 'YhSteps'
})

const props = defineProps(stepsProps)
const emit = defineEmits(stepsEmits)
const ns = useNamespace('steps')

const steps = ref<StepConfig[]>([])

// 响应式布局状态
const isResponsiveVertical = ref(false)

// 响应式监听
const checkResponsive = () => {
  if (props.responsive) {
    isResponsiveVertical.value = window.innerWidth < props.responsiveBreakpoint
  } else {
    isResponsiveVertical.value = false
  }
}

onMounted(() => {
  if (props.responsive) {
    checkResponsive()
    window.addEventListener('resize', checkResponsive)
  }
})

onUnmounted(() => {
  if (props.responsive) {
    window.removeEventListener('resize', checkResponsive)
  }
})

// 注册步骤
const registerStep = (step: StepConfig) => {
  const index = steps.value.findIndex(s => s.uid === step.uid)
  if (index === -1) {
    steps.value.push(step)
  } else {
    steps.value[index] = step
  }
  // 按 uid 排序保证顺序
  steps.value.sort((a, b) => a.uid - b.uid)
}

// 注销步骤
const unregisterStep = (uid: number) => {
  const index = steps.value.findIndex(s => s.uid === uid)
  if (index > -1) {
    steps.value.splice(index, 1)
  }
}

// 点击步骤
const handleStepClick = (index: number, disabled: boolean) => {
  if (!props.clickable || disabled) return
  emit('change', index)
}

// 提供上下文
provide(STEPS_INJECTION_KEY, {
  props,
  steps,
  isResponsiveVertical,
  registerStep,
  unregisterStep,
  handleStepClick
})

// 实际方向（考虑响应式）
const actualDirection = computed(() => {
  if (isResponsiveVertical.value) return 'vertical'
  return props.direction
})

// 类名计算
const stepsClass = computed(() => [
  ns.b(),
  ns.m(actualDirection.value),
  ns.m(`size-${props.size}`),
  ns.m(`label-${props.labelPlacement}`),
  ns.is('simple', props.simple),
  ns.is('center', props.alignCenter),
  ns.is('dot', props.progressDot === true || props.progressDot === 'dot'),
  ns.is('navigation', props.progressDot === 'navigation'),
  ns.is('clickable', props.clickable),
  ns.is('progress', props.showProgress),
  ns.is('timeline', props.showTimeline),
  ns.is('responsive', props.responsive)
])
</script>

<template>
  <div :class="stepsClass">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use './steps.scss';
</style>
