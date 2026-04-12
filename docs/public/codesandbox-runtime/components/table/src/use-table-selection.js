import { ref, computed, watch } from "vue";
import { getRowKey } from "./utils.js";
const useTableSelection = (options) => {
  const { data, rowKey, config } = options;
  const selectedRowKeys = ref([]);
  const selectionType = computed(() => {
    var _a;
    return ((_a = config.value) == null ? void 0 : _a.type) || "checkbox";
  });
  const reserveSelection = computed(() => {
    var _a, _b;
    return (_b = (_a = config.value) == null ? void 0 : _a.reserve) != null ? _b : true;
  });
  const isRowSelectable = (row, rowIndex) => {
    var _a;
    if (!((_a = config.value) == null ? void 0 : _a.checkable)) return true;
    return config.value.checkable(row, rowIndex);
  };
  const selectableCount = computed(() => {
    return data.value.filter((row, index) => isRowSelectable(row, index)).length;
  });
  const isRowSelected = (row) => {
    const key = getRowKey(row, rowKey);
    return selectedRowKeys.value.includes(key);
  };
  const selectedRows = computed(() => {
    const keySet = new Set(selectedRowKeys.value);
    return data.value.filter((row) => {
      const key = getRowKey(row, rowKey);
      return keySet.has(key);
    });
  });
  const selectedCountInCurrentPage = computed(() => {
    return data.value.filter((row, index) => {
      if (!isRowSelectable(row, index)) return false;
      return isRowSelected(row);
    }).length;
  });
  const isAllSelected = computed(() => {
    if (selectableCount.value === 0) return false;
    return selectedCountInCurrentPage.value === selectableCount.value;
  });
  const isIndeterminate = computed(() => {
    if (selectableCount.value === 0) return false;
    return selectedCountInCurrentPage.value > 0 && selectedCountInCurrentPage.value < selectableCount.value;
  });
  const toggleRowSelection = (row, selected) => {
    var _a, _b;
    const key = getRowKey(row, rowKey);
    const index = data.value.findIndex((item) => getRowKey(item, rowKey) === key);
    if (!isRowSelectable(row, index)) return;
    const isCurrentlySelected = selectedRowKeys.value.includes(key);
    const shouldSelect = selected != null ? selected : !isCurrentlySelected;
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
        selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key);
      }
    }
    (_b = (_a = config.value) == null ? void 0 : _a.onChange) == null ? void 0 : _b.call(_a, selectedRowKeys.value, selectedRows.value);
  };
  const toggleAllSelection = () => {
    var _a, _b, _c;
    const selectAllMode = ((_a = config.value) == null ? void 0 : _a.selectAllMode) || "currentPage";
    if (isAllSelected.value) {
      if (selectAllMode === "currentPage") {
        const currentPageKeys = new Set(
          data.value.filter((row, index) => isRowSelectable(row, index)).map((row) => getRowKey(row, rowKey))
        );
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => !currentPageKeys.has(key));
      } else {
        selectedRowKeys.value = [];
      }
    } else {
      if (selectAllMode === "currentPage") {
        const currentPageKeys = data.value.filter((row, index) => isRowSelectable(row, index)).map((row) => getRowKey(row, rowKey));
        if (reserveSelection.value) {
          const otherPageKeys = selectedRowKeys.value.filter((key) => {
            return !data.value.some((row) => getRowKey(row, rowKey) === key);
          });
          selectedRowKeys.value = [.../* @__PURE__ */ new Set([...otherPageKeys, ...currentPageKeys])];
        } else {
          selectedRowKeys.value = currentPageKeys;
        }
      } else {
        const allKeys = data.value.filter((row, index) => isRowSelectable(row, index)).map((row) => getRowKey(row, rowKey));
        selectedRowKeys.value = allKeys;
      }
    }
    (_c = (_b = config.value) == null ? void 0 : _b.onChange) == null ? void 0 : _c.call(_b, selectedRowKeys.value, selectedRows.value);
  };
  const clearSelection = () => {
    var _a, _b;
    selectedRowKeys.value = [];
    (_b = (_a = config.value) == null ? void 0 : _a.onChange) == null ? void 0 : _b.call(_a, [], []);
  };
  const setSelection = (rows) => {
    var _a, _b;
    selectedRowKeys.value = rows.map((row) => getRowKey(row, rowKey));
    (_b = (_a = config.value) == null ? void 0 : _a.onChange) == null ? void 0 : _b.call(_a, selectedRowKeys.value, rows);
  };
  const setSelectionByKeys = (keys) => {
    var _a, _b;
    selectedRowKeys.value = keys;
    (_b = (_a = config.value) == null ? void 0 : _a.onChange) == null ? void 0 : _b.call(_a, selectedRowKeys.value, selectedRows.value);
  };
  watch(
    () => {
      var _a;
      return (_a = config.value) == null ? void 0 : _a.selectedRowKeys;
    },
    (newKeys) => {
      if (newKeys && Array.isArray(newKeys)) {
        selectedRowKeys.value = [...newKeys];
      }
    },
    { immediate: true }
  );
  watch(
    () => data.value,
    (newData) => {
      if (!reserveSelection.value) {
        const validKeys = new Set(newData.map((row) => getRowKey(row, rowKey)));
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => validKeys.has(key));
      }
    }
  );
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
export {
  useTableSelection
};
