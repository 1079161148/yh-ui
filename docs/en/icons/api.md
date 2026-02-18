# API Reference

Complete API documentation, including components, types, and functions.

## YhIcon Component

### Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Icon name, supports the `prefix:icon-name` format. | `string` | `''` |
| `icon` | Icon name (equivalent to `name`, but with higher priority). | `string` | `''` |
| `svg` | Custom SVG string (excluding the `<svg>` tag). | `string` | `''` |
| `component` | Vue component | `Component` | `undefined` |
| `size` | Icon size | `number \| string` | `undefined` |
| `color` | Icon color | `string` | `undefined` |
| `spin` | Whether to show a spin animation. | `boolean` | `false` |
| `rotate` | Rotation angle (0, 90, 180, 270). | `number` | `0` |

### Slots

| Slot Name | Description |
| --- | --- |
| `default` | Custom icon content. |

### Events

No native events; supports transparent transmission of all native attributes.

### Usage Examples

<DemoBlock title="YhIcon Component Usage" :ts-code="tsYhIcon" :js-code="jsYhIcon">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:home" :size="32" color="#409EFF" />
    <Icon icon="mdi:loading" spin :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
  </div>
</DemoBlock>

## Icon Component

An alias for `YhIcon`, fully compatible.

<DemoBlock title="Icon Component Usage" :ts-code="tsIcon" :js-code="jsIcon">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="lucide:settings" :size="24" />
  </div>
</DemoBlock>

## Type Definitions

### IconName

Icon name type.

```typescript
type IconName = string
```

Supported formats:
- Short name: `'home'`
- With prefix: `'mdi:home'`
- Slash separator: `'mdi/home'`

### IconSize

Icon size type.

```typescript
type IconSize = number | string
```

Examples:
- Number: `24`
- Pixel string: `'24px'`
- CSS unit: `'2em'`

### IconColor

Icon color type.

```typescript
type IconColor = string
```

Examples:
- Hexadecimal: `'#409EFF'`
- Color name: `'red'`
- CSS variable: `'var(--yh-color-primary)'`

### IconRotate

Icon rotation angle type.

```typescript
type IconRotate = 0 | 90 | 180 | 270
```

### IconProps

Props type for the icon component.

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

Icon collection configuration type.

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

Icon preset type.

```typescript
interface IconPreset {
  name: string
  prefix: string
  count: number
  description?: string
}
```

## Utility Functions

### parseIconName

Parses an icon name into the standard format.

```typescript
function parseIconName(name: string): string
```

**Parameters**:
- `name`: Icon name

**Return Value**: The parsed icon name.

**Example**:

```typescript
import { parseIconName } from '@yh-ui/icons'

parseIconName('home')        // 'mdi:home'
parseIconName('mdi:home')    // 'mdi:home'
parseIconName('mdi/home')    // 'mdi:home'
```

### iconExists

Checks if an icon exists.

```typescript
async function iconExists(name: string): Promise<boolean>
```

**Parameters**:
- `name`: Icon name

**Return Value**: Whether the icon exists.

**Example**:

```typescript
import { iconExists } from '@yh-ui/icons'

const exists = await iconExists('mdi:home')
console.log(exists) // true
```

### getIconData

Retrieves the SVG data for an icon.

```typescript
async function getIconData(name: string): Promise<IconifyIcon>
```

**Parameters**:
- `name`: Icon name

**Return Value**: The SVG data of the icon.

**Example**:

```typescript
import { getIconData } from '@yh-ui/icons'

const iconData = await getIconData('mdi:home')
console.log(iconData)
```

### getCollectionPrefixes

Retrieves a list of available icon set prefixes.

```typescript
function getCollectionPrefixes(): string[]
```

**Example**:

```typescript
import { getCollectionPrefixes } from '@yh-ui/icons'

const prefixes = getCollectionPrefixes()
console.log(prefixes) // ['mdi', 'ep', 'lucide', ...]
```

## Constants

### AVAILABLE_COLLECTIONS

A complete list of all available icon collections.

```typescript
const AVAILABLE_COLLECTIONS = [
  { prefix: 'mdi', name: 'Material Design Icons', count: 7000 },
  { prefix: 'ep', name: 'Element Plus', count: 200 },
  { prefix: 'lucide', name: 'Lucide', count: 1500 },
  // ...
] as const
```

### RECOMMENDED_COLLECTIONS

A list of recommended icon set prefixes.

```typescript
const RECOMMENDED_COLLECTIONS = ['mdi', 'ep', 'lucide', 'tabler', 'ri'] as const
```

### COMMON_ICONS

A mapping of common icon aliases.

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

## Vue Component Auto-import

When used in Nuxt, components are automatically imported:

```vue
<template>
  <!-- No manual import required -->
  <YhIcon name="mdi:home" />
</template>
```

For detailed Nuxt integration, please refer to [Using in Nuxt](/guide/nuxt).

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// YhIcon Component Usage
const tsYhIcon = `<template>
  <!-- Basic Usage -->
  <Icon icon="mdi:home" />

  <!-- Custom Size -->
  <Icon icon="mdi:home" :size="32" color="#409EFF" />

  <!-- Spin Animation -->
  <Icon icon="mdi:loading" spin />

  <!-- Rotation Angle -->
  <Icon icon="mdi:arrow-right" :rotate="90" />
</template>`
const jsYhIcon = tsYhIcon

// Icon Component Usage
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
