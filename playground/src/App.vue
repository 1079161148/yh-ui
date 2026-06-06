<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { YhMessage, YhMessageBox, YhNotification } from '@yh-ui/components'
import type { Edge, Node, ViewportTransform } from '@yh-ui/flow'

type SectionKey =
  | 'overview'
  | 'quality'
  | 'basic'
  | 'form'
  | 'data'
  | 'feedback'
  | 'navigation'
  | 'layout'
  | 'flow'

const sections: Array<{ key: SectionKey; label: string; summary: string; count: number }> = [
  { key: 'overview', label: 'Overview', summary: 'release dashboard', count: 8 },
  { key: 'quality', label: 'Quality', summary: 'gates and state matrix', count: 16 },
  { key: 'basic', label: 'Basic', summary: 'buttons, tags, progress', count: 12 },
  { key: 'form', label: 'Form', summary: 'inputs and validation', count: 14 },
  { key: 'data', label: 'Data', summary: 'tables and descriptions', count: 9 },
  { key: 'feedback', label: 'Feedback', summary: 'messages and dialogs', count: 10 },
  { key: 'navigation', label: 'Navigation', summary: 'tabs, steps, breadcrumb', count: 7 },
  { key: 'layout', label: 'Layout', summary: 'container and grid', count: 8 },
  { key: 'flow', label: 'Flow', summary: 'node editor smoke test', count: 6 }
]

const activeSection = ref<SectionKey>('overview')
const darkMode = ref(false)
const compactMode = ref(false)
const brandColor = ref('#409eff')
const search = ref('')
const activeTab = ref('usage')
const currentStep = ref(2)
const currentPage = ref(1)
const rating = ref(4)
const sliderValue = ref(62)
const enabled = ref(true)
const dateValue = ref('')
const tags = ref(['Vue', 'TypeScript'])
const selectedCities = ref(['shanghai'])

const form = reactive({
  name: 'YH Admin',
  owner: 'Design Platform',
  email: 'platform@yh-ui.dev',
  region: 'shanghai',
  delivery: true,
  channel: 'stable',
  notes: 'Use this playground as the daily acceptance surface before release.'
})

const cityOptions = [
  { value: 'beijing', label: 'Beijing' },
  { value: 'shanghai', label: 'Shanghai' },
  { value: 'shenzhen', label: 'Shenzhen' },
  { value: 'hangzhou', label: 'Hangzhou' }
]

const tableColumns = [
  { prop: 'name', label: 'Package', width: 180 },
  { prop: 'status', label: 'Status', width: 120 },
  { prop: 'coverage', label: 'Coverage', width: 120 },
  { prop: 'owner', label: 'Owner' }
]

const tableData = ref([
  { id: 1, name: '@yh-ui/components', status: 'stable', coverage: '86%', owner: 'Core UI' },
  { id: 2, name: '@yh-ui/hooks', status: 'stable', coverage: '91%', owner: 'Runtime' },
  { id: 3, name: '@yh-ui/flow', status: 'beta', coverage: '78%', owner: 'Flow' },
  { id: 4, name: '@yh-ui/nuxt', status: 'stable', coverage: '82%', owner: 'Integrations' }
])

const auditItems = [
  { label: 'Theme tokens', status: 'Passed', value: 'CSS variables' },
  { label: 'Tree shaking', status: 'Passed', value: 'ESM exports' },
  { label: 'SSR', status: 'Passed', value: 'Nuxt module' },
  { label: 'Sandbox', status: 'Passed', value: 'Playground / StackBlitz / CodeSandbox' }
]

const qualityGates = [
  { gate: 'Console hygiene', level: 'P0', status: 'Automated', command: 'pnpm verify:playgrounds' },
  {
    gate: 'Desktop screenshot',
    level: 'P0',
    status: 'Automated',
    command: 'test-results/playgrounds/*-desktop.png'
  },
  {
    gate: 'Mobile screenshot',
    level: 'P0',
    status: 'Automated',
    command: 'test-results/playgrounds/*-mobile.png'
  },
  {
    gate: 'Vue consumer build',
    level: 'P0',
    status: 'Automated',
    command: 'pnpm -C playground build'
  },
  {
    gate: 'Nuxt consumer build',
    level: 'P0',
    status: 'Automated',
    command: 'pnpm -C playground-nuxt build'
  },
  { gate: 'SSR hydration', level: 'P1', status: 'Tracked', command: 'Nuxt health panel' }
]

const componentMatrix = [
  {
    group: 'Basic',
    components: 'Button, Tag, Badge, Progress, Alert',
    states: 'type, size, disabled, loading'
  },
  {
    group: 'Form',
    components: 'Input, Select, Radio, Checkbox, Rate, Slider',
    states: 'model, clearable, validation, density'
  },
  {
    group: 'Data',
    components: 'Table, Pagination, Descriptions',
    states: 'border, empty, paging, fixed content'
  },
  {
    group: 'Feedback',
    components: 'Message, Notification, MessageBox, Result',
    states: 'service API, z-index, close flow'
  },
  {
    group: 'Navigation',
    components: 'Breadcrumb, Tabs, Steps',
    states: 'active, keyboard, route context'
  },
  {
    group: 'Layout',
    components: 'Container, Row, Col, Grid',
    states: 'responsive, nested, density'
  },
  {
    group: 'Flow',
    components: 'Flow, Controls, Minimap',
    states: 'drag, add node, fit view, readonly'
  }
]

const flowNodes = ref<Node[]>([
  {
    id: 'start',
    type: 'input',
    position: { x: 80, y: 120 },
    data: { label: 'Install package' },
    width: 170,
    height: 52
  },
  {
    id: 'import',
    type: 'default',
    position: { x: 350, y: 80 },
    data: { label: 'Import styles' },
    width: 170,
    height: 52
  },
  {
    id: 'render',
    type: 'default',
    position: { x: 350, y: 220 },
    data: { label: 'Render component' },
    width: 170,
    height: 52
  },
  {
    id: 'done',
    type: 'output',
    position: { x: 630, y: 150 },
    data: { label: 'Ship feature' },
    width: 170,
    height: 52
  }
])

const flowEdges = ref<Edge[]>([
  { id: 'e-start-import', source: 'start', target: 'import', type: 'bezier', animated: true },
  { id: 'e-start-render', source: 'start', target: 'render', type: 'bezier' },
  { id: 'e-import-done', source: 'import', target: 'done', type: 'bezier' },
  { id: 'e-render-done', source: 'render', target: 'done', type: 'bezier', label: 'validated' }
])

const flowViewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const flowRef = ref()
const logs = ref<Array<{ type: string; message: string; time: string }>>([])

const filteredSections = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return sections
  return sections.filter((item) => `${item.label} ${item.summary}`.toLowerCase().includes(keyword))
})

const visibleSections = computed(() =>
  activeSection.value === 'overview'
    ? sections.filter((item) => item.key !== 'overview')
    : sections.filter((item) => item.key === activeSection.value)
)

const shellStyle = computed(() => ({
  '--playground-primary': brandColor.value,
  '--playground-density': compactMode.value ? '8px' : '14px'
}))

function addLog(type: string, message: string) {
  logs.value.unshift({
    type,
    message,
    time: new Date().toLocaleTimeString('en-US', { hour12: false })
  })
  logs.value = logs.value.slice(0, 8)
}

function openMessage(type: 'success' | 'warning' | 'error' | 'info') {
  YhMessage[type](`YH-UI ${type} message from playground`)
  addLog('message', `Opened ${type} message`)
}

function openNotification() {
  YhNotification({
    title: 'Release check',
    message: 'The notification service is mounted and callable.',
    type: 'success'
  })
  addLog('notify', 'Opened notification')
}

async function openConfirm() {
  try {
    await YhMessageBox.confirm('This confirms MessageBox service wiring.', 'Playground check')
    addLog('dialog', 'Confirm accepted')
  } catch {
    addLog('dialog', 'Confirm closed')
  }
}

function addFlowNode() {
  const index = flowNodes.value.length + 1
  flowNodes.value.push({
    id: `node-${index}`,
    type: 'default',
    position: { x: 120 + index * 42, y: 310 },
    data: { label: `Audit node ${index}` },
    width: 150,
    height: 50
  })
  addLog('flow', `Added node ${index}`)
}

function fitFlow() {
  flowRef.value?.fitView?.({ padding: 48 })
  addLog('flow', 'Fit view')
}
</script>

<template>
  <div
    class="playground-shell"
    :class="{ 'is-dark': darkMode, 'is-compact': compactMode }"
    :style="shellStyle"
  >
    <aside class="playground-sidebar">
      <div class="brand">
        <div class="brand-mark">YH</div>
        <div>
          <strong>YH-UI Lab</strong>
          <span>Component acceptance</span>
        </div>
      </div>

      <YhInput v-model="search" class="search" placeholder="Search modules" clearable />

      <nav class="nav-list">
        <button
          v-for="item in filteredSections"
          :key="item.key"
          class="nav-item"
          :class="{ active: activeSection === item.key }"
          :data-section="item.key"
          type="button"
          @click="activeSection = item.key"
        >
          <span>{{ item.label }}</span>
          <small>{{ item.summary }}</small>
          <em>{{ item.count }}</em>
        </button>
      </nav>
    </aside>

    <main class="playground-main">
      <header class="topbar">
        <div>
          <p class="eyebrow">Vue 3 playground</p>
          <h1>YH-UI component library workbench</h1>
        </div>
        <div class="topbar-actions">
          <YhSwitch v-model="darkMode" />
          <span>Dark</span>
          <YhSwitch v-model="compactMode" />
          <span>Compact</span>
          <YhColorPicker v-model="brandColor" />
        </div>
      </header>

      <section class="metric-strip">
        <div v-for="item in auditItems" :key="item.label" class="metric">
          <span>{{ item.label }}</span>
          <strong>{{ item.status }}</strong>
          <small>{{ item.value }}</small>
        </div>
      </section>

      <section v-if="activeSection === 'overview'" class="hero-panel">
        <div>
          <YhTag type="success">Full install</YhTag>
          <h2>One page for daily UI verification</h2>
          <p>
            This local surface checks global registration, theme variables, form binding, overlays,
            data display, layout primitives, and the Flow editor in one place.
          </p>
        </div>
        <div class="hero-actions">
          <YhButton type="primary" @click="activeSection = 'form'">Open form matrix</YhButton>
          <YhButton @click="activeSection = 'flow'">Open Flow check</YhButton>
        </div>
      </section>

      <section class="platform-grid">
        <div class="platform-panel">
          <header class="section-header compact">
            <div>
              <p class="eyebrow">quality gates</p>
              <h2>Release confidence</h2>
            </div>
          </header>
          <div class="gate-list">
            <div v-for="gate in qualityGates" :key="gate.gate" class="gate-item">
              <YhTag :type="gate.level === 'P0' ? 'danger' : 'warning'">{{ gate.level }}</YhTag>
              <strong>{{ gate.gate }}</strong>
              <span>{{ gate.status }}</span>
              <code>{{ gate.command }}</code>
            </div>
          </div>
        </div>

        <div class="platform-panel">
          <header class="section-header compact">
            <div>
              <p class="eyebrow">taxonomy</p>
              <h2>Component state matrix</h2>
            </div>
          </header>
          <div class="matrix-list">
            <div v-for="item in componentMatrix" :key="item.group" class="matrix-item">
              <strong>{{ item.group }}</strong>
              <span>{{ item.components }}</span>
              <small>{{ item.states }}</small>
            </div>
          </div>
        </div>
      </section>

      <div class="section-grid">
        <section v-for="section in visibleSections" :key="section.key" class="demo-section">
          <header class="section-header">
            <div>
              <p class="eyebrow">{{ section.summary }}</p>
              <h2>{{ section.label }}</h2>
            </div>
            <YhBadge :value="section.count">
              <YhTag>checks</YhTag>
            </YhBadge>
          </header>

          <div v-if="section.key === 'quality'" class="demo-stack">
            <YhTable
              :data="qualityGates"
              :columns="[
                { prop: 'gate', label: 'Gate', width: 180 },
                { prop: 'level', label: 'Level', width: 90 },
                { prop: 'status', label: 'Status', width: 120 },
                { prop: 'command', label: 'Evidence' }
              ]"
              border
            />
            <YhDescriptions title="Automation contract" border>
              <YhDescriptionsItem label="Runner">Playwright</YhDescriptionsItem>
              <YhDescriptionsItem label="Viewports">Desktop / Mobile</YhDescriptionsItem>
              <YhDescriptionsItem label="Output">test-results/playgrounds</YhDescriptionsItem>
            </YhDescriptions>
          </div>

          <div v-else-if="section.key === 'basic'" class="demo-stack">
            <div class="demo-row">
              <YhButton>Default</YhButton>
              <YhButton type="primary">Primary</YhButton>
              <YhButton type="success">Success</YhButton>
              <YhButton type="warning">Warning</YhButton>
              <YhButton type="danger">Danger</YhButton>
            </div>
            <div class="demo-row">
              <YhTag>Default</YhTag>
              <YhTag type="success">Stable</YhTag>
              <YhTag type="warning">Beta</YhTag>
              <YhTag type="danger">Blocked</YhTag>
              <YhProgress :percentage="72" />
            </div>
            <YhAlert title="The component plugin is installed globally." type="success" show-icon />
          </div>

          <div v-else-if="section.key === 'form'" class="form-layout">
            <YhForm :model="form" label-width="120px">
              <YhFormItem label="Project">
                <YhInput v-model="form.name" placeholder="Project name" />
              </YhFormItem>
              <YhFormItem label="Owner">
                <YhInput v-model="form.owner" />
              </YhFormItem>
              <YhFormItem label="Region">
                <YhSelect
                  v-model="form.region"
                  :options="cityOptions"
                  placeholder="Select region"
                />
              </YhFormItem>
              <YhFormItem label="Delivery">
                <YhSwitch v-model="form.delivery" />
              </YhFormItem>
              <YhFormItem label="Channel">
                <YhRadioGroup v-model="form.channel">
                  <YhRadioButton value="stable">Stable</YhRadioButton>
                  <YhRadioButton value="next">Next</YhRadioButton>
                </YhRadioGroup>
              </YhFormItem>
              <YhFormItem label="Cities">
                <YhCheckboxGroup v-model="selectedCities">
                  <YhCheckbox value="beijing">Beijing</YhCheckbox>
                  <YhCheckbox value="shanghai">Shanghai</YhCheckbox>
                  <YhCheckbox value="shenzhen">Shenzhen</YhCheckbox>
                </YhCheckboxGroup>
              </YhFormItem>
              <YhFormItem label="Score">
                <YhRate v-model="rating" />
              </YhFormItem>
              <YhFormItem label="Rollout">
                <YhSlider v-model="sliderValue" />
              </YhFormItem>
              <YhFormItem label="Tags">
                <YhInputTag v-model="tags" />
              </YhFormItem>
              <YhFormItem label="Date">
                <YhDatePicker v-model="dateValue" placeholder="Pick date" />
              </YhFormItem>
            </YhForm>
          </div>

          <div v-else-if="section.key === 'data'" class="demo-stack">
            <YhTable :data="tableData" :columns="tableColumns" border />
            <YhPagination
              v-model:current-page="currentPage"
              :total="120"
              layout="prev, pager, next"
            />
            <YhDescriptions title="Package detail" border>
              <YhDescriptionsItem label="Runtime">Vue 3.5</YhDescriptionsItem>
              <YhDescriptionsItem label="Bundler">Vite</YhDescriptionsItem>
              <YhDescriptionsItem label="Module">ESM</YhDescriptionsItem>
            </YhDescriptions>
          </div>

          <div v-else-if="section.key === 'feedback'" class="demo-stack">
            <div class="demo-row">
              <YhButton type="success" @click="openMessage('success')">Success message</YhButton>
              <YhButton type="warning" @click="openMessage('warning')">Warning message</YhButton>
              <YhButton type="danger" @click="openMessage('error')">Error message</YhButton>
              <YhButton @click="openNotification">Notification</YhButton>
              <YhButton @click="openConfirm">Confirm</YhButton>
            </div>
            <YhResult
              status="success"
              title="Feedback services ready"
              sub-title="Message, notification, and dialog APIs are callable."
            />
          </div>

          <div v-else-if="section.key === 'navigation'" class="demo-stack">
            <YhBreadcrumb>
              <YhBreadcrumbItem>Playground</YhBreadcrumbItem>
              <YhBreadcrumbItem>Components</YhBreadcrumbItem>
              <YhBreadcrumbItem>{{ activeTab }}</YhBreadcrumbItem>
            </YhBreadcrumb>
            <YhTabs v-model="activeTab">
              <YhTabPane label="Usage" name="usage"> Usage examples stay mounted. </YhTabPane>
              <YhTabPane label="Tokens" name="tokens"> Token switching is live. </YhTabPane>
              <YhTabPane label="SSR" name="ssr">
                Nuxt validates server rendering separately.
              </YhTabPane>
            </YhTabs>
            <YhSteps :active="currentStep">
              <YhStep title="Install" />
              <YhStep title="Import" />
              <YhStep title="Verify" />
              <YhStep title="Release" />
            </YhSteps>
          </div>

          <div v-else-if="section.key === 'layout'" class="demo-stack">
            <YhContainer class="layout-preview">
              <YhHeader>Header</YhHeader>
              <YhContainer>
                <YhAside width="180px">Aside</YhAside>
                <YhMain>Main content</YhMain>
              </YhContainer>
            </YhContainer>
            <YhRow :gutter="16">
              <YhCol :span="8"><div class="grid-cell">span 8</div></YhCol>
              <YhCol :span="8"><div class="grid-cell">span 8</div></YhCol>
              <YhCol :span="8"><div class="grid-cell">span 8</div></YhCol>
            </YhRow>
          </div>

          <div v-else-if="section.key === 'flow'" class="flow-workbench">
            <div class="flow-toolbar">
              <YhButton type="primary" @click="fitFlow">Fit view</YhButton>
              <YhButton @click="addFlowNode">Add node</YhButton>
              <YhSwitch v-model="enabled" />
              <span>{{ enabled ? 'Editable' : 'Read only' }}</span>
            </div>
            <div class="flow-canvas">
              <YhFlow
                ref="flowRef"
                v-model:nodes="flowNodes"
                v-model:edges="flowEdges"
                v-model="flowViewport"
                :readonly="!enabled"
                background="dots"
                show-controls
                show-minimap
                snap-to-grid
                @node-click="({ node }) => addLog('flow', `Clicked ${node.id}`)"
              />
            </div>
          </div>
        </section>
      </div>

      <aside class="event-drawer">
        <strong>Event log</strong>
        <span v-if="!logs.length">No events yet</span>
        <ul v-else>
          <li v-for="log in logs" :key="`${log.time}-${log.message}`">
            <em>{{ log.time }}</em>
            <span>{{ log.type }}</span>
            {{ log.message }}
          </li>
        </ul>
      </aside>
    </main>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f5f7fb;
  color: #1f2937;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.playground-shell {
  --playground-primary: #409eff;
  --playground-density: 14px;
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr);
  min-height: 100vh;
  background: #f5f7fb;
}

.playground-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #e5e7eb;
  background: #fff;
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 2px;
    color: #6b7280;
    font-size: 12px;
  }
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: var(--playground-primary);
  color: #fff;
  font-weight: 800;
}

.search {
  margin-bottom: 14px;
}

.nav-list {
  display: grid;
  gap: 6px;
}

.nav-item {
  position: relative;
  display: grid;
  gap: 3px;
  width: 100%;
  padding: 11px 42px 11px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #374151;
  text-align: left;
  cursor: pointer;

  span {
    font-weight: 700;
  }

  small {
    color: #6b7280;
  }

  em {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #9ca3af;
    font-style: normal;
    font-size: 12px;
  }

  &.active {
    border-color: color-mix(in srgb, var(--playground-primary) 32%, #fff);
    background: color-mix(in srgb, var(--playground-primary) 10%, #fff);
    color: #111827;
  }
}

.playground-main {
  min-width: 0;
  padding: 24px;
}

.topbar,
.metric-strip,
.hero-panel,
.demo-section,
.event-drawer {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;

  h1 {
    margin: 4px 0 0;
    font-size: 28px;
    letter-spacing: 0;
  }
}

.eyebrow {
  margin: 0;
  color: var(--playground-primary);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.topbar-actions,
.demo-row,
.flow-toolbar,
.hero-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.metric-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin-top: 16px;
  overflow: hidden;
}

.metric {
  display: grid;
  gap: 4px;
  padding: 16px;
  background: #fff;

  span,
  small {
    color: #6b7280;
  }

  strong {
    font-size: 22px;
  }
}

.hero-panel {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 16px;
  padding: 24px;

  h2 {
    margin: 12px 0 8px;
    font-size: 26px;
  }

  p {
    max-width: 720px;
    margin: 0;
    color: #4b5563;
    line-height: 1.7;
  }
}

.section-grid {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.platform-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.platform-panel {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.section-header.compact {
  margin-bottom: 12px;
}

.gate-list,
.matrix-list {
  display: grid;
  gap: 8px;
}

.gate-item,
.matrix-item {
  display: grid;
  gap: 4px;
  padding: 10px;
  border: 1px solid #edf0f5;
  border-radius: 8px;
  background: #fafbfc;
}

.gate-item {
  grid-template-columns: auto minmax(130px, 1fr) auto;
  align-items: center;

  code {
    grid-column: 2 / -1;
    color: #6b7280;
    font-size: 12px;
    white-space: normal;
  }

  span {
    color: #16a34a;
    font-size: 12px;
    font-weight: 700;
  }
}

.matrix-item {
  strong,
  span,
  small {
    display: block;
  }

  span,
  small {
    color: #6b7280;
  }
}

.demo-section {
  padding: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;

  h2 {
    margin: 4px 0 0;
    font-size: 22px;
  }
}

.demo-stack {
  display: grid;
  gap: var(--playground-density);
}

.form-layout {
  max-width: 780px;
}

.layout-preview {
  overflow: hidden;
  border: 1px solid #dcdfe6;
  border-radius: 8px;

  .yh-header,
  .yh-footer {
    display: grid;
    place-items: center;
    background: #b3c0d1;
    color: #334155;
  }

  .yh-aside {
    display: grid;
    place-items: center;
    min-height: 180px;
    background: #d3dce6;
  }

  .yh-main {
    display: grid;
    place-items: center;
    min-height: 180px;
    background: #e9eef3;
  }
}

.grid-cell {
  display: grid;
  place-items: center;
  min-height: 64px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--playground-primary) 12%, #fff);
  color: #1f2937;
  font-weight: 700;
}

.flow-workbench {
  display: grid;
  gap: 12px;
}

.flow-canvas {
  height: 480px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.event-drawer {
  margin-top: 16px;
  padding: 16px;

  strong {
    display: block;
    margin-bottom: 10px;
  }

  span {
    color: #6b7280;
  }

  ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    color: #4b5563;
  }

  em,
  li span {
    margin-right: 8px;
    color: #6b7280;
    font-style: normal;
  }

  li span {
    color: var(--playground-primary);
    font-weight: 700;
  }
}

.is-compact {
  .demo-section,
  .hero-panel,
  .topbar,
  .metric {
    padding: 12px;
  }
}

.is-dark {
  background: #111827;
  color: #e5e7eb;

  .playground-sidebar,
  .topbar,
  .metric-strip,
  .hero-panel,
  .demo-section,
  .platform-panel,
  .event-drawer,
  .metric {
    border-color: #273244;
    background: #162033;
  }

  .nav-item {
    color: #d1d5db;

    &.active {
      background: color-mix(in srgb, var(--playground-primary) 20%, #162033);
    }
  }

  .hero-panel p,
  .metric span,
  .metric small,
  .brand span,
  .nav-item small,
  .gate-item code,
  .matrix-item span,
  .matrix-item small,
  .event-drawer li {
    color: #9ca3af;
  }

  .gate-item,
  .matrix-item {
    border-color: #273244;
    background: #111827;
  }
}

@media (max-width: 980px) {
  .playground-shell {
    grid-template-columns: 1fr;
  }

  .playground-sidebar {
    position: static;
    height: auto;
  }

  .metric-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .platform-grid {
    grid-template-columns: 1fr;
  }

  .hero-panel,
  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
