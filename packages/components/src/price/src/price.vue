<script setup lang="ts">
import { ref, computed, onMounted, watch, type CSSProperties } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { priceProps } from './price'

defineOptions({ name: 'YhPrice' })

const props = defineProps(priceProps)
const ns = useNamespace('price')

const displayValue = ref(props.animated ? 0 : Number(props.value))
const displayMax = ref(props.animated ? 0 : Number(props.maxValue))

let rafId: number | null = null

const startAnimation = (fromValue: number, toValue: number, setter: (val: number) => void) => {
  const duration = 1000
  const startTime = performance.now()
  const from = fromValue

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Smooth ease out
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    setter(from + (toValue - from) * easeProgress)

    if (progress < 1) {
      rafId = requestAnimationFrame(animate)
    } else {
      setter(toValue)
    }
  }

  rafId = requestAnimationFrame(animate)
}

const triggerAllAnimations = () => {
  if (rafId) cancelAnimationFrame(rafId)
  startAnimation(displayValue.value, Number(props.value), (v) => (displayValue.value = v))
  if (props.maxValue !== undefined) {
    startAnimation(displayMax.value, Number(props.maxValue), (v) => (displayMax.value = v))
  }
}

onMounted(() => {
  if (props.animated) {
    triggerAllAnimations()
  }
})

watch(
  () => [props.value, props.maxValue],
  () => {
    if (props.animated) {
      triggerAllAnimations()
    } else {
      displayValue.value = Number(props.value)
      displayMax.value = Number(props.maxValue)
    }
  },
  { deep: true }
)

const format = (val: number) => {
  const num = isNaN(val) ? 0 : val
  const fixed = num.toFixed(props.precision)

  if (props.thousandth) {
    const parts = fixed.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
  return fixed
}

const getParts = (formatted: string) => {
  const parts = formatted.split('.')
  return {
    integer: parts[0],
    decimal: parts[1] ? `.${parts[1]}` : ''
  }
}

const mainParts = computed(() => getParts(format(displayValue.value)))
const maxParts = computed(() =>
  props.maxValue !== undefined ? getParts(format(displayMax.value)) : null
)
const deleteParts = computed(() =>
  props.deleteValue !== undefined ? getParts(format(Number(props.deleteValue))) : null
)

const containerStyle = computed(() => {
  const styles: CSSProperties = {
    '--yh-price-integer-size': typeof props.size === 'number' ? `${props.size}px` : undefined,
    '--yh-price-decimal-scale': props.decimalScale.toString()
  }

  if (props.gradient) {
    const colors = Array.isArray(props.gradient) ? props.gradient : ['#ff4d4f', '#ff7875']
    styles['background-image'] = `linear-gradient(to right, ${colors.join(', ')})`
    styles['-webkit-background-clip'] = 'text'
    styles['background-clip'] = 'text'
    styles['color'] = 'transparent'
  }

  return { ...styles, ...props.themeOverrides }
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(props.size),
      ns.is('line-through', props.lineThrough),
      ns.is('bold', props.bold),
      ns.is('split', props.split),
      ns.is('gradient', !!props.gradient)
    ]"
    :style="containerStyle"
  >
    <!-- 标签区域 -->
    <div v-if="props.tag || $slots.tag" :class="[ns.e('tag'), ns.em('tag', props.tagType)]">
      <slot name="tag">{{ props.tag }}</slot>
    </div>

    <!-- 前缀/约等于 -->
    <div v-if="props.approx" :class="ns.e('approx')">~</div>
    <div v-if="props.prefix" :class="ns.e('prefix')">
      <slot name="prefix">{{ props.prefix }}</slot>
    </div>

    <!-- 符号容器 -->
    <div v-if="props.symbolPosition === 'before'" :class="ns.e('symbol')">
      <slot name="symbol">{{ props.symbol }}</slot>
    </div>

    <!-- 价格数值主体 -->
    <div :class="ns.e('main')">
      <div :class="ns.e('integer')">{{ mainParts.integer }}</div>
      <div :class="ns.e('decimal')">{{ mainParts.decimal }}</div>

      <!-- 区间模式 -->
      <template v-if="maxParts">
        <div :class="ns.e('separator')">-</div>
        <div :class="ns.e('integer')">{{ maxParts.integer }}</div>
        <div :class="ns.e('decimal')">{{ maxParts.decimal }}</div>
      </template>
    </div>

    <div v-if="props.symbolPosition === 'after'" :class="ns.e('symbol')">
      <slot name="symbol">{{ props.symbol }}</slot>
    </div>

    <!-- 单位/后缀 -->
    <div v-if="props.unit || $slots.unit" :class="ns.e('unit')">
      <slot name="unit">{{ props.unit }}</slot>
    </div>
    <div v-if="props.suffix" :class="ns.e('suffix')">
      <slot name="suffix">{{ props.suffix }}</slot>
    </div>

    <!-- 原价/划线价对比 -->
    <div v-if="deleteValue !== undefined && deleteParts" :class="ns.e('delete')">
      <span v-if="deleteLabel" :class="ns.e('delete-label')">{{ deleteLabel }}</span>
      <span :class="ns.e('delete-symbol')">{{ symbol }}</span>
      <span>{{ deleteParts.integer }}{{ deleteParts.decimal }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@use './price.scss';
</style>
