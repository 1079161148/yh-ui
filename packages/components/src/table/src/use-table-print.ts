/**
 * useTablePrint - 表格打印组合式函数
 * 支持自定义标题、页眉页脚、选择列、多页切割等
 */
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
  margin?: { top?: string; right?: string; bottom?: string; left?: string }
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

export function useTablePrint(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<TableColumn[]>
) {
  /**
   * 获取打印用的列
   */
  function getPrintColumns(config: PrintConfig = {}): TableColumn[] {
    let cols = columns.value.filter(
      (col) => col.visible !== false && col.prop
    )

    if (config.columns?.length) {
      cols = cols.filter((c) => config.columns!.includes(c.prop!))
    }

    if (config.excludeColumns?.length) {
      cols = cols.filter((c) => !config.excludeColumns!.includes(c.prop!))
    }

    return cols
  }

  function getLabel(col: TableColumn, config: PrintConfig): string {
    if (config.columnTitles?.[col.prop!]) {
      return config.columnTitles[col.prop!]
    }
    return col.label || col.prop || ''
  }

  function getCellValue(row: Record<string, unknown>, col: TableColumn, config: PrintConfig): string {
    const raw = col.prop ? row[col.prop] : ''
    if (config.formatCell) {
      return config.formatCell(raw, col, row)
    }
    return raw == null ? '' : String(raw)
  }

  function escapeHTML(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  /**
   * 构建打印 HTML 样式
   */
  function buildStyles(config: PrintConfig): string {
    const margin = config.margin || {}
    const mt = margin.top || '10mm'
    const mr = margin.right || '10mm'
    const mb = margin.bottom || '10mm'
    const ml = margin.left || '10mm'

    let css = [
      '*{margin:0;padding:0;box-sizing:border-box}',
      `@page{size:${config.orientation === 'landscape' ? 'landscape' : 'portrait'};margin:${mt} ${mr} ${mb} ${ml}}`,
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;color:#303133;padding:20px}',
      '.print-title{text-align:center;font-size:18px;font-weight:700;margin-bottom:12px;color:#303133}',
      '.print-header,.print-footer{text-align:center;color:#909399;font-size:12px;line-height:1.6}',
      '.print-header{margin-bottom:12px;border-bottom:1px solid #ebeef5;padding-bottom:8px}',
      '.print-footer{margin-top:12px;border-top:1px solid #ebeef5;padding-top:8px}',
      'table{width:100%;border-collapse:collapse;font-size:13px}',
      'th,td{padding:8px 12px;border:1px solid #dcdfe6;text-align:left;word-break:break-all}',
      'th{background:#f5f7fa;font-weight:600;color:#303133}',
      'tr:nth-child(even) td{background:#fafafa}',
      '.page-break{page-break-after:always}',
      '.page-number{text-align:center;font-size:11px;color:#909399;margin-top:8px}',
      '.no-print{text-align:center;margin-top:20px}',
      '.no-print button{padding:8px 24px;border-radius:4px;cursor:pointer;font-size:14px;border:none;margin:0 4px}',
      '.btn-print{background:#409eff;color:#fff}',
      '.btn-cancel{background:#fff;color:#606266;border:1px solid #dcdfe6!important}',
      '@media print{.no-print{display:none!important}.page-number{position:fixed;bottom:10mm;width:100%}}'
    ]

    if (config.extraCss) css.push(config.extraCss)
    if (config.tableStyle) css.push(`.print-table{${config.tableStyle}}`)

    return css.join('\n')
  }

  /**
   * 构建表头 HTML
   */
  function buildTableHead(cols: TableColumn[], config: PrintConfig): string {
    let html = '<thead><tr>'
    if (config.showIndex) {
      html += `<th style="width:50px;text-align:center">${escapeHTML(config.indexTitle || '序号')}</th>`
    }
    cols.forEach((col) => {
      const align = col.headerAlign || col.align || 'left'
      html += `<th style="text-align:${align}">${escapeHTML(getLabel(col, config))}</th>`
    })
    html += '</tr></thead>'
    return html
  }

  /**
   * 构建数据行 HTML
   */
  function buildTableRows(
    rows: Record<string, unknown>[],
    cols: TableColumn[],
    config: PrintConfig,
    startIndex = 0
  ): string {
    let html = ''
    rows.forEach((row, idx) => {
      html += '<tr>'
      if (config.showIndex) {
        html += `<td style="text-align:center">${startIndex + idx + 1}</td>`
      }
      cols.forEach((col) => {
        const align = col.align || 'left'
        html += `<td style="text-align:${align}">${escapeHTML(getCellValue(row, col, config))}</td>`
      })
      html += '</tr>'
    })
    return html
  }

  /**
   * 构建页脚信息
   */
  function buildInfoFooter(config: PrintConfig, totalRows: number): string {
    const parts: string[] = []
    if (config.showTime !== false) {
      parts.push('打印时间：' + new Date().toLocaleString())
    }
    if (config.showCount !== false) {
      parts.push('共 ' + totalRows + ' 条数据')
    }
    if (parts.length === 0) return ''
    return '<div class="print-footer">' + parts.join('&nbsp;&nbsp;') + '</div>'
  }

  // ================== 普通打印 ==================

  async function print(config: PrintConfig = {}): Promise<void> {
    if (config.beforePrint) {
      const ok = await config.beforePrint()
      if (!ok) return
    }

    const cols = getPrintColumns(config)
    const rows = config.data || data.value
    const title = config.title || ''

    const styles = buildStyles(config)
    const thead = buildTableHead(cols, config)

    let body = ''

    if (config.pageSize && config.pageSize > 0) {
      // 分页模式
      const totalPages = Math.ceil(rows.length / config.pageSize)
      for (let p = 0; p < totalPages; p++) {
        const pageRows = rows.slice(p * config.pageSize, (p + 1) * config.pageSize)
        const startIdx = p * config.pageSize
        const isLast = p === totalPages - 1

        if (title) body += `<div class="print-title">${escapeHTML(title)}</div>`
        if (config.headerHtml) body += `<div class="print-header">${config.headerHtml}</div>`

        body += '<table class="print-table">'
        body += thead
        body += '<tbody>' + buildTableRows(pageRows, cols, config, startIdx) + '</tbody>'
        body += '</table>'

        if (config.showPageNumber) {
          body += `<div class="page-number">第 ${p + 1} 页 / 共 ${totalPages} 页</div>`
        }

        if (config.footerHtml) body += `<div class="print-footer">${config.footerHtml}</div>`
        if (!isLast) body += '<div class="page-break"></div>'
      }

      body += buildInfoFooter(config, rows.length)
    } else {
      // 普通模式
      if (title) body += `<div class="print-title">${escapeHTML(title)}</div>`
      if (config.headerHtml) body += `<div class="print-header">${config.headerHtml}</div>`

      body += '<table class="print-table">'
      body += thead
      body += '<tbody>' + buildTableRows(rows, cols, config) + '</tbody>'
      body += '</table>'

      body += buildInfoFooter(config, rows.length)
      if (config.footerHtml) body += `<div class="print-footer">${config.footerHtml}</div>`
    }

    // 操作按钮
    body += '<div class="no-print">'
    body += '<button class="btn-print" onclick="window.print()">打 印</button>'
    body += '<button class="btn-cancel" onclick="window.close()">取 消</button>'
    body += '</div>'

    // 打开新窗口
    const printWin = window.open('', '_blank')
    if (!printWin) {
      console.warn('[YhTable] 无法打开打印窗口，请检查浏览器弹窗设置')
      return
    }

    // 使用字符串拼接避免 SFC 解析问题
    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      '<title>' + escapeHTML(title || '打印预览') + '</title>',
      '<' + 'style>' + styles + '</' + 'style>',
      '</head><body>',
      body,
      '</' + 'body></html>'
    ].join('')

    printWin.document.write(html)
    printWin.document.close()

    // 自动打印
    if (config.autoPrint) {
      printWin.onload = () => {
        printWin.print()
      }
    }

    config.afterPrint?.()
  }

  // ================== 打印多张表 ==================

  async function printMultiple(
    tables: Array<{
      title?: string
      data: Record<string, unknown>[]
      columns?: TableColumn[]
      config?: PrintConfig
    }>,
    globalConfig: PrintConfig = {}
  ): Promise<void> {
    if (globalConfig.beforePrint) {
      const ok = await globalConfig.beforePrint()
      if (!ok) return
    }

    const styles = buildStyles(globalConfig)
    let body = ''

    tables.forEach((table, tIdx) => {
      const cfg = { ...globalConfig, ...table.config }
      const cols = table.columns
        ? table.columns.filter((c) => c.visible !== false && c.prop)
        : getPrintColumns(cfg)
      const rows = table.data

      if (table.title) body += `<div class="print-title">${escapeHTML(table.title)}</div>`
      if (cfg.headerHtml) body += `<div class="print-header">${cfg.headerHtml}</div>`

      body += '<table class="print-table">'
      body += buildTableHead(cols, cfg)
      body += '<tbody>' + buildTableRows(rows, cols, cfg) + '</tbody>'
      body += '</table>'

      body += buildInfoFooter(cfg, rows.length)
      if (cfg.footerHtml) body += `<div class="print-footer">${cfg.footerHtml}</div>`

      // 每张表后分页
      if (tIdx < tables.length - 1) {
        body += '<div class="page-break"></div>'
      }
    })

    body += '<div class="no-print">'
    body += '<button class="btn-print" onclick="window.print()">打 印</button>'
    body += '<button class="btn-cancel" onclick="window.close()">取 消</button>'
    body += '</div>'

    const printWin = window.open('', '_blank')
    if (!printWin) return

    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      '<title>' + escapeHTML(globalConfig.title || '打印预览') + '</title>',
      '<' + 'style>' + styles + '</' + 'style>',
      '</head><body>',
      body,
      '</' + 'body></html>'
    ].join('')

    printWin.document.write(html)
    printWin.document.close()

    if (globalConfig.autoPrint) {
      printWin.onload = () => printWin.print()
    }
    globalConfig.afterPrint?.()
  }

  // ================== 打印出货单 / 自定义模板 ==================

  async function printTemplate(templateHtml: string, config: PrintConfig = {}): Promise<void> {
    if (config.beforePrint) {
      const ok = await config.beforePrint()
      if (!ok) return
    }

    const styles = buildStyles(config)

    const printWin = window.open('', '_blank')
    if (!printWin) return

    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      '<title>' + escapeHTML(config.title || '打印预览') + '</title>',
      '<' + 'style>' + styles + '</' + 'style>',
      '</head><body>',
      templateHtml,
      '<div class="no-print">',
      '<button class="btn-print" onclick="window.print()">打 印</button>',
      '<button class="btn-cancel" onclick="window.close()">取 消</button>',
      '</div>',
      '</' + 'body></html>'
    ].join('')

    printWin.document.write(html)
    printWin.document.close()

    if (config.autoPrint) {
      printWin.onload = () => printWin.print()
    }
    config.afterPrint?.()
  }

  return {
    print,
    printMultiple,
    printTemplate,
    getPrintColumns
  }
}

