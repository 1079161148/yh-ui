<script setup lang="ts">
/**
 * YhSubMenu - 子菜单组件
 */
import { ref, inject, computed, provide, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { YhIcon } from '../../icon'
import { YhTooltip } from '../../tooltip'
import { subMenuProps, MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './menu'
import type { SubMenuContext } from './menu'

defineOptions({
  name: 'YhSubMenu'
})

const props = defineProps(subMenuProps)

const ns = useNamespace('sub-menu')
const menu = inject(MENU_INJECTION_KEY, null)
const parentSubMenu = inject(SUB_MENU_INJECTION_KEY, null)

// 当前层级
const level = computed(() => (parentSubMenu ? parentSubMenu.level + 1 : 0))

// 当前路径
const indexPath = computed(() => {
  if (parentSubMenu) {
    return [...parentSubMenu.indexPath, props.index as string]
  }
  return [props.index as string]
})

// 是否展开
const opened = ref(false)
const isOpened = computed(() => {
  if (menu) {
    if (menu.expandAll.value && menu.mode.value === 'vertical' && !menu.collapse.value) {
      return true
    }
    return menu.openedMenus.value.includes(props.index as string)
  }
  return opened.value
})

// 是否使用弹出模式
const isPopup = computed(() => {
  if (!menu) return false
  return menu.mode.value === 'horizontal' || (menu.mode.value === 'vertical' && menu.collapse.value)
})

// 标题样式
const titleStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (menu?.textColor.value) {
    styles.color = menu.textColor.value
  }

  // 垂直模式下的缩进
  if (menu?.mode.value === 'vertical' && !menu.collapse.value) {
    const isRoot = level.value === 0
    const indent = isRoot
      ? (menu.rootIndent.value ?? menu.indent.value ?? 32)
      : (menu.indent.value ?? 32)
    styles.paddingLeft = `${20 + level.value * indent}px`
  }

  return styles
})

// 弹出层位置
const popperPlacement = computed(() => {
  if (!menu) return 'right-start'
  if (menu.mode.value === 'horizontal') {
    return level.value === 0 ? 'bottom-start' : 'right-start'
  }
  return 'right-start'
})

// 定时器
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

// 合并属性 (优先使用 SubMenu 自身的，否则使用 Menu 全局的)
const mergedShowTimeout = computed(() => props.showTimeout ?? menu?.showTimeout.value ?? 300)
const mergedHideTimeout = computed(() => props.hideTimeout ?? menu?.hideTimeout.value ?? 300)
const mergedPopperOffset = computed(() => props.popperOffset ?? menu?.popperOffset.value ?? 6)
const mergedPopperClass = computed(() => {
  const classes = [ns.e('popper')]
  if (menu?.popperClass.value) classes.push(menu.popperClass.value)
  if (props.popperClass) classes.push(props.popperClass)
  return classes.join(' ')
})
const mergedPopperStyle = computed(() => {
  const style = menu?.popperStyle.value ?? {}
  return typeof style === 'string' ? {} : style // 强制返回对象以匹配 YhTooltip 类型
})
const mergedPopperEffect = computed(() => menu?.popperEffect.value ?? 'light')
const mergedCloseOnClickOutside = computed(() => menu?.closeOnClickOutside.value ?? true)

const clearTimers = () => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

// 处理鼠标进入
const handleMouseEnter = () => {
  if (props.disabled || !isPopup.value) return
  if (menu?.menuTrigger.value !== 'hover') return

  clearTimers()
  showTimer = setTimeout(() => {
    if (!isOpened.value) {
      menu?.handleOpen(props.index as string, indexPath.value)
    }
  }, mergedShowTimeout.value)
}

// 处理鼠标离开
const handleMouseLeave = () => {
  if (props.disabled || !isPopup.value) return
  if (menu?.menuTrigger.value !== 'hover') return

  clearTimers()
  hideTimer = setTimeout(() => {
    if (isOpened.value) {
      menu?.handleClose(props.index as string, indexPath.value)
    }
  }, mergedHideTimeout.value)
}

// 处理点击
const handleTitleClick = () => {
  if (props.disabled) return

  // 如果设置了 hover 触发，点击标题仅在非弹出模式下生效（或者您期望阻止点击切换）
  // 保持与业界一致：在弹出模式下，如果是 hover 触发，点击通常不直接收起
  if (isPopup.value && menu?.menuTrigger.value === 'hover') {
    return
  }

  if (isOpened.value) {
    menu?.handleClose(props.index as string, indexPath.value)
  } else {
    menu?.handleOpen(props.index as string, indexPath.value)
  }
}

// 是否激活
const isActive = computed(() => {
  if (!menu || !menu.activeIndex.value) return false
  const activeIndex = menu.activeIndex.value as string
  const selfIndex = props.index as string

  // 精确匹配逻辑：必须是相等，或者是以 selfIndex + 分隔符 开头
  // 这样可以避免 "1" 匹配到 "2-1" 的情况
  return activeIndex === selfIndex || activeIndex.startsWith(`${selfIndex}-`)
})

// 子菜单图标
const arrowIcon = computed(() => {
  if (menu?.mode.value === 'horizontal') {
    return level.value === 0 ? 'arrow-down' : 'arrow-right'
  }
  if (menu?.mode.value === 'vertical' && menu.collapse.value) {
    return 'arrow-right'
  }
  return 'arrow-down'
})

// 是否需要旋转图标 (只有向下箭头才旋转)
const shouldIconRotate = computed(() => arrowIcon.value === 'arrow-down')

provide<SubMenuContext>(SUB_MENU_INJECTION_KEY, {
  level: level.value,
  indexPath: indexPath.value
})

// 标题溢出检测逻辑改进
const titleContentRef = ref<HTMLElement | null>(null)
const isTitleOverflow = ref(false)

const checkTitleOverflow = () => {
  if (titleContentRef.value) {
    const el = titleContentRef.value
    // 当 scrollWidth > offsetWidth 时，说明内容被截断了
    isTitleOverflow.value = el.scrollWidth > el.offsetWidth
  }
}

let observer: ResizeObserver | null = null

onMounted(() => {
  checkTitleOverflow()
  if (titleContentRef.value) {
    observer = new ResizeObserver(checkTitleOverflow)
    observer.observe(titleContentRef.value)
  }
})

// 悬停时手动触发一次复核
const handleMouseEnterHeader = () => {
  checkTitleOverflow()
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

// 清理
onBeforeUnmount(() => {
  clearTimers()
  observer?.disconnect()
})
</script>

<template>
  <li :class="[
    ns.b(),
    ns.is('opened', isOpened),
    ns.is('active', isActive),
    ns.is('disabled', disabled),
    ns.is('popup', isPopup)
  ]" role="menuitem" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- 弹出模式 -->
    <template v-if="isPopup">
      <YhTooltip :visible="isOpened" :placement="popperPlacement" :z-index="menu?.popperZIndex.value"
        :teleported="menu?.teleported.value" :popper-class="mergedPopperClass" :popper-style="mergedPopperStyle"
        :offset="[0, mergedPopperOffset]" :show-arrow="false" :effect="mergedPopperEffect" trigger="click"
        :persistent="menu?.persistent.value">
        <div :class="ns.e('title')" :style="titleStyle" @click="handleTitleClick" @mouseenter="handleMouseEnterHeader">
          <YhTooltip :disabled="menu?.collapse.value || !isTitleOverflow" placement="top" effect="dark"
            :show-after="200" :show-arrow="true" style="flex: 1; min-width: 0; overflow: hidden;">
            <template #content>
              <div style="max-width: 300px; word-break: break-all;">
                <template v-if="renderLabelContent">
                  <template v-if="typeof renderLabelContent === 'string'">
                    {{ renderLabelContent }}
                  </template>
                  <component v-else :is="renderLabelContent" />
                </template>
                <template v-else>
                  <slot name="title">{{ props.label }}</slot>
                </template>
              </div>
            </template>
            <div :class="ns.e('title-content')">
              <template v-if="renderLabelContent">
                <div ref="titleContentRef" :class="ns.e('label')">
                  <template v-if="typeof renderLabelContent === 'string'">
                    {{ renderLabelContent }}
                  </template>
                  <component v-else :is="renderLabelContent" />
                </div>
              </template>
              <template v-else>
                <div ref="titleContentRef" :class="ns.e('label')">
                  <slot name="title">{{ props.label }}</slot>
                </div>
              </template>
            </div>
          </YhTooltip>
          <YhIcon :name="arrowIcon"
            :class="[ns.e('icon-arrow'), { [ns.is('opened')]: isOpened && shouldIconRotate }]" />
        </div>

        <template #content>
          <ul :class="ns.e('menu')" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <slot />
          </ul>
        </template>
      </YhTooltip>
    </template>

    <!-- 内联模式 -->
    <template v-else>
      <div :class="ns.e('title')" :style="titleStyle" @click="handleTitleClick" @mouseenter="handleMouseEnterHeader">
        <YhTooltip :disabled="menu?.collapse.value || !isTitleOverflow" placement="top" effect="dark" :show-after="200"
          :show-arrow="true" style="flex: 1; min-width: 0; overflow: hidden;">
          <template #content>
            <div style="max-width: 300px; word-break: break-all;">
              <template v-if="renderLabelContent">
                <template v-if="typeof renderLabelContent === 'string'">
                  {{ renderLabelContent }}
                </template>
                <component v-else :is="renderLabelContent" />
              </template>
              <template v-else>
                <slot name="title">{{ props.label }}</slot>
              </template>
            </div>
          </template>
          <div :class="ns.e('title-content')">
            <template v-if="renderLabelContent">
              <div ref="titleContentRef" :class="ns.e('label')">
                <template v-if="typeof renderLabelContent === 'string'">
                  {{ renderLabelContent }}
                </template>
                <component v-else :is="renderLabelContent" />
              </div>
            </template>
            <template v-else>
              <div ref="titleContentRef" :class="ns.e('label')">
                <slot name="title">{{ props.label }}</slot>
              </div>
            </template>
          </div>
        </YhTooltip>
        <YhIcon :name="arrowIcon" :class="[ns.e('icon-arrow'), { [ns.is('opened')]: isOpened && shouldIconRotate }]" />
      </div>

      <Transition name="yh-collapse">
        <ul v-show="isOpened" :class="ns.e('menu')">
          <slot />
        </ul>
      </Transition>
    </template>
  </li>
</template>

<style lang="scss">
@use './menu.scss';
</style>
