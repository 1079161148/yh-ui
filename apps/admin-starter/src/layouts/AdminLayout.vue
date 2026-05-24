<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import Sidebar from '@/components/Sidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import MultiTabs from '@/components/MultiTabs.vue'
import GlobalConfig from '@/components/GlobalConfig.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()

const isSideLayout = computed(() => appStore.layout === 'side')
const isTopLayout = computed(() => appStore.layout === 'top')

const sidebarWidthStyle = computed(() => {
  if (isTopLayout.value) return { width: '0' }
  return { width: appStore.collapsed ? '64px' : '240px' }
})

const contentWidthClass = computed(() =>
  appStore.contentWidth === 'fixed' ? 'content-fixed' : 'content-fluid'
)
</script>

<template>
  <div class="admin-shell" :class="[`layout-${appStore.layout}`]">
    <template v-if="isSideLayout">
      <div class="admin-sidebar" :style="sidebarWidthStyle">
        <Sidebar />
      </div>
      <div class="admin-body">
        <header
          v-if="appStore.showHeader"
          class="admin-header"
          :class="{ 'header-fixed': appStore.fixedHeader }"
        >
          <HeaderBar />
        </header>
        <MultiTabs v-if="appStore.showTabs" />
        <main class="admin-content" :class="contentWidthClass">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </main>
        <AppFooter v-if="appStore.showFooter" />
      </div>
    </template>

    <template v-if="isTopLayout">
      <header
        v-if="appStore.showHeader"
        class="admin-header admin-header-top"
        :class="{ 'header-fixed': appStore.fixedHeader }"
      >
        <HeaderBar />
      </header>
      <div class="admin-body admin-body-top">
        <MultiTabs v-if="appStore.showTabs" />
        <main class="admin-content" :class="contentWidthClass">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </main>
        <AppFooter v-if="appStore.showFooter" />
      </div>
    </template>

    <GlobalConfig />
  </div>
</template>

<style scoped>
.admin-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.admin-shell.layout-side {
  flex-direction: row;
}

.admin-shell.layout-top {
  flex-direction: column;
}

.admin-sidebar {
  flex-shrink: 0;
  height: 100vh;
  transition: width 0.2s ease;
  overflow: hidden;
}

.admin-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.admin-body-top {
  flex: 1;
}

.admin-header {
  height: var(--admin-header-height);
  flex-shrink: 0;
  background: var(--admin-panel);
  border-bottom: 1px solid var(--admin-border);
}

.admin-header-top {
  border-bottom: 1px solid var(--admin-border);
}

.admin-header.header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-content {
  flex: 1;
  overflow: auto;
  background: var(--admin-bg);
}

.content-fixed {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.content-fluid {
  width: 100%;
}
</style>
