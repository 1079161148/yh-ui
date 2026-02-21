<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { MainProps } from './container'

defineOptions({ name: 'YhMain' })

const props = defineProps<MainProps>()

const ns = useNamespace('main')
const { themeStyle } = useComponentTheme('main', computed(() => props.themeOverrides))
</script>

<template>
  <main :class="ns.b()" :style="themeStyle">
    <slot />
  </main>
</template>

<style lang="scss">
@use './container.scss';
</style>
