/**
 * useVirtualScroll
 * @description 高性能虚拟滚动 Hook —— 业内最佳实践
 *
 * 核心设计原则：
 * 1. 单一 phantom div 撑起滚动条高度，table 通过 transform 定位 → 消除 spacer div 重排
 * 2. requestAnimationFrame 合并滚动更新 → 与浏览器帧完美同步，杜绝画面撕裂
 * 3. will-change: transform + translate3d → GPU 合成层加速，零 layout/paint 开销
 * 4. 二分查找 + 行高缓存 → O(log N) 定位，百万行零延迟
 */

import { ref, computed, watch, onMounted, onUnmounted, shallowRef, type Ref } from 'vue'
import type { TableVirtualConfig } from './table'

export interface VirtualScrollOptions {
  data: Ref<Record<string, unknown>[]>
  containerRef: Ref<HTMLElement | null>
  config: Ref<TableVirtualConfig | undefined>
  rowKey: (row: Record<string, unknown>) => string | number
}

export interface VirtualScrollReturn {
  /** 可见数据 */
  visibleData: Ref<Record<string, unknown>[]>
  /** 可见数据范围 */
  visibleRange: Ref<{ start: number; end: number }>
  /** 上方偏移 (用于 transform) */
  offsetTop: Ref<number>
  /** 总内容高度 (用于 phantom div) */
  totalHeight: Ref<number>
  /** 滚动处理 */
  handleScroll: (event: Event) => void
  /** 滚动到指定索引 */
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void
  /** 滚动到指定行 */
  scrollToRow: (row: Record<string, unknown>, behavior?: ScrollBehavior) => void
  /** 刷新虚拟滚动 */
  refresh: () => void
  /** 是否启用虚拟滚动 */
  isVirtual: Ref<boolean>
}

export const useVirtualScroll = (options: VirtualScrollOptions): VirtualScrollReturn => {
  const { data, containerRef, config, rowKey } = options

  // ==================== 默认配置 ====================
  const defaultConfig: Required<TableVirtualConfig> = {
    enabled: false,
    rowHeight: 48,
    buffer: 5,
    overscan: 3,
    columnVirtual: false,
    columnBuffer: 3
  }

  const mergedConfig = computed(() => ({
    ...defaultConfig,
    ...config.value
  }))

  // ==================== 是否启用 ====================
  const isVirtual = computed(() => {
    if (!mergedConfig.value.enabled) return false
    return data.value.length > 100
  })

  // ==================== 状态 ====================
  const scrollTop = ref(0)
  const containerHeight = ref(0)

  // 行高缓存（支持动态行高）
  const rowHeightCache = shallowRef<Map<string | number, number>>(new Map())

  // ==================== 浏览器滚动高度上限 ====================
  // Chrome/Edge 最大元素高度约 33,554,432px (2^25)
  // 超过此值滚动条无法到达末尾，需要做高度缩放映射
  const MAX_SCROLL_HEIGHT = 15_000_000 // 安全阈值（留余量兼容各浏览器）

  // ==================== 是否固定行高（优化百万级数据） ====================
  const isFixedRowHeight = computed(() => typeof mergedConfig.value.rowHeight !== 'function')
  const fixedHeight = computed(() => (isFixedRowHeight.value ? (mergedConfig.value.rowHeight as number) : 0))

  // ==================== 行高计算（仅动态行高场景使用） ====================
  const getRowHeight = (row: Record<string, unknown>, index: number): number => {
    if (isFixedRowHeight.value) return fixedHeight.value

    const key = rowKey(row)
    const cached = rowHeightCache.value.get(key)
    if (cached !== undefined) return cached

    const { rowHeight } = mergedConfig.value
    if (typeof rowHeight === 'function') {
      const height = rowHeight(row, index)
      rowHeightCache.value.set(key, height)
      return height
    }

    return rowHeight as number
  }

  // ==================== 行位置累积表（仅动态行高场景使用） ====================
  const rowPositions = computed(() => {
    if (!isVirtual.value || isFixedRowHeight.value) return []

    const positions: Array<{ index: number; top: number; height: number; bottom: number }> = []
    let top = 0

    data.value.forEach((row, index) => {
      const height = getRowHeight(row, index)
      positions.push({ index, top, height, bottom: top + height })
      top += height
    })

    return positions
  })

  // ==================== 真实总高度（未缩放） ====================
  const realTotalHeight = computed(() => {
    if (!isVirtual.value) return 0
    // 固定行高: O(1) 计算
    if (isFixedRowHeight.value) return data.value.length * fixedHeight.value
    // 动态行高: 从 positions 数组获取
    if (rowPositions.value.length === 0) return 0
    return rowPositions.value[rowPositions.value.length - 1]?.bottom || 0
  })

  // ==================== 高度缩放比 ====================
  // 当真实总高度超过浏览器上限时，phantom 使用缩放后的高度
  // scrollTop 需通过 heightScale 反算为真实位置
  const needScale = computed(() => realTotalHeight.value > MAX_SCROLL_HEIGHT)
  const heightScale = computed(() =>
    needScale.value ? realTotalHeight.value / MAX_SCROLL_HEIGHT : 1
  )

  // ==================== 总高度（用于 phantom div，已缩放） ====================
  const totalHeight = computed(() => {
    if (!isVirtual.value) return 0
    return needScale.value ? MAX_SCROLL_HEIGHT : realTotalHeight.value
  })

  // ==================== 二分查找（动态行高） ====================
  const findStartIndexDynamic = (scrollPos: number): number => {
    const positions = rowPositions.value
    if (positions.length === 0) return 0

    let low = 0
    let high = positions.length - 1

    while (low <= high) {
      const mid = (low + high) >>> 1
      const { top, bottom } = positions[mid]

      if (scrollPos >= top && scrollPos < bottom) {
        return mid
      } else if (scrollPos < top) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return Math.max(0, low - 1)
  }

  const findEndIndexDynamic = (startIndex: number, viewportHeight: number): number => {
    const positions = rowPositions.value
    if (positions.length === 0) return 0

    const startPosition = positions[startIndex]
    if (!startPosition) return startIndex

    const endScrollTop = startPosition.top + viewportHeight
    let endIndex = startIndex

    while (endIndex < positions.length && positions[endIndex].top < endScrollTop) {
      endIndex++
    }

    return Math.min(endIndex, positions.length - 1)
  }

  // ==================== O(1) 查找（固定行高） ====================
  const findStartIndex = (scrollPos: number): number => {
    if (isFixedRowHeight.value) {
      return Math.floor(scrollPos / fixedHeight.value)
    }
    return findStartIndexDynamic(scrollPos)
  }

  const findEndIndex = (startIndex: number, viewportHeight: number): number => {
    if (isFixedRowHeight.value) {
      return Math.min(
        startIndex + Math.ceil(viewportHeight / fixedHeight.value),
        data.value.length - 1
      )
    }
    return findEndIndexDynamic(startIndex, viewportHeight)
  }

  // ==================== 真实 scrollTop（经过缩放反算） ====================
  const realScrollTop = computed(() => scrollTop.value * heightScale.value)

  // ==================== 可见范围 ====================
  const visibleRange = computed(() => {
    if (!isVirtual.value) {
      return { start: 0, end: data.value.length - 1 }
    }

    const { buffer, overscan } = mergedConfig.value
    const extra = buffer + overscan
    const startIndex = findStartIndex(realScrollTop.value)
    const endIndex = findEndIndex(startIndex, containerHeight.value)

    return {
      start: Math.max(0, startIndex - extra),
      end: Math.min(data.value.length - 1, endIndex + extra)
    }
  })

  // ==================== 可见数据 ====================
  const visibleData = computed(() => {
    if (!isVirtual.value) return data.value

    const { start, end } = visibleRange.value
    return data.value.slice(start, end + 1)
  })

  // ==================== 偏移量（用于 transform，未缩放的真实像素值） ====================
  const offsetTop = computed(() => {
    if (!isVirtual.value || visibleRange.value.start === 0) return 0

    // 固定行高: O(1) 计算
    if (isFixedRowHeight.value) {
      return visibleRange.value.start * fixedHeight.value
    }

    // 动态行高: 查表
    const positions = rowPositions.value
    return positions[visibleRange.value.start]?.top || 0
  })

  // ==================== 缩放后的偏移量（用于 CSS transform） ====================
  // 当有高度缩放时，transform 需要使用缩放后的值才能和 phantom 对齐
  const scaledOffsetTop = computed(() => {
    if (!needScale.value) return offsetTop.value
    return offsetTop.value / heightScale.value
  })

  // ==================== 滚动处理（rAF 合并，防止帧撕裂） ====================
  let rafId: number | null = null

  const handleScroll = (_event: Event) => {
    // 读取 scrollTop 必须同步（浏览器在 scroll 事件中保证值的正确性）
    const target = containerRef.value
    if (!target) return

    const currentScrollTop = target.scrollTop

    // 使用 rAF 合并连续快速滚动的多次更新到一帧
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      rafId = null
      scrollTop.value = currentScrollTop
    })
  }

  // ==================== 滚动到指定索引 ====================
  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'auto') => {
    const container = containerRef.value
    if (!container) return

    let realTop: number

    // 固定行高: O(1) 计算
    if (isFixedRowHeight.value) {
      realTop = index * fixedHeight.value
    } else if (!isVirtual.value) {
      realTop = index * (mergedConfig.value.rowHeight as number)
    } else {
      const positions = rowPositions.value
      const position = positions[index]
      if (!position) return
      realTop = position.top
    }

    // 如果有高度缩放，scrollTop 需要缩放
    const scrollTarget = needScale.value ? realTop / heightScale.value : realTop
    container.scrollTo({ top: scrollTarget, behavior })
  }

  // ==================== 滚动到指定行 ====================
  const scrollToRow = (row: Record<string, unknown>, behavior: ScrollBehavior = 'auto') => {
    const key = rowKey(row)
    const index = data.value.findIndex((item) => rowKey(item) === key)
    if (index !== -1) {
      scrollToIndex(index, behavior)
    }
  }

  // ==================== 刷新 ====================
  const refresh = () => {
    rowHeightCache.value.clear()
    updateContainerHeight()
  }

  // ==================== 容器高度更新 ====================
  const updateContainerHeight = () => {
    const container = containerRef.value
    if (container) {
      containerHeight.value = container.clientHeight
    }
  }

  // ==================== ResizeObserver ====================
  let resizeObserver: ResizeObserver | null = null

  onMounted(() => {
    updateContainerHeight()

    if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateContainerHeight()
      })
      resizeObserver.observe(containerRef.value)
    }
  })

  onUnmounted(() => {
    // 清理 rAF
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  // 数据变化时清空行高缓存
  watch(
    () => data.value.length,
    () => {
      rowHeightCache.value.clear()
    }
  )

  return {
    visibleData,
    visibleRange,
    offsetTop: scaledOffsetTop,
    totalHeight,
    handleScroll,
    scrollToIndex,
    scrollToRow,
    refresh,
    isVirtual
  }
}
