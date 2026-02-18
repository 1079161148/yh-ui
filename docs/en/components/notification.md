# Notification

<script setup lang="ts">
import { YhNotification } from '@yh-ui/components/notification'

const showBasic = () => {
  YhNotification({
    title: 'Title',
    message: 'This is a notification message'
  })
}

const showSuccess = () => {
  YhNotification.success('Success', 'Congrats, this is a success message')
}

// Nuxt Demo
const onNuxtNotify = () => {
  YhNotification({ title: 'Nuxt', message: 'Auto-import is ready' })
}
const onNuxtSuccess = () => {
  YhNotification.success('SSR', 'Environment adaptation complete')
}

const showWarning = () => {
  YhNotification.warning('Warning', 'This is a warning message')
}

const showInfo = () => {
  YhNotification.info('Info', 'This is an info message tip')
}

const showError = () => {
  YhNotification.error('Error', 'This is an error message')
}

const showTopRight = () => {
  YhNotification({
    title: 'Top Right',
    message: 'This is a notification message',
    position: 'top-right'
  })
}

const showTopLeft = () => {
  YhNotification({
    title: 'Top Left',
    message: 'This is a notification message',
    position: 'top-left'
  })
}

const showBottomRight = () => {
  YhNotification({
    title: 'Bottom Right',
    message: 'This is a notification message',
    position: 'bottom-right'
  })
}

const showBottomLeft = () => {
  YhNotification({
    title: 'Bottom Left',
    message: 'This is a notification message',
    position: 'bottom-left'
  })
}

const showNoAutoClose = () => {
  YhNotification({
    title: 'No Auto Close',
    message: 'This notification will not close automatically',
    duration: 0
  })
}

const showHtml = () => {
  YhNotification({
    title: 'HTML Content',
    message: '<strong>This is <i>HTML</i> content</strong>',
    dangerouslyUseHTMLString: true
  })
}

const showHideClose = () => {
  YhNotification({
    title: 'Hide Close Button',
    message: 'This notification has no close button',
    showClose: false
  })
}

const showTopCenter = () => {
  YhNotification({
    title: 'Top Center',
    message: 'This is a notification message',
    position: 'top-center'
  })
}

const showBottomCenter = () => {
  YhNotification({
    title: 'Bottom Center',
    message: 'This is a notification message',
    position: 'bottom-center'
  })
}

const showMaxLimit = () => {
  YhNotification({
    title: 'Max Limit',
    message: 'Displaying up to 3 notifications',
    position: 'top-right',
    max: 3
  })
}

// VNode rendering
import { h, ref } from 'vue'
import { YhSwitch } from '@yh-ui/components/switch'

// VNode as message
const showVNodeMessage = () => {
  YhNotification({
    title: 'Use Vnode',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}

// Functional message (dynamic props)
const checked = ref(false)
const showDynamicMessage = () => {
  YhNotification({
    title: 'Use Vnode',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(YhSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean) => {
          checked.value = val
        }
      }),
    duration: 0
  })
}

const toJs = (code: string) => code
  .replace(/setup lang="ts"/g, 'setup')
  .replace(/lang="ts"/g, '')
  .replace(/:\s*[A-Z][a-zA-Z<>| | \[]+/g, '')
  .replace(/<[A-Z][a-zA-Z<>| ]+>/g, '')
  .replace(/as\s+[A-Z][a-zA-Z<>| ]+/g, '')

// Code Snippets
const tsBasic = `<template>
  <yh-button @click="showNotification">Show Notification</yh-button>
</template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showNotification = () => {
  YhNotification({
    title: 'Title',
    message: 'This is a notification message'
  })
}
<\/script>`

const jsBasic = toJs(tsBasic)

const tsTypes = `<template>
  <yh-button type="success" @click="showSuccess">Success</yh-button>
  <yh-button type="warning" @click="showWarning">Warning</yh-button>
  <yh-button type="info" @click="showInfo">Info</yh-button>
  <yh-button type="danger" @click="showError">Error</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showSuccess = () => {
  YhNotification.success('Success', 'Congrats, this is a success message')
}

const showWarning = () => {
  YhNotification.warning('Warning', 'This is a warning message')
}

const showInfo = () => {
  YhNotification.info('Info', 'This is an info message tip')
}

const showError = () => {
  YhNotification.error('Error', 'This is an error message')
}
<\/script>`

const jsTypes = toJs(tsTypes)

const tsPosition = `<template>
  <yh-button @click="showTopLeft">Top Left</yh-button>
  <yh-button @click="showTopRight">Top Right</yh-button>
  <yh-button @click="showBottomLeft">Bottom Left</yh-button>
  <yh-button @click="showBottomRight">Bottom Right</yh-button>
  <yh-button @click="showBottomCenter">Bottom Center</yh-button>
  <yh-button @click="showTopCenter">Top Center</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showTopRight = () => {
  YhNotification({
    title: 'Top Right',
    message: 'This is a notification message',
    position: 'top-right'
  })
}

const showTopLeft = () => {
  YhNotification({
    title: 'Top Left',
    message: 'This is a notification message',
    position: 'top-left'
  })
}

const showTopCenter = () => {
  YhNotification({
    title: 'Top Center',
    message: 'This is a notification message',
    position: 'top-center'
  })
}

const showBottomRight = () => {
  YhNotification({
    title: 'Bottom Right',
    message: 'This is a notification message',
    position: 'bottom-right'
  })
}

const showBottomLeft = () => {
  YhNotification({
    title: 'Bottom Left',
    message: 'This is a notification message',
    position: 'bottom-left'
  })
}

const showBottomCenter = () => {
  YhNotification({
    title: 'Bottom Center',
    message: 'This is a notification message',
    position: 'bottom-center'
  })
}
<\/script>`

const jsPosition = toJs(tsPosition)

const tsDuration = `<template>
  <yh-button @click="showNotification">No Auto Close</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showNotification = () => {
  YhNotification({
    title: 'No Auto Close',
    message: 'This notification will not close automatically',
    duration: 0 // Set to 0 to prevent auto-close
  })
}
<\/script>`

const jsDuration = toJs(tsDuration)

const tsHtml = `<template>
  <yh-button @click="showHtml">Use HTML Snippet</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showHtml = () => {
  YhNotification({
    title: 'HTML Content',
    message: '<strong>This is <i>HTML</i> content</strong>',
    dangerouslyUseHTMLString: true
  })
}
<\/script>`

const jsHtml = toJs(tsHtml)

const tsHideClose = `<template>
  <yh-button @click="showNotification">Hide Close Button</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showNotification = () => {
  YhNotification({
    title: 'Hide Close Button',
    message: 'This notification has no close button',
    showClose: false
  })
}
<\/script>`

const jsHideClose = toJs(tsHideClose)

const tsMaxLimit = `<template>
  <yh-button type="success" @click="showMaxLimit">Max 3 Notifications</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showMaxLimit = () => {
  YhNotification({
    title: 'Limit Quantity',
    message: 'Displaying up to 3 notifications',
    position: 'top-right',
    max: 3
  })
}
<\/script>`

const jsMaxLimit = toJs(tsMaxLimit)

const tsVNodeMessage = `<template>
  <yh-button @click="open">Common VNode</yh-button>
  <yh-button @click="open1">Dynamic Props</yh-button>
<\/template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { YhNotification, YhSwitch } from 'yh-ui'

const open = () => {
  YhNotification({
    title: 'Use Vnode',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

const open1 = () => {
  const checked = ref(false)
  YhNotification({
    title: 'Use Vnode',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(YhSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val) => {
          checked.value = val
        },
      }),
    duration: 0
  })
}
<\/script>`

const jsVNodeMessage = toJs(tsVNodeMessage)

// Nuxt Usage Examples
const tsNuxt = `<template>
  <div style="display: flex; gap: 12px;">
    <!-- Just call directly in Nuxt, components are auto-imported -->
    <yh-button @click="onNotify">Basic Notification</yh-button>
    
    <yh-button type="success" @click="onSuccess">Success Notification</yh-button>
  </div>
</template>

<script setup lang="ts">
// In Nuxt, YhNotification will be automatically imported
const onNotify = () => {
  YhNotification({ 
    title: 'Nuxt', 
    message: 'Auto-import is ready' 
  })
}

const onSuccess = () => {
  YhNotification.success('SSR', 'Environment adaptation complete')
}
<\/script>`

const jsNuxt = toJs(tsNuxt)
</script>

Floats in the corners of the page, displaying global notification and reminder messages.

## Basic Usage

Notification is suitable for passive reminders of system-level notifications.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-button @click="showBasic">Show Notification</yh-button>
</DemoBlock>

## Different States

Used to display system notifications such as "Success, Warning, Info, Error".

<DemoBlock title="Different States" :ts-code="tsTypes" :js-code="jsTypes">
  <div class="yh-demo-flex">
    <yh-button type="success" @click="showSuccess">Success</yh-button>
    <yh-button type="warning" @click="showWarning">Warning</yh-button>
    <yh-button type="info" @click="showInfo">Info</yh-button>
    <yh-button type="danger" @click="showError">Error</yh-button>
  </div>
</DemoBlock>

## Custom Position

Use the `position` property to set the position of the notification popup.

<DemoBlock title="Custom Position" :ts-code="tsPosition" :js-code="jsPosition">
  <div class="yh-demo-flex">
    <yh-button @click="showTopLeft">Top Left</yh-button>
    <yh-button @click="showTopRight">Top Right</yh-button>
    <yh-button @click="showBottomLeft">Bottom Left</yh-button>
    <yh-button @click="showBottomRight">Bottom Right</yh-button>
    <yh-button @click="showBottomCenter">Bottom Center</yh-button>
    <yh-button @click="showTopCenter">Top Center</yh-button>
  </div>
</DemoBlock>

## Custom Duration

Set the `duration` property to 0 to prevent the notification from closing automatically.

<DemoBlock title="Custom Duration" :ts-code="tsDuration" :js-code="jsDuration">
  <yh-button @click="showNoAutoClose">No Auto Close</yh-button>
</DemoBlock>

## Use HTML Snippet

Set `dangerouslyUseHTMLString` to true to treat the `message` property as an HTML snippet.

::: warning Warning
While the `message` property supports passing HTML snippets, dynamic rendering of arbitrary HTML is very dangerous. Ensure the content of message is trusted. **Never** assign user-submitted content to the message property.
:::

<DemoBlock title="Use HTML Snippet" :ts-code="tsHtml" :js-code="jsHtml">
  <yh-button @click="showHtml">Use HTML Snippet</yh-button>
</DemoBlock>

## Hide Close Button

Set `showClose` to false to hide the close button.

<DemoBlock title="Hide Close Button" :ts-code="tsHideClose" :js-code="jsHideClose">
  <yh-button @click="showHideClose">Hide Close Button</yh-button>
</DemoBlock>

## Max Count

Use the `max` property to limit the maximum number of notifications displayed at the same position. When the limit is exceeded, the oldest notification will be automatically closed.

<DemoBlock title="Max Limit" :ts-code="tsMaxLimit" :js-code="jsMaxLimit">
  <yh-button type="success" @click="showMaxLimit">Max 3 Notifications</yh-button>
</DemoBlock>

## Functional Message <Badge type="tip" text="2.8.0" />

The `message` property can be a VNode, or a function that returns a VNode.

::: warning Warning
While the `message` property supports passing HTML snippets, dynamic rendering of arbitrary HTML is very dangerous as it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). Therefore, when `dangerouslyUseHTMLString` is enabled, ensure the content of `message` is trusted. **Never** assign user-submitted content to the `message` property.
:::

<DemoBlock title="Functional Message" :ts-code="tsVNodeMessage" :js-code="jsVNodeMessage">
  <div class="yh-demo-flex">
    <yh-button @click="showVNodeMessage">Common VNode</yh-button>
    <yh-button @click="showDynamicMessage">Dynamic Props</yh-button>
  </div>
</DemoBlock>

## Use in Nuxt

The Notification component is deeply integrated with Nuxt 3/4. As an imperative component, it automatically identifies server/client environments, ensuring that notification popups are only executed in the client browser to avoid errors during the SSR phase.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="onNuxtNotify">Basic Notification</yh-button>
    <yh-button type="success" @click="onNuxtSuccess">Success Notification</yh-button>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ **Safe environment identification**: Environment detection is encapsulated inside the functions, so calling them in Nuxt's `setup` or lifecycles is safe.
- ✅ **Auto-import**: In Nuxt projects, the `YhNotification` function is automatically scanned and imported without additional manual `import`.
- ✅ **Style preloading**: Component styles are automatically injected with the Nuxt page rendering, ensuring visual effects meet expectations when popping up.
- ⚠️ **Server constraints**: Calling this function during `useAsyncData` or in a server-side Middleware will have no visual output (since there is no DOM).
- 💡 **Global methods**: The Nuxt plugin automatically mounts `$notify` globally. You can also call it via `this.$notify` in options-style components.

::: tip Error Log Integration
Combined with Nuxt's `app:error` hook, you can use `YhNotification.error` to capture and display global unhandled runtime errors.
:::

## Call Signature

YhNotification supports multiple calling methods. Choose the appropriate one according to your project needs.

### Composition API (Recommended)

Import and use directly in `<script setup>`:

```vue
<template>
  <yh-button @click="showNotification">Show Notification</yh-button>
</template>

<script setup lang="ts">
import { YhNotification } from 'yh-ui'

const showNotification = () => {
  YhNotification.success('Success', 'This is a success message')
}
</script>
```

### Options API

YH-UI adds the global method `$notify` to `app.config.globalProperties`. You can call it using `this.$notify` in the Options API:

```vue
<template>
  <yh-button @click="showNotification">Show Notification</yh-button>
</template>

<script>
export default {
  methods: {
    showNotification() {
      this.$notify.success('Success', 'Operation successful!')
    }
  }
}
</script>
```

### Individual Import

```typescript
import { YhNotification } from 'yh-ui'
```

## API

### Methods

| Name | Description | Parameters |
| --- | --- | --- |
| `YhNotification` | Show notification | `options` |
| `YhNotification.success` | Show success notification | `(title, message \| options)` |
| `YhNotification.warning` | Show warning notification | `(title, message \| options)` |
| `YhNotification.info` | Show info notification | `(title, message \| options)` |
| `YhNotification.error` | Show error notification | `(title, message \| options)` |
| `YhNotification.closeAll` | Close all notifications | — |

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `title` | Title | `string` | — |
| `message` | Notification content | `string \| VNode \| (() => VNode)` | — |
| `type` | Notification type | `'success' \| 'warning' \| 'info' \| 'error'` | — |
| `icon` | Custom icon | `string \| VNode` | — |
| `showClose` | Whether to show close button | `boolean` | `true` |
| `duration` | Display duration (ms), set to 0 to prevent auto-close | `number` | `4500` |
| `offset` | Offset from the window edge (px) | `number` | `16` |
| `position` | Popup position | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` |
| `dangerouslyUseHTMLString` | Whether to treat message as an HTML snippet | `boolean` | `false` |
| `onClose` | Callback function when closing | `() => void` | — |
| `onClick` | Callback function when clicking the notification | `() => void` | — |
| `zIndex` | z-index level | `number` | — |
| `customClass` | Custom class name | `string` | — |
| `max` | Limit the number of notifications shown at the same position | `number` | — |

### Return Value

Calling `YhNotification` returns an instance of the current Notification. If you need to manually close the instance, call its `close` method.

| Method | Description |
| --- | --- |
| `close` | Close current Notification |

```typescript
const handler = YhNotification.success('Success', 'Message content')

// Close manually
handler.close()
```

### Slots

| Slot Name | Description |
| --- | --- |
| `default` | Custom content area |
| `icon` | Custom icon area |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `visible` | Notification visibility status | `Ref<boolean>` |
| `close` | Close current notification | `() => void` |

### Theme Variables

The Notification component use following CSS variables, which can be overridden to customize the style:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-notification-bg-color` | Background color | `var(--yh-color-bg-elevated)` |
| `--yh-notification-border-color` | Border color | `var(--yh-border-color-light)` |
| `--yh-notification-shadow` | Shadow | `var(--yh-box-shadow-small)` |
| `--yh-notification-title-color` | Title color | `var(--yh-color-text-primary)` |
| `--yh-notification-text-color` | Content text color | `var(--yh-color-text-secondary)` |
| `--yh-notification-close-color` | Close button color | `var(--yh-color-text-secondary)` |
| `--yh-notification-close-hover-color` | Close button hover color | `var(--yh-color-text-primary)` |
| `--yh-notification-icon-size` | Icon size | `24px` |
| `--yh-notification-width` | Notification width | `330px` |
| `--yh-notification-padding` | Padding | `20px` |
| `--yh-notification-radius` | Border radius | `var(--yh-border-radius-base)` |
