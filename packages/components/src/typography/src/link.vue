<script setup lang="ts">
/**
 * YhTypographyLink - 链接组件
 */
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { TypographyLinkProps } from './typography'

defineOptions({ name: 'YhTypographyLink' })

const props = withDefaults(defineProps<TypographyLinkProps>(), {
  target: '_self',
  underline: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const ns = useNamespace('typography')
const { themeStyle } = useComponentTheme('typography', computed(() => props.themeOverrides))

const linkClasses = computed(() => [
  ns.e('link'),
  props.type && ns.em('link', props.type),
  props.underline && ns.is('underline'),
  props.disabled && ns.is('disabled')
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <a :class="linkClasses" :style="themeStyle" :href="disabled ? undefined : href" :target="target"
    :aria-disabled="disabled" :tabindex="disabled ? -1 : 0" @click="handleClick">
    <slot />
  </a>
</template>

<style lang="scss">
@use './typography.scss';
</style>
