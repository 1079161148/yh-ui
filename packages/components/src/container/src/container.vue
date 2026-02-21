<script setup lang="ts">
/**
 * YhContainer - 布局容器
 */
import { computed, useSlots, type VNode } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { ContainerProps } from './container'

defineOptions({ name: 'YhContainer' })

const props = defineProps<ContainerProps>()
const slots = useSlots()
const ns = useNamespace('container')
const { themeStyle } = useComponentTheme('container', computed(() => props.themeOverrides))

/** 自动检测方向：如果包含 YhHeader 或 YhFooter，则垂直排列 */
const isVertical = computed(() => {
  if (props.direction) return props.direction === 'vertical'
  const defaultSlot = slots.default?.() as VNode[] | undefined
  if (!defaultSlot) return false
  return defaultSlot.some((vnode) => {
    const tag = (vnode.type as { name?: string })?.name
    return tag === 'YhHeader' || tag === 'YhFooter'
  })
})
</script>

<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]" :style="themeStyle">
    <slot />
  </section>
</template>

<style lang="scss">
@use './container.scss';
</style>
