# 构建指南

本文档介绍 YH-UI 组件库的构建体系及其技术实现。

## 构建架构

YH-UI 采用基于 **[unbuild](https://github.com/unjs/unbuild)** 的统一构建架构。unbuild 是一款基于 Rollup 的下一代构建工具，特别适合 Monorepo 体系中的 Vue 3 组件库。

### 核心优势

*   **双端输出**：原生支持同时输出 ESM (.mjs) 和 CommonJS (.cjs)。
*   **极致 Tree-shaking**：通过 `mkdist` 模式保持原始目录结构输出，确保应用端能够实现最精确的代码剥离。
*   **Stub 模式**：支持开发者模式，通过符号链接实现源码实时生效，无需频繁编译。
*   **自动类型生成**：集成高效的类型生成方案，确保 TypeScript 支持。

## 快速开始

### 安装依赖

建议使用 **pnpm** 在根目录下安装所有依赖：

```bash
pnpm install
```

### 执行构建

进入组件库包目录进行构建，或在根目录执行全量构建：

```bash
# 全量构建所有包
pnpm build

# 仅构建组件库
pnpm build:components
```

### 开发模式 (Stub)

在开发组件库时，推荐使用 Stub 模式，它会建立源码到 dist 的软链接：

```bash
# 进入 packages/components 执行
pnpm dev
```

## 导出配置与用法

我们在 `package.json` 中配置了现代化的 `exports` 字段，以支持多种环境：

### 配置详情

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./resolver": {
      "types": "./dist/resolver.d.ts",
      "import": "./dist/resolver.mjs",
      "require": "./dist/resolver.cjs"
    }
  }
}
```

### 使用方式

#### ESM (推荐)
适配 Vite、Nuxt 3、Webpack 5 等现代工具：

```javascript
import { YhButton } from '@yh-ui/components'
```

#### CommonJS
适配 Node.js 或旧版 Webpack 环境：

```javascript
const { YhButton } = require('@yh-ui/components')
```

#### 局部导入 (Tree Shaking)
由于采用了 `mkdist` 结构，你可以直接指向具体文件实现极致优化：

```javascript
import YhButton from '@yh-ui/components/dist/button/index.mjs'
```

## 注意事项

1.  **样式导入**：组件样式通常通过 `@yh-ui/theme` 单独导入，或者使用我们的 `resolver` 实现按需自动导入。
2.  **副作用安全**：我们在 `sideEffects` 字段中正确标记了 CSS 文件，确保构建工具不会错误剥离样式。
3.  **环境要求**：构建工具链要求 Node.js >= 18.0.0。

## 故障排除

### 类型定义更新不及时
如果发现类型提示缺失，请确保执行了全量构建以刷新 `dist` 中的 `.d.ts` 文件。

### 开发模式修改未生效
确认是否运行了 `pnpm dev` (Stub 模式)。如果切换了文件结构，可能需要重新执行 Stub 命令。
