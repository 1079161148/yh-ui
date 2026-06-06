<script setup lang="ts">
/**
 * YhDropdownMenu - 下拉菜单容器
 */
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { dropdownMenuProps } from './dropdown'

defineOptions({
  name: 'YhDropdownMenu'
})

const props = defineProps(dropdownMenuProps)

const ns = useNamespace('dropdown')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('dropdown-menu', computed(() => props.themeOverrides))
</script>

<template>
  <div :class="ns.e('menu-wrapper')" :style="themeStyle">
    <slot />
  </div>
</template>

<style lang="scss">
@use './dropdown.scss';
</style>
