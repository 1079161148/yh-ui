<script setup lang="ts">
/**
 * YhButton - 按钮组件
 */
import { computed, ref, useSlots } from 'vue'
import { useNamespace, useConfig } from '../../hooks/use-config'
import type { ButtonProps, ButtonEmits, ButtonExpose } from './button'

defineOptions({
  name: 'YhButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  nativeType: 'button',
  disabled: false,
  loading: false,
  plain: false,
  round: false,
  circle: false,
  text: false,
  link: false,
  autofocus: false,
  block: false,
  tag: 'button',
  iconPosition: 'left'
})

const emit = defineEmits<ButtonEmits>()

const slots = useSlots()

// 命名空间
const ns = useNamespace('button')

// 获取全局配置
const { globalSize } = useConfig()

// 最终尺寸
const actualSize = computed(() => props.size || globalSize.value || 'default')

// 按钮元素引用
const buttonRef = ref<HTMLButtonElement>()

// 是否有图标
const hasIcon = computed(() => props.icon || slots.icon)
const hasSuffixIcon = computed(() => props.suffixIcon || slots.suffixIcon)

// 是否为垂直布局
const isVertical = computed(() =>
  props.iconPosition === 'top' || props.iconPosition === 'bottom'
)

// 按钮类名
const buttonClasses = computed(() => [
  ns.b(),
  props.type !== 'default' && ns.m(props.type),
  actualSize.value !== 'default' && ns.m(actualSize.value),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('plain', props.plain),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('text', props.text),
  ns.is('link', props.link),
  ns.is('block', props.block),
  ns.is('vertical', isVertical.value),
  ns.is('custom-color', !!props.color)
])

// 自定义颜色样式增强
const buttonStyles = computed(() => {
  if (!props.color) return {}
  const color = props.color

  // 基础变量映射，具体点击/悬浮效果交由 CSS filter 处理以保证响应
  return {
    '--yh-button-bg-color': props.plain ? 'transparent' : color,
    '--yh-button-text-color': props.plain ? color : '#ffffff',
    '--yh-button-border-color': color,
    '--yh-button-hover-bg-color': color,
    '--yh-button-hover-text-color': '#ffffff',
    '--yh-button-hover-border-color': color,
    '--yh-button-active-bg-color': color,
    '--yh-button-active-border-color': color
  }
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

defineExpose<ButtonExpose>({
  ref: buttonRef as any,
  size: actualSize.value as any,
  type: props.type,
  disabled: props.disabled
})
</script>

<template>
  <component :is="tag" ref="buttonRef" :class="buttonClasses" :style="buttonStyles"
    :type="tag === 'button' ? nativeType : undefined" :disabled="disabled || loading" :autofocus="autofocus"
    @click="handleClick">
    <!-- 1. 加载图标 (优先级最高，存在时通常隐藏原图标) -->
    <template v-if="loading">
      <slot name="loading">
        <span :class="ns.e('loading-icon')">
          <svg :class="ns.e('loading-svg')" viewBox="0 0 1024 1024">
            <path fill="currentColor"
              d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z" />
          </svg>
        </span>
      </slot>
    </template>

    <!-- 2. 前置/上置图标 -->
    <span v-if="!loading && hasIcon && (iconPosition === 'left' || iconPosition === 'top')" :class="ns.e('icon')">
      <slot name="icon">
        <component :is="icon" v-if="icon && typeof icon !== 'string'" />
      </slot>
    </span>

    <!-- 3. 内容区 -->
    <span v-if="$slots.default" :class="ns.e('text')">
      <slot />
    </span>

    <!-- 4. 后置/下置图标 -->
    <span v-if="!loading && hasIcon && (iconPosition === 'right' || iconPosition === 'bottom')" :class="ns.e('icon')">
      <slot name="icon">
        <component :is="icon" v-if="icon && typeof icon !== 'string'" />
      </slot>
    </span>

    <!-- 5. 独立的后缀图标（suffixIcon 插槽） -->
    <span v-if="!loading && hasSuffixIcon" :class="ns.e('suffix-icon')">
      <slot name="suffixIcon">
        <component :is="suffixIcon" v-if="suffixIcon && typeof suffixIcon !== 'string'" />
      </slot>
    </span>
  </component>
</template>

<style lang="scss">
@use './button.scss';
</style>
