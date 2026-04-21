# Installation

## Prerequisites

Before you begin, please ensure that your development environment meets the following requirements:

- **Vue**: >= 3.5.0
- **Node.js**: >= 18.0.0 (Latest LTS version recommended)
- **Package Manager**: Recommended: [pnpm](https://pnpm.io/)

For the full support contract, including browser support, SSR expectations, and Nuxt compatibility boundaries, see [Compatibility and Support Boundaries](/en/guide/compatibility).

## Using a Package Manager

We recommend using a package manager to install YH-UI to benefit from full type support and build optimizations.

::: code-group

```bash [pnpm]
pnpm add @yh-ui/yh-ui
```

```bash [npm]
npm install @yh-ui/yh-ui
```

```bash [yarn]
yarn add @yh-ui/yh-ui
```

:::

## Browser Usage

The current documentation is maintained around npm or pnpm installation in bundler-based projects. For browser projects, prefer integrating YH-UI through your build tool so that the package exports, styles, and types stay aligned with the published entries.

## On-demand Import

YH-UI supports **Tree Shaking** out of the box. By importing components directly, build tools (like Vite or Webpack) will automatically exclude unused code.

```vue
<script setup lang="ts">
import { YhButton } from '@yh-ui/yh-ui'
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
import { YhUIResolver } from '@yh-ui/yh-ui/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
})
```

::: tip Note
`YhUIResolver()` now auto-injects the matching CSS files for each component by default, so pure CSS projects can use it without installing Sass.
:::

## TypeScript Support

If you are using TypeScript, no extra `types` entry is required for the published package. Import component or helper types from the public package exports when needed:

```ts
import type { ButtonProps } from '@yh-ui/yh-ui'
```
```
