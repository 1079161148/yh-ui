<script setup lang="ts">
import { h } from 'vue'
import { YhMessageBox } from '@yh-ui/components'

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
        instance.confirmLoading = true
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
<\/script>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
</script>

# MessageBox

Displays message dialogs through the `YhMessageBox` function API, including alert, confirm, and prompt modes.

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

Use `iconType` to display success, warning, info, or error feedback.

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

The `message` option supports plain text, VNodes, and HTML strings.

<DemoBlock title="VNode Rendering" :ts-code="tsVNode" :js-code="toJs(tsVNode)">
  <yh-button type="primary" @click="openVNode">VNode Rendering</yh-button>
</DemoBlock>

<DemoBlock title="Using HTML Snippet" :ts-code="tsHTML" :js-code="toJs(tsHTML)">
  <yh-button type="primary" @click="openHTML">HTML Rendering</yh-button>
</DemoBlock>

::: warning Warning
While `dangerouslyUseHTMLString` is convenient, it can lead to XSS attacks. Only pass trusted content.
:::

## Vision and Layout

Use layout-related options such as `glass`, `center`, and `draggable` to adjust appearance and interaction behavior.

<DemoBlock title="Center Layout" :ts-code="tsCenter" :js-code="toJs(tsCenter)">
  <yh-button type="primary" @click="openCenter">Center Layout</yh-button>
</DemoBlock>

<DemoBlock title="Draggable" :ts-code="tsDraggable" :js-code="toJs(tsDraggable)">
  <yh-button type="primary" @click="openDraggable">Draggable Popup</yh-button>
</DemoBlock>

## Asynchronous Close Interception

Use `beforeClose` to intercept confirm, cancel, or close actions before the dialog is dismissed.

<DemoBlock title="Async Interception" :ts-code="tsBeforeClose" :js-code="toJs(tsBeforeClose)">
  <yh-button type="primary" @click="openBeforeClose">Async Interception</yh-button>
</DemoBlock>

## Loading State

Use `confirmButtonLoading`, `cancelButtonLoading`, or update the exposed instance state inside `beforeClose` to control button loading behavior.

<DemoBlock title="Async Loading Demo" :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <yh-button type="primary" @click="openLoading">Loading State</yh-button>
</DemoBlock>

## Global Default Configuration

Use `setDefaults` to update the global default options used by subsequent `YhMessageBox` calls.

<DemoBlock title="Global Configuration Demo" :ts-code="tsSetDefaults" :js-code="toJs(tsSetDefaults)">
  <yh-button type="primary" @click="openSetDefaults">Apply Global Acrylic Config</yh-button>
</DemoBlock>

## Use in Nuxt

`YhMessageBox` can be called in Nuxt client-side interaction flows after the YH-UI module is registered. Because the function API rejects on the server, it should be triggered from browser-side logic such as click handlers or client-only lifecycle code.

<DemoBlock title="Nuxt Usage Demo" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-button type="primary" @click="openNuxt">Nuxt Auto Import</yh-button>
</DemoBlock>

**Notes**:

- Register `@yh-ui/nuxt` to use the library in Nuxt with auto-import support.
- The runtime rejects calls on the server, so open dialogs from browser-side code.
- Component styles are injected through the normal YH-UI style pipeline after hydration.

## Global Methods

When the full library is installed, the following methods are also attached to `app.config.globalProperties`:

- `$msgbox(options)`
- `$alert(message, title, options)` or `$alert(message, options)`
- `$confirm(message, title, options)` or `$confirm(message, options)`
- `$prompt(message, title, options)` or `$prompt(message, options)`

## Application Context Inheritance

`YhMessageBox` accepts an app context so dialogs can inherit the current Vue application configuration.

```ts
import { getCurrentInstance } from 'vue'
import { YhMessageBox } from '@yh-ui/yh-ui'

const { appContext } = getCurrentInstance()!

YhMessageBox({}, appContext)
YhMessageBox.alert('Hello world!', 'Title', {}, appContext)
```

## API

### Methods

| Method | Description | Parameter Type | Return Value |
| --- | --- | --- | --- |
| `YhMessageBox` | Opens a message box with the provided options or message content. | `(options: YhMessageBoxOptions \| string \| VNode, appContext?: AppContext \| null)` | `Promise<{ value?: string; action: YhMessageBoxAction }>` |
| `alert` | Opens an alert dialog. | `(message, title?, options?, appContext?)` | `Promise<void>` |
| `confirm` | Opens a confirmation dialog. | `(message, title?, options?, appContext?)` | `Promise<YhMessageBoxAction>` |
| `prompt` | Opens an input dialog. | `(message, title?, options?, appContext?)` | `Promise<{ value: string; action: 'confirm' }>` |
| `setDefaults` | Updates the global default options used by later calls. | `(defaults: YhMessageBoxOptions)` | `void` |

### Message Box Options

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title text. | `string` | `'Tip'` |
| message | Dialog content. | `string \| VNode \| (() => VNode)` | `undefined` |
| type | Dialog type. | `YhMessageBoxType` | `undefined` |
| dangerouslyUseHTMLString | Whether to render `message` as HTML. | `boolean` | `false` |
| iconType | State icon type. | `YhMessageBoxState` | `undefined` |
| icon | Custom icon. | `string \| Component \| VNode` | `undefined` |
| confirmButtonText | Confirm button text. | `string` | `'确定'` |
| cancelButtonText | Cancel button text. | `string` | `'取消'` |
| showCancelButton | Whether to show the cancel button. | `boolean` | `true` |
| showConfirmButton | Whether to show the confirm button. | `boolean` | `true` |
| showClose | Whether to show the top-right close button. | `boolean` | `true` |
| closeOnClickModal | Whether clicking the overlay closes the dialog. | `boolean` | `true` |
| closeOnPressEscape | Whether pressing `Esc` closes the dialog. | `boolean` | `true` |
| lockScroll | Whether to lock body scroll. | `boolean` | `true` |
| glass | Whether to enable glass mode. | `boolean` | `false` |
| center | Whether to center content layout. | `boolean` | `false` |
| roundButton | Whether to use rounded buttons. | `boolean` | `false` |
| draggable | Whether the dialog is draggable. | `boolean` | `false` |
| draggableBoundary | Whether dragging is kept inside the viewport. | `boolean` | `true` |
| width | Dialog width. | `string \| number` | `420` |
| customClass | Custom class name. | `string` | `undefined` |
| inputPlaceholder | Input placeholder in `prompt` mode. | `string` | `undefined` |
| inputValue | Initial input value in `prompt` mode. | `string` | `undefined` |
| inputPattern | Input validation regex in `prompt` mode. | `RegExp` | `undefined` |
| inputValidator | Custom validation function in `prompt` mode. | `(value: string) => boolean \| string` | `undefined` |
| inputErrorMessage | Validation error message in `prompt` mode. | `string` | `undefined` |
| beforeClose | Hook called before the dialog closes. | `(action: YhMessageBoxAction, instance: YhMessageBoxInstance, done: () => void) => void` | `undefined` |
| callback | Callback invoked by the function API after the dialog closes. | `(action: YhMessageBoxAction, instance: YhMessageBoxInstance) => void` | `undefined` |
| appContext | Vue app context used by the function API for inheritance. | `AppContext \| null` | `undefined` |
| autofocus | Whether to autofocus when opening. | `boolean` | `true` |
| appendTo | Mount container used by the function API. If the selector cannot be found, it falls back to `document.body`. | `string \| HTMLElement` | `document.body` |
| confirmButtonLoading | Whether the confirm button shows loading. | `boolean` | `false` |
| cancelButtonLoading | Whether the cancel button shows loading. | `boolean` | `false` |
| loadingIcon | Custom loading icon. Declared in the type, but the current implementation does not consume it. | `string \| Component \| VNode` | `undefined` |
| themeOverrides | Component-level theme overrides. | `ComponentThemeVars` | `undefined` |

### Events

This function entry does not expose component events.

### Slots

This function entry does not expose component slots.

### Expose

This function entry does not expose a template component instance. Runtime control is available through the `YhMessageBoxInstance` passed to `beforeClose`.

### Message Box Instance

| Prop/Method | Description | Type |
| --- | --- | --- |
| `confirmLoading` | Loading state of the confirm button. | `boolean` |
| `cancelLoading` | Loading state of the cancel button. | `boolean` |
| `open` | Opens the popup. | `(options: YhMessageBoxOptions) => void` |
| `close` | Closes the popup. | `() => void` |
| `setCallback` | Registers the close callback used by the function API. | `(cb: (res: { action: YhMessageBoxAction; value?: string }) => void) => void` |

### Theme Variables

`YhMessageBox` supports `themeOverrides`. The stylesheet mainly consumes global tokens, while runtime overrides generate variables such as the following:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-scrollbar-width` | Scrollbar width compensation injected at runtime. | Runtime injected |
| `--yh-message-box-bg-color` | Variable generated from `themeOverrides.bgColor`. | No built-in stylesheet fallback |
| `--yh-message-box-title-color` | Variable generated from `themeOverrides.titleColor`. | No built-in stylesheet fallback |

### Type Exports

| Name | Description |
| --- | --- |
| `YhMessageBoxType` | Message-box type union |
| `YhMessageBoxData` | Prompt result payload type |
| `YhMessageBoxAction` | Action union returned by confirm / prompt flows |
| `YhMessageBoxState` | Built-in state icon union |
| `YhMessageBoxInstance` | Runtime instance type passed to hooks |
| `YhMessageBoxOptions` | Options type for `YhMessageBox(...)` |
| `YhMessageBoxHandler` | Promise / handler return abstraction |
