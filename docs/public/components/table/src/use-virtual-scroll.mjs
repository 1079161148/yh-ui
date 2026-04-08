import { ref, computed, watch, onMounted, onUnmounted, shallowRef } from "vue";
export const useVirtualScroll = (options) => {
  const { data, containerRef, config, rowKey } = options;
  const defaultConfig = {
    enabled: false,
    rowHeight: 48,
    buffer: 5,
    overscan: 3,
    columnVirtual: false,
    columnBuffer: 3
  };
  const mergedConfig = computed(() => ({
    ...defaultConfig,
    ...config.value
  }));
  const isVirtual = computed(() => {
    if (!mergedConfig.value.enabled) return false;
    return data.value.length > 100;
  });
  const scrollTop = ref(0);
  const containerHeight = ref(0);
  const rowHeightCache = shallowRef(/* @__PURE__ */ new Map());
  const MAX_SCROLL_HEIGHT = 15e6;
  const isFixedRowHeight = computed(() => typeof mergedConfig.value.rowHeight !== "function");
  const fixedHeight = computed(() => isFixedRowHeight.value ? mergedConfig.value.rowHeight : 0);
  const getRowHeight = (row, index) => {
    if (isFixedRowHeight.value) return fixedHeight.value;
    const key = rowKey(row);
    const cached = rowHeightCache.value.get(key);
    if (cached !== void 0) return cached;
    const { rowHeight } = mergedConfig.value;
    if (typeof rowHeight === "function") {
      const height = rowHeight(row, index);
      rowHeightCache.value.set(key, height);
      return height;
    }
    return rowHeight;
  };
  const rowPositions = computed(() => {
    if (!isVirtual.value || isFixedRowHeight.value) return [];
    const positions = [];
    let top = 0;
    data.value.forEach((row, index) => {
      const height = getRowHeight(row, index);
      positions.push({ index, top, height, bottom: top + height });
      top += height;
    });
    return positions;
  });
  const realTotalHeight = computed(() => {
    if (!isVirtual.value) return 0;
    if (isFixedRowHeight.value) return data.value.length * fixedHeight.value;
    if (rowPositions.value.length === 0) return 0;
    return rowPositions.value[rowPositions.value.length - 1]?.bottom || 0;
  });
  const needScale = computed(() => realTotalHeight.value > MAX_SCROLL_HEIGHT);
  const heightScale = computed(
    () => needScale.value ? realTotalHeight.value / MAX_SCROLL_HEIGHT : 1
  );
  const totalHeight = computed(() => {
    if (!isVirtual.value) return 0;
    return needScale.value ? MAX_SCROLL_HEIGHT : realTotalHeight.value;
  });
  const findStartIndexDynamic = (scrollPos) => {
    const positions = rowPositions.value;
    if (positions.length === 0) return 0;
    let low = 0;
    let high = positions.length - 1;
    while (low <= high) {
      const mid = low + high >>> 1;
      const { top, bottom } = positions[mid];
      if (scrollPos >= top && scrollPos < bottom) {
        return mid;
      } else if (scrollPos < top) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return Math.max(0, low - 1);
  };
  const findEndIndexDynamic = (startIndex, viewportHeight) => {
    const positions = rowPositions.value;
    if (positions.length === 0) return 0;
    const startPosition = positions[startIndex];
    if (!startPosition) return startIndex;
    const endScrollTop = startPosition.top + viewportHeight;
    let endIndex = startIndex;
    while (endIndex < positions.length && positions[endIndex].top < endScrollTop) {
      endIndex++;
    }
    return Math.min(endIndex, positions.length - 1);
  };
  const findStartIndex = (scrollPos) => {
    if (isFixedRowHeight.value) {
      return Math.floor(scrollPos / fixedHeight.value);
    }
    return findStartIndexDynamic(scrollPos);
  };
  const findEndIndex = (startIndex, viewportHeight) => {
    if (isFixedRowHeight.value) {
      return Math.min(
        startIndex + Math.ceil(viewportHeight / fixedHeight.value),
        data.value.length - 1
      );
    }
    return findEndIndexDynamic(startIndex, viewportHeight);
  };
  const realScrollTop = computed(() => scrollTop.value * heightScale.value);
  const visibleRange = computed(() => {
    if (!isVirtual.value) {
      return { start: 0, end: data.value.length - 1 };
    }
    const { buffer, overscan } = mergedConfig.value;
    const extra = buffer + overscan;
    const startIndex = findStartIndex(realScrollTop.value);
    const endIndex = findEndIndex(startIndex, containerHeight.value);
    return {
      start: Math.max(0, startIndex - extra),
      end: Math.min(data.value.length - 1, endIndex + extra)
    };
  });
  const visibleData = computed(() => {
    if (!isVirtual.value) return data.value;
    const { start, end } = visibleRange.value;
    return data.value.slice(start, end + 1);
  });
  const offsetTop = computed(() => {
    if (!isVirtual.value || visibleRange.value.start === 0) return 0;
    if (isFixedRowHeight.value) {
      return visibleRange.value.start * fixedHeight.value;
    }
    const positions = rowPositions.value;
    return positions[visibleRange.value.start]?.top || 0;
  });
  const scaledOffsetTop = computed(() => {
    if (!needScale.value) return offsetTop.value;
    return offsetTop.value / heightScale.value;
  });
  let rafId = null;
  const handleScroll = (_event) => {
    const target = containerRef.value;
    if (!target) return;
    const currentScrollTop = target.scrollTop;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      rafId = null;
      scrollTop.value = currentScrollTop;
    });
  };
  const scrollToIndex = (index, behavior = "auto") => {
    const container = containerRef.value;
    if (!container) return;
    let realTop;
    if (isFixedRowHeight.value) {
      realTop = index * fixedHeight.value;
    } else if (!isVirtual.value) {
      realTop = index * mergedConfig.value.rowHeight;
    } else {
      const positions = rowPositions.value;
      const position = positions[index];
      if (!position) return;
      realTop = position.top;
    }
    const scrollTarget = needScale.value ? realTop / heightScale.value : realTop;
    container.scrollTo({ top: scrollTarget, behavior });
  };
  const scrollToRow = (row, behavior = "auto") => {
    const key = rowKey(row);
    const index = data.value.findIndex((item) => rowKey(item) === key);
    if (index !== -1) {
      scrollToIndex(index, behavior);
    }
  };
  const refresh = () => {
    rowHeightCache.value.clear();
    updateContainerHeight();
  };
  const updateContainerHeight = () => {
    const container = containerRef.value;
    if (container) {
      containerHeight.value = container.clientHeight;
    }
  };
  let resizeObserver = null;
  onMounted(() => {
    updateContainerHeight();
    if (typeof ResizeObserver !== "undefined" && containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateContainerHeight();
      });
      resizeObserver.observe(containerRef.value);
    }
  });
  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });
  watch(
    () => data.value.length,
    () => {
      rowHeightCache.value.clear();
    }
  );
  return {
    visibleData,
    visibleRange,
    offsetTop: scaledOffsetTop,
    totalHeight,
    handleScroll,
    scrollToIndex,
    scrollToRow,
    refresh,
    isVirtual
  };
};
