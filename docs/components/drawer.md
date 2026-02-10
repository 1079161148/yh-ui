<script setup lang="ts">
import { ref } from 'vue'

const visibleStandard = ref(false)
const visibleLeft = ref(false)
const visibleTop = ref(false)
const visibleBottom = ref(false)
const visibleRight = ref(false)
const visibleSize = ref(false)
const visibleGlass = ref(false)
const visibleResizable = ref(false)
const visibleFooter = ref(false)
const visibleNuxt = ref(false)

// Nested & Modal
const visibleNestedA = ref(false)
const visibleNestedB = ref(false)
const visibleNoModal = ref(false)

// Inner & Icon & Round
const visibleInner = ref(false)
const placementInner = ref('right')
const visibleCustomIcon = ref(false)
const visibleRound = ref(false)

const tsStandard = `<template>
  <yh-button @click="visibleStandard = true">打开抽屉</yh-button>

  <yh-drawer v-model="visibleStandard" title="基础抽屉">
    <span>这是基础抽屉的内容。</span>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleStandard = ref(false)
<\/script>`


const jsStandard = tsStandard

const tsDirection = `<template>
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleLeft = true">左侧</yh-button>
    <yh-button @click="visibleRight = true">右侧</yh-button>
    <yh-button @click="visibleTop = true">顶部</yh-button>
    <yh-button @click="visibleBottom = true">底部</yh-button>
  </div>

  <yh-drawer v-model="visibleLeft" title="左侧抽屉" placement="left">左侧内容</yh-drawer>
  <yh-drawer v-model="visibleRight" title="右侧抽屉" placement="right">右侧内容</yh-drawer>
  <yh-drawer v-model="visibleTop" title="顶部抽屉" placement="top">顶部内容</yh-drawer>
  <yh-drawer v-model="visibleBottom" title="底部抽屉" placement="bottom">底部内容</yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleLeft = ref(false)
const visibleRight = ref(false)
const visibleTop = ref(false)
const visibleBottom = ref(false)
<\/script>`


const jsDirection = tsDirection

const tsSize = `<template>
  <yh-button @click="visibleSize = true">自定义尺寸 (50%)</yh-button>

  <yh-drawer v-model="visibleSize" title="自定义尺寸" size="50%">
    <span>抽屉宽度已被设置为 50%。</span>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleSize = ref(false)
<\/script>`


const jsSize = tsSize

const tsGlass = `<template>
  <yh-button type="primary" plain @click="visibleGlass = true">亚克力玻璃态</yh-button>

  <yh-drawer v-model="visibleGlass" title="Premium Glass" glass>
    <p>亚克力玻璃态提供了极佳的视觉层次感，支持动态背景虚化和暗色模式自适应。</p>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleGlass = ref(false)
<\/script>`


const jsGlass = tsGlass

const tsResizable = `<template>
  <yh-button type="success" plain @click="visibleResizable = true">可调节大小</yh-button>

  <yh-drawer v-model="visibleResizable" title="可调节大小" resizable>
    <p>将鼠标悬停在抽屉边缘，拖动即可调整抽屉大小。内部集成了物理边界检测，防止调整过度。</p>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleResizable = ref(false)
<\/script>`


const jsResizable = tsResizable

const tsFooter = `<template>
  <yh-button @click="visibleFooter = true">带页脚的抽屉</yh-button>

  <yh-drawer v-model="visibleFooter" title="操作确认" show-footer>
    <p>您可以在底部添加操作按钮。</p>
    <template #footer>
      <yh-button @click="visibleFooter = false">取消</yh-button>
      <yh-button type="primary" @click="visibleFooter = false">确定</yh-button>
    </template>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleFooter = ref(false)
<\/script>`


const jsFooter = tsFooter

const tsNested = `<template>
  <yh-button type="primary" @click="visibleNestedA = true">打开外层抽屉</yh-button>

  <yh-drawer v-model="visibleNestedA" title="外层抽屉" size="50%">
    <div style="padding: 24px;">
      <p>这是外层抽屉的内容。</p>
      <yh-button type="success" @click="visibleNestedB = true">打开内层组件</yh-button>
    </div>
    
    <yh-drawer v-model="visibleNestedB" title="内层嵌套抽屉" size="300px">
      <div style="padding: 24px;">
        这是嵌套在内部的第二层抽屉，它会自动计算层级并正确覆盖。
      </div>
    </yh-drawer>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleNestedA = ref(false)
const visibleNestedB = ref(false)
<\/script>`


const jsNested = tsNested

const tsModal = `<template>
  <yh-button @click="visibleNoModal = true">无遮罩模式</yh-button>

  <yh-drawer v-model="visibleNoModal" title="无遮罩模式" :modal="false">
    <div style="padding: 24px;">
      <p>关闭遮罩后，用户可以与抽屉外的页面元素进行交互。</p>
    </div>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleNoModal = ref(false)
<\/script>`


const jsModal = tsModal

const tsInner = `<template>
  <div style="height: 400px; border: 2px dashed #ccc; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafafa; border-radius: 12px; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button @click="openDrawer('top')">顶部弹出</yh-button>
      <yh-button @click="openDrawer('bottom')">底部弹出</yh-button>
    </div>
    <div style="display: flex; gap: 12px;">
      <yh-button @click="openDrawer('left')">左侧弹出</yh-button>
      <yh-button @click="openDrawer('right')">右侧弹出</yh-button>
    </div>
    
    <yh-drawer v-model="visible" :title="\`局部抽屉 - \${placement}\`" :placement="placement" inner size="160px">
      <div style="padding: 24px;">这是一个在指定区域内按方向滑出的抽屉，不会遮挡容器外的其他内容。</div>
    </yh-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const placement = ref('right')

const openDrawer = (p: string) => {
  placement.value = p
  visible.value = true
}
<\/script>`


const jsInner = tsInner.replace(': (p: string)', '')

const tsCustomIcon = `<template>
  <yh-button @click="visible = true">自定义关闭图标</yh-button>

  <yh-drawer v-model="visible" title="图标演示">
    <template #close-icon>
      <div style="background: var(--yh-color-danger, #f56c6c); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">EXIT</div>
    </template>
    <div style="padding: 24px;">您可以完全自定义关闭区域的内容，不仅限于图标。</div>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>`


const jsCustomIcon = tsCustomIcon

const tsRound = `<template>
  <yh-button @click="visible = true">禁用圆角 (直角风格)</yh-button>

  <yh-drawer v-model="visible" title="硬核风格" :round="false">
    <div style="padding: 24px;">通过 :round="false" 切换为无圆角的硬朗设计方案，适合极简或工业风界面。</div>
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>`


const jsRound = tsRound

const tsNuxt = `<template>
  <yh-button @click="visibleNuxt = true">Nuxt 兼容性</yh-button>
  <yh-drawer v-model="visibleNuxt" title="SSR Support">
    100% 兼容 Nuxt 3 的 SSR 机制。
  </yh-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visibleNuxt = ref(false)
<\/script>`


const jsNuxt = tsNuxt
</script>

# Drawer 抽屉

屏幕边缘滑出的面板。

## 基础用法

最简单的用法，从右侧滑出。

<DemoBlock :tsCode="tsStandard" :jsCode="jsStandard">
  <yh-button @click="visibleStandard = true">打开抽屉</yh-button>
  <yh-drawer v-model="visibleStandard" title="基础抽屉">
    <span>这是基础抽屉的内容。</span>
  </yh-drawer>
</DemoBlock>

## 自定义方向

支持 `top`、`right`、`bottom`、`left` 四个方向。

<DemoBlock :tsCode="tsDirection" :jsCode="jsDirection">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleLeft = true">左侧</yh-button>
    <yh-button @click="visibleRight = true">右侧</yh-button>
    <yh-button @click="visibleTop = true">顶部</yh-button>
    <yh-button @click="visibleBottom = true">底部</yh-button>
  </div>
  <yh-drawer v-model="visibleLeft" title="左侧抽屉" placement="left">左侧内容</yh-drawer>
  <yh-drawer v-model="visibleRight" title="右侧抽屉" placement="right">右侧内容</yh-drawer>
  <yh-drawer v-model="visibleTop" title="顶部抽屉" placement="top">顶部内容</yh-drawer>
  <yh-drawer v-model="visibleBottom" title="底部抽屉" placement="bottom">底部内容</yh-drawer>
</DemoBlock>

## 自定义尺寸

可以通过 `size` 属性控制宽度或高度。

<DemoBlock :tsCode="tsSize" :jsCode="jsSize">
  <yh-button @click="visibleSize = true">自定义尺寸 (50%)</yh-button>
  <yh-drawer v-model="visibleSize" title="自定义尺寸" size="50%">
    <span>抽屉宽度已被设置为 50%。</span>
  </yh-drawer>
</DemoBlock>

## 亚克力玻璃态

开启 `glass` 属性，享受旗舰级的视觉体验。

<DemoBlock :tsCode="tsGlass" :jsCode="jsGlass">
  <yh-button type="primary" plain @click="visibleGlass = true">亚克力玻璃态</yh-button>
  <yh-drawer v-model="visibleGlass" title="Premium Glass" glass>
    <p>亚克力玻璃态提供了极佳的视觉层次感，支持动态背景虚化和暗色模式自适应。</p>
  </yh-drawer>
</DemoBlock>

## 可调节大小

开启 `resizable` 属性，允许用户通过拖拽边缘来调整抽屉尺寸。

<DemoBlock :tsCode="tsResizable" :jsCode="jsResizable">
  <yh-button type="success" plain @click="visibleResizable = true">可调节大小</yh-button>
  <yh-drawer v-model="visibleResizable" title="可调节大小" resizable>
    <p>将鼠标悬停在抽屉边缘，拖动即可调整抽屉大小。内部集成了物理边界检测，防止调整过度。</p>
  </yh-drawer>
</DemoBlock>

## 带页脚的操作

通过 `show-footer` 和 `footer` 插槽添加操作按钮。

<DemoBlock :tsCode="tsFooter" :jsCode="jsFooter">
  <yh-button @click="visibleFooter = true">带页脚的抽屉</yh-button>
  <yh-drawer v-model="visibleFooter" title="操作确认" show-footer>
    <p>您可以在底部添加操作按钮。</p>
    <template #footer>
      <yh-button @click="visibleFooter = false">取消</yh-button>
      <yh-button type="primary" @click="visibleFooter = false">确定</yh-button>
    </template>
  </yh-drawer>
</DemoBlock>

## 嵌套抽屉

Drawer 组件支持多级嵌套，通过 `z-index` 自动管理确保内层抽屉始终覆盖在外层之上。

<DemoBlock :tsCode="tsNested" :jsCode="jsNested">
  <yh-button type="primary" @click="visibleNestedA = true">打开外层抽屉</yh-button>
  <yh-drawer v-model="visibleNestedA" title="外层抽屉" size="50%">
    <div style="padding: 24px;">
      <p>这是外层抽屉的内容。</p>
      <yh-button type="success" @click="visibleNestedB = true">打开内层组件</yh-button>
    </div>
    <yh-drawer v-model="visibleNestedB" title="内层嵌套抽屉" size="300px">
      <div style="padding: 24px;">
        这是嵌套在内部的第二层抽屉，它会自动计算层级并正确覆盖。
      </div>
    </yh-drawer>
  </yh-drawer>
</DemoBlock>

## 局部容器弹出 (Inner Mode)

开启 `inner` 属性，抽屉将以 `absolute` 方式渲染在最近的 `relative` 父容器内。支持所有个方向，且自动禁用 Teleport 以确保层级正确。

<DemoBlock :tsCode="tsInner" :jsCode="jsInner">
  <div style="height: 400px; border: 2px dashed var(--yh-border-color, #ccc); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafafa; border-radius: 12px; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button @click="visibleInner = true; placementInner = 'top'">顶部弹出</yh-button>
      <yh-button @click="visibleInner = true; placementInner = 'bottom'">底部弹出</yh-button>
    </div>
    <div style="display: flex; gap: 12px;">
      <yh-button @click="visibleInner = true; placementInner = 'left'">左侧弹出</yh-button>
      <yh-button @click="visibleInner = true; placementInner = 'right'">右侧弹出</yh-button>
    </div>
    <yh-drawer v-model="visibleInner" :title="'局部抽屉 - ' + placementInner" :placement="placementInner" inner size="160px">
      <div style="padding: 24px;">这是一个在指定区域内按方向滑出的抽屉，不会遮挡容器外的其他内容。</div>
    </yh-drawer>
  </div>
</DemoBlock>

## 自定义关闭图标

通过 `close-icon` 插槽，您可以完全自定义右上角的关闭触发区域。

<DemoBlock :tsCode="tsCustomIcon" :jsCode="jsCustomIcon">
  <yh-button @click="visibleCustomIcon = true">自定义关闭图标</yh-button>
  <yh-drawer v-model="visibleCustomIcon" title="图标演示">
    <template #close-icon>
      <div style="background: var(--yh-color-danger, #f56c6c); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">EXIT</div>
    </template>
    <div style="padding: 24px;">您可以完全自定义关闭区域的内容，不仅限于图标。</div>
  </yh-drawer>
</DemoBlock>

## 禁用圆角 (直角风格)

默认开启圆角（旗舰审美），通过 `round` 属性可快速切换为硬朗的直角风格。

<DemoBlock :tsCode="tsRound" :jsCode="jsRound">
  <yh-button @click="visibleRound = true">禁用圆角 (直角风格)</yh-button>
  <yh-drawer v-model="visibleRound" title="硬核风格" :round="false">
    <div style="padding: 24px;">通过 :round="false" 切换为无圆角的硬朗设计方案，适合极简或工业风界面。</div>
  </yh-drawer>
</DemoBlock>

## 遮罩层 (Modal)

通过 `modal` 属性可以开启或关闭背景遮罩层。

<DemoBlock :tsCode="tsModal" :jsCode="jsModal">
  <yh-button @click="visibleNoModal = true">无遮罩模式</yh-button>
  <yh-drawer v-model="visibleNoModal" title="无遮罩模式" :modal="false">
    <div style="padding: 24px;">
      <p>关闭遮罩后，用户可以与抽屉外的页面元素进行交互。</p>
    </div>
  </yh-drawer>
</DemoBlock>

## 在 Nuxt 中使用

<DemoBlock :tsCode="tsNuxt" :jsCode="jsNuxt">
  <yh-button @click="visibleNuxt = true">Nuxt 兼容性</yh-button>
  <yh-drawer v-model="visibleNuxt" title="SSR Support">
    100% 兼容 Nuxt 3 的 SSR 机制。
  </yh-drawer>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示抽屉 | `boolean` | `false` |
| title | 标题 | `string \| (() => VNode) \| Component` | - |
| placement | 抽屉位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| size | 抽屉大小 (宽度或高度) | `string \| number` | `'30%'` |
| modal | 是否显示遮罩层 | `boolean` | `true` |
| closeOnClickModal | 点击遮罩层是否关闭 | `boolean` | `true` |
| closeOnPressEscape | 按下 ESC 是否关闭 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 自定义关闭图标名称 | `string` | `'close'` |
| showHeader | 是否显示头部 | `boolean` | `true` |
| showFooter | 是否显示页脚 | `boolean` | `false` |
| lockScroll | 是否锁定视口滚动 | `boolean` | `true` |
| glass | 是否开启亚克力玻璃模式 | `boolean` | `false` |
| resizable | 是否可调整大小 | `boolean` | `false` |
| minSize | 最小大小 (px) | `number` | `150` |
| maxSize | 最大大小 (px) | `number` | `1000` |
| destroyOnClose | 关闭时是否销毁内容 | `boolean` | `false` |
| zIndex | 手动设置 z-index 层级 | `number` | - |
| teleportTo | 挂载节点 | `string \| HTMLElement` | `'body'` |
| beforeClose | 关闭前的钩子，执行 `done` 才会关闭 | `(done: () => void) => void` | - |
| round | 是否显示圆角（旗舰级审美自适应） | `boolean` | `true` |
| inner | 是否在指定容器内弹出 (开启绝对定位模式) | `boolean` | `false` |
| customClass | 抽屉容器附加类名 | `string` | - |
| modalClass | 遮罩层附加类名 | `string` | - |
| titleStyle | 头部标题自定义样式 | `CSSProperties \| string` | - |
| contentStyle | 内容主体自定义样式 | `CSSProperties \| string` | - |
| footerStyle | 页脚自定义样式 | `CSSProperties \| string` | - |
| drawerStyle | 抽屉面板整体自定义样式 | `CSSProperties \| string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 面板打开时触发 | - |
| opened | 面板开启动画结束时触发 | - |
| close | 面板关闭时触发 | - |
| closed | 面板关闭动画结束时触发 | - |
| resize | 调整大小时触发 | `(size: number)` |
| update:modelValue | v-model 更新事件 | `(value: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 抽屉的核心内容区域 |
| header | 自定义整个头部区域 (覆盖标题和关闭按钮) |
| title | 仅自定义标题文字部分 |
| footer | 自定义页脚内容区域 |
| close-icon | 自定义关闭按钮内部图标 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| drawerRef | 抽屉容器 DOM 元素引用 | `HTMLElement \| null` |
| handleClose | 手动触发关闭流程 (支持 beforeClose 钩子) | `(isClickModal?: boolean) => void` |

## 主题变量 (CSS Variables)

组件深度集成 YH-UI 设计系统，所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-drawer-bg-color` | 抽屉面板背景色 | `var(--yh-bg-color-overlay)` |
| `--yh-drawer-shadow` | 抽屉阴影强度 | `var(--yh-shadow-lg)` |
| `--yh-drawer-title-color` | 标题文本颜色 | `var(--yh-text-color-primary)` |
| `--yh-drawer-border-color` | 分割线/边框颜色 | `var(--yh-border-color-lighter)` |
| `--yh-drawer-header-height` | 头部高度 | `56px` |
| `--yh-drawer-footer-height` | 底部高度 | `60px` |
| `--yh-drawer-padding` | 内容区内边距 | `20px` |
| `--yh-drawer-radius` | 圆角大小 | `var(--yh-radius-xl)` |
| `--yh-drawer-transition` | 动画持续时间 | `var(--yh-transition-duration)` |
