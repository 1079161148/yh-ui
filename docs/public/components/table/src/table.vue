<script setup>
import {
  computed,
  ref,
  provide,
  watch,
  onMounted,
  nextTick,
  useSlots
} from "vue";
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import {
  tableProps,
  tableEmits,
  tableContextKey
} from "./table";
import {
  getRowKey,
  flattenColumns,
  getColumnDepth,
  buildHeaderRows,
  formatSize,
  defaultSortMethod,
  multiValueFilter,
  flattenTreeData,
  calculateSpan,
  throttle
} from "./utils";
import { useVirtualScroll } from "./use-virtual-scroll";
import { useTableSelection } from "./use-table-selection";
import { useRowDrag } from "./use-row-drag";
import { useColumnResize } from "./use-column-resize";
import { useColumnDrag } from "./use-column-drag";
import { useTableExport } from "./use-table-export";
import { useTableImport } from "./use-table-import";
import { useTablePrint } from "./use-table-print";
import { YhTooltip } from "../../tooltip";
import { YhPagination } from "../../pagination";
defineOptions({
  name: "YhTable"
});
const props = defineProps(tableProps);
const emit = defineEmits(tableEmits);
const slots = useSlots();
const ns = useNamespace("table");
const { t } = useLocale();
const RenderColumn = (props2) => {
  return props2.render(props2.params);
};
const { themeStyle } = useComponentTheme(
  "table",
  computed(() => props.themeOverrides)
);
const tableRef = ref(null);
const headerRef = ref(null);
const bodyRef = ref(null);
const footerRef = ref(null);
const currentRowKey = ref(props.currentRowKey);
const sortStates = ref([]);
const filterStates = ref({});
const expandedRowKeys = ref(/* @__PURE__ */ new Set());
const treeExpandedKeys = ref(/* @__PURE__ */ new Set());
const isFullscreen = ref(false);
const scrollState = ref("left");
const collectedColumns = ref([]);
const getRowKeyFn = (row) => {
  if (!row) return Math.random().toString(36).slice(2);
  return getRowKey(row, props.rowKey);
};
const allColumns = computed(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns;
  }
  return collectedColumns.value;
});
const flatColumns = computed(() => flattenColumns(allColumns.value));
const headerRows = computed(() => buildHeaderRows(allColumns.value));
const columnDepth = computed(() => getColumnDepth(allColumns.value));
const visibleColumns = computed(() => {
  return flatColumns.value.filter((col) => col.visible !== false);
});
const fixedLeftColumns = computed(() => {
  return visibleColumns.value.filter((col) => col.fixed === "left" || col.fixed === true);
});
const fixedRightColumns = computed(() => {
  return visibleColumns.value.filter((col) => col.fixed === "right");
});
const treeProcessedData = computed(() => {
  if (!props.treeConfig) return props.data;
  const childrenKey = props.treeConfig.childrenKey || "children";
  return flattenTreeData(props.data, childrenKey, treeExpandedKeys.value, props.rowKey);
});
watch(
  () => props.data,
  (newData) => {
    if (props.treeConfig?.expandAll && treeExpandedKeys.value.size === 0) {
      const childrenKey = props.treeConfig.childrenKey || "children";
      const allKeys = /* @__PURE__ */ new Set();
      const collectKeys = (items) => {
        items.forEach((item) => {
          const children = item[childrenKey];
          if (children?.length) {
            allKeys.add(getRowKeyFn(item));
            collectKeys(children);
          }
        });
      };
      collectKeys(newData);
      treeExpandedKeys.value = allKeys;
    }
  },
  { immediate: true }
);
const sortedData = computed(() => {
  const data = treeProcessedData.value;
  if (!sortStates.value.length) return data;
  const activeSortStates = sortStates.value.filter((s) => s.order);
  if (!activeSortStates.length) return data;
  return [...data].sort((a, b) => {
    for (const state of activeSortStates) {
      const column = flatColumns.value.find((col) => col.prop === state.prop);
      let result;
      if (column?.sortMethod) {
        result = column.sortMethod(a, b, state.order);
      } else {
        result = defaultSortMethod(a, b, state.prop, state.order);
      }
      if (result !== 0) return result;
    }
    return 0;
  });
});
const filteredData = computed(() => {
  return multiValueFilter(sortedData.value, filterStates.value, flatColumns.value);
});
const selectionWidth = computed(
  () => props.selectionConfig ? parseInt(String(props.selectionConfig.columnWidth || 50)) : 0
);
const expandWidth = computed(
  () => props.expandConfig ? parseInt(String(props.expandConfig.columnWidth || 50)) : 0
);
const indexWidth = computed(
  () => props.showIndex ? parseInt(String(props.indexConfig?.width || 50)) : 0
);
const isAnyColumnFixedLeft = computed(
  () => visibleColumns.value.some((col) => col.fixed === "left" || col.fixed === true)
);
const tableData = computed(() => {
  const data = filteredData.value;
  if (!props.pagination || typeof props.pagination === "object" && props.pagination.remote) {
    return data;
  }
  const currentPage = typeof props.pagination === "object" ? props.pagination.currentPage || 1 : 1;
  const pageSize = typeof props.pagination === "object" ? props.pagination.pageSize || 10 : 10;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
});
const virtualConfig = computed(() => props.virtualConfig);
const {
  visibleData,
  offsetTop,
  totalHeight,
  handleScroll: handleVirtualScroll,
  scrollToIndex,
  scrollToRow,
  refresh: refreshVirtual,
  isVirtual
} = useVirtualScroll({
  data: tableData,
  containerRef: bodyRef,
  config: virtualConfig,
  rowKey: getRowKeyFn
});
const renderData = computed(() => {
  return isVirtual.value ? visibleData.value : tableData.value;
});
const selectionConfig = computed(() => props.selectionConfig);
const {
  selectedRowKeys,
  selectedRows,
  isAllSelected,
  isIndeterminate,
  selectionType,
  toggleRowSelection,
  toggleAllSelection,
  clearSelection,
  // setSelection,
  // setSelectionByKeys,
  isRowSelected,
  isRowSelectable
} = useTableSelection({
  data: tableData,
  rowKey: props.rowKey,
  config: selectionConfig
});
const dragConfigRef = computed(() => props.dragConfig);
const {
  isRowDragEnabled,
  // isDraggingRow,
  getRowDragAttrs,
  getRowDragClass
} = useRowDrag({
  data: tableData,
  rawData: computed(() => props.data),
  dragConfig: dragConfigRef,
  treeConfig: computed(() => props.treeConfig),
  rowKey: getRowKeyFn,
  emit
});
const resizableRef = computed(() => props.resizable);
const {
  // isResizing,
  // resizingColumn: activeResizingColumn,
  resizeLineLeft,
  resizeLineVisible,
  isColumnResizable,
  handleResizeStart
} = useColumnResize({
  resizable: resizableRef,
  columns: visibleColumns,
  tableRef,
  emit
});
const {
  isColumnDragEnabled,
  // isDraggingColumn,
  isColumnDraggable,
  getHeaderDragAttrs,
  getHeaderDragClass
} = useColumnDrag({
  columns: allColumns,
  dragConfig: dragConfigRef,
  flatColumns: visibleColumns,
  emit
});
const {
  exportData: doExportData
  // toCSV,
  // toJSON: toJSONExport,
  // toTXT,
  // toXML,
  // toHTML: toHTMLExport,
  // getExportColumns
} = useTableExport(tableData, visibleColumns);
const {
  importFile,
  importData: doImportData,
  openImport
  // parseCSV,
  // parseTXT: parseTXTImport,
  // parseJSON: parseJSONImport,
  // parseXML: parseXMLImport,
  // parseHTML: parseHTMLImport,
  // parseContent,
  // applyImport
} = useTableImport(
  computed({
    get: () => props.data,
    set: (val) => emit("update:data", val)
  }),
  visibleColumns
);
const {
  print: doPrint,
  printMultiple,
  printTemplate
  // getPrintColumns
} = useTablePrint(tableData, visibleColumns);
const toolbarSlotNames = [
  "toolbar",
  "toolbar-left",
  "toolbar-left-prefix",
  "toolbar-left-suffix",
  "toolbar-right",
  "toolbar-right-prefix",
  "toolbar-right-suffix"
];
const showToolbar = computed(() => {
  if (props.toolbarConfig?.visible) return true;
  return toolbarSlotNames.some((name) => !!slots[name]);
});
const tableClasses = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is("border", !!props.border),
  ns.is("stripe", props.stripe),
  ns.is("highlight-current-row", props.highlightCurrentRow),
  ns.is("fullscreen", isFullscreen.value),
  ns.is("fixed-header", !!(props.height || props.maxHeight)),
  ns.is("fixed-column", fixedLeftColumns.value.length > 0 || fixedRightColumns.value.length > 0),
  ns.is(`scrolling-${scrollState.value}`, true)
]);
const innerWrapperClasses = computed(() => [ns.e("inner-wrapper"), ns.is("border", !!props.border)]);
const tableStyle = computed(() => {
  const style = {
    ...themeStyle.value
  };
  if (props.width) {
    style.width = formatSize(props.width);
  }
  if (props.height) {
    style.height = formatSize(props.height);
  }
  if (props.maxHeight) {
    style.maxHeight = formatSize(props.maxHeight);
  }
  return style;
});
const bodyStyle = computed(() => {
  const style = {};
  if (props.height || props.maxHeight) {
    style.overflow = "auto";
    style.flex = "1";
    style.minHeight = "0";
  }
  return style;
});
const summaryValues = computed(() => {
  if (!props.summaryConfig?.method) return [];
  return props.summaryConfig.method({
    columns: visibleColumns.value,
    data: tableData.value
  });
});
const isSpanVisible = (row, column, rowIndex, columnIndex) => {
  if (!props.spanMethod) return true;
  const result = calculateSpan(row, column, rowIndex, columnIndex, props.spanMethod);
  return result.rowspan !== 0 && result.colspan !== 0;
};
const handleScroll = throttle((event) => {
  const target = event.target;
  const { scrollLeft, scrollWidth, clientWidth } = target;
  if (scrollWidth <= clientWidth) {
    scrollState.value = "none";
  } else if (scrollLeft <= 0) {
    scrollState.value = "left";
  } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
    scrollState.value = "right";
  } else {
    scrollState.value = "middle";
  }
  if (headerRef.value && props.syncScroll) {
    headerRef.value.scrollLeft = scrollLeft;
  }
  if (footerRef.value && props.syncScroll) {
    footerRef.value.scrollLeft = scrollLeft;
  }
  if (isVirtual.value) {
    handleVirtualScroll(event);
  }
  emit("scroll", {
    scrollTop: target.scrollTop,
    scrollLeft,
    isEnd: target.scrollHeight - target.scrollTop <= target.clientHeight + 1
  });
}, 10);
const handleRowClick = (row, column, event) => {
  emit("row-click", row, column, event);
  if (props.highlightCurrentRow) {
    const key = getRowKeyFn(row);
    currentRowKey.value = key;
    emit("current-change", row, null);
    emit("update:currentRowKey", key);
  }
};
const handleRowDblclick = (row, column, event) => {
  emit("row-dblclick", row, column, event);
};
const handleCellClick = (row, column, cell, event) => {
  emit("cell-click", row, column, cell, event);
};
const handleCellDblclick = (row, column, cell, event) => {
  emit("cell-dblclick", row, column, cell, event);
};
const handleHeaderClick = (column, event) => {
  emit("header-click", column, event);
  if (column.sortable) {
    handleSort(column);
  }
};
const handleSort = (column) => {
  const prop = column.prop;
  if (!prop) return;
  const currentSort = sortStates.value.find((s) => s.prop === prop);
  let newOrder = "asc";
  if (currentSort) {
    if (currentSort.order === "asc") {
      newOrder = "desc";
    } else if (currentSort.order === "desc") {
      newOrder = null;
    }
  }
  if (props.sortConfig?.multiple) {
    const index = sortStates.value.findIndex((s) => s.prop === prop);
    if (index > -1) {
      if (newOrder) {
        sortStates.value[index].order = newOrder;
      } else {
        sortStates.value.splice(index, 1);
      }
    } else if (newOrder) {
      sortStates.value.push({ prop, order: newOrder });
    }
  } else {
    if (newOrder) {
      sortStates.value = [{ prop, order: newOrder }];
    } else {
      sortStates.value = [];
    }
  }
  emit("sort-change", { column, prop, order: newOrder });
};
const handleToggleExpand = (row) => {
  const key = getRowKeyFn(row);
  if (expandedRowKeys.value.has(key)) {
    expandedRowKeys.value.delete(key);
  } else {
    if (props.expandConfig?.accordion) {
      expandedRowKeys.value.clear();
    }
    expandedRowKeys.value.add(key);
  }
  emit(
    "expand-change",
    row,
    Array.from(expandedRowKeys.value).map((k) => {
      return tableData.value.find((r) => getRowKeyFn(r) === k);
    }).filter(Boolean)
  );
};
const handleToggleTreeExpand = (row) => {
  const key = getRowKeyFn(row);
  if (treeExpandedKeys.value.has(key)) {
    treeExpandedKeys.value.delete(key);
  } else {
    if (props.treeConfig?.accordion) {
      treeExpandedKeys.value.clear();
    }
    treeExpandedKeys.value.add(key);
  }
};
const getRowClass = (row, rowIndex) => {
  const classes = [ns.e("row")];
  if (props.highlightCurrentRow && currentRowKey.value === getRowKeyFn(row)) {
    classes.push("is-current");
  }
  if (isRowSelected(row)) {
    classes.push("is-selected");
  }
  if (props.stripe && rowIndex % 2 === 1) {
    classes.push("is-striped");
  }
  if (isRowDragEnabled.value) {
    classes.push("is-row-draggable");
    const dragClass = getRowDragClass(rowIndex);
    if (dragClass) classes.push(dragClass);
  }
  if (props.rowClassName) {
    if (typeof props.rowClassName === "function") {
      classes.push(props.rowClassName({ row, rowIndex }));
    } else {
      classes.push(props.rowClassName);
    }
  }
  return classes.join(" ");
};
const getRowStyle = (row, rowIndex) => {
  if (!props.rowStyle) return {};
  if (typeof props.rowStyle === "function") {
    return props.rowStyle({ row, rowIndex });
  }
  return props.rowStyle;
};
const getCellClass = (row, column, rowIndex, columnIndex) => {
  const classes = [ns.e("cell")];
  if (column.className) {
    classes.push(column.className);
  }
  if (column.align) {
    classes.push(`is-${column.align}`);
  }
  if (column.fixed) {
    const fixedPosition = column.fixed === true ? "left" : column.fixed;
    classes.push(`is-fixed-${fixedPosition}`);
    if (fixedPosition === "left") {
      const fixedLeftIndices = visibleColumns.value.map((col, idx) => col.fixed === "left" || col.fixed === true ? idx : -1).filter((idx) => idx !== -1);
      if (columnIndex === Math.max(...fixedLeftIndices)) {
        classes.push("is-last-fixed-left");
      }
    }
    if (fixedPosition === "right") {
      const fixedRightIndices = visibleColumns.value.map((col, idx) => col.fixed === "right" ? idx : -1).filter((idx) => idx !== -1);
      if (columnIndex === Math.min(...fixedRightIndices)) {
        classes.push("is-first-fixed-right");
      }
    }
    classes.push("is-fixed");
  }
  if (props.cellClassName) {
    if (typeof props.cellClassName === "function") {
      classes.push(props.cellClassName({ row, column, rowIndex, columnIndex }));
    } else {
      classes.push(props.cellClassName);
    }
  }
  return classes.join(" ");
};
const getFixedStyle = (column, columnIndex) => {
  if (!column.fixed) return {};
  const style = {};
  let offset = 0;
  if (column.fixed === "left" || column.fixed === true) {
    offset = selectionWidth.value + expandWidth.value + indexWidth.value;
    const prevColumns = visibleColumns.value.slice(0, columnIndex);
    offset += prevColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0);
    style.left = `${offset}px`;
  } else if (column.fixed === "right") {
    const nextColumns = visibleColumns.value.slice(columnIndex + 1);
    offset = nextColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0);
    style.right = `${offset}px`;
  }
  return style;
};
const getSpecialFixedStyle = (type) => {
  if (!isAnyColumnFixedLeft.value) return {};
  const style = { position: "sticky" };
  if (type === "selection") style.left = "0px";
  if (type === "expand") style.left = `${selectionWidth.value}px`;
  if (type === "index") style.left = `${selectionWidth.value + expandWidth.value}px`;
  return style;
};
const getCellStyle = (row, column, rowIndex, columnIndex) => {
  const style = {
    ...column.style,
    ...getFixedStyle(column, columnIndex),
    textAlign: column.align || "left"
  };
  if (column.width) {
    style.width = formatSize(column.width);
  }
  if (column.minWidth) {
    style.minWidth = formatSize(column.minWidth);
  }
  if (props.cellStyle) {
    if (typeof props.cellStyle === "function") {
      Object.assign(style, props.cellStyle({ row, column, rowIndex, columnIndex }));
    } else {
      Object.assign(style, props.cellStyle);
    }
  }
  return style;
};
const getCellContent = (row, column, rowIndex) => {
  if (!row) return "";
  const prop = column.prop;
  if (!prop) return "";
  const cellValue = row[prop];
  if (column.formatter) {
    return column.formatter(row, column, cellValue, rowIndex);
  }
  if (column.displayMap && cellValue !== void 0 && cellValue !== null) {
    const mappedValue = column.displayMap[String(cellValue)];
    if (mappedValue !== void 0) return mappedValue;
  }
  if (typeof cellValue === "boolean") {
    return cellValue ? t("table.yes") : t("table.no");
  }
  return cellValue !== void 0 && cellValue !== null ? String(cellValue) : "";
};
const getSortOrder = (column) => {
  const prop = column.prop;
  if (!prop) return null;
  const sort2 = sortStates.value.find((s) => s.prop === prop);
  return sort2?.order || null;
};
const doLayout = () => {
  nextTick(() => {
    refreshVirtual();
  });
};
const refresh = () => {
  refreshVirtual();
};
const scrollTo = (options) => {
  const container = bodyRef.value;
  if (!container) return;
  if (options.row) {
    scrollToRow(options.row);
    return;
  }
  if (options.rowIndex !== void 0) {
    scrollToIndex(options.rowIndex);
    return;
  }
  container.scrollTo({
    left: options.left,
    top: options.top
  });
};
const sort = (prop, order) => {
  sortStates.value = order ? [{ prop, order }] : [];
};
const clearSort = () => {
  sortStates.value = [];
};
const filter = (prop, values) => {
  filterStates.value[prop] = values;
  emit("filter-change", filterStates.value);
};
const clearFilter = (propOrProps) => {
  if (!propOrProps) {
    filterStates.value = {};
  } else if (typeof propOrProps === "string") {
    delete filterStates.value[propOrProps];
  } else {
    propOrProps.forEach((p) => delete filterStates.value[p]);
  }
  emit("filter-change", filterStates.value);
};
const setCurrentRow = (row) => {
  const oldKey = currentRowKey.value;
  const oldRow = oldKey ? tableData.value.find((r) => getRowKeyFn(r) === oldKey) : null;
  currentRowKey.value = row ? getRowKeyFn(row) : void 0;
  emit("current-change", row, oldRow || null);
  emit("update:currentRowKey", currentRowKey.value);
};
const toggleRowExpansion = (row, expanded) => {
  const key = getRowKeyFn(row);
  const isExpanded = expandedRowKeys.value.has(key);
  const shouldExpand = expanded ?? !isExpanded;
  if (shouldExpand && !isExpanded) {
    expandedRowKeys.value.add(key);
  } else if (!shouldExpand && isExpanded) {
    expandedRowKeys.value.delete(key);
  }
};
const setExpandedRowKeys = (keys) => {
  expandedRowKeys.value = new Set(keys);
};
const getExpandedRowKeys = () => {
  return Array.from(expandedRowKeys.value);
};
const getTableData = () => ({
  fullData: props.data,
  tableData: tableData.value
});
const exportData = async (config) => {
  return doExportData(config);
};
const print = (config) => {
  return doPrint(config);
};
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};
const getColumns = () => visibleColumns.value;
const setColumnVisible = (prop, visible) => {
  const column = flatColumns.value.find((col) => col.prop === prop);
  if (column) {
    column.visible = visible;
    emit("column-visible-change", visibleColumns.value);
  }
};
const resetColumns = () => {
  flatColumns.value.forEach((col) => {
    col.visible = true;
  });
  emit("column-visible-change", visibleColumns.value);
};
const insertRow = (row, index) => {
  const newData = [...props.data];
  if (index !== void 0) {
    newData.splice(index, 0, row);
  } else {
    newData.push(row);
  }
  emit("update:data", newData);
};
const removeRow = (row) => {
  const rows = Array.isArray(row) ? row : [row];
  const keysToRemove = new Set(rows.map((r) => getRowKeyFn(r)));
  const newData = props.data.filter((r) => !keysToRemove.has(getRowKeyFn(r)));
  emit("update:data", newData);
};
const updateRow = (row, newRow) => {
  const key = getRowKeyFn(row);
  const newData = props.data.map((r) => {
    if (getRowKeyFn(r) === key) {
      return { ...r, ...newRow };
    }
    return r;
  });
  emit("update:data", newData);
};
const expose = {
  getSelectionRows: () => selectedRows.value,
  getSelectionRowKeys: () => selectedRowKeys.value,
  toggleRowSelection,
  toggleAllSelection,
  clearSelection,
  setCurrentRow,
  toggleRowExpansion,
  setExpandedRowKeys,
  getExpandedRowKeys,
  sort,
  clearSort,
  filter,
  clearFilter,
  doLayout,
  refresh,
  scrollTo,
  getTableData,
  exportData,
  print,
  openImport,
  importFile,
  importData: doImportData,
  printMultiple,
  printTemplate,
  toggleFullscreen,
  getColumns,
  setColumnVisible,
  resetColumns,
  insertRow,
  removeRow,
  updateRow
};
defineExpose(expose);
provide(tableContextKey, {
  props,
  slots,
  registerColumn: (column) => {
    if (!collectedColumns.value.includes(column)) {
      collectedColumns.value.push(column);
    }
  },
  unregisterColumn: (column) => {
    const index = collectedColumns.value.indexOf(column);
    if (index > -1) {
      collectedColumns.value.splice(index, 1);
    }
  }
});
onMounted(() => {
  doLayout();
});
watch(
  () => props.data,
  () => {
    nextTick(() => {
      doLayout();
    });
  }
);
watch(
  () => props.currentRowKey,
  (val) => {
    currentRowKey.value = val;
  }
);
watch(selectedRowKeys, () => {
  emit("selection-change", selectedRows.value, selectedRowKeys.value);
});
</script>

<template>
  <div ref="tableRef" :class="tableClasses" :style="tableStyle">
    <div :class="innerWrapperClasses">
      <!-- 工具栏 -->
      <div v-if="showToolbar" :class="ns.e('toolbar')">
        <slot name="toolbar">
          <div :class="ns.e('toolbar-left')">
            <slot name="toolbar-left-prefix" />
            <slot name="toolbar-left" />
            <slot name="toolbar-left-suffix" />
          </div>
          <div :class="ns.e('toolbar-right')">
            <slot name="toolbar-right-prefix" />
            <slot name="toolbar-right" />
            <slot name="toolbar-right-suffix" />
          </div>
        </slot>
      </div>

      <!-- 表头 -->
      <div v-if="showHeader" ref="headerRef" :class="ns.e('header-wrapper')">
        <table :class="ns.e('header')" :style="{
  tableLayout
}">
          <colgroup>
            <col
              v-if="selectionConfig"
              :style="{
  width: formatSize(selectionConfig.columnWidth || 50)
}"
            />
            <col
              v-if="expandConfig"
              :style="{
  width: formatSize(expandConfig.columnWidth || 50)
}"
            />
            <col v-if="showIndex" :style="{
  width: formatSize(indexConfig?.width || 50)
}" />
            <col
              v-for="column in visibleColumns"
              :key="column.prop || column.key"
              :style="{
  width: formatSize(column.width)
}"
            />
          </colgroup>
          <thead>
            <!-- 多级表头 -->
            <template v-if="headerRows.length > 0">
              <tr v-for="(hRow, rowIdx) in headerRows" :key="rowIdx" :class="ns.e('header-row')">
                <!-- 选择列（仅第一行，跨所有行） -->
                <th
                  v-if="selectionConfig && rowIdx === 0"
                  :rowspan="columnDepth"
                  :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="{
  width: formatSize(selectionConfig.columnWidth || 50),
  ...getSpecialFixedStyle('selection')
}"
                >
                  <div :class="ns.e('selection-cell')">
                    <template
                      v-if="selectionType === 'checkbox' && selectionConfig.showSelectAll !== false"
                    >
                      <input
                        type="checkbox"
                        :checked="isAllSelected"
                        :indeterminate="isIndeterminate"
                        @change="toggleAllSelection"
                      />
                    </template>
                  </div>
                </th>

                <!-- 展开列（仅第一行，跨所有行） -->
                <th
                  v-if="expandConfig && rowIdx === 0"
                  :rowspan="columnDepth"
                  :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="{
  width: formatSize(expandConfig.columnWidth || 50),
  ...getSpecialFixedStyle('expand')
}"
                >
                  <div :class="ns.e('expand-cell')" />
                </th>

                <!-- 序号列（仅第一行，跨所有行） -->
                <th
                  v-if="showIndex && rowIdx === 0"
                  :rowspan="columnDepth"
                  :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="{
  width: formatSize(indexConfig?.width || 50),
  ...getSpecialFixedStyle('index')
}"
                >
                  <div :class="ns.e('index-cell')">
                    {{ indexConfig?.label || t("table.index") }}
                  </div>
                </th>

                <!-- 数据列 -->
                <th
                  v-for="(cell, cellIdx) in hRow"
                  :key="cell.column.prop || cell.column.key || cellIdx"
                  :colspan="cell.colspan > 1 ? cell.colspan : void 0"
                  :rowspan="cell.rowspan > 1 ? cell.rowspan : void 0"
                  :class="[ns.e('header-cell'), cell.column.headerClassName, cell.column.headerAlign ? `is-${cell.column.headerAlign}` : '', cell.column.sortable ? 'is-sortable' : '', cell.column.fixed ? `is-fixed-${cell.column.fixed === true ? 'left' : cell.column.fixed}` : '', cell.column.children?.length ? 'is-group' : '', isColumnDraggable(cell.column) ? 'is-column-draggable' : '']"
                  :style="{
  ...cell.column.headerStyle,
  textAlign: cell.column.headerAlign || cell.column.align || (cell.column.children?.length ? 'center' : 'left')
}"
                  @click="handleHeaderClick(cell.column, $event)"
                >
                  <div :class="ns.e('cell-content')">
                    <!-- 表头前缀图标 -->
                    <component
                      v-if="cell.column.headerPrefixIcon && typeof cell.column.headerPrefixIcon !== 'string'"
                      :is="cell.column.headerPrefixIcon"
                      :class="ns.e('header-icon-prefix')"
                    />
                    <span
                      v-else-if="cell.column.headerPrefixIcon"
                      :class="ns.e('header-icon-prefix')"
                      >{{ cell.column.headerPrefixIcon }}</span
                    >

                    <slot
                      v-if="cell.column.prop && $slots['header-' + cell.column.prop]"
                      :name="'header-' + cell.column.prop"
                      :column="cell.column"
                      :column-index="cellIdx"
                    />
                    <RenderColumn
                      v-else-if="cell.column.headerRender"
                      :render="cell.column.headerRender"
                      :params="{
  column: cell.column,
  columnIndex: cellIdx
}"
                    />
                    <template v-else>
                      {{ cell.column.label }}
                    </template>

                    <!-- 表头后缀图标 -->
                    <component
                      v-if="cell.column.headerSuffixIcon && typeof cell.column.headerSuffixIcon !== 'string'"
                      :is="cell.column.headerSuffixIcon"
                      :class="ns.e('header-icon-suffix')"
                    />
                    <span
                      v-else-if="cell.column.headerSuffixIcon"
                      :class="ns.e('header-icon-suffix')"
                      >{{ cell.column.headerSuffixIcon }}</span
                    >

                    <span v-if="cell.column.sortable" :class="ns.e('sort-icon')">
                      <span
                        :class="['sort-caret', 'ascending', getSortOrder(cell.column) === 'asc' ? 'is-active' : '']"
                      />
                      <span
                        :class="['sort-caret', 'descending', getSortOrder(cell.column) === 'desc' ? 'is-active' : '']"
                      />
                    </span>
                  </div>

                  <!-- 列宽调整手柄（仅叶子列） -->
                  <span
                    v-if="!cell.column.children?.length && isColumnResizable(cell.column)"
                    :class="ns.e('resize-handle')"
                    @pointerdown.stop="handleResizeStart($event, cell.column, $event.currentTarget.parentElement)"
                  />
                </th>
              </tr>
            </template>

            <!-- 单层表头（原有逻辑） -->
            <tr v-else :class="ns.e('header-row')">
              <!-- 选择列 -->
              <th
                v-if="selectionConfig"
                :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                :style="{
  width: formatSize(selectionConfig.columnWidth || 50),
  ...getSpecialFixedStyle('selection')
}"
              >
                <div :class="ns.e('selection-cell')">
                  <template
                    v-if="selectionType === 'checkbox' && selectionConfig.showSelectAll !== false"
                  >
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      :indeterminate="isIndeterminate"
                      @change="toggleAllSelection"
                    />
                  </template>
                </div>
              </th>

              <!-- 展开列 -->
              <th
                v-if="expandConfig"
                :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                :style="{
  width: formatSize(expandConfig.columnWidth || 50),
  ...getSpecialFixedStyle('expand')
}"
              >
                <div :class="ns.e('expand-cell')" />
              </th>

              <!-- 序号列 -->
              <th
                v-if="showIndex"
                :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                :style="{
  width: formatSize(indexConfig?.width || 50),
  ...getSpecialFixedStyle('index')
}"
              >
                <div :class="ns.e('index-cell')">
                  {{ indexConfig?.label || t("table.index") }}
                </div>
              </th>

              <!-- 数据列 -->
              <th
                v-for="(column, columnIndex) in visibleColumns"
                :key="column.prop || column.key || columnIndex"
                :class="[ns.e('header-cell'), column.headerClassName, column.headerAlign ? `is-${column.headerAlign}` : '', column.sortable ? 'is-sortable' : '', column.fixed ? `is-fixed-${column.fixed === true ? 'left' : column.fixed}` : '', isColumnDragEnabled ? getHeaderDragClass(columnIndex) : '', isColumnDraggable(column) ? 'is-column-draggable' : '']"
                :style="{
  ...column.headerStyle,
  ...getFixedStyle(column, columnIndex),
  width: formatSize(column.width),
  textAlign: column.headerAlign || column.align || 'left'
}"
                v-bind="getHeaderDragAttrs(column, columnIndex)"
                @click="handleHeaderClick(column, $event)"
              >
                <div :class="ns.e('cell-content')">
                  <!-- 表头前缀图标 -->
                  <component
                    v-if="column.headerPrefixIcon && typeof column.headerPrefixIcon !== 'string'"
                    :is="column.headerPrefixIcon"
                    :class="ns.e('header-icon-prefix')"
                  />
                  <span v-else-if="column.headerPrefixIcon" :class="ns.e('header-icon-prefix')">{{
                    column.headerPrefixIcon
                  }}</span>

                  <!-- 自定义表头 -->
                  <slot
                    v-if="column.prop && $slots['header-' + column.prop]"
                    :name="'header-' + column.prop"
                    :column="column"
                    :column-index="columnIndex"
                  />
                  <RenderColumn
                    v-else-if="column.headerRender"
                    :render="column.headerRender"
                    :params="{
  column,
  columnIndex
}"
                  />
                  <template v-else>
                    {{ column.label }}
                  </template>

                  <!-- 表头后缀图标 -->
                  <component
                    v-if="column.headerSuffixIcon && typeof column.headerSuffixIcon !== 'string'"
                    :is="column.headerSuffixIcon"
                    :class="ns.e('header-icon-suffix')"
                  />
                  <span v-else-if="column.headerSuffixIcon" :class="ns.e('header-icon-suffix')">{{
                    column.headerSuffixIcon
                  }}</span>

                  <!-- 排序图标 -->
                  <span v-if="column.sortable" :class="ns.e('sort-icon')">
                    <span
                      :class="['sort-caret', 'ascending', getSortOrder(column) === 'asc' ? 'is-active' : '']"
                    />
                    <span
                      :class="['sort-caret', 'descending', getSortOrder(column) === 'desc' ? 'is-active' : '']"
                    />
                  </span>
                </div>

                <!-- 列宽调整手柄 -->
                <span
                  v-if="isColumnResizable(column)"
                  :class="ns.e('resize-handle')"
                  @pointerdown.stop="handleResizeStart($event, column, $event.currentTarget.parentElement)"
                />
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表体 -->
      <div
        ref="bodyRef"
        :class="[ns.e('body-wrapper'), isVirtual ? ns.em('body-wrapper', 'virtual') : '']"
        :style="bodyStyle"
        @scroll="handleScroll"
      >
        <!-- 虚拟滚动：单一 phantom div 撑起滚动条高度 -->
        <div
          v-if="isVirtual"
          :class="ns.e('virtual-phantom')"
          :style="{
  height: `${totalHeight}px`
}"
        />

        <!-- 空数据 -->
        <div v-if="tableData.length === 0" :class="ns.e('empty')">
          <slot name="empty">
            <div :class="ns.e('empty-content')">
              <template v-if="emptyConfig?.render">
                <component :is="emptyConfig.render()" />
              </template>
              <template v-else>
                <div v-if="emptyConfig?.image" :class="ns.e('empty-image')">
                  <img :src="emptyConfig.image" :alt="t('common.noData')" />
                </div>
                <div :class="ns.e('empty-text')">
                  {{ emptyConfig?.description || emptyText || t("table.emptyText") }}
                </div>
              </template>
            </div>
          </slot>
        </div>

        <!-- 数据表格（虚拟模式下通过 transform 定位，GPU 加速无重排） -->
        <table
          v-else
          :class="[ns.e('body'), isVirtual ? ns.em('body', 'virtual') : '']"
          :style="{
  tableLayout,
  ...(isVirtual ? {
    transform: `translate3d(0, ${offsetTop}px, 0)`
  } : {})
}"
        >
          <colgroup>
            <col
              v-if="selectionConfig"
              :style="{
  width: formatSize(selectionConfig.columnWidth || 50)
}"
            />
            <col
              v-if="expandConfig"
              :style="{
  width: formatSize(expandConfig.columnWidth || 50)
}"
            />
            <col v-if="showIndex" :style="{
  width: formatSize(indexConfig?.width || 50)
}" />
            <col
              v-for="column in visibleColumns"
              :key="column.prop || column.key"
              :style="{
  width: formatSize(column.width)
}"
            />
          </colgroup>
          <tbody>
            <template v-for="(row, rowIndex) in renderData" :key="getRowKeyFn(row)">
              <tr
                :class="getRowClass(row, rowIndex)"
                :style="getRowStyle(row, rowIndex)"
                v-bind="getRowDragAttrs(rowIndex)"
                @click="handleRowClick(row, visibleColumns[0], $event)"
                @dblclick="handleRowDblclick(row, visibleColumns[0], $event)"
              >
                <!-- 选择列 -->
                <td
                  v-if="selectionConfig"
                  :class="[ns.e('cell'), ns.e('selection-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="getSpecialFixedStyle('selection')"
                  @click.stop
                >
                  <input
                    :type="selectionType === 'radio' ? 'radio' : 'checkbox'"
                    :checked="isRowSelected(row)"
                    :disabled="!isRowSelectable(row, rowIndex)"
                    @change="toggleRowSelection(row)"
                  />
                </td>

                <!-- 展开列 -->
                <td
                  v-if="expandConfig"
                  :class="[ns.e('cell'), ns.e('expand-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="getSpecialFixedStyle('expand')"
                  @click.stop="handleToggleExpand(row)"
                >
                  <span
                    :class="[ns.e('expand-icon'), expandedRowKeys.has(getRowKeyFn(row)) ? 'is-expanded' : '']"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                      />
                    </svg>
                  </span>
                </td>

                <!-- 序号列 -->
                <td
                  v-if="showIndex"
                  :class="[ns.e('cell'), ns.e('index-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="getSpecialFixedStyle('index')"
                >
                  {{ indexConfig?.method ? indexConfig.method(rowIndex) : rowIndex + 1 }}
                </td>

                <!-- 数据列 (合并单元格时跳过 span=0 的单元格) -->
                <template
                  v-for="(column, columnIndex) in visibleColumns"
                  :key="column.prop || column.key || columnIndex"
                >
                  <td
                    v-if="isSpanVisible(row, column, rowIndex, columnIndex)"
                    :class="[getCellClass(row, column, rowIndex, columnIndex)]"
                    :style="getCellStyle(row, column, rowIndex, columnIndex)"
                    :colspan="calculateSpan(row, column, rowIndex, columnIndex, spanMethod).colspan || void 0"
                    :rowspan="calculateSpan(row, column, rowIndex, columnIndex, spanMethod).rowspan || void 0"
                    :data-row-key="getRowKeyFn(row)"
                    :data-prop="column.prop"
                    @click="handleCellClick(row, column, $event.currentTarget, $event)"
                    @dblclick="handleCellDblclick(row, column, $event.currentTarget, $event)"
                  >
                    <div :class="ns.e('cell-content')">
                      <!-- 树形缩进 -->
                      <span
                        v-if="treeConfig && column.treeNode"
                        :class="[ns.e('tree-indent')]"
                        :style="{
  paddingLeft: `${(row._level || 0) * (treeConfig.indent || 16)}px`
}"
                      >
                        <span
                          v-if="row._hasChildren"
                          :class="[ns.e('tree-icon'), row._isExpanded ? 'is-expanded' : '']"
                          @click.stop="handleToggleTreeExpand(row)"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                              fill="currentColor"
                              d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                            />
                          </svg>
                        </span>
                        <span v-else :class="ns.e('tree-leaf-spacer')" />
                      </span>

                      <!-- 内容展示 -->
                      <slot
                        v-if="row && column.prop && $slots[column.prop]"
                        :name="column.prop"
                        :row="row"
                        :column="column"
                        :row-index="rowIndex"
                        :cell-value="column.prop ? row[column.prop] : void 0"
                      />
                      <RenderColumn
                        v-else-if="row && column.render"
                        :render="column.render"
                        :params="{
  row,
  column,
  rowIndex,
  cellValue: column.prop ? row[column.prop] : void 0
}"
                      />
                      <template v-else>
                        <yh-tooltip
                          v-if="column.showOverflowTooltip"
                          :content="String(getCellContent(row, column, rowIndex))"
                          :effect="typeof column.showOverflowTooltip === 'object' ? column.showOverflowTooltip.effect || tooltipEffect : tooltipEffect"
                          :placement="typeof column.showOverflowTooltip === 'object' ? column.showOverflowTooltip.placement || 'top' : 'top'"
                        >
                          <div :class="[ns.e('cell-text'), ns.is('ellipsis', true)]">
                            {{ getCellContent(row, column, rowIndex) }}
                          </div>
                        </yh-tooltip>
                        <template v-else>
                          {{ getCellContent(row, column, rowIndex) }}
                        </template>
                      </template>
                    </div>
                  </td>
                </template>
              </tr>

              <!-- 展开行内容 -->
              <tr
                v-if="expandConfig && expandedRowKeys.has(getRowKeyFn(row))"
                :class="ns.e('expanded-row')"
              >
                <td
                  :colspan="visibleColumns.length + (selectionConfig ? 1 : 0) + (showIndex ? 1 : 0) + 1"
                >
                  <slot name="expand" :row="row" :row-index="rowIndex">
                    <component
                      v-if="expandConfig.render"
                      :is="expandConfig.render({
  row,
  rowIndex
})"
                    />
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- 汇总行 -->
      <div v-if="summaryConfig" ref="footerRef" :class="ns.e('footer-wrapper')">
        <slot name="summary">
          <table :class="ns.e('footer')" :style="{
  tableLayout
}">
            <colgroup>
              <col
                v-if="selectionConfig"
                :style="{
  width: formatSize(selectionConfig.columnWidth || 50)
}"
              />
              <col
                v-if="expandConfig"
                :style="{
  width: formatSize(expandConfig.columnWidth || 50)
}"
              />
              <col v-if="showIndex" :style="{
  width: formatSize(indexConfig?.width || 50)
}" />
              <col
                v-for="column in visibleColumns"
                :key="column.prop || column.key"
                :style="{
  width: formatSize(column.width)
}"
              />
            </colgroup>
            <tbody>
              <tr :class="[ns.e('row'), ns.e('summary-row'), summaryConfig.className]">
                <!-- 选择列占位 -->
                <td
                  v-if="selectionConfig"
                  :class="[ns.e('cell'), ns.e('selection-cell')]"
                  :style="getSpecialFixedStyle('selection')"
                />
                <!-- 展开列占位 -->
                <td
                  v-if="expandConfig"
                  :class="[ns.e('cell'), ns.e('expand-cell')]"
                  :style="getSpecialFixedStyle('expand')"
                />
                <!-- 序号列占位 -->
                <td
                  v-if="showIndex"
                  :class="[ns.e('cell'), ns.e('index-cell')]"
                  :style="getSpecialFixedStyle('index')"
                />
                <!-- 数据列 -->
                <td
                  v-for="(column, columnIndex) in visibleColumns"
                  :key="column.prop || column.key || columnIndex"
                  :class="getCellClass({}, column, 0, columnIndex)"
                  :style="getCellStyle({}, column, 0, columnIndex)"
                >
                  <div :class="ns.e('cell-content')">
                    <slot
                      :name="`summary-${column.prop}`"
                      :column="column"
                      :column-index="columnIndex"
                      :data="tableData"
                    >
                      {{
                        summaryValues.length > 0 ? summaryValues[columnIndex] : columnIndex === 0 ? summaryConfig.text || t("table.sumText") : ""
                      }}
                    </slot>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </slot>
      </div>

      <!-- 列宽调整指示线 -->
      <div
        v-if="resizeLineVisible"
        :class="ns.e('resize-line')"
        :style="{
  left: `${resizeLineLeft}px`
}"
      />

      <!-- 加载状态 -->
      <div
        v-if="typeof loading === 'object' ? loading.visible !== false : !!loading"
        :class="ns.e('loading')"
        :style="typeof loading === 'object' && loading.background ? {
  backgroundColor: loading.background
} : {}"
      >
        <slot name="loading">
          <div :class="ns.e('loading-content')">
            <span :class="ns.e('loading-spinner')" />
            <span v-if="typeof loading === 'object' && loading.text" :class="ns.e('loading-text')">
              {{ loading.text }}
            </span>
            <span v-else-if="typeof loading === 'boolean'" :class="ns.e('loading-text')">
              {{ t("table.loading") }}
            </span>
          </div>
        </slot>
      </div>
    </div>

    <!-- 分页 -->
    <div
      v-if="pagination"
      :class="[ns.e('pagination-wrapper'), typeof pagination === 'object' && pagination.align ? ns.is('align-' + pagination.align) : '']"
    >
      <YhPagination
        v-bind="typeof pagination === 'object' ? pagination : {}"
        :class="ns.e('pagination')"
        @update:current-page="val => emit('page-change', {
  currentPage: val,
  pageSize: (typeof pagination === 'object' ? pagination.pageSize : 10) || 10
})"
        @update:page-size="val => emit('page-change', {
  currentPage: (typeof pagination === 'object' ? pagination.currentPage : 1) || 1,
  pageSize: val
})"
      />
    </div>

    <!-- 渲染隐藏的默认插槽，用于收集列配置(仅渲染 YhTableColumn 子组件) -->
    <div
      v-if="$slots.default && (!columns || columns.length === 0)"
      style="display: none"
      aria-hidden="true"
    >
      <slot />
    </div>
  </div>
</template>

<style>
@charset "UTF-8";
/**
 * Table 表格组件样式
 * 极致网格修复方案 (Pseudo-Frame Strategy)
 * 所有视觉属性均通过主题变量驱动，支持主题定制与暗黑模式
 */
/**
 * YH-UI CSS Variables
 * 全局 CSS 变量定义 - 业内最佳主题系统
 */
:root {
  /* ==================== 密度/紧凑度系统 ==================== */
  --yh-density-factor: 1;
  --yh-component-size-default: 32px;
  --yh-component-size-small: 24px;
  --yh-component-size-large: 40px;
  --yh-padding-default: 12px 16px;
  --yh-padding-small: 8px 12px;
  --yh-padding-large: 16px 20px;
  --yh-spacing-unit: 8px;
  /* ==================== 基础颜色 ==================== */
  --yh-color-white: #ffffff;
  --yh-color-black: #000000;
  /* ==================== 颜色系统 ==================== */
  /* 主色 */
  --yh-color-primary: #409eff;
  --yh-color-primary-light-1: #53a8ff;
  --yh-color-primary-light-2: #66b1ff;
  --yh-color-primary-light-3: #79bbff;
  --yh-color-primary-light-4: #8cc5ff;
  --yh-color-primary-light-5: #a0cfff;
  --yh-color-primary-light-6: #b3d8ff;
  --yh-color-primary-light-7: #c6e2ff;
  --yh-color-primary-light-8: #d9ecff;
  --yh-color-primary-light-9: #ecf5ff;
  --yh-color-primary-dark-2: #337ecc;
  /* 成功色 */
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #95d475;
  --yh-color-success-light-5: #b3e19d;
  --yh-color-success-light-7: #d1edc4;
  --yh-color-success-light-9: #f0f9eb;
  --yh-color-success-dark-2: #529b2e;
  /* 警告色 */
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #eebe77;
  --yh-color-warning-light-5: #f3d19e;
  --yh-color-warning-light-7: #f8e3c5;
  --yh-color-warning-light-9: #fdf6ec;
  --yh-color-warning-dark-2: #b88230;
  /* 危险色 */
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #f89898;
  --yh-color-danger-light-5: #fab6b6;
  --yh-color-danger-light-7: #fcd3d3;
  --yh-color-danger-light-9: #fef0f0;
  --yh-color-danger-dark-2: #c45656;
  /* 信息色 */
  --yh-color-info: #909399;
  --yh-color-info-light-3: #b1b3b8;
  --yh-color-info-light-5: #c8c9cc;
  --yh-color-info-light-7: #dedfe0;
  --yh-color-info-light-9: #f4f4f5;
  --yh-color-info-dark-2: #73767a;
  /* 文字颜色 */
  --yh-text-color-primary: #303133;
  --yh-text-color-regular: #606266;
  --yh-text-color-secondary: #909399;
  --yh-text-color-placeholder: #a8abb2;
  --yh-text-color-disabled: #c0c4cc;
  /* 边框颜色 */
  --yh-border-color: #dcdfe6;
  --yh-border-color-hover: var(--yh-color-primary);
  --yh-border-color-light: #e4e7ed;
  --yh-border-color-lighter: #ebeef5;
  --yh-border-color-extra-light: #f2f6fc;
  --yh-border-color-dark: #d4d7de;
  --yh-border-color-darker: #cdd0d6;
  /* 填充颜色 */
  --yh-fill-color: #f0f2f5;
  --yh-fill-color-light: #f5f7fa;
  --yh-fill-color-lighter: #fafafa;
  --yh-fill-color-extra-light: #fafcff;
  --yh-fill-color-dark: #ebedf0;
  --yh-fill-color-darker: #e6e8eb;
  --yh-fill-color-blank: #ffffff;
  /* 背景颜色 */
  --yh-bg-color: #ffffff;
  --yh-bg-color-page: #f2f3f5;
  --yh-bg-color-overlay: #ffffff;
  /* ==================== 间距系统 ==================== */
  --yh-spacing-none: 0;
  --yh-spacing-xs: 4px;
  --yh-spacing-sm: 8px;
  --yh-spacing-md: 16px;
  --yh-spacing-lg: 24px;
  --yh-spacing-xl: 32px;
  --yh-spacing-xxl: 48px;
  /* ==================== 圆角系统 ==================== */
  --yh-radius-none: 0;
  --yh-radius-sm: 2px;
  --yh-radius-base: 4px;
  --yh-radius-md: 8px;
  --yh-radius-lg: 12px;
  --yh-radius-xl: 16px;
  --yh-radius-round: 20px;
  --yh-radius-circle: 50%;
  /* ==================== 字体系统 ==================== */
  --yh-font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  /* 字号 */
  --yh-font-size-xs: 12px;
  --yh-font-size-sm: 13px;
  --yh-font-size-base: 14px;
  --yh-font-size-md: 16px;
  --yh-font-size-lg: 18px;
  --yh-font-size-xl: 20px;
  --yh-font-size-xxl: 24px;
  /* 行高 */
  --yh-line-height-none: 1;
  --yh-line-height-tight: 1.25;
  --yh-line-height-snug: 1.375;
  --yh-line-height-normal: 1.5;
  --yh-line-height-relaxed: 1.625;
  --yh-line-height-loose: 2;
  /* 字重 */
  --yh-font-weight-light: 300;
  --yh-font-weight-normal: 400;
  --yh-font-weight-medium: 500;
  --yh-font-weight-semibold: 600;
  --yh-font-weight-bold: 700;
  /* ==================== 阴影系统 ==================== */
  --yh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --yh-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --yh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --yh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --yh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  /* ==================== 过渡动效 ==================== */
  --yh-duration-fast: 150ms;
  --yh-duration-base: 200ms;
  --yh-duration-slow: 300ms;
  --yh-timing-ease: ease;
  --yh-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --yh-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --yh-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yh-timing-linear: linear;
  --yh-transition-base: all var(--yh-duration-base) var(--yh-timing-ease-in-out);
  --yh-transition-fast: all var(--yh-duration-fast) var(--yh-timing-ease-in-out);
  --yh-transition-slow: all var(--yh-duration-slow) var(--yh-timing-ease-in-out);
  /* ==================== 层级系统 ==================== */
  --yh-z-index-normal: 1;
  --yh-z-index-top: 1000;
  --yh-z-index-popper: 2000;
  --yh-z-index-overlay: 2001;
  --yh-z-index-modal: 2002;
  --yh-z-index-popover: 2003;
  --yh-z-index-tooltip: 2004;
  --yh-z-index-loading: 2005;
  /* ==================== 组件尺寸 ==================== */
  /* Large */
  --yh-component-size-large: 40px;
  --yh-component-size-large-font: 14px;
  --yh-component-size-large-padding: 20px;
  /* Default */
  --yh-component-size-default: 32px;
  --yh-component-size-default-font: 14px;
  --yh-component-size-default-padding: 16px;
  /* Small */
  --yh-component-size-small: 24px;
  --yh-component-size-small-font: 12px;
  --yh-component-size-small-padding: 12px;
  /* ==================== 组件语义化变量 ==================== */
  --yh-border-radius-base: var(--yh-radius-base);
  --yh-border-radius-small: var(--yh-radius-sm);
  --yh-border-radius-round: var(--yh-radius-round);
  /* Message 消息提示 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-message-shadow: var(--yh-shadow-lg);
  --yh-message-text-color: var(--yh-text-color-primary);
  --yh-message-close-color: var(--yh-text-color-secondary);
  --yh-message-close-hover-color: var(--yh-text-color-primary);
  /* Notification 通知 */
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-notification-shadow: var(--yh-shadow-lg);
  --yh-notification-title-color: var(--yh-text-color-primary);
  --yh-notification-content-color: var(--yh-text-color-regular);
  /* Badge 徽标 */
  --yh-badge-bg-color: var(--yh-color-danger);
  --yh-badge-text-color: #ffffff;
  --yh-badge-border-color: var(--yh-bg-color);
  /* Card 卡片 */
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  --yh-card-shadow: var(--yh-shadow-base);
  --yh-card-header-padding: 18px 20px;
  --yh-card-body-padding: 20px;
  /* Input 输入框 */
  --yh-input-bg-color: var(--yh-fill-color-blank);
  --yh-input-text-color: var(--yh-text-color-regular);
  --yh-input-border-color: var(--yh-border-color);
  --yh-input-hover-border-color: var(--yh-color-primary);
  --yh-input-focus-border-color: var(--yh-color-primary);
  --yh-input-placeholder-color: var(--yh-text-color-placeholder);
  --yh-input-icon-color: var(--yh-text-color-placeholder);
  --yh-input-disabled-bg-color: var(--yh-fill-color-light);
  --yh-input-disabled-text-color: var(--yh-text-color-disabled);
  --yh-input-disabled-border-color: var(--yh-border-color-light);
  /* Image 图片 */
  --yh-image-placeholder-bg-color: var(--yh-fill-color-light);
  --yh-image-placeholder-text-color: var(--yh-text-color-placeholder);
  --yh-image-error-bg-color: var(--yh-fill-color-extra-light);
  --yh-image-error-text-color: var(--yh-text-color-placeholder);
  /* Image Viewer 预览器 */
  --yh-image-viewer-mask-bg-color: rgba(0, 0, 0, 0.5);
  --yh-image-viewer-btn-bg-color: var(--yh-text-color-regular);
  --yh-image-viewer-btn-color: #ffffff;
  --yh-image-viewer-btn-hover-bg-color: var(--yh-color-primary);
  /* Calendar 日历 */
  --yh-calendar-bg: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  --yh-calendar-border-color: rgba(0, 0, 0, 0.06);
  --yh-calendar-border-radius: var(--yh-radius-xl);
  --yh-calendar-header-bg: rgba(255, 255, 255, 0.95);
  --yh-calendar-header-border: rgba(0, 0, 0, 0.04);
  --yh-calendar-header-padding: 18px 22px;
  --yh-calendar-body-padding: 14px 18px 18px;
  /* Calendar 尺寸 */
  --yh-calendar-cell-height: 85px;
  --yh-calendar-cell-height-small: 52px;
  --yh-calendar-cell-height-large: 110px;
  --yh-calendar-cell-radius: 10px;
  --yh-calendar-cell-radius-small: 6px;
  --yh-calendar-cell-radius-large: 12px;
  /* Calendar 颜色 */
  --yh-calendar-primary: var(--yh-color-primary);
  --yh-calendar-primary-light: rgba(59, 130, 246, 0.1);
  --yh-calendar-selected-bg: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  --yh-calendar-selected-border: rgba(59, 130, 246, 0.4);
  --yh-calendar-today-dot: var(--yh-color-primary);
  --yh-calendar-weekend-color: #f97316;
  --yh-calendar-disabled-color: var(--yh-text-color-disabled);
  --yh-calendar-other-month-opacity: 0.35;
  /* Calendar 假日 */
  --yh-calendar-holiday-color: var(--yh-color-success);
  --yh-calendar-holiday-bg: rgba(16, 185, 129, 0.12);
  --yh-calendar-holiday-border: rgba(16, 185, 129, 0.25);
  --yh-calendar-workday-color: var(--yh-color-warning);
  --yh-calendar-workday-bg: rgba(245, 158, 11, 0.12);
  --yh-calendar-workday-border: rgba(245, 158, 11, 0.25);
  /* Calendar 范围选择 */
  --yh-calendar-range-bg: rgba(59, 130, 246, 0.08);
  --yh-calendar-range-border: rgba(59, 130, 246, 0.2);
  /* Calendar 字体 */
  --yh-calendar-weekday-font-size: var(--yh-font-size-sm);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-day-font-size: 15px;
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-badge-font-size: 9px;
  /* Table 表格 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-light);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-header-font-weight: var(--yh-font-weight-semibold);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color-light);
  --yh-table-row-stripe-bg: var(--yh-fill-color-lighter);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-8);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-text-color: var(--yh-text-color-regular);
  --yh-table-empty-text-color: var(--yh-text-color-secondary);
  --yh-table-font-size: var(--yh-font-size-base);
  --yh-table-cell-padding: 12px 0;
  --yh-table-cell-spacing: 12px;
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);
  /* ==================== 边框基础 ==================== */
  --yh-border-width: 1px;
  --yh-border-style: solid;
  --yh-border: var(--yh-border-width) var(--yh-border-style) var(--yh-border-color);
  /* ==================== 断点系统 ==================== */
  --yh-breakpoint-xs: 0;
  --yh-breakpoint-sm: 576px;
  --yh-breakpoint-md: 768px;
  --yh-breakpoint-lg: 992px;
  --yh-breakpoint-xl: 1200px;
  --yh-breakpoint-xxl: 1400px;
  /* ==================== 字体系统扩展 ==================== */
  --yh-font-family-monospace:
    'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --yh-font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  /* ==================== 无障碍/聚焦系统 ==================== */
  --yh-focus-ring-color: var(--yh-color-primary);
  --yh-focus-ring-width: 2px;
  --yh-focus-ring-offset: 2px;
  --yh-focus-ring-opacity: 0.2;
  --yh-focus-ring:
    0 0 0 var(--yh-focus-ring-offset) var(--yh-bg-color),
    0 0 0 calc(var(--yh-focus-ring-offset) + var(--yh-focus-ring-width)) var(--yh-focus-ring-color);
  /* 高对比度模式支持 */
  --yh-high-contrast-outline: 2px solid transparent;
  --yh-high-contrast-outline-offset: 2px;
  /* ==================== 滚动条样式 ==================== */
  --yh-scrollbar-width: 6px;
  --yh-scrollbar-thumb-color: var(--yh-text-color-disabled);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-secondary);
  --yh-scrollbar-track-color: transparent;
  --yh-scrollbar-thumb-radius: 3px;
  /* ==================== 遮罩层 ==================== */
  --yh-mask-color: rgba(0, 0, 0, 0.5);
  --yh-mask-color-light: rgba(0, 0, 0, 0.3);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.1);
}

/* ==================== 暗黑模式 ==================== */
html.dark {
  --yh-color-primary: #409eff;
  --yh-color-primary-light-3: #3375b9;
  --yh-color-primary-light-5: #2a598a;
  --yh-color-primary-light-7: #213d5b;
  --yh-color-primary-light-9: #18222c;
  --yh-color-primary-dark-2: #66b1ff;
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #4e8e2f;
  --yh-color-success-light-5: #3e6b27;
  --yh-color-success-light-7: #2d481f;
  --yh-color-success-light-9: #1d2518;
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #a77730;
  --yh-color-warning-light-5: #7d5b28;
  --yh-color-warning-light-7: #533f20;
  --yh-color-warning-light-9: #292218;
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #b25252;
  --yh-color-danger-light-5: #854040;
  --yh-color-danger-light-7: #582e2e;
  --yh-color-danger-light-9: #2b1d1d;
  --yh-color-info: #909399;
  --yh-color-info-light-3: #6b6d71;
  --yh-color-info-light-5: #525457;
  --yh-color-info-light-7: #393b3e;
  --yh-color-info-light-9: #202124;
  --yh-text-color-primary: #e5eaf3;
  --yh-text-color-regular: #cfd3dc;
  --yh-text-color-secondary: #a3a6ad;
  --yh-text-color-placeholder: #8d9095;
  --yh-text-color-disabled: #6c6e72;
  --yh-border-color: #4c4d4f;
  --yh-border-color-light: #414243;
  --yh-border-color-lighter: #363637;
  --yh-border-color-extra-light: #2b2b2c;
  --yh-border-color-dark: #58585b;
  --yh-border-color-darker: #636466;
  --yh-fill-color: #303030;
  --yh-fill-color-light: #262727;
  --yh-fill-color-lighter: #1d1d1d;
  --yh-fill-color-extra-light: #191919;
  --yh-fill-color-dark: #39393a;
  --yh-fill-color-darker: #424243;
  --yh-fill-color-blank: transparent;
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0a0a0a;
  --yh-bg-color-overlay: #1d1e1f;
  /* 组件暗色模式覆盖 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-badge-border-color: var(--yh-bg-color);
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  /* Calendar 暗黑模式 */
  --yh-calendar-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --yh-calendar-border-color: rgba(255, 255, 255, 0.08);
  --yh-calendar-header-bg: rgba(30, 30, 30, 0.95);
  --yh-calendar-header-border: rgba(255, 255, 255, 0.06);
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-selected-bg: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(59, 130, 246, 0.1) 100%
  );
  /* Table 暗黑模式 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-dark);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color);
  --yh-table-row-stripe-bg: var(--yh-fill-color-light);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-9);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.3);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.3);
  /* 遮罩层暗黑模式 */
  --yh-mask-color: rgba(0, 0, 0, 0.7);
  --yh-mask-color-light: rgba(0, 0, 0, 0.5);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  /* 滚动条暗黑模式 */
  --yh-scrollbar-thumb-color: var(--yh-fill-color-darker);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-placeholder);
}

/* ==================== 减少动画偏好支持 ==================== */
@media (prefers-reduced-motion: reduce) {
  :root,
  html.dark {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
    --yh-transition-base: none;
    --yh-transition-fast: none;
    --yh-transition-slow: none;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* ==================== 高对比度模式支持 ==================== */
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-border-color-light: #333333;
    --yh-text-color-primary: #000000;
    --yh-text-color-regular: #1a1a1a;
    --yh-focus-ring-width: 3px;
    --yh-focus-ring-color: #000000;
  }
  html.dark {
    --yh-border-color: #ffffff;
    --yh-border-color-light: #cccccc;
    --yh-text-color-primary: #ffffff;
    --yh-text-color-regular: #e5e5e5;
    --yh-focus-ring-color: #ffffff;
  }
}
/* ==================== 强制颜色模式支持 (Windows 高对比度) ==================== */
@media (forced-colors: active) {
  :root {
    --yh-color-primary: LinkText;
    --yh-border-color: ButtonBorder;
    --yh-bg-color: Canvas;
    --yh-text-color-primary: CanvasText;
    --yh-focus-ring-color: Highlight;
  }
}
.yh-table {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--yh-table-row-bg);
  font-size: var(--yh-table-font-size);
  color: var(--yh-table-text-color);
}
.yh-table__inner-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.yh-table table {
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}
.yh-table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  margin-bottom: 8px;
  min-height: 40px;
  box-sizing: border-box;
}

.yh-table__toolbar-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.yh-table__toolbar-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 16px;
}

.yh-table__header-wrapper {
  overflow: hidden;
  background-color: var(--yh-table-header-bg);
}

.yh-table__body-wrapper {
  flex: 1;
  overflow: auto;
  position: relative;
}
.yh-table__body-wrapper--virtual {
  position: relative;
}

.yh-table__virtual-phantom {
  width: 100%;
  pointer-events: none;
}

.yh-table__body--virtual {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
  contain: layout style;
}

.yh-table__header-cell {
  box-sizing: border-box;
  padding: var(--yh-table-cell-padding);
  background-color: var(--yh-table-header-bg);
  color: var(--yh-table-header-text-color);
  font-weight: var(--yh-table-header-font-weight);
  text-align: left;
  vertical-align: middle;
  border-bottom: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
  background-clip: padding-box;
}
.yh-table__header-cell.is-group {
  text-align: center;
}
.yh-table__header-cell.is-fixed-left {
  position: sticky;
  z-index: 10;
  background-color: var(--yh-table-header-bg);
}
.yh-table__header-cell.is-fixed-right {
  position: sticky;
  z-index: 10;
  background-color: var(--yh-table-header-bg);
}

.yh-table__cell {
  box-sizing: border-box;
  padding: var(--yh-table-cell-padding);
  background-color: var(--yh-table-row-bg);
  vertical-align: middle;
  border-bottom: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
  transition: background-color var(--yh-duration-base) var(--yh-timing-ease);
  background-clip: padding-box;
}
.yh-table__cell.is-fixed-left {
  position: sticky;
  z-index: 2;
  background-color: var(--yh-table-row-bg);
}
.yh-table__cell.is-fixed-right {
  position: sticky;
  z-index: 2;
  background-color: var(--yh-table-row-bg);
}

.yh-table__cell-content {
  padding: 0 var(--yh-table-cell-spacing);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  word-break: break-all;
  line-height: var(--yh-line-height-normal);
}
.yh-table__cell-content.is-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-table__selection-cell {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
}
.yh-table__selection-cell input[type=checkbox],
.yh-table__selection-cell input[type=radio] {
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
}

.yh-table__expand-cell {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
}

.yh-table__index-cell {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
}

.yh-table.is-border .yh-table__header-cell,
.yh-table.is-border .yh-table__cell {
  border-right: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
}
.yh-table.is-border .yh-table__inner-wrapper::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
  pointer-events: none;
  z-index: 20;
}
.yh-table.is-border .yh-table__header-wrapper {
  border-bottom: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
}
.yh-table.is-stripe .yh-table__row:nth-child(even) {
  background-color: var(--yh-table-row-stripe-bg);
}
.yh-table.is-stripe .yh-table__row:nth-child(even) .yh-table__cell {
  background-color: var(--yh-table-row-stripe-bg);
}
.yh-table__row:hover {
  background-color: var(--yh-table-row-hover-bg);
}
.yh-table__row:hover .yh-table__cell {
  background-color: var(--yh-table-row-hover-bg);
}
.yh-table__row.is-current {
  background-color: var(--yh-table-row-current-bg) !important;
}
.yh-table__row.is-current .yh-table__cell {
  background-color: var(--yh-table-row-current-bg) !important;
}

.yh-table--large {
  --yh-table-cell-padding: 14px 0;
  --yh-table-cell-spacing: 14px;
  --yh-table-font-size: var(--yh-font-size-md);
}

.yh-table--small {
  --yh-table-cell-padding: 8px 0;
  --yh-table-cell-spacing: 8px;
  --yh-table-font-size: var(--yh-font-size-sm);
}

.yh-table__sort-icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 14px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  margin-left: 4px;
  flex-shrink: 0;
  position: relative;
  overflow: initial;
}
.yh-table__sort-icon .sort-caret {
  width: 0;
  height: 0;
  border: solid 5px transparent;
  position: absolute;
  left: 7px;
}
.yh-table__sort-icon .sort-caret.ascending {
  border-bottom-color: var(--yh-text-color-placeholder, #c0c4cc);
  top: -5px;
}
.yh-table__sort-icon .sort-caret.ascending.is-active {
  border-bottom-color: var(--yh-color-primary, #409eff);
}
.yh-table__sort-icon .sort-caret.descending {
  border-top-color: var(--yh-text-color-placeholder, #c0c4cc);
  bottom: -3px;
}
.yh-table__sort-icon .sort-caret.descending.is-active {
  border-top-color: var(--yh-color-primary, #409eff);
}

.yh-table__header-cell.is-sortable {
  cursor: pointer;
  user-select: none;
}
.yh-table__header-cell.is-sortable:hover {
  background-color: var(--yh-table-row-hover-bg, rgba(0, 0, 0, 0.02));
}

.yh-table__tree-indent {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  flex-shrink: 0;
}

.yh-table__tree-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: rotate(0deg);
  color: var(--yh-text-color-secondary, #909399);
  margin-right: 4px;
  flex-shrink: 0;
}
.yh-table__tree-icon.is-expanded {
  transform: rotate(90deg);
}
.yh-table__tree-icon svg {
  width: 16px;
  height: 16px;
}

.yh-table__tree-leaf-spacer {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  flex-shrink: 0;
}

.yh-table__expand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: rotate(0deg);
  color: var(--yh-text-color-secondary, #909399);
}
.yh-table__expand-icon.is-expanded {
  transform: rotate(90deg);
}
.yh-table__expand-icon svg {
  width: 16px;
  height: 16px;
}

.yh-table__expanded-row td {
  padding: 0;
  border-bottom: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
  background-color: var(--yh-table-row-bg);
}

.yh-table__footer-wrapper {
  overflow: hidden;
  border-top: var(--yh-border-width) var(--yh-border-style) var(--yh-table-border-color);
  flex-shrink: 0;
}

.yh-table__summary-row .yh-table__cell {
  font-weight: 600;
  background-color: var(--yh-table-header-bg, #fafafa);
}

.yh-table__resize-handle {
  position: absolute;
  right: -3px;
  top: 0;
  bottom: 0;
  width: 7px;
  cursor: col-resize;
  z-index: 11;
}
.yh-table__resize-handle::after {
  content: "";
  position: absolute;
  top: 25%;
  right: 3px;
  bottom: 25%;
  width: 1px;
  background-color: transparent;
  transition: background-color 0.15s ease;
}
.yh-table__resize-handle:hover::after {
  background-color: var(--yh-color-primary, #409eff);
}

.yh-table__header-cell {
  position: relative;
}

.yh-table__resize-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--yh-color-primary, #409eff);
  z-index: 30;
  pointer-events: none;
}

.yh-table.is-resizing {
  cursor: col-resize !important;
  user-select: none;
}
.yh-table__row.is-row-draggable {
  cursor: grab;
}
.yh-table__row.is-row-draggable:active {
  cursor: grabbing;
}
.yh-table__row.is-dragging {
  opacity: 0.4;
  background-color: var(--yh-color-primary-light-9, #ecf5ff) !important;
}
.yh-table__row.is-dragging .yh-table__cell {
  background-color: var(--yh-color-primary-light-9, #ecf5ff) !important;
}
.yh-table__row.is-drop-target-above {
  box-shadow: inset 0 2px 0 0 var(--yh-color-primary, #409eff);
}
.yh-table__row.is-drop-target-above .yh-table__cell {
  box-shadow: inset 0 2px 0 0 var(--yh-color-primary, #409eff);
}
.yh-table__row.is-drop-target-below {
  box-shadow: inset 0 -2px 0 0 var(--yh-color-primary, #409eff);
}
.yh-table__row.is-drop-target-below .yh-table__cell {
  box-shadow: inset 0 -2px 0 0 var(--yh-color-primary, #409eff);
}

.yh-table__drag-handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: var(--yh-text-color-placeholder, #c0c4cc);
  margin-right: 8px;
  flex-shrink: 0;
}
.yh-table__drag-handle:hover {
  color: var(--yh-color-primary, #409eff);
}
.yh-table__drag-handle:active {
  cursor: grabbing;
}
.yh-table__drag-handle svg {
  width: 14px;
  height: 14px;
}

.yh-table__header-cell.is-column-draggable {
  cursor: grab;
}
.yh-table__header-cell.is-column-draggable:active {
  cursor: grabbing;
}
.yh-table__header-cell.is-column-dragging {
  opacity: 0.4;
  background-color: var(--yh-color-primary-light-9, #ecf5ff) !important;
}
.yh-table__header-cell.is-column-drop-left {
  position: relative;
}
.yh-table__header-cell.is-column-drop-left::before {
  content: "";
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--yh-color-primary, #409eff);
  z-index: 10;
}
.yh-table__header-cell.is-column-drop-right {
  position: relative;
}
.yh-table__header-cell.is-column-drop-right::after {
  content: "";
  position: absolute;
  right: -1px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--yh-color-primary, #409eff);
  z-index: 10;
}

.yh-table__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: 24px 0;
}

.yh-table__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.yh-table__empty-image img {
  max-width: 160px;
  max-height: 100px;
  object-fit: contain;
}

.yh-table__empty-text {
  font-size: 14px;
  color: var(--yh-text-color-secondary, #909399);
}

.yh-table__header-icon-prefix {
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  flex-shrink: 0;
  font-size: inherit;
  line-height: 1;
}
.yh-table__header-icon-prefix svg {
  width: 1em;
  height: 1em;
}

.yh-table__header-icon-suffix {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  flex-shrink: 0;
  font-size: inherit;
  line-height: 1;
}
.yh-table__header-icon-suffix svg {
  width: 1em;
  height: 1em;
}

.yh-table .is-center {
  text-align: center;
}
.yh-table .is-center .yh-table__cell-content {
  justify-content: center;
}
.yh-table .is-right {
  text-align: right;
}
.yh-table .is-right .yh-table__cell-content {
  justify-content: flex-end;
}
.yh-table__cell-text.is-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  display: block;
}

.yh-table.is-auto-wrap .yh-table__cell-content {
  white-space: normal;
  word-break: break-all;
  line-height: 1.5;
}
.yh-table.is-overflow-hidden .yh-table__cell-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yh-table .is-column-highlight {
  background-color: var(--yh-color-primary-light-9, #ecf5ff) !important;
}
.yh-table__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--yh-mask-color-light, rgba(255, 255, 255, 0.8));
  z-index: 20;
  transition: opacity 0.3s ease;
}

.yh-table__loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.yh-table__loading-spinner {
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 3px solid var(--yh-color-primary-light-5, #a0cfff);
  border-top-color: var(--yh-color-primary, #409eff);
  border-radius: 50%;
  animation: yh-table-spin 0.8s linear infinite;
}

.yh-table__loading-text {
  font-size: 14px;
  color: var(--yh-color-primary, #409eff);
}

@keyframes yh-table-spin {
  to {
    transform: rotate(360deg);
  }
}
.yh-table.is-scrolling-middle .is-last-fixed-left::after {
  box-shadow: var(--yh-table-fixed-left-shadow);
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(100%);
  pointer-events: none;
  z-index: 1;
}
.yh-table.is-scrolling-middle .is-first-fixed-right::before {
  box-shadow: var(--yh-table-fixed-right-shadow);
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(-100%);
  pointer-events: none;
  z-index: 1;
}
.yh-table__pagination-wrapper {
  padding: 16px 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  background-color: transparent;
}
.yh-table__pagination-wrapper.is-align-left {
  justify-content: flex-start;
}
.yh-table__pagination-wrapper.is-align-center {
  justify-content: center;
}
.yh-table__pagination-wrapper.is-align-right {
  justify-content: flex-end;
}
</style>
