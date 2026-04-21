# Container Layout

Container components used for layout, making it easy to quickly build the basic structure of a page. It is based on Flexbox and includes `YhContainer`, `YhHeader`, `YhAside`, `YhMain`, and `YhFooter`.

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-container>
    <yh-header>Header</yh-header>
    <yh-main>Main</yh-main>
  </yh-container>
<\/template>`

const jsBasic = tsBasic

const tsAside = `<template>
  <yh-container>
    <yh-aside width="200px">Aside</yh-aside>
    <yh-main>Main</yh-main>
  </yh-container>
<\/template>`

const jsAside = tsAside

const tsFull = `<template>
  <yh-container>
    <yh-header height="60px">Header</yh-header>
    <yh-container>
      <yh-aside width="200px">Aside</yh-aside>
      <yh-main>Main</yh-main>
    </yh-container>
    <yh-footer height="60px">Footer</yh-footer>
  </yh-container>
<\/template>`

const jsFull = tsFull

const tsNuxt = `<template>
  <yh-container style="height: 100vh;">
    <yh-header height="64px">
      <div style="display: flex; align-items: center; height: 100%;">
        <yh-typography-title :level="4" style="margin: 0; flex: 1;">My App</yh-typography-title>
        <yh-button text @click="toggleAside">
          {{ collapsed ? 'Expand Sidebar' : 'Collapse Sidebar' }}
        </yh-button>
      </div>
    </yh-header>
    <yh-container>
      <yh-aside v-if="!collapsed" width="220px">
        <nav style="padding: 16px;">
          <p v-for="item in navItems" :key="item.path">
            <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
          </p>
        </nav>
      </yh-aside>
      <yh-main>
        <NuxtPage />
      </yh-main>
    </yh-container>
    <yh-footer height="48px">
      <p style="margin: 0; text-align: center; line-height: 48px;">&copy; 2024 YH-UI</p>
    </yh-footer>
  </yh-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const toggleAside = () => {
  collapsed.value = !collapsed.value
}

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/settings', label: 'Settings' },
]
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const collapsed = ref(false)
const toggleAside = () => {
  collapsed.value = !collapsed.value
}

const demoStyle = {
  border: '1px solid var(--yh-border-color, #dcdfe6)',
  borderRadius: '4px',
  overflow: 'hidden'
}
const headerStyle = {
  background: '#b3c0d1',
  color: '#333',
  textAlign: 'center' as const,
  lineHeight: '60px'
}
const asideStyle = {
  background: '#d3dce6',
  color: '#333',
  textAlign: 'center' as const,
  lineHeight: '200px'
}
const mainStyle = {
  background: '#e9eef3',
  color: '#333',
  textAlign: 'center' as const,
  padding: '40px',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const footerStyle = {
  background: '#b3c0d1',
  color: '#333',
  textAlign: 'center' as const,
  lineHeight: '60px'
}
</script>

## Common Page Layouts

### Header + Main

<DemoBlock title="Header + Main" :ts-code="tsBasic" :js-code="jsBasic">
  <div :style="demoStyle">
    <yh-container>
      <yh-header :style="headerStyle">Header</yh-header>
      <yh-main :style="mainStyle">Main</yh-main>
    </yh-container>
  </div>
</DemoBlock>

### Aside + Main

<DemoBlock title="Aside + Main" :ts-code="tsAside" :js-code="jsAside">
  <div :style="demoStyle">
    <yh-container>
      <yh-aside width="200px" :style="asideStyle">Aside</yh-aside>
      <yh-main :style="mainStyle">Main</yh-main>
    </yh-container>
  </div>
</DemoBlock>

### Full Layout

Classic admin layout with Header + Aside + Main + Footer. `YhContainer` automatically switches to a vertical layout when it detects `YhHeader` or `YhFooter` children.

<DemoBlock title="Full Layout" :ts-code="tsFull" :js-code="jsFull">
  <div :style="demoStyle">
    <yh-container>
      <yh-header :style="headerStyle">Header</yh-header>
      <yh-container>
        <yh-aside width="200px" :style="asideStyle">Aside</yh-aside>
        <yh-main :style="mainStyle">Main</yh-main>
      </yh-container>
      <yh-footer :style="footerStyle">Footer</yh-footer>
    </yh-container>
  </div>
</DemoBlock>

## Use in Nuxt

These layout components work in Nuxt 3/4 after registering `@yh-ui/nuxt`. A common pattern is to place them in `layouts/default.vue` and render route content through `NuxtPage`.

<DemoBlock title="Nuxt Usage (layouts/default.vue)" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div :style="demoStyle">
    <yh-container>
      <yh-header :style="{ ...headerStyle, padding: '0 20px', display: 'flex', alignItems: 'center' }">
        <yh-typography-title :level="4" style="margin: 0; flex: 1; color: #333;">My App</yh-typography-title>
        <yh-button text @click="toggleAside">{{ collapsed ? 'Expand Sidebar' : 'Collapse Sidebar' }}</yh-button>
      </yh-header>
      <yh-container>
        <yh-aside v-if="!collapsed" width="220px" :style="{ ...asideStyle, lineHeight: 'normal', padding: '16px 0' }">
          <div v-for="item in ['Home', 'Dashboard', 'Settings']" :key="item" style="padding: 10px 20px; cursor: pointer;">
            {{ item }}
          </div>
        </yh-aside>
        <yh-main :style="mainStyle">
          <yh-typography-text type="secondary">Current Route Content (NuxtPage)</yh-typography-text>
        </yh-main>
      </yh-container>
      <yh-footer :style="footerStyle">&copy; 2024 YH-UI</yh-footer>
    </yh-container>
  </div>
</DemoBlock>

**SSR Notes**:

- All props and inline styles are rendered consistently during SSR.
- Automatic layout direction detection remains stable after hydration.
- Slot content and nested layouts stay aligned across server and client rendering.

::: tip SSR Safety
All container sub-components have passed SSR validation, so server-rendered and hydrated output stay consistent.
:::

## API

### Props

#### Container

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Arrangement direction | `'horizontal' \| 'vertical'` | Auto-detect |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

#### Header

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| height | Header height | `string` | `'60px'` |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

#### Aside

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| width | Sidebar width | `string` | `'200px'` |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

#### Main

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

#### Footer

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| height | Footer height | `string` | `'60px'` |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

### Events

`YhContainer`, `YhHeader`, `YhAside`, `YhMain`, and `YhFooter` do not expose component events.

### Slots

#### Container

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Container content. | - |

#### Header

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Header content. | - |

#### Aside

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Aside content. | - |

#### Main

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Main content. | - |

#### Footer

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Footer content. | - |

### Expose

These layout components do not expose public instance methods or properties.

### Theme Variables

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-header-padding` | Header padding | `0 20px` |
| `--yh-header-bg-color` | Header background color | `transparent` |
| `--yh-header-border-bottom` | Header bottom border | `none` |
| `--yh-aside-bg-color` | Sidebar background color | `transparent` |
| `--yh-aside-border-right` | Sidebar right border | `none` |
| `--yh-main-padding` | Main area padding | `20px` |
| `--yh-main-bg-color` | Main area background color | `transparent` |
| `--yh-footer-padding` | Footer padding | `0 20px` |
| `--yh-footer-bg-color` | Footer background color | `transparent` |
| `--yh-footer-border-top` | Footer top border | `none` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhContainerProps` | Props type for `YhContainer` |
| `YhHeaderProps` | Props type for `YhHeader` |
| `YhAsideProps` | Props type for `YhAside` |
| `YhMainProps` | Props type for `YhMain` |
| `YhFooterProps` | Props type for `YhFooter` |
| `YhContainerSlots` | Slots type for `YhContainer` |
| `YhHeaderSlots` | Slots type for `YhHeader` |
| `YhAsideSlots` | Slots type for `YhAside` |
| `YhMainSlots` | Slots type for `YhMain` |
| `YhFooterSlots` | Slots type for `YhFooter` |
| `YhContainerInstance` | Public instance type for `YhContainer` |
| `YhHeaderInstance` | Public instance type for `YhHeader` |
| `YhAsideInstance` | Public instance type for `YhAside` |
| `YhMainInstance` | Public instance type for `YhMain` |
| `YhFooterInstance` | Public instance type for `YhFooter` |
