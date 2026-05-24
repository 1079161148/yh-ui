<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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
    <YhResult icon="error" title="404" sub-title="抱歉，您访问的页面不存在">
      <template #extra>
        <YhButton type="primary" @click="goHome">返回首页</YhButton>
      </template>
    </YhResult>
  </div>
</template>
