<script setup lang="ts">
/**
 * YhCheckboxGroup - 复选框组组件
 * @description 用于管理多个 checkbox 的选中状态
 */
import { computed, provide, toRefs } from 'vue'
import { useNamespace, useFormItem, useId } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useConfig } from '@yh-ui/hooks'
import type {
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxGroupContext,
  CheckboxValueType
} from './checkbox'
import YhCheckbox from './checkbox.vue'
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

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'checkbox-group',
  computed(() => props.themeOverrides)
)

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
  get themeOverrides() {
    return props.themeOverrides
  },
  changeEvent
})

// 类名
const groupClasses = computed(() => [ns.b()])
</script>

<template>
  <component
    :is="tag"
    :class="groupClasses"
    :style="themeStyle"
    role="group"
    :aria-labelledby="labelId"
    :aria-invalid="formItem?.validateStatus === 'error'"
    :aria-describedby="formItem?.validateStatus === 'error' ? formItem?.errorId : undefined"
  >
    <slot>
      <template v-if="options && options.length">
        <yh-checkbox
          v-for="item in options"
          :key="String(item.value)"
          :value="item.value"
          :label="item.label"
          :disabled="item.disabled"
        />
      </template>
    </slot>
  </component>
</template>

<style lang="scss">
@use './checkbox-group.scss';
</style>
