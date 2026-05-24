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
    <YhResult icon="warning" title="403" sub-title="抱歉，您没有权限访问此页面">
      <template #extra>
        <YhButton type="primary" @click="goHome">返回首页</YhButton>
      </template>
    </YhResult>
  </div>
</template>
