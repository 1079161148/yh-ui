<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { ComponentThemeVars } from '@yh-ui/theme'
import { alertProps, alertEmits } from './alert'

defineOptions({
  name: 'YhAlert'
})

const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)

const ns = useNamespace('alert')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('alert', computed(() => props.themeOverrides))
const slots = useSlots()
const visible = ref(true)
const progress = ref(100)
const remainingTime = ref(props.duration)
const lastUpdate = ref(0)
const isPaused = ref(false)

let timer: ReturnType<typeof setTimeout> | null = null
let rafId: number | null = null

const updateProgress = () => {
  if (isPaused.value || !visible.value) return

  const now = Date.now()
  const elapsed = now - lastUpdate.value
  lastUpdate.value = now

  remainingTime.value = Math.max(0, remainingTime.value - elapsed)
  progress.value = (remainingTime.value / props.duration) * 100

  if (remainingTime.value > 0) {
    rafId = requestAnimationFrame(updateProgress)
  } else {
    visible.value = false
  }
}

// 主题类名计算
const alertClass = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.effect),
  ns.is('center', props.center),
  ns.is('scrollable', props.scrollable),
  ns.is('pause-on-hover', props.pauseOnHover),
  ns.is('with-description', !!props.description || !!slots.default)
])

// 动态样式映射
const alertStyle = computed(() => ({
  ...themeStyle.value,
  '--yh-alert-scroll-speed': `${props.scrollSpeed}s`
}))

// 进度条样式
const progressStyle = computed(() => ({
  width: `${progress.value}%`,
  transition: 'none'
}))

// 关闭处理
const handleClose = (evt: MouseEvent) => {
  visible.value = false
  emit('close', evt)
  clearAutoClose()
}

const clearAutoClose = () => {
  if (timer) clearTimeout(timer)
  if (rafId) cancelAnimationFrame(rafId)
}

const handleMouseEnter = () => {
  if (props.pauseOnHover && props.duration > 0) {
    isPaused.value = true
    if (timer) clearTimeout(timer)
  }
}

const handleMouseLeave = () => {
  if (props.pauseOnHover && props.duration > 0 && visible.value) {
    isPaused.value = false
    lastUpdate.value = Date.now()
    if (props.showProgress) {
      rafId = requestAnimationFrame(updateProgress)
    }
    timer = setTimeout(() => {
      visible.value = false
    }, remainingTime.value)
  }
}

onMounted(() => {
  if (props.duration > 0) {
    remainingTime.value = props.duration
    lastUpdate.value = Date.now()
    if (props.showProgress) {
      rafId = requestAnimationFrame(updateProgress)
    }
    timer = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
})

onBeforeUnmount(() => {
  clearAutoClose()
})
</script>

<template>
  <Transition :name="`${ns.namespace.value}-fade`">
    <div v-if="visible" :class="alertClass" :style="alertStyle" role="alert" @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
      <!-- 图标部分 -->
      <div v-if="showIcon" :class="ns.e('icon')">
        <slot name="icon">
          <component :is="icon" v-if="icon" />
          <!-- 默认类型图标 (这里可以预置几个 SVG) -->
          <svg v-else viewBox="0 0 1024 1024" width="20" height="20">
            <path v-if="type === 'success'" fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
            <path v-if="type === 'info'" fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm0 160a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0V448a32 32 0 0 0-32-32z" />
            <path v-if="type === 'warning'" fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm0 160a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0V448a32 32 0 0 0-32-32z" />
            <path v-if="type === 'error'" fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm170.3 535.1a32 32 0 0 0 0-45.2L557.3 512l125-125a32 32 0 0 0-45.2-45.2L512 466.7l-125-125a32 32 0 0 0-45.2 45.2l125 125-125 125a32 32 0 0 0 45.2 45.2l125-125 125 125a32 32 0 0 0 45.2 0z" />
          </svg>
        </slot>
      </div>

      <!-- 内容部分 -->
      <div :class="[ns.e('content')]">
        <span v-if="title || slots.title" :class="ns.e('title')">
          <slot name="title">{{ title }}</slot>
        </span>
        <div :class="ns.e('description-wrapper')">
          <div :class="ns.e('description-content')">
            <p v-if="description || slots.default" :class="ns.e('description')">
              <slot>{{ description }}</slot>
            </p>
            <!-- 极致丝滑：当开启滚动时，自动复制一份内容实现无缝衔接 -->
            <p v-if="scrollable && (description || slots.default)" :class="ns.e('description')">
              <slot>{{ description }}</slot>
            </p>
          </div>
        </div>

        <!-- Action 扩展槽 -->
        <div v-if="slots.action" :class="ns.e('action')">
          <slot name="action" />
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div v-if="closable" :class="ns.e('close')" :aria-label="t('dialog.close')" @click="handleClose">
        <slot name="close">
          <span v-if="closeText">{{ closeText }}</span>
          <component :is="closeIcon" v-else-if="closeIcon" style="width: 16px; height: 16px" />
          <svg v-else viewBox="0 0 1024 1024" width="16" height="16">
            <path fill="currentColor"
              d="M810.7 274.7L749.3 213.3 512 450.7 274.7 213.3 213.3 274.7 450.7 512 213.3 749.3 274.7 810.7 512 573.3 749.3 810.7 810.7 749.3 573.3 512z" />
          </svg>
        </slot>
      </div>

      <!-- 倒计时进度条 -->
      <div v-if="showProgress && duration > 0" :class="ns.e('progress-track')">
        <div :class="ns.e('progress-bar')" :style="progressStyle"></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@use './alert.scss';
</style>
