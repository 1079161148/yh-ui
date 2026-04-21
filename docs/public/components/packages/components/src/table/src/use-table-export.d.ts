import type { Ref } from 'vue'
import type { TableColumn } from './table'
export type ExportType = 'csv' | 'json' | 'txt' | 'xml' | 'html' | 'xlsx'
export interface ExportConfig {
  /** 导出格式 */
  type?: ExportType
  /** 文件名（不含扩展名） */
  filename?: string
  /** 是否包含表头 */
  includeHeader?: boolean
  /** 指定导出列（prop 数组） */
  columns?: string[]
  /** 排除列（prop 数组） */
  excludeColumns?: string[]
  /** 是否只导出可见列 */
  visibleOnly?: boolean
  /** 自定义导出数据 */
  data?: Record<string, unknown>[]
  /** 自定义列标题映射 */
  columnTitles?: Record<string, string>
  /** 格式化单元格内容 */
  formatCell?: (value: unknown, column: TableColumn, row: Record<string, unknown>) => string
  /** 是否包含序号列 */
  showIndex?: boolean
  /** 序号列标题 */
  indexTitle?: string
  /** CSV 分隔符（仅CSV） */
  separator?: string
  /** 是否添加 BOM（仅CSV/TXT） */
  bom?: boolean
  /** 导出前回调，返回 false 可取消 */
  beforeExport?: () => boolean | Promise<boolean>
  /** 导出后回调 */
  afterExport?: (type: ExportType) => void
  /** 导出模式：download 下载 / string 返回内容 */
  mode?: 'download' | 'string'
  /** 工作表名称（仅XLSX） */
  sheetName?: string
  /** 列宽配置（仅XLSX），如 { name: 15, address: 30 } */
  columnWidths?: Record<string, number>
  /** 默认列宽（仅XLSX） */
  defaultColWidth?: number
  /** 是否自动调整列宽（仅XLSX） */
  autoWidth?: boolean
}
export declare function useTableExport(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<TableColumn[]>
): {
  exportData: (config?: ExportConfig) => Promise<string | void>
  toCSV: (config?: ExportConfig) => string
  toJSON: (config?: ExportConfig) => string
  toTXT: (config?: ExportConfig) => string
  toXML: (config?: ExportConfig) => string
  toHTML: (config?: ExportConfig) => string
  toXLSX: (config?: ExportConfig) => ArrayBuffer
  getExportColumns: (config?: ExportConfig) => TableColumn[]
}
