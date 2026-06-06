# TreeSelect 树形选择

`YhTreeSelect` 在紧凑的下拉面板中提供树形数据选择能力，支持单选、多选、复选框联动、过滤、懒加载和海量数据虚拟滚动。


<script setup lang="ts">
import { ref } from 'vue'

const toJs = (ts: string) => ts.replace(' lang="ts"', '').replace(' setup lang="ts"', ' setup')

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
      {
        label: 'components',
        key: 'src/components',
        children: [{ label: 'TreeSelect.vue', key: 'src/components/TreeSelect.vue' }]
      },
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

const v1 = ref('')
const v2 = ref('')
const v3 = ref('1-1-1')
const v4 = ref([])
const v6 = ref('1-1')
const v7 = ref('')
const v8 = ref('')
const v9 = ref([])
const v10 = ref([])
const v11 = ref('')
const v12 = ref('')
const v13 = ref([])

const lazyData = ref([{ name: '深圳总部', id: 'sz', items: [] }])

const loadNode = (node, resolve) => {
  setTimeout(() => {
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      name: `异步节点 ${node.id}-${i + 1}`,
      id: `${node.id}-${i + 1}`,
      isLeaf: Math.random() <= 0.7
    }))
    resolve(nodes)
  }, 1000)
}

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

const nuxtTree = ref('')
const nuxtData = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]

const tsNuxt = `<template>
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="value"
      :data="data"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const data = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

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
      placeholder="节点禁用（测试组）"
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
    placeholder="选择多个部门"
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
    placeholder="允许选择任意层级"
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
    placeholder="输入关键字搜索，例如：研发"
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
    placeholder="展开异步加载子节点"
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
      isLeaf: Math.random() <= 0.7
    }))
    resolve(nodes)
  }, 1000)
}
<\/script>`

const tsSlot = `<template>
  <yh-tree-select v-model="value" :data="data" node-key="key" placeholder="文件浏览器风格" style="width: 240px">
    <template #default="{ node, data }">
      <span style="display: flex; align-items: center;">
        <span :style="{ color: node.isLeaf ? '#666' : '#E6A23C', marginRight: '4px' }">
          {{ node.isLeaf ? '文件' : '文件夹' }}
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
      {
        label: 'components',
        key: 'src/components',
        children: [{ label: 'TreeSelect.vue', key: 'src/components/TreeSelect.vue' }]
      }
    ]
  }
]
<\/script>`.replace(/\\/g, '')

const tsVirtual = `<template>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    filterable
    virtual
    collapse-tags
    placeholder="搜索 1 万条数据"
    style="width: 320px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
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
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: \`测试节点 \${i}-\${j}\`, id: \`test-\${i}-\${j}\` })
    }
    data.push({ name: \`分组 \${i}\`, id: \`group-\${i}\`, items: children })
  }
  return data
}
const data = generateData(100)
<\/script>`.replace(/\\/g, '')
</script>

## 基础用法

标准单选模式。默认更适合选择叶子节点，父节点主要用于展开和收起树结构。

<DemoBlock title="基础选择" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
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

既可以禁用整个组件，也可以在数据源中禁用指定节点。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="toJs(tsDisabled)">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-tree-select v-model="v2" :data="orgData" disabled placeholder="整机禁用" />
    <yh-tree-select
      v-model="v12"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="节点禁用（测试组）"
    />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 后，在已有值时显示清空按钮。

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

## 多选与标签折叠

通过 `multiple` 开启多选，配合 `collapse-tags` 可以保持触发区紧凑。

<DemoBlock title="多选模式" :ts-code="tsMultiple" :js-code="toJs(tsMultiple)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v4"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      collapse-tags
      placeholder="选择多个部门"
    />
    <p class="demo-res">Value: <code>{{ v4 }}</code></p>
  </div>
</DemoBlock>

## 选择任意层级

开启 `check-strictly` 后，父子节点的选中关系不再联动。

<DemoBlock title="任意层级选择" :ts-code="tsStrictly" :js-code="toJs(tsStrictly)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v6"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      check-strictly
      placeholder="允许选择父节点"
    />
    <p class="demo-res">Value: <code>{{ v6 }}</code></p>
  </div>
</DemoBlock>

## 复选框模式

在需要显式勾选状态时，可以配合 `show-checkbox` 使用。

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

## 可过滤

开启 `filterable` 后，可以直接输入关键字过滤节点。

<DemoBlock title="搜索过滤" :ts-code="tsSearch" :js-code="toJs(tsSearch)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v7"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      filterable
      placeholder="输入关键字搜索，例如：研发"
    />
  </div>
</DemoBlock>

## 懒加载

设置 `lazy` 并提供 `load` 回调后，可按需异步加载子节点。

<DemoBlock title="懒加载" :ts-code="tsLazy" :js-code="toJs(tsLazy)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v8"
      :data="lazyData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      lazy
      :load="loadNode"
      placeholder="展开异步加载子节点"
    />
  </div>
</DemoBlock>

## 自定义节点内容

使用默认插槽可以重写下拉树节点的显示内容。

<DemoBlock title="自定义插槽" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="max-width: 320px;">
    <yh-tree-select v-model="v11" :data="fileData" node-key="key" placeholder="文件浏览器风格">
      <template #default="{ node, data }">
        <span style="display: flex; align-items: center;">
          <span :style="{ color: node.isLeaf ? '#666' : '#E6A23C', marginRight: '4px' }">
            {{ node.isLeaf ? '文件' : '文件夹' }}
          </span>
          <span>{{ data.label }}</span>
        </span>
      </template>
    </yh-tree-select>
  </div>
</DemoBlock>

## 虚拟滚动

对于超大树数据，可将 `virtual` 设为 `true`。

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
      placeholder="搜索 1 万条数据"
    />
    <p class="demo-res">Value Count: <code>{{ v9.length }}</code></p>
  </div>
</DemoBlock>

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

在 Nuxt 中接入 YH-UI 模块后可直接使用 `YhTreeSelect`。初始树结构和已选内容可以参与 SSR 渲染，过滤、弹层定位和懒加载会在客户端激活后继续工作。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="nuxtTree"
      :data="nuxtData"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `YhTreeKey \| YhTreeKey[]` | `undefined` |
| data | 树数据源 | `YhTreeOption[]` | `[]` |
| props | 字段别名配置 | `YhTreePropsAlias` | `{ label: 'label', value: 'value', children: 'children', disabled: 'disabled', isLeaf: 'isLeaf' }` |
| placeholder | 占位文本 | `string` | `undefined` |
| multiple | 是否开启多选 | `boolean` | `false` |
| clearable | 是否允许清空 | `boolean` | `false` |
| disabled | 是否禁用组件 | `boolean` | `false` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| filterable | 是否开启节点过滤 | `boolean` | `false` |
| filter-node-method | 自定义过滤方法 | `(value: string, data: YhTreeOption, node: YhTreeSelectNode) => boolean` | `undefined` |
| collapse-tags | 多选时是否折叠标签 | `boolean` | `false` |
| collapse-tags-tooltip | 已声明的折叠标签 Tooltip 属性，当前模板未消费该配置 | `boolean` | `false` |
| max-collapse-tags | 折叠前最多展示的标签数量 | `number` | `1` |
| teleported | 是否将面板传送到 `body` | `boolean` | `true` |
| popper-class | 下拉面板自定义类名 | `string` | `''` |
| status | 已声明的校验状态属性。当前模板和样式未消费该配置 | `'' \| 'success' \| 'warning' \| 'error'` | `undefined` |
| node-key | 唯一节点标识字段名。未传入时，运行时会回退到 `props.value` 映射字段 | `string` | `undefined` |
| show-checkbox | 是否显示复选框 | `boolean` | `false` |
| check-strictly | 父子节点选中关系是否相互独立 | `boolean` | `false` |
| check-on-click-node | 点击节点时是否切换复选框状态 | `boolean` | `false` |
| expand-on-click-node | 点击节点时是否展开或收起 | `boolean` | `true` |
| default-expand-all | 是否默认展开全部节点 | `boolean` | `false` |
| default-expanded-keys | 默认展开的节点键值 | `YhTreeKey[]` | `[]` |
| default-checked-keys | 已声明的默认勾选节点键值。当前树状态初始化未消费该 prop | `YhTreeKey[]` | `[]` |
| accordion | 同级是否仅允许展开一个节点 | `boolean` | `false` |
| indent | 每级树节点缩进 | `number` | `16` |
| lazy | 是否开启懒加载 | `boolean` | `false` |
| load | 懒加载子节点回调 | `(node: YhTreeOption, resolve: (data: YhTreeOption[]) => void) => void` | `undefined` |
| virtual | 是否开启虚拟滚动 | `boolean` | `false` |
| height | 下拉面板最大高度 | `string \| number` | `274` |
| item-size | 虚拟滚动估算节点高度 | `number` | `34` |
| empty-text | 空状态自定义文本 | `string` | `undefined` |
| theme-overrides | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: YhTreeKey \| YhTreeKey[] \| undefined) => void` |
| change | 选中值变化时触发 | `(value: YhTreeKey \| YhTreeKey[] \| undefined) => void` |
| visible-change | 下拉面板显示状态变化时触发 | `(visible: boolean) => void` |
| clear | 点击清空按钮时触发 | `() => void` |
| node-click | 点击节点行时触发 | `(data: YhTreeOption, node: YhTreeSelectNode, e: MouseEvent) => void` |
| check-change | 复选框状态变化时触发 | `(data: YhTreeOption, checked: boolean, indeterminate: boolean) => void` |
| check | 勾选或取消勾选时触发 | `(data: YhTreeOption, info: YhTreeCheckedInfo) => void` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义树节点内容 | `{ node: YhTreeSelectNode, data: YhTreeOption }` |

### Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhTreeSelectProps` | TreeSelect props 类型 |
| `YhTreeSelectEmits` | TreeSelect emits 类型 |
| `YhTreeSelectNode` | 回调中使用的树节点视图模型类型 |
| `YhTreeOption` | 树选项数据类型 |
| `YhTreeKey` | 节点 key 类型 |
| `YhTreeCheckedInfo` | 勾选信息类型 |
| `YhTreePropsAlias` | 字段别名配置类型 |
| `YhTreeSelectInstance` | 组件实例类型 |

### 主题变量

`YhTreeSelect` 支持 `themeOverrides`。当前样式文件直接消费以下组件级 CSS 变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-tree-select-node-hover-bg` | 节点悬停背景色 | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-tree-select-node-active-bg` | 选中节点背景色 | `var(--yh-color-primary-light-9, #ecf5ff)` |
| `--yh-tree-select-active-color` | 选中节点文字色 | `var(--yh-color-primary, #409eff)` |


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
