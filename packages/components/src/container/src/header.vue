<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { HeaderProps } from './container'

defineOptions({ name: 'YhHeader' })

const props = withDefaults(defineProps<HeaderProps>(), {
  height: '60px'
})

const ns = useNamespace('header')
const { themeStyle } = useComponentTheme('header', computed(() => props.themeOverrides))

const headerStyle = computed(() => ({
  ...themeStyle.value as Record<string, string>,
  height: props.height
}))
</script>

<template>
  <header :class="ns.b()" :style="headerStyle">
    <slot />
  </header>
</template>

<style lang="scss">
@use './container.scss';
</style>
