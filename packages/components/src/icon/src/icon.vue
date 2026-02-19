<script setup lang="ts">
/**
 * YhIcon - 轻量级高性能图标组件
 * @description 支持 SVG 直接渲染、图标组件、图标注册等多种方式
 */
import { computed, h, useSlots } from 'vue'
import { iconProps, getIcon } from './icon'
import { useNamespace } from '@yh-ui/hooks'

defineOptions({
  name: 'YhIcon',
  inheritAttrs: false
})

const props = defineProps(iconProps)
const slots = useSlots()
const ns = useNamespace('icon')

// 计算样式
const iconStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    style.fontSize = size
    style.width = size
    style.height = size
  }

  if (props.color) {
    style.color = props.color
  }

  if (props.rotate) {
    style.transform = `rotate(${props.rotate}deg)`
  }

  return style
})

// 计算类名
const iconClass = computed(() => [
  ns.b(),
  {
    [ns.m('spin')]: props.spin
  }
])

// 获取 SVG 内容
const svgContent = computed(() => {
  // 优先使用 svg prop
  if (props.svg) {
    return props.svg
  }

  // 使用图标名称从注册表获取
  if (props.name) {
    const icon = getIcon(props.name)
    if (icon) {
      return icon.svg
    }
  }

  // 使用图标组件
  if (props.icon && '__svg' in (props.icon as { __svg?: string })) {
    return (props.icon as { __svg: string }).__svg
  }

  return ''
})

// 获取 viewBox
const viewBox = computed(() => {
  if (props.name) {
    const icon = getIcon(props.name)
    if (icon?.viewBox) {
      return icon.viewBox
    }
  }

  if (props.icon && '__viewBox' in (props.icon as { __viewBox?: string })) {
    return (props.icon as { __viewBox: string }).__viewBox
  }

  return '0 0 24 24'
})

// 是否有自定义插槽内容
const hasSlot = computed(() => !!slots.default)

// 是否使用图标组件
const useIconComponent = computed(() => {
  return props.icon && !('__svg' in (props.icon as object))
})
</script>

<template>
  <i :class="iconClass" :style="iconStyle" v-bind="$attrs">
    <!-- 使用传入的图标组件 -->
    <component v-if="useIconComponent" :is="icon" class="yh-icon__inner" />

    <!-- 使用 SVG 字符串渲染 -->
    <svg v-else-if="svgContent && !hasSlot" class="yh-icon__svg" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" v-html="svgContent" />

    <!-- 使用插槽自定义内容 -->
    <template v-else-if="hasSlot">
      <slot />
    </template>
  </i>
</template>

<style lang="scss">
@use './icon.scss';
</style>
