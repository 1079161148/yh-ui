<script setup lang="ts">
import { ref } from 'vue'

const visibleStandard = ref(false)
const visibleLeft = ref(false)
const visibleTop = ref(false)
const visibleBottom = ref(false)
const visibleRight = ref(false)
const visibleSize = ref(false)
const visibleGlass = ref(false)
const visibleResizable = ref(false)
const visibleFooter = ref(false)
const visibleNuxt = ref(false)

// Nested & Modal
const visibleNestedA = ref(false)
const visibleNestedB = ref(false)
const visibleNoModal = ref(false)

// Inner & Icon & Round
const visibleInner = ref(false)
const placementInner = ref('right')
const visibleCustomIcon = ref(false)
const visibleRound = ref(false)

const tsStandard = `<template>
  <yh-button @click="visibleStandard = true">Open Drawer</yh-button>

  <yh-drawer v-model="visibleStandard" title="Basic Drawer">
    <span>This is the content of the basic drawer.</span>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleStandard = ref(false)
<\/script>`

const jsStandard = tsStandard.replace('lang="ts"', '')

const tsDirection = `<template>
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleLeft = true">Left</yh-button>
    <yh-button @click="visibleRight = true">Right</yh-button>
    <yh-button @click="visibleTop = true">Top</yh-button>
    <yh-button @click="visibleBottom = true">Bottom</yh-button>
  </div>

  <yh-drawer v-model="visibleLeft" title="Left Drawer" placement="left">Left Content</yh-drawer>
  <yh-drawer v-model="visibleRight" title="Right Drawer" placement="right">Right Content</yh-drawer>
  <yh-drawer v-model="visibleTop" title="Top Drawer" placement="top">Top Content</yh-drawer>
  <yh-drawer v-model="visibleBottom" title="Bottom Drawer" placement="bottom">Bottom Content</yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleLeft = ref(false)
const visibleRight = ref(false)
const visibleTop = ref(false)
const visibleBottom = ref(false)
<\/script>`

const jsDirection = tsDirection.replace('lang="ts"', '')

const tsSize = `<template>
  <yh-button @click="visibleSize = true">Custom Size (50%)</yh-button>

  <yh-drawer v-model="visibleSize" title="Custom Size" size="50%">
    <span>Drawer width has been set to 50%.</span>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleSize = ref(false)
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

const tsGlass = `<template>
  <yh-button type="primary" plain @click="visibleGlass = true">Glassmorphism</yh-button>

  <yh-drawer v-model="visibleGlass" title="Premium Glass" glass>
    <p>Glassmorphism (Acrylic) provides excellent visual hierarchy, supporting dynamic background blur and dark mode adaptation.</p>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleGlass = ref(false)
<\/script>`

const jsGlass = tsGlass.replace('lang="ts"', '')

const tsResizable = `<template>
  <yh-button type="success" plain @click="visibleResizable = true">Resizable</yh-button>

  <yh-drawer v-model="visibleResizable" title="Resizable Drawer" resizable>
    <p>Hover over the edge of the drawer and drag to adjust its size. Internal physical boundary detection prevents over-adjustment.</p>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleResizable = ref(false)
<\/script>`

const jsResizable = tsResizable.replace('lang="ts"', '')

const tsFooter = `<template>
  <yh-button @click="visibleFooter = true">Drawer with Footer</yh-button>

  <yh-drawer v-model="visibleFooter" title="Action Confirmation" show-footer>
    <p>You can add action buttons in the footer.</p>
    <template #footer>
      <yh-button @click="visibleFooter = false">Cancel</yh-button>
      <yh-button type="primary" @click="visibleFooter = false">Confirm</yh-button>
    </template>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleFooter = ref(false)
<\/script>`

const jsFooter = tsFooter.replace('lang="ts"', '')

const tsNested = `<template>
  <yh-button type="primary" @click="visibleNestedA = true">Open Outer Drawer</yh-button>

  <yh-drawer v-model="visibleNestedA" title="Outer Drawer" size="50%">
    <div style="padding: 24px;">
      <p>This is the content of the outer drawer.</p>
      <yh-button type="success" @click="visibleNestedB = true">Open Inner Component</yh-button>
    </div>
    
    <yh-drawer v-model="visibleNestedB" title="Nested Inner Drawer" size="300px">
      <div style="padding: 24px;">
        This is the second layer drawer nested inside, which automatically calculates z-index for correct overlay.
      </div>
    </yh-drawer>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleNestedA = ref(false)
const visibleNestedB = ref(false)
<\/script>`

const jsNested = tsNested.replace('lang="ts"', '')

const tsModal = `<template>
  <yh-button @click="visibleNoModal = true">No Mask Mode</yh-button>

  <yh-drawer v-model="visibleNoModal" title="No Mask Mode" :modal="false">
    <div style="padding: 24px;">
      <p>When the mask is closed, users can interact with elements outside the drawer.</p>
    </div>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleNoModal = ref(false)
<\/script>`

const jsModal = tsModal.replace('lang="ts"', '')

const tsInner = `<template>
  <div style="height: 400px; border: 2px dashed #ccc; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafafa; border-radius: 12px; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button @click="openDrawer('top')">Top Reveal</yh-button>
      <yh-button @click="openDrawer('bottom')">Bottom Reveal</yh-button>
    </div>
    <div style="display: flex; gap: 12px;">
      <yh-button @click="openDrawer('left')">Left Reveal</yh-button>
      <yh-button @click="openDrawer('right')">Right Reveal</yh-button>
    </div>
    
    <yh-drawer v-model="visible" :title="'Local Drawer - ' + placement" :placement="placement" inner size="160px">
      <div style="padding: 24px;">This is a drawer that slides out from a specified direction within a localized area, without blocking other content outside the container.</div>
    </yh-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const placement = ref('right')

const openDrawer = (p: string) => {
  placement.value = p
  visible.value = true
}
<\/script>`

const jsInner = tsInner.replace('lang="ts"', '').replace(': string', '')

const tsCustomIcon = `<template>
  <yh-button @click="visible = true">Custom Close Icon</yh-button>

  <yh-drawer v-model="visible" title="Icon Demo">
    <template #close-icon>
      <div style="background: var(--yh-color-danger, #f56c6c); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">EXIT</div>
    </template>
    <div style="padding: 24px;">You can fully customize the content of the close area, not just limited to icons.</div>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>`

const jsCustomIcon = tsCustomIcon.replace('lang="ts"', '')

const tsRound = `<template>
  <yh-button @click="visible = true">Disable Corners (Square Style)</yh-button>

  <yh-drawer v-model="visible" title="Hardcore Style" :round="false">
    <div style="padding: 24px;">Switch to a square design scheme without rounded corners via :round="false", suitable for minimalist or industrial-style interfaces.</div>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>`

const jsRound = tsRound.replace('lang="ts"', '')

const tsNuxt = `<template>
  <yh-button @click="visibleNuxt = true">Nuxt Compatibility</yh-button>
  <yh-drawer v-model="visibleNuxt" title="SSR Support">
    100% compatible with Nuxt 3 SSR mechanism.
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleNuxt = ref(false)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

# Drawer

A panel that slides out from the edge of the screen.

## Basic Usage

The simplest usage, sliding out from the right side.

<DemoBlock :tsCode="tsStandard" :jsCode="jsStandard">
  <yh-button @click="visibleStandard = true">Open Drawer</yh-button>
  <yh-drawer v-model="visibleStandard" title="Basic Drawer">
    <span>This is the content of the basic drawer.</span>
  </yh-drawer>
</DemoBlock>

## Custom Direction

Supports `top`, `right`, `bottom`, and `left` directions.

<DemoBlock :tsCode="tsDirection" :jsCode="jsDirection">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleLeft = true">Left</yh-button>
    <yh-button @click="visibleRight = true">Right</yh-button>
    <yh-button @click="visibleTop = true">Top</yh-button>
    <yh-button @click="visibleBottom = true">Bottom</yh-button>
  </div>
  <yh-drawer v-model="visibleLeft" title="Left Drawer" placement="left">Left Content</yh-drawer>
  <yh-drawer v-model="visibleRight" title="Right Drawer" placement="right">Right Content</yh-drawer>
  <yh-drawer v-model="visibleTop" title="Top Drawer" placement="top">Top Content</yh-drawer>
  <yh-drawer v-model="visibleBottom" title="Bottom Drawer" placement="bottom">Bottom Content</yh-drawer>
</DemoBlock>

## Custom Size

The width or height can be controlled via the `size` attribute.

<DemoBlock :tsCode="tsSize" :jsCode="jsSize">
  <yh-button @click="visibleSize = true">Custom Size (50%)</yh-button>
  <yh-drawer v-model="visibleSize" title="Custom Size" size="50%">
    <span>Drawer width has been set to 50%.</span>
  </yh-drawer>
</DemoBlock>

## Glassmorphism (Acrylic)

Enabled via the `glass` attribute for a flagship visual experience.

<DemoBlock :tsCode="tsGlass" :jsCode="jsGlass">
  <yh-button type="primary" plain @click="visibleGlass = true">Glassmorphism</yh-button>
  <yh-drawer v-model="visibleGlass" title="Premium Glass" glass>
    <p>Glassmorphism (Acrylic) provides excellent visual hierarchy, supporting dynamic background blur and dark mode adaptation.</p>
  </yh-drawer>
</DemoBlock>

## Resizable

Enable the `resizable` attribute to allow users to adjust the drawer size by dragging the edge.

<DemoBlock :tsCode="tsResizable" :jsCode="jsResizable">
  <yh-button type="success" plain @click="visibleResizable = true">Resizable</yh-button>
  <yh-drawer v-model="visibleResizable" title="Resizable" resizable>
    <p>Hover over the edge of the drawer and drag to adjust its size. Internal physical boundary detection prevents over-adjustment.</p>
  </yh-drawer>
</DemoBlock>

## Action with Footer

Add action buttons via `show-footer` and the `footer` slot.

<DemoBlock :tsCode="tsFooter" :jsCode="jsFooter">
  <yh-button @click="visibleFooter = true">Drawer with Footer</yh-button>
  <yh-drawer v-model="visibleFooter" title="Action Confirmation" show-footer>
    <p>You can add action buttons in the footer.</p>
    <template #footer>
      <yh-button @click="visibleFooter = false">Cancel</yh-button>
      <yh-button type="primary" @click="visibleFooter = false">Confirm</yh-button>
    </template>
  </yh-drawer>
</DemoBlock>

## Nested Drawers

The Drawer component supports multi-level nesting, automatically managing `z-index` to ensure inner drawers always overlay outer ones.

<DemoBlock :tsCode="tsNested" :jsCode="jsNested">
  <yh-button type="primary" @click="visibleNestedA = true">Open Outer Drawer</yh-button>
  <yh-drawer v-model="visibleNestedA" title="Outer Drawer" size="50%">
    <div style="padding: 24px;">
      <p>This is the content of the outer drawer.</p>
      <yh-button type="success" @click="visibleNestedB = true">Open Inner Component</yh-button>
    </div>
    <yh-drawer v-model="visibleNestedB" title="Nested Inner Drawer" size="300px">
      <div style="padding: 24px;">
        This is the second layer drawer nested inside, which automatically calculates z-index for correct overlay.
      </div>
    </yh-drawer>
  </yh-drawer>
</DemoBlock>

## Local Container Reveal (Inner Mode)

Enabled via the `inner` attribute, the drawer will render using `absolute` positioning within the nearest `relative` parent container. Supports all four directions and automatically disables Teleport to ensure correct layering.

<DemoBlock :tsCode="tsInner" :jsCode="jsInner">
  <div style="height: 400px; border: 2px dashed var(--yh-border-color, #ccc); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafafa; border-radius: 12px; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button @click="visibleInner = true; placementInner = 'top'">Top Reveal</yh-button>
      <yh-button @click="visibleInner = true; placementInner = 'bottom'">Bottom Reveal</yh-button>
    </div>
    <div style="display: flex; gap: 12px;">
      <yh-button @click="visibleInner = true; placementInner = 'left'">Left Reveal</yh-button>
      <yh-button @click="visibleInner = true; placementInner = 'right'">Right Reveal</yh-button>
    </div>
    <yh-drawer v-model="visibleInner" :title="'Local Drawer - ' + placementInner" :placement="placementInner" inner size="160px">
      <div style="padding: 24px;">This is a drawer that slides out from a specified direction within a localized area, without blocking other content outside the container.</div>
    </yh-drawer>
  </div>
</DemoBlock>

## Custom Close Icon

You can fully customize the top-right close trigger area via the `close-icon` slot.

<DemoBlock :tsCode="tsCustomIcon" :jsCode="jsCustomIcon">
  <yh-button @click="visibleCustomIcon = true">Custom Close Icon</yh-button>
  <yh-drawer v-model="visibleCustomIcon" title="Icon Demo">
    <template #close-icon>
      <div style="background: var(--yh-color-danger, #f56c6c); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">EXIT</div>
    </template>
    <div style="padding: 24px;">You can fully customize the content of the close area, not just limited to icons.</div>
  </yh-drawer>
</DemoBlock>

## Disable Corners (Square Style)

Rounded corners (flagship aesthetic) are enabled by default, and can be quickly switched to a hardcore square style via the `round` attribute.

<DemoBlock :tsCode="tsRound" :jsCode="jsRound">
  <yh-button @click="visibleRound = true">Disable Corners (Square Style)</yh-button>
  <yh-drawer v-model="visibleRound" title="Hardcore Style" :round="false">
    <div style="padding: 24px;">Switch to a square design scheme without rounded corners via :round="false", suitable for minimalist or industrial-style interfaces.</div>
  </yh-drawer>
</DemoBlock>

## Mask Layer (Modal)

The background mask layer can be enabled or disabled via the `modal` attribute.

<DemoBlock :tsCode="tsModal" :jsCode="jsModal">
  <yh-button @click="visibleNoModal = true">No Mask Mode</yh-button>
  <yh-drawer v-model="visibleNoModal" title="No Mask Mode" :modal="false">
    <div style="padding: 24px;">
      <p>When the mask is closed, users can interact with elements outside the drawer.</p>
    </div>
  </yh-drawer>
</DemoBlock>

## Use in Nuxt

<DemoBlock :tsCode="tsNuxt" :jsCode="jsNuxt">
  <yh-button @click="visibleNuxt = true">Nuxt Compatibility</yh-button>
  <yh-drawer v-model="visibleNuxt" title="SSR Support">
    100% compatible with Nuxt 3 SSR mechanism.
  </yh-drawer>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue / v-model | Whether to show the drawer | `boolean` | `false` |
| title | Title | `string \| (() => VNode) \| Component` | - |
| placement | Drawer position | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| size | Drawer size (width or height) | `string \| number` | `'30%'` |
| modal | Whether to show mask layer | `boolean` | `true` |
| closeOnClickModal | Whether to close on clicking mask | `boolean` | `true` |
| closeOnPressEscape | Whether to close on pressing ESC | `boolean` | `true` |
| showClose | Whether to show close button | `boolean` | `true` |
| closeIcon | Custom close icon name | `string` | `'close'` |
| showHeader | Whether to show header | `boolean` | `true` |
| showFooter | Whether to show footer | `boolean` | `false` |
| lockScroll | Whether to lock viewport scroll | `boolean` | `true` |
| glass | Whether to enable glassmorphism (Acrylic) mode | `boolean` | `false` |
| resizable | Whether size is adjustable | `boolean` | `false` |
| minSize | Minimum size (px) | `number` | `150` |
| maxSize | Maximum size (px) | `number` | `1000` |
| destroyOnClose | Whether to destroy content on close | `boolean` | `false` |
| zIndex | Manually set z-index level | `number` | - |
| teleportTo | Mount node | `string \| HTMLElement` | `'body'` |
| beforeClose | Hook before close, execute `done` to close | `(done: () => void) => void` | - |
| round | Whether to show rounded corners (flagship aesthetic) | `boolean` | `true` |
| inner | Whether to pop up in a specified container (enables absolute positioning) | `boolean` | `false` |
| customClass | Additional class name for drawer container | `string` | - |
| modalClass | Additional class name for mask layer | `string` | - |
| titleStyle | Custom style for header title | `CSSProperties \| string` | - |
| contentStyle | Custom style for body content | `CSSProperties \| string` | - |
| footerStyle | Custom style for footer | `CSSProperties \| string` | - |
| drawerStyle | Custom style for drawer panel overall | `CSSProperties \| string` | - |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| open | Triggered when panel opens | - |
| opened | Triggered when opening animation finishes | - |
| close | Triggered when panel closes | - |
| closed | Triggered when closing animation finishes | - |
| resize | Triggered when size is adjusted | `(size: number)` |
| update:modelValue | v-model update event | `(value: boolean)` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Core content area of the drawer |
| header | Customizes the entire header area (overrides title and close button) |
| title | Customizes only the title text portion |
| footer | Customizes the footer content area |
| close-icon | Customizes the icon inside the close button |

### Expose

| Prop Name | Description | Type |
| --- | --- | --- |
| drawerRef | DOM element reference of drawer container | `HTMLElement \| null` |
| handleClose | Manually triggers the close process (supports beforeClose hook) | `(isClickModal?: boolean) => void` |

## Theme Variables

The component is deeply integrated with the YH-UI design system, and all color variables are interfaced with the global theme system, automatically supporting dark mode:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-drawer-bg-color` | Drawer panel background color | `var(--yh-bg-color-overlay)` |
| `--yh-drawer-shadow` | Drawer shadow intensity | `var(--yh-shadow-lg)` |
| `--yh-drawer-title-color` | Title text color | `var(--yh-text-color-primary)` |
| `--yh-drawer-border-color` | Split line/border color | `var(--yh-border-color-lighter)` |
| `--yh-drawer-header-height` | Header height | `56px` |
| `--yh-drawer-footer-height` | Footer height | `60px` |
| `--yh-drawer-padding` | Content area padding | `20px` |
| `--yh-drawer-radius` | Corner radius size | `var(--yh-radius-xl)` |
| `--yh-drawer-transition` | Animation duration | `var(--yh-transition-duration)` |
