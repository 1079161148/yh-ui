<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface UserDetail {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: string
  description: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()
const router = useRouter()

const detail = ref<UserDetail | null>(null)
const loading = ref(true)

onMounted(() => {
  const id = route.params.id as string
  setTimeout(() => {
    detail.value = {
      id,
      name: '用户001',
      email: 'user001@example.com',
      phone: '13800138000',
      role: '管理员',
      status: '启用',
      description: '该用户为系统测试用户，拥有完整管理权限。',
      createdAt: '2024-01-15 10:30:00',
      updatedAt: '2024-05-20 14:22:00'
    }
    loading.value = false
  }, 500)
})

function handleBack() {
  router.back()
}

function handleEdit() {
  router.push(`/form?id=${detail.value?.id}`)
}
</script>

<template>
  <div class="page-container">
    <div class="detail-card" v-loading="loading">
      <div class="detail-header">
        <h2>用户详情 #{{ route.params.id }}</h2>
        <div class="detail-actions">
          <YhButton @click="handleBack">返回</YhButton>
          <YhButton type="primary" @click="handleEdit">编辑</YhButton>
        </div>
      </div>

      <template v-if="detail">
        <YhDescriptions title="基本信息" :column="2" border>
          <YhDescriptionsItem label="姓名">{{ detail.name }}</YhDescriptionsItem>
          <YhDescriptionsItem label="邮箱">{{ detail.email }}</YhDescriptionsItem>
          <YhDescriptionsItem label="手机号">{{ detail.phone }}</YhDescriptionsItem>
          <YhDescriptionsItem label="角色">{{ detail.role }}</YhDescriptionsItem>
          <YhDescriptionsItem label="状态">
            <YhTag :type="detail.status === '启用' ? 'success' : 'danger'">
              {{ detail.status }}
            </YhTag>
          </YhDescriptionsItem>
          <YhDescriptionsItem label="描述">{{ detail.description }}</YhDescriptionsItem>
        </YhDescriptions>

        <div style="height: 16px" />

        <YhDescriptions title="时间信息" :column="2" border>
          <YhDescriptionsItem label="创建时间">{{ detail.createdAt }}</YhDescriptionsItem>
          <YhDescriptionsItem label="更新时间">{{ detail.updatedAt }}</YhDescriptionsItem>
        </YhDescriptions>
      </template>
    </div>
  </div>
</template>
