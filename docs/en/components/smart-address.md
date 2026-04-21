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
  province: '440000',
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

A specialized address input component with an integrated smart parsing workflow. It can extract name, phone number, and region fields from pasted text, and supports input, select, and cascader region modes.

## Basic Usage (Input Mode)

By default, the region fields are rendered as three plain inputs. Paste address text into the parser area and click "Smart Parse" to fill the form.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressBasic" />
  </div>
</DemoBlock>

## Dropdown Select Mode

Set `region-type="select"` and pass `region-options` to render linked province, city, and district selects.

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

Set `region-type="cascader"` to use a cascader picker for region selection.

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

When backend region data uses custom field names such as `name/code/items`, configure `label-field`, `value-field`, and `children-field` to map the structure.

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

Set `label-placement="top"` to move labels above the fields.

<DemoBlock title="Top Aligned Labels" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressPlacement" label-placement="top" />
  </div>
</DemoBlock>

## Usage in Nuxt

`YhSmartAddress` can be used directly in Nuxt after registering the YH-UI module. The form renders during SSR, and parser or linked region interactions continue on the client after hydration.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressBasic" />
  </div>
</DemoBlock>

### How to Configure

Register the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    components: ['YhSmartAddress']
  }
})
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Current address value | `AddressValue` | `{ name: '', phone: '', province: '', city: '', district: '', street: '', detail: '' }` |
| `region-type` | Province/city/district mode | `'input' \| 'select' \| 'cascader'` | `'input'` |
| `region-options` | Region tree data source | `RegionOption[]` | `[]` |
| `label-field` | Field name for labels | `string` | `'label'` |
| `value-field` | Field name for values | `string` | `'value'` |
| `children-field` | Field name for children | `string` | `'children'` |
| `show-name` | Whether to display the name field | `boolean` | `true` |
| `show-phone` | Whether to display the phone field | `boolean` | `true` |
| `show-street` | Whether to display the street field | `boolean` | `false` |
| `show-parser` | Whether to display the smart parser | `boolean` | `true` |
| `parse-placeholder` | Placeholder for the parser input | `string` | `''` |
| `parse-button-text` | Text for the parse button | `string` | `''` |
| `required` | Whether fields are required | `boolean` | `false` |
| `disabled` | Whether to disable the component | `boolean` | `false` |
| `label-placement` | Label placement | `'left' \| 'top'` | `'left'` |
| `parser` | Custom parser function | `(raw: string) => ParsedAddress` | `null` |
| `theme-overrides` | Theme variables override | `ComponentThemeVars` | `{}` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when value changes | `(val: AddressValue) => void` |
| `parsed` | Triggered after smart parsing | `(val: ParsedAddress) => void` |
| `change` | Triggered when any field changes | `(val: AddressValue) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| `parse-icon` | Icon slot on the left side of the parse button |
| `region` | Slot for custom region input area |
| `extra` | Slot for additional content at the bottom |

### Expose

This component does not expose public instance methods or properties.

### Types

**AddressValue**

```ts
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

```ts
interface RegionOption {
  label?: string
  value?: string | number
  children?: RegionOption[]
  [key: string]: unknown
}
```

**ParsedAddress**

```ts
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

`YhSmartAddress` supports `themeOverrides`. The following CSS variables are available:

| Variable Name | Description | Default Value |
| --- | --- | --- |
| `--yh-smart-address-parser-bg` | Background of smart parse area | `var(--yh-color-primary-light-9)` |
| `--yh-smart-address-input-bg` | Background of input fields | `var(--yh-fill-color-blank)` |
| `--yh-smart-address-parse-btn-bg` | Background of parse button | `var(--yh-color-primary)` |
| `--yh-smart-address-tip-success` | Color of success tip | `var(--yh-color-success)` |
| `--yh-smart-address-tip-error` | Color of error tip | `var(--yh-color-danger)` |
| `--yh-smart-address-label-width` | Width of form labels | `72px` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhSmartAddressProps` | Component props type |
| `YhSmartAddressEmits` | Component emits type |
| `YhSmartAddressSlots` | Component slots type |
| `YhAddressValue` | Address value type |
| `YhRegionOption` | Region option type |
| `YhParsedAddress` | Parsed address type |
| `YhSmartAddressInstance` | Component instance type |
