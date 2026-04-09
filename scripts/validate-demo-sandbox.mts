import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import {
  createSandboxProjectFiles,
  getSandboxSupport
} from '../docs/.vitepress/theme/utils/demo-sandbox'

const execAsync = promisify(exec)
const packageManagerBin = process.platform === 'win32' ? 'pnpm' : 'pnpm'

const rootDir = process.cwd()
const tempRoot = path.join(rootDir, '.codex-temp', 'demo-sandbox-validation')

const cases = [
  {
    name: 'basic-button',
    title: 'Basic Button',
    code: `<template>
  <yh-button type="primary">Hello Sandbox</yh-button>
</template>`
  },
  {
    name: 'basic-flow',
    title: 'Basic Flow',
    code: `<template>
  <div style="width: 100%; height: 500px;">
    <yh-flow :nodes="nodes" :edges="edges" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 80, y: 120 }, data: { label: 'Source' } },
  { id: '2', type: 'default', position: { x: 320, y: 120 }, data: { label: 'Process' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])
</script>`,
    context: {
      docPath: 'en/flow/basic.md'
    }
  },
  {
    name: 'custom-edge',
    title: 'Automatic Rendering Demo',
    code: `<template>
  <yh-flow :nodes="nodes" :edges="edges" background="dots" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { registerCustomEdge, type Node, type Edge } from '@yh-ui/flow'
import StepEdgeComponent from './StepEdgeComponent.vue'

registerCustomEdge({
  type: 'step-pulse',
  component: StepEdgeComponent
})

const nodes = ref<Node[]>([
  { id: 'n1', type: 'input', position: { x: 50, y: 150 }, data: { label: 'Source' } },
  { id: 'n2', type: 'default', position: { x: 280, y: 150 }, data: { label: 'Transform' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: 'n1', target: 'n2', type: 'step-pulse', label: 'STREAMING' }
])
</script>

<style>
@keyframes dash {
  to { stroke-dashoffset: -12; }
}
.custom-step-path {
  animation: dash 1s linear infinite;
}
.pulse-dot {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { r: 4; opacity: 1; }
  100% { r: 10; opacity: 0; }
}
</style>`,
    context: {
      docPath: 'en/flow/custom-edges.md'
    }
  },
  {
    name: 'custom-node-template',
    title: 'Template Workspace',
    code: `<template>
  <div class="template-demo">
    <div class="toolbar">
      <button @click="addTemplateNode('approval')">Add Approval Node</button>
      <button @click="addTemplateNode('notification')">Add Notification Node</button>
    </div>
    <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots">
      <template #node="{ node }">
        <component :is="getNodeComponent(node.type)" :data="node.data" :selected="node.selected" />
      </template>
    </yh-flow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  registerCustomNodeTemplate,
  createNodeFromTemplate,
  type Node,
  type Edge
} from '@yh-ui/flow'
import ApprovalNode from './nodes/ApprovalNode.vue'
import NotificationNode from './nodes/NotificationNode.vue'

registerCustomNodeTemplate({
  type: 'approval',
  component: ApprovalNode,
  defaultData: { title: 'Approval', approver: '' },
  defaultWidth: 180,
  defaultHeight: 60
})

registerCustomNodeTemplate({
  type: 'notification',
  component: NotificationNode,
  defaultData: { title: 'Notification', channel: 'email' },
  defaultWidth: 160,
  defaultHeight: 50
})

const flowRef = ref()
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])

const getNodeComponent = (type: string) => {
  const components: Record<string, any> = {
    approval: ApprovalNode,
    notification: NotificationNode
  }
  return components[type]
}

const addTemplateNode = (type: string) => {
  const id = type + '-' + Date.now()
  const position = {
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 200
  }
  const newNode = createNodeFromTemplate(type, id, position)
  if (newNode) {
    nodes.value = [...nodes.value, newNode]
  }
}
</script>`,
    context: {
      docPath: 'en/flow/custom-node-templates.md'
    }
  }
]

async function writeProject(targetDir: string, files: Record<string, string>) {
  for (const [relativePath, content] of Object.entries(files)) {
    const absolutePath = path.join(targetDir, relativePath)
    await mkdir(path.dirname(absolutePath), { recursive: true })
    await writeFile(absolutePath, content, 'utf8')
  }
}

async function validateCase(testCase: (typeof cases)[number]) {
  const support = getSandboxSupport(testCase.code, testCase.context)
  if (!support.supported) {
    throw new Error(`${testCase.name}: ${support.reason ?? 'unsupported'}`)
  }

  const caseDir = path.join(tempRoot, testCase.name)
  const files = createSandboxProjectFiles(testCase.title, testCase.code, testCase.context)

  await rm(caseDir, { recursive: true, force: true })
  await mkdir(caseDir, { recursive: true })
  await writeProject(caseDir, files)

  await execAsync(`${packageManagerBin} install --ignore-workspace`, {
    cwd: caseDir,
    env: process.env,
    windowsHide: true
  })

  await execAsync(`${packageManagerBin} run build`, {
    cwd: caseDir,
    env: process.env,
    windowsHide: true
  })
}

async function main() {
  await rm(tempRoot, { recursive: true, force: true })
  await mkdir(tempRoot, { recursive: true })

  for (const testCase of cases) {
    await validateCase(testCase)
  }

  console.log(`Validated ${cases.length} sandbox demos in ${tempRoot}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
