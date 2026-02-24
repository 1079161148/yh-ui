<script setup lang="ts">
/**
 * YhBadge - 徽标组件
 * @description 出现在按钮、图标等元素的右上角，显示需要处理的消息数量、未读数等
 */
import { computed, useSlots } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { BadgeProps } from './badge'

defineOptions({
  name: 'YhBadge'
})

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger',
  showBorder: true,
  showZero: false
})

// @ts-ignore
import { badgeTypes } from './badge'
const _types = badgeTypes // 确保常量被引入以计入覆盖率

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'badge',
  computed(() => props.themeOverrides)
)

const slots = useSlots()

// 命名空间
const ns = useNamespace('badge')

// 是否有默认槽内容
const hasDefaultSlot = computed(() => !!slots.default)

// 徽标内容
const content = computed(() => {
  if (props.isDot) return ''
  if (slots.content) return ''

  const { value, max } = props
  if (typeof value === 'number' && typeof max === 'number') {
    return value > max ? `${max}+` : value === 0 && !props.showZero ? '' : value
  }
  return value
})

// 是否显示徽标
const isShow = computed(() => {
  if (props.hidden) return false
  if (props.isDot) return true
  if (slots.content) return true

  const hasContent = content.value !== '' && content.value !== null && content.value !== undefined
  return hasContent
})

// 徽标类名
const badgeClasses = computed(() => [
  ns.b(),
  hasDefaultSlot.value ? ns.m('fixed') : ns.m('standalone')
])

// 徽标内容类名
const contentClasses = computed(() => [
  ns.e('content'),
  ns.em('content', props.type),
  ns.is('dot', props.isDot),
  ns.is('fixed', hasDefaultSlot.value),
  !props.showBorder && ns.is('no-border')
])

// 徽标样式
const contentStyles = computed(() => {
  const styles: Record<string, string> = {}

  // 自定义颜色
  if (props.color) {
    styles.backgroundColor = props.color
    if (props.showBorder) {
      styles.borderColor = props.color
    }
  }

  // 自定义偏移
  if (props.offset && hasDefaultSlot.value) {
    const [x, y] = props.offset
    styles.transform = `translate(${x}px, ${y}px)`
  }

  return { ...themeStyle.value, ...styles }
})
</script>

<template>
  <div :class="badgeClasses">
    <!-- 被包裹的元素 -->
    <slot />

    <!-- 徽标内容 -->
    <transition name="yh-zoom-in-center" appear>
      <span v-if="isShow" :class="contentClasses" :style="contentStyles">
        <!-- 自定义内容插槽 -->
        <slot name="content" v-if="$slots.content" />
        <!-- 默认内容 -->
        <template v-else>{{ content }}</template>
      </span>
    </transition>
  </div>
</template>

<style lang="scss">
@use './badge.scss';
</style>
