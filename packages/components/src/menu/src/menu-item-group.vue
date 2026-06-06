<script setup lang="ts">
/**
 * YhMenuItemGroup - 菜单分组组件
 */
import { useNamespace } from '@yh-ui/hooks'
import { menuItemGroupProps } from './menu'

defineOptions({
  name: 'YhMenuItemGroup'
})

defineProps(menuItemGroupProps)

const ns = useNamespace('menu-item-group')
</script>

<template>
  <li :class="ns.b()" role="group">
    <div :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <ul :class="ns.e('list')">
      <slot />
    </ul>
  </li>
</template>

<style lang="scss">
@use './menu.scss';
</style>
