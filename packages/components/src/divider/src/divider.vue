<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { dividerProps } from './divider'

defineOptions({
  name: 'YhDivider'
})

const props = defineProps(dividerProps)
const ns = useNamespace('divider')

const dividerStyle = computed(() => {
  const styles: Record<string, string> = {
    '--yh-border-style': props.borderStyle
  }
  if (props.color) {
    styles['--yh-divider-color'] = props.color
  }
  if (props.borderWidth) {
    styles['--yh-divider-width'] = typeof props.borderWidth === 'number'
      ? `${props.borderWidth}px`
      : props.borderWidth
  }
  return styles
})

const classes = computed(() => [
  ns.b(),
  ns.m(props.direction),
  props.contentPosition !== 'center' ? ns.m(`content-${props.contentPosition}`) : ''
])
</script>

<template>
  <div :class="classes" :style="dividerStyle" role="separator">
    <div v-if="$slots.default && direction !== 'vertical'" :class="[ns.e('text'), ns.is(contentPosition)]">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './divider.scss';
</style>
