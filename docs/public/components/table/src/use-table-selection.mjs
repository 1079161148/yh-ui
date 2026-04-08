import { ref, computed, watch } from "vue";
import { getRowKey } from "./utils.mjs";
export const useTableSelection = (options) => {
  const { data, rowKey, config } = options;
  const selectedRowKeys = ref([]);
  const selectionType = computed(() => {
    return config.value?.type || "checkbox";
  });
  const reserveSelection = computed(() => {
    return config.value?.reserve ?? true;
  });
  const isRowSelectable = (row, rowIndex) => {
    if (!config.value?.checkable) return true;
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
    const key = getRowKey(row, rowKey);
    const index = data.value.findIndex((item) => getRowKey(item, rowKey) === key);
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
        selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key);
      }
    }
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value);
  };
  const toggleAllSelection = () => {
    const selectAllMode = config.value?.selectAllMode || "currentPage";
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
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value);
  };
  const clearSelection = () => {
    selectedRowKeys.value = [];
    config.value?.onChange?.([], []);
  };
  const setSelection = (rows) => {
    selectedRowKeys.value = rows.map((row) => getRowKey(row, rowKey));
    config.value?.onChange?.(selectedRowKeys.value, rows);
  };
  const setSelectionByKeys = (keys) => {
    selectedRowKeys.value = keys;
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value);
  };
  watch(
    () => config.value?.selectedRowKeys,
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
