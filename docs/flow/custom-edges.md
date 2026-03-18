# 自定义边类型 (Custom Edge Types)

`yh-flow` 支持注册和使用自定义边类型。通过简单的注册机制，您可以为特定类型的连线配置独特的外观与交互逻辑，而无需在每个画布中重复编写代码。

## 核心概念

在使用自定义组件时，建议优先通过 `yh-flow` 的 Props 进行注入，这符合**低耦合、高内聚**的函数式编程思想，且能完美兼容 `Nuxt` 等 SSR 环境。

### 1. 组件 Prop 注入 (推荐模式)

通过 `edge-types` 属性传入一个对象。这种方式作用域明确，不会污染全局状态，是开发复杂应用的首选。

```vue
<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { Flow } from '@yh-ui/flow'

// 1. 定义或导入您的自定义边组件
const MyCustomEdge = defineComponent({
  props: ['path', 'stroke'],
  setup(props) {
    return () => h('path', { d: props.path, stroke: 'orange', strokeWidth: 3, fill: 'none' })
  }
})

// 2. 映射到类型字典中
const edgeTypes = {
  'custom-orange': MyCustomEdge
}

const edges = ref([{ id: 'e1', source: 'n1', target: 'n2', type: 'custom-orange' }])
</script>

<template>
  <yh-flow :edges="edges" :edge-types="edgeTypes" />
</template>
```

### 2. 全局注册 (多实例共享)

如果您希望在多个不同的画布实例中共享同一组连线样式，可以使用 `registerCustomEdge`。这会将组件注册到内部的全局注册表中。

> [!CAUTION]
> 在 **SSR (Nuxt 3)** 环境下，请通过插件 (Plugin) 仅在客户端执行注册，或优先使用 Prop 注入，以避免跨请求的状态污染。

```typescript
import { registerCustomEdge } from '@yh-ui/flow'
// 这里导入您在单独文件中定义的组件
import CustomEdgeComponent from './MyEdge.vue'

registerCustomEdge({
  type: 'my-custom-edge',
  component: CustomEdgeComponent,
  label: '审核流程连线'
})
```

### 3. 插槽模式 (手动模式)

如果您只想在特定的画布中临时改变边的样式，或者需要访问复杂的父级上下文，可以使用 `#edge` 插槽：

```vue
<yh-flow :nodes="nodes" :edges="edges">
  <template #edge="edgeProps">
    <!-- 手动控制渲染逻辑 -->
    <MySpecialEdge v-bind="edgeProps" />
  </template>
</yh-flow>
```

---

## 完整示例

### 开发自定义边组件

自定义组件会接收到包含坐标、路径、中心点以及原始数据在内的完整 Prop 对象。

```vue
<!-- CustomEdgeComponent.vue -->
<template>
  <g class="custom-edge" :class="{ 'is-selected': edge.selected }">
    <!-- 绘制主路径 -->
    <path
      :d="path"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      fill="none"
      :stroke-dasharray="edge.animated ? '5,5' : 'none'"
    />

    <!-- 在连线中心添加装饰 -->
    <circle :cx="labelX" :cy="labelY" r="5" fill="#10b981" />

    <!-- 渲染标签 -->
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

### 自动渲染演示

下例展示了注册后直接使用 `type` 属性，`EdgeRenderer` 如何自动接管渲染。

<script setup lang="ts">
import { ref, defineComponent, h, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import {
  registerCustomEdge,
  type Node,
  type Edge
} from '@yh-ui/flow'

// 模拟一个带动画的自定义边组件
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
        class: 'custom-step-path'
      }),
      h('circle', {
        cx: props.labelX,
        cy: props.labelY,
        r: 6,
        fill: props.stroke,
        class: 'pulse-dot'
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

// 注册
registerCustomEdge({
  type: 'step-pulse',
  component: StepEdgeComponent
})

const nodes = ref<Node[]>([
  { id: 'n1', type: 'input', position: { x: 50, y: 150 }, data: { label: '数据源' } },
  { id: 'n2', type: 'default', position: { x: 250, y: 150 }, data: { label: '转换层' } },
  { id: 'n3', type: 'output', position: { x: 450, y: 150 }, data: { label: '归档' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: 'n1', target: 'n2', type: 'step-pulse', label: 'STREAMING' },
  { id: 'e2-3', source: 'n2', target: 'n3', animated: true, label: 'FINALIZING' }
])

const tsCode = `<${_T}>
  <!-- 注意：这里不需要写任何 #edge 插槽，因为我们已经在全局注册了 'step-pulse' -->
  <yh-flow :nodes="nodes" :edges="edges" background="dots" />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'
import { registerCustomEdge, type Node, type Edge } from '@yh-ui/flow'
import StepEdgeComponent from './StepEdgeComponent.vue'

// 1. 注册一次
registerCustomEdge({
  type: 'step-pulse',
  component: StepEdgeComponent
})

// 2. 在业务数据中直接指定 type
const nodes = ref<Node[]>([
  { id: 'n1', type: 'input', position: { x: 50, y: 150 }, data: { label: '数据源' } },
  { id: 'n2', type: 'default', position: { x: 280, y: 150 }, data: { label: '转换层' } }
])

const edges = ref<Edge[]>([
  { 
    id: 'e1-2', 
    source: 'n1', 
    target: 'n2', 
    type: 'step-pulse', 
    label: 'STREAMING' 
  }
])
</${_S}>

<${_St}>
/* 自定义边动画 */
@keyframes dash {
  to { stroke-dashoffset: -12; }
}
.custom-step-path {
  animation: dash 1s linear infinite;
}
.pulse-dot {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { r: 4; opacity: 1; }
  100% { r: 10; opacity: 0; }
}
</${_St}>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="自动渲染演示" :ts-code="tsCode" :js-code="jsCode">
  <div style="border:1px solid #e2e8f0;border-radius:12px;height:400px;background:#f8fafc;">
    <yh-flow :nodes="nodes" :edges="edges" background="dots" />
  </div>
</DemoBlock>

---

## API 参考

### 策略函数

| 函数                                           | 说明                                         |
| ---------------------------------------------- | -------------------------------------------- |
| `registerCustomEdge(edge: CustomEdge)`         | 注册全局自定义边组件                         |
| `getCustomEdge(type: string)`                  | 获取注册的组件信息                           |
| `registerEdgeTemplate(template: EdgeTemplate)` | 注册带有默认数据（如动画、特定颜色）的边模板 |

### 类型定义

```typescript
// 自定义边配置
interface CustomEdge {
  type: string // 唯一标识，对应 Edge.type
  component: Component // Vue 组件
  label?: string // 别名或描述
}

// 传递给自定义组件的 Props
interface EdgeProps {
  edge: Edge // 原始边数据
  path: string // 根据 type 计算好的 SVG 路径字符串
  sourceX: number // 起点 X
  sourceY: number // 起点 Y
  targetX: number // 终点 X
  targetY: number // 终点 Y
  labelX: number // 默认中心点 X
  labelY: number // 默认中心点 Y
  labelWidth: number // 计算好的标签宽度（px）
  stroke: string // 根据主题或样式计算出的连线颜色
  strokeWidth: number // 计算好的线条宽度
}
```

> 所有的自定义边组件必须返回有效的 SVG 元素（通常包装在 `<g>` 标签中），否则在叠加渲染时会导致图形错乱。

<style scoped>
@keyframes dash-move { to { stroke-dashoffset: -12; } }
.custom-step-path { animation: dash-move 1s linear infinite; }
@keyframes pulse-dot { 0% { r: 4; opacity: 1; } 100% { r: 10; opacity: 0; } }
.pulse-dot { animation: pulse-dot 2s infinite; }
</style>
