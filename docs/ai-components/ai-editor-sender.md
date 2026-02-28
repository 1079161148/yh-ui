# AiEditorSender 面板输入

`AiEditorSender` 是一个功能更强大的 AI 对话输入组件，灵感源自 Element Plus X `EditorSender`。它集成了附件展示、工具栏及自定义插槽，适用于复杂的 AI 交互场景。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const loading = ref(false)
const modelValue = ref('gpt4')

const onSend = (val: string) => {
  console.log('Send Message:', val)
  if (val && val.includes('loading')) {
    loading.value = true
    setTimeout(() => { loading.value = false }, 2000)
  }
}

const files = ref([
  { name: '代码片段.ts', type: 'document' },
  { name: '界面原型.png', type: 'image', url: '...' }
])

const onRemoveAttachment = (index: number) => {
  files.value.splice(index, 1)
}

const tsBasic = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender v-model="input" placeholder="问问我关于代码的问题..." @send="onSend" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const onSend = (val: string) => { console.log('Send:', val) }
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsFiles = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :attachments="files"
      @remove-attachment="onRemove"
      @send="onSend"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const files = ref([
  { name: '代码片段.ts', type: 'document' },
  { name: '界面原型.png', type: 'image', url: '...' }
])
const onRemove = (index: number) => { files.value.splice(index, 1) }
const onSend = (val: string) => { console.log('Send:', val) }
</${_S}>`

const jsFiles = toJs(tsFiles)

const tsStatus = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :loading="loading"
      placeholder="输入内容并选择模型..."
      @send="onSend"
    >
      <template #toolbar>
        <YhButton circle size="small"><YhIcon name="image" /></YhButton>
        <YhButton circle size="small"><YhIcon name="document" /></YhButton>
      </template>
      <template #actions>
        <YhSelect v-model="model" size="small" style="width: 120px;">
          <YhOption label="GPT-4o" value="gpt4" />
          <YhOption label="Claude 3.5" value="claude" />
        </YhSelect>
      </template>
    </yh-ai-editor-sender>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const loading = ref(false)
const model = ref('gpt4')
const onSend = (val: string) => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}
</${_S}>`

const jsStatus = toJs(tsStatus)
</script>

## 基础用法

包含默认的输入框、字数统计及发送按钮。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender v-model="input1" placeholder="问问我关于代码的问题..." @send="onSend" />
  </div>
</DemoBlock>

## 附件展示与操作

内置附件列表布局（仅展示用，上传逻辑需外部控制），支持预览和移除。

<DemoBlock title="附件展示与操作" :ts-code="tsFiles" :js-code="jsFiles">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input2"
      :attachments="files"
      @remove-attachment="onRemoveAttachment"
      @send="onSend"
    />
  </div>
</DemoBlock>

## 状态与工具栏插槽

通过 `toolbar` 和 `actions` 插槽，你可以自由扩展输入框底部的业务逻辑。

<DemoBlock title="状态与工具栏插槽" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input3"
      :loading="loading"
      placeholder="输入内容并选择模型..."
      @send="onSend"
    >
      <template #toolbar>
        <YhButton circle size="small"><YhIcon name="image" /></YhButton>
        <YhButton circle size="small"><YhIcon name="document" /></YhButton>
      </template>
      <template #actions>
        <YhSelect v-model="modelValue" size="small" style="width: 120px; vertical-align: middle;">
          <YhOption label="GPT-4o" value="gpt4" />
          <YhOption label="Claude 3.5" value="claude" />
        </YhSelect>
      </template>
    </yh-ai-editor-sender>
  </div>
</DemoBlock>

## API

### Props

| 属性名          | 说明                    | 类型               | 默认值      |
| --------------- | ----------------------- | ------------------ | ----------- |
| `modelValue`    | 输入内容双向绑定        | `string`           | `''`        |
| `placeholder`   | 占位文本                | `string`           | `''`        |
| `disabled`      | 是否禁用                | `boolean`          | `false`     |
| `loading`       | 是否处于加载/发送中状态 | `boolean`          | `false`     |
| `attachments`   | 附件列表                | `AttachmentItem[]` | `[]`        |
| `showWordLimit` | 是否展示字数限制        | `boolean`          | `true`      |
| `maxLength`     | 最大字数限制            | `number`           | `undefined` |
| `rows`          | 默认初始行数            | `number`           | `1`         |

### Events

| 事件名              | 说明                                   | 回调参数                                |
| ------------------- | -------------------------------------- | --------------------------------------- |
| `update:modelValue` | 内容变化时触发                         | `(value: string)`                       |
| `send`              | 点击发送或按 Enter (不加 Shift) 时触发 | `(value: string)`                       |
| `change`            | 内容改变完成时触发                     | `(value: string)`                       |
| `remove-attachment` | 点击附件移除按钮时触发                 | `(index: number, item: AttachmentItem)` |
| `clear`             | 清空内容时触发                         | `()`                                    |

### Slots

| 插槽名    | 说明                                            |
| --------- | ----------------------------------------------- |
| `header`  | 顶部附件展示区插槽                              |
| `toolbar` | 底部左侧快捷工具栏插槽                          |
| `actions` | 底部右侧追加操作插槽 (在字数统计后，发送按钮前) |
| `submit`  | 自定义发送按钮                                  |

## 主题变量

| 变量名                               | 默认值                              |
| ------------------------------------ | ----------------------------------- |
| `--yh-ai-editor-sender-bg`           | `var(--yh-bg-color-overlay)`        |
| `--yh-ai-editor-sender-radius`       | `12px`                              |
| `--yh-ai-editor-sender-border`       | `1px solid var(--yh-border-color)`  |
| `--yh-ai-editor-sender-shadow`       | `0 4px 16px rgba(0, 0, 0, 0.08)`    |
| `--yh-ai-editor-sender-focus-border` | `1px solid var(--yh-color-primary)` |
