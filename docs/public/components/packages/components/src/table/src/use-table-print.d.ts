import type { Ref } from 'vue'
import type { TableColumn } from './table'
export interface PrintConfig {
  /** 打印标题 */
  title?: string
  /** 是否显示序号 */
  showIndex?: boolean
  /** 序号列标题 */
  indexTitle?: string
  /** 指定打印列（prop 数组） */
  columns?: string[]
  /** 排除列 */
  excludeColumns?: string[]
  /** 自定义打印数据 */
  data?: Record<string, unknown>[]
  /** 格式化单元格 */
  formatCell?: (value: unknown, column: TableColumn, row: Record<string, unknown>) => string
  /** 自定义页眉 HTML */
  headerHtml?: string
  /** 自定义页脚 HTML */
  footerHtml?: string
  /** 页边距 */
  margin?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  /** 纸张方向 */
  orientation?: 'portrait' | 'landscape'
  /** 是否显示打印时间 */
  showTime?: boolean
  /** 是否显示数据条数 */
  showCount?: boolean
  /** 自定义列标题映射 */
  columnTitles?: Record<string, string>
  /** 每页最大行数（用于分页切割） */
  pageSize?: number
  /** 是否显示页码 */
  showPageNumber?: boolean
  /** 表格样式 */
  tableStyle?: string
  /** 打印前回调 */
  beforePrint?: () => boolean | Promise<boolean>
  /** 打印后回调 */
  afterPrint?: () => void
  /** 额外 CSS */
  extraCss?: string
  /** 是否自动打印（打开窗口后自动弹出打印对话框） */
  autoPrint?: boolean
}
export declare function useTablePrint(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<TableColumn[]>
): {
  print: (config?: PrintConfig) => Promise<void>
  printMultiple: (
    tables: Array<{
      title?: string
      data: Record<string, unknown>[]
      columns?: TableColumn[]
      config?: PrintConfig
    }>,
    globalConfig?: PrintConfig
  ) => Promise<void>
  printTemplate: (templateHtml: string, config?: PrintConfig) => Promise<void>
  getPrintColumns: (config?: PrintConfig) => TableColumn[]
}
