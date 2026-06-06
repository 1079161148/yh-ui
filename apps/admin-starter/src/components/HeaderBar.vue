<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { YhMessageBox } from '@yh-ui/yh-ui'
import { useAppStore } from '@/stores/app'
import { useTabsStore } from '@/stores/tabs'
import { DEFAULT_AVATAR_LOGO_TEXT, useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabsStore = useTabsStore()
const userStore = useUserStore()

const displayName = computed(() => userStore.userInfo?.nickname || '用户')
const userAvatar = computed(() => userStore.userInfo?.avatar || '')
const avatarAlt = computed(() => `${displayName.value}头像`)

function handleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

async function handleLogout() {
  try {
    await YhMessageBox.confirm('确认退出当前登录状态吗？', '退出登录', {
      iconType: 'warning',
      confirmButtonText: '退出登录',
      confirmButtonType: 'danger',
      cancelButtonText: '取消'
    })
  } catch {
    return
  }

  const redirect = route.fullPath
  tabsStore.removeAllTabs()
  userStore.clearUser()
  router.replace({
    path: '/login',
    query: redirect ? { redirect } : undefined
  })
}

function handleUserCommand(command: string | number | object) {
  if (command === 'center') {
    router.push('/user')
    return
  }

  if (command === 'logout') {
    void handleLogout()
  }
}
</script>

<template>
  <header class="header-bar">
    <div class="header-left">
      <div class="header-collapse-btn" @click="appStore.toggleCollapsed()">
        <span class="collapse-icon">{{ appStore.collapsed ? '☰' : '☱' }}</span>
      </div>
      <YhBreadcrumb>
        <YhBreadcrumbItem to="/dashboard">首页</YhBreadcrumbItem>
        <YhBreadcrumbItem v-if="$route.meta.title" :to="$route.path">
          {{ $route.meta.title }}
        </YhBreadcrumbItem>
      </YhBreadcrumb>
    </div>

    <div class="header-right">
      <YhTooltip content="全屏">
        <div class="header-action" @click="handleFullScreen">
          <span class="action-text">⛶</span>
        </div>
      </YhTooltip>

      <YhTooltip :content="appStore.isDark ? '切换亮色' : '切换暗色'">
        <div class="header-action" @click="appStore.toggleTheme()">
          <span class="action-text">{{ appStore.isDark ? '☀' : '☾' }}</span>
        </div>
      </YhTooltip>

      <YhDropdown trigger="click" @command="handleUserCommand">
        <div class="header-user">
          <YhAvatar
            size="small"
            :src="userAvatar"
            :alt="avatarAlt"
            :style="{ backgroundColor: 'var(--admin-primary)' }"
          >
            <span class="header-user-logo">{{ DEFAULT_AVATAR_LOGO_TEXT }}</span>
          </YhAvatar>
          <span class="header-user-name">{{ displayName }}</span>
        </div>
        <template #dropdown>
          <YhDropdownMenu>
            <YhDropdownItem :command="'center'">
              <YhIcon name="user" :size="14" />
              个人中心
            </YhDropdownItem>
            <YhDropdownItem :command="'logout'" divided danger>
              <YhIcon name="send" :size="14" />
              退出登录
            </YhDropdownItem>
          </YhDropdownMenu>
        </template>
      </YhDropdown>
    </div>
  </header>
</template>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--admin-header-height);
  padding: 0 20px;
  background: var(--admin-panel);
  border-bottom: 1px solid var(--admin-border);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--admin-text-secondary);
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.header-collapse-btn:hover {
  background: var(--admin-bg);
  color: var(--admin-text);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--admin-text-secondary);
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.action-text {
  font-size: 18px;
  line-height: 1;
}

.collapse-icon {
  font-size: 18px;
  line-height: 1;
}

.header-action:hover {
  background: var(--admin-bg);
  color: var(--admin-text);
}

.header-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.header-user:hover {
  background: var(--admin-bg);
}

.header-user-name {
  font-size: 14px;
  color: var(--admin-text);
}

.header-user-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
}
</style>
