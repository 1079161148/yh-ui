<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, toRef } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import {
  countdownProps,
  countdownEmits,
  createFormatContext,
  formatCountdown,
  isTargetTimestamp,
  parseTimeUnits,
  padZero,
  type CountdownStatus,
  type CountdownFormatContext,
  type CountdownExpose
} from './countdown'

defineOptions({
  name: 'YhCountdown'
})

const props = defineProps(countdownProps)
const emit = defineEmits(countdownEmits)
const ns = useNamespace('countdown')
const { t } = useLocale()

// --- 状态管理 ---
const status = ref<CountdownStatus>('pending')
const remain = ref(getInitialRemain())
const startTime = ref(0)
const pausedRemain = ref(remain.value)
const hasWarned = ref(false)
const rafId = ref<number | null>(null)
const prevUpdateTime = ref(0)

// --- 计算属性 ---
const formatContext = computed<CountdownFormatContext>(() => createFormatContext(remain.value))

const displayText = computed(() => formatCountdown(props.format, formatContext.value))

// 是否应显示天数
const shouldShowDays = computed(() => {
  if (props.showDays === true) return true
  if (props.showDays === false) return false
  // auto 模式：剩余时间 >= 24 小时时显示
  return formatContext.value.days > 0
})

// 是否处于预警状态
const isWarning = computed(() => {
  if (!props.warningThreshold) return false
  return remain.value > 0 && remain.value <= props.warningThreshold
})

// 是否结束
const isFinished = computed(() => status.value === 'finished')

// 根样式类
const rootClass = computed(() => [
  ns.b(),
  ns.is('finished', isFinished.value),
  ns.is('warning', isWarning.value),
  ns.is('paused', status.value === 'paused'),
  ns.is('flip', props.flipAnimation),
  ns.is('monospace', props.useMonospaceFont)
])

// 值样式
const valueStyleComputed = computed(() => {
  if (typeof props.valueStyle === 'string') {
    return props.valueStyle
  }
  return props.valueStyle
})

// --- 核心计时逻辑 ---

/**
 * 计算初始剩余时间
 */
function getInitialRemain(): number {
  const serverOffset = props.serverTimeOffset ?? 0
  const now = Date.now() + serverOffset
  const value = props.value

  if (isTargetTimestamp(value)) {
    const target = value instanceof Date ? value.getTime() : value
    return Math.max(0, target - now)
  }

  // 持续时间模式（此时 value 必为 number 类型）
  return Math.max(0, value instanceof Date ? value.getTime() : value)
}

/**
 * 更新计时
 */
function tick() {
  if (status.value !== 'running') return

  const now = performance.now()
  const elapsed = now - startTime.value
  const newRemain = Math.max(0, pausedRemain.value - elapsed)

  // 节流：根据精度控制更新频率
  const shouldUpdate = now - prevUpdateTime.value >= props.interval ||
    newRemain === 0 ||
    Math.floor(remain.value / props.precision) !== Math.floor(newRemain / props.precision)

  if (shouldUpdate) {
    remain.value = newRemain
    prevUpdateTime.value = now
    emit('change', formatContext.value)

    // 预警检查
    if (props.warningThreshold && !hasWarned.value && isWarning.value) {
      hasWarned.value = true
      emit('warning', formatContext.value)
    }
  }

  // 检查是否结束
  if (newRemain <= 0) {
    finish()
    return
  }

  // 继续下一帧
  rafId.value = requestAnimationFrame(tick)
}

/**
 * 开始倒计时
 */
function start() {
  if (status.value === 'running') return

  if (status.value === 'pending' || status.value === 'finished') {
    // 首次开始或重新开始
    pausedRemain.value = getInitialRemain()
    hasWarned.value = false
  }

  remain.value = pausedRemain.value

  if (remain.value <= 0) {
    finish()
    return
  }

  startTime.value = performance.now()
  prevUpdateTime.value = startTime.value
  status.value = 'running'
  emit('start')
  emit('statusChange', 'running')

  rafId.value = requestAnimationFrame(tick)
}

/**
 * 暂停倒计时
 */
function pause() {
  if (status.value !== 'running') return

  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }

  // 记录暂停时的剩余时间
  const elapsed = performance.now() - startTime.value
  pausedRemain.value = Math.max(0, pausedRemain.value - elapsed)
  remain.value = pausedRemain.value

  status.value = 'paused'
  emit('pause')
  emit('statusChange', 'paused')
}

/**
 * 恢复倒计时
 */
function resume() {
  if (status.value !== 'paused') return

  startTime.value = performance.now()
  prevUpdateTime.value = startTime.value
  status.value = 'running'
  emit('resume')
  emit('statusChange', 'running')

  rafId.value = requestAnimationFrame(tick)
}

/**
 * 重置倒计时
 */
function reset() {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }

  pausedRemain.value = getInitialRemain()
  remain.value = pausedRemain.value
  hasWarned.value = false
  status.value = 'pending'

  emit('reset')
  emit('statusChange', 'pending')

  // 自动开始
  if (props.autoStart) {
    start()
  }
}

/**
 * 结束倒计时
 */
function finish() {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }

  remain.value = 0
  status.value = 'finished'
  emit('finish')
  emit('statusChange', 'finished')
}

/**
 * 获取当前剩余毫秒
 */
function getRemain(): number {
  return remain.value
}

/**
 * 获取当前状态
 */
function getStatus(): CountdownStatus {
  return status.value
}

// --- 监听器 ---
watch(
  () => props.value,
  () => {
    reset()
  }
)

// --- 生命周期 ---
onMounted(() => {
  if (props.autoStart && remain.value > 0) {
    start()
  } else if (remain.value <= 0) {
    status.value = 'finished'
    emit('finish')
    emit('statusChange', 'finished')
  }
})

onUnmounted(() => {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
})

// --- 暴露方法 ---
defineExpose<CountdownExpose>({
  start,
  pause,
  resume,
  reset,
  getRemain,
  getStatus
})

// --- 辅助渲染 ---

// 数字分割（用于翻牌动画）
const digits = computed(() => {
  const ctx = formatContext.value
  const result: Array<{ key: string; value: string; label?: string }> = []

  if (shouldShowDays.value) {
    result.push({ key: 'days', value: ctx.DD, label: props.labels?.days || t('countdown.days') })
  }
  if (props.showHours) {
    result.push({ key: 'hours', value: ctx.HH, label: props.labels?.hours || t('countdown.hours') })
  }
  if (props.showMinutes) {
    result.push({ key: 'minutes', value: ctx.mm, label: props.labels?.minutes || t('countdown.minutes') })
  }
  if (props.showSeconds) {
    result.push({ key: 'seconds', value: ctx.ss, label: props.labels?.seconds || t('countdown.seconds') })
  }
  if (props.showMilliseconds) {
    result.push({ key: 'milliseconds', value: ctx.SSS, label: props.labels?.milliseconds || t('countdown.milliseconds') })
  }

  return result
})
</script>

<template>
  <div :class="rootClass">
    <!-- 标题 -->
    <slot name="prefix">
      <span v-if="title" :class="ns.e('title')">{{ title }}</span>
    </slot>

    <!-- 主体内容 -->
    <div :class="ns.e('content')">
      <!-- 默认插槽：完全自定义渲染 -->
      <slot :current="formatContext" :remaining="remain" :formatted="displayText" :status="status"
        :is-warning="isWarning" :is-finished="isFinished">
        <!-- 翻牌模式 -->
        <template v-if="flipAnimation">
          <template v-for="(digit, idx) in digits" :key="digit.key">
            <!-- 分隔符 -->
            <span v-if="idx > 0" :class="ns.e('separator')">
              <slot name="separator">{{ separator }}</slot>
            </span>

            <div :class="ns.e('block')">
              <div :class="ns.e('flip-card')">
                <slot :name="`${digit.key}-cell`" :value="digit.value">
                  <span :class="ns.e('value')" :style="valueStyleComputed">
                    {{ digit.value }}
                  </span>
                </slot>
              </div>
              <span v-if="digit.label" :class="ns.e('label')">{{ digit.label }}</span>
            </div>
          </template>
        </template>

        <!-- 常规模式 -->
        <template v-else>
          <span :class="ns.e('value')" :style="valueStyleComputed">
            <slot name="value" :text="displayText">{{ displayText }}</slot>
          </span>
        </template>
      </slot>
    </div>

    <!-- 后缀 -->
    <slot name="suffix">
      <span v-if="suffix" :class="ns.e('suffix')">{{ suffix }}</span>
    </slot>
  </div>
</template>

<style lang="scss">
@use './countdown.scss';
</style>
