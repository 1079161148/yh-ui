# Image Magnifier

Professional high-definition image magnification for product detail pages. Supports external/internal zoom, gallery mode, mouse-wheel dynamic scaling, smart positioning, progressive HD loading, minimap navigation, and fullscreen immersive preview.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// ── Basic Usage ──────────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/10/400/400"
    :scale="2.5"
    border
    title="Hover to view details"
  />
</${_T}>`
const jsBasic = toJs(tsBasic)

// ── Inside Lens ──────────────────────────────────────────────────────────────
const tsInside = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/11/400/400"
    position="inside"
    :scale="3"
    mask-shape="circle"
    :mask-width="200"
    :mask-height="200"
  />
</${_T}>`
const jsInside = toJs(tsInside)

// ── Feature 1: Wheel Zoom ────────────────────────────────────────────────────
const tsWheel = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/10/400/400"
    zoom-src="https://picsum.photos/id/10/1200/1200"
    wheel-zoom
    :min-scale="1.2"
    :max-scale="5"
    :scale-step="0.3"
    border
    title="Scroll to adjust zoom level"
  />
</${_T}>`
const jsWheel = toJs(tsWheel)

// ── Feature 2: Smart Positioning ─────────────────────────────────────────────
const tsAuto = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/15/400/400"
    position="auto"
    border
    title="Auto-detects best panel direction"
  />
</${_T}>`
const jsAuto = toJs(tsAuto)

// ── Feature 3: Progressive Loading ───────────────────────────────────────────
const tsLoading = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/12/400/400"
    zoom-src="https://picsum.photos/id/12/2000/2000"
    border
    title="Progress bar while HD image loads"
  />
</${_T}>`
const jsLoading = toJs(tsLoading)

// ── Feature 4: Gallery ───────────────────────────────────────────────────────
const tsGallery = `<${_S} setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const images = [
  { src: 'https://picsum.photos/id/10/400/400', zoomSrc: 'https://picsum.photos/id/10/1200/1200', alt: 'Landscape 1' },
  { src: 'https://picsum.photos/id/11/400/400', zoomSrc: 'https://picsum.photos/id/11/1200/1200', alt: 'Landscape 2' },
  { src: 'https://picsum.photos/id/12/400/400', zoomSrc: 'https://picsum.photos/id/12/1200/1200', alt: 'Landscape 3' },
]
</${_S}>
<${_T}>
  <yh-image-magnifier
    v-model="current"
    :images="images"
    border
  />
</${_T}>`
const jsGallery = toJs(tsGallery)

// ── Feature 5: Minimap ───────────────────────────────────────────────────────
const tsMinimap = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/13/400/400"
    zoom-src="https://picsum.photos/id/13/1200/1200"
    show-minimap
    border
    title="Minimap shows your position in the full image"
  />
</${_T}>`
const jsMinimap = toJs(tsMinimap)

// ── Feature 6: Fullscreen ────────────────────────────────────────────────────
const tsFullscreen = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/14/400/400"
    zoom-src="https://picsum.photos/id/14/1200/1200"
    click-to-fullscreen
    border
    title="Click image to open fullscreen view"
  />
</${_T}>`
const jsFullscreen = toJs(tsFullscreen)

// ── Custom ───────────────────────────────────────────────────────────────────
const tsCustom = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/12/400/400"
    zoom-src="https://picsum.photos/id/12/1200/1200"
    :offset="20"
    :mask-width="120"
    :mask-height="120"
    mask-color="rgba(255, 77, 79, 0.2)"
    border
    shadow
  />
</${_T}>`
const jsCustom = toJs(tsCustom)

// ── Nuxt ─────────────────────────────────────────────────────────────────────
const tsNuxt = `<${_T}>
  <client-only>
    <yh-image-magnifier
      src="https://picsum.photos/id/13/400/400"
      zoom-src="https://picsum.photos/id/13/1200/1200"
      border
      wheel-zoom
      click-to-fullscreen
    />
  </client-only>
</${_T}>`
const jsNuxt = toJs(tsNuxt)

const images = [
  { src: 'https://picsum.photos/id/10/400/400', zoomSrc: 'https://picsum.photos/id/10/1200/1200', alt: 'Landscape 1' },
  { src: 'https://picsum.photos/id/11/400/400', zoomSrc: 'https://picsum.photos/id/11/1200/1200', alt: 'Landscape 2' },
  { src: 'https://picsum.photos/id/12/400/400', zoomSrc: 'https://picsum.photos/id/12/1200/1200', alt: 'Landscape 3' },
]
const current = ref(0)
</script>

## Basic Usage

Standard external magnification — the zoom panel appears to the right by default.

<DemoBlock title="External Mode" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/10/400/400"
      :scale="2.5"
      border
      title="Hover to view details"
    />
  </div>
</DemoBlock>

## Inside Zoom

The zoom effect is rendered as a floating lens directly within the image. Perfect for compact layouts.

<DemoBlock title="Embedded Lens Mode" :ts-code="tsInside" :js-code="jsInside">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/11/400/400"
      position="inside"
      :scale="3"
      mask-shape="circle"
      :mask-width="200"
      :mask-height="200"
    />
  </div>
</DemoBlock>

## Feature 1: Dynamic Wheel Zoom

Enable `wheel-zoom` to let users scroll the mouse wheel to dynamically adjust magnification in real time. A scale badge is automatically displayed in the top-left corner.

<DemoBlock title="Mouse Wheel Dynamic Zoom" :ts-code="tsWheel" :js-code="jsWheel">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/10/400/400"
      zoom-src="https://picsum.photos/id/10/1200/1200"
      wheel-zoom
      :min-scale="1.2"
      :max-scale="5"
      :scale-step="0.3"
      border
      title="Scroll to adjust zoom level"
    />
  </div>
</DemoBlock>

## Feature 2: Smart Auto Positioning

Set `position="auto"` to let the component measure the remaining viewport space and automatically choose the best panel direction (right / left / inside).

<DemoBlock title="Smart Auto Positioning" :ts-code="tsAuto" :js-code="jsAuto">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/15/400/400"
      position="auto"
      border
      title="Auto-detects best panel direction"
    />
  </div>
</DemoBlock>

## Feature 3: Progressive HD Loading

When `zoom-src` is still loading, an animated progress bar is shown at the bottom of the image. The preview switches seamlessly once the high-res image is ready.

<DemoBlock title="Progressive HD Loading" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/12/400/400"
      zoom-src="https://picsum.photos/id/12/2000/2000"
      border
      title="Progress bar while HD image loads"
    />
  </div>
</DemoBlock>

## Feature 4: Gallery Integration

Pass an `images` array to enable multi-image mode with built-in thumbnail navigation. Supports `v-model` for bidirectional index binding.

<DemoBlock title="Gallery Mode" :ts-code="tsGallery" :js-code="jsGallery">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      v-model="current"
      :images="images"
      border
    />
  </div>
</DemoBlock>

## Feature 5: Minimap Navigation

Enable `show-minimap` to display a miniature overview of the full image in the bottom-right corner of the preview panel. A highlighted rectangle tracks your current viewing region.

<DemoBlock title="Minimap Navigation" :ts-code="tsMinimap" :js-code="jsMinimap">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/13/400/400"
      zoom-src="https://picsum.photos/id/13/1200/1200"
      show-minimap
      border
      title="Minimap shows your position in the full image"
    />
  </div>
</DemoBlock>

## Feature 6: Click to Fullscreen

Enable `click-to-fullscreen` so that clicking the image opens an immersive fullscreen viewer. Press `Esc` or click the backdrop to close.

<DemoBlock title="Fullscreen Immersive Preview" :ts-code="tsFullscreen" :js-code="jsFullscreen">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/14/400/400"
      zoom-src="https://picsum.photos/id/14/1200/1200"
      click-to-fullscreen
      border
      title="Click image to open fullscreen view"
    />
  </div>
</DemoBlock>

## HD Sources & Customization

Specify a higher-resolution source via `zoom-src`. Customize `offset`, `mask-color`, and enable `border`/`shadow`.

<DemoBlock title="Custom Configuration" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/12/400/400"
      zoom-src="https://picsum.photos/id/12/1200/1200"
      :offset="20"
      :mask-width="120"
      :mask-height="120"
      mask-color="rgba(255, 77, 79, 0.2)"
      border
      shadow
    />
  </div>
</DemoBlock>

## Usage in Nuxt

Since the image magnifier involves mouse event monitoring and coordinate calculation, wrap the component with `<client-only>`.

<DemoBlock title="Nuxt Integration" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="width: 400px; margin: 0 auto;">
    <client-only>
      <yh-image-magnifier
        src="https://picsum.photos/id/13/400/400"
        zoom-src="https://picsum.photos/id/13/1200/1200"
        border
        wheel-zoom
        click-to-fullscreen
      />
    </client-only>
  </div>
</DemoBlock>

## API

### Props

| Property              | Description                                      | Type                                      | Default                |
| --------------------- | ------------------------------------------------ | ----------------------------------------- | ---------------------- |
| src                   | Main image URL                                   | `string`                                  | `''`                   |
| zoom-src              | HD zoom image URL (falls back to src)            | `string`                                  | `''`                   |
| images                | Image gallery array, enables multi-image mode    | `ImageMagnifierImage[]`                   | `[]`                   |
| model-value (v-model) | Active image index                               | `number`                                  | `0`                    |
| scale                 | Initial zoom scale factor                        | `number`                                  | `2`                    |
| wheel-zoom            | Enable mouse-wheel dynamic zoom                  | `boolean`                                 | `false`                |
| min-scale             | Minimum scale (wheel zoom)                       | `number`                                  | `1.2`                  |
| max-scale             | Maximum scale (wheel zoom)                       | `number`                                  | `5`                    |
| scale-step            | Scale increment per wheel tick                   | `number`                                  | `0.3`                  |
| width                 | Container width                                  | `number \| string`                        | `'100%'`               |
| height                | Container height                                 | `number \| string`                        | `'auto'`               |
| position              | Zoom panel direction; `auto` for smart detection | `'right' \| 'left' \| 'inside' \| 'auto'` | `'right'`              |
| offset                | Gap between container and panel (px)             | `number`                                  | `10`                   |
| mask-shape            | Lens shape                                       | `'square' \| 'circle'`                    | `'square'`             |
| mask-width            | Lens width (px)                                  | `number`                                  | `150`                  |
| mask-height           | Lens height (px)                                 | `number`                                  | `150`                  |
| mask-color            | Lens background color                            | `string`                                  | `'rgba(0, 0, 0, 0.3)'` |
| show-minimap          | Show minimap navigation in the preview panel     | `boolean`                                 | `false`                |
| border                | Show main image border                           | `boolean`                                 | `false`                |
| shadow                | Show main image shadow                           | `boolean`                                 | `false`                |
| title                 | Bottom hint text                                 | `string`                                  | `''`                   |
| alt                   | Image alt attribute                              | `string`                                  | `''`                   |
| click-to-fullscreen   | Click to enter fullscreen preview                | `boolean`                                 | `false`                |
| theme-overrides       | CSS variable overrides                           | `Record<string, string>`                  | `{}`                   |

### Events

| Event             | Description                             | Parameters        |
| ----------------- | --------------------------------------- | ----------------- |
| enter             | Fires when mouse enters the image       | —                 |
| leave             | Fires when mouse leaves the image       | —                 |
| zoom-start        | Fires when zoom preview opens           | —                 |
| zoom-end          | Fires when zoom preview closes          | —                 |
| scale-change      | Fires when wheel zoom changes the scale | `(scale: number)` |
| image-change      | Fires when gallery image switches       | `(index: number)` |
| update:modelValue | v-model update for gallery index        | `(index: number)` |

### Slots

| Slot       | Description                                | Scope                          |
| ---------- | ------------------------------------------ | ------------------------------ |
| default    | Replace the default main `<img>` element   | —                              |
| title      | Customize the bottom title area            | —                              |
| close-icon | Customize the fullscreen close button icon | —                              |
| fullscreen | Customize fullscreen content area          | `{ src: string, alt: string }` |

### ImageMagnifierImage Type

```ts
interface ImageMagnifierImage {
  src: string
  zoomSrc?: string
  alt?: string
}
```

### Exposed Methods & Properties

| Name         | Description                                  | Type                      |
| ------------ | -------------------------------------------- | ------------------------- |
| visible      | Whether the zoom preview is currently active | `Ref<boolean>`            |
| currentScale | Current zoom scale                           | `Ref<number>`             |
| currentIndex | Current active image index                   | `Ref<number>`             |
| switchImage  | Programmatically switch the active image     | `(index: number) => void` |

## Theme Variables

Override the following CSS custom properties via `theme-overrides` to customize the appearance:

| Variable                               | Description                     | Default                          |
| -------------------------------------- | ------------------------------- | -------------------------------- |
| `--yh-magnifier-preview-border`        | Preview panel border color      | `var(--yh-border-color-lighter)` |
| `--yh-magnifier-preview-shadow`        | Preview panel box shadow        | `0 8px 24px rgba(0,0,0,0.15)`    |
| `--yh-magnifier-mask-bg`               | Lens overlay background color   | `rgba(0,0,0,0.2)`                |
| `--yh-magnifier-mask-border`           | Lens overlay border color       | `rgba(255,255,255,0.6)`          |
| `--yh-magnifier-radius`                | Border radius                   | `var(--yh-radius-base)`          |
| `--yh-magnifier-loading-color`         | Loading progress bar color      | `var(--yh-color-primary)`        |
| `--yh-magnifier-gallery-active-border` | Gallery active thumbnail border | `var(--yh-color-primary)`        |
| `--yh-magnifier-badge-bg`              | Scale badge background          | `rgba(0,0,0,0.55)`               |
| `--yh-magnifier-badge-color`           | Scale badge text color          | `#fff`                           |
| `--yh-magnifier-minimap-size`          | Minimap widget size             | `80px`                           |
| `--yh-magnifier-fullscreen-bg`         | Fullscreen overlay background   | `rgba(0,0,0,0.88)`               |
| `--yh-magnifier-title-bg`              | Title overlay background        | `rgba(0,0,0,0.5)`                |

### Type Exports

| Name | Description |
| --- | --- |
| `YhImageMagnifierProps` | Component props type |
| `YhImageMagnifierEmits` | Component emits type |
| `YhImageMagnifierSlots` | Component slots type |
| `YhImageMagnifierExpose` | Component expose type |
| `YhImageMagnifierImage` | Image data type |
| `YhImageMagnifierPosition` | Preview position union |
| `YhImageMagnifierMaskShape` | Lens shape union |
| `YhImageMagnifierInstance` | Component instance type |
