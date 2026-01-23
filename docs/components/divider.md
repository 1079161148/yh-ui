# Divider 分割线

区隔内容的分割线。

## 基础用法

对不同章节的文本段落进行分割。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div>
    <p>青春是一个普通的名称，它是幸福美好的，但它也是充满着艰苦的磨炼。</p>
    <yh-divider />
    <p>白日依山尽，黄河入海流。欲穷千里目，更上一层楼。</p>
    <yh-divider />
    <p>少壮不努力，老大徒伤悲。</p>
  </div>
</DemoBlock>

## 设置文案

可以在分割线上自定义文案内容。

<DemoBlock title="设置文案" :ts-code="tsContent" :js-code="jsContent">
  <div>
    <p>雨纷纷旧故里草木深，我听闻你仍守着孤城。</p>
    <yh-divider content-position="left">左侧文字</yh-divider>
    <p>城郊牧笛声，落在那座野村。</p>
    <yh-divider>居中文字</yh-divider>
    <p>缘份落地生根是我们。</p>
    <yh-divider content-position="right">右侧文字</yh-divider>
    <p>伽蓝寺听雨声盼永恒。</p>
  </div>
</DemoBlock>

## 垂直分割线

使用 `direction="vertical"` 创建垂直分割线。

<DemoBlock title="垂直分割线" :ts-code="tsVertical" :js-code="jsVertical">
  <div>
    <span>雨纷纷</span>
    <yh-divider direction="vertical" />
    <span>旧故里</span>
    <yh-divider direction="vertical" />
    <span>草木深</span>
  </div>
</DemoBlock>

## 虚线

设置 `border-style="dashed"` 以呈现虚线。

<DemoBlock title="虚线" :ts-code="tsDashed" :js-code="jsDashed">
  <div>
    <p>内容区域</p>
    <yh-divider border-style="dashed" />
    <p>内容区域</p>
    <yh-divider border-style="dotted">点状虚线</yh-divider>
    <p>内容区域</p>
  </div>
</DemoBlock>

## 自定义颜色和粗细

使用 `color` 和 `border-width` 属性自定义分割线的颜色和粗细。

<DemoBlock title="自定义颜色和粗细" :ts-code="tsCustom" :js-code="jsCustom">
  <div>
    <p>默认样式</p>
    <yh-divider />
    <p>自定义颜色</p>
    <yh-divider color="#409eff" />
    <p>自定义粗细 (2px)</p>
    <yh-divider :border-width="2" color="#67c23a" />
    <p>粗线 + 虚线</p>
    <yh-divider :border-width="3" color="#e6a23c" border-style="dashed" />
    <p>带文字的自定义分割线</p>
    <yh-divider color="#f56c6c" :border-width="2">重要分割</yh-divider>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Divider 组件完全支持 Nuxt 3/4 环境。作为纯表现型组件，其 HTML 结构在服务端直接生成，并配合内联或外部样式表实现首屏的完美视觉分割。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <p style="margin: 0; color: var(--yh-text-color-secondary); font-size: 14px;">YH-UI 在 Nuxt 中可以极致流畅地运行。</p>
    <yh-divider border-style="dashed">Nuxt SSR</yh-divider>
    <div style="display: flex; align-items: center; font-size: 14px; color: var(--yh-text-color-primary);">
      <span>组件 1</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-primary)" />
      <span>组件 2</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-success)" />
      <span>组件 3</span>
    </div>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 水平 (horizontal) 和垂直 (vertical) 方向在服务端正确生成
- ✅ 文案位置 (content-position) 在 SSR 阶段即已正确定位
- ✅ 虚线样式 (dashed/dotted) 和自定义粗细通过样式在服务端生效
- ✅ 自动导入功能让开发体验更爽快

::: tip 性能小贴士
由于 Divider 组件结构极简，它在 SSR 场景下几乎不产生任何多余的 JS 负载，非常适合在追求加载速度的内容型 Nuxt 页面中使用。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 分割线方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| content-position | 文案位置 | `'left' \| 'center' \| 'right'` | `'center'` |
| border-style | 分割线样式 | `'solid' \| 'dashed' \| 'dotted' \| 'double'` | `'solid'` |
| border-width | 分割线宽度 | `string \| number` | `1px` |
| color | 分割线颜色 | `string` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 分割线文案内容 |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-divider-border-color` | 分割线边框颜色 | `var(--yh-border-color-lighter)` |
| `--yh-divider-border-width` | 分割线边框宽度 | `1px` |
| `--yh-divider-border-style` | 分割线边框样式 | `solid` |
| `--yh-divider-margin-horizontal` | 水平方向外边距 | `24px 0` |
| `--yh-divider-margin-vertical` | 垂直方向外边距 | `0 8px` |
| `--yh-divider-text-color` | 文案颜色 | `var(--yh-text-color-primary)` |

<script setup lang="ts">
const tsBasic = `
<template>
  <div>
    <p>青春是一个普通的名称，它是幸福美好的，但它也是充满着艰苦的磨炼。</p>
    <yh-divider />
    <p>白日依山尽，黄河入海流。欲穷千里目，更上一层楼。</p>
    <yh-divider />
    <p>少壮不努力，老大徒伤悲。</p>
  </div>
</template>
`.trim()
const jsBasic = tsBasic

const tsContent = `
<template>
  <div>
    <p>雨纷纷旧故里草木深，我听闻你仍守着孤城。</p>
    <yh-divider content-position="left">左侧文字</yh-divider>
    <p>城郊牧笛声，落在那座野村。</p>
    <yh-divider>居中文字</yh-divider>
    <p>缘份落地生根是我们。</p>
    <yh-divider content-position="right">右侧文字</yh-divider>
    <p>伽蓝寺听雨声盼永恒。</p>
  </div>
</template>
`.trim()
const jsContent = tsContent

const tsVertical = `
<template>
  <div>
    <span>雨纷纷</span>
    <yh-divider direction="vertical" />
    <span>旧故里</span>
    <yh-divider direction="vertical" />
    <span>草木深</span>
  </div>
</template>
`.trim()
const jsVertical = tsVertical

const tsDashed = `
<template>
  <div>
    <p>内容区域</p>
    <yh-divider border-style="dashed" />
    <p>内容区域</p>
    <yh-divider border-style="dotted">点状虚线</yh-divider>
    <p>内容区域</p>
  </div>
</template>
`.trim()
const jsDashed = tsDashed

const tsCustom = `
<template>
  <div>
    <p>默认样式</p>
    <yh-divider />
    <p>自定义颜色</p>
    <yh-divider color="#409eff" />
    <p>自定义粗细 (2px)</p>
    <yh-divider :border-width="2" color="#67c23a" />
    <p>粗线 + 虚线</p>
    <yh-divider :border-width="3" color="#e6a23c" border-style="dashed" />
    <p>带文字的自定义分割线</p>
    <yh-divider color="#f56c6c" :border-width="2">重要分割</yh-divider>
  </div>
</template>
`.trim()
const jsCustom = tsCustom

// Nuxt 使用示例
const tsNuxt = `<template>
  <div>
    <p style="margin: 0; color: var(--yh-text-color-secondary); font-size: 14px;">YH-UI 在 Nuxt 中可以极致流畅地运行。</p>
    <yh-divider border-style="dashed">Nuxt SSR</yh-divider>
    <div style="display: flex; align-items: center; font-size: 14px; color: var(--yh-text-color-primary);">
      <span>组件 1</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-primary)" />
      <span>组件 2</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-success)" />
      <span>组件 3</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 自动导入，无需配置
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>
