# Config Provider 全局配置

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from '@yh-ui/components'

// 主题配置示例
const theme1 = ref('purple')  // 基础用法的主题
const theme2 = ref('default')  // 主题切换的主题
const theme3 = ref('#6366f1')  // 自定义主题色

const themes = [
  { label: '默认蓝', value: 'default' },
  { label: '优雅紫', value: 'purple' },
  { label: '清新绿', value: 'green' },
  { label: '活力橙', value: 'orange' }
]

// 国际化配置示例
const locale = ref(zhCn)
const toggleLocale = () => {
  locale.value = locale.value.name === 'zh-cn' ? en : zhCn
}

// 尺寸配置示例
const size1 = ref('default')  // 全局尺寸示例

// 代码示例
const tsBasic = `<template>
  <yh-config-provider theme="purple">
    <yh-button type="primary">主题按钮<\/yh-button>
    <yh-tag type="primary">主题标签<\/yh-tag>
  <\/yh-config-provider>
<\/template>`

const jsBasic = tsBasic

const tsTheme = `<template>
  <div>
    <yh-radio-group v-model="currentTheme">
      <yh-radio-button value="default">默认蓝<\/yh-radio-button>
      <yh-radio-button value="purple">优雅紫<\/yh-radio-button>
      <yh-radio-button value="green">清新绿<\/yh-radio-button>
      <yh-radio-button value="orange">活力橙<\/yh-radio-button>
    <\/yh-radio-group>

    <yh-config-provider :theme="currentTheme">
      <yh-button type="primary">主题按钮<\/yh-button>
      <yh-switch :model-value="true" \/>
      <yh-checkbox :model-value="true">勾选框<\/yh-checkbox>
    <\/yh-config-provider>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const currentTheme = ref('default')
<\/script>`

const jsTheme = tsTheme.replace('lang="ts"', '')

const tsCustom = `<template>
  <div>
    <input type="color" v-model="customColor" />
    
    <yh-config-provider :theme="customColor">
      <yh-button type="primary">自定义主题按钮<\/yh-button>
      <yh-tag type="primary">自定义主题标签<\/yh-tag>
    <\/yh-config-provider>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const customColor = ref('#6366f1')
<\/script>`

const jsCustom = tsCustom.replace('lang="ts"', '')

const tsLocale = `<template>
  <div>
    <yh-button @click="toggleLocale">
      切换语言 ({{ locale.name }})
    <\/yh-button>

    <yh-config-provider :locale="locale">
      <yh-button type="primary">
        {{ locale.el.messagebox.confirm }}
      <\/yh-button>
    <\/yh-config-provider>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from 'yh-ui'

const locale = ref(zhCn)
const toggleLocale = () => {
  locale.value = locale.value.name === 'zh-cn' ? en : zhCn
}
<\/script>`

const jsLocale = tsLocale.replace('lang="ts"', '')

const tsSize = `<template>
  <div>
    <yh-radio-group v-model="size">
      <yh-radio-button value="small">Small<\/yh-radio-button>
      <yh-radio-button value="default">Default<\/yh-radio-button>
      <yh-radio-button value="large">Large<\/yh-radio-button>
    <\/yh-radio-group>

    <yh-config-provider :size="size">
      <yh-button type="primary">按钮<\/yh-button>
      <yh-input placeholder="输入框" \/>
    <\/yh-config-provider>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

// 完整案例状态
const configTheme = ref('#6366f1')
const configLocale = ref(zhCn)
const configSize = ref('default')

const toggleConfigLocale = () => {
  configLocale.value = configLocale.value.name === 'zh-cn' ? en : zhCn
}

const tsFull = `<template>
  <yh-config-provider
    :theme="theme"
    :locale="locale"
    :size="size"
    :z-index="2000"
  >
    <app />
  </yh-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn } from '@yh-ui/components'

const theme = ref('#6366f1')
const locale = ref(zhCn)
const size = ref('default')
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '')

// Nuxt 使用示例
const tsNuxt = `<template>
  <yh-config-provider theme="purple">
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
      <p>当前处于 Nuxt 配置预览模式 (紫色主题):</p>
      <div style="display: flex; gap: 12px;">
        <yh-button type="primary">确认提交</yh-button>
        <yh-tag type="primary">Nuxt Integrated</yh-tag>
      </div>
    </div>
  </yh-config-provider>
</template>

<script setup lang="ts">
// 在 Nuxt 中无需手动导入 YhConfigProvider
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

`YhConfigProvider` 为组件库提供全局配置，包括主题配色、国际化语言、组件尺寸等。

## 基础用法

在应用的最外层使用 ConfigProvider，为所有子组件提供统一配置。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">基础用法</span>
      <div class="yh-demo-content">
        <yh-config-provider :theme="theme1" :global="false">
          <yh-button type="primary">主题按钮</yh-button>
          <yh-tag type="primary" style="margin-left: 12px;">主题标签</yh-tag>
        </yh-config-provider>
      </div>
    </div>
  </div>
</DemoBlock>

## 主题切换

通过 `theme` 属性可以一键切换预设主题：`default`（默认蓝）、`purple`（优雅紫）、`green`（清新绿）、`orange`（活力橙）。

<DemoBlock title="主题切换" :ts-code="tsTheme" :js-code="jsTheme">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">选择主题</span>
      <div class="yh-demo-content">
        <yh-radio-group v-model="theme2">
          <yh-radio-button v-for="t in themes" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">预览效果</span>
      <div class="yh-demo-content">
        <div class="demo-preview">
          <yh-config-provider :theme="theme2" :global="false">
            <yh-button type="primary">主题按钮</yh-button>
            <yh-switch :model-value="true" />
            <yh-checkbox :model-value="true">勾选框</yh-checkbox>
            <yh-tag type="primary">主题标签</yh-tag>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 自定义主题色

除了预设主题，还可以传入任意十六进制颜色值作为主题色。

<DemoBlock title="自定义主题色" :ts-code="tsCustom" :js-code="jsCustom">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">选择颜色</span>
      <div class="yh-demo-content">
        <div style="display: flex; align-items: center; gap: 12px;">
          <input type="color" v-model="theme3" style="height: 32px; border: 1px solid var(--yh-border-color); border-radius: 4px;" />
          <span style="color: var(--yh-text-color-secondary);">{{ theme3 }}</span>
        </div>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">预览效果</span>
      <div class="yh-demo-content">
        <div class="demo-preview">
          <yh-config-provider :theme="theme3" :global="false">
            <yh-button type="primary">自定义主题按钮</yh-button>
            <yh-tag type="primary">自定义主题标签</yh-tag>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 国际化配置

通过 `locale` 属性切换语言，内置文本会自动更新。

<DemoBlock title="国际化配置" :ts-code="tsLocale" :js-code="jsLocale">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">当前语言</span>
      <div class="yh-demo-content">
        <yh-button @click="toggleLocale" type="primary" plain>
          {{ locale.name }} (点击切换)
        </yh-button>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">预览效果</span>
      <div class="yh-demo-content">
        <div class="demo-preview">
          <yh-config-provider :locale="locale" :global="false">
            <span style="color: var(--yh-text-color-regular);">确认按钮文本：{{ locale.el.messagebox.confirm }}</span>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 全局组件尺寸

配置 `size` 后，所有支持该属性的子组件都会应用此尺寸。

<DemoBlock title="全局组件尺寸" :ts-code="tsSize" :js-code="jsSize">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row" :class="'yh-demo-row--' + size1">
      <span class="yh-demo-label">全局尺寸</span>
      <div class="yh-demo-content">
        <yh-radio-group v-model="size1">
          <yh-radio-button value="small">Small</yh-radio-button>
          <yh-radio-button value="default">Default</yh-radio-button>
          <yh-radio-button value="large">Large</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="yh-demo-row" :class="'yh-demo-row--' + size1">
      <span class="yh-demo-label">预览组件</span>
      <div class="yh-demo-content">
        <div class="demo-preview size-demo-preview">
          <yh-config-provider :size="size1" :global="false">
            <yh-button type="primary">按钮</yh-button>
            <yh-input placeholder="输入框" style="width: 200px" />
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 完整配置示例

在一个典型的项目中，你通常会在 `App.vue` 中使用 `ConfigProvider` 来包裹整个应用。下面的示例展示了如何同时联动配置主题、语言和尺寸。

<DemoBlock title="完整配置" :ts-code="tsFull" :js-code="jsFull">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">控制中心</span>
      <div class="yh-demo-content">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
          <input type="color" v-model="configTheme" title="切换主题色" />
          <yh-button size="small" @click="toggleConfigLocale">
            切换语言: {{ configLocale.name }}
          </yh-button>
          <yh-radio-group v-model="configSize" size="small">
            <yh-radio-button value="small">小</yh-radio-button>
            <yh-radio-button value="default">中</yh-radio-button>
            <yh-radio-button value="large">大</yh-radio-button>
          </yh-radio-group>
        </div>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">动态预览</span>
      <div class="yh-demo-content">
        <div class="demo-preview full-config-preview">
          <yh-config-provider 
            :theme="configTheme" 
            :locale="configLocale" 
            :size="configSize" 
            :global="false"
          >
            <div class="preview-card">
              <div class="preview-header">
                <span style="font-weight: bold;">{{ configLocale.el.messagebox.title }}</span>
                <yh-tag type="primary">Active</yh-tag>
              </div>
              <yh-input :placeholder="configLocale.name === 'zh-cn' ? '请输入内容' : 'Please input'" />
              <div class="preview-footer">
                <yh-button type="primary">{{ configLocale.el.messagebox.confirm }}</yh-button>
                <yh-button>{{ configLocale.el.messagebox.cancel }}</yh-button>
              </div>
            </div>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

`YhConfigProvider` 是在 Nuxt 3/4 应用中实现全局主题和国际化的核心组件。建议在 `app.vue` 中将其作为根容器包裹 `NuxtPage` 或 `NuxtLayout`。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-config-provider theme="purple" :global="false">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <p style="margin: 0; color: var(--yh-text-color-secondary);">当前处于 Nuxt 配置预览模式 (紫色主题):</p>
        <div style="display: flex; gap: 12px;">
          <yh-button type="primary">确认提交</yh-button>
          <yh-tag type="primary">Nuxt Integrated</yh-tag>
        </div>
      </div>
    </yh-config-provider>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ **CSS 变量同步**：在服务端渲染时，CSS 变量会自动注入，确保首屏加载时主题色即刻生效，无颜色跳变
- ✅ **自动导入集成**：Nuxt 模块会自动导入 `YhConfigProvider` 及其关联的语言包
- ✅ **ID 稳定性**：配合 Nuxt 的 `useId` 机制，ConfigProvider 确保了弹出层 z-index 逻辑在 Hydration 阶段的稳定性
- 💡 **全局注入建议**：在 `app.vue` 中使用时，设置 `global` 为 `true`。如果在局部演示中使用，建议设置为 `false` 以避免影响全局样式

::: tip 状态同步
在 Nuxt 生态中，可以将 `theme` 和 `locale` 与 `useState` 结合使用，从而轻松实现跨页面的持久化配置同步。
:::

## API 参考

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| theme | 全局主题，支持预设主题或自定义颜色 | `string` | `default` / `purple` / `green` / `orange` / 十六进制色值 | `default` |
| locale | 国际化语言包配置 | `Language` | — | `zhCn` |
| size | 全局组件尺寸 | `'large' \| 'default' \| 'small'` | — | `'default'` |
| zIndex | 全局弹出层 Z-Index 起始值 | `number` | — | `2000` |
| global | 是否将 CSS 变量注入到 `:root` | `boolean` | — | `true` |

### 主题色说明

**预设主题：**
- `default` - 默认蓝色主题（#409eff）
- `purple` - 优雅紫色主题（#9333ea）
- `green` - 清新绿色主题（#10b981）
- `orange` - 活力橙色主题（#f97316）

**自定义主题：**
传入任意有效的十六进制颜色值，如 `#6366f1`、`#ec4899` 等。

<style scoped>
.demo-preview {
  display: flex;
  align-items: center;
  padding: 16px;
  background: var(--yh-fill-color-blank);
  border: 1px dashed var(--yh-border-color);
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;

  /* 穿透 config-provider 容器实现真正的内层居中对齐 */
  :deep(.yh-config-provider) {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px;
    width: 100%;
    vertical-align: middle;
  }

  /* 针对性修复按钮和输入框的细微错位 */
  :deep(.yh-button),
  :deep(.yh-input) {
    display: inline-flex !important;
    align-items: center !important;
    margin: 0 !important; /* 移除任何可能的干扰外边距 */
  }

  /* 非 vue 组件渲染时的回退处理 */
  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
}

/* 专项优化：针对尺寸演示区域进行重心微调 */
.size-demo-preview {
  min-height: 80px; /* 锁定高度防止抖动 */
  
  :deep(.yh-input__wrapper) {
     /* 确保输入框内部容器也不带偏移 */
     display: flex !important;
     align-items: center !important;
  }
}

/* 完整案例专项样式 */
.full-config-preview {
  background: var(--yh-fill-color-light) !important;
  justify-content: center !important;
}

.preview-card {
  background: var(--yh-bg-color-overlay);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--yh-box-shadow-light);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: var(--yh-text-color-primary);
}

.preview-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
</style>
