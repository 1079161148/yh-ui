<script setup lang="ts">
/**
 * YhResult - 结果反馈组件
 */
import { computed } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { useComponentTheme } from '@yh-ui/theme'
import type { ResultProps } from './result'

defineOptions({ name: 'YhResult' })

const props = withDefaults(defineProps<ResultProps>(), {
  icon: 'info'
})

const ns = useNamespace('result')
const { themeStyle } = useComponentTheme('result', computed(() => props.themeOverrides))

const iconColorMap: Record<string, string> = {
  success: 'var(--yh-color-success, #67c23a)',
  warning: 'var(--yh-color-warning, #e6a23c)',
  error: 'var(--yh-color-danger, #f56c6c)',
  info: 'var(--yh-color-info, #909399)'
}

const iconColor = computed(() => iconColorMap[props.icon] || iconColorMap.info)

/** SVG icon paths for each type */
const iconPaths: Record<string, string> = {
  success: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 451.2a8 8 0 016.5-12.6h46.9a32 32 0 0125.7 12.8L454 533.3l171.3-237.6c6-8.3 15.6-13.3 25.7-13.3h46.9a8 8 0 016.5 12.6z',
  warning: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48 48 0 110-96 48 48 0 010 96z',
  error: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z',
  info: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-360a48 48 0 110-96 48 48 0 010 96z'
}
</script>

<template>
  <div :class="ns.b()" :style="themeStyle" role="status">
    <!-- 图标区 -->
    <div :class="[ns.e('icon'), ns.em('icon', icon)]">
      <slot name="icon">
        <svg viewBox="0 0 1024 1024" width="72" height="72" :fill="iconColor" xmlns="http://www.w3.org/2000/svg">
          <path :d="iconPaths[icon]" />
        </svg>
      </slot>
    </div>

    <!-- 标题区 -->
    <div v-if="title || $slots.title" :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>

    <!-- 副标题区 -->
    <div v-if="subTitle || $slots['sub-title']" :class="ns.e('subtitle')">
      <slot name="sub-title">{{ subTitle }}</slot>
    </div>

    <!-- 额外内容 -->
    <div v-if="$slots.extra" :class="ns.e('extra')">
      <slot name="extra" />
    </div>

    <!-- 默认插槽（操作区） -->
    <div v-if="$slots.default" :class="ns.e('actions')">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './result.scss';
</style>
