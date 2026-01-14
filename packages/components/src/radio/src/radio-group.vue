<script setup lang="ts">
/**
 * YhRadioGroup - 单选框组组件
 * @description 用于管理多个 radio 的选中状态
 */
import { computed, provide, toRefs } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type {
  RadioGroupProps,
  RadioGroupEmits,
  RadioGroupContext,
  RadioValueType
} from './radio'
import { radioGroupContextKey } from './radio'

defineOptions({
  name: 'YhRadioGroup'
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  validateEvent: true,
  tag: 'div'
})

const emit = defineEmits<RadioGroupEmits>()

// 命名空间
const ns = useNamespace('radio-group')

// 处理变化
const changeEvent = (value: RadioValueType) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// 提供上下文给子组件
const { modelValue, size, disabled, name, fill, textColor } = toRefs(props)

provide<RadioGroupContext>(radioGroupContextKey, {
  get modelValue() {
    return modelValue.value
  },
  get size() {
    return size?.value
  },
  get disabled() {
    return disabled.value
  },
  get name() {
    return name?.value
  },
  get fill() {
    return fill?.value
  },
  get textColor() {
    return textColor?.value
  },
  changeEvent
})

// 类名
const groupClasses = computed(() => [ns.b()])
</script>

<template>
  <component :is="tag" :class="groupClasses" role="radiogroup" aria-label="radio-group">
    <slot />
  </component>
</template>

<style lang="scss">
@use './radio-group.scss';
</style>
