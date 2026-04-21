# Image Magnifier 商品放大镜

用于商品详情页的高清商品细节展示，支持外部/内部放大、轮播图库、滚轮动态缩放、自适应定位、渐进式加载、地图缩略导航及全屏沉浸预览。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// ── 基础用法 ────────────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/10/400/400"
    :scale="2.5"
    border
    title="鼠标悬浮查看高清细节"
  />
</${_T}>`
const jsBasic = toJs(tsBasic)

// ── 内部透镜 ────────────────────────────────────────────────────────────────
const tsInside = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/11/400/400"
    position="inside"
    :scale="3"
    mask-shape="circle"
    :mask-width="200"
    :mask-height="200"
  />
</${_T}>`
const jsInside = toJs(tsInside)

// ── 功能1: 滚轮缩放 ─────────────────────────────────────────────────────────
const tsWheel = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/10/400/400"
    zoom-src="https://picsum.photos/id/10/1200/1200"
    wheel-zoom
    :min-scale="1.2"
    :max-scale="5"
    :scale-step="0.3"
    border
    title="滚动鼠标滚轮调整倍率"
  />
</${_T}>`
const jsWheel = toJs(tsWheel)

// ── 功能2: 自适应定位 ───────────────────────────────────────────────────────
const tsAuto = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/15/400/400"
    position="auto"
    border
    title="自动根据视口剩余空间决定弹出方向"
  />
</${_T}>`
const jsAuto = toJs(tsAuto)

// ── 功能3: 渐进式加载 ───────────────────────────────────────────────────────
const tsLoading = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/12/400/400"
    zoom-src="https://picsum.photos/id/12/2000/2000"
    border
    title="高清图加载中时显示进度条"
  />
</${_T}>`
const jsLoading = toJs(tsLoading)

// ── 功能4: 图片库联动 ───────────────────────────────────────────────────────
const tsGallery = `<${_S} setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const images = [
  { src: 'https://picsum.photos/id/10/400/400', zoomSrc: 'https://picsum.photos/id/10/1200/1200', alt: '风景一' },
  { src: 'https://picsum.photos/id/11/400/400', zoomSrc: 'https://picsum.photos/id/11/1200/1200', alt: '风景二' },
  { src: 'https://picsum.photos/id/12/400/400', zoomSrc: 'https://picsum.photos/id/12/1200/1200', alt: '风景三' },
]
</${_S}>
<${_T}>
  <yh-image-magnifier
    v-model="current"
    :images="images"
    border
  />
</${_T}>`
const jsGallery = toJs(tsGallery)

// ── 功能5: 地图缩略导航 ─────────────────────────────────────────────────────
const tsMinimap = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/13/400/400"
    zoom-src="https://picsum.photos/id/13/1200/1200"
    show-minimap
    border
    title="预览区右下角显示全图缩略导航"
  />
</${_T}>`
const jsMinimap = toJs(tsMinimap)

// ── 功能6: 全屏预览 ─────────────────────────────────────────────────────────
const tsFullscreen = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/14/400/400"
    zoom-src="https://picsum.photos/id/14/1200/1200"
    click-to-fullscreen
    border
    title="点击图片进入全屏沉浸预览"
  />
</${_T}>`
const jsFullscreen = toJs(tsFullscreen)

// ── 高清图与自定义 ──────────────────────────────────────────────────────────
const tsCustom = `<${_T}>
  <yh-image-magnifier
    src="https://picsum.photos/id/12/400/400"
    zoom-src="https://picsum.photos/id/12/1200/1200"
    :offset="20"
    :mask-width="120"
    :mask-height="120"
    mask-color="rgba(255, 77, 79, 0.2)"
    border
    shadow
  />
</${_T}>`
const jsCustom = toJs(tsCustom)

// ── Nuxt 集成 ───────────────────────────────────────────────────────────────
const tsNuxt = `<${_T}>
  <client-only>
    <yh-image-magnifier
      src="https://picsum.photos/id/13/400/400"
      zoom-src="https://picsum.photos/id/13/1200/1200"
      border
      wheel-zoom
      click-to-fullscreen
    />
  </client-only>
</${_T}>`
const jsNuxt = toJs(tsNuxt)

const images = [
  { src: 'https://picsum.photos/id/10/400/400', zoomSrc: 'https://picsum.photos/id/10/1200/1200', alt: '风景一' },
  { src: 'https://picsum.photos/id/11/400/400', zoomSrc: 'https://picsum.photos/id/11/1200/1200', alt: '风景二' },
  { src: 'https://picsum.photos/id/12/400/400', zoomSrc: 'https://picsum.photos/id/12/1200/1200', alt: '风景三' },
]
const current = ref(0)
</script>

## 基础用法

最常用的外部跟随放大，默认在右侧显示放大区域。

<DemoBlock title="外部跟随模式" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/10/400/400"
      :scale="2.5"
      border
      title="鼠标悬浮查看高清细节"
    />
  </div>
</DemoBlock>

## 内部放大 (Inside)

放大效果直接在图片容器内呈现，鼠标跟随透镜。支持设置 `mask-shape="circle"` 实现圆形透镜效果。

<DemoBlock title="内部透镜模式" :ts-code="tsInside" :js-code="jsInside">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/11/400/400"
      position="inside"
      :scale="3"
      mask-shape="circle"
      :mask-width="200"
      :mask-height="200"
    />
  </div>
</DemoBlock>

## 功能1：动态倍率缩放

开启 `wheel-zoom` 后，在悬浮状态下**滚动鼠标滚轮**可实时调整放大倍率。倍率徽章会实时显示当前倍数。

<DemoBlock title="滚轮动态缩放" :ts-code="tsWheel" :js-code="jsWheel">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/10/400/400"
      zoom-src="https://picsum.photos/id/10/1200/1200"
      wheel-zoom
      :min-scale="1.2"
      :max-scale="5"
      :scale-step="0.3"
      border
      title="滚动鼠标滚轮调整倍率"
    />
  </div>
</DemoBlock>

## 功能2：自适应智能定位

设置 `position="auto"` 后，组件会自动检测左右视口空间，智能选择最优的弹出方向（right / left / inside）。

<DemoBlock title="智能自适应定位" :ts-code="tsAuto" :js-code="jsAuto">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/15/400/400"
      position="auto"
      border
      title="自动根据视口剩余空间决定弹出方向"
    />
  </div>
</DemoBlock>

## 功能3：渐进式加载

当 `zoom-src` 高清图尚未加载完毕时，组件会在底部显示**进度条动画**占位，加载完成后无缝切换。

<DemoBlock title="渐进式高清加载" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/12/400/400"
      zoom-src="https://picsum.photos/id/12/2000/2000"
      border
      title="高清图加载中时显示进度条"
    />
  </div>
</DemoBlock>

## 功能4：图片库联动

通过 `images` 数组传入多张图片，组件自动渲染缩略图导航。支持 `v-model` 双向绑定当前激活图片索引。

<DemoBlock title="相册图库联动" :ts-code="tsGallery" :js-code="jsGallery">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      v-model="current"
      :images="images"
      border
    />
  </div>
</DemoBlock>

## 功能5：地图缩略导航

设置 `show-minimap` 后，放大预览区域右下角显示**全图缩略图**，红框实时标注当前放大区域的位置。

<DemoBlock title="地图缩略导航" :ts-code="tsMinimap" :js-code="jsMinimap">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/13/400/400"
      zoom-src="https://picsum.photos/id/13/1200/1200"
      show-minimap
      border
      title="预览区右下角显示全图缩略导航"
    />
  </div>
</DemoBlock>

## 功能6：点击全屏预览

设置 `click-to-fullscreen` 后，点击主图即可进入沉浸式全屏查看模式。按 `Esc` 或点击遮罩可关闭。图库模式下全屏内也支持切换图片。

<DemoBlock title="全屏沉浸预览" :ts-code="tsFullscreen" :js-code="jsFullscreen">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/14/400/400"
      zoom-src="https://picsum.photos/id/14/1200/1200"
      click-to-fullscreen
      border
      title="点击图片进入全屏沉浸预览"
    />
  </div>
</DemoBlock>

## 高清图源与自定义

支持通过 `zoom-src` 指定更高分辨率的图源。同时可以调整 `offset` 间距、`mask-color` 遮罩色等。

<DemoBlock title="定制化配置示例" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="width: 400px; margin: 0 auto;">
    <yh-image-magnifier
      src="https://picsum.photos/id/12/400/400"
      zoom-src="https://picsum.photos/id/12/1200/1200"
      :offset="20"
      :mask-width="120"
      :mask-height="120"
      mask-color="rgba(255, 77, 79, 0.2)"
      border
      shadow
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

由于放大镜涉及鼠标移动监听与坐标计算，建议使用 `<client-only>` 包裹组件。

<DemoBlock title="Nuxt 集成" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="width: 400px; margin: 0 auto;">
    <client-only>
      <yh-image-magnifier
        src="https://picsum.photos/id/13/400/400"
        zoom-src="https://picsum.photos/id/13/1200/1200"
        border
        wheel-zoom
        click-to-fullscreen
      />
    </client-only>
  </div>
</DemoBlock>

## API

### Props

| 属性名                | 说明                              | 类型                                      | 默认值                 |
| --------------------- | --------------------------------- | ----------------------------------------- | ---------------------- |
| src                   | 主图地址                          | `string`                                  | `''`                   |
| zoom-src              | 高清放大图地址 (不填用 src)       | `string`                                  | `''`                   |
| images                | 图片库数组，传入后开启多图模式    | `ImageMagnifierImage[]`                   | `[]`                   |
| model-value (v-model) | 当前激活图片索引                  | `number`                                  | `0`                    |
| scale                 | 初始放大倍数                      | `number`                                  | `2`                    |
| wheel-zoom            | 是否开启滚轮动态缩放              | `boolean`                                 | `false`                |
| min-scale             | 滚轮缩放最小倍率                  | `number`                                  | `1.2`                  |
| max-scale             | 滚轮缩放最大倍率                  | `number`                                  | `5`                    |
| scale-step            | 每次滚轮缩放步长                  | `number`                                  | `0.3`                  |
| width                 | 主图显示宽度                      | `number \| string`                        | `'100%'`               |
| height                | 主图显示高度                      | `number \| string`                        | `'auto'`               |
| position              | 放大区域显示位置，`auto` 自动适配 | `'right' \| 'left' \| 'inside' \| 'auto'` | `'right'`              |
| offset                | 放大区域与主图的间距 (px)         | `number`                                  | `10`                   |
| mask-shape            | 遮罩透镜形状                      | `'square' \| 'circle'`                    | `'square'`             |
| mask-width            | 遮罩宽度 (px)                     | `number`                                  | `150`                  |
| mask-height           | 遮罩高度 (px)                     | `number`                                  | `150`                  |
| mask-color            | 遮罩颜色                          | `string`                                  | `'rgba(0, 0, 0, 0.3)'` |
| show-minimap          | 是否显示地图缩略导航              | `boolean`                                 | `false`                |
| border                | 是否显示主图边框                  | `boolean`                                 | `false`                |
| shadow                | 是否显示主图阴影                  | `boolean`                                 | `false`                |
| title                 | 底部提示文案                      | `string`                                  | `''`                   |
| alt                   | 图片 alt 属性                     | `string`                                  | `''`                   |
| click-to-fullscreen   | 点击是否进入全屏预览              | `boolean`                                 | `false`                |
| theme-overrides       | 主题变量覆盖                      | `Record<string, string>`                  | `{}`                   |

### Events

| 事件名            | 说明                       | 回调参数          |
| ----------------- | -------------------------- | ----------------- |
| enter             | 鼠标移入主图触发           | —                 |
| leave             | 鼠标移出主图触发           | —                 |
| zoom-start        | 放大开始触发               | —                 |
| zoom-end          | 放大结束触发               | —                 |
| scale-change      | 滚轮缩放倍率变化时触发     | `(scale: number)` |
| image-change      | 图库切换图片时触发         | `(index: number)` |
| update:modelValue | 图库当前索引变化 (v-model) | `(index: number)` |

### Slots

| 插槽名     | 说明                   | 作用域                         |
| ---------- | ---------------------- | ------------------------------ |
| default    | 替换默认主图 img 元素  | —                              |
| title      | 自定义底部标题区域     | —                              |
| close-icon | 自定义全屏关闭按钮图标 | —                              |
| fullscreen | 自定义全屏内容区域     | `{ src: string, alt: string }` |

### ImageMagnifierImage 类型

```ts
interface ImageMagnifierImage {
  src: string
  zoomSrc?: string
  alt?: string
}
```

### Expose (组件实例方法/属性)

| 名称         | 说明                     | 类型                      |
| ------------ | ------------------------ | ------------------------- |
| visible      | 当前是否处于放大预览状态 | `Ref<boolean>`            |
| currentScale | 当前放大倍率             | `Ref<number>`             |
| currentIndex | 当前激活图片索引         | `Ref<number>`             |
| switchImage  | 切换图片方法             | `(index: number) => void` |

## 主题变量

通过 `theme-overrides` 可以覆盖以下 CSS 变量，实现样式定制：

| 变量名                                 | 说明           | 默认值                           |
| -------------------------------------- | -------------- | -------------------------------- |
| `--yh-magnifier-preview-border`        | 预览面板边框色 | `var(--yh-border-color-lighter)` |
| `--yh-magnifier-preview-shadow`        | 预览面板阴影   | `0 8px 24px rgba(0,0,0,0.15)`    |
| `--yh-magnifier-mask-bg`               | 遮罩背景色     | `rgba(0,0,0,0.2)`                |
| `--yh-magnifier-mask-border`           | 遮罩边框色     | `rgba(255,255,255,0.6)`          |
| `--yh-magnifier-radius`                | 圆角大小       | `var(--yh-radius-base)`          |
| `--yh-magnifier-loading-color`         | 加载进度条颜色 | `var(--yh-color-primary)`        |
| `--yh-magnifier-gallery-active-border` | 图库选中边框色 | `var(--yh-color-primary)`        |
| `--yh-magnifier-badge-bg`              | 倍率徽章背景色 | `rgba(0,0,0,0.55)`               |
| `--yh-magnifier-badge-color`           | 倍率徽章文字色 | `#fff`                           |
| `--yh-magnifier-minimap-size`          | 缩略导航尺寸   | `80px`                           |
| `--yh-magnifier-fullscreen-bg`         | 全屏遮层背景色 | `rgba(0,0,0,0.88)`               |
| `--yh-magnifier-title-bg`              | 标题背景色     | `rgba(0,0,0,0.5)`                |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhImageMagnifierProps` | 组件 Props 类型 |
| `YhImageMagnifierEmits` | 组件事件类型 |
| `YhImageMagnifierSlots` | 组件插槽类型 |
| `YhImageMagnifierExpose` | 组件 Expose 类型 |
| `YhImageMagnifierImage` | 图片数据类型 |
| `YhImageMagnifierPosition` | 预览位置联合类型 |
| `YhImageMagnifierMaskShape` | 遮罩形状联合类型 |
| `YhImageMagnifierInstance` | 组件实例类型 |
