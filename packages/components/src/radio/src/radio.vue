<script setup lang="ts">
/**
 * YhRadio - 单选框组件
 * @description 在一组备选项中进行单选
 */
import { computed, ref, inject } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type {
  RadioProps,
  RadioEmits,
  RadioExpose,
  RadioValueType
} from './radio'
import { radioGroupContextKey } from './radio'

defineOptions({
  name: 'YhRadio'
})

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'default',
  disabled: false,
  border: false
})

const emit = defineEmits<RadioEmits>()

// 命名空间
const ns = useNamespace('radio')

// 注入 radio-group 上下文
const radioGroup = inject(radioGroupContextKey, undefined)

// 输入框元素引用
const inputRef = ref<HTMLInputElement>()

// 内部状态
const focused = ref(false)
const hovering = ref(false)

// 判断是 group 还是单独使用
const isGroup = computed(() => !!radioGroup)

// 获取实际的 size
const radioSize = computed(() => {
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
  if (isGroup.value && radioGroup) {
    return radioGroup.modelValue === props.value
  }
  return props.modelValue === props.value
})

// 类名计算
const radioClasses = computed(() => [
  ns.b(),
  ns.m(radioSize.value),
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value),
  ns.is('focused', focused.value),
  ns.is('border', props.border)
])

const innerClasses = computed(() => [
  ns.e('inner'),
  ns.is('checked', isChecked.value),
  ns.is('disabled', isDisabled.value)
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

// 暴露的属性和方法
defineExpose<RadioExpose>({
  ref: inputRef.value,
  focus,
  blur
})
</script>

<template>
  <label :class="radioClasses" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span :class="ns.e('input')">
      <span :class="innerClasses">
        <!-- 选中圆点 -->
        <span v-if="isChecked" :class="ns.e('dot')" />
      </span>
      <input ref="inputRef" :class="ns.e('original')" type="radio" :name="radioName" :id="id" :tabindex="tabindex"
        :disabled="isDisabled" :checked="isChecked" :value="value" @change="handleChange" @focus="handleFocus"
        @blur="handleBlur" />
    </span>
    <span v-if="$slots.default || label" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss">
@use './radio.scss';
</style>
