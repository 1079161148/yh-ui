<script setup lang="ts">
import { computed } from 'vue'

interface MenuRow extends Record<string, unknown> {
  id: number
  name: string
  icon: string
  path: string
  component: string
  permission: string
  type: 'dir' | 'menu' | 'button'
  sort: number
  status: string
  children?: MenuRow[]
}

const menuData: MenuRow[] = [
  {
    id: 1,
    name: '工作台',
    icon: 'home',
    path: '/dashboard',
    component: 'dashboard/index',
    permission: '',
    type: 'menu',
    sort: 1,
    status: '启用'
  },
  {
    id: 2,
    name: '系统管理',
    icon: 'setting',
    path: '/system',
    component: 'layout',
    permission: '',
    type: 'dir',
    sort: 2,
    status: '启用',
    children: [
      {
        id: 3,
        name: '用户管理',
        icon: 'user',
        path: '/system/user',
        component: 'system/user',
        permission: 'user:list',
        type: 'menu',
        sort: 1,
        status: '启用',
        children: [
          {
            id: 4,
            name: '新增用户',
            icon: '',
            path: '',
            component: '',
            permission: 'user:add',
            type: 'button',
            sort: 1,
            status: '启用'
          },
          {
            id: 5,
            name: '编辑用户',
            icon: '',
            path: '',
            component: '',
            permission: 'user:edit',
            type: 'button',
            sort: 2,
            status: '启用'
          },
          {
            id: 6,
            name: '删除用户',
            icon: '',
            path: '',
            component: '',
            permission: 'user:delete',
            type: 'button',
            sort: 3,
            status: '启用'
          }
        ]
      },
      {
        id: 7,
        name: '部门管理',
        icon: 'folder',
        path: '/system/dept',
        component: 'system/dept',
        permission: 'dept:list',
        type: 'menu',
        sort: 2,
        status: '启用'
      },
      {
        id: 8,
        name: '角色管理',
        icon: 'user',
        path: '/system/role',
        component: 'system/role',
        permission: 'role:list',
        type: 'menu',
        sort: 3,
        status: '启用'
      },
      {
        id: 9,
        name: '菜单管理',
        icon: 'folder-opened',
        path: '/system/menu',
        component: 'system/menu',
        permission: 'menu:list',
        type: 'menu',
        sort: 4,
        status: '启用'
      },
      {
        id: 10,
        name: '按钮权限',
        icon: 'code',
        path: '/system/permission',
        component: 'system/permission',
        permission: 'permission:list',
        type: 'menu',
        sort: 5,
        status: '启用'
      }
    ]
  },
  {
    id: 11,
    name: '内容管理',
    icon: 'document',
    path: '/content',
    component: 'layout',
    permission: '',
    type: 'dir',
    sort: 3,
    status: '启用',
    children: [
      {
        id: 12,
        name: '文章管理',
        icon: 'document',
        path: '/content/article',
        component: 'content/article',
        permission: 'article:list',
        type: 'menu',
        sort: 1,
        status: '启用'
      },
      {
        id: 13,
        name: '分类管理',
        icon: 'folder',
        path: '/content/category',
        component: 'content/category',
        permission: 'category:list',
        type: 'menu',
        sort: 2,
        status: '启用'
      }
    ]
  },
  {
    id: 14,
    name: '表格示例',
    icon: 'table',
    path: '/table',
    component: 'table/index',
    permission: '',
    type: 'menu',
    sort: 4,
    status: '启用'
  },
  {
    id: 15,
    name: '表单页面',
    icon: 'edit',
    path: '/form',
    component: 'form/index',
    permission: '',
    type: 'menu',
    sort: 5,
    status: '启用'
  }
]

const typeLabel: Record<string, string> = { dir: '目录', menu: '菜单', button: '按钮' }
const typeColor: Record<string, string> = { dir: 'info', menu: 'success', button: 'warning' }

function flattenTree(nodes: MenuRow[], level = 0): (MenuRow & { level: number })[] {
  return nodes.flatMap((n) => [{ ...n, level }, ...flattenTree(n.children || [], level + 1)])
}

const flatList = computed(() => flattenTree(menuData))
</script>

<template>
  <div class="page-container">
    <div class="table-card">
      <div class="table-toolbar">
        <YhSpace>
          <YhButton type="primary" v-permission="'menu:edit'">新增菜单</YhButton>
          <YhButton>展开全部</YhButton>
          <YhButton>折叠全部</YhButton>
        </YhSpace>
      </div>

      <YhTable :data="flatList" border stripe height="auto" row-key="id">
        <YhTableColumn prop="name" label="菜单名称" width="250">
          <template #default="{ row }">
            <span :style="{ paddingLeft: row.level * 28 + 'px' }">
              <template v-if="row.level > 0">├ </template>
              <YhIcon
                v-if="row.icon"
                :name="row.icon"
                :size="16"
                style="vertical-align: middle; margin-right: 6px"
              />
              {{ row.name }}
            </span>
          </template>
        </YhTableColumn>
        <YhTableColumn prop="type" label="类型" width="100">
          <template #default="{ row }">
            <YhTag :type="typeColor[row.type] as any" size="small">{{ typeLabel[row.type] }}</YhTag>
          </template>
        </YhTableColumn>
        <YhTableColumn prop="path" label="路由路径" width="180" />
        <YhTableColumn prop="component" label="组件路径" width="180" />
        <YhTableColumn prop="permission" label="权限标识" width="160">
          <template #default="{ row }">
            <YhTag v-if="row.permission" type="info" size="small">{{ row.permission }}</YhTag>
            <span v-else style="color: var(--admin-text-secondary)">-</span>
          </template>
        </YhTableColumn>
        <YhTableColumn prop="sort" label="排序" width="80" />
        <YhTableColumn prop="status" label="状态" width="90">
          <template #default="{ row }">
            <YhTag :type="row.status === '启用' ? 'success' : 'danger'" size="small">
              {{ row.status }}
            </YhTag>
          </template>
        </YhTableColumn>
        <YhTableColumn label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <YhSpace>
              <template v-if="row.type !== 'button'">
                <YhButton type="primary" link size="small" v-permission="'menu:edit'">
                  编辑
                </YhButton>
                <YhButton type="primary" link size="small">添加子级</YhButton>
              </template>
              <template v-if="row.type === 'button'">
                <YhButton type="primary" link size="small" v-permission="'menu:edit'">
                  编辑
                </YhButton>
              </template>
              <YhButton type="danger" link size="small" v-permission="'menu:delete'">删除</YhButton>
            </YhSpace>
          </template>
        </YhTableColumn>
      </YhTable>
    </div>
  </div>
</template>
