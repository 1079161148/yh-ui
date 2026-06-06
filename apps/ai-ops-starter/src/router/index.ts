import type { RouteRecordRaw } from 'vue-router'
import { dependencyModeMeta } from '../config/dependency-mode'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/AppShell.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: {
          section: 'Starter',
          title: 'Control Tower',
          description: dependencyModeMeta.routerDescription
        }
      },
      {
        path: 'workspace',
        name: 'workspace',
        component: () => import('../views/WorkspaceView.vue'),
        meta: {
          section: 'Flagship',
          title: 'AI Workspace',
          description:
            'Conversation rail, generative work surface, reasoning context, and artifact preview.'
        }
      },
      {
        path: 'flow',
        name: 'flow',
        component: () => import('../views/FlowStudioView.vue'),
        meta: {
          section: 'Flagship',
          title: 'Flow Studio',
          description:
            'A route shell for orchestration, review gates, and workflow graph operations.'
        }
      },
      {
        path: 'operations',
        name: 'operations',
        component: () => import('../views/OperationsView.vue'),
        meta: {
          section: 'Flagship',
          title: 'Operations Console',
          description:
            'Data-dense release and incident views built as a real consumer app, not a docs demo.'
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/SettingsView.vue'),
        meta: {
          section: 'Starter',
          title: 'Workspace Settings',
          description:
            'Shared defaults for routing, release policy, model access, and tenant-level product switches.'
        }
      }
    ]
  }
]
