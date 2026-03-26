# Product Card

High-performance product display component designed for modern e-commerce. Beyond basic layouts, it features a deep-seated marketing badge system, multi-price strategies (VIP/Member), hover multimedia previews, stock feedback, and built-in exposure tracking.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// ── 0. Demo Logic ────────────────────────────────────────────────────────────
const loading = ref(false)
const handleAction = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}

// ── 1. Basic Layouts ────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <div style="max-width: 320px;">
    <yh-product-card
      layout="vertical"
      title="YH-UI Intelligent Suite"
      description="Fast, efficient, and scalable Vue 3 component library for your projects."
      image="https://picsum.photos/id/20/400/300"
      :price="999.00"
      :market-price="1299.00"
      ribbon="Editor Choice"
      action-text="Buy Now"
    />
  </div>
</${_T}>`
const jsBasic = toJs(tsBasic)

const tsList = `<${_T}>
  <div style="max-width: 600px;">
    <yh-product-card
      layout="horizontal"
      title="Industrial Gantt Component"
      description="Drag-and-drop, zoomable, highly customizable Gantt chart."
      image="https://picsum.photos/id/21/200/200"
      :price="1699.00"
      :market-price="2500.00"
      :badges="[{ text: 'Hot', type: 'danger' }]"
      action-text="Add to Cart"
    />
  </div>
</${_T}>`
const jsList = toJs(tsList)

const tsCompact = `<${_T}>
  <div style="max-width: 200px;">
    <yh-product-card
      layout="compact"
      title="Compact Display"
      description="Compact mode now preserves simple action buttons."
      image="https://picsum.photos/id/22/100/100"
      :price="69.00"
      action-text="Go"
    />
  </div>
</${_T}>`
const jsCompact = toJs(tsCompact)

const tsStock = `<${_T}>
  <div style="max-width: 320px;">
    <yh-product-card
      title="Limited Sale Product"
      image="https://picsum.photos/id/23/400/301"
      :price="299.00"
      :market-price="399.00"
      action-text="Flash Sale"
      :stock-progress="60"
      stock-text="Sold 60%"
    />
  </div>
</${_T}>`
const jsStock = toJs(tsStock)

// ── 2. Advanced Features ──────────────────────────────────────────────────────
const tsMarketing = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="Marketing Badge Showcase"
      description="Supports slanted ribbons and combined image/text badge groups."
      image="https://picsum.photos/id/1/400/400"
      ribbon="Hot Sale"
      ribbon-color="#ff4d4f"
      :price="1299.00"
      :badges="[
        { image: 'https://picsum.photos/32/32?random=badge' },
        { text: 'Save $40', type: 'danger' },
        { text: 'Fast Delivery', type: 'primary' }
      ]"
      action-text="Buy Now"
    />
  </div>
</${_T}>`
const jsMarketing = toJs(tsMarketing)

const tsPrice = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="Pricing Strategy Demo"
      image="https://picsum.photos/id/22/400/400"
      :price="699.00"
      :market-price="999.00"
      :vip-price="599.00"
      vip-label="VIP Price"
      unit="/year"
      :stock-progress="85"
      stock-text="85% Sold, Almost Gone"
      stock-color="linear-gradient(90deg, #ff9c6e, #ff4d4f)"
      action-text="Renew Now"
    />
  </div>
</${_T}>`
const jsPrice = toJs(tsPrice)

const tsMedia = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="Hover Multimedia Demo"
      description="Hover image to trigger video preview or image switch."
      image="https://picsum.photos/id/3/400/400"
      hover-image="https://picsum.photos/id/4/400/400"
      video-src="https://www.w3schools.com/html/mov_bbb.mp4"
      :price="299.00"
      action-text="View Details"
    />
  </div>
</${_T}>`
const jsMedia = toJs(tsMedia)

const tsStatus = `<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
const handleAction = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</${_S}>
<${_T}>
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div style="width: 260px;">
      <yh-product-card
        title="Loading State"
        image="https://picsum.photos/id/5/400/400"
        :price="88.00"
        :action-loading="loading"
        action-text="Add to Cart"
        @action="handleAction"
      />
    </div>
    <div style="width: 260px;">
      <yh-product-card
        title="Sold Out Mask"
        image="https://picsum.photos/id/6/400/400"
        :price="0.00"
        sold-out
        action-text="Sold Out"
      />
    </div>
  </div>
</${_T}>`
const jsStatus = toJs(tsStatus)

const tsClamp = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="This product title is very very very long and will be truncated automatically based on configuration."
      description="This description will also be truncated to 1 line by default, showing an ellipsis..."
      image="https://picsum.photos/id/11/400/400"
      :price="99.00"
      :title-lines="2"
      :description-lines="1"
    />
  </div>
</${_T}>`
const jsClamp = toJs(tsClamp)

</script>

## Layout Paradigms

Common layouts for grid, list, and recommendation scenarios.

<DemoBlock title="Grid Layout (Vertical)" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 320px;">
    <yh-product-card
      layout="vertical"
      title="YH-UI Intelligent Suite"
      description="Fast, efficient, and scalable Vue 3 component library for your projects."
      image="https://picsum.photos/id/20/400/300"
      :price="999.00"
      :market-price="1299.00"
      ribbon="Editor Choice"
      action-text="Buy Now"
    />
  </div>
</DemoBlock>

## List Layout

Horizontal arrangement, suitable for search results or mobile feeds.

<DemoBlock title="List Layout (Horizontal)" :ts-code="tsList" :js-code="jsList">
  <div style="max-width: 600px;">
    <yh-product-card
      layout="horizontal"
      title="Industrial Gantt Component"
      description="Drag-and-drop, zoomable, highly customizable Gantt chart."
      image="https://picsum.photos/id/21/200/200"
      :price="1699.00"
      :market-price="2500.00"
      :badges="[{ text: 'Hot', type: 'danger' }]"
      action-text="Add to Cart"
    />
  </div>
</DemoBlock>

## Compact Layout

Minimalist display, suitable for sidebars or recommendation snippets.

<DemoBlock title="Compact Layout" :ts-code="tsCompact" :js-code="jsCompact">
  <div style="max-width: 200px;">
    <yh-product-card
      layout="compact"
      title="Compact Display"
      description="Compact mode now preserves simple action buttons."
      image="https://picsum.photos/id/22/100/100"
      :price="69.00"
      action-text="Go"
    />
  </div>
</DemoBlock>

## Stock Progress

Built-in marketing progress bar to increase conversion rates through visual urgency.

<DemoBlock title="Stock Progress Feedback" :ts-code="tsStock" :js-code="jsStock">
  <div style="max-width: 320px;">
    <yh-product-card
      title="Limited Sale Product"
      image="https://picsum.photos/id/23/400/301"
      :price="299.00"
      :market-price="399.00"
      action-text="Flash Sale"
      :stock-progress="60"
      stock-text="Sold 60%"
    />
  </div>
</DemoBlock>

## Advanced Business Features

Deeply encapsulated features for modern e-commerce business logic.

### Marketing Badges & Ribbons

Supports slanted ribbons in the corner and a combination of image/text badges for highlighting promotions.

<DemoBlock title="Marketing Atmosphere" :ts-code="tsMarketing" :js-code="jsMarketing">
  <div style="max-width: 300px;">
    <yh-product-card
      title="Marketing Badge Showcase"
      description="Supports slanted ribbons and combined image/text badge groups."
      image="https://picsum.photos/id/1/400/400"
      ribbon="Editor's Choice"
      ribbon-color="#ff4d4f"
      :price="1299.00"
      :badges="[
        { image: 'https://picsum.photos/32/32?random=badge' },
        { text: 'Save $40', type: 'danger' },
        { text: 'Fast Delivery', type: 'primary' }
      ]"
      action-text="Buy Now"
    />
  </div>
</DemoBlock>

### Pricing Logic feedback

Features a comprehensive pricing system including market prices, VIP/final prices, and unit suffixes.

<DemoBlock title="Pricing & ROI" :ts-code="tsPrice" :js-code="jsPrice">
  <div style="max-width: 300px;">
    <yh-product-card
      title="Pricing Strategy Demo"
      image="https://picsum.photos/id/22/400/400"
      :price="699.00"
      :market-price="999.00"
      :vip-price="599.00"
      vip-label="VIP Price"
      unit="/yr"
      :stock-progress="85"
      stock-text="85% Sold, Almost Gone"
      stock-color="linear-gradient(90deg, #ff9c6e, #ff4d4f)"
      action-text="Renew Now"
    />
  </div>
</DemoBlock>

### Hover Multimedia Preview

Boost click-through rates by enabling auto-switch to `hover-image` or silent looping `video` overlays.

<DemoBlock title="Multimedia Engagement" :ts-code="tsMedia" :js-code="jsMedia">
  <div style="max-width: 300px;">
    <yh-product-card
      title="Hover Multimedia Demo"
      description="Hover image to trigger video preview or image switch."
      image="https://picsum.photos/id/3/400/400"
      hover-image="https://picsum.photos/id/4/400/400"
      video-src="https://www.w3schools.com/html/mov_bbb.mp4"
      :price="299.00"
      action-text="View Details"
    />
  </div>
</DemoBlock>

### Conversion Readiness

Handles action button **Loading** (debounce) and **Sold Out** (auto-grayscale/mask).

<DemoBlock title="Conversion Status" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div style="width: 260px;">
      <yh-product-card
        title="Loading State"
        image="https://picsum.photos/id/5/400/400"
        :price="88.00"
        :action-loading="loading"
        action-text="Add to Cart"
        @action="handleAction"
      />
    </div>
    <div style="width: 260px;">
      <yh-product-card
        title="Sold Out Mask"
        image="https://picsum.photos/id/6/400/400"
        :price="0.00"
        sold-out
        action-text="Sold Out"
      />
    </div>
  </div>
</DemoBlock>

## Analytics Tracking

Built-in `IntersectionObserver`. When enabled (`exposure`), the component emits an `expose` event when it stays in the viewport beyond a threshold.

```vue
<yh-product-card exposure :exposure-threshold="0.5" @expose="onExpose" />
```

---

## API

### Props (100% aligned with source)

| Property           | Description                         | Type                                                        | Default      |
| ------------------ | ----------------------------------- | ----------------------------------------------------------- | ------------ |
| image              | Primary image URL                   | `string`                                                    | `''`         |
| hover-image        | Alt image on mouse hover            | `string`                                                    | `''`         |
| video-src          | Video preview URL on hover          | `string`                                                    | `''`         |
| title              | Product title                       | `string`                                                    | `''`         |
| title-lines        | Title line clamping limit           | `number`                                                    | `2`          |
| description        | Product description                 | `string`                                                    | `''`         |
| description-lines  | Description line clamping limit     | `number`                                                    | `1`          |
| price              | Current selling price               | `number \| string`                                          | `0`          |
| market-price       | Reference/Market price              | `number \| string`                                          | `''`         |
| vip-price          | Exclusive member price              | `number \| string`                                          | `''`         |
| vip-label          | Member price tag text               | `string`                                                    | `'VIP'`      |
| currency           | Currency symbol                     | `string`                                                    | `'¥'`        |
| unit               | Price measurement suffix            | `string`                                                    | `''`         |
| ribbon             | Marketing ribbon text               | `string`                                                    | `''`         |
| ribbon-color       | Ribbon background color             | `string`                                                    | `''`         |
| tag                | Legacy: Single tag text             | `string`                                                    | `''`         |
| tag-type           | Legacy: Tag color type              | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'`   |
| badges             | Multi-badge array (text/image)      | `ProductBadge[]`                                            | `[]`         |
| layout             | Layout mode                         | `'vertical' \| 'horizontal' \| 'compact'`                   | `'vertical'` |
| lazy               | Image lazy loading                  | `boolean`                                                   | `true`       |
| border             | Enable card border                  | `boolean`                                                   | `true`       |
| shadow             | Enable hover elevation shadow       | `boolean`                                                   | `true`       |
| readonly           | Hide all action buttons             | `boolean`                                                   | `false`      |
| stock-progress     | Flash sale stock progress (0-100)   | `number`                                                    | `0`          |
| stock-color        | Progress bar color/gradient         | `string`                                                    | `''`         |
| stock-text         | Stock progress label                | `string`                                                    | `''`         |
| action-text        | Primary button text                 | `string`                                                    | `'Buy Now'`  |
| action-loading     | Primary button loading state        | `boolean`                                                   | `false`      |
| sold-out           | Mark as sold out (mask + grayscale) | `boolean`                                                   | `false`      |
| exposure           | Enable automatic exposure analytics | `boolean`                                                   | `false`      |
| exposure-threshold | Ratio threshold for analytics       | `number`                                                    | `0.5`        |
| exposure-once      | Report only once per session        | `boolean`                                                   | `true`       |

### Events

| Name   | Description                        | Parameters        |
| ------ | ---------------------------------- | ----------------- |
| click  | Fired when clicking the card       | `(e: MouseEvent)` |
| action | Fired when clicking primary button | `(e: MouseEvent)` |
| expose | Fired on exposure threshold hit    | —                 |

### Slots

| Name        | Description                 |
| ----------- | --------------------------- |
| title       | Custom title template       |
| description | Custom description template |
| footer      | Custom bottom action area   |

### ProductBadge Interface

```ts
interface ProductBadge {
  text?: string
  image?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
}
```
