# Transfer

`YhTransfer` moves items between two lists and is suitable for permission assignment, role binding, and dual-list selection workflows.

<script setup lang="ts">
import { ref } from 'vue'
import type { TransferData } from '@yh-ui/components'

const scriptClose = '</' + 'script>'

const basicValue = ref([2, 4])
const basicData: TransferData[] = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' }
]

const filterValue = ref<number[]>([])
const filterMethod = (query: string, item: TransferData) =>
  item.label.toLowerCase().includes(query.toLowerCase())

const aliasValue = ref([102])
const aliasData = [
  { id: 101, name: 'R&D Dept' },
  { id: 102, name: 'Marketing Dept' },
  { id: 103, name: 'HR Dept', unavailable: true },
  { id: 104, name: 'Finance Dept' }
]

const slotValue = ref<number[]>([])

const virtualValue = ref<number[]>([])
const virtualData: TransferData[] = Array.from({ length: 300 }).map((_, index) => ({
  key: index + 1,
  label: `Option ${index + 1}`,
  disabled: index % 6 === 0
}))

const tsBasic = [
  `<template>`,
  `  <yh-transfer v-model="value" :data="data" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([2, 4])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'California' },`,
  `  { key: 2, label: 'Illinois' },`,
  `  { key: 3, label: 'Maryland', disabled: true },`,
  `  { key: 4, label: 'Texas' }`,
  `]`,
  scriptClose
].join('\n')

const tsFilter = [
  `<template>`,
  `  <yh-transfer`,
  `    v-model="value"`,
  `    :data="data"`,
  `    filterable`,
  `    filter-placeholder="Search options"`,
  `    :filter-method="filterMethod"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'California' },`,
  `  { key: 2, label: 'Illinois' },`,
  `  { key: 3, label: 'Maryland' }`,
  `]`,
  ``,
  `const filterMethod = (query: string, item: TransferData) =>`,
  `  item.label.toLowerCase().includes(query.toLowerCase())`,
  scriptClose
].join('\n')

const tsAlias = [
  `<template>`,
  `  <yh-transfer`,
  `    v-model="value"`,
  `    :data="data"`,
  `    :props="{ key: 'id', label: 'name', disabled: 'unavailable' }"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  ``,
  `const value = ref([102])`,
  `const data = [`,
  `  { id: 101, name: 'R&D Dept' },`,
  `  { id: 102, name: 'Marketing Dept' },`,
  `  { id: 103, name: 'HR Dept', unavailable: true },`,
  `  { id: 104, name: 'Finance Dept' }`,
  `]`,
  scriptClose
].join('\n')

const tsSlots = [
  `<template>`,
  `  <yh-transfer v-model="value" :data="data">`,
  `    <template #default="{ option }">`,
  `      <span>{{ option.key }} - {{ option.label }}</span>`,
  `    </template>`,
  `    <template #left-footer>`,
  `      <div style="padding: 8px; text-align: center;">Source footer</div>`,
  `    </template>`,
  `    <template #right-footer>`,
  `      <div style="padding: 8px; text-align: center;">Target footer</div>`,
  `    </template>`,
  `  </yh-transfer>`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'Option 1' },`,
  `  { key: 2, label: 'Option 2' }`,
  `]`,
  scriptClose
].join('\n')

const tsVirtual = [
  `<template>`,
  `  <yh-transfer`,
  `    v-model="value"`,
  `    :data="data"`,
  `    virtual`,
  `    :height="320"`,
  `    :item-height="40"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([])`,
  `const data: TransferData[] = Array.from({ length: 300 }).map((_, index) => ({`,
  `  key: index + 1,`,
  `  label: 'Option ' + (index + 1),`,
  `  disabled: index % 6 === 0`,
  `}))`,
  scriptClose
].join('\n')

const tsNuxt = [
  `<template>`,
  `  <yh-transfer v-model="value" :data="data" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([2])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'Nuxt 2' },`,
  `  { key: 2, label: 'Nuxt 3' },`,
  `  { key: 3, label: 'Nuxt 4' }`,
  `]`,
  scriptClose
].join('\n')
</script>

## Basic Usage

<DemoBlock title="Basic Usage" :ts-code="tsBasic">
  <yh-transfer v-model="basicValue" :data="basicData" />
</DemoBlock>

## Filtering

Enable `filterable` to show a search box in each panel header, and use `filter-method` when you need custom matching logic.

<DemoBlock title="Filtering" :ts-code="tsFilter">
  <yh-transfer
    v-model="filterValue"
    :data="basicData"
    filterable
    filter-placeholder="Search options"
    :filter-method="filterMethod"
  />
</DemoBlock>

## Field Mapping

When your business data does not use the default `key`, `label`, or `disabled` fields, configure aliases through `props`.

<DemoBlock title="Field Mapping" :ts-code="tsAlias">
  <yh-transfer
    v-model="aliasValue"
    :data="aliasData"
    :props="{ key: 'id', label: 'name', disabled: 'unavailable' }"
  />
</DemoBlock>

## Custom Content and Footer Slots

Use the default item slot and the header / empty / footer slots on both panels for richer business-side layouts and actions. The declared `render-content` prop is not currently consumed by the runtime template.

<DemoBlock title="Custom Content and Footer Slots" :ts-code="tsSlots">
  <yh-transfer v-model="slotValue" :data="basicData">
    <template #default="{ option }">
      <span>{{ option.key }} - {{ option.label }}</span>
    </template>
    <template #left-footer>
      <div style="padding: 8px; text-align: center;">Source footer</div>
    </template>
    <template #right-footer>
      <div style="padding: 8px; text-align: center;">Target footer</div>
    </template>
  </yh-transfer>
</DemoBlock>

## Virtual Scrolling

For large datasets, enable `virtual` and tune the panel window with `height` and `item-height`.

<DemoBlock title="Virtual Scrolling" :ts-code="tsVirtual">
  <yh-transfer
    v-model="virtualValue"
    :data="virtualData"
    virtual
    :height="320"
    :item-height="40"
  />
</DemoBlock>

## Use in Nuxt

After enabling the YH-UI Nuxt module, `YhTransfer` can be used directly in pages and components. List data, default selected keys, and custom titles can render during SSR, while checkbox selection, filtering, and move actions continue after client hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt">
  <yh-transfer v-model="basicValue" :data="basicData" />
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Keys currently placed in the target list | `TransferKey[]` | `[]` |
| `data` | Data source | `TransferData[]` | `[]` |
| `filterable` | Whether filtering is enabled | `boolean` | `false` |
| `filter-method` | Custom filter function | `(query: string, item: TransferData) => boolean` | `undefined` |
| `filter-placeholder` | Search input placeholder; falls back to locale text when omitted | `string` | `undefined` |
| `target-order` | Ordering strategy for the target list | `'original' \| 'push' \| 'unshift'` | `'original'` |
| `titles` | Title array for the two panels | `string[]` | `[]` |
| `button-texts` | Text array for the middle action buttons | `string[]` | `[]` |
| `render-content` | Declared custom item render function. It is passed down to the panel, but the current panel template does not consume it | `(h, data) => VNode \| string` | `undefined` |
| `left-default-checked` | Initially checked keys in the left panel | `TransferKey[]` | `[]` |
| `right-default-checked` | Initially checked keys in the right panel | `TransferKey[]` | `[]` |
| `props` | Field alias mapping | `{ key?: string; label?: string; disabled?: string }` | `undefined` |
| `disabled` | Whether the whole component is disabled | `boolean` | `false` |
| `size` | Component size | `'large' \| 'default' \| 'small'` | `'default'` |
| `validate-event` | Compatibility prop. The current transfer implementation does not consume it to emit form validation events | `boolean` | `true` |
| `virtual` | Whether virtual scrolling is enabled | `boolean` | `false` |
| `item-height` | Row height in virtual mode | `number` | `40` |
| `height` | Panel height | `number` | `280` |
| `left-title` | Left panel title | `string` | `undefined` |
| `right-title` | Right panel title | `string` | `undefined` |
| `show-all-checkbox` | Declared select-all visibility prop. The current panel header still renders the select-all entry regardless of this value | `boolean` | `true` |
| `empty-text` | Shared empty-state text for both panels | `string` | `undefined` |
| `left-empty-text` | Empty-state text for the left panel | `string` | `undefined` |
| `right-empty-text` | Empty-state text for the right panel | `string` | `undefined` |
| `theme-overrides` | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when target keys change | `(value: TransferKey[])` |
| `change` | Triggered after items move left or right | `(value: TransferKey[], direction: 'left' \| 'right', movedKeys: TransferKey[])` |
| `left-check-change` | Triggered when checked keys change in the left panel | `(value: TransferKey[], movedKeys?: TransferKey[])` |
| `right-check-change` | Triggered when checked keys change in the right panel | `(value: TransferKey[], movedKeys?: TransferKey[])` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| `default` | Custom list item content | `{ option: TransferData }` |
| `buttons` | Custom middle action area | `{ moveToLeft: () => void; moveToRight: () => void; leftChecked: TransferKey[]; rightChecked: TransferKey[] }` |
| `left-header` | Left panel header content | `-` |
| `right-header` | Right panel header content | `-` |
| `left-empty` | Left panel empty content | `-` |
| `right-empty` | Right panel empty content | `-` |
| `left-footer` | Left panel footer content | `-` |
| `right-footer` | Right panel footer content | `-` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `clearLeftChecked` | Clears checked state in the left panel | `() => void` |
| `clearRightChecked` | Clears checked state in the right panel | `() => void` |
| `leftPanel` | Left panel instance ref | `Ref<TransferPanelExpose \| undefined>` |
| `rightPanel` | Right panel instance ref | `Ref<TransferPanelExpose \| undefined>` |

### Theme Variables

`YhTransfer` supports `themeOverrides`, but it does not currently expose dedicated component-scoped CSS variables. It mainly consumes global theme tokens and text / border colors.

### Type Exports

| Name | Description |
| --- | --- |
| `YhTransferProps` | Props type for `YhTransfer` |
| `YhTransferEmits` | Emits type for `YhTransfer` |
| `YhTransferExpose` | Expose type for `YhTransfer` |
| `YhTransferPanelExpose` | Expose type for the transfer panel |
| `YhTransferInstance` | Public transfer instance type |
| `YhTransferPanelInstance` | Public panel instance type |
| `TransferData` | Data item type |
| `TransferKey` | Key type for transfer items |
| `TransferDirection` | Direction type for move operations |
| `TransferSize` | Size type |
| `TransferPropsAlias` | Field alias config type |
| `TransferFilterMethod` | Filter function type |
| `TransferRenderContent` | Custom render function type |
