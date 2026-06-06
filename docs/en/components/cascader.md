# Cascader

When a dataset has a clear hierarchical structure such as regions, departments, categories, or resource trees, use `YhCascader` for step-by-step selection.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

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

const customFieldData = [
  {
    code: 'res', name: 'Resource Library',
    sub: [
      { code: 'img', name: 'Image Area' },
      { code: 'video', name: 'Video Area' }
    ]
  },
  {
    code: 'doc', name: 'Document Library',
    sub: [
      { code: 'pdf', name: 'PDF Document' },
      { code: 'word', name: 'Word Document' }
    ]
  }
]

const v1 = ref([])
const v2 = ref([])
const v3 = ref([])
const v4 = ref(['zhejiang', 'hangzhou', 'xihu'])
const v5 = ref([])
const v6 = ref([
  ['zhejiang', 'hangzhou', 'binjiang'],
  ['jiangsu', 'nanjing', 'xuanwu']
])
const v8 = ref([])
const v9 = ref([])
const v10 = ref([])
const v11 = ref('xihu')
const v12 = ref([])
const nuxtCascader = ref([])

const bigData = Array.from({ length: 40 }).map((_, i) => ({
  value: `group-${i}`, label: `Monitor Group ${i + 1}`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: `point-${i}-${j}`, label: `Device Node ${i + 1}-${j + 1}`
  }))
}))

const codeRegionData = `const options = [
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

const tsBasic = `<${_T}>
  <yh-cascader v-model="value" :options="options" placeholder="Select a region" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${codeRegionData}
</${_S}>`

const tsInitValue = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="value1" :options="options" placeholder="Single selection" />
    <yh-cascader v-model="value2" :options="options" multiple placeholder="Multiple selection" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value2 = ref([
  ['zhejiang', 'hangzhou', 'binjiang'],
  ['jiangsu', 'nanjing', 'xuanwu']
])

${codeRegionData}
</${_S}>`

const tsDisabled = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="value1" :options="options1" disabled placeholder="Fully disabled" />
    <yh-cascader v-model="value2" :options="options2" placeholder="Option disabled" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value2 = ref([])

const options1 = [
  {
    value: 'zhejiang', label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou', label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake District' }]
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
</${_S}>`

const tsMultiple = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    multiple
    collapse-tags
    placeholder="Select multiple departments"
  />
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const tsStrictly = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    check-strictly
    placeholder="Select any level"
  />
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const tsEmitPath = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    :emit-path="false"
    placeholder="Return leaf value only"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('xihu')
${codeRegionData}
</${_S}>`

const tsFilterable = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    filterable
    placeholder="Search Hangzhou or West Lake"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${codeRegionData}
</${_S}>`

const tsSlot = `<${_T}>
  <yh-cascader v-model="value" :options="options" placeholder="Custom node content">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.children?.length" style="color: #999; margin-left: 8px; font-size: 12px;">
        ({{ data.value }})
      </span>
    </template>
  </yh-cascader>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${codeRegionData}
</${_S}>`

const tsCustomProps = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    :props="{ value: 'code', label: 'name', children: 'sub' }"
    placeholder="Custom field names"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    code: 'res', name: 'Resource Library',
    sub: [
      { code: 'img', name: 'Image Area' },
      { code: 'video', name: 'Video Area' }
    ]
  },
  {
    code: 'doc', name: 'Document Library',
    sub: [
      { code: 'pdf', name: 'PDF Document' },
      { code: 'word', name: 'Word Document' }
    ]
  }
]
</${_S}>`

const tsVirtual = `<${_T}>
  <yh-cascader v-model="value" :options="options" virtual placeholder="Virtual list for large data" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = Array.from({ length: 40 }).map((_, i) => ({
  value: \`group-\${i}\`, label: \`Monitor Group \${i + 1}\`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: \`point-\${i}-\${j}\`, label: \`Device Node \${i + 1}-\${j + 1}\`
  }))
}))
</${_S}>`

const tsNuxt = `<${_T}>
  <yh-cascader v-model="value" :options="options" placeholder="Nuxt auto import" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'guide', label: 'Guide',
    children: [
      { value: 'design', label: 'Design Principles' },
      { value: 'nav', label: 'Navigation' }
    ]
  }
]
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsInitValue = toJs(tsInitValue)
const jsDisabled = toJs(tsDisabled)
const jsMultiple = toJs(tsMultiple)
const jsStrictly = toJs(tsStrictly)
const jsEmitPath = toJs(tsEmitPath)
const jsFilterable = toJs(tsFilterable)
const jsSlot = toJs(tsSlot)
const jsCustomProps = toJs(tsCustomProps)
const jsVirtual = toJs(tsVirtual)
const jsNuxt = toJs(tsNuxt)
</script>

## Basic Usage

Use `v-model` with hierarchical `options` data for the standard single-select path mode.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v1" :options="regionData" placeholder="Select a region" />
  </div>
</DemoBlock>

## Initial Value

As long as the `v-model` value shape matches the current `emit-path` mode, the component can display the initial selection for both single and multiple selection.

<DemoBlock title="Initial Value" :ts-code="tsInitValue" :js-code="jsInitValue">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="v4" :options="regionData" placeholder="Single selection" />
    <yh-cascader v-model="v6" :options="regionData" multiple placeholder="Multiple selection" />
  </div>
</DemoBlock>

## Disabled

You can disable the entire component or mark specific options as disabled in the option tree.

<DemoBlock title="Disabled" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="v4" :options="regionData" disabled placeholder="Fully disabled" />
    <yh-cascader v-model="v5" :options="categoryData" placeholder="Option disabled" />
  </div>
</DemoBlock>

## Multiple Selection

Enable `multiple` for multi-select and combine it with `collapse-tags` to reduce the displayed tag count.

<DemoBlock title="Multiple Selection" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="max-width: 400px;">
    <yh-cascader v-model="v2" :options="orgData" multiple collapse-tags placeholder="Select multiple departments" />
  </div>
</DemoBlock>

## Check Strictly

When `check-strictly` is enabled, parent and child nodes can be selected independently.

<DemoBlock title="Check Strictly" :ts-code="tsStrictly" :js-code="jsStrictly">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v3" :options="orgData" check-strictly placeholder="Select any level" />
  </div>
</DemoBlock>

## Leaf Value Mode

By default, the component returns the full path. Set `emit-path="false"` to return only the selected leaf value.

<DemoBlock title="Leaf Value Mode" :ts-code="tsEmitPath" :js-code="jsEmitPath">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v11" :options="regionData" :emit-path="false" placeholder="Return leaf value only" />
    <p class="demo-res">Value: <code>{{ v11 }}</code></p>
  </div>
</DemoBlock>

## Filterable

Enable `filterable` to search against the joined path label. You can also provide `filter-method` for custom matching logic.

<DemoBlock title="Filterable" :ts-code="tsFilterable" :js-code="jsFilterable">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v8" :options="regionData" filterable placeholder="Search Hangzhou or West Lake" />
  </div>
</DemoBlock>

## Custom Node Content

Use the default slot to customize how each node is rendered in the dropdown panel.

<DemoBlock title="Custom Node Content" :ts-code="tsSlot" :js-code="jsSlot">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v10" :options="regionData" placeholder="Custom node content">
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.children?.length" style="color: #999; margin-left: 8px; font-size: 12px;">
          ({{ data.value }})
        </span>
      </template>
    </yh-cascader>
  </div>
</DemoBlock>

## Custom Field Mapping

If your option data does not use `value / label / children`, map the field names with the `props` option.

<DemoBlock title="Custom Field Mapping" :ts-code="tsCustomProps" :js-code="jsCustomProps">
  <div style="max-width: 320px;">
    <yh-cascader
      v-model="v12"
      :options="customFieldData"
      :props="{ value: 'code', label: 'name', children: 'sub' }"
      placeholder="Custom field names"
    />
  </div>
</DemoBlock>

## Virtual List

Enable `virtual` to render large cascader datasets more efficiently.

<DemoBlock title="Virtual List" :ts-code="tsVirtual" :js-code="jsVirtual">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v9" :options="bigData" virtual placeholder="Virtual list for large data" />
  </div>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, you can use `YhCascader` directly in Nuxt 3/4. The input shell and selected values render in SSR, while the dropdown panel is displayed on the client through `Teleport`.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-cascader v-model="nuxtCascader" :options="[{ value: 'guide', label: 'Guide', children: [{ value: 'design', label: 'Design Principles' }] }]" placeholder="Nuxt auto import" />
  </div>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Bound value | `string \| number \| (string \| number)[] \| (string \| number)[][]` | `undefined` |
| `options` | Option tree data | `YhCascaderOption[]` | `undefined` |
| `placeholder` | Placeholder text | `string` | `undefined` |
| `disabled` | Disable the component | `boolean` | `false` |
| `clearable` | Show clear button on hover when a value exists | `boolean` | `false` |
| `size` | Component size | `'large' \| 'default' \| 'small'` | `undefined` |
| `filterable` | Enable client-side filtering | `boolean` | `false` |
| `filter-method` | Custom filter function | `(node: YhCascaderOption, keyword: string) => boolean` | `undefined` |
| `separator` | Path separator text | `string` | `' / '` |
| `show-all-levels` | Show the full label path in single-select mode and tags | `boolean` | `true` |
| `collapse-tags` | Collapse tags in multiple mode | `boolean` | `false` |
| `collapse-tags-tooltip` | Reserved collapse tooltip flag | `boolean` | `false` |
| `max-collapse-tags` | Maximum visible tags before collapsing | `number` | `1` |
| `multiple` | Enable multiple selection | `boolean` | `false` |
| `check-strictly` | Allow parent and child nodes to be selected independently | `boolean` | `false` |
| `expand-trigger` | Node expansion trigger | `'click' \| 'hover'` | `undefined` |
| `emit-path` | Return full path instead of leaf value | `boolean` | `true` |
| `virtual` | Enable virtual rendering in the panel | `boolean` | `false` |
| `virtual-item-height` | Virtual row height | `number` | `34` |
| `props` | Field mapping and cascader config | `Partial<CascaderConfig>` | `undefined` |
| `popper-class` | Extra class name for the dropdown panel | `string` | `undefined` |
| `teleported` | Teleport the dropdown to `body` | `boolean` | `true` |
| `tag-type` | Tag style in multiple mode | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| `validate-event` | Trigger form validation on value changes and blur | `boolean` | `true` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### YhCascaderOption

| Field | Description | Type |
| --- | --- | --- |
| `value` | Node value | `string \| number` |
| `label` | Node label | `string` |
| `children` | Child nodes | `YhCascaderOption[] \| undefined` |
| `disabled` | Disable the current node | `boolean \| undefined` |
| `leaf` | Mark the current node as a leaf | `boolean \| undefined` |

### CascaderConfig

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| `expandTrigger` | Node expansion trigger | `'click' \| 'hover'` | `'click'` |
| `multiple` | Enable multiple selection | `boolean` | `false` |
| `checkStrictly` | Allow independent parent and child selection | `boolean` | `false` |
| `emitPath` | Return the full path value | `boolean` | `true` |
| `lazy` | Lazy load child options | `boolean` | `false` |
| `lazyLoad` | Lazy load callback | `(node: YhCascaderOption, resolve: (children: YhCascaderOption[]) => void) => void` | `undefined` |
| `value` | Value field name | `string` | `'value'` |
| `label` | Label field name | `string` | `'label'` |
| `children` | Children field name | `string` | `'children'` |
| `disabled` | Disabled field name | `string` | `'disabled'` |
| `leaf` | Leaf field name | `string` | `'leaf'` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the bound value changes | `(value: string \| number \| (string \| number)[] \| (string \| number)[][] \| undefined) => void` |
| `change` | Triggered after the selection changes | `(value: string \| number \| (string \| number)[] \| (string \| number)[][] \| undefined) => void` |
| `focus` | Triggered when the input receives focus | `(event: FocusEvent) => void` |
| `blur` | Triggered when the input loses focus | `(event: FocusEvent) => void` |
| `clear` | Triggered when the clear icon is clicked | `() => void` |
| `expand-change` | Triggered when the expanded path changes | `(value: (string \| number)[]) => void` |
| `visible-change` | Triggered when the dropdown opens or closes | `(visible: boolean) => void` |

### Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Custom node content | `{ node: YhCascaderOption, data: YhCascaderOption }` |
| `empty` | Content shown when filtering returns no matches | - |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `focus` | Focus the input element | `() => void` |
| `blur` | Blur the input element | `() => void` |
| `getCheckedNodes` | Get the selected option nodes | `(leafOnly?: boolean) => YhCascaderOption[]` |
| `inputRef` | Input element ref | `Ref<HTMLInputElement \| undefined>` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhCascaderProps` | Props type for `YhCascader` |
| `YhCascaderEmits` | Emits type for `YhCascader` |
| `YhCascaderExpose` | Expose type for `YhCascader` |
| `YhCascaderOption` | Cascader option node type |
| `YhCascaderInstance` | Public instance type for `YhCascader` |
| `YhCascaderPanelInstance` | Public instance type for `YhCascaderPanel` |

### Theme Variables

`YhCascader` supports `themeOverrides` and consumes the following CSS variables in its component styles.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-cascader-height` | Default input height | `32px` |
| `--yh-cascader-height-large` | Large size height | `40px` |
| `--yh-cascader-height-small` | Small size height | `24px` |
| `--yh-cascader-bg-color` | Input background color | `var(--yh-fill-color-blank, #fff)` |
| `--yh-cascader-border-color` | Input border color | `var(--yh-border-color, #dcdfe6)` |
| `--yh-cascader-border-color-hover` | Hover border color | `var(--yh-border-color-hover, #c0c4cc)` |
| `--yh-cascader-border-color-focus` | Focus border color | `var(--yh-color-primary, #409eff)` |
| `--yh-cascader-border-radius` | Border radius | `var(--yh-border-radius-base, 4px)` |
| `--yh-cascader-text-color` | Input text color | `var(--yh-text-color-regular, #606266)` |
| `--yh-cascader-placeholder-color` | Placeholder color | `var(--yh-text-color-placeholder, #a8abb2)` |
| `--yh-cascader-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-cascader-disabled-text-color` | Disabled text color | `var(--yh-text-color-placeholder, #a8abb2)` |
| `--yh-cascader-node-height` | Panel node height | `34px` |
| `--yh-cascader-node-bg-color-hover` | Node hover background | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-cascader-node-text-color-hover` | Node hover text color | `var(--yh-text-color-regular, #606266)` |
| `--yh-cascader-node-bg-color-active` | Active node background | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-cascader-node-text-color-active` | Active node text color | `var(--yh-color-primary, #409eff)` |
| `--yh-cascader-dropdown-bg-color` | Dropdown background color | `var(--yh-bg-color-overlay, #fff)` |
| `--yh-cascader-dropdown-border-color` | Dropdown border color | `var(--yh-border-color-light, #e4e7ed)` |
| `--yh-cascader-dropdown-shadow` | Dropdown shadow | `var(--yh-box-shadow-light, 0 2px 12px 0 rgba(0, 0, 0, 0.1))` |
| `--yh-cascader-menu-min-width` | Minimum panel width | `180px` |
| `--yh-cascader-menu-max-height` | Maximum panel height | `274px` |
| `--yh-cascader-menu-border-color` | Panel separator color | `var(--yh-border-color-light, #e4e7ed)` |

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
