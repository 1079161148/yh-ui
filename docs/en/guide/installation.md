# Installation

## Prerequisites

Before you begin, please ensure that your development environment meets the following requirements:

- **Vue**: >= 3.5.0
- **Node.js**: >= 18.12.0 (Latest LTS version recommended)
- **Package Manager**: Recommended: [pnpm](https://pnpm.io/)

## Using a Package Manager

We recommend using a package manager to install YH-UI to benefit from full type support and build optimizations.

::: code-group

```bash [pnpm]
pnpm add yh-ui
```

```bash [npm]
npm install yh-ui
```

```bash [yarn]
yarn add yh-ui
```

:::

## CDN Usage

You can use YH-UI directly in HTML via CDN. We support `unpkg` and `jsDelivr`.

::: code-group

```html [unpkg]
<head>
  <!-- Style file -->
  <link rel="stylesheet" href="https://unpkg.com/yh-ui/dist/style.css" />
  <!-- Dependency Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- Component Library JS -->
  <script src="https://unpkg.com/yh-ui"></script>
</head>
```

```html [jsDelivr]
<head>
  <!-- Style file -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yh-ui/dist/style.css" />
  <!-- Dependency Vue -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- Component Library JS -->
  <script src="https://cdn.jsdelivr.net/npm/yh-ui"></script>
</head>
```

:::

::: tip Note
In production environments, it is recommended to lock specific version numbers in the URL (e.g., `yh-ui@1.0.0`) to avoid unintentional breaking changes.
:::

## On-demand Import

YH-UI supports **Tree Shaking** out of the box. By importing components directly, build tools (like Vite or Webpack) will automatically exclude unused code.

```vue
<script setup lang="ts">
import { YhButton } from 'yh-ui'
</script>
```

### Automatic On-demand Import (Recommended)

With the help of plugins, you can use YH-UI components just like native HTML tags without manual `import` calls.

#### 1. Install Plugins

```bash
pnpm add -D unplugin-vue-components
```

#### 2. Configure Vite

Register the resolver in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from 'yh-ui/resolver' // Ensure you have installed yh-ui

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        YhUIResolver({
          // If automatic style import is required
          importStyle: 'sass' 
        })
      ]
    })
  ]
})
```

## TypeScript Support

If you are using TypeScript, we recommend configuring `compilerOptions.types` in `tsconfig.json` to ensure full type inference for global components:

```json
{
  "compilerOptions": {
    "types": ["yh-ui/global"]
  }
}
```
