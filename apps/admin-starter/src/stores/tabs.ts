import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteLocationNormalized, LocationQuery } from 'vue-router'

export interface TabItem {
  path: string
  name: string
  title: string
  icon?: string
  query?: LocationQuery
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([
    { path: '/dashboard', name: 'dashboard', title: '工作台', icon: 'home' }
  ])
  const activeTab = ref('/dashboard')

  const activeTabIndex = computed(() => tabs.value.findIndex((t) => t.path === activeTab.value))

  function addTab(route: RouteLocationNormalized) {
    const meta = route.meta as { title?: string; icon?: string }
    const existing = tabs.value.find((t) => t.path === route.path)
    if (!existing) {
      tabs.value.push({
        path: route.path,
        name: route.name as string,
        title: (meta.title as string) || route.path,
        icon: meta.icon as string | undefined,
        query: route.query
      })
    }
    activeTab.value = route.path
  }

  function removeTab(path: string) {
    const index = tabs.value.findIndex((t) => t.path === path)
    if (index === -1) return
    tabs.value.splice(index, 1)
    if (activeTab.value === path) {
      const next = tabs.value[Math.min(index, tabs.value.length - 1)]
      activeTab.value = next?.path || '/dashboard'
    }
  }

  function removeOtherTabs(path: string) {
    tabs.value = tabs.value.filter((t) => t.path === path || t.path === '/dashboard')
    activeTab.value = path
  }

  function removeAllTabs() {
    tabs.value = [{ path: '/dashboard', name: 'dashboard', title: '工作台', icon: 'home' }]
    activeTab.value = '/dashboard'
  }

  function setActiveTab(path: string) {
    activeTab.value = path
  }

  return {
    tabs,
    activeTab,
    activeTabIndex,
    addTab,
    removeTab,
    removeOtherTabs,
    removeAllTabs,
    setActiveTab
  }
})
