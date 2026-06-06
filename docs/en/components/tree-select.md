# TreeSelect

Select tree-structured data in a compact dropdown. `YhTreeSelect` supports single selection, multiple selection, checkbox linkage, filtering, lazy loading, and virtual scrolling for large datasets.


<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

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

const lazyData = ref([{ name: 'Shenzhen HQ', id: 'sz', items: [] }])

const loadNode = (node: any, resolve: (data: any[]) => void) => {
  setTimeout(() => {
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      name: `Async Node ${node.id}-${i + 1}`,
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
      children.push({ name: `Sub Node ${i}-${j}`, id: `child-${i}-${j}` })
    }
    data.push({ name: `Root Node ${i}`, id: `root-${i}`, items: children })
  }
  return data
}
const virtualData = generateData(100)

const nuxtTree = ref('')
const nuxtData = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]

const tsNuxt = `<${_T}>
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="value"
      :data="data"
      placeholder="Nuxt Auto Import Demo"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const data = [
  { label: 'Nuxt 3', value: 'nuxt3', children: [{ label: 'App.vue', value: 'app' }] },
  { label: 'Nuxt 4', value: 'nuxt4' }
]
</${_S}>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

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
    placeholder="Select Multiple Departments"
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
      isLeaf: Math.random() <= 0.7
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
          {{ node.isLeaf ? 'file' : 'folder' }}
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
      {
        label: 'components',
        key: 'src/components',
        children: [{ label: 'TreeSelect.vue', key: 'src/components/TreeSelect.vue' }]
      }
    ]
  }
]
</${_S}>`

const tsVirtual = `<${_T}>
  <yh-tree-select
    v-model="value"
    :data="data"
    :props="{ label: 'name', value: 'id', children: 'items' }"
    multiple
    filterable
    virtual
    collapse-tags
    placeholder="Search 10k Items"
    style="width: 320px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
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

## Basic Usage

Standard single-selection mode. By default, leaf nodes are the practical selection target, while parent nodes mainly expand or collapse the tree.

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

You can disable the entire component or disable specific nodes through the data source.

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

Set `clearable` to display a clear button when a value exists.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="toJs(tsClearable)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v3"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      clearable
      placeholder="Clearable"
    />
    <p class="demo-res">Value: <code>{{ v3 }}</code></p>
  </div>
</DemoBlock>

## Multiple Selection and Tag Folding

Use `multiple` to enable multi-selection. `collapse-tags` helps keep the trigger compact.

<DemoBlock title="Multi Selection" :ts-code="tsMultiple" :js-code="toJs(tsMultiple)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v4"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      collapse-tags
      placeholder="Select Multiple Departments"
    />
    <p class="demo-res">Value: <code>{{ v4 }}</code></p>
  </div>
</DemoBlock>

## Select Any Level

Enable `check-strictly` to allow selecting parent and child nodes independently.

<DemoBlock title="Select Any Level" :ts-code="tsStrictly" :js-code="toJs(tsStrictly)">
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

Use `show-checkbox` when you want explicit checked states in tree selection.

<DemoBlock title="Checkbox Mode" :ts-code="tsCheckbox" :js-code="toJs(tsCheckbox)">
  <div style="max-width: 400px;">
    <yh-tree-select
      v-model="v10"
      :data="orgData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      multiple
      show-checkbox
      placeholder="Multiple with Checkbox"
    />
    <p class="demo-res">Value: <code>{{ v10 }}</code></p>
  </div>
</DemoBlock>

## Filterable

With `filterable` enabled, users can type keywords directly into the trigger input.

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

Set `lazy` and provide `load` to fetch child nodes on demand.

<DemoBlock title="Lazy Loading" :ts-code="tsLazy" :js-code="toJs(tsLazy)">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="v8"
      :data="lazyData"
      :props="{ label: 'name', value: 'id', children: 'items' }"
      lazy
      :load="loadNode"
      placeholder="Expand to Load Asynchronously"
    />
  </div>
</DemoBlock>

## Custom Node Content

Use the default slot to customize how nodes render inside the dropdown.

<DemoBlock title="Custom Slot" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="max-width: 320px;">
    <yh-tree-select v-model="v11" :data="fileData" node-key="key" placeholder="File Explorer Style">
      <template #default="{ node, data }">
        <span style="display: flex; align-items: center;">
          <span :style="{ color: node.isLeaf ? '#666' : '#E6A23C', marginRight: '4px' }">
            {{ node.isLeaf ? 'file' : 'folder' }}
          </span>
          <span>{{ data.label }}</span>
        </span>
      </template>
    </yh-tree-select>
  </div>
</DemoBlock>

## Virtual Scrolling

Set `virtual` to `true` for very large trees.

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
      placeholder="Search 10k Items"
    />
    <p class="demo-res">Value Count: <code>{{ v9.length }}</code></p>
  </div>
</DemoBlock>

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
      placeholder="Massive Data Selection"
    />
    <p class="demo-res">Checked Count: <code>{{ v13.length }}</code></p>
  </div>
</DemoBlock>

## Use in Nuxt

`YhTreeSelect` works in Nuxt after registering the YH-UI module. The initial tree structure and selected content render during SSR, while filtering, popup positioning, and lazy loading continue on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-tree-select
      v-model="nuxtTree"
      :data="nuxtData"
      placeholder="Nuxt Auto Import Demo"
    />
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Bound value | `YhTreeKey \| YhTreeKey[]` | `undefined` |
| data | Tree data source | `YhTreeOption[]` | `[]` |
| props | Field alias configuration | `YhTreePropsAlias` | `{ label: 'label', value: 'value', children: 'children', disabled: 'disabled', isLeaf: 'isLeaf' }` |
| placeholder | Placeholder text | `string` | `undefined` |
| multiple | Whether multiple selection is enabled | `boolean` | `false` |
| clearable | Whether the current value can be cleared | `boolean` | `false` |
| disabled | Whether the component is disabled | `boolean` | `false` |
| size | Input size | `'large' \| 'default' \| 'small'` | `'default'` |
| filterable | Whether node filtering is enabled | `boolean` | `false` |
| filter-node-method | Custom filter function | `(value: string, data: YhTreeOption, node: YhTreeSelectNode) => boolean` | `undefined` |
| collapse-tags | Whether selected tags are collapsed in multiple mode | `boolean` | `false` |
| collapse-tags-tooltip | Declared collapsed-tag tooltip prop. The current template does not consume it | `boolean` | `false` |
| max-collapse-tags | Maximum number of visible tags before collapsing | `number` | `1` |
| teleported | Whether the dropdown is teleported to `body` | `boolean` | `true` |
| popper-class | Custom class applied to the dropdown popper | `string` | `''` |
| status | Declared validation status prop. The current template and stylesheet do not consume it | `'' \| 'success' \| 'warning' \| 'error'` | `undefined` |
| node-key | Unique node identifier field. When omitted, the runtime falls back to the field mapped by `props.value` | `string` | `undefined` |
| show-checkbox | Whether checkboxes are shown before nodes | `boolean` | `false` |
| check-strictly | Whether parent and child checked states are independent | `boolean` | `false` |
| check-on-click-node | Whether clicking a node toggles its checkbox | `boolean` | `false` |
| expand-on-click-node | Whether clicking a node expands or collapses it | `boolean` | `true` |
| default-expand-all | Whether all nodes are expanded by default | `boolean` | `false` |
| default-expanded-keys | Initial expanded node keys | `YhTreeKey[]` | `[]` |
| default-checked-keys | Declared initial checked node keys. The current tree-state initialization does not consume this prop | `YhTreeKey[]` | `[]` |
| accordion | Whether only one sibling node can stay expanded at a time | `boolean` | `false` |
| indent | Horizontal indentation per tree level | `number` | `16` |
| lazy | Whether lazy loading is enabled | `boolean` | `false` |
| load | Lazy-load callback for child nodes | `(node: YhTreeOption, resolve: (data: YhTreeOption[]) => void) => void` | `undefined` |
| virtual | Whether virtual scrolling is enabled | `boolean` | `false` |
| height | Maximum dropdown height | `string \| number` | `274` |
| item-size | Estimated item height used by virtual scrolling | `number` | `34` |
| empty-text | Custom empty-state text | `string` | `undefined` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when the bound value changes | `(value: YhTreeKey \| YhTreeKey[] \| undefined) => void` |
| change | Triggered when the selection changes | `(value: YhTreeKey \| YhTreeKey[] \| undefined) => void` |
| visible-change | Triggered when dropdown visibility changes | `(visible: boolean) => void` |
| clear | Triggered when the clear button is clicked | `() => void` |
| node-click | Triggered when a node row is clicked | `(data: YhTreeOption, node: YhTreeSelectNode, e: MouseEvent) => void` |
| check-change | Triggered when checkbox state changes | `(data: YhTreeOption, checked: boolean, indeterminate: boolean) => void` |
| check | Triggered when a checkbox is checked or unchecked | `(data: YhTreeOption, info: YhTreeCheckedInfo) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Custom content for tree nodes | `{ node: YhTreeSelectNode, data: YhTreeOption }` |

### Expose

This component does not expose public instance methods or properties.

### Type Exports

| Name | Description |
| --- | --- |
| `YhTreeSelectProps` | Props type for `YhTreeSelect` |
| `YhTreeSelectEmits` | Emits type for `YhTreeSelect` |
| `YhTreeSelectNode` | Internal rendered tree node type exposed for callbacks |
| `YhTreeOption` | Tree option data type |
| `YhTreeKey` | Tree node key type |
| `YhTreeCheckedInfo` | Checked-state payload type |
| `YhTreePropsAlias` | Field alias configuration type |
| `YhTreeSelectInstance` | Component instance type |

### Theme Variables

`YhTreeSelect` supports `themeOverrides`. The stylesheet directly consumes the following component-scoped CSS variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-tree-select-node-hover-bg` | Node background color on hover | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-tree-select-node-active-bg` | Background color for the selected node | `var(--yh-color-primary-light-9, #ecf5ff)` |
| `--yh-tree-select-active-color` | Text color for selected nodes | `var(--yh-color-primary, #409eff)` |


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
