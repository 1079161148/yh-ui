# Nested Node Layout

`yh-flow` supports nested nodes, allowing you to create parent node containers containing child nodes for complex flow structures.

## Core Concepts

### Nested Node Data Structure

Nodes can specify a parent node through the `parentId` property:

```typescript
import type { Node } from '@yh-ui/flow'

// Parent node
const parentNode: Node = {
  id: 'group-1',
  type: 'group',
  position: { x: 100, y: 100 },
  width: 400,
  height: 300,
  data: { label: 'Flow Group 1' }
}

// Child node (linked via parentId)
const childNode: Node = {
  id: 'child-1',
  type: 'default',
  position: { x: 150, y: 150 },
  parentId: 'group-1', // Parent node ID
  data: { label: 'Child Node 1' }
}
```

### children Array

You can also use the `children` property to include child node IDs directly in the parent node:

```typescript
const parentNodeWithChildren: Node = {
  id: 'group-1',
  type: 'group',
  position: { x: 100, y: 100 },
  width: 400,
  height: 300,
  children: ['child-1', 'child-2', 'child-3'], // Child node ID array
  data: { label: 'Flow Group' }
}
```

## Usage Examples

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  {
    id: 'group-1',
    type: 'group',
    position: { x: 60, y: 60 },
    width: 520,
    height: 360,
    data: { label: 'Main Flow' }
  },
  {
    id: 'node-1',
    type: 'input',
    position: { x: 130, y: 120 },
    parentId: 'group-1',
    data: { label: 'Start' }
  },
  {
    id: 'node-2',
    type: 'default',
    position: { x: 320, y: 120 },
    parentId: 'group-1',
    data: { label: 'Process' }
  },
  {
    id: 'node-3',
    type: 'output',
    position: { x: 460, y: 120 },
    parentId: 'group-1',
    data: { label: 'End' }
  }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: 'node-1', target: 'node-2' },
  { id: 'e2-3', source: 'node-2', target: 'node-3' }
]);

const tsCode = `<${_T}>
  <yh-flow
    :nodes="nodes"
    :edges="edges"
    background="dots"
  >
    <template #node="{ node }">
      <div v-if="node.type === 'group'" class="group-node">
        <div class="group-header">{{ node.data.label }}</div>
        <div class="group-content">
          <!-- Child nodes render here automatically -->
        </div>
      </div>
      <div v-else class="normal-node">
        {{ node.data.label }}
      </div>
    </template>
  </yh-flow>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge } from '@yh-ui/flow';

const nodes = ref<Node[]>([
  {
    id: 'group-1',
    type: 'group',
    position: { x: 50, y: 50 },
    width: 500,
    height: 350,
    data: { label: 'Main Flow' }
  },
  {
    id: 'node-1',
    type: 'input',
    position: { x: 100, y: 100 },
    parentId: 'group-1',
    data: { label: 'Start' }
  },
  {
    id: 'node-2',
    type: 'default',
    position: { x: 250, y: 100 },
    parentId: 'group-1',
    data: { label: 'Process' }
  },
  {
    id: 'node-3',
    type: 'output',
    position: { x: 400, y: 100 },
    parentId: 'group-1',
    data: { label: 'End' }
  }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: 'node-1', target: 'node-2' },
  { id: 'e2-3', source: 'node-2', target: 'node-3' }
]);
</${_S}>

<${_St} scoped>
.group-node {
  width: 100%;
  height: 100%;
  border: 2px dashed #94a3b8;
  border-radius: 8px;
  background: #f8fafc;
}

.group-header {
  padding: 8px 12px;
  font-weight: 600;
  color: #475569;
  border-bottom: 1px dashed #cbd5e1;
}

.normal-node {
  padding: 8px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}
</${_St}>`;
const jsCode = toJs(tsCode);
</script>

<DemoBlock title="Nested Node Demo" :ts-code="tsCode" :js-code="jsCode">
  <div style="border:1px solid #e2e8f0;border-radius:8px;height:420px;padding:8px;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      background="dots"
      style="width:100%;height:100%;"
    >
      <template #node="{ node }">
        <div v-if="node.type === 'group'" style="width:100%;height:100%;border:2px dashed #94a3b8;border-radius:8px;background:#f8fafc;">
          <div style="padding:8px 12px;font-weight:600;color:#475569;border-bottom:1px dashed #cbd5e1;">
            {{ node.data.label }}
          </div>
          <div style="padding:12px;color:#475569;">Nested children render inside the container</div>
        </div>
        <div v-else style="padding:8px 16px;background:#fff;border:1px solid #e2e8f0;border-radius:4px;">
          {{ node.data.label }}
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## API Reference

### Helper Functions

| Function                          | Description                | Parameters                     |
| --------------------------------- | -------------------------- | ------------------------------ |
| `isNestedNode(node)`              | Check if node is nested    | `node: Node`                   |
| `getNodeChildren(node, allNodes)` | Get all children of a node | `node: Node, allNodes: Node[]` |
| `getNodeParent(node, allNodes)`   | Get parent node            | `node: Node, allNodes: Node[]` |

### Node Type Extensions

```typescript
interface Node {
  // ... other properties
  parentId?: string // Parent node ID
  children?: string[] // Child node ID array
  extent?: 'parent' | 'container' // Nested extent mode
  computed?: boolean // Whether it's a computed/generated node
}
```

## Best Practices

1. **Use GroupNode component**: Use the built-in `GroupNode` component to create parent node containers
2. **Set extent property**: Use `extent: 'parent'` to make child nodes follow the parent
3. **Handle hierarchy**: Child nodes should automatically move when dragging the parent node
4. **Visual distinction**: Use CSS to clearly distinguish between parent containers and child nodes

> [!TIP]
>
> Nested nodes are perfect for complex business flows, such as main flows containing multiple sub-flows.
