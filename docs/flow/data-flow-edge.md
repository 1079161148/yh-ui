# 数据流光效边 (DataFlowEdge)

`DataFlowEdge` 是 `yh-flow` 独有的高级可视化连线组件，专为 **AI 工作流编排**、**实时数据管道**等场景设计。
只需在 `edge.data` 中设置 `flowStatus` 和 `flowEffect`，即可让每条连线随状态呈现**粒子流动、发光、心跳、波浪**四种视觉动效。

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import { DataFlowEdge } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

// ===========================
// Demo 1: 5 种状态演示
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

// 1. 注册自定义边类型
const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

// 2. 定义节点
const nodes = ref<Node[]>([
  { id: 's1', type: 'input',  position: { x: 60,  y: 40  }, data: { label: '数据源 1' }, width: 110, height: 40 },
  { id: 's2', type: 'input',  position: { x: 60,  y: 120 }, data: { label: '数据源 2' }, width: 110, height: 40 },
  { id: 's3', type: 'input',  position: { x: 60,  y: 200 }, data: { label: '数据源 3' }, width: 110, height: 40 },
  { id: 's4', type: 'input',  position: { x: 60,  y: 280 }, data: { label: '数据源 4' }, width: 110, height: 40 },
  { id: 't1', type: 'output', position: { x: 380, y: 155 }, data: { label: '汇聚节点' }, width: 120, height: 44 }
])

// 3. 在 edge.data 中设置 flowStatus 和 flowEffect
const edges = ref<Edge[]>([
  {
    id: 'e1', source: 's1', target: 't1',
    type: 'dataflow',
    label: '处理中',
    data: { flowStatus: 'processing', flowEffect: 'particles' }
  },
  {
    id: 'e2', source: 's2', target: 't1',
    type: 'dataflow',
    label: '成功',
    data: { flowStatus: 'success', flowEffect: 'glow' }
  },
  {
    id: 'e3', source: 's3', target: 't1',
    type: 'dataflow',
    label: '失败',
    data: { flowStatus: 'error', flowEffect: 'pulse' }
  },
  {
    id: 'e4', source: 's4', target: 't1',
    type: 'dataflow',
    label: '警告',
    data: { flowStatus: 'warning', flowEffect: 'wave' }
  }
])
<\/script>`

const jsStatus = toJs(tsStatus)

// ===========================
// Demo 2: 动态切换状态与动效
// ===========================
const tsDynamic = `<template>
  <div style="display: flex; flex-direction: column; height: 440px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <!-- 控制栏 -->
    <div style="padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600;">状态</span>
      <button
        v-for="s in statusList"
        :key="s.value"
        :style="{
          padding: '4px 12px', borderRadius: '6px', cursor: 'pointer',
          border: '1.5px solid ' + s.color, fontSize: '12px',
          color: activeStatus === s.value ? '#fff' : s.color,
          background: activeStatus === s.value ? s.color : 'white',
          transition: 'all 0.2s'
        }"
        @click="activeStatus = s.value"
      >{{ s.label }}</button>
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600; margin-left: 8px;">动效</span>
      <select
        v-model="activeEffect"
        style="padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px;"
      >
        <option value="particles">✨ 粒子流</option>
        <option value="glow">💡 持续发光</option>
        <option value="pulse">💓 心跳闪烁</option>
        <option value="wave">〰️ 流动波浪</option>
        <option value="none">— 无动效</option>
      </select>
    </div>
    <!-- 画布 -->
    <div style="flex: 1;">
      <yh-flow
        :nodes="nodes"
        :edges="dynamicEdges"
        :edge-types="edgeTypes"
        background="dots"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

const statusList = [
  { value: 'idle',       label: '⚪ 空闲',  color: '#b1b1b7' },
  { value: 'processing', label: '🔵 处理中', color: '#6366f1' },
  { value: 'success',    label: '🟢 成功',   color: '#10b981' },
  { value: 'error',      label: '🔴 失败',   color: '#ef4444' },
  { value: 'warning',    label: '🟠 警告',   color: '#f59e0b' }
]

const activeStatus = ref('processing')
const activeEffect  = ref('particles')

const nodes = ref<Node[]>([
  { id: 'n1', type: 'input',   position: { x: 60,  y: 140 }, data: { label: '节点 A' }, width: 110, height: 44 },
  { id: 'n2', type: 'default', position: { x: 260, y: 60  }, data: { label: '节点 B' }, width: 110, height: 44 },
  { id: 'n3', type: 'default', position: { x: 260, y: 220 }, data: { label: '节点 C' }, width: 110, height: 44 },
  { id: 'n4', type: 'output',  position: { x: 460, y: 140 }, data: { label: '节点 D' }, width: 110, height: 44 }
])

// 通过 computed 让 edge.data 响应式更新
const dynamicEdges = computed<Edge[]>(() => [
  { id: 'ea', source: 'n1', target: 'n2', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'eb', source: 'n1', target: 'n3', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ec', source: 'n2', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ed', source: 'n3', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } }
])
<\/script>`

const jsDynamic = toJs(tsDynamic)

// ===========================
// 实时 Demo 1 数据
// ===========================
const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

const demoNodes1 = ref<Node[]>([
  { id: 's1', type: 'input',  position: { x: 60,  y: 40  }, data: { label: '数据源 1' }, width: 110, height: 40 },
  { id: 's2', type: 'input',  position: { x: 60,  y: 120 }, data: { label: '数据源 2' }, width: 110, height: 40 },
  { id: 's3', type: 'input',  position: { x: 60,  y: 200 }, data: { label: '数据源 3' }, width: 110, height: 40 },
  { id: 's4', type: 'input',  position: { x: 60,  y: 280 }, data: { label: '数据源 4' }, width: 110, height: 40 },
  { id: 't1', type: 'output', position: { x: 380, y: 155 }, data: { label: '汇聚节点' }, width: 120, height: 44 }
])

const demoEdges1 = ref<Edge[]>([
  { id: 'e1', source: 's1', target: 't1', type: 'dataflow', label: '处理中', data: { flowStatus: 'processing', flowEffect: 'particles' } },
  { id: 'e2', source: 's2', target: 't1', type: 'dataflow', label: '成功',   data: { flowStatus: 'success',    flowEffect: 'glow'      } },
  { id: 'e3', source: 's3', target: 't1', type: 'dataflow', label: '失败',   data: { flowStatus: 'error',      flowEffect: 'pulse'     } },
  { id: 'e4', source: 's4', target: 't1', type: 'dataflow', label: '警告',   data: { flowStatus: 'warning',    flowEffect: 'wave'      } }
])

// ===========================
// 实时 Demo 2 数据
// ===========================
const statusList = [
  { value: 'idle',       label: '⚪ 空闲',  color: '#b1b1b7' },
  { value: 'processing', label: '🔵 处理中', color: '#6366f1' },
  { value: 'success',    label: '🟢 成功',   color: '#10b981' },
  { value: 'error',      label: '🔴 失败',   color: '#ef4444' },
  { value: 'warning',    label: '🟠 警告',   color: '#f59e0b' }
]

const activeStatus = ref('processing')
const activeEffect  = ref('particles')

const demoNodes2 = ref<Node[]>([
  { id: 'n1', type: 'input',   position: { x: 60,  y: 120 }, data: { label: '节点 A' }, width: 110, height: 44 },
  { id: 'n2', type: 'default', position: { x: 250, y: 50  }, data: { label: '节点 B' }, width: 110, height: 44 },
  { id: 'n3', type: 'default', position: { x: 250, y: 195 }, data: { label: '节点 C' }, width: 110, height: 44 },
  { id: 'n4', type: 'output',  position: { x: 440, y: 120 }, data: { label: '节点 D' }, width: 110, height: 44 }
])

const demoEdges2 = computed<Edge[]>(() => [
  { id: 'ea', source: 'n1', target: 'n2', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'eb', source: 'n1', target: 'n3', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ec', source: 'n2', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } },
  { id: 'ed', source: 'n3', target: 'n4', type: 'dataflow', data: { flowStatus: activeStatus.value, flowEffect: activeEffect.value } }
])
</script>

## 快速上手

**只需两步**：注册组件 → 在 `edge.data` 里配置状态

```typescript
// 步骤 1：注册为自定义边类型
import { markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'

const edgeTypes = { dataflow: markRaw(DataFlowEdge) }

// 步骤 2：在 edges 数组的 data 字段中配置状态和动效
const edges = ref([
  {
    id: 'e1',
    source: 'node-a',
    target: 'node-b',
    type: 'dataflow', // 对应步骤 1 注册的 key
    label: '处理中',
    data: {
      flowStatus: 'processing', // 状态：idle | processing | success | error | warning
      flowEffect: 'particles' // 动效：particles | glow | pulse | wave | none
    }
  }
])
```

> [!IMPORTANT]
> `flowStatus`、`flowEffect` 等配置项**必须放在 `edge.data` 对象里**，而不是 edge 的顶层字段。组件会自动从 `edge.data` 中读取这些值。

## 5 种状态演示

<DemoBlock title="processing/success/error/warning/idle 全状态预览" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="width: 100%; height: 360px;">
    <yh-flow
      :nodes="demoNodes1"
      :edges="demoEdges1"
      :edge-types="edgeTypes"
      background="dots"
    />
  </div>
</DemoBlock>

## 动态切换状态与动效

<DemoBlock title="实时切换状态与动效，体验全部组合效果" :ts-code="tsDynamic" :js-code="jsDynamic">
  <div style="display: flex; flex-direction: column; height: 380px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600;">状态</span>
      <button
        v-for="s in statusList"
        :key="s.value"
        :style="{
          padding: '4px 12px', borderRadius: '6px', cursor: 'pointer',
          border: '1.5px solid ' + s.color, fontSize: '12px',
          color: activeStatus === s.value ? '#fff' : s.color,
          background: activeStatus === s.value ? s.color : 'white',
          transition: 'all 0.2s'
        }"
        @click="activeStatus = s.value"
      >{{ s.label }}</button>
      <span style="font-size: 12px; color: #94a3b8; font-weight: 600; margin-left: 8px;">动效</span>
      <select v-model="activeEffect" style="padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px;">
        <option value="particles">✨ 粒子流</option>
        <option value="glow">💡 持续发光</option>
        <option value="pulse">💓 心跳闪烁</option>
        <option value="wave">〰️ 流动波浪</option>
        <option value="none">— 无动效</option>
      </select>
    </div>
    <div style="flex: 1;">
      <yh-flow :nodes="demoNodes2" :edges="demoEdges2" :edge-types="edgeTypes" background="dots" />
    </div>
  </div>
</DemoBlock>

## 状态说明

| `flowStatus` 值 | 颜色 | 动画特征 | 典型场景               |
| --------------- | ---- | -------- | ---------------------- |
| `idle`          | 灰色 | 无动画   | 静止连线、待机状态     |
| `processing`    | 紫色 | 线条呼吸 | 数据传输中、API 请求中 |
| `success`       | 绿色 | 稳定发光 | 传输完成、节点执行成功 |
| `error`         | 红色 | 快速闪烁 | 传输失败、节点出错     |
| `warning`       | 橙色 | 慢速脉冲 | 超时告警、数据异常     |

## 动效说明

| `flowEffect` 值 | 描述                            | 最佳搭配状态        |
| --------------- | ------------------------------- | ------------------- |
| `particles`     | 发光粒子沿曲线路径流动          | `processing`        |
| `glow`          | 线条持续发光光晕                | `success`           |
| `pulse`         | 线条亮度心跳闪烁（JS interval） | `error` / `warning` |
| `wave`          | CSS 虚线流动动画                | `processing` / 通用 |
| `none`          | 无特殊动效，颜色仍随状态变化    | 全部                |

## API

### `edge.data` 配置项

> 这些字段写在 Edge 的 `data` 对象中

| 字段                | 类型             | 默认值        | 说明                      |
| ------------------- | ---------------- | ------------- | ------------------------- |
| `flowStatus`        | `DataFlowStatus` | `'idle'`      | 状态，决定颜色与 CSS 动画 |
| `flowEffect`        | `DataFlowEffect` | `'particles'` | 视觉动效类型              |
| `glowIntensity`     | `number`         | `8`           | 发光模糊强度（0–20）      |
| `particleCount`     | `number`         | `3`           | 粒子数量（1–10）          |
| `animationDuration` | `number`         | `2`           | 粒子/pulse 动画周期（秒） |

### Edge 标准字段

| 字段       | 类型      | 说明                                 |
| ---------- | --------- | ------------------------------------ |
| `type`     | `string`  | 设为注册的 key，如 `'dataflow'`      |
| `label`    | `string`  | 连线中心标签文字                     |
| `animated` | `boolean` | 设为 `true` 时 idle 状态显示虚线流动 |
| `selected` | `boolean` | 是否高亮选中状态                     |

### 类型定义

```typescript
type DataFlowStatus = 'idle' | 'processing' | 'success' | 'error' | 'warning'
type DataFlowEffect = 'particles' | 'glow' | 'pulse' | 'wave' | 'none'
```

### 注册为自定义边类型

```typescript
import { markRaw } from 'vue'
import { DataFlowEdge } from '@yh-ui/flow'

// 在 yh-flow 的 :edge-types 中注册
const edgeTypes = {
  dataflow: markRaw(DataFlowEdge)
  // 可同时注册多个自定义边类型
}
```

> [!TIP]
> 把 `edges` 定义为 `computed`，将状态（如来自 Pinia store 的运行时数据）映射到 `edge.data`，可轻松实现 AI 工作流节点运行状态的**实时可视化**。

## 下一步

- [节点成组与子流程](./node-group)
- [历史撤销/重做](./history)
- [自动布局](./layout)
