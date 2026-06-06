---
title: AiAttachments 附件
description: AiAttachments 附件组件，用于 AI 对话场景下的文件上传与列表展示，支持拖拽、多种溢出模式与 AiFileCard 展示。
---

# AiAttachments 附件

用于展示一组附件信息集合，支持点击上传、拖拽上传与删除，可与 `AiFileCard` 搭配展示文件卡片。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// 独立变量，防止 Demo 之间互相干扰
const itemsBasic = ref([
  { uid: 1, name: '需求文档.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: '预览图.png', type: 'image', byte: 51200 },
  { uid: 3, name: '这是一份非常长的文件名用于测试溢出省略效果.xlsx', type: 'file', byte: 204800 }
])
const itemsPlaceholder = ref([...itemsBasic.value])
const itemsDelete = ref([...itemsBasic.value])
const itemsDrag = ref([...itemsBasic.value])

const commonPlaceholder = { icon: 'upload', title: '上传或拖拽文件到此处', description: '支持图片、文档等' }

// 多种状态示例：上传中、已完成、错误、图片预览
const stateItems = ref([
  { uid: 1, name: 'uploading-file.xlsx', type: 'file', byte: 102400, status: 'uploading', percent: 93 },
  { uid: 2, name: 'uploaded-file.docx', type: 'file', byte: 81920, status: 'done', description: '自定义描述' },
  { uid: 3, name: 'upload error with long name.zip', type: 'file', byte: 0, status: 'error', error: 'Server Error 500' },
  { uid: 4, name: 'preview.png', type: 'image', byte: 51200, status: 'done', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop' }
])

const tsBasic = `<${_T}>
  <yh-ai-attachments
    v-model:items="items"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const placeholder = {
  icon: 'upload',
  title: '上传或拖拽文件到此处',
  description: '支持图片、文档等'
}
const items = ref([
  { uid: 1, name: '需求文档.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: '预览图.png', type: 'image', byte: 51200 },
  { uid: 3, name: '这是一份非常长的文件名用于测试溢出省略效果.xlsx', type: 'file', byte: 204800 }
])
</${_S}>`

const tsPlaceholder = `<${_T}>
  <yh-ai-attachments
    v-model:items="items"
    :placeholder="{ icon: 'upload', title: '自定义占位', description: '仅支持 PDF' }"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { uid: 1, name: '需求文档.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: '预览图.png', type: 'image', byte: 51200 },
  { uid: 3, name: '这是一份非常长的文件名用于测试溢出省略效果.xlsx', type: 'file', byte: 204800 }
])
</${_S}>`

const tsDelete = `<${_T}>
  <yh-ai-attachments
    v-model:items="items"
    :placeholder="placeholder"
    @delete-card="onDelete"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const placeholder = {
  icon: 'upload',
  title: '上传或拖拽文件到此处',
  description: '支持图片、文档等'
}
const items = ref([
  { uid: 1, name: '需求文档.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: '预览图.png', type: 'image', byte: 51200 },
  { uid: 3, name: '这是一份非常长的文件名用于测试溢出省略效果.xlsx', type: 'file', byte: 204800 }
])
const onDelete = (_item: unknown, index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsStates = `<${_T}>
  <yh-ai-attachments v-model:items="stateItems" :placeholder="placeholder" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const placeholder = {
  icon: 'upload',
  title: '上传或拖拽文件到此处',
  description: '支持图片、文档等'
}
const stateItems = ref([
  { uid: 1, name: 'uploading-file.xlsx', type: 'file', byte: 102400, status: 'uploading', percent: 93 },
  { uid: 2, name: 'uploaded-file.docx', type: 'file', byte: 81920, status: 'done', description: '自定义描述' },
  { uid: 3, name: 'upload error with long name.zip', type: 'file', byte: 0, status: 'error', error: 'Server Error 500' },
  {
    uid: 4,
    name: 'preview.png',
    type: 'image',
    byte: 51200,
    status: 'done',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
  }
])
</${_S}>`

const scrollItemsStr = `[
  { uid: 1, name: '需求文档.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: '预览图.png', type: 'image', byte: 51200 },
  { uid: 3, name: '表格数据.xlsx', type: 'file', byte: 51200 },
  { uid: 4, name: '演示文稿.pptx', type: 'file', byte: 307200 },
  { uid: 5, name: '说明文档.docx', type: 'file', byte: 81920 },
  { uid: 6, name: '压缩包.zip', type: 'file', byte: 1024000 }
]`

const tsScrollX = `<${_T}>
  <yh-ai-attachments
    v-model:items="manyItems"
    overflow="scrollX"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const placeholder = {
  icon: 'upload',
  title: '上传或拖拽文件到此处',
  description: '支持图片、文档等'
}
const manyItems = ref(${scrollItemsStr})
</${_S}>`

const tsScrollY = `<${_T}>
  <yh-ai-attachments
    v-model:items="manyItems"
    overflow="scrollY"
    scroll-max-height="260px"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const placeholder = {
  icon: 'upload',
  title: '上传或拖拽文件到此处',
  description: '支持图片、文档等'
}
const manyItems = ref(${scrollItemsStr})
</${_S}>`

const tsWrap = `<${_T}>
  <yh-ai-attachments
    v-model:items="manyItems"
    overflow="wrap"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const placeholder = {
  icon: 'upload',
  title: '上传或拖拽文件到此处',
  description: '支持图片、文档等'
}
const manyItems = ref(${scrollItemsStr})
</${_S}>`

const baseMany = [
  { uid: 1, name: '需求文档.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: '预览图.png', type: 'image', byte: 51200 },
  { uid: 3, name: '表格数据.xlsx', type: 'file', byte: 51200 },
  { uid: 4, name: '演示文稿.pptx', type: 'file', byte: 307200 },
  { uid: 5, name: '说明文档.docx', type: 'file', byte: 81920 },
  { uid: 6, name: '压缩包.zip', type: 'file', byte: 1024000 }
]
const manyItemsScrollX = ref(baseMany.map((item, i) => ({ ...item, uid: 10 + i })))
const manyItemsScrollY = ref(baseMany.map((item, i) => ({ ...item, uid: 20 + i })))
const manyItemsWrap = ref(baseMany.map((item, i) => ({ ...item, uid: 30 + i })))

const jsBasic = toJs(tsBasic)
const jsPlaceholder = toJs(tsPlaceholder)
const jsDelete = toJs(tsDelete)
const jsStates = toJs(tsStates)
const jsScrollX = toJs(tsScrollX)
const jsScrollY = toJs(tsScrollY)
const jsWrap = toJs(tsWrap)

// 上传功能示例
const uploadBasicItems = ref<Array<{ uid: number; name: string; type: string; byte?: number; status?: string; percent?: number }>>([])
const uploadCustomItems = ref<Array<{ uid: number; name: string; type: string; byte?: number; status?: string; percent?: number }>>([])
const uploadEventsItems = ref<Array<{ uid: number; name: string; type: string; byte?: number; status?: string; percent?: number }>>([])

const validateFile = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) return false
  return true
}

const handleUpload = async ({ file }: { file: File }) => {
  await new Promise(r => setTimeout(r, 800))
  uploadBasicItems.value.push({ uid: Date.now(), name: file.name, type: 'file', byte: file.size, status: 'done' })
}

const customUpload = async ({ file }: { file: File }) => {
  await new Promise(r => setTimeout(r, 600))
  uploadCustomItems.value.push({ uid: Date.now(), name: file.name, type: 'file', byte: file.size, status: 'done' })
}

const onUploadChange = (_file: File, _fileList: unknown[]) => {}
const onUploadSuccess = (_response: unknown) => {}
const onUploadError = (_error: unknown) => {}
const onDeleteItem = (_item: unknown, index: number) => {
  uploadEventsItems.value.splice(index, 1)
}

// 事件监听示例需要 httpRequest 才能完成上传流程
const eventsUploadRequest = async ({ file }: { file: File }) => {
  await new Promise(r => setTimeout(r, 600))
  uploadEventsItems.value.push({ uid: Date.now(), name: file.name, type: 'file', byte: file.size, status: 'done' })
}

const tsBasicUpload = `<template>
  <yh-ai-attachments
    v-model:items="items"
    :http-request="handleUpload"
    :before-upload="validateFile"
    placeholder="点击或拖拽上传文件"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AttachmentItem } from '@yh-ui/components'

const items = ref<AttachmentItem[]>([])

// 上传前校验（返回 false 可取消本次上传）
const validateFile = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    alert('文件大小不能超过 10MB')
    return false
  }
  return true
}

// 自定义上传函数
const handleUpload = async ({ file }: { file: File }) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!response.ok) throw new Error('上传失败')
  return response.json()
}
<\/script>`

const tsCustomUpload = `<template>
  <yh-ai-attachments
    v-model:items="items"
    :http-request="customUpload"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AttachmentItem } from '@yh-ui/components'

const items = ref<AttachmentItem[]>([])

// 自定义上传逻辑
const customUpload = async ({ file }: { file: File }) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('category', 'documents')
  await fetch('/your/upload/api', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer your-token' },
    body: formData
  })
  // 组件会根据 Promise 是否成功来自动更新文件状态
}
<\/script>`

const tsEventsUpload = `<template>
  <yh-ai-attachments
    v-model:items="items"
    @upload-change="onUploadChange"
    @upload-success="onUploadSuccess"
    @upload-error="onUploadError"
    @delete-card="onDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AttachmentItem } from '@yh-ui/components'

const items = ref<AttachmentItem[]>([])

const onUploadChange = (file: File, fileList: AttachmentItem[]) => {
  console.log('文件选择变化:', file.name, fileList.length)
}
const onUploadSuccess = (response: unknown, file: File, fileList: AttachmentItem[]) => {
  console.log('上传成功:', response)
}
const onUploadError = (error: unknown, file: File, fileList: AttachmentItem[]) => {
  console.log('上传失败:', error)
}
const onDelete = (item: AttachmentItem, index: number) => {
  // 可在此处调用后端删除接口
  items.value.splice(index, 1)
}
<\/script>`

const jsBasicUpload = toJs(tsBasicUpload)
const jsCustomUpload = toJs(tsCustomUpload)
const jsEventsUpload = toJs(tsEventsUpload)
</script>

## 何时使用

当需要展示一组附件信息（如上传中、已上传、失败状态）并支持增删时使用，常见于 AI 输入区、表单附件等场景。

## 基础用法

通过 `v-model:items` 绑定附件列表，支持点击上传与删除。列表采用遍历方式渲染，超过 2 个时逐项展示；删除需在 `@delete-card` 中从 `items` 移除对应项（如 `items.value.splice(index, 1)`）以生效。图标与文案采用紧凑统一风格；标题过长时自动省略，悬停可查看完整名称。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="itemsBasic"
      :placeholder="commonPlaceholder"
    />
  </div>
</DemoBlock>

## 占位信息

通过 `placeholder` 配置上传区域的图标、标题与描述（支持对象、函数或字符串简写）。

<DemoBlock title="占位信息" :ts-code="tsPlaceholder" :js-code="jsPlaceholder">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="itemsPlaceholder"
      :placeholder="{ icon: 'upload', title: '自定义占位', description: '仅支持 PDF' }"
    />
  </div>
</DemoBlock>

## 拖拽上传

将文件拖拽到上传区域即可上传，可通过 `getDropContainer` 指定拖拽生效的容器（默认组件根节点）。

<DemoBlock title="拖拽上传" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="itemsDrag"
      :placeholder="commonPlaceholder"
    />
  </div>
</DemoBlock>

## 删除

每张卡片悬停时显示删除按钮，点击触发 `delete-card` 事件。删除功能需在回调中从列表移除该项（如 `onDelete(_, index) { items.value.splice(index, 1) }`）方可生效；也可在回调内做二次确认或同步后端。

<DemoBlock title="删除" :ts-code="tsDelete" :js-code="jsDelete">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="itemsDelete"
      :placeholder="commonPlaceholder"
      @delete-card="(_, index) => itemsDelete.splice(index, 1)"
    />
  </div>
</DemoBlock>

## 多种状态示例

附件项支持 `status`：`uploading`（显示进度条）、`done`（已完成）、`error`（红框 + 错误文案）。可通过 `percent`、`error`、`description` 展示进度与说明。

<DemoBlock title="多种状态" :ts-code="tsStates" :js-code="jsStates">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="stateItems" :placeholder="commonPlaceholder" />
  </div>
</DemoBlock>

## 溢出模式

通过 `overflow` 控制列表布局：`scrollX`（横向滚动）、`scrollY`（纵向滚动）、`wrap`（换行）。下面用固定宽高容器分别展示三种溢出效果。

<DemoBlock title="横向滚动 scrollX" :ts-code="tsScrollX" :js-code="jsScrollX">
  <div style="max-width: 420px; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="manyItemsScrollX"
      overflow="scrollX"
      :placeholder="commonPlaceholder"
    />
  </div>
</DemoBlock>

<DemoBlock title="纵向滚动 scrollY" :ts-code="tsScrollY" :js-code="jsScrollY">
  <div style="max-width: 420px; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="manyItemsScrollY"
      overflow="scrollY"
      scroll-max-height="260px"
      :placeholder="commonPlaceholder"
    />
  </div>
</DemoBlock>

<DemoBlock title="换行 wrap" :ts-code="tsWrap" :js-code="jsWrap">
  <div style="max-width: 420px; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="manyItemsWrap"
      overflow="wrap"
      :placeholder="commonPlaceholder"
    />
  </div>
</DemoBlock>

## 上传功能

### 基础使用

组件内置了完整的上传流程，点击上传按钮或拖拽文件到上传区域即可触发上传。组件会自动：

1. 创建文件列表项（状态为 `uploading`）
2. 触发 `upload-change` 事件
3. 调用自定义上传函数 `httpRequest`（如有）
4. 上传成功后更新状态为 `done`，触发 `upload-success`
5. 上传失败后更新状态为 `error`，触发 `upload-error`

<DemoBlock title="基础使用" :ts-code="tsBasicUpload" :js-code="jsBasicUpload">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="uploadBasicItems"
      :http-request="handleUpload"
      :before-upload="validateFile"
      placeholder="点击或拖拽上传文件"
    />
  </div>
</DemoBlock>

### 自定义上传

通过 `httpRequest` prop 完全自定义上传逻辑（如自定义请求头、URL、FormData 处理等）。函数接收 `{ file: File }` 参数，需返回 Promise。

<DemoBlock title="自定义上传" :ts-code="tsCustomUpload" :js-code="jsCustomUpload">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="uploadCustomItems"
      :http-request="customUpload"
      placeholder="点击或拖拽上传文件"
    />
  </div>
</DemoBlock>

### 通过事件监听上传状态

<DemoBlock title="事件监听" :ts-code="tsEventsUpload" :js-code="jsEventsUpload">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="uploadEventsItems"
      :http-request="eventsUploadRequest"
      @upload-change="onUploadChange"
      @upload-success="onUploadSuccess"
      @upload-error="onUploadError"
      @delete-card="onDeleteItem"
      placeholder="点击或拖拽上传文件"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性             | 说明                                         | 类型                                                       | 默认值      |
| ---------------- | -------------------------------------------- | ---------------------------------------------------------- | ----------- |
| items            | 附件列表                                     | `AttachmentItem[]`                                         | `[]`        |
| overflow         | 溢出模式                                     | `'wrap' \| 'scrollX' \| 'scrollY'`                         | `'scrollX'` |
| scrollMaxHeight  | scrollY 时容器最大高度（如 `260px`）         | `string`                                                   | -           |
| hideUpload       | 是否隐藏上传按钮                             | `boolean`                                                  | `false`     |
| disabled         | 是否禁用                                     | `boolean`                                                  | `false`     |
| maxCount         | 最大文件数量                                 | `number`                                                   | -           |
| limit            | 文件数量限制（与 maxCount 作用相同）         | `number`                                                   | -           |
| placeholder      | 占位内容（支持对象、函数或字符串简写）       | `PlaceholderType \| ((mode) => PlaceholderType) \| string` | -           |
| getDropContainer | 返回拖拽生效的容器元素，不传则使用组件根节点 | `() => HTMLElement`                                        | -           |
| beforeUpload     | 上传前校验函数，返回 `false` 可取消本次上传  | `(file: File) => boolean \| Promise<boolean>`              | -           |
| httpRequest      | 自定义上传请求函数                           | `(options: { file: File }) => Promise<void>`               | -           |
| uploadIconSize   | 上传按钮图标尺寸                             | `string`                                                   | `'24px'`    |
| dragTarget       | 拖拽目标元素                                 | `string \| HTMLElement`                                    | -           |
| listStyle        | 列表容器样式                                 | `Record<string, string>`                                   | `{}`        |
| themeOverrides   | 主题覆盖变量                                 | `Record<string, unknown>`                                  | -           |

### AttachmentItem 额外属性

除 FileCardListItem 的属性外，附件项还支持以下属性：

| 属性     | 说明                 | 类型                                            | 默认值 |
| -------- | -------------------- | ----------------------------------------------- | ------ |
| status   | 文件状态             | `'uploading' \| 'done' \| 'error' \| 'removed'` | -      |
| percent  | 上传进度（0-100）    | `number`                                        | -      |
| response | 上传成功后的响应数据 | `unknown`                                       | -      |
| error    | 错误信息             | `string`                                        | -      |

### Events

| 事件名         | 说明                   | 参数                                                          |
| -------------- | ---------------------- | ------------------------------------------------------------- |
| update:items   | 列表更新时触发         | `(items: AttachmentItem[])`                                   |
| upload-change  | 文件选择/拖拽后触发    | `(file: File, fileList: AttachmentItem[])`                    |
| upload-success | 上传成功后触发         | `(response: unknown, file: File, fileList: AttachmentItem[])` |
| upload-error   | 上传失败后触发         | `(error: unknown, file: File, fileList: AttachmentItem[])`    |
| upload-drop    | 拖拽释放时触发         | `(files: File[])`                                             |
| delete-card    | 删除某一项时触发       | `(item: AttachmentItem, index: number)`                       |
| exceed         | 超出文件数量限制时触发 | `({ files, maxCount })`                                       |

### Slots

| 插槽名        | 说明                                                                  |
| ------------- | --------------------------------------------------------------------- |
| default       | 整个组件容器内容                                                      |
| file-item     | 自定义文件卡片项内容，参数: `{ item: AttachmentItem, index: number }` |
| upload-button | 自定义上传按钮内容，参数: `{ canUpload: boolean }`                    |
| drop-area     | 自定义拖拽区域内容                                                    |
