<script setup lang="ts">
/**
 * YhCheckbox - 复选框组件
 * @description 在一组备选项中进行多选
 */
import { computed, ref, inject, onMounted, watch } from 'vue'
import { useNamespace, useConfig } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxExpose,
  CheckboxValueType
} from './checkbox'
import { checkboxGroupContextKey } from './checkbox'

defineOptions({
  name: 'YhCheckbox'
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
  size: 'default',
  disabled: false,
  indeterminate: false,
  border: false,
  validateEvent: true
})

const emit = defineEmits<CheckboxEmits>()

// 命名空间
const ns = useNamespace('checkbox')

// 注入 checkbox-group 上下文
const checkboxGroup = inject(checkboxGroupContextKey, undefined)

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('checkbox', computed(() => props.themeOverrides || checkboxGroup?.themeOverrides))

// 输入框元素引用
const inputRef = ref<HTMLInputElement>()

// 内部状态
const focused = ref(false)
const hovering = ref(false)

const { globalSize } = useConfig()

// 判断是 group 还是单独使用
const isGroup = computed(() => !!checkboxGroup)

// 获取实际的 size
const checkboxSize = computed(() => {
  return (props.size !== 'default' ? props.size : checkboxGroup?.size) || globalSize.value || 'default'
})

// 获取实际的 disabled
const isDisabled = computed(() => {
  return props.disabled || checkboxGroup?.disabled || false
})

// 检查 min/max 限制
const isLimitDisabled = computed(() => {
  if (isGroup.value && checkboxGroup) {
    const modelValue = checkboxGroup.modelValue || []
    const isChecked = modelValue.includes(props.value as CheckboxValueType)

    // 如果已达到最大值且当前未选中，则禁用
    if (
      checkboxGroup.max !== undefined &&
      modelValue.length >= checkboxGroup.max &&
      !isChecked
    ) {
      return true
    }

    // 如果已达到最小值且当前已选中，则禁用
    if (
      checkboxGroup.min !== undefined &&
      modelValue.length <= checkboxGroup.min &&
      isChecked
    ) {
      return true
    }
  }

  return false
})

const actualDisabled = computed(() => isDisabled.value || isLimitDisabled.value)

// 是否选中
const isChecked = computed(() => {
  if (isGroup.value && checkboxGroup) {
    return (checkboxGroup.modelValue || []).includes(
      props.value as CheckboxValueType
    )
  }
  return props.modelValue === props.trueValue
})

// 类名计算
const checkboxClasses = computed(() => [
  ns.b(),
  ns.m(checkboxSize.value),
  ns.is('disabled', actualDisabled.value),
  ns.is('checked', isChecked.value),
  ns.is('indeterminate', props.indeterminate),
  ns.is('focused', focused.value),
  ns.is('border', props.border)
])

const innerClasses = computed(() => [
  ns.e('inner')
])

// 处理变化
const handleChange = (event: Event) => {
  if (actualDisabled.value) return

  const target = event.target as HTMLInputElement

  if (isGroup.value && checkboxGroup) {
    // group 模式
    const currentValue = [...(checkboxGroup.modelValue || [])]
    const value = props.value as CheckboxValueType

    if (target.checked) {
      // 添加值
      if (!currentValue.includes(value)) {
        currentValue.push(value)
      }
    } else {
      // 移除值
      const index = currentValue.indexOf(value)
      if (index > -1) {
        currentValue.splice(index, 1)
      }
    }

    checkboxGroup.changeEvent?.(currentValue)
  } else {
    // 单独模式
    const newValue = target.checked ? props.trueValue : props.falseValue
    emit('update:modelValue', newValue as CheckboxValueType)
    emit('change', newValue as CheckboxValueType)
  }
}

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}

// 暴露的方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

// 监听 checked prop
watch(
  () => props.checked,
  (val) => {
    if (val !== undefined && !isGroup.value) {
      const newValue = val ? props.trueValue : props.falseValue
      if (props.modelValue !== newValue) {
        emit('update:modelValue', newValue as CheckboxValueType)
      }
    }
  },
  { immediate: true }
)

// 挂载时处理 autofocus
onMounted(() => {
  if (inputRef.value && props.checked !== undefined && !isGroup.value) {
    inputRef.value.checked = isChecked.value
  }
})

// 暴露的属性和方法
defineExpose<CheckboxExpose>({
  get ref() {
    return inputRef.value
  },
  get checked() {
    return isChecked.value
  },
  focus,
  blur
})
</script>

<template>
  <label :class="checkboxClasses" :style="themeStyle" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span :class="[
      ns.e('input'),
      ns.is('disabled', actualDisabled),
      ns.is('checked', isChecked),
      ns.is('indeterminate', props.indeterminate)
    ]">
      <span :class="innerClasses"></span>
      <input ref="inputRef" :class="ns.e('original')" type="checkbox" :name="name" :id="id" :tabindex="tabindex"
        :disabled="actualDisabled" :checked="isChecked" @change="handleChange" @focus="handleFocus"
        @blur="handleBlur" />
    </span>
    <span v-if="$slots.default || label" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss">
@use './checkbox.scss';
</style>
