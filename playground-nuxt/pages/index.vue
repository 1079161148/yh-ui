<template>
  <div class="nuxt-lab">
    <aside class="lab-sidebar">
      <div class="brand">
        <div class="brand-mark">NX</div>
        <div>
          <strong>YH-UI Nuxt Lab</strong>
          <span>SSR and auto-import checks</span>
        </div>
      </div>

      <a v-for="item in menu" :key="item.href" :href="item.href" class="menu-link">
        <span>{{ item.label }}</span>
        <small>{{ item.desc }}</small>
      </a>

      <NuxtLink
        v-for="route in consumerRoutes"
        :key="route.to"
        :to="route.to"
        class="menu-link route-link"
      >
        <span>{{ route.label }}</span>
        <small>{{ route.desc }}</small>
      </NuxtLink>
    </aside>

    <main class="lab-main">
      <section class="hero">
        <div>
          <p class="eyebrow">Nuxt module workbench</p>
          <h1>Industry-style integration playground</h1>
          <p>
            This page validates component auto-registration, composable auto-imports, global service
            imports, component styling, and client hydration in a Nuxt app.
          </p>
        </div>
        <div class="hero-tools">
          <YhSwitch v-model="dense" />
          <span>Dense</span>
          <YhColorPicker v-model="primaryColor" />
        </div>
      </section>

      <section id="health" class="metric-grid">
        <div v-for="item in health" :key="item.label" class="metric">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <small>{{ item.detail }}</small>
        </div>
      </section>

      <section id="quality" class="panel" :class="{ dense }">
        <header>
          <p class="eyebrow">integration gates</p>
          <h2>Nuxt consumer contract</h2>
        </header>
        <YhTable :data="qualityGates" :columns="qualityColumns" border />
      </section>

      <section id="basic" class="panel" :class="{ dense }">
        <header>
          <p class="eyebrow">basic components</p>
          <h2>Visual primitives</h2>
        </header>
        <div class="row">
          <YhButton>Default</YhButton>
          <YhButton type="primary">Primary</YhButton>
          <YhButton type="success">Success</YhButton>
          <YhButton type="warning">Warning</YhButton>
          <YhTag type="success">Auto imported</YhTag>
        </div>
        <YhAlert
          title="The Nuxt module injected styles and registered components."
          type="success"
          show-icon
        />
      </section>

      <section id="form" class="panel" :class="{ dense }">
        <header>
          <p class="eyebrow">forms</p>
          <h2>Model binding and controls</h2>
        </header>
        <YhForm :model="form" label-width="110px">
          <YhFormItem label="Project">
            <YhInput v-model="form.project" />
          </YhFormItem>
          <YhFormItem label="Region">
            <YhSelect v-model="form.region" :options="regionOptions" />
          </YhFormItem>
          <YhFormItem label="Channel">
            <YhRadioGroup v-model="form.channel">
              <YhRadioButton value="stable">Stable</YhRadioButton>
              <YhRadioButton value="next">Next</YhRadioButton>
            </YhRadioGroup>
          </YhFormItem>
          <YhFormItem label="Enabled">
            <YhSwitch v-model="form.enabled" />
          </YhFormItem>
          <YhFormItem label="Score">
            <YhRate v-model="form.score" />
          </YhFormItem>
          <YhFormItem label="Rollout">
            <YhSlider v-model="form.rollout" />
          </YhFormItem>
        </YhForm>
      </section>

      <section id="data" class="panel" :class="{ dense }">
        <header>
          <p class="eyebrow">data display</p>
          <h2>Table, descriptions, pagination</h2>
        </header>
        <YhTable :data="tableData" :columns="columns" border />
        <div class="footer-row">
          <YhPagination v-model:current-page="page" :total="90" layout="prev, pager, next" />
        </div>
        <YhDescriptions title="SSR state" border>
          <YhDescriptionsItem label="Render mode">{{ renderMode }}</YhDescriptionsItem>
          <YhDescriptionsItem label="ID">{{ componentId }}</YhDescriptionsItem>
          <YhDescriptionsItem label="Z index">{{ currentZIndex }}</YhDescriptionsItem>
        </YhDescriptions>
      </section>

      <section id="feedback" class="panel" :class="{ dense }">
        <header>
          <p class="eyebrow">services</p>
          <h2>Global APIs</h2>
        </header>
        <div class="row">
          <YhButton type="success" @click="notify('success')">Success</YhButton>
          <YhButton type="warning" @click="notify('warning')">Warning</YhButton>
          <YhButton type="danger" @click="notify('error')">Error</YhButton>
          <YhButton @click="openNotice">Notification</YhButton>
        </div>
      </section>

      <section id="layout" class="panel" :class="{ dense }">
        <header>
          <p class="eyebrow">layout</p>
          <h2>Container and grid</h2>
        </header>
        <YhContainer class="layout-box">
          <YhHeader>Header</YhHeader>
          <YhContainer>
            <YhAside width="180px">Aside</YhAside>
            <YhMain>Main</YhMain>
          </YhContainer>
        </YhContainer>
        <YhRow :gutter="16">
          <YhCol :span="8"><div class="grid-cell">span 8</div></YhCol>
          <YhCol :span="8"><div class="grid-cell">span 8</div></YhCol>
          <YhCol :span="8"><div class="grid-cell">span 8</div></YhCol>
        </YhRow>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const dense = ref(false)
const primaryColor = ref('#409eff')
const page = ref(1)
const componentId = useYhId()
const { currentZIndex } = useZIndex()
const renderMode = ref('server')

const menu = [
  { href: '#health', label: 'Health', desc: 'module status' },
  { href: '#quality', label: 'Quality', desc: 'integration gates' },
  { href: '#basic', label: 'Basic', desc: 'visual primitives' },
  { href: '#form', label: 'Form', desc: 'model binding' },
  { href: '#data', label: 'Data', desc: 'tables and SSR state' },
  { href: '#feedback', label: 'Feedback', desc: 'global services' },
  { href: '#layout', label: 'Layout', desc: 'containers and grid' }
]

const consumerRoutes = [
  { to: '/color-picker', label: 'ColorPicker route', desc: 'dedicated component page' },
  { to: '/new-components', label: 'Component route', desc: 'expanded smoke page' }
]

const health = computed(() => [
  { label: 'Components', value: 'Auto', detail: 'Yh* auto-registered' },
  { label: 'Hooks', value: 'Auto', detail: 'useZIndex / useYhId' },
  { label: 'Styles', value: primaryColor.value, detail: 'component styles loaded' },
  { label: 'Hydration', value: renderMode.value, detail: 'server to client check' }
])

const qualityColumns = [
  { prop: 'gate', label: 'Gate', width: 190 },
  { prop: 'status', label: 'Status', width: 120 },
  { prop: 'evidence', label: 'Evidence' }
]

const qualityGates = [
  {
    gate: 'Component auto-import',
    status: 'Automated',
    evidence: '<YhButton /> renders without imports'
  },
  { gate: 'Hook auto-import', status: 'Automated', evidence: 'useYhId / useZIndex' },
  { gate: 'Global service imports', status: 'Automated', evidence: 'YhMessage / YhNotification' },
  { gate: 'SSR hydration', status: 'Runtime', evidence: 'server -> client hydrated metric' },
  {
    gate: 'Route-level coverage',
    status: 'Manual + automated',
    evidence: '/color-picker and /new-components'
  },
  { gate: 'Browser smoke', status: 'Automated', evidence: 'pnpm verify:playgrounds' }
]

const regionOptions = [
  { value: 'shanghai', label: 'Shanghai' },
  { value: 'beijing', label: 'Beijing' },
  { value: 'shenzhen', label: 'Shenzhen' }
]

const form = reactive({
  project: 'Nuxt consumer app',
  region: 'shanghai',
  channel: 'stable',
  enabled: true,
  score: 4,
  rollout: 65
})

const columns = [
  { prop: 'name', label: 'Package', width: 180 },
  { prop: 'status', label: 'Status', width: 120 },
  { prop: 'owner', label: 'Owner' }
]

const tableData = [
  { name: '@yh-ui/nuxt', status: 'ready', owner: 'Integrations' },
  { name: '@yh-ui/components', status: 'ready', owner: 'Core UI' },
  { name: '@yh-ui/hooks', status: 'ready', owner: 'Runtime' }
]

onMounted(() => {
  renderMode.value = 'client hydrated'
})

function notify(type: 'success' | 'warning' | 'error') {
  YhMessage[type](`Nuxt ${type} service works`)
}

function openNotice() {
  YhNotification({
    title: 'Nuxt integration',
    message: 'Global service auto-import is working.',
    type: 'success'
  })
}
</script>

<style scoped>
.nuxt-lab {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 100vh;
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

.lab-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #e5e7eb;
  background: #fff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.brand strong,
.brand span,
.menu-link span,
.menu-link small {
  display: block;
}

.brand span,
.menu-link small {
  color: #6b7280;
  font-size: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: #409eff;
  color: #fff;
  font-weight: 800;
}

.menu-link {
  display: grid;
  gap: 3px;
  padding: 12px;
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
}

.menu-link:hover {
  background: #eef6ff;
}

.route-link {
  margin-top: 4px;
  border: 1px solid #e5e7eb;
  background: #fafbfc;
}

.lab-main {
  display: grid;
  gap: 16px;
  padding: 24px;
}

.hero,
.panel,
.metric {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
}

.hero h1,
.panel h2 {
  margin: 4px 0 8px;
  letter-spacing: 0;
}

.hero p {
  max-width: 760px;
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}

.eyebrow {
  margin: 0;
  color: #409eff;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.hero-tools,
.row,
.footer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.metric,
.panel {
  padding: 18px;
}

.metric {
  display: grid;
  gap: 4px;
}

.metric span,
.metric small {
  color: #6b7280;
}

.metric strong {
  font-size: 22px;
}

.panel {
  display: grid;
  gap: 16px;
}

.panel.dense {
  gap: 10px;
  padding: 12px;
}

.layout-box {
  overflow: hidden;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}

.layout-box :deep(.yh-header) {
  display: grid;
  place-items: center;
  background: #b3c0d1;
}

.layout-box :deep(.yh-aside) {
  display: grid;
  place-items: center;
  min-height: 160px;
  background: #d3dce6;
}

.layout-box :deep(.yh-main) {
  display: grid;
  place-items: center;
  min-height: 160px;
  background: #e9eef3;
}

.grid-cell {
  display: grid;
  place-items: center;
  min-height: 64px;
  border-radius: 8px;
  background: #eef6ff;
  color: #1f2937;
  font-weight: 700;
}

@media (max-width: 980px) {
  .nuxt-lab {
    grid-template-columns: 1fr;
  }

  .lab-sidebar {
    position: static;
    height: auto;
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero {
    flex-direction: column;
  }
}
</style>
