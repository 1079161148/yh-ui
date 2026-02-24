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

- ✅ The 24-column grid ratios generate corresponding CSS class names on the server.
- ✅ Gutter spacing is perfectly realized via server-side negative margins and padding, ensuring no alignment jitter on the first screen.
- ✅ Responsive configurations (xs, sm, md, lg, xl) generate corresponding media query classes on the server.
- ✅ Alignment (justify) and vertical alignment (align) take effect on the server.

::: tip Layout Consistency
Since the Layout components are based entirely on CSS (Flexbox) styling, they inherently possess 100% SSR consistency. You rarely need to worry about hydration mismatches when using Row/Col in Nuxt pages.
:::

## API

### Row Props

| Prop    | Description          | Type                                                                                  | Default   |
| ------- | -------------------- | ------------------------------------------------------------------------------------- | --------- |
| gutter  | Grid spacing         | `number`                                                                              | `0`       |
| tag     | Custom element tag   | `string`                                                                              | `'div'`   |
| justify | Horizontal alignment | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align   | Vertical alignment   | `'top' \| 'middle' \| 'bottom'`                                                       | `'top'`   |

### Col Props

| Prop   | Description                                             | Type               | Default |
| ------ | ------------------------------------------------------- | ------------------ | ------- |
| span   | Number of grid columns occupied                         | `number`           | `24`    |
| offset | Number of grid columns to offset from the left          | `number`           | `0`     |
| push   | Number of grid columns to move right                    | `number`           | `0`     |
| pull   | Number of grid columns to move left                     | `number`           | `0`     |
| xs     | Responsive grid columns or attribute object for <768px  | `number \| object` | —       |
| sm     | Responsive grid columns or attribute object for ≥768px  | `number \| object` | —       |
| md     | Responsive grid columns or attribute object for ≥992px  | `number \| object` | —       |
| lg     | Responsive grid columns or attribute object for ≥1200px | `number \| object` | —       |
| xl     | Responsive grid columns or attribute object for ≥1920px | `number \| object` | —       |
| tag    | Custom element tag                                      | `string`           | `'div'` |

### Events

| Event Name | Description                                   | Callback Parameters |
| ---------- | --------------------------------------------- | ------------------- |
| —          | This component currently has no custom events | —                   |

### Slots

| Slot Name | Description    |
| --------- | -------------- |
| default   | Custom content |

### Expose

| Name | Description                                        | Type |
| ---- | -------------------------------------------------- | ---- |
| —    | This component currently has no exposed properties | —    |

## Theme Variables

Row/Col components are primarily based on Flex layout and currently have no specific component-level global CSS variables.

| Variable | Description | Default |
| -------- | ----------- | ------- |
| —        | None        | —       |
