# Image

Image container with lazy loading, custom placeholder, load failure, and image preview support, while retaining original img characteristics.

<script setup lang="ts">
import { ref } from 'vue'
const src = 'https://picsum.photos/400/300'
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]

const showViewer = ref(false)

const tsBasic = `<template>
  <div class="demo-image">
    <div class="block" v-for="fit in fits" :key="fit">
      <span class="demonstration">{{ fit }}</span>
      <yh-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script setup lang="ts">
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://picsum.photos/400/300'
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsPlaceholder = `<template>
  <div style="display: flex; gap: 20px;">
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">Default Error</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px" />
    </div>
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">Custom Error</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px">
        <template #error>
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: #f5f7fa; color: #909399; font-size: 12px;">
            Load Failed
          </div>
        </template>
      </yh-image>
    </div>
  </div>
</template>`

const jsPlaceholder = tsPlaceholder

const tsPreview = `<template>
  <yh-image
    style="width: 100px; height: 100px"
    src="https://picsum.photos/400/300"
    :preview-src-list="srcList"
    :initial-index="0"
    fit="cover"
  />
</template>

<script setup lang="ts">
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]
<\/script>`

const jsPreview = tsPreview.replace('lang="ts"', '')

const tsImageViewer = `<template>
  <div>
    <div style="margin-bottom: 10px; display: flex; gap: 10px;">
      <yh-button type="primary" @click="openViewer('default')">Built-in Preview</yh-button>
      <yh-button type="success" @click="openViewer('viewerjs')">Viewer.js Preview</yh-button>
    </div>
    <yh-image-viewer 
      v-if="showViewer" 
      :url-list="srcList" 
      :viewer-mode="mode"
      @close="showViewer = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showViewer = ref(false)
const mode = ref('default')
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]

const openViewer = (m: string) => {
  mode.value = m
  showViewer.value = true
}
<\/script>`

const jsImageViewer = tsImageViewer.replace('lang="ts"', '').replace(': string', '')

const tsLazy = `<template>
  <div style="height: 400px; overflow-y: auto; background: var(--yh-bg-color-page); padding: 20px; border-radius: 8px;">
    <yh-image
      v-for="url in urls"
      :key="url"
      :src="url"
      lazy
      style="display: block; width: 100%; min-height: 200px; margin-bottom: 20px; border-radius: 4px; box-shadow: var(--yh-box-shadow-light);"
    />
  </div>
</template>

<script setup lang="ts">
const urls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6'
]
<\/script>`

const jsLazy = tsLazy.replace('lang="ts"', '')

const urls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6'
]

const tsViewerJS = `<template>
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    viewer-mode="viewerjs"
    :viewer-options="{
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: 4,
        play: {
          show: 4,
          size: 'large',
        },
        next: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
      },
      navbar: true,
      title: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }"
    fit="cover"
  />
</template>

<script setup lang="ts">
const src = 'https://picsum.photos/400/300'
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]
<\/script>`

const jsViewerJS = tsViewerJS.replace('lang="ts"', '')

const tsNuxt = `<template>
  <yh-image
    style="width: 200px; height: 150px; border-radius: 8px;"
    src="https://picsum.photos/400/300?nuxt=1"
    lazy
    :preview-src-list="['https://picsum.photos/800/600?nuxt=1']"
  >
    <template #placeholder>
      <div style="display: flex; align-items: center; gap: 8px;">
        <yh-icon name="loading" class="is-loading" />
        Nuxt SSR Loading...
      </div>
    </template>
  </yh-image>
</template>`

const jsNuxt = tsNuxt

const modeMap = ref('default')
const openViewerManual = (m: string) => {
  modeMap.value = m
  showViewer.value = true
}

</script>

## Basic Usage

The `fit` attribute determines how the image adapts to the container, same as native `object-fit`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div v-for="fit in ['fill', 'contain', 'cover', 'none', 'scale-down']" :key="fit" style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">{{ fit }}</div>
      <yh-image style="width: 100px; height: 100px" :src="src" :fit="fit" />
    </div>
  </div>
</DemoBlock>

## Placeholder and Load Failure

Customize placeholder content via `placeholder` and `error` slots.

<DemoBlock title="Placeholder and Load Failure" :ts-code="tsPlaceholder" :js-code="jsPlaceholder">
  <div style="display: flex; gap: 20px;">
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">Default Error</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px" />
    </div>
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">Custom Error</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px">
        <template #error>
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: #f5f7fa; color: #909399; font-size: 12px;">
            Load Failed
          </div>
        </template>
      </yh-image>
    </div>
  </div>
</DemoBlock>

## Lazy Load

::: tip
Browser-native `loading` attribute. You can try replacing `lazy="true"` with `loading="lazy"`.

If the current browser supports native image lazy loading, native capabilities are prioritized; otherwise, scroll listening will be used to achieve the same effect.
:::

Enable lazy loading via `lazy`, so images load only when scrolled into view. You can set the scroll container via `scroll-container`; if undefined, it defaults to the nearest parent element with `overflow` set to `auto` or `scroll`.

<DemoBlock title="Lazy Load" :ts-code="tsLazy" :js-code="jsLazy">
  <div style="height: 400px; overflow-y: auto; background: var(--yh-bg-color-page); padding: 20px; border-radius: 8px;">
    <yh-image
      v-for="url in urls"
      :key="url"
      :src="url"
      lazy
      style="display: block; width: 100%; min-height: 200px; margin-bottom: 20px; border-radius: 4px; box-shadow: var(--yh-box-shadow-light);"
    />
  </div>
</DemoBlock>

## Image Preview

Enable preview functionality via `preview-src-list`.

<DemoBlock title="Image Preview" :ts-code="tsPreview" :js-code="jsPreview">
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    fit="cover"
  />
</DemoBlock>

## Manual Preview Call

Manually invoke the preview via the `yh-image-viewer` component. This is useful when you don't want to show thumbnails but want to trigger a preview on clicking an element (like a button or link). Manual calls for `viewerjs` mode are also supported.

<DemoBlock title="Manual Preview Call" :ts-code="tsImageViewer" :js-code="jsImageViewer">
  <div>
    <div style="margin-bottom: 10px; display: flex; gap: 10px;">
      <yh-button type="primary" @click="openViewerManual('default')">Built-in Preview</yh-button>
      <yh-button type="success" @click="openViewerManual('viewerjs')">Viewer.js Preview</yh-button>
    </div>
    <yh-image-viewer 
      v-if="showViewer" 
      :url-list="srcList" 
      :viewer-mode="modeMap"
      @close="showViewer = false" 
    />
  </div>
</DemoBlock>

## Viewer.js Preview (Extension)

When the built-in previewer isn't enough, switch to the more powerful `viewerjs` mode. It supports advanced features like slideshows, fullscreen, flipping, and thumbnail navigation.

<DemoBlock title="Viewer.js Advanced Preview" :ts-code="tsViewerJS" :js-code="jsViewerJS">
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    viewer-mode="viewerjs"
    :viewer-options="{
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: 4,
        play: {
          show: 4,
          size: 'large',
        },
        next: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
      },
      navbar: true,
      title: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }"
    fit="cover"
  />
</DemoBlock>

## Use in Nuxt

`YhImage` and `YhImageViewer` can be used directly in Nuxt applications. During SSR, render the component normally and let lazy loading and preview behavior start on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
    <yh-image
      style="width: 200px; height: 150px; border-radius: 8px;"
      src="https://picsum.photos/400/300?nuxt=1"
      lazy
      :preview-src-list="['https://picsum.photos/800/600?nuxt=1']"
    >
      <template #placeholder>
        <div style="display: flex; align-items: center; gap: 8px;">
          <yh-icon name="loading" class="is-loading" />
          Nuxt SSR Loading...
        </div>
      </template>
    </yh-image>
    <p style="font-size: 14px; color: var(--yh-text-color-secondary);">Supports auto-import and SSR placeholder rendering</p>
  </div>
</DemoBlock>

**SSR Notes**:

- Supports placeholder rendering during SSR.
- Lazy loading starts observing on the client after hydration.
- Preview mode mounts the viewer on the client when it is opened.
- Works with Nuxt auto-import after registering the YH-UI module.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| src | Image source URL | `string` | `''` |
| fit | How the image fits its container, equivalent to native `object-fit` | `'' \| 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `''` |
| lazy | Whether to enable lazy loading | `boolean` | `false` |
| preview-src-list | Source list used by the built-in preview viewer | `string[]` | `[]` |
| z-index | Preview z-index | `number` | `undefined` |
| initial-index | Start index of preview | `number` | `0` |
| close-on-press-escape | Whether pressing `Esc` closes preview | `boolean` | `true` |
| hide-on-click-modal | Whether clicking the overlay closes preview | `boolean` | `false` |
| infinite | Whether preview loops infinitely | `boolean` | `true` |
| zoom-rate | Zoom step used by the preview viewer | `number` | `1.2` |
| show-progress | Whether to show preview progress controls | `boolean` | `true` |
| preview-teleported | Whether to teleport the preview container to `body` | `boolean` | `true` |
| scroll-container | Scroll container used for lazy loading | `string \| HTMLElement \| undefined` | `undefined` |
| viewer-mode | Preview mode. Use `'viewerjs'` when integrating Viewer.js behavior | `'default' \| 'viewerjs'` | `'default'` |
| viewer-options | Options forwarded to Viewer.js when `viewer-mode="viewerjs"` | `Record<string, unknown>` | `{}` |
| alt | Native `img` alt attribute | `string` | `undefined` |
| crossorigin | Native `img` crossorigin attribute | `'' \| 'anonymous' \| 'use-credentials'` | `undefined` |
| loading | Native `img` loading attribute | `'eager' \| 'lazy'` | `undefined` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| load | Triggered on image load success | `(event: Event) => void` |
| error | Triggered on image load failure | `(event: Event \| string) => void` |
| switch | Triggered on preview image switch | `(index: number) => void` |
| show | Triggered when preview is shown | `() => void` |
| close | Triggered when preview is closed | `() => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| placeholder | Placeholder when image is not loaded |
| error | Content for load failure |

### Expose

This component does not expose public instance methods or properties.

## ImageViewer API

If you need to use the previewer independently, use `yh-image-viewer`.

### Image Viewer Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| url-list | Preview image source list | `string[]` | `[]` |
| z-index | Preview z-index | `number` | `2000` |
| initial-index | Start index of preview | `number` | `0` |
| infinite | Whether preview loops infinitely | `boolean` | `true` |
| hide-on-click-modal | Whether clicking the overlay closes preview | `boolean` | `false` |
| close-on-press-escape | Whether pressing `Esc` closes preview | `boolean` | `true` |
| zoom-rate | Zoom step used by the preview viewer | `number` | `1.2` |
| show-progress | Whether to show preview progress controls | `boolean` | `true` |
| teleported | Whether to teleport the preview container to `body` | `boolean` | `true` |
| viewer-mode | Preview mode | `'default' \| 'viewerjs'` | `'default'` |
| viewer-options | Viewer.js options | `Record<string, unknown>` | `{}` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| switch | Triggered on image switch | `(index: number) => void` |
| close | Triggered when preview closes | `() => void` |

### Slots

This component does not expose component slots.

### Image Viewer Expose

| Name | Description | Type |
| --- | --- | --- |
| prev | Switch to the previous image | `() => void` |
| next | Switch to the next image | `() => void` |
| zoomIn | Zoom in | `() => void` |
| zoomOut | Zoom out | `() => void` |
| rotateLeft | Rotate counterclockwise | `() => void` |
| rotateRight | Rotate clockwise | `() => void` |
| reset | Reset zoom and rotation state | `() => void` |

### Theme Variables

`YhImage` supports `themeOverrides`. The component also provides the following dedicated CSS variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-image-placeholder-bg-color` | Placeholder background color | `var(--yh-fill-color-light)` |
| `--yh-image-placeholder-text-color` | Placeholder text color | `var(--yh-text-color-placeholder)` |
| `--yh-image-error-bg-color` | Error area background color | `var(--yh-fill-color-extra-light)` |
| `--yh-image-error-text-color` | Error area text color | `var(--yh-text-color-placeholder)` |
| `--yh-image-viewer-mask-bg-color` | Preview mask background color | `var(--yh-mask-color)` |
| `--yh-image-viewer-btn-bg-color` | Preview controller button background | `var(--yh-text-color-regular)` |
| `--yh-image-viewer-btn-color` | Preview controller button icon color | `var(--yh-color-white)` |
| `--yh-image-viewer-btn-hover-bg-color` | Preview controller button hover | `var(--yh-color-primary)` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhImageProps` | Props type for `YhImage` |
| `YhImageEmits` | Emits type for `YhImage` |
| `YhImageSlots` | Slots type for `YhImage` |
| `YhImageInstance` | Public instance type for `YhImage` |
| `YhImageViewerProps` | Props type for `YhImageViewer` |
| `YhImageViewerEmits` | Emits type for `YhImageViewer` |
| `YhImageViewerSlots` | Slots type for `YhImageViewer` |
| `YhImageViewerExpose` | Expose type for `YhImageViewer` |
| `YhImageViewerInstance` | Public instance type for `YhImageViewer` |
