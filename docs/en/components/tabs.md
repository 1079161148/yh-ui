# Tabs

`YhTabs` and `YhTabPane` divide related content into multiple panes. They support line, card, border-card, and segment styles, custom triggers, dynamic add/remove actions, lazy rendering, and theme overrides.

<script setup lang="ts">
import { ref } from 'vue'

const activeBasic = ref('first')
const activeCard = ref('first')
const activeBorderCard = ref('first')
const activeSegment = ref('first')
const activePosition = ref('first')
const tabPosition = ref<'top' | 'right' | 'bottom' | 'left'>('top')
const activeStretch = ref('first')
const activeEditable = ref('1')
const activeBeforeLeave = ref('first')
const activeLazy = ref('first')
const activeNuxt = ref('first')
const activeIndicator = ref('first')
const activeTrigger = ref('first')

const editableTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
let tabIndex = 2

const handleTabsEdit = (targetName: string, action: 'add' | 'remove') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      name: newTabName,
      label: `New Tab ${tabIndex}`,
      content: `New Tab ${tabIndex} Content`
    })
    activeEditable.value = newTabName
  } else {
    const tabs = editableTabs.value
    let activeTab = activeEditable.value
    if (activeTab === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) activeTab = nextTab.name
        }
      })
    }
    activeEditable.value = activeTab
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

const customAddTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
const activeCustomAdd = ref('1')
let customTabIndex = 2

const handleCustomAdd = () => {
  const newTabName = `${++customTabIndex}`
  customAddTabs.value.push({
    name: newTabName,
    label: `Tab ${customTabIndex}`,
    content: `Tab ${customTabIndex} Content`
  })
  activeCustomAdd.value = newTabName
}

const handleCustomRemove = (name: string | number) => {
  const tabs = customAddTabs.value
  let activeTab = activeCustomAdd.value
  if (activeTab === name) {
    tabs.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) activeTab = nextTab.name
      }
    })
  }
  activeCustomAdd.value = activeTab
  customAddTabs.value = tabs.filter((tab) => tab.name !== name)
}

const beforeLeave = (newName: string | number, oldName: string | number) =>
  window.confirm(`Are you sure you want to switch from ${oldName} to ${newName}?`)

const tsBasic = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Task Compensation" disabled>Task Compensation</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsTrigger = `<template>
  <yh-tabs v-model="activeName" trigger="hover">
    <yh-tab-pane name="first" label="User Management">Switch on hover</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsCard = `<template>
  <yh-tabs v-model="activeName" type="card">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsBorderCard = `<template>
  <yh-tabs v-model="activeName" type="border-card">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsSegment = `<template>
  <yh-tabs v-model="activeName" type="segment">
    <yh-tab-pane name="first" label="Day">Day View</yh-tab-pane>
    <yh-tab-pane name="second" label="Week">Week View</yh-tab-pane>
    <yh-tab-pane name="third" label="Month">Month View</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Year">Year View</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsPosition = `<template>
  <yh-radio-group v-model="tabPosition" style="margin-bottom: 16px">
    <yh-radio-button value="top">top</yh-radio-button>
    <yh-radio-button value="right">right</yh-radio-button>
    <yh-radio-button value="bottom">bottom</yh-radio-button>
    <yh-radio-button value="left">left</yh-radio-button>
  </yh-radio-group>

  <yh-tabs v-model="activeName" :tab-position="tabPosition" style="height: 200px">
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
const tabPosition = ref<'top' | 'right' | 'bottom' | 'left'>('top')
<\/script>`

const tsIndicator = `<template>
  <yh-tabs v-model="activeName" active-color="#10b981" inactive-color="#9ca3af">
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsStretch = `<template>
  <yh-tabs v-model="activeName" stretch>
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsEditable = `<template>
  <yh-tabs v-model="activeName" type="card" editable @tab-remove="handleRemove" @tab-add="handleAdd">
    <yh-tab-pane v-for="item in editableTabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string>('1')
const editableTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  editableTabs.value.push({
    name: newTabName,
    label: \`New Tab \${tabIndex}\`,
    content: \`New Tab \${tabIndex} Content\`
  })
  activeName.value = newTabName
}

const handleRemove = (name: string | number) => {
  const tabs = editableTabs.value
  let activeTab = activeName.value
  if (activeTab === name) {
    tabs.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) activeTab = nextTab.name
      }
    })
  }
  activeName.value = activeTab
  editableTabs.value = tabs.filter((tab) => tab.name !== name)
}
<\/script>`

const tsCustomAdd = `<template>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleAdd">Add Tab</yh-button>
  </div>
  <yh-tabs v-model="activeName" type="card" closable :addable="false" @tab-remove="handleRemove">
    <yh-tab-pane v-for="item in tabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
const activeName = ref<string>('1')
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  tabs.value.push({
    name: newTabName,
    label: \`Tab \${tabIndex}\`,
    content: \`Tab \${tabIndex} Content\`
  })
  activeName.value = newTabName
}

const handleRemove = (name: string | number) => {
  const tabList = tabs.value
  let activeTab = activeName.value
  if (activeTab === name) {
    tabList.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabList[index + 1] || tabList[index - 1]
        if (nextTab) activeTab = nextTab.name
      }
    })
  }
  activeName.value = activeTab
  tabs.value = tabList.filter((tab) => tab.name !== name)
}
<\/script>`

const tsBeforeLeave = `<template>
  <yh-tabs v-model="activeName" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string>('first')
const beforeLeave = (newName: string | number, oldName: string | number) => {
  return window.confirm(\`Are you sure you want to switch from \${oldName} to \${newName}?\`)
}
<\/script>`

const tsLazy = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="Instant Load">Content loaded instantly</yh-tab-pane>
    <yh-tab-pane name="second" label="Lazy Load" lazy>Content rendered after first activation</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsNuxt = `<template>
  <YhTabs v-model="active">
    <YhTabPane name="1" label="Tab 1">Content 1</YhTabPane>
    <YhTabPane name="2" label="Tab 2">Content 2</YhTabPane>
  </YhTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<string>('1')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '').replace('<string>', '')
const jsTrigger = tsTrigger.replace('lang="ts"', '').replace('<string>', '')
const jsCard = tsCard.replace('lang="ts"', '').replace('<string>', '')
const jsBorderCard = tsBorderCard.replace('lang="ts"', '').replace('<string>', '')
const jsSegment = tsSegment.replace('lang="ts"', '').replace('<string>', '')
const jsPosition = tsPosition.replace('lang="ts"', '').replace('<string>', '').replace(": 'top' | 'right' | 'bottom' | 'left'", '')
const jsIndicator = tsIndicator.replace('lang="ts"', '').replace('<string>', '')
const jsStretch = tsStretch.replace('lang="ts"', '').replace('<string>', '')
const jsEditable = tsEditable.replace('lang="ts"', '').replace('<string>', '')
const jsCustomAdd = tsCustomAdd.replace('lang="ts"', '').replace('<string>', '')
const jsBeforeLeave = tsBeforeLeave.replace('lang="ts"', '').replace('<string>', '')
const jsLazy = tsLazy.replace('lang="ts"', '').replace('<string>', '')
const jsNuxt = tsNuxt.replace('lang="ts"', '').replace('<string>', '')
</script>

Divide related content into separate panes and switch between them by tab.

## Basic Usage

Use `v-model` to bind the active tab name.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-tabs v-model="activeBasic">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Task Compensation" disabled>Task Compensation</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Trigger Mode

Use `trigger="hover"` to activate tabs on hover instead of click.

<DemoBlock title="Trigger Mode" :ts-code="tsTrigger" :js-code="jsTrigger">
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="User Management">Switch on hover</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Card Styles

`type="card"` and `type="border-card"` provide alternate visual styles for tab navigation.

<DemoBlock title="Card Style" :ts-code="tsCard" :js-code="jsCard">
  <yh-tabs v-model="activeCard" type="card">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

<DemoBlock title="Bordered Card" :ts-code="tsBorderCard" :js-code="jsBorderCard">
  <yh-tabs v-model="activeBorderCard" type="border-card">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Segment Style

`type="segment"` renders tabs like a segmented control.

<DemoBlock title="Segment Style" :ts-code="tsSegment" :js-code="jsSegment">
  <yh-tabs v-model="activeSegment" type="segment">
    <yh-tab-pane name="first" label="Day">Day View</yh-tab-pane>
    <yh-tab-pane name="second" label="Week">Week View</yh-tab-pane>
    <yh-tab-pane name="third" label="Month">Month View</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Year">Year View</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Tab Position

Use `tab-position` to move the navigation to the top, right, bottom, or left side.

<DemoBlock title="Tab Position" :ts-code="tsPosition" :js-code="jsPosition">
  <yh-radio-group v-model="tabPosition" style="margin-bottom: 16px">
    <yh-radio-button value="top">top</yh-radio-button>
    <yh-radio-button value="right">right</yh-radio-button>
    <yh-radio-button value="bottom">bottom</yh-radio-button>
    <yh-radio-button value="left">left</yh-radio-button>
  </yh-radio-group>

  <yh-tabs v-model="activePosition" :tab-position="tabPosition" style="height: 200px">
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Indicator and Stretch

Use `active-color`, `inactive-color`, `indicator-width`, and `indicator-height` to customize the line indicator. Use `stretch` to make tabs fill the available width.

<DemoBlock title="Custom Indicator" :ts-code="tsIndicator" :js-code="jsIndicator">
  <yh-tabs v-model="activeIndicator" active-color="#10b981" inactive-color="#9ca3af">
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

<DemoBlock title="Stretch" :ts-code="tsStretch" :js-code="jsStretch">
  <yh-tabs v-model="activeStretch" stretch>
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Editable Tabs

Use `editable`, or combine `closable` and `addable`, to build dynamic tab sets.

<DemoBlock title="Editable Tabs" :ts-code="tsEditable" :js-code="jsEditable">
  <yh-tabs v-model="activeEditable" type="card" editable @tab-remove="(name) => handleTabsEdit(name, 'remove')" @tab-add="() => handleTabsEdit('', 'add')">
    <yh-tab-pane v-for="item in editableTabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

<DemoBlock title="Custom Add Trigger" :ts-code="tsCustomAdd" :js-code="jsCustomAdd">
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleCustomAdd">Add Tab</yh-button>
  </div>
  <yh-tabs v-model="activeCustomAdd" type="card" closable :addable="false" @tab-remove="handleCustomRemove">
    <yh-tab-pane v-for="item in customAddTabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Before Leave Hook

`before-leave` can block tab switching by returning `false` or rejecting.

<DemoBlock title="Before Leave Hook" :ts-code="tsBeforeLeave" :js-code="jsBeforeLeave">
  <yh-tabs v-model="activeBeforeLeave" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Lazy Render

Set `lazy` on a tab pane to delay rendering its content until first activation.

<DemoBlock title="Lazy Render" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-tabs v-model="activeLazy">
    <yh-tab-pane name="first" label="Instant Load">Content loaded instantly</yh-tab-pane>
    <yh-tab-pane name="second" label="Lazy Load" lazy>Content rendered after first activation</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhTabs` and `YhTabPane` can be used directly in Nuxt 3/4 pages and components.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tabs v-model="activeNuxt">
    <yh-tab-pane name="first" label="Tab 1">Content 1</yh-tab-pane>
    <yh-tab-pane name="second" label="Tab 2">Content 2</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## API

### Tabs Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Active tab name | `string \| number` | `''` |
| `type` | Tabs style | `'line' \| 'card' \| 'border-card' \| 'segment'` | `'line'` |
| `tab-position` | Navigation position | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `draggable` | Declared prop for drag sorting. The current implementation does not consume it yet. | `boolean` | `false` |
| `closable` | Show close buttons | `boolean` | `false` |
| `addable` | Show built-in add button | `boolean` | `false` |
| `editable` | Equivalent to enabling both add and close actions | `boolean` | `false` |
| `before-leave` | Hook called before switching tabs | `(newName: string \| number, oldName: string \| number) => boolean \| Promise<boolean>` | `undefined` |
| `stretch` | Stretch tabs to fill available width | `boolean` | `false` |
| `nav-class` | Extra class for the tab navigation wrapper | `string` | `''` |
| `content-class` | Extra class for the content wrapper | `string` | `''` |
| `indicator-width` | Custom indicator width | `string` | `''` |
| `indicator-height` | Custom indicator height | `string` | `''` |
| `active-color` | Active text and indicator color override | `string` | `''` |
| `inactive-color` | Inactive tab text color override | `string` | `''` |
| `trigger` | Activation trigger | `'click' \| 'hover'` | `'click'` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### Tabs Events

| Event | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the active tab changes | `(name: string \| number) => void` |
| `tab-click` | Triggered when a tab header is clicked | `(pane: YhTabPaneConfig, ev: Event) => void` |
| `tab-change` | Triggered after the active tab changes | `(name: string \| number) => void` |
| `tab-remove` | Triggered when a tab close action is requested | `(name: string \| number) => void` |
| `tab-add` | Triggered when an add action is requested | `() => void` |
| `tab-drag-end` | Declared event for drag sorting. The current implementation does not emit it yet. | `(names: (string \| number)[]) => void` |

### Tabs Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Tab panes rendered inside `YhTabs` | - |
| `label` | Custom tab label content. `pane.name` is normalized to `string` when registered. | `{ pane: YhTabPaneConfig }` |
| `add-icon` | Custom icon for the add button | - |

### Tabs Expose

| Name | Description | Type |
| --- | --- | --- |
| `addTab` | Trigger the add-tab flow | `() => void` |
| `setActiveTab` | Activate a tab by name | `(name: string \| number) => void` |
| `activeTab` | Current active tab ref. | `Ref<string \| number>` |

### TabPane Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Unique pane name | `string \| number` | Required |
| `label` | Tab label text | `string` | `''` |
| `disabled` | Disable the tab pane | `boolean` | `false` |
| `closable` | Override whether this pane is closable | `boolean` | `undefined` |
| `lazy` | Render content only after first activation | `boolean` | `false` |
| `icon` | Icon class name shown before the label | `string` | `''` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### TabPane Events

This component does not expose component events.

### TabPane Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Pane content | - |

### TabPane Expose

This component does not expose public instance methods or properties.

### Type Exports

| Type | Description |
| --- | --- |
| `YhTabsProps` | Tabs props type |
| `YhTabsEmits` | Tabs emits type |
| `YhTabsSlots` | Tabs slots type |
| `YhTabsExpose` | Tabs expose type |
| `YhTabsType` | Tabs style union |
| `YhTabsPosition` | Tabs position union |
| `YhTabPaneConfig` | Registered tab pane config type |
| `YhTabPaneProps` | Tab pane props type |
| `YhTabPaneSlots` | Tab pane slots type |
| `YhTabsInstance` | Tabs instance type |
| `YhTabPaneInstance` | Tab pane instance type |

### `YhTabPaneConfig` Object Shape

`YhTabs` uses the following pane config shape for internal registration and event payloads. The source code normalizes `name` to `string` when a pane is registered.

```ts
interface YhTabPaneConfig {
  name: string
  label: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
  icon?: string
}
```

### Theme Variables

`YhTabs` and `YhTabPane` support `themeOverrides` and consume the following dedicated CSS variables.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-tabs-header-height` | Navigation bar height | `40px` |
| `--yh-tabs-active-color` | Active text and indicator color | `var(--yh-color-primary)` |
| `--yh-tabs-text-color` | Default tab text color | `var(--yh-text-color-primary)` |
| `--yh-tabs-disabled-color` | Disabled tab text color | `var(--yh-text-color-disabled)` |
| `--yh-tabs-border-color` | Border color | `var(--yh-border-color-light)` |
| `--yh-tabs-indicator-width` | Default line indicator width | `40px` |
| `--yh-tabs-indicator-height` | Default vertical indicator height | `20px` |
