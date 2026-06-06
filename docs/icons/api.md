# API 参考

完整的 API 文档，包含组件、类型和函数。

## YhIcon 组件

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 图标名称，支持 `前缀:图标名` 格式 | `string` | `''` |
| `icon` | 图标名称（与 name 等效，优先级更高） | `string` | `''` |
| `svg` | 自定义 SVG 字符串（不含 `<svg>` 标签） | `string` | `''` |
| `component` | Vue 组件 | `Component` | `undefined` |
| `size` | 图标尺寸 | `number \| string` | `undefined` |
| `color` | 图标颜色 | `string` | `undefined` |
| `spin` | 是否显示旋转动画 | `boolean` | `false` |
| `rotate` | 旋转角度（0, 90, 180, 270） | `number` | `0` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义图标内容 |

### Events

无原生事件，支持所有原生属性透传。

### 使用示例

<DemoBlock title="YhIcon 组件用法" :ts-code="tsYhIcon" :js-code="jsYhIcon">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:home" :size="32" color="#409EFF" />
    <Icon icon="mdi:loading" spin :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
  </div>
</DemoBlock>

## Icon 组件

`YhIcon` 的别名，完全兼容。

<DemoBlock title="Icon 组件用法" :ts-code="tsIcon" :js-code="jsIcon">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="lucide:settings" :size="24" />
  </div>
</DemoBlock>

## 类型定义

### IconName

图标名称类型。

```typescript
type IconName = string
```

支持格式：
- 简写名称：`'home'`
- 带前缀：`'mdi:home'`
- 斜杠分隔：`'mdi/home'`

### IconSize

图标尺寸类型。

```typescript
type IconSize = number | string
```

示例：
- 数字：`24`
- 像素字符串：`'24px'`
- CSS 单位：`'2em'`

### IconColor

图标颜色类型。

```typescript
type IconColor = string
```

示例：
- 十六进制：`'#409EFF'`
- 颜色名称：`'red'`
- CSS 变量：`'var(--yh-color-primary)'`

### IconRotate

图标旋转角度类型。

```typescript
type IconRotate = 0 | 90 | 180 | 270
```

### IconProps

图标组件的 Props 类型。

```typescript
interface IconProps {
  name?: IconName
  icon?: IconName
  svg?: string
  component?: Component
  size?: IconSize
  color?: IconColor
  spin?: boolean
  rotate?: IconRotate
}
```

### IconCollection

图标集配置类型。

```typescript
interface IconCollection {
  name: string
  prefix: string
  author?: string
  license?: string
  total: number
}
```

### IconPreset

图标预设类型。

```typescript
interface IconPreset {
  name: string
  prefix: string
  count: number
  description?: string
}
```

## 工具函数

### parseIconName

解析图标名称为标准格式。

```typescript
function parseIconName(name: string): string
```

**参数**：
- `name`: 图标名称

**返回值**：解析后的图标名称

**示例**：

```typescript
import { parseIconName } from '@yh-ui/icons'

parseIconName('home')        // 'mdi:home'
parseIconName('mdi:home')    // 'mdi:home'
parseIconName('mdi/home')    // 'mdi:home'
```

### iconExists

检查图标是否存在。

```typescript
async function iconExists(name: string): Promise<boolean>
```

**参数**：
- `name`: 图标名称

**返回值**：图标是否存在

**示例**：

```typescript
import { iconExists } from '@yh-ui/icons'

const exists = await iconExists('mdi:home')
console.log(exists) // true
```

### getIconData

获取图标的 SVG 数据。

```typescript
async function getIconData(name: string): Promise<IconifyIcon>
```

**参数**：
- `name`: 图标名称

**返回值**：图标的 SVG 数据

**示例**：

```typescript
import { getIconData } from '@yh-ui/icons'

const iconData = await getIconData('mdi:home')
console.log(iconData)
```

### getCollectionPrefixes

获取可用的图标集前缀列表。

```typescript
function getCollectionPrefixes(): string[]
```

**示例**：

```typescript
import { getCollectionPrefixes } from '@yh-ui/icons'

const prefixes = getCollectionPrefixes()
console.log(prefixes) // ['mdi', 'ep', 'lucide', ...]
```

## 常量

### AVAILABLE_COLLECTIONS

所有可用的图标集列表。

```typescript
const AVAILABLE_COLLECTIONS = [
  { prefix: 'mdi', name: 'Material Design Icons', count: 7000 },
  { prefix: 'ep', name: 'Element Plus', count: 200 },
  { prefix: 'lucide', name: 'Lucide', count: 1500 },
  // ...
] as const
```

### RECOMMENDED_COLLECTIONS

推荐的图标集前缀列表。

```typescript
const RECOMMENDED_COLLECTIONS = ['mdi', 'ep', 'lucide', 'tabler', 'ri'] as const
```

### COMMON_ICONS

常用图标别名映射。

```typescript
const COMMON_ICONS = {
  'arrow-up': 'mdi:arrow-up',
  'arrow-down': 'mdi:arrow-down',
  'close': 'mdi:close',
  'check': 'mdi:check',
  'search': 'mdi:magnify',
  // ...
} as const
```

## Vue 组件自动导入

在 Nuxt 中使用时，组件会自动导入：

```vue
<template>
  <!-- 无需手动导入 -->
  <YhIcon name="mdi:home" />
</template>
```

详细的 Nuxt 集成请参考 [在 Nuxt 中使用](/guide/nuxt)。

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// YhIcon 组件用法
const tsYhIcon = `<template>
  <!-- 基本用法 -->
  <Icon icon="mdi:home" />

  <!-- 自定义尺寸 -->
  <Icon icon="mdi:home" :size="32" color="#409EFF" />

  <!-- 旋转动画 -->
  <Icon icon="mdi:loading" spin />

  <!-- 旋转角度 -->
  <Icon icon="mdi:arrow-right" :rotate="90" />
</template>`
const jsYhIcon = tsYhIcon

// Icon 组件用法
const tsIcon = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="ep:search" />
  <Icon icon="lucide:settings" />
</template>`
const jsIcon = tsIcon
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
