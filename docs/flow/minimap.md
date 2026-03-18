# 交互式小地图 (Interactive Minimap)

`yh-flow` 的小地图组件不仅能够显示流程图的整体概览，还支持交互式导航和布局控制。

## 基本用法

### 启用小地图

```vue
<template>
  <yh-flow :nodes="nodes" :edges="edges" show-minimap />
</template>
```

### 小地图位置

可以通过 `position` 属性设置小地图的位置：

```vue
<yh-flow
  :nodes="nodes"
  :edges="edges"
  show-minimap
  :minimap-node-color="(node) => (node.selected ? '#3b82f6' : '#94a3b8')"
/>
```

| 位置值         | 说明           |
| -------------- | -------------- |
| `bottom-right` | 右下角（默认） |
| `bottom-left`  | 左下角         |
| `top-right`    | 右上角         |
| `top-left`     | 左上角         |

## 交互式功能

### 点击跳转导航

启用 `interactiveMinimap` 属性后，点击小地图上的任意位置，画布将平滑移动到对应位置：

```vue
<template>
  <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" show-minimap interactive-minimap />
</template>
```

### 拖拽导航

小地图默认支持拖拽导航功能：

```typescript
// 插件选项
const minimapOptions = {
  pannable: true, // 允许拖拽导航（默认 true）
  zoomable: true // 允许缩放（默认 true）
}
```

## 布局控制

### 显示布局按钮

通过 `showLayoutControls` 属性可以在小地图上显示布局控制按钮：

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
  // 根据布局类型执行自动布局
}
</script>
```

### 布局按钮说明

| 按钮 | 说明                     |
| ---- | ------------------------ |
| `D`  | Dagre 布局（层次布局）   |
| `E`  | ELK 布局（弹性布局）     |
| `F`  | Force 布局（力导向布局） |
| `TB` | 从上到下方向             |
| `LR` | 从左到右方向             |

## 完整示例

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'
import dagre from 'dagre'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const layoutType = ref<'dagre' | 'elk' | 'force'>('dagre')
const layoutDirection = ref<'TB' | 'LR'>('TB')

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 120, y: 50 }, data: { label: '开始' } },
  { id: '2', type: 'default', position: { x: 120, y: 150 }, data: { label: '处理' } },
  { id: '3', type: 'default', position: { x: 120, y: 250 }, data: { label: '分支' } },
  { id: '4', type: 'output', position: { x: 120, y: 350 }, data: { label: '结束' } }
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
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: '开始' } },
  { id: '2', type: 'default', position: { x: 100, y: 150 }, data: { label: '处理' } },
  { id: '3', type: 'default', position: { x: 100, y: 250 }, data: { label: '分支' } },
  { id: '4', type: 'output', position: { x: 100, y: 350 }, data: { label: '结束' } }
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

<DemoBlock title="交互式小地图演示" :ts-code="tsCode" :js-code="jsCode">
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

## API 参考

### Flow Props

| 属性                 | 类型                                              | 默认值   | 说明             |
| -------------------- | ------------------------------------------------- | -------- | ---------------- |
| `showMinimap`        | `boolean`                                         | `false`  | 是否显示小地图   |
| `interactiveMinimap` | `boolean`                                         | `false`  | 启用点击跳转导航 |
| `showLayoutControls` | `boolean`                                         | `false`  | 显示布局控制按钮 |
| `layoutType`         | `'dagre' \| 'elk' \| 'force' \| 'grid' \| 'none'` | `'none'` | 当前布局类型     |
| `layoutDirection`    | `'TB' \| 'BT' \| 'LR' \| 'RL'`                    | `'TB'`   | 布局方向         |

### 事件

| 事件名             | 说明               | 参数                          |
| ------------------ | ------------------ | ----------------------------- |
| `layout-change`    | 布局类型改变时触发 | `(layout: string) => void`    |
| `direction-change` | 布局方向改变时触发 | `(direction: string) => void` |

### MiniMap 插件选项

| 选项                 | 类型                                                           | 默认值           | 说明             |
| -------------------- | -------------------------------------------------------------- | ---------------- | ---------------- |
| `position`           | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | 小地图位置       |
| `width`              | `number`                                                       | `200`            | 小地图宽度       |
| `height`             | `number`                                                       | `150`            | 小地图高度       |
| `nodeColor`          | `(node: Node) => string`                                       | -                | 节点颜色函数     |
| `pannable`           | `boolean`                                                      | `true`           | 是否支持拖拽     |
| `interactive`        | `boolean`                                                      | `false`          | 是否支持点击跳转 |
| `showLayoutControls` | `boolean`                                                      | `false`          | 显示布局按钮     |

## 最佳实践

1. **配合自动布局使用**：将小地图的布局控制按钮与自动布局算法结合，提供一站式布局体验
2. **视觉反馈**：使用 `nodeColor` 函数根据节点状态显示不同颜色，增强可视化效果
3. **导航效率**：在大型流程图中启用交互式导航，帮助用户快速定位关注区域

> [!TIP]
>
> 点击小地图的空白区域可以快速跳转到对应的画布位置，特别适合大型流程图的导航。
