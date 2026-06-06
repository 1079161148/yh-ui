<script setup lang="ts">
/**
 * YhGrid - CSS Grid 网格布局
 */
import { computed, provide, type CSSProperties } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { GridProps } from './grid'

defineOptions({ name: 'YhGrid' })

const props = withDefaults(defineProps<GridProps>(), {
  cols: 12,
  colGap: 0,
  rowGap: 0,
  gap: 0,
  collapsed: false,
  collapsedRows: 1
})

const ns = useNamespace('grid')
const { themeStyle } = useComponentTheme('grid', computed(() => props.themeOverrides))

function resolveGap(val: number | string): string {
  return typeof val === 'number' ? `${val}px` : val
}

const computedCols = computed(() => {
  const cols = props.cols
  if (typeof cols === 'number') return `repeat(${cols}, 1fr)`
  return cols
})

const gridStyle = computed((): CSSProperties => {
  const style: CSSProperties = {
    ...themeStyle.value as Record<string, string>,
    display: 'grid',
    gridTemplateColumns: computedCols.value
  }

  // gap 优先级高于 colGap/rowGap
  if (Array.isArray(props.gap)) {
    style.columnGap = resolveGap(props.gap[0])
    style.rowGap = resolveGap(props.gap[1])
  } else if (props.gap) {
    style.gap = resolveGap(props.gap)
  } else {
    if (props.colGap) style.columnGap = resolveGap(props.colGap)
    if (props.rowGap) style.rowGap = resolveGap(props.rowGap)
  }

  if (props.justifyItems) style.justifyItems = props.justifyItems
  if (props.alignItems) style.alignItems = props.alignItems

  return style
})

// 向 GridItem 提供折叠状态和列数
provide('yh-grid', computed(() => ({
  cols: typeof props.cols === 'number' ? props.cols : 12,
  collapsed: props.collapsed,
  collapsedRows: props.collapsedRows
})))
</script>

<template>
  <div :class="ns.b()" :style="gridStyle">
    <slot />
  </div>
</template>

<style lang="scss">
@use './grid.scss';
</style>
