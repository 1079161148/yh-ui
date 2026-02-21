# Container Layout

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

// Nuxt usage example
const tsNuxt = `<template>
  <!-- Typical Nuxt admin layout, file: layouts/default.vue -->
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
        <!-- Renders current route page content -->
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

// Components are auto-imported in Nuxt, no manual registration needed
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

// Demo state
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

Container components used for layout, making it easy to quickly build the basic structure of a page. Uses Flexbox layout and includes five sub-components: Container, Header, Aside, Main, and Footer.

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

Classic admin layout with Header + Aside + Main + Footer. The Container component automatically detects if children include Header or Footer and switches to a vertical layout if so.

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

Container component fully supports Nuxt 3/4 SSR rendering. The following example demonstrates building an admin layout with a collapsible sidebar in Nuxt's `layouts/default.vue`, where the content area uses `<NuxtPage />` to render the current route.

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

- ✅ All Props and styles fully supported
- ✅ Flex layout direction auto-detection works normally
- ✅ Slot content fully rendered
- ✅ Used in combination with `NuxtPage` container
- ✅ `NuxtLink` routing links fully supported
- ✅ Responsive sidebar collapse support

::: tip SSR Safety
All Container sub-components have passed complete SSR tests, ensuring that server-side and client-side rendering are completely consistent with no Hydration errors.
:::

## API

### Container Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Arrangement direction | `'horizontal' \| 'vertical'` | Auto-detect (vertical when Header/Footer present) |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Header Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| height | Header height | `string` | `'60px'` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Aside Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| width | Sidebar width | `string` | `'200px'` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Main Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Footer Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| height | Footer height | `string` | `'60px'` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Slots

All sub-components support the `default` slot.

## Theme Variables

Container component supports customizing local styles by overriding the following CSS variables:

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
