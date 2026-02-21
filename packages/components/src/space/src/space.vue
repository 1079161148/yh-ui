<script setup lang="ts">
/**
 * YhSpace - 间距组件
 * @description 设置组件之间的间距，类比 Ant Design Space
 */
import { computed, useSlots, type VNode, Fragment, Comment, Text, type CSSProperties } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { useComponentTheme } from '@yh-ui/theme'
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

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('space', computed(() => props.themeOverrides))

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
  ...themeStyle.value as Record<string, string>,
  display: 'inline-flex',
  flexDirection: props.direction === 'vertical' ? 'column' : ('row' as CSSProperties['flexDirection']),
  flexWrap: (props.wrap ? 'wrap' : 'nowrap') as CSSProperties['flexWrap'],
  alignItems: props.align as CSSProperties['alignItems'],
  justifyContent: props.justify as CSSProperties['justifyContent'],
  width: props.fill ? '100%' : undefined,
  ...gapStyle.value,
  ...(typeof props.style === 'object' ? props.style : {})
}))

/**
 * 展平 VNode 数组，递归处理 Fragment 和数组
 * 过滤掉 Comment 和空文本节点
 */
function flattenVNodes(vnodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Comment) continue
    if (vnode.type === Text && typeof vnode.children === 'string' && !vnode.children.trim()) continue
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...flattenVNodes(vnode.children as VNode[]))
    } else if (Array.isArray(vnode)) {
      result.push(...flattenVNodes(vnode as VNode[]))
    } else {
      result.push(vnode)
    }
  }
  return result
}

const children = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  return flattenVNodes(defaultSlot)
})

const showSpacer = computed(() => {
  // 支持 props.spacer 和 #spacer 插槽两种方式
  return (props.spacer !== undefined && props.spacer !== null) || !!slots.spacer
})
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.is('wrap', wrap), ns.is('fill', fill)]" :style="spaceStyle">
    <template v-for="(child, idx) in children" :key="idx">
      <div :class="ns.e('item')">
        <component :is="child" />
      </div>
      <!-- 间隔符：支持 #spacer 插槽和 spacer prop -->
      <span v-if="showSpacer && idx < children.length - 1" :class="ns.e('spacer')" aria-hidden="true">
        <slot name="spacer">{{ spacer }}</slot>
      </span>
    </template>
    <!-- 默认插槽降级（当无 children 计算时） -->
    <slot v-if="!children.length" />
  </div>
</template>

<style lang="scss">
@use './space.scss';
</style>
