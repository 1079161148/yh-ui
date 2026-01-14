<script setup lang="ts">
/**
 * YhInputNumber - 数字输入框组件
 * @description 仅允许输入标准的数字值，可定义范围
 */
import { computed, ref, watch, useSlots } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type { InputNumberProps, InputNumberEmits, InputNumberExpose } from './input-number'

defineOptions({
  name: 'YhInputNumber'
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  size: 'default',
  readonly: false,
  disabled: false,
  controlsPosition: '',
  controls: true,
  valueOnClear: null,
  clearable: false,
  validateEvent: true
})

const emit = defineEmits<InputNumberEmits>()
const slots = useSlots()

// 命名空间
const ns = useNamespace('input-number')

// 元素引用
const inputRef = ref<HTMLInputElement>()

// 内部状态
const focused = ref(false)
const hovering = ref(false)
const userInput = ref<string | null>(null)
const validationError = ref<string>('')

// 数值精度
const numPrecision = computed(() => {
  if (props.precision !== undefined) {
    return props.precision
  }

  const stepPrecision = getPrecision(props.step)
  if (props.modelValue !== undefined) {
    return Math.max(getPrecision(props.modelValue), stepPrecision)
  }
  return stepPrecision
})

// 获取数字精度
const getPrecision = (value: number | undefined): number => {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

// 格式化数值
const toPrecision = (num: number, pre?: number): number => {
  const precision = pre ?? numPrecision.value
  return Number(Number(num).toFixed(precision))
}

// 显示值
const displayValue = computed(() => {
  if (userInput.value !== null) {
    return userInput.value
  }

  let currentValue = props.modelValue
  if (currentValue === undefined || currentValue === null) {
    return ''
  }

  if (Number.isNaN(currentValue)) {
    return ''
  }

  return toPrecision(currentValue).toString()
})

// 是否达到最小值
const minDisabled = computed(() => {
  return props.modelValue !== undefined && props.modelValue <= props.min
})

// 是否达到最大值
const maxDisabled = computed(() => {
  return props.modelValue !== undefined && props.modelValue >= props.max
})

// 是否显示清空按钮
const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    props.modelValue !== undefined &&
    props.modelValue !== null &&
    (focused.value || hovering.value)
  )
})

// 是否有前缀
const hasPrefix = computed(() => {
  return !!props.prefix || !!props.prefixIcon || !!slots.prefix
})

// 是否有后缀
const hasSuffix = computed(() => {
  return !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value
})

// 类名计算
const inputNumberClasses = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value),
  ns.is('controls-right', props.controlsPosition === 'right'),
  ns.is('without-controls', !props.controls),
  ns.is('has-prefix', hasPrefix.value),
  ns.is('has-suffix', hasSuffix.value),
  ns.is('error', !!validationError.value)
])

// 验证
const validate = (value: number | undefined): boolean => {
  if (props.validator) {
    const result = props.validator(value)
    if (typeof result === 'string') {
      validationError.value = result
      return false
    }
    if (!result) {
      validationError.value = '验证失败'
      return false
    }
  }
  validationError.value = ''
  return true
}

// 设置当前值
const setCurrentValue = (newValue: number | undefined, emitChange = true) => {
  const oldValue = props.modelValue

  if (newValue !== undefined && newValue !== null) {
    if (Number.isNaN(newValue)) {
      return
    }

    if (props.stepStrictly) {
      newValue = toPrecision(
        Math.round(newValue / props.step) * props.step,
        numPrecision.value
      )
    }

    if (props.precision !== undefined) {
      newValue = toPrecision(newValue, props.precision)
    }

    if (newValue > props.max) {
      newValue = props.max
    }
    if (newValue < props.min) {
      newValue = props.min
    }
  }

  if (oldValue === newValue) {
    return
  }

  // 验证
  if (props.validateEvent) {
    validate(newValue)
  }

  userInput.value = null
  emit('update:modelValue', newValue)

  if (emitChange) {
    emit('change', newValue, oldValue)
  }
}

// 增加
const increase = () => {
  if (props.disabled || props.readonly || maxDisabled.value) {
    return
  }

  const value = props.modelValue ?? 0
  const newValue = toPrecision(value + props.step)
  setCurrentValue(newValue)
}

// 减少
const decrease = () => {
  if (props.disabled || props.readonly || minDisabled.value) {
    return
  }

  const value = props.modelValue ?? 0
  const newValue = toPrecision(value - props.step)
  setCurrentValue(newValue)
}

// 清空
const handleClear = () => {
  if (props.disabled || props.readonly) return

  setCurrentValue(undefined)
  emit('clear')
}

// 输入处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  userInput.value = target.value

  const value = target.value === '' ? undefined : Number(target.value)
  emit('input', value)
}

// 变化处理
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  userInput.value = null

  if (value === '') {
    if (props.valueOnClear === null) {
      setCurrentValue(undefined)
    } else if (props.valueOnClear === 'min') {
      setCurrentValue(props.min)
    } else if (props.valueOnClear === 'max') {
      setCurrentValue(props.max)
    } else {
      setCurrentValue(props.valueOnClear)
    }
    return
  }

  const newValue = Number(value)
  if (!Number.isNaN(newValue)) {
    setCurrentValue(newValue)
  }
}

// 聚焦处理
const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

// 失焦处理
const handleBlur = (event: FocusEvent) => {
  focused.value = false
  userInput.value = null
  emit('blur', event)
}

// 鼠标事件
const handleMouseenter = () => {
  hovering.value = true
}

const handleMouseleave = () => {
  hovering.value = false
}

// 键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    increase()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    decrease()
  }
}

// 暴露的方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const clear = () => {
  handleClear()
}

defineExpose<InputNumberExpose>({
  focus,
  blur,
  clear
})
</script>

<template>
  <div :class="inputNumberClasses" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <!-- 左侧减少按钮 -->
    <span v-if="controls && controlsPosition !== 'right'"
      :class="[ns.e('decrease'), ns.is('disabled', minDisabled || disabled)]" role="button"
      :aria-disabled="minDisabled || disabled" @click="decrease">
      <slot name="decreaseIcon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
          <path fill="currentColor" d="M128 544h768a32 32 0 0 0 0-64H128a32 32 0 0 0 0 64z" />
        </svg>
      </slot>
    </span>

    <!-- 输入框包装器 -->
    <div :class="ns.e('wrapper')">
      <!-- 前缀 -->
      <span v-if="hasPrefix" :class="ns.e('prefix')">
        <slot name="prefix">
          <span v-if="prefix" :class="ns.e('prefix-text')">{{ prefix }}</span>
          <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" />
        </slot>
      </span>

      <!-- 输入框 -->
      <input ref="inputRef" type="text" :class="ns.e('inner')" :value="displayValue" :name="name" :id="id"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :tabindex="tabindex" autocomplete="off"
        role="spinbutton" :aria-valuemax="max" :aria-valuemin="min" :aria-valuenow="modelValue"
        :aria-disabled="disabled" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"
        @keydown="handleKeydown" />

      <!-- 后缀/清空按钮 -->
      <span v-if="hasSuffix" :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="ns.e('clear')" @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
            <path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-160-448l128 128-128 128 45.248 45.248L525.248 621.248l128 128L698.496 704l-128-128 128-128L653.248 402.752 525.248 530.752l-128-128z" />
          </svg>
        </span>
        <slot name="suffix">
          <span v-if="suffix" :class="ns.e('suffix-text')">{{ suffix }}</span>
          <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" />
        </slot>
      </span>
    </div>

    <!-- 右侧增加按钮 -->
    <span v-if="controls && controlsPosition !== 'right'"
      :class="[ns.e('increase'), ns.is('disabled', maxDisabled || disabled)]" role="button"
      :aria-disabled="maxDisabled || disabled" @click="increase">
      <slot name="increaseIcon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
          <path fill="currentColor"
            d="M544 128v352h352a32 32 0 0 1 0 64H544v352a32 32 0 0 1-64 0V544H128a32 32 0 0 1 0-64h352V128a32 32 0 0 1 64 0z" />
        </svg>
      </slot>
    </span>

    <!-- 右侧控制按钮模式 -->
    <span v-if="controls && controlsPosition === 'right'" :class="ns.e('controls')">
      <span :class="[ns.e('increase'), ns.is('disabled', maxDisabled || disabled)]" role="button"
        :aria-disabled="maxDisabled || disabled" @click="increase">
        <slot name="increaseIcon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
              d="M488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z" />
          </svg>
        </slot>
      </span>
      <span :class="[ns.e('decrease'), ns.is('disabled', minDisabled || disabled)]" role="button"
        :aria-disabled="minDisabled || disabled" @click="decrease">
        <slot name="decreaseIcon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
              d="M488.832 679.68l-339.84-356.672a32 32 0 0 1 0-44.16l.384-.384a29.44 29.44 0 0 1 42.688 0l320 335.872 319.872-335.872a29.44 29.44 0 0 1 42.688 0l.384.384a32 32 0 0 1 0 44.16L535.168 679.68a32 32 0 0 1-46.336 0z" />
          </svg>
        </slot>
      </span>
    </span>
  </div>
</template>

<style lang="scss">
@use './input-number.scss';
</style>
