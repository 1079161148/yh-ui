<script setup lang="ts">
import { ref } from 'vue'
import { Flow as YhFlow, type Edge, type Node, type ViewportTransform } from '@yh-ui/flow'
import { flowRunbook, flowStudioEdges, flowStudioNodes } from '../data/mock'

const flowRef = ref()
const readonly = ref(false)
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>(flowStudioNodes.map((item) => ({ ...item, data: { ...item.data } })))
const edges = ref<Edge[]>(flowStudioEdges.map((item) => ({ ...item })))
const eventLog = ref<string[]>(['Canvas ready for route-level flow work.'])

function appendLog(message: string) {
  eventLog.value.unshift(message)
  eventLog.value = eventLog.value.slice(0, 6)
}

function fitView() {
  flowRef.value?.fitView?.({ padding: 40 })
  appendLog('Fitted viewport to active graph.')
}

function addApprovalNode() {
  const nextId = `approval-${nodes.value.length + 1}`

  nodes.value.push({
    id: nextId,
    type: 'default',
    position: { x: 960, y: 180 + nodes.value.length * 18 },
    data: { label: 'Risk approval' },
    width: 170,
    height: 52
  })

  edges.value.push({
    id: `edge-${nextId}`,
    source: 'ship',
    target: nextId,
    type: 'bezier'
  })

  appendLog(`Added ${nextId}.`)
}
</script>

<template>
  <div class="flow-layout">
    <section class="page-section flow-canvas-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Orchestration</p>
          <h2>Workflow editor shell</h2>
          <p class="helper">
            This is the route-level surface where starter users can turn component capability into a
            product workflow.
          </p>
        </div>

        <div class="page-actions">
          <YhSwitch v-model="readonly" />
          <span class="helper">{{ readonly ? 'Read only' : 'Editable' }}</span>
          <YhButton @click="fitView">Fit view</YhButton>
          <YhButton type="primary" @click="addApprovalNode">Add approval</YhButton>
        </div>
      </header>

      <div class="flow-canvas">
        <YhFlow
          ref="flowRef"
          v-model="viewport"
          v-model:nodes="nodes"
          v-model:edges="edges"
          :readonly="readonly"
          background="grid"
          :grid-size="20"
          show-controls
          show-minimap
          snap-to-grid
          @node-click="({ node }) => appendLog(`Selected ${node.id}.`)"
        />
      </div>
    </section>

    <aside class="flow-side">
      <section class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Review lane</p>
            <h2>Operator checklist</h2>
          </div>
        </header>

        <div class="stack-list">
          <div v-for="item in flowRunbook" :key="item" class="stack-item">
            <strong>{{ item }}</strong>
          </div>
        </div>
      </section>

      <section class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Session state</p>
            <h2>Flow metrics</h2>
          </div>
        </header>

        <div class="metric-grid side-metrics">
          <article class="metric-card">
            <span>Nodes</span>
            <strong>{{ nodes.length }}</strong>
            <small>Visible workflow steps</small>
          </article>
          <article class="metric-card">
            <span>Edges</span>
            <strong>{{ edges.length }}</strong>
            <small>Transition paths</small>
          </article>
        </div>
      </section>

      <section class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Event log</p>
            <h2>Graph activity</h2>
          </div>
        </header>

        <div class="stack-list">
          <div v-for="entry in eventLog" :key="entry" class="stack-item">
            <span>{{ entry }}</span>
          </div>
        </div>
      </section>
    </aside>
  </div>
</template>

<style scoped>
.flow-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 16px;
}

.flow-canvas-section {
  display: grid;
  align-content: start;
}

.flow-canvas {
  height: 720px;
  overflow: hidden;
  border: 1px solid var(--starter-border);
  border-radius: 8px;
  background: #fff;
}

.flow-side {
  display: grid;
  gap: 16px;
  align-content: start;
}

.side-metrics {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 1320px) {
  .flow-layout {
    grid-template-columns: 1fr;
  }
}
</style>
