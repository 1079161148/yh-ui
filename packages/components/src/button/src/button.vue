<script setup lang="ts">
/**
 * YhButton - 按钮组件
 * @description 常用的操作按钮，支持多种类型、尺寸和状态，支持图标配置
 */
import { computed, ref, useSlots } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type { ButtonProps, ButtonEmits, ButtonExpose } from './button'

defineOptions({
  name: 'YhButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
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

// 按钮元素引用
const buttonRef = ref<HTMLButtonElement>()

// 是否有左侧图标
const hasIcon = computed(() => props.icon || slots.icon)

// 是否有右侧图标
const hasSuffixIcon = computed(() => props.suffixIcon || slots.suffixIcon)

// 是否为垂直布局
const isVertical = computed(() =>
  props.iconPosition === 'top' || props.iconPosition === 'bottom'
)

// 按钮类名
const buttonClasses = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('plain', props.plain),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('text', props.text),
  ns.is('link', props.link),
  ns.is('block', props.block),
  ns.is('has-icon', !!hasIcon.value),
  ns.is('has-suffix-icon', !!hasSuffixIcon.value),
  ns.is('vertical', isVertical.value),
  ns.is(`icon-${props.iconPosition}`, !!hasIcon.value && props.iconPosition !== 'left')
])

// 自定义颜色样式
const buttonStyles = computed(() => {
  if (!props.color) return {}

  const color = props.color

  if (props.plain) {
    return {
      '--yh-button-bg-color': 'transparent',
      '--yh-button-text-color': color,
      '--yh-button-border-color': color,
      '--yh-button-hover-bg-color': color,
      '--yh-button-hover-text-color': '#ffffff',
      '--yh-button-hover-border-color': color,
      '--yh-button-active-bg-color': color,
      '--yh-button-active-border-color': color
    }
  }

  return {
    '--yh-button-bg-color': color,
    '--yh-button-text-color': '#ffffff',
    '--yh-button-border-color': color,
    '--yh-button-hover-bg-color': color,
    '--yh-button-hover-text-color': '#ffffff',
    '--yh-button-hover-border-color': color,
    '--yh-button-active-bg-color': color,
    '--yh-button-active-border-color': color
  }
})

// 点击处理
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}

// 暴露的属性和方法
defineExpose<ButtonExpose>({
  ref: buttonRef.value,
  size: props.size,
  type: props.type,
  disabled: props.disabled
})
</script>

<template>
  <component :is="tag" ref="buttonRef" :class="buttonClasses" :style="buttonStyles"
    :type="tag === 'button' ? nativeType : undefined" :disabled="disabled || loading" :autofocus="autofocus"
    @click="handleClick">
    <!-- 加载状态 -->
    <template v-if="loading">
      <slot name="loading">
        <span :class="ns.e('loading-icon')">
          <svg :class="ns.e('loading-svg')" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
              d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z" />
          </svg>
        </span>
      </slot>
    </template>

    <!-- 顶部图标（垂直布局） -->
    <template v-if="!loading && iconPosition === 'top' && hasIcon">
      <span :class="ns.e('icon')">
        <slot name="icon">
          <component :is="icon" v-if="icon && typeof icon !== 'string'" />
        </slot>
      </span>
    </template>

    <!-- 左侧图标（默认） -->
    <template v-else-if="!loading && (iconPosition === 'left' || iconPosition === 'bottom') && hasIcon">
      <span :class="ns.e('icon')">
        <slot name="icon">
          <component :is="icon" v-if="icon && typeof icon !== 'string'" />
        </slot>
      </span>
    </template>

    <!-- 按钮内容 -->
    <span :class="ns.e('content')" v-if="$slots.default">
      <slot />
    </span>

    <!-- 右侧图标 -->
    <template v-if="!loading && iconPosition === 'right' && hasIcon">
      <span :class="ns.e('icon')">
        <slot name="icon">
          <component :is="icon" v-if="icon && typeof icon !== 'string'" />
        </slot>
      </span>
    </template>

    <!-- 后缀图标（独立的右侧图标） -->
    <template v-if="!loading && hasSuffixIcon">
      <span :class="ns.e('suffix-icon')">
        <slot name="suffixIcon">
          <component :is="suffixIcon" v-if="suffixIcon && typeof suffixIcon !== 'string'" />
        </slot>
      </span>
    </template>

    <!-- 底部图标（垂直布局） -->
    <template v-if="!loading && iconPosition === 'bottom' && hasIcon">
      <!-- 底部图标在内容之后渲染 -->
    </template>
  </component>
</template>

<style lang="scss">
@use './button.scss';
</style>
