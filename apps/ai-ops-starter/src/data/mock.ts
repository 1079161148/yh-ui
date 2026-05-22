import type { Edge, Node } from '@yh-ui/flow'
import { dependencyModeMeta, dependencyPackages } from '../config/dependency-mode'

export interface StarterChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createAt: number
  status?: 'loading' | 'generating' | 'success' | 'error' | 'stopped'
  time?: string
  [key: string]: unknown
}

export const dashboardSnapshot = {
  metrics: [
    {
      label: 'Consumer packages',
      value: '3',
      detail: '@yh-ui/yh-ui, @yh-ui/flow, @yh-ui/request'
    },
    {
      label: 'Starter routes',
      value: '5',
      detail: 'dashboard, workspace, flow, operations, settings'
    },
    {
      label: 'Release ring',
      value: 'Canary',
      detail: dependencyModeMeta.releaseRingDetail
    },
    {
      label: 'Next milestone',
      value: 'Starter alpha',
      detail: 'Real workspace routes before template extraction'
    }
  ],
  readiness: [
    {
      title: dependencyModeMeta.readinessTitle,
      status: 'Ready',
      summary: dependencyModeMeta.readinessSummary
    },
    {
      title: 'Workspace isolation',
      status: 'Ready',
      summary:
        'The app lives under apps/* and keeps product shells separate from the internal playground.'
    },
    {
      title: 'Flow surface',
      status: 'Ready',
      summary:
        'Graph editor route is wired as a dedicated page instead of a component-only example.'
    },
    {
      title: 'AI surface',
      status: 'In progress',
      summary:
        'Conversation rail, sources, reasoning, and artifacts are scaffolded for product integration.'
    }
  ],
  environment: {
    runtime: 'Vue 3.5 + Vite 6',
    packageMode: dependencyModeMeta.displayLabel,
    shell: 'apps/ai-ops-starter'
  }
}

export const dashboardEvents = [
  {
    time: '09:18',
    title: 'Starter workspace created',
    detail: dependencyModeMeta.dashboardEventDetail
  },
  {
    time: '09:43',
    title: 'AI workspace route scaffolded',
    detail:
      'Conversation rail, chat surface, sources, reasoning, and artifact drawer are now route-level features.'
  },
  {
    time: '10:07',
    title: 'Flow studio route scaffolded',
    detail: 'Flow editor now has its own canvas shell, controls, and review checklist.'
  }
]

export const releaseSurface = [
  {
    package: '@yh-ui/yh-ui',
    role: 'UI system',
    version: dependencyPackages.ui,
    mode: dependencyModeMeta.releaseSurfaceMode
  },
  {
    package: '@yh-ui/flow',
    role: 'Workflow graph',
    version: dependencyPackages.flow,
    mode: dependencyModeMeta.releaseSurfaceMode
  },
  {
    package: '@yh-ui/request',
    role: 'Data and request layer',
    version: dependencyPackages.request,
    mode: dependencyModeMeta.releaseSurfaceMode
  }
]

export const workspaceConversations = [
  {
    id: 'release-readiness',
    title: 'Release readiness review',
    updatedAt: Date.now() - 1000 * 60 * 12,
    excerpt: 'Summarize release blockers for the canary window.',
    pinned: true
  },
  {
    id: 'design-partner',
    title: 'Design partner intake',
    updatedAt: Date.now() - 1000 * 60 * 48,
    excerpt: 'Draft an onboarding plan for the finance ops tenant.'
  },
  {
    id: 'flow-audit',
    title: 'Flow audit follow-up',
    updatedAt: Date.now() - 1000 * 60 * 130,
    excerpt: 'Review branch conditions and export requirements.'
  }
]

export const workspaceMessages: Record<string, StarterChatMessage[]> = {
  'release-readiness': [
    {
      id: 'sys-1',
      role: 'assistant',
      content:
        'Good morning. I am watching the canary release lane. Ask for blockers, rollout notes, or a stakeholder summary.',
      createAt: Date.now() - 1000 * 60 * 18,
      status: 'success'
    },
    {
      id: 'usr-1',
      role: 'user',
      content: 'Give me the release highlights before the noon checkpoint.',
      createAt: Date.now() - 1000 * 60 * 16,
      status: 'success'
    },
    {
      id: 'ast-1',
      role: 'assistant',
      content: `Three highlights: 1. consumer install now uses ${dependencyModeMeta.id === 'workspace' ? 'workspace-linked packages' : 'published packages'}, 2. starter route shell is stable, 3. the flow and AI pages are ready for product-level wiring.`,
      createAt: Date.now() - 1000 * 60 * 15,
      status: 'success'
    }
  ],
  'design-partner': [
    {
      id: 'sys-2',
      role: 'assistant',
      content:
        'I can help structure a design partner intake, identify missing requirements, and package the next technical questions.',
      createAt: Date.now() - 1000 * 60 * 60,
      status: 'success'
    }
  ],
  'flow-audit': [
    {
      id: 'sys-3',
      role: 'assistant',
      content:
        'The workflow route is available. Ask for branch rules, node ownership, or export validation steps.',
      createAt: Date.now() - 1000 * 60 * 140,
      status: 'success'
    }
  ]
}

export const workspacePrompts = [
  'Summarize release blockers for the current tenant',
  'Draft a stakeholder update for today',
  'List missing steps in the workflow approval chain'
]

export const workspaceSources = [
  {
    id: 1,
    title: 'Starter route plan',
    source: 'YH-UI docs',
    fileType: 'web',
    score: 0.98,
    excerpt:
      'The starter should provide a real app shell with workspace, flow, and operations routes.'
  },
  {
    id: 2,
    title: 'Open source and commercial boundary',
    source: 'Strategy note',
    fileType: 'doc',
    score: 0.91,
    excerpt: 'Keep the core open. Charge later around starters, blocks, and implementation support.'
  },
  {
    id: 3,
    title: 'Release validation checklist',
    source: 'Repository automation',
    fileType: 'xlsx',
    score: 0.86,
    excerpt:
      'Published package verification, workspace-mode validation, and docs build are part of the release path.'
  },
  {
    id: 4,
    title: 'Design partner intake',
    source: 'Issue template',
    fileType: 'web',
    score: 0.82,
    excerpt: 'Collect product stage, blockers, goals, and whether the case can be public.'
  }
]

export const workspaceArtifact = {
  id: 'artifact-ops-cockpit',
  title: 'Operations cockpit prototype',
  type: 'echarts',
  currentVersion: '1',
  versions: [{ version: '1', content: '', description: 'Starter artifact preview' }],
  echartsOption: {
    chartType: 'line',
    dataZoom: true,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Queue pressure by hour', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Incidents', 'Imports', 'Approvals'], bottom: 0 },
      xAxis: {
        type: 'category',
        data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Incidents',
          type: 'line',
          smooth: true,
          data: [7, 6, 4, 5, 3, 2],
          areaStyle: { opacity: 0.12 }
        },
        {
          name: 'Imports',
          type: 'line',
          smooth: true,
          data: [2, 3, 5, 4, 2, 1]
        },
        {
          name: 'Approvals',
          type: 'line',
          smooth: true,
          data: [4, 4, 3, 2, 2, 1]
        }
      ]
    }
  }
}

export const flowStudioNodes: Node[] = [
  {
    id: 'start',
    type: 'input',
    position: { x: 80, y: 160 },
    data: { label: 'Tenant request' },
    width: 170,
    height: 52
  },
  {
    id: 'triage',
    type: 'default',
    position: { x: 340, y: 110 },
    data: { label: 'Triage intake' },
    width: 170,
    height: 52
  },
  {
    id: 'workspace',
    type: 'default',
    position: { x: 340, y: 240 },
    data: { label: 'Workspace generation' },
    width: 190,
    height: 52
  },
  {
    id: 'approval',
    type: 'default',
    position: { x: 650, y: 110 },
    data: { label: 'Release approval' },
    width: 180,
    height: 52
  },
  {
    id: 'ship',
    type: 'output',
    position: { x: 650, y: 250 },
    data: { label: 'Ship starter' },
    width: 170,
    height: 52
  }
]

export const flowStudioEdges: Edge[] = [
  { id: 'start-triage', source: 'start', target: 'triage', type: 'bezier', animated: true },
  { id: 'start-workspace', source: 'start', target: 'workspace', type: 'bezier' },
  { id: 'triage-approval', source: 'triage', target: 'approval', type: 'bezier' },
  { id: 'workspace-ship', source: 'workspace', target: 'ship', type: 'bezier' },
  { id: 'approval-ship', source: 'approval', target: 'ship', type: 'bezier', label: 'greenlight' }
]

export const flowRunbook = [
  'Triage intake requirements before modeling workflow branches.',
  'Keep one route for orchestration editing, one for operations review.',
  'Treat export, approval, and rollback as first-class path decisions.'
]

export const operationsMetrics = [
  { label: 'Open incidents', value: '7', detail: '2 waiting on schema clarification' },
  { label: 'Queued imports', value: '19', detail: 'Bulk catalog sync in progress' },
  { label: 'SLA at risk', value: '3', detail: 'Partner tenant tickets older than 18h' },
  { label: 'Ready releases', value: '2', detail: 'Awaiting business sign-off' }
]

export const operationsRows = [
  {
    queue: 'Partner onboarding',
    owner: 'Solutions',
    status: 'Awaiting data model',
    priority: 'P1',
    eta: 'Today 16:00'
  },
  {
    queue: 'Flow export bug',
    owner: 'Flow team',
    status: 'Fix in validation',
    priority: 'P0',
    eta: 'Today 12:30'
  },
  {
    queue: 'Starter theme request',
    owner: 'Design system',
    status: 'Needs token mapping',
    priority: 'P2',
    eta: 'Tomorrow'
  },
  {
    queue: 'Ops dashboard intake',
    owner: 'Platform',
    status: 'Scoped and queued',
    priority: 'P1',
    eta: 'Tomorrow'
  }
]

export const operationsPlaybooks = [
  {
    title: 'Intake triage',
    detail:
      'Map tenant request to workspace, flow, or operations surface before assigning implementation.'
  },
  {
    title: 'Release evidence',
    detail:
      'Keep package version, consumer build, and route screenshot evidence together in one review pass.'
  },
  {
    title: 'Escalation hygiene',
    detail: 'Move design partner questions out of bug queues as early as possible.'
  }
]

export const settingsDefaults = {
  workspaceName: 'AI Ops Starter',
  tenant: 'design-partner-canary',
  locale: 'zh-CN',
  density: 'comfortable',
  releaseChannel: 'canary',
  allowStreaming: true,
  allowArtifacts: true,
  requireApproval: true,
  exposeShowcase: false,
  allowedModels: ['gpt-4.1', 'gpt-4o-mini', 'deep-reasoner'],
  sourceConnectors: ['docs', 'issues', 'roadmap']
}
