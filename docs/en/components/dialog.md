<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const visibleBasic = ref(false)
const visibleAlignCenter = ref(false)
const visibleCenter = ref(false)
const visibleDraggable = ref(false)
const visibleGlass = ref(false)
const visibleFullscreen = ref(false)
const visibleOuter = ref(false)
const visibleInner = ref(false)
const visibleNuxt = ref(false)

// New features
const visibleSuccess = ref(false)
const visibleWarning = ref(false)
const visibleError = ref(false)
const visibleInfo = ref(false)
const visibleLoading = ref(false)
const loadingState = ref(false)
const visibleRender = ref(false)
const visibleOrigin = ref(false)
const visibleSwap = ref(false)
const visibleFooterLeft = ref(false)
const visibleFooterCenter = ref(false)
const visibleFooterRight = ref(false)
const visibleContentAlign = ref(false)
const visibleDestroy = ref(false)
const visibleDestroyNormal = ref(false)
const visibleHeaderAlign = ref(false)

// Functional call examples
import { useDialog, YhDialogMethod, YhMessage } from '@yh-ui/components'
// Mock call in documentation environment
const { showDialog } = useDialog()

const handleHookCall = async () => {
  const { action } = await showDialog({
    title: 'Hook Call',
    content: 'This is a dialog launched via useDialog Hook, which automatically inherits the current application context.',
    type: 'info'
  })
  console.log('Action:', action)
}

const handleMethodCall = () => {
  YhDialogMethod.success({
    title: 'Imperative Call',
    content: 'This is a dialog launched directly via YhDialogMethod.success.',
    confirmText: 'Great'
  })
}

const handleCallbackCall = async () => {
  const { action } = await showDialog({
    title: 'Action Confirmation',
    content: 'Please choose your operation. We will process business logic based on the returned action.',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  })
  
  if (action === 'confirm') {
    YhMessage.success('You clicked the Confirm button')
  } else if (action === 'cancel') {
    YhMessage.warning('You clicked the Cancel button')
  } else {
    YhMessage.info('You closed the dialog by other means')
  }
}

const handleFunctionalSwap = () => {
  showDialog({
    title: 'Action Confirmation',
    content: 'The confirm button is now on the left, and the cancel button is on the right.',
    swapFooterButtons: true
  })
}

const handleAsyncOpen = () => {
  visibleLoading.value = true
}

const simulateSubmit = () => {
  loadingState.value = true
  setTimeout(() => {
    loadingState.value = false
    visibleLoading.value = false
  }, 2000)
}

const renderTitle = () => h('div', { style: 'display:flex; align-items:center; color:#409eff' }, [
  h('span', '🚀 Render Function Title')
])

const renderContent = () => h('div', { style: 'padding: 20px; background: #f0f7ff; border-radius: 8px;' }, [
  h('h4', 'Content dynamically generated via h() function'),
  h('p', { style: 'color: #666' }, 'This method provides ultimate flexibility for different business scenarios.')
])

const renderAction = () => h('div', { style: 'display: flex; gap: 8px; justify-content: flex-end' }, [
  h('button', { 
    onClick: () => { visibleRender.value = false },
    style: 'padding: 6px 16px; border-radius: 4px; border-radius: 4px; border: 1px solid #dcdfe6; background: #fff; cursor: pointer'
  }, 'Got it')
])

const tsBasic = `<${_T}>
  <yh-button @click="visible = true">Open Dialog</yh-button>

  <yh-dialog v-model="visible" title="Standard Design Preview">
    <span>YH-UI's dialog uses custom Bezier animations for a lightweight opening feel, combined with a 16px corner radius design to balance modernity and approachability.</span>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsCenter = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-button @click="visibleAlignCenter = true">Vertically Centered</yh-button>
    <yh-button @click="visibleCenter = true" type="primary">Fully Centered Mode</yh-button>
  </div>

  <!-- Vertically centered only (with Smart Footer) -->
  <yh-dialog 
    v-model="visibleAlignCenter" 
    title="Vertically Centered Content" 
    align-center 
  >
    <p>By using the <code>align-center</code> attribute, the dialog ignores the <code>top</code> setting and stays vertically centered.</p>
  </yh-dialog>

  <!-- Fully centered mode (Header, Body, Footer all centered horizontally/vertically) -->
  <yh-dialog v-model="visibleCenter" title="Center Mode" center align-center>
    <div style="text-align: center; padding: 20px 0;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: #f0f9eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
        <yh-icon name="check" style="color: #67c23a; font-size: 32px;" />
      </div>
      <h3 style="margin-bottom: 12px; font-weight: 700;">Action Confirmation</h3>
      <p style="color: var(--yh-text-color-regular); font-size: 15px;">When <code>center</code> is true, the header, footer, and body content of the dialog will be centered horizontally.</p>
    </div>
    <template #footer>
      <yh-button @click="visibleCenter = false">Cancel</yh-button>
      <yh-button type="primary" @click="visibleCenter = false">Submit Now</yh-button>
    </template>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleAlignCenter = ref(false)
const visibleCenter = ref(false)
</${_S}>`

const jsCenter = toJs(tsCenter)

const tsFooterAlign = `<${_T}>
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleLeft = true">Left Align</yh-button>
    <yh-button @click="visibleCenter = true">Center Align</yh-button>
    <yh-button @click="visibleRight = true">Right Align (Default)</yh-button>
  </div>

  <yh-dialog v-model="visibleLeft" title="Left Aligned" footer-align="left">
    <span>The footer buttons are now arranged on the left.</span>
  </yh-dialog>

  <yh-dialog v-model="visibleCenter" title="Center Aligned" footer-align="center">
    <span>The footer buttons are now arranged in the center.</span>
  </yh-dialog>

  <yh-dialog v-model="visibleRight" title="Right Aligned" footer-align="right">
    <span>This is the default arrangement.</span>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleLeft = ref(false)
const visibleCenter = ref(false)
const visibleRight = ref(false)
</${_S}>`

const jsFooterAlign = toJs(tsFooterAlign)

const tsHeaderAlign = `<${_T}>
  <yh-button @click="visible = true">Right Aligned Title</yh-button>

  <yh-dialog v-model="visible" title="Right Aligned Title" header-align="right">
    <span>You can independently control the arrangement of the title via the header-align attribute.</span>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsHeaderAlign = toJs(tsHeaderAlign)

const tsContentAlign = `<${_T}>
  <yh-button @click="visible = true">Center Aligned Content</yh-button>

  <yh-dialog v-model="visible" title="Content Alignment" content-align="center">
    <div style="padding: 10px 0;">
      <p>This is the centered content area.</p>
      <p>For some declarative or presentational dialogs, center alignment can provide a better reading experience.</p>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsContentAlign = toJs(tsContentAlign)

const tsTypes = `<${_T}>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button type="success" plain @click="visibleSuccess = true">Success</yh-button>
    <yh-button type="warning" plain @click="visibleWarning = true">Warning</yh-button>
    <yh-button type="danger" plain @click="visibleError = true">Error</yh-button>
    <yh-button type="info" plain @click="visibleInfo = true">Info</yh-button>
  </div>

  <yh-dialog v-model="visibleSuccess" type="success" title="Success" content="Your application has been submitted and will be processed within 24 hours." />
  <yh-dialog v-model="visibleWarning" type="warning" title="Delete Confirmation" content="Data cannot be recovered after deletion. Please proceed with caution." />
  <yh-dialog v-model="visibleError" type="error" title="System Error" content="Network connection interrupted. Please check your network settings." />
  <yh-dialog v-model="visibleInfo" type="info" title="System Notification" content="A new version has been released. Click the button below to learn more." />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleSuccess = ref(false)
const visibleWarning = ref(false)
const visibleError = ref(false)
const visibleInfo = ref(false)
</${_S}>`

const jsTypes = toJs(tsTypes)

const tsLoading = `<${_T}>
  <yh-button @click="visible = true">Async Submit Demo</yh-button>

  <yh-dialog v-model="visible" title="Processing" :loading="loading" content="Syncing cloud data, please wait...">
    <template #footer>
      <yh-button @click="visible = false">Cancel</yh-button>
      <yh-button type="primary" :loading="loading" @click="submit">Submit Now</yh-button>
    </template>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const loading = ref(false)
const submit = () => {
  loading.value = true
  setTimeout(() => { loading.value = false; visible.value = false }, 2000)
}
</${_S}>`

const jsLoading = toJs(tsLoading)

const tsRender = `<${_T}>
  <yh-button type="primary" plain @click="visible = true">Render Function Demo</yh-button>

  <yh-dialog 
    v-model="visible" 
    :title="renderTitle"
    :content="renderContent"
    :action="renderAction"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'
const visible = ref(false)

const renderTitle = () => h('div', { style: 'display:flex; align-items:center; color:#409eff' }, [
  h('span', '🚀 Render Function Title')
])
const renderContent = () => h('div', { style: 'padding: 20px; background: #f0f7ff; border-radius: 8px;' }, [
  h('h4', 'Content dynamically generated via h() function'),
  h('p', { style: 'color: #666' }, 'This method is extremely useful for business configuration scenarios requiring high dynamism.')
])
const renderAction = () => h('div', { style: 'display: flex; gap: 8px; justify-content: flex-end' }, [
  h('yh-button', { onClick: () => { visible.value = false } }, 'Got it')
])
</${_S}>`

const jsRender = toJs(tsRender)

const tsOrigin = `<${_T}>
  <yh-button @click="visible = true">Expand from Click Position</yh-button>

  <yh-dialog v-model="visible" transform-origin="mouse" title="Animation Experience" content="The dialog intelligently calculates the origin based on the mouse click position, providing ultimate visual continuity." />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsOrigin = toJs(tsOrigin)

const tsAdvanced = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-button @click="visibleDrag = true">Smart Drag</yh-button>
    <yh-button @click="visibleGlass = true" type="primary" plain>Flagship Glassmorphism</yh-button>
  </div>

  <yh-dialog v-model="visibleDrag" title="Freely Movable Header" draggable>
    <p>Hold the header area of this dialog to move it. We internally calculate a physical safety zone to prevent users from accidentally moving the close button out of the screen.</p>
  </yh-dialog>

  <yh-dialog v-model="visibleGlass" title="Premium Acrylic Texture" glass>
    <div style="min-height: 120px;">
      <p>Glassmorphism (Acrylic) is more than just transparency; it includes:</p>
      <ul style="margin-top: 15px; color: #4a4a4a; line-height: 2;">
        <li>💎 Dynamic Blur: 24px advanced dynamic background blur.</li>
        <li>🎨 Color Fidelity: Increased 190% saturation via saturate to make background blur brighter.</li>
        <li>🎯 Dark Adaptive: Automatically switches between frosted white and geek black texture.</li>
      </ul>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleDrag = ref(false)
const visibleGlass = ref(false)
</${_S}>`

const jsAdvanced = toJs(tsAdvanced)

const tsNested = `<${_T}>
  <yh-button @click="visibleOuter = true" type="primary" plain>Open Outer Dialog</yh-button>
  
  <yh-dialog v-model="visibleOuter" title="Step-by-step (1/2)">
    <p>Nesting dialogs is safe in YH-UI. Even when opening multiple layers, the scrollbar locking compensation logic ensures the background doesn't jump.</p>
    <div style="margin-top: 32px;">
      <yh-button type="primary" @click="visibleInner = true">Confirm Data Submission</yh-button>
    </div>

    <yh-dialog v-model="visibleInner" title="Step-by-step (2/2)" width="400px" align-center>
      <div style="padding: 10px 0;">
        Are you sure you want to submit current changes? This action cannot be undone.
      </div>
      <template #footer>
        <yh-button @click="visibleInner = false">Back</yh-button>
        <yh-button type="danger" @click="visibleInner = false; visibleOuter = false">Confirm Submission</yh-button>
      </template>
    </yh-dialog>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleOuter = ref(false)
const visibleInner = ref(false)
</${_S}>`

const jsNested = toJs(tsNested)

const tsNuxt = `<${_T}>
  <yh-button @click="visible = true">Nuxt Dialog</yh-button>
  <yh-dialog v-model="visible" title="Nuxt Compatibility">
    100% compatible with Nuxt 3 SSR rendering.
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsSwap = `<${_T}>
  <yh-button @click="visible = true">Swap Button Position</yh-button>

  <yh-dialog 
    v-model="visible" 
    title="Action Confirmation" 
    swap-footer-buttons
    content="The confirm button is now on the left, and the cancel button is on the right."
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsSwap = toJs(tsSwap)

const tsFunctional = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-button @click="handleHookCall">useDialog Hook</yh-button>
    <yh-button type="primary" @click="handleMethodCall">YhDialogMethod</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useDialog, YhDialogMethod } from '@yh-ui/components'

const { showDialog } = useDialog()

const handleHookCall = async () => {
  const { action } = await showDialog({
    title: 'Hook Call',
    content: 'This is a dialog launched via useDialog Hook, which automatically inherits the current application context.',
    type: 'info'
  })
  // Action status: confirm | cancel | close
}

const handleMethodCall = () => {
  YhDialogMethod.success({
    title: 'Imperative Call',
    content: 'This is a dialog launched directly via YhDialogMethod.success, without v-model.',
    confirmText: 'Great'
  })
}
</${_S}>`

const jsFunctional = toJs(tsFunctional)

const tsCallback = `<${_T}>
  <yh-button type="primary" plain @click="handleCallbackCall">Async Feedback Demo</yh-button>
</${_T}>

<${_S} setup lang="ts">
import { useDialog, YhMessage } from '@yh-ui/components'

const { showDialog } = useDialog()

const handleCallbackCall = async () => {
  // 1. Promise-based action feedback
  const { action } = await showDialog({
    title: 'Action Confirmation',
    content: 'Please choose your operation, and we will notify you of the result via a Message component.',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  })
  
  // 2. Feedback via Message component
  if (action === 'confirm') {
    YhMessage.success('You clicked the Confirm button')
  } else if (action === 'cancel') {
    YhMessage.warning('You clicked the Cancel button')
  } else {
    YhMessage.info('You closed the dialog')
  }
}
</${_S}>`

const jsCallback = toJs(tsCallback)

const tsFunctionalSwap = `<${_T}>
  <yh-button type="primary" plain @click="handleFunctionalSwap">Functional Button Swap</yh-button>
</${_T}>

<${_S} setup lang="ts">
import { useDialog } from '@yh-ui/components'

const { showDialog } = useDialog()

const handleFunctionalSwap = () => {
  showDialog({
    title: 'Action Confirmation',
    content: 'The confirm button is now on the left, and the cancel button is on the right.',
    swapFooterButtons: true
  })
}
</${_S}>`

const jsFunctionalSwap = toJs(tsFunctionalSwap)

const tsFullscreen = `<${_T}>
  <yh-button type="primary" @click="visible = true">Open Fullscreen Dialog</yh-button>

  <yh-dialog v-model="visible" title="Fullscreen View" fullscreen>
    <div style="padding: 24px;">
      <h3>Flagship Fullscreen Experience</h3>
      <p>When <code>fullscreen</code> is enabled, the dialog will occupy the entire screen viewport. This is suitable for complex forms, immersive previews, or large data display scenarios.</p>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsFullscreen = toJs(tsFullscreen)

const tsDestroy = `<${_T}>
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleNormal = true">Regular Mode</yh-button>
    <yh-button type="primary" plain @click="visibleDestroy = true">Enable Destroy Mode</yh-button>
  </div>

  <!-- Regular Mode: State Retention -->
  <yh-dialog v-model="visibleNormal" title="State Retained">
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">Type anything in this input, close and reopen it—the content <strong>will still be there</strong>:</p>
      <input style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="I am persistent state..." />
    </div>
  </yh-dialog>

  <!-- Destroy Mode: Performance Optimization -->
  <yh-dialog v-model="visibleDestroy" title="State Destroy Demo" destroy-on-close>
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">Type anything in this input, close and reopen it—the content will be <strong>cleared/reset</strong> because the DOM was unmounted:</p>
      <input style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="I am transient state..." />
      <p style="margin-top: 20px; color: #909399; font-size: 14px; line-height: 1.6;">
        💡 <strong>Performance Tip</strong>:<br/>
        When a dialog contains heavyweight components, enabling this ensures the page maintains low memory load.
      </p>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleNormal = ref(false)
const visibleDestroy = ref(false)
</${_S}>`

const jsDestroy = toJs(tsDestroy)

</script>

# Dialog

Flagship dialog solution. Compatible with mainstream interaction standards, it features deep enhancements in **drag boundary sense**, **Focus Trap**, and **Flagship Glassmorphism**, providing ultimate visual and operational continuity for production environments.

## Basic Usage

The simplest dialog display. Thanks to the built-in **Smart Footer** system, the component automatically renders standard operational buttons (Cancel/Confirm) by default, providing an out-of-the-box interactive experience without additional slots.

<DemoBlock title="Basic Interaction" :ts-code="tsBasic" :js-code="jsBasic">
<yh-button @click="visibleBasic = true">Open Dialog</yh-button>
<YhDialog v-model="visibleBasic" title="Standard Design Preview" @confirm="visibleBasic = false" @cancel="visibleBasic = false">
<span>YH-UI's dialog uses custom Bezier animations for a lightweight opening feel, combined with a 16px corner radius design to balance modernity and approachability.</span>
</YhDialog>
</DemoBlock>

## Centered Display

In addition to regular top offset, we provide more flexible viewport alignment strategies. Via the `align-center` and `center` attributes, you can achieve vertical centering or fullhorizontal alignment for different business scenarios.

<DemoBlock title="Centered Modes" :ts-code="tsCenter" :js-code="jsCenter">
<div style="display: flex; gap: 16px;">
<yh-button @click="visibleAlignCenter = true">Vertically Centered</yh-button>
<yh-button @click="visibleCenter = true" type="primary">Fully Centered Mode</yh-button>
</div>

<YhDialog v-model="visibleAlignCenter" title="Vertically Centered Content" align-center @confirm="visibleAlignCenter = false" @cancel="visibleAlignCenter = false">
<p>By using the <code>align-center</code> attribute, the dialog ignores the <code>top</code> setting and stays vertically centered.</p>
</YhDialog>

<YhDialog v-model="visibleCenter" title="Center Mode" center align-center>
<div style="text-align: center; padding: 20px 0;">
<div style="width: 64px; height: 64px; border-radius: 50%; background: #f0f9eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
<yh-icon name="check" style="color: #67c23a; font-size: 32px;" />
</div>
<h3 style="margin-bottom: 12px; font-weight: 700;">Action Confirmation</h3>
<p style="color: var(--yh-text-color-regular); font-size: 15px;">When <code>center</code> is true, the header, footer, and body content of the dialog will be centered horizontally.</p>
</div>
<template #footer>
<yh-button @click="visibleCenter = false">Cancel</yh-button>
<yh-button type="primary" @click="visibleCenter = false">Submit Now</yh-button>
</template>
</YhDialog>
</DemoBlock>

<DemoBlock title="Fullscreen Display" :ts-code="tsFullscreen" :js-code="jsFullscreen">
  <yh-button type="primary" @click="visibleFullscreen = true">Open Fullscreen Dialog</yh-button>
  <YhDialog v-model="visibleFullscreen" title="Fullscreen View" fullscreen @confirm="visibleFullscreen = false" @cancel="visibleFullscreen = false">
    <div style="padding: 24px;">
      <h3>Flagship Fullscreen Experience</h3>
      <p>When <code>fullscreen</code> is enabled, the dialog will occupy the entire screen viewport. This is suitable for complex forms, immersive previews, or large data display scenarios.</p>
    </div>
  </YhDialog>
</DemoBlock>

## Footer Alignment

You can control the horizontal alignment of footer buttons via the `footer-align` attribute. By default, button groups are right-aligned.

<DemoBlock title="Footer Alignment" :ts-code="tsFooterAlign" :js-code="jsFooterAlign">
<div style="display: flex; gap: 12px;">
<yh-button @click="visibleFooterLeft = true">Left Align</yh-button>
<yh-button @click="visibleFooterCenter = true">Center Align</yh-button>
<yh-button @click="visibleFooterRight = true">Right Align (Default)</yh-button>
</div>

<YhDialog v-model="visibleFooterLeft" title="Left Aligned" footer-align="left" @confirm="visibleFooterLeft = false" @cancel="visibleFooterLeft = false">
<span>The footer buttons are now arranged on the left.</span>
</YhDialog>

<YhDialog v-model="visibleFooterCenter" title="Center Aligned" footer-align="center" @confirm="visibleFooterCenter = false" @cancel="visibleFooterCenter = false">
<span>The footer buttons are now arranged in the center.</span>
</YhDialog>

<YhDialog v-model="visibleFooterRight" title="Right Aligned" footer-align="right" @confirm="visibleFooterRight = false" @cancel="visibleFooterRight = false">
<span>This is the default arrangement.</span>
</YhDialog>
</DemoBlock>

<DemoBlock title="Header Alignment" :ts-code="tsHeaderAlign" :js-code="jsHeaderAlign">
  <yh-button @click="visibleHeaderAlign = true">Header Aligned Right</yh-button>
  <YhDialog v-model="visibleHeaderAlign" title="Right Aligned Title" header-align="right" @confirm="visibleHeaderAlign = false" @cancel="visibleHeaderAlign = false">
    <span>You can independently control the arrangement of the title via the header-align attribute.</span>
  </YhDialog>
</DemoBlock>

<DemoBlock title="Content Alignment" :ts-code="tsContentAlign" :js-code="jsContentAlign">
  <yh-button @click="visibleContentAlign = true">Content Aligned Center</yh-button>
  <YhDialog v-model="visibleContentAlign" title="Content Alignment" content-align="center" @confirm="visibleContentAlign = false" @cancel="visibleContentAlign = false">
    <div style="padding: 10px 0;">
      <p>This is the centered content area.</p>
      <p>For some declarative or presentational dialogs, center alignment can provide a better reading experience.</p>
    </div>
  </YhDialog>
</DemoBlock>

## Premium Features

YH-UI provides rich enhancement configurations, supporting semantic type mapping, atomic loading state feedback, and fully transparent custom rendering controllers.

<DemoBlock title="Semantic Types and Icons" :ts-code="tsTypes" :js-code="jsTypes">
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
<yh-button type="success" plain @click="visibleSuccess = true">Success</yh-button>
<yh-button type="warning" plain @click="visibleWarning = true">Warning</yh-button>
<yh-button type="danger" plain @click="visibleError = true">Error</yh-button>
<yh-button type="info" plain @click="visibleInfo = true">Info</yh-button>
</div>

<YhDialog v-model="visibleSuccess" type="success" title="Success" content="Your application has been submitted and will be processed within 24 hours." />
<YhDialog v-model="visibleWarning" type="warning" title="Delete Confirmation" content="Data cannot be recovered after deletion. Please proceed with caution." />
<YhDialog v-model="visibleError" type="error" title="System Error" content="Network connection interrupted. Please check your network settings." />
<YhDialog v-model="visibleInfo" type="info" title="System Notification" content="A new version has been released. Click the button below to learn more." />
</DemoBlock>


<DemoBlock title="Loading State and Async Control" :ts-code="tsLoading" :js-code="jsLoading">
<yh-button @click="handleAsyncOpen">Async Submit Demo</yh-button>

<YhDialog v-model="visibleLoading" title="Processing" :loading="loadingState" content="Syncing cloud data, please wait...">
<template #footer>
<yh-button @click="visibleLoading = false">Cancel</yh-button>
<yh-button type="primary" :loading="loadingState" @click="simulateSubmit">Confirm Submission</yh-button>
</template>
</YhDialog>
</DemoBlock>

<DemoBlock title="Render Function Support" :ts-code="tsRender" :js-code="jsRender">
<yh-button type="primary" plain @click="visibleRender = true">Render Function Demo</yh-button>

<YhDialog 
  v-model="visibleRender" 
  :title="renderTitle"
  :content="renderContent"
  :action="renderAction"
/>
</DemoBlock>

<DemoBlock title="Destroy on Close (Performance Optimization)" :ts-code="tsDestroy" :js-code="jsDestroy">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleDestroyNormal = true">Regular Mode</yh-button>
    <yh-button type="primary" plain @click="visibleDestroy = true">Enable Destroy Mode</yh-button>
  </div>

  <!-- Regular Module -->
  <YhDialog v-model="visibleDestroyNormal" title="State Retained">
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">Type anything in this input, close and reopen it—the content <strong>will still be there</strong>:</p>
      <input style="border: 1px solid var(--yh-border-color); padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="I am persistent state..." />
    </div>
  </YhDialog>

  <!-- Destroy Module -->
  <YhDialog v-model="visibleDestroy" title="State Destroy Demo" destroy-on-close>
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">Type anything in this input, close and reopen it—the content will be <strong>cleared/reset</strong> because the DOM was unmounted:</p>
      <input style="border: 1px solid var(--yh-border-color); padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="I am transient state..." />
      <p style="margin-top: 20px; color: #909399; font-size: 14px; line-height: 1.6;">
        💡 <strong>Performance Tip</strong>:<br/>
        When a dialog contains heavyweight components, enabling this ensures the page maintains low memory load.
      </p>
    </div>
  </YhDialog>
</DemoBlock>

<DemoBlock title="Mouse Origin Animation" :ts-code="tsOrigin" :js-code="jsOrigin">
<div style="padding: 24px; border: 1px dashed var(--yh-border-color); text-align: center; border-radius: 12px;">
<yh-button @click="visibleOrigin = true">Expand from Click Position</yh-button>
</div>
<YhDialog v-model="visibleOrigin" transform-origin="mouse" title="Animation Experience" content="In mouse mode, the dialog intelligently calculates the origin based on the mouse click position, providing ultimate visual continuity." />
</DemoBlock>

## Advanced Interaction Features

YH-UI is dedicated to polishing every pixel of interactive feedback. This includes drag algorithms based on viewport physical safety boundaries and flagship-level glassmorphism visual rendering.

<DemoBlock title="Top Interaction Enhancements" :ts-code="tsAdvanced" :js-code="jsAdvanced">
<div style="display: flex; gap: 16px;">
<yh-button @click="visibleDraggable = true">Smart Drag</yh-button>
<yh-button @click="visibleGlass = true" type="primary" plain>Flagship Glassmorphism</yh-button>
</div>

<YhDialog v-model="visibleDraggable" title="Freely Movable Header" draggable>
<p>Hold the header area of this dialog to move it. We internally calculate a physical safety zone to prevent users from accidentally moving the close button out of the screen.</p>
</YhDialog>

<YhDialog v-model="visibleGlass" title="Premium Acrylic Texture" glass>
<div style="min-height: 120px;">
<p>Glassmorphism (Acrylic) is more than just transparency; it includes:</p>
<ul style="margin-top: 15px; color: #4a4a4a; line-height: 2;">
<li>💎 <strong>Dynamic Blur</strong>: 24px advanced dynamic background blur.</li>
<li>🎨 <strong>Color Fidelity</strong>: 190% saturation increase via saturate to make background blur brighter.</li>
<li>🎯 <strong>Dark Adaptive</strong>: Automatically switches between frosted white and geek black texture.</li>
</ul>
</div>
</YhDialog>
</DemoBlock>

## Use in Nuxt

YH-UI is perfectly adapted for Nuxt 3. You can use it directly in `app.vue` or any page.

::: tip Auto-import
If you are using `unplugin-vue-components/resolvers`, `YhDialog` will be automatically loaded on-demand with complete styles.
:::

<DemoBlock title="Nuxt Adaptation" :ts-code="tsNuxt" :js-code="jsNuxt">
<yh-button @click="visibleNuxt = true">Nuxt Dialog</yh-button>
<YhDialog v-model="visibleNuxt" title="Nuxt Compatibility">
  100% compatible with Nuxt 3 SSR rendering.
</YhDialog>
</DemoBlock>

<DemoBlock title="Button Position Swap" :ts-code="tsSwap" :js-code="jsSwap">
  <yh-button @click="visibleSwap = true">Swap Button Demo</yh-button>
  <YhDialog 
    v-model="visibleSwap" 
    title="Action Confirmation" 
    swap-footer-buttons
    content="The confirm button is now on the left, and the cancel button is on the right."
  />
</DemoBlock>

## Functional Calls

In some scenarios, you may want to skip `v-model` template declarations and launch a dialog directly via code. YH-UI provides a Promise-based functional call solution, supporting both Hook and static method forms.

<DemoBlock title="Functional Call Demo" :ts-code="tsFunctional" :js-code="jsFunctional">
<div style="display: flex; gap: 16px;">
<yh-button @click="handleHookCall">useDialog Hook</yh-button>
<yh-button type="primary" @click="handleMethodCall">YhDialogMethod</yh-button>
</div>
</DemoBlock>

<DemoBlock title="Async Feedback and Callbacks" :ts-code="tsCallback" :js-code="jsCallback">
<yh-button type="primary" plain @click="handleCallbackCall">Async Feedback Demo</yh-button>
</DemoBlock>

<DemoBlock title="Functional Button Swap" :ts-code="tsFunctionalSwap" :js-code="jsFunctionalSwap">
<yh-button type="primary" plain @click="handleFunctionalSwap">Swap Button Demo</yh-button>
</DemoBlock>

## Methods of Use

You can choose the most appropriate method based on business complexity.

### Composition API (Recommended)
Two-way binding via `v-model`, the most suitable way for Vue 3 design patterns.

### Independent Import
Manually import `YhDialog` in sub-components.

```ts
import { YhDialog } from '@yh-ui/components'
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Whether to display the dialog | `boolean` | `false` |
| title | Dialog title, supports render function | `string \| (() => VNode)` | - |
| type | Dialog type | `'success' \| 'warning' \| 'error' \| 'info' \| 'default'` | `'default'` |
| show-icon | Whether to show semantic icons | `boolean` | `true` |
| loading | Whether to show body loading state | `boolean` | `false` |
| content | Dialog content, supports render function | `string \| (() => VNode)` | - |
| action | Bottom operation area content, supports render function | `(() => VNode)` | - |
| transform-origin | Animation origin position | `'mouse' \| 'center'` | `'mouse'` |
| width | Dialog width | `string \| number` | `'50%'` |
| top | Distance from top (effective in non-centered mode) | `string` | `'15vh'` |
| fullscreen | Whether to display in fullscreen | `boolean` | `false` |
| align-center | Whether to vertically center in the viewport | `boolean` | `false` |
| center | **Fully Centered Mode**: Header, Body, Footer content all horizontally centered | `boolean` | `false` |
| glass | Enable flagship-level Acrylic (Glass) texture | `boolean` | `false` |
| draggable | Whether to enable physical drag functionality | `boolean` | `false` |
| overflow | Whether to allow dragging beyond viewport boundaries | `boolean` | `false` |
| modal | Whether to display background shield | `boolean` | `true` |
| lock-scroll | Lock viewport scroll when displayed | `boolean` | `true` |
| close-on-click-modal | Whether to close when clicking the background shield | `boolean` | `true` |
| close-on-press-escape | Whether to close when pressing ESC key | `boolean` | `true` |
| show-close | Whether to show close button | `boolean` | `true` |
| close-icon | Custom close icon name | `string` | `'close'` |
| destroy-on-close | Whether to destroy Dialog content on close | `boolean` | `false` |
| show-footer | Whether to show default footer buttons | `boolean` | `true` |
| cancel-text | Cancel button text | `string` | `'Cancel'` |
| confirm-text | Confirm button text | `string` | `'Confirm'` |
| before-close | Hook before closing, parameter is `(done: () => void)` | `Function` | - |
| teleport-to | Target DOM node to mount on | `string \| HTMLElement` | `'body'` |
| header-align-center | Whether dialog title is horizontally centered | `boolean` | `false` |
| footer-align-center | Whether dialog footer buttons are horizontally centered | `boolean` | `false` |
| style | Overall custom style | `string \| CSSProperties` | - |
| title-class | Custom title class name | `string` | - |
| title-style | Custom title style | `string \| CSSProperties` | - |
| content-class | Custom body class name | `string` | - |
| content-style | Custom body style | `string \| CSSProperties` | - |
| action-class | Custom footer class name | `string` | - |
| action-style | Custom footer style | `string \| CSSProperties` | - |
| modal-class | Custom background shield class name | `string` | - |
| custom-class | Custom root container class name | `string` | - |
| z-index | Base layer stack start | `number` | `2000` |
| auto-focus | Whether to auto-focus the first focusable element | `boolean` | `true` |
| swap-footer-buttons | Whether to swap the position of "Confirm" and "Cancel" buttons | `boolean` | `false` |
| footer-align | Footer button alignment | `'left' \| 'center' \| 'right'` | `'right'` |
| header-align | Title alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| content-align | Content alignment | `'left' \| 'center' \| 'right'` | `'left'` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Dialog body content area |
| header | Custom header area. If used, the `title` attribute is ignored |
| footer | Custom bottom operational area. If used, built-in buttons are ignored |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| update:modelValue | Triggered on visibility state change | `(value: boolean)` |
| open | Triggered when visibility state becomes true | - |
| opened | Triggered when opening animation finishes | - |
| close | Triggered when visibility state becomes false | - |
| closed | Triggered when closing animation finishes and content is destroyed | - |
| confirm | Triggered when default footer "Confirm" button is clicked | - |
| cancel | Triggered when default footer "Cancel" button is clicked | - |
| dragStart | Triggered when clicking header to start drag | `(e: MouseEvent)` |
| dragMove | Triggered continuously during dragging | `(e: MouseEvent)` |
| dragEnd | Triggered when dragging ends | `(e: MouseEvent)` |

### Expose

| Method | Description | Type |
| --- | --- | --- |
| visible | Reactive visibility state | `Ref<boolean>` |
| dialogRef | Dialog DOM reference | `Ref<HTMLElement>` |
| handleClose | Executes close logic (triggers before-close) | `() => void` |
| handleCancel | Executes cancel logic (triggers cancel event and closes) | `() => void` |
| handleConfirm | Executes confirm logic (triggers confirm event and closes) | `() => void` |

### Theme Variables (CSS Variables)

Customize the global vision of Dialog by overriding the following CSS variables.

| Variable | Default Value | Description |
| --- | --- | --- |
| `--yh-dialog-margin-top` | `15vh` | Dialog top margin |
| `--yh-bg-color-overlay` | `#ffffff` | Dialog background color |
| `--yh-radius-lg` | `16px` | Dialog corner radius |
| `--yh-text-color-primary` | `#1a1a1a` | Title color |
| `--yh-color-success` | `#67c23a` | Success icon/button color |
| `--yh-color-warning` | `#e6a23c` | Warning icon/button color |
| `--yh-color-danger` | `#f56c6c` | Error icon/button color |
| `--yh-color-info` | `#909399` | Info icon/button color |
| `--yh-text-color-secondary` | `#909399` | Close button color |
| `--yh-text-color-regular` | `#4a4a4a` | Body text color |
| `--yh-border-color-light` | `rgba(0,0,0,0.05)` | Close button hover background |
