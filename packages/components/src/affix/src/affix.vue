<script setup lang="ts">
/**
 * YhAffix - 下世代高性能固钉组件
 * @description 性能与功能双重超越。支持 IntersectionObserver 优化、Teleport 定位纠偏、容器推行算法。
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef, nextTick } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { affixProps, affixEmits } from './affix'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'YhAffix'
})

const props = defineProps(affixProps)
const emit = defineEmits(affixEmits)

const ns = useNamespace('affix')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'affix',
  computed(() => props.themeOverrides)
)

// 引用
const root = shallowRef<HTMLElement>()
const content = shallowRef<HTMLElement>()
const target = shallowRef<HTMLElement>()

// 状态
const fixed = ref(false)
const _scrollTop = ref(0)
const transform = ref(0)
const isIntersecting = ref(false)

// 存储原始位置数据
const rootRect = ref({
  top: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0
})

const updateRect = () => {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  rootRect.value = {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height
  }
}

// 核心计算算法 - 性能超越版
const update = () => {
  if (!root.value || props.disabled) return

  // 性能优化：如果元素离视口触发区太远（通过 IO 判断），跳过重算
  if (!isIntersecting.value && !fixed.value) return

  updateRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  let shouldFix = false

  if (props.position === 'top') {
    if (props.target) {
      const targetRect = target.value!.getBoundingClientRect()
      // 容器模式
      shouldFix = props.offset > rootRect.value.top && targetRect.bottom > 0
      const diff = targetRect.bottom - props.offset - rootRect.value.height
      transform.value = diff < 0 ? diff : 0
    } else {
      // 视口模式
      shouldFix = props.offset > rootRect.value.top
    }
  } else {
    // 底部固定逻辑
    if (props.target) {
      const targetRect = target.value!.getBoundingClientRect()
      shouldFix =
        viewportHeight - props.offset < rootRect.value.bottom && targetRect.top < viewportHeight
      const diff = viewportHeight - targetRect.top - props.offset - rootRect.value.height
      transform.value = diff < 0 ? diff : 0
    } else {
      shouldFix = viewportHeight - props.offset < rootRect.value.bottom
    }
  }

  if (shouldFix !== fixed.value) {
    fixed.value = shouldFix
    emit('change', shouldFix)
  }

  const currentScrollTop = window.scrollY || document.documentElement.scrollTop
  _scrollTop.value = currentScrollTop
  emit('scroll', { scrollTop: currentScrollTop, fixed: fixed.value })
}

// 事件治理
const handleScroll = () => {
  update()
}

// 观测系统初始化
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

const initObservers = () => {
  // 1. 性能：IntersectionObserver (IO)
  // 仅在元素出现在视口上下 500px 范围内时才监听高频滚动更新
  io = new IntersectionObserver(
    (entries) => {
      isIntersecting.value = entries[0].isIntersecting
      if (isIntersecting.value) update()
    },
    {
      rootMargin: '500px 0px 500px 0px'
    }
  )
  if (root.value) io.observe(root.value)

  // 2. 准确：ResizeObserver (RO)
  // 同时监听占位符和内容的尺寸变化，彻底解决动态高度导致的抖动
  ro = new ResizeObserver(() => update())
  if (root.value) ro.observe(root.value)
  if (content.value) ro.observe(content.value)
  if (target.value) ro.observe(target.value)
}

onMounted(() => {
  if (props.target) {
    target.value = document.querySelector(props.target) as HTMLElement
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)

  initObservers()
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  io?.disconnect()
  ro?.disconnect()
})

// 监听响应式属性
watch(
  () => [props.offset, props.position, props.target, props.disabled],
  () => {
    nextTick(update)
  },
  { deep: true }
)

// 样式与动画系统的统一合并
const placeholderStyle = computed<CSSProperties>(() => {
  return {
    ...(themeStyle.value as CSSProperties),
    height: fixed.value ? `${rootRect.value.height}px` : '',
    width: fixed.value ? `${rootRect.value.width}px` : ''
  }
})

const affixStyle = computed<CSSProperties>(() => {
  if (!fixed.value) return {}

  const offset = `${props.offset}px`
  const style: CSSProperties = {
    position: 'fixed',
    zIndex: props.zIndex,
    width: `${rootRect.value.width}px`,
    left: `${rootRect.value.left}px`,
    // 通过 transform translateY 结合 transform.value 实现容器边缘推开动画
    transform: `translateY(${transform.value}px)`,
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    ...props.affixStyle
  }

  if (props.position === 'top') {
    style.top = offset
  } else {
    style.bottom = offset
  }

  return style
})

defineExpose({
  update,
  fixed,
  scrollTop: _scrollTop
})
</script>

<template>
  <div ref="root" :class="ns.b()" :style="placeholderStyle">
    <!-- 使用 Teleport 解决父级 transform 导致的定位降级（超越标准实现） -->
    <Teleport :to="props.appendTo" :disabled="!props.teleported || !fixed">
      <div ref="content" :class="[ns.e('inner'), { [ns.is('fixed')]: fixed }]" :style="affixStyle">
        <slot :fixed="fixed" />
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './affix.scss';
</style>
