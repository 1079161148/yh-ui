import { ref, computed, unref, type Ref, type ComputedRef } from 'vue'

export interface VirtualScrollOptions<T = unknown> {
  /** 每项高度 */
  itemHeight: number | Ref<number>
  /** 容器高度 */
  containerHeight: number | Ref<number>
  /** 数据列表 */
  items: Ref<T[]> | T[]
  /** 上下额外渲染数量 */
  overscan?: number | Ref<number>
}

export interface VirtualScrollReturn<T = unknown> {
  /** 可见项列表 */
  visibleItems: ComputedRef<T[]>
  /** 总高度 */
  totalHeight: ComputedRef<number>
  /** Y轴偏移量 */
  offsetY: ComputedRef<number>
  /** 起始索引 */
  startIndex: ComputedRef<number>
  /** 结束索引 */
  endIndex: ComputedRef<number>
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
  const containerRef = ref<HTMLElement | null>(null)
  const scrollTop = ref(0)

  const itemsRef = computed(() => {
    return Array.isArray(options.items) ? options.items : options.items.value
  })

  const itemHeightRef = computed(() => unref(options.itemHeight))
  const containerHeightRef = computed(() => unref(options.containerHeight))
  const overscanRef = computed(() => unref(options.overscan) ?? 3)

  // 计算总高度
  const totalHeight = computed(() => itemsRef.value.length * itemHeightRef.value)

  // 计算起始索引
  const startIndex = computed(() => {
    if (itemsRef.value.length === 0) return 0
    const start = Math.floor(scrollTop.value / itemHeightRef.value)
    return Math.max(0, start - overscanRef.value)
  })

  // 计算结束索引
  const endIndex = computed(() => {
    if (itemsRef.value.length === 0) return 0
    const end = Math.ceil((scrollTop.value + containerHeightRef.value) / itemHeightRef.value)
    return Math.min(itemsRef.value.length, end + overscanRef.value)
  })

  // 计算可见项
  const visibleItems = computed(() => {
    return itemsRef.value.slice(startIndex.value, endIndex.value)
  })

  // 计算偏移量
  const offsetY = computed(() => startIndex.value * itemHeightRef.value)

  const onScroll = (event: Event) => {
    const target = event.target as HTMLElement
    if (target) scrollTop.value = target.scrollTop
  }

  const scrollToIndex = (index: number) => {
    if (containerRef.value) {
      const targetScrollTop = index * itemHeightRef.value
      containerRef.value.scrollTop = targetScrollTop
      scrollTop.value = targetScrollTop
    }
  }

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    onScroll,
    scrollToIndex,
    containerRef
  }
}

export default useVirtualScroll
