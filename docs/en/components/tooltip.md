# Tooltip

A lightweight, high-performance tooltip component based on the industry-leading [Floating UI](https://floating-ui.com/) positioning engine.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const customContentStyle = { 
  backgroundColor: '#fdf6ec', 
  color: '#e6a23c', 
  border: '1px solid #faecd8' 
}
const customArrowStyle = { 
  backgroundColor: '#fdf6ec' 
}

const tsBasic = `<${_T}>
  <div class="tooltip-base-box">
    <div class="row center">
      <yh-tooltip content="Top Start prompts info" placement="top-start">
        <yh-button>top-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top Center prompts info" placement="top">
        <yh-button>top</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top End prompts info" placement="top-end">
        <yh-button>top-end</yh-button>
      </yh-tooltip>
    </div>
    <div class="row" style="margin: 20px 0">
      <div class="col">
        <yh-tooltip content="Left Start prompts info" placement="left-start">
          <yh-button>left-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left Center prompts info" placement="left">
          <yh-button>left</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left End prompts info" placement="left-end">
          <yh-button>left-end</yh-button>
        </yh-tooltip>
      </div>
      <div class="col">
        <yh-tooltip content="Right Start prompts info" placement="right-start">
          <yh-button>right-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right Center prompts info" placement="right">
          <yh-button>right</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right End prompts info" placement="right-end">
          <yh-button>right-end</yh-button>
        </yh-tooltip>
      </div>
    </div>
    <div class="row center">
      <yh-tooltip content="Bottom Start prompts info" placement="bottom-start">
        <yh-button>bottom-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom Center prompts info" placement="bottom">
        <yh-button>bottom</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom End prompts info" placement="bottom-end">
        <yh-button>bottom-end</yh-button>
      </yh-tooltip>
    </div>
  </div>
</${_T}>`

const tsEffect = `<${_T}>
  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Dark Theme" effect="dark">
      <yh-button>Dark Mode (Default)</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Light Theme" effect="light">
      <yh-button>Light Mode</yh-button>
    </yh-tooltip>
  </div>
</${_T}>`

const tsCustomStyle = `<${_T}>
  <div style="display: flex; gap: 16px; padding: 20px 0;">
    <yh-tooltip 
      content="This is a fixed-width, scrollable Tooltip. When the content is very long, a scrollbar will automatically appear." 
      :width="200" 
      :max-height="80"
      scrollable
    >
      <yh-button>Fixed Width/Scroll</yh-button>
    </yh-tooltip>
    <yh-tooltip 
      content="Custom style content" 
      :content-style="{ backgroundColor: '#fdf6ec', color: '#e6a23c', border: '1px solid #faecd8' }"
      :arrow-style="{ backgroundColor: '#fdf6ec' }"
    >
      <yh-button>Custom Style</yh-button>
    </yh-tooltip>
  </div>
</${_T}>`

const tsHtml = `<${_T}>
  <yh-tooltip 
    content="<span>The content can be <strong style='color: #409eff'>HTML</strong></span>" 
    raw-content
  >
    <yh-button>hover me</yh-button>
  </yh-tooltip>
</${_T}>`

const tsTrigger = `<${_T}>
  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Hovered" trigger="hover">
      <yh-button>Hover</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Clicked" trigger="click">
      <yh-button>Click</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Right Clicked" trigger="contextmenu" placement="right">
      <yh-button>Right Click</yh-button>
    </yh-tooltip>
  </div>
</${_T}>`

const tsFollow = `<${_T}>
  <yh-tooltip content="Shadow following..." follow-cursor>
    <div class="follow-box">Experience mouse following effect</div>
  </yh-tooltip>
</${_T}>`

const tsInteractive = `<${_T}>
  <div style="padding: 20px 0;">
    <yh-tooltip interactive placement="top">
      <yh-button type="primary">Interactive Tooltip</yh-button>
      <${_T} #content>
        <div style="padding: 4px">
          <div style="margin-bottom: 8px">Interact here:</div>
          <yh-button size="small" type="primary">Confirm Action</yh-button>
        </div>
      </${_T}>
    </yh-tooltip>
  </div>
</${_T}>`

const tsNuxt = `<${_T}>
  <yh-tooltip content="Nuxt 3 Auto Import">
    <yh-button>Nuxt 3 Auto Import Demo</yh-button>
  </yh-tooltip>
</${_T}>`

const tsInput = `<${_T}>
  <yh-tooltip content="Focus the input to see the tooltip" trigger="focus">
    <input 
      type="text" 
      placeholder="Type spaces here to test..." 
      style="padding: 8px 12px; border: 1px solid #dcdfe6; border-radius: 4px; outline: none; width: 100%; max-width: 300px;"
    />
  </yh-tooltip>
</${_T}>`

const tsCustomTheme = `<${_T}>
  <div style="padding: 10px 0;">
    <yh-tooltip content="Bottom center" effect="customized" placement="bottom">
      <yh-button class="custom-theme-btn">Customized theme</yh-button>
    </yh-tooltip>
  </div>
</${_T}>

<${_S} setup lang="ts">
// Style code is usually in global CSS
</${_S}>

<${_St}>
.yh-tooltip__popper.is-customized {
  background: linear-gradient(90deg, #95d475 0%, #b3e19d 100%) !important;
  color: #303133 !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(149, 212, 117, 0.4);
}
.yh-tooltip__popper.is-customized .yh-tooltip__arrow {
  background: inherit !important;
  border: none !important;
}
</${_St}>`

const tsOuterLink = `<${_T}>
  <yh-tooltip interactive placement="top">
    <yh-button>View Source Code</yh-button>
    <${_T} #content>
      <div style="padding: 4px">
        <span>Click for more details </span>
        <a href="https://github.com/1079161148/yh-ui" target="_blank" style="color: #409eff; text-decoration: none; font-weight: bold;">GitHub Repo</a>
      </div>
    </${_T}>
  </yh-tooltip>
</${_T}>`

const jsBasic = toJs(tsBasic)
const jsEffect = toJs(tsEffect)
const jsCustomStyle = toJs(tsCustomStyle)
const jsHtml = toJs(tsHtml)
const jsTrigger = toJs(tsTrigger)
const jsFollow = toJs(tsFollow)
const jsInteractive = toJs(tsInteractive)
const jsNuxt = toJs(tsNuxt)
const jsInput = toJs(tsInput)
const jsCustomTheme = toJs(tsCustomTheme)
const jsOuterLink = toJs(tsOuterLink)
</script>

<style scoped>
.tooltip-base-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
  gap: 10px;
}
.tooltip-base-box .col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tooltip-base-box .row:not(:first-child) {
  margin-top: 10px;
}
.follow-box {
  width: 100%;
  height: 100px;
  border: 2px dashed #409eff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(64,158,255,0.05);
  color: #409eff;
  cursor: crosshair;
}
.custom-theme-btn {
  background: #f0f9eb !important;
  border-color: #e1f3d8 !important;
  color: #67c23a !important;
}
</style>

## Basic Usage

Provides 12 placement directions through the \`placement\` prop.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="tooltip-base-box">
    <div class="row center">
      <yh-tooltip content="Top Start prompts info" placement="top-start">
        <yh-button>top-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top Center prompts info" placement="top">
        <yh-button>top</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top End prompts info" placement="top-end">
        <yh-button>top-end</yh-button>
      </yh-tooltip>
    </div>
    <div class="row" style="margin: 20px 0">
      <div class="col">
        <yh-tooltip content="Left Start prompts info" placement="left-start">
          <yh-button>left-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left Center prompts info" placement="left">
          <yh-button>left</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left End prompts info" placement="left-end">
          <yh-button>left-end</yh-button>
        </yh-tooltip>
      </div>
      <div class="col">
        <yh-tooltip content="Right Start prompts info" placement="right-start">
          <yh-button>right-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right Center prompts info" placement="right">
          <yh-button>right</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right End prompts info" placement="right-end">
          <yh-button>right-end</yh-button>
        </yh-tooltip>
      </div>
    </div>
    <div class="row center">
      <yh-tooltip content="Bottom Start prompts info" placement="bottom-start">
        <yh-button>bottom-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom Center prompts info" placement="bottom">
        <yh-button>bottom</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom End prompts info" placement="bottom-end">
        <yh-button>bottom-end</yh-button>
      </yh-tooltip>
    </div>
  </div>
</DemoBlock>

## Theme

Two built-in themes: \`light\` and \`dark\`. Default is \`dark\`.

<DemoBlock title="Theme Effect" :ts-code="tsEffect" :js-code="jsEffect">
  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Dark Theme" effect="dark">
      <yh-button>Dark Mode (Default)</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Light Theme" effect="light">
      <yh-button>Light Mode</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

### Custom Theme

By setting \`effect="customized"\` and writing corresponding CSS, you can achieve terminal visual effects.

<DemoBlock title="Custom Theme" :ts-code="tsCustomTheme" :js-code="jsCustomTheme">
  <div style="padding: 10px 0;">
    <yh-tooltip content="Bottom center" effect="customized" placement="bottom">
      <yh-button class="custom-theme-btn">Customized theme</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

## Sizes and Styles

Supports custom width, max-height, and long content scrolling.

<DemoBlock title="Sizes and Free Styles" :ts-code="tsCustomStyle" :js-code="jsCustomStyle">
  <div style="display: flex; gap: 16px; padding: 20px 0;">
    <yh-tooltip content="This is a fixed-width and scrollable Tooltip. When the content is very large, it will automatically show a scrollbar, ensuring layout neatness." :width="200" :max-height="80" scrollable>
      <yh-button>Fixed Width/Scroll</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Custom style content" :content-style="{ backgroundColor: '#fdf6ec', color: '#e6a23c', border: '1px solid #faecd8' }" :arrow-style="{ backgroundColor: '#fdf6ec' }">
      <yh-button>Custom Style</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

## Display HTML Content

The content property can be set as an HTML string, enabled by \`raw-content\`.

<DemoBlock title="HTML Rendering" :ts-code="tsHtml" :js-code="jsHtml">
  <yh-tooltip content="<span>The content can be <strong style='color: #409eff'>HTML</strong></span>" raw-content>
    <yh-button>hover me</yh-button>
  </yh-tooltip>
</DemoBlock>

## Trigger Behavior

Supports hover, click, focus, and contextmenu triggers. Default is \`hover\`.

<DemoBlock title="Trigger Mode" :ts-code="tsTrigger" :js-code="jsTrigger">
  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Hovered" trigger="hover">
      <yh-button>Hover</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Clicked" trigger="click">
      <yh-button>Click</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Right Clicked" trigger="contextmenu" placement="right">
      <yh-button>Right Click</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

## Advanced Features

### Follow Cursor

<DemoBlock title="Follow Cursor" :ts-code="tsFollow" :js-code="jsFollow">
  <yh-tooltip content="Shadow following..." follow-cursor>
    <div class="follow-box">Experience mouse following effect</div>
  </yh-tooltip>
</DemoBlock>

### Interactive

<DemoBlock title="Interactive" :ts-code="tsInteractive" :js-code="jsInteractive">
  <div style="padding: 20px 0;">
    <yh-tooltip interactive placement="top">
      <yh-button type="primary">Interactive Tooltip</yh-button>
      <template #content>
        <div style="padding: 4px">
          <div style="margin-bottom: 8px">Interact here:</div>
          <yh-button size="small" type="primary">Confirm Action</yh-button>
        </div>
      </template>
    </yh-tooltip>
  </div>
</DemoBlock>

## Use in Nuxt

YH-UI is perfectly compatible with Nuxt 3. You can use components directly without manual import.

<DemoBlock title="Nuxt 3 Support" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tooltip content="Nuxt 3 Auto Import">
    <yh-button>Nuxt 3 Auto Import Demo</yh-button>
  </yh-tooltip>
</DemoBlock>

## FAQ

### How to allow space input in a nested Input?

When Tooltip contains an input box, in YH-UI, we ensure interaction logic doesn't interfere with normal input. You can nest it directly.

<DemoBlock title="Nested Input Example" :ts-code="tsInput" :js-code="jsInput">
  <div style="padding: 10px 0;">
    <yh-tooltip content="Focus input to see tip" trigger="focus">
      <input 
        type="text" 
        placeholder="Type space to test..." 
        style="padding: 8px 12px; border: 1px solid #dcdfe6; border-radius: 4px; outline: none; width: 100%; max-width: 300px;"
      />
    </yh-tooltip>
  </div>
</DemoBlock>

### How to use links in Tooltip?

Use \`content\` slot. Ensure \`interactive\` is enabled.

<DemoBlock title="Embed External link" :ts-code="tsOuterLink" :js-code="jsOuterLink">
  <div style="padding: 10px 0;">
    <yh-tooltip interactive placement="top">
      <yh-button>View Source Code</yh-button>
      <template #content>
        <div style="padding: 4px">
          <span>Click for details </span>
          <a href="https://github.com/1079161148/yh-ui" target="_blank" style="color: #409eff; text-decoration: none; font-weight: bold;">GitHub Repo</a>
        </div>
      </template>
    </yh-tooltip>
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| content | Display text | \`string\` | - |
| placement | Positioning | \`TooltipPlacement\` | \`'top'\` |
| trigger | Trigger mode | \`TooltipTrigger | TooltipTrigger[]\` | \`'hover'\` |
| disabled | Whether disabled | \`boolean\` | \`false\` |
| effect | Theme style | \`string\` | \`'dark'\` |
| offset | Offset [h, v] | \`[number, number]\` | \`[0, 8]\` |
| show-after | Show delay (ms) | \`number\` | \`0\` |
| hide-after | Hide delay (ms) | \`number\` | \`200\` |
| show-arrow | Whether to show arrow | \`boolean\` | \`true\` |
| interactive | Allow mouse enter popper | \`boolean\` | \`true\` |
| visible | Manual visibility | \`boolean | null\` | \`null\` |
| raw-content | Render HTML string | \`boolean\` | \`false\` |
| follow-cursor | Follow mouse cursor | \`boolean\` | \`false\` |
| persistent | Persistent DOM | \`boolean\` | \`true\` |
| width | Popper width | \`string | number\` | \`'auto'\` |
| max-height | Max height | \`string | number\` | \`'none'\` |
| scrollable | Scrollable content | \`boolean\` | \`false\` |
| popper-class | Custom popper class | \`string\` | - |
| popper-style | Custom popper style | \`object\` | - |
| content-class | Custom content class | \`string\` | - |
| content-style | Custom content style | \`object\` | - |
| z-index | z-index | \`number\` | \`2000\` |
| transition | Transition name | \`string\` | \`'yh-tooltip-fade'\` |
| teleported | Teleport to body | \`boolean\` | \`true\` |

### Slots

| Name | Description |
| --- | --- |
| default | Trigger element |
| content | Custom content (overrides content prop) |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| show | Triggers when showing | - |
| hide | Triggers when hiding | - |
| update:visible | Visibility change | \`(visible: boolean)\` |

### CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| \`--yh-tooltip-bg\` | Background color | \`var(--yh-bg-color-overlay)\` |
| \`--yh-tooltip-border\` | Border color | \`var(--yh-border-color-light)\` |
| \`--yh-tooltip-text\` | Text color | \`var(--yh-text-color-primary)\` |
| \`--yh-z-index-tooltip\` | z-index | \`2004\` |

::: tip Dark Mode
Tooltip automatically switches to dark themes when \`html.dark\` is present.
:::
