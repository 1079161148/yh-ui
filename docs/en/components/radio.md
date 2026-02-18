# Radio

<script setup lang="ts">
import { ref } from 'vue'

// Demo states
const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
const radioDisabled = ref('1')
const radioBorder = ref('1')
const radioSize = ref('1')
const radioButton1 = ref('New York')
const radioButton2 = ref('New York')
const radioButton3 = ref('New York')
const radioButtonSize = ref('New York')

// Nuxt examples
const nuxtRadio = ref('1')
const nuxtTab = ref('New York')

// Nuxt demo code
const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <!-- Radio group, auto-imported -->
    <yh-radio-group v-model="nuxtRadio">
      <yh-radio value="1">Option 1</yh-radio>
      <yh-radio value="2">Option 2</yh-radio>
    </yh-radio-group>
    
    <!-- Button style radio -->
    <yh-radio-group v-model="nuxtTab" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhRadio, YhRadioGroup and YhRadioButton
const nuxtRadio = ref('1')
const nuxtTab = ref('New York')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// TypeScript examples
const tsBasic = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1">Option One</yh-radio>
    <yh-radio value="2">Option Two</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>Disable entire group:</p>
      <yh-radio-group v-model="radio" disabled>
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2">Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p>Disable individual:</p>
      <yh-radio-group v-model="radio">
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2" disabled>Option Two (Disabled)</yh-radio>
        <yh-radio value="3">Option Three</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsBorder = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" border>Option One</yh-radio>
    <yh-radio value="2" border>Option Two</yh-radio>
    <yh-radio value="3" border disabled>Disabled</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsBorder = tsBorder.replace('lang="ts"', '')

const tsSizes = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" size="large" border>Large</yh-radio>
    <yh-radio value="2" border>Default</yh-radio>
    <yh-radio value="3" size="small" border>Small</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsSingle = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio" value="1">Option One</yh-radio>
    <yh-radio v-model="radio" value="2">Option Two</yh-radio>
    <yh-radio v-model="radio" value="3">Option Three</yh-radio>
  </div>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Selected Value: {{ radio }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsSingle = tsSingle.replace('lang="ts"', '')

const tsGroupSize = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>Large:</p>
      <yh-radio-group v-model="radio" size="large">
        <yh-radio value="1" border>Option One</yh-radio>
        <yh-radio value="2" border>Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p>Default:</p>
      <yh-radio-group v-model="radio">
        <yh-radio value="1" border>Option One</yh-radio>
        <yh-radio value="2" border>Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p>Small:</p>
      <yh-radio-group v-model="radio" size="small">
        <yh-radio value="1" border>Option One</yh-radio>
        <yh-radio value="2" border>Option Two</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsGroupSize = tsGroupSize.replace('lang="ts"', '')

// RadioButton examples
const tsRadioButton = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButton = tsRadioButton.replace('lang="ts"', '')

const tsRadioButtonCustom = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio" fill="#67C23A" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio" fill="#8B5CF6" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButtonCustom = tsRadioButtonCustom.replace('lang="ts"', '')

const tsRadioButtonDisabled = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButtonDisabled = tsRadioButtonDisabled.replace('lang="ts"', '')

const tsRadioButtonSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>Large:</p>
      <yh-radio-group v-model="radio" size="large">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
    <div>
      <p>Default:</p>
      <yh-radio-group v-model="radio">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
    <div>
      <p>Small:</p>
      <yh-radio-group v-model="radio" size="small">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButtonSizes = tsRadioButtonSizes.replace('lang="ts"', '')
</script>

Select a single option among a group of choices.

## Basic Usage

A radio group consists of multiple `yh-radio` components wrapped in a `yh-radio-group`. Bind `v-model` to enable single-choice functionality.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <div class="yh-demo-content">
        <yh-radio-group v-model="radio1">
          <yh-radio value="1">Option One</yh-radio>
          <yh-radio value="2">Option Two</yh-radio>
        </yh-radio-group>
      </div>
    </div>
  </div>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Selected Value: {{ radio1 }}</p>
</DemoBlock>

## Disabled State

Use the `disabled` property to control the disabled state of the radio.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Disable entire group:</p>
      <yh-radio-group v-model="radioDisabled" disabled>
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2">Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Disable individual:</p>
      <yh-radio-group v-model="radio2">
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2" disabled>Option Two (Disabled)</yh-radio>
        <yh-radio value="3">Option Three</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## Individual usage

Radio can also be used alone without being wrapped by RadioGroup.

<DemoBlock title="Individual usage" :ts-code="tsSingle" :js-code="jsSingle">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio3" value="1">Option One</yh-radio>
    <yh-radio v-model="radio3" value="2">Option Two</yh-radio>
    <yh-radio v-model="radio3" value="3">Option Three</yh-radio>
  </div>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Selected Value: {{ radio3 }}</p>
</DemoBlock>

## With Border

Use the `border` property to render the radio with a border.

<DemoBlock title="With Border" :ts-code="tsBorder" :js-code="jsBorder">
  <yh-radio-group v-model="radioBorder">
    <yh-radio value="1" border>Option One</yh-radio>
    <yh-radio value="2" border>Option Two</yh-radio>
    <yh-radio value="3" border disabled>Disabled</yh-radio>
  </yh-radio-group>
</DemoBlock>

## Different Sizes

Use the `size` property to set the size of the radio.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-radio v-model="radioSize" value="1" size="large" border>Large</yh-radio>
    <yh-radio v-model="radioSize" value="2" border>Default</yh-radio>
    <yh-radio v-model="radioSize" value="3" size="small" border>Small</yh-radio>
  </div>
</DemoBlock>

## Uniform Group Size

Set the `size` property on the `yh-radio-group` to uniformly control the size of all radios in the group.

<DemoBlock title="Uniform Group Size" :ts-code="tsGroupSize" :js-code="jsGroupSize">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Large:</p>
      <yh-radio-group v-model="radio1" size="large">
        <yh-radio value="1" border>Option One</yh-radio>
        <yh-radio value="2" border>Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Default:</p>
      <yh-radio-group v-model="radio1">
        <yh-radio value="1" border>Option One</yh-radio>
        <yh-radio value="2" border>Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Small:</p>
      <yh-radio-group v-model="radio1" size="small">
        <yh-radio value="1" border>Option One</yh-radio>
        <yh-radio value="2" border>Option Two</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## Button Style

Use the `yh-radio-button` component to implement button-style radios.

<DemoBlock title="Button Style" :ts-code="tsRadioButton" :js-code="jsRadioButton">
  <yh-radio-group v-model="radioButton1">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

## Button Style Custom Color

Customize the fill and text colors of the checked button using the `fill` and `text-color` properties.

<DemoBlock title="Button Style Custom Color" :ts-code="tsRadioButtonCustom" :js-code="jsRadioButtonCustom">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radioButton2">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButton2" fill="#67C23A" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButton2" fill="#8B5CF6" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## Button Style Disabled

<DemoBlock title="Button Style Disabled" :ts-code="tsRadioButtonDisabled" :js-code="jsRadioButtonDisabled">
  <yh-radio-group v-model="radioButton3">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

## Button Style Different Sizes

<DemoBlock title="Button Style Different Sizes" :ts-code="tsRadioButtonSizes" :js-code="jsRadioButtonSizes">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Large:</p>
      <yh-radio-group v-model="radioButtonSize" size="large">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Default:</p>
      <yh-radio-group v-model="radioButtonSize">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Small:</p>
      <yh-radio-group v-model="radioButtonSize" size="small">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## Use in Nuxt

The Radio component fully supports Nuxt 3/4 SSR rendering. When used in a Nuxt project, the component is automatically imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-radio-group v-model="nuxtRadio">
      <yh-radio value="1">Option 1</yh-radio>
      <yh-radio value="2">Option 2</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="nuxtTab" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Basic radio, button style, and radio group are fully supported.
- ✅ Styles and checked states render accurately in the SSR environment.
- ✅ Custom colors (fill, text-color) are supported.

::: tip SSR Safety
The Radio component has passed complete SSR testing to ensure that the server-side preselected state remains consistent with the client-side state after hydration.
:::

## API

### Radio Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number \| boolean` | — |
| value | Value of radio | `string \| number \| boolean` | — |
| label | Text content to display | `string` | — |
| disabled | Whether to disable | `boolean` | `false` |
| border | Whether to show border | `boolean` | `false` |
| size | Radio size | `'large' \| 'default' \| 'small'` | `'default'` |
| name | Native name attribute | `string` | — |

### Radio Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when the binding value changes | `(value: string \| number \| boolean) => void` |

### Radio Slots

| Slot Name | Description |
| --- | --- |
| default | Custom default content |

### RadioButton Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number \| boolean` | — |
| value | Value of radio button | `string \| number \| boolean` | — |
| label | Text content to display | `string` | — |
| disabled | Whether to disable | `boolean` | `false` |
| size | Radio button size | `'large' \| 'default' \| 'small'` | `'default'` |
| name | Native name attribute | `string` | — |

### RadioButton Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when the binding value changes | `(value: string \| number \| boolean) => void` |

### RadioButton Slots

| Slot Name | Description |
| --- | --- |
| default | Custom default content |

### RadioGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number \| boolean` | — |
| size | Radio group size | `'large' \| 'default' \| 'small'` | — |
| disabled | Whether to disable | `boolean` | `false` |
| name | Native name attribute | `string` | — |
| text-color | Text color when button is active | `string` | `#fff` |
| fill | Fill color and border color when button is active | `string` | `var(--yh-color-primary)` |

### RadioGroup Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when the binding value changes | `(value: string \| number \| boolean) => void` |

### RadioGroup Slots

| Slot Name | Description |
| --- | --- |
| default | Custom default content |

## Theme Variables

### Radio Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-radio-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-radio-text-color` | Text color | `var(--yh-text-color-regular)` |
| `--yh-radio-input-size` | Radio size | `14px` |
| `--yh-radio-checked-dot-color` | Checked dot color | `var(--yh-color-primary)` |
| `--yh-radio-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light)` |

### RadioButton Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-radio-button-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-radio-button-text-color` | Text color | `var(--yh-text-color-regular)` |
| `--yh-radio-button-checked-bg-color` | Checked background color | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-text-color` | Checked text color | `var(--yh-fill-color-blank)` |
| `--yh-radio-button-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light)` |
