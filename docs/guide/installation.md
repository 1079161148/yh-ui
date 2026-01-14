# 安装

## 使用包管理器

我们推荐使用包管理器（如 pnpm、npm 或 yarn）来安装 YH-UI。

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

## 浏览器直接引入

如果你的项目不使用构建工具，可以直接通过 CDN 引入。

### unpkg

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/yh-ui/dist/style.css" />
  <!-- 引入 Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/yh-ui"></script>
</head>
```

### jsDelivr

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yh-ui/dist/style.css" />
  <!-- 引入 Vue -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- 引入组件库 -->
  <script src="https://cdn.jsdelivr.net/npm/yh-ui"></script>
</head>
```

::: warning 注意
使用 CDN 引入时，版本号建议锁定到具体版本，以避免未来版本升级带来的不兼容问题。
:::

## 按需引入

YH-UI 支持基于 ES Modules 的 Tree Shaking，你可以直接按需引入组件。

```ts
import { YhButton } from 'yh-ui'
```

### 自动按需引入（推荐）

使用 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 可以实现自动按需引入。

#### 安装

::: code-group

```bash [pnpm]
pnpm add -D unplugin-vue-components
```

```bash [npm]
npm install -D unplugin-vue-components
```

:::

#### 配置 Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from '@yh-ui/components/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
})
```

配置完成后，你可以直接在模板中使用组件，无需手动引入：

```vue
<template>
  <yh-button type="primary">按钮</yh-button>
</template>
```

## Volar 类型支持

如果你使用 Volar，请在 `tsconfig.json` 中添加以下配置以获得完整的类型提示：

```json
{
  "compilerOptions": {
    "types": ["yh-ui/global"]
  }
}
```
