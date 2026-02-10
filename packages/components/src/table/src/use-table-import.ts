/**
 * useTableImport - 表格导入组合式函数
 * 支持 CSV / JSON / TXT / XML / HTML / XLSX 等多种格式导入
 */
import type { Ref } from 'vue'
import type { TableColumn } from './table'
import * as XLSX from 'xlsx'
import { useLocale } from '@yh-ui/hooks'

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
  // ========== XLSX 专用配置 ==========
  /** 读取的工作表索引（仅XLSX，默认 0） */
  sheetIndex?: number
  /** 读取的工作表名称（仅XLSX，优先于 sheetIndex） */
  sheetName?: string
  /** 是否将第一行作为表头（仅XLSX，默认 true） */
  headerRow?: boolean
}

export function useTableImport(data: Ref<Record<string, unknown>[]>, columns: Ref<TableColumn[]>) {
  const { t } = useLocale()
  /**
   * 根据列配置构建 label→prop 映射
   */
  function buildLabelMap(): Map<string, { prop: string; isNumber?: boolean }> {
    const map = new Map<string, { prop: string; isNumber?: boolean }>()
    columns.value.forEach((col) => {
      if (col.prop) {
        // prop 名直接映射
        map.set(col.prop, { prop: col.prop })
        // label 名映射
        if (col.label) {
          map.set(col.label, { prop: col.prop })
        }
      }
    })
    return map
  }

  /**
   * 映射一行数据的 key 到 prop
   */
  function mapRow(
    row: Record<string, unknown>,
    labelMap: Map<string, { prop: string }>,
    config: ImportConfig
  ): Record<string, unknown> {
    const mapped: Record<string, unknown> = {}

    Object.entries(row).forEach(([key, val]) => {
      let prop = key
      // 自定义映射优先
      if (config.fieldMapping?.[key]) {
        prop = config.fieldMapping[key]
      } else if (config.autoMapping !== false) {
        const info = labelMap.get(key)
        if (info) prop = info.prop
      }

      // 数值转换
      if (config.numberFields?.includes(prop)) {
        const num = Number(val)
        mapped[prop] = isNaN(num) ? val : num
      } else {
        mapped[prop] = val
      }
    })

    return mapped
  }

  // ================== CSV 解析 ==================

  function parseCSV(text: string, config: ImportConfig = {}): Record<string, unknown>[] {
    const sep = config.separator || ','
    const lines = text.split(/\r?\n/).filter((l) => l.trim())
    if (lines.length < 2) return []

    const headers = parseCSVLine(lines[0], sep)
    const labelMap = buildLabelMap()

    let rows = lines.slice(1).map((line) => {
      const vals = parseCSVLine(line, sep)
      const row: Record<string, unknown> = {}
      headers.forEach((h, i) => {
        row[h] = vals[i] ?? ''
      })
      return mapRow(row, labelMap, config)
    })

    if (config.maxRows) rows = rows.slice(0, config.maxRows)
    return rows
  }

  /**
   * 解析 CSV 行（处理引号内的分隔符和换行）
   */
  function parseCSVLine(line: string, sep: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"'
            i++
          } else {
            inQuotes = false
          }
        } else {
          current += ch
        }
      } else {
        if (ch === '"') {
          inQuotes = true
        } else if (ch === sep) {
          result.push(current.trim())
          current = ''
        } else {
          current += ch
        }
      }
    }
    result.push(current.trim())
    return result
  }

  // ================== TXT 解析（Tab 分隔） ==================

  function parseTXT(text: string, config: ImportConfig = {}): Record<string, unknown>[] {
    return parseCSV(text, { ...config, separator: '\t' })
  }

  // ================== JSON 解析 ==================

  function parseJSON(text: string, config: ImportConfig = {}): Record<string, unknown>[] {
    try {
      const parsed = JSON.parse(text)
      const arr = Array.isArray(parsed) ? parsed : [parsed]
      const labelMap = buildLabelMap()

      let rows = arr.map((item: Record<string, unknown>) => mapRow(item, labelMap, config))
      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch {
      console.warn('[YhTable] JSON 解析失败')
      return []
    }
  }

  // ================== XML 解析 ==================

  function parseXML(text: string, config: ImportConfig = {}): Record<string, unknown>[] {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'application/xml')
      const labelMap = buildLabelMap()

      // 尝试获取列名
      const colNodes = doc.querySelectorAll('column')
      const colNames: string[] = []
      colNodes.forEach((n) => colNames.push(n.getAttribute('name') || ''))

      const rowNodes = doc.querySelectorAll('row')
      let rows: Record<string, unknown>[] = []

      rowNodes.forEach((rn) => {
        const cellNodes = rn.querySelectorAll('cell')
        const row: Record<string, unknown> = {}
        cellNodes.forEach((cn, i) => {
          const key = colNames[i] || `col${i}`
          row[key] = cn.textContent || ''
        })
        rows.push(mapRow(row, labelMap, config))
      })

      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch {
      console.warn('[YhTable] XML 解析失败')
      return []
    }
  }

  // ================== HTML 解析 ==================

  function parseHTML(text: string, config: ImportConfig = {}): Record<string, unknown>[] {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/html')
      const labelMap = buildLabelMap()

      // 获取表头
      const ths = doc.querySelectorAll('thead th, thead td')
      const headers: string[] = []
      ths.forEach((th) => headers.push(th.textContent?.trim() || ''))

      // 获取数据行
      const trs = doc.querySelectorAll('tbody tr')
      let rows: Record<string, unknown>[] = []

      trs.forEach((tr) => {
        const tds = tr.querySelectorAll('td')
        const row: Record<string, unknown> = {}
        tds.forEach((td, i) => {
          const key = headers[i] || `col${i}`
          row[key] = td.textContent?.trim() || ''
        })
        rows.push(mapRow(row, labelMap, config))
      })

      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch {
      console.warn('[YhTable] HTML 解析失败')
      return []
    }
  }

  // ================== 应用导入 ==================

  function applyImport(rows: Record<string, unknown>[], mode: ImportMode = 'insertBottom') {
    switch (mode) {
      case 'covering':
        data.value = rows
        break
      case 'insertTop':
        data.value = [...rows, ...data.value]
        break
      case 'insertBottom':
      default:
        data.value = [...data.value, ...rows]
        break
    }
  }

  // ================== XLSX 解析 ==================

  function parseXLSX(buffer: ArrayBuffer, config: ImportConfig = {}): Record<string, unknown>[] {
    try {
      const labelMap = buildLabelMap()

      // 读取工作簿
      const wb = XLSX.read(buffer, { type: 'array' })

      // 获取工作表
      let sheetName = config.sheetName
      if (!sheetName) {
        const idx = config.sheetIndex ?? 0
        sheetName = wb.SheetNames[idx]
      }
      const ws = wb.Sheets[sheetName]
      if (!ws) {
        console.warn('[YhTable] XLSX 工作表不存在:', sheetName)
        return []
      }

      // 转换为 JSON
      const useHeader = config.headerRow !== false
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
        header: useHeader ? undefined : 1,
        defval: ''
      })

      // 映射字段名
      let rows = jsonData.map((item) => mapRow(item, labelMap, config))
      if (config.maxRows) rows = rows.slice(0, config.maxRows)

      return rows
    } catch (err) {
      console.warn('[YhTable] XLSX 解析失败', err)
      return []
    }
  }

  // ================== 类型推断 ==================

  function guessType(filename: string): ImportType {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'csv':
        return 'csv'
      case 'json':
        return 'json'
      case 'txt':
        return 'txt'
      case 'xml':
        return 'xml'
      case 'html':
      case 'htm':
        return 'html'
      case 'xlsx':
      case 'xls':
      case 'xlsm':
        return 'xlsx'
      default:
        return 'csv'
    }
  }

  // ================== 解析文本内容 ==================

  function parseContent(
    text: string,
    type: ImportType,
    config: ImportConfig = {}
  ): Record<string, unknown>[] {
    switch (type) {
      case 'csv':
        return parseCSV(text, config)
      case 'txt':
        return parseTXT(text, config)
      case 'json':
        return parseJSON(text, config)
      case 'xml':
        return parseXML(text, config)
      case 'html':
        return parseHTML(text, config)
      default:
        return parseCSV(text, config)
    }
  }

  // ================== 主入口：从文件导入 ==================

  async function importFile(
    file: File,
    config: ImportConfig = {}
  ): Promise<Record<string, unknown>[]> {
    const type = config.type || guessType(file.name)
    const encoding = config.encoding || 'utf-8'
    const mode = config.mode || 'insertBottom'

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        let rows: Record<string, unknown>[]

        // XLSX 需要二进制读取
        if (type === 'xlsx') {
          const buffer = ev.target?.result as ArrayBuffer
          rows = parseXLSX(buffer, config)
        } else {
          const text = ev.target?.result as string
          rows = parseContent(text, type, config)
        }

        // 导入前校验
        if (config.beforeImport) {
          const result = await config.beforeImport(rows)
          if (result === false) {
            resolve([])
            return
          }
          if (Array.isArray(result)) {
            rows = result
          }
        }

        applyImport(rows, mode)
        config.afterImport?.(rows, mode)
        resolve(rows)
      }
      reader.onerror = () => reject(new Error(t('yh.upload.error')))

      // 根据类型选择读取方式
      if (type === 'xlsx') {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file, encoding)
      }
    })
  }

  // ================== 从文本内容导入 ==================

  async function importData(
    content: string | Record<string, unknown>[],
    config: ImportConfig = {}
  ): Promise<Record<string, unknown>[]> {
    const mode = config.mode || 'insertBottom'
    let rows: Record<string, unknown>[]

    if (typeof content === 'string') {
      const type = config.type || 'csv'
      rows = parseContent(content, type, config)
    } else {
      rows = content
    }

    if (config.beforeImport) {
      const result = await config.beforeImport(rows)
      if (result === false) return []
      if (Array.isArray(result)) rows = result
    }

    applyImport(rows, mode)
    config.afterImport?.(rows, mode)
    return rows
  }

  /**
   * 打开文件选择器导入
   */
  function openImport(config: ImportConfig = {}): Promise<Record<string, unknown>[]> {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'

      const acceptMap: Record<string, string> = {
        csv: '.csv',
        json: '.json',
        txt: '.txt',
        xml: '.xml',
        html: '.html,.htm',
        xlsx: '.xlsx,.xls,.xlsm'
      }
      input.accept = config.type
        ? acceptMap[config.type] || '*'
        : '.csv,.json,.txt,.xml,.html,.xlsx,.xls'

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const rows = await importFile(file, config)
          resolve(rows)
        } else {
          resolve([])
        }
      }
      input.click()
    })
  }

  return {
    importFile,
    importData,
    openImport,
    parseCSV,
    parseTXT,
    parseJSON,
    parseXML,
    parseHTML,
    parseXLSX,
    parseContent,
    applyImport
  }
}
