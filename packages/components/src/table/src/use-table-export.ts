import type { Ref } from 'vue'
import type { TableColumn } from './table'
import * as XLSX from 'xlsx'
import { useLocale } from '@yh-ui/hooks'

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
  // ========== XLSX 专用配置 ==========
  /** 工作表名称（仅XLSX） */
  sheetName?: string
  /** 列宽配置（仅XLSX），如 { name: 15, address: 30 } */
  columnWidths?: Record<string, number>
  /** 默认列宽（仅XLSX） */
  defaultColWidth?: number
  /** 是否自动调整列宽（仅XLSX） */
  autoWidth?: boolean
}

export function useTableExport(data: Ref<Record<string, unknown>[]>, columns: Ref<TableColumn[]>) {
  const { t } = useLocale()
  /**
   * 获取导出用的列配置
   */
  function getExportColumns(config: ExportConfig = {}): TableColumn[] {
    let cols = columns.value.filter((col) => col.visible !== false && col.prop)

    if (config.visibleOnly !== false) {
      cols = cols.filter((c) => c.visible !== false)
    }

    if (config.columns?.length) {
      cols = cols.filter((c) => config.columns!.includes(c.prop!))
    }

    if (config.excludeColumns?.length) {
      cols = cols.filter((c) => !config.excludeColumns!.includes(c.prop!))
    }

    return cols
  }

  /**
   * 获取单元格值
   */
  function getCellValue(
    row: Record<string, unknown>,
    col: TableColumn,
    config: ExportConfig
  ): string {
    const raw = col.prop ? row[col.prop] : ''
    if (config.formatCell) {
      return config.formatCell(raw, col, row)
    }
    if (typeof raw === 'boolean') {
      return raw ? t('table.yes') : t('table.no')
    }
    return raw == null ? '' : String(raw)
  }

  /**
   * 获取列标题
   */
  function getLabel(col: TableColumn, config: ExportConfig): string {
    if (config.columnTitles?.[col.prop!]) {
      return config.columnTitles[col.prop!]
    }
    return col.label || col.prop || ''
  }

  // ================== CSV ==================

  function toCSV(config: ExportConfig = {}): string {
    const sep = config.separator || ','
    const cols = getExportColumns(config)
    const rows = config.data || data.value

    const escapeCSV = (val: string): string => {
      if (val.includes(sep) || val.includes('\n') || val.includes('"')) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    }

    const lines: string[] = []

    if (config.includeHeader !== false) {
      const headerCells: string[] = []
      if (config.showIndex) headerCells.push(escapeCSV(config.indexTitle || t('table.index')))
      cols.forEach((col) => headerCells.push(escapeCSV(getLabel(col, config))))
      lines.push(headerCells.join(sep))
    }

    rows.forEach((row, idx) => {
      const cells: string[] = []
      if (config.showIndex) cells.push(String(idx + 1))
      cols.forEach((col) => cells.push(escapeCSV(getCellValue(row, col, config))))
      lines.push(cells.join(sep))
    })

    const content = lines.join('\n')
    return config.bom !== false ? '\uFEFF' + content : content
  }

  // ================== TXT ==================

  function toTXT(config: ExportConfig = {}): string {
    return toCSV({ ...config, separator: '\t', bom: config.bom !== false })
  }

  // ================== JSON ==================

  function toJSON(config: ExportConfig = {}): string {
    const cols = getExportColumns(config)
    const rows = config.data || data.value

    const result = rows.map((row, idx) => {
      const obj: Record<string, unknown> = {}
      if (config.showIndex) obj[config.indexTitle || t('table.index')] = idx + 1
      cols.forEach((col) => {
        const key = getLabel(col, config)
        obj[key] = config.formatCell
          ? config.formatCell(col.prop ? row[col.prop] : '', col, row)
          : col.prop
            ? row[col.prop]
            : ''
      })
      return obj
    })

    return JSON.stringify(result, null, 2)
  }

  // ================== XML ==================

  function toXML(config: ExportConfig = {}): string {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const lines: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<table>']

    if (config.includeHeader !== false) {
      lines.push('  <columns>')
      if (config.showIndex)
        lines.push(`    <column name="${escapeXML(config.indexTitle || t('table.index'))}" />`)
      cols.forEach((col) => {
        lines.push(`    <column name="${escapeXML(getLabel(col, config))}" />`)
      })
      lines.push('  </columns>')
    }

    lines.push('  <rows>')
    rows.forEach((row, idx) => {
      lines.push('    <row>')
      if (config.showIndex) lines.push(`      <cell>${idx + 1}</cell>`)
      cols.forEach((col) => {
        lines.push(`      <cell>${escapeXML(getCellValue(row, col, config))}</cell>`)
      })
      lines.push('    </row>')
    })
    lines.push('  </rows>')
    lines.push('</table>')

    return lines.join('\n')
  }

  function escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  // ================== HTML ==================

  function toHTML(config: ExportConfig = {}): string {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const lines: string[] = [
      '<!DOCTYPE html>',
      '<html><head><meta charset="UTF-8">',
      '<style>',
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:20px}',
      'table{width:100%;border-collapse:collapse;font-size:14px}',
      'th,td{padding:8px 12px;border:1px solid #dcdfe6;text-align:left}',
      'th{background:#f5f7fa;font-weight:600;color:#303133}',
      'tr:nth-child(even){background:#fafafa}',
      '</style></head><body>',
      '<table>'
    ]

    if (config.includeHeader !== false) {
      lines.push('<thead><tr>')
      if (config.showIndex)
        lines.push(`<th>${escapeHTML(config.indexTitle || t('table.index'))}</th>`)
      cols.forEach((col) => lines.push(`<th>${escapeHTML(getLabel(col, config))}</th>`))
      lines.push('</tr></thead>')
    }

    lines.push('<tbody>')
    rows.forEach((row, idx) => {
      lines.push('<tr>')
      if (config.showIndex) lines.push(`<td style="text-align:center">${idx + 1}</td>`)
      cols.forEach((col) => lines.push(`<td>${escapeHTML(getCellValue(row, col, config))}</td>`))
      lines.push('</tr>')
    })
    lines.push('</tbody></table></body></html>')

    return lines.join('\n')
  }

  function escapeHTML(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  // ================== XLSX ==================

  /**
   * 导出为 XLSX 格式
   */
  function toXLSX(config: ExportConfig = {}): ArrayBuffer {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const sheetName = config.sheetName || 'Sheet1'

    // 构建表头
    const headers: string[] = []
    if (config.showIndex) headers.push(config.indexTitle || t('table.index'))
    cols.forEach((col) => headers.push(getLabel(col, config)))

    // 构建数据行
    const dataRows = rows.map((row, idx) => {
      const rowData: (string | number)[] = []
      if (config.showIndex) rowData.push(idx + 1)
      cols.forEach((col) => {
        const val = col.prop ? row[col.prop] : ''
        if (config.formatCell) {
          rowData.push(config.formatCell(val, col, row))
        } else {
          rowData.push(val == null ? '' : (val as string | number))
        }
      })
      return rowData
    })

    // 创建工作表
    const wsData = [headers, ...dataRows]
    const ws = XLSX.utils.aoa_to_sheet(wsData)

    // 设置列宽
    const colWidths: XLSX.ColInfo[] = []
    headers.forEach((h, i) => {
      let width = config.defaultColWidth || 12

      // 使用自定义列宽
      const col = cols[config.showIndex ? i - 1 : i]
      if (col?.prop && config.columnWidths?.[col.prop]) {
        width = config.columnWidths[col.prop]
      } else if (config.autoWidth !== false) {
        // 自动计算列宽（基于表头和内容）
        let maxLen = h.length
        dataRows.forEach((row) => {
          const cellVal = String(row[i] ?? '')
          maxLen = Math.max(maxLen, cellVal.length)
        })
        width = Math.min(Math.max(maxLen + 2, 8), 50) // 限制在8-50之间
      }
      colWidths.push({ wch: width })
    })
    ws['!cols'] = colWidths

    // 创建工作簿并添加工作表
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)

    // 导出为二进制
    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  }

  /**
   * 下载 XLSX 文件
   */
  function downloadXLSX(buffer: ArrayBuffer, filename: string) {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ================== 通用导出 ==================

  function downloadFile(content: string, filename: string, mime: string) {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const MIME_MAP: Record<ExportType, string> = {
    csv: 'text/csv;charset=utf-8',
    json: 'application/json;charset=utf-8',
    txt: 'text/plain;charset=utf-8',
    xml: 'application/xml;charset=utf-8',
    html: 'text/html;charset=utf-8',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }

  const EXT_MAP: Record<ExportType, string> = {
    csv: '.csv',
    json: '.json',
    txt: '.txt',
    xml: '.xml',
    html: '.html',
    xlsx: '.xlsx'
  }

  /**
   * 导出数据
   */
  async function exportData(config: ExportConfig = {}): Promise<string | void> {
    const type = config.type || 'csv'
    const filename = config.filename || 'export'

    if (config.beforeExport) {
      const ok = await config.beforeExport()
      if (!ok) return
    }

    // XLSX 单独处理（二进制格式）
    if (type === 'xlsx') {
      const buffer = toXLSX(config)
      if (config.mode === 'string') {
        // XLSX 不支持 string 模式，返回 base64
        const uint8 = new Uint8Array(buffer)
        let binary = ''
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i])
        }
        config.afterExport?.(type)
        return btoa(binary)
      }
      downloadXLSX(buffer, `${filename}.xlsx`)
      config.afterExport?.(type)
      return
    }

    let content: string
    switch (type) {
      case 'csv':
        content = toCSV(config)
        break
      case 'txt':
        content = toTXT(config)
        break
      case 'json':
        content = toJSON(config)
        break
      case 'xml':
        content = toXML(config)
        break
      case 'html':
        content = toHTML(config)
        break
      default:
        content = toCSV(config)
    }

    if (config.mode === 'string') {
      config.afterExport?.(type)
      return content
    }

    downloadFile(content, `${filename}${EXT_MAP[type]}`, MIME_MAP[type])
    config.afterExport?.(type)
  }

  return {
    exportData,
    toCSV,
    toJSON,
    toTXT,
    toXML,
    toHTML,
    toXLSX,
    getExportColumns
  }
}
