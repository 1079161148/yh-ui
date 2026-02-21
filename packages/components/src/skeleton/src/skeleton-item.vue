<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { skeletonItemProps } from './skeleton'

defineOptions({
  name: 'YhSkeletonItem'
})

const props = defineProps(skeletonItemProps)
const ns = useNamespace('skeleton-item')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('skeleton-item', computed(() => props.themeOverrides))

const style = computed(() => {
  const s: Record<string, any> = {
    ...themeStyle.value
  }
  if (props.width) {
    s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return s
})

const classes = computed(() => [
  ns.b(),
  ns.m(props.variant),
  ns.is('animated', props.animated),
  ns.is('round', props.round),
  ns.is('sharp', props.sharp)
])
</script>

<template>
  <div v-if="props.repeat > 1" style="display: contents">
    <div v-for="i in props.repeat" :key="i" :class="classes" :style="style">
      <slot v-if="variant === 'image'" name="image">
        <svg viewBox="0 0 1024 1024" width="24" height="24">
          <path fill="currentColor"
            d="M160 160v640h704V160H160zm704-64c35.3 0 64 28.7 64 64v640c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h704zM320 320a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM320 576a32 32 0 0 0-32 32v128h64v-64l128-128 160 160 128-128 96 96v-128h64v192c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64v-192h64v128l128-128 128 128 192-192 128 128v-64h-64z" />
        </svg>
      </slot>
    </div>
  </div>
  <div v-else :class="classes" :style="style">
    <slot v-if="variant === 'image'" name="image">
      <svg viewBox="0 0 1024 1024" width="24" height="24">
        <path fill="currentColor"
          d="M160 160v640h704V160H160zm704-64c35.3 0 64 28.7 64 64v640c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h704zM320 320a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM320 576a32 32 0 0 0-32 32v128h64v-64l128-128 160 160 128-128 96 96v-128h64v192c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64v-192h64v128l128-128 128 128 192-192 128 128v-64h-64z" />
      </svg>
    </slot>
  </div>
</template>

<style lang="scss">
@use './skeleton.scss';
</style>
