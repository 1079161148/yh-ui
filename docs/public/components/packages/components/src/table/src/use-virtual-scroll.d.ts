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
import { type Ref } from 'vue'
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
  visibleRange: Ref<{
    start: number
    end: number
  }>
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
export declare const useVirtualScroll: (options: VirtualScrollOptions) => VirtualScrollReturn
