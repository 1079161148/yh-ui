<script setup lang="ts">
import { inject, unref } from 'vue'
import { YhIcon } from '../../icon'
import YhMenuItem from './menu-item.vue'
import YhSubMenu from './sub-menu.vue'
import YhMenuItemGroup from './menu-item-group.vue'
import { MENU_INJECTION_KEY } from './menu'
import type { MenuItemData } from './menu'

defineOptions({
  name: 'YhMenuRecursiveItem'
})

defineProps<{
  item: MenuItemData
}>()

const menu = inject(MENU_INJECTION_KEY)
const keyField = (unref(menu?.keyField) || 'key') as string
const labelField = (unref(menu?.labelField) || 'label') as string
</script>

<template>
  <!-- 分组模式 -->
  <yh-menu-item-group
    v-if="item.group"
    :title="(item[labelField] as string) || (item.label as string) || ''"
  >
    <yh-menu-recursive-item
      v-for="(child, idx) in item.children"
      :key="(child[keyField] as string) || child.index || idx || ''"
      :item="child"
    />
  </yh-menu-item-group>

  <!-- 子菜单模式 -->
  <yh-sub-menu
    v-else-if="item.children && item.children.length > 0"
    :index="(item[keyField] as string) || item.index || ''"
    :label="(item[labelField] as string) || item.label || ''"
    :disabled="item.disabled"
  >
    <template v-if="item.icon" #title>
      <yh-icon :name="item.icon" />
      <span>{{ (item[labelField] as string) || item.label }}</span>
    </template>
    <!-- 递归渲染子项 -->
    <yh-menu-recursive-item
      v-for="(child, idx) in item.children"
      :key="(child[keyField] as string) || child.index || idx || ''"
      :item="child"
    />
  </yh-sub-menu>

  <!-- 普通菜单项 -->
  <yh-menu-item
    v-else
    :index="(item[keyField] as string) || item.index || ''"
    :label="(item[labelField] as string) || item.label || ''"
    :disabled="item.disabled"
  >
    <template v-if="item.icon" #default>
      <yh-icon :name="item.icon" />
      <span>{{ (item[labelField] as string) || item.label }}</span>
    </template>
  </yh-menu-item>
</template>

<style lang="scss">
@use './menu.scss';
</style>
