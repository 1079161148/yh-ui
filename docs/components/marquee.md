<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const marqueePlay = ref(true)
const cycleCount = ref(0)
const handleCycle = () => {
  cycleCount.value++
}

const tsBasic = `<${_T}>
  <yh-marquee>
    <div v-for="i in 10" :key="i" class="marquee-item">
      🔥 瞬间灵感 {{ i }}
    </div>
  </yh-marquee>
</${_T}>

<${_St} scoped>
.marquee-item {
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
}
</${_St}>`

const jsBasic = toJs(tsBasic)

const tsVertical = `<${_T}>
  <div class="vertical-container">
    <yh-marquee direction="vertical" :duration="8" gap="12px">
      <div v-for="i in 5" :key="i" class="marquee-message">
        公告消息 #{{ i }}：系统将在今晚进行维护
      </div>
    </yh-marquee>
  </div>
</${_T}>

<${_St} scoped>
.vertical-container {
  height: 180px;
  width: 100%;
  border: 1px solid var(--yh-border-color);
  border-radius: 8px;
  overflow: hidden;
}
.marquee-message {
  width: 100%;
  height: 60px;
  background: var(--yh-bg-color-page);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</${_St}>`

const jsVertical = toJs(tsVertical)

const tsGradient = `<${_T}>
  <yh-marquee gradient gradient-width="80px" gap="40px">
    <div v-for="i in 8" :key="i" class="user-item">
      <img :src="\`https://api.dicebear.com/7.x/pixel-art/svg?seed=\${i}\`" class="avatar" />
      <span class="username">User {{i}}</span>
    </div>
  </yh-marquee>
</${_T}>

<${_St} scoped>
.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.avatar {
  width: 50px;
  border-radius: 50%;
  border: 2px solid #eee;
}
.username {
  font-size: 12px;
  color: #666;
}
</${_St}>`

const jsGradient = toJs(tsGradient)

const tsCustom = `<${_T}>
  <div class="stock-container">
    <yh-marquee 
      :duration="25" 
      gap="40px" 
      pause-on-hover 
      gradient 
      gradient-color="#000"
      gradient-width="60px"
    >
      <div v-for="item in stockData" :key="item.name" class="stock-item">
        <span class="name">{{ item.name }}</span>
        <span :class="['price', item.trend]">{{ item.price }}</span>
        <span :class="['change', item.trend]">
          {{ item.trend === 'up' ? '▲' : '▼' }} {{ item.change }}
        </span>
      </div>
    </yh-marquee>
  </div>
</${_T}>

<${_S} setup lang="ts">
const stockData = [
  { name: 'AAPL', price: '189.43', change: '+1.2%', trend: 'up' },
  { name: 'TSLA', price: '238.45', change: '-2.4%', trend: 'down' },
  { name: 'NVDA', price: '495.22', change: '+5.1%', trend: 'up' },
  { name: 'MSFT', price: '374.07', change: '+0.8%', trend: 'up' },
  { name: 'AMZN', price: '145.20', change: '+1.5%', trend: 'up' },
  { name: 'GOOGL', price: '132.40', change: '-0.3%', trend: 'down' }
]
</${_S}>

<${_St} scoped>
.stock-container {
  background: #000;
  padding: 15px;
  border-radius: 4px;
}
.stock-item {
  display: flex;
  gap: 12px;
  align-items: center;
}
.name {
  color: #fff;
  font-weight: bold;
  font-family: monospace;
}
.price {
  font-weight: bold;
}
.price.up { color: #52c41a; }
.price.down { color: #f5222d; }
.change {
  font-size: 13px;
}
.change.up { color: #b7eb8f; }
.change.down { color: #ffa39e; }
</${_St}>`

const jsCustom = toJs(tsCustom)

const stockData = [
  { name: 'AAPL', price: '189.43', change: '+1.2%', trend: 'up' },
  { name: 'TSLA', price: '238.45', change: '-2.4%', trend: 'down' },
  { name: 'NVDA', price: '495.22', change: '+5.1%', trend: 'up' },
  { name: 'MSFT', price: '374.07', change: '+0.8%', trend: 'up' },
  { name: 'AMZN', price: '145.20', change: '+1.5%', trend: 'up' },
  { name: 'GOOGL', price: '132.40', change: '-0.3%', trend: 'down' }
]

const tsControl = `<${_T}>
  <div class="control-wrapper">
    <div class="header">
      <yh-button size="small" @click="marqueePlay = !marqueePlay">
        {{ marqueePlay ? '点击暂停' : '点击播放' }}
      </yh-button>
      <span class="counter">
        累计循环次数：<strong>{{ cycleCount }}</strong>
      </span>
    </div>

    <yh-marquee 
      :play="marqueePlay" 
      pause-on-hover 
      @cycle-complete="handleCycle"
    >
      <div v-for="i in 5" :key="i" class="experiment-item">
        交互实验项 {{ i }}
      </div>
    </yh-marquee>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const marqueePlay = ref(true)
const cycleCount = ref(0)
const handleCycle = () => {
  cycleCount.value++
}
</${_S}>

<${_St} scoped>
.control-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.header {
  display: flex;
  gap: 12px;
  align-items: center;
}
.counter {
  font-size: 14px;
  color: #666;
}
.experiment-item {
  padding: 10px 30px;
  background: #f0f7ff;
  color: #0070f3;
  border-radius: 20px;
  font-weight: bold;
}
</${_St}>`

const jsControl = toJs(tsControl)

const tsNuxt = `<${_T}>
  <ClientOnly>
    <yh-marquee>Nuxt 3 SSR 适配演示</yh-marquee>
  </ClientOnly>
</${_T}>`

const jsNuxt = toJs(tsNuxt)

const tsSpeed = `<${_T}>
  <div class="speed-container">
    <yh-marquee :speed="40" gap="20px">
      <div v-for="i in 3" :key="i" class="speed-item-short">短内容项 {{ i }}</div>
    </yh-marquee>
    <yh-marquee :speed="40" gap="20px">
      <div v-for="i in 10" :key="i" class="speed-item-long">这是一段非常长长长长长长长长长长长内容项 {{ i }}</div>
    </yh-marquee>
  </div>
</${_T}>

<${_St} scoped>
.speed-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.speed-item-short { padding: 10px 20px; background: #e6f7ff; border-radius: 4px; }
.speed-item-long { padding: 10px 20px; background: #f6ffed; border-radius: 4px; }
</${_St}>`

const jsSpeed = toJs(tsSpeed)

const tsDelay = `<${_T}>
  <yh-marquee :speed="60" :delay="1" :loop-delay="2" pause-on-hidden>
    <div v-for="i in 6" :key="i" class="delay-card">
      <yh-icon name="info" />
      <span>重要公告：第 {{ i }} 条消息，每阶段将停顿 2 秒进行阅读</span>
    </div>
  </yh-marquee>
</${_T}>

<${_St} scoped>
.delay-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  color: #856404;
}
</${_St}>`

const jsDelay = toJs(tsDelay)
</script>

# Marquee 跑马灯

高性能、无缝滚动的跑马灯组件。基于 CSS 动画驱动，支持水平/垂直滚动、动态内容填充以及极致的交互体验。

## 基础用法

最简单的水平无限滚动。

<DemoBlock title="基础无限滚动" :ts-code="tsBasic" :js-code="jsBasic">
  <YhMarquee>
    <div v-for="i in 10" :key="i" class="marquee-item">
      🔥 瞬间灵感 {{ i }}
    </div>
  </YhMarquee>
</DemoBlock>

<style scoped>
.marquee-item {
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
}
</style>

## 垂直展示

通过设置 `direction="vertical"` 可以实现垂直方向的滚动。注意：垂直模式下通常需要给容器设定确定的高度。

<DemoBlock title="垂直滚动" :ts-code="tsVertical" :js-code="jsVertical">
  <div class="vertical-container">
    <YhMarquee direction="vertical" :duration="8" gap="12px">
      <div v-for="i in 5" :key="i" class="marquee-message">
        公告消息 #{{ i }}：系统将在今晚进行维护
      </div>
    </YhMarquee>
  </div>
</DemoBlock>

<style scoped>
.vertical-container {
  height: 180px;
  width: 100%;
  border: 1px solid var(--yh-border-color);
  border-radius: 8px;
  overflow: hidden;
}
.marquee-message {
  width: 100%;
  height: 60px;
  background: var(--yh-bg-color-page);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</style>

## 边缘渐变

开启 `gradient` 属性可以在滚动容器的两侧增加渐变遮罩，使边缘过渡更加柔和自然。你可以自定义颜色和宽度。

<DemoBlock title="边缘渐变遮罩" :ts-code="tsGradient" :js-code="jsGradient">
  <YhMarquee gradient gradient-width="80px" gap="40px">
    <div v-for="i in 8" :key="i" class="user-item">
      <img :src="`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i}`" class="avatar" />
      <span class="username">User {{i}}</span>
    </div>
  </YhMarquee>
</DemoBlock>

<style scoped>
.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.avatar {
  width: 50px;
  border-radius: 50%;
  border: 2px solid #eee;
}
.username {
  font-size: 12px;
  color: #666;
}
</style>

## 交互与状态控制

支持悬停暂停、事件监听以及手动播放控制。通过 `play` 属性可以精确控制动画的启停，通过 `cycle-complete` 事件可以捕捉每一轮滚动的结束瞬间。

<DemoBlock title="交互控制" :ts-code="tsControl" :js-code="jsControl">
  <div class="control-wrapper">
    <div class="header">
      <yh-button size="small" @click="marqueePlay = !marqueePlay">
        {{ marqueePlay ? '点击暂停' : '点击播放' }}
      </yh-button>
      <span class="counter">累计循环次数：<strong>{{ cycleCount }}</strong></span>
    </div>
    <YhMarquee :play="marqueePlay" pause-on-hover @cycle-complete="handleCycle">
      <div v-for="i in 5" :key="i" class="experiment-item">
        交互实验项 {{ i }}
      </div>
    </YhMarquee>
  </div>
</DemoBlock>

<style scoped>
.control-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.header {
  display: flex;
  gap: 12px;
  align-items: center;
}
.counter {
  font-size: 14px;
  color: #666;
}
.experiment-item {
  padding: 10px 30px;
  background: #f0f7ff;
  color: #0070f3;
  border-radius: 20px;
  font-weight: bold;
}
</style>

## 恒定速率 (Speed)

在内容长度不固定的业务场景中，使用 `speed` (px/s) 代替 `duration` 可以确保不同长度的内容拥有完全相同的滚动速度，避免视觉上的速度抖动。

<DemoBlock title="恒定速率演示" :ts-code="tsSpeed" :js-code="jsSpeed">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <YhMarquee :speed="40" gap="20px">
      <div v-for="i in 3" :key="i" class="speed-item-short">短内容项 {{ i }}</div>
    </YhMarquee>
    <YhMarquee :speed="40" gap="20px">
      <div v-for="i in 10" :key="i" class="speed-item-long">这是一段非常长长长长长长长长长长长内容项 {{ i }}</div>
    </YhMarquee>
  </div>
</DemoBlock>

<style scoped>
.speed-item-short { padding: 10px 20px; background: #e6f7ff; border-radius: 4px; }
.speed-item-long { padding: 10px 20px; background: #f6ffed; border-radius: 4px; }
</style>

## 视口感知与循环延迟

通过 `pause-on-hidden` 可以在组件离开视口时自动停止动画节省性能。`delay` 和 `loop-delay` 属性则可以为第一轮和每一轮循环之间提供优雅的停顿。

<DemoBlock title="循环停顿示例" :ts-code="tsDelay" :js-code="jsDelay">
  <YhMarquee :speed="60" :delay="1" :loop-delay="2" pause-on-hidden>
    <div v-for="i in 6" :key="i" class="delay-card">
      <yh-icon name="info" />
      <span>重要公告：第 {{ i }} 条消息，每阶段将停顿 2 秒进行阅读</span>
    </div>
  </YhMarquee>
</DemoBlock>

<style scoped>
.delay-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  color: #856404;
}
</style>

## 实战案例：股市行情

结合渐变和自定义样式打造专业级的数据展示。

<DemoBlock title="股市行情条" :ts-code="tsCustom" :js-code="jsCustom">
  <div class="stock-container">
    <YhMarquee :duration="25" gap="40px" gradient gradient-color="#000" gradient-width="60px">
      <div v-for="item in stockData" :key="item.name" class="stock-item">
        <span class="name">{{ item.name }}</span>
        <span :class="['price', item.trend]">{{ item.price }}</span>
        <span :class="['change', item.trend]">
          {{ item.trend === 'up' ? '▲' : '▼' }} {{ item.change }}
        </span>
      </div>
    </YhMarquee>
  </div>
</DemoBlock>

<style scoped>
.stock-container {
  background: #000;
  padding: 15px;
  border-radius: 4px;
}
.stock-item {
  display: flex;
  gap: 12px;
  align-items: center;
}
.name {
  color: #fff;
  font-weight: bold;
  font-family: monospace;
}
.price {
  font-weight: bold;
}
.price.up { color: #52c41a; }
.price.down { color: #f5222d; }
.change {
  font-size: 13px;
}
.change.up { color: #b7eb8f; }
.change.down { color: #ffa39e; }
</style>

## 在 Nuxt 中使用

YH-UI 完美适配 Nuxt 3。你可以直接在 `app.vue` 或 any 页面中使用。

::: tip 自动导入
如果你使用了 `@yh-ui/nuxt` 模块，`YhMarquee` 将会被自动按需加载并包含完整的样式。
:::

<DemoBlock title="Nuxt 适配" :ts-code="tsNuxt" :js-code="jsNuxt">
  <YhMarquee>Nuxt 3 SSR 适配演示</YhMarquee>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 滚动方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| duration | 滚动一轮所需的时长 (秒) | `number` | `20` |
| reverse | 是否反向滚动 | `boolean` | `false` |
| pause-on-hover | 鼠标悬停时是否暂停 | `boolean` | `true` |
| pause-on-click | 鼠标点击时是否暂停 | `boolean` | `false` |
| gap | 内容项之间的间距 | `number \| string` | `0` |
| gradient | 是否开启边缘渐变遮罩 | `boolean` | `false` |
| gradient-color | 渐变遮罩颜色 | `string` | `'#ffffff'` |
| gradient-width | 渐变遮罩展示宽度 | `number \| string` | `'40px'` |
| auto-fill | 内容不足时是否自动填充 | `boolean` | `true` |
| play | 是否播放动画 | `boolean` | `true` |
| loop | 循环次数 (0 为无限) | `number` | `0` |
| speed | 滚动速度 (像素/秒)，设置后将失效 `duration` | `number` | `0` |
| delay | 首次启动动画前的延迟时间 (秒) | `number` | `0` |
| loop-delay | 每一轮循环结束后的停顿时间 (秒) | `number` | `0` |
| pause-on-hidden | 当组件离开视口时是否自动暂停动画 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| cycle-complete | 每次滚动循环完成时触发 | `-` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 跑马灯滚动的内容 |

### Expose

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| calculateClones | 手动触发克隆数量计算（在动态修改内容尺寸时很有用） | `() => Promise<void>` |
| containerRef | 外部容器的 DOM 引用 | `HTMLElement \| null` |
| contentRef | 内容容器的 DOM 引用 | `HTMLElement \| null` |

## 主题变量 (CSS Variables)

所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `--yh-marquee-gap` | `0px` | 内容项之间的间距 |
| `--yh-marquee-duration` | `20s` | 动画持续时长 |
| `--yh-marquee-iteration-count` | `infinite` | 动画循环次数 |
| `--yh-marquee-direction` | `normal` | 动画播放方向 |
| `--yh-marquee-play-state` | `running` | 动画播放状态 |
| `--yh-marquee-gradient-color` | `var(--yh-bg-color)` | 边际渐变颜色 (自动跟随主题背景色) |
| `--yh-marquee-gradient-width` | `40px` | 边际渐变宽度 |
| `--yh-marquee-clone-count` | `1` | 内部计算的克隆倍数 (只读) |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhMarqueeProps` | 组件 Props 类型 |
| `YhMarqueeEmits` | 组件事件类型 |
| `YhMarqueeSlots` | 组件插槽类型 |
| `YhMarqueeExpose` | 组件 Expose 类型 |
| `YhMarqueeDirection` | 滚动方向联合类型 |
| `YhMarqueeInstance` | 组件实例类型 |

