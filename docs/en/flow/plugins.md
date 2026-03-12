# Plugins

Flow provides a standardized plugin interface (`FlowPlugin` / `PluginManager`) for extensions.

## Status

- Plugin types & manager exist in code.
- `Flow.vue` still needs to wire `usePlugin/removePlugin` to the `PluginManager`.

## Plugin interface (overview)

```ts
import type { FlowPlugin, FlowInstance } from '@yh-ui/flow'

export const MyPlugin: FlowPlugin = {
  id: 'my-plugin',
  name: 'MyPlugin',
  install(flow: FlowInstance) {
    // flow.nodes / flow.edges / flow.viewport
    // flow.on/off/emit
  }
}
```
