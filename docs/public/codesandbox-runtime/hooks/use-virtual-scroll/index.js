import { ref, computed, unref } from "vue";
function useVirtualScroll(options) {
  const containerRef = ref(null);
  const scrollTop = ref(0);
  const itemsRef = computed(() => {
    return Array.isArray(options.items) ? options.items : options.items.value;
  });
  const itemHeightRef = computed(() => unref(options.itemHeight));
  const containerHeightRef = computed(() => unref(options.containerHeight));
  const overscanRef = computed(() => {
    var _a;
    return (_a = unref(options.overscan)) != null ? _a : 3;
  });
  const totalHeight = computed(() => itemsRef.value.length * itemHeightRef.value);
  const startIndex = computed(() => {
    if (itemsRef.value.length === 0) return 0;
    const start = Math.floor(scrollTop.value / itemHeightRef.value);
    return Math.max(0, start - overscanRef.value);
  });
  const endIndex = computed(() => {
    if (itemsRef.value.length === 0) return 0;
    const end = Math.ceil((scrollTop.value + containerHeightRef.value) / itemHeightRef.value);
    return Math.min(itemsRef.value.length, end + overscanRef.value);
  });
  const visibleItems = computed(() => {
    return itemsRef.value.slice(startIndex.value, endIndex.value);
  });
  const offsetY = computed(() => startIndex.value * itemHeightRef.value);
  const onScroll = (event) => {
    const target = event.target;
    if (target) scrollTop.value = target.scrollTop;
  };
  const scrollToIndex = (index) => {
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
var stdin_default = useVirtualScroll;
export {
  stdin_default as default,
  useVirtualScroll
};
