# 快速开始

学习如何安装和配置 @yh-ui/icons 图标库。

## 安装

```bash
# 使用 pnpm
pnpm add @yh-ui/icons @iconify/vue

# 使用 npm
npm install @yh-ui/icons @iconify/vue

# 使用 yarn
yarn add @yh-ui/icons @iconify/vue
```

## 配置 Vite

为了实现按需加载和最佳性能，需要在 `vite.config.ts` 中配置 `unplugin-icons`：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { collections } from '@iconify/json'

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      // 自动安装图标集
      autoInstall: true,
      // 启用需要的图标集
      collections: {
        mdi: collections.get('mdi'),     // Material Design Icons
        ep: collections.get('ep'),       // Element Plus
        lucide: collections.get('lucide'), // Lucide
        tabler: collections.get('tabler'), // Tabler Icons
        ri: collections.get('ri'),       // Remix Icon
      }
    })
  ]
})
```

## 使用方式

### 基本用法

<DemoBlock title="基本用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="lucide:check" :size="24" />
  </div>
</DemoBlock>

### Props 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | `''` | 图标名称，支持 `前缀:图标名` 格式 |
| `icon` | `string` | `''` | 图标名称（与 name 等效，优先级更高） |
| `size` | `number \| string` | `undefined` | 图标尺寸，如 `24` 或 `'2em'` |
| `color` | `string` | `undefined` | 图标颜色，如 `'#409EFF'` 或 `'red'` |
| `spin` | `boolean` | `false` | 是否显示旋转动画 |
| `rotate` | `number` | `0` | 旋转角度，可选 `90`、`180`、`270` |

### 图标名称格式

支持多种图标名称格式：

<DemoBlock title="图标名称格式" :ts-code="tsNameFormat" :js-code="jsNameFormat">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:arrow-right" :size="24" />
  </div>
</DemoBlock>

### 示例：常用图标

<DemoBlock title="常用图标" :ts-code="tsCommon" :js-code="jsCommon">
  <div class="icon-demo">
    <Icon icon="mdi:arrow-up" :size="24" />
    <Icon icon="mdi:arrow-down" :size="24" />
    <Icon icon="mdi:arrow-left" :size="24" />
    <Icon icon="mdi:arrow-right" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="ep:edit" :size="24" />
    <Icon icon="ep:delete" :size="24" />
    <Icon icon="ep:plus" :size="24" />
    <Icon icon="lucide:check-circle" color="#67C23A" :size="24" />
    <Icon icon="lucide:alert-circle" color="#E6A23C" :size="24" />
    <Icon icon="lucide:x-circle" color="#F56C6C" :size="24" />
    <Icon icon="lucide:info" color="#409EFF" :size="24" />
  </div>
</DemoBlock>

### 自定义尺寸和颜色

<DemoBlock title="自定义尺寸和颜色" :ts-code="tsSizeColor" :js-code="jsSizeColor">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="16" />
    <Icon icon="mdi:home" :size="32" color="#409EFF" />
    <Icon icon="mdi:home" size="2em" />
  </div>
</DemoBlock>

### 旋转和动画

<DemoBlock title="旋转和动画" :ts-code="tsRotate" :js-code="jsRotate">
  <div class="icon-demo">
    <Icon icon="mdi:loading" spin :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="180" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="270" :size="24" />
  </div>
</DemoBlock>

## 按需加载的优势

### 性能对比

| 引入方式 | 打包体积 | 请求数量 |
|----------|----------|----------|
| 全量引入 (所有图标) | ~500KB+ | 0 (内置) |
| 按需加载 (只用的图标) | ~5-20KB | 0 (编译时) |

### 工作原理

1. **开发环境**：只在代码中使用的图标会被加载
2. **生产环境**：只打包实际使用的图标 SVG 代码
3. **Tree-shaking**：未使用的图标会被完全剔除

### 效果示例

```typescript
// 如果只使用这些图标
import { Icon } from '@yh-ui/icons/vue'

// 编译后只会包含这 3 个图标的 SVG 代码
<Icon name="mdi:home" />
<Icon name="ep:search" />
<Icon name="lucide:settings" />
```

## 常见问题

### 1. 图标不显示？

确保：
1. 图标集已在 vite.config.ts 中启用
2. 图标名称格式正确（如 `mdi:home`）
3. 已安装 `@iconify/vue` 依赖

### 2. 如何查找图标？

访问 [Iconify 图标库](https://icon-sets.iconify.design/) 搜索图标。

### 3. 性能优化建议

- 只启用项目需要的图标集
- 使用 Tree-shaking 友好的导入方式
- 避免动态拼接图标名称

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// 基本用法
const tsBasic = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="ep:search" />
  <Icon icon="lucide:check" />
</template>`
const jsBasic = tsBasic

// 图标名称格式
const tsNameFormat = `<template>
  <!-- 1. 前缀:图标名（推荐） -->
  <Icon icon="mdi:home" />

  <!-- 2. 斜杠分隔（兼容 Iconify） -->
  <Icon icon="mdi/home" />
</template>`
const jsNameFormat = tsNameFormat

// 常用图标
const tsCommon = `<template>
  <!-- 箭头图标 -->
  <Icon icon="mdi:arrow-up" />
  <Icon icon="mdi:arrow-down" />
  <Icon icon="mdi:arrow-left" />
  <Icon icon="mdi:arrow-right" />

  <!-- 操作图标 -->
  <Icon icon="ep:search" />
  <Icon icon="ep:edit" />
  <Icon icon="ep:delete" />
  <Icon icon="ep:plus" />

  <!-- 状态图标 -->
  <Icon icon="lucide:check-circle" color="#67C23A" />
  <Icon icon="lucide:alert-circle" color="#E6A23C" />
  <Icon icon="lucide:x-circle" color="#F56C6C" />
  <Icon icon="lucide:info" color="#409EFF" />
</template>`
const jsCommon = tsCommon

// 自定义尺寸和颜色
const tsSizeColor = `<template>
  <!-- 小图标 -->
  <Icon icon="mdi:home" :size="16" />

  <!-- 大图标 -->
  <Icon icon="mdi:home" :size="32" color="#409EFF" />

  <!-- 使用 CSS 单位 -->
  <Icon icon="mdi:home" size="2em" />
</template>`
const jsSizeColor = tsSizeColor

// 旋转和动画
const tsRotate = `<template>
  <!-- 旋转动画 -->
  <Icon icon="mdi:loading" spin />

  <!-- 固定角度旋转 -->
  <Icon icon="mdi:arrow-right" :rotate="90" />
  <Icon icon="mdi:arrow-right" :rotate="180" />
  <Icon icon="mdi:arrow-right" :rotate="270" />
</template>`
const jsRotate = tsRotate
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 24px;
  color: var(--yh-text-color-primary);
}
</style>
