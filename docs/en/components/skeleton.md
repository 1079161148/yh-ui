# Skeleton

Provide placeholder graphics at locations where content is loading. Combines convenient layouts, advanced animations, and high flexibility from mainstream UI frameworks.

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
  <!-- Scenario: Card Skeleton -->
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
  <!-- throttle=500 will only show skeleton after loading persists for 500ms, avoiding flickering -->
  <yh-skeleton :loading="loading" :throttle="500">
    <div class="real-content">
      Real data has loaded. Since loading was extremely fast (<500ms), the skeleton never appeared, ensuring visual continuity.
    </div>
  </yh-skeleton>
</${_T}>`

const tsNuxt = `<${_T}>
  <!-- Automatically detects in Nuxt environment, SSR safe -->
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

Set display delay with `throttle` prop. If async data loads within the set time, the skeleton will **never appear**. This effectively eliminates the "anxiety" caused by skeleton flickering when network conditions are good.

### 2. Viewport Detection (Lazy Animation)

When `lazy` is enabled, the skeleton animation only starts when the element enters the viewport. This significantly reduces GPU usage for invisible elements in long list pages - the ultimate **performance optimization** practice.

### 3. Polymorphic Rendering (Polymorphic)

`SkeletonItem`'s `variant` covers all atomic elements in mainstream interaction design, ensuring high fidelity from design to code.

## Use in Nuxt

`YhSkeleton` is fully optimized for Nuxt/SSR environments, automatically falling back to safe rendering mode.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-skeleton avatar title />
</DemoBlock>

## API

### Skeleton Props

| Name     | Description                                             | Type      | Default |
| -------- | ------------------------------------------------------- | --------- | ------- |
| loading  | Whether to show loading render                          | `boolean` | `true`  |
| animated | Whether to enable shimmer animation                     | `boolean` | `true`  |
| rows     | Number of rows for default layout                       | `number`  | `3`     |
| title    | Whether to render title placeholder                     | `boolean` | `false` |
| avatar   | Whether to render avatar placeholder                    | `boolean` | `false` |
| throttle | Delay in milliseconds to prevent flickering             | `number`  | `0`     |
| lazy     | Only start animation when in viewport (Custom Advanced) | `boolean` | `false` |

### SkeletonItem Props

| Name     | Description                                                            | Type               | Default  |
| -------- | ---------------------------------------------------------------------- | ------------------ | -------- |
| variant  | Variant type (`circle`, `rect`, `h1`, `h3`, `text`, `button`, `image`) | `string`           | `'text'` |
| width    | Width                                                                  | `string \| number` | —        |
| height   | Height                                                                 | `string \| number` | —        |
| animated | Whether to enable shimmer animation                                    | `boolean`          | `true`   |
| round    | Whether to have rounded corners                                        | `boolean`          | `false`  |
| sharp    | When true, explicitly sets to sharp corners                            | `boolean`          | `false`  |
| repeat   | Number of times to repeat (Custom Practical)                           | `number`           | `1`      |

## Theme Variables

| Variable                      | Description                    | Default                      |
| ----------------------------- | ------------------------------ | ---------------------------- |
| `--yh-skeleton-bg-color`      | Skeleton base background color | `var(--yh-fill-color-dark)`  |
| `--yh-skeleton-shimmer-color` | Animation shimmer color        | `var(--yh-fill-color-light)` |

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
