# Cascader

<script setup lang="ts">
import { ref } from 'vue'

// --- Helper: Convert TS code to JS code ---
const toJs = (ts: string) => ts.replace(' lang="ts"', '').replace(' setup lang="ts"', ' setup')

// ==============================
// Shared demo data (for doc rendering only, code blocks redefine for 1:1 copy)
// ==============================
const regionData = [
  {
    value: 'zhejiang', label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou', label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake District' },
          { value: 'binjiang', label: 'Binjiang District' }
        ]
      },
      {
        value: 'ningbo', label: 'Ningbo',
        children: [{ value: 'haishu', label: 'Haishu District' }]
      }
    ]
  },
  {
    value: 'jiangsu', label: 'Jiangsu',
    children: [
      {
        value: 'nanjing', label: 'Nanjing',
        children: [{ value: 'xuanwu', label: 'Xuanwu District' }]
      }
    ]
  }
]

const orgData = [
  {
    value: 'tech', label: 'R&D Dept',
    children: [
      { value: 'frontend', label: 'Frontend Dev' },
      { value: 'backend', label: 'Backend Dev' }
    ]
  },
  {
    value: 'hr', label: 'HR Dept',
    children: [{ value: 'recruit', label: 'Recruiting Lead' }]
  }
]

const categoryData = [
  {
    value: 'digital', label: 'Digital Products',
    children: [
      { value: 'phone', label: 'Smartphones' },
      { value: 'laptop', label: 'Laptops' }
    ]
  },
  {
    value: 'food', label: 'Snack Foods', disabled: true,
    children: [{ value: 'snack', label: 'Puffed Snacks' }]
  }
]

// Demo variables
const v1 = ref([])
const v2 = ref([])
const v3 = ref([])
const v4 = ref(['zhejiang', 'hangzhou', 'xihu'])
const v5 = ref([])
const v6 = ref([])
const v7 = ref([])
const v8 = ref([])
const v9 = ref([])
const v10 = ref([])
const v11 = ref('xihu')

// Search config
const filterMethod = (node: any, keyword: string) => {
  return node.label.toLowerCase().includes(keyword.toLowerCase())
}

// Big data
const bigData = Array.from({ length: 40 }).map((_, i) => ({
  value: `group-${i}`, label: `Monitor Group ${i + 1}`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: `point-${i}-${j}`, label: `Device Node ${i + 1}-${j + 1}`
  }))
}))

// --- Code string macros ---

const code_regionData = `const options = [
  {
    value: 'zhejiang', label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou', label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake District' },
          { value: 'binjiang', label: 'Binjiang District' }
        ]
      },
      {
        value: 'ningbo', label: 'Ningbo',
        children: [{ value: 'haishu', label: 'Haishu District' }]
      }
    ]
  },
  {
    value: 'jiangsu', label: 'Jiangsu',
    children: [
      {
        value: 'nanjing', label: 'Nanjing',
        children: [{ value: 'xuanwu', label: 'Xuanwu District' }]
      }
    ]
  }
]`

const tsBasic = `<template>
  <yh-cascader v-model="value" :options="options" placeholder="Select a region" />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
${code_regionData}
<\/script>`

const tsMultiple = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    multiple 
    collapse-tags 
    placeholder="Multi-select with collapsed tags" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = [
  {
    value: 'tech', label: 'R&D Dept',
    children: [
      { value: 'frontend', label: 'Frontend Dev' },
      { value: 'backend', label: 'Backend Dev' }
    ]
  },
  {
    value: 'hr', label: 'HR Dept',
    children: [{ value: 'recruit', label: 'Recruiting Lead' }]
  }
]
<\/script>`

const tsStrictly = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    check-strictly 
    placeholder="Select any level" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = [
  {
    value: 'tech', label: 'R&D Dept',
    children: [
      { value: 'frontend', label: 'Frontend Dev' },
      { value: 'backend', label: 'Backend Dev' }
    ]
  }
]
<\/script>`

const tsSearch = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    filterable 
    placeholder="Try searching: West Lake" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
${code_regionData}
<\/script>`

const tsEmitPath = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    :emit-path="false" 
    placeholder="Return leaf node value only" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('xihu')
${code_regionData}
<\/script>`

const tsSlot = `<template>
  <yh-cascader v-model="value" :options="options" placeholder="Custom content">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.children?.length" style="color: #999; margin-left: 8px;">
        ({{ data.value }})
      </span>
    </template>
  </yh-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
${code_regionData}
<\/script>`

const tsBigData = `<template>
  <yh-cascader v-model="value" :options="options" virtual placeholder="Large dataset display" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = Array.from({ length: 40 }).map((_, i) => ({
  value: \`group-\${i}\`, label: \`Monitor Group \${i + 1}\`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: \`point-\${i}-\${j}\`, label: \`Device Node \${i + 1}-\${j + 1}\`
  }))
}))
<\/script>`

const tsDisabled = `<template>
  <yh-cascader v-model="value1" :options="options1" disabled placeholder="Fully disabled" />
  <yh-cascader v-model="value2" :options="options2" placeholder="Option disabled (Snack Foods disabled)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value2 = ref([])

const options1 = [
  {
    value: 'zhejiang', label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou', label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake District' },
          { value: 'binjiang', label: 'Binjiang District' }
        ]
      }
    ]
  }
]

const options2 = [
  {
    value: 'digital', label: 'Digital Products',
    children: [
      { value: 'phone', label: 'Smartphones' },
      { value: 'laptop', label: 'Laptops' }
    ]
  },
  {
    value: 'food', label: 'Snack Foods', disabled: true,
    children: [{ value: 'snack', label: 'Puffed Snacks' }]
  }
]
<\/script>`

// Nuxt usage example
const nuxtCascader = ref([])
const nuxtOptions = [
  {
    value: 'guide', label: 'Guide',
    children: [
      { value: 'design', label: 'Design Principles' },
      { value: 'nav', label: 'Navigation' }
    ]
  }
]

const tsNuxt = `<template>
  <div style="max-width: 320px;">
    <!-- Auto-imported, use directly -->
    <yh-cascader v-model="nuxtCascader" :options="nuxtOptions" placeholder="Nuxt Auto Import" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhCascader
const nuxtCascader = ref([])
const nuxtOptions = [
  {
    value: 'guide', label: 'Guide',
    children: [
      { value: 'design', label: 'Design Principles' },
      { value: 'nav', label: 'Navigation' }
    ]
  }
]
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

</script>

When a dataset has a clear hierarchical structure (e.g., administrative regions, department structures, product categories), use the cascader for step-by-step selection.

## Basic Usage

A widely applicable basic single-select cascader.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v1" :options="regionData" placeholder="Select a region" />
    <p class="demo-res">Value: <code>{{ v1 }}</code></p>
  </div>
</DemoBlock>

## Disabled

You can disable the entire component or specify certain options as unselectable in the data.

<DemoBlock title="Disabled" :ts-code="tsDisabled" :js-code="toJs(tsDisabled)">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="v4" :options="regionData" disabled placeholder="Fully disabled" />
    <yh-cascader v-model="v5" :options="categoryData" placeholder="Option disabled (Snack Foods disabled)" />
    <p class="demo-res">Value: <code>{{ v5 }}</code></p>
  </div>
</DemoBlock>

## Multiple Select with Collapsed Tags

Set `multiple` to enable multi-select; use `collapse-tags` to collapse displayed tags.

<DemoBlock title="Multiple Select" :ts-code="tsMultiple" :js-code="toJs(tsMultiple)">
  <div style="max-width: 400px;">
    <yh-cascader v-model="v2" :options="orgData" multiple collapse-tags placeholder="Select multiple departments" />
    <p class="demo-res">Value: <code>{{ v2 }}</code></p>
  </div>
</DemoBlock>

## Select Any Level

With `check-strictly` enabled, users can select nodes at any level.

<DemoBlock title="Select Any Level" :ts-code="tsStrictly" :js-code="toJs(tsStrictly)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v3" :options="orgData" check-strictly placeholder="Allow selecting parent" />
    <p class="demo-res">Value: <code>{{ v3 }}</code></p>
  </div>
</DemoBlock>

## Return Mode (emit-path)

By default, the full path array is returned. Set `emit-path="false"` to return only the selected node's `value`.

<DemoBlock title="Non-Path Mode" :ts-code="tsEmitPath" :js-code="toJs(tsEmitPath)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v11" :options="regionData" :emit-path="false" placeholder="Return leaf value only" />
    <p class="demo-res">Value: <code>{{ v11 }}</code></p>
  </div>
</DemoBlock>

## Search Filter

Enable `filterable` for quick search suggestions. Supports matching any segment in the full path.

<DemoBlock title="Searchable" :ts-code="tsSearch" :js-code="toJs(tsSearch)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v8" :options="regionData" filterable placeholder="Search: e.g. 'Hangzhou' or 'West Lake'" />
    <p class="demo-res">Value: <code>{{ v8 }}</code></p>
  </div>
</DemoBlock>

## Custom Content

Use the `#default` slot to fully customize menu item rendering.

<DemoBlock title="Custom Slot" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v10" :options="regionData" placeholder="Custom rendering">
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.children?.length" style="color: #999; margin-left: 8px; font-size: 12px;">
          ({{ data.value }})
        </span>
      </template>
    </yh-cascader>
  </div>
</DemoBlock>

## Large Data Optimization

Enable `virtual` for virtual scrolling. Handles tens of thousands of nodes with smooth interaction.

<DemoBlock title="Virtual Scroll" :ts-code="tsBigData" :js-code="toJs(tsBigData)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v9" :options="bigData" virtual placeholder="Virtual display (2500 nodes)" />
  </div>
</DemoBlock>

## Use in Nuxt

The Cascader component fully supports SSR rendering in Nuxt 3/4. Components are auto-imported in Nuxt projects.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-cascader v-model="nuxtCascader" :options="nuxtOptions" placeholder="Nuxt Auto Import" />
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Basic cascading level display fully supported
- ✅ Multiple select and collapsed tags supported
- ✅ Select any level (check-strictly) works in SSR
- ✅ Search filter auto-enables after client activation
- ✅ Virtual scroll supports initial render
- 💡 Dropdown menus render via Teleport, not interfering with server-generated HTML

::: tip SSR Safety
Cascader's recursive node system is deeply optimized for SSR, ensuring strong consistency between server and client-generated node IDs and structures, effectively preventing hydration conflicts.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number \| (string \| number)[] \| (string \| number)[][]` | — |
| options | Data source of options | `CascaderOption[]` | `[]` |
| props | Configuration options, see table below | `object` | — |
| placeholder | Input placeholder text | `string` | — |
| disabled | Whether disabled | `boolean` | `false` |
| clearable | Whether clearable | `boolean` | `false` |
| size | Size | `'large' \| 'default' \| 'small'` | `'default'` |
| filterable | Whether search filter is supported | `boolean` | `false` |
| filter-method | Custom filter method | `(node: CascaderOption, keyword: string) => boolean` | — |
| separator | Option path separator | `string` | `' / '` |
| show-all-levels | Whether to show full path labels | `boolean` | `true` |
| multiple | Whether multi-select is enabled | `boolean` | `false` |
| check-strictly | Whether to allow selecting any level node | `boolean` | `false` |
| expand-trigger | Sub-menu expand trigger | `'click' \| 'hover'` | `'click'` |
| emit-path | Whether to return path array when selection changes | `boolean` | `true` |
| collapse-tags | Whether to collapse tags in multi-select | `boolean` | `false` |
| collapse-tags-tooltip | Whether to show tooltip for collapsed tags | `boolean` | `false` |
| max-collapse-tags | Max visible tags before collapsing | `number` | `1` |
| virtual | Whether to enable virtual scroll | `boolean` | `false` |
| virtual-item-height | Virtual scroll item height | `number` | `34` |
| popper-class | Dropdown custom class | `string` | — |
| teleported | Whether to mount dropdown to body | `boolean` | `true` |
| tag-type | Multi-select tag type | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| validate-event | Whether to trigger form validation on input | `boolean` | `true` |

### CascaderOption

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Option value | `string \| number` | — |
| label | Option label | `string` | — |
| children | Child options array | `CascaderOption[]` | — |
| disabled | Whether disabled | `boolean` | `false` |
| leaf | Whether leaf node | `boolean` | — |

### Cascader Config (props)

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| expandTrigger | Sub-menu expand trigger | `'click' \| 'hover'` | `'click'` |
| multiple | Whether multi-select | `boolean` | `false` |
| checkStrictly | Whether to allow selecting any level | `boolean` | `false` |
| emitPath | Whether to return path array | `boolean` | `true` |
| value | Property name for option value | `string` | `'value'` |
| label | Property name for option label | `string` | `'label'` |
| children | Property name for child options | `string` | `'children'` |
| disabled | Property name for disabled state | `string` | `'disabled'` |
| leaf | Property name for leaf node | `string` | `'leaf'` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when selection changes | `(value: any) => void` |
| expand-change | Triggered when expanded node changes | `(value: any[]) => void` |
| visible-change | Triggered when dropdown shows/hides | `(visible: boolean) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered when clear button is clicked | — |

### Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Custom node content | `{ node: CascaderOption, data: CascaderOption }` |
| empty | Content when no matching data | — |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |
| getCheckedNodes | Get currently checked node objects | `(leafOnly?: boolean) => CascaderOption[]` |
| inputRef | Input DOM reference | `HTMLInputElement` |

### Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-cascader-height` | Cascader height | `32px` |
| `--yh-cascader-bg-color` | Background color | `var(--yh-fill-color-blank)` |
| `--yh-cascader-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-cascader-border-color-hover` | Hover border color | `var(--yh-border-color-hover)` |
| `--yh-cascader-border-color-focus` | Focus border color | `var(--yh-color-primary)` |
| `--yh-cascader-text-color` | Text color | `var(--yh-text-color-regular)` |
| `--yh-cascader-placeholder-color` | Placeholder color | `var(--yh-text-color-placeholder)` |
| `--yh-cascader-node-height` | Option node height | `34px` |
| `--yh-cascader-node-bg-color-hover` | Option hover background | `var(--yh-fill-color-light)` |
| `--yh-cascader-node-bg-color-active` | Option active background | `var(--yh-fill-color-light)` |
| `--yh-cascader-node-text-color-active` | Option active text color | `var(--yh-color-primary)` |
| `--yh-cascader-menu-min-width` | Menu min width | `180px` |
| `--yh-cascader-menu-max-height` | Menu max height | `274px` |

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
