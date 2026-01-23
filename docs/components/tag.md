# Tag 标签

<script setup lang="ts">
import { ref } from 'vue'

// 可关闭标签演示数据
const closableTags = ref([
  { text: '标签一', type: '' },
  { text: '标签二', type: 'success' },
  { text: '标签三', type: 'warning' },
  { text: '标签四', type: 'danger' },
  { text: '标签五', type: 'info' }
])

const handleCloseTag = (index: number) => {
  closableTags.value.splice(index, 1)
}

// 动态标签
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const inputValue = ref('')

const removeDynamicTag = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

const showInput = () => {
  inputVisible.value = true
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

// 可选中标签
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)

// 代码示例
const tsBasic = `<template>
  <yh-tag>标签一</yh-tag>
  <yh-tag type="success">标签二</yh-tag>
  <yh-tag type="warning">标签三</yh-tag>
  <yh-tag type="danger">标签四</yh-tag>
  <yh-tag type="info">标签五</yh-tag>
<\/template>`

const jsBasic = tsBasic

const tsEffect = `<template>
  <!-- Dark 效果 -->
  <yh-tag effect="dark">标签一</yh-tag>
  <yh-tag type="success" effect="dark">标签二</yh-tag>
  <yh-tag type="warning" effect="dark">标签三</yh-tag>
  <yh-tag type="danger" effect="dark">标签四</yh-tag>
  <yh-tag type="info" effect="dark">标签五</yh-tag>
  
  <!-- Light 效果（默认） -->
  <yh-tag effect="light">标签一</yh-tag>
  <yh-tag type="success" effect="light">标签二</yh-tag>
  <yh-tag type="warning" effect="light">标签三</yh-tag>
  <yh-tag type="danger" effect="light">标签四</yh-tag>
  <yh-tag type="info" effect="light">标签五</yh-tag>
  
  <!-- Plain 效果 -->
  <yh-tag effect="plain">标签一</yh-tag>
  <yh-tag type="success" effect="plain">标签二</yh-tag>
  <yh-tag type="warning" effect="plain">标签三</yh-tag>
  <yh-tag type="danger" effect="plain">标签四</yh-tag>
  <yh-tag type="info" effect="plain">标签五</yh-tag>
<\/template>`

const jsEffect = tsEffect

const tsClosable = `<template>
  <yh-tag
    v-for="(tag, index) in tags"
    :key="tag.text"
    :type="tag.type"
    closable
    @close="handleClose(index)"
  >
    {{ tag.text }}
  </yh-tag>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref([
  { text: '标签一', type: '' },
  { text: '标签二', type: 'success' },
  { text: '标签三', type: 'warning' },
  { text: '标签四', type: 'danger' },
  { text: '标签五', type: 'info' }
])

const handleClose = (index: number) => {
  tags.value.splice(index, 1)
}
<\/script>`

const jsClosable = tsClosable.replace('lang="ts"', '').replace(': number', '')

const tsDynamic = `<template>
  <yh-tag
    v-for="(tag, index) in dynamicTags"
    :key="tag"
    closable
    @close="removeTag(index)"
  >
    {{ tag }}
  </yh-tag>
  <input
    v-if="inputVisible"
    v-model="inputValue"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <yh-button v-else size="small" @click="showInput">+ New Tag</yh-button>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const inputValue = ref('')

const removeTag = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

const showInput = () => {
  inputVisible.value = true
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
<\/script>`

const jsDynamic = tsDynamic.replace('lang="ts"', '').replace(': number', '')

const tsCheckable = `<template>
  <yh-tag checkable v-model:checked="checked1">标签一</yh-tag>
  <yh-tag checkable v-model:checked="checked2" type="success">标签二</yh-tag>
  <yh-tag checkable v-model:checked="checked3" type="warning">标签三</yh-tag>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
<\/script>`

const jsCheckable = tsCheckable.replace('lang="ts"', '')

const tsSizes = `<template>
  <yh-tag size="large">Large</yh-tag>
  <yh-tag>Default</yh-tag>
  <yh-tag size="small">Small</yh-tag>
  <yh-tag size="large" closable>Large</yh-tag>
  <yh-tag closable>Default</yh-tag>
  <yh-tag size="small" closable>Small</yh-tag>
<\/template>`

const jsSizes = tsSizes

const tsRound = `<template>
  <yh-tag round>标签一</yh-tag>
  <yh-tag type="success" round>标签二</yh-tag>
  <yh-tag type="warning" round>标签三</yh-tag>
  <yh-tag type="danger" round>标签四</yh-tag>
  <yh-tag type="info" round>标签五</yh-tag>
<\/template>`

const jsRound = tsRound

const tsColor = `<template>
  <yh-tag color="#8B5CF6">自定义紫色</yh-tag>
  <yh-tag color="#F97316" effect="dark">自定义橙色</yh-tag>
  <yh-tag color="#06B6D4" effect="plain">自定义青色</yh-tag>
  <yh-tag color="#EC4899">自定义粉色</yh-tag>
  <yh-tag color="#14B8A6" effect="dark">自定义蓝绿色</yh-tag>
<\/template>`

const jsColor = tsColor

const tsIcon = `<template>
  <!-- 使用 icon 属性（传入组件） -->
  <yh-tag :icon="StarIcon">收藏</yh-tag>
  
  <!-- 使用 icon 插槽 -->
  <yh-tag type="success">
    <template #icon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </template>
    已完成
  </yh-tag>
  
  <!-- 使用 suffix-icon 插槽（右侧图标） -->
  <yh-tag type="warning">
    进行中
    <template #suffixIcon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </template>
  </yh-tag>
  
  <!-- 同时使用左右图标 -->
  <yh-tag type="danger">
    <template #icon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    </template>
    警告信息
    <template #suffixIcon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </template>
  </yh-tag>
<\/template>`

const jsIcon = tsIcon

// Nuxt 使用示例
const nuxtTags = ref(['Nuxt', 'Vue', 'Vite'])

const tsNuxt = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <!-- 基础标签，自动导入 -->
    <yh-tag type="primary">Nuxt 自动导入</yh-tag>
    
    <!-- 动态渲染标签 -->
    <yh-tag 
      v-for="item in tags" 
      :key="item" 
      type="success" 
      effect="dark"
    >
      {{ item }}
    </yh-tag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhTag
const tags = ref(['Nuxt', 'Vue', 'Vite'])
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

用于标记和选择。

## 基础用法

使用 `type` 属性来定义标签的类型。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag>标签一</yh-tag>
    <yh-tag type="success">标签二</yh-tag>
    <yh-tag type="warning">标签三</yh-tag>
    <yh-tag type="danger">标签四</yh-tag>
    <yh-tag type="info">标签五</yh-tag>
  </div>
</DemoBlock>

## 主题效果

Tag 组件提供了三种主题效果：`dark`、`light`（默认）、`plain`。

<DemoBlock title="主题效果" :ts-code="tsEffect" :js-code="jsEffect">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="min-width: 50px; color: var(--yh-text-color-secondary);">Dark:</span>
      <yh-tag effect="dark">标签一</yh-tag>
      <yh-tag type="success" effect="dark">标签二</yh-tag>
      <yh-tag type="warning" effect="dark">标签三</yh-tag>
      <yh-tag type="danger" effect="dark">标签四</yh-tag>
      <yh-tag type="info" effect="dark">标签五</yh-tag>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="min-width: 50px; color: var(--yh-text-color-secondary);">Light:</span>
      <yh-tag effect="light">标签一</yh-tag>
      <yh-tag type="success" effect="light">标签二</yh-tag>
      <yh-tag type="warning" effect="light">标签三</yh-tag>
      <yh-tag type="danger" effect="light">标签四</yh-tag>
      <yh-tag type="info" effect="light">标签五</yh-tag>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="min-width: 50px; color: var(--yh-text-color-secondary);">Plain:</span>
      <yh-tag effect="plain">标签一</yh-tag>
      <yh-tag type="success" effect="plain">标签二</yh-tag>
      <yh-tag type="warning" effect="plain">标签三</yh-tag>
      <yh-tag type="danger" effect="plain">标签四</yh-tag>
      <yh-tag type="info" effect="plain">标签五</yh-tag>
    </div>
  </div>
</DemoBlock>

## 可关闭标签

使用 `closable` 属性可以定义一个可关闭的标签。点击关闭按钮会触发 `close` 事件。

<DemoBlock title="可关闭标签" :ts-code="tsClosable" :js-code="jsClosable">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag
      v-for="(tag, index) in closableTags"
      :key="tag.text"
      :type="tag.type"
      closable
      @close="handleCloseTag(index)"
    >
      {{ tag.text }}
    </yh-tag>
  </div>
</DemoBlock>

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。

<DemoBlock title="动态编辑标签" :ts-code="tsDynamic" :js-code="jsDynamic">
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <yh-tag
      v-for="(tag, index) in dynamicTags"
      :key="tag"
      closable
      @close="removeDynamicTag(index)"
    >
      {{ tag }}
    </yh-tag>
    <input
      v-if="inputVisible"
      v-model="inputValue"
      style="width: 80px; height: 24px; padding: 0 8px; border: 1px solid var(--yh-border-color); border-radius: 4px; font-size: 12px;"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <yh-button v-else size="small" @click="showInput">+ New Tag</yh-button>
  </div>
</DemoBlock>

## 可选中标签

使用 `checkable` 属性可以定义一个可选中的标签，配合 `v-model:checked` 使用。

<DemoBlock title="可选中标签" :ts-code="tsCheckable" :js-code="jsCheckable">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag checkable v-model:checked="checked1">标签一</yh-tag>
    <yh-tag checkable v-model:checked="checked2" type="success">标签二</yh-tag>
    <yh-tag checkable v-model:checked="checked3" type="warning">标签三</yh-tag>
  </div>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">
    选中状态: {{ [checked1, checked2, checked3] }}
  </p>
</DemoBlock>

## 不同尺寸

使用 `size` 属性来控制标签的大小。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <yh-tag size="large">Large</yh-tag>
    <yh-tag>Default</yh-tag>
    <yh-tag size="small">Small</yh-tag>
    <yh-tag size="large" closable>Large</yh-tag>
    <yh-tag closable>Default</yh-tag>
    <yh-tag size="small" closable>Small</yh-tag>
  </div>
</DemoBlock>

## 圆形标签

使用 `round` 属性可以让标签变成圆形。

<DemoBlock title="圆形标签" :ts-code="tsRound" :js-code="jsRound">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag round>标签一</yh-tag>
    <yh-tag type="success" round>标签二</yh-tag>
    <yh-tag type="warning" round>标签三</yh-tag>
    <yh-tag type="danger" round>标签四</yh-tag>
    <yh-tag type="info" round>标签五</yh-tag>
  </div>
</DemoBlock>

## 自定义颜色

使用 `color` 属性可以自定义标签的颜色。

<DemoBlock title="自定义颜色" :ts-code="tsColor" :js-code="jsColor">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag color="#8B5CF6">自定义紫色</yh-tag>
    <yh-tag color="#F97316" effect="dark">自定义橙色</yh-tag>
    <yh-tag color="#06B6D4" effect="plain">自定义青色</yh-tag>
    <yh-tag color="#EC4899">自定义粉色</yh-tag>
    <yh-tag color="#14B8A6" effect="dark">自定义蓝绿色</yh-tag>
  </div>
</DemoBlock>

## 图标配置

使用 `icon` 属性或 `#icon` 插槽可以配置左侧图标，使用 `suffix-icon` 属性或 `#suffixIcon` 插槽可以配置右侧图标。

<DemoBlock title="图标配置" :ts-code="tsIcon" :js-code="jsIcon">
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
<yh-tag type="success"><template #icon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></template>已完成</yh-tag>
<yh-tag type="warning">进行中<template #suffixIcon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></template></yh-tag>
<yh-tag type="danger"><template #icon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></template>警告信息<template #suffixIcon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></template></yh-tag>
<yh-tag type="info"><template #icon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></template>提示信息</yh-tag>
</div>
</DemoBlock>

## 在 Nuxt 中使用

Tag 组件完全支持 Nuxt 3/4 环境下的 SSR 渲染。由于其轻量级的设计，非常适合在 Nuxt 项目中用于状态展示、分类标记等场景。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag type="primary">Nuxt 自动导入</yh-tag>
    <yh-tag v-for="tag in nuxtTags" :key="tag" type="success" effect="dark">{{ tag }}</yh-tag>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 所有类型 (type)、尺寸 (size) 和主题效果 (effect) 均在服务端离线生成 HTML
- ✅ 自定义颜色 (color) 和圆角 (round) 支持 SSR
- ✅ 前后缀图标插槽在服务端正确填充
- 💡 交互事件（如点击关闭、动态编辑切换）在客户端激活（Hydration）后生效

::: tip 极致轻量
Tag 组件的 CSS 经过高度原子化优化，生成在 SSR 页面中的额外样式负荷极低，是 Nuxt 极致性能优化的理想选择。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| size | 标签尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| effect | 主题效果 | `'dark' \| 'light' \| 'plain'` | `'light'` |
| closable | 是否可关闭 | `boolean` | `false` |
| round | 是否为圆形 | `boolean` | `false` |
| color | 自定义背景颜色 | `string` | — |
| hit | 是否有边框描边 | `boolean` | `false` |
| disable-transitions | 是否禁用渐变动画 | `boolean` | `false` |
| checkable | 是否可选中 | `boolean` | `false` |
| checked / v-model:checked | 是否选中 | `boolean` | `false` |
| editable | 是否可编辑（双击编辑） | `boolean` | `false` |
| icon | 左侧图标 | `Component` | — |
| suffix-icon | 右侧图标 | `Component` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击标签时触发 | `(event: MouseEvent) => void` |
| close | 点击关闭按钮时触发 | `(event: MouseEvent) => void` |
| update:checked | 选中状态变化时触发 | `(checked: boolean) => void` |
| change | 选中状态变化时触发 | `(checked: boolean) => void` |
| edit | 编辑完成时触发 | `(value: string) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签内容 |
| icon | 自定义左侧图标 |
| suffix-icon | 自定义右侧图标 |
| close-icon | 自定义关闭图标 |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-tag-font-size` | 字体大小 | `var(--yh-font-size-xs)` |
| `--yh-tag-border-radius` | 圆角大小 | `var(--yh-radius-sm)` |
| `--yh-tag-bg-color` | 背景颜色 | (根据类型变化) |
| `--yh-tag-border-color` | 边框颜色 | (根据类型变化) |
| `--yh-tag-text-color` | 文字颜色 | (根据类型变化) |
