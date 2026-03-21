# 节点成组与子流程 (NodeGroupPlugin)

`createNodeGroupPlugin` 允许将多个节点**一键分组**为带父子关系的容器节点，支持**折叠展开**与**解组还原**。
对于 AI Agent 编排、BPMN 子流程、多阶段数据管道等复杂场景极为实用。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

// ===========================
// Demo 1: 成组 & 解组
// ===========================
const tsGroup = `<template>
  <div style="display: flex; flex-direction: column; height: 460px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <span style="font-size: 12px; color: #94a3b8;">选中 2+ 节点后：</span>
      <button @click="groupSelected" style="padding: 4px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
        📦 框选成组
      </button>
      <button @click="ungroupLast" style="padding: 4px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-size: 12px;">
        ✂️ 解组
      </button>
      <input v-model="groupLabel" placeholder="分组名称" style="padding: 4px 9px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; width: 100px;" />
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="nodes" v-model:edges="edges" background="dots" />
    </div>
    <div style="padding: 6px 14px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">
      💡 点击节点可选中，按住 Shift 多选，再点击"框选成组"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createNodeGroupPlugin } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const flowRef = ref()
const groupLabel = ref('新分组')
let lastGroupId: string | null = null

const nodes = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 80,  y: 80  }, data: { label: '节点 A' }, width: 120, height: 45 },
  { id: '2', type: 'default', position: { x: 80,  y: 180 }, data: { label: '节点 B' }, width: 120, height: 45 },
  { id: '3', type: 'default', position: { x: 260, y: 80  }, data: { label: '节点 C' }, width: 120, height: 45 },
  { id: '4', type: 'default', position: { x: 260, y: 180 }, data: { label: '节点 D' }, width: 120, height: 45 },
  { id: '5', type: 'output',  position: { x: 450, y: 130 }, data: { label: '输出节点' }, width: 120, height: 45 }
])

const edges = ref<Edge[]>([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' }
])

onMounted(() => {
  // usePlugin 安装插件，插件的 install() 会在 FlowInstance 上挂载方法
  flowRef.value?.usePlugin(
    createNodeGroupPlugin({ groupIdPrefix: 'grp', paddingX: 30, paddingY: 40 })
  )
})

const groupSelected = () => {
  // 插件安装后，flow 实例上会出现 groupSelectedNodes 方法
  const id = flowRef.value?.groupSelectedNodes(groupLabel.value)
  if (id) lastGroupId = id
}

const ungroupLast = () => {
  if (lastGroupId) {
    flowRef.value?.ungroupNodes(lastGroupId)
    lastGroupId = null
  }
}
<\/script>`

const jsGroup = toJs(tsGroup)

// ===========================
// Demo 2: 折叠 / 展开
// ===========================
const tsCollapse = `<template>
  <div style="display: flex; flex-direction: column; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center;">
      <button @click="toggleCollapse" style="padding: 4px 16px; background: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
        {{ isCollapsed ? '📂 展开分组' : '📁 折叠分组' }}
      </button>
      <span style="font-size: 12px; color: #64748b;">{{ isCollapsed ? '子节点已隐藏' : '子节点已显示' }}</span>
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="nodes" v-model:edges="edges" background="lines" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createNodeGroupPlugin } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const flowRef = ref()
const isCollapsed = ref(false)
const GROUP_ID = 'preset-group'

// 预先定义好的 group 结构：group 节点 + 两个子节点（使用 parentId）
const nodes = ref<Node[]>([
  {
    id: GROUP_ID,
    type: 'group',
    position: { x: 60, y: 60 },
    data: { label: '数据处理组' },
    style: { width: 300, height: 160, backgroundColor: 'rgba(99,102,241,0.06)' },
    width: 300, height: 160, zIndex: -1
  },
  {
    id: 'c1', type: 'default',
    position: { x: 20, y: 55 },
    parentId: GROUP_ID, extent: 'parent',
    data: { label: '清洗节点' }, width: 110, height: 42
  },
  {
    id: 'c2', type: 'default',
    position: { x: 165, y: 55 },
    parentId: GROUP_ID, extent: 'parent',
    data: { label: '转换节点' }, width: 110, height: 42
  },
  { id: 'out', type: 'output', position: { x: 440, y: 120 }, data: { label: '输出' }, width: 110, height: 42 }
])

const edges = ref<Edge[]>([
  { id: 'ec1-c2', source: 'c1', target: 'c2' },
  { id: 'ec2-out', source: 'c2', target: 'out' }
])

onMounted(() => {
  const plugin = createNodeGroupPlugin()
  flowRef.value?.usePlugin(plugin)

  // 告知插件该 group 及其子节点关系（手动注册预设分组）
  const registry = flowRef.value?.getGroupRegistry?.()
  if (registry) {
    registry.set(GROUP_ID, {
      groupId: GROUP_ID,
      childIds: ['c1', 'c2'],
      collapsed: false,
      originalPositions: {}
    })
  }
})

const toggleCollapse = () => {
  flowRef.value?.toggleGroupCollapse?.(GROUP_ID)
  isCollapsed.value = !isCollapsed.value
}
<\/script>`

const jsCollapse = toJs(tsCollapse)

// ===========================
// 实时 Demo 1 数据
// ===========================
import { createNodeGroupPlugin } from '@yh-ui/flow'

const flowRef1 = ref()
const groupLabel = ref('新分组')
let lastGroupId: string | null = null

const demoNodes1 = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 80,  y: 80  }, data: { label: '节点 A' }, width: 110, height: 42 },
  { id: '2', type: 'default', position: { x: 80,  y: 170 }, data: { label: '节点 B' }, width: 110, height: 42 },
  { id: '3', type: 'default', position: { x: 250, y: 80  }, data: { label: '节点 C' }, width: 110, height: 42 },
  { id: '4', type: 'default', position: { x: 250, y: 170 }, data: { label: '节点 D' }, width: 110, height: 42 },
  { id: '5', type: 'output',  position: { x: 430, y: 125 }, data: { label: '输出节点' }, width: 110, height: 42 }
])
const demoEdges1 = ref<Edge[]>([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' }
])

onMounted(() => {
  flowRef1.value?.usePlugin(
    createNodeGroupPlugin({ groupIdPrefix: 'grp', paddingX: 30, paddingY: 40 })
  )
})

const groupSelected = () => {
  const id = flowRef1.value?.groupSelectedNodes(groupLabel.value)
  if (id) lastGroupId = id
}
const ungroupLast = () => {
  if (lastGroupId) {
    flowRef1.value?.ungroupNodes(lastGroupId)
    lastGroupId = null
  }
}

// ===========================
// 实时 Demo 2 数据
// ===========================
const flowRef2 = ref()
const isCollapsed = ref(false)
const GROUP_ID = 'preset-group'

const demoNodes2 = ref<Node[]>([
  {
    id: GROUP_ID, type: 'group',
    position: { x: 50, y: 50 },
    data: { label: '数据处理组' },
    style: { width: 300, height: 160, backgroundColor: 'rgba(99,102,241,0.06)' },
    width: 300, height: 160, zIndex: -1
  },
  { id: 'c1', type: 'default', position: { x: 20, y: 55 }, parentId: GROUP_ID, extent: 'parent', data: { label: '清洗节点' }, width: 110, height: 42 },
  { id: 'c2', type: 'default', position: { x: 165, y: 55 }, parentId: GROUP_ID, extent: 'parent', data: { label: '转换节点' }, width: 110, height: 42 },
  { id: 'out', type: 'output', position: { x: 430, y: 115 }, data: { label: '输出' }, width: 110, height: 42 }
])
const demoEdges2 = ref<Edge[]>([
  { id: 'ec1-c2', source: 'c1', target: 'c2' },
  { id: 'ec2-out', source: 'c2', target: 'out' }
])

onMounted(() => {
  const plugin = createNodeGroupPlugin()
  flowRef2.value?.usePlugin(plugin)
  const registry = flowRef2.value?.getGroupRegistry?.()
  if (registry) {
    registry.set(GROUP_ID, {
      groupId: GROUP_ID, childIds: ['c1', 'c2'], collapsed: false, originalPositions: {}
    })
  }
})

const toggleCollapse = () => {
  flowRef2.value?.toggleGroupCollapse?.(GROUP_ID)
  isCollapsed.value = !isCollapsed.value
}
</script>

## 快速上手

```typescript
import { createNodeGroupPlugin } from '@yh-ui/flow'

// onMounted 中安装插件
// usePlugin 会调用 plugin.install(flowInstance)
// 从而在 flowRef.value 上挂载 groupSelectedNodes / ungroupNodes 等方法
onMounted(() => {
  flowRef.value?.usePlugin(
    createNodeGroupPlugin({
      groupIdPrefix: 'grp', // 自动生成分组 ID 时的前缀
      paddingX: 40, // 分组容器水平内边距（px）
      paddingY: 50 // 分组容器垂直内边距（px）
    })
  )
})

// 然后即可调用：
flowRef.value?.groupSelectedNodes('我的分组') // → 分组并返回 groupId
flowRef.value?.ungroupNodes(groupId) // → 解组
flowRef.value?.toggleGroupCollapse(groupId) // → 折叠/展开
```

## 框选成组 / 解组

<DemoBlock title="框选节点后一键成组，支持自定义分组名称" :ts-code="tsGroup" :js-code="jsGroup">
  <div style="display: flex; flex-direction: column; height: 380px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <span style="font-size: 11px; color: #94a3b8;">选中 2+ 节点：</span>
      <button @click="groupSelected" style="padding: 4px 13px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">📦 成组</button>
      <button @click="ungroupLast" style="padding: 4px 13px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-size: 12px;">✂️ 解组</button>
      <input v-model="groupLabel" placeholder="分组名称" style="padding: 4px 9px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; width: 90px;" />
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef1" v-model:nodes="demoNodes1" v-model:edges="demoEdges1" background="dots" />
    </div>
    <div style="padding: 6px 12px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">💡 点击节点可选中，Shift 多选，再点击"成组"</div>
  </div>
</DemoBlock>

## 折叠 / 展开分组

<DemoBlock title="折叠分组可隐藏所有子节点，展开恢复" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="display: flex; flex-direction: column; height: 340px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center;">
      <button @click="toggleCollapse" style="padding: 4px 14px; background: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
        {{ isCollapsed ? '📂 展开分组' : '📁 折叠分组' }}
      </button>
      <span style="font-size: 12px; color: #64748b;">{{ isCollapsed ? '子节点已隐藏' : '子节点已显示' }}</span>
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef2" v-model:nodes="demoNodes2" v-model:edges="demoEdges2" background="lines" />
    </div>
  </div>
</DemoBlock>

## API

### 安装插件

```typescript
import { createNodeGroupPlugin } from '@yh-ui/flow'

onMounted(() => {
  flowRef.value?.usePlugin(createNodeGroupPlugin(options))
})
```

### FlowInstance 扩展方法

> 插件安装后，以下方法自动挂载到 `flowRef.value` 上

| 方法                  | 签名                                 | 说明                                                              |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `groupSelectedNodes`  | `(label?: string) => string \| null` | 将所有 **selected** 节点分组，返回分组 ID，不足 2 个时返回 `null` |
| `ungroupNodes`        | `(groupId: string) => void`          | 解组：子节点恢复绝对坐标并提升为顶层节点                          |
| `toggleGroupCollapse` | `(groupId: string) => void`          | 切换分组折叠/展开状态（同时隐藏/显示相关边）                      |
| `isGroupCollapsed`    | `(groupId: string) => boolean`       | 查询分组当前是否已折叠                                            |
| `getGroupChildren`    | `(groupId: string) => Node[]`        | 获取分组的所有子节点                                              |
| `getGroupRegistry`    | `() => Map<string, GroupInfo>`       | 获取完整分组注册表（调试用）                                      |

### NodeGroupOptions

| 属性            | 类型                   | 默认值    | 说明                                                  |
| --------------- | ---------------------- | --------- | ----------------------------------------------------- |
| `enabled`       | `boolean`              | `true`    | 是否启用插件                                          |
| `groupNodeType` | `string`               | `'group'` | 分组节点渲染类型，需在 `nodeTypes` 中注册             |
| `paddingX`      | `number`               | `40`      | 分组容器水平内边距（px）                              |
| `paddingY`      | `number`               | `50`      | 分组容器垂直内边距（px）                              |
| `groupIdPrefix` | `string`               | `'group'` | 自动生成分组 ID 的前缀（如 `'grp'` → 生成 `'grp-1'`） |
| `collapseMode`  | `'collapse' \| 'hide'` | `'hide'`  | 折叠行为：`'hide'` 直接隐藏子节点                     |

### GroupInfo 类型

```typescript
interface GroupInfo {
  groupId: string
  childIds: string[]
  collapsed: boolean
  originalPositions: Record<string, { x: number; y: number }>
}
```

> [!NOTE]
> 分组节点会自动设置 `zIndex: -1`，确保位于子节点之下形成正确的视觉层次。
> 子节点通过 `parentId` 和 `extent: 'parent'` 约束在父容器内。

## 下一步

- [历史撤销/重做](./history)
- [数据流光效边](./data-flow-edge)
- [自动布局](./layout)
