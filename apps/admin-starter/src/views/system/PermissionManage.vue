<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { TableColumn } from '@yh-ui/components'

interface PermissionRow extends Record<string, unknown> {
  id: number
  name: string
  code: string
  group: string
  desc: string
  assignedRoles: string[]
  status: string
}

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 70 },
  { prop: 'name', label: '权限名称', width: 150 },
  { prop: 'code', label: '权限编码', width: 160 },
  { prop: 'group', label: '所属分组', width: 120 },
  { prop: 'desc', label: '描述', minWidth: 180 },
  { prop: 'assignedRoles', label: '已分配角色', width: 200 },
  { prop: 'status', label: '状态', width: 90 },
  { prop: 'action', label: '操作', width: 160, fixed: 'right' as const }
]

const searchForm = reactive({ keyword: '', group: '', status: '' })

const mockData: PermissionRow[] = [
  {
    id: 1,
    name: '用户列表',
    code: 'user:list',
    group: '用户管理',
    desc: '查看用户列表',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 2,
    name: '新增用户',
    code: 'user:add',
    group: '用户管理',
    desc: '新增用户',
    assignedRoles: ['超级管理员'],
    status: '启用'
  },
  {
    id: 3,
    name: '编辑用户',
    code: 'user:edit',
    group: '用户管理',
    desc: '编辑用户信息',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 4,
    name: '删除用户',
    code: 'user:delete',
    group: '用户管理',
    desc: '删除用户',
    assignedRoles: ['超级管理员'],
    status: '启用'
  },
  {
    id: 5,
    name: '部门列表',
    code: 'dept:list',
    group: '部门管理',
    desc: '查看部门',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 6,
    name: '新增部门',
    code: 'dept:add',
    group: '部门管理',
    desc: '新增部门',
    assignedRoles: ['超级管理员'],
    status: '启用'
  },
  {
    id: 7,
    name: '编辑部门',
    code: 'dept:edit',
    group: '部门管理',
    desc: '编辑部门信息',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 8,
    name: '删除部门',
    code: 'dept:delete',
    group: '部门管理',
    desc: '删除部门',
    assignedRoles: ['超级管理员'],
    status: '禁用'
  },
  {
    id: 9,
    name: '角色列表',
    code: 'role:list',
    group: '角色管理',
    desc: '查看角色',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 10,
    name: '新增角色',
    code: 'role:add',
    group: '角色管理',
    desc: '新增角色',
    assignedRoles: ['超级管理员'],
    status: '启用'
  },
  {
    id: 11,
    name: '编辑角色',
    code: 'role:edit',
    group: '角色管理',
    desc: '编辑角色',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 12,
    name: '删除角色',
    code: 'role:delete',
    group: '角色管理',
    desc: '删除角色',
    assignedRoles: ['超级管理员'],
    status: '启用'
  },
  {
    id: 13,
    name: '菜单列表',
    code: 'menu:list',
    group: '菜单管理',
    desc: '查看菜单配置',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 14,
    name: '编辑菜单',
    code: 'menu:edit',
    group: '菜单管理',
    desc: '编辑菜单配置',
    assignedRoles: ['超级管理员'],
    status: '启用'
  },
  {
    id: 15,
    name: '权限列表',
    code: 'permission:list',
    group: '权限管理',
    desc: '查看按钮权限',
    assignedRoles: ['超级管理员', '系统管理员'],
    status: '启用'
  },
  {
    id: 16,
    name: '编辑权限',
    code: 'permission:edit',
    group: '权限管理',
    desc: '编辑按钮权限',
    assignedRoles: ['超级管理员'],
    status: '启用'
  }
]

const groups = computed(() => [...new Set(mockData.map((p) => p.group))])

const filteredData = computed(() => {
  let data = mockData
  if (searchForm.keyword) {
    const kw = searchForm.keyword.toLowerCase()
    data = data.filter((p) => p.name.includes(kw) || p.code.includes(kw))
  }
  if (searchForm.group) data = data.filter((p) => p.group === searchForm.group)
  if (searchForm.status) data = data.filter((p) => p.status === searchForm.status)
  return data
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = computed(() => filteredData.value.length)

function handleSearch() {
  currentPage.value = 1
}
function handleReset() {
  searchForm.keyword = ''
  searchForm.group = ''
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
          placeholder="搜索权限名称/编码"
          style="width: 200px"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">分组</span>
        <YhSelect v-model="searchForm.group" placeholder="全部" style="width: 140px" clearable>
          <YhOption v-for="g in groups" :key="g" :label="g" :value="g" />
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
        <YhButton type="primary" v-permission="'permission:edit'">新增权限</YhButton>
        <span style="font-size: 13px; color: var(--admin-text-secondary)">共 {{ total }} 条</span>
      </div>

      <YhTable :data="filteredData" :columns="columns" border stripe height="auto">
        <template #status="{ row }">
          <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">{{
            row.status
          }}</YhTag>
        </template>
        <template #assignedRoles="{ row }">
          <YhSpace wrap>
            <YhTag v-for="role in row.assignedRoles" :key="role" size="small" type="info">{{
              role
            }}</YhTag>
          </YhSpace>
        </template>
        <template #action>
          <YhSpace>
            <YhButton type="primary" link size="small" v-permission="'permission:edit'"
              >编辑</YhButton
            >
            <YhButton type="danger" link size="small" v-permission="'permission:delete'"
              >删除</YhButton
            >
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
