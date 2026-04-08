<template>
  <transition :name="ns.b('fade')">
    <div
      v-show="always || visible"
      ref="instance"
      :class="[ns.e('bar'), ns.is(bar.key)]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        :class="ns.e('thumb')"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      ></div>
    </div>
  </transition>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, ref } from "vue";
import { BAR_MAP, renderThumbStyle } from "./util";
import { SCROLLBAR_INJECTION_KEY } from "./scrollbar";
import { useNamespace } from "@yh-ui/hooks";
const props = defineProps({
  vertical: { type: Boolean, required: false, default: false },
  size: { type: String, required: true, default: "" },
  move: { type: Number, required: true, default: 0 },
  ratio: { type: Number, required: true },
  always: { type: Boolean, required: false, default: false }
});
const ns = useNamespace("scrollbar");
const scrollbar = inject(SCROLLBAR_INJECTION_KEY);
if (!scrollbar) {
  throw new Error("YhThumb must be used within a YhScrollbar component");
}
const instance = ref();
const thumb = ref();
const thumbState = ref({});
const visible = ref(false);
let cursorDown = false;
let cursorLeave = false;
const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
const thumbStyle = computed(
  () => renderThumbStyle({
    size: props.size,
    move: props.move,
    bar: bar.value
  })
);
const clickTrackHandler = (e) => {
  if (!thumb.value || !instance.value || !scrollbar.wrapElement?.value) return;
  const offset = Math.abs(
    e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
  );
  const thumbHalf = thumb.value[bar.value.offset] / 2;
  const thumbPositionPercentage = (offset - thumbHalf) * 100 * props.ratio / instance.value[bar.value.offset];
  scrollbar.wrapElement.value[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement.value[bar.value.scrollSize] / 100;
};
const clickThumbHandler = (e) => {
  e.stopPropagation();
  if (e.ctrlKey || [1, 2].includes(e.button)) return;
  window.getSelection()?.removeAllRanges();
  startDrag(e);
  const el = e.currentTarget;
  if (!el) return;
  thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
};
const startDrag = (e) => {
  e.stopImmediatePropagation();
  cursorDown = true;
  document.addEventListener("mousemove", mouseMoveDocumentHandler);
  document.addEventListener("mouseup", mouseUpDocumentHandler);
  document.onselectstart = () => false;
};
const mouseMoveDocumentHandler = (e) => {
  if (!instance.value || !thumb.value || !scrollbar.wrapElement?.value) return;
  if (cursorDown === false) return;
  const prevPage = thumbState.value[bar.value.axis];
  if (!prevPage) return;
  const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
  const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
  const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * props.ratio / instance.value[bar.value.offset];
  scrollbar.wrapElement.value[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement.value[bar.value.scrollSize] / 100;
};
const mouseUpDocumentHandler = () => {
  cursorDown = false;
  thumbState.value[bar.value.axis] = 0;
  document.removeEventListener("mousemove", mouseMoveDocumentHandler);
  document.removeEventListener("mouseup", mouseUpDocumentHandler);
  document.onselectstart = null;
  if (cursorLeave) visible.value = false;
};
const mouseMoveScrollbarHandler = () => {
  cursorLeave = false;
  visible.value = !!props.size;
};
let timeout = null;
defineExpose({
  handleScrollbarAppearance: () => {
    if (timeout) clearTimeout(timeout);
    mouseMoveScrollbarHandler();
    timeout = setTimeout(() => {
      if (!cursorDown) visible.value = false;
      timeout = null;
    }, 1e3);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener("mousemove", mouseMoveDocumentHandler);
  document.removeEventListener("mouseup", mouseUpDocumentHandler);
});
</script>
