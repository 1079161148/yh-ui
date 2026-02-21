<script setup lang="ts">
/**
 * YhCard - 卡片组件
 * @description 通用卡片容器，承载文字、列表、图片、段落等内容
 */
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useConfig } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { ComponentThemeVars } from '@yh-ui/theme'
import type { CardProps } from './card'

defineOptions({
  name: 'YhCard'
})

const props = withDefaults(defineProps<CardProps>(), {
  shadow: 'always',
  bordered: true,
  hoverable: false,
  size: 'default',
  loading: false,
  bodyPadding: true
})

// 命名空间
const ns = useNamespace('card')

// 全局配置
const { globalSize } = useConfig()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('card', computed(() => props.themeOverrides))

// 卡片类名
const cardClasses = computed(() => [
  ns.b(),
  ns.m(props.shadow),
  ns.m(props.size || globalSize.value || 'default'),
  ns.is('bordered', props.bordered),
  ns.is('hoverable', props.hoverable),
  ns.is('loading', props.loading)
])

// 卡片头部类名
const headerClasses = computed(() => [ns.e('header')])

// 卡片内容类名
const bodyClasses = computed(() => [
  ns.e('body'),
  !props.bodyPadding && ns.em('body', 'no-padding')
])

// 卡片底部类名
const footerClasses = computed(() => [ns.e('footer')])
</script>

<template>
  <div :class="cardClasses" :style="themeStyle">
    <!-- 加载状态 -->
    <div v-if="loading" :class="ns.e('loading')">
      <div :class="ns.e('loading-content')">
        <div :class="ns.e('skeleton-header')"></div>
        <div :class="ns.e('skeleton-paragraph')">
          <div :class="ns.e('skeleton-line')"></div>
          <div :class="ns.e('skeleton-line')"></div>
          <div :class="ns.e('skeleton-line')"></div>
        </div>
      </div>
    </div>

    <!-- 正常内容 -->
    <template v-else>
      <!-- 卡片头部 -->
      <div v-if="$slots.header || header || $slots.extra" :class="headerClasses" :style="headerStyle">
        <div :class="ns.e('header-wrapper')">
          <div :class="ns.e('header-title')">
            <slot name="header">{{ header }}</slot>
          </div>
          <div v-if="$slots.extra" :class="ns.e('header-extra')">
            <slot name="extra" />
          </div>
        </div>
      </div>

      <!-- 卡片主体 -->
      <div :class="bodyClasses" :style="bodyStyle">
        <slot />
      </div>

      <!-- 卡片底部 -->
      <div v-if="$slots.footer" :class="footerClasses">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use './card.scss';
</style>
