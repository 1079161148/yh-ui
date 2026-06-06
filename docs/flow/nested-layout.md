# 节点嵌套布局 (Nested Node Layout)

`yh-flow` 支持节点嵌套，允许您创建包含子节点的父节点容器，实现复杂的流程结构。

## 核心概念

### 嵌套节点数据结构

节点可以通过 `parentId` 属性指定父节点，形成嵌套关系：

```typescript
import type { Node } from '@yh-ui/flow'

// 父节点
const parentNode: Node = {
  id: 'group-1',
  type: 'group',
  position: { x: 100, y: 100 },
  width: 400,
  height: 300,
  data: { label: '流程组 1' }
}

// 子节点（通过 parentId 关联）
const childNode: Node = {
  id: 'child-1',
  type: 'default',
  position: { x: 150, y: 150 },
  parentId: 'group-1', // 指定父节点 ID
  data: { label: '子节点 1' }
}
```

### children 数组

也可以使用 `children` 属性直接在父节点中包含子节点 ID 数组：

```typescript
const parentNodeWithChildren: Node = {
  id: 'group-1',
  type: 'group',
  position: { x: 100, y: 100 },
  width: 400,
  height: 300,
  children: ['child-1', 'child-2', 'child-3'], // 子节点 ID 数组
  data: { label: '流程组' }
}
```

## 使用示例

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  {
    id: 'group-1',
    type: 'group',
    position: { x: 50, y: 50 },
    width: 600,
    height: 240,
    data: { label: '主流程' }
  },
  {
    id: 'node-1',
    type: 'input',
    position: { x: 50, y: 100 },
    parentId: 'group-1',
    data: { label: '开始' }
  },
  {
    id: 'node-2',
    type: 'default',
    position: { x: 230, y: 100 },
    parentId: 'group-1',
    data: { label: '审批处理' }
  },
  {
    id: 'node-3',
    type: 'output',
    position: { x: 420, y: 100 },
    parentId: 'group-1',
    data: { label: '归档结束' }
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
          <!-- 子节点将自动渲染在这里 -->
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
    width: 600,
    height: 240,
    data: { label: '主流程' }
  },
  {
    id: 'node-1',
    type: 'input',
    position: { x: 50, y: 100 },
    parentId: 'group-1',
    data: { label: '开始' }
  },
  {
    id: 'node-2',
    type: 'default',
    position: { x: 230, y: 100 },
    parentId: 'group-1',
    data: { label: '审批处理' }
  },
  {
    id: 'node-3',
    type: 'output',
    position: { x: 420, y: 100 },
    parentId: 'group-1',
    data: { label: '归档结束' }
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

<DemoBlock title="嵌套节点演示" :ts-code="tsCode" :js-code="jsCode">
  <div style="border:1px solid #e2e8f0;border-radius:8px;height:420px;padding:8px;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      background="dots"
      style="width:100%;height:100%;"
    >
      <template #node="{ node }">
        <div v-if="node.type === 'group'" style="width:100%;height:100%;border:2px dashed #94a3b8;border-radius:8px;background:rgba(248,250,252,0.6);">
          <div style="padding:10px 16px;font-weight:600;color:#334155;border-bottom:1px dashed #cbd5e1;background:rgba(226,232,240,0.3);border-radius:8px 8px 0 0;">
            {{ node.data.label }}
          </div>
          <div style="position:absolute;bottom:8px;right:12px;font-size:11px;color:#94a3b8;font-style:italic;">Sub-flow Container</div>
        </div>
        <div v-else style="padding:8px 16px;background:#fff;border:1px solid #e2e8f0;border-radius:4px;">
          {{ node.data.label }}
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## API 参考

### 辅助函数

| 函数                              | 说明                   | 参数                           |
| --------------------------------- | ---------------------- | ------------------------------ |
| `isNestedNode(node)`              | 检查节点是否为嵌套节点 | `node: Node`                   |
| `getNodeChildren(node, allNodes)` | 获取节点的所有子节点   | `node: Node, allNodes: Node[]` |
| `getNodeParent(node, allNodes)`   | 获取节点的父节点       | `node: Node, allNodes: Node[]` |

### Node 类型扩展

```typescript
interface Node {
  // ... 其他属性
  parentId?: string // 父节点 ID
  children?: string[] // 子节点 ID 数组
  extent?: 'parent' | 'container' // 嵌套范围模式
  computed?: boolean // 是否为计算生成的节点
}
```

## 最佳实践

1. **使用 GroupNode 组件**：推荐使用内置的 `GroupNode` 组件来创建父节点容器
2. **设置 extent 属性**：使用 `extent: 'parent'` 让子节点跟随父节点移动
3. **处理层级关系**：拖拽父节点时，子节点应自动跟随移动
4. **视觉区分**：通过 CSS 样式明确区分父节点容器和子节点

> [!TIP]
>
> 嵌套节点非常适合创建复杂的业务流程，如包含多个子流程的主流程场景。
