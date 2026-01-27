<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const pending = ref(true)
const showGlass = ref(false)
const showFullScreen = ref(false)
const isLoading = ref(false)

const triggerLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const triggerFullScreen = () => {
  showFullScreen.value = true
  setTimeout(() => {
    showFullScreen.value = false
  }, 3000)
}

const tsBasic = `<template>
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-spin size="small" />
    <yh-spin />
    <yh-spin size="large" />
    <yh-spin :size="64" />
  </div>
</template>`

const jsBasic = tsBasic

const tsDot = `<template>
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-spin dot size="small" />
    <yh-spin dot />
    <yh-spin dot size="large" />
  </div>
</template>`

const jsDot = tsDot

const tsType = `<template>
  <div style="display: flex; gap: 48px; flex-wrap: wrap; align-items: center;">
    <yh-spin type="circle" tip="Circle (默认)" />
    <yh-spin type="chaser" tip="Chaser" />
    <yh-spin type="gear" tip="Gear" />
    <yh-spin type="dual-ring" tip="Dual Ring" />
    <yh-spin type="rect" tip="Rect" />
  </div>
</template>`

const jsType = tsType

const tsTip = `<template>
  <div style="display: flex; gap: 48px;">
    <yh-spin tip="正在加载中..." />
    <yh-spin vertical tip="正在优化资源..." />
  </div>
</template>`

const jsTip = tsTip

const tsColor = `<template>
  <div style="display: flex; gap: 48px; align-items: center;">
    <yh-spin color="#f56c6c" tip="紧急处理中" />
    <yh-spin color="#67c23a" tip="正常同步中" />
    <!-- 更加鲜明的渐变色配合大尺寸 -->
    <yh-spin 
      size="large"
      color="linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" 
      tip="极光渐变" 
    />
    <yh-spin 
      dot
      size="large"
      color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
      tip="暖阳点阵" 
    />
  </div>
</template>`

const jsColor = tsColor

const tsGlass = `<template>
  <div style="border: 1px solid var(--yh-border-color); border-radius: 12px; overflow: hidden; background: var(--yh-bg-color-page);">
    <!-- 控制栏 -->
    <div style="padding: 16px; border-bottom: 1px solid var(--yh-border-color); display: flex; gap: 12px; background: var(--yh-bg-color);">
      <yh-button type="primary" size="small" @click="showGlass = true">开启局部遮罩</yh-button>
      <yh-button size="small" @click="triggerFullScreen">开启全屏遮罩</yh-button>
    </div>

    <!-- 内容区域 - 使用 Spin 包裹 -->
    <yh-spin :show="showGlass" glass tip="正在安全加密渲染...">
      <div style="padding: 24px; position: relative; min-height: 150px;">
        <!-- 关闭按钮 -->
        <div v-if="showGlass" style="position: absolute; top: 12px; right: 12px; z-index: 2001;">
          <yh-button size="small" @click="showGlass = false">关闭遮罩</yh-button>
        </div>

        <div style="color: var(--yh-text-color-primary);">
          <h4 style="margin-top: 0;">商业秘密保护区域</h4>
          <p style="font-size: 14px; color: var(--yh-text-color-secondary); line-height: 1.6; margin-bottom: 0;">
            这是应用了 Glass 模式的局部容器。在某些敏感操作（如密钥生成、财务导出）执行时，
            通过开启高斯模糊遮罩可以有效防止背景内容泄露，并锁定当前区域的操作。
          </p>
        </div>
      </div>
    </yh-spin>

    <!-- 全屏 Teleport 演示 -->
    <Teleport to="body">
      <yh-spin :show="showFullScreen" glass tip="正在进行全屏锁定校验..." style="position: fixed;" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showGlass = ref(false)
const showFullScreen = ref(false)

const triggerFullScreen = () => {
  showFullScreen.value = true
  setTimeout(() => {
    showFullScreen.value = false
  }, 3000)
}
<\/script>`

const jsGlass = tsGlass.replace('lang="ts"', '')

const tsDelay = `<template>
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-button @click="triggerLoading">开始模拟请求</yh-button>
    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>无延迟: </span>
        <yh-spin :show="isLoading" size="small" />
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>500ms 延迟: </span>
        <yh-spin :show="isLoading" :delay="500" size="small" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isLoading = ref(false)
const triggerLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000) // 模拟快速请求
}
<\/script>`

const jsDelay = tsDelay.replace('lang="ts"', '')

const tsContainer = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-spin :show="loading" tip="正在努力加载数据...">
      <div style="padding: 32px; border: 1px solid var(--yh-border-color); border-radius: 12px; background: var(--yh-bg-color);">
        <h4 style="margin: 0 0 16px 0;">数据看板</h4>
        <p>这是被 Spin 包裹的内容区域。切换下方按钮可以控制加载状态的显示与隐藏。</p>
        <p>当开启加载时，内容区域会自动应用高斯模糊滤镜并显示加载动画。</p>
      </div>
    </yh-spin>
    
    <div>
      <yh-button type="primary" @click="loading = !loading">
        切换加载状态: {{ loading ? '关闭' : '开启' }}
      </yh-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const jsContainer = tsContainer.replace('lang="ts"', '')

const tsCustom = `<template>
  <yh-spin :show="true">
    <template #tip>
      <div style="color: #409eff; font-family: monospace;">
        [SYSTEM] 正在扫描磁盘... 80%
      </div>
    </template>
  </yh-spin>
</template>`

const jsCustom = tsCustom

const tsNuxt = `<template>
  <!-- Nuxt 自动导入支持 -->
  <yh-spin :show="pending" tip="请求响应中..." />
</template>

<script setup lang="ts">
// 配合 Nuxt 的 useLazyFetch 或 useFetch 使用
const { pending, data } = await useLazyFetch('/api/data')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

# Spin 加载中

用于页面、卡片或局部区域的加载反馈。YH-UI 的 Spin 采用极简设计，不仅支持标准的 SVG 动画，还提供了动感的点状（Dot）模式。

## 基础用法

提供标准 SVG 动画，有多种尺寸可选，也支持显式传入数字像素值。

<DemoBlock title="尺寸选项" :ts-code="tsBasic" :js-code="jsBasic">
<div style="display: flex; gap: 32px; align-items: center; padding: 10px 0;">
<yh-spin size="small" />
<yh-spin />
<yh-spin size="large" />
<yh-spin :size="64" />
</div>
</DemoBlock>

## 点状模式

借鉴业内优秀组件库的 4 点旋转模式，视觉更加灵动且具备节奏感。

<DemoBlock title="Dot 模式" :ts-code="tsDot" :js-code="jsDot">
<div style="display: flex; gap: 32px; align-items: center; padding: 10px 0;">
<yh-spin dot size="small" />
<yh-spin dot />
<yh-spin dot size="large" />
</div>
</DemoBlock>

## 旗舰级动效

除了基础的环形动画，YhSpin 还提供了多种旗舰级的 SVG 动效，满足不同场景下的视觉审美需求。

<DemoBlock title="动效类型" :ts-code="tsType" :js-code="jsType">
<div style="display: flex; gap: 48px; flex-wrap: wrap; align-items: center; padding: 10px 0;">
<yh-spin type="circle" tip="Circle (默认)" />
<yh-spin type="chaser" tip="Chaser" />
<yh-spin type="gear" tip="Gear" />
<yh-spin type="dual-ring" tip="Dual Ring" />
<yh-spin type="rect" tip="Rect" />
</div>
</DemoBlock>

## 描述文字与排列

支持添加描述文字，并可切换水平或垂直排列。

<DemoBlock title="描述文字" :ts-code="tsTip" :js-code="jsTip">
<div style="display: flex; gap: 48px; padding: 10px 0;">
<yh-spin tip="正在加载中..." />
<yh-spin vertical tip="正在优化资源..." />
</div>
</DemoBlock>

## 色彩定制

支持自定义颜色，甚至可以传入 CSS 渐变值来实现更高级的视觉效果。

<DemoBlock title="色彩定制" :ts-code="tsColor" :js-code="jsColor">
<div style="display: flex; gap: 48px; align-items: center; padding: 10px 0;">
<yh-spin color="#f56c6c" tip="紧急处理中" />
<yh-spin color="#67c23a" tip="正常同步中" />
<yh-spin 
size="large"
color="linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" 
tip="极光渐变" 
/>
<yh-spin 
dot
size="large"
color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
tip="暖阳点阵" 
/>
</div>
</DemoBlock>

## Glass 遮罩模式

通过 `glass` 属性可以开启全屏或局部区域的高斯模糊遮罩效果，常用于页面重要操作后的状态锁定。

<DemoBlock title="Glass 遮罩" :ts-code="tsGlass" :js-code="jsGlass">
<div style="border: 1px solid var(--yh-border-color); border-radius: 12px; overflow: hidden; background: var(--yh-bg-color-page);">
<div style="padding: 16px; border-bottom: 1px solid var(--yh-border-color); display: flex; gap: 12px; background: var(--yh-bg-color);">
<yh-button type="primary" size="small" @click="showGlass = true">开启局部遮罩</yh-button>
<yh-button size="small" @click="triggerFullScreen">开启全屏遮罩</yh-button>
</div>
<yh-spin :show="showGlass" glass tip="正在安全加密渲染...">
<div style="padding: 24px; position: relative; min-height: 150px;">
<div v-if="showGlass" style="position: absolute; top: 12px; right: 12px; z-index: 2001;">
<yh-button size="small" @click="showGlass = false">关闭遮罩</yh-button>
</div>
<div style="color: var(--yh-text-color-primary);">
<h4 style="margin-top: 0;">商业秘密保护区域</h4>
<p style="font-size: 14px; color: var(--yh-text-color-secondary); line-height: 1.6; margin-bottom: 0;">
这是应用了 Glass 模式的局部容器。在某些敏感操作（如密钥生成、财务导出）执行时，
通过开启高斯模糊遮罩可以有效防止背景内容泄露，并锁定当前区域的操作。
</p>
</div>
</div>
</yh-spin>
<Teleport to="body">
<yh-spin :show="showFullScreen" glass tip="正在进行全屏锁定校验..." style="position: fixed;" />
</Teleport>
</div>
</DemoBlock>

## 延迟显示 (防闪烁)

对于某些响应极快的请求（如 < 100ms），如果立即显示加载动画，可能会造成视觉上的“闪烁”不适感。通过 `delay` 属性可以设置延迟显示时间。

<DemoBlock title="延迟显示" :ts-code="tsDelay" :js-code="jsDelay">
<div style="display: flex; gap: 32px; align-items: center; padding: 10px 0;">
<yh-button @click="triggerLoading">开始模拟请求</yh-button>
<div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span>无延迟: </span>
<yh-spin :show="isLoading" size="small" />
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span>500ms 延迟: </span>
<yh-spin :show="isLoading" :delay="500" size="small" />
</div>
</div>
</div>
</DemoBlock>

## 容器场景 (高级用法)

可以将 Spin 作为容器组件使用，包裹其他内容。当 `show` 为 `true` 时，容器会自动进入加载状态并应用高斯模糊。

<DemoBlock title="容器包裹" :ts-code="tsContainer" :js-code="jsContainer">
<div style="display: flex; flex-direction: column; gap: 16px; padding: 10px 0;">
<yh-spin :show="loading" tip="正在努力加载数据...">
<div style="padding: 32px; border: 1px solid var(--yh-border-color); border-radius: 12px; background: var(--yh-bg-color);">
<h4 style="margin: 0 0 16px 0;">数据看板</h4>
<p>这是被 Spin 包裹的内容区域。切换下方按钮可以控制加载状态的显示与隐藏。</p>
<p>当开启加载时，内容区域会自动应用高斯模糊滤镜并显示加载动画。</p>
</div>
</yh-spin>
<div>
<yh-button type="primary" @click="loading = !loading">
切换加载状态: {{ loading ? '关闭' : '开启' }}
</yh-button>
</div>
</div>
</DemoBlock>

## 自定义插槽

通过 `tip` 插槽可以完全自定义描述文字区域的内容。

<DemoBlock title="插槽自定义" :ts-code="tsCustom" :js-code="jsCustom">
<div style="padding: 10px 0;">
<yh-spin :show="true">
<template #tip>
<div style="color: #409eff; font-family: monospace;">
[SYSTEM] 正在扫描磁盘... 80%
</div>
</template>
</yh-spin>
</div>
</DemoBlock>

## 在 Nuxt 中使用

`Spin` 完全兼容 Nuxt 3/4 环境。在 Nuxt 项目中，组件会自动导入，您可以配合 `useFetch` 等异步 API 轻松实现全屏或局部加载效果。

<DemoBlock title="Nuxt 使用示例" :ts-code="tsNuxt" :js-code="jsNuxt">
<div style="padding: 10px 0;">
<yh-spin :show="pending" tip="请求响应中..." />
</div>
</DemoBlock>

::: tip SSR 渲染表现
Spin 组件在 SSR 服务端渲染时默认不会渲染 Spinner 动画，直到客户端 Hydration 完成后才会根据状态显示，确保不影响首屏解析性能。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否开启加载状态 | `boolean` | `true` |
| tip | 描述文字 | `string` | - |
| size | 尺寸，支持关键词或自定义 px 长度 | `'small' \| 'default' \| 'large' \| number` | `'default'` |
| vertical | 是否垂直排列图标与文字 | `boolean` | `false` |
| delay | 延迟显示时间 (ms)，防闪烁 | `number` | `0` |
| glass | 是否开启全屏 glass 遮罩模式 | `boolean` | `false` |
| dot | 是否使用点状动画逻辑 | `boolean` | `false` |
| type | 加载动画样式类型。可选：`circle`, `chaser`, `gear`, `dual-ring`, `rect` | `LoadingSpinnerType` | `'circle'` |
| color | 自定义颜色 (支持十六进制、RGB、CSS 渐变字符串或渐变配置对象) | `string \| string[] \| Record<string, string>` | - |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| show | 加载状态显示时触发 | - |
| hide | 加载状态隐藏时触发 | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 包裹的内容。若存在此插槽，Spin 将作为容器模式运行 |
| tip | 自定义描述文字区域 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| visible | 当前动画是否处于可见状态 | `ComputedRef<boolean>` |

### 主题变量 (CSS Variables)

组件支持通过以下变量自定义特定样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-spin-color` | 加载图标的基础颜色 | `var(--yh-color-primary)` |
| `--yh-spin-blur-radius` | 容器模式下的模糊半径 | `8px` |
| `--yh-spin-mask-bg` | 容器模式下的遮罩背景色 | `rgba(255, 255, 255, 0.4)` |
| `--yh-spin-mask-bg-dark` | 暗色模式下的遮罩背景色 | `rgba(0, 0, 0, 0.3)` |
| `--yh-spin-gradient` | 渐变模式下的 CSS 背景值 | - |

