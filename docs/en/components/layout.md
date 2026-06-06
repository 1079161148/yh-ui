<script setup lang="ts">
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <yh-row class="demo-row">
    <yh-col :span="24"><div class="grid-content bg-purple-dark">24</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="12"><div class="grid-content bg-purple">12</div></yh-col>
    <yh-col :span="12"><div class="grid-content bg-purple-light">12</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
  </yh-row>
</${_T}>

<${_St} scoped>
.demo-row {
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.bg-purple-dark { background: #99a9bf; }
.bg-purple { background: #d3dce6; color: #5e6d82; }
.bg-purple-light { background: #e5e9f2; color: #5e6d82; }
</${_St}>`

const jsBasic = toJs(tsBasic)

const tsGutter = `<${_T}>
  <yh-row :gutter="20">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
  </yh-row>
</${_T}>

<${_St} scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #d3dce6;
}
</${_St}>`

const jsGutter = toJs(tsGutter)

const tsMixed = `<${_T}>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="16"><div class="grid-content bg-purple">16</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple">4</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple-light">4</div></yh-col>
  </yh-row>
</${_T}>

<${_St} scoped>
.demo-row { margin-bottom: 20px; }
.grid-content { border-radius: 4px; min-height: 36px; }
.bg-purple { background: #d3dce6; }
.bg-purple-light { background: #e5e9f2; }
</${_St}>`

const jsMixed = toJs(tsMixed)

const tsOffset = `<${_T}>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
</${_T}>

<${_St} scoped>
.demo-row { margin-bottom: 20px; }
.grid-content { border-radius: 4px; min-height: 36px; background: #d3dce6; }
</${_St}>`

const jsOffset = toJs(tsOffset)

const tsAlign = `<${_T}>
  <yh-row justify="start" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
  </yh-row>
  <yh-row justify="center" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
  </yh-row>
  <yh-row justify="end" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
  </yh-row>
  <yh-row justify="space-between" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
  </yh-row>
  <yh-row justify="space-around" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
  </yh-row>
</${_T}>

<${_St} scoped>
.demo-row { margin-bottom: 20px; }
.grid-content { border-radius: 4px; min-height: 36px; line-height: 36px; text-align: center; }
.bg-purple { background: #d3dce6; color: #5e6d82; }
.bg-purple-light { background: #e5e9f2; color: #5e6d82; }
</${_St}>`

const jsAlign = toJs(tsAlign)

// Nuxt usage example
const tsNuxt = `<${_T}>
  <yh-row :gutter="20">
    <yh-col :span="12">
      <div style="background: var(--yh-color-primary-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-primary);">
        <yh-icon name="success" :size="24" color="var(--yh-color-primary)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-primary-dark-2);">Nuxt Auto Import</p>
      </div>
    </yh-col>
    <yh-col :span="12">
      <div style="background: var(--yh-color-success-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-success);">
        <yh-icon name="star" :size="24" color="var(--yh-color-success)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-success-dark-2);">SSR Optimized</p>
      </div>
    </yh-col>
  </yh-row>
</${_T}>

<${_S} setup lang="ts">
// Layout components are already configured for Nuxt auto-import
</${_S}>`

const jsNuxt = toJs(tsNuxt)
</script>

<style>
.demo-row {
  margin-bottom: 20px;
}
.demo-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
  color: #5e6d82;
}
.bg-purple-light {
  background: #e5e9f2;
  color: #5e6d82;
}
</style>

# Layout

Quickly and easily create layouts using the basic 24-column grid.

## Basic Layout

Use `yh-row` and `yh-col` components to combine layouts via the `span` attribute.

<DemoBlock title="Basic Layout" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-row class="demo-row">
    <yh-col :span="24"><div class="grid-content bg-purple-dark">24</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="12"><div class="grid-content bg-purple">12</div></yh-col>
    <yh-col :span="12"><div class="grid-content bg-purple-light">12</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
  </yh-row>
</DemoBlock>

## Column Spacing (Gutter)

Specify the column spacing via the `gutter` attribute. The default spacing is 0.

<DemoBlock title="Column Spacing" :ts-code="tsGutter" :js-code="jsGutter">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
  </yh-row>
</DemoBlock>

## Mixed Layout

Arbitrarily extend and combine the basic 24-column grid to form more complex mixed layouts.

<DemoBlock title="Mixed Layout" :ts-code="tsMixed" :js-code="jsMixed">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="16"><div class="grid-content bg-purple">16</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple">4</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple-light">4</div></yh-col>
  </yh-row>
</DemoBlock>

## Column Offset

Specify the number of columns to offset via the `offset` attribute.

<DemoBlock title="Column Offset" :ts-code="tsOffset" :js-code="jsOffset">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
</DemoBlock>

## Alignment

Use the `justify` attribute to control the horizontal alignment of elements within a row.

<DemoBlock title="Alignment" :ts-code="tsAlign" :js-code="jsAlign">
  <yh-row class="demo-row" justify="start">
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="center">
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="end">
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="space-between">
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="space-around">
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
  </yh-row>
</DemoBlock>

## Use in Nuxt

Row and Col components perform exceptionally well in Nuxt 3/4 environments. The layout's HTML structure is precisely generated on the server based on parameters like `span` and `gutter`, ensuring high stability and responsive consistency for the first screen.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-row :gutter="20">
    <yh-col :span="12">
      <div style="background: var(--yh-color-primary-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-primary);">
        <yh-icon name="success" :size="24" color="var(--yh-color-primary)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-primary-dark-2);">Nuxt Auto Import</p>
      </div>
    </yh-col>
    <yh-col :span="12">
      <div style="background: var(--yh-color-success-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-success);">
        <yh-icon name="star" :size="24" color="var(--yh-color-success)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-success-dark-2);">SSR Optimized</p>
      </div>
    </yh-col>
  </yh-row>
</DemoBlock>

**SSR Notes**:

- The 24-column grid class structure is stable in SSR output
- Gutter spacing is derived from row negative margins and column padding, so first paint stays aligned
- Responsive configurations (`xs`, `sm`, `md`, `lg`, `xl`) render deterministically from props
- Alignment props such as `justify` and `align` are SSR-safe because they only affect class names

::: tip Layout Consistency
Since the Layout components are based entirely on CSS Flexbox styling, they naturally provide SSR-stable output. In Nuxt pages, Row and Col rarely need any client-only handling.
:::

## API

### Props

#### Row Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| tag | Custom element tag | `string` | `'div'` |
| gutter | Grid spacing | `number` | `0` |
| justify | Horizontal alignment | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | Vertical alignment | `'top' \| 'middle' \| 'bottom'` | `'top'` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

#### Col Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| tag | Custom element tag | `string` | `'div'` |
| span | Number of grid columns occupied | `number` | `24` |
| offset | Number of grid columns to offset from the left | `number` | `0` |
| push | Number of grid columns to move right | `number` | `0` |
| pull | Number of grid columns to move left | `number` | `0` |
| xs | Responsive columns or responsive config for `<768px` | `number \| YhColResponsiveValue` | `{}` |
| sm | Responsive columns or responsive config for `>=768px` | `number \| YhColResponsiveValue` | `{}` |
| md | Responsive columns or responsive config for `>=992px` | `number \| YhColResponsiveValue` | `{}` |
| lg | Responsive columns or responsive config for `>=1200px` | `number \| YhColResponsiveValue` | `{}` |
| xl | Responsive columns or responsive config for `>=1920px` | `number \| YhColResponsiveValue` | `{}` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

Both `YhRow` and `YhCol` currently do not expose component events.

### Slots

| Component | Slot Name | Description |
| --- | --- | --- |
| `YhRow` | `default` | Row content |
| `YhCol` | `default` | Column content |

### Expose

`YhRow` and `YhCol` currently do not expose public instance methods or properties.

### Theme Variables

Row and Col are primarily layout primitives based on Flexbox and currently do not define dedicated component-level CSS variables. They still accept `themeOverrides` for consistency with the library theme system, but no exclusive variable table is consumed in source.

### Type Exports

This page documents the grid primitives `YhRow` and `YhCol`. Container-family exports such as `YhContainer`, `YhHeader`, `YhAside`, `YhMain`, and `YhFooter` are exported from the `container` module and documented on the Container page.

| Name | Description |
| --- | --- |
| `YhRowProps` | Props type for `YhRow` |
| `YhRowSlots` | Slots type for `YhRow` |
| `YhRowJustify` | Row justify union |
| `YhRowAlign` | Row align union |
| `YhRowContext` | Injected row context type |
| `YhRowInstance` | Public instance type for `YhRow` |
| `YhColProps` | Props type for `YhCol` |
| `YhColSlots` | Slots type for `YhCol` |
| `YhColResponsiveValue` | Responsive column config type |
| `YhColInstance` | Public instance type for `YhCol` |
