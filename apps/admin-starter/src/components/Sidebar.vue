<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { routes, generateMenuFromRoutes } from '@/router'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const adminRoute = routes.find((r) => r.path === '/')
const menuOptions = computed(() => generateMenuFromRoutes(adminRoute?.children || []))

const activeMenu = computed(() => route.path)
const openedMenus = computed(() =>
  appStore.collapsed
    ? []
    : route.matched
        .map((record) => record.path)
        .filter((path) => path !== '/' && path !== route.path)
)
const menuRenderKey = computed(
  () => `${appStore.collapsed}-${activeMenu.value}-${openedMenus.value.join('|')}`
)

function handleMenuSelect(index: string) {
  if (index && index !== route.path) {
    router.push(index)
  }
}
</script>

<template>
  <div :class="['sidebar', { collapsed: appStore.collapsed }]">
    <div class="sidebar-logo" @click="$router.push('/dashboard')">
      <div class="sidebar-logo-icon">YH</div>
      <transition name="fade">
        <span v-show="!appStore.collapsed" class="sidebar-logo-text">Admin Pro</span>
      </transition>
    </div>

    <nav class="sidebar-nav">
      <YhMenu
        :key="menuRenderKey"
        :options="menuOptions"
        :value="activeMenu"
        :default-openeds="openedMenus"
        :collapse="appStore.collapsed"
        :router="true"
        :unique-opened="appStore.accordionMenu"
        mode="vertical"
        @select="handleMenuSelect"
      />
    </nav>

    <div class="sidebar-footer" @click="appStore.toggleCollapsed()">
      <span class="collapse-icon">{{ appStore.collapsed ? '☰' : '☱' }}</span>
      <span v-show="!appStore.collapsed">收起菜单</span>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100%;
  background: var(--admin-panel);
  border-right: 1px solid var(--admin-border);
  transition: width 0.2s ease;
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  height: var(--admin-header-height);
  padding: 0 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--admin-border);
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  justify-content: center;
}

.sidebar:not(.collapsed) .sidebar-logo {
  justify-content: flex-start;
}

.sidebar-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: linear-gradient(135deg, #1677ff, #69b1ff);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.sidebar-logo-text {
  font-size: 16px;
  font-weight: 600;
}

.sidebar-nav {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--admin-border);
  cursor: pointer;
  color: var(--admin-text-secondary);
  font-size: 13px;
  transition: color 0.15s ease;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  justify-content: center;
}

.sidebar:not(.collapsed) .sidebar-footer {
  justify-content: flex-start;
}

.sidebar-footer:hover {
  color: var(--admin-text);
}
</style>
