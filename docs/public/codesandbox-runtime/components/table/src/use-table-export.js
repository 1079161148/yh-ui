var __defProp = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
import * as XLSX from 'xlsx'
import { useLocale } from '../../../hooks/index.js'
function useTableExport(data, columns) {
  const { t } = useLocale()
  function getExportColumns(config = {}) {
    var _a, _b
    let cols = columns.value.filter((col) => col.prop)
    if (config.visibleOnly !== false) {
      cols = cols.filter((c) => c.visible !== false)
    }
    if ((_a = config.columns) == null ? void 0 : _a.length) {
      cols = cols.filter((c) => config.columns.includes(c.prop))
    }
    if ((_b = config.excludeColumns) == null ? void 0 : _b.length) {
      cols = cols.filter((c) => !config.excludeColumns.includes(c.prop))
    }
    return cols
  }
  function getCellValue(row, col, config) {
    const raw = col.prop ? row[col.prop] : ''
    if (config.formatCell) {
      return config.formatCell(raw, col, row)
    }
    if (typeof raw === 'boolean') {
      return raw ? t('table.yes') : t('table.no')
    }
    return raw == null ? '' : String(raw)
  }
  function getLabel(col, config) {
    var _a
    if ((_a = config.columnTitles) == null ? void 0 : _a[col.prop]) {
      return config.columnTitles[col.prop]
    }
    return col.label || col.prop || ''
  }
  function toCSV(config = {}) {
    const sep = config.separator || ','
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const escapeCSV = (val) => {
      if (val.includes(sep) || val.includes('\n') || val.includes('"')) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    }
    const lines = []
    if (config.includeHeader !== false) {
      const headerCells = []
      if (config.showIndex) headerCells.push(escapeCSV(config.indexTitle || t('table.index')))
      cols.forEach((col) => headerCells.push(escapeCSV(getLabel(col, config))))
      lines.push(headerCells.join(sep))
    }
    rows.forEach((row, idx) => {
      const cells = []
      if (config.showIndex) cells.push(String(idx + 1))
      cols.forEach((col) => cells.push(escapeCSV(getCellValue(row, col, config))))
      lines.push(cells.join(sep))
    })
    const content = lines.join('\n')
    return config.bom !== false ? '\uFEFF' + content : content
  }
  function toTXT(config = {}) {
    return toCSV(
      __spreadProps(__spreadValues({}, config), { separator: '	', bom: config.bom !== false })
    )
  }
  function toJSON(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const result = rows.map((row, idx) => {
      const obj = {}
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
  function toXML(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<table>']
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
  function escapeXML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
  function toHTML(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const lines = [
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
  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  function toXLSX(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const sheetName = config.sheetName || 'Sheet1'
    const headers = []
    if (config.showIndex) headers.push(config.indexTitle || t('table.index'))
    cols.forEach((col) => headers.push(getLabel(col, config)))
    const dataRows = rows.map((row, idx) => {
      const rowData = []
      if (config.showIndex) rowData.push(idx + 1)
      cols.forEach((col) => {
        const val = col.prop ? row[col.prop] : ''
        if (config.formatCell) {
          rowData.push(config.formatCell(val, col, row))
        } else {
          rowData.push(val == null ? '' : val)
        }
      })
      return rowData
    })
    const wsData = [headers, ...dataRows]
    const ws = XLSX.utils.aoa_to_sheet(wsData)
    const colWidths = []
    headers.forEach((h, i) => {
      var _a
      let width = config.defaultColWidth || 12
      const col = cols[config.showIndex ? i - 1 : i]
      if (
        (col == null ? void 0 : col.prop) &&
        ((_a = config.columnWidths) == null ? void 0 : _a[col.prop])
      ) {
        width = config.columnWidths[col.prop]
      } else if (config.autoWidth !== false) {
        let maxLen = h.length
        dataRows.forEach((row) => {
          var _a2
          const cellVal = String((_a2 = row[i]) != null ? _a2 : '')
          maxLen = Math.max(maxLen, cellVal.length)
        })
        width = Math.min(Math.max(maxLen + 2, 8), 50)
      }
      colWidths.push({ wch: width })
    })
    ws['!cols'] = colWidths
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  }
  function downloadXLSX(buffer, filename) {
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
  function downloadFile(content, filename, mime) {
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
  const MIME_MAP = {
    csv: 'text/csv;charset=utf-8',
    json: 'application/json;charset=utf-8',
    txt: 'text/plain;charset=utf-8',
    xml: 'application/xml;charset=utf-8',
    html: 'text/html;charset=utf-8',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  const EXT_MAP = {
    csv: '.csv',
    json: '.json',
    txt: '.txt',
    xml: '.xml',
    html: '.html',
    xlsx: '.xlsx'
  }
  async function exportData(config = {}) {
    var _a, _b, _c, _d
    const type = config.type || 'csv'
    const filename = config.filename || 'export'
    if (config.beforeExport) {
      const ok = await config.beforeExport()
      if (!ok) return
    }
    if (type === 'xlsx') {
      const buffer = toXLSX(config)
      if (config.mode === 'string') {
        const uint8 = new Uint8Array(buffer)
        let binary = ''
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i])
        }
        ;(_a = config.afterExport) == null ? void 0 : _a.call(config, type)
        return btoa(binary)
      }
      downloadXLSX(buffer, `${filename}.xlsx`)
      ;(_b = config.afterExport) == null ? void 0 : _b.call(config, type)
      return
    }
    let content
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
      ;(_c = config.afterExport) == null ? void 0 : _c.call(config, type)
      return content
    }
    downloadFile(content, `${filename}${EXT_MAP[type]}`, MIME_MAP[type])
    ;(_d = config.afterExport) == null ? void 0 : _d.call(config, type)
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
export { useTableExport }
