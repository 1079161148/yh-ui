# Transfer

Move items from one list to another. Commonly used in scenarios like permission assignment, role binding, etc.

<script setup lang="ts">
import { ref, h } from 'vue'

// --- Helper macro: convert TS code to JS code ---
const toJs = (ts: string) => ts.replace(' lang="ts"', '').replace(' setup lang="ts"', ' setup')

// ==============================
// Demo Data Definitions
// ==============================

const basicValue = ref([1, 4])
const basicData = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]

const filterValue = ref([])
const filterData = [...basicData]
const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

const customValue = ref([])
const customData = [
  { key: 1, label: 'Option 1' },
  { key: 2, label: 'Option 2' },
  { key: 3, label: 'Option 3' }
]

const aliasValue = ref([102])
const aliasProps = { key: 'id', label: 'name', disabled: 'unavailable' }
const aliasData = [
  { id: 101, name: 'R&D Dept' },
  { id: 102, name: 'Marketing Dept' },
  { id: 103, name: 'HR Dept', unavailable: true },
  { id: 104, name: 'Finance Dept' }
]

const slotValue = ref([])
const slotValue2 = ref([])
const renderContent = (h: any, option: any) => {
  return h('span', null, option.key + ' - ' + option.label)
}

const virtualValue = ref([])
const virtualData = Array.from({ length: 2000 }).map((_, i) => ({
  key: i,
  label: 'Option ' + i,
  disabled: i % 4 === 0
}))

const btnValue = ref([])
const btnData = [
  { key: 1, label: 'Item A' },
  { key: 2, label: 'Item B' },
  { key: 3, label: 'Item C' }
]

// Nuxt Usage
const nuxtValue = ref([2])
const nuxtData = [
  { key: 1, label: 'Nuxt 2' },
  { key: 2, label: 'Nuxt 3' },
  { key: 3, label: 'Nuxt 4' }
]

const tsNuxt = `<template>
  <div style="max-width: 600px;">
    <!-- Components are auto-imported in Nuxt -->
    <yh-transfer v-model="nuxtValue" :data="nuxtData" />
  </div>
<\/template>

<script setup lang="ts">
// No need to manually import YhTransfer
const nuxtValue = ref([2])
const nuxtData = [
  { key: 1, label: 'Nuxt 2' },
  { key: 2, label: 'Nuxt 3' },
  { key: 3, label: 'Nuxt 4' }
]
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// ==============================
// Demo Code Sample Definitions
// ==============================

const tsBasic = `<template>
  <yh-transfer v-model="value" :data="data" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([1, 4])
const data = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]
<\/script>`

const tsFilter = `<template>
  <yh-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="data"
  />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]

const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}
<\/script>`

const tsCustom = `<template>
  <yh-transfer
    v-model="value"
    :data="data"
    :titles="['Source', 'Target']"
    :button-texts="['To Left', 'To Right']"
  >
    <template #left-footer>
      <div class="transfer-footer">Source Footer</div>
    <\/template>
    <template #right-footer>
      <div class="transfer-footer">Target Footer</div>
    <\/template>
  </yh-transfer>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = [
  { key: 1, label: 'Option 1' },
  { key: 2, label: 'Option 2' },
  { key: 3, label: 'Option 3' }
]
<\/script>

<style>
.transfer-footer {
  text-align: center;
  padding: 5px;
  font-size: 12px;
  color: #909399;
}
<\/style>`

const tsAlias = `<template>
  <yh-transfer
    v-model="value"
    :props="{
      key: 'id',
      label: 'name',
      disabled: 'unavailable'
    }"
    :data="data"
  />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([102])
const data = [
  { id: 101, name: 'R&D Dept' },
  { id: 102, name: 'Marketing Dept' },
  { id: 103, name: 'HR Dept', unavailable: true },
  { id: 104, name: 'Finance Dept' }
]
<\/script>`

const tsSlot = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- Default Slot -->
    <yh-transfer v-model="value" :data="data">
      <template #default="{ option }">
        <span style="color: #409eff; font-weight: bold;">{{ option.key }}</span>
        <span> - {{ option.label }}</span>
      <\/template>
    </yh-transfer>

    <!-- Render Content -->
    <yh-transfer v-model="value2" :data="data" :render-content="renderContent" />
  </div>
<\/template>

<script setup lang="ts">
import { ref, h } from 'vue'

const value = ref([])
const value2 = ref([])
const data = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]

const renderContent = (h, option) => {
  return h('span', null, \`\${option.key} - \${option.label}\`)
}
<\/script>`

const tsVirtual = `<template>
  <yh-transfer
    v-model="value"
    virtual
    :data="data"
    :height="300"
    :item-height="32"
  />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const generateData = () => {
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      key: i,
      label: 'Option ' + i,
      disabled: i % 4 === 0
    })
  }
  return data
}
const data = generateData()
<\/script>`

const tsBtn = `<template>
  <yh-transfer v-model="value" :data="data">
    <template #buttons="{ moveToLeft, moveToRight, leftChecked, rightChecked }">
      <div class="custom-buttons">
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="leftChecked.length === 0" 
          @click="moveToRight"
        >
          Add <yh-icon name="arrow-right" />
        </yh-button>
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="rightChecked.length === 0" 
          @click="moveToLeft"
        >
          <yh-icon name="arrow-left" /> Remove
        </yh-button>
      </div>
    <\/template>
  </yh-transfer>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = [
  { key: 1, label: 'Item A' },
  { key: 2, label: 'Item B' },
  { key: 3, label: 'Item C' }
]
<\/script>

<style>
.custom-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
<\/style>`

</script>

## Basic Usage

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-transfer v-model="basicValue" :data="basicData" />
</DemoBlock>

## Searchable

<DemoBlock title="Searchable" :ts-code="tsFilter" :js-code="toJs(tsFilter)">
  <yh-transfer
    v-model="filterValue"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="filterData"
  />
</DemoBlock>

## Custom Labels and Footers

<DemoBlock title="Custom Labels" :ts-code="tsCustom" :js-code="toJs(tsCustom)">
  <yh-transfer
    v-model="customValue"
    :data="customData"
    :titles="['Source', 'Target']"
    :button-texts="['To Left', 'To Right']"
  >
    <template #left-footer>
      <div class="transfer-footer">Source Footer</div>
    </template>
    <template #right-footer>
      <div class="transfer-footer">Target Footer</div>
    </template>
  </yh-transfer>
</DemoBlock>

## Field Mapping Alias

<DemoBlock title="Field Mapping" :ts-code="tsAlias" :js-code="toJs(tsAlias)">
  <yh-transfer 
    v-model="aliasValue" 
    :props="aliasProps" 
    :data="aliasData" 
  />
</DemoBlock>

## Customizing Content

<DemoBlock title="Content Customization" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-transfer v-model="slotValue" :data="basicData">
      <template #default="{ option }">
        <span style="color: #409eff; font-weight: bold;">{{ option.key }}</span>
        <span> - {{ option.label }}</span>
      </template>
    </yh-transfer>
    <yh-transfer v-model="slotValue2" :data="basicData" :render-content="renderContent" />
  </div>
</DemoBlock>

## Virtual Scrolling

<DemoBlock title="Virtual Scrolling" :ts-code="tsVirtual" :js-code="toJs(tsVirtual)">
  <yh-transfer
    v-model="virtualValue"
    virtual
    :data="virtualData"
    :height="300"
    :item-height="32"
  />
</DemoBlock>

## Customizing Action Buttons

<DemoBlock title="Custom Buttons" :ts-code="tsBtn" :js-code="toJs(tsBtn)">
  <yh-transfer v-model="btnValue" :data="btnData">
    <template #buttons="{ moveToLeft, moveToRight, leftChecked, rightChecked }">
      <div class="custom-buttons">
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="leftChecked.length === 0" 
          @click="moveToRight"
        >
          Add <yh-icon name="arrow-right" />
        </yh-button>
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="rightChecked.length === 0" 
          @click="moveToLeft"
        >
          <yh-icon name="arrow-left" /> Remove
        </yh-button>
      </div>
    </template>
  </yh-transfer>
</DemoBlock>

## Usage in Nuxt

The Transfer component fully supports Nuxt 3/4 environments. During Server-Side Rendering (SSR), both panels are pre-rendered with basic HTML to ensure visibility upon first load without hydration flickering.

<DemoBlock title="Nuxt Usage" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 600px;">
    <yh-transfer v-model="nuxtValue" :data="nuxtData" />
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ Initial checked states (`modelValue`) render correctly into the right panel on the server.
- ✅ Item labels and disabled statuses support SSR.
- ✅ Virtual scrolling displays initial nodes on the first load.
- ⚠️ Button interactions, listing searches, and selection toggles activate after client-side hydration.
- 💡 Tooltips or dropdowns are handled via Teleport and don't affect the main HTML structure.

::: tip Performance
For huge datasets, the Transfer component uses optimized templates. Even without `virtual` enabled, the generated HTML structure is kept lean for optimal SSR performance.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `TransferKey[]` | `[]` |
| data | Data source | `TransferData[]` | `[]` |
| filterable | Whether list is searchable | `boolean` | `false` |
| filter-placeholder | Search input placeholder | `string` | `'Please enter keyword'` |
| filter-method | Custom search method | `(query, item) => boolean` | — |
| target-order | Order strategy for the right panel | `'original' \| 'push' \| 'unshift'` | `'original'` |
| titles | Panel titles | `[string, string]` | `['List 1', 'List 2']` |
| button-texts | Button labels | `[string, string]` | `[]` |
| render-content | Custom render function for content | `(h, option) => VNode` | — |
| props | Alias config for data source fields | `TransferPropsAlias` | — |
| left-default-checked | Default items checked on the left | `TransferKey[]` | `[]` |
| right-default-checked | Default items checked on the right | `TransferKey[]` | `[]` |
| virtual | Enable virtual scrolling | `boolean` | `false` |
| height | List height (px) | `number` | `280` |
| item-height | Row height (for virtual scrolling) | `number` | `40` |
| empty-text | Text for empty states | `string` | `'No Data'` |
| show-all-checkbox | Whether to show the "select all" checkbox | `boolean` | `true` |
| left-title | Title for the left panel | `string` | — |
| right-title | Title for the right panel | `string` | — |
| disabled | Whether disabled | `boolean` | `false` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | Triggers when the right list changes | `(value, direction, movedKeys)` |
| left-check-change | Triggers when left selection changes | `(value, movedKeys)` |
| right-check-change | Triggers when right selection changes | `(value, movedKeys)` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Custom content for data items | `{ option }` |
| left-header | Left header content | — |
| right-header | Right header content | — |
| left-footer | Left footer content | — |
| right-footer | Right footer content | — |
| left-empty | Left empty state content | — |
| right-empty | Right empty state content | — |
| buttons | Custom action buttons area | `{ moveToLeft, moveToRight, leftChecked, rightChecked }` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| clearLeftChecked | Clears left selections | `() => void` |
| clearRightChecked | Clears right selections | `() => void` |
| leftPanel | Left panel instance | `TransferPanelExpose` |
| rightPanel | Right panel instance | `TransferPanelExpose` |

## Theme Variables

| Variable Name | Default | Description |
| --- | --- | --- |
| `--yh-transfer-panel-width` | `200px` | Panel width |
| `--yh-transfer-panel-height` | `300px` | Panel height |
| `--yh-transfer-header-height` | `40px` | Header height |
| `--yh-transfer-header-bg` | `#f5f7fa` | Header background |
| `--yh-transfer-item-height` | `32px` | Row height |
| `--yh-transfer-border-color` | `#ebeef5` | Border color |

<style>
.transfer-footer {
  text-align: center;
  padding: 5px;
  font-size: 12px;
  color: #909399;
  border-top: 1px solid #ebeef5;
}
.custom-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</style>
