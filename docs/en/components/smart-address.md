<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const addressBasic = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})

const addressSelect = ref({
  name: '',
  phone: '',
  province: 'Guangdong',
  city: 'Shenzhen',
  district: 'Nanshan',
  street: '',
  detail: ''
})

const addressCascader = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})

const addressCustom = ref({
  name: '',
  phone: '',
  province: '440000', // Using Code value
  city: '440300',
  district: '440305',
  street: '',
  detail: ''
})

const addressPlacement = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})

const regionOptionsCode = [
  {
    name: 'Guangdong',
    code: '440000',
    items: [
      {
        name: 'Shenzhen',
        code: '440300',
        items: [
          { name: 'Nanshan', code: '440305' },
          { name: 'Futian', code: '440304' }
        ]
      }
    ]
  }
]

const regionOptions = [
  {
    label: 'Guangdong',
    value: 'Guangdong',
    children: [
      {
        label: 'Shenzhen',
        value: 'Shenzhen',
        children: [
          { label: 'Nanshan', value: 'Nanshan' },
          { label: 'Futian', value: 'Futian' }
        ]
      },
      {
        label: 'Guangzhou',
        value: 'Guangzhou',
        children: [
          { label: 'Tianhe', value: 'Tianhe' },
          { label: 'Haizhu', value: 'Haizhu' }
        ]
      }
    ]
  },
  {
    label: 'Zhejiang',
    value: 'Zhejiang',
    children: [
      {
        label: 'Hangzhou',
        value: 'Hangzhou',
        children: [
          { label: 'Xihu', value: 'Xihu' },
          { label: 'Yuhang', value: 'Yuhang' }
        ]
      }
    ]
  }
]

// ─── Basic Usage (Input) ───────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="address" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsBasic = toJs(tsBasic)

// ─── Dropdown Select Mode ──────────────────────────────────────────────────────
const tsSelect = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="address"
      region-type="select"
      :region-options="regionOptions"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// Region tree data usually returned from backend APIs
const regionOptions = [
  {
    label: 'Guangdong', value: 'Guangdong',
    children: [
      {
        label: 'Shenzhen', value: 'Shenzhen',
        children: [
          { label: 'Nanshan', value: 'Nanshan' },
          { label: 'Futian', value: 'Futian' }
        ]
      },
      {
        label: 'Guangzhou', value: 'Guangzhou',
        children: [{ label: 'Tianhe', value: 'Tianhe' }, { label: 'Haizhu', value: 'Haizhu' }]
      }
    ]
  },
  {
    label: 'Zhejiang', value: 'Zhejiang',
    children: [
      {
        label: 'Hangzhou', value: 'Hangzhou',
        children: [{ label: 'Xihu', value: 'Xihu' }, { label: 'Yuhang', value: 'Yuhang' }]
      }
    ]
  }
]

const address = ref({
  name: '',
  phone: '',
  province: 'Guangdong',
  city: 'Shenzhen',
  district: 'Nanshan',
  street: '',
  detail: ''
})
</${_S}>`
const jsSelect = toJs(tsSelect)

// ─── Cascader Mode ─────────────────────────────────────────────────────────────
const tsCascader = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="address"
      region-type="cascader"
      :region-options="regionOptions"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const regionOptions = [
  {
    label: 'Guangdong', value: 'Guangdong',
    children: [
      {
        label: 'Shenzhen', value: 'Shenzhen',
        children: [{ label: 'Nanshan', value: 'Nanshan' }, { label: 'Futian', value: 'Futian' }]
      },
      {
        label: 'Guangzhou', value: 'Guangzhou',
        children: [{ label: 'Tianhe', value: 'Tianhe' }, { label: 'Haizhu', value: 'Haizhu' }]
      }
    ]
  },
  {
    label: 'Zhejiang', value: 'Zhejiang',
    children: [
      {
        label: 'Hangzhou', value: 'Hangzhou',
        children: [{ label: 'Xihu', value: 'Xihu' }, { label: 'Yuhang', value: 'Yuhang' }]
      }
    ]
  }
]

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsCascader = toJs(tsCascader)

const tsNuxt = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="address" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsNuxt = toJs(tsNuxt)

const tsCustom = `<${_T}>
  <div style="max-width: 700px; height: 650px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="address"
      region-type="select"
      :region-options="regionOptions"
      label-field="name"
      value-field="code"
      children-field="items"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// Custom fields in backend data, using administrative codes as values
const regionOptions = [
  {
    name: 'Guangdong',
    code: '440000',
    items: [
      {
        name: 'Shenzhen',
        code: '440300',
        items: [
          { name: 'Nanshan', code: '440305' },
          { name: 'Futian', code: '440304' }
        ]
      }
    ]
  }
]

const address = ref({
  name: '',
  phone: '',
  province: '440000',
  city: '440300',
  district: '440305',
  street: '',
  detail: ''
})
</${_S}>`
const jsCustom = toJs(tsCustom)

// ─── Label Placement ──────────────────────────────────────────────────────────
const tsPlacement = `<${_T}>
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="address" label-placement="top" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsPlacement = toJs(tsPlacement)
</script>

# SmartAddress

A specialized address input component with an integrated smart parsing algorithm. It can automatically extract name, phone number, and address regions from a single pasted string.
The region section (Province/City/District) natively supports three visual modes (Input, Select, Cascader) and seamlessly binds to tree-structured data sources from the backend.

## Basic Usage (Input Mode)

By default, the regions are rendered as three input boxes. Paste your address text (e.g., "John Doe 13800138000 Nanshan District, Shenzhen, Guangdong, Room 101") into the parser and click "Smart Parse".

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressBasic" />
  </div>
</DemoBlock>

## Dropdown Select Mode

Set `region-type="select"` and pass in `region-options` as your data source. This renders three side-by-side dropdown selections with hierarchical linkage.

<DemoBlock title="Select Mode" :ts-code="tsSelect" :js-code="jsSelect">
  <div style="max-width: 700px; height: 650px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="addressSelect"
      region-type="select"
      :region-options="regionOptions"
    />
  </div>
</DemoBlock>

## Cascader Mode

Set `region-type="cascader"` with your data source. This exposes a compact cascading picker for deeply-nested region selections.

<DemoBlock title="Cascader Mode" :ts-code="tsCascader" :js-code="jsCascader">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="addressCascader"
      region-type="cascader"
      :region-options="regionOptions"
    />
  </div>
</DemoBlock>

## Custom Fields and Codes

In many scenarios, backend field names might not be `label/value` (e.g., `name/code`), and `v-model` typically binds to area codes. By configuring `label-field` and `value-field`, the component automatically maps geographic names to their respective codes.

<DemoBlock title="Custom Fields and Codes" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="max-width: 700px; height: 650px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="addressCustom"
      region-type="select"
      :region-options="regionOptionsCode"
      label-field="name"
      value-field="code"
      children-field="items"
    />
  </div>
</DemoBlock>

## Label Placement

By setting \`label-placement="top"\`, you can switch labels to the top of the input fields, suitable for narrow screens or specific form layouts.

<DemoBlock title="Top Aligned Labels" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressPlacement" label-placement="top" />
  </div>
</DemoBlock>

## Usage in Nuxt

This component is fully compatible with Nuxt SSR. We recommend using it with the `@yh-ui/nuxt` module.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressBasic" />
  </div>
</DemoBlock>

### How to Configure

Simply register the module in your `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    // Enable for the components you want
    components: ['YhSmartAddress']
  }
})
```

## API

### Props

| Attribute                 | Description                         | Type                                | Default                        |
| ------------------------- | ----------------------------------- | ----------------------------------- | ------------------------------ |
| `model-value` / `v-model` | Current address value               | `AddressValue`                      | `{ name: '', phone: '', ... }` |
| `region-type`             | Province/City/District mode         | `'input' \| 'select' \| 'cascader'` | `'input'`                      |
| `region-options`          | Region tree data source             | `RegionOption[]`                    | `[]`                           |
| `label-field`             | Field name for labels               | `string`                            | `'label'`                      |
| `value-field`             | Field name for values               | `string`                            | `'value'`                      |
| `children-field`          | Field name for children             | `string`                            | `'children'`                   |
| `show-name`               | Whether to display the name         | `boolean`                           | `true`                         |
| `show-phone`              | Whether to display the phone        | `boolean`                           | `true`                         |
| `show-street`             | Whether to display the street       | `boolean`                           | `false`                        |
| `show-parser`             | Whether to display the smart parser | `boolean`                           | `true`                         |
| `parse-placeholder`       | Placeholder for parser              | `string`                            | —                              |
| `parse-button-text`       | Text for the parse button           | `string`                            | `'Smart Parse'`                |
| `required`                | Whether fields are required         | `boolean`                           | `false`                        |
| `disabled`                | Whether to disable component        | `boolean`                           | `false`                        |
| `label-placement`         | Label placement                     | `'left' \| 'top'`                   | `'left'`                       |
| `parser`                  | Custom parser function              | `(raw: string) => ParsedAddress`    | —                              |
| `theme-overrides`         | Theme variables override            | `Record<string, string>`            | —                              |

### Events

| Event Name          | Description                      | Callback Parameters            |
| ------------------- | -------------------------------- | ------------------------------ |
| `update:modelValue` | Triggered when value changes     | `(val: AddressValue) => void`  |
| `parsed`            | Triggered after smart parsing    | `(val: ParsedAddress) => void` |
| `change`            | Triggered when any field changes | `(val: AddressValue) => void`  |

### Slots

| Slot Name    | Description                                    |
| ------------ | ---------------------------------------------- |
| `default`    | Default slot for wrapping content              |
| `parse-icon` | Icon slot on the left side of the parse button |
| `region`     | Slot for custom region input area              |
| `extra`      | Slot for additional content at the bottom      |

### Types

**AddressValue**

```typescript
interface AddressValue {
  name: string
  phone: string
  province: string
  city: string
  district: string
  street: string
  detail: string
}
```

**RegionOption**

```typescript
interface RegionOption {
  label?: string // Label field
  value?: string | number // Value field
  children?: RegionOption[] // Children field
  [key: string]: unknown // Supports any custom fields
}
```

**ParsedAddress**

```typescript
interface ParsedAddress {
  name: string
  phone: string
  province: string
  city: string
  district: string
  street: string
  detail: string
}
```

### Theme Variables

| Variable Name                     | Description                    | Default Value                     |
| --------------------------------- | ------------------------------ | --------------------------------- |
| `--yh-smart-address-parser-bg`    | Background of smart parse area | `var(--yh-color-primary-light-9)` |
| `--yh-smart-address-input-bg`     | Background of input fields     | `var(--yh-fill-color-blank)`      |
| `--yh-smart-address-parse-btn-bg` | Background of parse button     | `var(--yh-color-primary)`         |
| `--yh-smart-address-tip-success`  | Color of success tip           | `var(--yh-color-success)`         |
| `--yh-smart-address-tip-error`    | Color of error tip             | `var(--yh-color-danger)`          |
| `--yh-smart-address-label-width`  | Width of form labels           | `72px`                            |
