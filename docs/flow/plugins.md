# Flow 插件系统

Flow 提供标准化插件接口（`FlowPlugin` / `PluginManager`），用于扩展：Minimap、Controls、Grid、Snap、Export 等能力。

## 内置插件

目前内置能力主要通过 `Flow` props 开关提供（如 `show-controls`、`show-minimap`）。后续会把这些能力逐步统一为可插拔插件。

## 插件接口（概览）

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

## TODO

- [ ] 在 `Flow.vue` 中真正接入 `PluginManager`（当前 `provideFlowContext` 里 `usePlugin/removePlugin` 仍是空实现）
- [ ] 将 Controls/Minimap/Grid/Snap/Export 迁移为可插拔插件

## 下一个

- [API 参考](./api)
