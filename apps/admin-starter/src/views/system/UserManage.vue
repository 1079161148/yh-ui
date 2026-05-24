<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { TableColumn } from '@yh-ui/components'

interface UserRow extends Record<string, unknown> {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  dept: string
  role: string
  status: string
  createdAt: string
}

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 70 },
  { prop: 'username', label: '用户名', width: 120 },
  { prop: 'nickname', label: '昵称', width: 120 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'phone', label: '手机号', width: 140 },
  { prop: 'dept', label: '所属部门', width: 120 },
  { prop: 'role', label: '角色', width: 100 },
  { prop: 'status', label: '状态', width: 90 },
  { prop: 'createdAt', label: '创建时间', width: 160 },
  { prop: 'action', label: '操作', width: 160, fixed: 'right' as const }
]

const searchForm = reactive({ keyword: '', dept: '', role: '', status: '' })

const mockData: UserRow[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  username: `user_${String(i + 1).padStart(3, '0')}`,
  nickname: `用户${String(i + 1).padStart(3, '0')}`,
  email: `user${i + 1}@example.com`,
  phone: `138${String(10000000 + i).slice(0, 8)}`,
  dept: ['技术部', '产品部', '设计部', '市场部', '运营部'][i % 5],
  role: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑者' : '查看者',
  status: i % 4 === 0 ? '禁用' : '启用',
  createdAt: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`
}))

const currentPage = ref(1)
const pageSize = ref(10)

const filteredData = computed(() => {
  let data = mockData
  if (searchForm.keyword) {
    const kw = searchForm.keyword.toLowerCase()
    data = data.filter(
      (u) => u.username.includes(kw) || u.nickname.includes(kw) || u.email.includes(kw)
    )
  }
  if (searchForm.dept) data = data.filter((u) => u.dept === searchForm.dept)
  if (searchForm.role) data = data.filter((u) => u.role === searchForm.role)
  if (searchForm.status) data = data.filter((u) => u.status === searchForm.status)
  return data
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredData.value.length)

function handleSearch() {
  currentPage.value = 1
}
function handleReset() {
  searchForm.keyword = ''
  searchForm.dept = ''
  searchForm.role = ''
  searchForm.status = ''
  currentPage.value = 1
}
</script>

<template>
  <div class="page-container">
    <div class="search-bar">
      <div class="search-bar-item">
        <span class="search-bar-label">关键词</span>
        <YhInput
          v-model="searchForm.keyword"
          placeholder="搜索用户名/昵称/邮箱"
          style="width: 200px"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">部门</span>
        <YhSelect v-model="searchForm.dept" placeholder="全部" style="width: 130px" clearable>
          <YhOption label="技术部" value="技术部" />
          <YhOption label="产品部" value="产品部" />
          <YhOption label="设计部" value="设计部" />
          <YhOption label="市场部" value="市场部" />
          <YhOption label="运营部" value="运营部" />
        </YhSelect>
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">角色</span>
        <YhSelect v-model="searchForm.role" placeholder="全部" style="width: 120px" clearable>
          <YhOption label="管理员" value="管理员" />
          <YhOption label="编辑者" value="编辑者" />
          <YhOption label="查看者" value="查看者" />
        </YhSelect>
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">状态</span>
        <YhSelect v-model="searchForm.status" placeholder="全部" style="width: 100px" clearable>
          <YhOption label="启用" value="启用" />
          <YhOption label="禁用" value="禁用" />
        </YhSelect>
      </div>
      <div class="search-bar-item" style="margin-left: auto">
        <YhButton type="primary" @click="handleSearch">查询</YhButton>
        <YhButton @click="handleReset">重置</YhButton>
      </div>
    </div>

    <div class="table-card">
      <div class="table-toolbar">
        <YhSpace>
          <YhButton type="primary" v-permission="'user:edit'">新增用户</YhButton>
          <YhButton>导入</YhButton>
          <YhButton>导出</YhButton>
        </YhSpace>
        <span style="font-size: 13px; color: var(--admin-text-secondary)">共 {{ total }} 条</span>
      </div>

      <YhTable :data="pagedData" :columns="columns" border stripe height="auto">
        <template #status="{ row }">
          <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">{{
            row.status
          }}</YhTag>
        </template>
        <template #action>
          <YhSpace>
            <YhButton type="primary" link size="small" v-permission="'user:edit'">编辑</YhButton>
            <YhButton type="danger" link size="small" v-permission="'user:delete'">删除</YhButton>
          </YhSpace>
        </template>
      </YhTable>

      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <YhPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total,sizes,prev,pager,next,jumper"
        />
      </div>
    </div>
  </div>
</template>
