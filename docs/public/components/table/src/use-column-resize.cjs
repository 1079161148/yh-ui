"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useColumnResize = void 0;
var _vue = require("vue");
const useColumnResize = options => {
  const {
    resizable,
    tableRef,
    emit
  } = options;
  const isResizing = (0, _vue.ref)(false);
  const resizingColumn = (0, _vue.ref)(null);
  const resizeLineLeft = (0, _vue.ref)(0);
  const resizeLineVisible = (0, _vue.ref)(false);
  let startX = 0;
  let startWidth = 0;
  let currentColumn = null;
  const isColumnResizable = column => {
    if (column.resizable !== void 0) return column.resizable;
    return resizable.value;
  };
  const handleResizeStart = (event, column, el) => {
    if (!isColumnResizable(column)) return;
    event.preventDefault();
    event.stopPropagation();
    isResizing.value = true;
    resizingColumn.value = column;
    currentColumn = column;
    startX = event.clientX;
    startWidth = el.offsetWidth;
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect();
      resizeLineLeft.value = event.clientX - tableRect.left;
      resizeLineVisible.value = true;
    }
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    event.target.setPointerCapture?.(event.pointerId);
    document.addEventListener("pointermove", handleResizeMove);
    document.addEventListener("pointerup", handleResizeEnd);
  };
  const handleResizeMove = event => {
    if (!isResizing.value || !currentColumn) return;
    const deltaX = event.clientX - startX;
    let newWidth = Math.max(startWidth + deltaX, 40);
    const minWidth = parseInt(String(currentColumn.minWidth || 40));
    if (newWidth < minWidth) newWidth = minWidth;
    if (currentColumn.maxWidth) {
      const maxWidth = parseInt(String(currentColumn.maxWidth));
      if (newWidth > maxWidth) newWidth = maxWidth;
    }
    currentColumn.width = newWidth;
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect();
      resizeLineLeft.value = event.clientX - tableRect.left;
    }
  };
  const handleResizeEnd = _event => {
    if (currentColumn) {
      const finalWidth = parseInt(String(currentColumn.width)) || startWidth;
      emit("column-resize", currentColumn, finalWidth);
    }
    isResizing.value = false;
    resizingColumn.value = null;
    resizeLineVisible.value = false;
    currentColumn = null;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    document.removeEventListener("pointermove", handleResizeMove);
    document.removeEventListener("pointerup", handleResizeEnd);
  };
  (0, _vue.onUnmounted)(() => {
    document.removeEventListener("pointermove", handleResizeMove);
    document.removeEventListener("pointerup", handleResizeEnd);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });
  return {
    isResizing,
    resizingColumn,
    resizeLineLeft,
    resizeLineVisible,
    isColumnResizable,
    handleResizeStart
  };
};
exports.useColumnResize = useColumnResize;