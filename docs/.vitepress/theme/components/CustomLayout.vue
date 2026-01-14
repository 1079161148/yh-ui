<script setup lang="ts">
/**
 * CustomLayout - 自定义布局组件
 * @description 扩展默认布局，添加侧边栏切换、语言切换等功能
 */
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LanguageSwitcher from './LanguageSwitcher.vue'
import SidebarToggle from './SidebarToggle.vue'
import BackToTop from './BackToTop.vue'
import { onMounted, onUnmounted } from 'vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

// 滚动处理相关变量
let scrollHandler: (() => void) | null = null

// 添加页面加载动画和滚动监听
onMounted(() => {
  // 添加页面加载完成标记
  document.body.classList.add('page-loaded')

  // 添加滚动监听，仅用于添加阴影效果（头部始终固定可见）
  const nav = document.querySelector('.VPNav')

  scrollHandler = () => {
    const currentScrollY = window.scrollY

    if (nav) {
      // 仅添加滚动阴影效果，不隐藏导航栏
      if (currentScrollY > 50) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
})

// 清理滚动监听
onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <Layout>
    <!-- 导航栏右侧插槽 - 语言切换 -->
    <template #nav-bar-content-after>
      <LanguageSwitcher />
    </template>

    <!-- 侧边栏切换按钮 -->
    <template #sidebar-nav-after>
      <!-- 可以在这里添加侧边栏底部内容 -->
    </template>

    <!-- 页面内容前的装饰 -->
    <template #doc-before>
      <div class="doc-decoration">
        <div class="doc-decoration__gradient" />
      </div>
    </template>

    <!-- 页面底部 -->
    <template #doc-footer-before>
      <div class="doc-footer-decoration">
        <div class="doc-footer-decoration__line" />
      </div>
    </template>
  </Layout>

  <!-- 侧边栏折叠按钮 -->
  <SidebarToggle />

  <!-- 返回顶部按钮 -->
  <BackToTop />
</template>

<style lang="scss">
/* 页面加载动画 */
body {
  opacity: 0;
  transition: opacity 0.3s ease;

  &.page-loaded {
    opacity: 1;
  }
}

/* 导航栏 - 始终固定，不隐藏 */
.VPNav {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 40 !important;
  transition: box-shadow 0.3s ease !important;

  &.scrolled {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
  }
}

/* 侧边栏折叠样式 */
.VPSidebar {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &.is-collapsed {
    transform: translateX(-100%);
    width: 0 !important;
  }
}

.VPContent {
  transition: padding-left 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &.sidebar-collapsed {
    padding-left: 0 !important;
  }
}

/* 文档装饰 */
.doc-decoration {
  position: relative;
  height: 4px;
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 2px;

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
        var(--vp-c-brand-1) 0%,
        var(--vp-c-brand-2) 50%,
        var(--vp-c-brand-3) 100%);
    background-size: 200% 100%;
    animation: gradientMove 3s ease infinite;
  }
}

@keyframes gradientMove {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* 文档底部装饰 */
.doc-footer-decoration {
  margin-top: 32px;

  &__line {
    height: 1px;
    background: linear-gradient(90deg,
        transparent 0%,
        var(--vp-c-divider) 20%,
        var(--vp-c-brand-1) 50%,
        var(--vp-c-divider) 80%,
        transparent 100%);
  }
}
</style>
