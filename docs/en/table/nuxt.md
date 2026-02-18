# Table - Nuxt Integration Guide

The `YH-UI` table component is fully compatible with Nuxt 3. This section covers how to elegantly import and use the table component in Nuxt projects, and how to resolve common SSR (Server-Side Rendering) issues.

## Quick Start

The best way to use `YH-UI` table in Nuxt 3 is through the **Plugins** approach for global registration.

### 1. Install Dependencies

Make sure `yh-ui` is installed in your project:

```bash
npm install yh-ui
# or
pnpm add yh-ui
```

### 2. Create Plugin

Create a `yh-ui.ts` file in the `plugins` directory:

```ts
// plugins/yh-ui.ts
import { defineNuxtPlugin } from '#app'
import YhUI from 'yh-ui'
import 'yh-ui/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(YhUI)
})
```

### 3. Configure Auto Import (Optional)

If you want to use auto-import functionality in Nuxt, configure it in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['yh-ui/dist/index.css'],
  build: {
    transpile: ['yh-ui']
  }
})
```

## Usage in Pages

After plugin configuration, you can use `<yh-table>` directly in any `.vue` page or component.

```vue
<template>
  <div class="container">
    <yh-table :data="tableData" :columns="columns" border />
  </div>
</template>

<script setup lang="ts">
const tableData = ref([
  { id: 1, name: 'Nuxt User', role: 'Developer' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name' },
  { prop: 'role', label: 'Role' }
]
</script>
```

## SSR Compatibility

### Client-Only Components

Some table component features involving DOM operations (such as **virtual scrolling**, **drag sorting**, **export/print**) depend on the browser environment. Although the component has internal environment detection, for optimal performance and to avoid Hydration errors, it's recommended to wrap with `<ClientOnly>` in these scenarios:

```vue
<template>
  <ClientOnly>
    <yh-table 
      :data="data" 
      :columns="columns"
      :virtual-config="{ enabled: true }"
    />
    <template #fallback>
      <!-- Loading placeholder content -->
      <div class="loading-placeholder">Loading...</div>
    </template>
  </ClientOnly>
</template>
```

### Directive Conflicts

If you're using `yh-tooltip` or similar directives, make sure Nuxt can correctly transpile the related packages. Adding `'yh-ui'` to the `transpile` configuration resolves most issues.

## Style Customization

In Nuxt 3, you can customize the table theme by modifying global CSS variables:

```css
/* assets/css/main.css */
:root {
  --yh-color-primary: #00dc82; /* Nuxt Green */
  --yh-table-header-bg: #f8fafc;
}
```

Then import this file in `nuxt.config.ts`.

## FAQ

### 1. Auto-import not working?
Make sure `yh-ui` is included in `build.transpile`, which ensures Nuxt can correctly parse the component library's ESM exports.

### 2. Hydration Mismatch warnings?
This usually happens when using randomly generated mock data. Ensure the `key` used in `v-for` is consistent between server and client, or use `<ClientOnly>`.

### 3. Icon library missing?
`YH-UI` table icons depend on the built-in icon library. If icons don't display properly, check that `yh-ui/dist/index.css` has been correctly imported.
