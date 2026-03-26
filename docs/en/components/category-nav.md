<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// ─── Extended Full Dataset ───────────────────────────────────────────────────
const activeId = ref('1')
const categories = [
  {
    id: '1', name: 'Top Picks',
    children: [
      { id: '1-1', name: 'New Mobiles', image: 'https://picsum.photos/100/100?random=1' },
      { id: '1-2', name: 'Hot Laptops', image: 'https://picsum.photos/100/100?random=2' },
      { id: '1-3', name: 'Best Tablets', image: 'https://picsum.photos/100/100?random=3' }
    ]
  },
  {
    id: '2', name: 'Mobiles',
    children: [
      { id: '2-1', name: 'Huawei', image: 'https://picsum.photos/100/100?random=4' },
      { id: '2-2', name: 'Apple', image: 'https://picsum.photos/100/100?random=5' },
      { id: '2-3', name: 'Xiaomi', image: 'https://picsum.photos/100/100?random=6' },
      { id: '2-4', name: 'Honor', image: 'https://picsum.photos/100/100?random=21' }
    ]
  },
  {
    id: '3', name: 'Computers',
    children: [
      { id: '3-1', name: 'Monitors', image: 'https://picsum.photos/100/100?random=7' },
      { id: '3-2', name: 'Keyboards', image: 'https://picsum.photos/100/100?random=8' },
      { id: '3-3', name: 'Mice', image: 'https://picsum.photos/100/100?random=9' }
    ]
  },
  {
    id: '4', name: 'Appliances',
    children: [
      { id: '4-1', name: 'Smart TV', image: 'https://picsum.photos/100/100?random=10' },
      { id: '4-2', name: 'Fridge', image: 'https://picsum.photos/100/100?random=11' },
      { id: '4-3', name: 'Washer', image: 'https://picsum.photos/100/100?random=12' }
    ]
  },
  {
    id: '5', name: 'Accessories',
    children: [
      { id: '5-1', name: 'Watch', image: 'https://picsum.photos/100/100?random=13' },
      { id: '5-2', name: 'Audio', image: 'https://picsum.photos/100/100?random=14' },
      { id: '5-3', name: 'Power', image: 'https://picsum.photos/100/100?random=15' }
    ]
  },
  {
    id: '6', name: 'Home Design',
    children: [
      { id: '6-1', name: 'Ergo Chair', image: 'https://picsum.photos/100/100?random=16' },
      { id: '6-2', name: 'Standing Desk', image: 'https://picsum.photos/100/100?random=17' }
    ]
  },
  {
    id: '7', name: 'Outdoors',
    children: [
      { id: '7-1', name: 'Indoor Cycle', image: 'https://picsum.photos/100/100?random=18' },
      { id: '7-2', name: 'Sport Cam', image: 'https://picsum.photos/100/100?random=19' }
    ]
  },
  {
    id: '8', name: 'Books',
    children: [
      { id: '8-1', name: 'Classic Literature', image: 'https://picsum.photos/100/100?random=20' },
      { id: '8-2', name: 'Stationery', image: 'https://picsum.photos/100/100?random=22' }
    ]
  },
  {
    id: '9', name: 'Fresh Food',
    children: [
      { id: '9-1', name: 'Imported Fruits', image: 'https://picsum.photos/100/100?random=23' },
      { id: '9-2', name: 'Snacks', image: 'https://picsum.photos/100/100?random=24' }
    ]
  },
  {
    id: '10', name: 'Baby Care',
    children: [
      { id: '10-1', name: 'Strollers', image: 'https://picsum.photos/100/100?random=25' },
      { id: '10-2', name: 'Educational Toys', image: 'https://picsum.photos/100/100?random=26' }
    ]
  }
]

// ─── Loading Status ──────────────────────────────────────────────────────────
const isLoading = ref(false)
const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 2000)
}

// ─── Basic Usage Code (100% Full Implementation) ──────────────────────────────
const tsBasic = `<${_T}>
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 450px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav
      v-model="activeId"
      :categories="categories"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const activeId = ref('1')
const categories = [
  { id: '1', name: 'Top Picks', children: [{ id: '1-1', name: 'Phone', image: 'https://example.com/1.jpg' }] },
  { id: '2', name: 'Mobiles', children: [{ id: '2-1', name: 'Huawei', image: 'https://example.com/2.jpg' }] },
  { id: '3', name: 'Computers', children: [{ id: '3-1', name: 'Monitor', image: 'https://example.com/3.jpg' }] },
  { id: '4', name: 'Appliances', children: [{ id: '4-1', name: 'TV', image: 'https://example.com/4.jpg' }] },
  { id: '5', name: 'Accessories', children: [{ id: '5-1', name: 'Watch', image: 'https://example.com/5.jpg' }] },
  { id: '6', name: 'Home Design', children: [{ id: '6-1', name: 'Chair', image: 'https://example.com/6.jpg' }] },
  { id: '7', name: 'Outdoors', children: [{ id: '7-1', name: 'Cycle', image: 'https://example.com/7.jpg' }] },
  { id: '8', name: 'Books', children: [{ id: '8-1', name: 'Classic', image: 'https://example.com/8.jpg' }] },
  { id: '9', name: 'Fresh Food', children: [{ id: '9-1', name: 'Fruit', image: 'https://example.com/9.jpg' }] },
  { id: '10', name: 'Baby Care', children: [{ id: '10-1', name: 'Stroller', image: 'https://example.com/10.jpg' }] }
]
</${_S}>`

const tsLoading = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button @click="toggleLoading">Simulate Async Fetch (2s)</yh-button>
  </div>
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 350px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav :loading="isLoading" :categories="categories" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const categories = ref([])

const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    categories.value = [
      { id: '1', name: 'Top Picks', children: [{ id: '1-1', name: 'Phone', image: 'https://example.com/1.jpg' }] },
      { id: '2', name: 'Mobiles', children: [{ id: '2-1', name: 'Huawei', image: 'https://example.com/2.jpg' }] }
    ]
    isLoading.value = false
  }, 2000)
}
</${_S}>`

const tsTheme = `<${_T}>
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 350px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav
      :categories="categories"
      :theme-overrides="customTheme"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const categories = [
  { id: '1', name: 'Best Offers', children: [{ id: '1-1', name: 'Coupons', image: 'https://example.com/v.jpg' }] }
]

const customTheme = {
  sideActiveColor: '#ff4d4f',
  sideBg: '#fff1f0',
  sideActiveBg: '#fff'
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsLoading = toJs(tsLoading)
const jsTheme = toJs(tsTheme)

</script>

# CategoryNav

Premium navigation pattern for e-commerce, supporting bidirectional synchronization (Left click -> Right scroll; Right scroll -> Left centering & highlighting).

## Basic Usage (Massive Data Demo)

This example demonstrates bidirectional linkage with **10 large category groups**. The sidebar intelligently centers the active item as you scroll through the massive content area.

<DemoBlock title="Massive Data Synchronization" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 450px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav
      v-model="activeId"
      :categories="categories"
    />
  </div>
</DemoBlock>

## Loading State

Displays high-quality skeleton grids when \`loading\` is enabled.

<DemoBlock title="Async Simulation" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="margin-bottom: 12px;">
    <yh-button @click="toggleLoading">Simulate Async Fetch (2s)</yh-button>
  </div>
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 350px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav :loading="isLoading" :categories="categories.slice(0, 3)" />
  </div>
</DemoBlock>

## Custom Theme

The `theme-overrides` property allows you to quickly override internal CSS variables without writing complex global styles.

<DemoBlock title="Brand Customized Theme" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 350px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav
      :categories="categories.slice(0, 2)"
      :theme-overrides="{
        sideActiveColor: '#ff4d4f',
        sideBg: '#fff1f0',
        sideActiveBg: '#fff'
      }"
    />
  </div>
</DemoBlock>

## Use in Nuxt

This component fully supports Nuxt 3/4 SSR (Server-Side Rendering).

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    components: ['YhCategoryNav']
  }
})
```

---

## API

### Props

| Attribute                      | Description                                      | Type                       | Default |
| ------------------------------ | ------------------------------------------------ | -------------------------- | ------- |
| `categories`                   | Core data source containing IDs and sub-items    | `CategoryItem[]`           | `[]`    |
| `model-value / v-model`        | Current active primary category ID               | `string \| number \| null` | `null`  |
| `sub-value / v-model:subValue` | Current active sub-category ID                   | `string \| number \| null` | `null`  |
| `side-width`                   | Width of the left sidebar                        | `string`                   | `84px`  |
| `show-all`                     | Whether to display the "All" item at the top     | `boolean`                  | `true`  |
| `loading`                      | Whether to show refined skeleton loading state   | `boolean`                  | `false` |
| `columns`                      | Number of columns for flattened sub-items        | `number`                   | `3`     |
| `sub-image-size`               | Image thumbnail size (px)                        | `number`                   | `64`    |
| `anchor`                       | Whether to enable bidirectional scroll anchoring | `boolean`                  | `true`  |
| `theme-overrides`              | Set of custom theme CSS variable overrides       | `Record<string, string>`   | `{}`    |

### Events

| Event Name           | Description                                     | Callback Parameters                             |
| -------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `category-click`     | Triggered when any primary category is clicked  | `(item: CategoryItem)`                          |
| `sub-category-click` | Triggered when any sub-category is clicked      | `(item: CategorySubItem, parent: CategoryItem)` |
| `update:modelValue`  | Emitted when active primary category ID changes | `(id: string \| number \| null)`                |
| `update:subValue`    | Emitted when active sub-category ID changes     | `(id: string \| number \| null)`                |

### Slots

| Slot Name        | Description                                 | Parameters                                       |
| ---------------- | ------------------------------------------- | ------------------------------------------------ |
| `all-icon`       | Custom icon for "All" button                | -                                                |
| `header`         | Business slot at the top of content area    | -                                                |
| `footer`         | Business slot at the bottom of content area | -                                                |
| `section-header` | Custom rendering for each section header    | `{ category: CategoryItem }`                     |
| `section-footer` | Custom rendering for each section footer    | `{ category: CategoryItem }`                     |
| `sub-item`       | Complete custom rendering for sub-items     | `{ sub: CategorySubItem, parent: CategoryItem }` |

### CSS Variables

| Variable Name                           | Description                           | Default                          |
| --------------------------------------- | ------------------------------------- | -------------------------------- |
| `--yh-category-nav-side-bg`             | Left sidebar background color         | `#f7f8fa`                        |
| `--yh-category-nav-content-bg`          | Right content area background color   | `#ffffff`                        |
| `--yh-category-nav-side-active-color`   | Active item text & indicator color    | `var(--yh-color-primary)`        |
| `--yh-category-nav-side-active-bg`      | Active item background color          | `#ffffff`                        |
| `--yh-category-nav-side-width`          | Sidebar width                         | `84px`                           |
| `--yh-category-nav-sub-image-size`      | Sub-category image size               | `64px`                           |
| `--yh-category-nav-columns`             | Number of columns for flattened items | `3`                              |
| `--yh-category-nav-section-title-color` | Section title color                   | `var(--yh-text-color-secondary)` |
