# Node Types

Flow provides several built-in node types to meet different business scenario requirements.

<script setup lang="ts">
import { toJs } from '../../.vitepress/theme/utils/demo-utils'

const tsBasicNodes = `<template>
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      :nodes="[
        { id: 'input', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Input Node' }, width: 150, height: 50 },
        { id: 'default', type: 'default', position: { x: 250, y: 50 }, data: { label: 'Default Node' }, width: 150, height: 50 },
        { id: 'diamond', type: 'diamond', position: { x: 275, y: 150 }, data: { label: 'Decision Node' }, width: 100, height: 100 },
        { id: 'database', type: 'database', position: { x: 50, y: 160 }, data: { label: 'Database' }, width: 120, height: 80 },
        { id: 'output', type: 'output', position: { x: 450, y: 50 }, data: { label: 'Output Node' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1', source: 'input', target: 'default', type: 'bezier' },
        { id: 'e2', source: 'default', target: 'output', type: 'bezier' },
        { id: 'e3', source: 'default', target: 'diamond', sourceHandle: 'bottom', targetHandle: 'top', type: 'step' },
        { id: 'e4', source: 'diamond', target: 'database', sourceHandle: 'left', targetHandle: 'right', type: 'step', animated: true }
      ]"
    />
  </div>
<\/template>`

const jsBasicNodes = toJs(tsBasicNodes)

const tsGroupNodes = `<template>
  <div style="width: 100%; height: 400px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: 'group1', type: 'group', position: { x: 50, y: 50 }, data: { label: 'Phase One' }, width: 300, height: 200 },
        { id: 'node1', type: 'input', position: { x: 80, y: 80 }, data: { label: 'Start' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'node2', type: 'default', position: { x: 220, y: 80 }, data: { label: 'Process' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'group2', type: 'group', position: { x: 400, y: 50 }, data: { label: 'Phase Two' }, width: 300, height: 200 },
        { id: 'node3', type: 'default', position: { x: 430, y: 80 }, data: { label: 'Process' }, width: 120, height: 40, parentId: 'group2' },
        { id: 'node4', type: 'output', position: { x: 570, y: 80 }, data: { label: 'End' }, width: 120, height: 40, parentId: 'group2' }
      ]"
      :edges="[
        { id: 'e1', source: 'node1', target: 'node2', type: 'bezier' },
        { id: 'e2', source: 'node2', target: 'node3', type: 'bezier' },
        { id: 'e3', source: 'node3', target: 'node4', type: 'bezier' }
      ]"
    />
  </div>
<\/template>`

const jsGroupNodes = toJs(tsGroupNodes)

const tsHandles = `<template>
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 100, y: 50, zoom: 1 }"
      :nodes="[
        { 
          id: 'all-handles', 
          type: 'default', 
          position: { x: 200, y: 100 }, 
          data: { label: 'Four-way Handles' }, 
          width: 180, 
          height: 80,
          handleBounds: {
            top: [{ type: 'target', position: 'top', id: 'top-handle' }],
            right: [{ type: 'source', position: 'right', id: 'right-handle' }],
            bottom: [{ type: 'source', position: 'bottom', id: 'bottom-handle' }],
            left: [{ type: 'target', position: 'left', id: 'left-handle' }]
          }
        }
      ]"
      :edges="[
        { id: 'e-top', source: 'all-handles', target: 'all-handles', sourceHandle: 'top', targetHandle: 'bottom', type: 'bezier', style: { strokeDasharray: '5,5' } }
      ]"
    />
  </div>
<\/template>`

const jsHandles = toJs(tsHandles)
</script>

## Node Type Overview

Flow includes the following built-in node types:

| Type         | Description  | Use Case                           |
| ------------ | ------------ | ---------------------------------- |
| \`input\`    | Input Node   | Entry point, data source           |
| \`output\`   | Output Node  | Exit point, data destination       |
| \`default\`  | Default Node | General processing node            |
| \`diamond\`  | Diamond Node | Decision logic, branching          |
| \`database\` | Data Node    | Storage/DB representations         |
| \`custom\`   | Custom Node  | Custom business node               |
| \`group\`    | Group Node   | Container for nodes, area division |

## Basic Node Types

<DemoBlock title="Basic Node Types" :ts-code="tsBasicNodes" :js-code="jsBasicNodes">
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      :nodes="[
        { id: 'input', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Input Node' }, width: 150, height: 50 },
        { id: 'default', type: 'default', position: { x: 250, y: 50 }, data: { label: 'Default Node' }, width: 150, height: 50 },
        { id: 'diamond', type: 'diamond', position: { x: 275, y: 150 }, data: { label: 'Decision Node' }, width: 100, height: 100 },
        { id: 'database', type: 'database', position: { x: 50, y: 160 }, data: { label: 'Database' }, width: 120, height: 80 },
        { id: 'output', type: 'output', position: { x: 450, y: 50 }, data: { label: 'Output Node' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1', source: 'input', target: 'default', type: 'bezier' },
        { id: 'e2', source: 'default', target: 'output', type: 'bezier' },
        { id: 'e3', source: 'default', target: 'diamond', sourceHandle: 'bottom', targetHandle: 'top', type: 'step' },
        { id: 'e4', source: 'diamond', target: 'database', sourceHandle: 'left', targetHandle: 'right', type: 'step', animated: true }
      ]"
    />
  </div>
</DemoBlock>

## Node Data Structure

```typescript
interface Node<Data = NodeData> {
  id: string
  type: string
  position: { x: number; y: number }
  data: Data
  style?: NodeStyle
  class?: string
  width?: number
  height?: number
  draggable?: boolean // Whether node is draggable
  selectable?: boolean // Whether node is selectable
  connectable?: boolean // Whether node is connectable
  resizable?: boolean // Whether to show resize handle
  deletable?: boolean // Whether node can be deleted
  selected?: boolean
  dragging?: boolean
  hidden?: boolean
  parentId?: string // Parent node ID for grouping
  zIndex?: number
  extent?: 'parent' // Movement range limit
  handleBounds?: any // Custom handle configurations
}
```

## Input Node (input)

Input nodes have only one right-side connection handle, suitable for the start of a flow.

```typescript
const node = {
  id: 'node-1',
  type: 'input',
  position: { x: 100, y: 100 },
  data: {
    label: 'Data Input',
    icon: 'upload'
  }
}
```

## Output Node (output)

Output nodes have only one left-side connection handle, suitable for the end of a flow.

```typescript
const node = {
  id: 'node-2',
  type: 'output',
  position: { x: 500, y: 100 },
  data: {
    label: 'Result Output',
    icon: 'download'
  }
}
```

## Default Node (default)

Default nodes have handles on both left and right sides, suitable for middle processing nodes.

```typescript
const node = {
  id: 'node-3',
  type: 'default',
  position: { x: 300, y: 100 },
  data: {
    label: 'Process Node',
    description: 'Execute some action'
  }
}
```

## Diamond Node (diamond)

Diamond nodes are standard flowchart decision nodes with four active handles on each side.

```typescript
const node = {
  id: 'node-4',
  type: 'diamond',
  position: { x: 300, y: 300 },
  data: {
    label: 'Is Approved?'
  }
}
```

## Database Node (database)

Database nodes are represented as cylinders, perfect for architecture charts pointing to services.

```typescript
const node = {
  id: 'node-5',
  type: 'database',
  position: { x: 100, y: 300 },
  data: {
    label: 'MySQL Target'
  }
}
```

## Group Node (group)

Group nodes are used to combine multiple nodes together, commonly used to represent phases or areas in a process.

<DemoBlock title="Group Node" :ts-code="tsGroupNodes" :js-code="jsGroupNodes">
  <div style="width: 100%; height: 400px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: 'group1', type: 'group', position: { x: 50, y: 50 }, data: { label: 'Phase One' }, width: 300, height: 200 },
        { id: 'node1', type: 'input', position: { x: 80, y: 80 }, data: { label: 'Start' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'node2', type: 'default', position: { x: 220, y: 80 }, data: { label: 'Process' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'group2', type: 'group', position: { x: 400, y: 50 }, data: { label: 'Phase Two' }, width: 300, height: 200 },
        { id: 'node3', type: 'default', position: { x: 430, y: 80 }, data: { label: 'Process' }, width: 120, height: 40, parentId: 'group2' },
        { id: 'node4', type: 'output', position: { x: 570, y: 80 }, data: { label: 'End' }, width: 120, height: 40, parentId: 'group2' }
      ]"
      :edges="[
        { id: 'e1', source: 'node1', target: 'node2', type: 'bezier' },
        { id: 'e2', source: 'node2', target: 'node3', type: 'bezier' },
        { id: 'e3', source: 'node3', target: 'node4', type: 'bezier' }
      ]"
    />
  </div>
</DemoBlock>

## Custom Nodes

Create nodes that fully meet your business needs using the `custom` type and your own components.

```typescript
// Define custom node data
const customNode = {
  id: 'custom-1',
  type: 'custom',
  position: { x: 100, y: 100 },
  data: {
    label: 'Custom Node',
    icon: 'settings',
    status: 'success',
    actions: ['Edit', 'Delete']
  }
}
```

### Creating a Custom Node Component

```vue
<template>
  <div class="custom-node" :class="{ selected: node.selected }">
    <div class="custom-node__header">
      <span class="custom-node__icon">{{ node.data.icon }}</span>
      <span class="custom-node__label">{{ node.data.label }}</span>
    </div>
    <div class="custom-node__body">
      <span :class="['status', node.data.status]">{{ node.data.statusText }}</span>
    </div>
  </div>
<\/template>

<script setup lang="ts">
import type { Node } from '@yh-ui/flow'
defineProps<{
  node: Node
}>()
<\/script>

<style scoped>
.custom-node {
  padding: 12px;
  border-radius: 8px;
  background: white;
  border: 1px solid #dcdfe6;
  min-width: 150px;
}
.custom-node.selected {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
<\/style>
```

## Node Handles

Each node has preset connection handle positions:

| Position | Description              |
| -------- | ------------------------ |
| `left`   | Left connection handle   |
| `right`  | Right connection handle  |
| `top`    | Top connection handle    |
| `bottom` | Bottom connection handle |

<DemoBlock title="Handles" :ts-code="tsHandles" :js-code="jsHandles">
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 100, y: 50, zoom: 1 }"
      :nodes="[
        { 
          id: 'all-handles', 
          type: 'default', 
          position: { x: 200, y: 100 }, 
          data: { label: 'Four-way Handles' }, 
          width: 180, 
          height: 80,
          handleBounds: {
            top: [{ type: 'target', position: 'top', id: 'top-handle' }],
            right: [{ type: 'source', position: 'right', id: 'right-handle' }],
            bottom: [{ type: 'source', position: 'bottom', id: 'bottom-handle' }],
            left: [{ type: 'target', position: 'left', id: 'left-handle' }]
          }
        }
      ]"
      :edges="[
        { id: 'e-top', source: 'all-handles', target: 'all-handles', sourceHandle: 'top', targetHandle: 'bottom', type: 'bezier', style: { strokeDasharray: '5,5' } }
      ]"
    />
  </div>
</DemoBlock>

## Node Properties

| Property       | Type                       | Description                   |
| -------------- | -------------------------- | ----------------------------- |
| id             | `string`                   | Unique identifier             |
| type           | `string`                   | Node type                     |
| position       | `{ x: number, y: number }` | Node position                 |
| data           | `NodeData`                 | Node data                     |
| width / height | `number`                   | Node dimensions               |
| draggable      | `boolean`                  | Draggable (default: true)     |
| selectable     | `boolean`                  | Selectable (default: true)    |
| connectable    | `boolean`                  | Connectable (default: true)   |
| selected       | `boolean`                  | Whether node is selected      |
| dragging       | `boolean`                  | Whether node is being dragged |
| hidden         | `boolean`                  | Whether node is hidden        |
| parentId       | `string`                   | Parent node ID for grouping   |
| zIndex         | `number`                   | Layer order                   |
| handleBounds   | `object`                   | Custom handle config          |

## Next

- [Edge Types](./edges) - Learn about different edge types
- [Interaction](./interaction) - Learn more about interaction features
- [Alignment](./alignment) - Use alignment and distribution features
