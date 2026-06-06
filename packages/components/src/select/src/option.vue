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

// 获取当前选项的数据
const optionData = computed(() => ({
  value: props.value,
  // 逻辑修正：优先使用 label 属性
  label: props.label || (slots.default ? ' ' : String(props.value)),
  disabled: props.disabled
}))

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
