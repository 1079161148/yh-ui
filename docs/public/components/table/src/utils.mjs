export const getRowKey = (row, rowKey) => {
  if (typeof rowKey === "function") {
    return rowKey(row);
  }
  return row[rowKey];
};
export const getColumnKey = (column) => {
  return column.key || column.prop || "";
};
export const flattenColumns = (columns) => {
  const result = [];
  const flatten = (cols) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        flatten(col.children);
      } else {
        result.push(col);
      }
    });
  };
  flatten(columns);
  return result;
};
export const getColumnDepth = (columns) => {
  let depth = 1;
  const getDepth = (cols, level) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        depth = Math.max(depth, level + 1);
        getDepth(col.children, level + 1);
      }
    });
  };
  getDepth(columns, 1);
  return depth;
};
const getLeafCount = (col) => {
  if (!col.children?.length) return 1;
  return col.children.reduce((sum, child) => sum + getLeafCount(child), 0);
};
export const buildHeaderRows = (columns) => {
  const maxDepth = getColumnDepth(columns);
  if (maxDepth <= 1) return [];
  const rows = Array.from({ length: maxDepth }, () => []);
  const traverse = (cols, level) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        rows[level].push({
          column: col,
          colspan: getLeafCount(col),
          rowspan: 1
        });
        traverse(col.children, level + 1);
      } else {
        rows[level].push({
          column: col,
          colspan: 1,
          rowspan: maxDepth - level
        });
      }
    });
  };
  traverse(columns, 0);
  return rows;
};
export const calculateColumnWidth = (column, containerWidth, columns) => {
  if (column.width) {
    if (typeof column.width === "number") {
      return column.width;
    }
    if (typeof column.width === "string") {
      if (column.width.endsWith("%")) {
        return parseFloat(column.width) / 100 * containerWidth;
      }
      return parseFloat(column.width);
    }
  }
  const fixedWidth = columns.filter((col) => col.width).reduce((sum, col) => {
    if (typeof col.width === "number") return sum + col.width;
    if (typeof col.width === "string" && !col.width.endsWith("%")) {
      return sum + parseFloat(col.width);
    }
    return sum;
  }, 0);
  const flexColumns = columns.filter((col) => !col.width);
  const remainingWidth = containerWidth - fixedWidth;
  const minWidth = column.minWidth ? typeof column.minWidth === "number" ? column.minWidth : parseFloat(column.minWidth) : 80;
  return Math.max(remainingWidth / flexColumns.length, minWidth);
};
export const defaultSortMethod = (a, b, prop, order) => {
  if (!order) return 0;
  const aVal = a[prop];
  const bVal = b[prop];
  if (aVal == null && bVal == null) return 0;
  if (aVal == null) return order === "asc" ? 1 : -1;
  if (bVal == null) return order === "asc" ? -1 : 1;
  if (typeof aVal === "number" && typeof bVal === "number") {
    return order === "asc" ? aVal - bVal : bVal - aVal;
  }
  const aStr = String(aVal);
  const bStr = String(bVal);
  const result = aStr.localeCompare(bStr, "zh-CN");
  return order === "asc" ? result : -result;
};
export const multiColumnSort = (data, sortStates) => {
  if (!sortStates.length) return data;
  return [...data].sort((a, b) => {
    for (const state of sortStates) {
      if (!state.order) continue;
      let result;
      if (state.sortMethod) {
        result = state.sortMethod(a, b, state.order);
      } else {
        result = defaultSortMethod(a, b, state.prop, state.order);
      }
      if (result !== 0) return result;
    }
    return 0;
  });
};
export const defaultFilterMethod = (value, row, column) => {
  const prop = column.prop;
  if (!prop) return true;
  const cellValue = row[prop];
  return cellValue === value;
};
export const multiValueFilter = (data, filters, columns, filterMultiple = true) => {
  const activeFilters = Object.entries(filters).filter(([, values]) => values.length > 0);
  if (!activeFilters.length) return data;
  return data.filter((row) => {
    return activeFilters.every(([prop, values]) => {
      const column = columns.find((col) => col.prop === prop);
      if (!column) return true;
      const filterMethod = column.filterMethod || defaultFilterMethod;
      if (filterMultiple || column.filterMultiple !== false) {
        return values.some((value) => filterMethod(value, row, column));
      }
      return filterMethod(values[0], row, column);
    });
  });
};
export const flattenTreeData = (data, childrenKey = "children", expandedKeys, rowKey, level = 0) => {
  const result = [];
  data.forEach((item) => {
    const key = getRowKey(item, rowKey);
    const children = item[childrenKey];
    const hasChildren = Array.isArray(children) && children.length > 0;
    const isExpanded = expandedKeys.has(key);
    result.push({
      ...item,
      _level: level,
      _isExpanded: isExpanded,
      _hasChildren: hasChildren,
      _isLeaf: !hasChildren
    });
    if (hasChildren && isExpanded) {
      result.push(...flattenTreeData(children, childrenKey, expandedKeys, rowKey, level + 1));
    }
  });
  return result;
};
export const getAllTreeKeys = (data, childrenKey = "children", rowKey) => {
  const result = [];
  const traverse = (items) => {
    items.forEach((item) => {
      result.push(getRowKey(item, rowKey));
      const children = item[childrenKey];
      if (Array.isArray(children)) {
        traverse(children);
      }
    });
  };
  traverse(data);
  return result;
};
export const formatSize = (value) => {
  if (value === void 0) return "";
  if (typeof value === "number") return `${value}px`;
  if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`;
  return value;
};
export const calculateSpan = (row, column, rowIndex, columnIndex, spanMethod) => {
  if (!spanMethod) {
    return { rowspan: 1, colspan: column.colSpan || 1 };
  }
  const result = spanMethod({ row, column, rowIndex, columnIndex });
  if (Array.isArray(result)) {
    return { rowspan: result[0], colspan: result[1] };
  }
  if (result && typeof result === "object") {
    return result;
  }
  return { rowspan: 1, colspan: column.colSpan || 1 };
};
export const throttle = (fn, delay) => {
  let lastTime = 0;
  let timer = null;
  return (...args) => {
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  };
};
export const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};
export const isEmpty = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
export const generateId = () => {
  return `yh-table-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};
export const formatCellValue = (row, column, rowIndex) => {
  const prop = column.prop;
  if (!prop) return "";
  const cellValue = row[prop];
  if (column.formatter) {
    return column.formatter(row, column, cellValue, rowIndex);
  }
  if (cellValue === null || cellValue === void 0) {
    return "";
  }
  return String(cellValue);
};
export const getFixedStyle = (column, columns, direction) => {
  const flatColumns = flattenColumns(columns);
  const index = flatColumns.findIndex((col) => getColumnKey(col) === getColumnKey(column));
  if (index === -1) return {};
  if (direction === "left") {
    let leftOffset = 0;
    for (let i = 0; i < index; i++) {
      const col = flatColumns[i];
      if (col.fixed === "left" || col.fixed === true) {
        const width = typeof col.width === "number" ? col.width : parseInt(String(col.width) || "80", 10);
        leftOffset += width;
      }
    }
    return { left: `${leftOffset}px` };
  }
  if (direction === "right") {
    let rightOffset = 0;
    for (let i = flatColumns.length - 1; i > index; i--) {
      const col = flatColumns[i];
      if (col.fixed === "right") {
        const width = typeof col.width === "number" ? col.width : parseInt(String(col.width) || "80", 10);
        rightOffset += width;
      }
    }
    return { right: `${rightOffset}px` };
  }
  return {};
};
export const exportToCSV = (data, columns, filename = "export") => {
  const visibleColumns = columns.filter((col) => col.visible !== false && col.prop);
  const headers = visibleColumns.map((col) => col.label || col.prop || "").join(",");
  const rows = data.map((row) => {
    return visibleColumns.map((col) => {
      const value = col.prop ? row[col.prop] : "";
      const strValue = String(value ?? "");
      if (strValue.includes(",") || strValue.includes("\n") || strValue.includes('"')) {
        return `"${strValue.replace(/"/g, '""')}"`;
      }
      return strValue;
    }).join(",");
  });
  const csvContent = [headers, ...rows].join("\n");
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};
