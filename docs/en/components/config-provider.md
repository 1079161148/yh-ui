# Config Provider

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from '@yh-ui/components'

// Theme config example
const theme1 = ref('purple')
const theme2 = ref('default')
const theme3 = ref('#6366f1')

const themes = [
  { label: 'Default Blue', value: 'default' },
  { label: 'Elegant Purple', value: 'purple' },
  { label: 'Fresh Green', value: 'green' },
  { label: 'Vibrant Orange', value: 'orange' }
]

// Internationalization config example
const locale = ref(zhCn)
const toggleLocale = () => {
  locale.value = locale.value.name === 'zh-cn' ? en : zhCn
}

// Size config example
const size1 = ref('default')

// Code examples
const tsBasic = `<template>
  <yh-config-provider theme="purple">
    <yh-button type="primary">Theme Button<\/yh-button>
    <yh-tag type="primary">Theme Tag<\/yh-tag>
  <\/yh-config-provider>
<\/template>`

const jsBasic = tsBasic

const tsTheme = `<template>
  <div>
    <yh-radio-group v-model="currentTheme">
      <yh-radio-button value="default">Default Blue<\/yh-radio-button>
      <yh-radio-button value="purple">Elegant Purple<\/yh-radio-button>
      <yh-radio-button value="green">Fresh Green<\/yh-radio-button>
      <yh-radio-button value="orange">Vibrant Orange<\/yh-radio-button>
    <\/yh-radio-group>

    <yh-config-provider :theme="currentTheme">
      <yh-button type="primary">Theme Button<\/yh-button>
      <yh-switch :model-value="true" \/>
      <yh-checkbox :model-value="true">Checkbox<\/yh-checkbox>
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
      <yh-button type="primary">Custom Theme Button<\/yh-button>
      <yh-tag type="primary">Custom Theme Tag<\/yh-tag>
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
      Switch Language ({{ locale.name }})
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
      <yh-button type="primary">Button<\/yh-button>
      <yh-input placeholder="Input" \/>
    <\/yh-config-provider>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

// Full example state
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

// Nuxt usage example
const tsNuxt = `<template>
  <yh-config-provider theme="purple">
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
      <p>Currently in Nuxt config preview mode (purple theme):</p>
      <div style="display: flex; gap: 12px;">
        <yh-button type="primary">Submit</yh-button>
        <yh-tag type="primary">Nuxt Integrated</yh-tag>
      </div>
    </div>
  </yh-config-provider>
</template>

<script setup lang="ts">
// No need to manually import YhConfigProvider in Nuxt
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

`YhConfigProvider` provides global configuration for the component library, including theme colors, internationalization, component sizes, and more.

## Basic Usage

Use ConfigProvider at the outermost layer of your application to provide unified configuration for all child components.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Basic Usage</span>
      <div class="yh-demo-content">
        <yh-config-provider :theme="theme1" :global="false">
          <yh-button type="primary">Theme Button</yh-button>
          <yh-tag type="primary" style="margin-left: 12px;">Theme Tag</yh-tag>
        </yh-config-provider>
      </div>
    </div>
  </div>
</DemoBlock>

## Theme Switching

Use the `theme` prop to switch between preset themes: `default` (Blue), `purple` (Elegant Purple), `green` (Fresh Green), `orange` (Vibrant Orange).

<DemoBlock title="Theme Switching" :ts-code="tsTheme" :js-code="jsTheme">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Select Theme</span>
      <div class="yh-demo-content">
        <yh-radio-group v-model="theme2">
          <yh-radio-button v-for="t in themes" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Preview</span>
      <div class="yh-demo-content">
        <div class="demo-preview">
          <yh-config-provider :theme="theme2" :global="false">
            <yh-button type="primary">Theme Button</yh-button>
            <yh-switch :model-value="true" />
            <yh-checkbox :model-value="true">Checkbox</yh-checkbox>
            <yh-tag type="primary">Theme Tag</yh-tag>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Custom Theme Color

In addition to preset themes, you can pass any hexadecimal color value as the theme color.

<DemoBlock title="Custom Theme Color" :ts-code="tsCustom" :js-code="jsCustom">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Pick Color</span>
      <div class="yh-demo-content">
        <div style="display: flex; align-items: center; gap: 12px;">
          <input type="color" v-model="theme3" style="height: 32px; border: 1px solid var(--yh-border-color); border-radius: 4px;" />
          <span style="color: var(--yh-text-color-secondary);">{{ theme3 }}</span>
        </div>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Preview</span>
      <div class="yh-demo-content">
        <div class="demo-preview">
          <yh-config-provider :theme="theme3" :global="false">
            <yh-button type="primary">Custom Theme Button</yh-button>
            <yh-tag type="primary">Custom Theme Tag</yh-tag>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Internationalization

Switch languages via the `locale` prop. Built-in text will update automatically.

<DemoBlock title="Internationalization" :ts-code="tsLocale" :js-code="jsLocale">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Current Language</span>
      <div class="yh-demo-content">
        <yh-button @click="toggleLocale" type="primary" plain>
          {{ locale.name }} (Click to switch)
        </yh-button>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Preview</span>
      <div class="yh-demo-content">
        <div class="demo-preview">
          <yh-config-provider :locale="locale" :global="false">
            <span style="color: var(--yh-text-color-regular);">Confirm button text: {{ locale.el.messagebox.confirm }}</span>
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Global Component Size

When `size` is configured, all child components that support this prop will use this size.

<DemoBlock title="Global Component Size" :ts-code="tsSize" :js-code="jsSize">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row" :class="'yh-demo-row--' + size1">
      <span class="yh-demo-label">Global Size</span>
      <div class="yh-demo-content">
        <yh-radio-group v-model="size1">
          <yh-radio-button value="small">Small</yh-radio-button>
          <yh-radio-button value="default">Default</yh-radio-button>
          <yh-radio-button value="large">Large</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="yh-demo-row" :class="'yh-demo-row--' + size1">
      <span class="yh-demo-label">Preview</span>
      <div class="yh-demo-content">
        <div class="demo-preview size-demo-preview">
          <yh-config-provider :size="size1" :global="false">
            <yh-button type="primary">Button</yh-button>
            <yh-input placeholder="Input" style="width: 200px" />
          </yh-config-provider>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Full Configuration Example

In a typical project, you would use `ConfigProvider` in `App.vue` to wrap the entire application. The example below shows how to configure theme, language, and size together.

<DemoBlock title="Full Configuration" :ts-code="tsFull" :js-code="jsFull">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Control Center</span>
      <div class="yh-demo-content">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
          <input type="color" v-model="configTheme" title="Switch theme color" />
          <yh-button size="small" @click="toggleConfigLocale">
            Switch Language: {{ configLocale.name }}
          </yh-button>
          <yh-radio-group v-model="configSize" size="small">
            <yh-radio-button value="small">S</yh-radio-button>
            <yh-radio-button value="default">M</yh-radio-button>
            <yh-radio-button value="large">L</yh-radio-button>
          </yh-radio-group>
        </div>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Dynamic Preview</span>
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
              <yh-input placeholder="Please input content" />
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

## Use in Nuxt

`YhConfigProvider` is the core component for implementing global theming and internationalization in Nuxt 3/4 applications. It is recommended to use it in `app.vue` as a root container wrapping `NuxtPage` or `NuxtLayout`.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-config-provider theme="purple" :global="false">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <p style="margin: 0; color: var(--yh-text-color-secondary);">Currently in Nuxt config preview mode (purple theme):</p>
        <div style="display: flex; gap: 12px;">
          <yh-button type="primary">Submit</yh-button>
          <yh-tag type="primary">Nuxt Integrated</yh-tag>
        </div>
      </div>
    </yh-config-provider>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ **CSS Variable Sync**: CSS variables are auto-injected during server rendering, ensuring theme colors take effect immediately on first load with no color flashing
- ✅ **Auto Import Integration**: The Nuxt module auto-imports `YhConfigProvider` and associated locale packages
- ✅ **ID Stability**: Combined with Nuxt's `useId` mechanism, ConfigProvider ensures popup z-index logic stability during Hydration
- 💡 **Global Injection Tip**: When used in `app.vue`, set `global` to `true`. For local demos, set to `false` to avoid affecting global styles

::: tip State Sync
In the Nuxt ecosystem, you can combine `theme` and `locale` with `useState` to easily achieve persistent configuration sync across pages.
:::

## API Reference

### Props

| Prop | Description | Type | Options | Default |
| --- | --- | --- | --- | --- |
| theme | Global theme, supports preset themes or custom colors | `string` | `default` / `purple` / `green` / `orange` / hex color | `default` |
| locale | Internationalization locale config | `Language` | — | `zhCn` |
| size | Global component size | `'large' \| 'default' \| 'small'` | — | `'default'` |
| zIndex | Global popup z-index start value | `number` | — | `2000` |
| global | Whether to inject CSS variables to `:root` | `boolean` | — | `true` |

### Theme Colors

**Preset Themes:**
- `default` - Default blue theme (#409eff)
- `purple` - Elegant purple theme (#9333ea)
- `green` - Fresh green theme (#10b981)
- `orange` - Vibrant orange theme (#f97316)

**Custom Theme:**
Pass any valid hexadecimal color value, such as `#6366f1`, `#ec4899`, etc.

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

  :deep(.yh-config-provider) {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px;
    width: 100%;
    vertical-align: middle;
  }

  :deep(.yh-button),
  :deep(.yh-input) {
    display: inline-flex !important;
    align-items: center !important;
    margin: 0 !important;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
}

.size-demo-preview {
  min-height: 80px;
  
  :deep(.yh-input__wrapper) {
     display: flex !important;
     align-items: center !important;
  }
}

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
