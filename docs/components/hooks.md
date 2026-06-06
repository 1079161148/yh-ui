# Hooks

YH-UI 提供了一组 Vue 3 Composition API hooks，用于组件开发、业务页面搭建和应用层状态复用。它们来自 `@yh-ui/hooks`，也会被 `@yh-ui/yh-ui` 聚合导出。

## 安装

如果项目已经安装完整包，可以直接从 `@yh-ui/yh-ui` 引入：

```ts
import { useNamespace, useZIndex, useLocale } from '@yh-ui/yh-ui'
```

如果只需要 hooks，也可以安装独立包：

```bash
pnpm add @yh-ui/hooks
```

```ts
import { useNamespace, useZIndex, useLocale } from '@yh-ui/hooks'
```

## 常用 Hooks

| Hook                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| `useNamespace`       | 生成组件 BEM 类名，保持 YH-UI 组件样式命名一致。 |
| `useZIndex`          | 管理弹窗、抽屉、消息等覆盖层的层级。             |
| `useLocale`          | 读取当前语言包文本，用于组件国际化。             |
| `useId`              | 生成稳定 ID，适合表单、描述关系和可访问性属性。  |
| `useFormItem`        | 接入表单项上下文，触发表单校验和状态同步。       |
| `useConfig`          | 读取全局配置上下文。                             |
| `useEventListener`   | 安全注册和释放事件监听。                         |
| `useClickOutside`    | 监听目标元素外部点击，常用于弹层关闭。           |
| `useScrollLock`      | 锁定页面滚动，常用于 Dialog、Drawer 等覆盖层。   |
| `useVirtualScroll`   | 构建大列表虚拟滚动。                             |
| `useCountdown`       | 倒计时状态管理。                                 |
| `useCache`           | 本地缓存状态封装。                               |
| `useSKU`             | SKU 组合、禁用和选择状态处理。                   |
| `storage`            | 响应式本地存储工具。                             |
| `useAiChat`          | AI 对话状态管理，通常配合 AI 组件使用。          |
| `useAiStream`        | AI 流式输出状态管理。                            |
| `useAiConversations` | 多会话列表、置顶、删除、持久化等状态管理。       |
| `useAiVoice`         | 语音录制、转写和语音交互状态管理。               |
| `useAiPersistence`   | AI 会话持久化辅助。                              |
| `useAiRequest`       | AI 请求状态封装。                                |

## useNamespace

用于生成符合 YH-UI 约定的 BEM 类名。

```ts
import { useNamespace } from '@yh-ui/hooks'

const ns = useNamespace('button')

ns.b() // yh-button
ns.e('icon') // yh-button__icon
ns.m('primary') // yh-button--primary
ns.is('disabled', true) // is-disabled
```

## useZIndex

用于覆盖层组件分配递增层级。

```ts
import { useZIndex } from '@yh-ui/hooks'

const { nextZIndex } = useZIndex()

const zIndex = nextZIndex()
```

## useLocale

用于读取当前语言环境下的组件文案。

```ts
import { useLocale } from '@yh-ui/hooks'

const { t } = useLocale()

const emptyText = t('common.empty')
```

## useEventListener

用于在组件生命周期内安全绑定事件，并在卸载时自动清理。

```ts
import { useEventListener } from '@yh-ui/hooks'

useEventListener(window, 'resize', () => {
  // update layout
})
```

## useClickOutside

用于弹窗、下拉菜单和浮层组件的外部点击关闭。

```ts
import { ref } from 'vue'
import { useClickOutside } from '@yh-ui/hooks'

const panelRef = ref<HTMLElement>()

useClickOutside(panelRef, () => {
  // close panel
})
```

## useVirtualScroll

用于长列表渲染，只渲染可视区域内的数据。

```ts
import { useVirtualScroll } from '@yh-ui/hooks'

const { visibleItems, totalHeight, offsetY } = useVirtualScroll({
  items,
  itemHeight: 36,
  containerHeight: 360
})
```

## AI Hooks

AI hooks 更适合和 `AiChat`、`AiBubble`、`AiSender`、`AiThoughtChain` 等 AI 组件一起使用。

```ts
import { useAiChat, useAiStream } from '@yh-ui/hooks'

const chat = useAiChat({
  request: async (message) => {
    return `收到：${message}`
  }
})

const stream = useAiStream({
  request: async function* (query) {
    yield `正在处理：${query}`
  }
})
```

更多 AI 组件示例可以查看 [AI 组件文档](/ai-components/ai-chat)。

## 使用建议

- 开发 YH-UI 风格组件时优先使用 `useNamespace`、`useLocale`、`useZIndex`。
- 覆盖层组件优先配合 `useClickOutside`、`useScrollLock` 和 `useEventListener`。
- 大列表和高频更新场景优先评估 `useVirtualScroll`。
- AI 业务页面优先使用 AI hooks 管理会话、流式输出和持久化。
