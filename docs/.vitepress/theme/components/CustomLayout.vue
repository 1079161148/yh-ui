<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { zhCn, en } from '@yh-ui/locale'
import LatestVersionBadge from './LatestVersionBadge.vue'
import SidebarToggle from './SidebarToggle.vue'
import BackToTop from './BackToTop.vue'

const { Layout } = DefaultTheme
const { lang } = useData()

const currentLocale = computed(() => (lang.value === 'en-US' ? en : zhCn))

const syncHtmlLang = (newLang: string) => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('lang', newLang)
}

onMounted(() => {
  syncHtmlLang(lang.value)
})

if (typeof window !== 'undefined') {
  watch(lang, (newLang) => {
    syncHtmlLang(newLang)
  })
}

let scrollHandler: (() => void) | null = null

onMounted(() => {
  const nav = document.querySelector('.VPNav')

  scrollHandler = () => {
    if (!nav) return

    if (window.scrollY > 50) {
      nav.classList.add('scrolled')
    } else {
      nav.classList.remove('scrolled')
    }
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <yh-config-provider :locale="currentLocale">
    <Layout>
      <template #nav-bar-content-after>
        <LatestVersionBadge />
      </template>

      <template #sidebar-nav-after />

      <template #doc-before>
        <div class="doc-decoration">
          <div class="doc-decoration__gradient" />
        </div>
      </template>

      <template #doc-footer-before>
        <div class="doc-footer-decoration">
          <div class="doc-footer-decoration__line" />
        </div>
      </template>
    </Layout>
  </yh-config-provider>

  <SidebarToggle />
  <BackToTop />
</template>

<style lang="scss">
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

.VPSidebar {
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
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
    background: linear-gradient(
      90deg,
      var(--vp-c-brand-1) 0%,
      var(--vp-c-brand-2) 50%,
      var(--vp-c-brand-3) 100%
    );
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

.doc-footer-decoration {
  margin-top: 32px;

  &__line {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--vp-c-divider) 20%,
      var(--vp-c-brand-1) 50%,
      var(--vp-c-divider) 80%,
      transparent 100%
    );
  }
}
</style>
