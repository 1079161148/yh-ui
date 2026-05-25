<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { TableColumn } from '@yh-ui/components'

interface RoleRow extends Record<string, unknown> {
  id: number
  name: string
  code: string
  desc: string
  userCount: number
  status: string
  createdAt: string
}

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 70 },
  { prop: 'name', label: '角色名称', width: 140 },
  { prop: 'code', label: '角色编码', width: 130 },
  { prop: 'desc', label: '描述', minWidth: 180 },
  { prop: 'userCount', label: '用户数', width: 90 },
  { prop: 'status', label: '状态', width: 90 },
  { prop: 'createdAt', label: '创建时间', width: 160 },
  { prop: 'action', label: '操作', width: 200, fixed: 'right' as const }
]

const mockData: RoleRow[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    desc: '拥有系统全部权限',
    userCount: 3,
    status: '启用',
    createdAt: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    name: '系统管理员',
    code: 'admin',
    desc: '管理系统配置和用户',
    userCount: 5,
    status: '启用',
    createdAt: '2024-01-10 10:30:00'
  },
  {
    id: 3,
    name: '内容编辑',
    code: 'editor',
    desc: '管理文章、分类等内容',
    userCount: 12,
    status: '启用',
    createdAt: '2024-02-15 14:20:00'
  },
  {
    id: 4,
    name: '普通用户',
    code: 'viewer',
    desc: '仅查看权限',
    userCount: 28,
    status: '启用',
    createdAt: '2024-03-01 09:00:00'
  },
  {
    id: 5,
    name: '部门经理',
    code: 'dept_manager',
    desc: '管理部门内用户和数据',
    userCount: 6,
    status: '启用',
    createdAt: '2024-04-20 16:45:00'
  },
  {
    id: 6,
    name: '审计员',
    code: 'auditor',
    desc: '查看操作日志和审计记录',
    userCount: 2,
    status: '禁用',
    createdAt: '2024-05-01 08:00:00'
  }
]

const searchForm = reactive({ keyword: '', status: '' })

const filteredData = computed(() => {
  let data = mockData
  if (searchForm.keyword) {
    const kw = searchForm.keyword.toLowerCase()
    data = data.filter((r) => r.name.includes(kw) || r.code.includes(kw))
  }
  if (searchForm.status) data = data.filter((r) => r.status === searchForm.status)
  return data
})

const total = computed(() => filteredData.value.length)

function handleSearch() {}
function handleReset() {
  searchForm.keyword = ''
  searchForm.status = ''
}
</script>

<template>
  <div class="page-container">
    <div class="search-bar">
      <div class="search-bar-item">
        <span class="search-bar-label">关键词</span>
        <YhInput
          v-model="searchForm.keyword"
          placeholder="搜索角色名称/编码"
          style="width: 200px"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">状态</span>
        <YhSelect v-model="searchForm.status" placeholder="全部" style="width: 120px" clearable>
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
        <YhButton type="primary" v-permission="'role:edit'">新增角色</YhButton>
        <span style="font-size: 13px; color: var(--admin-text-secondary)">共 {{ total }} 条</span>
      </div>

      <YhTable :data="filteredData" :columns="columns" border stripe height="auto">
        <template #status="{ row }">
          <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">
            {{ row.status }}
          </YhTag>
        </template>
        <template #action>
          <YhSpace>
            <YhButton type="primary" link size="small" v-permission="'role:edit'">编辑</YhButton>
            <YhButton type="warning" link size="small" v-permission="'role:edit'">
              分配权限
            </YhButton>
            <YhButton type="danger" link size="small" v-permission="'role:delete'">删除</YhButton>
          </YhSpace>
        </template>
      </YhTable>
    </div>
  </div>
</template>
