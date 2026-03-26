# Product Card 商品卡片

专为现代电商业务设计的极高性能展示组件。支持网格、列表及紧凑布局，深度封装了营销角标系统、多价格策略、媒体增强、交互反馈及曝光埋点。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// ── 0. 演示驱动逻辑 ──────────────────────────────────────────────────────────
const loading = ref(false)
const handleAction = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}

// ── 1. 基础布局 ────────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <div style="max-width: 320px;">
    <yh-product-card
      layout="vertical"
      title="YH-UI 智能前端开发套件"
      description="极速、高效、可扩展的 Vue 3 组件库，助力你打造完美的电商/AI 应用。"
      image="https://picsum.photos/id/20/400/300"
      :price="999.00"
      :market-price="1299.00"
      ribbon="店长推荐"
      action-text="立即购买"
    />
  </div>
</${_T}>`
const jsBasic = toJs(tsBasic)

const tsList = `<${_T}>
  <div style="max-width: 600px;">
    <yh-product-card
      layout="horizontal"
      title="工业级 Gantt 组件"
      description="支持拖拽、视图缩放、高度可定制的甘特图，适用于项目管理系统。"
      image="https://picsum.photos/id/21/200/200"
      :price="1699.00"
      :market-price="2500.00"
      :badges="[{ text: '热卖', type: 'danger' }]"
      action-text="加入购物车"
    />
  </div>
</${_T}>`
const jsList = toJs(tsList)

const tsCompact = `<${_T}>
  <div style="max-width: 200px;">
    <yh-product-card
      layout="compact"
      title="紧凑模式展示"
      description="紧凑布局现在依然保留简易的操作按钮演示。"
      image="https://picsum.photos/id/22/100/100"
      :price="69.00"
      action-text="抢购"
    />
  </div>
</${_T}>`
const jsCompact = toJs(tsCompact)

const tsStock = `<${_T}>
  <div style="max-width: 320px;">
    <yh-product-card
      title="限量秒杀商品"
      image="https://picsum.photos/id/23/400/301"
      :price="299.00"
      :market-price="399.00"
      action-text="抢购"
      :stock-progress="60"
      stock-text="已抢 60%"
    />
  </div>
</${_T}>`
const jsStock = toJs(tsStock)

// ── 2. 高级业务特性 ──────────────────────────────────────────────────────────
const tsMarketing = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="极致营销角标展示"
      description="同时支持斜向 Ribbon 丝带和图片/文字 Badge 标签组。"
      image="https://picsum.photos/id/1/400/400"
      ribbon="店长推荐"
      ribbon-color="#ff4d4f"
      :price="1299.00"
      :badges="[
        { image: 'https://picsum.photos/32/32?random=badge' },
        { text: '满300减40', type: 'danger' },
        { text: '极速达', type: 'primary' }
      ]"
      action-text="立即抢购"
    />
  </div>
</${_T}>`
const jsMarketing = toJs(tsMarketing)

const tsPrice = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="多价格策略演示"
      image="https://picsum.photos/id/22/400/400"
      :price="699.00"
      :market-price="999.00"
      :vip-price="599.00"
      vip-label="黑卡价"
      unit="/年"
      :stock-progress="85"
      stock-text="仅剩 15%"
      stock-color="linear-gradient(90deg, #ff9c6e, #ff4d4f)"
      action-text="立即续费"
    />
  </div>
</${_T}>`
const jsPrice = toJs(tsPrice)

const tsMedia = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="Hover 媒体切换演示"
      description="悬浮主图可预览视频或切换备用图。"
      image="https://picsum.photos/id/3/400/400"
      hover-image="https://picsum.photos/id/4/400/400"
      video-src="https://www.w3schools.com/html/mov_bbb.mp4"
      :price="299.00"
      action-text="查看详情"
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
        title="加购 Loading 演示"
        image="https://picsum.photos/id/5/400/400"
        :price="88.00"
        :action-loading="loading"
        action-text="加入购物车"
        @action="handleAction"
      />
    </div>
    <div style="width: 260px;">
      <yh-product-card
        title="Sold Out 售罄效果"
        image="https://picsum.photos/id/6/400/400"
        :price="0.00"
        sold-out
        action-text="已售罄"
      />
    </div>
  </div>
</${_T}>`
const jsStatus = toJs(tsStatus)

const tsClamp = `<${_T}>
  <div style="max-width: 300px;">
    <yh-product-card
      title="这行商品标题非常非常非常长长长长长长长，会根据配置自动截断并在悬浮时显示 Tooltip"
      description="此段描述也会根据配置的行数进行截断处理，默认为 1 行截断显示省略号..."
      image="https://picsum.photos/id/11/400/400"
      :price="99.00"
      :title-lines="2"
      :description-lines="1"
    />
  </div>
</${_T}>`
const jsClamp = toJs(tsClamp)

</script>

## 网格布局

<DemoBlock title="网格布局 (Grid/Vertical)" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 320px;">
    <yh-product-card
      layout="vertical"
      title="YH-UI 智能前端开发套件"
      description="极速、高效、可扩展的 Vue 3 组件库，助力你打造完美的电商/AI 应用。"
      image="https://picsum.photos/id/20/400/300"
      :price="999.00"
      :market-price="1299.00"
      ribbon="店长推荐"
      action-text="立即购买"
    />
  </div>
</DemoBlock>

## 列表布局

<DemoBlock title="列表布局 (Horizontal)" :ts-code="tsList" :js-code="jsList">
  <div style="max-width: 600px;">
    <yh-product-card
      layout="horizontal"
      title="工业级 Gantt 组件"
      description="支持拖拽、视图缩放、高度可定制的甘特图，适用于项目管理系统。"
      image="https://picsum.photos/id/21/200/200"
      :price="1699.00"
      :market-price="2500.00"
      :badges="[{ text: '热卖', type: 'danger' }]"
      action-text="加入购物车"
    />
  </div>
</DemoBlock>

## 紧凑布局

<DemoBlock title="紧凑布局 (Compact)" :ts-code="tsCompact" :js-code="jsCompact">
  <div style="max-width: 200px;">
    <yh-product-card
      layout="compact"
      title="紧凑模式展示"
      description="紧凑布局现在依然保留简易的操作按钮演示。"
      image="https://picsum.photos/id/22/100/100"
      :price="69.00"
      action-text="抢购"
    />
  </div>
</DemoBlock>

## 库存进度

<DemoBlock title="库存进度反馈" :ts-code="tsStock" :js-code="jsStock">
  <div style="max-width: 320px;">
    <yh-product-card
      title="限量秒杀商品"
      image="https://picsum.photos/id/23/400/301"
      :price="299.00"
      :market-price="399.00"
      action-text="抢购"
      :stock-progress="60"
      stock-text="已抢 60%"
    />
  </div>
</DemoBlock>

## 高级业务特性

针对电商核心业务逻辑的深度封装示例。

### 多路媒体与营销角标

<DemoBlock title="媒体切换与角标" :ts-code="tsMarketing" :js-code="jsMarketing">
  <div style="max-width: 300px;">
    <yh-product-card
      title="极致营销角标展示"
      description="同时支持斜向 Ribbon 丝带和图片/文字 Badge 标签组。"
      image="https://picsum.photos/id/1/400/400"
      ribbon="店长推荐"
      ribbon-color="#ff4d4f"
      :price="1299.00"
      :badges="[
        { image: 'https://picsum.photos/32/32?random=badge' },
        { text: '满300减40', type: 'danger' },
        { text: '极速达', type: 'primary' }
      ]"
      action-text="立即抢购"
    />
  </div>
</DemoBlock>

### 价格逻辑、多媒体、状态管控

<DemoBlock title="价格与状态反馈" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div style="width: 260px;">
      <yh-product-card
        title="加购 Loading 演示"
        image="https://picsum.photos/id/5/400/400"
        :price="88.00"
        :action-loading="loading"
        action-text="加入购物车"
        @action="handleAction"
      />
    </div>
    <div style="width: 260px;">
      <yh-product-card
        title="Sold Out 售罄效果"
        image="https://picsum.photos/id/6/400/400"
        :price="0.00"
        sold-out
        action-text="已售罄"
      />
    </div>
  </div>
</DemoBlock>

### 标题与描述截断策略

<DemoBlock title="多行截断与 Tooltip" :ts-code="tsClamp" :js-code="jsClamp">
  <div style="max-width: 300px;">
    <yh-product-card
      title="这行商品标题非常非常非常长长长长长长长，会根据配置自动截断并在悬浮时显示 Tooltip"
      description="此段描述也会根据配置的行数进行截断处理，默认为 1 行截断显示省略号..."
      image="https://picsum.photos/id/11/400/400"
      :price="99.00"
      :title-lines="2"
      :description-lines="1"
    />
  </div>
</DemoBlock>

---

## API

### Props (100% 对齐源码)

| 属性名             | 说明                     | 类型                                                        | 默认值       |
| ------------------ | ------------------------ | ----------------------------------------------------------- | ------------ |
| image              | 主图地址                 | `string`                                                    | `''`         |
| hover-image        | 悬浮切换主图地址         | `string`                                                    | `''`         |
| video-src          | 悬浮播放视频地址         | `string`                                                    | `''`         |
| title              | 商品标题                 | `string`                                                    | `''`         |
| title-lines        | 标题显示行数限制         | `number`                                                    | `2`          |
| description        | 商品描述                 | `string`                                                    | `''`         |
| description-lines  | 描述显示行数限制         | `number`                                                    | `1`          |
| price              | 当前销售价格             | `number \| string`                                          | `0`          |
| market-price       | 划线/参考价格            | `number \| string`                                          | `''`         |
| vip-price          | 会员专属价格             | `number \| string`                                          | `''`         |
| vip-label          | 会员价格标签文本         | `string`                                                    | `'会员'`     |
| currency           | 货币符号                 | `string`                                                    | `'¥'`        |
| unit               | 价格计量单位后缀         | `string`                                                    | `''`         |
| ribbon             | 营销角标丝带文本         | `string`                                                    | `''`         |
| ribbon-color       | 丝带背景颜色             | `string`                                                    | `''`         |
| tag                | 兼容性：单标签文本       | `string`                                                    | `''`         |
| tag-type           | 兼容性：标签类型         | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'`   |
| badges             | 标签组 (支持图文)        | `ProductBadge[]`                                            | `[]`         |
| layout             | 布局模式                 | `'vertical' \| 'horizontal' \| 'compact'`                   | `'vertical'` |
| lazy               | 图片懒加载               | `boolean`                                                   | `true`       |
| border             | 是否显示边框             | `boolean`                                                   | `true`       |
| shadow             | 是否显开启悬浮阴影       | `boolean`                                                   | `true`       |
| readonly           | 是否只读模式 (隐藏按钮)  | `boolean`                                                   | `false`      |
| stock-progress     | 库存抢购进度 (0-100)     | `number`                                                    | `0`          |
| stock-color        | 进度条颜色               | `string`                                                    | `''`         |
| stock-text         | 进度条右侧文本           | `string`                                                    | `''`         |
| action-text        | 操作按钮文本             | `string`                                                    | `'立即购买'` |
| action-loading     | 按钮是否加载中           | `boolean`                                                   | `false`      |
| sold-out           | 是否售罄                 | `boolean`                                                   | `false`      |
| exposure           | 开启自动曝光监听         | `boolean`                                                   | `false`      |
| exposure-threshold | 曝光比例阈值             | `number`                                                    | `0.5`        |
| exposure-once      | 曝光成功后是否仅上报一次 | `boolean`                                                   | `true`       |

### Events

| 事件名 | 说明                   | 回调参数          |
| ------ | ---------------------- | ----------------- |
| click  | 点击整个卡片触发       | `(e: MouseEvent)` |
| action | 点击操作按钮触发       | `(e: MouseEvent)` |
| expose | 命中曝光阈值时上报埋点 | —                 |

### Slots

| 插槽名      | 说明                        | 参数 |
| ----------- | --------------------------- | ---- |
| title       | 自定义标题区域              | —    |
| description | 自定义描述区域              | —    |
| footer      | 自定义底部操作区域          | —    |
| fullscreen  | 自定义全屏预览内容 (若扩展) | —    |

### ProductBadge 对象定义

```ts
interface ProductBadge {
  text?: string // 标签文案
  image?: string // 标签图片 (如猫头/品牌logo)
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string // 自定义背景色
}
```
