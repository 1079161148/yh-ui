<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const TXT = {
  content: 'Content',
  size: 'Font Size',
  color: 'Color',
  rotate: 'Cell Rotation',
  globalRotate: 'Global Rotation',
  height: 'Height',
  width: 'Width',
  lineHeight: 'Line Height',
  zIndex: 'z-index',
  gapX: 'X Gap',
  gapY: 'Y Gap',
  weight: 'Font Weight',
  style: 'Font Style',
  align: 'Text Align'
}

const config = reactive({
  content: 'YH-UI\nFlagship Watermark',
  fontSize: 18,
  color: 'rgba(64, 158, 255, 0.2)',
  fontStyle: 'normal',
  fontWeight: 600,
  rotate: -22,
  globalRotate: 0,
  width: 200,
  height: 140,
  gapX: 80,
  gapY: 80,
  zIndex: 10,
  textAlign: 'center',
  lineHeight: 24
})

interface FontStyle {
  fontStyle: string
  textAlign: string
}

const fontConfig = computed(() => ({
  color: config.color,
  fontSize: config.fontSize,
  fontWeight: config.fontWeight,
  fontStyle: config.fontStyle as FontStyle['fontStyle'],
  textAlign: config.textAlign as FontStyle['textAlign'],
  lineHeight: config.lineHeight
}))

const labPreviewHtml = `
            <div style="padding: 40px;">
              <h3 style="margin: 0 0 20px; font-size: 20px; color: #1f1f1f;">Build modern, fast, and flagship-level Vue 3 component libraries</h3>
              <div style="display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px;">
                <div style="width: 140px; min-width: 140px; background: #fff; padding: 12px; border-radius: 12px; border: 1px solid #f0f0f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); position: relative; z-index: 5; text-align: center;">
                  <div style="position: absolute; top: -8px; right: -8px; background: #409eff; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; z-index: 6;">z-index: 5</div>
                  <img src="https://avatars.githubusercontent.com/u/1079161148?v=4" style="width: 100%; border-radius: 8px; margin-bottom: 8px;" />
                  <p style="margin: 0; font-size: 12px; color: #666; font-weight: bold;">Core Asset Protection</p>
                </div>
                <div style="flex: 1; color: #606266; font-size: 14px; line-height: 1.6;">
                  <p>Here you can customize the watermark deeply. When z-index &lt; 5, the watermark text will hide behind the blue card, achieving differentiated protection for page elements.</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" style="width: 100%; border-radius: 12px; border: 1px solid #eee;" />
            </div>`

const getFullLabCode = (isTs: boolean) => {
  const fontObj = JSON.stringify(fontConfig.value, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/\n/g, '\n    ')
  const contentVal = config.content.replace(/\n/g, '\\n')

  return `<template>
  <div class="watermark-lab">
    <div class="lab-main">
      <div class="lab-preview-pane">
        <yh-watermark
          :content="config.content"
          :rotate="config.rotate"
          :global-rotate="config.globalRotate"
          :width="config.width"
          :height="config.height"
          :gap="[config.gapX, config.gapY]"
          :z-index="config.zIndex"
          :font="fontConfig"
        >${labPreviewHtml}
        </yh-watermark>
      </div>

      <div class="lab-control-pane">
        <div class="control-section">
          <label>${TXT.content}</label>
          <yh-input v-model="config.content" />
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.size}</label><yh-input-number v-model="config.fontSize" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.color}</label><yh-color-picker v-model="config.color" show-alpha style="width: 100%" /></div>
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.style}</label><yh-select v-model="config.fontStyle" style="width: 100%"><yh-option value="normal" label="Normal" /><yh-option value="italic" label="Italic" /></yh-select></div>
          <div class="control-field"><label>${TXT.align}</label><yh-select v-model="config.textAlign" style="width: 100%"><yh-option value="left" label="Left" /><yh-option value="center" label="Center" /><yh-option value="right" label="Right" /></yh-select></div>
        </div>
        <div class="control-section"><label>${TXT.weight}</label><yh-input-number v-model="config.fontWeight" :step="100" :min="100" style="width: 100%" /></div>
        <div class="control-section"><label>${TXT.rotate}</label><yh-slider v-model="config.rotate" :min="-180" :max="180" /></div>
        <div class="control-section"><label>${TXT.globalRotate}</label><yh-slider v-model="config.globalRotate" :min="-180" :max="180" /></div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.height}</label><yh-input-number v-model="config.height" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.width}</label><yh-input-number v-model="config.width" style="width: 100%" /></div>
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.lineHeight}</label><yh-input-number v-model="config.lineHeight" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.zIndex}</label><yh-input-number v-model="config.zIndex" style="width: 100%" /></div>
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.gapX}</label><yh-input-number v-model="config.gapX" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.gapY}</label><yh-input-number v-model="config.gapY" style="width: 100%" /></div>
        </div>
      </div>
    </div>
  </div>
<\/template>

<script setup${isTs ? ' lang="ts"' : ''}>
import { reactive, computed } from 'vue'

const config = reactive({
  content: '${contentVal}',
  fontSize: ${config.fontSize},
  color: '${config.color}',
  fontStyle: '${config.fontStyle}',
  fontWeight: ${config.fontWeight},
  textAlign: '${config.textAlign}',
  rotate: ${config.rotate},
  globalRotate: ${config.globalRotate},
  width: ${config.width},
  height: ${config.height},
  gapX: ${config.gapX},
  gapY: ${config.gapY},
  zIndex: ${config.zIndex},
  lineHeight: ${config.lineHeight}
})

const fontConfig = computed(() => (${fontObj}))
<\/script>

<style scoped>
.lab-main { display: flex; border: 1px solid #ebeef5; border-radius: 12px; height: 680px; overflow: hidden; background: #fff; }
.lab-preview-pane { flex: 1; position: relative; overflow: hidden; }
.lab-control-pane { width: 400px; background: #fafafa; padding: 30px; display: flex; flex-direction: column; gap: 24px; border-left: 1px solid #ebeef5; overflow-y: auto; }
.control-section { display: flex; flex-direction: column; gap: 10px; }
.control-grid { display: flex; gap: 16px; width: 100%; }
.control-field { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
label { font-size: 11px; font-weight: 700; color: #a0a0a0; text-transform: uppercase; letter-spacing: 0.5px; }
<\/style>`
}

const generatedTsCode = computed(() => getFullLabCode(true))
const generatedJsCode = computed(() => getFullLabCode(false))

const tsBasicCode = `<template>
  <yh-watermark content="YH-UI">
    <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f5f7fa; color: #909399;">Basic content display</div>
  </yh-watermark>
<\/template>`

const tsFormCode = `<template>
  <yh-watermark content="Confidential Do Not Share" :font="{ color: 'rgba(255, 0, 0, 0.15)' }">
    <div style="padding: 24px; border: 1px solid #ebeef5; border-radius: 8px; background: #fff;">
      <h4 style="margin: 0 0 16px; color: #303133;">Employee Sensitive Data Preview</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; color: #606266; font-size: 14px;">
        <div><strong>Account:</strong> user_admin_01</div>
        <div><strong>Name:</strong> Wang Xiaoming</div>
        <div><strong>Phone:</strong> 138****8888</div>
        <div><strong>Level:</strong> P7 - Senior Engineer</div>
        <div><strong>Salary:</strong> 32,000 CNY / month</div>
        <div><strong>Dept:</strong> Frontend Intelligence Dept</div>
      </div>
    </div>
  </yh-watermark>
<\/template>`

const fsShow = ref(false)
const tsFSCode = `<template>
  <yh-button type="primary" @click="show = !show">{{ show ? 'Hide' : 'Enable' }} Fullscreen Watermark</yh-button>
  <yh-watermark v-if="show" full-screen content="YH-UI Fullscreen Mode" :font="{ color: 'rgba(0,0,0,0.1)' }" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>`
</script>

# Watermark

Add a watermark to a specific area of the page. It supports text or image watermarks, fullscreen overlays, and anti-tamper regeneration.

## Basic Usage

<DemoBlock :tsCode="tsBasicCode" :jsCode="tsBasicCode">
<yh-watermark content="YH-UI">
<div style="height: 300px; background: #f5f7fa; display: flex; align-items: center; justify-content: center; color: #909399;">Basic content display</div>
</yh-watermark>
</DemoBlock>

## Business Scenario: Form Data Protection

For pages that display sensitive content, `YhWatermark` can be added directly around the protected area without changing the internal layout.

<DemoBlock :tsCode="tsFormCode" :jsCode="tsFormCode">
<yh-watermark content="Confidential Do Not Share" :font="{ color: 'rgba(255, 0, 0, 0.15)' }">
<div style="padding: 24px; border: 1px solid var(--yh-border-color-lighter, #ebeef5); border-radius: 8px; background: #fff;">
<h4 style="margin: 0 0 16px; color: var(--yh-text-color-primary, #303133);">Employee Sensitive Data Preview</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; color: var(--yh-text-color-regular, #606266); font-size: 14px;">
<div><strong>Account:</strong> user_admin_01</div>
<div><strong>Name:</strong> Wang Xiaoming</div>
<div><strong>Phone:</strong> 138****8888</div>
<div><strong>Level:</strong> P7 - Senior Engineer</div>
<div><strong>Salary:</strong> 32,000 CNY / month</div>
<div><strong>Dept:</strong> Frontend Intelligence Dept</div>
</div>
</div>
</yh-watermark>
</DemoBlock>

## Fullscreen Watermark

Use `full-screen` when the watermark should cover the whole viewport instead of a local container.

<DemoBlock :tsCode="tsFSCode" :jsCode="tsFSCode">
<yh-button type="primary" @click="fsShow = !fsShow">{{ fsShow ? 'Hide' : 'Enable' }} Fullscreen Watermark</yh-button>
<yh-watermark v-if="fsShow" full-screen content="YH-UI Fullscreen Mode" :font="{ color: 'rgba(0,0,0,0.1)' }" />
</DemoBlock>

## Interactive Configuration

The following lab keeps the existing preview layout and lets you inspect the effect of `font`, `gap`, rotation, and z-index changes in real time.

<DemoBlock :tsCode="generatedTsCode" :jsCode="generatedJsCode">
<div class="watermark-lab-wrapper">
<div class="lab-main">
<div class="lab-preview-pane">
<yh-watermark v-bind="config" :gap="[config.gapX, config.gapY]" :font="fontConfig">
<div class="preview-scroll-area">
<div class="preview-content-box" v-html="labPreviewHtml"></div>
</div>
</yh-watermark>
</div>
<div class="lab-control-pane">
<div class="control-scroll-area">
<div class="control-section"><label>{{ TXT.content }}</label><yh-input v-model="config.content" placeholder="Enter watermark content" /></div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.size }}</label><yh-input-number v-model="config.fontSize" :min="10" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.color }}</label><yh-color-picker v-model="config.color" show-alpha style="width: 100%" /></div>
</div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.style }}</label><yh-select v-model="config.fontStyle" style="width: 100%"><yh-option value="normal" label="Normal" /><yh-option value="italic" label="Italic" /></yh-select></div>
<div class="control-field"><label>{{ TXT.align }}</label><yh-select v-model="config.textAlign" style="width: 100%"><yh-option value="left" label="Left" /><yh-option value="center" label="Center" /><yh-option value="right" label="Right" /></yh-select></div>
</div>
<div class="control-section"><label>{{ TXT.weight }}</label><yh-input-number v-model="config.fontWeight" :step="100" :min="100" style="width: 100%" /></div>
<div class="control-section"><label>{{ TXT.rotate }}</label><yh-slider v-model="config.rotate" :min="-180" :max="180" /></div>
<div class="control-section"><label>{{ TXT.globalRotate }}</label><yh-slider v-model="config.globalRotate" :min="-180" :max="180" /></div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.height }}</label><yh-input-number v-model="config.height" :min="10" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.width }}</label><yh-input-number v-model="config.width" :min="10" style="width: 100%" /></div>
</div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.lineHeight }}</label><yh-input-number v-model="config.lineHeight" :min="0" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.zIndex }}</label><yh-input-number v-model="config.zIndex" :min="0" style="width: 100%" /></div>
</div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.gapX }}</label><yh-input-number v-model="config.gapX" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.gapY }}</label><yh-input-number v-model="config.gapY" style="width: 100%" /></div>
</div>
</div>
</div>
</div>
</div>
</DemoBlock>

## Use in Nuxt

`YhWatermark` is safe to import in Nuxt. The container markup can be rendered during SSR, while the actual watermark drawing runs on the client after mount. If you want to avoid rendering the watermark container before hydration in a browser-only area, you can wrap it with `<ClientOnly>`.

```vue
<template>
  <ClientOnly>
    <yh-watermark content="YH-UI Nuxt Powered">
      <div style="height: 300px;">Content Area</div>
    </yh-watermark>
  </ClientOnly>
</template>
```

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| width | Width of each watermark tile | `number` | `120` |
| height | Height of each watermark tile | `number` | `64` |
| rotate | Rotation angle of each watermark tile | `number` | `-22` |
| z-index | z-index applied to the watermark overlay | `number` | `9` |
| image | Image source used instead of text content | `string` | `undefined` |
| content | Watermark text content. Strings can include line breaks and arrays map to multiple lines. | `string \| string[]` | `'YH-UI'` |
| font | Watermark font configuration | `YhWatermarkFont` | `see below` |
| global-rotate | Global rotation angle of the repeated watermark layer | `number` | `0` |
| gap | Horizontal and vertical gap between watermark tiles | `[number, number]` | `[100, 100]` |
| offset | Declared offset prop. The current implementation does not consume it when positioning the watermark layer | `[number, number]` | `[0, 0]` |
| full-screen | Uses a fixed-position wrapper to cover the viewport. The component is not teleported to `body` | `boolean` | `false` |
| anti-tamper | Rebuilds the watermark when the overlay is removed or modified | `boolean` | `true` |
| theme-overrides | Component-level theme overrides. In the current implementation they are merged only in non-fullscreen mode | `ComponentThemeVars` | `undefined` |

### Font

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| color | Text color | `string` | `'rgba(0,0,0,0.15)'` |
| fontSize | Font size | `number \| string` | `16` |
| fontWeight | Font weight | `string \| number` | `'normal'` |
| fontFamily | Font family | `string` | `'sans-serif'` |
| fontStyle | Font style | `'normal' \| 'italic' \| 'oblique'` | `'normal'` |
| textAlign | Text alignment inside the watermark tile | `'start' \| 'end' \| 'left' \| 'right' \| 'center'` | `'center'` |
| lineHeight | Line height for multi-line text | `number` | `22` |

### Events

This component does not expose component events.

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Content covered by the watermark overlay | `-` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| renderWatermark | Forces the watermark to be regenerated | `() => void` |

## Theme Variables

`YhWatermark` supports `themeOverrides` and also exposes a small wrapper-level CSS variable surface.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-watermark-container-position` | Position mode of the watermark wrapper | `relative` |
| `--yh-watermark-width` | Wrapper width | `100%` |
| `--yh-watermark-height` | Wrapper height | `100%` |
| `--yh-watermark-fullscreen-z-index` | Fullscreen wrapper z-index | `9999` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhWatermarkProps` | Component props type |
| `YhWatermarkFont` | Watermark font config type |
| `YhWatermarkSlots` | Component slots type |
| `YhWatermarkExpose` | Component expose type |
| `YhWatermarkInstance` | Component instance type |

<style scoped>
.watermark-lab-wrapper { margin: -24px -24px 0 -24px; }
.lab-main { display: flex; height: 680px; border: 1px solid var(--yh-border-color-light, #ebeef5); border-radius: 12px; overflow: hidden; }
@media (max-width: 1200px) { .lab-main { flex-direction: column; height: auto; } }
.lab-preview-pane { flex: 1; background: #fff; position: relative; border-right: 1px solid var(--yh-border-color-extra-light, #f2f6fc); overflow: hidden; }
.preview-scroll-area { height: 100%; overflow-y: auto; scrollbar-width: none; }
.preview-scroll-area::-webkit-scrollbar { display: none; }
.lab-control-pane { width: 400px; background: #fafafa; overflow: hidden; border-left: 1px solid #ebeef5; }
@media (max-width: 1200px) { .lab-control-pane { width: 100%; border-top: 1px solid #f2f6fc; } }
.control-scroll-area { height: 100%; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; }
.control-scroll-area::-webkit-scrollbar { display: none; }
.control-section { display: flex; flex-direction: column; gap: 10px; }
.control-grid { display: flex; gap: 16px; width: 100%; }
.control-field { flex: 1; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
label { font-size: 11px; font-weight: 700; color: #a0a0a0; text-transform: uppercase; letter-spacing: 0.5px; }
</style>
