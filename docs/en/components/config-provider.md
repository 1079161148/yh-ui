# Config Provider

`YhConfigProvider` provides scoped or global configuration for theme color, locale, component size, z-index, and message behavior.

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from '@yh-ui/components'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const themeValue = ref('#3b82f6')
const themeOptions = [
  { label: 'Default Blue', value: '#3b82f6' },
  { label: 'Elegant Purple', value: '#8b5cf6' },
  { label: 'Fresh Green', value: '#10b981' },
  { label: 'Vibrant Orange', value: '#f97316' }
]

const sizeValue = ref('default')

const fullState = ref({
  theme: '#6366f1',
  locale: en,
  size: 'default'
})

const switchFullLocale = () => {
  fullState.value.locale = fullState.value.locale.name === 'en' ? zhCn : en
}

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
        {{ fullState.locale.name === 'en' ? 'Switch to Chinese' : 'Switch to English' }}
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
        <yh-input :placeholder="fullState.locale.name === 'en' ? 'Please input' : 'Please enter content'" />
        <div class="card-footer">
          <yh-button type="primary">{{ fullState.locale.el.messagebox.confirm }}</yh-button>
          <yh-button>{{ fullState.locale.el.messagebox.cancel }}</yh-button>
        </div>
      </div>
    </yh-config-provider>
  </div>
</${_T}>`

const jsFull = toJs(tsFull)

const tsNuxt = `<${_T}>
  <yh-config-provider :theme="'#10b981'" :global="false">
    <yh-button type="primary">Scoped theme in Nuxt</yh-button>
  </yh-config-provider>
</${_T}>`

const jsNuxt = toJs(tsNuxt)
</script>

## Theme Switching

Use the `theme` prop to switch the active primary color. Preset names and hex values are both supported.

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

Use the `size` prop to make nested YH-UI components follow the same size.

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

This example combines theme, locale, and size in one local provider scope.

<DemoBlock title="Full Configuration" :ts-code="tsFull" :js-code="jsFull">
  <div class="full-demo-container">
    <div class="control-panel">
      <input type="color" v-model="fullState.theme" class="color-picker" />
      <yh-button size="small" @click="switchFullLocale">
        {{ fullState.locale.name === 'en' ? 'Switch to Chinese' : 'Switch to English' }}
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
        <yh-input :placeholder="fullState.locale.name === 'en' ? 'Please input' : 'Please enter content'" />
        <div class="card-footer">
          <yh-button type="primary">{{ fullState.locale.el.messagebox.confirm }}</yh-button>
          <yh-button>{{ fullState.locale.el.messagebox.cancel }}</yh-button>
        </div>
      </div>
    </yh-config-provider>
  </div>
</DemoBlock>

## Use in Nuxt

`YhConfigProvider` works in Nuxt SSR. Wrap the part of the page that needs scoped configuration, and the provider will apply theme styles through inline CSS variables while locale and size are passed through context.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-config-provider :theme="'#10b981'" :global="false">
    <yh-button type="primary">Scoped theme in Nuxt</yh-button>
  </yh-config-provider>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| theme | Global or scoped theme preset / primary color | `string \| PresetTheme` | `'default'` |
| locale | Locale object passed to nested components | `Language` | `zhCn` |
| size | Shared component size | `'small' \| 'default' \| 'large'` | `'default'` |
| z-index | Base z-index value exposed through provider context | `number` | `2000` |
| message | Global message behavior overrides | `ConfigProviderContext['message']` | `{}` |
| global | Whether theme styles are applied globally instead of the local provider scope | `boolean` | `true` |

### Events

This component does not expose component events.

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Content rendered inside the provider scope | `-` |

### Expose

This component does not expose public instance methods or properties.

### Theme Variables

This component does not provide component-level `themeOverrides`. Theme, locale, size, z-index, and message behavior are passed to child components through provider context, and theme CSS variables are generated by the theme manager for the provider scope or `:root`.

### Type Exports

| Name | Description |
| --- | --- |
| `YhConfigProviderProps` | Props type for `YhConfigProvider` |
| `YhConfigProviderSlots` | Slots type for `YhConfigProvider` |
| `YhConfigProviderInstance` | Public instance type for `YhConfigProvider` |
| `ConfigProviderContext` | Provider context type |

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
