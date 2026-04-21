# 安装

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Vue**: >= 3.5.0
- **Node.js**: >= 18.0.0 (建议使用最新的 LTS 版本)
- **包管理器**: 推荐使用 [pnpm](https://pnpm.io/)

更需要的支持范围说明，包括浏览器范围、SSR 预期和 Nuxt 兼容边界，请参见 [兼容性与支持边界](/guide/compatibility)。

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

## 浏览器项目接入

当前文档主要围绕 npm 或 pnpm 的工程化接入方式维护。对于浏览器项目，建议通过构建工具集成 YH-UI，这样可以与当前发布包的导出、样式入口和类型声明保持一致。

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

::: tip 提示
`YhUIResolver()` 默认会自动按需引入组件对应的 CSS 样式，纯 CSS 项目可以直接使用，无需额外安装 Sass。
:::

## TypeScript 支持

如果您正在使用 TypeScript，当前发布包不需要额外配置 `types` 入口；需要时直接从公开导出中引入组件类型或辅助类型即可：

```ts
import type { ButtonProps } from '@yh-ui/yh-ui'
```
```
