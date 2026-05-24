<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const userStore = useUserStore()
const appStore = useAppStore()

const user = userStore.userInfo
</script>

<template>
  <div class="page-container">
    <div class="form-card">
      <h2 class="form-card-title">个人中心</h2>

      <YhDescriptions title="账户信息" :column="2" border>
        <YhDescriptionsItem label="用户名">{{ user?.username || '-' }}</YhDescriptionsItem>
        <YhDescriptionsItem label="昵称">{{ user?.nickname || '-' }}</YhDescriptionsItem>
        <YhDescriptionsItem label="邮箱">{{ user?.email || '-' }}</YhDescriptionsItem>
        <YhDescriptionsItem label="角色">
          <YhTag>{{ user?.role || '-' }}</YhTag>
        </YhDescriptionsItem>
      </YhDescriptions>

      <div style="height: 16px" />

      <YhDescriptions title="权限信息" border>
        <YhDescriptionsItem label="权限列表">
          <YhSpace wrap>
            <YhTag v-for="perm in user?.permissions" :key="perm" type="info" size="small">
              {{ perm }}
            </YhTag>
          </YhSpace>
        </YhDescriptionsItem>
      </YhDescriptions>

      <div style="height: 16px" />

      <YhDescriptions title="系统设置" :column="2" border>
        <YhDescriptionsItem label="主题模式">
          <YhSpace>
            <YhButton
              :type="appStore.isDark ? 'default' : 'primary'"
              size="small"
              @click="appStore.setTheme('light')"
            >
              浅色
            </YhButton>
            <YhButton
              :type="appStore.isDark ? 'primary' : 'default'"
              size="small"
              @click="appStore.setTheme('dark')"
            >
              深色
            </YhButton>
          </YhSpace>
        </YhDescriptionsItem>
        <YhDescriptionsItem label="组件尺寸">
          <YhSpace>
            <YhButton
              v-for="s in ['large', 'default', 'small'] as const"
              :key="s"
              :type="appStore.size === s ? 'primary' : 'default'"
              size="small"
              @click="appStore.setSize(s)"
            >
              {{ s === 'large' ? '大' : s === 'default' ? '中' : '小' }}
            </YhButton>
          </YhSpace>
        </YhDescriptionsItem>
      </YhDescriptions>
    </div>
  </div>
</template>
