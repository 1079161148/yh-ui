import { type Ref, type ComputedRef } from 'vue'
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
export declare function useVirtualScroll<T = unknown>(
  options: VirtualScrollOptions<T>
): VirtualScrollReturn<T>
export default useVirtualScroll
