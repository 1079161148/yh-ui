<script setup lang="ts" generic="T extends Record<string, unknown>">
/**
 * YhWaterfall - 高性能瀑布流组件
 * @description 核心采用最短列平衡算法，支持图片感知、入场动画与响应式断点
 */
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhWaterfall'
})

const props = withDefaults(
  defineProps<{
    /** 数据源 */
    items?: T[]
    /** 列数，支持响应式对象 { xs, sm, md, lg, xl } */
    cols?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
    /** 间距 (px) */
    gap?: number
    /** 是否开启入场动画 */
    animation?: boolean
    /** 动画延迟基数 (ms) */
    delay?: number
    /** 节点的唯一标识字段 */
    rowKey?: string
    /** 是否自动监听容器宽度变化 */
    responsive?: boolean
    /** 是否处于加载状态 */
    loading?: boolean
    /** 用于平衡布局的高度字段名 (若不提供则采用轮询算法) */
    heightProperty?: string
    /** 内部图片的选择器，用于在图片加载后自动计算布局 */
    imgSelector?: string
    /** 主题覆盖变量 */
    themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
  }>(),
  {
    items: () => [],
    cols: 2,
    gap: 16,
    animation: true,
    delay: 100,
    rowKey: 'id',
    responsive: true,
    loading: false,
    heightProperty: 'height',
    imgSelector: 'img',
    themeOverrides: undefined
  }
)

const ns = useNamespace('waterfall')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'waterfall',
  computed(() => props.themeOverrides)
)

const containerRef = ref<HTMLElement>()
const containerWidth = ref(0)

// 响应式断点配置
const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

// 计算当前实际列数
const currentCols = computed(() => {
  if (typeof props.cols === 'number') return props.cols
  const width = containerWidth.value
  const { xs, sm, md, lg, xl } = props.cols || {}
  if (width >= BREAKPOINTS.xl && xl !== undefined) return xl
  if (width >= BREAKPOINTS.lg && lg !== undefined) return lg
  if (width >= BREAKPOINTS.md && md !== undefined) return md
  if (width >= BREAKPOINTS.sm && sm !== undefined) return sm
  return xs ?? 1
})

/**
 * 核心算法：最短列平衡分配
 */
const columnsData = computed(() => {
  const count = currentCols.value
  const result: T[][] = Array.from({ length: count }, () => [])

  // 维护每列的高度累加器
  const columnHeights = new Array(count).fill(0)

  if (!props.items) return result

  props.items.forEach((item) => {
    const itemHeight = Number(item[props.heightProperty!] as number)

    // 如果高度有效且列数大于 1，寻找最短列
    if (!isNaN(itemHeight) && count > 1) {
      let minHeight = columnHeights[0]
      let minIdx = 0
      for (let i = 1; i < count; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i]
          minIdx = i
        }
      }
      result[minIdx].push(item)
      columnHeights[minIdx] += itemHeight + props.gap!
    } else {
      // 降级策略：普通轮询
      const idx = props.items!.indexOf(item) % count
      result[idx].push(item)
    }
  })

  return result
})

// 响应式监听
let resizeObserver: ResizeObserver | null = null
const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
  }
}

/**
 * 自动布局：监听图片加载
 */
const handleImageLoad = (e: Event) => {
  const target = e.target as HTMLElement
  if (props.imgSelector && target.matches(props.imgSelector)) {
    // 图片加载后延迟触发重排，确保 DOM 完整
    nextTick(updateWidth)
  }
}

onMounted(() => {
  updateWidth()
  if (props.responsive && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateWidth)
    })
    if (containerRef.value) {
      resizeObserver.observe(containerRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

const isRefreshing = computed(() => props.loading && props.items && props.items.length > 0)

// 维护一个最小高度，防止切换时抖动
const minContainerHeight = ref<string>('auto')

watch(
  () => props.loading,
  (val: boolean) => {
    if (val && containerRef.value) {
      // 开启加载时切换，记录当前高度作为最小高度，防止塌陷
      const height = containerRef.value.offsetHeight
      if (height > 0) {
        minContainerHeight.value = `${height}px`
      }
    } else {
      // 加载结束后的重置逻辑
      nextTick(() => {
        setTimeout(() => {
          minContainerHeight.value = 'auto'
        }, 300) // 延迟重置，给入场动画留出时间
      })
    }
  }
)

// 暴露 API
defineExpose({
  layout: updateWidth
})
</script>

<template>
  <div
    ref="containerRef"
    :class="[ns.b(), ns.is('loading', loading), ns.is('refreshing', isRefreshing)]"
    :style="[themeStyle, { gap: `${gap}px`, minHeight: minContainerHeight }]"
    @load.capture="handleImageLoad"
  >
    <!-- 内容区域：不管是数据还是骨架屏，都保持 DOM 结构一致性 -->
    <template v-if="(loading && items.length === 0) || items.length > 0">
      <div
        v-for="(col, colIdx) in columnsData"
        :key="colIdx"
        :class="ns.e('column')"
        :style="{ gap: `${gap}px` }"
      >
        <!-- 骨架屏分支 -->
        <template v-if="loading && items.length === 0">
          <slot name="loading">
            <div
              :class="[ns.e('item'), ns.em('item', 'skeleton')]"
              :style="{ height: '220px' }"
            ></div>
            <div
              :class="[ns.e('item'), ns.em('item', 'skeleton')]"
              :style="{ height: '160px' }"
            ></div>
            <div
              :class="[ns.e('item'), ns.em('item', 'skeleton')]"
              :style="{ height: '200px' }"
            ></div>
          </slot>
        </template>

        <!-- 实际数据分支 -->
        <template v-else>
          <div
            v-for="(item, itemIdx) in col"
            :key="(item[rowKey] as string | number) || `${colIdx}-${itemIdx}`"
            :class="[ns.e('item'), ns.em('item', animation ? 'animated' : '')]"
            :style="animation ? { transitionDelay: `${(itemIdx * delay) % 600}ms` } : {}"
          >
            <slot :item="item" :index="itemIdx" :column="colIdx" />
          </div>
        </template>
      </div>
    </template>

    <!-- 空状态 -->
    <div v-else :class="ns.e('empty')">
      <slot name="empty">{{ t('table.emptyText') }}</slot>
    </div>

    <!-- 刷新态蒙层：当有数据且正在加载时显示 -->
    <div v-if="isRefreshing" :class="ns.e('refresh-overlay')">
      <slot name="loading-overlay">
        <div :class="ns.e('loading-spinner')"></div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './waterfall.scss';
</style>
