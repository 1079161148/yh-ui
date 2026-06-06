<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { TableColumn } from '@yh-ui/components'

interface ArticleRow extends Record<string, unknown> {
  id: number
  title: string
  category: string
  author: string
  status: string
  views: number
  createdAt: string
}

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 70 },
  { prop: 'title', label: '文章标题', minWidth: 200 },
  { prop: 'category', label: '分类', width: 120 },
  { prop: 'author', label: '作者', width: 100 },
  { prop: 'status', label: '状态', width: 90 },
  { prop: 'views', label: '浏览量', width: 90 },
  { prop: 'createdAt', label: '发布时间', width: 160 },
  { prop: 'action', label: '操作', width: 160, fixed: 'right' as const }
]

const searchForm = reactive({ keyword: '', category: '', status: '' })

const mockData: ArticleRow[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  title:
    [
      'Vue 3 组合式 API 最佳实践指南',
      'TypeScript 高级类型体操入门',
      'Vite 构建优化从入门到精通',
      'YH-UI 组件库使用手册',
      '前端性能优化实战技巧'
    ][i % 5] + ` #${i + 1}`,
  category: ['技术文章', '产品动态', '行业资讯', '教程指南'][i % 4],
  author: ['张明', '李华', '王芳', '赵磊'][i % 4],
  status: i % 6 === 0 ? '草稿' : i % 7 === 0 ? '审核中' : '已发布',
  views: Math.floor(Math.random() * 5000),
  createdAt: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`
}))

const currentPage = ref(1)
const pageSize = ref(10)

const filteredData = computed(() => {
  let data = mockData
  if (searchForm.keyword) {
    const kw = searchForm.keyword.toLowerCase()
    data = data.filter((a) => a.title.includes(kw))
  }
  if (searchForm.category) data = data.filter((a) => a.category === searchForm.category)
  if (searchForm.status) data = data.filter((a) => a.status === searchForm.status)
  return data
})

const pagedData = computed(() =>
  filteredData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
)
const total = computed(() => filteredData.value.length)

function handleSearch() {
  currentPage.value = 1
}
function handleReset() {
  searchForm.keyword = ''
  searchForm.category = ''
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
          placeholder="搜索文章标题"
          style="width: 200px"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">分类</span>
        <YhSelect v-model="searchForm.category" placeholder="全部" style="width: 140px" clearable>
          <YhOption label="技术文章" value="技术文章" />
          <YhOption label="产品动态" value="产品动态" />
          <YhOption label="行业资讯" value="行业资讯" />
          <YhOption label="教程指南" value="教程指南" />
        </YhSelect>
      </div>
      <div class="search-bar-item">
        <span class="search-bar-label">状态</span>
        <YhSelect v-model="searchForm.status" placeholder="全部" style="width: 120px" clearable>
          <YhOption label="已发布" value="已发布" />
          <YhOption label="草稿" value="草稿" />
          <YhOption label="审核中" value="审核中" />
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
          <YhButton type="primary" v-permission="'article:edit'">新增文章</YhButton>
          <YhButton>导出</YhButton>
        </YhSpace>
        <span style="font-size: 13px; color: var(--admin-text-secondary)">共 {{ total }} 条</span>
      </div>

      <YhTable :data="pagedData" :columns="columns" border stripe height="auto">
        <template #title="{ row }">
          <span style="cursor: pointer; color: var(--admin-primary)">{{ row.title }}</span>
        </template>
        <template #status="{ row }">
          <YhTag
            :type="
              row.status === '已发布' ? 'success' : row.status === '审核中' ? 'warning' : 'info'
            "
            size="small"
          >
            {{ row.status }}
          </YhTag>
        </template>
        <template #action>
          <YhSpace>
            <YhButton type="primary" link size="small" v-permission="'article:edit'">编辑</YhButton>
            <YhButton type="danger" link size="small" v-permission="'article:delete'">
              删除
            </YhButton>
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
