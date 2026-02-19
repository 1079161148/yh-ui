# Config Provider 全局配置

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from '@yh-ui/components'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// --- 变量驱动 (与 Demo 1:1 绑定) ---

// 主题切换选用独立变量: themeValue
const themeValue = ref('#3b82f6')
const themeOptions = [
  { label: '默认蓝', value: '#3b82f6' },
  { label: '优雅紫', value: '#8b5cf6' },
  { label: '清新绿', value: '#10b981' },
  { label: '活力橙', value: '#f97316' }
]

// 国际化选用独立变量: localeValue
const localeValue = ref(zhCn)
const switchLocale = () => {
  localeValue.value = localeValue.value.name === 'zh-cn' ? en : zhCn
}

// 尺寸选用独立变量: sizeValue
const sizeValue = ref('default')

// 完整配置选用独立变量: fullState
const fullState = ref({
  theme: '#6366f1',
  locale: zhCn,
  size: 'default'
})
const switchFullLocale = () => {
  fullState.value.locale = fullState.value.locale.name === 'zh-cn' ? en : zhCn
}

// --- 示例代码字符串 (HTML 必须与预览逻辑完全一致) ---

const tsTheme = `<${_T}>
  <div class="demo-config-container">
    <yh-radio-group v-model="themeValue">
      <yh-radio-button value="#3b82f6">默认蓝</yh-radio-button>
      <yh-radio-button value="#8b5cf6">优雅紫</yh-radio-button>
      <yh-radio-button value="#10b981">清新绿</yh-radio-button>
      <yh-radio-button value="#f97316">活力橙</yh-radio-button>
    </yh-radio-group>

    <yh-config-provider :theme="themeValue" :global="false">
      <div class="demo-items">
        <yh-button type="primary">主题按钮</yh-button>
        <yh-switch :model-value="true" />
        <yh-checkbox :model-value="true">勾选框</yh-checkbox>
      </div>
    </yh-config-provider>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const themeValue = ref('#3b82f6')
</${_S}>`

const jsTheme = toJs(tsTheme)

const tsSize = `<${_T}>
  <yh-radio-group v-model="sizeValue" style="margin-bottom: 20px">
    <yh-radio-button value="small">小</yh-radio-button>
    <yh-radio-button value="default">中</yh-radio-button>
    <yh-radio-button value="large">大</yh-radio-button>
  </yh-radio-group>

  <yh-config-provider :size="sizeValue" :global="false">
    <div class="demo-items">
      <yh-button type="primary">按钮</yh-button>
      <yh-input placeholder="请输入内容" style="width: 200px" />
    </div>
  </yh-config-provider>
</${_T}>`

const jsSize = toJs(tsSize)

const tsFull = `<${_T}>
  <div class="full-demo-container">
    <div class="control-panel">
      <input type="color" v-model="fullState.theme" />
      <yh-button size="small" @click="switchFullLocale">
        {{ fullState.locale.name === 'zh-cn' ? '切换英文' : 'Switch to English' }}
      </yh-button>
      <yh-radio-group v-model="fullState.size" size="small">
        <yh-radio-button value="small">小</yh-radio-button>
        <yh-radio-button value="default">中</yh-radio-button>
        <yh-radio-button value="large">大</yh-radio-button>
      </yh-radio-group>
    </div>

    <yh-config-provider 
      :theme="fullState.theme" 
      :locale="fullState.locale" 
      :size="fullState.size"
      :global="false"
    >
      <div class="preview-card">
        <div class="card-header">
          <span>{{ fullState.locale.el.messagebox.title }}</span>
          <yh-tag type="primary">Active</yh-tag>
        </div>
        <yh-input :placeholder="fullState.locale.name === 'zh-cn' ? '请输入内容' : 'Please input'" />
        <div class="card-footer">
          <yh-button type="primary">{{ fullState.locale.el.messagebox.confirm }}</yh-button>
          <yh-button>{{ fullState.locale.el.messagebox.cancel }}</yh-button>
        </div>
      </div>
    </yh-config-provider>
  </div>
</${_T}>`

const jsFull = toJs(tsFull)
</script>

`YhConfigProvider` 为组件库提供全局配置，包括主题配色、国际化语言、组件尺寸等。

## 主题切换

通过 `theme` 属性可以动态切换配色。直接传入十六进制色值可实现精准的主题色覆盖。

<DemoBlock title="主题切换" :ts-code="tsTheme" :js-code="jsTheme">
<div class="demo-items-column">
  <yh-radio-group v-model="themeValue">
    <yh-radio-button v-for="t in themeOptions" :key="t.value" :value="t.value">
      {{ t.label }}
    </yh-radio-button>
  </yh-radio-group>
  <yh-config-provider :theme="themeValue" :global="false">
    <div class="demo-items-inline">
      <yh-button type="primary">主题按钮</yh-button>
      <yh-switch :model-value="true" />
      <yh-checkbox :model-value="true">勾选框</yh-checkbox>
    </div>
  </yh-config-provider>
</div>
</DemoBlock>

## 全局组件尺寸

配置 `size` 后，内部所有的 YH-UI 组件将自动应用该尺寸。

<DemoBlock title="全局尺寸" :ts-code="tsSize" :js-code="jsSize">
<div class="demo-items-column">
  <yh-radio-group v-model="sizeValue">
    <yh-radio-button value="small">小</yh-radio-button>
    <yh-radio-button value="default">中</yh-radio-button>
    <yh-radio-button value="large">大</yh-radio-button>
  </yh-radio-group>
  <yh-config-provider :size="sizeValue" :global="false">
    <div class="demo-items-inline">
      <yh-button type="primary">按钮</yh-button>
      <yh-input placeholder="请输入内容" style="width: 200px" />
    </div>
  </yh-config-provider>
</div>
</DemoBlock>

## 完整配置示例

演示如何同时联动配置主题、语言和尺寸，构建局部的定制化 UI 环境。

<DemoBlock title="完整配置" :ts-code="tsFull" :js-code="jsFull">
<div class="full-demo-container">
  <div class="control-panel">
    <input type="color" v-model="fullState.theme" class="color-picker" />
    <yh-button size="small" @click="switchFullLocale">
      {{ fullState.locale.name === 'zh-cn' ? '切换英文' : 'Switch Language' }}
    </yh-button>
    <yh-radio-group v-model="fullState.size" size="small">
      <yh-radio-button value="small">小</yh-radio-button>
      <yh-radio-button value="default">中</yh-radio-button>
      <yh-radio-button value="large">大</yh-radio-button>
    </yh-radio-group>
  </div>
  <yh-config-provider 
    :theme="fullState.theme" 
    :locale="fullState.locale" 
    :size="fullState.size" 
    :global="false"
  >
    <div class="preview-card">
      <div class="card-header">
        <span>{{ fullState.locale.el.messagebox.title }}</span>
        <yh-tag type="primary">Active</yh-tag>
      </div>
      <yh-input :placeholder="fullState.locale.name === 'zh-cn' ? '请输入内容' : 'Please input'" />
      <div class="card-footer">
        <yh-button type="primary">{{ fullState.locale.el.messagebox.confirm }}</yh-button>
        <yh-button>{{ fullState.locale.el.messagebox.cancel }}</yh-button>
      </div>
    </div>
  </yh-config-provider>
</div>
</DemoBlock>

## API 参考

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| theme | 全局主题 | `string` | 十六进制色值 / `purple` | `default` |
| locale | 国际化语言包 | `Language` | — | `zhCn` |
| size | 全局组件尺寸 | `'large' \| 'default' \| 'small'` | — | `'default'` |
| global | 是否注入到 `:root` | `boolean` | — | `true` |

<style scoped>
.demo-items-inline {
  display: flex;
  align-items: center;
  gap: 12px;
}
.demo-items-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.full-demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--yh-bg-color-page);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--yh-border-color-lighter);
}
.control-panel {
  display: flex;
  gap: 16px;
  align-items: center;
}
.color-picker {
  width: 40px;
  height: 32px;
  padding: 0;
  border: 1px solid var(--yh-border-color);
  border-radius: 4px;
  cursor: pointer;
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
