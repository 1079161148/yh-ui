<script setup lang="ts">
import { h, ref } from 'vue'
import { YhMessageBox } from '@yh-ui/components'

// --- Demo Logic ---

const openAlert = () => {
  YhMessageBox.alert('This is a basic message alert content.', 'System Tip')
}

const openConfirm = () => {
  YhMessageBox.confirm(
    'This will permanently delete the file. Continue?',
    'Tip',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
}

const openPrompt = () => {
  YhMessageBox.prompt('Please input your email', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid email format',
  })
}

const openVNode = () => {
  YhMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Content can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

const openHTML = () => {
  YhMessageBox.alert(
    '<strong>This is an <i>HTML</i> snippet</strong>',
    'HTML Content',
    {
      dangerouslyUseHTMLString: true,
    }
  )
}

const openCenter = () => {
  YhMessageBox.confirm(
    'This will permanently delete the file. Continue?',
    'Tip',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      center: true,
    }
  )
}

const openDraggable = () => {
  YhMessageBox.alert('The content can be dragged freely', 'Tip', {
    draggable: true,
  })
}

const openBeforeClose = () => {
  YhMessageBox.confirm('Submitting request takes about 2 seconds.', 'Async Interception', {
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmLoading = true
        setTimeout(() => {
          done()
          instance.confirmLoading = false
        }, 2000)
      } else {
        done()
      }
    },
  })
}

const openNuxt = () => {
  YhMessageBox.alert('Nuxt 3 auto-import successful!', 'SSR Compatibility')
}

const openSuccess = () => {
  YhMessageBox.confirm('Order has been successfully submitted.', 'Success', {
    confirmButtonText: 'View Details',
    iconType: 'success',
  })
}

const openWarning = () => {
  YhMessageBox.confirm('Unusual login detected. Please confirm if it was you.', 'Security Warning', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    iconType: 'warning',
  })
}

const openError = () => {
  YhMessageBox.alert('An unexpected system error occurred. Please refresh.', 'System Error', {
    confirmButtonText: 'Contact Support',
    iconType: 'error',
  })
}

const openInfo = () => {
  YhMessageBox.alert('The server is currently under maintenance.', 'Tip', {
    iconType: 'info',
  })
}

const openLoading = () => {
  YhMessageBox.confirm('Submission might take some time.', 'Loading State', {
    confirmButtonText: 'Submit Now',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmLoading = true
        // Simulate API request
        setTimeout(() => {
          done()
          instance.confirmLoading = false
        }, 3000)
      } else {
        done()
      }
    }
  })
}

const openSetDefaults = () => {
  YhMessageBox.setDefaults({
    glass: true,
    center: true,
    confirmButtonText: 'Got it',
  })
  YhMessageBox.alert(
    'As the global configuration has changed, this popup automatically applies the <span style="color: #00d2ff; font-weight: bold;">acrylic effect</span> and text <span style="color: #00ff9d; font-weight: bold;">center alignment</span>.', 
    'Global Config Effective',
    { dangerouslyUseHTMLString: true }
  )
}

// --- Snippets ---

const tsAlert = `<template>
  <yh-button type="primary" @click="open">Message Alert</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.alert('This is a basic message alert content.', 'System Tip')
}
<\/script>`

const tsConfirm = `<template>
  <yh-button type="primary" @click="open">Confirm Dialog</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.confirm(
    'This will permanently delete the file. Continue?',
    'Tip',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
}
<\/script>`

const tsPrompt = `<template>
  <yh-button type="primary" @click="open">Submit Content</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.prompt('Please input your email', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /[\\w!#$%&'*+/=?^_\`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_\`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/,
    inputErrorMessage: 'Invalid email format',
  })
}
<\/script>`

const tsVNode = `<template>
  <yh-button type="primary" @click="open">VNode Rendering</yh-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Content can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
<\/script>`

const tsHTML = `<template>
  <yh-button type="primary" @click="open">HTML Rendering</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.alert(
    '<strong>This is an <i>HTML</i> snippet</strong>',
    'HTML Content',
    {
      dangerouslyUseHTMLString: true,
    }
  )
}
<\/script>`

const tsCenter = `<template>
  <yh-button type="primary" @click="open">Center Layout</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.confirm(
    'This will permanently delete the file. Continue?',
    'Tip',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      center: true,
    }
  )
}
<\/script>`

const tsDraggable = `<template>
  <yh-button type="primary" @click="open">Draggable Popup</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.alert('The content can be dragged freely', 'Tip', {
    draggable: true,
  })
}
<\/script>`

const tsBeforeClose = `<template>
  <yh-button type="primary" @click="open">Async Interception</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.confirm('Submitting request takes about 2 seconds.', 'Async Interception', {
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmLoading = true
        setTimeout(() => {
          done()
          instance.confirmLoading = false
        }, 2000)
      } else {
        done()
      }
    },
  })
}
<\/script>`

const tsNuxt = `<template>
  <yh-button type="primary" @click="open">Nuxt Auto Import</yh-button>
</template>

<script setup lang="ts">
// In Nuxt projects, YhMessageBox is automatically imported
const open = () => {
  YhMessageBox.alert('Nuxt 3 auto-import successful!', 'SSR Compatibility')
}
<\/script>`

const tsSuccess = `<template>
  <yh-button type="success" @click="open">Success State</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.confirm('Order has been successfully submitted.', 'Success', {
    confirmButtonText: 'View Details',
    iconType: 'success',
  })
}
<\/script>`

const tsWarning = `<template>
  <yh-button type="warning" @click="open">Warning State</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.confirm('Unusual login detected. Please confirm if it was you.', 'Security Warning', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    iconType: 'warning',
  })
}
<\/script>`

const tsError = `<template>
  <yh-button type="danger" @click="open">Error State</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.alert('An unexpected system error occurred. Please refresh.', 'System Error', {
    confirmButtonText: 'Contact Support',
    iconType: 'error',
  })
}
<\/script>`

const tsInfo = `<template>
  <yh-button type="primary" @click="open">Info State</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.alert('The server is currently under maintenance.', 'Tip', {
    iconType: 'info',
  })
}
<\/script>`

const tsSetDefaults = `<template>
  <yh-button type="primary" @click="open">Apply Global Acrylic Config</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  // Set global defaults
  YhMessageBox.setDefaults({
    glass: true,
    center: true,
    confirmButtonText: 'Got it',
  })
  
  // Subsequent calls will auto-apply the above config
  YhMessageBox.alert(
    'As the global configuration has changed, this popup automatically applies the <span style="color: #00d2ff; font-weight: bold;">acrylic effect</span> and text <span style="color: #00ff9d; font-weight: bold;">center alignment</span>.', 
    'Global Config Effective',
    { dangerouslyUseHTMLString: true }
  )
}
<\/script>`

const tsLoading = `<template>
  <yh-button type="primary" @click="open">Loading State</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from '@yh-ui/yh-ui'

const open = () => {
  YhMessageBox.confirm('Submission might take some time.', 'Loading State', {
    confirmButtonText: 'Submit Now',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        // Enable confirm button loading
        instance.confirmLoading = true
        
        // Simulate API request
        setTimeout(() => {
          done()
          // Stop loading after logic completes (or handle inside done)
          instance.confirmLoading = false
        }, 3000)
      } else {
        done()
      }
    }
  })
}
<\/script>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
</script>

# MessageBox

A message dialog mimicking the native system experience, integrated with YH-UI's signature acrylic visual language, GPU-accelerated drag interactions, and rigorous business lifecycle control.

## Basic Usage

Provides three common interaction modes: `alert`, `confirm`, and `prompt`.

<DemoBlock title="Alert" :ts-code="tsAlert" :js-code="toJs(tsAlert)">
  <yh-button type="primary" @click="openAlert">Message Alert</yh-button>
</DemoBlock>

<DemoBlock title="Confirm Dialog" :ts-code="tsConfirm" :js-code="toJs(tsConfirm)">
  <yh-button type="primary" @click="openConfirm">Confirm Dialog</yh-button>
</DemoBlock>

<DemoBlock title="Prompt" :ts-code="tsPrompt" :js-code="toJs(tsPrompt)">
  <yh-button type="primary" @click="openPrompt">Submit Content</yh-button>
</DemoBlock>

## Different States

Used to display operational feedback such as "Success, Warning, Info, Error".

<DemoBlock title="Success State" :ts-code="tsSuccess" :js-code="toJs(tsSuccess)">
  <yh-button type="success" @click="openSuccess">Success State</yh-button>
</DemoBlock>

<DemoBlock title="Warning State" :ts-code="tsWarning" :js-code="toJs(tsWarning)">
  <yh-button type="warning" @click="openWarning">Warning State</yh-button>
</DemoBlock>

<DemoBlock title="Error State" :ts-code="tsError" :js-code="toJs(tsError)">
  <yh-button type="danger" @click="openError">Error State</yh-button>
</DemoBlock>

<DemoBlock title="Info State" :ts-code="tsInfo" :js-code="toJs(tsInfo)">
  <yh-button type="primary" @click="openInfo">Info State</yh-button>
</DemoBlock>

## Custom Content

The `message` property supports passing HTML strings or VNodes.

<DemoBlock title="VNode Rendering" :ts-code="tsVNode" :js-code="toJs(tsVNode)">
  <yh-button type="primary" @click="openVNode">VNode Rendering</yh-button>
</DemoBlock>

<DemoBlock title="Using HTML Snippet" :ts-code="tsHTML" :js-code="toJs(tsHTML)">
  <yh-button type="primary" @click="openHTML">HTML Rendering</yh-button>
</DemoBlock>

::: warning Warning
While `dangerouslyUseHTMLString` is convenient, it can easily lead to XSS attacks. Ensure the content of message is trusted. **Never** assign user-submitted content to the message property.
:::

## Vision and Layout

YH-UI flagship features, providing frosted glass texture, drag positioning, and full axis alignment.

<DemoBlock title="Center Layout" :ts-code="tsCenter" :js-code="toJs(tsCenter)">
  <yh-button type="primary" @click="openCenter">Center Layout</yh-button>
</DemoBlock>

<DemoBlock title="Draggable" :ts-code="tsDraggable" :js-code="toJs(tsDraggable)">
  <yh-button type="primary" @click="openDraggable">Draggable Popup</yh-button>
</DemoBlock>

## Asynchronous Close Interception

The `beforeClose` hook can precisely intercept exit actions. It is commonly used for handling async API logic, with the component automatically maintaining the confirm button's loading state.

<DemoBlock title="Async Interception" :ts-code="tsBeforeClose" :js-code="toJs(tsBeforeClose)">
  <yh-button type="primary" @click="openBeforeClose">Async Interception</yh-button>
</DemoBlock>

## Loading State

By using the `confirmButtonLoading` property or manually setting `instance.confirmLoading = true` in the `beforeClose` hook, you can display a loading animation directly on the confirm button. The component automatically handles button disabling.

<DemoBlock title="Async Loading Demo" :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <yh-button type="primary" @click="openLoading">Loading State</yh-button>
</DemoBlock>

## Global Default Configuration

If most popups in your application share consistent visual preferences (e.g., globally enabling the acrylic effect), you can use `setDefaults` for one-click global configuration to avoid repetitive parameter passing.

<DemoBlock title="Global Configuration Demo" :ts-code="tsSetDefaults" :js-code="toJs(tsSetDefaults)">
  <yh-button type="primary" @click="openSetDefaults">Apply Global Acrylic Config</yh-button>
</DemoBlock>

## Use in Nuxt

`YhMessageBox` fully supports Nuxt 3/4. As a directive-called component, it automatically detects the environment during SSR (Server-Side Rendering) to ensure popup logic only executes on the client.

<DemoBlock title="Nuxt Usage Demo" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-button type="primary" @click="openNuxt">Nuxt Auto Import</yh-button>
</DemoBlock>

**Notes**:

- ✅ **Full Auto Import**: In Nuxt projects, `YhMessageBox` and its alias functions are automatically mapped without explicit `import`.
- ✅ **SSR Safe**: `process.client` detection is encapsulated inside the functions, so you can safely call them in lifecycles or methods.
- 💡 **Style Sync**: Component styles are automatically injected via Nuxt plugins, ensuring visual continuity after the first screen is hydrated.

::: tip Production Practice
In the Nuxt ecosystem, it is recommended to use `YhMessageBox` in `defineNuxtComponent` or `setup` logic for business interception, achieving an excellent global error alert experience when combined with `useFetch` interceptors.
:::

## Global Methods

If you have fully imported YH-UI, it adds the following global methods to `app.config.globalProperties`: `$msgbox`, `$alert`, `$confirm`, and `$prompt`. Thus, you can call `MessageBox` using the methods shown on this page in a Vue instance.

- `$msgbox(options)`
- `$alert(message, title, options)` or `$alert(message, options)`
- `$confirm(message, title, options)` or `$confirm(message, options)`
- `$prompt(message, title, options)` or `$prompt(message, options)`

## Application Context Inheritance

Now `MessageBox` accepts the constructor's `context` as the second parameter (if you are using MessageBox variables). This parameter allows you to inject the current application context into the message, inheriting all application properties.

```ts
import { getCurrentInstance } from 'vue'
import { YhMessageBox } from '@yh-ui/yh-ui'

// In your setup method
const { appContext } = getCurrentInstance()!
// Pass parameters like this:
YhMessageBox({}, appContext)
// Or use different calling methods:
YhMessageBox.alert('Hello world!', 'Title', {}, appContext)
```

## API

### Methods

| Method        | Description                                 | Parameter Type                             | Return Value                 |
| ------------- | ------------------------------------------- | ------------------------------------------ | ---------------------------- |
| `alert`       | Pops up an alert message box                | `(message, title?, options?, appContext?)` | `Promise<void>`              |
| `confirm`     | Pops up an operation confirmation box       | `(message, title?, options?, appContext?)` | `Promise<MessageBoxAction>`  |
| `prompt`      | Pops up a content input box                 | `(message, title?, options?, appContext?)` | `Promise<{ value, action }>` |
| `setDefaults` | Modifies global default configuration items | `(defaults: MessageBoxOptions)`            | —                            |

### MessageBoxOptions

| Prop                     | Description                                    | Type                                          | Default         |
| ------------------------ | ---------------------------------------------- | --------------------------------------------- | --------------- |
| title                    | Title                                          | `string`                                      | `Tip`           |
| message                  | Content                                        | `string \| VNode \| (() => VNode)`            | —               |
| type                     | Popup type                                     | `'alert' \| 'confirm' \| 'prompt'`            | —               |
| iconType                 | State icon type                                | `'success' \| 'warning' \| 'info' \| 'error'` | —               |
| icon                     | Custom icon                                    | `string \| Component \| VNode`                | —               |
| width                    | Popup width                                    | `string \| number`                            | `420`           |
| dangerouslyUseHTMLString | Whether to render message as HTML              | `boolean`                                     | `false`         |
| showClose                | Whether to show close button at top-right      | `boolean`                                     | `true`          |
| showConfirmButton        | Whether to show confirm button                 | `boolean`                                     | `true`          |
| showCancelButton         | Whether to show cancel button                  | `boolean`                                     | `true`          |
| confirmButtonText        | Confirm button text                            | `string`                                      | `OK`            |
| cancelButtonText         | Cancel button text                             | `string`                                      | `Cancel`        |
| closeOnClickModal        | Whether to close when clicking the overlay     | `boolean`                                     | `true`          |
| closeOnPressEscape       | Whether to close when pressing ESC             | `boolean`                                     | `true`          |
| lockScroll               | Whether to lock scrollbar                      | `boolean`                                     | `true`          |
| glass                    | Whether to enable acrylic glass mode           | `boolean`                                     | `false`         |
| center                   | Whether to center content layout               | `boolean`                                     | `false`         |
| roundButton              | Whether to use rounded buttons                 | `boolean`                                     | `false`         |
| draggable                | Whether popup is draggable                     | `boolean`                                     | `false`         |
| draggableBoundary        | Whether to prevent dragging out of viewport    | `boolean`                                     | `true`          |
| customClass              | Custom class name                              | `string`                                      | —               |
| inputPlaceholder         | Input placeholder (prompt only)                | `string`                                      | —               |
| inputValue               | Initial input value (prompt only)              | `string`                                      | —               |
| inputPattern             | Input validation regex (prompt only)           | `RegExp`                                      | —               |
| inputValidator           | Custom input validation function (prompt only) | `(value: string) => boolean \| string`        | —               |
| inputErrorMessage        | Validation error message (prompt only)         | `string`                                      | —               |
| beforeClose              | Hook before closing                            | `(action, instance, done) => void`            | —               |
| callback                 | Callback after closing                         | `(action, instance) => void`                  | —               |
| appContext               | Application context (Vue Context)              | `AppContext`                                  | —               |
| autofocus                | Whether to autofocus on opening                | `boolean`                                     | `true`          |
| appendTo                 | Sets the root element for the component        | `string \| HTMLElement`                       | `document.body` |
| confirmButtonLoading     | Whether confirm button shows loading status    | `boolean`                                     | `false`         |
| cancelButtonLoading      | Whether cancel button shows loading status     | `boolean`                                     | `false`         |
| loadingIcon              | Custom loading icon                            | `string \| Component \| VNode`                | —               |

### MessageBoxInstance (instance in beforeClose)

| Prop/Method      | Description                         | Type                                   |
| ---------------- | ----------------------------------- | -------------------------------------- |
| `confirmLoading` | Loading state of the confirm button | `boolean`                              |
| `cancelLoading`  | Loading state of the cancel button  | `boolean`                              |
| `open`           | Opens the popup                     | `(options: MessageBoxOptions) => void` |
| `close`          | Closes the popup                    | `() => void`                           |

### Theme Variables

| Variable                  | Description                                           | Default                        |
| ------------------------- | ----------------------------------------------------- | ------------------------------ |
| `--yh-scrollbar-width`    | Scrollbar width of the current system (auto-injected) | —                              |
| `--yh-bg-color-overlay`   | Popup background color                                | `var(--yh-bg-color-overlay)`   |
| `--yh-text-color-primary` | Title color                                           | `var(--yh-text-color-primary)` |
