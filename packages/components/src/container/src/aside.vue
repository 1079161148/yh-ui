<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { useComponentTheme } from '@yh-ui/theme'
import type { AsideProps } from './container'

defineOptions({ name: 'YhAside' })

const props = withDefaults(defineProps<AsideProps>(), {
  width: '200px'
})

const ns = useNamespace('aside')
const { themeStyle } = useComponentTheme('aside', computed(() => props.themeOverrides))

const asideStyle = computed(() => ({
  ...themeStyle.value as Record<string, string>,
  width: props.width
}))
</script>

<template>
  <aside :class="ns.b()" :style="asideStyle">
    <slot />
  </aside>
</template>

<style lang="scss">
@use './container.scss';
</style>
