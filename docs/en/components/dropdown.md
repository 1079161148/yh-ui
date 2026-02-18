<script setup lang="ts">
import { ref, computed } from 'vue'

const handleCommand = (command: string) => {
  console.log('Clicked:', command)
}

const tsBasic = `<template>
  <yh-dropdown :show-arrow="false" @command="handleCommand">
    <span style="cursor: pointer; color: var(--yh-color-primary);">Dropdown Menu <yh-icon name="arrow-down" /></span>
    <template #dropdown>
      <yh-dropdown-menu>
        <yh-dropdown-item command="edit">Edit</yh-dropdown-item>
        <yh-dropdown-item command="copy">Copy</yh-dropdown-item>
        <yh-dropdown-item command="delete">Delete</yh-dropdown-item>
      </yh-dropdown-menu>
    </template>
  </yh-dropdown>
</template>

<script setup lang="ts">
const handleCommand = (command: string) => {
  console.log('Clicked:', command)
}
<\/script>`

const jsBasic = tsBasic
  .replace('lang="ts"', '')
  .replace(': string', '')

const tsItems = `<template>
  <yh-dropdown :items="items" :show-arrow="false" @command="handleCommand">
    <span style="cursor: pointer;">Quick Config Mode <yh-icon name="arrow-down" /></span>
  </yh-dropdown>
</template>

<script setup lang="ts">
const items = [
  { key: 'edit', label: 'Edit', icon: 'edit' },
  { key: 'copy', label: 'Copy', icon: 'copy' },
  { key: 'delete', label: 'Delete', icon: 'delete', divided: true }
]

const handleCommand = (command: string) => {
  console.log('Clicked:', command)
}
<\/script>`

const jsItems = tsItems
  .replace('lang="ts"', '')
  .replace(': string', '')

const tsTrigger = `<template>
  <div style="display: flex; gap: 80px;">
    <div>
      <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">hover to trigger</div>
      <yh-dropdown trigger="hover" :items="items" :show-arrow="false">
        <span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
      </yh-dropdown>
    </div>
    
    <div>
      <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">click to trigger</div>
      <yh-dropdown trigger="click" :items="items" :show-arrow="false">
        <span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
      </yh-dropdown>
    </div>
    
    <div>
      <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">right click to trigger</div>
      <yh-dropdown trigger="contextmenu" :items="items" :show-arrow="false">
        <span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
      </yh-dropdown>
    </div>
  </div>
</template>`

const jsTrigger = tsTrigger

const tsSplitButton = `<template>
  <div style="display: flex; gap: 16px;">
    <yh-dropdown 
      split-button 
      type="primary" 
      :items="splitItems"
      @click="handleClick"
      @command="handleCommand"
    >
      Dropdown List
    </yh-dropdown>
    <yh-dropdown 
      split-button 
      type="primary"
      plain
      :items="splitItems"
      @click="handleClick"
      @command="handleCommand"
    >
      Dropdown List
    </yh-dropdown>
  </div>
</template>

<script setup lang="ts">
const splitItems = [
  { key: 'save', label: 'Save' },
  { key: 'saveAs', label: 'Save As' },
  { key: 'export', label: 'Export', divided: true }
]

const handleClick = () => {
  console.log('Main button clicked')
}

const handleCommand = (command: string) => {
  console.log('Selected:', command)
}
<\/script>`

const jsSplitButton = tsSplitButton
  .replace('lang="ts"', '')
  .replace(': string', '')

const tsDisabled = `<template>
  <yh-dropdown :items="disabledItems">
    <yh-button>Contains Disabled Items</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
const disabledItems = [
  { key: 'edit', label: 'Edit' },
  { key: 'copy', label: 'Copy', disabled: true },
  { key: 'delete', label: 'Delete' }
]
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsPlacement = `<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-dropdown placement="top-start" :items="items">
      <yh-button plain>topStart</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="top" :items="items">
      <yh-button plain>top</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="top-end" :items="items">
      <yh-button plain>topEnd</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="bottom-start" :items="items">
      <yh-button plain>bottomStart</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="bottom" :items="items">
      <yh-button plain>bottom</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="bottom-end" :items="items">
      <yh-button plain>bottomEnd</yh-button>
    </yh-dropdown>
  </div>
</template>`

const jsPlacement = tsPlacement

const tsNuxt = `<template>
  <yh-dropdown :items="menuItems" @command="handleCommand">
    <yh-button type="primary">Nuxt 3/4 Ready</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
const menuItems = [
  { key: 'profile', label: 'Profile' },
  { key: 'settings', label: 'Settings' },
  { key: 'logout', label: 'Logout', divided: true }
]

const handleCommand = (command: string) => {
  // navigateTo comes from Nuxt
  navigateTo(\`/\${command}\`)
}
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '').replace(': string', '')

const items = [
  { key: 'edit', label: 'Edit', icon: 'edit' },
  { key: 'copy', label: 'Copy', icon: 'copy' },
  { key: 'delete', label: 'Delete', icon: 'delete', divided: true }
]

const splitItems = [
  { key: 'save', label: 'Save' },
  { key: 'saveAs', label: 'Save As' },
  { key: 'export', label: 'Export', divided: true }
]

const disabledItems = [
  { key: 'edit', label: 'Edit' },
  { key: 'copy', label: 'Copy', disabled: true },
  { key: 'delete', label: 'Delete' }
]

const menuItems = [
  { key: 'profile', label: 'Profile' },
  { key: 'settings', label: 'Settings' },
  { key: 'logout', label: 'Logout', divided: true }
]

const dangerItems = [
  { key: 'edit', label: 'Edit', icon: 'edit' },
  { key: 'copy', label: 'Copy', icon: 'copy' },
  { key: 'delete', label: 'Delete', icon: 'delete', danger: true, divided: true }
]

const loading = ref(false)
const loadingItems = ref<any[]>([])

const simulateLoading = async () => {
  loading.value = true
  loadingItems.value = []
  await new Promise(resolve => setTimeout(resolve, 1500))
  loadingItems.value = [
    { key: 'item1', label: 'Loaded Data 1' },
    { key: 'item2', label: 'Loaded Data 2' },
    { key: 'item3', label: 'Loaded Data 3' }
  ]
  loading.value = false
}

const checkableItems = ref([
  { key: 'status1', label: 'Pending', checked: true },
  { key: 'status2', label: 'Processing', checked: false },
  { key: 'status3', label: 'Completed', checked: true },
  { key: 'status4', label: 'Cancelled', checked: false }
])

const checkedCount = computed(() => checkableItems.value.filter(i => i.checked).length)

const handleCheck = (key: string) => {
  const item = checkableItems.value.find(i => i.key === key)
  if (item) {
    item.checked = !item.checked
  }
}

const tsDanger = `<template>
  <yh-dropdown :items="items" @command="handleCommand">
    <yh-button>Action</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
const items = [
  { key: 'edit', label: 'Edit', icon: 'edit' },
  { key: 'copy', label: 'Copy', icon: 'copy' },
  { key: 'delete', label: 'Delete', icon: 'delete', danger: true, divided: true }
]

const handleCommand = (command: string) => {
  if (command === 'delete') {
    // Perform delete action
  }
}
<\/script>`

const jsDanger = tsDanger.replace('lang="ts"', '').replace(': string', '')

const tsLoading = `<template>
  <yh-dropdown 
    :items="items" 
    :loading="loading"
    trigger="click"
    @show="loadData"
  >
    <yh-button>Click to Load Data</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const items = ref([])

const loadData = async () => {
  loading.value = true
  // Mock async loading
  await new Promise(resolve => setTimeout(resolve, 1500))
  items.value = [
    { key: 'item1', label: 'Loaded Data 1' },
    { key: 'item2', label: 'Loaded Data 2' },
    { key: 'item3', label: 'Loaded Data 3' }
  ]
  loading.value = false
}
<\/script>`

const jsLoading = tsLoading.replace('lang="ts"', '')

const tsCheckable = `<template>
  <yh-dropdown 
    :items="filterItems" 
    checkable
    :hide-on-click="false"
    @command="handleCheck"
  >
    <yh-button>
      Status Filter
      <yh-badge v-if="checkedCount > 0" :value="checkedCount" />
    </yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filterItems = ref([
  { key: 'status1', label: 'Pending', checked: true },
  { key: 'status2', label: 'Processing', checked: false },
  { key: 'status3', label: 'Completed', checked: true },
  { key: 'status4', label: 'Cancelled', checked: false }
])

const checkedCount = computed(() => 
  filterItems.value.filter(i => i.checked).length
)

const handleCheck = (key: string) => {
  const item = filterItems.value.find(i => i.key === key)
  if (item) {
    item.checked = !item.checked
  }
}
<\/script>`

const jsCheckable = tsCheckable.replace('lang="ts"', '')
</script>

# Dropdown

Collapse actions or menus into a dropdown to save interface space.

## Basic Usage

Define the dropdown menu content via the `dropdown` slot. This component supports a **Slot Fallback** mechanism: when the slot is provided, it completely customizes the menu content; when the slot is not provided, it automatically generates the menu based on the `items` data.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
<div style="padding: 10px 0;">
<yh-dropdown :show-arrow="false" @command="handleCommand">
<span style="cursor: pointer; color: var(--yh-color-primary);">Dropdown Menu <yh-icon name="arrow-down" /></span>
<template #dropdown>
<yh-dropdown-menu>
<yh-dropdown-item command="edit">Edit</yh-dropdown-item>
<yh-dropdown-item command="copy">Copy</yh-dropdown-item>
<yh-dropdown-item command="delete">Delete</yh-dropdown-item>
</yh-dropdown-menu>
</template>
</yh-dropdown>
</div>
</DemoBlock>

## Quick Configuration Mode

Quickly configure menu items via the `items` attribute without using slots.

<DemoBlock title="Quick Configuration Mode" :ts-code="tsItems" :js-code="jsItems">
<div style="padding: 10px 0;">
<yh-dropdown :items="items" :show-arrow="false" @command="handleCommand">
<span style="cursor: pointer;"> Quick Config Mode <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
</DemoBlock>

## Trigger Mode

Configure to activate on click or hover. Set the `trigger` attribute to `click`. Default is `hover`.

<DemoBlock title="Trigger Mode" :ts-code="tsTrigger" :js-code="jsTrigger">
<div style="padding: 20px 0; display: flex; gap: 80px;">
<div>
<div style="color: #909399; font-size: 12px; margin-bottom: 8px;">hover to trigger</div>
<yh-dropdown trigger="hover" :items="items" :show-arrow="false">
<span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
<div>
<div style="color: #909399; font-size: 12px; margin-bottom: 8px;">click to trigger</div>
<yh-dropdown trigger="click" :items="items" :show-arrow="false">
<span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
<div>
<div style="color: #909399; font-size: 12px; margin-bottom: 8px;">right click to trigger</div>
<yh-dropdown trigger="contextmenu" :items="items" :show-arrow="false">
<span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
</div>
</DemoBlock>

## Split Button

Set the `split-button` attribute to make the triggering element appear as a button group, with a function button on the left and a dropdown trigger button on the right.

<DemoBlock title="Split Button" :ts-code="tsSplitButton" :js-code="jsSplitButton">
<div style="padding: 10px 0; display: flex; gap: 16px;">
<yh-dropdown split-button type="primary" :items="splitItems" @click="() => console.log('Main button click')">
Dropdown List
</yh-dropdown>
<yh-dropdown split-button type="primary" plain :items="splitItems" @click="() => console.log('Main button click')">
Dropdown List
</yh-dropdown>
</div>
</DemoBlock>

## Disabled Items

Disable specific menu items by setting the `disabled` attribute.

<DemoBlock title="Disabled Items" :ts-code="tsDisabled" :js-code="jsDisabled">
<div style="padding: 10px 0;">
<yh-dropdown :items="disabledItems">
<yh-button>Contains Disabled Items</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## Placement

Set the popup position via the `placement` attribute.

<DemoBlock title="Placement" :ts-code="tsPlacement" :js-code="jsPlacement">
<div style="padding: 20px 0; display: flex; gap: 16px; flex-wrap: wrap;">
<yh-dropdown placement="top-start" :items="items">
<yh-button plain>topStart</yh-button>
</yh-dropdown>
<yh-dropdown placement="top" :items="items">
<yh-button plain>top</yh-button>
</yh-dropdown>
<yh-dropdown placement="top-end" :items="items">
<yh-button plain>topEnd</yh-button>
</yh-dropdown>
<yh-dropdown placement="bottom-start" :items="items">
<yh-button plain>bottomStart</yh-button>
</yh-dropdown>
<yh-dropdown placement="bottom" :items="items">
<yh-button plain>bottom</yh-button>
</yh-dropdown>
<yh-dropdown placement="bottom-end" :items="items">
<yh-button plain>bottomEnd</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## Danger Items

By setting `danger: true`, a menu item will be displayed in a red danger style, commonly used for destructive operations like deletion.

<DemoBlock title="Danger Items" :ts-code="tsDanger" :js-code="jsDanger">
<div style="padding: 10px 0;">
<yh-dropdown :items="dangerItems">
<yh-button>Action</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## Loading State

Show a loading state via the `loading` attribute, suitable for scenarios where menu data is loaded asynchronously.

<DemoBlock title="Loading State" :ts-code="tsLoading" :js-code="jsLoading">
<div style="padding: 10px 0;">
<yh-dropdown :items="loadingItems" :loading="loading" trigger="click" @show="simulateLoading">
<yh-button>Click to Load Data</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## Checkable Mode

Enable checkable mode via the `checkable` attribute, and use it with `hide-on-click="false"` for multi-selection scenarios.

<DemoBlock title="Checkable Mode" :ts-code="tsCheckable" :js-code="jsCheckable">
<div style="padding: 10px 0;">
<yh-dropdown :items="checkableItems" checkable :hide-on-click="false" @command="handleCheck">
<yh-button>
Status Filter <span v-if="checkedCount > 0" style="margin-left: 4px; background: var(--yh-color-primary); color: white; font-size: 12px; padding: 0 6px; border-radius: 10px;">{{ checkedCount }}</span>
</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## Use in Nuxt

The `Dropdown` component fully supports SSR rendering for Nuxt 3/4.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
<div style="padding: 10px 0;">
<yh-dropdown :items="menuItems">
<yh-button type="primary">Nuxt 3/4 Ready</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

**SSR Notes**:

- ✅ Perfect support for Server-Side Rendering (SSR), no hydration errors
- ✅ Supports keyboard navigation
- ✅ Overlay automatically Teleports to body
- ✅ Glassmorphism (acrylic) effect adapts automatically

## API

### Dropdown Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| trigger | Trigger mode | `'hover' \| 'click' \| 'contextmenu'` | `'hover'` |
| placement | Popup placement | `Placement` | `'bottom'` |
| visible | Whether visible (supports v-model) | `boolean \| null` | `null` |
| disabled | Whether disabled | `boolean` | `false` |
| show-after | Delay show time (ms) | `number` | `0` |
| hide-after | Delay hide time (ms) | `number` | `150` |
| z-index | Overlay z-index | `number` | `2000` |
| hide-on-click | Whether to hide after clicking a menu item | `boolean` | `true` |
| items | Menu item data (Quick Config Mode) | `DropdownItemData[]` | `[]` |
| loading | Whether in loading state | `boolean` | `false` |
| empty-text | Empty state text | `string` | `'No data'` |
| checkable | Whether items are checkable | `boolean` | `false` |
| max-height | Maximum height of the menu | `string \| number` | `''` |
| teleported | Whether to mount to body | `boolean` | `true` |
| popper-class | Custom class name for popper | `string` | `''` |
| popper-style | Custom style for popper | `CSSProperties` | `{}` |
| split-button | Split button mode | `boolean` | `false` |
| type | Button type (Split Button mode) | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| ''` | `''` |
| size | Button size | `'large' \| 'default' \| 'small'` | `'default'` |
| plain | Plain button style (Split Button mode) | `boolean` | `false` |
| show-arrow | Whether to show dropdown arrow icon | `boolean` | `true` |
| popper-arrow | Whether to show popper arrow | `boolean` | `true` |
| offset | Offset | `[number, number]` | `[0, 8]` |
| loop | Tab key cycle navigation | `boolean` | `true` |
| tabindex | Tab index | `number \| string` | `0` |

### DropdownItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| command | Command value | `string \| number \| object` | `''` |
| disabled | Whether disabled | `boolean` | `false` |
| divided | Whether to show divider | `boolean` | `false` |
| icon | Icon name | `string` | `''` |
| danger | Whether it's a danger item | `boolean` | `false` |
| checked | Whether checked (requires checkable) | `boolean` | `false` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| command | Triggered when menu item is clicked | `(command: string \| number \| object)` |
| update:visible | Visibility changed | `(visible: boolean)` |
| show | Menu shown | - |
| hide | Menu hidden | - |
| click | Clicked trigger (Split Button mode) | `(event: MouseEvent)` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Trigger element |
| dropdown | Dropdown menu content (using DropdownMenu/DropdownItem) |
| empty | Empty state content (shown when no items) |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| show | Manually show dropdown menu | `() => void` |
| hide | Manually hide dropdown menu | `() => void` |
| visible | Current visibility state | `Ref<boolean>` |

### DropdownItemData Type

```typescript
interface DropdownItemData {
  key: string | number
  label: string
  icon?: string
  disabled?: boolean
  divided?: boolean
  class?: string
  children?: DropdownItemData[]
  danger?: boolean    // Red danger style
  checked?: boolean   // Checkable mode
}
```

### Theme Variables (CSS Variables)

All color variables are interfaced with the global theme system, automatically supporting dark mode:

| Variable | Default Value | Description |
| --- | --- | --- |
| `--yh-dropdown-text-color` | `var(--yh-text-color-primary)` | Menu text color |
| `--yh-dropdown-bg-color` | `var(--yh-bg-color-overlay)` | Popper background color |
| `--yh-dropdown-border-color` | `var(--yh-border-color-light)` | Border/divider color |
| `--yh-dropdown-hover-bg` | `var(--yh-color-primary-light-9)` | Menu item hover background |
| `--yh-dropdown-active-bg` | `var(--yh-color-primary-light-8)` | Menu item active background |
| `--yh-dropdown-disabled-color` | `var(--yh-text-color-placeholder)` | Disabled item text color |
| `--yh-dropdown-danger-color` | `var(--yh-color-danger)` | Danger item text color |
| `--yh-dropdown-danger-hover-bg` | `var(--yh-color-danger-light-9)` | Danger item hover background |
| `--yh-dropdown-shadow` | `var(--yh-shadow-lg)` | Popper shadow |
| `--yh-dropdown-radius` | `var(--yh-radius-md)` | Popper corner radius |

---

**Tip**: The `Dropdown` component integrates excellent designs from Element Plus, Ant Design, and Naive UI, supporting quick data configuration, split buttons, keyboard navigation, danger item styles, loading states, checkable modes, and more.
