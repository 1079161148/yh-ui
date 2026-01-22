<script setup lang="ts">
/**
 * YhCheckboxGroup - 复选框组组件
 * @description 用于管理多个 checkbox 的选中状态
 */
import { computed, provide, watch, toRefs } from 'vue'
import { useNamespace, useFormItem, useId } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
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

// 表单集成
const { formItem } = useFormItem()
const { validate } = useFormItem()
const labelId = useId().value

// 全局配置
const { globalSize } = useConfig()

// 处理变化
const changeEvent = (value: CheckboxValueType[]) => {
  emit('update:modelValue', value)
  emit('change', value)
  if (props.validateEvent) {
    validate('change')
  }
}

// 提供上下文给子组件
const { modelValue, size, disabled, min, max } = toRefs(props)

provide<CheckboxGroupContext>(checkboxGroupContextKey, {
  get modelValue() {
    return modelValue.value
  },
  get size() {
    return size?.value || globalSize.value || 'default'
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
  <component :is="tag" :class="groupClasses" role="group" :aria-labelledby="labelId"
    :aria-invalid="formItem?.validateStatus === 'error'"
    :aria-describedby="formItem?.validateStatus === 'error' ? formItem?.errorId : undefined">
    <slot />
  </component>
</template>

<style lang="scss">
@use './checkbox-group.scss';
</style>
