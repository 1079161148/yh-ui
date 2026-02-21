<script setup lang="ts">
/**
 * YhTypographyTitle - 标题组件
 */
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { TypographyTitleProps } from './typography'

defineOptions({ name: 'YhTypographyTitle' })

const props = withDefaults(defineProps<TypographyTitleProps>(), {
  level: 1,
  bold: true,
  delete: false,
  underline: false,
  italic: false,
  mark: false,
  code: false,
  ellipsis: false
})

const ns = useNamespace('typography')
const { themeStyle } = useComponentTheme('typography', computed(() => props.themeOverrides))

const tagName = computed(() => props.tag || `h${props.level}`)

const titleClasses = computed(() => [
  ns.e('title'),
  ns.em('title', `h${props.level}`),
  props.type && ns.em('title', props.type),
  props.bold && ns.is('bold'),
  props.delete && ns.is('delete'),
  props.underline && ns.is('underline'),
  props.italic && ns.is('italic'),
  props.mark && ns.is('mark'),
  props.code && ns.is('code'),
  props.ellipsis && ns.is('ellipsis')
])
</script>

<template>
  <component :is="tagName" :class="titleClasses" :style="themeStyle">
    <mark v-if="mark">
      <slot />
    </mark>
    <code v-else-if="code"><slot /></code>
    <slot v-else />
  </component>
</template>

<style lang="scss">
@use './typography.scss';
</style>
