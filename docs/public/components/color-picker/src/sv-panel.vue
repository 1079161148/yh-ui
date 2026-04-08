<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  h: { type: Number, required: true },
  s: { type: Number, required: true },
  v: { type: Number, required: true }
});
const emit = defineEmits(["update"]);
const panelRef = ref();
const cursorStyle = computed(() => ({
  left: `${props.s}%`,
  top: `${100 - props.v}%`
}));
const backgroundStyle = computed(() => ({
  backgroundColor: `hsl(${props.h}, 100%, 50%)`
}));
const handleDrag = (event) => {
  if (!panelRef.value) return;
  const rect = panelRef.value.getBoundingClientRect();
  const clientX = event.clientX ?? event.touches[0].clientX;
  const clientY = event.clientY ?? event.touches[0].clientY;
  let left = (clientX - rect.left) / rect.width * 100;
  let top = (clientY - rect.top) / rect.height * 100;
  left = Math.max(0, Math.min(100, left));
  top = Math.max(0, Math.min(100, top));
  emit("update", Math.round(left), Math.round(100 - top));
};
const handleMouseDown = (event) => {
  handleDrag(event);
  const onMouseMove = (e) => handleDrag(e);
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
</script>

<template>
  <div
    ref="panelRef"
    class="yh-color-sv-panel"
    :style="backgroundStyle"
    @mousedown="handleMouseDown"
  >
    <div class="yh-color-sv-panel__white"></div>
    <div class="yh-color-sv-panel__black"></div>
    <div class="yh-color-sv-panel__cursor" :style="cursorStyle"></div>
  </div>
</template>

<style>
.yh-color-sv-panel {
  position: relative;
  width: 100%;
  height: 180px;
  cursor: crosshair;
  background-color: red;
  border-radius: 4px;
  overflow: hidden;
}
.yh-color-sv-panel__white, .yh-color-sv-panel__black {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.yh-color-sv-panel__white {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.yh-color-sv-panel__black {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.yh-color-sv-panel__cursor {
  position: absolute;
  width: 6px;
  height: 6px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-3px, -3px);
}
</style>
