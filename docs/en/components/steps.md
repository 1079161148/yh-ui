# Steps

A navigation bar that guides users through a process to complete tasks. Combines the best features from Element Plus, Naive UI, and Ant Design, and introduces navigation style and clickable switching functionality.

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const prev = () => {
  if (active.value-- < 1) active.value = 2
}

const handleChange = (index: number) => {
  active.value = index
}

// TS Version Example Code
const tsBasic = `<template>
  <yh-steps :active="active">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
  <div style="margin-top: 20px">
    <yh-button @click="prev" :disabled="active === 0">Previous</yh-button>
    <yh-button type="primary" @click="next">Next</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<number>(1)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const prev = () => {
  if (active.value-- < 1) active.value = 2
}
<\/script>`

const jsBasic = `<template>
  <yh-steps :active="active">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
  <div style="margin-top: 20px">
    <yh-button @click="prev" :disabled="active === 0">Previous</yh-button>
    <yh-button type="primary" @click="next">Next</yh-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(1)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const prev = () => {
  if (active.value-- < 1) active.value = 2
}
<\/script>`

const tsVertical = `<template>
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsVertical = `<template>
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsSimple = `<template>
  <yh-steps :active="1" simple>
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsSimple = `<template>
  <yh-steps :active="1" simple>
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsDot = `<template>
  <yh-steps :active="1" progress-dot>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsDot = `<template>
  <yh-steps :active="1" progress-dot>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsNavigation = `<template>
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="Step 1" description="Confirm Order" />
    <yh-step title="Step 2" description="Payment" />
    <yh-step title="Step 3" description="Complete" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsNavigation = `<template>
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="Step 1" description="Confirm Order" />
    <yh-step title="Step 2" description="Payment" />
    <yh-step title="Step 3" description="Complete" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsStatus = `<template>
  <yh-steps :active="1">
    <yh-step title="Finished" status="finish" />
    <yh-step title="In Progress" status="process" />
    <yh-step title="Error" status="error" />
    <yh-step title="Waiting" status="wait" />
  </yh-steps>
  
  <yh-steps :active="1" style="margin-top: 20px">
    <yh-step title="Success" status="success" />
    <yh-step title="In Progress" />
    <yh-step title="Waiting" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsStatus = `<template>
  <yh-steps :active="1">
    <yh-step title="Finished" status="finish" />
    <yh-step title="In Progress" status="process" />
    <yh-step title="Error" status="error" />
    <yh-step title="Waiting" status="wait" />
  </yh-steps>
  
  <yh-steps :active="1" style="margin-top: 20px">
    <yh-step title="Success" status="success" />
    <yh-step title="In Progress" />
    <yh-step title="Waiting" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsCenter = `<template>
  <yh-steps :active="1" align-center>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsCenter = `<template>
  <yh-steps :active="1" align-center>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsClickable = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ active }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<number>(1)

const handleChange = (index: number) => {
  active.value = index
}
<\/script>`

const jsClickable = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ active }}</p>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(1)

const handleChange = (index) => {
  active.value = index
}
<\/script>`

const tsSpace = `<template>
  <yh-steps :active="1" :space="200">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  
  <yh-steps :active="1" space="30%" style="margin-top: 20px">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsSpace = `<template>
  <yh-steps :active="1" :space="200">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  
  <yh-steps :active="1" space="30%" style="margin-top: 20px">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsFinishStatus = `<template>
  <yh-steps :active="2" finish-status="success">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsFinishStatus = `<template>
  <yh-steps :active="2" finish-status="success">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsSlots = `<template>
  <yh-steps :active="1">
    <yh-step>
      <template #icon>🎉</template>
      <template #title>Custom Title</template>
      <template #description>Custom description content</template>
    </yh-step>
    <yh-step title="Step 2" description="Normal Step" />
    <yh-step>
      <template #icon>✅</template>
      <template #title>Complete</template>
    </yh-step>
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsSlots = `<template>
  <yh-steps :active="1">
    <yh-step>
      <template #icon>🎉</template>
      <template #title>Custom Title</template>
      <template #description>Custom description content</template>
    </yh-step>
    <yh-step title="Step 2" description="Normal Step" />      <template #icon>✅</template>
      <template #title>Complete</template>
    </yh-step>
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsNuxt = `<template>
  <!-- Just use, supports auto-import -->
  <YhSteps :active="1">
    <YhStep title="Step 1" />
    <YhStep title="Step 2" />
    <YhStep title="Step 3" />
  </YhSteps>
</template>

<script setup lang="ts">
// Nuxt 3 auto-import, no manual import needed
<\/script>`

const jsNuxt = `<template>
  <!-- Just use, supports auto-import -->
  <YhSteps :active="1">
    <YhStep title="Step 1" />
    <YhStep title="Step 2" />
    <YhStep title="Step 3" />
  </YhSteps>
</template>

<script setup>
// Nuxt 3 auto-import, no manual import needed
<\/script>`

// ========== New Features Examples ==========
const activeSmall = ref(1)
const activeProgress = ref(1)
const progressValue = ref(50)

const tsSmall = `<template>
  <yh-steps :active="1" size="small">
    <yh-step title="Step 1" description="Description" />
    <yh-step title="Step 2" description="Description" />
    <yh-step title="Step 3" description="Description" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsSmall = `<template>
  <yh-steps :active="1" size="small">
    <yh-step title="Step 1" description="Description" />
    <yh-step title="Step 2" description="Description" />
    <yh-step title="Step 3" description="Description" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsResponsive = `<template>
  <!-- Automatically switches to vertical layout when window width < 768px -->
  <yh-steps :active="1" responsive>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsResponsive = `<template>
  <!-- Automatically switches to vertical layout when window width < 768px -->
  <yh-steps :active="1" responsive>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsProgress = `<template>
  <yh-steps :active="active" show-progress>
    <yh-step title="Step 1" :progress="100" />
    <yh-step title="Step 2" :progress="progressValue" />
    <yh-step title="Step 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px">
    <span>Current Step Progress: </span>
    <yh-slider v-model="progressValue" :min="0" :max="100" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(1)
const progressValue = ref<number>(50)
<\/script>`

const jsProgress = `<template>
  <yh-steps :active="active" show-progress>
    <yh-step title="Step 1" :progress="100" />
    <yh-step title="Step 2" :progress="progressValue" />
    <yh-step title="Step 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px">
    <span>Current Step Progress: </span>
    <yh-slider v-model="progressValue" :min="0" :max="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(1)
const progressValue = ref(50)
<\/script>`

const tsTimeline = `<template>
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="Order Created" description="Order submitted" time="2024-01-01 10:00" />
    <yh-step title="Payment Successful" description="Payment completed" time="2024-01-01 10:05" />
    <yh-step title="Item Shipped" description="Logistics picked up" time="2024-01-02 08:00" />
    <yh-step title="Confirm Receipt" description="Waiting for delivery" time="" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsTimeline = `<template>
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="Order Created" description="Order submitted" time="2024-01-01 10:00" />
    <yh-step title="Payment Successful" description="Payment completed" time="2024-01-01 10:05" />
    <yh-step title="Item Shipped" description="Logistics picked up" time="2024-01-02 08:00" />
    <yh-step title="Confirm Receipt" description="Waiting for delivery" time="" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsDisabled = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2 (Disabled)" disabled />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ active }}, Step 2 is disabled and cannot be clicked</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(0)
const handleChange = (index: number) => {
  active.value = index
}
<\/script>`

const jsDisabled = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2 (Disabled)" disabled />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ active }}, Step 2 is disabled and cannot be clicked</p>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(0)
const handleChange = (index) => {
  active.value = index
}
<\/script>`

const tsLabelPlacement = `<template>
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup lang="ts">
// No additional script needed
<\/script>`

const jsLabelPlacement = `<template>
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const activeLazy = ref(0)
const tsLazy = `<template>
  <yh-steps :active="active" direction="vertical">
    <yh-step title="Step 1">
      <div>Step 1 detailed content (loaded immediately)</div>
    </yh-step>
    <yh-step title="Step 2" lazy>
      <div>Step 2 detailed content (lazy loaded, rendered only when activated)</div>
    </yh-step>
    <yh-step title="Step 3" lazy>
      <div>Step 3 detailed content (lazy loaded)</div>
    </yh-step>
  </yh-steps>
  <yh-button @click="active++" style="margin-top: 12px">Next</yh-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(0)
<\/script>`

const jsLazy = `<template>
  <yh-steps :active="active" direction="vertical">
    <yh-step title="Step 1">
      <div>Step 1 detailed content (loaded immediately)</div>
    </yh-step>
    <yh-step title="Step 2" lazy>
      <div>Step 2 detailed content (lazy loaded, rendered only when activated)</div>
    </yh-step>
    <yh-step title="Step 3" lazy>
      <div>Step 3 detailed content (lazy loaded)</div>
    </yh-step>
  </yh-steps>
  <yh-button @click="active++" style="margin-top: 12px">Next</yh-button>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(0)
<\/script>`

const activeDisabled = ref(0)
const handleDisabledChange = (index: number) => {
  activeDisabled.value = index
}
</script>

## Basic Usage

A simple steps component. Set the `active` prop, which accepts a `number` representing the index of the currently active step (starting from 0).

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-steps :active="active">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
  <div style="margin-top: 20px">
    <yh-button @click="prev" :disabled="active === 0">Previous</yh-button>
    <yh-button type="primary" @click="next">Next</yh-button>
  </div>
</DemoBlock>

## Vertical Steps

Set `direction="vertical"` to display steps vertically.

<DemoBlock title="Vertical Steps" :ts-code="tsVertical" :js-code="jsVertical">
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Simple Style

Set `simple` to enable a simplified style for the steps.

<DemoBlock title="Simple Style" :ts-code="tsSimple" :js-code="jsSimple">
  <yh-steps :active="1" simple>
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</DemoBlock>

## Dot Steps

Set `progress-dot` to enable dot-style steps.

<DemoBlock title="Dot Steps" :ts-code="tsDot" :js-code="jsDot">
  <yh-steps :active="1" progress-dot>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Navigation Style

Set `progress-dot="navigation"` to enable navigation-style steps, suitable for workflow guidance scenarios.

<DemoBlock title="Navigation Style" :ts-code="tsNavigation" :js-code="jsNavigation">
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="Step 1" description="Confirm Order" />
    <yh-step title="Step 2" description="Payment" />
    <yh-step title="Step 3" description="Complete" />
  </yh-steps>
</DemoBlock>

## Step Status

Use the `status` prop to customize the status of each step. Supports five statuses: `wait`, `process`, `finish`, `error`, and `success`.

<DemoBlock title="Step Status" :ts-code="tsStatus" :js-code="jsStatus">
  <yh-steps :active="1">
    <yh-step title="Finished" status="finish" />
    <yh-step title="In Progress" status="process" />
    <yh-step title="Error" status="error" />
    <yh-step title="Waiting" status="wait" />
  </yh-steps>
  
  <yh-steps :active="1" style="margin-top: 20px">
    <yh-step title="Success" status="success" />
    <yh-step title="In Progress" />
    <yh-step title="Waiting" />
  </yh-steps>
</DemoBlock>

## Center Alignment

Set `align-center` to center-align the step content.

<DemoBlock title="Center Alignment" :ts-code="tsCenter" :js-code="jsCenter">
  <yh-steps :active="1" align-center>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Clickable Steps

Set `clickable` to allow switching steps by clicking. Needs to be used with the `@change` event.

<DemoBlock title="Clickable Steps" :ts-code="tsClickable" :js-code="jsClickable">
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ active }}</p>
</DemoBlock>

## Custom Spacing

Use the `space` prop to set the spacing between each step, supporting numbers (px) or percentage strings.

<DemoBlock title="Custom Spacing" :ts-code="tsSpace" :js-code="jsSpace">
  <yh-steps :active="1" :space="200">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  
  <yh-steps :active="1" space="30%" style="margin-top: 20px">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</DemoBlock>

## Finish Status

Use `finish-status` to set the status of finished steps, default is `finish`, optional values include `success`.

<DemoBlock title="Finish Status" :ts-code="tsFinishStatus" :js-code="jsFinishStatus">
  <yh-steps :active="2" finish-status="success">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</DemoBlock>

## Custom Slots

Use `icon`, `title`, and `description` slots to customize step content.

<DemoBlock title="Custom Slots" :ts-code="tsSlots" :js-code="jsSlots">
  <yh-steps :active="1">
    <yh-step>
      <template #icon>🎉</template>
      <template #title>Custom Title</template>
      <template #description>Custom description content</template>
    </yh-step>
    <yh-step title="Step 2" description="Normal Step" />
    <yh-step>
      <template #icon>✅</template>
      <template #title>Complete</template>
    </yh-step>
  </yh-steps>
</DemoBlock>

## Use in Nuxt

The component is fully adapted for Nuxt 3, supporting auto-import and SSR.

<DemoBlock title="Nuxt Adaptation" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-steps :active="1">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</DemoBlock>

## Small Size

Set `size="small"` to use a more compact small-sized steps.

<DemoBlock title="Small Size" :ts-code="tsSmall" :js-code="jsSmall">
  <yh-steps :active="1" size="small">
    <yh-step title="Step 1" description="Description" />
    <yh-step title="Step 2" description="Description" />
    <yh-step title="Step 3" description="Description" />
  </yh-steps>
</DemoBlock>

## Responsive Layout

When `responsive` is set, it automatically switches to vertical layout when the window width is below the breakpoint (default 768px).

<DemoBlock title="Responsive Layout" :ts-code="tsResponsive" :js-code="jsResponsive">
  <yh-steps :active="1" responsive>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Progress Line

After setting `show-progress`, the connecting line will display as a progress bar. Combined with the `progress` prop of Step, it can show the completion progress of the current step.

<DemoBlock title="Progress Line" :ts-code="tsProgress" :js-code="jsProgress">
  <yh-steps :active="activeProgress" show-progress>
    <yh-step title="Step 1" :progress="100" />
    <yh-step title="Step 2" :progress="progressValue" />
    <yh-step title="Step 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px; display: flex; align-items: center; gap: 12px">
    <span>Current Step Progress: {{ progressValue }}%</span>
    <input type="range" v-model.number="progressValue" min="0" max="100" style="flex: 1" />
  </div>
</DemoBlock>

## Timeline Mode

After setting `show-timeline`, time information can be displayed, suitable for logistics tracking, history records, etc.

<DemoBlock title="Timeline Mode" :ts-code="tsTimeline" :js-code="jsTimeline">
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="Order Created" description="Order submitted" time="2024-01-01 10:00" />
    <yh-step title="Payment Successful" description="Payment completed" time="2024-01-01 10:05" />
    <yh-step title="Item Shipped" description="Logistics picked up" time="2024-01-02 08:00" />
    <yh-step title="Confirm Receipt" description="Waiting for delivery" time="" />
  </yh-steps>
</DemoBlock>

## Disabled Step

Set the `disabled` prop on Step to disable clicking on that step.

<DemoBlock title="Disabled Step" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-steps :active="activeDisabled" clickable @change="handleDisabledChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2 (Disabled)" disabled />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ activeDisabled }}, Step 2 is disabled and cannot be clicked</p>
</DemoBlock>

## Label Placement

Set `label-placement="vertical"` to arrange labels vertically.

<DemoBlock title="Label Placement" :ts-code="tsLabelPlacement" :js-code="jsLabelPlacement">
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Lazy Rendering

Set the `lazy` prop on Step to lazy-render content, which will only be rendered when first activated, improving performance.

<DemoBlock title="Lazy Rendering" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-steps :active="activeLazy" direction="vertical">
    <yh-step title="Step 1">
      <div>Step 1 detailed content (loaded immediately)</div>
    </yh-step>
    <yh-step title="Step 2" lazy>
      <div>Step 2 detailed content (lazy loaded, rendered only when activated)</div>
    </yh-step>
    <yh-step title="Step 3" lazy>
      <div>Step 3 detailed content (lazy loaded)</div>
    </yh-step>
  </yh-steps>
  <yh-button @click="activeLazy < 2 && activeLazy++" style="margin-top: 12px">Next</yh-button>
</DemoBlock>

## API

### Steps Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| active | Currently active step (starting from 0) | `number` | `0` |
| direction | Display direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| align-center | Whether to center align | `boolean` | `false` |
| simple | Whether to enable simple style | `boolean` | `false` |
| progress-dot | Dot/navigation style | `boolean \| 'dot' \| 'navigation'` | `false` |
| finish-status | Finished step status | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'finish'` |
| process-status | Current step status | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'process'` |
| space | Space between each step (supports px or percentage) | `number \| string` | — |
| clickable | Whether steps are clickable | `boolean` | `false` |
| size | Size | `'default' \| 'small'` | `'default'` |
| responsive | Whether responsive (auto switch to vertical on small screens) | `boolean` | `false` |
| responsive-breakpoint | Responsive breakpoint (px) | `number` | `768` |
| label-placement | Label placement | `'horizontal' \| 'vertical'` | `'horizontal'` |
| show-progress | Show progress bar connecting line | `boolean` | `false` |
| show-timeline | Show timeline | `boolean` | `false` |

### Steps Events

| Event Name | Description | Type |
| --- | --- | --- |
| change | Triggered when step is clicked (requires clickable enabled) | `(index: number) => void` |

### Steps Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Step component content | — |

### Step Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | `''` |
| description | Description text | `string` | `''` |
| icon | Custom icon class name | `string` | `''` |
| status | Current step status (overrides parent setting) | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `''` |
| disabled | Whether to disable this step | `boolean` | `false` |
| time | Time information (for timeline mode) | `string` | `''` |
| progress | Progress percentage (0-100, for progress bar mode) | `number` | `0` |
| lazy | Whether to lazy render content | `boolean` | `false` |

### Step Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Custom content area | — |
| icon | Custom icon | — |
| title | Custom title | — |
| description | Custom description | — |
| time | Custom time content | — |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-steps-icon-size` | Icon area size | `28px` |
| `--yh-steps-line-color` | Line color | `var(--yh-border-color-light)` |
| `--yh-steps-finish-color` | Finished status color | `var(--yh-color-primary)` |
| `--yh-steps-process-color` | In progress status color | `var(--yh-color-primary)` |
| `--yh-steps-wait-color` | Waiting status color | `var(--yh-text-color-placeholder)` |
| `--yh-steps-error-color` | Error status color | `var(--yh-color-danger)` |
| `--yh-steps-success-color` | Success status color | `var(--yh-color-success)` |

