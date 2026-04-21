# Skeleton

Provide placeholder graphics at locations where content is loading.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const loading = ref(true)

const tsBasic = `<${_T}>
  <yh-skeleton />
</${_T}>`

const tsLayout = `<${_T}>
  <yh-skeleton avatar title :rows="3" animated />
</${_T}>`

const tsItem = `<${_T}>
  <div style="display: flex; gap: 20px; align-items: center; overflow: hidden">
    <yh-skeleton-item variant="circle" :width="64" :height="64" />
    <div style="flex: 1">
      <yh-skeleton-item variant="h3" style="width: 30%" />
      <yh-skeleton-item variant="text" style="width: 80%" />
    </div>
  </div>
</${_T}>`

const tsCreative = `<${_T}>
  <div class="skeleton-card">
    <yh-skeleton-item variant="rect" style="width: 100%; height: 200px; border-radius: 12px 12px 0 0;" />
    <div style="padding: 16px">
      <yh-skeleton-item variant="h3" style="width: 50%" />
      <yh-skeleton-item variant="text" repeat="2" />
      <div style="margin-top: 16px; display: flex; justify-content: space-between">
        <yh-skeleton-item variant="button" />
        <yh-skeleton-item variant="caption" style="width: 60px" />
      </div>
    </div>
  </div>
</${_T}>`

const tsThrottle = `<${_T}>
  <yh-button @click="reloadData">Trigger Fast Loading</yh-button>
  <yh-skeleton :loading="loading" :throttle="500">
    <div class="real-content">
      Real data has loaded. Since loading was extremely fast (<500ms), the skeleton never appeared, ensuring visual continuity.
    </div>
  </yh-skeleton>
</${_T}>`

const tsNuxt = `<${_T}>
  <yh-skeleton avatar title />
</${_T}>`

const jsBasic = toJs(tsBasic)
const jsLayout = toJs(tsLayout)
const jsItem = toJs(tsItem)
const jsCreative = toJs(tsCreative)
const jsThrottle = toJs(tsThrottle)
const jsNuxt = toJs(tsNuxt)
</script>

## Basic Usage

The most basic text-only skeleton screen.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-skeleton />
</DemoBlock>

## Common Layouts

Quickly build common list item layouts with `avatar`, `title`, and `rows`.

<DemoBlock title="Common Layouts" :ts-code="tsLayout" :js-code="jsLayout">
  <yh-skeleton avatar title :rows="3" />
</DemoBlock>

## Fine-grained Item Control (SkeletonItem)

When built-in layouts don't meet your needs, use `YhSkeletonItem` for free composition. Supports semantic variants like `circle`, `rect`, `text`, `button`, `image`, and more.

<DemoBlock title="Item Control Demo" :ts-code="tsItem" :js-code="jsItem">
  <div style="display: flex; gap: 20px; align-items: center; overflow: hidden">
    <yh-skeleton-item variant="circle" :width="64" :height="64" />
    <div style="flex: 1">
      <yh-skeleton-item variant="h3" style="width: 30%" />
      <yh-skeleton-item variant="text" style="width: 80%" />
    </div>
  </div>
</DemoBlock>

## Creative: Advanced Cards

Easily implement complex card flow skeletons using `variant="rect"` and `repeat` attributes.

<DemoBlock title="Card Skeleton" :ts-code="tsCreative" :js-code="jsCreative">
  <div class="skeleton-card">
    <yh-skeleton-item variant="rect" style="width: 100%; height: 180px; border-radius: 12px 12px 0 0;" />
    <div style="padding: 16px">
      <yh-skeleton-item variant="h3" style="width: 50%" />
      <yh-skeleton :rows="2" />
      <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center">
        <yh-skeleton-item variant="button" />
        <yh-skeleton-item variant="caption" style="width: 60px" />
      </div>
    </div>
  </div>
</DemoBlock>

## Custom Advanced Features

### 1. Smart Throttling (Throttle)

Set display delay with `throttle` prop. If async data loads within the set time, the skeleton will never appear.

### 2. Viewport Detection (Lazy Animation)

When `lazy` is enabled, the skeleton animation only starts when the element enters the viewport.

### 3. Polymorphic Rendering

`YhSkeletonItem` covers common atomic placeholder variants for custom composition.

## Use in Nuxt

`YhSkeleton` and `YhSkeletonItem` can be rendered directly in Nuxt after registering the YH-UI module. Skeleton placeholders render as normal markup during SSR, and animation continues on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-skeleton avatar title />
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| loading | Whether to show loading render | `boolean` | `true` |
| animated | Whether to enable shimmer animation | `boolean` | `true` |
| rows | Number of rows for the default layout | `number` | `3` |
| title | Whether to render a title placeholder | `boolean` | `false` |
| avatar | Whether to render an avatar placeholder | `boolean` | `false` |
| throttle | Delay in milliseconds to prevent flickering | `number` | `0` |
| lazy | Only start animation when in viewport | `boolean` | `false` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

This component does not expose component events.

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| template | `-` | Skeleton placeholder content shown while `loading` is `true`. |
| default | `-` | Content rendered after loading completes. |

### Expose

This component does not expose public instance methods or properties.

### Skeleton Item Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| variant | Variant type (`circle`, `rect`, `h1`, `h3`, `text`, `caption`, `button`, `image`) | `YhSkeletonItemVariant` | `'text'` |
| width | Width | `string \| number` | `undefined` |
| height | Height | `string \| number` | `undefined` |
| animated | Whether to enable shimmer animation | `boolean` | `true` |
| round | Whether to use rounded corners | `boolean` | `false` |
| sharp | Whether to force sharp corners | `boolean` | `false` |
| repeat | Number of times to repeat | `number` | `1` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Skeleton Item Slots

| Name | Parameters | Description |
| --- | --- | --- |
| image | `-` | Custom placeholder content used when `variant="image"`. |

### Skeleton Item Expose

This component does not expose public instance methods or properties.

## Theme Variables

`YhSkeleton` and `YhSkeletonItem` support `themeOverrides`, but they do not define dedicated component-level CSS variables. Their styles mainly consume shared global tokens such as `--yh-fill-color-dark`, `--yh-fill-color-light`, `--yh-radius-base`, and `--yh-text-color-placeholder`.

### Type Exports

| Name | Description |
| --- | --- |
| `YhSkeletonProps` | Skeleton props type |
| `YhSkeletonSlots` | Skeleton slots type |
| `YhSkeletonInstance` | Skeleton instance type |
| `YhSkeletonItemProps` | SkeletonItem props type |
| `YhSkeletonItemVariant` | SkeletonItem variant union type |
| `YhSkeletonItemInstance` | SkeletonItem instance type |

<style scoped>
.skeleton-card {
  width: 100%;
  max-width: 400px;
  background: var(--yh-bg-color-overlay);
  border-radius: 12px;
  border: 1px solid var(--yh-border-color-lighter);
  overflow: hidden;
  box-sizing: border-box;
}
</style>
