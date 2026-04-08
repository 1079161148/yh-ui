"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTablePrint = useTablePrint;
var _hooks = require("@yh-ui/hooks");
function useTablePrint(data, columns) {
  const {
    t
  } = (0, _hooks.useLocale)();
  function getPrintColumns(config = {}) {
    let cols = columns.value.filter(col => col.visible !== false && col.prop);
    if (config.columns?.length) {
      cols = cols.filter(c => config.columns.includes(c.prop));
    }
    if (config.excludeColumns?.length) {
      cols = cols.filter(c => !config.excludeColumns.includes(c.prop));
    }
    return cols;
  }
  function getLabel(col, config) {
    if (config.columnTitles?.[col.prop]) {
      return config.columnTitles[col.prop];
    }
    return col.label || col.prop || "";
  }
  function getCellValue(row, col, config) {
    const raw = col.prop ? row[col.prop] : "";
    if (config.formatCell) {
      return config.formatCell(raw, col, row);
    }
    return raw == null ? "" : String(raw);
  }
  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function buildStyles(config) {
    const margin = config.margin || {};
    const mt = margin.top || "10mm";
    const mr = margin.right || "10mm";
    const mb = margin.bottom || "10mm";
    const ml = margin.left || "10mm";
    let css = ["*{margin:0;padding:0;box-sizing:border-box}", `@page{size:${config.orientation === "landscape" ? "landscape" : "portrait"};margin:${mt} ${mr} ${mb} ${ml}}`, 'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;color:#303133;padding:20px}', ".print-title{text-align:center;font-size:18px;font-weight:700;margin-bottom:12px;color:#303133}", ".print-header,.print-footer{text-align:center;color:#909399;font-size:12px;line-height:1.6}", ".print-header{margin-bottom:12px;border-bottom:1px solid #ebeef5;padding-bottom:8px}", ".print-footer{margin-top:12px;border-top:1px solid #ebeef5;padding-top:8px}", "table{width:100%;border-collapse:collapse;font-size:13px}", "th,td{padding:8px 12px;border:1px solid #dcdfe6;text-align:left;word-break:break-all}", "th{background:#f5f7fa;font-weight:600;color:#303133}", "tr:nth-child(even) td{background:#fafafa}", ".page-break{page-break-after:always}", ".page-number{text-align:center;font-size:11px;color:#909399;margin-top:8px}", ".no-print{text-align:center;margin-top:20px}", ".no-print button{padding:8px 24px;border-radius:4px;cursor:pointer;font-size:14px;border:none;margin:0 4px}", ".btn-print{background:#409eff;color:#fff}", ".btn-cancel{background:#fff;color:#606266;border:1px solid #dcdfe6!important}", "@media print{.no-print{display:none!important}.page-number{position:fixed;bottom:10mm;width:100%}}"];
    if (config.extraCss) css.push(config.extraCss);
    if (config.tableStyle) css.push(`.print-table{${config.tableStyle}}`);
    return css.join("\n");
  }
  function buildTableHead(cols, config) {
    let html = "<thead><tr>";
    if (config.showIndex) {
      html += `<th style="width:50px;text-align:center">${escapeHTML(config.indexTitle || t("table.index"))}</th>`;
    }
    cols.forEach(col => {
      const align = col.headerAlign || col.align || "left";
      html += `<th style="text-align:${align}">${escapeHTML(getLabel(col, config))}</th>`;
    });
    html += "</tr></thead>";
    return html;
  }
  function buildTableRows(rows, cols, config, startIndex = 0) {
    let html = "";
    rows.forEach((row, idx) => {
      html += "<tr>";
      if (config.showIndex) {
        html += `<td style="text-align:center">${startIndex + idx + 1}</td>`;
      }
      cols.forEach(col => {
        const align = col.align || "left";
        html += `<td style="text-align:${align}">${escapeHTML(getCellValue(row, col, config))}</td>`;
      });
      html += "</tr>";
    });
    return html;
  }
  function buildInfoFooter(config, totalRows) {
    const parts = [];
    if (config.showTime !== false) {
      parts.push(t("table.printTime") + (/* @__PURE__ */new Date()).toLocaleString());
    }
    if (config.showCount !== false) {
      parts.push(t("table.total", {
        total: totalRows
      }));
    }
    if (parts.length === 0) return "";
    return '<div class="print-footer">' + parts.join("&nbsp;&nbsp;") + "</div>";
  }
  async function print(config = {}) {
    if (config.beforePrint) {
      const ok = await config.beforePrint();
      if (!ok) return;
    }
    const cols = getPrintColumns(config);
    const rows = config.data || data.value;
    const title = config.title || "";
    const styles = buildStyles(config);
    const thead = buildTableHead(cols, config);
    let body = "";
    if (config.pageSize && config.pageSize > 0) {
      const totalPages = Math.ceil(rows.length / config.pageSize);
      for (let p = 0; p < totalPages; p++) {
        const pageRows = rows.slice(p * config.pageSize, (p + 1) * config.pageSize);
        const startIdx = p * config.pageSize;
        const isLast = p === totalPages - 1;
        if (title) body += `<div class="print-title">${escapeHTML(title)}</div>`;
        if (config.headerHtml) body += `<div class="print-header">${config.headerHtml}</div>`;
        body += '<table class="print-table">';
        body += thead;
        body += "<tbody>" + buildTableRows(pageRows, cols, config, startIdx) + "</tbody>";
        body += "</table>";
        if (config.showPageNumber) {
          body += `<div class="page-number">${t("table.page", {
            page: p + 1,
            total: totalPages
          })}</div>`;
        }
        if (config.footerHtml) body += `<div class="print-footer">${config.footerHtml}</div>`;
        if (!isLast) body += '<div class="page-break"></div>';
      }
      body += buildInfoFooter(config, rows.length);
    } else {
      if (title) body += `<div class="print-title">${escapeHTML(title)}</div>`;
      if (config.headerHtml) body += `<div class="print-header">${config.headerHtml}</div>`;
      body += '<table class="print-table">';
      body += thead;
      body += "<tbody>" + buildTableRows(rows, cols, config) + "</tbody>";
      body += "</table>";
      body += buildInfoFooter(config, rows.length);
      if (config.footerHtml) body += `<div class="print-footer">${config.footerHtml}</div>`;
    }
    body += '<div class="no-print">';
    body += `<button class="btn-print" onclick="window.print()">${t("table.print")}</button>`;
    body += `<button class="btn-cancel" onclick="window.close()">${t("table.cancel")}</button>`;
    body += "</div>";
    const printWin = window.open("", "_blank");
    if (!printWin) {
      console.warn("[YhTable] \u65E0\u6CD5\u6253\u5F00\u6253\u5370\u7A97\u53E3\uFF0C\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u5F39\u7A97\u8BBE\u7F6E");
      return;
    }
    const html = ['<!DOCTYPE html><html><head><meta charset="UTF-8">', "<title>" + escapeHTML(title || t("table.preview")) + "</title>", "<style>" + styles + "</style>", "</head><body>", body, "</body></html>"].join("");
    printWin.document.write(html);
    printWin.document.close();
    if (config.autoPrint) {
      printWin.onload = () => {
        printWin.print();
      };
    }
    config.afterPrint?.();
  }
  async function printMultiple(tables, globalConfig = {}) {
    if (globalConfig.beforePrint) {
      const ok = await globalConfig.beforePrint();
      if (!ok) return;
    }
    const styles = buildStyles(globalConfig);
    let body = "";
    tables.forEach((table, tIdx) => {
      const cfg = {
        ...globalConfig,
        ...table.config
      };
      const cols = table.columns ? table.columns.filter(c => c.visible !== false && c.prop) : getPrintColumns(cfg);
      const rows = table.data;
      if (table.title) body += `<div class="print-title">${escapeHTML(table.title)}</div>`;
      if (cfg.headerHtml) body += `<div class="print-header">${cfg.headerHtml}</div>`;
      body += '<table class="print-table">';
      body += buildTableHead(cols, cfg);
      body += "<tbody>" + buildTableRows(rows, cols, cfg) + "</tbody>";
      body += "</table>";
      body += buildInfoFooter(cfg, rows.length);
      if (cfg.footerHtml) body += `<div class="print-footer">${cfg.footerHtml}</div>`;
      if (tIdx < tables.length - 1) {
        body += '<div class="page-break"></div>';
      }
    });
    body += '<div class="no-print">';
    body += `<button class="btn-print" onclick="window.print()">${t("table.print")}</button>`;
    body += `<button class="btn-cancel" onclick="window.close()">${t("table.cancel")}</button>`;
    body += "</div>";
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    const html = ['<!DOCTYPE html><html><head><meta charset="UTF-8">', "<title>" + escapeHTML(globalConfig.title || t("table.preview")) + "</title>", "<style>" + styles + "</style>", "</head><body>", body, "</body></html>"].join("");
    printWin.document.write(html);
    printWin.document.close();
    if (globalConfig.autoPrint) {
      printWin.onload = () => printWin.print();
    }
    globalConfig.afterPrint?.();
  }
  async function printTemplate(templateHtml, config = {}) {
    if (config.beforePrint) {
      const ok = await config.beforePrint();
      if (!ok) return;
    }
    const styles = buildStyles(config);
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    const html = ['<!DOCTYPE html><html><head><meta charset="UTF-8">', "<title>" + escapeHTML(config.title || t("table.preview")) + "</title>", "<style>" + styles + "</style>", "</head><body>", templateHtml, '<div class="no-print">', `<button class="btn-print" onclick="window.print()">${t("table.print")}</button>`, `<button class="btn-cancel" onclick="window.close()">${t("table.cancel")}</button>`, "</div>", "</body></html>"].join("");
    printWin.document.write(html);
    printWin.document.close();
    if (config.autoPrint) {
      printWin.onload = () => printWin.print();
    }
    config.afterPrint?.();
  }
  return {
    print,
    printMultiple,
    printTemplate,
    getPrintColumns
  };
}