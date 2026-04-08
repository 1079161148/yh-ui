"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.useVirtualScroll = useVirtualScroll;
var _vue = require("vue");
function useVirtualScroll(options) {
  const containerRef = (0, _vue.ref)(null);
  const scrollTop = (0, _vue.ref)(0);
  const itemsRef = (0, _vue.computed)(() => {
    return Array.isArray(options.items) ? options.items : options.items.value;
  });
  const itemHeightRef = (0, _vue.computed)(() => (0, _vue.unref)(options.itemHeight));
  const containerHeightRef = (0, _vue.computed)(() => (0, _vue.unref)(options.containerHeight));
  const overscanRef = (0, _vue.computed)(() => (0, _vue.unref)(options.overscan) ?? 3);
  const totalHeight = (0, _vue.computed)(() => itemsRef.value.length * itemHeightRef.value);
  const startIndex = (0, _vue.computed)(() => {
    if (itemsRef.value.length === 0) return 0;
    const start = Math.floor(scrollTop.value / itemHeightRef.value);
    return Math.max(0, start - overscanRef.value);
  });
  const endIndex = (0, _vue.computed)(() => {
    if (itemsRef.value.length === 0) return 0;
    const end = Math.ceil((scrollTop.value + containerHeightRef.value) / itemHeightRef.value);
    return Math.min(itemsRef.value.length, end + overscanRef.value);
  });
  const visibleItems = (0, _vue.computed)(() => {
    return itemsRef.value.slice(startIndex.value, endIndex.value);
  });
  const offsetY = (0, _vue.computed)(() => startIndex.value * itemHeightRef.value);
  const onScroll = event => {
    const target = event.target;
    if (target) scrollTop.value = target.scrollTop;
  };
  const scrollToIndex = index => {
    if (containerRef.value) {
      const targetScrollTop = index * itemHeightRef.value;
      containerRef.value.scrollTop = targetScrollTop;
      scrollTop.value = targetScrollTop;
    }
  };
  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    onScroll,
    scrollToIndex,
    containerRef
  };
}
module.exports = useVirtualScroll;