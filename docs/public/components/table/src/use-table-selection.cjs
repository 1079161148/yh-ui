"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTableSelection = void 0;
var _vue = require("vue");
var _utils = require("./utils.cjs");
const useTableSelection = options => {
  const {
    data,
    rowKey,
    config
  } = options;
  const selectedRowKeys = (0, _vue.ref)([]);
  const selectionType = (0, _vue.computed)(() => {
    return config.value?.type || "checkbox";
  });
  const reserveSelection = (0, _vue.computed)(() => {
    return config.value?.reserve ?? true;
  });
  const isRowSelectable = (row, rowIndex) => {
    if (!config.value?.checkable) return true;
    return config.value.checkable(row, rowIndex);
  };
  const selectableCount = (0, _vue.computed)(() => {
    return data.value.filter((row, index) => isRowSelectable(row, index)).length;
  });
  const isRowSelected = row => {
    const key = (0, _utils.getRowKey)(row, rowKey);
    return selectedRowKeys.value.includes(key);
  };
  const selectedRows = (0, _vue.computed)(() => {
    const keySet = new Set(selectedRowKeys.value);
    return data.value.filter(row => {
      const key = (0, _utils.getRowKey)(row, rowKey);
      return keySet.has(key);
    });
  });
  const selectedCountInCurrentPage = (0, _vue.computed)(() => {
    return data.value.filter((row, index) => {
      if (!isRowSelectable(row, index)) return false;
      return isRowSelected(row);
    }).length;
  });
  const isAllSelected = (0, _vue.computed)(() => {
    if (selectableCount.value === 0) return false;
    return selectedCountInCurrentPage.value === selectableCount.value;
  });
  const isIndeterminate = (0, _vue.computed)(() => {
    if (selectableCount.value === 0) return false;
    return selectedCountInCurrentPage.value > 0 && selectedCountInCurrentPage.value < selectableCount.value;
  });
  const toggleRowSelection = (row, selected) => {
    const key = (0, _utils.getRowKey)(row, rowKey);
    const index = data.value.findIndex(item => (0, _utils.getRowKey)(item, rowKey) === key);
    if (!isRowSelectable(row, index)) return;
    const isCurrentlySelected = selectedRowKeys.value.includes(key);
    const shouldSelect = selected ?? !isCurrentlySelected;
    if (selectionType.value === "radio") {
      if (shouldSelect) {
        selectedRowKeys.value = [key];
      } else {
        selectedRowKeys.value = [];
      }
    } else {
      if (shouldSelect && !isCurrentlySelected) {
        selectedRowKeys.value = [...selectedRowKeys.value, key];
      } else if (!shouldSelect && isCurrentlySelected) {
        selectedRowKeys.value = selectedRowKeys.value.filter(k => k !== key);
      }
    }
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value);
  };
  const toggleAllSelection = () => {
    const selectAllMode = config.value?.selectAllMode || "currentPage";
    if (isAllSelected.value) {
      if (selectAllMode === "currentPage") {
        const currentPageKeys = new Set(data.value.filter((row, index) => isRowSelectable(row, index)).map(row => (0, _utils.getRowKey)(row, rowKey)));
        selectedRowKeys.value = selectedRowKeys.value.filter(key => !currentPageKeys.has(key));
      } else {
        selectedRowKeys.value = [];
      }
    } else {
      if (selectAllMode === "currentPage") {
        const currentPageKeys = data.value.filter((row, index) => isRowSelectable(row, index)).map(row => (0, _utils.getRowKey)(row, rowKey));
        if (reserveSelection.value) {
          const otherPageKeys = selectedRowKeys.value.filter(key => {
            return !data.value.some(row => (0, _utils.getRowKey)(row, rowKey) === key);
          });
          selectedRowKeys.value = [... /* @__PURE__ */new Set([...otherPageKeys, ...currentPageKeys])];
        } else {
          selectedRowKeys.value = currentPageKeys;
        }
      } else {
        const allKeys = data.value.filter((row, index) => isRowSelectable(row, index)).map(row => (0, _utils.getRowKey)(row, rowKey));
        selectedRowKeys.value = allKeys;
      }
    }
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value);
  };
  const clearSelection = () => {
    selectedRowKeys.value = [];
    config.value?.onChange?.([], []);
  };
  const setSelection = rows => {
    selectedRowKeys.value = rows.map(row => (0, _utils.getRowKey)(row, rowKey));
    config.value?.onChange?.(selectedRowKeys.value, rows);
  };
  const setSelectionByKeys = keys => {
    selectedRowKeys.value = keys;
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value);
  };
  (0, _vue.watch)(() => config.value?.selectedRowKeys, newKeys => {
    if (newKeys && Array.isArray(newKeys)) {
      selectedRowKeys.value = [...newKeys];
    }
  }, {
    immediate: true
  });
  (0, _vue.watch)(() => data.value, newData => {
    if (!reserveSelection.value) {
      const validKeys = new Set(newData.map(row => (0, _utils.getRowKey)(row, rowKey)));
      selectedRowKeys.value = selectedRowKeys.value.filter(key => validKeys.has(key));
    }
  });
  return {
    selectedRowKeys,
    selectedRows,
    isAllSelected,
    isIndeterminate,
    selectionType,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    setSelection,
    setSelectionByKeys,
    isRowSelected,
    isRowSelectable,
    selectableCount
  };
};
exports.useTableSelection = useTableSelection;