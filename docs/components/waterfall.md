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

/** 辅助函数：将 TS 示例转换为 JS 示例 */
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
  { id: 1, title: '瀑布流内容卡片 #1', height: 180, color: '#f0f7ff', desc: '采用最短列平衡算法，视觉更均匀。' },
  { id: 2, title: '瀑布流内容卡片 #2', height: 260, color: '#fff1f0', desc: '基础演示节点。' },
  { id: 3, title: '瀑布流内容卡片 #3', height: 140, color: '#f6ffed', desc: '支持图片加载感知。' },
  { id: 4, title: '瀑布流内容卡片 #4', height: 300, color: '#fff7e6', desc: '响应式自动对齐。' },
  { id: 5, title: '瀑布流内容卡片 #5', height: 220, color: '#f9f0ff', desc: '交错动画入场。' },
  { id: 6, title: '瀑布流内容卡片 #6', height: 190, color: '#fff0f6', desc: '基础演示节点。' }
]

const dataString = JSON.stringify(demoData, null, 2)

/** ---- 基础用法数据 ---- */
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

/** ---- 状态演示数据 ---- */
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
    <yh-button @click="toggleLoading">触发加载中</yh-button>
    <yh-button @click="clearData">清空数据</yh-button>
    <yh-button @click="resetData">还原数据</yh-button>
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
         <p>暂无任何瀑布流内容</p>
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

/** ---- 电商: 分页模式 ---- */
const shopPage = ref(1)
const shopLoading = ref(false)
const shopItems = ref<WaterfallItem[]>([])
const fetchShopData = async (page: number) => {
  shopLoading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=8&skip=${(page - 1) * 8}&select=title,price,thumbnail`)
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

      <!-- 自定义刷新态蒙层 (可选) -->
      <template #loading-overlay>
        <div class="custom-loading">正在加载新一页...</div>
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
    const res = await fetch(\`https://dummyjson.com/products?limit=8&skip=\${(p-1)*8}\`)
    const data = await res.json()
    products.value = data.products.map((p: any) => ({ ...p, image: p.thumbnail }))
  } finally {
    loading.value = false
  }
}

const onPageChange = (p: number) => fetchProducts(p)
onMounted(() => fetchProducts(1))
<\/script>`

/** ---- 电商: 无限加载 ---- */
const infiniteItems = ref<WaterfallItem[]>([])
const infiniteLoading = ref(false)
const infiniteFinished = ref(false)
let skipCount = 0
const loadMoreProducts = async () => {
  if (infiniteLoading.value || infiniteFinished.value) return
  infiniteLoading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=6&skip=${skipCount}&select=title,price,thumbnail`)
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
      
      <!-- 无限加载时的底部 loading 占位 -->
      <template #loading>
         <div v-for="i in 3" :key="i" class="yh-waterfall__item--skeleton" style="height: 180px;"></div>
      </template>
    </yh-waterfall>

    <!-- 底部状态提示 -->
    <div v-if="loading" style="text-align: center; padding: 12px; color: var(--yh-color-primary);">加载中...</div>
    <div v-if="finished" style="text-align: center; padding: 12px; color: var(--yh-color-text-secondary);">🎉 已经到底啦</div>
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
    const res = await fetch(\`https://dummyjson.com/products?limit=6&skip=\${skip}\`)
    const data = await res.json()
    list.value.push(...data.products.map((i: any) => ({ ...i, image: i.thumbnail })))
    skip += 6
    if (list.value.length >= 24) finished.value = true
  } finally {
    loading.value = false
  }
}
<\/script>`

/** ---- Nuxt 演示 ---- */
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

# Waterfall 瀑布流

高性能 Masonry 布局组件。核心算法通过**最短列平衡计算**实现，支持图片预加载感知、加载状态、空视图及响应式断点。

## 基础用法
<DemoBlock title="最短列平衡算法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
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

## 交互状态
<DemoBlock title="加载与空状态" :ts-code="tsStates" :js-code="toJs(tsStates)">
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button @click="toggleLoading">触发加载中</yh-button>
    <yh-button @click="clearData">清空数据</yh-button>
    <yh-button @click="resetData">还原数据</yh-button>
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
         <p>暂无任何瀑布流内容</p>
      </div>
    </template>
  </yh-waterfall>
</DemoBlock>

## 在 Nuxt 中使用
Waterfall 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-waterfall :items="nuxtItems" :cols="3" :gap="16">
    <template #default="{ item }">
      <div style="display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid var(--yh-border-color-light);" :style="{ background: item.color, height: (item.height / 2) + 'px' }">
        {{ item.title }}
      </div>
    </template>
  </yh-waterfall>
</DemoBlock>

**SSR 注意事项**：
- ✅ 完美支持首屏静态渲染，避免布局抖动
- ✅ 响应式列数在客户端激活后自动适配容器宽度

## 商用案例：电商分页模式
<DemoBlock title="电商分页加载" :ts-code="tsPagination" :js-code="toJs(tsPagination)">
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

## 商用案例：无限加载模式
<DemoBlock title="无限加载流" :ts-code="tsInfinite" :js-code="toJs(tsInfinite)">
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
    <div v-if="infiniteLoading" style="text-align: center; padding: 16px; color: var(--yh-color-primary);">加载中...</div>
    <div v-if="infiniteFinished" style="text-align: center; padding: 16px; color: var(--yh-color-text-secondary);">🎉 已经到底啦</div>
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 数据源数组 | `T[]` | `[]` |
| `cols` | 列数配置。支持数字或响应式对象 | `number \| WaterfallCols` | `2` |
| `gap` | 卡片之间的间距 (px) | `number` | `16` |
| `loading` | 是否处于加载中状态 | `boolean` | `false` |
| `height-property` | 用于平衡布局的高度字段名。若提供，则激活最短列平衡算法 | `string` | `'height'` |
| `img-selector` | 内部图片选择器。图片加载后会自动触发布局重计算 | `string` | `'img'` |
| `animation` | 是否开启节点入场动画 | `boolean` | `true` |
| `delay` | 动画累加延迟基数 (ms) | `number` | `100` |
| `row-key` | 节点唯一标识字段名 | `string` | `'id'` |
| `responsive` | 是否自动监听容器宽度变化并适配 | `boolean` | `true` |

#### WaterfallCols 类型定义
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

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义节点渲染内容 | `{ item: T, index: number, column: number }` |
| `loading` | 自定义初始加载时的占位内容（通常用于骨架屏） | `-` |
| `empty` | 自定义空数据状态展示内容 | `-` |
| `loading-overlay` | 自定义刷新态（有旧数据时）的蒙层内容 | `-` |

### Expose

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `layout` | 手动触发布局重计算（如容器尺寸发生变化但未被感知时） | `() => void` |

## 主题变量

组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-bg-color-page` | 骨架屏节点的背景颜色 | `var(--yh-bg-color-page)` |
| `--yh-color-text-secondary` | 空状态文字颜色 | `var(--yh-text-color-secondary)` |
| `--yh-color-primary` | 刷新蒙层加载器的旋转主色 | `var(--yh-color-primary)` |
| `--yh-color-primary-light-8` | 刷新蒙层加载器的轨道底色 | `var(--yh-color-primary-light-8)` |

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
