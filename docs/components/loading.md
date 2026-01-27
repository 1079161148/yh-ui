<script setup lang="ts">
import { ref, h } from 'vue'
import { YhLoading, vYhLoading, type LoadingSpinnerType } from '../../packages/components/src/loading'

// --- 演示逻辑 ---
const loadingBasic = ref(true)
const loadingGlass = ref(true)
const loadingDot = ref(true)
const loadingModifier = ref(false)

const openFullScreen = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: '正在同步全球核心数据...',
    lock: true
  })
  setTimeout(() => instance.close(), 2000)
}

const openGlassFullScreen = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    glass: true,
    text: '亚克力玻璃沉浸式加载',
    background: 'rgba(255, 255, 255, 0.1)'
  })
  setTimeout(() => instance.close(), 2000)
}

const openCustomSpinner = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: '自定义颜色与渐变',
    color: ['#00d2ff', '#3a7bd5'],
    glass: true
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremium = (type: LoadingSpinnerType) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: `正在应用 ${type} 旗舰样式...`,
    glass: true,
    color: ['#00d2ff', '#3a7bd5']
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremiumColored = (type: LoadingSpinnerType, colors: string[]) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: '绚丽色彩加载中...',
    glass: true,
    color: colors
  })
  setTimeout(() => instance.close(), 2000)
}

const openCustomVNodeLoading = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: '自定义 VNode 扩展演示',
    glass: true,
    spinner: h('div', { class: 'custom-logo-loading' }, [
      h('div', { class: 'logo-inner' }, 'YH')
    ])
  })
  setTimeout(() => instance.close(), 2500)
}

const loadingFullscreen = ref(false)
const loadingAttr = ref(false)

const openDirectiveFullscreen = () => {
  loadingFullscreen.value = true
  setTimeout(() => {
    loadingFullscreen.value = false
  }, 2000)
}

// --- 代码片段定义 ---
const tsBasic = `<template>
  <yh-button @click="loading = !loading" style="margin-bottom: 16px;">
    切换加载状态
  </yh-button>
  <div 
    v-yh-loading="loading" 
    yh-loading-text="正在读取容器数据..."
    style="height: 180px; border: 1px solid var(--yh-border-color-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page);"
  >
    <div style="color: var(--yh-text-color-secondary)">这里是容器内容</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const tsDirectiveFullscreen = `<template>
  <yh-button 
    @click="openLoading"
  >
    全屏加载 (.fullscreen.lock)
  <\/yh-button>

  <!-- 指令全屏通常绑定在 body 或特定开关上 -->
  <div v-yh-loading.fullscreen.lock="loading"><\/div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const openLoading = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
<\/script>`

const tsDirectiveAttributes = `<template>
  <div 
    v-yh-loading="loading"
    yh-loading-text="正在为您极速加载..."
    yh-loading-type="chaser"
    yh-loading-color="#00d2ff"
    yh-loading-background="rgba(0, 0, 0, 0.8)"
    style="height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a;"
  >
    <div style="color: #666">这里是深色容器背景</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const tsDirectiveGlass = `<template>
  <div 
    v-yh-loading="loading"
    yh-loading-glass
    yh-loading-text="亚克力玻璃指令遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <div class="demo-card">
      <h4>系统核心看板</h4>
      <p>正在通亚克力玻璃滤镜渲染实时数据流...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const tsDirectiveDot = `<template>
  <div 
    v-yh-loading="loading"
    yh-loading-dot
    yh-loading-text="正在加载容器..."
    class="demo-rich-container"
  >
    <div class="demo-card" style="background: var(--yh-bg-color);">
      <h4>资产管理队列</h4>
      <p>点状加载模式适配轻量级容器反馈</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const tsDirectiveCustomClass = `<template>
  <div 
    v-yh-loading="loading"
    yh-loading-custom-class="my-custom-mask"
    yh-loading-text="自定义风格遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);"
  >
    <div class="demo-card">
      <h4>自定义深度定制</h4>
      <p>正在应用 my-custom-mask 类名提供的特殊滤镜...</p>
    </div>
  </div>
</template>

<style>
.my-custom-mask {
  background-color: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(4px) sepia(1) hue-rotate(180deg) !important;
}
<\/style>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const tsComposition = `<template>
  <yh-button @click="openLoading">点击触发全屏加载</yh-button>
</template>

<script setup lang="ts">
import { YhLoading } from 'yh-ui'

const openLoading = () => {
  const loading = YhLoading.service({
    fullscreen: true,
    text: '自定义颜色与渐变',
    color: ['#00d2ff', '#3a7bd5'],
    glass: true
  })
  setTimeout(() => loading.close(), 2000)
}
<\/script>`

const tsOptions = `<template>
  <yh-button @click="handleLoading">点击演示全局挂载</yh-button>
</template>

<script lang="ts">
export default {
  methods: {
    handleLoading() {
      // 注册插件后，可通过 this.$loading 访问
      const loading = this.$loading({
        fullscreen: true,
        text: '正在同步全球核心数据...',
        lock: true
      })
      setTimeout(() => loading.close(), 2000)
    }
  }
}
<\/script>`

const tsNuxt = `// plugins/yh-ui.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(YhLoading)
})

// 业务页面使用
// const { $loading } = useNuxtApp()
// const instance = $loading({ lock: true })
`

const jsNuxt = `// plugins/yh-ui.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(YhLoading)
})

// 业务页面使用
// const { $loading } = useNuxtApp()
// const instance = $loading({ lock: true })
`

const tsPremium = `<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">Chaser (追逐)</yh-button>
    <yh-button @click="openPremium('gear')">Gear (齿轮)</yh-button>
    <yh-button @click="openPremium('dual-ring')">Dual Ring (双环)</yh-button>
    <yh-button @click="openPremium('rect')">Rect (矩阵)</yh-button>
  </div>
</template>

<script setup lang="ts">
import { YhLoading, type LoadingSpinnerType } from 'yh-ui'

const openPremium = (type: LoadingSpinnerType) => {
  YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    glass: true
  })
}
<\/script>`

const tsPremiumColor = `<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openColor('chaser', ['#ff4e50', '#f9d423'])">日落</yh-button>
    <yh-button @click="openColor('gear', ['#56ab2f', '#a8e063'])">新翠</yh-button>
    <yh-button @click="openColor('rect', ['#8e2de2', '#4a00e0'])">深邃</yh-button>
    <yh-button @click="openColor('dual-ring', ['#f80759', '#bc4e9c'])">霓虹</yh-button>
  </div>
</template>

<script setup lang="ts">
import { YhLoading, type LoadingSpinnerType } from 'yh-ui'

const openColor = (type: LoadingSpinnerType, colors: string[]) => {
  YhLoading.service({
    spinnerType: type,
    color: colors,
    glass: true
  })
}
<\/script>`

const tsCustomSpinner = `<template>
  <yh-button @click="openCustom">展示自定义 VNode</yh-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { YhLoading } from 'yh-ui'

const openCustom = () => {
  YhLoading.service({
    spinner: h('div', { class: 'custom-logo-loading' }, [
      h('div', { class: 'logo-inner' }, 'YH')
    ]),
    glass: true
  })
}
<\/script>

<style>
.custom-logo-loading {
  width: 60px; height: 60px; background: var(--yh-color-primary);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 24px;
  box-shadow: 0 8px 16px var(--yh-color-primary-light-5);
  animation: custom-pulse 1.5s infinite ease-in-out;
}
@keyframes custom-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
<\/style>`

const tsContext = `<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { YhLoading } from 'yh-ui'

// 在 setup 方法中
const { appContext } = getCurrentInstance()!

YhLoading.service({}, appContext)
<\/script>`

const toJs = (code: string) => code
  .replace(/setup lang="ts"/g, 'setup')
  .replace(/lang="ts"/g, '')
  .replace(/:\s*[A-Za-z0-9\s|\[\]<>?.]+?(?=[),=]|$)/g, '')
  .replace(/as\s+[A-Z][a-zA-Z0-9<>| ]+/g, '')
  .replace(/type\s+\w+\s*=\s*[^;]+;?/g, '')
  .replace(/,\s*type\s+\w+/g, '')
  .replace(/\.ts(?=\n|\r|'|")/g, '.js')

const tsAxios = `import axios from 'axios'
import { YhLoading, type LoadingInstance } from 'yh-ui'

let loadingInstance: LoadingInstance | null = null
let requestCount = 0

const showLoading = () => {
  if (requestCount === 0) {
    loadingInstance = YhLoading.service({
      lock: true,
      text: '数据加载中...',
      glass: true
    })
  }
  requestCount++
}

const hideLoading = () => {
  requestCount--
  if (requestCount <= 0) {
    loadingInstance?.close()
    loadingInstance = null
  }
}

const service = axios.create({ baseURL: '/api', timeout: 5000 })

service.interceptors.request.use(config => {
  showLoading()
  return config
}, error => {
  hideLoading()
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  hideLoading()
  return response
}, error => {
  hideLoading()
  return Promise.reject(error)
})`

const jsAxios = `import axios from 'axios'
import { YhLoading } from 'yh-ui'

let loadingInstance = null
let requestCount = 0

const showLoading = () => {
  if (requestCount === 0) {
    loadingInstance = YhLoading.service({
      lock: true,
      text: '数据加载中...',
      glass: true
    })
  }
  requestCount++
}

const hideLoading = () => {
  requestCount--
  if (requestCount <= 0) {
    loadingInstance?.close()
    loadingInstance = null
  }
}

const service = axios.create({ baseURL: '/api', timeout: 5000 })

service.interceptors.request.use(config => {
  showLoading()
  return config
}, error => {
  hideLoading()
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  hideLoading()
  return response
}, error => {
  hideLoading()
  return Promise.reject(error)
})`
</script>

# Loading 加载

加载数据时显示的遮罩层。具备旗舰级亚克力视觉效果，完美适配 Nuxt 3/4。

## Loading 与 Spin 的关系

`Loading` 是 YH-UI 提供的指令与服务封装，而 `Spin` 是其核心 UI 组件。

-   **底层核心 (`Spin`)**：负责加载动画（SVG/Dot/Chaser/Gear）的视觉呈现与文字排列。它是一个纯粹的 Vue 组件。
-   **高层封装 (`Loading`)**：基于 `Spin` 构建的增强方案，提供了**指令**与**命令式服务**，专门用于处理全屏遮罩、锁定滚动、动态挂载等交互。



## 调用方式

### 区域加载 (指令版)

通过 `v-yh-loading` 指令可以快速在宿主元素上覆盖一层加载遮罩。

<DemoBlock title="基础用法" inverse :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-button @click="loadingBasic = !loadingBasic" style="margin-bottom: 16px;">
    切换加载状态
  </yh-button>
  <div 
    v-yh-loading="loadingBasic" 
    yh-loading-text="正在读取容器数据..."
    style="height: 180px; border: 1px solid var(--yh-border-color-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page);"
  >
    <div style="color: var(--yh-text-color-secondary)">这里是容器内容</div>
  </div>
</DemoBlock>

### 指令进阶用法

通过修饰符 `.fullscreen`、`.lock`、`.glass` 以及扩展属性 `yh-loading-*`，可以实现更复杂的加载交互。

<DemoBlock title="指令全屏与锁定" :ts-code="tsDirectiveFullscreen" :js-code="toJs(tsDirectiveFullscreen)">
  <yh-button @click="openDirectiveFullscreen">点击演示 .fullscreen.lock</yh-button>
  <div v-yh-loading.fullscreen.lock="loadingFullscreen"></div>
</DemoBlock>

<DemoBlock title="指令扩展属性" :ts-code="tsDirectiveAttributes" :js-code="toJs(tsDirectiveAttributes)">
  <yh-button @click="loadingAttr = !loadingAttr" style="margin-bottom: 16px;">
    切换局部自定义指令
  </yh-button>
  <div 
    v-yh-loading="loadingAttr"
    yh-loading-text="正在为您极速加载..."
    yh-loading-type="chaser"
    yh-loading-color="#00d2ff"
    yh-loading-background="rgba(0, 0, 0, 0.8)"
    style="height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a;"
  >
    <div style="color: #666">这里是深色容器背景</div>
  </div>
</DemoBlock>

<DemoBlock title="指令旗舰 Glass 模式" :ts-code="tsDirectiveGlass" :js-code="toJs(tsDirectiveGlass)">
  <div 
    v-yh-loading="true"
    yh-loading-glass
    yh-loading-text="亚克力玻璃指令遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <div class="demo-card">
      <h4 style="margin:0">系统核心看板</h4>
      <p style="margin:8px 0 0; font-size:14px;">正在通过亚克力玻璃滤镜渲染实时数据流...</p>
    </div>
  </div>
</DemoBlock>

<DemoBlock title="指令 Dot 模式" :ts-code="tsDirectiveDot" :js-code="toJs(tsDirectiveDot)">
  <div 
    v-yh-loading="true"
    yh-loading-dot
    yh-loading-text="正在加载容器..."
    class="demo-rich-container"
    style="background: var(--yh-bg-color-page);"
  >
    <div class="demo-card" style="background: var(--yh-bg-color);">
      <h4 style="margin:0">资产管理队列</h4>
      <p style="margin:8px 0 0; font-size:14px;">点状加载模式适配轻量级容器反馈</p>
    </div>
  </div>
</DemoBlock>

<DemoBlock title="指令自定义类名" :ts-code="tsDirectiveCustomClass" :js-code="toJs(tsDirectiveCustomClass)">
  <div 
    v-yh-loading="true"
    yh-loading-custom-class="my-custom-mask"
    yh-loading-text="自定义风格遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);"
  >
    <div class="demo-card">
      <h4 style="margin:0">自定义深度定制</h4>
      <p style="margin:8px 0 0; font-size:14px;">正在应用 my-custom-mask 类名提供的特殊滤镜...</p>
    </div>
  </div>
</DemoBlock>

### 组合式 API (推荐)

在 `script setup` 中使用 `YhLoading.service` 是最高效的调用方式。

<DemoBlock title="组合式 API 调用" :ts-code="tsComposition" :js-code="toJs(tsComposition)">
  <yh-button @click="openCustomSpinner">点击触发全屏加载</yh-button>
</DemoBlock>

### 选项式 API

在非 `setup` 环境下，可以通过原型上的 `$loading` 进行调用。

<DemoBlock title="选项式 API 调用" :ts-code="tsOptions" :js-code="toJs(tsOptions)">
  <yh-button @click="openFullScreen">点击演示全局挂载</yh-button>
</DemoBlock>

## 在 Axios 中使用

在实际项目中，通过结合 Axios 拦截器与“引用计数”方案，可以完美处理多个并发请求时的 Loading 状态，确保加载效果平滑。

<DemoBlock title="网络请求拦截示例" :ts-code="tsAxios" :js-code="jsAxios">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    该计数器方案确保：只有第一个请求会开启 Loading，而直到最后一个并发请求完成后才会关闭，有效防止界面闪烁。
  </p>
</DemoBlock>

## 旗舰级 Loading 样式

借鉴 [loading.io](https://loading.io/#editor) 的动感设计。

<DemoBlock title="旗舰动效" :ts-code="tsPremium" :js-code="toJs(tsPremium)">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">Chaser (追逐)</yh-button>
    <yh-button @click="openPremium('gear')">Gear (齿轮)</yh-button>
    <yh-button @click="openPremium('dual-ring')">Dual Ring (双环)</yh-button>
    <yh-button @click="openPremium('rect')">Rect (矩阵)</yh-button>
  </div>
</DemoBlock>

### 自定义色彩方案

支持单色、渐变色数组或 CSS 变量。

<DemoBlock title="多色动效" :ts-code="tsPremiumColor" :js-code="toJs(tsPremiumColor)">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremiumColored('chaser', ['#ff4e50', '#f9d423'])">日落</yh-button>
    <yh-button @click="openPremiumColored('gear', ['#56ab2f', '#a8e063'])">新翠</yh-button>
    <yh-button @click="openPremiumColored('rect', ['#8e2de2', '#4a00e0'])">深邃</yh-button>
    <yh-button @click="openPremiumColored('dual-ring', ['#f80759', '#bc4e9c'])">霓虹</yh-button>
  </div>
</DemoBlock>

### 完全自定义扩展 (VNode/Component)

YH-UI 允许跳过内置样式，通过 `spinner` 属性注入 any Vue 组件或 VNode，实现完全自主控制 Loading 呈现内容。

<DemoBlock title="自定义 VNode 演示" :ts-code="tsCustomSpinner" :js-code="toJs(tsCustomSpinner)">
  <yh-button @click="openCustomVNodeLoading">点击展示自定义 VNode 加载</yh-button>
</DemoBlock>

## 在 Nuxt 中使用

`YhLoading` 提供了完整的插件支持，在 Nuxt 环境中通过插件进行全局注册后，即可在 SSR/CSR 环境下无缝使用。

<DemoBlock title="Nuxt 插件注册" :ts-code="tsNuxt" :js-code="jsNuxt">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    通过插件注册后，指令 <code>v-yh-loading</code> 将自动成为全局可用，并可通过 <code>$loading</code> 访问服务。
  </p>
</DemoBlock>

## 应用程序上下文

现在 Loading 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 Loading 中，这将允许你继承应用程序的所有属性。

::: tip
如果您全局注册了 YhLoading 组件，它将自动继承应用的上下文环境。
:::

<DemoBlock title="应用上下文注入" :ts-code="tsContext" :js-code="toJs(tsContext)">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    通过传递 <code>appContext</code>，Loading 内部挂载的组件可以访问到全局注册的插件（如 Pinia、Router）以及全局组件。
  </p>
</DemoBlock>

## API

### LoadingOptions (Service 配置)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 挂载目标。支持 DOM 或 CSS 选择器 | `string \| HTMLElement` | `document.body` |
| body | 是否将遮罩插入至 body 元素（同 target: body） | `boolean` | `false` |
| fullscreen | 是否全屏（`position: fixed`） | `boolean` | `true` |
| lock | 是否锁定宿主元素的滚动 | `boolean` | `false` |
| text | 加载文案 | `string` | - |
| glass | 是否开启旗舰模式（亚克力玻璃效果） | `boolean` | `false` |
| background | 遮罩层背景颜色 | `string` | - |
| customClass | 自定义遮罩层类名 | `string` | - |
| spinner | 自定义图标/组件 (高于 `spinnerType`) | `string \| Component \| VNode` | - |
| spinnerType | 加载动画类型。可选：`circle`, `chaser`, `gear`, `dual-ring`, `rect` | `LoadingSpinnerType` | `circle` |
| color | 加载图标颜色，支持渐变色数组或 CSS 变量 | `string \| string[] \| object` | - |
| dot | 是否使用点状加载样式（Antd 风格） | `boolean` | `false` |

### 指令 Attributes (v-yh-loading)

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `yh-loading-text` | 加载文案 | `string` |
| `yh-loading-background` | 遮罩背景色 | `string` |
| `yh-loading-custom-class` | 自定义类名 | `string` |
| `yh-loading-glass` | 是否开启亚克力效果 | `boolean` |
| `yh-loading-dot` | 是否使用点状模式 | `boolean` |
| `yh-loading-color` | 图标颜色 | `string` |
| `yh-loading-type` | 动画类型 (`circle`, `chaser` 等) | `LoadingSpinnerType` |

### 指令 Modifiers (修饰符)

| 名称 | 说明 |
| --- | --- |
| `.fullscreen` | 等同于 `fullscreen: true` |
| `.lock` | 等同于 `lock: true` |
| `.glass` | 等同于 `glass: true` |

### LoadingInstance (服务实例方法)

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| `service` | 创建并显示加载遮罩 | `(options: LoadingOptions, appContext?: AppContext) => LoadingInstance` |
| `close` | 关闭并销毁遮罩实例 | `() => void` |
| `visible` | (Readonly) 获取当前遮罩的显示状态 | `boolean` |

### Slots (通过 spinner 属性注入时可用)

在使用 `<yh-spin>` 或单独引用组件时，支持以下插槽：
- `default`: 遮罩宿主内容
- `tip`: 自定义文字内容
- `icon`: 替代内置 Loading 图标

## 主题变量 (CSS Variables)

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-bg-color-overlay` | 基础遮罩背景颜色 | `rgba(255, 255, 255, 0.7)` |
| `--yh-spin-blur-radius` | 亚克力模糊半径 | `20px` |
| `--yh-loading-z-index` | 遮罩层级 | `2000` |

<style>
.custom-logo-loading {
  width: 60px; height: 60px; background: var(--yh-color-primary);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 24px;
  box-shadow: 0 8px 16px var(--yh-color-primary-light-5);
  animation: custom-pulse 1.5s infinite ease-in-out;
}
@keyframes custom-pulse {
  0% { transform: scale(1); box-shadow: 0 4px 8px var(--yh-color-primary-light-7); }
  50% { transform: scale(1.1); box-shadow: 0 12px 24px var(--yh-color-primary-light-3); }
  100% { transform: scale(1); box-shadow: 0 4px 8px var(--yh-color-primary-light-7); }
}
.demo-rich-container {
  height: 200px; border-radius: 12px; display: flex; 
  align-items: center; justify-content: center; padding: 20px;
  border: 1px solid var(--yh-border-color); overflow: hidden;
  position: relative;
}
.demo-card {
  padding: 16px; border-radius: 8px; box-shadow: var(--yh-shadow-light);
  width: 80%; text-align: center; color: var(--yh-text-color-primary);
}
.my-custom-mask {
  background-color: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(4px) sepia(1) hue-rotate(180deg) !important;
}
.my-custom-mask .yh-spin__tip {
  color: #fff !important;
}
</style>
