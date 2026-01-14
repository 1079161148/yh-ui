<script setup lang="ts">
/**
 * YhCheckboxGroup - 复选框组组件
 * @description 用于管理多个 checkbox 的选中状态
 */
import { computed, provide, watch, toRefs } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type {
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxGroupContext,
  CheckboxValueType
} from './checkbox'
import { checkboxGroupContextKey } from './checkbox'

defineOptions({
  name: 'YhCheckboxGroup'
})

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  validateEvent: true,
  tag: 'div'
})

const emit = defineEmits<CheckboxGroupEmits>()

// 命名空间
const ns = useNamespace('checkbox-group')

// 处理变化
const changeEvent = (value: CheckboxValueType[]) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// 提供上下文给子组件
const { modelValue, size, disabled, min, max } = toRefs(props)

provide<CheckboxGroupContext>(checkboxGroupContextKey, {
  get modelValue() {
    return modelValue.value
  },
  get size() {
    return size?.value
  },
  get disabled() {
    return disabled.value
  },
  get min() {
    return min?.value
  },
  get max() {
    return max?.value
  },
  changeEvent
})

// 类名
const groupClasses = computed(() => [ns.b()])
</script>

<template>
  <component :is="tag" :class="groupClasses" role="group" aria-label="checkbox-group">
    <slot />
  </component>
</template>

<style lang="scss">
@use './checkbox-group.scss';
</style>
