<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function retry() {
  window.location.reload()
}

function goHome() {
  router.push('/dashboard')
}
</script>

<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: var(--admin-bg);
    "
  >
    <YhResult icon="error" title="网络连接失败" sub-title="请检查您的网络连接后重试">
      <template #extra>
        <YhSpace>
          <YhButton type="primary" @click="retry">重新加载</YhButton>
          <YhButton @click="goHome">返回首页</YhButton>
        </YhSpace>
      </template>
    </YhResult>
  </div>
</template>
