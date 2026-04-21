/**
 * useTableImport - 表格导入组合式函数
 * 支持 CSV / JSON / TXT / XML / HTML / XLSX 等多种格式导入
 */
import type { Ref } from 'vue'
import type { TableColumn } from './table'
export type ImportType = 'csv' | 'json' | 'txt' | 'xml' | 'html' | 'xlsx'
export type ImportMode = 'covering' | 'insertTop' | 'insertBottom'
export interface ImportConfig {
  /** 导入格式（不指定则自动根据文件扩展名推断） */
  type?: ImportType
  /** 导入模式 */
  mode?: ImportMode
  /** CSV 分隔符 */
  separator?: string
  /** 指定导入列的字段映射：文件列名 → prop */
  fieldMapping?: Record<string, string>
  /** 列标题 → prop 的自动映射（默认使用 columns label） */
  autoMapping?: boolean
  /** 数值列（自动转 Number） */
  numberFields?: string[]
  /** 数据行数限制 */
  maxRows?: number
  /** 导入前校验 */
  beforeImport?: (
    rows: Record<string, unknown>[]
  ) => boolean | Record<string, unknown>[] | Promise<boolean | Record<string, unknown>[]>
  /** 导入后回调 */
  afterImport?: (rows: Record<string, unknown>[], mode: ImportMode) => void
  /** 读取文件编码 */
  encoding?: string
  /** 读取的工作表索引（仅XLSX，默认 0） */
  sheetIndex?: number
  /** 读取的工作表名称（仅XLSX，优先于 sheetIndex） */
  sheetName?: string
  /** 是否将第一行作为表头（仅XLSX，默认 true） */
  headerRow?: boolean
}
export declare function useTableImport(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<TableColumn[]>
): {
  importFile: (file: File, config?: ImportConfig) => Promise<Record<string, unknown>[]>
  importData: (
    content: string | Record<string, unknown>[],
    config?: ImportConfig
  ) => Promise<Record<string, unknown>[]>
  openImport: (config?: ImportConfig) => Promise<Record<string, unknown>[]>
  parseCSV: (text: string, config?: ImportConfig) => Record<string, unknown>[]
  parseTXT: (text: string, config?: ImportConfig) => Record<string, unknown>[]
  parseJSON: (text: string, config?: ImportConfig) => Record<string, unknown>[]
  parseXML: (text: string, config?: ImportConfig) => Record<string, unknown>[]
  parseHTML: (text: string, config?: ImportConfig) => Record<string, unknown>[]
  parseXLSX: (buffer: ArrayBuffer, config?: ImportConfig) => Record<string, unknown>[]
  parseContent: (text: string, type: ImportType, config?: ImportConfig) => Record<string, unknown>[]
  applyImport: (rows: Record<string, unknown>[], mode?: ImportMode) => void
}
