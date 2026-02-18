# Input

Input content via mouse or keyboard, the most basic form field wrapper.

<script setup lang="ts">
import { ref } from 'vue'

// Demo states
const inputBase = ref('')
const inputDisabled = ref('')
const inputClearable = ref('')
const inputPassword = ref('')
const inputIcon1 = ref('')
const inputIcon2 = ref('')
const inputTextarea = ref('')
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
const inputComposite1 = ref('')
const inputComposite2 = ref('')
const inputComposite3 = ref('')
const inputComposite4 = ref('')
const inputLength1 = ref('')
const inputLength2 = ref('')
const inputSizeLarge = ref('')
const inputSizeDefault = ref('')
const inputSizeSmall = ref('')
const inputFormatter = ref('')
const selectValue = ref('1')

// Nuxt usage example
const nuxtInput = ref('')

const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <!-- Basic input, auto-imported -->
    <yh-input v-model="nuxtInput" placeholder="Nuxt auto-import" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhInput
const nuxtInput = ref('')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const formatNumber = (value: string | number) => {
  if (!value) return ''
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}

// Code examples
const tsBasic = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Basic Input</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputBase" placeholder="Please input content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputBase = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Disabled</span>
      <div class="yh-demo-content">
        <yh-input placeholder="Disabled state" disabled />
      </div>
    </div>
  </div>
</template>`

const jsDisabled = tsDisabled

const tsClearable = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Clearable</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputClearable" placeholder="Please input content" clearable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputClearable = ref('')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsPassword = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Password Box</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputPassword" type="password" placeholder="Please input password" show-password />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputPassword = ref('')
<\/script>`

const jsPassword = tsPassword.replace('lang="ts"', '')

const tsIcon = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Prefix Icon</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon1" placeholder="Please input search content" prefix-icon="🔍" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Suffix Icon</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon2" placeholder="Please input date" suffix-icon="📅" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputIcon1 = ref('')
const inputIcon2 = ref('')
<\/script>`

const jsIcon = tsIcon.replace('lang="ts"', '')

const tsTextarea = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Textarea</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputTextarea" type="textarea" placeholder="Please input content" :rows="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputTextarea = ref('')
<\/script>`

const jsTextarea = tsTextarea.replace('lang="ts"', '')

const tsAutosize = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Autosize</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="Autosize height" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Limit Rows</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Limit 2-4 rows" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
<\/script>`

const jsAutosize = tsAutosize.replace('lang="ts"', '')

const tsComposite = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Prepend</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite1" placeholder="Please input">
          <template #prepend>Http://</template>
        </yh-input>
      </div>
    </div>

    <div class="yh-demo-row">
      <span class="yh-demo-label">Append</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite2" placeholder="Please input">
          <template #append>.com</template>
        </yh-input>
      </div>
    </div>

    <div class="yh-demo-row">
      <span class="yh-demo-label">Mixed Selection</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite3" placeholder="Please input">
          <template #prepend>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
          <template #append>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
        </yh-input>
      </div>
    </div>

    <div class="yh-demo-row">
      <span class="yh-demo-label">Buttons Around</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite4" placeholder="Please input">
          <template #prepend>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
          <template #append>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
        </yh-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputComposite1 = ref('')
const inputComposite2 = ref('')
const inputComposite3 = ref('')
const inputComposite4 = ref('')
const selectValue = ref('1')
<\/script>`

const jsComposite = tsComposite.replace('lang="ts"', '')

const tsWordLimit = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Text Input</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength1" placeholder="Max 10 chars" :maxlength="10" show-word-limit />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Long Content</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength2" type="textarea" placeholder="Max 100 chars" :maxlength="100" show-word-limit :rows="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputLength1 = ref('')
const inputLength2 = ref('')
<\/script>`

const jsWordLimit = tsWordLimit.replace('lang="ts"', '')

const tsSizes = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row yh-demo-row--large">
      <span class="yh-demo-label">Large - 40px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Default - 32px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
      </div>
    </div>
    <div class="yh-demo-row yh-demo-row--small">
      <span class="yh-demo-label">Small - 24px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputSizeLarge = ref('')
const inputSizeDefault = ref('')
const inputSizeSmall = ref('')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsFormatter = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Amount Format</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputFormatter" placeholder="Please input value" :formatter="formatNumber" :parser="parseNumber" />
        <div style="width: 100%; margin-top: 4px;">
           <div class="demo-val-badge">Actual internal value: {{ inputFormatter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputFormatter = ref('')

const formatNumber = (value: string | number) => {
  if (!value) return ''
  return String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}
<\/script>`

const jsFormatter = tsFormatter.replace('lang="ts"', '')
</script>

## Basic Usage

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Basic Input</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputBase" placeholder="Please input content" />
      </div>
    </div>
  </div>
</DemoBlock>

## Disabled State

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Disabled</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputDisabled" placeholder="Disabled state" disabled />
      </div>
    </div>
  </div>
</DemoBlock>

## Clearable

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Clearable</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputClearable" placeholder="Clearable" clearable />
      </div>
    </div>
  </div>
</DemoBlock>

## Password Box

<DemoBlock title="Password Box" :ts-code="tsPassword" :js-code="jsPassword">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Show Password</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputPassword" type="password" placeholder="Please input password" show-password />
      </div>
    </div>
  </div>
</DemoBlock>

## Input with Icons

<DemoBlock title="Input with Icons" :ts-code="tsIcon" :js-code="jsIcon">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Prefix Icon</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon1" placeholder="Please input search content" prefix-icon="🔍" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Suffix Icon</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon2" placeholder="Please input date" suffix-icon="📅" />
      </div>
    </div>
  </div>
</DemoBlock>

## Textarea

<DemoBlock title="Textarea" :ts-code="tsTextarea" :js-code="jsTextarea">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Textarea</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputTextarea" type="textarea" placeholder="Please input content" :rows="3" />
      </div>
    </div>
  </div>
</DemoBlock>

## Autosize Textarea

<DemoBlock title="Autosize" :ts-code="tsAutosize" :js-code="jsAutosize">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Autosize</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="Autosize height" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Limit Rows</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Limit 2-4 rows" />
      </div>
    </div>
  </div>
</DemoBlock>

## Composite Input

Add an element before or after the input field, typically a label or a button.

<DemoBlock title="Composite Input" :ts-code="tsComposite" :js-code="jsComposite">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Prepend</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite1" placeholder="Please input">
          <template #prepend>Http://</template>
        </yh-input>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Append</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite2" placeholder="Please input">
          <template #append>.com</template>
        </yh-input>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Mixed Selection</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite3" placeholder="Please input">
          <template #prepend>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
          <template #append>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
        </yh-input>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Buttons Around</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite4" placeholder="Please input">
          <template #prepend>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
          <template #append>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
        </yh-input>
      </div>
    </div>
  </div>
</DemoBlock>

## Input Length Limit

<DemoBlock title="Word Limit" :ts-code="tsWordLimit" :js-code="jsWordLimit">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Text Input</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength1" placeholder="Max 10 chars" :maxlength="10" show-word-limit />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Long Content</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength2" type="textarea" placeholder="Max 100 chars" :maxlength="100" show-word-limit :rows="3" />
      </div>
    </div>
  </div>
</DemoBlock>

## Different Sizes

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row yh-demo-row--large">
      <span class="yh-demo-label">Large - 40px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Default - 32px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
      </div>
    </div>
    <div class="yh-demo-row yh-demo-row--small">
      <span class="yh-demo-label">Small - 24px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
      </div>
    </div>
  </div>
</DemoBlock>

## Formatted Input

<DemoBlock title="Formatted" :ts-code="tsFormatter" :js-code="jsFormatter">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Amount Format</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputFormatter" placeholder="Please input value" :formatter="formatNumber" :parser="parseNumber" />
        <div style="width: 100%; margin-top: 4px;">
          <div class="demo-val-badge">Actual internal value: {{ inputFormatter }}</div>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## Use in Nuxt

Input fully supports Nuxt 3/4 SSR rendering. When used in a Nuxt project, the component is automatically imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-input v-model="nuxtInput" placeholder="Nuxt auto-import" />
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Basic input and textarea modes are fully supported.
- ✅ Style and layout are consistent between server and browser.
- ✅ Dynamic ID generation is SSR-safe (based on `useId`).
- ⚠️ `autofocus` attribute only takes effect after client-side activation.

::: tip SSR Safety
The Input component is optimized for SSR, especially its ID generation mechanism, ensuring consistency between server rendering and client activation, effectively avoiding attribute mismatch errors.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number` | — |
| type | Type | `'text' \| 'password' \| 'textarea' \| 'number' \| 'email' \| 'url' \| 'tel' \| 'search'` | `'text'` |
| size | Input size | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | Placeholder text | `string` | — |
| disabled | Whether to disable | `boolean` | `false` |
| readonly | Whether to set read-only | `boolean` | `false` |
| clearable | Whether it is clearable | `boolean` | `false` |
| show-password | Whether to show password toggle icon | `boolean` | `false` |
| show-word-limit | Whether to show word count | `boolean` | `false` |
| maxlength | Maximum input length | `number \| string` | — |
| minlength | Minimum input length | `number \| string` | — |
| prefix-icon | Prefix icon | `string \| Component` | — |
| suffix-icon | Suffix icon | `string \| Component` | — |
| clear-icon | Clear icon | `string \| Component` | — |
| autofocus | Autofocus on mounting | `boolean` | `false` |
| autocomplete | Native autocomplete attribute | `string` | `'off'` |
| name | Native name attribute | `string` | — |
| form | Native form attribute | `string` | — |
| id | Input ID | `string` | — |
| tabindex | Input tabindex | `string \| number` | — |
| validate-event | Whether to trigger form validation on input | `boolean` | `true` |
| input-style | Input inline style | `object` | — |
| formatter | Format function (for display) | `(value: string \| number) => string` | — |
| parser | Parse function (for updating value) | `(value: string) => string` | — |
| rows | Textarea rows (effective for type="textarea") | `number` | `2` |
| autosize | Autosize height (effective for type="textarea") | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| resize | Whether to allow resizing (effective for type="textarea") | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | — |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when binding value updates | `(value: string) => void` |
| input | Triggered when input value changes | `(value: string) => void` |
| change | Triggered on blur or Enter press | `(value: string) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered on clicking clear button | `() => void` |
| keydown | Triggered on key down | `(event: KeyboardEvent) => void` |
| keyup | Triggered on key up | `(event: KeyboardEvent) => void` |
| compositionstart | Triggered when IME starts input | `(event: CompositionEvent) => void` |
| compositionupdate | Triggered during IME input | `(event: CompositionEvent) => void` |
| compositionend | Triggered when IME starts finishes | `(event: CompositionEvent) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| prefix | Header content of input |
| suffix | Footer content of input |
| prepend | Prepend content (composite input) |
| append | Append content (composite input) |
| clearIcon | Custom clear icon |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| ref | Input DOM element | `HTMLInputElement \| HTMLTextAreaElement \| undefined` |
| wrapperRef | Wrapper element DOM | `HTMLElement \| undefined` |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |
| select | Select text in input | `() => void` |
| clear | Clear input content | `() => void` |

## Theme Variables

The Input component uses the following CSS variables for customization:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-input-height` | Input height | `var(--yh-component-size-default)` |
| `--yh-input-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-input-padding` | Input padding | `0 var(--yh-spacing-md)` |
| `--yh-input-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-input-hover-border-color` | Hover border color | `var(--yh-border-color-hover)` |
| `--yh-input-focus-border-color` | Focus border color | `var(--yh-color-primary)` |
| `--yh-input-bg-color` | Background color | `var(--yh-fill-color-blank)` |
