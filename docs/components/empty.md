# Empty 空状态

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-empty description="暂无数据" />
<\/template>`

const jsBasic = tsBasic

const tsImage = `<template>
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="自定义图片" 
  />
<\/template>`

const jsImage = tsImage

const tsSize = `<template>
  <yh-empty :image-size="200" description="自定义图片大小" />
<\/template>`

const jsSize = tsSize

const tsBottom = `<template>
  <yh-empty description="您还没有任何订单">
    <yh-button type="primary">立即购买</yh-button>
  </yh-empty>
<\/template>`

const jsBottom = tsBottom

const tsSlotImage = `<template>
  <yh-empty description="自定义图像插槽">
    <template #image>
      <div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span style="font-size: 40px; color: #fff;">📦</span>
      </div>
    </template>
  </yh-empty>
<\/template>`

const jsSlotImage = tsSlotImage

const tsSlotDesc = `<template>
  <yh-empty>
    <template #description>
      <p style="color: #909399; margin: 0;">暂无相关搜索结果，请尝试 <a href="#" style="color: #409eff;">修改关键词</a></p>
    </template>
  </yh-empty>
<\/template>`

const jsSlotDesc = tsSlotDesc

// Nuxt 使用示例
const tsNuxt = `<template>
  <div>
    <yh-empty v-if="!dataList.length" description="暂无数据">
      <yh-button type="primary" @click="fetchData">刷新数据</yh-button>
    </yh-empty>
    <div v-else>
      <!-- 数据列表 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhEmpty / YhButton
const dataList = ref([])

const fetchData = async () => {
  // 从 Nuxt API 路由获取数据
  const { data } = await useFetch('/api/list')
  dataList.value = data.value || []
}
<\/script>`.replace(/\\\//g, '/')

const jsNuxt = tsNuxt.replace('lang="ts"', '').replace(/: ref<.*>\(/, ': ref(').replace('ref<string[]>', 'ref')
</script>

空状态时的展示占位图。

## 基础用法

展示最简单的空状态。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-empty description="暂无数据" />
</DemoBlock>

## 自定义图片

通过 `image` 属性传入图片的地址。

<DemoBlock title="自定义图片" :ts-code="tsImage" :js-code="jsImage">
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="自定义图片" 
  />
</DemoBlock>

## 图片尺寸

通过 `image-size` 属性设置图片的大小（宽高）。

<DemoBlock title="图片尺寸" :ts-code="tsSize" :js-code="jsSize">
  <yh-empty :image-size="200" description="自定义图片大小" />
</DemoBlock>

## 自定义底部内容

使用默认插槽可在底部添加自定义内容，如操作按钮。

<DemoBlock title="自定义底部内容" :ts-code="tsBottom" :js-code="jsBottom">
  <yh-empty description="您还没有任何订单">
    <yh-button type="primary">立即购买</yh-button>
  </yh-empty>
</DemoBlock>

## 自定义图像

使用 `#image` 插槽完全自定义图像区域。

<DemoBlock title="自定义图像" :ts-code="tsSlotImage" :js-code="jsSlotImage">
  <yh-empty description="自定义图像插槽">
    <template #image>
      <div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span style="font-size: 40px; color: #fff;">📦</span>
      </div>
    </template>
  </yh-empty>
</DemoBlock>

## 自定义描述

使用 `#description` 插槽自定义描述文字区域。

<DemoBlock title="自定义描述" :ts-code="tsSlotDesc" :js-code="jsSlotDesc">
  <yh-empty>
    <template #description>
      <p style="color: #909399; margin: 0;">暂无相关搜索结果，请尝试 <a href="#" style="color: #409eff;">修改关键词</a></p>
    </template>
  </yh-empty>
</DemoBlock>

## 在 Nuxt 中使用

Empty 组件完全支持 Nuxt 3/4 的 SSR 渲染。空状态的图像和描述在服务端渲染时即可正确展示，确保首屏即呈现完整的空状态提示，增强用户体验。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-empty description="暂无数据">
    <yh-button type="primary">刷新数据</yh-button>
  </yh-empty>
</DemoBlock>

**SSR 注意事项**：

- ✅ 描述文字 (description) 和图片 (image) 首屏正确渲染
- ✅ 内置 SVG 插图在服务端完整输出
- ✅ 自定义图片尺寸 (image-size) 首屏即生效
- 💡 动态数据加载后切换空状态/内容的逻辑在客户端激活后自动完成

::: tip Nuxt 自动导入
在安装 `@yh-ui/nuxt` 模块后，`YhEmpty` 组件会被自动注册，无需手动导入。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 自定义图片地址 | `string` | — |
| image-size | 图片尺寸（px） | `number` | `100` |
| description | 描述文字 | `string` | `'暂无数据'` |
| icon | 自定义图像组件 | `string \| Component` | — |
| theme-overrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义底部内容（如操作按钮） |
| image | 自定义图像区域 |
| description | 自定义描述文字 |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-empty-padding` | 容器内边距 | `40px 0` |
| `--yh-empty-description-color` | 描述文字颜色 | `var(--yh-text-color-secondary, #909399)` |
| `--yh-empty-description-font-size` | 描述文字大小 | `14px` |
| `--yh-empty-ellipse-color` | 默认插图椭圆颜色 | `#f5f5f7` |
| `--yh-empty-image-fill` | 默认插图主填充色 | `#aeb8c2` |
| `--yh-empty-image-fill2` | 默认插图次填充色 | `#f5f5f7` |
| `--yh-empty-plane-bg` | 默认插图纸面背景色 | `#f5f5f7` |
| `--yh-empty-comment-fill` | 默认插图评论填充色 | `#dce0e6` |
