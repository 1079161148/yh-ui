# TreeSelect

Supports extreme virtual scrolling retrieval.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==============================
// Shared Demo Data (internal document rendering variables)
// ==============================
const orgData = [
  {
    id: '1',
    name: 'Headquarters',
    items: [
      {
        id: '1-1',
        name: 'R&D Center',
        items: [
          { id: '1-1-1', name: 'Frontend Team' },
          { id: '1-1-2', name: 'Backend Team' },
          { id: '1-1-3', name: 'QA Team', disabled: true }
        ]
      },
      {
        id: '1-2',
        name: 'Product Dept',
        items: [{ id: '1-2-1', name: 'UI Design' }, { id: '1-2-2', name: 'Product Manager' }]
      }
    ]
  },
  {
    id: '2',
    name: 'Branch Office',
    items: [{ id: '2-1', name: 'Marketing Dept' }, { id: '2-2', name: 'Finance Dept' }]
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

// Demo Variables
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

// Lazy load initial data
const lazyData = ref([
  { name: 'Shenzhen HQ', id: 'sz', items: [] }
])

// Lazy load function
const loadNode = (node: any, resolve: any) => {
  // Simulate network delay
  setTimeout(() => {
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      name: `Async Node ${node.id}-${i + 1}`,
      id: `${node.id}-${i + 1}`,
      isLeaf: Math.random() > 0.7 ? false : true // Randomly generate some children
    }))
    resolve(nodes)
  }, 1000)
}

// Massive data generation
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: `Sub Node ${i}-${j}`, id: `child-${i}-${j}` })
    }
    data.push({ name: `Root Node ${i}`, id: `root-${i}`, items: children })
  }
  return data
}
const virtualData = generateData(100)

// Nuxt Usage
const nuxtTree = ref('')
const nuxtData = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]

const tsNuxt = `<${_T}>
  <div style="max-width: 320px;">
    <!-- Component is auto-imported -->
    <yh-tree-select
      v-model="value"
      :data="data"
      placeholder="Nuxt Auto Import Demo"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// No manual import of YhTreeSelect needed
const value = ref('')
const data = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]
</${_S}>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// ==============================
// Demo Sample Code (Full)
// ==============================

const commonDataCode = `const data = [
  {
    id: '1',
    name: 'Headquarters',
    items: [
      {
        id: '1-1',
        name: 'R&D Center',
        items: [
          { id: '1-1-1', name: 'Frontend Team' },
          { id: '1-1-2', name: 'Backend Team' },
          { id: '1-1-3', name: 'QA Team', disabled: true }
        ]
      },
      {
        id: '1-2',
        name: 'Product Dept',
        items: [{ id: '1-2-1', name: 'UI Design' }, { id: '1-2-2', name: 'Product Manager' }]
      }
    ]
  },
  {
    id: '2',
    name: 'Branch Office',
    items: [{ id: '2-1', name: 'Marketing Dept' }, { id: '2-2', name: 'Finance Dept' }]
  }
]`

const tsBasic = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    placeholder="Select Department"
    style="width: 240px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
${commonDataCode}
</${_S}>`

const tsDisabled = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-tree-select
      v-model="value1"
      :data="data"
      disabled
      placeholder="Disabled Component"
      style="width: 240px"
    />
    <yh-tree-select
      v-model="value2"
      :data="data"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="Disabled Node (QA Team)"
      style="width: 240px"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
${commonDataCode}
</${_S}>`

const tsClearable = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    clearable
    placeholder="Clearable"
    style="width: 240px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('1-1-1')
${commonDataCode}
</${_S}>`

const tsMultiple = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    collapse-tags
    placeholder="Select Multi Departments"
    style="width: 300px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${commonDataCode}
</${_S}>`

const tsStrictly = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    check-strictly
    placeholder="Select Any Level"
    style="width: 240px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('1-1')
${commonDataCode}
</${_S}>`

const tsCheckbox = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    show-checkbox
    placeholder="Multiple with Checkbox"
    style="width: 310px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${commonDataCode}
</${_S}>`

const tsSearch = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    filterable
    placeholder="Search: e.g. 'R&D'"
    style="width: 240px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
${commonDataCode}
</${_S}>`

const tsLazy = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    lazy
    :load="loadNode"
    placeholder="Lazy Load Sub Nodes"
    style="width: 240px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const data = ref([{ name: 'Shenzhen HQ', id: 'sz', items: [] }])

const loadNode = (node, resolve) => {
  setTimeout(() => {
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      name: \`Async Node \${node.id}-\${i + 1}\`,
      id: \`\${node.id}-\${i + 1}\`,
      isLeaf: Math.random() > 0.7 ? false : true
    }))
    resolve(nodes)
  }, 1000)
}
</${_S}>`

const tsSlot = `<${_T}>
  <yh-tree-select v-model="value" :data="data" node-key="key" placeholder="File Explorer Style" style="width: 240px">
    <template #default="{ node, data }">
      <span style="display: flex; align-items: center;">
        <span :style="{ color: node.isLeaf ? '#666' : '#E6A23C', marginRight: '4px' }">
          {{ node.isLeaf ? '📄' : '📁' }}
        </span>
        <span>{{ data.label }}</span>
      </span>
    </template>
  </yh-tree-select>
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const tsVirtual = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    filterable
    collapse-tags
    virtual
    placeholder="Fast Search 10k Nodes"
    style="width: 320px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])

// Generate massive data
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: \`Sub Node \${i}-\${j}\`, id: \`child-\${i}-\${j}\` })
    }
    data.push({ name: \`Root Node \${i}\`, id: \`root-\${i}\`, items: children })
  }
  return data
}
const data = generateData(100)
</${_S}>`

const tsVirtualCheckbox = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    show-checkbox
    virtual
    collapse-tags
    placeholder="Massive Data Selection"
    style="width: 320px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])

// Generate massive data
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const children = []
    for (let j = 0; j < 100; j++) {
      children.push({ name: \`Test Node \${i}-\${j}\`, id: \`test-\${i}-\${j}\` })
    }
    data.push({ name: \`Group \${i}\`, id: \`group-\${i}\`, items: children })
  }
  return data
}
const data = generateData(100)
</${_S}>`

</script>

When data is massive or follows a clear hierarchical structure, `TreeSelect` provides an efficient selection solution within a compact space.

## Basic Usage

Standard single-selection mode. By default, only leaf nodes can be selected; clicking parent nodes automatically expands or collapses them.

<DemoBlock title="Basic Selection" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v1"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="Select Department"
    />
    <p class="demo-res">Value: <code>{{ v1 }}</code></p>
  </div>
</DemoBlock>

## Disabled State

You can disable the entire component or specific nodes (like "QA Team" in this demo) via the `disabled` field in your data.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="toJs(tsDisabled)">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-tree-select v-model="v2" :data="orgData" disabled placeholder="Disabled Entirely" />
    <yh-tree-select
      v-model="v12"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      placeholder="Node Disabled (QA Team)"
    />
  </div>
</DemoBlock>

## Clearable

Setting the `clearable` property displays a clear button on hover.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="toJs(tsClearable)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v3"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      clearable
      placeholder="Supports Clearing"
    />
    <p class="demo-res">Value: <code>{{ v3 }}</code></p>
  </div>
</DemoBlock>

## Multiple Selection and Tag Folding

Use `multiple` to enable multi-selection. Using `collapse-tags` is recommended for saving space.

<DemoBlock title="Multi-Selection" :ts-code="tsMultiple" :js-code="toJs(tsMultiple)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v4"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      collapse-tags
      placeholder="Select Multi Depts"
    />
    <p class="demo-res">Value: <code>{{ v4 }}</code></p>
  </div>
</DemoBlock>

## Select Any Level

Enabling `check-strictly` allows users to select any node regardless of whether it is a leaf.

<DemoBlock title="Any Level Selection" :ts-code="tsStrictly" :js-code="toJs(tsStrictly)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v6"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      check-strictly
      placeholder="Allow Selecting Parent Node"
    />
    <p class="demo-res">Value: <code>{{ v6 }}</code></p>
  </div>
</DemoBlock>

## Checkbox Mode

Use `show-checkbox` to provide a clearer visual selection state in multi-selection scenarios.

<DemoBlock title="Checkbox Mode" :ts-code="tsCheckbox" :js-code="toJs(tsCheckbox)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v10"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      show-checkbox
      placeholder="Multi with Checkbox"
    />
    <p class="demo-res">Value: <code>{{ v10 }}</code></p>
  </div>
</DemoBlock>

## Filterable

With `filterable` enabled, users can type keywords directly into the input to filter nodes.

<DemoBlock title="Search Filter" :ts-code="tsSearch" :js-code="toJs(tsSearch)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v7"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      filterable
      placeholder="Type to search: e.g. 'R&D'"
    />
  </div>
</DemoBlock>

## Lazy Loading

Set `lazy` and provide a `load` function to asynchronously load child nodes, which is very useful for large organization charts.

<DemoBlock title="Lazy Loading" :ts-code="tsLazy" :js-code="toJs(tsLazy)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v8"
      :data="lazyData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      lazy
      :load="loadNode"
      placeholder="Expand to load asynchronously"
    />
  </div>
</DemoBlock>

## Custom Content

Use the `#default` slot to fully customize how tree nodes appear in the menu.

<DemoBlock title="Custom Slot" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="max-width: 320px;">
    <yh-tree-select v-model="v11" :data="fileData" node-key="key" placeholder="File Explorer Style">
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

## Virtual Scrolling (10,000+ Nodes)

Built-in proprietary virtual scrolling. To optimize performance, virtual scrolling is **disabled by default**. For large datasets (recommended for 500+ items), set `virtual` to `true`.

### Basic Search Demo

<DemoBlock title="Massive Data Search" :ts-code="tsVirtual" :js-code="toJs(tsVirtual)">
  <div style="max-width: 360px;">
    <yh-tree-select
      v-model="v9"
      :data="virtualData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      filterable
      virtual
      collapse-tags
      placeholder="Search 10k items"
    />
    <p class="demo-res">Value Count: <code>{{ v9.length }}</code></p>
  </div>
</DemoBlock>

### Checkbox Mode

Even with massive data, cascaded checkbox selections remain smooth.

<DemoBlock title="Massive Data Checklist" :ts-code="tsVirtualCheckbox" :js-code="toJs(tsVirtualCheckbox)">
  <div style="max-width: 360px;">
    <yh-tree-select
      v-model="v13"
      :data="virtualData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      show-checkbox
      virtual
      collapse-tags
      placeholder="Massive Selection"
    />
    <p class="demo-res">Checked Count: <code>{{ v13.length }}</code></p>
  </div>
</DemoBlock>

## Usage in Nuxt

TreeSelect is fully compatible with Nuxt 3/4. Thanks to the Auto Import feature, you can use it directly in templates.

<DemoBlock title="Nuxt Usage" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="nuxtTree"
      :data="nuxtData"
      placeholder="Nuxt Auto Import Demo"
    />
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ Initial tree structure rendering (including expand/collapse state) is supported.
- ✅ Selected Tokens render correctly on the server.
- ✅ Virtual scrolling displays initial nodes on first load.
- ✅ Lazy load initial data supports SSR.
- 💡 Filter functionality and async loading activate after client-side hydration.

::: tip SSR Safety
TreeSelect utilizes Vue 3.5's native `useId` mechanism, ensuring node IDs and ARIA attributes stay identical between server and client even in complex recursive structures, avoiding common hydration errors.
:::

## API

### TreeSelect Attributes

| Name                  | Description                                                                 | Type                                                      | Default           |
| --------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------- |
| model-value / v-model | Binding value                                                               | `string \| number \| (string \| number)[]`                | —                 |
| data                  | Display data                                                                | `TreeOption[]`                                            | `[]`              |
| props                 | Configuration options                                                       | `object`                                                  | —                 |
| node-key              | Unique identifier attribute for each node; should be unique across the tree | `string`                                                  | `'value'`         |
| multiple              | Whether multiple selection is allowed                                       | `boolean`                                                 | `false`           |
| clearable             | Whether to allow clearing of the selection                                  | `boolean`                                                 | `false`           |
| disabled              | Whether disabled                                                            | `boolean`                                                 | `false`           |
| size                  | Input size                                                                  | `'large' \| 'default' \| 'small'`                         | `'default'`       |
| placeholder           | Placeholder text                                                            | `string`                                                  | `'Please select'` |
| empty-text            | Text shown when there is no data                                            | `string`                                                  | `'No Data'`       |
| filterable            | Whether list is searchable                                                  | `boolean`                                                 | `false`           |
| filter-node-method    | Custom filter method                                                        | `(value: string, data: TreeOption, node: any) => boolean` | —                 |
| collapse-tags         | Whether to fold tags in multi-select                                        | `boolean`                                                 | `false`           |
| collapse-tags-tooltip | Whether to show a tooltip for folded tags (displaying count)                | `boolean`                                                 | `false`           |
| max-collapse-tags     | Max tags displayed before folding                                           | `number`                                                  | `1`               |
| check-strictly        | Whether to decouple parent and child checkbox statuses                      | `boolean`                                                 | `false`           |
| show-checkbox         | Whether to show checkboxes before nodes                                     | `boolean`                                                 | `false`           |
| default-expand-all    | Whether to expand all nodes by default                                      | `boolean`                                                 | `false`           |
| default-expanded-keys | Initial keys for expanded nodes                                             | `TreeKey[]`                                               | `[]`              |
| accordion             | Whether to expand only one peer node at a time                              | `boolean`                                                 | `false`           |
| indent                | Horizontal indent between levels                                            | `number`                                                  | `16`              |
| check-on-click-node   | Whether to check checkbox on node click                                     | `boolean`                                                 | `false`           |
| expand-on-click-node  | Whether to expand/collapse on node click                                    | `boolean`                                                 | `true`            |
| lazy                  | Whether to enable lazy loading                                              | `boolean`                                                 | `false`           |
| load                  | Function for loading subtree data                                           | `Function`                                                | —                 |
| virtual               | Whether to enable virtual scrolling                                         | `boolean`                                                 | `false`           |
| height                | Max height of the dropdown menu                                             | `string \| number`                                        | `274`             |
| item-size             | Height of each item for virtual scrolling                                   | `number`                                                  | `34`              |
| teleported            | Whether to mount the dropdown to body                                       | `boolean`                                                 | `true`            |
| popper-class          | Custom class for popper                                                     | `string`                                                  | —                 |
| status                | Validation status for the input                                             | `'success' \| 'warning' \| 'error' \| ''`                 | —                 |

### TreeSelect Props (Config Options)

| Name     | Description                                        | Type     |
| -------- | -------------------------------------------------- | -------- |
| label    | Specifies the node label property                  | `string` |
| value    | Specifies the selection value property             | `string` |
| children | Specifies the child nodes property                 | `string` |
| disabled | Specifies the node disabled status property        | `string` |
| isLeaf   | Specifies if a node is a leaf (only for lazy load) | `string` |

### TreeSelect Events

| Name           | Description                                   | Parameters                                                             |
| -------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| change         | Triggers when the selection changes           | `(value: any) => void`                                                 |
| visible-change | Triggers when the dropdown visibility changes | `(visible: boolean) => void`                                           |
| clear          | Triggers when the clear button is clicked     | —                                                                      |
| node-click     | Triggers on node click                        | `(data: TreeOption, node: TreeNode, e: MouseEvent) => void`            |
| check-change   | Triggers when a checkbox state changes        | `(data: TreeOption, checked: boolean, indeterminate: boolean) => void` |
| check          | Triggers on checkbox click                    | `(data: TreeOption, info: any) => void`                                |

### TreeSelect Slots

| Name    | Description                               | Parameters                             |
| ------- | ----------------------------------------- | -------------------------------------- |
| default | Custom content for tree nodes             | `{ node: TreeNode, data: TreeOption }` |
| prefix  | Custom input prefix content               | —                                      |
| empty   | Content for empty/no-matching-data states | —                                      |

## Theme Variables

| Variable Name                          | Description                    | Default                      |
| -------------------------------------- | ------------------------------ | ---------------------------- |
| `--yh-tree-select-node-hover-bg`       | Node background color on hover | `var(--yh-fill-color-light)` |
| `--yh-tree-select-node-selected-color` | Text color for selected nodes  | `var(--yh-color-primary)`    |

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
