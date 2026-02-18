# Breadcrumb

Displays the current page path and allows quick navigation back to any previous page.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// --- Showcase state ---
const maxItems = ref(4)

const tsOverflow = `<${_T}>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">Max items:</span>
        <yh-slider v-model="maxItems" :min="2" :max="6" />
      </div>
    </div>
    <div class="demo-viewport">
      <yh-breadcrumb :max-items="maxItems">
        <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
        <yh-breadcrumb-item>Dev Guide</yh-breadcrumb-item>
        <yh-breadcrumb-item>Component Overview</yh-breadcrumb-item>
        <yh-breadcrumb-item>Navigation</yh-breadcrumb-item>
        <yh-breadcrumb-item>Breadcrumb Config</yh-breadcrumb-item>
        <yh-breadcrumb-item>Current Node</yh-breadcrumb-item>
      </yh-breadcrumb>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const maxItems = ref(4)
</${_S}>`

const tsBasic = `<${_T}>
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/components">Components</yh-breadcrumb-item>
    <yh-breadcrumb-item>Breadcrumb</yh-breadcrumb-item>
  </yh-breadcrumb>
</${_T}>`

const tsSeparator = `<${_T}>
  <div class="yh-demo-column">
    <yh-breadcrumb separator=">">
      <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 1</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 2</yh-breadcrumb-item>
    </yh-breadcrumb>
    
    <yh-breadcrumb separator="~">
      <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 1</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 2</yh-breadcrumb-item>
    </yh-breadcrumb>
  </div>
</${_T}>`

const tsNuxt = `<${_T}>
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/dashboard">Dashboard</yh-breadcrumb-item>
  </yh-breadcrumb>
</${_T}>

<${_S} setup lang="ts">
// In Nuxt, it will automatically downgrade to NuxtLink for seamless navigation
</${_S}>`

</script>

## Showcase

The breadcrumb component supports dynamic level management and smart path collapsing.

<DemoBlock title="Smart Overflow" :ts-code="tsOverflow" :js-code="toJs(tsOverflow)">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">Max items:</span>
        <yh-slider v-model="maxItems" :min="2" :max="6" />
      </div>
    </div>
    <div class="demo-viewport">
      <yh-breadcrumb :max-items="maxItems">
        <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
        <yh-breadcrumb-item>Dev Guide</yh-breadcrumb-item>
        <yh-breadcrumb-item>Component Overview</yh-breadcrumb-item>
        <yh-breadcrumb-item>Navigation</yh-breadcrumb-item>
        <yh-breadcrumb-item>Breadcrumb Config</yh-breadcrumb-item>
        <yh-breadcrumb-item>Current Node</yh-breadcrumb-item>
      </yh-breadcrumb>
    </div>
  </div>
</DemoBlock>

## Basic Usage

The most basic usage. Use the `to` prop to set the navigation path.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/components">Components</yh-breadcrumb-item>
    <yh-breadcrumb-item>Breadcrumb</yh-breadcrumb-item>
  </yh-breadcrumb>
</DemoBlock>

## Custom Separator

Customize the separator string with the `separator` prop.

<DemoBlock title="Custom Separator" :ts-code="tsSeparator" :js-code="toJs(tsSeparator)">
  <div class="yh-demo-column">
    <yh-breadcrumb separator=">">
      <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 1</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 2</yh-breadcrumb-item>
    </yh-breadcrumb>
    <yh-breadcrumb separator="~">
      <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 1</yh-breadcrumb-item>
      <yh-breadcrumb-item>Level 2</yh-breadcrumb-item>
    </yh-breadcrumb>
  </div>
</DemoBlock>

## 🚀 Advanced Features

### 1. Smart Overflow Collapse
When navigation levels are too deep, setting `max-items` will automatically collapse intermediate items into `...`. This greatly protects UI layout in narrow containers or deeply nested business logic.

### 2. Seamless Router Adaptation (NuxtLink Compatible)
The component's underlying layer automatically detects the `Nuxt` environment. When used in Nuxt 3/4, route navigation is automatically handled by `NuxtLink`, supporting Prefetch.

## Use in Nuxt

`YhBreadcrumb` fully supports Nuxt auto-import.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">Home</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/dashboard">Dashboard</yh-breadcrumb-item>
  </yh-breadcrumb>
</DemoBlock>

## API

### Breadcrumb Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| separator | Separator string | `string` | `/` |
| separator-icon | Separator icon component | `string \| Component` | — |
| max-items | Maximum number of displayed items, collapses when exceeded | `number` | `0` (no collapse) |

### BreadcrumbItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| to | Route navigation target | `string \| object` | — |
| replace | Whether to replace the current route | `boolean` | `false` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-breadcrumb-font-size` | Font size | `14px` |
| `--yh-breadcrumb-item-color` | Default text color | `var(--yh-text-color-regular)` |
| `--yh-breadcrumb-last-color` | Last item text color | `var(--yh-text-color-primary)` |

<style scoped>
.demo-showcase {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
.demo-ctrl {
  background: var(--yh-fill-color-light);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.ctrl-row { display: flex; align-items: center; gap: 12px; }
.ctrl-row .label { font-size: 13px; font-weight: 600; color: var(--yh-text-color-secondary); min-width: 80px; }

.demo-viewport {
  padding: 40px;
  background: var(--yh-fill-color-extra-light);
  border-radius: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);
}
.yh-demo-column { display: flex; flex-direction: column; gap: 24px; }
</style>
