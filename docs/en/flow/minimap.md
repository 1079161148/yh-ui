# Interactive Minimap

`yh-flow`'s minimap component not only displays an overview of the flowchart but also supports interactive navigation and layout controls.

## Basic Usage

### Enabling the Minimap

```vue
<template>
  <yh-flow :nodes="nodes" :edges="edges" show-minimap />
</template>
```

### Minimap Position

You can set the minimap position using the `position` property:

```vue
<yh-flow
  :nodes="nodes"
  :edges="edges"
  show-minimap
  :minimap-node-color="(node) => (node.selected ? '#3b82f6' : '#94a3b8')"
/>
```

| Position Value | Description            |
| -------------- | ---------------------- |
| `bottom-right` | Bottom right (default) |
| `bottom-left`  | Bottom left            |
| `top-right`    | Top right              |
| `top-left`     | Top left               |

## Interactive Features

### Click-to-Navigate

When `interactiveMinimap` is enabled, clicking anywhere on the minimap will smoothly pan the canvas to the corresponding position:

```vue
<template>
  <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" show-minimap interactive-minimap />
</template>
```

### Drag Navigation

The minimap supports drag navigation by default:

```typescript
// Plugin options
const minimapOptions = {
  pannable: true, // Enable drag navigation (default: true)
  zoomable: true // Enable zoom (default: true)
}
```

## Layout Controls

### Showing Layout Buttons

Use `showLayoutControls` to display layout control buttons on the minimap:

```vue
<template>
  <yh-flow
    ref="flowRef"
    :nodes="nodes"
    :edges="edges"
    show-minimap
    show-layout-controls
    layout-type="dagre"
    layout-direction="TB"
    @layout-change="handleLayoutChange"
  />
</template>

<script setup lang="ts">
const handleLayoutChange = (layout: string) => {
  console.log('Layout changed to:', layout)
  // Execute auto-layout based on layout type
}
</script>
```

### Layout Button Reference

| Button | Description                 |
| ------ | --------------------------- |
| `D`    | Dagre Layout (Hierarchical) |
| `E`    | ELK Layout (Elastic)        |
| `F`    | Force Layout                |
| `TB`   | Top to Bottom               |
| `LR`   | Left to Right               |

## Complete Example

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'
import dagre from 'dagre'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const layoutType = ref<'dagre' | 'elk' | 'force'>('dagre')
const layoutDirection = ref<'TB' | 'LR'>('TB')

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 120, y: 50 }, data: { label: 'Start' } },
  { id: '2', type: 'default', position: { x: 120, y: 150 }, data: { label: 'Process' } },
  { id: '3', type: 'default', position: { x: 120, y: 250 }, data: { label: 'Branch' } },
  { id: '4', type: 'output', position: { x: 120, y: 350 }, data: { label: 'End' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' }
]);

const applyLayout = async (layout = 'dagre', direction = 'TB') => {
  if (layout === 'dagre') {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 });
    
    nodes.value.forEach(node => {
      dagreGraph.setNode(node.id, { width: 150, height: 50 });
    });
    
    edges.value.forEach(edge => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    
    dagre.layout(dagreGraph);
    
    nodes.value = nodes.value.map(node => {
      const dagreNode = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: dagreNode.x - 75,
          y: dagreNode.y - 25
        }
      };
    });
  }
};

const handleLayoutChange = (layout: string) => {
  layoutType.value = layout as 'dagre' | 'elk' | 'force';
  applyLayout(layoutType.value, layoutDirection.value);
};

const handleDirectionChange = (direction: string) => {
  layoutDirection.value = direction as 'TB' | 'LR';
  applyLayout(layoutType.value, layoutDirection.value);
};

const tsCode = `<${_T}>
  <div class="interactive-minimap-demo">
    <yh-flow
      ref="flowRef"
      :nodes="nodes"
      :edges="edges"
      :model-value="viewport"
      @update:model-value="viewport = $event"
      background="dots"
      show-minimap
      interactive-minimap
      show-layout-controls
      layout-type="dagre"
      layout-direction="TB"
      @layout-change="handleLayoutChange"
      @direction-change="handleDirectionChange"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow';
import dagre from 'dagre';

const flowRef = ref();
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 });

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Start' } },
  { id: '2', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Process' } },
  { id: '3', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Branch' } },
  { id: '4', type: 'output', position: { x: 100, y: 350 }, data: { label: 'End' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' }
]);

const layoutType = ref('dagre');
const layoutDirection = ref('TB');

const handleLayoutChange = (layout: string) => {
  layoutType.value = layout;
  applyLayout(layout, layoutDirection.value);
};

const handleDirectionChange = (direction: string) => {
  layoutDirection.value = direction;
  applyLayout(layoutType.value, direction);
};

const applyLayout = async (layout = 'dagre', direction = 'TB') => {
  if (layout === 'dagre') {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 });
    
    nodes.value.forEach(node => {
      dagreGraph.setNode(node.id, { width: 150, height: 50 });
    });
    
    edges.value.forEach(edge => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    
    dagre.layout(dagreGraph);
    
    nodes.value = nodes.value.map(node => {
      const dagreNode = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: dagreNode.x - 75,
          y: dagreNode.y - 25
        }
      };
    });
  }
};
</${_S}>

<${_St} scoped>
.interactive-minimap-demo {
  height: 500px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
</${_St}>`;
const jsCode = toJs(tsCode);
</script>

<DemoBlock title="Interactive Minimap Demo" :ts-code="tsCode" :js-code="jsCode">
  <div style="border:1px solid #e2e8f0;border-radius:8px;height:500px;overflow:hidden;">
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        :model-value="viewport"
        @update:model-value="viewport = $event"
        background="dots"
        show-minimap
        interactive-minimap
        show-layout-controls
        :layout-type="layoutType"
        :layout-direction="layoutDirection"
        @layout-change="handleLayoutChange"
        @direction-change="handleDirectionChange"
        style="width:100%;height:100%;"
      ></yh-flow>
  </div>
</DemoBlock>

## API Reference

### Flow Props

| Property             | Type                                              | Default  | Description                 |
| -------------------- | ------------------------------------------------- | -------- | --------------------------- |
| `showMinimap`        | `boolean`                                         | `false`  | Show minimap                |
| `interactiveMinimap` | `boolean`                                         | `false`  | Enable click-to-navigate    |
| `showLayoutControls` | `boolean`                                         | `false`  | Show layout control buttons |
| `layoutType`         | `'dagre' \| 'elk' \| 'force' \| 'grid' \| 'none'` | `'none'` | Current layout type         |
| `layoutDirection`    | `'TB' \| 'BT' \| 'LR' \| 'RL'`                    | `'TB'`   | Layout direction            |

### Events

| Event              | Description                             | Parameters                    |
| ------------------ | --------------------------------------- | ----------------------------- |
| `layout-change`    | Triggered when layout type changes      | `(layout: string) => void`    |
| `direction-change` | Triggered when layout direction changes | `(direction: string) => void` |

### MiniMap Plugin Options

| Option               | Type                                                           | Default          | Description             |
| -------------------- | -------------------------------------------------------------- | ---------------- | ----------------------- |
| `position`           | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Minimap position        |
| `width`              | `number`                                                       | `200`            | Minimap width           |
| `height`             | `number`                                                       | `150`            | Minimap height          |
| `nodeColor`          | `(node: Node) => string`                                       | -                | Node color function     |
| `pannable`           | `boolean`                                                      | `true`           | Enable drag navigation  |
| `interactive`        | `boolean`                                                      | `false`          | Enable click navigation |
| `showLayoutControls` | `boolean`                                                      | `false`          | Show layout buttons     |

## Best Practices

1. **Combine with auto-layout**: Combine minimap layout controls with auto-layout algorithms for a one-stop layout experience
2. **Visual feedback**: Use `nodeColor` function to display different colors based on node status
3. **Navigation efficiency**: Enable interactive navigation in large flowcharts to help users quickly locate areas of interest

> [!TIP]
>
> Clicking on empty areas of the minimap quickly jumps to the corresponding canvas position, especially useful for navigation in large flowcharts.
