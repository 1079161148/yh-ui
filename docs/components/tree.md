# Tree 树形控件

常用的树形展示组件，支持海量数据虚拟滚动、搜索过滤、拖拽排序等高级特性。

<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNode, TreeNodeData } from '@yh-ui/components'

/** ---- 1. 统一预览数据定义 ---- **/

// 基础用法
const basicProps = [
  { key: '1', label: 'Node 1', children: [{ key: '1-1', label: 'Node 1-1' }] },
  { key: '2', label: 'Node 2' }
]

// 包含禁用的数据 (用于复选框演示)
const checkboxData = ref([
  { 
    key: '1', 
    label: 'Level one 1', 
    children: [
      { key: '1-1', label: 'Level two 1-1', disabled: true }, 
      { 
        key: '1-2', 
        label: 'Level two 1-2', 
        children: [{ key: '1-2-1', label: 'Level three 1-2-1' }] 
      }
    ] 
  },
  { 
    key: '2', 
    label: 'Level one 2', 
    children: [
      { key: '2-1', label: 'Level two 2-1' }, 
      { key: '2-2', label: 'Level two 2-2' }
    ] 
  }
])

const customClassData = [
  { key: '1', label: '重点关注节点', class: 'is-important', children: [{ key: '1-1', label: '子节点' }] },
  { key: '2', label: '警告提示节点', class: 'is-warning' }
]

const mappingData = [
  { id: '1', name: 'Root A', subs: [{ id: '1-1', name: 'Child A-1' }] },
  { id: '2', name: 'Root B' }
]

const largeData = Array.from({ length: 1000 }).map((_, i) => ({
  id: `node-${i}`,
  label: `Virtual Node ${i}`,
  children: [{ id: `node-${i}-0`, label: `Child ${i}-0` }]
}))

/** ---- 2. 交互逻辑 ---- **/

const query = ref('')
const tree = ref()
const onFilter = () => tree.value?.filter(query.value)

const advQuery = ref('')
const advTree = ref()
const onAdvFilter = () => advTree.value?.filter(advQuery.value)
const getAdvChecked = () => alert('当前选中数: ' + (advTree.value?.getCheckedKeys().length || 0))

const loadNode = (node: TreeNode) => {
  return new Promise<TreeNodeData[]>((resolve) => {
    setTimeout(() => {
      resolve([{ key: `${node.key}-1`, label: `Lazy Child of ${node.label}` }])
    }, 800)
  })
}

const handleDrop = (draggingNode: TreeNode, dropNode: TreeNode, type: 'before' | 'after' | 'inner') => {
  const findAndRemove = (nodes: TreeNodeData[], key: string | number): TreeNodeData | undefined => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) return nodes.splice(i, 1)[0]
      if (nodes[i].children) {
        const res = findAndRemove(nodes[i].children!, key)
        if (res) return res
      }
    }
  }
  const findAndInsert = (nodes: TreeNodeData[], targetKey: string | number, node: TreeNodeData, pos: 'before' | 'after' | 'inner') => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === targetKey) {
        if (pos === 'inner') {
          nodes[i].children = nodes[i].children || []; nodes[i].children!.push(node)
        } else if (pos === 'before') {
          nodes.splice(i, 0, node)
        } else {
          nodes.splice(i + 1, 0, node)
        }
        return true
      }
      if (nodes[i].children && findAndInsert(nodes[i].children!, targetKey, node, pos)) return true
    }
    return false
  }

  const dragObj = findAndRemove(checkboxData.value, draggingNode.key)
  if (dragObj) findAndInsert(checkboxData.value, dropNode.key, dragObj, type)
}

const selectionTreeRef = ref()
const handleGetChecked = () => {
  const keys = selectionTreeRef.value?.getCheckedKeys()
  alert('Selected Keys: ' + (keys?.join(', ') || 'None'))
}

const customProps = { label: 'name', children: 'subs' }

/** ---- 3. 演示代码字符串定义 (直接硬编码数据，确保 100% 同步且清晰) ---- **/

const tsBasic = `<template>
  <yh-tree :data="data" />
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = [
  { key: '1', label: 'Node 1', children: [{ key: '1-1', label: 'Node 1-1' }] },
  { key: '2', label: 'Node 2' }
]
<\/script>`

const tsCheckbox = `<template>
  <yh-tree 
    :data="data" 
    show-checkbox 
    :default-checked-keys="['1-2-1']" 
    :default-expanded-keys="['1', '1-2']" 
  />
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsStrictly = `<template>
  <yh-tree :data="data" show-checkbox check-strictly />
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsAccordion = `<template>
  <yh-tree :data="data" accordion />
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsLine = `<template>
  <yh-tree :data="data" show-line default-expand-all />
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsCheckboxPos = `<template>
  <yh-tree :data="data" show-checkbox checkbox-position="right" />
</template>

<script setup lang="ts">
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsLazy = `<template>
  <yh-tree :data="data" lazy :load="load" />
</template>

<script setup lang="ts">
import type { TreeNode, TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = [{ key: "lazy", label: "Lazy Root" }]

const load = (node: TreeNode): Promise<TreeNodeData[]> => {
  return new Promise<TreeNodeData[]>((resolve) => {
    setTimeout(() => {
      resolve([{ key: \`\${node.key}-1\`, label: \`Lazy Child of \${node.label}\` }])
    }, 800)
  })
}
<\/script>`

const tsCustomClass = `<template>
  <yh-tree :data="data" />
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(customClassData, null, 2)}
<\/script>

<style scoped>
:deep(.is-important) .yh-tree__label { color: #f56c6c; font-weight: bold; }
:deep(.is-warning) .yh-tree__label { color: #e6a23c; }
<\/style>`

const tsCustomIcon = `<template>
  <yh-tree :data="data">
    <template #icon="{ node }">
       <yh-icon v-if="!node.isLeaf" :name="node.expanded ? 'folder-opened' : 'folder'" />
    </template>
  </yh-tree>
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsCustomContent = `<template>
  <yh-tree :data="data">
    <template #default="{ node }">
      <span style="display: flex; align-items: center; gap: 8px">
        <span>{{ node.label }}</span>
        <yh-tag v-if="node.level === 0" size="small">Root</yh-tag>
      </span>
    </template>
  </yh-tree>
</template>

<script setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsPrefixSuffix = `<template>
  <yh-tree :data="data">
    <template #prefix="{ node }">
       <yh-tag size="small" type="info" style="margin-right: 4px">{{ node.key }}</yh-tag>
    </template>
    <template #suffix>
       <yh-button size="small" text type="primary">编辑</yh-button>
    </template>
  </yh-tree>
</template>

<script setup lang="ts">
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
<\/script>`

const tsVirtual = `<template>
  <yh-tree :data="data" virtual :height="300" :item-height="30" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"

const data = ref<TreeNodeData[]>(Array.from({ length: 1000 }).map((_, i) => ({
  id: \`node-\${i}\`,
  label: \`Virtual Node \${i}\`,
  children: [
    { id: \`node-\${i}-0\`, label: \`Child \${i}-0\` }
  ]
})))
<\/script>`

const tsFilter = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <yh-input v-model="query" placeholder="过滤..." @input="onFilter" clearable />
    <yh-tree ref="tree" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"
import type YhTree from '@yh-ui/components/tree/src/tree.vue'

const query = ref<string>("")
const tree = ref<InstanceType<typeof YhTree>>()
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}

const onFilter = () => tree.value?.filter(query.value)
<\/script>`

const tsDraggable = `<template>
  <yh-tree :data="data" draggable @node-drop="handleDrop" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TreeNode, TreeNodeData } from "@yh-ui/components"

const data = ref<TreeNodeData[]>([
  { key: '1', label: 'Node 1', children: [{ key: '1-1', label: 'Node 1-1' }] },
  { key: '2', label: 'Node 2' }
])

const handleDrop = (draggingNode: TreeNode, dropNode: TreeNode, type: 'before' | 'after' | 'inner') => {
  const findAndRemove = (nodesArr: TreeNodeData[], keyToFind: string | number): TreeNodeData | undefined => {
    for (let i = 0; i < nodesArr.length; i++) {
      if (nodesArr[i].key === keyToFind) return nodesArr.splice(i, 1)[0]
      if (nodesArr[i].children) {
        const res = findAndRemove(nodesArr[i].children!, keyToFind)
        if (res) return res
      }
    }
  }
  const findAndInsert = (nodesArr: TreeNodeData[], targetKey: string | number, nodeToInsert: TreeNodeData, pos: 'before' | 'after' | 'inner') => {
    for (let i = 0; i < nodesArr.length; i++) {
      if (nodesArr[i].key === targetKey) {
        if (pos === 'inner') {
          nodesArr[i].children = nodesArr[i].children || []; nodesArr[i].children!.push(nodeToInsert)
        } else if (pos === 'before') {
          nodesArr.splice(i, 0, nodeToInsert)
        } else {
          nodesArr.splice(i + 1, 0, nodeToInsert)
        }
        return true
      }
      if (nodesArr[i].children && findAndInsert(nodesArr[i].children!, targetKey, nodeToInsert, pos)) return true
    }
    return false
  }

  const dragObj = findAndRemove(data.value, draggingNode.key)
  if (dragObj) findAndInsert(data.value, dropNode.key, dragObj, type)
}
<\/script>`

const tsSelection = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div><yh-button @click="handleGetChecked">获取选中 (Alert)</yh-button></div>
    <yh-tree ref="tree" :data="data" show-checkbox />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"
import type YhTree from '@yh-ui/components/tree/src/tree.vue'

const tree = ref<InstanceType<typeof YhTree>>()
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}

const handleGetChecked = () => {
  alert(tree.value?.getCheckedKeys())
}
<\/script>`

const tsCustomProps = `<template>
  <yh-tree :data="data" :props="customProps" node-key="id" />
</template>

<script setup lang="ts">
interface CustomNode {
  id: string
  name: string
  subs?: CustomNode[]
}

const data: CustomNode[] = ${JSON.stringify(mappingData, null, 2)}
const customProps = { label: "name", children: "subs" }
<\/script>`

const tsAdvancedVirtual = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <yh-input v-model="query" placeholder="搜索..." @input="onFilter" clearable style="flex: 1" />
      <yh-button type="primary" @click="getChecked">获取勾选数</yh-button>
    </div>
    <yh-tree ref="treeRef" :data="data" virtual show-checkbox :height="400" :item-height="32" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNodeData } from "@yh-ui/components"

const query = ref('')
const treeRef = ref()
const onFilter = () => treeRef.value?.filter(query.value)
const getChecked = () => alert('选中数: ' + (treeRef.value?.getCheckedKeys().length || 0))

const data: TreeNodeData[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: \`node-\${i}\`,
  label: \`Virtual Node \${i}\`,
  children: [{ id: \`node-\${i}-0\`, label: \`Child \${i}-0\` }]
}))
<\/script>`

const tsNuxt = `<template>
  <yh-tree :data="data" show-checkbox />
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"

const data = ref<TreeNodeData[]>([
  { key: '1', label: 'Nuxt SSR Node 1', children: [{ key: '1-1', label: 'Child 1-1' }] },
  { key: '2', label: 'Nuxt SSR Node 2' }
])
<\/script>`

const toJs = (ts: string) => ts
  .replace(' lang="ts"', '')
  .replace(/interface [A-Z]\w+ \{[\s\S]*?\}/g, '')
  .replace(/<TreeNodeData\[\]>/g, '')
  .replace(/<TreeNodeData>/g, '')
  .replace(/: TreeNodeData\[\]/g, '')
  .replace(/: TreeNodeData \| undefined/g, '')
  .replace(/: TreeNodeData/g, '')
  .replace(/: TreeNode/g, '')
  .replace(/: CustomNode\[\]/g, '')
  .replace(/: any\[\]/g, '')
  .replace(/: Promise<TreeNodeData\[\]>/g, '')
  .replace(/import type \{ TreeNode, TreeNodeData \} from "@yh-ui\/components"/g, '')
  .replace(/import type \{ TreeNode \} from "@yh-ui\/components"/g, '')
  .replace(/import type \{ TreeNodeData \} from "@yh-ui\/components"/g, '')
  .replace(/import type YhTree from '@yh-ui\/components\/tree\/src\/tree\.vue'/g, '')
  .replace(/ref<.*?>/g, 'ref')
  .replace(/: string \| number/g, '')
  .replace(/: 'before' \| 'after' \| 'inner'/g, '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')
  .replace(/: boolean/g, '')
  .replace(/: any/g, '')
  .replace(/\.children\!/g, '.children')

const jsBasic = toJs(tsBasic); const jsCheckbox = toJs(tsCheckbox); const jsLine = toJs(tsLine)
const jsLazy = toJs(tsLazy); const jsCustomClass = toJs(tsCustomClass); const jsCustomIcon = toJs(tsCustomIcon)
const jsCustomContent = toJs(tsCustomContent); const jsPrefixSuffix = toJs(tsPrefixSuffix)
const jsFilter = toJs(tsFilter); const jsVirtual = toJs(tsVirtual); const jsDraggable = toJs(tsDraggable)
const jsSelection = toJs(tsSelection); const jsCustomProps = toJs(tsCustomProps)
const jsAdvancedVirtual = toJs(tsAdvancedVirtual); const jsStrictly = toJs(tsStrictly); const jsAccordion = toJs(tsAccordion)
const jsCheckboxPos = toJs(tsCheckboxPos); const jsNuxt = toJs(tsNuxt)
</script>

## 基础用法
<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-tree :data="basicProps" />
</DemoBlock>

## 可选择与禁用
通过 `show-checkbox` 开启复选框。在数据项中设置 `disabled: true` 可禁用该节点（不可点击、不可选中）。
<DemoBlock title="复选框与禁用节点" :ts-code="tsCheckbox" :js-code="jsCheckbox">
  <yh-tree :data="checkboxData" show-checkbox :default-checked-keys="['1-2-1']" :default-expanded-keys="['1', '1-2']" />
</DemoBlock>

## 父子不相关联
设置 `check-strictly=true`，父子节点的选中状态将互不影响。
<DemoBlock title="独立选择" :ts-code="tsStrictly" :js-code="jsStrictly">
  <yh-tree :data="checkboxData" show-checkbox check-strictly />
</DemoBlock>

## 手风琴模式
设置 `accordion=true`，每次展开一个节点时将自动收起其它同级节点。
<DemoBlock title="手风琴模式" :ts-code="tsAccordion" :js-code="jsAccordion">
  <yh-tree :data="checkboxData" accordion />
</DemoBlock>

## 展示连接线
使用 `show-line` 属性清晰展示树层级关系。
<DemoBlock title="连接线模式" :ts-code="tsLine" :js-code="jsLine">
  <yh-tree :data="checkboxData" show-line default-expand-all />
</DemoBlock>

## 复选框位置
通过 `checkbox-position` 将复选框置于右侧。
<DemoBlock title="复选框居右" :ts-code="tsCheckboxPos" :js-code="jsCheckboxPos">
  <yh-tree :data="checkboxData" show-checkbox checkbox-position="right" />
</DemoBlock>

## 异步懒加载
<DemoBlock title="懒加载演示" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-tree :data="[{ key: 'lazy', label: 'Lazy Root' }]" lazy :load="loadNode" />
</DemoBlock>

## 自定义节点类名
<DemoBlock title="自定义类名" :ts-code="tsCustomClass" :js-code="jsCustomClass">
  <yh-tree :data="customClassData" />
</DemoBlock>

## 自定义展开图标
<DemoBlock title="自定义图标" :ts-code="tsCustomIcon" :js-code="jsCustomIcon">
  <yh-tree :data="checkboxData">
    <template #icon="{ node }">
       <yh-icon v-if="!node.isLeaf" :name="node.expanded ? 'folder-opened' : 'folder'" />
    </template>
  </yh-tree>
</DemoBlock>

## 自定义节点内容
<DemoBlock title="自定义内容" :ts-code="tsCustomContent" :js-code="jsCustomContent">
  <yh-tree :data="checkboxData">
    <template #default="{ node }">
      <span style="display: flex; align-items: center; gap: 8px">
        <span>{{ node.label }}</span>
        <yh-tag v-if="node.level === 0" size="small">Root</yh-tag>
      </span>
    </template>
  </yh-tree>
</DemoBlock>

## 自定义前缀与后缀
<DemoBlock title="前缀与后缀" :ts-code="tsPrefixSuffix" :js-code="jsPrefixSuffix">
  <yh-tree :data="checkboxData">
    <template #prefix="{ node }">
       <yh-tag size="small" type="info" style="margin-right: 4px">{{ node.key }}</yh-tag>
    </template>
    <template #suffix>
       <yh-button size="small" text type="primary">编辑</yh-button>
    </template>
  </yh-tree>
</DemoBlock>

## 万级数据虚拟滚动
<DemoBlock title="虚拟滚动" :ts-code="tsVirtual" :js-code="jsVirtual">
  <yh-tree :data="largeData" virtual :height="300" :item-height="30" />
</DemoBlock>

## 节点过滤
<DemoBlock title="树节点过滤" :ts-code="tsFilter" :js-code="jsFilter">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <yh-input v-model="query" placeholder="过滤..." @input="onFilter" clearable />
    <yh-tree ref="tree" :data="checkboxData" />
  </div>
</DemoBlock>

## 可拖拽节点
<DemoBlock title="拖拽演示" :ts-code="tsDraggable" :js-code="jsDraggable">
  <yh-tree :data="checkboxData" draggable @node-drop="handleDrop" />
</DemoBlock>

## 多选与节点获取
<DemoBlock title="多选获取" :ts-code="tsSelection" :js-code="jsSelection">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div><yh-button @click="handleGetChecked">获取选中 (Alert)</yh-button></div>
    <yh-tree ref="selectionTreeRef" :data="checkboxData" show-checkbox />
  </div>
</DemoBlock>

## 自定义字段映射
<DemoBlock title="字段映射" :ts-code="tsCustomProps" :js-code="jsCustomProps">
  <yh-tree :data="mappingData" :props="customProps" node-key="id" />
</DemoBlock>

## 综合进阶：大数据量下的过滤与选择
<DemoBlock title="综合示例" :ts-code="tsAdvancedVirtual" :js-code="jsAdvancedVirtual">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <yh-input v-model="advQuery" placeholder="搜索..." @input="onAdvFilter" clearable style="flex: 1" />
      <yh-button type="primary" @click="getAdvChecked">获取勾选数</yh-button>
    </div>
    <yh-tree ref="advTree" :data="largeData" virtual show-checkbox :height="400" :item-height="32" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Tree 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tree :data="[{ key: '1', label: 'Nuxt SSR Node 1', children: [{ key: '1-1', label: 'Child 1-1' }] }, { key: '2', label: 'Nuxt SSR Node 2' }]" show-checkbox />
</DemoBlock>

**SSR 注意事项**：

- ✅ 数据结构完美序列化
- ✅ 节点展开状态在 SSR 环境下正确生成
- ✅ 虚拟滚动功能在客户端自动激活
- ✅ 事件绑定与响应式状态无缝对接

::: tip SSR 安全性
Tree 组件内部处理了虚拟滚动和 DOM 操作，确保在服务端不触发浏览器 API，在客户端注入后平滑过渡。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据源 | `TreeNodeData[]` | `[]` |
| props | 配置选项，具体见下表 | `object` | `{ label: 'label', children: 'children', disabled: 'disabled' }` |
| node-key | 每个树节点用来作为唯一标识的属性字段名 | `string` | `'id'` |
| show-checkbox | 节点是否可被选择 | `boolean` | `false` |
| checkbox-position | 复选框相对于文字的位置 | `'left' \| 'right'` | `'left'` |
| default-expand-all | 是否默认展开所有节点 | `boolean` | `false` |
| default-expanded-keys | 默认展开的节点 key 数组 | `(string \| number)[]` | `[]` |
| default-checked-keys | 默认选中的节点 key 数组 | `(string \| number)[]` | `[]` |
| current-node-key | 当前选中节点的 key，支持 v-model | `string \| number` | `-` |
| highlight-current | 是否高亮当前选中节点 | `boolean` | `true` |
| accordion | 是否每次只打开一个同级树节点展开 | `boolean` | `false` |
| indent | 相邻级节点间的水平缩进，单位为像素 | `number` | `18` |
| check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联 | `boolean` | `false` |
| expand-on-click-node | 是否在点击节点时展开或者收起节点 | `boolean` | `true` |
| check-on-click-node | 是否在点击节点的时候选中复选框 | `boolean` | `false` |
| empty-text | 内容为空的时候展示的文本 | `string` | `'暂无数据'` |
| filter-method | 对树节点进行筛选时执行的方法 | `(query, node) => boolean` | `-` |
| lazy | 是否懒加载子节点，需与 `load` 方法结合使用 | `boolean` | `false` |
| load | 加载子树数据的方法，仅在 `lazy` 属性为 `true` 时有效 | `(node) => Promise` | `-` |
| virtual | 是否开启虚拟滚动 | `boolean` | `false` |
| height | 虚拟滚动窗口高度 (px) | `number` | `400` |
| item-height | 每个节点的高度 (px) | `number` | `30` |
| show-line | 是否显示连接线 | `boolean` | `false` |
| draggable | 是否开启拖拽功能 | `boolean` | `false` |

### Props Data Mapping

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 指定节点标签为节点对象的某个属性值 | `string` | `'label'` |
| children | 指定子树为节点对象的某个属性值 | `string` | `'children'` |
| disabled | 指定节点选择框是否禁用的属性名 | `string` | `'disabled'` |

### TreeNodeData 字段定义

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 (必须) | `string \| number` |
| label | 显示文本 (必须) | `string` |
| children | 子节点数组 | `TreeNodeData[]` |
| disabled | 是否禁用该节点的选择/点击 | `boolean` |
| isLeaf | 是否为叶子节点 (懒加载场景下使用) | `boolean` |
| icon | 自定义节点图标类名 | `string` |
| class | 自定义节点样式类名 | `string` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| node-click | 节点被点击时的回调 | `(node: TreeNode, e: MouseEvent)` |
| node-expand | 节点被展开或收起时的回调 | `(node: TreeNode, expanded: boolean)` |
| check | 复选框状态改变时的回调 | `(node: TreeNode, checked: boolean, checkedKeys: (string \| number)[])` |
| current-change | 当前选中节点发生变化时的回调 | `(node: TreeNode \| null)` |
| node-drag-start | 节点开始拖拽时的回调 | `(node: TreeNode, e: DragEvent)` |
| node-drag-end | 节点拖拽结束时的回调 | `(node: TreeNode, dropNode: TreeNode \| null, pos: 'before' \| 'after' \| 'inner', e: DragEvent)` |
| node-drag-over | 节点拖拽过程中的回调 | `(node: TreeNode, e: DragEvent)` |
| node-drag-enter | 拖拽进入节点时的回调 | `(node: TreeNode, e: DragEvent)` |
| node-drag-leave | 拖拽离开节点时的回调 | `(node: TreeNode, e: DragEvent)` |
| node-drop | 节点完成拖拽投放时的回调 | `(node: TreeNode, dropNode: TreeNode, type: 'before' \| 'after' \| 'inner', e: DragEvent)` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义节点内容 | `{ node, data }` |
| icon | 自定义展开图标 | `{ node, data }` |
| prefix | 自定义内容前缀 | `{ node, data }` |
| suffix | 自定义内容后缀 | `{ node, data }` |
| empty | 无数据时的内容 | `-` |

> **注**：`node` 对象包含：`key`, `label`, `level`, `expanded`, `checked`, `indeterminate`, `loading`, `isLeaf` 等属性。`data` 为原始数据项。

### Expose

| 方法名/属性 | 说明 | 参数/类型 |
| --- | --- | --- |
| filter | 对树节点进行筛选操作 | `(query: string)` |
| getNode | 根据 key 获取节点数据 | `(key: string \| number)` |
| getCheckedNodes | 返回目前被选中的节点所组成的数组 | `-` |
| getCheckedKeys | 返回目前被选中的节点的 key 所组成的数组 | `-` |
| getHalfCheckedNodes | 返回目前半选中的节点所组成的数组 | `-` |
| getHalfCheckedKeys | 返回目前半选中的节点的 key 所组成的数组 | `-` |
| getCurrentKey | 获取当前选中节点的 key | `-` |
| getCurrentNode | 获取当前选中节点的数据 | `-` |
| setChecked | 通过 key 设置某个节点的勾选状态 | `(key: string \| number, checked: boolean, deep?: boolean)` |
| setCheckedKeys | 通过 keys 设置节点选中状态 | `(keys: (string \| number)[])` |
| setCheckedNodes | 通过节点数据设置选中状态 | `(nodes: TreeNodeData[])` |
| setCurrentKey | 通过 key 设置当前选中节点 | `(key: string \| number \| undefined)` |
| setExpandedKeys | 设置当前展开的节点 | `(keys: (string \| number)[])` |
| setData | 显式设置树插件数据 | `(data: TreeNodeData[])` |
| expandNode | 展开指定节点 | `(key: string \| number)` |
| collapseNode | 折叠指定节点 | `(key: string \| number)` |
| scrollTo | 滚动到给定位置 (仅虚拟滚动开启时有效) | `(options: number \| ScrollToOptions)` |
| scrollToNode | 使用给定的滚动策略滚动至指定位置 | `(key: string \| number)` |
| expandedKeys | 当前展开的节点 key 集合 | `Ref<Set<string \| number>>` |
| checkedKeys | 当前选中的节点 key 集合 | `Ref<Set<string \| number>>` |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-tree-node-height` | 节点高度 | `28px` |
| `--yh-tree-text-color` | 节点文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-tree-hover-bg` | 节点悬停背景色 | `var(--yh-color-primary-light-9)` |
| `--yh-tree-current-bg` | 当前选中节点背景色 | `var(--yh-color-primary-light-8)` |

<style>
.is-important .yh-tree__label { color: var(--yh-color-danger); font-weight: bold; }
.is-warning .yh-tree__label { color: var(--yh-color-warning); }
</style>
