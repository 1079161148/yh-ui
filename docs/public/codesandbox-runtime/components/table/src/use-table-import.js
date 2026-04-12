var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import * as XLSX from "xlsx";
import { useLocale } from "../../../hooks/index.js";
function useTableImport(data, columns) {
  const { t } = useLocale();
  function buildLabelMap() {
    const map = /* @__PURE__ */ new Map();
    columns.value.forEach((col) => {
      if (col.prop) {
        map.set(col.prop, { prop: col.prop });
        if (col.label) {
          map.set(col.label, { prop: col.prop });
        }
      }
    });
    return map;
  }
  function mapRow(row, labelMap, config) {
    const mapped = {};
    Object.entries(row).forEach(([key, val]) => {
      var _a, _b;
      let prop = key;
      if ((_a = config.fieldMapping) == null ? void 0 : _a[key]) {
        prop = config.fieldMapping[key];
      } else if (config.autoMapping !== false) {
        const info = labelMap.get(key);
        if (info) prop = info.prop;
      }
      if ((_b = config.numberFields) == null ? void 0 : _b.includes(prop)) {
        const num = Number(val);
        mapped[prop] = isNaN(num) ? val : num;
      } else {
        mapped[prop] = val;
      }
    });
    return mapped;
  }
  function parseCSV(text, config = {}) {
    const sep = config.separator || ",";
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return [];
    const headers = parseCSVLine(lines[0], sep);
    const labelMap = buildLabelMap();
    let rows = lines.slice(1).map((line) => {
      const vals = parseCSVLine(line, sep);
      const row = {};
      headers.forEach((h, i) => {
        var _a;
        row[h] = (_a = vals[i]) != null ? _a : "";
      });
      return mapRow(row, labelMap, config);
    });
    if (config.maxRows) rows = rows.slice(0, config.maxRows);
    return rows;
  }
  function parseCSVLine(line, sep) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === sep) {
          result.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
    }
    result.push(current.trim());
    return result;
  }
  function parseTXT(text, config = {}) {
    return parseCSV(text, __spreadProps(__spreadValues({}, config), { separator: "	" }));
  }
  function parseJSON(text, config = {}) {
    try {
      const parsed = JSON.parse(text);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const labelMap = buildLabelMap();
      let rows = arr.map((item) => mapRow(item, labelMap, config));
      if (config.maxRows) rows = rows.slice(0, config.maxRows);
      return rows;
    } catch (e) {
      console.warn("[YhTable] JSON \u89E3\u6790\u5931\u8D25");
      return [];
    }
  }
  function parseXML(text, config = {}) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "application/xml");
      const labelMap = buildLabelMap();
      const colNodes = doc.querySelectorAll("column");
      const colNames = [];
      colNodes.forEach((n) => colNames.push(n.getAttribute("name") || ""));
      const rowNodes = doc.querySelectorAll("row");
      let rows = [];
      rowNodes.forEach((rn) => {
        const cellNodes = rn.querySelectorAll("cell");
        const row = {};
        cellNodes.forEach((cn, i) => {
          const key = colNames[i] || `col${i}`;
          row[key] = cn.textContent || "";
        });
        rows.push(mapRow(row, labelMap, config));
      });
      if (config.maxRows) rows = rows.slice(0, config.maxRows);
      return rows;
    } catch (e) {
      console.warn("[YhTable] XML \u89E3\u6790\u5931\u8D25");
      return [];
    }
  }
  function parseHTML(text, config = {}) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const labelMap = buildLabelMap();
      const ths = doc.querySelectorAll("thead th, thead td");
      const headers = [];
      ths.forEach((th) => {
        var _a;
        return headers.push(((_a = th.textContent) == null ? void 0 : _a.trim()) || "");
      });
      const trs = doc.querySelectorAll("tbody tr");
      let rows = [];
      trs.forEach((tr) => {
        const tds = tr.querySelectorAll("td");
        const row = {};
        tds.forEach((td, i) => {
          var _a;
          const key = headers[i] || `col${i}`;
          row[key] = ((_a = td.textContent) == null ? void 0 : _a.trim()) || "";
        });
        rows.push(mapRow(row, labelMap, config));
      });
      if (config.maxRows) rows = rows.slice(0, config.maxRows);
      return rows;
    } catch (e) {
      console.warn("[YhTable] HTML \u89E3\u6790\u5931\u8D25");
      return [];
    }
  }
  function applyImport(rows, mode = "insertBottom") {
    switch (mode) {
      case "covering":
        data.value = rows;
        break;
      case "insertTop":
        data.value = [...rows, ...data.value];
        break;
      case "insertBottom":
      default:
        data.value = [...data.value, ...rows];
        break;
    }
  }
  function parseXLSX(buffer, config = {}) {
    var _a;
    try {
      const labelMap = buildLabelMap();
      const wb = XLSX.read(buffer, { type: "array" });
      let sheetName = config.sheetName;
      if (!sheetName) {
        const idx = (_a = config.sheetIndex) != null ? _a : 0;
        sheetName = wb.SheetNames[idx];
      }
      const ws = wb.Sheets[sheetName];
      if (!ws) {
        console.warn("[YhTable] XLSX \u5DE5\u4F5C\u8868\u4E0D\u5B58\u5728:", sheetName);
        return [];
      }
      const useHeader = config.headerRow !== false;
      const jsonData = XLSX.utils.sheet_to_json(ws, {
        header: useHeader ? void 0 : 1,
        defval: ""
      });
      let rows = jsonData.map((item) => mapRow(item, labelMap, config));
      if (config.maxRows) rows = rows.slice(0, config.maxRows);
      return rows;
    } catch (err) {
      console.warn("[YhTable] XLSX \u89E3\u6790\u5931\u8D25", err);
      return [];
    }
  }
  function guessType(filename) {
    var _a;
    const ext = (_a = filename.split(".").pop()) == null ? void 0 : _a.toLowerCase();
    switch (ext) {
      case "csv":
        return "csv";
      case "json":
        return "json";
      case "txt":
        return "txt";
      case "xml":
        return "xml";
      case "html":
      case "htm":
        return "html";
      case "xlsx":
      case "xls":
      case "xlsm":
        return "xlsx";
      default:
        return "csv";
    }
  }
  function parseContent(text, type, config = {}) {
    switch (type) {
      case "csv":
        return parseCSV(text, config);
      case "txt":
        return parseTXT(text, config);
      case "json":
        return parseJSON(text, config);
      case "xml":
        return parseXML(text, config);
      case "html":
        return parseHTML(text, config);
      default:
        return parseCSV(text, config);
    }
  }
  async function importFile(file, config = {}) {
    const type = config.type || guessType(file.name);
    const encoding = config.encoding || "utf-8";
    const mode = config.mode || "insertBottom";
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        var _a, _b, _c;
        let rows;
        if (type === "xlsx") {
          const buffer = (_a = ev.target) == null ? void 0 : _a.result;
          rows = parseXLSX(buffer, config);
        } else {
          const text = (_b = ev.target) == null ? void 0 : _b.result;
          rows = parseContent(text, type, config);
        }
        if (config.beforeImport) {
          const result = await config.beforeImport(rows);
          if (result === false) {
            resolve([]);
            return;
          }
          if (Array.isArray(result)) {
            rows = result;
          }
        }
        applyImport(rows, mode);
        (_c = config.afterImport) == null ? void 0 : _c.call(config, rows, mode);
        resolve(rows);
      };
      reader.onerror = () => reject(new Error(t("upload.error")));
      if (type === "xlsx") {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file, encoding);
      }
    });
  }
  async function importData(content, config = {}) {
    var _a;
    const mode = config.mode || "insertBottom";
    let rows;
    if (typeof content === "string") {
      const type = config.type || "csv";
      rows = parseContent(content, type, config);
    } else {
      rows = content;
    }
    if (config.beforeImport) {
      const result = await config.beforeImport(rows);
      if (result === false) return [];
      if (Array.isArray(result)) rows = result;
    }
    applyImport(rows, mode);
    (_a = config.afterImport) == null ? void 0 : _a.call(config, rows, mode);
    return rows;
  }
  function openImport(config = {}) {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      const acceptMap = {
        csv: ".csv",
        json: ".json",
        txt: ".txt",
        xml: ".xml",
        html: ".html,.htm",
        xlsx: ".xlsx,.xls,.xlsm"
      };
      input.accept = config.type ? acceptMap[config.type] || "*" : ".csv,.json,.txt,.xml,.html,.xlsx,.xls";
      input.onchange = async (e) => {
        var _a;
        const file = (_a = e.target.files) == null ? void 0 : _a[0];
        if (file) {
          const rows = await importFile(file, config);
          resolve(rows);
        } else {
          resolve([]);
        }
      };
      input.click();
    });
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
  };
}
export {
  useTableImport
};
