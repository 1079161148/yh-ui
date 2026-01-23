<script setup lang="ts">
/**
 * YhRadioButton - 单选按钮组件
 * @description 按钮形式的单选框，常用于表单中的选项切换
 */
import { computed, ref, inject } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type {
  RadioButtonProps,
  RadioButtonEmits,
  RadioButtonExpose,
  RadioValueType
} from './radio'
import { radioGroupContextKey } from './radio'

defineOptions({
  name: 'YhRadioButton'
})

const props = withDefaults(defineProps<RadioButtonProps>(), {
  disabled: false
})

const emit = defineEmits<RadioButtonEmits>()

// 命名空间
const ns = useNamespace('radio-button')

// 注入 radio-group 上下文
const radioGroup = inject(radioGroupContextKey, undefined)

// 输入框元素引用
const inputRef = ref<HTMLInputElement>()

// 内部状态
const focused = ref(false)

// 判断是 group 还是单独使用
const isGroup = computed(() => !!radioGroup)

// 获取实际的 size
const buttonSize = computed(() => {
  return props.size || radioGroup?.size || 'default'
})

// 获取实际的 disabled
const isDisabled = computed(() => {
  return props.disabled || radioGroup?.disabled || false
})

// 获取实际的 name
const radioName = computed(() => {
  return props.name || radioGroup?.name || ''
})

// 是否选中
const isChecked = computed(() => {
  const value = props.value ?? props.label
  if (isGroup.value && radioGroup) {
    return radioGroup.modelValue === value
  }
  return props.modelValue === value
})

// 自定义样式（fill 和 textColor）
const activeStyle = computed(() => {
  if (!isChecked.value) return {}

  const style: Record<string, string> = {}

  if (radioGroup?.fill) {
    style['--yh-radio-button-checked-bg-color'] = radioGroup.fill
    style['--yh-radio-button-checked-border-color'] = radioGroup.fill
  }

  if (radioGroup?.textColor) {
    style['--yh-radio-button-checked-text-color'] = radioGroup.textColor
  }

  return style
})

// 类名计算
const buttonClasses = computed(() => [
  ns.b(),
  buttonSize.value !== 'default' ? ns.m(buttonSize.value) : '',
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value),
  ns.is('focused', focused.value)
])

// 处理变化
const handleChange = () => {
  if (isDisabled.value) return

  const value = props.value as RadioValueType

  if (isGroup.value && radioGroup) {
    // group 模式
    radioGroup.changeEvent?.(value)
  } else {
    // 单独模式
    emit('update:modelValue', value)
    emit('change', value)
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

// 暴露的属性 and 方法
defineExpose<RadioButtonExpose>({
  ref: inputRef.value,
  focus,
  blur
})
</script>

<template>
  <label :class="buttonClasses" :style="activeStyle">
    <input ref="inputRef" :class="ns.e('original')" type="radio" :name="radioName" :id="id" :tabindex="tabindex"
      :disabled="isDisabled" :checked="isChecked" :value="value" @change="handleChange" @focus="handleFocus"
      @blur="handleBlur" />
    <span :class="ns.e('inner')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss">
@use './radio-button.scss';
</style>
