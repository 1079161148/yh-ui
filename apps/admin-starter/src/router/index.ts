import type { RouteRecordRaw } from 'vue-router'
import type { MenuItemData } from '@yh-ui/components'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { title: '工作台', icon: 'home' }
      },
      {
        path: 'system',
        name: 'system',
        redirect: '/system/user',
        meta: { title: '系统管理', icon: 'setting' },
        children: [
          {
            path: 'user',
            name: 'systemUser',
            component: () => import('@/views/system/UserManage.vue'),
            meta: { title: '用户管理', icon: 'user', permission: 'user:list' }
          },
          {
            path: 'dept',
            name: 'systemDept',
            component: () => import('@/views/system/DeptManage.vue'),
            meta: { title: '部门管理', icon: 'folder', permission: 'dept:list' }
          },
          {
            path: 'role',
            name: 'systemRole',
            component: () => import('@/views/system/RoleManage.vue'),
            meta: { title: '角色管理', icon: 'user', permission: 'role:list' }
          },
          {
            path: 'menu',
            name: 'systemMenu',
            component: () => import('@/views/system/MenuManage.vue'),
            meta: { title: '菜单管理', icon: 'folder-opened', permission: 'menu:list' }
          },
          {
            path: 'permission',
            name: 'systemPermission',
            component: () => import('@/views/system/PermissionManage.vue'),
            meta: { title: '按钮权限', icon: 'code', permission: 'permission:list' }
          }
        ]
      },
      {
        path: 'content',
        name: 'content',
        redirect: '/content/article',
        meta: { title: '内容管理', icon: 'document' },
        children: [
          {
            path: 'article',
            name: 'contentArticle',
            component: () => import('@/views/content/ArticleManage.vue'),
            meta: { title: '文章管理', icon: 'document', permission: 'article:list' }
          },
          {
            path: 'category',
            name: 'contentCategory',
            component: () => import('@/views/content/CategoryManage.vue'),
            meta: { title: '分类管理', icon: 'folder', permission: 'category:list' }
          }
        ]
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/table/TableListView.vue'),
        meta: { title: '表格示例', icon: 'table' }
      },
      {
        path: 'table/detail/:id',
        name: 'tableDetail',
        component: () => import('@/views/detail/DetailView.vue'),
        meta: { title: '详情页', hidden: true }
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/form/FormView.vue'),
        meta: { title: '表单页面', icon: 'edit' }
      },
      {
        path: 'ai-copilot',
        name: 'aiCopilot',
        component: () => import('@/views/ai/AiCopilotView.vue'),
        meta: { title: 'AI 智能运维', icon: 'star' }
      },
      {
        path: 'component-lab',
        name: 'componentLab',
        component: () => import('@/views/lab/ComponentLabView.vue'),
        meta: { title: '组件实验室', icon: 'grid', requiresAuth: false }
      },
      {
        path: 'user',
        name: 'userCenter',
        component: () => import('@/views/user/UserCenterView.vue'),
        meta: { title: '个人中心', icon: 'user', hidden: true }
      },
      {
        path: 'forbidden',
        name: 'forbidden',
        component: () => import('@/views/error/ForbiddenView.vue'),
        meta: { title: '403', hidden: true }
      }
    ]
  },
  {
    path: '/network-error',
    name: 'networkError',
    component: () => import('@/views/error/NetworkErrorView.vue'),
    meta: { title: '网络错误', requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: { title: '404', requiresAuth: false }
  }
]

export function generateMenuFromRoutes(
  routeList: RouteRecordRaw[],
  parentPath = ''
): MenuItemData[] {
  const result: MenuItemData[] = []

  for (const route of routeList) {
    const meta = route.meta as Record<string, unknown> | undefined
    if (meta?.hidden) continue

    const fullPath = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`.replace(/\/+/g, '/')

    const filteredChildren = route.children?.filter((child) => {
      const childMeta = child.meta as Record<string, unknown> | undefined
      return !childMeta?.hidden
    })

    if (filteredChildren && filteredChildren.length > 0) {
      result.push({
        index: fullPath,
        label: (meta?.title as string) || route.path,
        icon: (meta?.icon as string) || 'folder',
        children: generateMenuFromRoutes(filteredChildren, fullPath)
      })
    } else {
      result.push({
        index: fullPath,
        label: (meta?.title as string) || route.path,
        icon: (meta?.icon as string) || 'document'
      })
    }
  }

  return result
}
