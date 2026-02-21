<script setup lang="ts">
/**
 * YhTypographyParagraph - 段落组件
 */
import { computed } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { useComponentTheme } from '@yh-ui/theme'
import type { TypographyParagraphProps } from './typography'

defineOptions({ name: 'YhTypographyParagraph' })

const props = withDefaults(defineProps<TypographyParagraphProps>(), {
  bold: false,
  delete: false,
  italic: false,
  mark: false,
  ellipsis: false,
  spacing: 'default'
})

const ns = useNamespace('typography')
const { themeStyle } = useComponentTheme('typography', computed(() => props.themeOverrides))

const paragraphClasses = computed(() => [
  ns.e('paragraph'),
  props.type && ns.em('paragraph', props.type),
  props.align && ns.em('paragraph', props.align),
  props.spacing && ns.em('paragraph', props.spacing),
  props.bold && ns.is('bold'),
  props.delete && ns.is('delete'),
  props.italic && ns.is('italic'),
  props.ellipsis && ns.is('ellipsis')
])

const ellipsisStyle = computed(() => {
  if (typeof props.ellipsis === 'number' && props.ellipsis > 1) {
    return {
      display: '-webkit-box',
      WebkitLineClamp: props.ellipsis,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden'
    }
  }
  return {}
})
</script>

<template>
  <p :class="paragraphClasses" :style="{ ...themeStyle as Record<string, string>, ...ellipsisStyle }">
    <mark v-if="mark">
      <slot />
    </mark>
    <slot v-else />
  </p>
</template>

<style lang="scss">
@use './typography.scss';
</style>
