# TreeSelect 树形选择

支持极致的虚拟滚动检索。

<script setup lang="ts">
import { ref } from 'vue'

// --- 辅助工具：将 TS 代码转为 JS 代码 ---
const toJs = (ts: string) => ts.replace(' lang="ts"', '').replace(' setup lang="ts"', ' setup')

// ==============================
// 共享演示数据 (仅用于文档内部渲染变量)
// ==============================
const orgData = [
  {
    id: '1',
    name: '总公司',
    items: [
      {
        id: '1-1',
        name: '研发中心',
        items: [
          { id: '1-1-1', name: '前端组' },
          { id: '1-1-2', name: '后端组' },
          { id: '1-1-3', name: '测试组', disabled: true }
        ]
      },
      {
        id: '1-2',
        name: '产品部',
        items: [{ id: '1-2-1', name: 'UI 设计' }, { id: '1-2-2', name: '产品经理' }]
      }
    ]
  },
  {
    id: '2',
    name: '分公司',
    items: [{ id: '2-1', name: '市场部' }, { id: '2-2', name: '财务部' }]
  }
]

const fileData = [
  {
    label: 'src',
    key: 'src',
    children: [
      { label: 'components', key: 'src/components', children: [{ label: 'TreeSelect.vue', key: 'src/components/TreeSelect.vue' }] },
      { label: 'utils', key: 'src/utils', children: [{ label: 'index.ts', key: 'src/utils/index.ts' }] }
    ]
  },
  {
    label: 'public',
    key: 'public',
    children: [{ label: 'favicon.ico', key: 'public/favicon.ico' }]
  },
  { label: 'package.json', key: 'package.json' }
]

// 演示变量
const v1 = ref('')
const v2 = ref('')
const v3 = ref('1-1-1')
const v4 = ref([])
const v5 = ref([])
const v6 = ref('1-1')
const v7 = ref('')
const v8 = ref('')
const v9 = ref([])
const v10 = ref([]) 
const v11 = ref('')
const v12 = ref('')
const v13 = ref([])

// 懒加载初始数据
const lazyData = ref([
  { name: '深圳总部', id: 'sz', items: [] }
])

// 懒加载函数
const loadNode = (node: TreeNode, resolve: (data: TreeOption[]) => void) => {
  // 模拟网络延迟
  setTimeout(() => {
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      name: `异步节点 ${node.id}-${i + 1}`,
      id: `${node.id}-${i + 1}`,
      isLeaf: Math.random() > 0.7 ? false : true // 随机生成一些子节点
    }))
    resolve(nodes)
  }, 1000)
}

// 大数据生成函数
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: `子节点 ${i}-${j}`, id: `child-${i}-${j}` })
    }
    data.push({ name: `根节点 ${i}`, id: `root-${i}`, items: children })
  }
  return data
}
const virtualData = generateData(100)

// Nuxt 使用示例
const nuxtTree = ref('')
const nuxtData = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]

const tsNuxt = `<template>
  <div style="max-width: 320px;">
    <!-- 组件自动导入 -->
    <yh-tree-select
      v-model="value"
      :data="data"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhTreeSelect
const value = ref('')
const data = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// ==============================
// 示例代码字符串 (100% 完整，无省略)
// ==============================

const commonDataCode = `const data = [
  {
    id: '1',
    name: '总公司',
    items: [
      {
        id: '1-1',
        name: '研发中心',
        items: [
          { id: '1-1-1', name: '前端组' },
          { id: '1-1-2', name: '后端组' },
          { id: '1-1-3', name: '测试组', disabled: true }
        ]
      },
      {
        id: '1-2',
        name: '产品部',
        items: [{ id: '1-2-1', name: 'UI 设计' }, { id: '1-2-2', name: '产品经理' }]
      }
    ]
  },
  {
    id: '2',
    name: '分公司',
    items: [{ id: '2-1', name: '市场部' }, { id: '2-2', name: '财务部' }]
  }
]`

const tsBasic = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    placeholder="请选择部门"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
${commonDataCode}
<\/script>`

const tsDisabled = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-tree-select
      v-model="value1"
      :data="data"
      disabled
      placeholder="整机禁用"
      style="width: 240px"
    />
    <yh-tree-select
      v-model="value2"
      :data="data"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="节点禁用 (测试组被禁用)"
      style="width: 240px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
${commonDataCode}
<\/script>`

const tsClearable = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    clearable
    placeholder="支持清空"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1-1-1')
${commonDataCode}
<\/script>`

const tsMultiple = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    collapse-tags
    placeholder="多选部门"
    style="width: 300px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${commonDataCode}
<\/script>`

const tsStrictly = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    check-strictly
    placeholder="选择任意级部门"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1-1')
${commonDataCode}
<\/script>`

const tsCheckbox = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    show-checkbox
    placeholder="带复选框的多选"
    style="width: 310px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${commonDataCode}
<\/script>`

const tsSearch = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    filterable
    placeholder="输入搜索：如“研发”"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
${commonDataCode}
<\/script>`

const tsLazy = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    lazy
    :load="loadNode"
    placeholder="懒加载子节点"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const data = ref([{ name: '深圳总部', id: 'sz', items: [] }])

const loadNode = (node, resolve) => {
  setTimeout(() => {
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      name: \`异步节点 \${node.id}-\${i + 1}\`,
      id: \`\${node.id}-\${i + 1}\`,
      isLeaf: Math.random() > 0.7 ? false : true
    }))
    resolve(nodes)
  }, 1000)
}
<\/script>`

const tsSlot = `<template>
  <yh-tree-select v-model="value" :data="data" node-key="key" placeholder="文件浏览风格" style="width: 240px">
    <template #default="{ node, data }">
      <span style="display: flex; align-items: center;">
        <span :style="{ color: node.isLeaf ? '#666' : '#E6A23C', marginRight: '4px' }">
          {{ node.isLeaf ? '📄' : '📁' }}
        </span>
        <span>{{ data.label }}</span>
      </span>
    </template>
  </yh-tree-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const data = [
  {
    label: 'src',
    key: 'src',
    children: [
      { label: 'components', key: 'src/components', children: [{ label: 'TreeSelect.vue', key: 'src/components/TreeSelect.vue' }] },
      { label: 'utils', key: 'src/utils', children: [{ label: 'index.ts', key: 'src/utils/index.ts' }] }
    ]
  },
  {
    label: 'public',
    key: 'public',
    children: [{ label: 'favicon.ico', key: 'public/favicon.ico' }]
  },
  { label: 'package.json', key: 'package.json' }
]
<\/script>`.replace(/\\/g, '')

const tsVirtual = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    filterable
    collapse-tags
    virtual
    placeholder="1万条数据极速检索"
    style="width: 320px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])

// 大数据生成函数
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: \`子节点 \${i}-\${j}\`, id: \`child-\${i}-\${j}\` })
    }
    data.push({ name: \`根节点 \${i}\`, id: \`root-\${i}\`, items: children })
  }
  return data
}
const data = generateData(100)
<\/script>`.replace(/\\/g, '')

const tsVirtualCheckbox = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    show-checkbox
    virtual
    collapse-tags
    placeholder="海量数据勾选"
    style="width: 320px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])

// 大数据生成函数
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: \`测试节点 \${i}-\${j}\`, id: \`test-\${i}-\${j}\` })
    }
    data.push({ name: \`海量组 \${i}\`, id: \`group-\${i}\`, items: children })
  }
  return data
}
const data = generateData(100)
<\/script>`.replace(/\\/g, '')

</script>

当数据量巨大或呈现清晰的树形层级结构时，使用 `TreeSelect` 可以在紧凑的空间内提供高效的选择方案。

## 基础用法

基础单选模式。默认仅允许选中叶子节点，点击父节点会自动展开或收起。

<DemoBlock title="基础单选" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v1"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="请选择部门"
    />
    <p class="demo-res">Value: <code>{{ v1 }}</code></p>
  </div>
</DemoBlock>

## 禁用状态

可以禁用整个组件，或在数据中通过 `disabled` 字段禁用特定节点（如测试组）。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="toJs(tsDisabled)">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-tree-select v-model="v2" :data="orgData" disabled placeholder="整机禁用" />
    <yh-tree-select
      v-model="v12"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="节点禁用 (测试组被禁用)"
    />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 属性后，鼠标悬停时会显示清空按钮。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="toJs(tsClearable)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v3"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      clearable
      placeholder="支持清空"
    />
    <p class="demo-res">Value: <code>{{ v3 }}</code></p>
  </div>
</DemoBlock>

## 多选与折叠

设置 `multiple` 开启多选模式。多选模式下建议配合 `collapse-tags` 使用以节省空间。

<DemoBlock title="多选模式" :ts-code="tsMultiple" :js-code="toJs(tsMultiple)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v4"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      collapse-tags
      placeholder="多选部门"
    />
    <p class="demo-res">Value: <code>{{ v4 }}</code></p>
  </div>
</DemoBlock>

## 选择任意级别

启用 `check-strictly` 属性后，用户可以选中分级中的任何一级节点。

<DemoBlock title="任意级选择" :ts-code="tsStrictly" :js-code="toJs(tsStrictly)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v6"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      check-strictly
      placeholder="允许选中父级"
    />
    <p class="demo-res">Value: <code>{{ v6 }}</code></p>
  </div>
</DemoBlock>

## 复选框

使用 `show-checkbox` 属性来启用复选框，这在多选场景下能提供更清晰的视觉勾选状态。

<DemoBlock title="复选框模式" :ts-code="tsCheckbox" :js-code="toJs(tsCheckbox)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v10"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      show-checkbox
      placeholder="带复选框的多选"
    />
    <p class="demo-res">Value: <code>{{ v10 }}</code></p>
  </div>
</DemoBlock>

## 可筛选

设置 `filterable` 后，用户可以直接在输入框中输入关键字进行节点过滤。

<DemoBlock title="搜索过滤" :ts-code="tsSearch" :js-code="toJs(tsSearch)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v7"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      filterable
      placeholder="输入搜索：如“研发”"
    />
  </div>
</DemoBlock>

## 懒加载

设置 `lazy` 和 `load` 函数来实现异步加载子节点数据。这对于大型组织架构非常实用。

<DemoBlock title="懒加载" :ts-code="tsLazy" :js-code="toJs(tsLazy)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v8"
      :data="lazyData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      lazy
      :load="loadNode"
      placeholder="点击展开异步加载"
    />
  </div>
</DemoBlock>

## 自定义内容

使用 `#default` 插槽可以完全自定义树节点在菜单中的渲染方式。

<DemoBlock title="自定义插槽" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="max-width: 320px;">
    <yh-tree-select v-model="v11" :data="fileData" node-key="key" placeholder="文件浏览风格">
      <template #default="{ node, data }">
        <span style="display: flex; align-items: center;">
          <span :style="{ color: node.isLeaf ? '#666' : '#E6A23C', marginRight: '4px' }">
            {{ node.isLeaf ? '📄' : '📁' }}
          </span>
          <span>{{ data.label }}</span>
        </span>
      </template>
    </yh-tree-select>
  </div>
</DemoBlock>

## 虚拟滚动 (10,000+ 节点)

本组件内置自研虚拟滚动方案。为了性能最优化，虚拟滚动**默认不开启**。当数据量较大（建议 500 条以上）时，请设置 `virtual` 属性为 `true`。

### 基础搜索演示

<DemoBlock title="海量数据搜索" :ts-code="tsVirtual" :js-code="toJs(tsVirtual)">
  <div style="max-width: 360px;">
    <yh-tree-select
      v-model="v9"
      :data="virtualData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      filterable
      virtual
      collapse-tags
      placeholder="一万条数据搜索"
    />
    <p class="demo-res">Value Count: <code>{{ v9.length }}</code></p>
  </div>
</DemoBlock>

### 复选框模式

即便在海量数据下，复选框的级联勾选同样流畅。

<DemoBlock title="海量数据勾选" :ts-code="tsVirtualCheckbox" :js-code="toJs(tsVirtualCheckbox)">
  <div style="max-width: 360px;">
    <yh-tree-select
      v-model="v13"
      :data="virtualData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      show-checkbox
      virtual
      collapse-tags
      placeholder="海量数据勾选"
    />
    <p class="demo-res">Checked Count: <code>{{ v13.length }}</code></p>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

TreeSelect 组件完全兼容 Nuxt 3/4。在 Nuxt 环境下，得益于组件自动导入（Auto Import）功能，你可以直接在模板中使用而无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="nuxtTree"
      :data="nuxtData"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 树形结构的首屏渲染（包含展开/收起状态）完全支持
- ✅ 选中的 Token 标签在服务端正确展示
- ✅ 虚拟滚动（virtual）支持 SSR 首屏基础节点渲染
- ✅ 懒加载（lazy）初始数据支持 SSR
- 💡 搜索过滤和异步加载通过客户端激活（Hydration）后生效

::: tip SSR 安全性
TreeSelect 使用了 Vue 3.5 的原生 `useId` 机制，确保了在复杂的递归树结构中，服务端和客户端生成的节点 ID、ARIA 属性保持绝对一致，消除了深层嵌套结构中常见的水合一致性报错。
:::

## API

### TreeSelect Attributes

| 属性名                | 说明                                                 | 类型                                                           | 默认值       |
| --------------------- | ---------------------------------------------------- | -------------------------------------------------------------- | ------------ |
| model-value / v-model | 绑定值                                               | `string \| number \| (string \| number)[]`                     | —            |
| data                  | 展示数据                                             | `TreeOption[]`                                                 | `[]`         |
| props                 | 配置选项，详见下表                                   | `object`                                                       | —            |
| node-key              | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | `string`                                                       | `'value'`    |
| multiple              | 是否多选                                             | `boolean`                                                      | `false`      |
| clearable             | 是否可以清空选项                                     | `boolean`                                                      | `false`      |
| disabled              | 是否禁用                                             | `boolean`                                                      | `false`      |
| size                  | 输入框尺寸                                           | `'large' \| 'default' \| 'small'`                              | `'default'`  |
| placeholder           | 输入框占位文本                                       | `string`                                                       | `'请选择'`   |
| empty-text            | 无数据时显示的文本                                   | `string`                                                       | `'暂无数据'` |
| filterable            | 是否可搜索                                           | `boolean`                                                      | `false`      |
| filter-node-method    | 自定义过滤方法                                       | `(value: string, data: TreeOption, node: TreeNode) => boolean` | —            |
| collapse-tags         | 多选时是否折叠标签                                   | `boolean`                                                      | `false`      |
| collapse-tags-tooltip | 是否在折叠标签时显示 tooltip (仅展示数量)            | `boolean`                                                      | `false`      |
| max-collapse-tags     | 标签折叠前的最大展示数量                             | `number`                                                       | `1`          |
| check-strictly        | 是否遵循父子不互相关的原则                           | `boolean`                                                      | `false`      |
| show-checkbox         | 节点前是否显示复选框                                 | `boolean`                                                      | `false`      |
| default-expand-all    | 是否默认展开所有节点                                 | `boolean`                                                      | `false`      |
| default-expanded-keys | 默认展开的节点的 key 的数组                          | `TreeKey[]`                                                    | `[]`         |
| accordion             | 是否每次只打开一个同级树节点展开                     | `boolean`                                                      | `false`      |
| indent                | 相邻级节点间的水平缩进                               | `number`                                                       | `16`         |
| check-on-click-node   | 是否在点击节点时选中复选框                           | `boolean`                                                      | `false`      |
| expand-on-click-node  | 是否在点击节点时展开/收起                            | `boolean`                                                      | `true`       |
| lazy                  | 是否懒加载子节点                                     | `boolean`                                                      | `false`      |
| load                  | 加载子树数据的方法                                   | `Function`                                                     | —            |
| virtual               | 是否开启虚拟滚动渲染                                 | `boolean`                                                      | `false`      |
| height                | 下拉菜单的最大高度                                   | `string \| number`                                             | `274`        |
| item-size             | 虚拟滚动时每一项的高度                               | `number`                                                       | `34`         |
| teleported            | 是否直接将下拉层挂载至 body                          | `boolean`                                                      | `true`       |
| popper-class          | 下拉菜单的自定义类名                                 | `string`                                                       | —            |
| status                | 设置输入框的校验状态                                 | `'success' \| 'warning' \| 'error' \| ''`                      | —            |

### TreeSelect Props (配置选项)

| 属性名   | 说明                                  | 类型     |
| -------- | ------------------------------------- | -------- |
| label    | 指定节点标签为节点对象的某个属性值    | `string` |
| value    | 指定节点选择值为节点对象的某个属性值  | `string` |
| children | 指定子树为节点对象的某个属性值        | `string` |
| disabled | 指定节点选择框是否禁用的属性值        | `string` |
| isLeaf   | 指定节点是否为叶子节点 (仅懒加载有效) | `string` |

### TreeSelect Events

| 事件名         | 说明                       | 回调参数                                                               |
| -------------- | -------------------------- | ---------------------------------------------------------------------- | ------ | ------- | --------- | ------------------- |
| change         | 选中值发生变化时触发       | `(value: string                                                        | number | (string | number)[] | undefined) => void` |
| visible-change | 下拉框出现/隐藏时触发      | `(visible: boolean) => void`                                           |
| clear          | 点击清空按钮时触发         | —                                                                      |
| node-click     | 节点被点击时的回调         | `(data: TreeOption, node: TreeNode, e: MouseEvent) => void`            |
| check-change   | 节点复选框状态改变时的回调 | `(data: TreeOption, checked: boolean, indeterminate: boolean) => void` |
| check          | 点击复选框时的回调         | `(data: TreeOption, info: TreeCheckedInfo) => void`                    |

### TreeSelect Slots

| 插槽名  | 说明                   | 参数                                   |
| ------- | ---------------------- | -------------------------------------- |
| default | 自定义树节点的内容     | `{ node: TreeNode, data: TreeOption }` |
| prefix  | 自定义输入框前缀内容   | —                                      |
| empty   | 无匹配数据时的显示内容 | —                                      |

## 主题变量

| 变量名                                 | 说明                 | 默认值                       |
| -------------------------------------- | -------------------- | ---------------------------- |
| `--yh-tree-select-node-hover-bg`       | 节点悬停时的背景颜色 | `var(--yh-fill-color-light)` |
| `--yh-tree-select-node-selected-color` | 选中节点时的文字颜色 | `var(--yh-color-primary)`    |

<style>
.demo-res {
  margin: 12px 0 0;
  font-size: 13px;
  color: #666;
}
.demo-res code {
  color: var(--yh-color-primary);
  background: var(--yh-color-primary-light-9);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
