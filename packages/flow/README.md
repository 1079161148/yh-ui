# @yh-ui/flow

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI Flow — 高性能流程图 & 节点编辑器</h3>

<p align="center">
  可视化流程图组件 · 拖拽连线 · 自定义节点 · 内置布局算法 · 完整 SSR 支持
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/flow">
    <img src="https://img.shields.io/npm/v/@yh-ui/flow.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/flow">
    <img src="https://img.shields.io/npm/dm/@yh-ui/flow.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/flow.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- 🚀 **高性能渲染** — 基于 SVG + Canvas 混合渲染，轻松支持 1000+ 节点
- 🎯 **拖拽连线** — 直觉式交互，支持多种连线类型（直线、折线、贝塞尔曲线）
- 🧩 **自定义节点** — 完全自定义节点外观，支持复杂 Vue 组件作为节点
- 📐 **内置布局算法** — 支持 DAG 有向无环图自动布局（dagre）
- 🔌 **插件化扩展** — 迷你地图、工具栏、右键菜单等均为可选插件
- 🌐 **SSR 安全** — 服务端渲染兼容，无 `window`/`document` 依赖问题
- 🔒 **完整 TypeScript** — 所有 API 均有精确类型定义

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/flow

# npm
npm install @yh-ui/flow
```

---

## 🔨 快速开始

### 基础流程图

```vue
<script setup lang="ts">
import { YhFlow, YhFlowNode, YhFlowEdge } from '@yh-ui/flow'
import '@yh-ui/flow/dist/style.css'
import type { FlowNode, FlowEdge } from '@yh-ui/flow'

const nodes: FlowNode[] = [
  { id: '1', type: 'input', label: '开始', position: { x: 250, y: 0 } },
  { id: '2', label: '处理数据', position: { x: 100, y: 100 } },
  { id: '3', label: '校验结果', position: { x: 400, y: 100 } },
  { id: '4', type: 'output', label: '完成', position: { x: 250, y: 200 } }
]

const edges: FlowEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' }
]
</script>

<template>
  <YhFlow :nodes="nodes" :edges="edges" style="width: 100%; height: 600px">
    <!-- 迷你地图插件 -->
    <YhFlowMiniMap />
    <!-- 工具栏插件 -->
    <YhFlowControls />
    <!-- 背景网格 -->
    <YhFlowBackground variant="dots" />
  </YhFlow>
</template>
```

### 自定义节点

```vue
<script setup lang="ts">
// CustomNode.vue — 自定义节点组件
import { YhFlowHandle } from '@yh-ui/flow'
defineProps<{ data: { label: string; status: 'success' | 'error' | 'pending' } }>()
</script>

<template>
  <div class="custom-node" :class="`status-${data.status}`">
    <!-- 输入连接点 -->
    <YhFlowHandle type="target" position="top" />
    <div class="node-content">
      <span class="status-icon">{{ data.status === 'success' ? '✅' : '⏳' }}</span>
      <span>{{ data.label }}</span>
    </div>
    <!-- 输出连接点 -->
    <YhFlowHandle type="source" position="bottom" />
  </div>
</template>
```

```vue
<script setup lang="ts">
import { YhFlow } from '@yh-ui/flow'
import CustomNode from './CustomNode.vue'

// 注册自定义节点类型
const nodeTypes = { custom: CustomNode }

const nodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: '数据采集', status: 'success' },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'custom',
    data: { label: '数据处理', status: 'pending' },
    position: { x: 200, y: 100 }
  }
]
</script>

<template>
  <YhFlow :nodes="nodes" :node-types="nodeTypes" style="height: 500px" />
</template>
```

### 自动布局（dagre）

```ts
import { useFlowLayout } from '@yh-ui/flow'
import type { FlowNode, FlowEdge } from '@yh-ui/flow'

const { autoLayout } = useFlowLayout()

// 对已有节点和连线自动计算坐标
const { nodes: layoutedNodes, edges: layoutedEdges } = autoLayout(nodes, edges, {
  direction: 'TB', // 'TB'（上→下）| 'LR'（左→右）
  nodeSpacing: 50,
  rankSpacing: 100
})
```

---

## 📚 组件 API

### `YhFlow` 主组件

| 属性                    | 类型                        | 默认值        | 说明               |
| ----------------------- | --------------------------- | ------------- | ------------------ |
| `nodes`                 | `FlowNode[]`                | `[]`          | 节点数据           |
| `edges`                 | `FlowEdge[]`                | `[]`          | 连线数据           |
| `nodeTypes`             | `Record<string, Component>` | `{}`          | 自定义节点类型     |
| `edgeTypes`             | `Record<string, Component>` | `{}`          | 自定义连线类型     |
| `fitView`               | `boolean`                   | `false`       | 初始化时自适应视图 |
| `minZoom`               | `number`                    | `0.5`         | 最小缩放比例       |
| `maxZoom`               | `number`                    | `2`           | 最大缩放比例       |
| `snapToGrid`            | `boolean`                   | `false`       | 是否开启网格对齐   |
| `snapGrid`              | `[number, number]`          | `[15, 15]`    | 网格对齐尺寸       |
| `selectable`            | `boolean`                   | `true`        | 节点是否可选中     |
| `multiSelectionKeyCode` | `string`                    | `'Meta'`      | 多选按键           |
| `deleteKeyCode`         | `string`                    | `'Backspace'` | 删除按键           |

### 事件

| 事件            | 说明                       |
| --------------- | -------------------------- |
| `@node-click`   | 点击节点                   |
| `@edge-click`   | 点击连线                   |
| `@nodes-change` | 节点变更（移动/选中/删除） |
| `@edges-change` | 连线变更                   |
| `@connect`      | 建立新连接                 |
| `@pane-click`   | 点击画布空白区             |

### 插槽

| 插槽           | 说明                                 |
| -------------- | ------------------------------------ |
| `default`      | 插入插件组件（MiniMap、Controls 等） |
| `node-toolbar` | 节点工具栏                           |

---

## 🔌 可用插件

```vue
<YhFlow>
  <!-- 迷你地图 -->
  <YhFlowMiniMap position="bottom-right" />

  <!-- 缩放控制栏 -->
  <YhFlowControls position="bottom-left" :show-fit-view="true" />

  <!-- 背景 -->
  <YhFlowBackground variant="dots" gap="16" color="#aaa" />
</YhFlow>
```

---

## ⚠️ 注意事项

- **容器需要固定高度**：`YhFlow` 需要父容器有明确的 `height`，否则无法正确渲染
- **SSR**：在 Nuxt 3 中需使用 `<ClientOnly>` 包裹或设置 `ssr: false`
  ```vue
  <ClientOnly>
    <YhFlow :nodes="nodes" :edges="edges" style="height: 600px" />
  </ClientOnly>
  ```
- **样式**：需手动引入 `@yh-ui/flow/dist/style.css`，或通过 `@yh-ui/nuxt` 自动注入

---

## 🔗 相关资源

- [📖 官方文档 — Flow 组件](https://1079161148.github.io/yh-ui/components/flow)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
