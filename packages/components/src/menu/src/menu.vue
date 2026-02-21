<script setup lang="ts">
/**
 * YhMenu - 菜单组件
 */
import { ref, computed, provide, toRef, watch } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { menuProps, menuEmits, MENU_INJECTION_KEY } from './menu'
import type { MenuContext, MenuEmits } from './menu'
import YhMenuRecursiveItem from './menu-recursive-item.vue'

defineOptions({
  name: 'YhMenu'
})

const props = defineProps(menuProps)
const emit = defineEmits(menuEmits as MenuEmits)

const ns = useNamespace('menu')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('menu', computed(() => props.themeOverrides))

// 状态
const activeIndex = ref(props.value ?? props.defaultActive)
const openedMenus = ref<string[]>([...(props.defaultOpeneds || [])])

// 计算容器样式
const menuStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.backgroundColor) {
    styles['--yh-menu-bg-color'] = props.backgroundColor
  }
  if (props.textColor) {
    styles['--yh-menu-text-color'] = props.textColor
  }
  if (props.activeTextColor) {
    styles['--yh-menu-active-text-color'] = props.activeTextColor
  }
  if (props.iconSize) {
    styles['--yh-menu-icon-size'] = typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
  }
  return {
    ...styles,
    ...themeStyle.value as any
  }
})

// 计算类名
const menuClass = computed(() => [
  ns.b(),
  ns.m(props.mode),
  {
    [ns.m('collapse')]: props.collapse && props.mode === 'vertical',
    [ns.is('ellipsis')]: props.ellipsis && props.mode === 'horizontal',
    [ns.m('inverted')]: props.inverted
  }
])

// 处理菜单项选择
const handleSelect = (index: string, indexPath: string[]) => {
  activeIndex.value = index
  emit('update:value', index)
  emit('select', index, indexPath, undefined)
}

// 处理子菜单展开
const handleOpen = (index: string, indexPath: string[]) => {
  if (props.uniqueOpened) {
    openedMenus.value = openedMenus.value.filter(
      (openedIndex) => indexPath.includes(openedIndex) || openedMenus.value.indexOf(openedIndex) === -1
    )
  }

  if (!openedMenus.value.includes(index)) {
    openedMenus.value.push(index)
  }

  emit('open', index, indexPath)
}

// 处理子菜单收起
const handleClose = (index: string, indexPath: string[]) => {
  const i = openedMenus.value.indexOf(index)
  if (i !== -1) {
    openedMenus.value.splice(i, 1)
  }
  emit('close', index, indexPath)
}

// 提供上下文
provide<MenuContext>(MENU_INJECTION_KEY, {
  mode: toRef(props, 'mode'),
  activeIndex,
  openedMenus,
  collapse: toRef(props, 'collapse'),
  backgroundColor: toRef(props, 'backgroundColor'),
  textColor: toRef(props, 'textColor'),
  activeTextColor: toRef(props, 'activeTextColor'),
  uniqueOpened: toRef(props, 'uniqueOpened'),
  menuTrigger: toRef(props, 'menuTrigger'),
  popperZIndex: toRef(props, 'popperZIndex'),
  teleported: toRef(props, 'teleported'),
  gap: toRef(props, 'gap'),
  iconSize: toRef(props, 'iconSize'),
  indent: toRef(props, 'indent'),
  inverted: toRef(props, 'inverted'),
  keyField: toRef(props, 'keyField'),
  labelField: toRef(props, 'labelField'),
  popperOffset: toRef(props, 'popperOffset'),
  popperEffect: toRef(props, 'popperEffect'),
  popperClass: toRef(props, 'popperClass'),
  popperStyle: toRef(props, 'popperStyle'),
  showTimeout: toRef(props, 'showTimeout'),
  hideTimeout: toRef(props, 'hideTimeout'),
  persistent: toRef(props, 'persistent'),
  ellipsisIcon: toRef(props, 'ellipsisIcon'),
  closeOnClickOutside: toRef(props, 'closeOnClickOutside'),
  expandAll: toRef(props, 'expandAll'),
  rootIndent: toRef(props, 'rootIndent'),
  renderExtra: toRef(props, 'renderExtra'),
  renderIcon: toRef(props, 'renderIcon'),
  renderLabel: toRef(props, 'renderLabel'),
  responsive: toRef(props, 'responsive'),
  value: toRef(props, 'value'),
  options: toRef(props, 'options'),
  handleSelect,
  handleOpen,
  handleClose
})

// 监听 value 变化 (v-model)
watch(
  () => props.value,
  (val) => {
    if (val !== undefined) {
      activeIndex.value = val ?? ''
    }
  }
)

// 监听 defaultActive 变化
watch(
  () => props.defaultActive,
  (val) => {
    activeIndex.value = val
  }
)

// 暴露方法
defineExpose({
  open: (index: string) => handleOpen(index, [index]),
  close: (index: string) => handleClose(index, [index]),
  activeIndex,
  openedMenus
})
</script>

<template>
  <ul :class="menuClass" :style="menuStyle" role="menu">
    <slot>
      <yh-menu-recursive-item v-for="item in options" :key="item[keyField] || item.index" :item="item" />
    </slot>
  </ul>
</template>

<style lang="scss">
@use './menu.scss';
</style>
