# Image 图片

<script setup lang="ts">
import { ref } from 'vue'
const src = 'https://picsum.photos/400/300'
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]

const showViewer = ref(false)

const tsBasic = `<template>
  <div class="demo-image">
    <div class="block" v-for="fit in fits" :key="fit">
      <span class="demonstration">{{ fit }}</span>
      <yh-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script setup lang="ts">
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://picsum.photos/400/300'
<\/script>`

const jsBasic = `<template>
  <div class="demo-image">
    <div class="block" v-for="fit in fits" :key="fit">
      <span class="demonstration">{{ fit }}</span>
      <yh-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://picsum.photos/400/300'
<\/script>`

const tsPlaceholder = `<template>
  <div style="display: flex; gap: 20px;">
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">默认错误</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px" />
    </div>
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">自定义错误</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px">
        <template #error>
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: #f5f7fa; color: #909399; font-size: 12px;">
            加载失败
          </div>
        </template>
      </yh-image>
    </div>
  </div>
</template>`

const jsPlaceholder = tsPlaceholder

const tsPreview = `<template>
  <yh-image
    style="width: 100px; height: 100px"
    src="https://picsum.photos/400/300"
    :preview-src-list="srcList"
    :initial-index="0"
    fit="cover"
  />
</template>

<script setup lang="ts">
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]
<\/script>`

const jsPreview = `<template>
  <yh-image
    style="width: 100px; height: 100px"
    src="https://picsum.photos/400/300"
    :preview-src-list="srcList"
    :initial-index="0"
    fit="cover"
  />
</template>

<script setup>
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]
<\/script>`

const tsImageViewer = `<template>
  <div>
    <div style="margin-bottom: 10px; display: flex; gap: 10px;">
      <yh-button type="primary" @click="openViewer('default')">内置预览</yh-button>
      <yh-button type="success" @click="openViewer('viewerjs')">Viewer.js 预览</yh-button>
    </div>
    <yh-image-viewer 
      v-if="showViewer" 
      :url-list="srcList" 
      :viewer-mode="mode"
      @close="showViewer = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showViewer = ref(false)
const mode = ref('default')
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]

const openViewer = (m: string) => {
  mode.value = m
  showViewer.value = true
}
<\/script>`

const jsImageViewer = `<template>
  <div>
    <div style="margin-bottom: 10px; display: flex; gap: 10px;">
      <yh-button type="primary" @click="openViewer('default')">内置预览</yh-button>
      <yh-button type="success" @click="openViewer('viewerjs')">Viewer.js 预览</yh-button>
    </div>
    <yh-image-viewer 
      v-if="showViewer" 
      :url-list="srcList" 
      :viewer-mode="mode"
      @close="showViewer = false" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showViewer = ref(false)
const mode = ref('default')
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]

const openViewer = (m) => {
  mode.value = m
  showViewer.value = true
}
<\/script>`

const tsLazy = `<template>
  <div style="height: 400px; overflow-y: auto; background: var(--yh-bg-color-page); padding: 20px; border-radius: 8px;">
    <yh-image
      v-for="url in urls"
      :key="url"
      :src="url"
      lazy
      style="display: block; width: 100%; min-height: 200px; margin-bottom: 20px; border-radius: 4px; box-shadow: var(--yh-box-shadow-light);"
    />
  </div>
</template>

<script setup lang="ts">
const urls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6'
]
<\/script>`

const jsLazy = `<template>
  <div style="height: 400px; overflow-y: auto; background: var(--yh-bg-color-page); padding: 20px; border-radius: 8px;">
    <yh-image
      v-for="url in urls"
      :key="url"
      :src="url"
      lazy
      style="display: block; width: 100%; min-height: 200px; margin-bottom: 20px; border-radius: 4px; box-shadow: var(--yh-box-shadow-light);"
    />
  </div>
</template>

<script setup>
const urls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6'
]
<\/script>`

const urls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6'
]

const tsViewerJS = `<template>
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    viewer-mode="viewerjs"
    :viewer-options="{
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: 4,
        play: {
          show: 4,
          size: 'large',
        },
        next: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
      },
      navbar: true,
      title: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }"
    fit="cover"
  />
</template>

<script setup lang="ts">
const src = 'https://picsum.photos/400/300'
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]
<\/script>`

const jsViewerJS = `<template>
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    viewer-mode="viewerjs"
    :viewer-options="{
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: 4,
        play: {
          show: 4,
          size: 'large',
        },
        next: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
      },
      navbar: true,
      title: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }"
    fit="cover"
  />
</template>

<script setup>
const src = 'https://picsum.photos/400/300'
const srcList = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3'
]
<\/script>`

const tsNuxt = `<template>
  <yh-image
    style="width: 200px; height: 150px; border-radius: 8px;"
    src="https://picsum.photos/400/300?nuxt=1"
    lazy
    :preview-src-list="['https://picsum.photos/800/600?nuxt=1']"
  >
    <template #placeholder>
      <div style="display: flex; align-items: center; gap: 8px;">
        <yh-icon name="loading" class="is-loading" />
        Nuxt SSR Loading...
      </div>
    </template>
  </yh-image>
</template>`

const jsNuxt = `<template>
  <yh-image
    style="width: 200px; height: 150px; border-radius: 8px;"
    src="https://picsum.photos/400/300?nuxt=1"
    lazy
    :preview-src-list="['https://picsum.photos/800/600?nuxt=1']"
  >
    <template #placeholder>
      <div style="display: flex; align-items: center; gap: 8px;">
        <yh-icon name="loading" class="is-loading" />
        Nuxt SSR Loading...
      </div>
    </template>
  </yh-image>
</template>`

const modeMap = ref('default')
const openViewerManual = (m: string) => {
  modeMap.value = m
  showViewer.value = true
}

</script>

图片容器，在保留原生 img 的特性下，支持懒加载，自定义占位、加载失败、图片预览等。

## 基础用法

可通过 `fit` 确定图片如何适应到容器框，同原生 `object-fit`。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div v-for="fit in ['fill', 'contain', 'cover', 'none', 'scale-down']" :key="fit" style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">{{ fit }}</div>
      <yh-image style="width: 100px; height: 100px" :src="src" :fit="fit" />
    </div>
  </div>
</DemoBlock>

## 占位内容与加载失败

可通过 `placeholder` 和 `error` 插槽自定义占位内容。

<DemoBlock title="占位内容与加载失败" :ts-code="tsPlaceholder" :js-code="jsPlaceholder">
  <div style="display: flex; gap: 20px;">
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">默认错误</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px" />
    </div>
    <div style="text-align: center;">
      <div style="color: #8492a6; font-size: 14px; margin-bottom: 10px;">自定义错误</div>
      <yh-image src="https://invalid-url" style="width: 100px; height: 100px">
        <template #error>
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; background: #f5f7fa; color: #909399; font-size: 12px;">
            加载失败
          </div>
        </template>
      </yh-image>
    </div>
  </div>
</DemoBlock>

## 懒加载

::: tip
浏览器原生支持的 `loading` 属性。您可以尝试使用 `loading="lazy"` 替换之前的 `lazy="true"`。

如果当前浏览器支持原生图片延迟加载，则先使用原生能力，否则将使用滚动监听实现相同效果。
:::

可通过 `lazy` 开启懒加载功能，当图片滚动到可视范围内才会加载。可通过 `scroll-container` 来设置滚动容器，若未定义，则为最近一个 `overflow` 值为 `auto` 或 `scroll` 的父元素。

<DemoBlock title="懒加载" :ts-code="tsLazy" :js-code="jsLazy">
  <div style="height: 400px; overflow-y: auto; background: var(--yh-bg-color-page); padding: 20px; border-radius: 8px;">
    <yh-image
      v-for="url in urls"
      :key="url"
      :src="url"
      lazy
      style="display: block; width: 100%; min-height: 200px; margin-bottom: 20px; border-radius: 4px; box-shadow: var(--yh-box-shadow-light);"
    />
  </div>
</DemoBlock>

## 图片预览

可通过 `preview-src-list` 开启预览功能。

<DemoBlock title="图片预览" :ts-code="tsPreview" :js-code="jsPreview">
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    fit="cover"
  />
</DemoBlock>

## 手动调用预览

可通过 `yh-image-viewer` 组件手动调用预览功能，这在某些不需要显示缩略图，只需在点击某个元素（如按钮或文字链接）时唤起预览的场景中非常有用。同时也支持手动调用 `viewerjs` 模式。

<DemoBlock title="手动调用预览" :ts-code="tsImageViewer" :js-code="jsImageViewer">
  <div>
    <div style="margin-bottom: 10px; display: flex; gap: 10px;">
      <yh-button type="primary" @click="openViewerManual('default')">内置预览</yh-button>
      <yh-button type="success" @click="openViewerManual('viewerjs')">Viewer.js 预览</yh-button>
    </div>
    <yh-image-viewer 
      v-if="showViewer" 
      :url-list="srcList" 
      :viewer-mode="modeMap"
      @close="showViewer = false" 
    />
  </div>
</DemoBlock>

## Viewer.js 预览（扩展）

当内置预览器无法满足需求时，可以切换为功能更强大的 `viewerjs` 模式。它支持幻灯片播放、全屏、翻转、缩略图导航等高级特性。

<DemoBlock title="Viewer.js 高级预览" :ts-code="tsViewerJS" :js-code="jsViewerJS">
  <yh-image
    style="width: 100px; height: 100px; border-radius: 4px;"
    :src="src"
    :preview-src-list="srcList"
    viewer-mode="viewerjs"
    :viewer-options="{
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: 4,
        play: {
          show: 4,
          size: 'large',
        },
        next: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
      },
      navbar: true,
      title: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }"
    fit="cover"
  />
</DemoBlock>

## 在 Nuxt 中使用

`Image` 组件完全支持 Nuxt 3 的 SSR 模式。由于其内置了懒加载和预览功能，我们在实现中充分考虑了服务端与客户端的兼容性。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
    <yh-image
      style="width: 200px; height: 150px; border-radius: 8px;"
      src="https://picsum.photos/400/300?nuxt=1"
      lazy
      :preview-src-list="['https://picsum.photos/800/600?nuxt=1']"
    >
      <template #placeholder>
        <div style="display: flex; align-items: center; gap: 8px;">
          <yh-icon name="loading" class="is-loading" />
          Nuxt SSR Loading...
        </div>
      </template>
    </yh-image>
    <p style="font-size: 14px; color: var(--yh-text-color-secondary);">支持自动导入与 SSR 占位渲染</p>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 支持服务端占位渲染（Placeholder Slot）
- ✅ 懒加载在客户端激活后自动开始监听
- ✅ 预览器组件采用 Teleport，在客户端挂载到 body
- ✅ 完美兼容 Nuxt 的自动导入机制

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片源地址 | `string` | — |
| fit | 确定图片如何适应容器框，同原生 object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | — |
| lazy | 是否开启懒加载 | `boolean` | `false` |
| preview-src-list | 开启预览列表 | `string[]` | `[]` |
| z-index | 设置预览的 z-index | `number` | `2000` |
| initial-index | 预览显示的起始索引 | `number` | `0` |
| close-on-press-escape | 是否可以通过按下 ESC 关闭预览 | `boolean` | `true` |
| hide-on-click-modal | 是否可以通过点击遮罩层关闭预览 | `boolean` | `false` |
| infinite | 是否循环预览 | `boolean` | `true` |
| zoom-rate | 预览缩放比例 | `number` | `1.2` |
| show-progress | 预览模式下是否展示操作栏 | `boolean` | `true` |
| preview-teleported | 预览容器是否追加到 body 上 | `boolean` | `true` |
| scroll-container | 开启懒加载后，指定滚动的容器 | `string \| HTMLElement` | — |
| viewer-mode | 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs | `'default' \| 'viewerjs'` | `'default'` |
| viewer-options | 传递给 `viewerjs` 的配置项 | `object` | `{}` |
| alt | 原生 alt 属性 | `string` | — |
| crossorigin | 原生 crossorigin 属性 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load | 图片加载成功触发 | `(event: Event) => void` |
| error | 图片加载失败触发 | `(event: Event) => void` |
| switch | 预览图片轮播切换时触发 | `(index: number) => void` |
| show | 预览展示时触发 | — |
| close | 预览关闭时触发 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| placeholder | 图片未加载完成时的占位内容 |
| error | 加载失败的内容 |

---

## ImageViewer API

如果您需要独立使用预览器组件，可以使用 `yh-image-viewer`。

### ImageViewer Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url-list | 预览图片源列表 | `string[]` | `[]` |
| z-index | 设置预览的 z-index | `number` | `2000` |
| index | 预览图片的起始索引 | `number` | `0` |
| infinite | 是否循环预览 | `boolean` | `true` |
| hide-on-click-modal | 是否可以通过点击遮罩层关闭预览 | `boolean` | `false` |
| close-on-press-escape | 是否可以通过按下 ESC 关闭预览 | `boolean` | `true` |
| zoom-rate | 预览缩放比例 | `number` | `1.2` |
| show-progress | 是否显示操作栏 | `boolean` | `true` |
| teleported | 是否追加到 body 上 | `boolean` | `true` |
| viewer-mode | 预览模式 | `'default' \| 'viewerjs'` | `'default'` |
| viewer-options | Viewer.js 配置项 | `object` | `{}` |

### ImageViewer Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| switch | 切换图片时触发 | `(index: number) => void` |
| close | 关闭预览时触发 | — |

## 主题变量

`Image` 组件支持通过覆盖以下 CSS 变量来自定义局部样式。所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-image-placeholder-bg-color` | 占位区域背景颜色 | `var(--yh-fill-color-light)` |
| `--yh-image-placeholder-text-color` | 占位区域文字颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-image-error-bg-color` | 错误区域背景颜色 | `var(--yh-fill-color-extra-light)` |
| `--yh-image-error-text-color` | 错误区域文字颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-image-border-radius` | 图片圆角 | `var(--yh-radius-md)` |
| `--yh-image-viewer-mask-bg-color` | 预览遮罩背景颜色 | `var(--yh-mask-color)` |
| `--yh-image-viewer-btn-bg-color` | 预览控制器按钮背景颜色 | `var(--yh-text-color-regular)` |
| `--yh-image-viewer-btn-color` | 预览控制器按钮图标颜色 | `var(--yh-color-white)` |
| `--yh-image-viewer-btn-hover-bg-color` | 预览控制器按钮悬停颜色 | `var(--yh-color-primary)` |
