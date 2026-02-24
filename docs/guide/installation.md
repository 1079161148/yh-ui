# 安装

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Vue**: >= 3.5.0
- **Node.js**: >= 18.12.0 (建议使用最新的 LTS 版本)
- **包管理器**: 推荐使用 [pnpm](https://pnpm.io/)

## 使用包管理器

我们推荐使用包管理器来安装 YH-UI，以便获得完善的类型支持和构建优化。

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

## 浏览器直接引入

你可以通过 CDN 直接在 HTML 中使用 YH-UI。我们支持 `unpkg` 和 `jsDelivr`。

::: code-group

```html [unpkg]
<head>
  <!-- 样式文件 -->
  <link rel="stylesheet" href="https://unpkg.com/@yh-ui/yh-ui/dist/style.css" />
  <!-- 依赖库 Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- 组件库 JS -->
  <script src="https://unpkg.com/@yh-ui/yh-ui"></script>
</head>
```

```html [jsDelivr]
<head>
  <!-- 样式文件 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yh-ui/yh-ui/dist/style.css" />
  <!-- 依赖库 Vue -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- 组件库 JS -->
  <script src="https://cdn.jsdelivr.net/npm/@yh-ui/yh-ui"></script>
</head>
```

:::

::: tip 提示
生产环境下，建议在 URL 中锁定具体的版本号（例如 `@yh-ui/yh-ui@1.0.0`），以避免非预期内的破坏性更新。
:::

## 按需引入

YH-UI 天生支持 **Tree Shaking**。只需直接引入组件，构建工具（如 Vite 或 Webpack）会自动剔除未使用的代码。

```vue
<script setup lang="ts">
import { YhButton } from '@yh-ui/yh-ui'
</script>
```

### 自动按需引入（推荐）

通过配合插件，你可以像使用原生 HTML 标签一样使用 YH-UI 组件，无需手动 `import`。

#### 1. 安装插件

```bash
pnpm add -D unplugin-vue-components
```

#### 2. 配置 Vite

在 `vite.config.ts` 中注册解析器：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from '@yh-ui/@yh-ui/@yh-ui/yh-ui/resolver' // 确保您已安装 @yh-ui/yh-ui

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        YhUIResolver({
          // 如果需要自动引入样式
          importStyle: 'sass'
        })
      ]
    })
  ]
})
```

## TypeScript 支持

如果您正在使用 TypeScript，建议在 `tsconfig.json` 中配置 `compilerOptions.types`，以确保全局组件拥有完善的类型推导：

```json
{
  "compilerOptions": {
    "types": ["@yh-ui/yh-ui/global"]
  }
}
```
