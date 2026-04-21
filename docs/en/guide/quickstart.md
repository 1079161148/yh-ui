# Quick Start

This section will guide you on how to get YH-UI running in your project in the shortest possible time.

## 1. Full Import

The easiest way is to register all components globally in the entry file. This provides the best development experience but results in a larger initial bundle size.

```ts
// main.ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'

// Import global styles
import '@yh-ui/yh-ui/css'
import App from './App.vue'

const app = createApp(App)

// Register plugin
app.use(YhUI)
app.mount('#app')
```

## 2. Manual On-demand Import

Leveraging Vue 3's **Composition API**, you can import component packages only on the pages that need them, enjoying tree-shaking optimization.

```vue
<!-- App.vue -->
<script setup lang="ts">
import { YhButton } from '@yh-ui/yh-ui'
</script>

<template>
  <yh-button type="primary">Hello YH-UI</yh-button>
</template>
```

For full installation, prefer importing styles via `@yh-ui/yh-ui/css`, which is the stable public style entry exposed by the current package.

## 3. Global Configuration

YH-UI provides `createYhUI` for plugin installation. Runtime global settings such as `theme`, `locale`, `size`, and `zIndex` are still read from `YhConfigProvider`.

```ts
// main.ts
import { createApp } from 'vue'
import { createYhUI } from '@yh-ui/yh-ui'
import App from './App.vue'

const app = createApp(App)

const yhUI = createYhUI()

app.use(yhUI)
app.mount('#app')
```

## 4. Use in Nuxt 3/4 (Recommended)

If you are using Nuxt 3/4, install and register `@yh-ui/nuxt` to get module integration, auto-imports, and the package CSS entry.

👉 [View Nuxt Integration Guide](/en/guide/nuxt)

## Next Steps

Congratulations! You have successfully run YH-UI. Next:

- [Browse Component Library](/en/components/button) - Explore all available components.
- [Customize Themes](/en/guide/theming) - Create your unique design style.
- [Design Specification](/en/guide/design) - Review the theme variables and design tokens used by the library.
