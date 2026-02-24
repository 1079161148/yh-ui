<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { rowProps, rowContextKey } from './row'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'YhRow'
})

const props = defineProps(rowProps)
const ns = useNamespace('row')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'row',
  computed(() => props.themeOverrides)
)

const gutter = computed(() => props.gutter)

provide(rowContextKey, {
  gutter
})

const style = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    ...(themeStyle.value as CSSProperties)
  }
  if (!props.gutter) {
    return styles
  }
  styles.marginLeft = `-${props.gutter / 2}px`
  styles.marginRight = `-${props.gutter / 2}px`
  return styles
})

const rowClasses = computed(() => [
  ns.b(),
  ns.is(`justify-${props.justify}`, props.justify !== 'start'),
  ns.is(`align-${props.align}`, props.align !== 'top')
])
</script>

<template>
  <component :is="tag" :class="rowClasses" :style="style">
    <slot />
  </component>
</template>

<style lang="scss">
@use './row.scss';
</style>
