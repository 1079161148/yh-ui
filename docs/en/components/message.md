# Message

<script setup lang="ts">
import { YhMessage } from '@yh-ui/components/message'

const showMessage = () => {
  YhMessage('This is a message tip')
}

const showSuccess = () => {
  YhMessage.success('Congrats, this is a success message')
}

// Nuxt Demo Methods
const onNuxtMessage = () => {
  YhMessage('Nuxt auto-import successful!')
}
const onNuxtSuccessTip = () => {
  YhMessage.success('SSR environment compatibility ready')
}

const showWarning = () => {
  YhMessage.warning('Warning, this is a warning message')
}

const showInfo = () => {
  YhMessage.info('This is an info message tip')
}

const showError = () => {
  YhMessage.error('Oops, this is an error message')
}

const showClosable = () => {
  YhMessage({
    message: 'This is a closable message',
    showClose: true,
    duration: 0
  })
}

const showCenter = () => {
  YhMessage({
    message: 'Centered text',
    center: true
  })
}

const showHtml = () => {
  YhMessage({
    message: '<strong>This is an <i>HTML</i> message</strong>',
    dangerouslyUseHTMLString: true
  })
}

const showGrouping = () => {
  YhMessage({
    message: 'This is a message with the same content',
    grouping: true,
    type: 'success'
  })
}

const showPlacement = (placement: any) => {
  YhMessage({
    message: 'This is a message at ' + placement,
    placement
  })
}

// Code Snippets
const tsBasic = `<template>
  <yh-button @click="showMessage">Show Message</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showMessage = () => {
  YhMessage('This is a message tip')
}
<\/script>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '').replace(/:\s*[A-Z][a-zA-Z]+/g, '').replace(/as\s+[A-Z][a-zA-Z]+/g, '')

const jsBasic = `<template>
  <yh-button @click="showMessage">Show Message</yh-button>
</template>

<script setup>
import { YhMessage } from '@yh-ui/yh-ui'

const showMessage = () => {
  YhMessage('This is a message tip')
}
<\/script>`

const tsTypes = `<template>
  <yh-button type="success" @click="showSuccess">Success</yh-button>
  <yh-button type="warning" @click="showWarning">Warning</yh-button>
  <yh-button type="info" @click="showInfo">Info</yh-button>
  <yh-button type="danger" @click="showError">Error</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showSuccess = () => {
  YhMessage.success('Congrats, this is a success message')
}

const showWarning = () => {
  YhMessage.warning('Warning, this is a warning message')
}

const showInfo = () => {
  YhMessage.info('This is an info message tip')
}

const showError = () => {
  YhMessage.error('Oops, this is an error message')
}
<\/script>`

const jsTypes = toJs(tsTypes)

const tsClosable = `<template>
  <yh-button @click="showClosable">Closable Message</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showClosable = () => {
  YhMessage({
    message: 'This is a closable message',
    showClose: true,
    duration: 0 // Set to 0 to prevent auto-close
  })
}
<\/script>`

const jsClosable = `<template>
  <yh-button @click="showClosable">Closable Message</yh-button>
</template>

<script setup>
import { YhMessage } from '@yh-ui/yh-ui'

const showClosable = () => {
  YhMessage({
    message: 'This is a closable message',
    showClose: true,
    duration: 0
  })
}
<\/script>`

const tsCenter = `<template>
  <yh-button @click="showCenter">Centered Message</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showCenter = () => {
  YhMessage({
    message: 'Centered text',
    center: true
  })
}
<\/script>`

const jsCenter = `<template>
  <yh-button @click="showCenter">Centered Message</yh-button>
</template>

<script setup>
import { YhMessage } from '@yh-ui/yh-ui'

const showCenter = () => {
  YhMessage({
    message: 'Centered text',
    center: true
  })
}
<\/script>`

const tsHtml = `<template>
  <yh-button @click="showHtml">Use HTML Snippet</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showHtml = () => {
  YhMessage({
    message: '<strong>This is an <i>HTML</i> message</strong>',
    dangerouslyUseHTMLString: true
  })
}
<\/script>`

const jsHtml = `<template>
  <yh-button @click="showHtml">Use HTML Snippet</yh-button>
</template>

<script setup>
import { YhMessage } from '@yh-ui/yh-ui'

const showHtml = () => {
  YhMessage({
    message: '<strong>This is an <i>HTML</i> message</strong>',
    dangerouslyUseHTMLString: true
  })
}
<\/script>`

const tsCloseAll = `<template>
  <yh-button @click="showMultiple">Show Multiple Messages</yh-button>
  <yh-button @click="closeAll">Close All</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showMultiple = () => {
  YhMessage.success('Message One')
  YhMessage.warning('Message Two')
  YhMessage.error('Message Three')
}

const closeAll = () => {
  YhMessage.closeAll()
}
<\/script>`

const jsCloseAll = `<template>
  <yh-button @click="showMultiple">Show Multiple Messages</yh-button>
  <yh-button @click="closeAll">Close All</yh-button>
</template>

<script setup>
import { YhMessage } from '@yh-ui/yh-ui'

const showMultiple = () => {
  YhMessage.success('Message One')
  YhMessage.warning('Message Two')
  YhMessage.error('Message Three')
}

const closeAll = () => {
  YhMessage.closeAll()
}
<\/script>`
const tsGrouping = `<template>
  <yh-button @click="showGrouping">Grouping Messages</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showGrouping = () => {
  YhMessage({
    message: 'This is a message with the same content',
    grouping: true,
    type: 'success'
  })
}
<\/script>`

const jsGrouping = tsGrouping.replace('lang="ts"', '')

const tsPlacement = `<template>
  <yh-button @click="showPlacement('top')">Top</yh-button>
  <yh-button @click="showPlacement('top-left')">Top Left</yh-button>
  <yh-button @click="showPlacement('top-right')">Top Right</yh-button>
  <yh-button @click="showPlacement('bottom')">Bottom</yh-button>
  <yh-button @click="showPlacement('bottom-left')">Bottom Left</yh-button>
  <yh-button @click="showPlacement('bottom-right')">Bottom Right</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'
import type { MessagePlacement } from '@yh-ui/yh-ui'

const showPlacement = (placement: MessagePlacement) => {
  YhMessage({
    message: 'This is a message at ' + placement,
    placement
  })
}
<\/script>`

const jsPlacement = `<template>
  <yh-button @click="showPlacement('top')">Top</yh-button>
  <yh-button @click="showPlacement('top-left')">Top Left</yh-button>
  <yh-button @click="showPlacement('top-right')">Top Right</yh-button>
  <yh-button @click="showPlacement('bottom')">Bottom</yh-button>
  <yh-button @click="showPlacement('bottom-left')">Bottom Left</yh-button>
  <yh-button @click="showPlacement('bottom-right')">Bottom Right</yh-button>
</template>

<script setup>
import { YhMessage } from '@yh-ui/yh-ui'

const showPlacement = (placement) => {
  YhMessage({
    message: 'This is a message at ' + placement,
    placement
  })
}
<\/script>`

// Nuxt Usage Example
const tsNuxt = `<template>
  <div style="display: flex; gap: 12px;">
    <!-- Just call it directly in Nuxt, components are auto-imported -->
    <yh-button @click="onMessage">Basic Message</yh-button>
    
    <yh-button type="success" @click="onSuccess">Success Tip</yh-button>
  </div>
</template>

<script setup lang="ts">
// In Nuxt, YhMessage will be automatically imported
const onMessage = () => {
  YhMessage('Nuxt auto-import successful!')
}

const onSuccess = () => {
  YhMessage.success('SSR environment compatibility ready')
}
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

Used for feedback hints after active operations. The difference from Notification is that the latter is used more for passive reminders of system-level notifications.

## Basic Usage

Appears from the top and disappears automatically after 3 seconds.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-button @click="showMessage">Show Message</yh-button>
</DemoBlock>

## Different States

Used to display operational feedback such as "Success, Warning, Info, Error".

<DemoBlock title="Different States" :ts-code="tsTypes" :js-code="jsTypes">
  <div style="display: flex; gap: 12px;">
    <yh-button type="success" @click="showSuccess">Success</yh-button>
    <yh-button type="warning" @click="showWarning">Warning</yh-button>
    <yh-button type="info" @click="showInfo">Info</yh-button>
    <yh-button type="danger" @click="showError">Error</yh-button>
  </div>
</DemoBlock>

## Closable

A close button can be added. By default, Message cannot be closed manually. If you need a manually closable Message, use the `showClose` property. Also, setting `duration` to 0 can prevent the message from closing automatically.

<DemoBlock title="Closable" :ts-code="tsClosable" :js-code="jsClosable">
  <yh-button @click="showClosable">Closable Message</yh-button>
</DemoBlock>

## Centered Text

Use the `center` property to horizontally center the text.

<DemoBlock title="Centered Text" :ts-code="tsCenter" :js-code="jsCenter">
  <yh-button @click="showCenter">Centered Message</yh-button>
</DemoBlock>

## Use HTML Snippet

Set `dangerouslyUseHTMLString` to true to treat the `message` property as an HTML snippet.

::: warning Warning
While the `message` property supports passing HTML snippets, dynamic rendering of arbitrary HTML is very dangerous. Ensure the content of message is trusted. **Never** assign user-submitted content to the message property.
:::

<DemoBlock title="Use HTML Snippet" :ts-code="tsHtml" :js-code="jsHtml">
  <yh-button @click="showHtml">Use HTML Snippet</yh-button>
</DemoBlock>

## Grouping

Set `grouping` to true, and `message` units with the same content will be merged.

<DemoBlock title="Grouping" :ts-code="tsGrouping" :js-code="jsGrouping">
  <yh-button @click="showGrouping">Merge Grouped Messages</yh-button>
</DemoBlock>

## Placement

Set the `placement` property to control where the message appears.

<DemoBlock title="Placement" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="showPlacement('top')">Top</yh-button>
    <yh-button @click="showPlacement('top-left')">Top Left</yh-button>
    <yh-button @click="showPlacement('top-right')">Top Right</yh-button>
    <yh-button @click="showPlacement('bottom')">Bottom</yh-button>
    <yh-button @click="showPlacement('bottom-left')">Bottom Left</yh-button>
    <yh-button @click="showPlacement('bottom-right')">Bottom Right</yh-button>
  </div>
</DemoBlock>

## Use in Nuxt

The Message component fully supports Nuxt 3/4 environments. As a functional directive component, it automatically performs environment detection during SSR (Server-Side Rendering) to ensure that the message popup logic is only executed on the web browser side.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="onNuxtMessage">Basic Message</yh-button>
    <yh-button type="success" @click="onNuxtSuccessTip">Success Tip</yh-button>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ **Safe Calling**: Calling functions directly in templates or at the top level of `setup` is safe, as `window` detection is handled internally.
- ✅ **Auto-import**: In Nuxt projects, the `YhMessage` function and its alias callers are automatically imported without manual `import`.
- ⚠️ **Server Constraints**: Calling message hints during Nuxt's `asyncData` or `fetch` server execution phase is ineffective (since there is no DOM container).
- 💡 **Style Consistency**: Message styles will be loaded asynchronously along with the CSS, ensuring that the visual style after first-screen hydration is highly unified with the SSR page.

::: tip Error Catching Suggestion
In Nuxt's `useFetch` interceptors or `onError` hooks, you can directly use `YhMessage.error` to provide users with friendly server-side error message hints.
:::

## Call Signature

YhMessage supports multiple calling methods. Choose the appropriate one according to your project needs.

### Composition API (Recommended)

Import and use directly in `<script setup>`:

```vue
<template>
  <yh-button @click="showMessage">Show Message</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'

const showMessage = () => {
  YhMessage.success('This is a success message')
}
</script>
```

### Options API

YH-UI adds the global method `$message` to `app.config.globalProperties`. You can call it using `this.$message` in the Options API:

```vue
<template>
  <yh-button @click="showMessage">Show Message</yh-button>
</template>

<script>
export default {
  methods: {
    showMessage() {
      this.$message.success('This is a success message')
    }
  }
}
</script>
```

### Individual Import

```typescript
import { YhMessage } from '@yh-ui/yh-ui'
```

## API

### Methods

| Name               | Description          | Parameters          |
| ------------------ | -------------------- | ------------------- |
| YhMessage          | Show message         | `options \| string` |
| YhMessage.success  | Show success message | `options \| string` |
| YhMessage.warning  | Show warning message | `options \| string` |
| YhMessage.info     | Show info message    | `options \| string` |
| YhMessage.error    | Show error message   | `options \| string` |
| YhMessage.closeAll | Close all messages   | —                   |

### Props

| Prop                        | Description                                       | Type                                                                                | Default  |
| --------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- | -------- |
| message                     | Message content                                   | `string \| VNode`                                                                   | —        |
| type                        | Message type                                      | `'success' \| 'warning' \| 'info' \| 'error'`                                       | `'info'` |
| icon                        | Custom icon                                       | `string \| VNode`                                                                   | —        |
| show-close                  | Whether to show close button                      | `boolean`                                                                           | `false`  |
| duration                    | Display duration (ms), set to 0 for no auto-close | `number`                                                                            | `3000`   |
| offset                      | Offset from the top (px)                          | `number`                                                                            | `64`     |
| dangerously-use-html-string | Whether to treat message as an HTML snippet       | `boolean`                                                                           | `false`  |
| center                      | Whether to center content                         | `boolean`                                                                           | `false`  |
| on-close                    | Callback function when closing                    | `() => void`                                                                        | —        |
| z-index                     | z-index level                                     | `number`                                                                            | —        |
| custom-class                | Custom class name                                 | `string`                                                                            | —        |
| grouping                    | Whether to support grouping merge                 | `boolean`                                                                           | `false`  |
| placement                   | Message placement                                 | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'`  |

### Slots

| Slot Name | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| default   | Message content (used when the message property is insufficient) |
| icon      | Custom icon content                                              |

### Expose

Calling `YhMessage` returns an instance of the current Message. If you need to manually close the instance, call its `close` method.

| Name    | Description                            | Type           |
| ------- | -------------------------------------- | -------------- |
| close   | Close current Message                  | `() => void`   |
| visible | Whether the current message is visible | `Ref<boolean>` |

### Theme Variables

| Variable                         | Description              | Default                            |
| -------------------------------- | ------------------------ | ---------------------------------- |
| `--yh-message-bg-color`          | Background color         | `var(--yh-bg-color-overlay)`       |
| `--yh-message-border-color`      | Border color             | `var(--yh-border-color-lighter)`   |
| `--yh-message-shadow`            | Message box shadow       | `var(--yh-box-shadow-light)`       |
| `--yh-message-text-color`        | Text color               | `var(--yh-text-color-primary)`     |
| `--yh-message-close-color`       | Close button color       | `var(--yh-text-color-placeholder)` |
| `--yh-message-close-hover-color` | Close button hover color | `var(--yh-text-color-regular)`     |
