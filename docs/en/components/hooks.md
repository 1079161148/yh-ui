# Hooks

YH-UI provides Vue 3 Composition API hooks for component development, application pages, and reusable state logic. They are exported from `@yh-ui/hooks` and are also available through `@yh-ui/yh-ui`.

## Install

If your project already uses the full package, import hooks from `@yh-ui/yh-ui`:

```ts
import { useNamespace, useZIndex, useLocale } from '@yh-ui/yh-ui'
```

For hooks-only usage, install the standalone package:

```bash
pnpm add @yh-ui/hooks
```

```ts
import { useNamespace, useZIndex, useLocale } from '@yh-ui/hooks'
```

## Common Hooks

| Hook                 | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `useNamespace`       | Generates BEM class names for YH-UI components.            |
| `useZIndex`          | Allocates z-index values for overlays.                     |
| `useLocale`          | Reads localized component text.                            |
| `useId`              | Generates stable IDs for forms and accessibility.          |
| `useFormItem`        | Connects custom controls to form item context.             |
| `useConfig`          | Reads global configuration context.                        |
| `useEventListener`   | Registers event listeners with automatic cleanup.          |
| `useClickOutside`    | Detects clicks outside a target element.                   |
| `useScrollLock`      | Locks page scrolling for overlays.                         |
| `useVirtualScroll`   | Builds virtualized long lists.                             |
| `useCountdown`       | Manages countdown state.                                   |
| `useCache`           | Wraps local cache state.                                   |
| `useSKU`             | Handles SKU combinations and disabled states.              |
| `storage`            | Reactive storage helpers.                                  |
| `useAiChat`          | Manages AI chat state.                                     |
| `useAiStream`        | Manages streaming AI output.                               |
| `useAiConversations` | Manages conversation lists, pinning, removal, persistence. |
| `useAiVoice`         | Manages voice recording and speech interaction state.      |
| `useAiPersistence`   | Helps persist AI conversations.                            |
| `useAiRequest`       | Wraps AI request state.                                    |

## useNamespace

Generate class names that match YH-UI conventions.

```ts
import { useNamespace } from '@yh-ui/hooks'

const ns = useNamespace('button')

ns.b() // yh-button
ns.e('icon') // yh-button__icon
ns.m('primary') // yh-button--primary
ns.is('disabled', true) // is-disabled
```

## useZIndex

Allocate incremental z-index values for overlay components.

```ts
import { useZIndex } from '@yh-ui/hooks'

const { nextZIndex } = useZIndex()

const zIndex = nextZIndex()
```

## useLocale

Read localized component text from the current locale context.

```ts
import { useLocale } from '@yh-ui/hooks'

const { t } = useLocale()

const emptyText = t('common.empty')
```

## useEventListener

Bind DOM events safely and clean them up when the component unmounts.

```ts
import { useEventListener } from '@yh-ui/hooks'

useEventListener(window, 'resize', () => {
  // update layout
})
```

## useClickOutside

Close popovers, dropdowns, and panels when the user clicks outside.

```ts
import { ref } from 'vue'
import { useClickOutside } from '@yh-ui/hooks'

const panelRef = ref<HTMLElement>()

useClickOutside(panelRef, () => {
  // close panel
})
```

## useVirtualScroll

Render only visible rows for long lists.

```ts
import { useVirtualScroll } from '@yh-ui/hooks'

const { visibleItems, totalHeight, offsetY } = useVirtualScroll({
  items,
  itemHeight: 36,
  containerHeight: 360
})
```

## AI Hooks

AI hooks are designed to work with components such as `AiChat`, `AiBubble`, `AiSender`, and `AiThoughtChain`.

```ts
import { useAiChat, useAiStream } from '@yh-ui/hooks'

const chat = useAiChat({
  request: async (message) => {
    return `Received: ${message}`
  }
})

const stream = useAiStream({
  request: async function* (query) {
    yield `Processing: ${query}`
  }
})
```

See [AI Components](/en/ai-components/ai-chat) for more examples.

## Recommendations

- Use `useNamespace`, `useLocale`, and `useZIndex` when building YH-UI style components.
- Use `useClickOutside`, `useScrollLock`, and `useEventListener` for overlay components.
- Use `useVirtualScroll` for long lists and frequent rendering updates.
- Use AI hooks for chat, streaming output, conversation state, and persistence.
