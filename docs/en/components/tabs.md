# Tabs

Divide data collections that are related but belong to different categories. YH-UI's Tabs combine the best features of Element Plus, Naive UI, and Ant Design, while introducing a unique Segment styler and custom transition hooks.

<script setup lang="ts">
import { ref } from 'vue'

// Independent variables for each demo
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

// Dynamic tab data
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
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeTab = activeEditable.value
    if (activeTab === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeTab = nextTab.name
          }
        }
      })
    }
    activeEditable.value = activeTab
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

// Custom adder demo
const customAddTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
const activeCustomAdd = ref('1')
let customTabIndex = 2
const customTabsRef = ref<any>(null)

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

const beforeLeave = (newName: string | number, oldName: string | number) => {
  return window.confirm(`Are you sure you want to switch from ${oldName} to ${newName}?`)
}

// Code samples
const tsBasic = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Task Compensate" disabled>Task Compensate</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '').replace('<string>', '')

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

const jsCard = tsCard.replace('lang="ts"', '').replace('<string>', '')

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

const jsBorderCard = tsBorderCard.replace('lang="ts"', '').replace('<string>', '')

const tsSegment = `<template>
  <yh-tabs v-model="activeName" type="segment">
    <yh-tab-pane name="first" label="Day">Day View Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Week">Week View Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Month">Month View Content</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Year">Year View Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsSegment = tsSegment.replace('lang="ts"', '').replace('<string>', '')

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

const jsPosition = tsPosition.replace('lang="ts"', '').replace('<string>', '').replace(': \'top\' | \'right\' | \'bottom\' | \'left\'', '')

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

const jsStretch = tsStretch.replace('lang="ts"', '').replace('<string>', '')

const tsEditable = `<template>
  <yh-tabs 
    v-model="activeName" 
    type="card" 
    editable
    @tab-remove="handleRemove"
    @tab-add="handleAdd"
  >
    <yh-tab-pane 
      v-for="item in editableTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  name: string
  label: string
  content: string
}

const activeName = ref<string>('1')
const editableTabs = ref<Tab[]>([
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

const jsEditable = tsEditable.replace('lang="ts"', '').replace('<string>', '').replace(/interface Tab \{[\s\S]*?\}\n\n/, '').replace(': Tab[]', '')

const tsBeforeLeave = `<template>
  <yh-tabs v-model="activeName" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string>('first')

const beforeLeave = (newName: string | number, oldName: string | number): boolean => {
  return window.confirm(\`Are you sure you want to switch from \${oldName} to \${newName}?\`)
}
<\/script>`

const jsBeforeLeave = tsBeforeLeave.replace('lang="ts"', '').replace('<string>', '').replace(': boolean', '')

const tsLazy = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="Instant Load">Content loaded instantly</yh-tab-pane>
    <yh-tab-pane name="second" label="Lazy Load" lazy>Content loaded only after first activation</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsLazy = tsLazy.replace('lang="ts"', '').replace('<string>', '')

const tsNuxt = `<template>
  <!-- Direct usage, supports auto-import -->
  <YhTabs v-model="active">
    <YhTabPane name="1" label="Tab 1">Content 1</YhTabPane>
    <YhTabPane name="2" label="Tab 2">Content 2</YhTabPane>
  </YhTabs>
</template>

<script setup lang="ts">
const active = ref<string>('1')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '').replace('<string>', '')

const tsIndicator = `<template>
  <!-- Default indicator is short (40px) and centered -->
  <!-- Set indicator-width="auto" to span full tab width -->
  <yh-tabs 
    v-model="activeName"
    active-color="#10b981"
    inactive-color="#9ca3af"
  >
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsIndicator = tsIndicator.replace('lang="ts"', '').replace('<string>', '')

const tsTrigger = `<template>
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeTrigger = ref<string>('first')
<\/script>`

const jsTrigger = tsTrigger.replace('lang="ts"', '').replace('<string>', '')

const tsCustomAdd = `<template>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleAdd">Add Tab</yh-button>
  </div>
  <yh-tabs 
    ref="tabsRef"
    v-model="activeName" 
    type="card" 
    closable
    :addable="false"
    @tab-remove="handleRemove"
  >
    <yh-tab-pane 
      v-for="item in tabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  name: string
  label: string
  content: string
}

const tabs = ref<Tab[]>([
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

const jsCustomAdd = tsCustomAdd.replace('lang="ts"', '').replace('<string>', '').replace(/interface Tab \{[\s\S]*?\}\n\n/, '').replace(': Tab[]', '')
</script>

## Basic Usage

Basic and concise tabs. Use `v-model` to bind the currently active tab name.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-tabs v-model="activeBasic">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Task Compensate" disabled>Task Compensate</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Custom Trigger

Specify the tab switching trigger via the `trigger` property. Options: `click` (default), `hover`.

<DemoBlock title="Custom Trigger" :ts-code="tsTrigger" :js-code="jsTrigger">
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="User Management">Hover over a tab to switch</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Card Style

Set `type="card"` to change the look of the tabs to cards.

<DemoBlock title="Card Style" :ts-code="tsCard" :js-code="jsCard">
  <yh-tabs v-model="activeCard" type="card">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Bordered Card

Set `type="border-card"` for a bordered card presentation.

<DemoBlock title="Bordered Card" :ts-code="tsBorderCard" :js-code="jsBorderCard">
  <yh-tabs v-model="activeBorderCard" type="border-card">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Segment Style

Set `type="segment"` for an iOS-style segment control effect, ideal for view switching.

<DemoBlock title="Segment Style" :ts-code="tsSegment" :js-code="jsSegment">
  <yh-tabs v-model="activeSegment" type="segment">
    <yh-tab-pane name="first" label="Day">Day View Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Week">Week View Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Month">Month View Content</yh-tab-pane>
    <yh-tab-pane name="fourth" label="Year">Year View Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Tab Position

Set the position of the tabs via `tab-position`. Options: `top`, `right`, `bottom`, `left`.

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

## Custom Indicator Style

The default indicator is short (40px) and centered. Control its size via `indicator-width` and `indicator-height`. Set them to `auto` to make the indicator span the full tab width. Color can be customized via `active-color` and `inactive-color`.

<DemoBlock title="Custom Indicator Style" :ts-code="tsIndicator" :js-code="jsIndicator">
  <yh-tabs 
    v-model="activeIndicator"
    active-color="#10b981"
    inactive-color="#9ca3af"
  >
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Stretched Tabs

Set `stretch` to make the tabs fill the container width.

<DemoBlock title="Stretched Tabs" :ts-code="tsStretch" :js-code="jsStretch">
  <yh-tabs v-model="activeStretch" stretch>
    <yh-tab-pane name="first" label="User Management">User Management Content</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management Content</yh-tab-pane>
    <yh-tab-pane name="third" label="Role Management">Role Management Content</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Dynamic Tabs

Set `editable` (equivalent to `closable + addable`) to allow dynamic addition and removal of tabs.

<DemoBlock title="Dynamic Tabs" :ts-code="tsEditable" :js-code="jsEditable">
  <yh-tabs 
    v-model="activeEditable" 
    type="card" 
    editable
    @tab-remove="(name) => handleTabsEdit(name, 'remove')"
    @tab-add="() => handleTabsEdit('', 'add')"
  >
    <yh-tab-pane 
      v-for="item in editableTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Custom Adder Trigger

Trigger tab addition via an external button instead of the built-in `+` button. Set `:addable="false"` to hide the built-in button and implement your own logic.

<DemoBlock title="Custom Adder Trigger" :ts-code="tsCustomAdd" :js-code="jsCustomAdd">
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleCustomAdd">Add Tab</yh-button>
  </div>
  <yh-tabs 
    ref="customTabsRef"
    v-model="activeCustomAdd" 
    type="card" 
    closable
    :addable="false"
    @tab-remove="handleCustomRemove"
  >
    <yh-tab-pane 
      v-for="item in customAddTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Before Change Hook

Control tab switching with the `before-leave` hook. Return `false` or a `Promise.reject` to prevent switching.

<DemoBlock title="Before Change Hook" :ts-code="tsBeforeLeave" :js-code="jsBeforeLeave">
  <yh-tabs v-model="activeBeforeLeave" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="User Management">User Management</yh-tab-pane>
    <yh-tab-pane name="second" label="Config Management">Config Management</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Lazy Render

Set `lazy` to delay rendering of tab content until the tab is first activated.

<DemoBlock title="Lazy Render" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-tabs v-model="activeLazy">
    <yh-tab-pane name="first" label="Instant Load">Content loaded instantly</yh-tab-pane>
    <yh-tab-pane name="second" label="Lazy Load" lazy>Content loaded only after first activation</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## Usage in Nuxt

The component is fully adapted for Nuxt 3, supporting auto-import and SSR.

<DemoBlock title="Nuxt Adaptation" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tabs v-model="activeNuxt">
    <yh-tab-pane name="first" label="Tab 1">Content 1</yh-tab-pane>
    <yh-tab-pane name="second" label="Tab 2">Content 2</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## API

### Tabs Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value, currently active tab name | `string \| number` | `''` |
| type | Tab style type | `'line' \| 'card' \| 'border-card' \| 'segment'` | `'line'` |
| tab-position | Position of tabs | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| closable | Whether tabs are closable | `boolean` | `false` |
| addable | Whether tabs can be added | `boolean` | `false` |
| editable | Whether tabs are editable (equivalent to closable + addable) | `boolean` | `false` |
| draggable | Whether tabs are draggable for reordering | `boolean` | `false` |
| before-leave | Hook before switch; return false to stop toggle | `(newName, oldName) => boolean \| Promise<boolean>` | — |
| stretch | Whether tabs should span the full width | `boolean` | `false` |
| nav-class | Custom class name for the navigation bar | `string` | `''` |
| content-class | Custom class name for the content area | `string` | `''` |
| indicator-width | Indicator width (auto spans the full tab) | `string` | `''` (CSS default `40px`) |
| indicator-height | Indicator height (auto spans the full tab) | `string` | `''` (CSS default `20px`) |
| active-color | Color for the active state (text and indicator) | `string` | `''` |
| inactive-color | Color for the inactive state | `string` | `''` |
| trigger | Switch trigger | `'click' \| 'hover'` | `'click'` |

### Tabs Events

| Name | Description | Parameters |
| --- | --- | --- |
| tab-click | Triggered when a tab is clicked | `(pane: TabPaneConfig, ev: Event) => void` |
| tab-change | Triggered when the active tab changes | `(name: string \| number) => void` |
| tab-remove | Triggered when the close button is clicked | `(name: string \| number) => void` |
| tab-add | Triggered when the add button is clicked | `() => void` |
| tab-drag-end | Triggered when drag-and-drop ends | `(names: (string \| number)[]) => void` |

### Tabs Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Content of TabPane | — |
| label | Custom tab label | `{ pane: TabPaneConfig }` |
| add-icon | Custom icon for the add button | — |

### Tabs Expose

You can access the Tabs instance via `ref` and call these methods:

| Name | Description | Type |
| --- | --- | --- |
| addTab | Triggers the tab add event (use with `@tab-add`) | `() => void` |
| setActiveTab | Activates a specific tab | `(name: string \| number) => void` |
| activeTab | Currently active tab name (reactive) | `Ref<string \| number>` |

### TabPane Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| name | Unique identifier (Required) | `string \| number` | — |
| label | Tab label/title | `string` | `''` |
| disabled | Whether the tab is disabled | `boolean` | `false` |
| closable | Whether the tab is closable (overrides Tabs prop) | `boolean` | `undefined` |
| lazy | Whether to lazy-render the content | `boolean` | `false` |
| icon | Icon class name | `string` | `''` |

### TabPane Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Content of the tab | — |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-tabs-header-height` | Navigation bar height | `40px` |
| `--yh-tabs-active-color` | Active state color | `var(--yh-color-primary)` |
| `--yh-tabs-text-color` | Text color | `var(--yh-text-color-primary)` |
| `--yh-tabs-disabled-color` | Disabled state color | `var(--yh-text-color-disabled)` |
| `--yh-tabs-border-color` | Border color | `var(--yh-border-color-light)` |
| `--yh-tabs-indicator-width` | Indicator width (horizontal layout) | `40px` |
| `--yh-tabs-indicator-height` | Indicator height (vertical layout) | `20px` |
