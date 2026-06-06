# AiEditorSender 面板输入

`AiEditorSender` 是一个功能更强大的 AI 对话输入组件，灵感源自 Element Plus X `EditorSender`。它集成了附件展示、工具栏及自定义插槽，适用于复杂的 AI 交互场景。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'
import type { AiCommandItem } from '@yh-ui/components'

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

const commandInput1 = ref('')
const commandInput2 = ref('')
const commandInput3 = ref('')
const commandInput4 = ref('')

const basicCommands = ref([
  { id: '1', label: '代码片段', icon: 'code', keywords: ['code', '代码'] },
  { id: '2', label: '文件上传', icon: 'upload', keywords: ['file', '上传'] },
  { id: '3', label: '图片插入', icon: 'image', keywords: ['image', '图片'] },
  { id: '4', label: '表格插入', icon: 'table', keywords: ['table', '表格'] }
])

const commandsWithDesc = ref([
  { id: '1', label: '代码片段', description: '插入代码块，支持多种语言', icon: 'code' },
  { id: '2', label: '文件上传', description: '从本地上传文件', icon: 'upload' },
  { id: '3', label: '图片插入', description: '插入图片到内容中', icon: 'image' },
  { id: '4', label: '表格插入', description: '插入 Markdown 表格', icon: 'table' }
])

const cascadeCommands = ref([
  {
    id: 'insert',
    label: '插入',
    icon: 'plus',
    children: [
      { id: 'code', label: '代码块', icon: 'code' },
      { id: 'image', label: '图片', icon: 'image' },
      { id: 'table', label: '表格', icon: 'table' },
      { id: 'link', label: '链接', icon: 'link' }
    ]
  },
  {
    id: 'format',
    label: '格式化',
    icon: 'format',
    children: [
      { id: 'bold', label: '粗体', icon: 'bold' },
      { id: 'italic', label: '斜体', icon: 'italic' },
      { id: 'heading', label: '标题', icon: 'heading' }
    ]
  },
  { id: 'clear', label: '清空内容', icon: 'delete', description: '清空当前输入框内容' }
])

const onCommandSelect = (command: AiCommandItem, parentCommand?: AiCommandItem) => {
  console.log('选中命令:', command.label, '父命令:', parentCommand?.label)
}

const onCommandCascade = (command: AiCommandItem, parentCommand: AiCommandItem) => {
  console.log('打开级联:', command.label, '来自:', parentCommand.label)
}

// 基础命令面板示例代码
const tsCommandBasic = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      placeholder="输入 / 触发命令面板..."
      @command-select="onCommandSelect"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  { id: '1', label: '代码片段', icon: 'code', keywords: ['code', '代码'] },
  { id: '2', label: '文件上传', icon: 'upload', keywords: ['file', '上传'] },
  { id: '3', label: '图片插入', icon: 'image', keywords: ['image', '图片'] },
  { id: '4', label: '表格插入', icon: 'table', keywords: ['table', '表格'] }
])

const onCommandSelect = (command: AiCommandItem) => {
  console.log('选中命令:', command.label)
}
</${_S}>`

const jsCommandBasic = toJs(tsCommandBasic)

// 带描述的命令示例代码
const tsCommandDesc = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      :show-command-description="true"
      placeholder="输入 / 搜索命令..."
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  { id: '1', label: '代码片段', description: '插入代码块，支持多种语言', icon: 'code' },
  { id: '2', label: '文件上传', description: '从本地上传文件', icon: 'upload' },
  { id: '3', label: '图片插入', description: '插入图片到内容中', icon: 'image' },
  { id: '4', label: '表格插入', description: '插入 Markdown 表格', icon: 'table' }
])
</${_S}>`

const jsCommandDesc = toJs(tsCommandDesc)

// 级联命令菜单示例代码
const tsCommandCascade = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      :enable-command-cascade="true"
      placeholder="输入 / 触发级联菜单..."
      @command-select="onCommandSelect"
      @command-cascade="onCommandCascade"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  {
    id: 'insert',
    label: '插入',
    icon: 'plus',
    children: [
      { id: 'code', label: '代码块', icon: 'code' },
      { id: 'image', label: '图片', icon: 'image' },
      { id: 'table', label: '表格', icon: 'table' },
      { id: 'link', label: '链接', icon: 'link' }
    ]
  },
  {
    id: 'format',
    label: '格式化',
    icon: 'format',
    children: [
      { id: 'bold', label: '粗体', icon: 'bold' },
      { id: 'italic', label: '斜体', icon: 'italic' },
      { id: 'heading', label: '标题', icon: 'heading' }
    ]
  },
  { id: 'clear', label: '清空内容', icon: 'delete', description: '清空当前输入框内容' }
])

const onCommandSelect = (command: AiCommandItem, parent?: AiCommandItem) => {
  console.log('选中:', command.label, '父:', parent?.label)
}

const onCommandCascade = (command: AiCommandItem, parent: AiCommandItem) => {
  console.log('打开级联:', parent.label)
}
</${_S}>`

const jsCommandCascade = toJs(tsCommandCascade)

// 自定义触发字符示例代码
const tsCommandTrigger = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      command-trigger=">"
      placeholder="输入 > 触发命令面板..."
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  { id: '1', label: '代码片段', icon: 'code', keywords: ['code', '代码'] },
  { id: '2', label: '文件上传', icon: 'upload', keywords: ['file', '上传'] },
  { id: '3', label: '图片插入', icon: 'image', keywords: ['image', '图片'] },
  { id: '4', label: '表格插入', icon: 'table', keywords: ['table', '表格'] }
])
</${_S}>`

const jsCommandTrigger = toJs(tsCommandTrigger)
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

## 命令面板 (Command Panel)

通过输入 `/` 触发命令面板，支持模糊搜索、图标、描述及级联子命令等功能。

### 基础命令面板

<DemoBlock title="基础命令面板" :ts-code="tsCommandBasic" :js-code="jsCommandBasic">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput1"
      :commands="basicCommands"
      placeholder="输入 / 触发命令面板..."
      @command-select="onCommandSelect"
    />
  </div>
</DemoBlock>

### 带描述的命令

<DemoBlock title="带描述的命令" :ts-code="tsCommandDesc" :js-code="jsCommandDesc">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput2"
      :commands="commandsWithDesc"
      :show-command-description="true"
      placeholder="输入 / 搜索命令..."
      @command-select="onCommandSelect"
    />
  </div>
</DemoBlock>

### 级联命令菜单

<DemoBlock title="级联命令菜单" :ts-code="tsCommandCascade" :js-code="jsCommandCascade">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput3"
      :commands="cascadeCommands"
      :enable-command-cascade="true"
      placeholder="输入 / 触发级联菜单..."
      @command-select="onCommandSelect"
      @command-cascade="onCommandCascade"
    />
  </div>
</DemoBlock>

### 自定义触发字符

<DemoBlock title="自定义触发字符" :ts-code="tsCommandTrigger" :js-code="jsCommandTrigger">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput4"
      :commands="basicCommands"
      command-trigger=">"
      placeholder="输入 > 触发命令面板..."
      @command-select="onCommandSelect"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性名            | 说明                    | 类型               | 默认值      |
| ----------------- | ----------------------- | ------------------ | ----------- |
| `model-value`     | 输入内容双向绑定        | `string`           | `''`        |
| `placeholder`     | 占位文本                | `string`           | `''`        |
| `disabled`        | 是否禁用                | `boolean`          | `false`     |
| `loading`         | 是否处于加载/发送中状态 | `boolean`          | `false`     |
| `attachments`     | 附件列表                | `AttachmentItem[]` | `[]`        |
| `show-word-limit` | 是否展示字数限制        | `boolean`          | `true`      |
| `max-length`      | 最大字数限制            | `number`           | `undefined` |
| `rows`            | 默认初始行数            | `number`           | `1`         |

### 命令面板 Props

| 属性名                     | 说明                     | 类型                           | 默认值     |
| -------------------------- | ------------------------ | ------------------------------ | ---------- |
| `enable-commands`          | 是否启用命令面板         | `boolean`                      | `true`     |
| `command-trigger`          | 命令触发字符             | `string`                       | `'/'`      |
| `commands`                 | 命令列表                 | `AiCommandItem[]`              | `[]`       |
| `command-panel-position`   | 命令面板位置             | `'top' \| 'bottom'`            | `'bottom'` |
| `command-panel-align`      | 命令面板对齐方式         | `'start' \| 'center' \| 'end'` | `'start'`  |
| `command-panel-width`      | 命令面板宽度             | `string \| number`             | `320`      |
| `command-panel-max-height` | 命令面板最大高度         | `number`                       | `400`      |
| `show-command-description` | 是否显示命令描述         | `boolean`                      | `true`     |
| `show-command-icon`        | 是否显示命令图标         | `boolean`                      | `true`     |
| `command-search-delay`     | 命令搜索防抖延迟（毫秒） | `number`                       | `150`      |
| `enable-command-cascade`   | 是否启用级联菜单         | `boolean`                      | `true`     |
| `cascade-offset`           | 级联面板偏移量（像素）   | `number`                       | `4`        |

### Events

| 事件名               | 说明                                   | 回调参数                                |
| -------------------- | -------------------------------------- | --------------------------------------- |
| `update:model-value` | 内容变化时触发                         | `(value: string)`                       |
| `send`               | 点击发送或按 Enter (不加 Shift) 时触发 | `(value: string)`                       |
| `change`             | 内容改变完成时触发                     | `(value: string)`                       |
| `remove-attachment`  | 点击附件移除按钮时触发                 | `(index: number, item: AttachmentItem)` |
| `clear`              | 清空内容时触发                         | `()`                                    |

### 命令面板 Events

| 事件名               | 说明                 | 回调参数                                                  |
| -------------------- | -------------------- | --------------------------------------------------------- |
| `command-select`     | 选择命令时触发       | `(command: AiCommandItem, parentCommand?: AiCommandItem)` |
| `command-search`     | 搜索命令时触发       | `(keyword: string)`                                       |
| `command-panel-show` | 命令面板显示时触发   | `()`                                                      |
| `command-panel-hide` | 命令面板隐藏时触发   | `()`                                                      |
| `command-cascade`    | 打开级联子菜单时触发 | `(command: AiCommandItem, parentCommand: AiCommandItem)`  |

### Slots

| 插槽名    | 说明                                             |
| --------- | ------------------------------------------------ |
| `header`  | 顶部附件展示区插槽                               |
| `toolbar` | 底部左侧快捷工具栏插槽                           |
| `actions` | 底部右侧追加操作插槽（在字数统计后，发送按钮前） |
| `submit`  | 自定义发送按钮                                   |

### AiCommandItem

| 属性名        | 说明                   | 类型                      | 是否必填 |
| ------------- | ---------------------- | ------------------------- | -------- |
| `id`          | 唯一标识               | `string`                  | ✅       |
| `label`       | 显示文本               | `string`                  | ✅       |
| `keywords`    | 模糊搜索关键词         | `string[]`                | ❌       |
| `icon`        | 图标名称               | `string`                  | ❌       |
| `description` | 命令描述文本           | `string`                  | ❌       |
| `disabled`    | 是否禁用该命令         | `boolean`                 | ❌       |
| `children`    | 子命令列表（级联菜单） | `AiCommandItem[]`         | ❌       |
| `level`       | 命令层级深度           | `number`                  | ❌       |
| `data`        | 自定义扩展数据         | `Record<string, unknown>` | ❌       |

### AttachmentItem

| 属性名       | 说明     | 类型                                  |
| ------------ | -------- | ------------------------------------- |
| `name`       | 文件名   | `string`                              |
| `url`        | 文件链接 | `string`                              |
| `status`     | 上传状态 | `'uploading' \| 'success' \| 'error'` |
| `percentage` | 上传进度 | `number`                              |

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4。在 Nuxt 项目中，组件会被自动按需导入。

有关详细配置，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## 主题变量

| 变量名                               | 说明         | 默认值                              |
| ------------------------------------ | ------------ | ----------------------------------- |
| `--yh-ai-editor-sender-bg`           | 面板背景色   | `var(--yh-bg-color-overlay)`        |
| `--yh-ai-editor-sender-radius`       | 圆角大小     | `12px`                              |
| `--yh-ai-editor-sender-border`       | 边框样式     | `1px solid var(--yh-border-color)`  |
| `--yh-ai-editor-sender-shadow`       | 面板阴影     | `0 4px 16px rgba(0, 0, 0, 0.08)`    |
| `--yh-ai-editor-sender-focus-border` | 聚焦边框样式 | `1px solid var(--yh-color-primary)` |
