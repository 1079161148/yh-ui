<script setup lang="ts">
import { inject } from 'vue'
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
const keyField = menu?.keyField.value || 'key'
const labelField = menu?.labelField.value || 'label'
</script>

<template>
  <!-- 分组模式 -->
  <yh-menu-item-group v-if="item.group" :title="item[labelField] || item.label">
    <yh-menu-recursive-item v-for="child in item.children" :key="child[keyField] || child.index" :item="child" />
  </yh-menu-item-group>

  <!-- 子菜单模式 -->
  <yh-sub-menu v-else-if="item.children && item.children.length > 0" :index="item[keyField] || item.index"
    :label="item[labelField] || item.label" :disabled="item.disabled">
    <template #title v-if="item.icon">
      <yh-icon :name="item.icon" />
      <span>{{ item[labelField] || item.label }}</span>
    </template>
    <!-- 递归渲染子项 -->
    <yh-menu-recursive-item v-for="child in item.children" :key="child[keyField] || child.index" :item="child" />
  </yh-sub-menu>

  <!-- 普通菜单项 -->
  <yh-menu-item v-else :index="item[keyField] || item.index" :label="item[labelField] || item.label"
    :disabled="item.disabled">
    <template v-if="item.icon" #default>
      <yh-icon :name="item.icon" />
      <span>{{ item[labelField] || item.label }}</span>
    </template>
  </yh-menu-item>
</template>

<style lang="scss">
@use './menu.scss';
</style>
