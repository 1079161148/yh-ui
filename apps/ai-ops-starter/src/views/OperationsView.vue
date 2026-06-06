<script setup lang="ts">
import { dependencyModeMeta } from '../config/dependency-mode'
import { operationsMetrics, operationsPlaybooks, operationsRows } from '../data/mock'

const queueColumns = [
  { prop: 'queue', label: 'Queue', width: 220 },
  { prop: 'owner', label: 'Owner', width: 160 },
  { prop: 'status', label: 'Status', width: 220 },
  { prop: 'priority', label: 'Priority', width: 120 },
  { prop: 'eta', label: 'ETA' }
]
</script>

<template>
  <div class="starter-page">
    <section class="page-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Operations</p>
          <h2>Release and escalation console</h2>
          <p class="helper">
            This page is intentionally dense. The starter should prove YH-UI can support repeated
            operational work, not just pretty empty states.
          </p>
        </div>
      </header>

      <div class="metric-grid">
        <article v-for="item in operationsMetrics" :key="item.label" class="metric-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <small>{{ item.detail }}</small>
        </article>
      </div>
    </section>

    <section class="page-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Queue board</p>
          <h2>Operator lanes</h2>
        </div>
      </header>

      <YhTable :data="operationsRows" :columns="queueColumns" border />
    </section>

    <section class="page-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Playbooks</p>
          <h2>Default habits</h2>
        </div>
      </header>

      <div class="stack-list">
        <div v-for="item in operationsPlaybooks" :key="item.title" class="stack-item">
          <strong>{{ item.title }}</strong>
          <span>{{ item.detail }}</span>
        </div>
      </div>
    </section>

    <section class="page-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Release envelope</p>
          <h2>Shared operating context</h2>
        </div>
      </header>

      <YhDescriptions title="Current rollout" border>
        <YhDescriptionsItem label="Channel">Canary</YhDescriptionsItem>
        <YhDescriptionsItem label="Target tenant">design-partner-canary</YhDescriptionsItem>
        <YhDescriptionsItem label="Evidence source">
          {{ dependencyModeMeta.evidenceSource }}
        </YhDescriptionsItem>
      </YhDescriptions>
    </section>
  </div>
</template>
