<script setup lang="ts">
import { computed } from 'vue'

interface DeptNode extends Record<string, unknown> {
  id: number
  name: string
  leader: string
  phone: string
  sort: number
  status: string
  children?: DeptNode[]
}

const deptTree: DeptNode[] = [
  {
    id: 1,
    name: '总公司',
    leader: '张总',
    phone: '13800000001',
    sort: 1,
    status: '启用',
    children: [
      {
        id: 2,
        name: '技术部',
        leader: '李经理',
        phone: '13800000002',
        sort: 1,
        status: '启用',
        children: [
          {
            id: 5,
            name: '前端组',
            leader: '王组长',
            phone: '13800000005',
            sort: 1,
            status: '启用'
          },
          {
            id: 6,
            name: '后端组',
            leader: '赵组长',
            phone: '13800000006',
            sort: 2,
            status: '启用'
          },
          { id: 7, name: '测试组', leader: '孙组长', phone: '13800000007', sort: 3, status: '启用' }
        ]
      },
      {
        id: 3,
        name: '产品部',
        leader: '陈经理',
        phone: '13800000003',
        sort: 2,
        status: '启用',
        children: [
          {
            id: 8,
            name: '产品一组',
            leader: '周组长',
            phone: '13800000008',
            sort: 1,
            status: '启用'
          },
          {
            id: 9,
            name: '产品二组',
            leader: '吴组长',
            phone: '13800000009',
            sort: 2,
            status: '禁用'
          }
        ]
      },
      { id: 4, name: '市场部', leader: '刘经理', phone: '13800000004', sort: 3, status: '启用' }
    ]
  }
]

function flattenTree(nodes: DeptNode[], level = 0): (DeptNode & { level: number })[] {
  return nodes.flatMap((n) => [{ ...n, level }, ...flattenTree(n.children || [], level + 1)])
}

const flatList = computed(() => flattenTree(deptTree))
</script>

<template>
  <div class="page-container">
    <div class="table-card">
      <div class="table-toolbar">
        <YhSpace>
          <YhButton type="primary" v-permission="'dept:edit'">新增部门</YhButton>
          <YhButton>展开全部</YhButton>
          <YhButton>折叠全部</YhButton>
        </YhSpace>
      </div>

      <YhTable :data="flatList" border stripe height="auto" row-key="id">
        <YhTableColumn prop="name" label="部门名称" width="240">
          <template #default="{ row }">
            <span :style="{ paddingLeft: row.level * 24 + 'px' }"
              >{{ row.level > 0 ? '├ ' : '' }}{{ row.name }}</span
            >
          </template>
        </YhTableColumn>
        <YhTableColumn prop="leader" label="负责人" width="120" />
        <YhTableColumn prop="phone" label="联系电话" width="150" />
        <YhTableColumn prop="sort" label="排序" width="80" />
        <YhTableColumn prop="status" label="状态" width="100">
          <template #default="{ row }">
            <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">{{
              row.status
            }}</YhTag>
          </template>
        </YhTableColumn>
        <YhTableColumn label="操作" width="200">
          <template #default>
            <YhSpace>
              <YhButton type="primary" link size="small" v-permission="'dept:edit'">编辑</YhButton>
              <YhButton type="primary" link size="small">添加子级</YhButton>
              <YhButton type="danger" link size="small" v-permission="'dept:delete'">删除</YhButton>
            </YhSpace>
          </template>
        </YhTableColumn>
      </YhTable>
    </div>
  </div>
</template>
