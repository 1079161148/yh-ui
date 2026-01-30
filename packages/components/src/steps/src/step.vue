<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, getCurrentInstance, watch, ref } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { stepProps } from './step'
import { STEPS_INJECTION_KEY } from './steps'
import type { StepsStatus } from './steps'

defineOptions({
  name: 'YhStep'
})

const props = defineProps(stepProps)
const ns = useNamespace('step')

const instance = getCurrentInstance()
const uid = instance?.uid ?? 0
const stepsContext = inject(STEPS_INJECTION_KEY)

// 延迟加载状态
const hasRendered = ref(!props.lazy)

// 当前步骤索引
const stepIndex = computed(() => {
  return stepsContext?.steps.value.findIndex(s => s.uid === uid) ?? 0
})

// 计算当前状态
const currentStatus = computed<StepsStatus>(() => {
  // 优先使用自定义状态
  if (props.status) return props.status

  const active = stepsContext?.props.active ?? 0
  const finishStatus = stepsContext?.props.finishStatus ?? 'finish'
  const processStatus = stepsContext?.props.processStatus ?? 'process'

  if (stepIndex.value < active) {
    return finishStatus
  } else if (stepIndex.value === active) {
    return processStatus
  }
  return 'wait'
})

// 判断是否激活过（用于延迟加载）
const isActive = computed(() => stepIndex.value === (stepsContext?.props.active ?? 0))

// 监听激活状态，更新渲染状态
watch(isActive, (active) => {
  if (active && props.lazy) {
    hasRendered.value = true
  }
})

// 是否为最后一步
const isLast = computed(() => {
  const total = stepsContext?.steps.value.length ?? 0
  return stepIndex.value === total - 1
})

// 进度条百分比
const progressPercent = computed(() => {
  if (!stepsContext?.props.showProgress) return 0

  const active = stepsContext?.props.active ?? 0
  if (stepIndex.value < active) {
    return 100
  } else if (stepIndex.value === active) {
    return props.progress
  }
  return 0
})

// 实际方向
const actualDirection = computed(() => {
  if (stepsContext?.isResponsiveVertical.value) return 'vertical'
  return stepsContext?.props.direction ?? 'horizontal'
})

// 计算样式
const stepStyle = computed(() => {
  const space = stepsContext?.props.space
  if (!space) return {}
  const spaceValue = typeof space === 'number' ? `${space}px` : space
  return {
    flexBasis: spaceValue,
    maxWidth: isLast.value ? '' : spaceValue
  }
})

// 处理点击
const handleClick = () => {
  stepsContext?.handleStepClick(stepIndex.value, props.disabled)
}

// 注册步骤
onMounted(() => {
  stepsContext?.registerStep({
    uid,
    title: props.title,
    description: props.description,
    icon: props.icon,
    status: currentStatus.value,
    disabled: props.disabled,
    time: props.time,
    progress: props.progress
  })
})

// 更新步骤配置
watch(
  () => ({
    title: props.title,
    description: props.description,
    icon: props.icon,
    status: currentStatus.value,
    disabled: props.disabled,
    time: props.time,
    progress: props.progress
  }),
  (config) => {
    stepsContext?.registerStep({
      uid,
      ...config
    })
  }
)

// 注销步骤
onUnmounted(() => {
  stepsContext?.unregisterStep(uid)
})

// 状态图标 SVG
const statusIconSvg = computed(() => {
  if (currentStatus.value === 'finish' || currentStatus.value === 'success') {
    return '<path fill="currentColor" d="M406.6 600.6L281.5 475.5a32 32 0 0 0-45.3 45.2l147.5 147.5a32 32 0 0 0 45.2 0l294.6-294.6a32 32 0 0 0-45.2-45.2L406.6 600.6z"/>'
  }
  if (currentStatus.value === 'error') {
    return '<path fill="currentColor" d="M560.4 512l133.9-133.9a32 32 0 1 0-45.2-45.3L515.2 466.7 381.3 332.8a32 32 0 1 0-45.3 45.3L469.9 512 336 645.9a32 32 0 1 0 45.3 45.2l133.9-133.9 133.9 133.9a32 32 0 1 0 45.2-45.2L560.4 512z"/>'
  }
  return ''
})

// 类名计算
const stepClass = computed(() => [
  ns.b(),
  ns.is('simple', stepsContext?.props.simple),
  ns.is(currentStatus.value, true),
  ns.is('last', isLast.value),
  ns.is('center', stepsContext?.props.alignCenter),
  ns.is('disabled', props.disabled),
  ns.is('clickable', stepsContext?.props.clickable && !props.disabled),
  ns.is('timeline', stepsContext?.props.showTimeline),
  ns.is('label-vertical', stepsContext?.props.labelPlacement === 'vertical')
])
</script>

<template>
  <div :class="stepClass" :style="stepStyle" @click="handleClick">
    <!-- 时间信息（时间线模式） -->
    <div v-if="stepsContext?.props.showTimeline && time" :class="ns.e('time')">
      <slot name="time">{{ time }}</slot>
    </div>

    <!-- 连接线 -->
    <div v-if="!isLast" :class="ns.e('line')">
      <i :class="ns.e('line-inner')"
        :style="stepsContext?.props.showProgress ? { width: `${progressPercent}%` } : {}"></i>
    </div>

    <!-- 图标区 -->
    <div :class="[ns.e('head'), ns.is(currentStatus, true)]">
      <slot name="icon">
        <!-- 自定义图标 -->
        <span v-if="icon" :class="[ns.e('icon'), icon]"></span>
        <!-- 内置状态图标 -->
        <svg v-else-if="statusIconSvg" :class="ns.e('icon-inner')" viewBox="0 0 1024 1024" width="20" height="20">
          <g v-html="statusIconSvg"></g>
        </svg>
        <!-- 数字 -->
        <span v-else :class="ns.e('number')">{{ stepIndex + 1 }}</span>
      </slot>
    </div>

    <!-- 主体内容 -->
    <div :class="ns.e('main')">
      <div :class="[ns.e('title'), ns.is(currentStatus, true)]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" :class="ns.e('description')">
        <slot name="description">{{ description }}</slot>
      </div>
      <!-- 自定义内容（延迟加载支持） -->
      <div v-if="$slots.default && (hasRendered || !lazy)" :class="ns.e('content')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './steps.scss';
</style>
