<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { FooterProps } from './container'

defineOptions({ name: 'YhFooter' })

const props = withDefaults(defineProps<FooterProps>(), {
  height: '60px'
})

const ns = useNamespace('footer')
const { themeStyle } = useComponentTheme('footer', computed(() => props.themeOverrides))

const footerStyle = computed(() => ({
  ...themeStyle.value as Record<string, string>,
  height: props.height
}))
</script>

<template>
  <footer :class="ns.b()" :style="footerStyle">
    <slot />
  </footer>
</template>

<style lang="scss">
@use './container.scss';
</style>
