# Descriptions 描述列表

<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'large' | 'default' | 'small'>('default')

// =====================================
// 基础用法
// =====================================
const tsBasic = `<template>
  <yh-descriptions title="应用详情">
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions title="应用详情" border style="margin-top: 20px">
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>`

const jsBasic = tsBasic


// =====================================
// 不同尺寸
// =====================================
const tsSize = `<template>
  <yh-radio-group v-model="size" style="margin-bottom: 20px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>

  <yh-descriptions
    title="垂直带边框布局"
    :column="3"
    :size="size"
    border
    direction="vertical"
  >
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions
    title="垂直无边框布局"
    :column="3"
    :size="size"
    direction="vertical"
    style="margin-top: 20px"
  >
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'large' | 'default' | 'small'>('default')
<\/script>`

const jsSize = `<template>
  <yh-radio-group v-model="size" style="margin-bottom: 20px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>

  <yh-descriptions
    title="垂直带边框布局"
    :column="3"
    :size="size"
    border
    direction="vertical"
  >
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions
    title="垂直无边框布局"
    :column="3"
    :size="size"
    direction="vertical"
    style="margin-top: 20px"
  >
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>

<script setup>
import { ref } from 'vue'

const size = ref('default')
<\/script>`

// =====================================
// 长文本内容展示
// =====================================
const tsLongContent = `<template>
  <yh-descriptions title="长文本内容展示" :column="2" border>
    <yh-descriptions-item label="商品名称">
      Apple MacBook Pro 16英寸 M3 Max芯片 笔记本电脑
    </yh-descriptions-item>
    <yh-descriptions-item label="商品价格">
      ¥29,999.00
    </yh-descriptions-item>
    <yh-descriptions-item label="商品描述" :span="2">
      搭载 M3 Max 芯片，配备 14 核中央处理器、30 核图形处理器和 16 核神经网络引擎。拥有最高可达 128GB 的统一内存和最高可达 8TB 的存储空间。16.2 英寸 Liquid 视网膜 XDR 显示屏，峰值亮度高达 1600 尼特，支持 ProMotion 自适应刷新率技术和原彩显示。MagSafe 3 充电端口、三个雷雳 4 端口、HDMI 端口、SDXC 卡插槽、高阻抗耳机插孔。六扬声器音响系统，支持空间音频。1080p FaceTime 高清摄像头。触控 ID。妙控键盘，配备全尺寸功能键行（包括触控 ID）。力度触控板。最长可达 22 小时的电池续航。
    </yh-descriptions-item>
    <yh-descriptions-item label="商品标签">
      <yh-tag type="success" size="small" style="margin-right: 4px">官方正品</yh-tag>
      <yh-tag type="warning" size="small" style="margin-right: 4px">限时特惠</yh-tag>
      <yh-tag type="danger" size="small">热销爆款</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="商品状态">
      <yh-tag type="success">在售</yh-tag>
    </yh-descriptions-item>
  </yh-descriptions>
</template>`

const jsLongContent = tsLongContent

// =====================================
// 自定义样式
// =====================================
const tsCustomStyle = `<template>
  <yh-descriptions title="核心性能面板" :column="3" border>
    <template #extra>
      <yh-button type="primary" link>Operation</yh-button>
    </template>
    <yh-descriptions-item
      label="应用标识"
      label-align="right"
      align="center"
      :label-style="{ color: '#409eff', fontWeight: 'bold' }"
      :content-style="{ backgroundColor: 'rgba(64, 158, 255, 0.1)' }"
      :row-span="2"
    >
      YH-Admin-Edge
    </yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</template>`

const jsCustomStyle = tsCustomStyle

// =====================================
// 在 Nuxt 中使用
// =====================================
const tsNuxt = `<template>
  <yh-descriptions title="用户详情" border>
    <yh-descriptions-item label="用户名">{{ user.name }}</yh-descriptions-item>
    <yh-descriptions-item label="邮箱">{{ user.email }}</yh-descriptions-item>
    <yh-descriptions-item label="注册时间">{{ user.createdAt }}</yh-descriptions-item>
  </yh-descriptions>
</template>

<script setup lang="ts">
// 在 Nuxt 中, 组件自动导入, 无需手动引入
interface User {
  name: string
  email: string
  createdAt: string
}

const user = ref<User>({
  name: 'YH-Admin-Edge',
  email: 'test@example.com',
  createdAt: '2024-01-01'
})
<\/script>`

const jsNuxt = `<template>
  <yh-descriptions title="用户详情" border>
    <yh-descriptions-item label="用户名">{{ user.name }}</yh-descriptions-item>
    <yh-descriptions-item label="邮箱">{{ user.email }}</yh-descriptions-item>
    <yh-descriptions-item label="注册时间">{{ user.createdAt }}</yh-descriptions-item>
  </yh-descriptions>
</template>

<script setup>
// 在 Nuxt 中, 组件自动导入, 无需手动引入
const user = ref({
  name: 'YH-Admin-Edge',
  email: 'test@example.com',
  createdAt: '2024-01-01'
})
<\/script>`
</script>

成组展示多个只读字段，常见于详情页的信息展示。

## 基础用法

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-descriptions title="应用详情">
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions title="应用详情" border style="margin-top: 20px">
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>


## 不同尺寸

<DemoBlock title="不同尺寸" :ts-code="tsSize" :js-code="jsSize">
  <yh-radio-group v-model="size" style="margin-bottom: 20px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>

  <yh-descriptions
    title="垂直带边框布局"
    :column="3"
    :size="size"
    border
    direction="vertical"
  >
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>

  <yh-descriptions
    title="垂直无边框布局"
    :column="3"
    :size="size"
    direction="vertical"
    style="margin-top: 20px"
  >
    <yh-descriptions-item label="应用标识">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

## 长文本内容

当描述项包含长文本内容时，组件会自动换行并正确显示。

<DemoBlock title="长文本内容" :ts-code="tsLongContent" :js-code="jsLongContent">
  <yh-descriptions title="长文本内容展示" :column="2" border>
    <yh-descriptions-item label="商品名称">
      Apple MacBook Pro 16英寸 M3 Max芯片 笔记本电脑
    </yh-descriptions-item>
    <yh-descriptions-item label="商品价格">
      ¥29,999.00
    </yh-descriptions-item>
    <yh-descriptions-item label="商品描述" :span="2">
      搭载 M3 Max 芯片，配备 14 核中央处理器、30 核图形处理器和 16 核神经网络引擎。拥有最高可达 128GB 的统一内存和最高可达 8TB 的存储空间。16.2 英寸 Liquid 视网膜 XDR 显示屏，峰值亮度高达 1600 尼特，支持 ProMotion 自适应刷新率技术和原彩显示。MagSafe 3 充电端口、三个雷雳 4 端口、HDMI 端口、SDXC 卡插槽、高阻抗耳机插孔。六扬声器音响系统，支持空间音频。1080p FaceTime 高清摄像头。触控 ID。妙控键盘，配备全尺寸功能键行（包括触控 ID）。力度触控板。最长可达 22 小时的电池续航。
    </yh-descriptions-item>
    <yh-descriptions-item label="商品标签">
      <yh-tag type="success" size="small" style="margin-right: 4px">官方正品</yh-tag>
      <yh-tag type="warning" size="small" style="margin-right: 4px">限时特惠</yh-tag>
      <yh-tag type="danger" size="small">热销爆款</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="商品状态">
      <yh-tag type="success">在售</yh-tag>
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

## 自定义样式

<DemoBlock title="自定义样式" :ts-code="tsCustomStyle" :js-code="jsCustomStyle">
  <yh-descriptions title="核心性能面板" :column="3" border>
    <template #extra>
      <yh-button type="primary" link>Operation</yh-button>
    </template>
    <yh-descriptions-item
      label="应用标识"
      label-align="right"
      align="center"
      :label-style="{ color: '#409eff', fontWeight: 'bold' }"
      :content-style="{ backgroundColor: 'rgba(64, 158, 255, 0.1)' }"
    >
      YH-Admin-Edge
    </yh-descriptions-item>
    <yh-descriptions-item label="系统版本">v2.5.4-Stable</yh-descriptions-item>
    <yh-descriptions-item label="运行节点">Production-Cluster-01</yh-descriptions-item>
    <yh-descriptions-item label="健康状态">
      <yh-tag size="small">运行中</yh-tag>
    </yh-descriptions-item>
    <yh-descriptions-item label="访问入口" :span="2">
      No.1188, Wuzhong Avenue, Wuzhong District, Production-Cluster-01, Jiangsu Province
    </yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

## 在 Nuxt 中使用

Descriptions 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-descriptions title="用户详情" border>
    <yh-descriptions-item label="用户名">YH-Admin-Edge</yh-descriptions-item>
    <yh-descriptions-item label="邮箱">test@example.com</yh-descriptions-item>
    <yh-descriptions-item label="注册时间">2024-01-01</yh-descriptions-item>
  </yh-descriptions>
</DemoBlock>

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ 插槽内容完整渲染
- ✅ 动态尺寸切换正常工作
- ✅ 自定义样式 SSR 安全

::: tip SSR 安全性
Descriptions 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列表标题 | `string` | — |
| extra | 操作区文本，也可通过 `extra` 插槽传入 | `string` | — |
| border | 是否带有边框 | `boolean` | `false` |
| column | 一行显示的列数 | `number` | `3` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 列表尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| colon | 是否显示冒号（无边框时生效） | `boolean` | `true` |
| label-style | 自定义标签样式 | `CSSProperties` | — |
| content-style | 自定义内容样式 | `CSSProperties` | — |
| label-class-name | 自定义标签类名 | `string` | — |
| content-class-name | 自定义内容类名 | `string` | — |

### Item Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | — |
| span | 列的数量 | `number` | `1` |
| width | 列的宽度，不同布局模式下生效 | `string \| number` | — |
| min-width | 列的最小宽度 | `string \| number` | — |
| align | 列的内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| label-align | 列的标签对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| class-name | 自定义内容列类名 | `string` | — |
| label-class-name | 自定义标签列类名 | `string` | — |
| label-style | 自定义标签样式 | `CSSProperties` | — |
| content-style | 自定义内容样式 | `CSSProperties` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 描述列表内容，通常是 `YhDescriptionsItem` |
| title | 自定义标题，会覆盖 `title` 属性 |
| extra | 自定义操作区，会覆盖 `extra` 属性 |

### Item Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 描述项内容 |
| label | 自定义标签内容，会覆盖 `label` 属性 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| — | 暂无暴露属性 | — |

## 主题变量

Descriptions 组件使用以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-descriptions-header-margin-bottom` | 标题与内容的间距 | `20px` |
| `--yh-descriptions-title-font-size` | 标题字体大小 | `16px` |
| `--yh-descriptions-extra-font-size` | 操作区字体大小 | `14px` |
| `--yh-descriptions-border-color` | 边框颜色 | `var(--yh-border-color-lighter)` |
| `--yh-descriptions-item-font-size` | 单元格字体大小 | — |
| `--yh-descriptions-cell-padding-v` | 单元格垂直内边距 | — |
| `--yh-descriptions-cell-padding-h` | 单元格水平内边距 | — |

::: tip 尺寸系统变量
组件的 `size` 属性会自动切换 `--yh-descriptions-item-font-size` 以及内边距变量。这些变量在内部关联了 YH-UI 的通用尺寸系统（如 `--yh-component-size-default-padding` 等），以保证全库尺寸的一致性。
:::
