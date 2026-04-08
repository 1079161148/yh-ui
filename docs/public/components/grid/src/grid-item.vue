<script setup>
import { computed, inject } from "vue";
import { useNamespace } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
defineOptions({ name: "YhGridItem" });
const props = defineProps({
  span: { type: Number, required: false, default: 1 },
  offset: { type: Number, required: false, default: 0 },
  suffix: { type: Boolean, required: false, default: false },
  themeOverrides: { type: null, required: false }
});
const ns = useNamespace("grid-item");
const { themeStyle } = useComponentTheme("grid-item", computed(() => props.themeOverrides));
const gridContext = inject("yh-grid", computed(() => ({
  cols: 12,
  collapsed: false,
  collapsedRows: 1
})));
const itemStyle = computed(() => {
  const style = {
    ...themeStyle.value
  };
  if (props.span > 1) {
    style.gridColumn = `span ${props.span}`;
  }
  if (props.offset > 0) {
    style.gridColumnStart = props.offset + 1;
    style.gridColumn = `${props.offset + 1} / span ${props.span}`;
  }
  if (props.suffix) {
    const cols = gridContext.value.cols;
    style.gridColumnStart = cols - props.span + 1;
    style.gridColumn = `${cols - props.span + 1} / span ${props.span}`;
  }
  return style;
});
const itemClasses = computed(() => [
  ns.b(),
  props.suffix && ns.is("suffix")
]);
</script>

<template>
  <div :class="itemClasses" :style="itemStyle">
    <slot />
  </div>
</template>
