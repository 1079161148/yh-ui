<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { useNamespace, useZIndex, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { backTopProps, backTopEmits } from './back-top'

defineOptions({
  name: 'YhBackTop'
})

const props = defineProps(backTopProps)
const emit = defineEmits(backTopEmits)

const ns = useNamespace('back-top')
const { t } = useLocale()
const { nextZIndex } = useZIndex()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('back-top', computed(() => props.themeOverrides))

const visible = ref(false)
const progress = ref(0)
const scrollContainer = shallowRef<HTMLElement | Window>()
const elRef = ref<HTMLElement>()

// 样式计算
const containerStyle = computed(() => ({
  ...themeStyle.value as any,
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
  zIndex: nextZIndex()
}))

const progressStyle = computed(() => ({
  strokeDashoffset: (1 - progress.value / 100) * 100,
  color: props.progressColor || 'var(--yh-color-primary)'
}))

// 获取滚动位置与容器尺寸
const getScrollInfo = (el: HTMLElement | Window) => {
  if (el instanceof Window) {
    const top = window.scrollY
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    return { top, totalHeight }
  } else {
    const top = el.scrollTop
    const totalHeight = el.scrollHeight - el.clientHeight
    return { top, totalHeight }
  }
}

// 核心监听逻辑：通过 rAF 实现流畅进度更新
let scheduled = false
const handleScroll = () => {
  if (!scheduled) {
    scheduled = true
    requestAnimationFrame(() => {
      if (!scrollContainer.value) return
      const { top, totalHeight } = getScrollInfo(scrollContainer.value)

      visible.value = top >= props.visibilityHeight
      progress.value = totalHeight > 0 ? Math.min((top / totalHeight) * 100, 100) : 0

      scheduled = false
    })
  }
}

// 回到顶部平滑算法
const scrollToTop = () => {
  const container = scrollContainer.value
  if (!container) return

  const beginTime = Date.now()
  const { top: beginValue } = getScrollInfo(container)

  const rAF = window.requestAnimationFrame
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / props.duration
    if (progress < 1) {
      const el = container instanceof Window ? document.documentElement : container
      el.scrollTo(0, beginValue * (1 - easeInOutCubic(progress)))
      rAF(frameFunc)
    } else {
      const el = container instanceof Window ? document.documentElement : container
      el.scrollTo(0, 0)
    }
  }
  rAF(frameFunc)
}

const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

const handleClick = (event: MouseEvent) => {
  scrollToTop()
  emit('click', event)
}

onMounted(() => {
  // 容器识别逻辑
  if (props.target) {
    scrollContainer.value = document.querySelector(props.target) as HTMLElement
  } else {
    scrollContainer.value = window
  }

  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  }
})

onBeforeUnmount(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})

</script>

<template>
  <Transition :name="`${ns.namespace.value}-fade-in`">
    <div v-if="visible" ref="elRef" :class="ns.b()" :style="containerStyle" :aria-label="t('backtop.text')"
      @click.stop="handleClick">
      <slot>
        <div :class="ns.e('content')">
          <svg viewBox="0 0 1024 1024" width="20" height="20">
            <path fill="currentColor" d="M512 320L192 640h640z" />
          </svg>
        </div>
      </slot>

      <!-- 进度环 -->
      <svg v-if="showProgress" :class="ns.e('progress')" viewBox="0 0 36 36">
        <circle :class="ns.e('progress-bg')" cx="18" cy="18" r="16" />
        <circle :class="ns.e('progress-bar')" cx="18" cy="18" r="16" :style="progressStyle" />
      </svg>
    </div>
  </Transition>
</template>

<style lang="scss">
@use './back-top.scss';
</style>
