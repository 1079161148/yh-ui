<script setup lang="ts">
import { ref, computed, provide, watch, onMounted, nextTick } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { tabsProps, tabsEmits, TABS_INJECTION_KEY } from './tabs'
import type { TabPaneConfig } from './tabs'

defineOptions({
  name: 'YhTabs'
})

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)
const ns = useNamespace('tabs')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('tabs', computed(() => props.themeOverrides))

const panes = ref<TabPaneConfig[]>([])
const activeTab = ref<string | number>(props.modelValue)
const navRef = ref<HTMLElement>()
const indicatorRef = ref<HTMLElement>()

// 同步外部 v-model
watch(() => props.modelValue, (val: string | number) => {
  activeTab.value = val
})

// 注册/注销面板
const registerPane = (pane: TabPaneConfig) => {
  const index = panes.value.findIndex(p => p.name === pane.name)
  if (index === -1) {
    panes.value.push(pane)
  } else {
    panes.value[index] = pane
  }
}

const unregisterPane = (name: string) => {
  const index = panes.value.findIndex(p => p.name === name)
  if (index > -1) {
    panes.value.splice(index, 1)
  }
}

// 激活标签
const activateTab = async (name: string | number) => {
  if (name === activeTab.value) return
  if (props.beforeLeave) {
    try {
      const result = await props.beforeLeave(name, activeTab.value)
      if (result === false) return
    } catch {
      return
    }
  }
  activeTab.value = name
  emit('update:modelValue', name)
  emit('tab-change', name)
  nextTick(updateIndicator)
}

// hover 触发的防抖计时器
let hoverTimer: ReturnType<typeof setTimeout> | null = null

// 点击标签
const handleTabClick = (pane: TabPaneConfig, ev: Event) => {
  if (pane.disabled) return
  emit('tab-click', pane, ev)
  // 仅在 click 模式下触发切换
  if (props.trigger === 'click') {
    activateTab(pane.name)
  }
}

// hover 触发标签
const handleTabHover = (pane: TabPaneConfig) => {
  if (pane.disabled || props.trigger !== 'hover') return
  // 防抖处理，避免快速移动时频繁切换
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  hoverTimer = setTimeout(() => {
    activateTab(pane.name)
  }, 100)
}

// 关闭标签
const handleTabRemove = (pane: TabPaneConfig, ev: Event) => {
  ev.stopPropagation()
  emit('tab-remove', pane.name)
}

// 新增标签
const handleTabAdd = () => {
  emit('tab-add')
}

// 更新指示器位置
const updateIndicator = () => {
  if (!navRef.value || !indicatorRef.value || props.type !== 'line') return
  const activeEl = navRef.value.querySelector(`.${ns.e('item')}.${ns.is('active', true)}`) as HTMLElement
  if (!activeEl) return

  const isVertical = props.tabPosition === 'left' || props.tabPosition === 'right'

  // 先完全重置样式
  indicatorRef.value.style.width = ''
  indicatorRef.value.style.height = ''
  indicatorRef.value.style.transform = ''

  // 获取 CSS 变量默认值
  const computedStyle = getComputedStyle(navRef.value.closest(`.${ns.b()}`) as HTMLElement)
  const defaultIndicatorWidth = computedStyle.getPropertyValue('--yh-tabs-indicator-width').trim() || '40px'
  const defaultIndicatorHeight = computedStyle.getPropertyValue('--yh-tabs-indicator-height').trim() || '20px'

  // 使用 getBoundingClientRect 获取更准确的位置
  const navRect = navRef.value.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()

  if (isVertical) {
    // 垂直布局：height 为长度，width 为粗细
    const indicatorHeight = props.indicatorHeight || defaultIndicatorHeight
    const indicatorWidth = props.indicatorWidth || '2px'

    // 设置尺寸
    indicatorRef.value.style.width = indicatorWidth
    indicatorRef.value.style.height = indicatorHeight === 'auto' ? `${activeRect.height}px` : indicatorHeight

    // 强制重排以获取准确的尺寸
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    indicatorRef.value.offsetHeight

    // 计算位置
    const indicatorActualHeight = indicatorRef.value.offsetHeight
    const relativeTop = activeRect.top - navRect.top
    const offset = indicatorHeight === 'auto'
      ? relativeTop
      : relativeTop + (activeRect.height - indicatorActualHeight) / 2

    indicatorRef.value.style.transform = `translateY(${offset}px)`
  } else {
    // 水平布局：width 为长度，height 为粗细
    const indicatorWidth = props.indicatorWidth || defaultIndicatorWidth
    const indicatorHeight = props.indicatorHeight || '2px'

    // 设置尺寸
    indicatorRef.value.style.height = indicatorHeight
    indicatorRef.value.style.width = indicatorWidth === 'auto' ? `${activeRect.width}px` : indicatorWidth

    // 强制重排以获取准确的尺寸
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    indicatorRef.value.offsetWidth

    // 计算位置
    const indicatorActualWidth = indicatorRef.value.offsetWidth
    const relativeLeft = activeRect.left - navRect.left
    const offset = indicatorWidth === 'auto'
      ? relativeLeft
      : relativeLeft + (activeRect.width - indicatorActualWidth) / 2

    indicatorRef.value.style.transform = `translateX(${offset}px)`
  }
}

onMounted(() => {
  // 默认激活第一个未禁用的标签
  if (!activeTab.value && panes.value.length > 0) {
    const firstEnabled = panes.value.find(p => !p.disabled)
    if (firstEnabled) {
      activeTab.value = firstEnabled.name
      emit('update:modelValue', firstEnabled.name)
    }
  }
  nextTick(updateIndicator)
})

watch(panes, () => nextTick(updateIndicator), { deep: true })

// 监听 tabPosition 变化，重新计算指示器位置
// 需要等待 DOM 布局完成，使用双层 nextTick + requestAnimationFrame
watch(() => props.tabPosition, () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      updateIndicator()
    })
  })
})

// 监听指示器尺寸变化
watch(() => [props.indicatorWidth, props.indicatorHeight], () => nextTick(updateIndicator))

// 提供上下文给子组件
provide(TABS_INJECTION_KEY, {
  activeTab,
  registerPane,
  unregisterPane,
  activateTab
})

// 是否可关闭
const isClosable = computed(() => props.closable || props.editable)
const isAddable = computed(() => props.addable || props.editable)

// 类名计算
const tabsClass = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(`${props.tabPosition}`),
  ns.is('stretch', props.stretch)
])

// CSS 变量样式（颜色自定义）
const tabsStyle = computed(() => {
  const style: Record<string, string> = {
    ...themeStyle.value as any
  }
  if (props.activeColor) {
    style['--yh-tabs-active-color'] = props.activeColor
  }
  if (props.inactiveColor) {
    style['--yh-tabs-text-color'] = props.inactiveColor
  }
  return style
})

// 暴露方法给外部调用
defineExpose({
  /** 触发添加标签页事件 */
  addTab: handleTabAdd,
  /** 激活指定标签 */
  setActiveTab: activateTab,
  /** 当前激活的标签名 */
  activeTab
})
</script>

<template>
  <div :class="tabsClass" :style="tabsStyle">
    <!-- 标签栏 -->
    <div ref="navRef" :class="[ns.e('nav'), navClass]">
      <div :class="ns.e('nav-wrap')">
        <div :class="ns.e('nav-list')">
          <div v-for="pane in panes" :key="pane.name" :class="[
            ns.e('item'),
            ns.is('active', activeTab === pane.name),
            ns.is('disabled', pane.disabled),
            ns.is('closable', pane.closable !== false && isClosable)
          ]" role="tab" :tabindex="pane.disabled ? -1 : 0" :aria-selected="activeTab === pane.name"
            @click="handleTabClick(pane, $event)" @keydown.enter="handleTabClick(pane, $event)"
            @mouseenter="handleTabHover(pane)">
            <!-- 图标 -->
            <span v-if="pane.icon" :class="[ns.e('icon'), pane.icon]"></span>
            <!-- 标签插槽 -->
            <slot name="label" :pane="pane">
              <span :class="ns.e('label')">{{ pane.label }}</span>
            </slot>
            <!-- 关闭按钮 -->
            <span v-if="pane.closable !== false && isClosable && !pane.disabled" :class="ns.e('close')"
              @click.stop="handleTabRemove(pane, $event)">
              <svg viewBox="0 0 1024 1024" width="14" height="14">
                <path fill="currentColor"
                  d="M764.3 260.3a32 32 0 0 0-45.3 0L512 467.2 305 260.3a32 32 0 0 0-45.3 45.2L466.8 512 259.7 718.5a32 32 0 0 0 45.3 45.3L512 556.7l207 207a32 32 0 0 0 45.3-45.2L557.2 512l207-206.5a32 32 0 0 0 0-45.2z" />
              </svg>
            </span>
          </div>
          <!-- 新增按钮 -->
          <div v-if="isAddable" :class="ns.e('add')" @click="handleTabAdd">
            <slot name="add-icon">
              <svg viewBox="0 0 1024 1024" width="16" height="16">
                <path fill="currentColor"
                  d="M544 480V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64H544z" />
              </svg>
            </slot>
          </div>
        </div>
        <!-- Line 类型指示器 -->
        <div v-if="type === 'line'" ref="indicatorRef" :class="ns.e('indicator')"></div>
      </div>
    </div>
    <!-- 内容区 -->
    <div :class="[ns.e('content'), contentClass]">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './tabs.scss';
</style>
