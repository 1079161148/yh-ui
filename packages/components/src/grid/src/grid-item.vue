<script setup lang="ts">
/**
 * YhGridItem - 网格布局项
 */
import { computed, inject, type ComputedRef, type CSSProperties } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { useComponentTheme } from '@yh-ui/theme'
import type { GridItemProps } from './grid'

defineOptions({ name: 'YhGridItem' })

const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  offset: 0,
  suffix: false
})

const ns = useNamespace('grid-item')
const { themeStyle } = useComponentTheme('grid-item', computed(() => props.themeOverrides))

const gridContext = inject<ComputedRef<{
  cols: number
  collapsed: boolean
  collapsedRows: number
}>>('yh-grid', computed(() => ({
  cols: 12,
  collapsed: false,
  collapsedRows: 1
})))

const itemStyle = computed((): CSSProperties => {
  const style: CSSProperties = {
    ...themeStyle.value as Record<string, string>
  }

  // 跨列
  if (props.span > 1) {
    style.gridColumn = `span ${props.span}`
  }

  // 偏移
  if (props.offset > 0) {
    style.gridColumnStart = props.offset + 1
    style.gridColumn = `${props.offset + 1} / span ${props.span}`
  }

  // 后缀元素，定位到行末
  if (props.suffix) {
    const cols = gridContext.value.cols
    style.gridColumnStart = cols - props.span + 1
    style.gridColumn = `${cols - props.span + 1} / span ${props.span}`
  }

  return style
})

const itemClasses = computed(() => [
  ns.b(),
  props.suffix && ns.is('suffix')
])
</script>

<template>
  <div :class="itemClasses" :style="itemStyle">
    <slot />
  </div>
</template>
