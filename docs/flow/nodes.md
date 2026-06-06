# Flow 节点类型

Flow 提供了多种内置节点类型，满足不同的业务场景需求。

<script setup lang="ts">
import { toJs } from '../.vitepress/theme/utils/demo-utils'

const tsBasicNodes = `<template>
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      :nodes="[
        { id: 'input', type: 'input', position: { x: 50, y: 50 }, data: { label: '输入节点' }, width: 150, height: 50 },
        { id: 'default', type: 'default', position: { x: 250, y: 50 }, data: { label: '默认节点' }, width: 150, height: 50 },
        { id: 'diamond', type: 'diamond', position: { x: 275, y: 150 }, data: { label: '判断节点' }, width: 100, height: 100 },
        { id: 'database', type: 'database', position: { x: 50, y: 160 }, data: { label: '数据库' }, width: 120, height: 80 },
        { id: 'output', type: 'output', position: { x: 450, y: 50 }, data: { label: '输出节点' }, width: 150, height: 50 }
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
        { id: 'group1', type: 'group', position: { x: 50, y: 50 }, data: { label: '阶段一' }, width: 300, height: 200 },
        { id: 'node1', type: 'input', position: { x: 80, y: 80 }, data: { label: '开始' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'node2', type: 'default', position: { x: 220, y: 80 }, data: { label: '处理' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'group2', type: 'group', position: { x: 400, y: 50 }, data: { label: '阶段二' }, width: 300, height: 200 },
        { id: 'node3', type: 'default', position: { x: 430, y: 80 }, data: { label: '处理' }, width: 120, height: 40, parentId: 'group2' },
        { id: 'node4', type: 'output', position: { x: 570, y: 80 }, data: { label: '结束' }, width: 120, height: 40, parentId: 'group2' }
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
          data: { label: '四向连接点' }, 
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

## 节点类型概述

Flow 内置以下节点类型：

| 类型         | 说明       | 适用场景            |
| ------------ | ---------- | ------------------- |
| \`input\`    | 输入节点   | 流程起点、数据入口  |
| \`output\`   | 输出节点   | 流程终点、数据出口  |
| \`default\`  | 默认节点   | 通用处理节点        |
| \`diamond\`  | 决策节点   | 菱形判断节点 (四向) |
| \`database\` | 数据节点   | 表示数据库、存储    |
| \`custom\`   | 自定义节点 | 业务定制节点        |
| \`group\`    | 分组节点   | 节点容器、区域划分  |

## 基础节点类型

<DemoBlock title="基础节点类型" :ts-code="tsBasicNodes" :js-code="jsBasicNodes">
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      :nodes="[
        { id: 'input', type: 'input', position: { x: 50, y: 50 }, data: { label: '输入节点' }, width: 150, height: 50 },
        { id: 'default', type: 'default', position: { x: 250, y: 50 }, data: { label: '默认节点' }, width: 150, height: 50 },
        { id: 'diamond', type: 'diamond', position: { x: 275, y: 150 }, data: { label: '判断节点' }, width: 100, height: 100 },
        { id: 'database', type: 'database', position: { x: 50, y: 160 }, data: { label: '数据库' }, width: 120, height: 80 },
        { id: 'output', type: 'output', position: { x: 450, y: 50 }, data: { label: '输出节点' }, width: 150, height: 50 }
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

## 节点数据结构

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
  draggable?: boolean // 是否可拖拽
  selectable?: boolean // 是否可选中
  connectable?: boolean // 是否可连接
  resizable?: boolean // 是否显示缩放手柄
  deletable?: boolean // 是否可点击删除
  selected?: boolean
  dragging?: boolean
  hidden?: boolean
  parentId?: string // 父节点 ID
  zIndex?: number
  extent?: 'parent' // 移动范围限制
  handleBounds?: any // 自定义连接点集合
}
```

## 输入节点 (input)

输入节点只有一个右侧连接点，适用于流程起点。

```typescript
const node = {
  id: 'node-1',
  type: 'input',
  position: { x: 100, y: 100 },
  data: {
    label: '数据输入',
    icon: 'upload'
  }
}
```

## 输出节点 (output)

输出节点只有一个左侧连接点，适用于流程终点。

```typescript
const node = {
  id: 'node-2',
  type: 'output',
  position: { x: 500, y: 100 },
  data: {
    label: '结果输出',
    icon: 'download'
  }
}
```

## 默认节点 (default)

默认节点有左侧和右侧连接点，适用于中间处理节点。

```typescript
const node = {
  id: 'node-3',
  type: 'default',
  position: { x: 300, y: 100 },
  data: {
    label: '处理节点',
    description: '执行某个操作'
  }
}
```

## 决策节点 (diamond)

菱形节点是标准的流程判断节点，拥有四个连接点（上下左右均可连接）。

```typescript
const node = {
  id: 'node-4',
  type: 'diamond',
  position: { x: 300, y: 300 },
  data: {
    label: '是否通过'
  }
}
```

## 数据节点 (database)

圆柱形节点，非常适合绘制架构图表示服务端数据存储系统。

```typescript
const node = {
  id: 'node-5',
  type: 'database',
  position: { x: 100, y: 300 },
  data: {
    label: 'MySQL 数据库'
  }
}
```

## 分组节点 (Group)

分组节点用于将多个节点组合在一起，常用于表示流程中的阶段或区域。

<DemoBlock title="分组节点（Group）" :ts-code="tsGroupNodes" :js-code="jsGroupNodes">
  <div style="width: 100%; height: 400px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: 'group1', type: 'group', position: { x: 50, y: 50 }, data: { label: '阶段一' }, width: 300, height: 200 },
        { id: 'node1', type: 'input', position: { x: 80, y: 80 }, data: { label: '开始' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'node2', type: 'default', position: { x: 220, y: 80 }, data: { label: '处理' }, width: 120, height: 40, parentId: 'group1' },
        { id: 'group2', type: 'group', position: { x: 400, y: 50 }, data: { label: '阶段二' }, width: 300, height: 200 },
        { id: 'node3', type: 'default', position: { x: 430, y: 80 }, data: { label: '处理' }, width: 120, height: 40, parentId: 'group2' },
        { id: 'node4', type: 'output', position: { x: 570, y: 80 }, data: { label: '结束' }, width: 120, height: 40, parentId: 'group2' }
      ]"
      :edges="[
        { id: 'e1', source: 'node1', target: 'node2', type: 'bezier' },
        { id: 'e2', source: 'node2', target: 'node3', type: 'bezier' },
        { id: 'e3', source: 'node3', target: 'node4', type: 'bezier' }
      ]"
    />
  </div>
</DemoBlock>

## 自定义节点

通过 `custom` 类型和自定义组件，可以创建完全符合业务需求的节点。

```typescript
// 定义自定义节点数据
const customNode = {
  id: 'custom-1',
  type: 'custom',
  position: { x: 100, y: 100 },
  data: {
    label: '自定义节点',
    icon: 'settings',
    status: 'success',
    actions: ['编辑', '删除']
  }
}
```

### 创建自定义节点组件

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
  </script>

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
  </style>
</template>
```

## 节点 Handle（连接点）

每个节点都有预设的连接点位置：

| 位置     | 说明       |
| -------- | ---------- |
| `left`   | 左侧连接点 |
| `right`  | 右侧连接点 |
| `top`    | 顶部连接点 |
| `bottom` | 底部连接点 |

<DemoBlock title="四向连接点（Handles）" :ts-code="tsHandles" :js-code="jsHandles">
  <div style="width: 100%; height: 300px;">
    <yh-flow
      :model-value="{ x: 100, y: 50, zoom: 1 }"
      :nodes="[
        { 
          id: 'all-handles', 
          type: 'default', 
          position: { x: 200, y: 100 }, 
          data: { label: '四向连接点' }, 
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

## 节点属性

| 属性           | 类型                       | 说明                     |
| -------------- | -------------------------- | ------------------------ |
| id             | `string`                   | 节点唯一标识             |
| type           | `string`                   | 节点类型                 |
| position       | `{ x: number, y: number }` | 节点位置                 |
| data           | `NodeData`                 | 节点数据                 |
| width / height | `number`                   | 节点尺寸                 |
| draggable      | `boolean`                  | 是否允许拖拽 (默认 true) |
| selectable     | `boolean`                  | 是否允许选中 (默认 true) |
| connectable    | `boolean`                  | 是否允许连线 (默认 true) |
| selected       | `boolean`                  | 是否选中                 |
| dragging       | `boolean`                  | 是否正在拖拽             |
| hidden         | `boolean`                  | 是否隐藏                 |
| parentId       | `string`                   | 父节点 ID（用于分组）    |
| zIndex         | `number`                   | 层级                     |
| handleBounds   | `object`                   | 连接点动态配置           |

## 下一个

- [连线类型](./edges) - 了解不同连线类型
- [交互操作](./interaction) - 了解更多交互功能
- [对齐与分布](./alignment) - 使用对齐和分布功能
