# Deep Recipe: YH-UI Icons

Use this recipe when integrating and rendering icons across YH-UI components. YH-UI uses a high-performance icon system based on Iconify, supporting thousands of icons with zero runtime overhead.

## Default Choice

Use the `Icon` component (aliased as `YhIcon`) from `@yh-ui/icons/vue` or `@yh-ui/icons`.

## Usage Patterns

### 1. Iconify String Name (Recommended)

You can reference any icon using the standard `collection:icon` syntax. The package loads the icon asynchronously.

```vue
<script setup lang="ts">
import { Icon } from '@yh-ui/icons/vue'
</script>

<template>
  <!-- Material Design Icons collection -->
  <Icon icon="mdi:home" />

  <!-- Element Plus Icons collection -->
  <Icon icon="ep:search" />

  <!-- Lucide Icons collection -->
  <Icon icon="lucide:settings" />
</template>
```

### 2. Pre-registered Aliases

You can use simplified short names for common UI actions (which resolve to pre-configured presets under the hood):

```vue
<template>
  <Icon name="home" />
  <!-- Resolves to mdi:home -->
  <Icon name="search" />
  <!-- Resolves to mdi:magnify -->
  <Icon name="loading" />
  <!-- Resolves to mdi:loading -->
</template>
```

### 3. SVG Strings

If you need to render raw SVG data dynamically without loading it from an external collection:

```vue
<script setup lang="ts">
import { Icon } from '@yh-ui/icons/vue'

const customSvg = '<path d="M12 2L2 22h20L12 2z" fill="currentColor"/>'
</script>

<template>
  <Icon :svg="customSvg" />
</template>
```

### 4. Custom Icon Components

If you've imported raw Vue component icons from a local folder or another icon package:

```vue
<script setup lang="ts">
import { Icon } from '@yh-ui/icons/vue'
import CustomStarComponent from './CustomStar.vue'
</script>

<template>
  <Icon :component="CustomStarComponent" />
</template>
```

## Styling & Animations

### Size and Color

Adjust sizing (takes either numbers for pixel dimensions or CSS string values) and fill colors:

```vue
<template>
  <Icon icon="mdi:heart" :size="24" color="var(--yh-color-danger)" />
  <Icon icon="mdi:heart" size="2rem" color="#ff4d4f" />
</template>
```

### Rotating & Spin Animations

Apply static rotations or infinite spinning animations (highly useful for loading states):

```vue
<template>
  <!-- Rotated 90 degrees -->
  <Icon icon="mdi:chevron-right" :rotate="90" />

  <!-- Infinite spin animation (1s full rotation) -->
  <Icon icon="mdi:loading" spin />
</template>
```

## Integration with YH-UI Components

Many YH-UI components support passing an icon name directly or via slots:

```vue
<script setup lang="ts">
import { YhButton, YhInput } from '@yh-ui/components'
import { Icon } from '@yh-ui/icons/vue'
</script>

<template>
  <!-- Passing icon prop -->
  <YhButton type="primary" icon="mdi:plus">Add User</YhButton>

  <!-- Custom slot rendering -->
  <YhInput placeholder="Enter username">
    <template #prefix>
      <Icon icon="mdi:account" :size="16" />
    </template>
  </YhInput>
</template>
```
