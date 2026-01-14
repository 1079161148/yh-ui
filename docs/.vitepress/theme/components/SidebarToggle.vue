<script setup lang="ts">
/**
 * SidebarToggle - 侧边栏折叠按钮
 * @description Naive UI 风格的侧边栏折叠按钮
 */
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'

const isCollapsed = ref(false)
const buttonLeft = ref(220)
const isHovering = ref(false)

// 从 localStorage 读取状态
onMounted(() => {
  const savedState = localStorage.getItem('yh-ui-sidebar-collapsed')
  if (savedState === 'true') {
    isCollapsed.value = true
    updateSidebarState(true)
  }

  // 初始化按钮位置
  nextTick(() => {
    updateButtonPosition()
  })

  // 监听窗口大小变化
  window.addEventListener('resize', updateButtonPosition)

  // 监听侧边栏悬停
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    sidebar.addEventListener('mouseenter', handleSidebarEnter)
    sidebar.addEventListener('mouseleave', handleSidebarLeave)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateButtonPosition)

  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    sidebar.removeEventListener('mouseenter', handleSidebarEnter)
    sidebar.removeEventListener('mouseleave', handleSidebarLeave)
  }
})

const handleSidebarEnter = () => {
  isHovering.value = true
}

const handleSidebarLeave = () => {
  isHovering.value = false
}

// 更新按钮位置
const updateButtonPosition = () => {
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar && !isCollapsed.value) {
    const rect = sidebar.getBoundingClientRect()
    buttonLeft.value = rect.width
  }
}

// 监听状态变化
watch(isCollapsed, (collapsed) => {
  localStorage.setItem('yh-ui-sidebar-collapsed', String(collapsed))
  updateSidebarState(collapsed)
})

// 更新侧边栏状态
const updateSidebarState = (collapsed: boolean) => {
  const sidebar = document.querySelector('.VPSidebar')
  const content = document.querySelector('.VPContent')

  if (sidebar) {
    if (collapsed) {
      sidebar.classList.add('is-collapsed')
    } else {
      sidebar.classList.remove('is-collapsed')
    }
  }

  if (content) {
    if (collapsed) {
      content.classList.add('sidebar-collapsed')
    } else {
      content.classList.remove('sidebar-collapsed')
    }
  }

  // 稍后更新按钮位置
  setTimeout(() => {
    updateButtonPosition()
  }, 400)
}

// 切换状态
const toggle = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <button class="sidebar-toggle" :class="{
    'sidebar-toggle--collapsed': isCollapsed,
    'sidebar-toggle--visible': isHovering || isCollapsed
  }" :style="{ left: isCollapsed ? '0px' : `${buttonLeft}px` }" @click="toggle" @mouseenter="isHovering = true"
    @mouseleave="isHovering = false" :title="isCollapsed ? '展开侧边栏' : '收起侧边栏'">
    <svg class="sidebar-toggle__icon" viewBox="0 0 24 24" width="12" height="12">
      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.sidebar-toggle {
  position: fixed;
  top: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 48px;
  padding: 0;
  margin: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: none;
  border-radius: 0 6px 6px 0;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transform: translateX(-1px) translateY(-50%);
  transition:
    left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease,
    width 0.15s ease,
    color 0.15s ease;
  opacity: 0;

  &--visible,
  &:hover {
    opacity: 1;
  }

  &:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-soft);
    width: 16px;
  }

  &__icon {
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  &--collapsed {
    border-left: 1px solid var(--vp-c-divider);
    border-radius: 0 6px 6px 0;
    transform: translateX(0) translateY(-50%);
    opacity: 1;

    .sidebar-toggle__icon {
      transform: rotate(180deg);
    }
  }
}

/* 暗色模式 */
.dark .sidebar-toggle {
  background: var(--vp-c-bg);

  &:hover {
    background: var(--vp-c-bg-soft);
  }
}

@media (max-width: 960px) {
  .sidebar-toggle {
    display: none;
  }
}
</style>
