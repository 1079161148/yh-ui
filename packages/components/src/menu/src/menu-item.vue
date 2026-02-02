<script setup lang="ts">
/**
 * YhMenuItem - 菜单项组件
 */
import { inject, computed, ref, onMounted } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { YhTooltip } from '../../tooltip'
import { menuItemProps, MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './menu'

defineOptions({
  name: 'YhMenuItem'
})

const props = defineProps(menuItemProps)

const ns = useNamespace('menu-item')
const menu = inject(MENU_INJECTION_KEY, null)
const subMenu = inject(SUB_MENU_INJECTION_KEY, null)

// 计算当前路径
const indexPath = computed(() => {
  if (subMenu) {
    return [...subMenu.indexPath, props.index as string]
  }
  return [props.index as string]
})

// 是否激活
const isActive = computed(() => menu?.activeIndex.value === props.index)

// 菜单项样式
const itemStyle = computed(() => {
  const styles: Record<string, string> = {}

  // 垂直模式下的缩进
  if (menu?.mode.value === 'vertical' && !menu.collapse.value) {
    const level = subMenu ? subMenu.level + 1 : 0
    const isRoot = level === 0
    const indent = isRoot
      ? (menu.rootIndent.value ?? menu.indent.value ?? 32)
      : (menu.indent.value ?? 32)
    styles.paddingLeft = `${20 + level * indent}px`
  }

  return styles
})

// 处理点击
const handleClick = () => {
  if (props.disabled) return
  menu?.handleSelect(props.index as string, indexPath.value)
}

// 溢出检测逻辑改进
const contentRef = ref<HTMLElement | null>(null)
const isOverflow = ref(false)

const checkOverflow = () => {
  if (contentRef.value) {
    const el = contentRef.value
    // 当 scrollWidth > offsetWidth 时，说明内容被截断了
    isOverflow.value = el.scrollWidth > el.offsetWidth
  }
}

let observer: ResizeObserver | null = null

onMounted(() => {
  checkOverflow()
  if (contentRef.value) {
    observer = new ResizeObserver(checkOverflow)
    observer.observe(contentRef.value)
  }
})

import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  observer?.disconnect()
})

// 悬停时手动触发一次复核，确保极端情况下的准确性
const handleMouseEnter = () => {
  checkOverflow()
}

// 自定义渲染内容
const renderLabelContent = computed(() => {
  if (menu?.renderLabel?.value) {
    return menu.renderLabel.value({
      index: props.index as string,
      label: props.label
    })
  }
  return null
})
</script>

<template>
  <li :class="[
    ns.b(),
    {
      [ns.is('active')]: isActive,
      [ns.is('disabled')]: disabled
    }
  ]" :style="itemStyle" role="menuitem" :tabindex="disabled ? -1 : 0" @click="handleClick"
    @mouseenter="handleMouseEnter" @keydown.enter="handleClick">
    <YhTooltip :content="props.label || ''" :disabled="menu?.collapse.value ? false : !isOverflow"
      :placement="menu?.collapse.value ? 'right' : 'top'" effect="dark" :show-after="200" :show-arrow="true"
      style="flex: 1; min-width: 0; overflow: hidden;">
      <template #content>
        <div style="max-width: 300px; word-break: break-all;">
          <template v-if="renderLabelContent">
            <template v-if="typeof renderLabelContent === 'string'">
              {{ renderLabelContent }}
            </template>
            <component v-else :is="renderLabelContent" />
          </template>
          <template v-else>
            <slot>{{ props.label }}</slot>
          </template>
        </div>
      </template>
      <div :class="ns.e('content')">
        <template v-if="renderLabelContent">
          <div ref="contentRef" :class="ns.e('label')">
            <template v-if="typeof renderLabelContent === 'string'">
              {{ renderLabelContent }}
            </template>
            <component v-else :is="renderLabelContent" />
          </div>
        </template>
        <template v-else>
          <div ref="contentRef" :class="ns.e('label')">
            <slot>{{ props.label }}</slot>
          </div>
        </template>
      </div>
    </YhTooltip>
  </li>
</template>
