# Config Provider

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from '@yh-ui/components'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// --- State (1:1 synced with logic) ---

// Theme Switch: themeValue
const themeValue = ref('#3b82f6')
const themeOptions = [
  { label: 'Default Blue', value: '#3b82f6' },
  { label: 'Elegant Purple', value: '#8b5cf6' },
  { label: 'Fresh Green', value: '#10b981' },
  { label: 'Vibrant Orange', value: '#f97316' }
]

// Locale: localeValue
const localeValue = ref(en)
const switchLocale = () => {
  localeValue.value = localeValue.value.name === 'en' ? zhCn : en
}

// Size: sizeValue
const sizeValue = ref('default')

// Full Config: fullState
const fullState = ref({
  theme: '#6366f1',
  locale: en,
  size: 'default'
})
const switchFullLocale = () => {
  fullState.value.locale = fullState.value.locale.name === 'en' ? zhCn : en
}

// --- Demo Code Strings ---

const tsTheme = `<${_T}>
  <div class="demo-config-container">
    <yh-radio-group v-model="themeValue">
      <yh-radio-button value="#3b82f6">Default Blue</yh-radio-button>
      <yh-radio-button value="#8b5cf6">Elegant Purple</yh-radio-button>
      <yh-radio-button value="#10b981">Fresh Green</yh-radio-button>
      <yh-radio-button value="#f97316">Vibrant Orange</yh-radio-button>
    </yh-radio-group>

    <yh-config-provider :theme="themeValue" :global="false">
      <div class="demo-items">
        <yh-button type="primary">Theme Button</yh-button>
        <yh-switch :model-value="true" />
        <yh-checkbox :model-value="true">Checkbox</yh-checkbox>
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
    <yh-radio-button value="small">S</yh-radio-button>
    <yh-radio-button value="default">M</yh-radio-button>
    <yh-radio-button value="large">L</yh-radio-button>
  </yh-radio-group>

  <yh-config-provider :size="sizeValue" :global="false">
    <div class="demo-items">
      <yh-button type="primary">Button</yh-button>
      <yh-input placeholder="Please input" style="width: 200px" />
    </div>
  </yh-config-provider>
</${_T}>`

const jsSize = toJs(tsSize)

const tsFull = `<${_T}>
  <div class="full-demo-container">
    <div class="control-panel">
      <input type="color" v-model="fullState.theme" />
      <yh-button size="small" @click="switchFullLocale">
        {{ fullState.locale.name === 'en' ? 'Switch to Chinese' : '切换英文' }}
      </yh-button>
      <yh-radio-group v-model="fullState.size" size="small">
        <yh-radio-button value="small">S</yh-radio-button>
        <yh-radio-button value="default">M</yh-radio-button>
        <yh-radio-button value="large">L</yh-radio-button>
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
        <yh-input :placeholder="fullState.locale.name === 'en' ? 'Please input' : '请输入内容'" />
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

`YhConfigProvider` provides global configuration for the component library, including theme colors, internationalization, component sizes, and more.

## Theme Switching

Use the `theme` prop to switch theme colors dynamically. Overriding with HEX values is fully supported.

<DemoBlock title="Theme Switching" :ts-code="tsTheme" :js-code="jsTheme">
<div class="demo-items-column">
  <yh-radio-group v-model="themeValue">
    <yh-radio-button v-for="t in themeOptions" :key="t.value" :value="t.value">
      {{ t.label }}
    </yh-radio-button>
  </yh-radio-group>
  <yh-config-provider :theme="themeValue" :global="false">
    <div class="demo-items-inline">
      <yh-button type="primary">Theme Button</yh-button>
      <yh-switch :model-value="true" />
      <yh-checkbox :model-value="true">Checkbox</yh-checkbox>
    </div>
  </yh-config-provider>
</div>
</DemoBlock>

## Global Component Size

When `size` is configured, all internal YH-UI components will adapt to it.

<DemoBlock title="Global Size" :ts-code="tsSize" :js-code="jsSize">
<div class="demo-items-column">
  <yh-radio-group v-model="sizeValue">
    <yh-radio-button value="small">S</yh-radio-button>
    <yh-radio-button value="default">M</yh-radio-button>
    <yh-radio-button value="large">L</yh-radio-button>
  </yh-radio-group>
  <yh-config-provider :size="sizeValue" :global="false">
    <div class="demo-items-inline">
      <yh-button type="primary">Button</yh-button>
      <yh-input placeholder="Please input" style="width: 200px" />
    </div>
  </yh-config-provider>
</div>
</DemoBlock>

## Full Configuration Example

Demonstrates how to configure theme, language, and size together in a local environment.

<DemoBlock title="Full Configuration" :ts-code="tsFull" :js-code="jsFull">
<div class="full-demo-container">
  <div class="control-panel">
    <input type="color" v-model="fullState.theme" class="color-picker" />
    <yh-button size="small" @click="switchFullLocale">
      {{ fullState.locale.name === 'en' ? 'Switch to Chinese' : '切换英文' }}
    </yh-button>
    <yh-radio-group v-model="fullState.size" size="small">
      <yh-radio-button value="small">S</yh-radio-button>
      <yh-radio-button value="default">M</yh-radio-button>
      <yh-radio-button value="large">L</yh-radio-button>
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
      <yh-input :placeholder="fullState.locale.name === 'en' ? 'Please input' : '请输入内容'" />
      <div class="card-footer">
        <yh-button type="primary">{{ fullState.locale.el.messagebox.confirm }}</yh-button>
        <yh-button>{{ fullState.locale.el.messagebox.cancel }}</yh-button>
      </div>
    </div>
  </yh-config-provider>
</div>
</DemoBlock>

## API Reference

### Props

| Prop | Description | Type | Options | Default |
| --- | --- | --- | --- | --- |
| theme | Global theme | `string` | Hex color / `purple` | `default` |
| locale | Locale config | `Language` | — | `zhCn` |
| size | Global size | `'large' \| 'default' \| 'small'` | — | `'default'` |
| global | Inject into `:root` | `boolean` | — | `true` |

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
