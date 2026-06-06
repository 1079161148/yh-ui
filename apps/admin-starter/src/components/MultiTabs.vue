<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore, type TabItem } from '@/stores/tabs'

type TabCommand = 'close' | 'close-other' | 'close-all'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

const affixTabs = computed(() => tabsStore.tabs.filter((t) => t.path === '/dashboard'))
const normalTabs = computed(() => tabsStore.tabs.filter((t) => t.path !== '/dashboard'))

function handleTabClick(tab: TabItem) {
  tabsStore.setActiveTab(tab.path)
  router.push({ path: tab.path, query: tab.query })
}

function navigateToTab(path: string, query?: TabItem['query']) {
  router.push({ path, query })
}

function syncRouteWithActiveTab() {
  const nextActiveTab = tabsStore.tabs.find((tab) => tab.path === tabsStore.activeTab)
  if (!nextActiveTab) return
  navigateToTab(nextActiveTab.path, nextActiveTab.query)
}

function handleTabClose(e: Event, tab: TabItem) {
  e.stopPropagation()
  if (tab.path === '/dashboard') return
  tabsStore.removeTab(tab.path)
  if (route.path === tab.path) {
    syncRouteWithActiveTab()
  }
}

function handleContextCommand(command: TabCommand, tab: TabItem) {
  switch (command) {
    case 'close':
      if (tab.path === '/dashboard') return
      tabsStore.removeTab(tab.path)
      if (route.path === tab.path) {
        syncRouteWithActiveTab()
      }
      break
    case 'close-other':
      tabsStore.removeOtherTabs(tab.path)
      navigateToTab(tab.path, tab.query)
      break
    case 'close-all':
      tabsStore.removeAllTabs()
      navigateToTab('/dashboard')
      break
  }
}
</script>

<template>
  <div class="multi-tabs">
    <div class="tabs-scroll">
      <div
        v-for="tab in affixTabs"
        :key="tab.path"
        :class="['tab-item', { active: tabsStore.activeTab === tab.path }]"
        @click="handleTabClick(tab)"
      >
        <YhIcon :name="tab.icon || 'document'" :size="14" />
        <span>{{ tab.title }}</span>
      </div>

      <YhDropdown
        v-for="tab in normalTabs"
        :key="tab.path"
        class="tab-dropdown"
        trigger="contextmenu"
        :show-arrow="false"
        @command="(command) => handleContextCommand(command as TabCommand, tab)"
      >
        <div
          :class="['tab-item', { active: tabsStore.activeTab === tab.path }]"
          @click="handleTabClick(tab)"
        >
          <YhIcon :name="tab.icon || 'document'" :size="14" />
          <span>{{ tab.title }}</span>
          <span class="tab-close" @click="(e) => handleTabClose(e, tab)">
            <YhIcon name="close-circle" :size="12" />
          </span>
        </div>
        <template #dropdown>
          <YhDropdownMenu>
            <YhDropdownItem command="close"> 关闭标签 </YhDropdownItem>
            <YhDropdownItem command="close-other"> 关闭其他 </YhDropdownItem>
            <YhDropdownItem command="close-all"> 关闭所有 </YhDropdownItem>
          </YhDropdownMenu>
        </template>
      </YhDropdown>
    </div>
  </div>
</template>

<style scoped>
.multi-tabs {
  display: flex;
  align-items: center;
  height: var(--admin-tabs-height);
  background: rgba(var(--admin-primary-rgb), 0.03);
  border-bottom: 1px solid var(--admin-border);
  flex-shrink: 0;
  overflow: hidden;
}

.tabs-scroll {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  overflow-x: auto;
  gap: 4px;
  min-width: 0;
}

.tabs-scroll::-webkit-scrollbar {
  height: 2px;
}

.tab-dropdown {
  flex-shrink: 0;
}

.tab-dropdown :deep(.yh-dropdown__trigger) {
  display: flex;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: var(--admin-text-secondary);
  white-space: nowrap;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;
  user-select: none;
  position: relative;
}

.tab-item:hover {
  color: var(--admin-text);
  background: rgba(var(--admin-primary-rgb), 0.08);
}

.tab-item.active {
  color: var(--admin-primary);
  background: rgba(var(--admin-primary-rgb), 0.14);
  box-shadow: inset 0 0 0 1px rgba(var(--admin-primary-rgb), 0.28);
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-left: 2px;
  flex-shrink: 0;
}

.tab-close:hover {
  background: rgba(var(--admin-primary-rgb), 0.16);
}

.tab-item.active .tab-close {
  opacity: 1;
}
</style>
