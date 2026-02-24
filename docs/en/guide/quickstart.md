# Quick Start

This section will guide you on how to get YH-UI running in your project in the shortest possible time.

## 1. Full Import

The easiest way is to register all components globally in the entry file. This provides the best development experience but results in a larger initial bundle size.

```ts
// main.ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'

// Import global styles
import '@yh-ui/yh-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)

// Register plugin
app.use(YhUI)
app.mount('#app')
```

## 2. Manual On-demand Import

Leveraging Vue 3's **Composition API**, you can import component packages only on the pages that need them, enjoying extreme Tree Shaking optimization.

```vue
<!-- App.vue -->
<script setup lang="ts">
import { YhButton } from '@yh-ui/yh-ui'
</script>

<template>
  <yh-button type="primary">Hello YH-UI</yh-button>
</template>
```

## 3. Global Configuration

YH-UI provides a global configuration method `createYhUI` that allows you to customize the library's behavior (such as default component sizes, Z-Index, etc.).

```ts
// main.ts
import { createApp } from 'vue'
import { createYhUI } from '@yh-ui/yh-ui'
import App from './App.vue'

const app = createApp(App)

const yhUI = createYhUI({
  // Globally define the default size of components: 'small' | 'default' | 'large'
  size: 'default',
  // Base z-index for pop-up components
  zIndex: 3000,
  // Style class name prefix (default "yh")
  namespace: 'yh'
})

app.use(yhUI)
app.mount('#app')
```

## 4. Use in Nuxt 3 (Recommended)

If you are using the Nuxt 3 framework, we provide exclusive module support. You can enjoy automatic on-demand loading and SSR optimization with a single step.

👉 [View Nuxt Integration Guide](/guide/nuxt)

## 🏁 Next Steps

Congratulations! You have successfully run YH-UI. Next:

- 🛠️ [Browse Component Library](/components/button) - Explore all available components.
- 🎨 [Customize Themes](/guide/theming) - Create your unique design style.
- ⚡ [Performance Optimization](/guide/design) - Learn how to further optimize your application.
