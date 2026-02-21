<script setup lang="ts">
/**
 * YhSpace - 间距组件
 * @description 设置组件之间的间距，类比 Ant Design Space
 */
import { computed, useSlots, type CSSProperties } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import type { SpaceProps } from './space'

defineOptions({ name: 'YhSpace' })

const props = withDefaults(defineProps<SpaceProps>(), {
  direction: 'horizontal',
  size: 'small',
  align: 'center',
  justify: 'start',
  wrap: false,
  fill: false
})

const slots = useSlots()
const ns = useNamespace('space')

const sizeMap: Record<string, number> = {
  mini: 4,
  small: 8,
  medium: 16,
  large: 24
}

function resolveSize(s: string | number): string {
  if (typeof s === 'number') return `${s}px`
  return `${sizeMap[s] ?? 8}px`
}

const gapStyle = computed(() => {
  const size = props.size
  if (Array.isArray(size)) {
    return { columnGap: resolveSize(size[0]), rowGap: resolveSize(size[1]) }
  }
  const val = resolveSize(size)
  return props.direction === 'vertical' ? { rowGap: val } : { gap: val }
})

const spaceStyle = computed((): CSSProperties => ({
  display: 'inline-flex',
  flexDirection: props.direction === 'vertical' ? 'column' : ('row' as CSSProperties['flexDirection']),
  flexWrap: (props.wrap ? 'wrap' : 'nowrap') as CSSProperties['flexWrap'],
  alignItems: props.align as CSSProperties['alignItems'],
  justifyContent: props.justify as CSSProperties['justifyContent'],
  width: props.fill ? '100%' : undefined,
  ...gapStyle.value,
  ...(typeof props.style === 'object' ? props.style : {})
}))

const children = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  return defaultSlot
})

const hasSpacer = computed(() => props.spacer !== undefined && props.spacer !== null)
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.is('wrap', wrap), ns.is('fill', fill)]" :style="spaceStyle">
    <template v-for="(child, idx) in children" :key="idx">
      <div :class="ns.e('item')">
        <component :is="child" />
      </div>
      <!-- 间隔符 -->
      <span v-if="hasSpacer && idx < children.length - 1" :class="ns.e('spacer')" aria-hidden="true">{{ spacer }}</span>
    </template>
    <!-- 默认插槽（当无 children 计算时的降级) -->
    <slot v-if="!children.length" />
  </div>
</template>

<style lang="scss">
@use './space.scss';
</style>
