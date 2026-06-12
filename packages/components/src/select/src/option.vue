<script setup lang="ts">
/**
 * YhOption - 下拉选项组件
 * @description Select 组件的子项，用于 slot 嵌套模式
 */
import { computed, inject, onMounted, onBeforeUnmount, useSlots } from 'vue'
import type { OptionProps } from './select'
import { SelectContextKey } from './select'

defineOptions({
  name: 'YhOption'
})

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false
})

const select = inject(SelectContextKey, null)
const slots = useSlots()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSlotText = (vnodes: any[]): string => {
  let text = ''
  for (const node of vnodes) {
    if (!node) continue
    if (typeof node.children === 'string') {
      text += node.children
    } else if (Array.isArray(node.children)) {
      text += getSlotText(node.children)
    } else if (
      node.type &&
      node.type.toString() === 'Symbol(v-fgt)' &&
      Array.isArray(node.children)
    ) {
      text += getSlotText(node.children)
    } else if (node.children && typeof node.children.default === 'function') {
      text += getSlotText(node.children.default())
    }
  }
  return text.trim()
}

// 获取当前选项的数据
const optionData = computed(() => {
  let labelVal = props.label
  if (!labelVal) {
    if (slots.default) {
      try {
        const text = getSlotText(slots.default())
        labelVal = text || String(props.value)
      } catch {
        labelVal = String(props.value)
      }
    } else {
      labelVal = String(props.value)
    }
  }
  return {
    value: props.value,
    label: labelVal,
    disabled: props.disabled
  }
})

// 注册
onMounted(() => {
  if (select) {
    select.onOptionCreate(optionData.value)
  }
})

// 注销
onBeforeUnmount(() => {
  if (select) {
    select.onOptionDestroy(props.value)
  }
})
</script>

<template>
  <!-- 这个组件在 Select 内部是以数据形式存在的，其 template 仅作为 slot 内容容器 -->
  <div v-show="false">
    <slot />
  </div>
</template>

<style lang="scss">
@use './select.scss';
</style>
