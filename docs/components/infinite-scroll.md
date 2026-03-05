<script setup lang="ts">
import { ref } from 'vue'

// 基础用法
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

// 自定义文字
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

// 错误状态
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

// 自定义插槽
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

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

// Nuxt SSR 模拟
const nuxtItems = ref<Post[]>([])
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

interface Product {
  id: number
  title: string
  price: number
  image: string
}

// 业务实战：电商商品列表
const shopItems = ref<Product[]>([])
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
      const products = data.map((item: Record<string, unknown>) => ({
        id: item.id,
        name: '高级定制商品 #' + item.id,
        price: (Math.random() * 1000 + 100).toFixed(2),
        desc: item.title.slice(0, 30) + '...',
        tag: item.id % 2 === 0 ? '新品' : '热销'
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
      列表项 {{ item }}
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
    loading-text="拼命加载中..."
    finished-text="已经到底啦~"
    @load="onTextLoad"
  >
    <div v-for="item in textList" :key="item" class="demo-item">
      列表项 {{ item }}
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
    error-text="请求失败，点击重新加载"
    @load="onErrorLoad"
  >
    <div v-for="item in errorList" :key="item" class="demo-item">
      列表项 {{ item }}
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
      列表项 {{ item }}
    </div>
    <template #loading>
      <div class="custom-status">正在搬运数据中...</div>
    </template>
    <template #finished>
      <div class="custom-status finished">🌟 恭喜你，解锁了所有宝藏</div>
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
              <yh-button type="primary" size="small" round>购买</yh-button>
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
        name: '高级定制商品 #' + item.id,
        price: (Math.random() * 1000 + 100).toFixed(2),
        desc: item.title.slice(0, 30) + '...',
        tag: item.id % 2 === 0 ? '新品' : '热销'
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

# Infinite Scroll 无限滚动

滚动至底部时自动加载更多数据，支持 SSR、自定义插槽及复杂的滚动容器场景。

## 基础用法

最简单的异步分页加载。通过 `v-model:loading` 同步加载状态，`finished` 锁定加载。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="loading" :finished="finished" @load="onLoad">
    <div v-for="item in list" :key="item" class="demo-item">
      列表项 {{ item }}
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## 自定义提示文字

通过属性快速定制直观的文字交互，提升用户体验。

<DemoBlock title="自定义提示文字" :ts-code="tsCustomText" :js-code="jsCustomText">
<div class="demo-container">
  <yh-infinite-scroll 
    v-model:loading="textLoading" 
    :finished="textFinished" 
    loading-text="拼命加载中..."
    finished-text="已经到底啦~"
    @load="onTextLoad"
  >
    <div v-for="item in textList" :key="item" class="demo-item">
      列表项 {{ item }}
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## 错误状态

当接口响应异常时，展示错误提示并允许用户点击重试。

<DemoBlock title="错误状态" :ts-code="tsError" :js-code="jsError">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="errorLoading" v-model:error="errorState" error-text="请求失败，点击重新加载" @load="onErrorLoad">
    <div v-for="item in errorList" :key="item" class="demo-item">
      列表项 {{ item }}
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## 自定义插槽

通过插槽模式，您可以完全控制组件在不同生命周期（加载、完成、错误）下的视觉呈现。

<DemoBlock title="自定义插槽" :ts-code="tsCustomSlot" :js-code="jsCustomSlot">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="slotLoading" :finished="slotFinished" @load="onSlotLoad">
    <div v-for="item in slotList" :key="item" class="demo-item">
      列表项 {{ item }}
    </div>
    <template #loading>
      <div class="custom-status">正在搬运数据中...</div>
    </template>
    <template #finished>
      <div class="custom-status finished">🌟 恭喜你，解锁了所有宝藏</div>
    </template>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## 在 Nuxt 中使用 (SSR)

`InfiniteScroll` 组件深度适配 Nuxt 3/4。在 SSR 模式下，组件会智能处理水合逻辑，并在客户端自动启动 `IntersectionObserver`。

<DemoBlock title="Nuxt SSR 支持" :ts-code="tsNuxt" :js-code="jsNuxt">
<div class="demo-container">
  <yh-infinite-scroll v-model:loading="nuxtLoading" :finished="nuxtFinished" @load="onNuxtLoad">
    <div v-for="item in nuxtItems" :key="item.id" class="demo-item nuxt-item">
      <div style="font-weight: 500; font-size: 14px;">{{ item.title }}</div>
      <div style="font-size: 12px; color: var(--yh-color-text-secondary); margin-top: 4px;">Post ID: {{ item.id }}</div>
    </div>
  </yh-infinite-scroll>
</div>
</DemoBlock>

## 业务实战：电商商品列表

在真实的电商场景中，列表往往包含复杂的卡片布局。通过配合 `fetch` 或 `useFetch`，可以轻松实现高性能的商品瀑布流。

<DemoBlock title="电商商品列表实战" :ts-code="tsBusiness" :js-code="jsBusiness">
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
            <yh-button type="primary" size="small" round>购买</yh-button>
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

| 属性名          | 说明                                      | 类型                         | 默认值                 |
| --------------- | ----------------------------------------- | ---------------------------- | ---------------------- |
| loading         | 是否正在加载（支持 `v-model`）            | `boolean`                    | `false`                |
| finished        | 是否已加载完全部数据                      | `boolean`                    | `false`                |
| error           | 是否加载失败（支持 `v-model`）            | `boolean`                    | `false`                |
| threshold       | 触发加载的距离阈值 (px)                   | `number`                     | `100`                  |
| direction       | 滚动方向                                  | `'vertical' \| 'horizontal'` | `'vertical'`           |
| loading-text    | 加载中的提示文字                          | `string`                     | `'加载中...'`          |
| finished-text   | 加载完成的提示文字                        | `string`                     | `'没有更多了'`         |
| error-text      | 加载失败的提示文字                        | `string`                     | `'加载失败，点击重试'` |
| immediate-check | 是否在初始化时立即检查是否需要加载        | `boolean`                    | `true`                 |
| disabled        | 是否禁用滚动加载                          | `boolean`                    | `false`                |
| target          | 指定滚动容器选择器                        | `string`                     | `''`                   |
| use-observer    | 是否使用 IntersectionObserver（推荐开启） | `boolean`                    | `true`                 |
| root-margin     | IntersectionObserver 的 rootMargin 配置   | `string`                     | `'0px'`                |

### Events

| 事件名         | 说明               | 回调参数         |
| -------------- | ------------------ | ---------------- |
| load           | 触发加载更多时调用 | `()`             |
| update:loading | 更新 loading 状态  | `(val: boolean)` |
| update:error   | 更新 error 状态    | `(val: boolean)` |

### Slots

| 插槽名   | 说明                                       |
| -------- | ------------------------------------------ |
| default  | 列表主体内容                               |
| loading  | 自定义加载中状态的内容                     |
| finished | 自定义加载完成状态的内容                   |
| error    | 自定义加载失败状态的内容（点击可触发重试） |

### Expose

| 名称  | 说明                                   | 类型         |
| ----- | -------------------------------------- | ------------ |
| check | 手动检查是否需要加载                   | `() => void` |
| retry | 重试加载（清除 error 状态并触发 load） | `() => void` |

### 主题变量 (CSS Variables)

| 变量名                        | 默认值    | 描述             |
| ----------------------------- | --------- | ---------------- |
| `--yh-color-text-secondary`   | `#86868b` | 加载中文字颜色   |
| `--yh-color-text-placeholder` | `#c0c4cc` | 加载完成文字颜色 |
| `--yh-color-danger`           | `#f56c6c` | 错误状态文字颜色 |
