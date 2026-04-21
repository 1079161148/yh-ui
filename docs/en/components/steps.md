# Steps

A navigation component that guides users through a multi-step process. It supports horizontal and vertical layouts, clickable navigation, progress display, timeline mode, and component-level theme overrides.

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
      <template #icon>1</template>
      <template #title>Custom Title</template>
      <template #description>Custom description content</template>
    </yh-step>
    <yh-step title="Step 2" description="Normal Step" />
    <yh-step>
      <template #icon>OK</template>
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
      <template #icon>1</template>
      <template #title>Custom Title</template>
      <template #description>Custom description content</template>
    </yh-step>
    <yh-step title="Step 2" description="Normal Step" />
    <yh-step>
      <template #icon>OK</template>
      <template #title>Complete</template>
    </yh-step>
  </yh-steps>
</template>

<script setup>
// No additional script needed
<\/script>`

const tsNuxt = `<template>
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
  <YhSteps :active="1">
    <YhStep title="Step 1" />
    <YhStep title="Step 2" />
    <YhStep title="Step 3" />
  </YhSteps>
</template>

<script setup>
// Nuxt 3 auto-import, no manual import needed
<\/script>`

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

Set the `active` prop to the current step index. The index starts from `0`.

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

Set `direction="vertical"` to render steps vertically.

<DemoBlock title="Vertical Steps" :ts-code="tsVertical" :js-code="jsVertical">
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Simple Style

Set `simple` to enable the simplified layout.

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

Set `progress-dot="navigation"` to display navigation-style step dots.

<DemoBlock title="Navigation Style" :ts-code="tsNavigation" :js-code="jsNavigation">
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="Step 1" description="Confirm Order" />
    <yh-step title="Step 2" description="Payment" />
    <yh-step title="Step 3" description="Complete" />
  </yh-steps>
</DemoBlock>

## Step Status

Use the `status` prop on `YhStep` to override the state of a specific step.

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

Set `align-center` to center-align step content.

<DemoBlock title="Center Alignment" :ts-code="tsCenter" :js-code="jsCenter">
  <yh-steps :active="1" align-center>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Clickable Steps

Set `clickable` to allow step switching by click and listen for the `change` event.

<DemoBlock title="Clickable Steps" :ts-code="tsClickable" :js-code="jsClickable">
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ active }}</p>
</DemoBlock>

## Custom Spacing

Use `space` to control the width basis of each step. It supports numbers and CSS size strings.

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

Use `finish-status` to customize the state applied to completed steps.

<DemoBlock title="Finish Status" :ts-code="tsFinishStatus" :js-code="jsFinishStatus">
  <yh-steps :active="2" finish-status="success">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</DemoBlock>

## Custom Slots

Use the `icon`, `title`, `description`, and `time` slots on `YhStep` to customize display content.

<DemoBlock title="Custom Slots" :ts-code="tsSlots" :js-code="jsSlots">
  <yh-steps :active="1">
    <yh-step>
      <template #icon>1</template>
      <template #title>Custom Title</template>
      <template #description>Custom description content</template>
    </yh-step>
    <yh-step title="Step 2" description="Normal Step" />
    <yh-step>
      <template #icon>OK</template>
      <template #title>Complete</template>
    </yh-step>
  </yh-steps>
</DemoBlock>

## Use in Nuxt

`YhSteps` and `YhStep` can be used directly in Nuxt 3 after the YH-UI Nuxt module is registered.

<DemoBlock title="Nuxt Adaptation" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-steps :active="1">
    <yh-step title="Step 1" />
    <yh-step title="Step 2" />
    <yh-step title="Step 3" />
  </yh-steps>
</DemoBlock>

## Small Size

Set `size="small"` for a denser steps layout.

<DemoBlock title="Small Size" :ts-code="tsSmall" :js-code="jsSmall">
  <yh-steps :active="1" size="small">
    <yh-step title="Step 1" description="Description" />
    <yh-step title="Step 2" description="Description" />
    <yh-step title="Step 3" description="Description" />
  </yh-steps>
</DemoBlock>

## Responsive Layout

Set `responsive` to let horizontal steps switch to vertical layout below the configured breakpoint.

<DemoBlock title="Responsive Layout" :ts-code="tsResponsive" :js-code="jsResponsive">
  <yh-steps :active="1" responsive>
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Progress Line

After setting `show-progress`, the connector line displays the progress value of the active step.

<DemoBlock title="Progress Line" :ts-code="tsProgress" :js-code="jsProgress">
  <yh-steps :active="activeProgress" show-progress>
    <yh-step title="Step 1" :progress="100" />
    <yh-step title="Step 2" :progress="progressValue" />
    <yh-step title="Step 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px">
    <span>Current Step Progress: </span>
    <yh-slider v-model="progressValue" :min="0" :max="100" />
  </div>
</DemoBlock>

## Timeline Mode

Set `show-timeline` to display timeline information, then provide the `time` prop or `time` slot on each step.

<DemoBlock title="Timeline Mode" :ts-code="tsTimeline" :js-code="jsTimeline">
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="Order Created" description="Order submitted" time="2024-01-01 10:00" />
    <yh-step title="Payment Successful" description="Payment completed" time="2024-01-01 10:05" />
    <yh-step title="Item Shipped" description="Logistics picked up" time="2024-01-02 08:00" />
    <yh-step title="Confirm Receipt" description="Waiting for delivery" time="" />
  </yh-steps>
</DemoBlock>

## Disabled Step

Set `disabled` on `YhStep` to prevent it from being clicked.

<DemoBlock title="Disabled Step" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-steps :active="activeDisabled" clickable @change="handleDisabledChange">
    <yh-step title="Step 1" />
    <yh-step title="Step 2 (Disabled)" disabled />
    <yh-step title="Step 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">Current Step: {{ activeDisabled }}, Step 2 is disabled and cannot be clicked</p>
</DemoBlock>

## Label Placement

Set `label-placement="vertical"` to stack labels and descriptions vertically.

<DemoBlock title="Label Placement" :ts-code="tsLabelPlacement" :js-code="jsLabelPlacement">
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="Step 1" description="This is a description" />
    <yh-step title="Step 2" description="This is a description" />
    <yh-step title="Step 3" description="This is a description" />
  </yh-steps>
</DemoBlock>

## Lazy Rendering

Set `lazy` on `YhStep` to render the default slot only after the step becomes active for the first time.

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

### Props

#### Steps

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| active | Currently active step index. | `number` | `0` |
| direction | Layout direction of the steps container. | `YhStepsDirection` | `'horizontal'` |
| align-center | Whether step content is center-aligned. | `boolean` | `false` |
| simple | Whether to use the simplified style. | `boolean` | `false` |
| progress-dot | Dot mode configuration. | `boolean \| YhStepsProgressDot` | `false` |
| finish-status | Status applied to completed steps. | `YhStepsStatus` | `'finish'` |
| process-status | Status applied to the current active step. | `YhStepsStatus` | `'process'` |
| space | Width basis for each step. | `number \| string` | `''` |
| clickable | Whether clicking a step can trigger changes. | `boolean` | `false` |
| size | Steps size. | `YhStepsSize` | `'default'` |
| responsive | Whether to switch to a vertical layout below the breakpoint. | `boolean` | `false` |
| responsive-breakpoint | Breakpoint used by responsive mode, in pixels. | `number` | `768` |
| label-placement | Placement mode of labels. | `YhStepsLabelPlacement` | `'horizontal'` |
| show-progress | Whether to show connector progress. | `boolean` | `false` |
| show-timeline | Whether to render steps in timeline mode. | `boolean` | `false` |
| theme-overrides | Component-level theme overrides for `YhSteps`. | `ComponentThemeVars` | `undefined` |

#### Step

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Step title. | `string` | `''` |
| description | Step description text. | `string` | `''` |
| icon | Icon class name rendered in the head area. | `string` | `''` |
| status | Step status that overrides the parent-computed status. | `YhStepsStatus \| ''` | `''` |
| disabled | Whether the step is disabled. | `boolean` | `false` |
| time | Timeline text used in timeline mode. | `string` | `''` |
| progress | Progress value used when `show-progress` is enabled. | `number` | `0` |
| lazy | Whether default slot content is rendered lazily after first activation. | `boolean` | `false` |
| theme-overrides | Component-level theme overrides for `YhStep`. | `ComponentThemeVars` | `undefined` |

### Events

#### Steps

| Event Name | Description | Type |
| --- | --- | --- |
| change | Triggered when a clickable step is selected. | `(index: number) => void` |

#### Step

Current component does not expose component events.

### Slots

#### Steps

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Step content. Usually contains `YhStep` nodes. | - |

#### Step

| Slot Name | Description | Parameters |
| --- | --- | --- |
| icon | Custom icon area content. | - |
| title | Custom title content. | - |
| description | Custom description content. | - |
| default | Additional custom content rendered below the description. | - |
| time | Custom timeline time content when timeline mode is enabled. | - |

### Expose

`YhSteps` and `YhStep` do not expose public instance methods or properties.

## Theme Variables

`YhSteps` and `YhStep` support `themeOverrides`. The steps runtime consumes the following component variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-steps-icon-size` | Size of the icon circle area. | `28px` |
| `--yh-steps-line-color` | Connector line color. | `var(--yh-border-color-light)` |
| `--yh-steps-finish-color` | Completed step color. | `var(--yh-color-primary)` |
| `--yh-steps-process-color` | Current active step color. | `var(--yh-color-primary)` |
| `--yh-steps-wait-color` | Waiting step color. | `var(--yh-text-color-placeholder)` |
| `--yh-steps-error-color` | Error step color. | `var(--yh-color-danger)` |
| `--yh-steps-success-color` | Success step color. | `var(--yh-color-success)` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhStepsProps` | Steps component props type |
| `YhStepsEmits` | Steps component emits type |
| `YhStepsSlots` | Steps component slots type |
| `YhStepsDirection` | Direction union |
| `YhStepsStatus` | Status union |
| `YhStepsProgressDot` | Dot mode type |
| `YhStepsSize` | Size union |
| `YhStepsLabelPlacement` | Label placement union |
| `YhStepConfig` | Step config type |
| `YhStepProps` | Step component props type |
| `YhStepSlots` | Step component slots type |
| `YhStepsInstance` | Steps component instance type |
| `YhStepInstance` | Step component instance type |
