# AiWelcome 欢迎页面

`AiWelcome` 是一个用于 AI 聊天对话起始页面的组件，通过精美的渐变色和玻璃拟态设计，为用户提供友好的第一印象和交互引导。

## 基础用法

展示 Logo、标题及建议的 Prompt 列表。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const suggestions = [
  { icon: 'edit', title: '写一段代码', description: '帮我用 Vue 3 写一个计算器组件', prompt: '用 Vue 3 写一个计算器组件' },
  { icon: 'chat', title: '周报翻译', description: '将这段中文周报内容翻译成地道的英文', prompt: '翻译这段周报：...' },
  { icon: 'sparkles', title: '创意写作', description: '写一篇关于未来城市的科幻短篇', prompt: '写一篇关于未来城市的科幻短篇' }
]

interface AiSuggestion {
  icon?: string
  title: string
  description?: string
  prompt?: string
}

const handleSelect = (item: AiSuggestion) => {
  console.log('Selected:', item.prompt)
}

const tsBasic = `<${_T}>
  <div style="padding: 40px 0; background: var(--yh-bg-color-page); border-radius: 8px;">
    <YhAiWelcome 
      title="你好，我是 YH AI"
      description="我可以帮你写代码、翻译文档或进行创意写作。今天我能为你做点什么？"
      :suggestions="suggestions"
      @select="handleSelect"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const suggestions = [
  { icon: 'edit', title: '写一段代码', description: '帮我用 Vue 3 写一个计算器组件', prompt: '用 Vue 3 写一个计算器组件' },
  { icon: 'chat', title: '周报翻译', description: '将这段中文周报内容翻译成地道的英文', prompt: '翻译这段周报：...' },
  { icon: 'sparkles', title: '创意写作', description: '写一篇关于未来城市的科幻短篇', prompt: '写一篇关于未来城市的科幻短篇' }
]

const handleSelect = (item: AiSuggestion) => {
  console.log('Selected:', item.prompt)
}
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsSlot = `<${_T}>
  <YhAiWelcome icon="chat">
    <template #title>
      <span style="background: linear-gradient(90deg, #ff4d4f, #f759ab); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        限定体验版 AI
      </span>
    </template>
    <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center;">
      <YhTag effect="dark" type="warning">GPT-4o</YhTag>
      <YhTag effect="dark" type="info">8k Context</YhTag>
    </div>
  </YhAiWelcome>
</${_T}>`

const jsSlot = toJs(tsSlot)

</script>

## 基础用法

展示 Logo、标题及建议的 Prompt 列表。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 40px 0; background: var(--yh-bg-color-page); border-radius: 8px;">
    <YhAiWelcome 
      title="你好，我是 YH AI"
      description="我可以帮你写代码、翻译文档或进行创意写作。今天我能为你做点什么？"
      :suggestions="suggestions"
      @select="handleSelect"
    />
  </div>
</DemoBlock>

## 自定义图标与 Slot

你可以自定义 Logo 图标或通过插槽完全自定义头部内容。

<DemoBlock title="自定义图标与 Slot" :ts-code="tsSlot" :js-code="jsSlot">
  <YhAiWelcome icon="chat">
    <template #title>
      <span style="background: linear-gradient(90deg, #ff4d4f, #f759ab); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        限定体验版 AI
      </span>
    </template>
    <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center;">
      <YhTag effect="dark" type="warning">GPT-4o</YhTag>
      <YhTag effect="dark" type="info">8k Context</YhTag>
    </div>
  </YhAiWelcome>
</DemoBlock>

## API

### Props

| 属性名        | 说明         | 类型             | 默认值       |
| ------------- | ------------ | ---------------- | ------------ |
| `title`       | 标题文本     | `string`         | `''`         |
| `description` | 描述文本     | `string`         | `''`         |
| `suggestions` | 建议项列表   | `AiSuggestion[]` | `[]`         |
| `showIcon`    | 是否展示图标 | `boolean`        | `true`       |
| `icon`        | 图标名称     | `string`         | `'sparkles'` |

### AiSuggestion Item

| 属性名        | 说明                 | 类型     |
| ------------- | -------------------- | -------- |
| `icon`        | 图标名称             | `string` |
| `title`       | 建议项标题           | `string` |
| `description` | 详细描述             | `string` |
| `prompt`      | 点击后传递的指令文本 | `string` |

### Events

| 事件名   | 说明                   | 回调参数               |
| -------- | ---------------------- | ---------------------- |
| `select` | 点击建议列表卡片时触发 | `(item: AiSuggestion)` |

### Slots

| 插槽名        | 说明           |
| ------------- | -------------- |
| `default`     | 底部自定义内容 |
| `icon`        | 自定义 Logo    |
| `title`       | 自定义标题     |
| `description` | 自定义描述     |

## 主题变量

| 变量名                             | 默认值                                                              |
| ---------------------------------- | ------------------------------------------------------------------- |
| `--yh-ai-welcome-padding`          | `var(--yh-spacing-xl)`                                              |
| `--yh-ai-welcome-max-width`        | `800px`                                                             |
| `--yh-ai-welcome-primary-gradient` | `linear-gradient(135deg, var(--yh-color-primary) 0%, #a855f7 100%)` |
| `--yh-ai-welcome-card-bg`          | `var(--yh-bg-color-overlay)`                                        |
