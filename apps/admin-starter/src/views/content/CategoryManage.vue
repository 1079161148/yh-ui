<script setup lang="ts">
import { computed } from 'vue'

interface CategoryRow extends Record<string, unknown> {
  id: number
  name: string
  alias: string
  articleCount: number
  sort: number
  status: string
  createdAt: string
  children?: CategoryRow[]
}

const categoryData: CategoryRow[] = [
  {
    id: 1,
    name: '技术文章',
    alias: 'tech',
    articleCount: 45,
    sort: 1,
    status: '启用',
    createdAt: '2024-01-01',
    children: [
      {
        id: 3,
        name: '前端技术',
        alias: 'frontend',
        articleCount: 18,
        sort: 1,
        status: '启用',
        createdAt: '2024-01-10'
      },
      {
        id: 4,
        name: '后端技术',
        alias: 'backend',
        articleCount: 15,
        sort: 2,
        status: '启用',
        createdAt: '2024-01-12'
      },
      {
        id: 5,
        name: 'AI & 机器学习',
        alias: 'ai',
        articleCount: 12,
        sort: 3,
        status: '启用',
        createdAt: '2024-02-20'
      }
    ]
  },
  {
    id: 2,
    name: '产品动态',
    alias: 'product',
    articleCount: 28,
    sort: 2,
    status: '启用',
    createdAt: '2024-01-05',
    children: [
      {
        id: 6,
        name: '版本发布',
        alias: 'releases',
        articleCount: 10,
        sort: 1,
        status: '启用',
        createdAt: '2024-01-15'
      },
      {
        id: 7,
        name: '功能更新',
        alias: 'features',
        articleCount: 18,
        sort: 2,
        status: '禁用',
        createdAt: '2024-03-01'
      }
    ]
  },
  {
    id: 8,
    name: '行业资讯',
    alias: 'news',
    articleCount: 36,
    sort: 3,
    status: '启用',
    createdAt: '2024-02-01'
  },
  {
    id: 9,
    name: '教程指南',
    alias: 'tutorial',
    articleCount: 22,
    sort: 4,
    status: '启用',
    createdAt: '2024-03-15'
  }
]

function flattenTree(nodes: CategoryRow[], level = 0): (CategoryRow & { level: number })[] {
  return nodes.flatMap((n) => [{ ...n, level }, ...flattenTree(n.children || [], level + 1)])
}

const flatList = computed(() => flattenTree(categoryData))
</script>

<template>
  <div class="page-container">
    <div class="table-card">
      <div class="table-toolbar">
        <YhSpace>
          <YhButton type="primary" v-permission="'category:edit'">新增分类</YhButton>
          <YhButton>展开全部</YhButton>
          <YhButton>折叠全部</YhButton>
        </YhSpace>
      </div>

      <YhTable :data="flatList" border stripe height="auto" row-key="id">
        <YhTableColumn prop="name" label="分类名称" width="240">
          <template #default="{ row }">
            <span :style="{ paddingLeft: row.level * 24 + 'px' }"
              >{{ row.level > 0 ? '├ ' : '' }}{{ row.name }}</span
            >
          </template>
        </YhTableColumn>
        <YhTableColumn prop="alias" label="别名" width="140" />
        <YhTableColumn prop="articleCount" label="文章数" width="100" />
        <YhTableColumn prop="sort" label="排序" width="80" />
        <YhTableColumn prop="status" label="状态" width="100">
          <template #default="{ row }">
            <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">
              {{ row.status }}
            </YhTag>
          </template>
        </YhTableColumn>
        <YhTableColumn prop="createdAt" label="创建时间" width="160" />
        <YhTableColumn label="操作" width="200">
          <template #default>
            <YhSpace>
              <YhButton type="primary" link size="small" v-permission="'category:edit'">
                编辑
              </YhButton>
              <YhButton type="primary" link size="small">添加子级</YhButton>
              <YhButton type="danger" link size="small" v-permission="'category:delete'">
                删除
              </YhButton>
            </YhSpace>
          </template>
        </YhTableColumn>
      </YhTable>
    </div>
  </div>
</template>
