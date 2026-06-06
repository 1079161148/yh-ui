<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumn } from '@yh-ui/components'

interface UserRow extends Record<string, unknown> {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

const router = useRouter()

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 150 },
  { prop: 'email', label: '邮箱', width: 220 },
  { prop: 'role', label: '角色', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'createdAt', label: '创建时间', width: 180 }
]

const searchForm = reactive({
  keyword: '',
  role: '',
  status: ''
})

const mockData: UserRow[] = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  name: `用户${String(i + 1).padStart(3, '0')}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑者' : '查看者',
  status: i % 5 === 0 ? '禁用' : '启用',
  createdAt: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`
}))

const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)

const filteredData = computed(() => {
  let data = mockData
  if (searchForm.keyword) {
    data = data.filter(
      (item) => item.name.includes(searchForm.keyword) || item.email.includes(searchForm.keyword)
    )
  }
  if (searchForm.role) {
    data = data.filter((item) => item.role === searchForm.role)
  }
  if (searchForm.status) {
    data = data.filter((item) => item.status === searchForm.status)
  }
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
  searchForm.role = ''
  searchForm.status = ''
  currentPage.value = 1
}

function handleView(row: Record<string, unknown>) {
  const userRow = row as UserRow
  router.push(`/table/detail/${userRow.id}`)
}

function handleEdit(row: Record<string, unknown>) {
  const userRow = row as UserRow
  router.push(`/form?id=${userRow.id}`)
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleSizeChange(size: number) {
  pageSize.value = size
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
          placeholder="搜索姓名或邮箱"
          style="width: 200px"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>

      <div class="search-bar-item">
        <span class="search-bar-label">角色</span>
        <YhSelect v-model="searchForm.role" placeholder="全部" style="width: 140px" clearable>
          <YhOption label="管理员" value="管理员" />
          <YhOption label="编辑者" value="编辑者" />
          <YhOption label="查看者" value="查看者" />
        </YhSelect>
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
        <div style="display: flex; align-items: center; gap: 8px">
          <YhButton type="primary">
            <template #icon>
              <span>+</span>
            </template>
            新增用户
          </YhButton>
          <YhButton>批量导入</YhButton>
          <YhButton>导出数据</YhButton>
        </div>
        <span style="font-size: 13px; color: var(--admin-text-secondary)"
          >共 {{ total }} 条记录</span
        >
      </div>

      <YhTable :data="pagedData" :columns="columns" border stripe :loading="loading" height="auto">
        <template #status="{ row }">
          <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">
            {{ row.status }}
          </YhTag>
        </template>
        <template #action="{ row }">
          <YhSpace>
            <YhButton type="primary" link size="small" @click="handleView(row)">查看</YhButton>
            <YhButton type="primary" link size="small" @click="handleEdit(row)">编辑</YhButton>
            <YhButton type="danger" link size="small">删除</YhButton>
          </YhSpace>
        </template>
      </YhTable>

      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <YhPagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>
