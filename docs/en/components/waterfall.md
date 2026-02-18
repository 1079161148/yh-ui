<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface WaterfallItem {
  id: number | string
  title: string
  height?: number
  color?: string
  image?: string
  price?: number
  desc?: string
  category?: string
}

/** Helper function: convert TS examples to JS examples */
const toJs = (ts: string | undefined) => {
  if (!ts) return ''
  return ts
    .replace(/ lang="ts"/g, '')
    .replace(/ref<.*?>/g, 'ref')
    .replace(/interface [A-Z]\w+ \{[\s\S]*?\}/g, '')
    .replace(/: [A-Z]\w+\[\]/g, '')
    .replace(/ as [A-Z]\w+\[\]/g, '')
    .replace(/: number \| string/g, '')
    .replace(/\(i: any\)/g, '(i)')
    .replace(/\(p: any\)/g, '(p)')
}

const demoData: WaterfallItem[] = [
  { id: 1, title: 'Waterfall Content Card #1', height: 180, color: '#f0f7ff', desc: 'Shortest column balancing algorithm for a cleaner aesthetic.' },
  { id: 2, title: 'Waterfall Content Card #2', height: 260, color: '#fff1f0', desc: 'Basic demonstration node.' },
  { id: 3, title: 'Waterfall Content Card #3', height: 140, color: '#f6ffed', desc: 'Supports image load awareness.' },
  { id: 4, title: 'Waterfall Content Card #4', height: 300, color: '#fff7e6', desc: 'Responsive auto-alignment.' },
  { id: 5, title: 'Waterfall Content Card #5', height: 220, color: '#f9f0ff', desc: 'Staggered entrance animations.' },
  { id: 6, title: 'Waterfall Content Card #6', height: 190, color: '#fff0f6', desc: 'Basic demonstration node.' }
]

const dataString = JSON.stringify(demoData, null, 2)

/** ---- Basic Usage Data ---- */
const basicList = ref<WaterfallItem[]>(demoData)
const tsBasic = `<template>
  <yh-waterfall :items="list" :cols="3" :gap="16" height-property="height">
    <template #default="{ item }">
      <div :style="{ 
        height: item.height + 'px', 
        backgroundColor: item.color,
        borderRadius: '12px',
        border: '1px solid var(--yh-border-color-light)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }">
        <h4 style="margin: 0; font-size: 14px;">{{ item.title }}</h4>
        <p style="margin: 8px 0 0; font-size: 12px; color: var(--yh-color-text-secondary);">{{ item.desc }}</p>
      </div>
    </template>
  </yh-waterfall>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface WaterfallItem {
  id: number | string
  title: string
  height?: number
  color?: string
  desc?: string
}

const list = ref<WaterfallItem[]>(${dataString})
<\/script>`

/** ---- State Demo Data ---- */
const stateList = ref<WaterfallItem[]>(demoData)
const stateLoading = ref(false)
const toggleLoading = () => {
  stateLoading.value = true
  stateList.value = []
  setTimeout(() => {
    stateList.value = demoData
    stateLoading.value = false
  }, 1500)
}
const clearData = () => { stateList.value = [] }
const resetData = () => { stateList.value = demoData }
const tsStates = `<template>
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button @click="toggleLoading">Trigger Loading</yh-button>
    <yh-button @click="clearData">Clear Data</yh-button>
    <yh-button @click="resetData">Reset Data</yh-button>
  </div>

  <yh-waterfall :items="list" :loading="loading" :cols="3" :gap="16">
    <template #default="{ item }">
      <div style="display: flex; align-items: center; justify-content: center; border-radius: 12px; font-size: 13px; border: 1px solid var(--yh-border-color-light);" :style="{ height: item.height + 'px', background: item.color }">
        {{ item.title }}
      </div>
    </template>
    <template #empty>
      <div style="padding: 60px 0; text-align: center; color: var(--yh-color-text-secondary);">
         <div style="font-size: 40px; margin-bottom: 12px;">📭</div>
         <p>No content available</p>
      </div>
    </template>
  </yh-waterfall>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface WaterfallItem {
  id: number | string
  title: string
  height?: number
  color?: string
  desc?: string
}

const list = ref<WaterfallItem[]>(${dataString})
const loading = ref(false)

const toggleLoading = () => {
  loading.value = true
  list.value = []
  setTimeout(() => {
    list.value = demoData as WaterfallItem[]
    loading.value = false
  }, 2000)
}
const clearData = () => { list.value = [] }
const resetData = () => { list.value = demoData as WaterfallItem[] }
<\/script>`

/** ---- E-commerce: Pagination Mode ---- */
const shopPage = ref(1)
const shopLoading = ref(false)
const shopItems = ref<WaterfallItem[]>([])
const fetchShopData = async (page: number) => {
  shopLoading.value = true
  try {
    const res = await fetch('https://dummyjson.com/products?limit=8&skip=' + ((page - 1) * 8) + '&select=title,price,thumbnail')
    const data = await res.json()
    shopItems.value = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.thumbnail
    }))
  } finally {
    shopLoading.value = false
  }
}
const handlePageChange = (p: number) => {
  shopPage.value = p
  fetchShopData(p)
}
onMounted(() => fetchShopData(1))
const tsPagination = `<template>
  <div style="min-height: 400px;">
    <yh-waterfall 
      :items="products" 
      :loading="loading" 
      :cols="{ xs: 2, sm: 3, md: 4 }" 
      img-selector="img"
    >
      <template #default="{ item }">
        <div class="shop-card">
          <div class="shop-img-box"><img :src="item.image" class="shop-img" /></div>
          <div class="shop-info">
            <div class="shop-title">{{ item.title }}</div>
            <div class="shop-price">¥{{ item.price }}</div>
          </div>
        </div>
      </template>

      <!-- Custom loading overlay (optional) -->
      <template #loading-overlay>
        <div class="custom-loading">Loading next page...</div>
      </template>
    </yh-waterfall>

    <yh-pagination 
      v-model:current-page="page" 
      :total="100" 
      :page-size="8" 
      layout="prev, pager, next" 
      @current-change="onPageChange" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ProductItem {
  id: number | string
  title: string
  price: number
  image: string
}

const products = ref<ProductItem[]>([])
const page = ref(1)
const loading = ref(false)

const fetchProducts = async (p: number) => {
  loading.value = true
  try {
    const res = await fetch('https://dummyjson.com/products?limit=8&skip=' + ((p-1)*8))
    const data = await res.json()
    products.value = data.products.map((p: any) => ({ ...p, image: p.thumbnail }))
  } finally {
    loading.value = false
  }
}

const onPageChange = (p: number) => fetchProducts(p)
onMounted(() => fetchProducts(1))
<\/script>`

/** ---- E-commerce: Infinite Loading ---- */
const infiniteItems = ref<WaterfallItem[]>([])
const infiniteLoading = ref(false)
const infiniteFinished = ref(false)
let skipCount = 0
const loadMoreProducts = async () => {
  if (infiniteLoading.value || infiniteFinished.value) return
  infiniteLoading.value = true
  try {
    const res = await fetch('https://dummyjson.com/products?limit=6&skip=' + skipCount + '&select=title,price,thumbnail')
    const data = await res.json()
    infiniteItems.value.push(...data.products.map((p: any) => ({ ...p, image: p.thumbnail })))
    skipCount += 6
    if (infiniteItems.value.length >= 24) infiniteFinished.value = true
  } finally {
    infiniteLoading.value = false
  }
}
const tsInfinite = `<template>
  <div v-infinite-scroll="loadMore" style="height: 400px; overflow: auto; border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-waterfall :items="list" :cols="3" :gap="12" img-selector="img">
      <template #default="{ item }">
        <div class="shop-card mini">
          <img :src="item.image" class="shop-img" />
          <div class="shop-info">
            <div class="shop-title small">{{ item.title }}</div>
            <div class="shop-price small">¥{{ item.price }}</div>
          </div>
        </div>
      </template>
      
      <!-- Footer loading placeholder for infinite loading -->
      <template #loading>
         <div v-for="i in 3" :key="i" class="yh-waterfall__item--skeleton" style="height: 180px;"></div>
      </template>
    </yh-waterfall>

    <!-- Bottom status hint -->
    <div v-if="loading" style="text-align: center; padding: 12px; color: var(--yh-color-primary);">Loading...</div>
    <div v-if="finished" style="text-align: center; padding: 12px; color: var(--yh-color-text-secondary);">🎉 No more items</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ListItem {
  id: number | string
  title: string
  price: number
  image: string
}

const list = ref<ListItem[]>([])
const loading = ref(false)
const finished = ref(false)
let skip = 0

const loadMore = async () => {
  if (loading.value || finished.value) return
  loading.value = true
  try {
    const res = await fetch('https://dummyjson.com/products?limit=6&skip=' + skip)
    const data = await res.json()
    list.value.push(...data.products.map((i: any) => ({ ...i, image: i.thumbnail })))
    skip += 6
    if (list.value.length >= 24) finished.value = true
  } finally {
    loading.value = false
  }
}
<\/script>`

/** ---- Nuxt Demo ---- */
const nuxtItems = ref(demoData)
const tsNuxt = `<template>
  <yh-waterfall :items="list" :cols="3" :gap="16">
    <template #default="{ item }">
      <div style="display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid var(--yh-border-color-light);" :style="{ background: item.color, height: (item.height / 2) + 'px' }">
        {{ item.title }}
      </div>
    </template>
  </yh-waterfall>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface WaterfallItem {
  id: number | string
  title: string
  color?: string
  height: number
  desc?: string
}

const list = ref<WaterfallItem[]>(${JSON.stringify(demoData, null, 2)})
<\/script>`
</script>

# Waterfall

A high-performance Masonry layout component. Its core algorithm uses **shortest column balancing** and supports image preloading awareness, loading states, empty views, and responsive breakpoints.

## Basic Usage

<DemoBlock title="Shortest Column Balance Algorithm" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-waterfall :items="basicList" :cols="3" :gap="16" height-property="height">
    <template #default="{ item }">
      <div :style="{ 
        height: item.height + 'px', 
        backgroundColor: item.color,
        borderRadius: '12px',
        border: '1px solid var(--yh-border-color-light)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }">
        <h4 style="margin: 0; font-size: 14px;">{{ item.title }}</h4>
        <p style="margin: 8px 0 0; font-size: 12px; color: var(--yh-color-text-secondary);">{{ item.desc }}</p>
      </div>
    </template>
  </yh-waterfall>
</DemoBlock>

## Interaction States

<DemoBlock title="Loading and Empty States" :ts-code="tsStates" :js-code="toJs(tsStates)">
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button @click="toggleLoading">Trigger Loading</yh-button>
    <yh-button @click="clearData">Clear Data</yh-button>
    <yh-button @click="resetData">Reset Data</yh-button>
  </div>
  <yh-waterfall :items="stateList" :loading="stateLoading" :cols="3" :gap="16">
    <template #default="{ item }">
       <div style="display: flex; align-items: center; justify-content: center; border-radius: 12px; font-size: 13px; border: 1px solid var(--yh-border-color-light);" :style="{ height: item.height + 'px', background: item.color }">
        {{ item.title }}
      </div>
    </template>
    <template #empty>
      <div style="padding: 60px 0; text-align: center; color: var(--yh-color-text-secondary);">
         <div style="font-size: 40px; margin-bottom: 12px;">📭</div>
         <p>No content available</p>
      </div>
    </template>
  </yh-waterfall>
</DemoBlock>

## Usage in Nuxt

The Waterfall component fully supports SSR in Nuxt 3/4. When used in a Nuxt project, it is auto-imported.

<DemoBlock title="Nuxt Integration" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-waterfall :items="nuxtItems" :cols="3" :gap="16">
    <template #default="{ item }">
      <div style="display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid var(--yh-border-color-light);" :style="{ background: item.color, height: (item.height / 2) + 'px' }">
        {{ item.title }}
      </div>
    </template>
  </yh-waterfall>
</DemoBlock>

**SSR Considerations**:
- ✅ Supports static rendering on first load to prevent layout shifts.
- ✅ Responsive column counts automatically adapt to container width after client-side hydration.

## Commercial Case: E-commerce Pagination

<DemoBlock title="Pagination Loading" :ts-code="tsPagination" :js-code="toJs(tsPagination)">
  <div style="min-height: 400px;">
    <yh-waterfall :items="shopItems" :loading="shopLoading" :cols="{ xs: 2, sm: 3, md: 4 }" :gap="12" img-selector="img">
      <template #default="{ item }">
        <div class="shop-card">
          <div class="shop-img-box"><img :src="item.image" class="shop-img" /></div>
          <div class="shop-info">
            <div class="shop-title">{{ item.title }}</div>
            <div class="shop-price">¥{{ item.price }}</div>
          </div>
        </div>
      </template>
    </yh-waterfall>
    <yh-pagination v-model:current-page="shopPage" :total="100" :page-size="8" layout="prev, pager, next" @current-change="handlePageChange" style="margin-top: 32px; justify-content: center;" />
  </div>
</DemoBlock>

## Commercial Case: Infinite Loading Flow

<DemoBlock title="Infinite Flow" :ts-code="tsInfinite" :js-code="toJs(tsInfinite)">
  <div style="height: 500px; overflow: auto; border: 1px solid var(--yh-border-color-lighter); border-radius: 8px; padding: 12px;" v-infinite-scroll="loadMoreProducts">
    <yh-waterfall :items="infiniteItems" :cols="3" :gap="12" img-selector="img">
      <template #default="{ item }">
        <div class="shop-card mini">
          <img :src="item.image" class="shop-img" />
          <div class="shop-info">
            <div class="shop-title small">{{ item.title }}</div>
            <div class="shop-price small">¥{{ item.price }}</div>
          </div>
        </div>
      </template>
      <template #loading>
         <div v-for="i in 3" :key="i" class="yh-waterfall__item--skeleton" style="height: 180px; margin-bottom: 12px;"></div>
      </template>
    </yh-waterfall>
    <div v-if="infiniteLoading" style="text-align: center; padding: 16px; color: var(--yh-color-primary);">Loading...</div>
    <div v-if="infiniteFinished" style="text-align: center; padding: 16px; color: var(--yh-color-text-secondary);">🎉 End of list</div>
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `items` | Data source array | `T[]` | `[]` |
| `cols` | Column count config. Supports a number or responsive object. | `number \| WaterfallCols` | `2` |
| `gap` | Gap between cards (px) | `number` | `16` |
| `loading` | Whether in loading state | `boolean` | `false` |
| `height-property` | Field name for height used for balanced layout. Enables shortest column algorithm if provided. | `string` | `'height'` |
| `img-selector` | Internal image selector. Triggers re-calculation after images load. | `string` | `'img'` |
| `animation` | Whether entrance animations are enabled | `boolean` | `true` |
| `delay` | Base delay for step-up animations (ms) | `number` | `100` |
| `row-key` | Field name for unique identifier | `string` | `'id'` |
| `responsive` | Whether to automatically listen for container width changes | `boolean` | `true` |

#### WaterfallCols Definition
```ts
interface WaterfallCols {
  xs?: number // < 576px
  sm?: number // >= 576px
  md?: number // >= 768px
  lg?: number // >= 992px
  xl?: number // >= 1200px
}
```

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| `default` | Custom node rendering | `{ item: T, index: number, column: number }` |
| `loading` | Custom initial loading placeholder (usually skeletons) | `-` |
| `empty` | Custom empty state content | `-` |
| `loading-overlay` | Custom overlay for refresh states (when old data is present) | `-` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `layout` | Manually trigger layout re-calculation | `() => void` |

## Theme Variables

Customize local styles by overriding these CSS variables:

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-bg-color-page` | Background for skeleton nodes | `var(--yh-bg-color-page)` |
| `--yh-color-text-secondary` | Empty state text color | `var(--yh-text-color-secondary)` |
| `--yh-color-primary` | Loader rotation color for refresh overlay | `var(--yh-color-primary)` |
| `--yh-color-primary-light-8` | Loader orbit background for refresh overlay | `var(--yh-color-primary-light-8)` |

<style scoped>
.shop-card {
  background: var(--yh-bg-color);
  border: 1px solid var(--yh-border-color-light);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
}
.shop-card:hover { transform: translateY(-4px); }
.shop-img-box { width: 100%; background: #f5f5f5; line-height: 0; }
.shop-img { width: 100%; height: auto; display: block; object-fit: cover; }
.shop-info { padding: 12px; }
.shop-title { font-size: 14px; color: var(--yh-color-text-primary); font-weight: 600; margin-bottom: 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.shop-price { color: #f56c6c; font-size: 16px; font-weight: bold; }
.shop-title.small { font-size: 12px; -webkit-line-clamp: 1; }
.shop-price.small { font-size: 14px; }
.shop-card.mini { border-radius: 8px; }
.custom-loading { color: var(--yh-color-primary); font-weight: bold; background: rgba(255,255,255,0.8); padding: 8px 16px; border-radius: 20px; border: 1px solid var(--yh-color-primary-light-5); }
</style>
