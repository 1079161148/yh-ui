# Scrollbar 滚动条

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// --- 渲染用数据 ---
const scrollCount = ref(3)
const addScrollItem = () => scrollCount.value++
const removeScrollItem = () => {
  if (scrollCount.value > 0) scrollCount.value--
}

// --- 代码示例 ---

const tsBasic = `<${_T}>
  <yh-scrollbar height="200px">
    <div v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </div>
  </yh-scrollbar>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
</${_S}>

<${_St} scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--yh-color-primary-light-9);
  color: var(--yh-color-primary);
}
</${_St}>`

const jsBasic = toJs(tsBasic)

const tsHorizontal = `<${_T}>
  <yh-scrollbar>
    <div class="scrollbar-flex-content">
      <div v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </div>
    </div>
  </yh-scrollbar>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
</${_S}>

<${_St} scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--yh-color-success-light-9);
  color: var(--yh-color-success);
}
</${_St}>`

const jsHorizontal = toJs(tsHorizontal)

const tsMaxHeight = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button @click="add">添加条目</yh-button>
    <yh-button @click="remove" style="margin-left: 12px">移除条目</yh-button>
  </div>
  <yh-scrollbar max-height="200px">
    <div v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </div>
  </yh-scrollbar>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const count = ref(3)
const add = () => count.value++
const remove = () => {
  if (count.value > 0) count.value--
}
</${_S}>

<${_St} scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  border-radius: 4px;
  background: var(--yh-color-warning-light-9);
  color: var(--yh-color-warning);
}
</${_St}>`

const jsMaxHeight = toJs(tsMaxHeight)
</script>

用于替换浏览器原生滚动条，提供更一致的视觉体验和更强大的交互控制。

## 基础用法

通过 `height` 属性设置滚动条高度。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <yh-scrollbar height="200px">
      <div v-for="item in 20" :key="item" style="display: flex; align-items: center; justify-content: center; height: 50px; margin: 10px; text-align: center; border-radius: 4px; background: var(--yh-color-primary-light-9); color: var(--yh-color-primary);">
        {{ item }}
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

## 横向滚动

当内容宽度超过容器宽度时，会自动出现横向滚动条。

<DemoBlock title="横向滚动" :ts-code="tsHorizontal" :js-code="jsHorizontal">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <yh-scrollbar>
      <div style="display: flex;">
        <div v-for="item in 50" :key="item" style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 100px; height: 50px; margin: 10px; text-align: center; border-radius: 4px; background: var(--yh-color-success-light-9); color: var(--yh-color-success);">
          {{ item }}
        </div>
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

## 最大高度

使用 `max-height` 属性限制最大高度。

<DemoBlock title="最大高度" :ts-code="tsMaxHeight" :js-code="jsMaxHeight">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <div style="margin-bottom: 16px">
      <yh-button @click="addScrollItem">添加条目</yh-button>
      <yh-button @click="removeScrollItem" style="margin-left: 12px">移除条目</yh-button>
    </div>
    <yh-scrollbar max-height="200px">
      <div v-for="item in scrollCount" :key="item" style="display: flex; align-items: center; justify-content: center; height: 50px; margin: 10px; border-radius: 4px; background: var(--yh-color-warning-light-9); color: var(--yh-color-warning);">
        {{ item }}
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Scrollbar 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <yh-scrollbar height="150px">
      <div v-for="item in 10" :key="item" style="padding: 10px; margin-bottom: 5px; background: var(--yh-color-primary-light-9); border-radius: 4px; text-align: center;">
        Nuxt SSR Item {{ item }}
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 支持 `height` 和 `max-height` 动态展示
- ✅ 自定义滑块在客户端激活，不影响服务端首屏渲染
- ✅ 原生滚动条降级模式 (native) 完美支持 SSR

## API

### Props

| 参数            | 说明               | 类型                      | 可选值 | 默认值  |
| --------------- | ------------------ | ------------------------- | ------ | ------- |
| height          | 滚动条高度         | `string / number`         | —      | —       |
| max-height      | 滚动条最大高度     | `string / number`         | —      | —       |
| native          | 是否使用原生滚动条 | `boolean`                 | —      | `false` |
| always          | 滚动条总是显示     | `boolean`                 | —      | `false` |
| min-size        | 滚动条最小尺寸     | `number`                  | —      | `20`    |
| view-class      | 视图的自定义类名   | `string`                  | —      | —       |
| view-style      | 视图的自定义样式   | `string / object / array` | —      | —       |
| noresize        | 不响应容器尺寸变化 | `boolean`                 | —      | `false` |
| tag             | 视图的元素标签     | `string`                  | —      | `div`   |
| theme-overrides | 主题覆盖变量       | `ComponentThemeVars`      | —      | —       |

### Events

| 事件名称 | 说明     | 回调参数                    |
| -------- | -------- | --------------------------- |
| scroll   | 滚动事件 | `{ scrollLeft, scrollTop }` |

### Methods

| 方法名        | 说明                   | 参数                                               |
| ------------- | ---------------------- | -------------------------------------------------- |
| scrollTo      | 滚动到指定位置         | `(options: ScrollToOptions \| number, y?: number)` |
| setScrollTop  | 设置滚动距离顶部的距离 | `(value: number)`                                  |
| setScrollLeft | 设置滚动距离左侧的距离 | `(value: number)`                                  |
| update        | 手动更新滚动条状态     | —                                                  |

## 主题变量

Scrollbar 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名                             | 说明         | 默认值        |
| ---------------------------------- | ------------ | ------------- |
| `--yh-scrollbar-width`             | 滚动条宽度   | `6px`         |
| `--yh-scrollbar-thumb-color`       | 滑块颜色     | `#c0c4cc`     |
| `--yh-scrollbar-thumb-hover-color` | 滑块悬停颜色 | `#909399`     |
| `--yh-scrollbar-track-color`       | 轨道颜色     | `transparent` |
| `--yh-scrollbar-thumb-radius`      | 滑块圆角     | `3px`         |
