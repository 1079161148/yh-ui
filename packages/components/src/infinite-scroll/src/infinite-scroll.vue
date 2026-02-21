<script setup lang="ts">
/**
 * YhInfiniteScroll - 无限滚动组件
 * @description 滚动至底部时自动加载更多数据
 * @features
 *   - 使用 IntersectionObserver 优化性能
 *   - 支持垂直/水平滚动
 *   - 支持加载/完成/错误状态
 *   - 支持指定滚动容器
 *   - 支持自定义插槽
 *   - 支持 SSR
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef, nextTick } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { YhSpin } from '../../spin'
import { infiniteScrollProps, infiniteScrollEmits } from './infinite-scroll'

defineOptions({
  name: 'YhInfiniteScroll'
})

const props = defineProps(infiniteScrollProps)
const emit = defineEmits(infiniteScrollEmits)

const ns = useNamespace('infinite-scroll')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('infinite-scroll', computed(() => props.themeOverrides))

// Refs
const rootRef = ref<HTMLElement>()
const placeholderRef = ref<HTMLElement>()
const scrollContainer = shallowRef<HTMLElement | Window>()

// 是否正在执行加载
const isLoading = computed(() => props.loading)

// IntersectionObserver 实例
let observer: IntersectionObserver | null = null

// 检查是否应该加载更多
const checkLoad = () => {
  if (props.disabled || isLoading.value || props.finished || props.error) {
    return
  }

  // 使用 IntersectionObserver 方式，不需要手动检查
  if (props.useObserver && observer) {
    return
  }

  // 传统滚动方式
  if (!scrollContainer.value || !placeholderRef.value) return

  const container = scrollContainer.value
  let shouldLoad = false

  if (props.direction === 'vertical') {
    if (container instanceof Window) {
      const { scrollHeight, clientHeight } = document.documentElement
      const scrollTop = window.scrollY
      shouldLoad = scrollHeight - scrollTop - clientHeight <= props.threshold
    } else {
      shouldLoad = container.scrollHeight - container.scrollTop - container.clientHeight <= props.threshold
    }
  } else {
    if (container instanceof Window) {
      const { scrollWidth, clientWidth } = document.documentElement
      const scrollLeft = window.scrollX
      shouldLoad = scrollWidth - scrollLeft - clientWidth <= props.threshold
    } else {
      shouldLoad = container.scrollWidth - container.scrollLeft - container.clientWidth <= props.threshold
    }
  }

  if (shouldLoad) {
    emit('load')
  }
}

// 处理滚动事件（传统方式）
let rafId: number | null = null
const handleScroll = () => {
  if (rafId !== null) return

  rafId = requestAnimationFrame(() => {
    rafId = null
    checkLoad()
  })
}

// 处理点击重试
const handleRetry = () => {
  emit('update:error', false)
  emit('load')
}

// 设置 IntersectionObserver
const setupObserver = () => {
  if (!props.useObserver || typeof IntersectionObserver === 'undefined') {
    return
  }

  // 清理旧的 observer
  if (observer) {
    observer.disconnect()
    observer = null
  }

  const root = props.target
    ? document.querySelector(props.target) as HTMLElement
    : null

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !props.disabled && !isLoading.value && !props.finished && !props.error) {
        emit('load')
      }
    },
    {
      root,
      rootMargin: props.rootMargin || `${props.threshold}px`
    }
  )

  if (placeholderRef.value) {
    observer.observe(placeholderRef.value)
  }
}

// 设置滚动容器（传统方式）
const setupScrollListener = () => {
  if (props.useObserver) return

  if (props.target) {
    const el = document.querySelector(props.target) as HTMLElement
    scrollContainer.value = el || window
  } else {
    scrollContainer.value = window
  }

  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true })
  }
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    if (props.useObserver) {
      setupObserver()
    } else {
      setupScrollListener()
    }

    // 初始检查
    if (props.immediateCheck) {
      checkLoad()
    }
  })
})

onBeforeUnmount(() => {
  // 清理 RAF
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }

  // 清理 IntersectionObserver
  if (observer) {
    observer.disconnect()
    observer = null
  }

  // 清理滚动监听
  if (scrollContainer.value && !props.useObserver) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})

// 监听变化
watch(() => props.loading, (val, oldVal) => {
  // loading 从 true 变为 false 时，需要重新检查
  if (oldVal && !val && props.immediateCheck) {
    nextTick(() => {
      // 对于 IntersectionObserver 模式，需要重新观察以触发连续加载
      if (props.useObserver && observer && placeholderRef.value) {
        // 断开并重新观察，以便在 placeholder 仍在视口内时触发加载
        observer.unobserve(placeholderRef.value)
        observer.observe(placeholderRef.value)
      } else {
        checkLoad()
      }
    })
  }
})

watch(() => props.useObserver, () => {
  if (props.useObserver) {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('scroll', handleScroll)
    }
    setupObserver()
  } else {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    setupScrollListener()
  }
})

// 暴露方法
defineExpose({
  /** 手动检查是否需要加载 */
  check: checkLoad,
  /** 重试加载 */
  retry: handleRetry
})
</script>

<template>
  <div ref="rootRef" :class="[ns.b(), ns.is(direction)]" :style="themeStyle">
    <!-- 内容区域 -->
    <div :class="ns.e('content')">
      <slot />
    </div>

    <!-- 状态占位区域 -->
    <div ref="placeholderRef" :class="ns.e('placeholder')">
      <!-- 加载中 -->
      <div v-if="loading" :class="ns.e('loading')">
        <slot name="loading">
          <YhSpin size="small" />
          <span :class="ns.e('text')">{{ loadingText || t('infinitescroll.loading') }}</span>
        </slot>
      </div>

      <!-- 加载完成 -->
      <div v-else-if="finished" :class="ns.e('finished')">
        <slot name="finished">
          <span :class="ns.e('text')">{{ finishedText || t('infinitescroll.finished') }}</span>
        </slot>
      </div>

      <!-- 加载失败 -->
      <div v-else-if="error" :class="ns.e('error')" @click="handleRetry">
        <slot name="error">
          <span :class="ns.e('text')">{{ errorText || t('infinitescroll.error') }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './infinite-scroll.scss';
</style>
