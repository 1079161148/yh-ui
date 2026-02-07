/**
 * useTableExport - 表格导出组合式函数
 * 支持 CSV / JSON / TXT / XML / HTML 等多种格式导出
 */
import type { Ref } from 'vue'
import type { TableColumn } from './table'

export type ExportType = 'csv' | 'json' | 'txt' | 'xml' | 'html'

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
}

export function useTableExport(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<TableColumn[]>
) {
  /**
   * 获取导出用的列配置
   */
  function getExportColumns(config: ExportConfig = {}): TableColumn[] {
    let cols = columns.value.filter(
      (col) => col.visible !== false && col.prop
    )

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
      if (config.showIndex) headerCells.push(escapeCSV(config.indexTitle || '序号'))
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
      if (config.showIndex) obj[config.indexTitle || '序号'] = idx + 1
      cols.forEach((col) => {
        const key = getLabel(col, config)
        obj[key] = config.formatCell
          ? config.formatCell(col.prop ? row[col.prop] : '', col, row)
          : (col.prop ? row[col.prop] : '')
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
      if (config.showIndex) lines.push(`    <column name="${escapeXML(config.indexTitle || '序号')}" />`)
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
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
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
      if (config.showIndex) lines.push(`<th>${escapeHTML(config.indexTitle || '序号')}</th>`)
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
    html: 'text/html;charset=utf-8'
  }

  const EXT_MAP: Record<ExportType, string> = {
    csv: '.csv',
    json: '.json',
    txt: '.txt',
    xml: '.xml',
    html: '.html'
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
    getExportColumns
  }
}

