# Data Flow Edge

`DataFlowEdge` is a high-level visualization edge built into `yh-flow`, designed for **AI workflow orchestration** and **real-time data pipelines**.
Set `flowStatus` and `flowEffect` inside `edge.data` to get **particles, glow, pulse, or wave** animations that intuitively convey data flow status.

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import { DataFlowEdge } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

// ===========================
// Demo 1: 5 status preview
// ===========================
const tsStatus = `<template>
  <div style="width: 100%; height: 400px;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :edge-types="edgeTypes"
      background="dots"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

// Step 1: Register custom edge type
const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

// Step 2: Define nodes
const nodes = ref<Node[]>([
  { id: 's1', type: 'input',  position: { x: 60,  y: 40  }, data: { label: 'Source A' }, width: 110, height: 40 },
  { id: 's2', type: 'input',  position: { x: 60,  y: 120 }, data: { label: 'Source B' }, width: 110, height: 40 },
  { id: 's3', type: 'input',  position: { x: 60,  y: 200 }, data: { label: 'Source C' }, width: 110, height: 40 },
  { id: 's4', type: 'input',  position: { x: 60,  y: 280 }, data: { label: 'Source D' }, width: 110, height: 40 },
  { id: 't1', type: 'output', position: { x: 380, y: 155 }, data: { label: 'Aggregator' }, width: 120, height: 44 }
])

// Step 3: Set flowStatus and flowEffect inside edge.data
const edges = ref<Edge[]>([
  {
    id: 'e1', source: 's1', target: 't1',
    type: 'dataflow',
    label: 'processing',
    data: { flowStatus: 'processing', flowEffect: 'particles' }
  },
  {
    id: 'e2', source: 's2', target: 't1',
    type: 'dataflow',
    label: 'success',
    data: { flowStatus: 'success', flowEffect: 'glow' }
  },
  {
    id: 'e3', source: 's3', target: 't1',
    type: 'dataflow',
    label: 'error',
    data: { flowStatus: 'error', flowEffect: 'pulse' }
  },
  {
    id: 'e4', source: 's4', target: 't1',
    type: 'dataflow',
    label: 'warning',
    data: { flowStatus: 'warning', flowEffect: 'wave' }
  }
])
<\/script>`

const jsStatus = toJs(tsStatus)

// ===========================
// Demo 2: dynamic switch
// ===========================
const tsDynamic = `<template>
  <div style="display: flex; flex-direction: column; height: 440px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600;">Status</span>
      <button
        v-for="s in statusList" :key="s.value"
        :style="{
          padding: '4px 12px', borderRadius: '6px', cursor: 'pointer',
          border: '1.5px solid ' + s.color, fontSize: '12px',
          color: activeStatus === s.value ? '#fff' : s.color,
          background: activeStatus === s.value ? s.color : 'white',
          transition: 'all 0.2s'
        }"
        @click="activeStatus = s.value"
      >{{ s.label }}</button>
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600; margin-left: 8px;">Effect</span>
      <select v-model="activeEffect" style="padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px;">
        <option value="particles">✨ Particles</option>
        <option value="glow">💡 Glow</option>
        <option value="pulse">💓 Pulse</option>
        <option value="wave">〰️ Wave</option>
        <option value="none">— None</option>
      </select>
    </div>
    <div style="flex: 1;">
      <yh-flow :nodes="nodes" :edges="dynamicEdges" :edge-types="edgeTypes" background="dots" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

const statusList = [
  { value: 'idle',       label: '⚪ idle',       color: '#b1b1b7' },
  { value: 'processing', label: '🔵 processing', color: '#6366f1' },
  { value: 'success',    label: '🟢 success',    color: '#10b981' },
  { value: 'error',      label: '🔴 error',      color: '#ef4444' },
  { value: 'warning',    label: '🟠 warning',    color: '#f59e0b' }
]

const activeStatus = ref('processing')
const activeEffect  = ref('particles')

const nodes = ref<Node[]>([
  { id: 'n1', type: 'input',   position: { x: 60,  y: 120 }, data: { label: 'Node A' }, width: 110, height: 44 },
  { id: 'n2', type: 'default', position: { x: 250, y: 50  }, data: { label: 'Node B' }, width: 110, height: 44 },
  { id: 'n3', type: 'default', position: { x: 250, y: 195 }, data: { label: 'Node C' }, width: 110, height: 44 },
  { id: 'n4', type: 'output',  position: { x: 440, y: 120 }, data: { label: 'Node D' }, width: 110, height: 44 }
])

// Use computed so edge.data updates reactively
const dynamicEdges = computed<Edge[]>(() => [
  { id: 'ea', source: 'n1', target: 'n2', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'eb', source: 'n1', target: 'n3', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ec', source: 'n2', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ed', source: 'n3', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } }
])
<\/script>`

const jsDynamic = toJs(tsDynamic)

// ===========================
// Live demo data
// ===========================
const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

const demoNodes1 = ref<Node[]>([
  { id: 's1', type: 'input',  position: { x: 60,  y: 40  }, data: { label: 'Source A' }, width: 110, height: 40 },
  { id: 's2', type: 'input',  position: { x: 60,  y: 120 }, data: { label: 'Source B' }, width: 110, height: 40 },
  { id: 's3', type: 'input',  position: { x: 60,  y: 200 }, data: { label: 'Source C' }, width: 110, height: 40 },
  { id: 's4', type: 'input',  position: { x: 60,  y: 280 }, data: { label: 'Source D' }, width: 110, height: 40 },
  { id: 't1', type: 'output', position: { x: 380, y: 155 }, data: { label: 'Aggregator' }, width: 120, height: 44 }
])

const demoEdges1 = ref<Edge[]>([
  { id: 'e1', source: 's1', target: 't1', type: 'dataflow', label: 'processing', data: { flowStatus: 'processing', flowEffect: 'particles' } },
  { id: 'e2', source: 's2', target: 't1', type: 'dataflow', label: 'success',    data: { flowStatus: 'success',    flowEffect: 'glow'      } },
  { id: 'e3', source: 's3', target: 't1', type: 'dataflow', label: 'error',      data: { flowStatus: 'error',      flowEffect: 'pulse'     } },
  { id: 'e4', source: 's4', target: 't1', type: 'dataflow', label: 'warning',    data: { flowStatus: 'warning',    flowEffect: 'wave'      } }
])

const statusList = [
  { value: 'idle',       label: '⚪ idle',       color: '#b1b1b7' },
  { value: 'processing', label: '🔵 processing', color: '#6366f1' },
  { value: 'success',    label: '🟢 success',    color: '#10b981' },
  { value: 'error',      label: '🔴 error',      color: '#ef4444' },
  { value: 'warning',    label: '🟠 warning',    color: '#f59e0b' }
]
const activeStatus = ref('processing')
const activeEffect  = ref('particles')

const demoNodes2 = ref<Node[]>([
  { id: 'n1', type: 'input',   position: { x: 60,  y: 120 }, data: { label: 'Node A' }, width: 110, height: 44 },
  { id: 'n2', type: 'default', position: { x: 250, y: 50  }, data: { label: 'Node B' }, width: 110, height: 44 },
  { id: 'n3', type: 'default', position: { x: 250, y: 195 }, data: { label: 'Node C' }, width: 110, height: 44 },
  { id: 'n4', type: 'output',  position: { x: 440, y: 120 }, data: { label: 'Node D' }, width: 110, height: 44 }
])

const demoEdges2 = computed<Edge[]>(() => [
  { id: 'ea', source: 'n1', target: 'n2', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'eb', source: 'n1', target: 'n3', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ec', source: 'n2', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ed', source: 'n3', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } }
])
</script>

## Quick Start

**Two steps**: register the component → set status inside `edge.data`

```typescript
// Step 1: Register as a custom edge type
import { markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'

const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

// Step 2: Set flowStatus / flowEffect inside edge.data
const edges = ref([
  {
    id: 'e1',
    source: 'node-a',
    target: 'node-b',
    type: 'dataflow', // matches the registered key
    label: 'processing',
    data: {
      flowStatus: 'processing', // idle | processing | success | error | warning
      flowEffect: 'particles' // particles | glow | pulse | wave | none
    }
  }
])
```

> [!IMPORTANT]
> `flowStatus`, `flowEffect`, and other config options **must be placed inside `edge.data`**, NOT as top-level edge fields. The component automatically reads them from `edge.data`.

## 5 Status Preview

<DemoBlock title="processing / success / error / warning / idle" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="width: 100%; height: 360px;">
    <yh-flow
      :nodes="demoNodes1"
      :edges="demoEdges1"
      :edge-types="edgeTypes"
      background="dots"
    />
  </div>
</DemoBlock>

## Dynamic Status & Effect Switching

<DemoBlock title="Switch status and effect at runtime" :ts-code="tsDynamic" :js-code="jsDynamic">
  <div style="display: flex; flex-direction: column; height: 380px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600;">Status</span>
      <button
        v-for="s in statusList" :key="s.value"
        :style="{
          padding: '4px 12px', borderRadius: '6px', cursor: 'pointer',
          border: '1.5px solid ' + s.color, fontSize: '12px',
          color: activeStatus === s.value ? '#fff' : s.color,
          background: activeStatus === s.value ? s.color : 'white',
          transition: 'all 0.2s'
        }"
        @click="activeStatus = s.value"
      >{{ s.label }}</button>
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600; margin-left: 8px;">Effect</span>
      <select v-model="activeEffect" style="padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px;">
        <option value="particles">✨ Particles</option>
        <option value="glow">💡 Glow</option>
        <option value="pulse">💓 Pulse</option>
        <option value="wave">〰️ Wave</option>
        <option value="none">— None</option>
      </select>
    </div>
    <div style="flex: 1;">
      <yh-flow :nodes="demoNodes2" :edges="demoEdges2" :edge-types="edgeTypes" background="dots" />
    </div>
  </div>
</DemoBlock>

## Status Reference

| `flowStatus` | Color  | Animation   | Typical Use Case                   |
| ------------ | ------ | ----------- | ---------------------------------- |
| `idle`       | Gray   | None        | Static connection, standby         |
| `processing` | Purple | Breathing   | Data transferring, API in progress |
| `success`    | Green  | Steady glow | Transfer complete, node succeeded  |
| `error`      | Red    | Fast flash  | Transfer failed, node error        |
| `warning`    | Orange | Slow pulse  | Timeout alert, data anomaly        |

## Effect Reference

| `flowEffect` | Description                                    | Best Status Pairing    |
| ------------ | ---------------------------------------------- | ---------------------- |
| `particles`  | Glowing particles travel along the curve       | `processing`           |
| `glow`       | Continuous glowing halo                        | `success`              |
| `pulse`      | Brightness heartbeat flicker                   | `error` / `warning`    |
| `wave`       | Flowing dashed-line animation                  | `processing` / general |
| `none`       | No animation (color still changes with status) | All                    |

## API

### `edge.data` Config Fields

> These fields **must be placed inside `edge.data`**

| Field               | Type             | Default       | Description                                 |
| ------------------- | ---------------- | ------------- | ------------------------------------------- |
| `flowStatus`        | `DataFlowStatus` | `'idle'`      | Status, controls color and CSS animation    |
| `flowEffect`        | `DataFlowEffect` | `'particles'` | Visual effect type                          |
| `glowIntensity`     | `number`         | `8`           | Glow blur intensity (0–20)                  |
| `particleCount`     | `number`         | `3`           | Number of particles (1–10)                  |
| `animationDuration` | `number`         | `2`           | Particle / pulse animation cycle in seconds |

### Standard Edge Fields

| Field      | Type      | Description                                         |
| ---------- | --------- | --------------------------------------------------- |
| `type`     | `string`  | Set to the registered key, e.g. `'dataflow'`        |
| `label`    | `string`  | Center label text on the edge                       |
| `animated` | `boolean` | `true` shows dashed-flow animation in `idle` status |
| `selected` | `boolean` | Highlighted selected style                          |

### Type Definitions

```typescript
type DataFlowStatus = 'idle' | 'processing' | 'success' | 'error' | 'warning'
type DataFlowEffect = 'particles' | 'glow' | 'pulse' | 'wave' | 'none'
```

### Register the Edge Type

```typescript
import { markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'

const edgeTypes = {
  dataflow: markRaw(DataFlowEdge)
}
```

> [!TIP]
> Define `edges` as a `computed` that maps runtime state (e.g., from a Pinia store) into `edge.data`, to achieve **real-time AI workflow status visualization**.
