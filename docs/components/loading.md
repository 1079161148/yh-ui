# Loading

用于显示加载遮罩的服务与指令入口。它构建在 `YhSpin` 之上，主要通过 `YhLoading.service(...)` 和 `v-yh-loading` 指令使用。

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import { YhLoading } from '../../packages/components/src/loading'
import type { LoadingSpinnerType } from '../../packages/components/src/spin'

const loadingBasic = ref(true)
const loadingFullscreen = ref(false)
const loadingAttr = ref(true)

const openFullScreen = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: '正在同步全局核心数据...',
    lock: true
  })
  setTimeout(() => instance.close(), 2000)
}

const openGlassFullScreen = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    glass: true,
    text: '亚克力玻璃沉浸式加载中',
    background: 'rgba(255, 255, 255, 0.1)'
  })
  setTimeout(() => instance.close(), 2000)
}

const openCustomSpinner = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: '应用自定义颜色与渐变中',
    color: ['#00d2ff', '#3a7bd5'],
    glass: true
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremium = (type: LoadingSpinnerType) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: `正在应用 ${type} 高级动画风格...`,
    glass: true,
    color: ['#00d2ff', '#3a7bd5']
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremiumColored = (type: LoadingSpinnerType, colors: string[]) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: '正在使用绚丽配色加载...',
    glass: true,
    color: colors
  })
  setTimeout(() => instance.close(), 2000)
}

const openCustomVNodeLoading = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: '自定义 VNode 扩展示例',
    glass: true,
    spinner: h('div', { class: 'custom-logo-loading' }, [
      h('div', { class: 'logo-inner' }, 'YH')
    ])
  })
  setTimeout(() => instance.close(), 2500)
}

const openDirectiveFullscreen = () => {
  loadingFullscreen.value = true
  setTimeout(() => {
    loadingFullscreen.value = false
  }, 2000)
}

const tsBasic = `<${_T}>
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
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</${_S}>`

const tsDirectiveFullscreen = `<${_T}>
  <yh-button @click="openLoading">
    全屏 Loading（.fullscreen.lock）
  </yh-button>

  <div v-yh-loading.fullscreen.lock="loading"></div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const openLoading = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</${_S}>`

const tsDirectiveAttributes = `<${_T}>
  <div 
    v-yh-loading="loading"
    yh-loading-text="正在快速加载..."
    yh-loading-type="chaser"
    yh-loading-color="#00d2ff"
    yh-loading-background="rgba(0, 0, 0, 0.8)"
    style="height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a;"
  >
    <div style="color: #666">这是深色容器背景</div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</${_S}>`

const tsDirectiveGlass = `<${_T}>
  <div 
    v-yh-loading="true"
    yh-loading-glass
    yh-loading-text="亚克力玻璃指令遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <div class="demo-card">
      <h4>系统核心看板</h4>
      <p>通过亚克力玻璃滤镜渲染实时数据流...</p>
    </div>
  </div>
</${_T}>`

const tsDirectiveDot = `<${_T}>
  <div 
    v-yh-loading="true"
    yh-loading-dot
    yh-loading-text="正在加载容器..."
    class="demo-rich-container"
    style="background: var(--yh-bg-color-page);"
  >
    <div class="demo-card" style="background: var(--yh-bg-color);">
      <h4>资源管理队列</h4>
      <p>点状加载模式适合轻量级容器反馈</p>
    </div>
  </div>
</${_T}>`

const tsDirectiveCustomClass = `<${_T}>
  <div 
    v-yh-loading="true"
    yh-loading-custom-class="my-custom-mask"
    yh-loading-text="自定义样式遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);"
  >
    <div class="demo-card">
      <h4>深度定制</h4>
      <p>通过 my-custom-mask 类名应用特殊滤镜效果...</p>
    </div>
  </div>
</${_T}>

<${_St}>
.my-custom-mask {
  background-color: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(4px) sepia(1) hue-rotate(180deg) !important;
}
</${_St}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</${_S}>`

const tsComposition = `<${_S} setup lang="ts">
import { YhLoading } from '@yh-ui/yh-ui'

const openLoading = () => {
  const loading = YhLoading.service({
    fullscreen: true,
    text: '应用自定义颜色与渐变中',
    color: ['#00d2ff', '#3a7bd5'],
    glass: true
  })
  setTimeout(() => loading.close(), 2000)
}
</${_S}>

<${_T}>
  <yh-button @click="openLoading">点击触发全屏 Loading</yh-button>
</${_T}>`

const tsPremium = `<${_T}>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">追逐环</yh-button>
    <yh-button @click="openPremium('gear')">齿轮</yh-button>
    <yh-button @click="openPremium('dual-ring')">双环</yh-button>
    <yh-button @click="openPremium('rect')">矩形</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { YhLoading } from '@yh-ui/yh-ui'

const openPremium = (type) => {
  YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    glass: true
  })
}
</${_S}>`

const tsCustomSpinner = `<${_S} setup lang="ts">
import { h } from 'vue'
import { YhLoading } from '@yh-ui/yh-ui'

const openCustom = () => {
  YhLoading.service({
    spinner: h('div', { class: 'custom-logo-loading' }, [
      h('div', { class: 'logo-inner' }, 'YH')
    ]),
    glass: true
  })
}
</${_S}>

<${_T}>
  <yh-button @click="openCustom">显示自定义 VNode</yh-button>
</${_T}>`

const tsAxios = `<${_T}>
  <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;">
    <yh-button :loading="running" @click="runRequests">模拟并发请求</yh-button>
    <div style="color: var(--yh-text-color-secondary); font-size: 14px;">
      当前活跃请求数：{{ requestCount }}
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { YhLoading } from '@yh-ui/yh-ui'
import type { YhLoadingInstance } from '@yh-ui/yh-ui'

const requestCount = ref(0)
const running = ref(false)
let loadingInstance: YhLoadingInstance | null = null

const showLoading = () => {
  if (requestCount.value === 0) {
    loadingInstance = YhLoading.service({
      lock: true,
      text: '正在加载数据...',
      glass: true
    })
  }
  requestCount.value += 1
}

const hideLoading = () => {
  requestCount.value = Math.max(0, requestCount.value - 1)
  if (requestCount.value === 0) {
    loadingInstance?.close()
    loadingInstance = null
  }
}

const service = axios.create({
  timeout: 5000,
  adapter: async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return {
      data: { ok: true, url: config.url },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    }
  }
})

service.interceptors.request.use(
  (config) => {
    showLoading()
    return config
  },
  (error) => {
    hideLoading()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    hideLoading()
    return response
  },
  (error) => {
    hideLoading()
    return Promise.reject(error)
  }
)

const runRequests = async () => {
  running.value = true
  try {
    await Promise.all([service.get('/users'), service.get('/orders'), service.get('/stats')])
  } finally {
    running.value = false
  }
}
</${_S}>`

const tsContext = `<${_T}>
  <yh-button @click="openWithContext">使用应用上下文打开 Loading</yh-button>
</${_T}>

<${_S} setup lang="ts">
import { getCurrentInstance } from 'vue'
import { YhLoading } from '@yh-ui/yh-ui'

const { appContext } = getCurrentInstance()!

const openWithContext = () => {
  const instance = YhLoading.service(
    {
      text: '正在使用当前应用上下文...',
      glass: true
    },
    appContext
  )

  setTimeout(() => instance.close(), 1800)
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsDirectiveFullscreen = toJs(tsDirectiveFullscreen)
const jsDirectiveAttributes = toJs(tsDirectiveAttributes)
const jsDirectiveGlass = toJs(tsDirectiveGlass)
const jsDirectiveDot = toJs(tsDirectiveDot)
const jsDirectiveCustomClass = toJs(tsDirectiveCustomClass)
const jsComposition = toJs(tsComposition)
const jsPremium = toJs(tsPremium)
const jsCustomSpinner = toJs(tsCustomSpinner)
const jsAxios = toJs(tsAxios)
const jsContext = toJs(tsContext)
</script>

## Loading 与 Spin 的关系

`Loading` 是构建在 `Spin` 之上的指令层与服务层，而 `Spin` 是更底层的视觉加载组件。

- `Spin` 负责渲染图标、提示文案和加载动画布局。
- `Loading` 额外提供服务挂载、全屏遮罩、滚动锁定、指令支持以及临时宿主管理能力。

## 用法

### 局部 Loading（指令版）

使用 `v-yh-loading` 指令为宿主元素覆盖一层加载遮罩。

<DemoBlock title="基础用法" inverse :ts-code="tsBasic" :js-code="jsBasic">
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

### 高级指令用法

`.fullscreen`、`.lock`、`.glass` 等指令修饰符，配合 `yh-loading-*` 扩展属性，可以实现更丰富的加载交互。

<DemoBlock title="指令全屏与锁定" :ts-code="tsDirectiveFullscreen" :js-code="jsDirectiveFullscreen">
  <yh-button @click="openDirectiveFullscreen">点击演示 .fullscreen.lock</yh-button>
  <div v-yh-loading.fullscreen.lock="loadingFullscreen"></div>
</DemoBlock>

<DemoBlock title="指令扩展属性" :ts-code="tsDirectiveAttributes" :js-code="jsDirectiveAttributes">
  <yh-button @click="loadingAttr = !loadingAttr" style="margin-bottom: 16px;">
    切换局部自定义指令
  </yh-button>
  <div 
    v-yh-loading="loadingAttr"
    yh-loading-text="正在快速加载..."
    yh-loading-type="chaser"
    yh-loading-color="#00d2ff"
    yh-loading-background="rgba(0, 0, 0, 0.8)"
    style="height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a;"
  >
    <div style="color: #666">这是深色容器背景</div>
  </div>
</DemoBlock>

<DemoBlock title="指令旗舰玻璃模式" :ts-code="tsDirectiveGlass" :js-code="jsDirectiveGlass">
  <div 
    v-yh-loading="true"
    yh-loading-glass
    yh-loading-text="亚克力玻璃指令遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <div class="demo-card">
      <h4 style="margin:0">系统核心看板</h4>
      <p style="margin:8px 0 0; font-size:14px;">通过亚克力玻璃滤镜渲染实时数据流...</p>
    </div>
  </div>
</DemoBlock>

<DemoBlock title="指令点状模式" :ts-code="tsDirectiveDot" :js-code="jsDirectiveDot">
  <div 
    v-yh-loading="true"
    yh-loading-dot
    yh-loading-text="正在加载容器..."
    class="demo-rich-container"
    style="background: var(--yh-bg-color-page);"
  >
    <div class="demo-card" style="background: var(--yh-bg-color);">
      <h4 style="margin:0">资源管理队列</h4>
      <p style="margin:8px 0 0; font-size:14px;">点状加载模式适合轻量级容器反馈</p>
    </div>
  </div>
</DemoBlock>

<DemoBlock title="指令自定义类名" :ts-code="tsDirectiveCustomClass" :js-code="jsDirectiveCustomClass">
  <div 
    v-yh-loading="true"
    yh-loading-custom-class="my-custom-mask"
    yh-loading-text="自定义样式遮罩"
    class="demo-rich-container"
    style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);"
  >
    <div class="demo-card">
      <h4 style="margin:0">深度定制</h4>
      <p style="margin:8px 0 0; font-size:14px;">通过 my-custom-mask 类名应用特殊滤镜效果...</p>
    </div>
  </div>
</DemoBlock>

### 组合式 API（推荐）

在 `setup` 中使用 `YhLoading.service` 以命令式方式打开和关闭加载遮罩。

<DemoBlock title="组合式 API 调用" :ts-code="tsComposition" :js-code="jsComposition">
  <yh-button @click="openCustomSpinner">点击触发全屏 Loading</yh-button>
</DemoBlock>

### 选项式 API

安装插件后，也可以通过 `$loading` 使用同一个服务。

<DemoBlock title="选项式 API 调用" :ts-code="tsPremium" :js-code="jsPremium">
  <yh-button @click="openFullScreen">点击演示全局挂载</yh-button>
</DemoBlock>

## 在 Nuxt 中使用

在 Nuxt 3/4 中注册 `@yh-ui/nuxt` 后即可使用 `YhLoading`。服务建议在客户端交互处理器或生命周期中调用，容器遮罩则可直接在模板中使用指令。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']
})
```

## 在 Axios 中使用

在真实项目中，建议结合 Axios 拦截器和一个轻量的引用计数器，确保只有最后一个并发请求结束后才关闭遮罩。

<DemoBlock title="网络请求拦截示例" :ts-code="tsAxios" :js-code="jsAxios">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    这种计数策略可以确保只有第一个请求会打开 Loading，并且遮罩会持续显示到最后一个并发请求完成。
  </p>
</DemoBlock>

## 旗舰级 Loading 风格

灵感来自 [loading.io](https://loading.io/#editor) 的动态样式。

<DemoBlock title="高级动画" :ts-code="tsPremium" :js-code="jsPremium">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">追逐环</yh-button>
    <yh-button @click="openPremium('gear')">齿轮</yh-button>
    <yh-button @click="openPremium('dual-ring')">双环</yh-button>
    <yh-button @click="openPremium('rect')">矩形</yh-button>
  </div>
</DemoBlock>

### 自定义配色方案

支持单色、渐变色数组以及基于 CSS 变量的颜色配置。

<DemoBlock title="多彩动画" :ts-code="tsPremium" :js-code="jsPremium">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremiumColored('chaser', ['#ff4e50', '#f9d423'])">落日</yh-button>
    <yh-button @click="openPremiumColored('gear', ['#56ab2f', '#a8e063'])">新绿</yh-button>
    <yh-button @click="openPremiumColored('rect', ['#8e2de2', '#4a00e0'])">深蓝</yh-button>
    <yh-button @click="openPremiumColored('dual-ring', ['#f80759', '#bc4e9c'])">霓虹</yh-button>
  </div>
</DemoBlock>

### 完全自定义扩展（VNode 或组件）

传入自定义 `spinner`，即可用自己的 VNode 或组件替换内置的加载渲染器。

<DemoBlock title="自定义 VNode 示例" :ts-code="tsCustomSpinner" :js-code="jsCustomSpinner">
  <yh-button @click="openCustomVNodeLoading">点击显示自定义 VNode Loading</yh-button>
</DemoBlock>

## 应用上下文

`YhLoading.service` 支持将当前应用上下文作为第二个参数传入，这样服务内部渲染的内容也能继承全局组件和插件。

::: tip
如果 `YhLoading` 已全局安装，那么该服务默认就运行在插件创建的应用上下文中。
:::

<DemoBlock title="应用上下文注入" :ts-code="tsContext" :js-code="jsContext">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    传入 `appContext` 后，挂载在 Loading 内部的组件可以访问 Pinia、Vue Router 等全局注册插件。
  </p>
</DemoBlock>

## API

### Props

该入口不通过组件 Props 暴露配置，请改用 `YhLoading.service(...)` 或 `v-yh-loading`。

### Events

该入口不暴露组件事件。

### Slots

该入口不是常规模板组件，不提供独立的组件插槽。

### Expose

该入口不暴露组件实例 `defineExpose` 成员，服务能力由 `YhLoading.service(...)` 返回。

### Loading 配置项

| 属性           | 说明                         | 类型                                           | 默认值          |
| -------------- | ---------------------------- | ---------------------------------------------- | --------------- |
| target         | 挂载目标元素或选择器         | `string \| HTMLElement`                        | `document.body` |
| body           | 是否追加到 body 容器         | `boolean`                                      | `false`         |
| fullscreen     | 是否渲染为全屏固定遮罩       | `boolean`                                      | `true`          |
| lock           | 是否锁定目标容器滚动         | `boolean`                                      | `false`         |
| text           | 加载提示文本                 | `string`                                       | `undefined`     |
| spinner        | 自定义图标、组件或 VNode     | `string \| Component \| VNode`                 | `undefined`     |
| background     | 自定义遮罩背景色             | `string`                                       | `undefined`     |
| customClass    | 额外附加到遮罩上的类名       | `string`                                       | `undefined`     |
| glass          | 是否启用玻璃风格遮罩         | `boolean`                                      | `false`         |
| color          | 加载器颜色、渐变色或颜色映射 | `string \| string[] \| Record<string, string>` | `undefined`     |
| dot            | 是否启用点状加载风格         | `boolean`                                      | `false`         |
| spinnerType    | 内置加载动画类型             | `LoadingSpinnerType`                           | `'circle'`      |
| themeOverrides | 组件级主题变量覆盖           | `ComponentThemeVars`                           | `undefined`     |

### 指令属性

| 名称                      | 说明             | 类型                 |
| ------------------------- | ---------------- | -------------------- |
| `yh-loading-text`         | 加载提示文本     | `string`             |
| `yh-loading-background`   | 遮罩背景色       | `string`             |
| `yh-loading-custom-class` | 额外自定义类名   | `string`             |
| `yh-loading-glass`        | 是否启用玻璃模式 | `boolean`            |
| `yh-loading-dot`          | 是否启用点状模式 | `boolean`            |
| `yh-loading-color`        | 加载器颜色       | `string`             |
| `yh-loading-type`         | 内置加载器类型   | `LoadingSpinnerType` |

### 指令修饰符

| 名称          | 说明                      |
| ------------- | ------------------------- |
| `.fullscreen` | 等价于 `fullscreen: true` |
| `.lock`       | 等价于 `lock: true`       |
| `.glass`      | 等价于 `glass: true`      |

### Loading 实例

| 属性    | 说明                 | 类型         |
| ------- | -------------------- | ------------ |
| close   | 关闭并销毁遮罩       | `() => void` |
| visible | 当前可见状态（只读） | `boolean`    |

### 主题变量

| 变量名                 | 说明             | 默认值 |
| ---------------------- | ---------------- | ------ |
| `--yh-loading-z-index` | Loading 遮罩层级 | `2000` |

### 类型导出

| 名称                | 说明                                    |
| ------------------- | --------------------------------------- |
| `YhLoadingOptions`  | `YhLoading.service(...)` 的服务配置类型 |
| `YhLoadingInstance` | 返回的 Loading 实例类型                 |
| `vYhLoading`        | `v-yh-loading` 的具名指令导出           |

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
