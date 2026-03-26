<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// ─── 扩展版完整数据源 ────────────────────────────────────────────────────────
const activeId = ref('1')
const categories = [
  {
    id: '1', name: '热门推荐',
    children: [
      { id: '1-1', name: '首发手机', image: 'https://picsum.photos/100/100?random=1' },
      { id: '1-2', name: '爆款笔记本', image: 'https://picsum.photos/100/100?random=2' },
      { id: '1-3', name: '畅销平板', image: 'https://picsum.photos/100/100?random=3' }
    ]
  },
  {
    id: '2', name: '手机通讯',
    children: [
      { id: '2-1', name: '华为', image: 'https://picsum.photos/100/100?random=4' },
      { id: '2-2', name: '苹果', image: 'https://picsum.photos/100/100?random=5' },
      { id: '2-3', name: '小米', image: 'https://picsum.photos/100/100?random=6' },
      { id: '2-4', name: '荣耀', image: 'https://picsum.photos/100/100?random=21' }
    ]
  },
  {
    id: '3', name: '电脑办公',
    children: [
      { id: '3-1', name: '显示器', image: 'https://picsum.photos/100/100?random=7' },
      { id: '3-2', name: '机械键盘', image: 'https://picsum.photos/100/100?random=8' },
      { id: '3-3', name: '无线鼠标', image: 'https://picsum.photos/100/100?random=9' }
    ]
  },
  {
    id: '4', name: '家用电器',
    children: [
      { id: '4-1', name: '智能电视', image: 'https://picsum.photos/100/100?random=10' },
      { id: '4-2', name: '双门冰箱', image: 'https://picsum.photos/100/100?random=11' },
      { id: '4-3', name: '全自动洗衣机', image: 'https://picsum.photos/100/100?random=12' }
    ]
  },
  {
    id: '5', name: '数码配件',
    children: [
      { id: '5-1', name: '智能手表', image: 'https://picsum.photos/100/100?random=13' },
      { id: '5-2', name: '蓝牙耳机', image: 'https://picsum.photos/100/100?random=14' },
      { id: '5-3', name: '移动电源', image: 'https://picsum.photos/100/100?random=15' }
    ]
  },
  {
    id: '6', name: '家居家装',
    children: [
      { id: '6-1', name: '人体工学椅', image: 'https://picsum.photos/100/100?random=16' },
      { id: '6-2', name: '电动升降桌', image: 'https://picsum.photos/100/100?random=17' }
    ]
  },
  {
    id: '7', name: '运动户外',
    children: [
      { id: '7-1', name: '动感单车', image: 'https://picsum.photos/100/100?random=18' },
      { id: '7-2', name: '运动相机', image: 'https://picsum.photos/100/100?random=19' }
    ]
  },
  {
    id: '8', name: '图书文具',
    children: [
      { id: '8-1', name: '文学经典', image: 'https://picsum.photos/100/100?random=20' },
      { id: '8-2', name: '精品钢笔', image: 'https://picsum.photos/100/100?random=22' }
    ]
  },
  {
    id: '9', name: '食品生鲜',
    children: [
      { id: '9-1', name: '进口水果', image: 'https://picsum.photos/100/100?random=23' },
      { id: '9-2', name: '休闲零食', image: 'https://picsum.photos/100/100?random=24' }
    ]
  },
  {
    id: '10', name: '母婴童装',
    children: [
      { id: '10-1', name: '婴儿推车', image: 'https://picsum.photos/100/100?random=25' },
      { id: '10-2', name: '益智玩具', image: 'https://picsum.photos/100/100?random=26' }
    ]
  }
]

// ─── 状态演示 ─────────────────────────────────────────────────────────────
const isLoading = ref(false)
const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 2000)
}

// ─── 基础用法代码块 (100% 完整定义) ──────────────────────────────────────────
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
  { id: '1', name: '热门推荐', children: [{ id: '1-1', name: '手机', image: 'https://example.com/1.jpg' }] },
  { id: '2', name: '手机通讯', children: [{ id: '2-1', name: '华为', image: 'https://example.com/2.jpg' }] },
  { id: '3', name: '电脑办公', children: [{ id: '3-1', name: '显示器', image: 'https://example.com/3.jpg' }] },
  { id: '4', name: '家用电器', children: [{ id: '4-1', name: '电视', image: 'https://example.com/4.jpg' }] },
  { id: '5', name: '数码配件', children: [{ id: '5-1', name: '手表', image: 'https://example.com/5.jpg' }] },
  { id: '6', name: '家居家装', children: [{ id: '6-1', name: '转椅', image: 'https://example.com/6.jpg' }] },
  { id: '7', name: '运动户外', children: [{ id: '7-1', name: '单车', image: 'https://example.com/7.jpg' }] },
  { id: '8', name: '图书文具', children: [{ id: '8-1', name: '文学', image: 'https://example.com/8.jpg' }] },
  { id: '9', name: '食品生鲜', children: [{ id: '9-1', name: '水果', image: 'https://example.com/9.jpg' }] },
  { id: '10', name: '母婴童装', children: [{ id: '10-1', name: '童车', image: 'https://example.com/10.jpg' }] }
]
</${_S}>`

const tsLoading = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button @click="toggleLoading">模拟异步请求 (2s)</yh-button>
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
      { id: '1', name: '热门推荐', children: [{ id: '1-1', name: '手机', image: 'https://example.com/1.jpg' }] },
      { id: '2', name: '手机通讯', children: [{ id: '2-1', name: '华为', image: 'https://example.com/2.jpg' }] }
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
  { id: '1', name: '品牌直降', children: [{ id: '1-1', name: '优惠券', image: 'https://example.com/v.jpg' }] }
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

# CategoryNav 品类导航

电商分类页常用的导航模式。支持双向同步联动（左侧点击 -> 右侧滚动；右侧滚动 -> 左侧居中高亮），内置骨架屏与极速性能优化。

## 基础用法 (大数据量演示)

该示例展示了在 **10 类大型分类数据** 下的联动表现。由于侧边栏内置了自动居中逻辑，即便分类项极多，激活项也能始终保持在中心位置。

<DemoBlock title="大数据量双向联动" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 450px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav
      v-model="activeId"
      :categories="categories"
    />
  </div>
</DemoBlock>

## 加载状态

开启 \`loading\` 后展示高品质骨架屏。该示例演示了如何通过外部状态控制加载过程。

<DemoBlock title="异步加载演示" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="margin-bottom: 12px;">
    <yh-button @click="toggleLoading">模拟异步请求 (2s)</yh-button>
  </div>
  <div style="border: 1px solid var(--yh-border-color-lighter); height: 350px; border-radius: 8px; overflow: hidden;">
    <yh-category-nav :loading="isLoading" :categories="categories.slice(0, 3)" />
  </div>
</DemoBlock>

## 自定义主题

通过 `theme-overrides` 属性可以快速覆盖内部 CSS 变量，无需编写复杂的全局样式。

<DemoBlock title="品牌定制主题" :ts-code="tsTheme" :js-code="jsTheme">
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

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4 的 SSR（服务端渲染）。配置方式极其精简：

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

### Props (属性)

| 属性名                         | 说明                           | 类型                       | 默认值  |
| ------------------------------ | ------------------------------ | -------------------------- | ------- |
| `categories`                   | 核心数据源，包含 ID 和子类列表 | `CategoryItem[]`           | `[]`    |
| `model-value / v-model`        | 当前激活的一级分类 ID          | `string \| number \| null` | `null`  |
| `sub-value / v-model:subValue` | 当前激活的二级子分类 ID        | `string \| number \| null` | `null`  |
| `side-width`                   | 左侧边栏固定宽度               | `string`                   | `84px`  |
| `show-all`                     | 是否在顶部展示「全部」项       | `boolean`                  | `true`  |
| `loading`                      | 是否处于精美骨架屏加载状态     | `boolean`                  | `false` |
| `columns`                      | 右侧平铺子类的列数             | `number`                   | `3`     |
| `sub-image-size`               | 子类缩略图尺寸 (px)            | `number`                   | `64`    |
| `anchor`                       | 是否开启双向滚动监听锚定       | `boolean`                  | `true`  |
| `theme-overrides`              | 自定义主题 CSS 变量对象        | `Record<string, string>`   | `{}`    |

### Events (事件)

| 事件名               | 说明                     | 回调参数                                        |
| -------------------- | ------------------------ | ----------------------------------------------- |
| `category-click`     | 点击一级分类项时触发     | `(item: CategoryItem)`                          |
| `sub-category-click` | 点击二级子项时触发       | `(item: CategorySubItem, parent: CategoryItem)` |
| `update:modelValue`  | 主分类 ID 变更时同步更新 | `(id: string \| number \| null)`                |
| `update:subValue`    | 子分类 ID 变更时同步更新 | `(id: string \| number \| null)`                |

### Slots (插槽)

| 插槽名           | 说明                         | 参数                                             |
| ---------------- | ---------------------------- | ------------------------------------------------ |
| `all-icon`       | 自定义「全部」按钮的图标     | -                                                |
| `header`         | 内容区顶部业务插槽           | -                                                |
| `footer`         | 内容区底部业务插槽           | -                                                |
| `section-header` | 每个大类分区的标题自定义渲染 | `{ category: CategoryItem }`                     |
| `section-footer` | 每个大类分区的辅助自定义渲染 | `{ category: CategoryItem }`                     |
| `sub-item`       | 二级子类的完全自定义逻辑渲染 | `{ sub: CategorySubItem, parent: CategoryItem }` |

### CSS Variables (主题变量)

| 变量名                                  | 说明                   | 默认值                           |
| --------------------------------------- | ---------------------- | -------------------------------- |
| `--yh-category-nav-side-bg`             | 左侧边栏背景色         | `#f7f8fa`                        |
| `--yh-category-nav-content-bg`          | 右侧内容区背景色       | `#ffffff`                        |
| `--yh-category-nav-side-active-color`   | 激活项文字及指示条颜色 | `var(--yh-color-primary)`        |
| `--yh-category-nav-side-active-bg`      | 激活项背景色           | `#ffffff`                        |
| `--yh-category-nav-side-width`          | 侧边栏宽度             | `84px`                           |
| `--yh-category-nav-sub-image-size`      | 二级分类图尺寸         | `64px`                           |
| `--yh-category-nav-columns`             | 二级分类平铺列数       | `3`                              |
| `--yh-category-nav-section-title-color` | 区块标题颜色           | `var(--yh-text-color-secondary)` |
