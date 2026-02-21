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

// Feature 1: Variant
const inputVariant1 = ref('')
const inputVariant2 = ref('')
const inputVariant3 = ref('')
const inputVariant4 = ref('')

// Feature 2: Loading
const inputLoading = ref('VuePress')
const isLoading = ref(false)
const handleCheckAsync = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 2000)
}

// Feature 3: Status
const inputStatusSuccess = ref('Correct input')
const inputStatusWarning = ref('Check the format')
const inputStatusError = ref('Format error')

// Feature 4: SelectOnFocus
const inputSelectFocus = ref('Click to select me')

// Feature 5: ClearOnEscape
const inputEscape = ref('Press Esc to clear')

// Feature 6: List / prefix suffix string
const inputList = ref('')
const inputPrefixStr = ref('')
const inputSuffixStr = ref('')

// Feature 7: CountConfig
const inputCountConfig = ref('')
const countChinese = (value: string) => {
  let count = 0
  for (const ch of value) {
    count += /[\u4e00-\u9fa5]/.test(ch) ? 2 : 1
  }
  return count
}

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

// ── Feature Demo code strings ────────────────────────────────

const tsVariant = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <yh-input v-model="v1" placeholder="default (with border)" />
    <yh-input v-model="v2" variant="filled" placeholder="filled (filled background)" />
    <yh-input v-model="v3" variant="borderless" placeholder="borderless (no border)" />
    <yh-input v-model="v4" variant="underlined" placeholder="underlined (bottom line only)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
const v4 = ref('')
<\/script>`

const jsVariant = tsVariant.replace('lang="ts"', '')

const tsLoading = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputVal" :loading="isLoading" placeholder="Checking username..." clearable />
    <yh-button @click="handleCheck">Async Validate (simulate 2s)</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('VuePress')
const isLoading = ref(false)
const handleCheck = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 2000)
}
<\/script>`

const jsLoading = tsLoading.replace('lang="ts"', '')

const tsStatus = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="v1" status="success" placeholder="Success state" />
    <yh-input v-model="v2" status="warning" placeholder="Warning state" />
    <yh-input v-model="v3" status="error" placeholder="Error state" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const v1 = ref('Correct input')
const v2 = ref('Check the format')
const v3 = ref('Format error')
<\/script>`

const jsStatus = tsStatus.replace('lang="ts"', '')

const tsSelectFocus = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputVal" select-on-focus placeholder="Click to auto-select all text" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('Click to select me')
<\/script>`

const jsSelectFocus = tsSelectFocus.replace('lang="ts"', '')

const tsClearEscape = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputVal" clear-on-escape clearable placeholder="Press Esc to clear" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('Press Esc to clear')
<\/script>`

const jsClearEscape = tsClearEscape.replace('lang="ts"', '')

const tsListPrefix = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <!-- prefix/suffix string props -->
    <yh-input v-model="price" prefix="$" suffix="USD" placeholder="Enter price" />
    <!-- native datalist integration -->
    <yh-input v-model="framework" list="framework-list" placeholder="Select or type a framework" />
    <datalist id="framework-list">
      <option value="Vue" />
      <option value="React" />
      <option value="Angular" />
      <option value="Svelte" />
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const price = ref('')
const framework = ref('')
<\/script>`

const jsListPrefix = tsListPrefix.replace('lang="ts"', '')

const tsCountConfig = `<template>
  <div style="max-width: 320px;">
    <yh-input
      v-model="inputVal"
      :maxlength="20"
      show-word-limit
      :count-config="{ calculate: countChinese }"
      placeholder="CJK chars count as 2, others as 1"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('')

// CJK chars count as 2 bytes, others count as 1
const countChinese = (value: string) => {
  let count = 0
  for (const ch of value) {
    count += /[\\u4e00-\\u9fa5]/.test(ch) ? 2 : 1
  }
  return count
}
<\/script>`

const jsCountConfig = `<template>
  <div style="max-width: 320px;">
    <yh-input
      v-model="inputVal"
      :maxlength="20"
      show-word-limit
      :count-config="{ calculate: countChinese }"
      placeholder="CJK chars count as 2, others as 1"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const inputVal = ref('')

const countChinese = (value) => {
  let count = 0
  for (const ch of value) {
    count += /[\\u4e00-\\u9fa5]/.test(ch) ? 2 : 1
  }
  return count
}
<\/script>`

// Code examples
const tsBasic = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputBase" placeholder="Please input content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputBase = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="max-width: 320px;">
    <yh-input placeholder="Disabled state" disabled />
  </div>
</template>`

const jsDisabled = tsDisabled

const tsClearable = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputClearable" placeholder="Please input content" clearable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputClearable = ref('')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsPassword = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputPassword" type="password" placeholder="Please input password" show-password />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputPassword = ref('')
<\/script>`

const jsPassword = tsPassword.replace('lang="ts"', '')

const tsIcon = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputIcon1" placeholder="Please input search content" prefix-icon="🔍" />
    <yh-input v-model="inputIcon2" placeholder="Please input date" suffix-icon="📅" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputIcon1 = ref('')
const inputIcon2 = ref('')
<\/script>`

const jsIcon = tsIcon.replace('lang="ts"', '')

const tsTextarea = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputTextarea" type="textarea" placeholder="Please input content" :rows="3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputTextarea = ref('')
<\/script>`

const jsTextarea = tsTextarea.replace('lang="ts"', '')

const tsAutosize = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="Autosize height" />
    <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Limit 2-4 rows" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
<\/script>`

const jsAutosize = tsAutosize.replace('lang="ts"', '')

const tsComposite = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <yh-input v-model="inputComposite1" placeholder="Please input">
      <template #prepend>Http://</template>
    </yh-input>

    <yh-input v-model="inputComposite2" placeholder="Please input">
      <template #append>.com</template>
    </yh-input>

    <yh-input v-model="inputComposite3" placeholder="Please input">
      <template #prepend>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
      <template #append>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
    </yh-input>

    <yh-input v-model="inputComposite4" placeholder="Please input">
      <template #prepend>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
      <template #append>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
    </yh-input>
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
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputLength1" placeholder="Max 10 chars" :maxlength="10" show-word-limit />
    <yh-input v-model="inputLength2" type="textarea" placeholder="Max 100 chars" :maxlength="100" show-word-limit :rows="3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputLength1 = ref('')
const inputLength2 = ref('')
<\/script>`

const jsWordLimit = tsWordLimit.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
    <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
    <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
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
  <div style="max-width: 320px;">
    <yh-input v-model="inputFormatter" placeholder="Please input value" :formatter="formatNumber" :parser="parseNumber" />
    <div class="demo-val-badge">Actual internal value: {{ inputFormatter }}</div>
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
  <div style="max-width: 320px;">
    <yh-input v-model="inputBase" placeholder="Please input content" />
  </div>
</DemoBlock>

## Disabled State

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 320px;">
    <yh-input v-model="inputDisabled" placeholder="Disabled state" disabled />
  </div>
</DemoBlock>

## Clearable

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 320px;">
    <yh-input v-model="inputClearable" placeholder="Clearable" clearable />
  </div>
</DemoBlock>

## Password Box

<DemoBlock title="Password Box" :ts-code="tsPassword" :js-code="jsPassword">
  <div style="max-width: 320px;">
    <yh-input v-model="inputPassword" type="password" placeholder="Please input password" show-password />
  </div>
</DemoBlock>

## Input with Icons

<DemoBlock title="Input with Icons" :ts-code="tsIcon" :js-code="jsIcon">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputIcon1" placeholder="Please input search content" prefix-icon="🔍" />
    <yh-input v-model="inputIcon2" placeholder="Please input date" suffix-icon="📅" />
  </div>
</DemoBlock>

## Textarea

<DemoBlock title="Textarea" :ts-code="tsTextarea" :js-code="jsTextarea">
  <div style="max-width: 320px;">
    <yh-input v-model="inputTextarea" type="textarea" placeholder="Please input content" :rows="3" />
  </div>
</DemoBlock>

## Autosize Textarea

<DemoBlock title="Autosize" :ts-code="tsAutosize" :js-code="jsAutosize">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="Autosize height" />
    <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Limit 2-4 rows" />
  </div>
</DemoBlock>

## Composite Input

Add an element before or after the input field, typically a label or a button.

<DemoBlock title="Composite Input" :ts-code="tsComposite" :js-code="jsComposite">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <yh-input v-model="inputComposite1" placeholder="Please input">
      <template #prepend>Http://</template>
    </yh-input>
    <yh-input v-model="inputComposite2" placeholder="Please input">
      <template #append>.com</template>
    </yh-input>
    <yh-input v-model="inputComposite3" placeholder="Please input">
      <template #prepend>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
      <template #append>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
    </yh-input>
    <yh-input v-model="inputComposite4" placeholder="Please input">
      <template #prepend>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
      <template #append>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
    </yh-input>
  </div>
</DemoBlock>

## Input Length Limit

<DemoBlock title="Word Limit" :ts-code="tsWordLimit" :js-code="jsWordLimit">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputLength1" placeholder="Max 10 chars" :maxlength="10" show-word-limit />
    <yh-input v-model="inputLength2" type="textarea" placeholder="Max 100 chars" :maxlength="100" show-word-limit :rows="3" />
  </div>
</DemoBlock>

## Different Sizes

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
    <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
    <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
  </div>
</DemoBlock>

## Formatted Input

<DemoBlock title="Formatted" :ts-code="tsFormatter" :js-code="jsFormatter">
  <div style="max-width: 320px;">
    <yh-input v-model="inputFormatter" placeholder="Please input value" :formatter="formatNumber" :parser="parseNumber" />
    <div class="demo-val-badge">Actual internal value: {{ inputFormatter }}</div>
  </div>
</DemoBlock>

## Visual Variants

Use the `variant` prop to switch between four visual styles: `default` (with border), `filled` (filled background), `borderless` (no border), `underlined` (bottom line only).

<DemoBlock title="Visual Variants" :ts-code="tsVariant" :js-code="jsVariant">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <yh-input v-model="inputVariant1" placeholder="default (with border)" />
    <yh-input v-model="inputVariant2" variant="filled" placeholder="filled (filled background)" />
    <yh-input v-model="inputVariant3" variant="borderless" placeholder="borderless (no border)" />
    <yh-input v-model="inputVariant4" variant="underlined" placeholder="underlined (bottom line only)" />
  </div>
</DemoBlock>

## Loading State

Set `loading` to `true` to show a spinning loading icon in the suffix area. Commonly used for async username checks, real-time search, etc.

<DemoBlock title="Loading State" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputLoading" :loading="isLoading" placeholder="Checking username..." clearable />
    <yh-button @click="handleCheckAsync">Async Validate (simulate 2s)</yh-button>
  </div>
</DemoBlock>

## Independent Status Color

Use `status` to apply `success`, `warning`, or `error` border colors without relying on a Form/FormItem wrapper.

<DemoBlock title="Independent Status" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputStatusSuccess" status="success" placeholder="Success state" />
    <yh-input v-model="inputStatusWarning" status="warning" placeholder="Warning state" />
    <yh-input v-model="inputStatusError" status="error" placeholder="Error state" />
  </div>
</DemoBlock>

## Select On Focus

With `select-on-focus`, clicking or Tab-keying into the input will auto-select all text inside. Perfect for numeric editing or table cell editing.

<DemoBlock title="Select On Focus" :ts-code="tsSelectFocus" :js-code="jsSelectFocus">
  <div style="max-width: 320px;">
    <yh-input v-model="inputSelectFocus" select-on-focus placeholder="Click to auto-select all text" />
  </div>
</DemoBlock>

## Clear On Escape

With `clear-on-escape`, pressing `Esc` immediately clears the input content. Works best combined with `clearable`.

<DemoBlock title="Clear On Escape" :ts-code="tsClearEscape" :js-code="jsClearEscape">
  <div style="max-width: 320px;">
    <yh-input v-model="inputEscape" clear-on-escape clearable placeholder="Press Esc to clear" />
  </div>
</DemoBlock>

## Prefix/Suffix String & Native Datalist

The `prefix`/`suffix` props accept plain strings (e.g. currency symbols, units) without needing slots. The `list` prop binds a native `<datalist>` id for local autocomplete suggestions.

<DemoBlock title="Prefix/Suffix String & Datalist" :ts-code="tsListPrefix" :js-code="jsListPrefix">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <yh-input v-model="inputPrefixStr" prefix="$" suffix="USD" placeholder="Enter price" />
    <yh-input v-model="inputList" list="en-framework-datalist" placeholder="Select or type a framework" />
    <datalist id="en-framework-datalist">
      <option value="Vue" />
      <option value="React" />
      <option value="Angular" />
      <option value="Svelte" />
    </datalist>
  </div>
</DemoBlock>

## Custom Word Count

Use `count-config`'s `calculate` function to define custom length calculation logic, e.g. CJK characters count as 2 bytes.

<DemoBlock title="Custom Word Count" :ts-code="tsCountConfig" :js-code="jsCountConfig">
  <div style="max-width: 320px;">
    <yh-input
      v-model="inputCountConfig"
      :maxlength="20"
      show-word-limit
      :count-config="{ calculate: countChinese }"
      placeholder="CJK chars count as 2, others as 1"
    />
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
| variant | Visual variant style | `'default' \| 'filled' \| 'borderless' \| 'underlined'` | `'default'` |
| status | Independent status color, without relying on FormItem | `'' \| 'success' \| 'warning' \| 'error'` | `''` |
| loading | Whether to show loading state | `boolean` | `false` |
| disabled | Whether to disable | `boolean` | `false` |
| readonly | Whether to set read-only | `boolean` | `false` |
| clearable | Whether it is clearable | `boolean` | `false` |
| clear-on-escape | Whether pressing Esc clears the input | `boolean` | `false` |
| select-on-focus | Whether to auto-select all text on focus | `boolean` | `false` |
| show-password | Whether to show password toggle icon | `boolean` | `false` |
| show-word-limit | Whether to show word count | `boolean` | `false` |
| count-config | Custom word count configuration | `{ calculate?: (value: string) => number }` | — |
| maxlength | Maximum input length | `number \| string` | — |
| minlength | Minimum input length | `number \| string` | — |
| prefix-icon | Prefix icon | `string \| Component` | — |
| suffix-icon | Suffix icon | `string \| Component` | — |
| clear-icon | Clear icon | `string \| Component` | — |
| prefix | Prefix text string (shortcut for #prefix slot) | `string` | — |
| suffix | Suffix text string (shortcut for #suffix slot) | `string` | — |
| list | Native list attribute, binds a datalist element id | `string` | — |
| autofocus | Autofocus on mounting | `boolean` | `false` |
| autocomplete | Native autocomplete attribute | `string` | `'off'` |
| name | Native name attribute | `string` | — |
| form | Native form attribute | `string` | — |
| id | Input ID | `string` | — |
| aria-label | Native `aria-label` attribute | `string` | — |
| tabindex | Input tabindex | `string \| number` | — |
| validate-event | Whether to trigger form validation on input | `boolean` | `true` |
| input-style | Input inline style | `string \| object` | — |
| label | (Deprecated) Native `aria-label` attribute, suggest use `aria-label` | `string` | — |
| inputmode | Native `inputmode` attribute | `string` | — |
| model-modifiers | v-model modifiers | `object` | — |
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
| loadingIcon | Custom loading icon |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| ref | Input DOM element | `HTMLInputElement \| HTMLTextAreaElement \| undefined` |
| wrapperRef | Wrapper element DOM | `HTMLElement \| undefined` |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |
| select | Select text in input | `() => void` |
| clear | Clear input content | `() => void` |
| textLength | Current display length (result from countConfig if provided) | `number` |

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
