<script setup lang="ts">
import { ref } from 'vue'

// Basic Usage
const loading = ref(false)
const finished = ref(false)
const list = ref<number[]>([1, 2, 3, 4, 5])
const onLoad = () => {
  loading.value = true
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      list.value.push(list.value.length + 1)
    }
    loading.value = false
    if (list.value.length >= 20) {
      finished.value = true
    }
  }, 1000)
}

// Custom Text
const textLoading = ref(false)
const textFinished = ref(false)
const textList = ref<number[]>([1, 2, 3])
const onTextLoad = () => {
  textLoading.value = true
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      textList.value.push(textList.value.length + 1)
    }
    textLoading.value = false
    if (textList.value.length >= 12) {
      textFinished.value = true
    }
  }, 1000)
}

// Error State
const errorLoading = ref(false)
const errorState = ref(false)
const errorList = ref<number[]>([1, 2, 3])
const onErrorLoad = () => {
  errorLoading.value = true
  setTimeout(() => {
    errorLoading.value = false
    errorState.value = true
  }, 1000)
}

// Custom Slot
const slotLoading = ref(false)
const slotFinished = ref(false)
const slotList = ref<number[]>([1, 2])
const onSlotLoad = () => {
  slotLoading.value = true
  setTimeout(() => {
    for (let i = 0; i < 2; i++) {
      slotList.value.push(slotList.value.length + 1)
    }
    slotLoading.value = false
    if (slotList.value.length >= 6) {
      slotFinished.value = true
    }
  }, 1000)
}

// Nuxt SSR Mock
const nuxtItems = ref<any[]>([])
const nuxtLoading = ref(false)
const nuxtFinished = ref(false)
const page = ref(1)

const onNuxtLoad = async () => {
  if (nuxtLoading.value || nuxtFinished.value) return
  nuxtLoading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + page.value + '&_limit=5')
    const data = await res.json()
    if (data.length > 0) {
      nuxtItems.value.push(...data)
      page.value++
    }
    if (nuxtItems.value.length >= 15) {
      nuxtFinished.value = true
    }
  } finally {
    nuxtLoading.value = false
  }
}

// Real-world scenario: E-commerce Product List
const shopItems = ref<any[]>([])
const shopLoading = ref(false)
const shopFinished = ref(false)
const shopError = ref(false)
const shopPage = ref(1)

const onShopLoad = async () => {
  if (shopLoading.value || shopFinished.value) return
  shopLoading.value = true
  shopError.value = false
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + shopPage.value + '&_limit=6')
    const data = await res.json()
    
    if (data.length > 0) {
      const products = data.map((item: any) => ({
        id: item.id,
        name: 'Premium Product #' + item.id,
        price: (Math.random() * 1000 + 100).toFixed(2),
        desc: item.title.slice(0, 30) + '...',
        tag: item.id % 2 === 0 ? 'New' : 'Hot'
      }))
      shopItems.value.push(...products)
      shopPage.value++
    }
    
    if (shopItems.value.length >= 24) {
      shopFinished.value = true
    }
  } catch (e) {
    shopError.value = true
  } finally {
    shopLoading.value = false
  }
}

const tsBasic = `<template>
  <yh-infinite-scroll
    v-model:loading="loading"
    :finished="finished"
    @load="onLoad"
  >
    <div v-for="item in list" :key="item" class="demo-item">
      Item {{ item }}
    </div>
  </yh-infinite-scroll>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const finished = ref(false)
const list = ref<number[]>([1, 2, 3, 4, 5])

const onLoad = () => {
  loading.value = true
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      list.value.push(list.value.length + 1)
    }
    loading.value = false
    if (list.value.length >= 20) {
      finished.value = true
    }
  }, 1000)
}
<\/script>`

const tsCustomText = `<template>
  <yh-infinite-scroll
    v-model:loading="textLoading"
    :finished="textFinished"
    loading-text="Loading hard..."
    finished-text="Reached the bottom~"
    @load="onTextLoad"
  >
    <div v-for="item in textList" :key="item" class="demo-item">
      Item {{ item }}
    </div>
  </yh-infinite-scroll>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const textLoading = ref(false)
const textFinished = ref(false)
const textList = ref([1, 2, 3])

const onTextLoad = () => {
  textLoading.value = true
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      textList.value.push(textList.value.length + 1)
    }
    textLoading.value = false
    if (textList.value.length >= 12) {
      textFinished.value = true
    }
  }, 1000)
}
<\/script>`

const tsError = `<template>
  <yh-infinite-scroll
    v-model:loading="errorLoading"
    v-model:error="errorState"
    error-text="Request failed, click to reload"
    @load="onErrorLoad"
  >
    <div v-for="item in errorList" :key="item" class="demo-item">
      Item {{ item }}
    </div>
  </yh-infinite-scroll>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const errorLoading = ref(false)
const errorState = ref(false)
const errorList = ref([1, 2, 3])

const onErrorLoad = () => {
  errorLoading.value = true
  setTimeout(() => {
    errorLoading.value = false
    errorState.value = true
  }, 1000)
}
<\/script>`

const tsCustomSlot = `<template>
  <yh-infinite-scroll v-model:loading="slotLoading" :finished="slotFinished" @load="onSlotLoad">
    <div v-for="item in slotList" :key="item" class="demo-item">
      Item {{ item }}
    </div>
    <template #loading>
      <div class="custom-status">Moving data in progress...</div>
    </template>
    <template #finished>
      <div class="custom-status finished">🌟 Congratulations, you've unlocked all treasures</div>
    </template>
  </yh-infinite-scroll>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const slotLoading = ref(false)
const slotFinished = ref(false)
const slotList = ref([1, 2])

const onSlotLoad = () => {
  slotLoading.value = true
  setTimeout(() => {
    for (let i = 0; i < 2; i++) {
      slotList.value.push(slotList.value.length + 1)
    }
    slotLoading.value = false
    if (slotList.value.length >= 6) {
      slotFinished.value = true
    }
  }, 1000)
}
<\/script>`

const tsNuxt = `<template>
  <yh-infinite-scroll
    v-model:loading="nuxtLoading"
    :finished="nuxtFinished"
    @load="onNuxtLoad"
  >
    <div v-for="item in nuxtItems" :key="item.id" class="demo-item nuxt-item">
      <div style="font-weight: 500; font-size: 14px;">{{ item.title }}</div>
      <div style="font-size: 12px; color: var(--yh-color-text-secondary); margin-top: 4px;">Post ID: {{ item.id }}</div>
    </div>
  </yh-infinite-scroll>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nuxtLoading = ref(false)
const nuxtFinished = ref(false)
const nuxtItems = ref([])
const page = ref(1)

const onNuxtLoad = async () => {
  if (nuxtLoading.value || nuxtFinished.value) return
  nuxtLoading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + page.value + '&_limit=5')
    const data = await res.json()
    if (data.length > 0) {
      nuxtItems.value.push(...data)
      page.value++
    }
    if (nuxtItems.value.length >= 15) {
      nuxtFinished.value = true
    }
  } finally {
    nuxtLoading.value = false
  }
}
<\/script>`

const tsBusiness = `<template>
  <div class="demo-container business-container">
    <yh-infinite-scroll
      v-model:loading="shopLoading"
      v-model:error="shopError"
      :finished="shopFinished"
      @load="onShopLoad"
    >
      <div class="shop-grid">
        <div v-for="item in shopItems" :key="item.id" class="shop-card">
          <div class="shop-badge">{{ item.tag }}</div>
          <div class="shop-content">
            <h4 class="shop-title">{{ item.name }}</h4>
            <p class="shop-desc">{{ item.desc }}</p>
            <div class="shop-footer">
              <span class="shop-price">￥{{ item.price }}</span>
              <yh-button type="primary" size="small" round>Buy</yh-button>
            </div>
          </div>
        </div>
      </div>
    </yh-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shopItems = ref([])
const shopLoading = ref(false)
const shopFinished = ref(false)
const shopError = ref(false)
const shopPage = ref(1)

const onShopLoad = async () => {
  if (shopLoading.value || shopFinished.value) return
  shopLoading.value = true
  shopError.value = false
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + shopPage.value + '&_limit=6')
    const data = await res.json()

    if (data.length > 0) {
      const products = data.map(item => ({
        id: item.id,
        name: 'Premium Product #' + item.id,
        price: (Math.random() * 1000 + 100).toFixed(2),
        desc: item.title.slice(0, 30) + '...',
        tag: item.id % 2 === 0 ? 'New' : 'Hot'
      }))
      shopItems.value.push(...products)
      shopPage.value++
    }

    if (shopItems.value.length >= 24) {
      shopFinished.value = true
    }
  } catch (e) {
    shopError.value = true
  } finally {
    shopLoading.value = false
  }
}
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '').replace('<number[]>', '')
const jsCustomText = tsCustomText.replace('lang="ts"', '')
const jsError = tsError.replace('lang="ts"', '')
const jsCustomSlot = tsCustomSlot.replace('lang="ts"', '')
const jsNuxt = tsNuxt.replace('lang="ts"', '')
const jsBusiness = tsBusiness.replace('lang="ts"', '')
</script>

# Infinite Scroll

Automatically loads more data when scrolling to the bottom, supporting SSR, custom slots, and complex scroll container scenarios.

## Basic Usage

The simplest asynchronous paginated load. Synchronize loading status via `v-model:loading` and lock loading with `finished`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="loading" :finished="finished" @load="onLoad">
    <div v-for="item in list" :key="item" class="demo-item">
      Item {{ item }}
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## Custom Tip Text

Quickly customize intuitive text interaction via attributes to improve user experience.

<DemoBlock title="Custom Tip Text" :ts-code="tsCustomText" :js-code="jsCustomText">
<div class="demo-container">
  <yh-infinite-scroll 
    v-model:loading="textLoading" 
    :finished="textFinished" 
    loading-text="Loading hard..."
    finished-text="Reached the bottom~"
    @load="onTextLoad"
  >
    <div v-for="item in textList" :key="item" class="demo-item">
      Item {{ item }}
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## Error State

When the interface response is abnormal, display an error tip and allow users to click to retry.

<DemoBlock title="Error State" :ts-code="tsError" :js-code="jsError">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="errorLoading" v-model:error="errorState" error-text="Request failed, click to reload" @load="onErrorLoad">
    <div v-for="item in errorList" :key="item" class="demo-item">
      Item {{ item }}
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## Custom Slots

With slot mode, you have complete control over the visual presentation during different lifecycle states (loading, finished, error).

<DemoBlock title="Custom Slots" :ts-code="tsCustomSlot" :js-code="jsCustomSlot">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="slotLoading" :finished="slotFinished" @load="onSlotLoad">
    <div v-for="item in slotList" :key="item" class="demo-item">
      Item {{ item }}
    </div>
    <template #loading>
      <div class="custom-status">Moving data in progress...</div>
    </template>
    <template #finished>
      <div class="custom-status finished">🌟 Congratulations, you've unlocked all treasures</div>
    </template>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## Use in Nuxt (SSR)

The `InfiniteScroll` component is deeply adapted for Nuxt 3/4. In SSR mode, the component intelligently handles hydration logic and automatically starts `IntersectionObserver` on the client.

<DemoBlock title="Nuxt SSR Support" :ts-code="tsNuxt" :js-code="jsNuxt">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="nuxtLoading" :finished="nuxtFinished" @load="onNuxtLoad">
    <div v-for="item in nuxtItems" :key="item.id" class="demo-item nuxt-item">
      <div style="font-weight: 500; font-size: 14px;">{{ item.title }}</div>
      <div style="font-size: 12px; color: var(--yh-color-text-secondary); margin-top: 4px;">Post ID: {{ item.id }}</div>
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## Real-world Scenario: E-commerce Product List

In real e-commerce scenarios, lists often contain complex card layouts. Combining with `fetch` or `useFetch`, you can easily implement a high-performance product waterfall flow.

<DemoBlock title="E-commerce Product List Scenario" :ts-code="tsBusiness" :js-code="jsBusiness">
<div class="demo-container business-container">
  <yh-infinite-scroll
    v-model:loading="shopLoading"
    v-model:error="shopError"
    :finished="shopFinished"
    @load="onShopLoad"
  >
    <div class="shop-grid">
      <div v-for="item in shopItems" :key="item.id" class="shop-card">
        <div class="shop-badge">{{ item.tag }}</div>
        <div class="shop-content">
          <h4 class="shop-title">{{ item.name }}</h4>
          <p class="shop-desc">{{ item.desc }}</p>
          <div class="shop-footer">
            <span class="shop-price">￥{{ item.price }}</span>
            <yh-button type="primary" size="small" round>Buy</yh-button>
          </div>
        </div>
      </div>
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

<style>
.demo-container {
  height: 320px; 
  overflow-y: auto; 
  border: 1px solid var(--yh-border-color); 
  border-radius: 8px;
  background: var(--yh-bg-color-page);
}
.business-container { background: #f5f5f7; }
.shop-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
}
.shop-card {
  background: var(--yh-bg-color);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s;
}
.shop-card:active { transform: scale(0.98); }
.shop-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--yh-color-primary);
  color: #fff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 1;
}
.shop-content { padding: 12px; }
.shop-title { font-size: 14px; margin: 0 0 4px; font-weight: 600; color: var(--yh-color-text-primary); }
.shop-desc { font-size: 12px; color: var(--yh-color-text-secondary); margin-bottom: 10px; line-height: 1.4; }
.shop-footer { display: flex; justify-content: space-between; align-items: center; }
.shop-price { color: #f56c6c; font-weight: bold; font-size: 15px; }

.demo-item {
  padding: 14px 18px; 
  border-bottom: 1px solid var(--yh-border-color-light);
  line-height: 1.5;
  background: var(--yh-bg-color);
}
.nuxt-item {
  border-left: 4px solid var(--yh-color-primary);
}
.custom-status {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yh-color-primary);
  font-size: 14px;
}
.custom-status.finished {
  color: var(--yh-color-success);
}
</style>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| loading | Whether it is loading (supports `v-model`) | `boolean` | `false` |
| finished | Whether all data has been loaded | `boolean` | `false` |
| error | Whether loading failed (supports `v-model`) | `boolean` | `false` |
| threshold | Distance threshold (px) to trigger loading | `number` | `100` |
| direction | Scroll direction | `'vertical' \| 'horizontal'` | `'vertical'` |
| loading-text | Loading tip text | `string` | `'Loading...'` |
| finished-text | Finished tip text | `string` | `'No more items'` |
| error-text | Error tip text | `string` | `'Load failed, click to retry'` |
| immediate-check | Whether to check loading immediately on initialization | `boolean` | `true` |
| disabled | Whether to disable scroll loading | `boolean` | `false` |
| target | Specifies the scroll container selector | `string` | `''` |
| use-observer | Whether to use IntersectionObserver (recommended) | `boolean` | `true` |
| root-margin | IntersectionObserver rootMargin config | `string` | `'0px'` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| load | Called when more data should be loaded | `()` |
| update:loading | Updates loading status | `(val: boolean)` |
| update:error | Updates error status | `(val: boolean)` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Main list content |
| loading | Custom content for loading status |
| finished | Custom content for finished status |
| error | Custom content for error status (click to retry) |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| check | Manually check if loading is needed | `() => void` |
| retry | Retry loading (clears error state and triggers load) | `() => void` |

### Theme Variables (CSS Variables)

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-color-text-secondary` | `#86868b` | Loading text color |
| `--yh-color-text-placeholder` | `#c0c4cc` | Finished text color |
| `--yh-color-danger` | `#f56c6c` | Error state text color |
