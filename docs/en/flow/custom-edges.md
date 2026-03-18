# Custom Edge Types

`yh-flow` supports registering and using custom edge types. Through a simple registration mechanism, you can configure unique appearances and interaction logics for specific types of edges without repeating code in every canvas.

## Core Concepts

When using custom components, it is recommended to inject them via the `yh-flow` Props. This aligns with **low coupling and high cohesion** functional programming principles, and is fully compatible with SSR environments like `Nuxt`.

### 1. Component Prop Injection (Recommended)

Inject component types via the `edge-types` property. This approach has a clear scope and does not pollute the global state, making it ideal for large-scale applications.

```vue
<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { Flow } from '@yh-ui/flow'

// 1. Define or import your custom edge component
const MyCustomEdge = defineComponent({
  props: ['path', 'stroke'],
  setup(props) {
    return () => h('path', { d: props.path, stroke: 'orange', strokeWidth: 3, fill: 'none' })
  }
})

// 2. Map component to a specific type key
const edgeTypes = {
  'custom-orange': MyCustomEdge
}

const edges = ref([{ id: 'e1', source: 'a', target: 'b', type: 'custom-orange' }])
</script>

<template>
  <yh-flow :edges="edges" :edge-types="edgeTypes" />
</template>
```

### 2. Global Registration (Multi-Instance Sharing)

Use `registerCustomEdge` if you need to share the same custom styles across multiple independent flow instances. This adds the component to the internal global registry.

> [!CAUTION]
> In **SSR (Nuxt 3)** environments, please register only in client-side plugins or prioritize Prop injection to prevent state leaks between requests.

```typescript
import { registerCustomEdge } from '@yh-ui/flow'
// Import your component from a separate file
import MyEdgeComponent from './MyEdge.vue'

registerCustomEdge({
  type: 'my-custom-edge',
  component: MyEdgeComponent,
  label: 'Corporate Review Edge'
})
```

### 3. Slot Mode (Manual)

If you only want to change edge styles temporarily in a specific canvas or need access to complex parent context, use the `#edge` slot:

```vue
<yh-flow :nodes="nodes" :edges="edges">
  <template #edge="edgeProps">
    <!-- Manual control over rendering -->
    <MySpecialEdge v-bind="edgeProps" />
  </template>
</yh-flow>
```

---

## Complete Example

### Developing a Custom Edge Component

Custom components receive a complete Prop object including coordinates, paths, center points, and original data.

```vue
<!-- CustomEdgeComponent.vue -->
<template>
  <g class="custom-edge" :class="{ 'is-selected': edge.selected }">
    <!-- Main path -->
    <path
      :d="path"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      fill="none"
      :stroke-dasharray="edge.animated ? '5,5' : 'none'"
    />

    <!-- Marker at the center -->
    <circle :cx="labelX" :cy="labelY" r="5" fill="#10b981" />

    <!-- Label -->
    <text v-if="edge.label" :x="labelX" :y="labelY - 10" text-anchor="middle" class="edge-label">
      {{ edge.label }}
    </text>
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Edge } from '@yh-ui/flow'

interface Props {
  edge: Edge
  path: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  labelX: number
  labelY: number
  stroke: string
  strokeWidth: number
}

const props = defineProps<Props>()
</script>

<style scoped>
.custom-edge path {
  transition: all 0.3s;
}
.custom-edge.is-selected path {
  stroke-width: 5;
  filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.5));
}
.edge-label {
  font-size: 12px;
  fill: #64748b;
  font-weight: bold;
}
</style>
```

### Automatic Rendering Demo

The example below shows how the `EdgeRenderer` takes over rendering once a type is registered.

<script setup lang="ts">
import { ref, defineComponent, h, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import {
  registerCustomEdge,
  type Node,
  type Edge
} from '@yh-ui/flow'

const StepEdgeComponent = defineComponent({
  props: {
    path: String,
    stroke: String,
    labelX: Number,
    labelY: Number,
    edge: Object,
    strokeWidth: Number
  },
  setup(props) {
    return () => h('g', [
      h('path', {
        d: props.path,
        stroke: props.stroke,
        'stroke-width': props.strokeWidth,
        fill: 'none',
        'stroke-dasharray': '8,4',
        class: 'custom-step-path-en'
      }),
      h('circle', {
        cx: props.labelX,
        cy: props.labelY,
        r: 6,
        fill: props.stroke,
        class: 'pulse-dot-en'
      }),
      props.edge?.label ? h('text', {
        x: props.labelX,
        y: (props.labelY || 0) - 12,
        'text-anchor': 'middle',
        fill: '#334155',
        style: { fontSize: '11px', fontWeight: '600' }
      }, props.edge.label) : null
    ])
  }
})

registerCustomEdge({
  type: 'step-pulse-en',
  component: StepEdgeComponent
})

const nodes = ref<Node[]>([
  { id: 'en1', type: 'input', position: { x: 50, y: 150 }, data: { label: 'Source' } },
  { id: 'en2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Transform' } },
  { id: 'en3', type: 'output', position: { x: 450, y: 150 }, data: { label: 'Archive' } }
])

const edges = ref<Edge[]>([
  { id: 'ee1-2', source: 'en1', target: 'en2', type: 'step-pulse-en', label: 'STREAMING' },
  { id: 'ee2-3', source: 'en2', target: 'en3', animated: true, label: 'FINALIZING' }
])

const tsCode = `<${_T}>
  <!-- Note: no need for #edge slot here as 'step-pulse-en' is globally registered -->
  <yh-flow :nodes="nodes" :edges="edges" background="dots" />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'
import { registerCustomEdge, type Node, type Edge } from '@yh-ui/flow'
import StepEdgeComponent from './StepEdgeComponent.vue'

// 1. Register once
registerCustomEdge({
  type: 'step-pulse',
  component: StepEdgeComponent
})

// 2. Specify type in data
const nodes = ref<Node[]>([
  { id: 'n1', type: 'input', position: { x: 50, y: 150 }, data: { label: 'Source' } },
  { id: 'n2', type: 'default', position: { x: 280, y: 150 }, data: { label: 'Transform' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: 'n1', target: 'n2', type: 'step-pulse', label: 'STREAMING' }
])
</${_S}>

<${_St}>
@keyframes dash-en {
  to { stroke-dashoffset: -12; }
}
.custom-step-path-en {
  animation: dash-en 1s linear infinite;
}
.pulse-dot-en {
  animation: pulse-en 2s infinite;
}
@keyframes pulse-en {
  0% { r: 4; opacity: 1; }
  100% { r: 10; opacity: 0; }
}
</${_St}>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="Automatic Rendering Demo" :ts-code="tsCode" :js-code="jsCode">
  <div style="border:1px solid #e2e8f0;border-radius:12px;height:400px;background:#f8fafc;">
    <yh-flow :nodes="nodes" :edges="edges" background="dots" />
  </div>
</DemoBlock>

---

## API Reference

### Registration Functions

| Function                                       | Description                           |
| ---------------------------------------------- | ------------------------------------- |
| `registerCustomEdge(edge: CustomEdge)`         | Register global custom edge component |
| `getCustomEdge(type: string)`                  | Get registered component information  |
| `registerEdgeTemplate(template: EdgeTemplate)` | Register edge template with defaults  |

### Type Definitions

```typescript
// Custom Edge Configuration
interface CustomEdge {
  type: string // Unique identifier for Edge.type
  component: Component // Vue component
  label?: string // Alias or description
}

// Props passed to custom components
interface EdgeProps {
  edge: Edge // Raw edge data
  path: string // Pre-calculated SVG path string
  sourceX: number // Source X
  sourceY: number // Source Y
  targetX: number // Target X
  targetY: number // Target Y
  labelX: number // Center point X
  labelY: number // Center point Y
  labelWidth: number // Pre-calculated label width (px)
  stroke: string // Pre-calculated stroke color
  strokeWidth: number // Calculated stroke width
}
```

> Custom edge components must return valid SVG elements (typically wrapped in a `<g>` tag), otherwise rendering may break when layered.

<style scoped>
@keyframes dash-move-en { to { stroke-dashoffset: -12; } }
.custom-step-path-en { animation: dash-move-en 1s linear infinite; }
@keyframes pulse-dot-en { 0% { r: 4; opacity: 1; } 100% { r: 10; opacity: 0; } }
.pulse-dot-en { animation: pulse-dot-en 2s infinite; }
</style>
