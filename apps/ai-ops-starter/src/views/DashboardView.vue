<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRequest, type RequestResponse } from '@yh-ui/request'
import { dependencyModeMeta } from '../config/dependency-mode'
import { dashboardEvents, dashboardSnapshot, releaseSurface } from '../data/mock'

const tableColumns = [
  { prop: 'package', label: 'Package', width: 220 },
  { prop: 'role', label: 'Role', width: 180 },
  { prop: 'version', label: 'Version', width: 120 },
  { prop: 'mode', label: 'Mode' }
]

const { data, loading, run } = useRequest<typeof dashboardSnapshot>(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 320))

    const response: RequestResponse<typeof dashboardSnapshot> = {
      data: dashboardSnapshot,
      response: new Response(JSON.stringify(dashboardSnapshot), { status: 200 }),
      config: {
        url: '/starter/dashboard',
        method: 'GET'
      },
      requestId: 'starter-dashboard'
    }

    return response
  },
  { manual: true }
)

const snapshot = computed(() => data.value ?? dashboardSnapshot)

function refreshSignals() {
  void run()
}

onMounted(() => {
  void run()
})
</script>

<template>
  <div class="starter-page">
    <section class="page-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Release Readiness</p>
          <h2>Starter control tower</h2>
          <p class="helper">{{ dependencyModeMeta.controlTowerLead }}</p>
        </div>

        <div class="page-actions">
          <YhButton :loading="loading" @click="refreshSignals">Refresh signals</YhButton>
          <RouterLink to="/workspace">
            <YhButton type="primary">Open AI workspace</YhButton>
          </RouterLink>
        </div>
      </header>

      <div class="metric-grid">
        <article v-for="item in snapshot.metrics" :key="item.label" class="metric-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <small>{{ item.detail }}</small>
        </article>
      </div>
    </section>

    <section class="panel-grid">
      <article class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Status board</p>
            <h2>Readiness lanes</h2>
          </div>
        </header>

        <div class="stack-list">
          <div v-for="item in snapshot.readiness" :key="item.title" class="stack-item">
            <div class="inline-tags">
              <YhTag :type="item.status === 'Ready' ? 'success' : 'warning'">
                {{ item.status }}
              </YhTag>
              <strong>{{ item.title }}</strong>
            </div>
            <span>{{ item.summary }}</span>
          </div>
        </div>
      </article>

      <article class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Activity</p>
            <h2>Recent moves</h2>
          </div>
        </header>

        <div class="stack-list">
          <div v-for="event in dashboardEvents" :key="event.time + event.title" class="stack-item">
            <div class="inline-tags">
              <YhTag>{{ event.time }}</YhTag>
              <strong>{{ event.title }}</strong>
            </div>
            <span>{{ event.detail }}</span>
          </div>
        </div>
      </article>
    </section>

    <section class="panel-grid">
      <article class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Environment</p>
            <h2>Consumer profile</h2>
          </div>
        </header>

        <YhDescriptions title="Starter runtime" border>
          <YhDescriptionsItem label="Runtime">
            {{ snapshot.environment.runtime }}
          </YhDescriptionsItem>
          <YhDescriptionsItem label="Install mode">
            {{ snapshot.environment.packageMode }}
          </YhDescriptionsItem>
          <YhDescriptionsItem label="Shell path">
            {{ snapshot.environment.shell }}
          </YhDescriptionsItem>
        </YhDescriptions>
      </article>

      <article class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Next route</p>
            <h2>Focus sequence</h2>
          </div>
        </header>

        <div class="stack-list">
          <div class="stack-item">
            <strong>1. AI workspace</strong>
            <span>Validate the conversation shell, artifact rail, and reasoning context.</span>
          </div>
          <div class="stack-item">
            <strong>2. Flow studio</strong>
            <span>Pin down orchestration editing and review-specific side panels.</span>
          </div>
          <div class="stack-item">
            <strong>3. Operations console</strong>
            <span>Shape the table-heavy release and escalation experience.</span>
          </div>
        </div>
      </article>
    </section>

    <section class="page-section table-wrap">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Dependency surface</p>
          <h2>Dependency contract</h2>
        </div>
      </header>

      <YhTable :data="releaseSurface" :columns="tableColumns" border />
    </section>
  </div>
</template>
