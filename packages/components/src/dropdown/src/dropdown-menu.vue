<script setup lang="ts">
/**
 * YhDropdownMenu - 下拉菜单容器
 */
import { useNamespace } from '@yh-ui/hooks'
import { dropdownMenuProps } from './dropdown'

defineOptions({
  name: 'YhDropdownMenu'
})

defineProps(dropdownMenuProps)

const ns = useNamespace('dropdown')
</script>

<template>
  <div :class="ns.e('menu-wrapper')">
    <slot />
  </div>
</template>

<style lang="scss">
@use './dropdown.scss';
</style>
