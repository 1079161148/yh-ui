/**
 * useVirtualScroll - 虚拟滚动 Hook
 * @description 用于大数据量列表的虚拟滚动渲染
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface VirtualScrollOptions<T = unknown> {
  /** 每项高度 */
  itemHeight: number
  /** 容器高度 */
  containerHeight: number
  /** 数据列表 */
  items: Ref<T[]> | T[]
  /** 上下额外渲染数量 */
  overscan?: number
}

export interface VirtualScrollReturn<T = unknown> {
  /** 可见项列表 */
  visibleItems: ComputedRef<T[]>
  /** 总高度 */
  totalHeight: ComputedRef<number>
  /** Y轴偏移量 */
  offsetY: ComputedRef<number>
  /** 起始索引 */
  startIndex: Ref<number>
  /** 结束索引 */
  endIndex: Ref<number>
  /** 滚动事件处理 */
  onScroll: (event: Event) => void
  /** 滚动到指定索引 */
  scrollToIndex: (index: number) => void
  /** 容器引用 */
  containerRef: Ref<HTMLElement | null>
}

export function useVirtualScroll<T = unknown>(
  options: VirtualScrollOptions<T>
): VirtualScrollReturn<T> {
  const { itemHeight, containerHeight, overscan = 3 } = options

  const containerRef = ref<HTMLElement | null>(null)
  const scrollTop = ref(0)

  // 获取 items 的响应式值
  const itemsRef = computed(() => {
    const items = options.items
    return Array.isArray(items) ? items : items.value
  })

  // 计算总高度
  const totalHeight = computed(() => itemsRef.value.length * itemHeight)

  // 计算可见数量
  const visibleCount = computed(() => Math.ceil(containerHeight / itemHeight))

  // 计算起始索引
  const startIndex = computed(() => {
    const items = itemsRef.value
    if (items.length === 0) return 0
    const start = Math.floor(scrollTop.value / itemHeight)
    return Math.max(0, start - overscan)
  })

  // 计算结束索引
  const endIndex = computed(() => {
    const items = itemsRef.value
    if (items.length === 0) return 0
    const start = Math.floor(scrollTop.value / itemHeight)
    const end = start + visibleCount.value
    return Math.min(items.length, end + overscan)
  })

  // 计算可见项
  const visibleItems = computed(() => {
    const items = itemsRef.value
    if (items.length === 0) return []
    return items.slice(startIndex.value, endIndex.value)
  })

  // 计算偏移量
  const offsetY = computed(() => startIndex.value * itemHeight)

  // 滚动事件处理
  const onScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (containerRef.value) {
      const targetScrollTop = index * itemHeight
      containerRef.value.scrollTop = targetScrollTop
      scrollTop.value = targetScrollTop
    }
  }

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex: computed(() => startIndex.value) as unknown as Ref<number>,
    endIndex: computed(() => endIndex.value) as unknown as Ref<number>,
    onScroll,
    scrollToIndex,
    containerRef
  }
}

export default useVirtualScroll
