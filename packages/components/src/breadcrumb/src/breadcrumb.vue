<script setup lang="ts">
import { provide, toRefs, useSlots, computed, h, Fragment } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { breadcrumbProps } from './breadcrumb'

defineOptions({
  name: 'YhBreadcrumb'
})

const props = defineProps(breadcrumbProps)
const ns = useNamespace('breadcrumb')
const slots = useSlots()

// 向子组件提供配置
provide('breadcrumbProps', toRefs(props))

/**
 * 核心逻辑：智能溢出处理
 * 如果设置了 maxItems，我们将处理子节点
 */
const breadcrumbItems = computed(() => {
  const children = slots.default?.() || []

  // 展平 Fragment
  const items = children.flatMap(child => {
    if (child.type === Fragment) return (child.children as any[]) || []
    return [child]
  })

  if (props.maxItems <= 0 || items.length <= props.maxItems) {
    return items
  }

  // 计算需要隐藏的部分 (保留头和尾，中间折叠)
  const first = items[0]
  const last = items[items.length - 1]
  const collapsedCount = items.length - props.maxItems + 1

  // 创建一个特殊的 Ellipsis 项
  const ellipsisItem = h('span', { class: ns.e('ellipsis'), title: 'More' }, '...')

  // 这里简化处理：保留第一个和最后几个
  const result = [first, ellipsisItem, ...items.slice(items.length - (props.maxItems - 1))]

  return result
})

</script>

<template>
  <div :class="ns.b()" role="navigation" aria-label="Breadcrumb">
    <component :is="item" v-for="(item, index) in breadcrumbItems" :key="index" />
  </div>
</template>

<style lang="scss">
@use './breadcrumb.scss';
</style>
