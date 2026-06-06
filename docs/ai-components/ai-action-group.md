# AiActionGroup 操作组

`AiActionGroup` 是一组用于 AI 回复气泡底部的操作按钮集合，常用于消息复制、重新生成、评价等交互，提供紧凑而优雅的布局。

<script setup lang="ts">
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'
import type { ActionItem } from '@yh-ui/components'

const handleAction = (key: string) => {
  console.log('Action Clicked:', key)
}

const customItems: ActionItem[] = [
  { key: 'share', icon: 'share', label: '分享对话' },
  { key: 'edit', icon: 'edit', label: '重写内容' },
  { key: 'delete', icon: 'delete', label: '删除记录', disabled: true }
]

const tsBasic = `<${_T}>
  <div style="background: var(--yh-bg-color-overlay); padding: 12px; border-radius: 8px;">
    <YhAiActionGroup
      :items="['copy', 'regenerate', 'thumb-up', 'thumb-down']"
      @click="handleAction"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const handleAction = (key: string) => {
  console.log('Action Clicked:', key)
}
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsVertical = `<${_T}>
  <div style="display: flex; gap: 20px;">
    <YhAiActionGroup
      direction="vertical"
      :items="customItems"
      @click="handleAction"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const customItems = [
  { key: 'share', icon: 'share', label: '分享对话' },
  { key: 'edit', icon: 'edit', label: '重写内容' },
  { key: 'delete', icon: 'delete', label: '删除记录', disabled: true }
]
const handleAction = (key: string) => {
  console.log('Custom Clicked:', key)
}
</${_S}>`

const jsVertical = toJs(tsVertical)

const tsBubble = `<${_T}>
  <YhAiBubble content="这是 AI 生成的一段非常棒的回答！" direction="ltr">
    <template #footer>
      <YhAiActionGroup :items="['copy', 'thumb-up']" />
    </template>
  </YhAiBubble>
</${_T}>`

const jsBubble = toJs(tsBubble)
</script>

## 基础用法

你可以通过简单的字符串数组快速生成预设样式的操作组。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background: var(--yh-bg-color-overlay); padding: 12px; border-radius: 8px;">
    <YhAiActionGroup
      :items="['copy', 'regenerate', 'thumb-up', 'thumb-down']"
      @click="handleAction"
    />
  </div>
</DemoBlock>

## 垂直布局与自定义

支持自定义图标、标签和点击逻辑。

<DemoBlock title="垂直布局与自定义" :ts-code="tsVertical" :js-code="jsVertical">
  <div style="display: flex; gap: 20px;">
    <YhAiActionGroup
      direction="vertical"
      :items="customItems"
      @click="handleAction"
    />
  </div>
</DemoBlock>

## 结合 AiBubble 使用

将操作组放置在对话气泡底部。

<DemoBlock title="结合 AiBubble 使用" :ts-code="tsBubble" :js-code="jsBubble">
  <YhAiBubble content="这是 AI 生成的一段非常棒的回答！" direction="ltr">
    <template #footer>
      <YhAiActionGroup :items="['copy', 'thumb-up']" />
    </template>
  </YhAiBubble>
</DemoBlock>

## API

### Props

| 属性名      | 说明       | 类型                              | 默认值         |
| ----------- | ---------- | --------------------------------- | -------------- |
| `items`     | 操作项列表 | `ActionItem[]`                    | `[]`           |
| `size`      | 按钮尺寸   | `'small' \| 'default' \| 'large'` | `'small'`      |
| `direction` | 布局方向   | `'horizontal' \| 'vertical'`      | `'horizontal'` |

### ActionItem 类型

如果是字符串，支持预设：`'copy' | 'refresh' | 'regenerate' | 'share' | 'thumb-up' | 'thumb-down' | 'edit' | 'delete'`。如果是对象：

| 属性名     | 说明         | 类型      |
| ---------- | ------------ | --------- |
| `key`      | 唯一标识符   | `string`  |
| `icon`     | 图标名称     | `string`  |
| `label`    | 文字标签     | `string`  |
| `disabled` | 是否禁用     | `boolean` |
| `tooltip`  | 悬浮提示文本 | `string`  |

### Events

| 事件名  | 说明           | 回调参数                          |
| ------- | -------------- | --------------------------------- |
| `click` | 点击按钮时触发 | `(key: string, item: ActionItem)` |

### Slots

| 插槽名    | 说明                       |
| --------- | -------------------------- |
| `default` | 在操作列表后追加自定义内容 |

## 主题变量

| 变量名                     | 默认值                       |
| -------------------------- | ---------------------------- |
| `--yh-ai-action-gap`       | `8px`                        |
| `--yh-ai-action-icon-size` | `16px`                       |
| `--yh-ai-action-hover-bg`  | `var(--yh-fill-color-light)` |
