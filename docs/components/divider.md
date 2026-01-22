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
</script>
