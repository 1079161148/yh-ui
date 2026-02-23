<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, provide, toRefs } from 'vue'
import type { CSSProperties } from 'vue'
import { useNamespace, useFormItem } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useConfig } from '@yh-ui/hooks'
import { sliderProps, sliderEmits } from './slider'
import type { SliderValueType, InputNumberSize } from './slider'
import SliderButton from './slider-button.vue'
import YhInputNumber from '../../input-number/src/input-number.vue'

defineOptions({
  name: 'YhSlider'
})

const props = defineProps(sliderProps)
const { vertical, disabled, size } = toRefs(props)
const emit = defineEmits(sliderEmits)

const ns = useNamespace('slider')
const { form, formItem, validate: triggerValidate } = useFormItem()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('slider', computed(() => props.themeOverrides))

// 全局配置
const { globalSize } = useConfig()

const sliderRef = ref<HTMLElement>()

const firstValue = ref(0)
const secondValue = ref(0)

const mergedDisabled = computed(() => props.disabled || form?.disabled || false)
const mergedSize = computed((): InputNumberSize => {
  const size = props.size || formItem?.size || form?.size || globalSize.value || 'default'
  return size === '' ? 'default' : size as InputNumberSize
})

// 提供给子组件
provide('slider', {
  sliderRef,
  props,
  emit
})

// 初始化值
const initValues = () => {
  if (props.range && Array.isArray(props.modelValue)) {
    firstValue.value = Math.max(props.min, Math.min(props.max, props.modelValue[0] || 0))
    secondValue.value = Math.max(props.min, Math.min(props.max, props.modelValue[1] || 0))
  } else {
    const val = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
    firstValue.value = Math.max(props.min, Math.min(props.max, Number(val) || 0))
    secondValue.value = props.min
  }
}

watch(
  () => props.modelValue,
  () => {
    initValues()
  },
  { deep: true }
)

initValues()

const minValue = computed(() => (props.range ? Math.min(firstValue.value, secondValue.value) : props.min))
const maxValue = computed(() => (props.range ? Math.max(firstValue.value, secondValue.value) : firstValue.value))

const barSize = computed(() => {
  return props.range
    ? `${(100 * (maxValue.value - minValue.value)) / (props.max - props.min)}%`
    : `${(100 * (firstValue.value - props.min)) / (props.max - props.min)}%`
})

const barStart = computed(() => {
  return props.range ? `${(100 * (minValue.value - props.min)) / (props.max - props.min)}%` : '0%'
})

const barStyle = computed(() => {
  const style: CSSProperties = props.vertical
    ? {
      height: barSize.value,
      bottom: barStart.value,
      top: 'auto'
    }
    : {
      width: barSize.value,
      left: barStart.value,
      right: 'auto'
    }

  if (props.color) {
    style.background = props.color
  }

  return style
})

const stops = computed(() => {
  if (!props.showStops || props.min >= props.max) return []
  const stopCount = (props.max - props.min) / props.step
  const stepWidth = 100 / stopCount
  const result: number[] = []
  for (let i = 1; i < stopCount; i++) {
    result.push(i * stepWidth)
  }
  if (props.range) {
    return result.filter((step) => {
      const val = props.min + (step * (props.max - props.min)) / 100
      return val < minValue.value || val > maxValue.value
    })
  } else {
    return result.filter((step) => props.min + (step * (props.max - props.min)) / 100 > firstValue.value)
  }
})

const markList = computed(() => {
  if (!props.marks) return []
  const marksKeys = Object.keys(props.marks)
    .map(Number)
    .filter((n) => !isNaN(n) && n >= props.min && n <= props.max)
  return marksKeys.map((key) => {
    const mark = props.marks?.[key]
    return {
      point: ((key - props.min) / (props.max - props.min)) * 100,
      label: typeof mark === 'string' ? { label: mark, style: undefined } : (mark ?? { label: '', style: undefined })
    }
  })
})

const sliderClasses = computed(() => [
  ns.b(),
  ns.m(mergedSize.value),
  vertical.value ? ns.is('vertical') : '',
  mergedDisabled.value ? ns.is('disabled') : '',
  (props.showInput && !props.range) ? ns.is('with-input') : ''
].filter(Boolean))

const sliderStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style['--yh-slider-main-color'] = props.color
    style['--yh-slider-secondary-color'] = props.color
  }
  if (props.vertical && props.height) {
    style.height = props.height
  }
  return {
    ...themeStyle.value,
    ...style
  }
})

const emitValue = (val: SliderValueType) => {
  emit('update:modelValue', val)
  emit('input', val)
  if (props.validateEvent) {
    triggerValidate('change')
  }
}

const updateValue = (isChange = false) => {
  const val = props.range ? [minValue.value, maxValue.value] : firstValue.value
  emitValue(val as SliderValueType)
  if (isChange) {
    emit('change', val as SliderValueType)
  }
}

const handleButtonChange = () => updateValue(true)
const handleButtonInput = () => updateValue(false)

const onSliderClick = (event: MouseEvent) => {
  if (mergedDisabled.value) return
  const slider = sliderRef.value
  if (!slider) return

  const rect = slider.getBoundingClientRect()
  let percent = 0
  if (props.vertical) {
    const clientY = event.clientY
    percent = ((rect.bottom - clientY) / rect.height) * 100
  } else {
    const clientX = event.clientX
    percent = ((clientX - rect.left) / rect.width) * 100
  }

  if (percent < 0) percent = 0
  if (percent > 100) percent = 100

  const lengthPerStep = 100 / ((props.max - props.min) / props.step)
  const steps = Math.round(percent / lengthPerStep)
  let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
  value = parseFloat(value.toFixed(getPrecision(props.step)))

  if (props.range) {
    if (Math.abs(value - firstValue.value) < Math.abs(value - secondValue.value)) {
      firstValue.value = value
    } else {
      secondValue.value = value
    }
  } else {
    firstValue.value = value
  }
  updateValue()
}

const getPrecision = (step: number) => {
  const stepStr = step.toString()
  const dotIndex = stepStr.indexOf('.')
  return dotIndex > -1 ? stepStr.length - dotIndex - 1 : 0
}

const handleInputChange = (val: number | undefined) => {
  if (val === undefined) return
  firstValue.value = val
  updateValue()
}

onMounted(() => {
  initValues()
})
</script>

<template>
  <div :class="sliderClasses" :style="sliderStyle">
    <div :class="ns.e('input')" v-if="showInput && !range">
      <yh-input-number :model-value="firstValue" :min="min" :max="max" :step="step" :disabled="mergedDisabled"
        :size="(inputSize || mergedSize)" :controls="showInputControls" @change="handleInputChange" />
    </div>

    <div ref="sliderRef" :class="ns.e('runway')" @mousedown="onSliderClick">
      <div :class="ns.e('bar')" :style="barStyle"></div>

      <slider-button v-model="firstValue" :vertical="vertical" :disabled="mergedDisabled" :min="min" :max="max"
        :step="step" :show-tooltip="showTooltip" :format-tooltip="formatTooltip" :tooltip-class="tooltipClass"
        :placement="placement" @change="handleButtonChange" @input="handleButtonInput">
        <template v-if="$slots.thumb" #thumb="scope">
          <slot name="thumb" v-bind="scope"></slot>
        </template>
      </slider-button>

      <slider-button v-if="range" v-model="secondValue" :vertical="vertical" :disabled="mergedDisabled" :min="min"
        :max="max" :step="step" :show-tooltip="showTooltip" :format-tooltip="formatTooltip"
        :tooltip-class="tooltipClass" :placement="placement" @change="handleButtonChange" @input="handleButtonInput">
        <template v-if="$slots.thumb" #thumb="scope">
          <slot name="thumb" v-bind="scope"></slot>
        </template>
      </slider-button>

      <template v-if="showStops">
        <div v-for="(stop, index) in stops" :key="index" :class="ns.e('stop')"
          :style="vertical ? { bottom: stop + '%' } : { left: stop + '%' }"></div>
      </template>

      <template v-if="markList.length > 0">
        <div>
          <div v-for="(item, index) in markList" :key="index" :class="ns.e('stop')"
            :style="vertical ? { bottom: item.point + '%' } : { left: item.point + '%' }"></div>
        </div>
        <div :class="ns.e('marks')">
          <div v-for="(item, index) in markList" :key="index" :class="ns.e('mark-text')"
            :style="vertical ? { bottom: item.point + '%' } : { left: item.point + '%' }">
            <slot name="mark" :mark="item.label.label">
              <div :style="item.label.style">{{ item.label.label }}</div>
            </slot>
          </div>
        </div>
      </template>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use './slider.scss';
</style>
