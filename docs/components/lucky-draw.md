# Lucky Draw 营销抽奖

用于电商营销活动的高级互动组件。融合了极具现代感的横/竖排版自适应策略与深度渲染特效。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

interface Prize {
  id: string
  name: string
  image?: string
}

// 高级图文配置
const prizesWithIcons: Prize[] = [
  { id: '1', name: '苹果电脑', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: '五十元红包', image: '🎁' },
  { id: '4', name: '谢谢参与', image: '😢' }, 
  { id: '5', name: '10积分', image: '💰' },    
  { id: '6', name: '蓝牙耳机', image: '🎧' },   
  { id: '7', name: '京东卡', image: '🎫' }, 
  { id: '8', name: '充电宝', image: '🔋' } 
]

// 纯文字简约配置
const prizesPureText: Prize[] = [
  { id: '1', name: '特等奖' },
  { id: '2', name: '一等奖' },
  { id: '3', name: '二等奖' },
  { id: '4', name: '三等奖' }, 
  { id: '5', name: '参与奖' }, 
  { id: '6', name: '幸运奖' }, 
  { id: '7', name: '安慰奖' },   
  { id: '8', name: '惊喜奖' }    
]

const targetWheelIcon = ref('')
const handleStartWheelIcon = () => {
  setTimeout(() => {
    targetWheelIcon.value = prizesWithIcons[Math.floor(Math.random() * prizesWithIcons.length)].id
  }, 300)
}
const handleFinishWheelIcon = (prize: Prize) => {
  alert('恭喜获得: ' + prize.name)
  targetWheelIcon.value = ''
}

const targetWheelText = ref('')
const handleStartWheelText = () => {
  setTimeout(() => {
    targetWheelText.value = prizesPureText[Math.floor(Math.random() * prizesPureText.length)].id
  }, 300)
}
const handleFinishWheelText = (prize: Prize) => {
  alert('恭喜获得: ' + prize.name)
  targetWheelText.value = ''
}

const targetGrid = ref('')
const handleStartGrid = () => {
  setTimeout(() => {
    targetGrid.value = prizesWithIcons[Math.floor(Math.random() * prizesWithIcons.length)].id
  }, 300)
}
const handleFinishGrid = (prize: Prize) => {
  alert('九宫格中奖: ' + prize.name)
  targetGrid.value = ''
}

const targetNuxtId = ref('')
const handleStartNuxt = () => {
  const randomId = prizesWithIcons[Math.floor(Math.random() * prizesWithIcons.length)].id
  targetNuxtId.value = randomId
}
const handleFinishNuxt = (prize: Prize) => {
  alert('🎉 恭喜在 Nuxt 渲染模式下抽中: ' + prize.name)
  targetNuxtId.value = ''
}

// ========================
// 示例代码生成
// ========================

const tsWheelIcon = `<${_T}>
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizes"
      :target-id="targetId"
      @start="handleStart"
      @finish="handleFinish"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizes: Prize[] = [
  { id: '1', name: '苹果电脑', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: '五十元红包', image: '🎁' },
  { id: '4', name: '谢谢参与', image: '😢' }, 
  { id: '5', name: '10积分', image: '💰' },    
  { id: '6', name: '蓝牙耳机', image: '🎧' },   
  { id: '7', name: '京东卡', image: '🎫' }, 
  { id: '8', name: '充电宝', image: '🔋' } 
]

const targetId = ref<string>('')

const handleStart = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetId.value = randomId
}

const handleFinish = (prize: Prize) => {
  alert('恭喜获得: ' + prize.name)
  targetId.value = '' 
}
</${_S}>`

const jsWheelIcon = toJs(tsWheelIcon)

const tsWheelText = `<${_T}>
  <div style="width: 300px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizes"
      :target-id="targetId"
      @start="handleStart"
      @finish="handleFinish"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
}

const prizes: Prize[] = [
  { id: '1', name: '特等奖' },
  { id: '2', name: '一等奖' },
  { id: '3', name: '二等奖' },
  { id: '4', name: '三等奖' }, 
  { id: '5', name: '参与奖' }, 
  { id: '6', name: '幸运奖' }, 
  { id: '7', name: '安慰奖' },   
  { id: '8', name: '惊喜奖' }
]

const targetId = ref<string>('')

const handleStart = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetId.value = randomId
}

const handleFinish = (prize: Prize) => {
  alert('恭喜获得: ' + prize.name)
  targetId.value = '' 
}
</${_S}>`

const tsGrid = `<${_T}>
  <div style="width: 360px; margin: 0 auto;">
    <yh-lucky-draw
      type="grid"
      :prizes="prizes"
      :target-id="targetId"
      @start="handleStart"
      @finish="handleFinish"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizes: Prize[] = [
  { id: '1', name: '苹果电脑', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: '五十元红包', image: '🎁' },
  { id: '4', name: '谢谢参与', image: '😢' }, 
  { id: '5', name: '10积分', image: '💰' },    
  { id: '6', name: '蓝牙耳机', image: '🎧' },   
  { id: '7', name: '京东卡', image: '🎫' }, 
  { id: '8', name: '充电宝', image: '🔋' } 
]

const targetId = ref<string>('')

const handleStart = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetId.value = randomId
}

const handleFinish = (prize: Prize) => {
  alert('九宫格中奖: ' + prize.name)
  targetId.value = '' 
}
</${_S}>`

const tsNuxt = `<${_T}>
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizes"
      :target-id="targetNuxtId"
      @start="handleStartNuxt"
      @finish="handleFinishNuxt"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizes: Prize[] = [
  { id: '1', name: '苹果电脑', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: '五十元红包', image: '🎁' },
  { id: '4', name: '谢谢参与', image: '😢' }, 
  { id: '5', name: '10积分', image: '💰' },    
  { id: '6', name: '蓝牙耳机', image: '🎧' },   
  { id: '7', name: '京东卡', image: '🎫' }, 
  { id: '8', name: '充电宝', image: '🔋' } 
]

const targetNuxtId = ref<string>('')

const handleStartNuxt = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetNuxtId.value = randomId
}

const handleFinishNuxt = (prize: Prize) => {
  alert('🎉 恭喜在 Nuxt 渲染模式下抽中: ' + prize.name)
  targetNuxtId.value = '' 
}
</${_S}>`

const jsNuxt = toJs(tsNuxt)

</script>

## 大转盘模式 (Wheel)

旗舰级大转盘体验。带有 **外圈 LED 跑马点缀**，以及在纯文案与图文模式下自动切换横向及切线/放射状排版的功能。

<DemoBlock title="高级图文示例" :ts-code="tsWheelIcon" :js-code="jsWheelIcon">
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizesWithIcons"
      :target-id="targetWheelIcon"
      @start="handleStartWheelIcon"
      @finish="handleFinishWheelIcon"
    />
  </div>
</DemoBlock>

<DemoBlock title="纯文字极简模式" :ts-code="tsWheelText" :js-code="toJs(tsWheelText)">
  <div style="width: 300px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizesPureText"
      :target-id="targetWheelText"
      @start="handleStartWheelText"
      @finish="handleFinishWheelText"
    />
  </div>
</DemoBlock>

## 九宫格模式 (Grid)

带有晶莹剔透色彩的经典九宫格。完美规范了多行与单行文本情况下的等距对齐体验，使得图标重心永远在一条水平线上。选中时带有饱满的高亮背景态。

<DemoBlock title="九宫格展示" :ts-code="tsGrid" :js-code="toJs(tsGrid)">
  <div style="width: 360px; margin: 0 auto;">
    <yh-lucky-draw
      type="grid"
      :prizes="prizesWithIcons"
      :target-id="targetGrid"
      @start="handleStartGrid"
      @finish="handleFinishGrid"
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

`YhLuckyDraw` 组件针对 Nuxt 3/4 的 SSR (Server-Side Rendering) 服务端渲染做了高帧兼容处理，其 DOM 结构（扇形布局与文本流）完全能在服务端进行直出渲染供爬虫与首屏引擎极速解析。所有的物理动画坐标运算自动降级安全移交至浏览器客户端执行，因此**无需包装 `<ClientOnly>`** 且**绝对不会产生由动画引致的 Hydration Mismatch 警告**。

<DemoBlock title="Nuxt 安全渲染示范" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizesWithIcons"
      :target-id="targetNuxtId"
      @start="handleStartNuxt"
      @finish="handleFinishNuxt"
    />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ **首屏直出**：DOM 以及全部静态图片、纯文本图文能实现无等待预渲染。
- ✅ **自动客户端侦听**：您可随时给 `target-id` 赋响应式的新值，底层 `requestAnimationFrame` 无阻断监听。
- ✅ **样式矩阵隔离**：扇叶颜色的混合采用内联绑定形式，规避了不同服务端环境引发的样式篡改。

## API

### Props

| 属性名          | 说明                                   | 类型                  | 默认值    |
| --------------- | -------------------------------------- | --------------------- | --------- |
| type            | 抽奖模式                               | `'wheel'` \| `'grid'` | `'wheel'` |
| prizes          | 奖品列表                               | `LuckyPrize[]`        | `[]`      |
| loading         | 加载状态，用于无缝对接异步 API 请求    | `boolean`             | `false`   |
| target-id       | 中奖 ID (一旦捕获非空值即触发安全转动) | `string` \| `number`  | `''`      |
| rounds          | 最低完整旋转圈数                       | `number`              | `8`       |
| duration        | 转盘物理滞停及弹性动画总时长 (ms)      | `number`              | `4000`    |
| size            | 整体尺寸挂载，自适应响应或像素值       | `number` \| `string`  | `300`     |
| action-text     | 前侧主按钮显示文案覆写                 | `string`              | `''`      |
| hide-btn        | 全盘隐藏内轴引擎触发按钮               | `boolean`             | `false`   |
| theme-overrides | 单实例 CSS 主题覆盖接口                | `object`              | —         |

### Events

| 事件名 | 说明                                                   | 参数                  |
| ------ | ------------------------------------------------------ | --------------------- |
| click  | 核心抽奖按钮被点击的瞬间（此时适合静默调用服务端接口） | `(e: MouseEvent)`     |
| start  | 组件正式开始渲染初速度动效前抛出                       | `()`                  |
| finish | 物理碰撞检测停转，获得开奖奖品实体对象时回调           | `(prize: LuckyPrize)` |

## 主题变量

Lucky Draw 的视觉内核通过先进的 CSS 主题变量构建。您可以毫无阻碍地覆盖以下变量，瞬间打造出贴合您自家产品设计的顶级电商抽奖面板色局：

| 变量名                 | 说明                                                                  | 首发行业标准默认值                                  |
| ---------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| `--yh-lucky-primary`   | 指针前端、点击按钮外圈边框与激活高光红的主色                          | `#ff4757`                                           |
| `--yh-lucky-border-bg` | 转盘整体防切边大底盘背景色（支持线性格段渲染 `linear-gradient` 色系） | `linear-gradient(180deg, #ff8a65 0%, #ff5252 100%)` |
| `--yh-lucky-shadow`    | 大转盘自身及九宫格外部光晕景深阴影色值                                | `0 10px 25px rgba(255, 82, 82, 0.3)`                |
