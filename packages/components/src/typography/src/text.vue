<script setup lang="ts">
/**
 * YhTypographyText - 文本组件
 */
import { computed } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { useComponentTheme } from '@yh-ui/theme'
import type { TypographyTextProps } from './typography'

defineOptions({ name: 'YhTypographyText' })

const props = withDefaults(defineProps<TypographyTextProps>(), {
  tag: 'span',
  bold: false,
  delete: false,
  underline: false,
  italic: false,
  mark: false,
  code: false,
  keyboard: false,
  ellipsis: false
})

const ns = useNamespace('typography')
const { themeStyle } = useComponentTheme('typography', computed(() => props.themeOverrides))

const textClasses = computed(() => [
  ns.e('text'),
  props.type && ns.em('text', props.type),
  props.size && ns.em('text', props.size),
  props.bold && ns.is('bold'),
  props.delete && ns.is('delete'),
  props.underline && ns.is('underline'),
  props.italic && ns.is('italic'),
  props.code && ns.is('code'),
  props.keyboard && ns.is('keyboard'),
  props.ellipsis && ns.is('ellipsis')
])
</script>

<template>
  <component :is="tag" :class="textClasses" :style="themeStyle">
    <mark v-if="mark">
      <slot />
    </mark>
    <code v-else-if="code"><slot /></code>
    <kbd v-else-if="keyboard">
      <slot />
    </kbd>
    <slot v-else />
  </component>
</template>

<style lang="scss">
@use './typography.scss';
</style>
