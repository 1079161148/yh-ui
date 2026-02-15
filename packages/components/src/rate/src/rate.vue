<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import { rateProps, rateEmits } from './rate'

defineOptions({
  name: 'YhRate'
})

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)
const ns = useNamespace('rate')
const { t, tRaw } = useLocale()

// 全局配置
const { globalSize } = useConfig()

// 内部状态
const currentValue = ref(props.modelValue)
const hoverIndex = ref(-1)
// 鼠标是否在左半部分
const isPointerAtLeftHalf = ref(props.modelValue !== Math.floor(props.modelValue))

// 同步外部绑定值
watch(() => props.modelValue, (val: number) => {
  currentValue.value = val
  isPointerAtLeftHalf.value = val !== Math.floor(val)
}, { immediate: true })

// 计算颜色系统
const activeColor = computed(() => {
  if (typeof props.colors === 'string') return props.colors
  if (Array.isArray(props.colors)) {
    const v = currentValue.value
    if (v <= 2) return props.colors[0] || '#F7BA2A'
    if (v <= 4) return props.colors[1] || '#F7BA2A'
    return props.colors[2] || '#F7BA2A'
  }
  return '#F7BA2A'
})

const voidColorValue = computed(() => props.disabled ? props.disabledVoidColor : props.voidColor)

// 计算每个星星的填充宽度
const getStarWidth = (item: number) => {
  if (item <= Math.floor(currentValue.value)) return '100%'
  if (item === Math.ceil(currentValue.value) && currentValue.value % 1 !== 0) {
    return (currentValue.value % 1 * 100) + '%'
  }
  return '0%'
}

// 事件处理
const handleMouseMove = (item: number, e: MouseEvent) => {
  if (props.disabled) return
  hoverIndex.value = item
  if (props.allowHalf) {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    isPointerAtLeftHalf.value = (e.clientX - rect.left) * 2 <= rect.width
    currentValue.value = isPointerAtLeftHalf.value ? item - 0.5 : item
  } else {
    currentValue.value = item
  }
}

const handleMouseLeave = () => {
  if (props.disabled) return
  currentValue.value = props.modelValue
  hoverIndex.value = -1
  isPointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue)
}

const handleItemClick = (item: number) => {
  if (props.disabled) return
  let val = props.allowHalf && isPointerAtLeftHalf.value ? item - 0.5 : item
  if (props.clearable && val === props.modelValue) val = 0

  emit('update:modelValue', val)
  emit('change', val)
}

// 辅助文本
const rateText = computed(() => {
  if (props.showScore) return props.scoreTemplate.replace('{value}', String(currentValue.value))
  if (props.showText) {
    const texts = props.texts.length > 0 ? props.texts : tRaw<string[]>('rate.texts')
    return texts[Math.ceil(currentValue.value) - 1] || ''
  }
  return ''
})

// 基础变量
const actualSize = computed(() => props.size || globalSize.value || 'default')
const iconSize = computed(() => ({ large: 24, default: 20, small: 16 }[actualSize.value] || 20))
const starPath = 'M512 747.52l-228.16 119.84 43.52-254.08L142.08 434.24l255.04-37.12L512 166.08l114.88 231.04 255.04 37.12-184.64 179.2 43.52 254.08z'
</script>

<template>
  <div :class="[ns.b(), ns.m(actualSize), ns.is('disabled', disabled)]" @mouseleave="handleMouseLeave">
    <div v-for="item in max" :key="item" :class="[ns.e('item'), ns.is('hover', hoverIndex === item)]"
      :style="{ width: iconSize + 'px', height: iconSize + 'px' }" @mousemove="handleMouseMove(item, $event)"
      @click="handleItemClick(item)">
      <slot name="icon" :index="item" :width="getStarWidth(item)" :activeColor="activeColor"
        :voidColor="voidColorValue">
        <!-- 基础层：底色星星 -->
        <svg :class="[ns.e('star-icon'), ns.is('void')]" :style="{ color: voidColorValue }" viewBox="0 0 1024 1024">
          <path :d="starPath" fill="currentColor" />
        </svg>

        <!-- 填充层：金色星星（带裁剪） -->
        <div :class="ns.e('star-content')" :style="{ width: getStarWidth(item), color: activeColor }">
          <svg :class="ns.e('star-icon')" :style="{ width: iconSize + 'px' }" viewBox="0 0 1024 1024">
            <path :d="starPath" fill="currentColor" />
          </svg>
        </div>
      </slot>
    </div>

    <span v-if="showScore || showText" :class="ns.e('text')" :style="{ color: textColor }">
      {{ rateText }}
    </span>
  </div>
</template>

<style lang="scss">
@use "./rate.scss";
</style>
