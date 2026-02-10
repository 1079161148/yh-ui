<script setup lang="ts">
/**
 * YhInputNumber - 数字输入框组件
 * @description 已修复失去焦点时的校验时序问题
 */
import { computed, ref, watch, useSlots, inject, nextTick } from 'vue'
import { useNamespace, useFormItem, useId, useLocale } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import type { InputNumberProps, InputNumberEmits, InputNumberExpose } from './input-number'

defineOptions({
  name: 'YhInputNumber'
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  size: undefined,
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

const ns = useNamespace('input-number')
const { t } = useLocale()
const inputRef = ref<HTMLInputElement>()
const inputId = useId()

const focused = ref(false)
const hovering = ref(false)
const userInput = ref<string | null>(null)
const validationError = ref<string>('')

const { form, formItem, validate: triggerValidate } = useFormItem()
const { globalSize } = useConfig()

const mergedDisabled = computed(() => props.disabled || form?.disabled || false)
const mergedSize = computed(() => props.size || formItem?.size || form?.size || globalSize.value || 'default')

const numPrecision = computed(() => {
  if (props.precision !== undefined) return props.precision
  const stepPrecision = getPrecision(props.step)
  if (props.modelValue !== undefined) {
    return Math.max(getPrecision(props.modelValue), stepPrecision)
  }
  return stepPrecision
})

const getPrecision = (value: number | undefined): number => {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  return dotPosition !== -1 ? valueString.length - dotPosition - 1 : 0
}

const toPrecision = (num: number, pre?: number): number => {
  const precision = pre ?? numPrecision.value
  return Number(Number(num).toFixed(precision))
}

const displayValue = computed(() => {
  if (userInput.value !== null) return userInput.value
  let currentValue = props.modelValue
  if (currentValue === undefined || currentValue === null || Number.isNaN(currentValue)) return ''
  if (props.precision !== undefined) return Number(currentValue).toFixed(props.precision)
  return toPrecision(currentValue).toString()
})

const minDisabled = computed(() => props.modelValue !== undefined && props.modelValue <= props.min)
const maxDisabled = computed(() => props.modelValue !== undefined && props.modelValue >= props.max)

const showClear = computed(() =>
  props.clearable && !mergedDisabled.value && !props.readonly &&
  props.modelValue !== undefined && props.modelValue !== null && (focused.value || hovering.value)
)

const hasPrefix = computed(() => !!props.prefix || !!props.prefixIcon || !!slots.prefix)
const hasSuffix = computed(() => !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value)

const inputNumberClasses = computed(() => [
  ns.b(),
  ns.m(mergedSize.value),
  ns.is('disabled', mergedDisabled.value),
  ns.is('focused', focused.value),
  ns.is('controls-right', props.controlsPosition === 'right'),
  ns.is('without-controls', !props.controls),
  ns.is('has-prefix', hasPrefix.value),
  ns.is('has-suffix', hasSuffix.value),
  ns.is('error', formItem?.validateStatus === 'error')
])

const validate = (value: number | undefined): boolean => {
  if (props.validator) {
    const result = props.validator(value)
    if (typeof result === 'string') {
      validationError.value = result
      return false
    }
    if (!result) {
      validationError.value = t('form.validationFailed')
      return false
    }
  }
  validationError.value = ''
  return true
}

const setCurrentValue = (newValue: number | undefined, emitChange = true) => {
  const oldValue = props.modelValue
  if (newValue !== undefined && newValue !== null) {
    if (Number.isNaN(newValue)) return
    if (props.stepStrictly) {
      newValue = toPrecision(Math.round(newValue / props.step) * props.step, numPrecision.value)
    }
    if (props.precision !== undefined) newValue = toPrecision(newValue, props.precision)
    if (newValue > props.max) newValue = props.max
    if (newValue < props.min) newValue = props.min
  }

  if (oldValue === newValue) return

  if (props.validateEvent) validate(newValue)

  userInput.value = null
  emit('update:modelValue', newValue)

  if (props.validateEvent) {
    nextTick(() => {
      triggerValidate('change')
    })
  }

  if (emitChange) emit('change', newValue, oldValue)
}

const increase = () => {
  if (mergedDisabled.value || props.readonly || maxDisabled.value) return
  setCurrentValue(toPrecision((props.modelValue ?? 0) + props.step))
}

const decrease = () => {
  if (mergedDisabled.value || props.readonly || minDisabled.value) return
  setCurrentValue(toPrecision((props.modelValue ?? 0) - props.step))
}

const handleClear = () => {
  if (mergedDisabled.value || props.readonly) return
  setCurrentValue(undefined)
  emit('clear')
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  userInput.value = target.value
  emit('input', target.value === '' ? undefined : Number(target.value))
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  userInput.value = null
  if (value === '') {
    const clearVal = props.valueOnClear === 'min' ? props.min : (props.valueOnClear === 'max' ? props.max : props.valueOnClear)
    setCurrentValue(clearVal === null ? undefined : (clearVal as number))
    return
  }
  const newValue = Number(value)
  if (!Number.isNaN(newValue)) setCurrentValue(newValue)
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  userInput.value = null
  emit('blur', event)
  if (props.validateEvent) {
    nextTick(() => {
      triggerValidate('blur')
    })
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    increase()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    decrease()
  }
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: handleClear
})
</script>

<template>
  <div :class="inputNumberClasses" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span v-if="controls && controlsPosition !== 'right'"
      :class="[ns.e('decrease'), ns.is('disabled', minDisabled || mergedDisabled)]" @click="decrease">
      <slot name="decreaseIcon">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor" d="M128 544h768a32 32 0 0 0 0-64H128a32 32 0 0 0 0 64z" />
        </svg>
      </slot>
    </span>

    <div :class="ns.e('wrapper')">
      <span v-if="hasPrefix" :class="ns.e('prefix')">
        <slot name="prefix">
          <span v-if="prefix" :class="ns.e('prefix-text')">{{ prefix }}</span>
          <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" />
        </slot>
      </span>
      <input ref="inputRef" type="text" :class="ns.e('inner')" :value="displayValue" :name="name" :id="id || inputId"
        :placeholder="placeholder || t('input.placeholder')" :disabled="mergedDisabled" :readonly="readonly"
        autocomplete="off" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"
        @keydown="handleKeydown" />
      <span v-if="hasSuffix" :class="ns.e('suffix')">
        <span v-if="showClear" :class="ns.e('clear')" @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
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

    <span v-if="controls && controlsPosition !== 'right'"
      :class="[ns.e('increase'), ns.is('disabled', maxDisabled || mergedDisabled)]" @click="increase">
      <slot name="increaseIcon">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor"
            d="M544 128v352h352a32 32 0 0 1 0 64H544v352a32 32 0 0 1-64 0V544H128a32 32 0 0 1 0-64h352V128a32 32 0 0 1 64 0z" />
        </svg>
      </slot>
    </span>

    <span v-if="controls && controlsPosition === 'right'" :class="ns.e('controls')">
      <span :class="[ns.e('increase'), ns.is('disabled', maxDisabled || mergedDisabled)]" @click="increase">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor"
            d="M488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z" />
        </svg>
      </span>
      <span :class="[ns.e('decrease'), ns.is('disabled', minDisabled || mergedDisabled)]" @click="decrease">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor"
            d="M488.832 679.68l-339.84-356.672a32 32 0 0 1 0-44.16l.384-.384a29.44 29.44 0 0 1 42.688 0l320 335.872 319.872-335.872a29.44 29.44 0 0 1 42.688 0l.384.384a32 32 0 0 1 0 44.16L535.168 679.68a32 32 0 0 1-46.336 0z" />
        </svg>
      </span>
    </span>
  </div>
</template>

<style lang="scss">
@use './input-number.scss';
</style>
