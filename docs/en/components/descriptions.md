# Descriptions

<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'large' | 'default' | 'small'>('default')

// =====================================
// Basic Usage
// =====================================
const tsBasic = `<template>
  <yh-descriptions title="Application Details">
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions title="Application Details" border style="margin-top: 20px">
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>`

const jsBasic = tsBasic


// =====================================
// Custom Sizes
// =====================================
const tsSize = `<template>
  <yh-radio-group v-model="size" style="margin-bottom: 20px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>

  <yh-descriptions
    title="Vertical Layout with Border"
    :column="3"
    :size="size"
    border
    direction="vertical"
  >
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions
    title="Vertical Layout without Border"
    :column="3"
    :size="size"
    direction="vertical"
    style="margin-top: 20px"
  >
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'large' | 'default' | 'small'>('default')
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

// =====================================
// Long Content Display
// =====================================
const tsLongContent = `<template>
  <yh-descriptions title="Long Content Display" :column="2" border>
    <yh-descriptions-item label="Product Name">
      Apple MacBook Pro 16-inch M3 Max Chip Laptop
    </yh-descriptions-item>
    <yh-descriptions-item label="Price">
      $3,499.00
    </yh-descriptions-item>
    <yh-descriptions-item label="Description" :span="2">
      Equipped with the M3 Max chip, featuring a 14-core CPU, 30-core GPU, and 16-core Neural Engine. Supports up to 128GB of unified memory and up to 8TB of storage space. 16.2-inch Liquid Retina XDR display with peak brightness up to 1600 nits, ProMotion adaptive refresh rate technology, and True Tone display. MagSafe 3 charging port, three Thunderbolt 4 ports, HDMI port, SDXC card slot, high-impedance headphone jack. Six-speaker sound system with spatial audio. 1080p FaceTime HD camera. Touch ID. Magic Keyboard with a full-height function key row (including Touch ID). Force Touch trackpad. Up to 22 hours of battery life.
    </yh-descriptions-item>
    <yh-descriptions-item label="Tags">
      <yh-tag type="success" size="small" style="margin-right: 4px">Official</yh-tag>
      <yh-tag type="warning" size="small" style="margin-right: 4px">Limited Offer</yh-tag>
      <yh-tag type="danger" size="small">Hot Sale</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag type="success">In Stock</yh-tag>
    </yh-descriptions-item>
  </yh-descriptions>
</template>`

const jsLongContent = tsLongContent

// =====================================
// Custom Styles
// =====================================
const tsCustomStyle = `<template>
  <yh-descriptions title="Core Performance Panel" :column="3" border>
    <template #extra>
      <yh-button type="primary" link>Operation</yh-button>
    </template>
    <yh-descriptions-item
      label="App ID"
      label-align="right"
      align="center"
      :label-style="{ color: '#409eff', fontWeight: 'bold' }"
      :content-style="{ backgroundColor: 'rgba(64, 158, 255, 0.1)' }"
    >
      YH-Admin-Edge
    </yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>`

const jsCustomStyle = tsCustomStyle

// =====================================
// Nuxt Usage
// =====================================
const tsNuxt = `<template>
  <yh-descriptions title="User Details" border>
    <yh-descriptions-item label="Username">{{ user.name }}</yh-descriptions-item>
    <yh-descriptions-item label="Email">{{ user.email }}</yh-descriptions-item>
    <yh-descriptions-item label="Created At">{{ user.createdAt }}</yh-descriptions-item>
  </yh-descriptions>
</template>

<script setup lang="ts">
// Components are automatically imported in Nuxt
interface User {
  name: string
  email: string
  createdAt: string
}

const user = ref<User>({
  name: 'YH-Admin-Edge',
  email: 'test@example.com',
  createdAt: '2024-01-01'
})
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '').replace('ref<User>', 'ref')
</script>

Displays multiple read-only fields in groups, commonly used for displaying information on detail pages.

## Basic Usage

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-descriptions title="Application Details">
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions title="Application Details" border style="margin-top: 20px">
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>


## Custom Sizes

<DemoBlock title="Custom Sizes" :ts-code="tsSize" :js-code="jsSize">
  <yh-radio-group v-model="size" style="margin-bottom: 20px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>

  <yh-descriptions
    title="Vertical Layout with Border"
    :column="3"
    :size="size"
    border
    direction="vertical"
  >
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions
    title="Vertical Layout without Border"
    :column="3"
    :size="size"
    direction="vertical"
    style="margin-top: 20px"
  >
    <yh-descriptions-item label="App ID">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

## Long Content

When a description item contains long text, the component automatically wraps lines and displays them correctly.

<DemoBlock title="Long Content" :ts-code="tsLongContent" :js-code="jsLongContent">
  <yh-descriptions title="Long Content Display" :column="2" border>
    <yh-descriptions-item label="Product Name">
      Apple MacBook Pro 16-inch M3 Max Chip Laptop
    </yh-descriptions-item>
    <yh-descriptions-item label="Price">
      $3,499.00
    </yh-descriptions-item>
    <yh-descriptions-item label="Description" :span="2">
      Equipped with the M3 Max chip, featuring a 14-core CPU, 30-core GPU, and 16-core Neural Engine. Supports up to 128GB of unified memory and up to 8TB of storage space. 16.2-inch Liquid Retina XDR display with peak brightness up to 1600 nits, ProMotion adaptive refresh rate technology, and True Tone display. MagSafe 3 charging port, three Thunderbolt 4 ports, HDMI port, SDXC card slot, high-impedance headphone jack. Six-speaker sound system with spatial audio. 1080p FaceTime HD camera. Touch ID. Magic Keyboard with a full-height function key row (including Touch ID). Force Touch trackpad. Up to 22 hours of battery life.
    </yh-descriptions-item>
    <yh-descriptions-item label="Tags">
      <yh-tag type="success" size="small" style="margin-right: 4px">Official</yh-tag>
      <yh-tag type="warning" size="small" style="margin-right: 4px">Limited Offer</yh-tag>
      <yh-tag type="danger" size="small">Hot Sale</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag type="success">In Stock</yh-tag>
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

## Custom Styles

<DemoBlock title="Custom Styles" :ts-code="tsCustomStyle" :js-code="jsCustomStyle">
  <yh-descriptions title="Core Performance Panel" :column="3" border>
    <template #extra>
      <yh-button type="primary" link>Operation</yh-button>
    </template>
    <yh-descriptions-item
      label="App ID"
      label-align="right"
      align="center"
      :label-style="{ color: '#409eff', fontWeight: 'bold' }"
      :content-style="{ backgroundColor: 'rgba(64, 158, 255, 0.1)' }"
    >
      YH-Admin-Edge
    </yh-descriptions-item>
    <yh-descriptions-item label="Version">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="Node">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="Status">
      <yh-tag size="small">Running</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="Entry" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

## Use in Nuxt

Descriptions component fully supports SSR rendering in Nuxt 3/4. It's automatically imported in Nuxt projects.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-descriptions title="User Details" border>
    <yh-descriptions-item label="Username">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="Email">test@example.com</yh-descriptions-item>
    <yh-descriptions-item label="Registration Time">2024-01-01</yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

**SSR Notes**:

- ✅ Fully supports all Props and styles
- ✅ Renders slot content correctly
- ✅ Dynamic size switching works as expected
- ✅ Custom styles are SSR-safe

::: tip SSR Safety
The Descriptions component has undergone comprehensive SSR testing to ensure server and client rendering are perfectly consistent.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title of the list | `string` | — |
| extra | Extra operation area text, can also be passed via `extra` slot | `string` | — |
| border | Whether to show border | `boolean` | `false` |
| column | Number of columns per row | `number` | `3` |
| direction | Arrangement direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | List size | `'large' \| 'default' \| 'small'` | `'default'` |
| colon | Whether to show colon (works when no border) | `boolean` | `true` |
| label-style | Custom label style | `CSSProperties` | — |
| content-style | Custom content style | `CSSProperties` | — |
| label-class-name | Custom label class name | `string` | — |
| content-class-name | Custom content class name | `string` | — |

### Item Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| label | Label text | `string` | — |
| span | Number of columns occupied | `number` | `1` |
| width | Column width | `string \| number` | — |
| min-width | Minimum column width | `string \| number` | — |
| align | Content alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| label-align | Label alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| class-name | Custom content class name | `string` | — |
| label-class-name | Custom label class name | `string` | — |
| label-style | Custom label style | `CSSProperties` | — |
| content-style | Custom content style | `CSSProperties` | — |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Content of descriptions, usually `YhDescriptionsItem` |
| title | Custom title, overrides `title` prop |
| extra | Custom extra area, overrides `extra` prop |

### Item Slots

| Slot Name | Description |
| --- | --- |
| default | Item content |
| label | Custom label content, overrides `label` prop |

### Expose

| Prop | Description | Type |
| --- | --- | --- |
| — | No exposed attributes | — |

## Theme Variables

The Descriptions component uses the following CSS variables for customization:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-descriptions-header-margin-bottom` | Margin bottom of header | `20px` |
| `--yh-descriptions-title-font-size` | Title font size | `16px` |
| `--yh-descriptions-extra-font-size` | Extra area font size | `14px` |
| `--yh-descriptions-border-color` | Border color | `var(--yh-border-color-lighter)` |
| `--yh-descriptions-item-font-size` | Cell font size | — |
| `--yh-descriptions-cell-padding-v` | Cell vertical padding | — |
| `--yh-descriptions-cell-padding-h` | Cell horizontal padding | — |

::: tip Size System Variables
The `size` attribute automatically toggles `--yh-descriptions-item-font-size` and padding variables. These variables are associated with the global YH-UI size system (e.g., `--yh-component-size-default-padding`) to ensure consistent sizing across the library.
:::
