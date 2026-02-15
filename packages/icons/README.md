# @yh-ui/icons

高性能图标库，基于 Iconify 集成，支持 100+ 图标集，按需加载，零运行时开销。

## 特性

- 🚀 **高性能** - 使用 unplugin-icons 实现编译时按需加载
- 📦 **体积小** - Tree-shaking 极致化，只有用到的图标才会被打包
- 🎨 **100+ 图标集** - 整合 Iconify 生态，20 万+ 图标
- 🔧 **完全兼容** - 保持与现有 YhIcon 组件 API 兼容
- 🌳 **SSR 支持** - 支持服务端渲染

## 安装

```bash
pnpm add @yh-ui/icons @iconify/vue
```

## 快速开始

### 方式一：使用 Vite 插件按需加载（推荐）

安装依赖：

```bash
pnpm add -D unplugin-icons @iconify/json
```

配置 `vite.config.ts`：

```typescript
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
      // 启用这些图标集
      collections: {
        mdi: collections.mdi,
        ep: collections.ep,
        lucide: collections.lucide,
        tabler: collections.tabler,
        ri: collections.ri,
      }
    })
  ]
})
```

### 方式二：直接使用（无需配置）

```vue
<script setup>
import { Icon } from '@yh-ui/icons/vue'
</script>

<template>
  <!-- 使用前缀:图标名格式 -->
  <Icon icon="mdi:home" />
  
  <!-- 使用自定义尺寸和颜色 -->
  <Icon icon="mdi:home" :size="24" color="#ff0000" />
  
  <!-- 旋转动画 -->
  <Icon icon="mdi:loading" spin />
</template>
```

## 使用方法

### 图标名称格式

支持多种图标名称格式：

```vue
<!-- 1. 前缀:图标名（推荐） -->
<Icon icon="mdi:home" />
<Icon icon="ep:search" />
<Icon icon="lucide:check" />

<!-- 2. 斜杠分隔（兼容 Iconify） -->
<Icon icon="mdi/home" />
<Icon icon="ep/search" />

<!-- 3. 简写名称（需配置默认图标集） -->
<Icon icon="home" />  <!-- 等同于 mdi:home -->
```

### 常用图标集

| 图标集 | 前缀 | 图标数量 | 说明 |
|--------|------|----------|------|
| Material Design Icons | `mdi` | 7000+ | 最流行的开源图标库 |
| Element Plus | `ep` | 200+ | Element Plus 官方图标 |
| Lucide | `lucide` | 1500+ | 现代简洁风格 |
| Tabler Icons | `tabler` | 4600+ | 高质量 SVG 图标 |
| Remix Icon | `ri` | 2500+ | 精心设计的图标库 |
| Heroicons | `heroicons` | 600+ | Tailwind CSS 官方图标 |
| Bootstrap Icons | `bi` | 2600+ | Bootstrap 官方图标 |
| Font Awesome 6 | `fa` | 2000+ | 最流行的图标字体 |

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `icon` | `string` | `''` | 图标名称 |
| `size` | `number \| string` | `undefined` | 图标尺寸 |
| `color` | `string` | `undefined` | 图标颜色 |
| `spin` | `boolean` | `false` | 是否旋转动画 |
| `rotate` | `number` | `0` | 旋转角度（0, 90, 180, 270） |

### 与现有 YhIcon 组件兼容

现有的 `YhIcon` 组件完全兼容，无需修改：

```vue
<script setup>
import { YhIcon } from '@yh-ui/icons/vue'
// 或从 @yh-ui/components
import { YhIcon } from '@yh-ui/components'
</script>

<template>
  <!-- 两种方式都可以使用 -->
  <YhIcon name="mdi:home" />
  <YhIcon icon="ep:search" :size="20" color="#409EFF" />
</template>
```

### 常用图标快捷方式

内置常用图标别名：

```vue
<template>
  <!-- 箭头 -->
  <Icon icon="arrow-up" />
  <Icon icon="arrow-down" />
  <Icon icon="arrow-left" />
  <Icon icon="arrow-right" />
  
  <!-- 操作 -->
  <Icon icon="close" />
  <Icon icon="check" />
  <Icon icon="plus" />
  <Icon icon="minus" />
  <Icon icon="delete" />
  <Icon icon="edit" />
  <Icon icon="search" />
  <Icon icon="upload" />
  <Icon icon="download" />
  <Icon icon="refresh" />
  <Icon icon="settings" />
  <Icon icon="menu" />
  
  <!-- 状态 -->
  <Icon icon="loading" />
  <Icon icon="success" />
  <Icon icon="warning" />
  <Icon icon="error" />
  <Icon icon="info" />
  
  <!-- 用户 -->
  <Icon icon="user" />
  <Icon icon="users" />
  
  <!-- 文件 -->
  <Icon icon="file" />
  <Icon icon="folder" />
  <Icon icon="image" />
</template>
```

## TypeScript 支持

完整的 TypeScript 类型支持：

```typescript
import type { IconName, IconSize, IconColor } from '@yh-ui/icons'
import { AVAILABLE_COLLECTIONS, RECOMMENDED_COLLECTIONS } from '@yh-ui/icons'

// 获取所有可用的图标集
console.log(AVAILABLE_COLLECTIONS)

// 获取推荐的图标集
console.log(RECOMMENDED_COLLECTIONS)
```

## 图标集管理

### 启用/禁用图标集

在 vite.config.ts 中配置：

```typescript
import Icons from 'unplugin-icons/vite'
import { collections } from '@iconify/json'

export default defineConfig({
  plugins: [
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      collections: {
        // 只启用需要的图标集，减少打包体积
        mdi: collections.mdi,    // Material Design Icons
        ep: collections.ep,     // Element Plus
        lucide: collections.lucide, // Lucide
      }
    })
  ]
})
```

### 按需加载的优势

使用 unplugin-icons 按需加载时：

- **开发环境**：只在代码中使用的图标会被加载
- **生产环境**：只打包实际使用的图标 SVG 代码
- **Tree-shaking**：未使用的图标会被完全剔除

对比全量引入，按需加载可以减少 90%+ 的图标相关代码体积。

## 常见问题

### 1. 图标不显示？

确保：
1. 图标集已在 vite.config.ts 中启用
2. 图标名称格式正确（如 `mdi:home`）
3. 已安装 `@iconify/vue` 依赖

### 2. 如何查找图标？

访问 [Iconify 图标库](https://icon-sets.iconify.design/) 搜索图标。

### 3. 如何使用自定义图标？

在 vite.config.ts 中添加自定义图标集：

```typescript
import Icons from 'unplugin-icons/vite'
import customIcons from './custom-icons.json'

export default defineConfig({
  plugins: [
    Icons({
      compiler: 'vue3',
      collections: {
        'custom': customIcons
      }
    })
  ]
})
```

## License
