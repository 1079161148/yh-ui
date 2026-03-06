---
title: AiAttachments
description: AiAttachments component for file upload and list display in AI chat, with drag-and-drop, overflow modes, and AiFileCard display.
---

# AiAttachments

Used to display a set of attachment information. Supports click upload, drag-and-drop upload, and delete; works with `AiFileCard` for file cards.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// Independent variables to prevent cross-demo interference and CN/EN conflicts
const enItemsBasic = ref([
  { uid: 1, name: 'document.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: 'preview.png', type: 'image', byte: 51200 },
  { uid: 3, name: 'very-long-filename-for-overflow-test.xlsx', type: 'file', byte: 204800 }
])
const enItemsPlaceholder = ref([...enItemsBasic.value])
const enItemsDelete = ref([...enItemsBasic.value])
const enItemsDrag = ref([...enItemsBasic.value])

const commonPlaceholderEn = { icon: 'upload', title: 'Upload or drag files here', description: 'Supports images, documents, etc.' }

const stateItemsEn = ref([
  { uid: 1, name: 'uploading-file.xlsx', type: 'file', byte: 102400, status: 'uploading', percent: 93 },
  { uid: 2, name: 'uploaded-file.docx', type: 'file', byte: 81920, status: 'done', description: 'Custom description' },
  { uid: 3, name: 'upload error with long name.zip', type: 'file', byte: 0, status: 'error', error: 'Server Error 500' },
  { uid: 4, name: 'preview.png', type: 'image', byte: 51200, status: 'done', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop' }
])

const baseMany = [
  { uid: 1, name: 'document.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: 'preview.png', type: 'image', byte: 51200 },
  { uid: 3, name: 'table.xlsx', type: 'file', byte: 51200 },
  { uid: 4, name: 'slides.pptx', type: 'file', byte: 307200 },
  { uid: 5, name: 'doc.docx', type: 'file', byte: 81920 },
  { uid: 6, name: 'archive.zip', type: 'file', byte: 1024000 }
]
const manyItemsScrollX = ref(baseMany.map((item, i) => ({ ...item, uid: 10 + i })))
const manyItemsScrollY = ref(baseMany.map((item, i) => ({ ...item, uid: 20 + i })))
const manyItemsWrap = ref(baseMany.map((item, i) => ({ ...item, uid: 30 + i })))

const tsBasic = `<${_T}>
  <yh-ai-attachments
    v-model:items="items"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
const placeholder = {
  icon: 'upload',
  title: 'Upload or drag files here',
  description: 'Supports images, documents, etc.'
}
const items = ref([
  { uid: 1, name: 'document.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: 'preview.png', type: 'image', byte: 51200 },
  { uid: 3, name: 'very-long-filename-for-overflow-test.xlsx', type: 'file', byte: 204800 }
])
</${_S}>`

const tsPlaceholder = `<${_T}>
  <yh-ai-attachments
    v-model:items="items"
    :placeholder="{ icon: 'upload', title: 'Custom placeholder', description: 'PDF only' }"
  />
</${_T}>

<${_S} setup lang="ts">
const items = ref([
  { uid: 1, name: 'document.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: 'preview.png', type: 'image', byte: 51200 },
  { uid: 3, name: 'very-long-filename-for-overflow-test.xlsx', type: 'file', byte: 204800 }
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
const placeholder = {
  icon: 'upload',
  title: 'Upload or drag files here',
  description: 'Supports images, documents, etc.'
}
const items = ref([
  { uid: 1, name: 'document.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: 'preview.png', type: 'image', byte: 51200 },
  { uid: 3, name: 'very-long-filename-for-overflow-test.xlsx', type: 'file', byte: 204800 }
])
const onDelete = (_item: unknown, index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsStates = `<${_T}>
  <yh-ai-attachments v-model:items="stateItems" :placeholder="placeholder" />
</${_T}>

<${_S} setup lang="ts">
const placeholder = {
  icon: 'upload',
  title: 'Upload or drag files here',
  description: 'Supports images, documents, etc.'
}
const stateItems = ref([
  { uid: 1, name: 'uploading-file.xlsx', type: 'file', byte: 102400, status: 'uploading', percent: 93 },
  { uid: 2, name: 'uploaded-file.docx', type: 'file', byte: 81920, status: 'done', description: 'Custom description' },
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

const scrollItemsStrEn = `[
  { uid: 1, name: 'document.pdf', type: 'file', byte: 102400 },
  { uid: 2, name: 'preview.png', type: 'image', byte: 51200 },
  { uid: 3, name: 'table.xlsx', type: 'file', byte: 51200 },
  { uid: 4, name: 'slides.pptx', type: 'file', byte: 307200 },
  { uid: 5, name: 'doc.docx', type: 'file', byte: 81920 },
  { uid: 6, name: 'archive.zip', type: 'file', byte: 1024000 }
]`

const tsScrollX = `<${_T}>
  <yh-ai-attachments
    v-model:items="manyItemsScrollX"
    overflow="scrollX"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
const placeholder = {
  icon: 'upload',
  title: 'Upload or drag files here',
  description: 'Supports images, documents, etc.'
}
const manyItemsScrollX = ref(${scrollItemsStrEn})
</${_S}>`

const tsScrollY = `<${_T}>
  <yh-ai-attachments
    v-model:items="manyItemsScrollY"
    overflow="scrollY"
    scroll-max-height="260px"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
const placeholder = {
  icon: 'upload',
  title: 'Upload or drag files here',
  description: 'Supports images, documents, etc.'
}
const manyItemsScrollY = ref(${scrollItemsStrEn})
</${_S}>`

const tsWrap = `<${_T}>
  <yh-ai-attachments
    v-model:items="manyItemsWrap"
    overflow="wrap"
    :placeholder="placeholder"
  />
</${_T}>

<${_S} setup lang="ts">
const placeholder = {
  icon: 'upload',
  title: 'Upload or drag files here',
  description: 'Supports images, documents, etc.'
}
const manyItemsWrap = ref(${scrollItemsStrEn})
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsPlaceholder = toJs(tsPlaceholder)
const jsDelete = toJs(tsDelete)
const jsStates = toJs(tsStates)
const jsScrollX = toJs(tsScrollX)
const jsScrollY = toJs(tsScrollY)
const jsWrap = toJs(tsWrap)

// Upload demos
// Upload demos
const uploadBasicItemsEn = ref<Array<{ uid: number; name: string; type: string; byte?: number; status?: string; percent?: number }>>([])
const uploadCustomItemsEn = ref<Array<{ uid: number; name: string; type: string; byte?: number; status?: string; percent?: number }>>([])
const uploadEventsItemsEn = ref<Array<{ uid: number; name: string; type: string; byte?: number; status?: string; percent?: number }>>([])

const validateFile = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) return false
  return true
}

const handleUploadEn = async ({ file }: { file: File }) => {
  await new Promise(r => setTimeout(r, 800))
  uploadBasicItemsEn.value.push({ uid: Date.now(), name: file.name, type: 'file', byte: file.size, status: 'done' })
}

const customUploadEn = async ({ file }: { file: File }) => {
  await new Promise(r => setTimeout(r, 600))
  uploadCustomItemsEn.value.push({ uid: Date.now(), name: file.name, type: 'file', byte: file.size, status: 'done' })
}

const onUploadChange = (_file: File, _fileList: unknown[]) => {}
const onUploadSuccess = (_response: unknown) => {}
const onUploadError = (_error: unknown) => {}
const onDeleteItemEn = (_item: unknown, index: number) => {
  uploadEventsItemsEn.value.splice(index, 1)
}

// Events demo needs httpRequest for upload to complete
const eventsUploadRequestEn = async ({ file }: { file: File }) => {
  await new Promise(r => setTimeout(r, 600))
  uploadEventsItemsEn.value.push({ uid: Date.now(), name: file.name, type: 'file', byte: file.size, status: 'done' })
}

const tsBasicUpload = `<template>
  <yh-ai-attachments
    v-model:items="items"
    :http-request="handleUpload"
    :before-upload="validateFile"
    placeholder="Click or drag files to upload"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AttachmentItem } from '@yh-ui/components'

const items = ref<AttachmentItem[]>([])

// Validate before upload (return false to cancel)
const validateFile = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    alert('File size cannot exceed 10MB')
    return false
  }
  return true
}

// Custom upload function
const handleUpload = async ({ file }: { file: File }) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!response.ok) throw new Error('Upload failed')
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

// Custom upload logic
const customUpload = async ({ file }: { file: File }) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('category', 'documents')
  await fetch('/your/upload/api', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer your-token' },
    body: formData
  })
  // Component will automatically update file status based on Promise success/failure
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
  console.log('File selected:', file.name, fileList.length)
}
const onUploadSuccess = (response: unknown, file: File, fileList: AttachmentItem[]) => {
  console.log('Upload success:', response)
}
const onUploadError = (error: unknown, file: File, fileList: AttachmentItem[]) => {
  console.log('Upload failed:', error)
}
const onDelete = (item: AttachmentItem, index: number) => {
  // Call server delete API here if needed
  items.value.splice(index, 1)
}
<\/script>`

const jsBasicUpload = toJs(tsBasicUpload)
const jsCustomUpload = toJs(tsCustomUpload)
const jsEventsUpload = toJs(tsEventsUpload)
</script>

## When to use

Use when you need to display a set of attachments (e.g. uploading, uploaded, failed) with add/remove support, such as in AI input areas or form attachments.

## Basic usage

Bind the attachment list with `v-model:items`; click to upload and delete. The list is rendered by traversal; for 3+ items each is shown as a card. For delete to work, remove the item in `@delete-card` (e.g. `items.value.splice(index, 1)`). Long names are truncated with ellipsis; hover to see full name.

<DemoBlock title="Basic usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="enItemsBasic" :placeholder="commonPlaceholderEn" />
  </div>
</DemoBlock>

## Placeholder

Configure the upload area with `placeholder` (icon, title, description). Supports object, function, or string shorthand.

<DemoBlock title="Placeholder" :ts-code="tsPlaceholder" :js-code="jsPlaceholder">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="enItemsPlaceholder"
      :placeholder="{ icon: 'upload', title: 'Custom placeholder', description: 'PDF only' }"
    />
  </div>
</DemoBlock>

## Drag and drop

Drop files onto the upload area to upload. Use `getDropContainer` to set the drop container (default is the component root).

<DemoBlock title="Drag and drop" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="enItemsDrag" :placeholder="commonPlaceholderEn" />
  </div>
</DemoBlock>

## Delete

Each card shows a delete button on hover; `delete-card` is emitted on click. For delete to take effect, remove the item in the callback (e.g. `onDelete(_, index) { items.value.splice(index, 1) }`); you can also use the callback for confirmation or server sync.

<DemoBlock title="Delete" :ts-code="tsDelete" :js-code="jsDelete">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="enItemsDelete"
      :placeholder="commonPlaceholderEn"
      @delete-card="(_, index) => enItemsDelete.splice(index, 1)"
    />
  </div>
</DemoBlock>

## Multiple states

Items support `status`: `uploading` (progress bar), `done`, `error` (red border + error text). Use `percent`, `error`, `description` for progress and messages.

<DemoBlock title="Multiple states" :ts-code="tsStates" :js-code="jsStates">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="stateItemsEn" :placeholder="commonPlaceholderEn" />
  </div>
</DemoBlock>

## Overflow mode

Use `overflow` to control layout: `scrollX`, `scrollY`, or `wrap`. Demos below use constrained width/height to show the effect.

<DemoBlock title="Scroll X" :ts-code="tsScrollX" :js-code="jsScrollX">
  <div style="max-width: 420px; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="manyItemsScrollX" overflow="scrollX" :placeholder="commonPlaceholderEn" />
  </div>
</DemoBlock>

<DemoBlock title="Scroll Y" :ts-code="tsScrollY" :js-code="jsScrollY">
  <div style="max-width: 420px; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="manyItemsScrollY" overflow="scrollY" scroll-max-height="260px" :placeholder="commonPlaceholderEn" />
  </div>
</DemoBlock>

<DemoBlock title="Wrap" :ts-code="tsWrap" :js-code="jsWrap">
  <div style="max-width: 420px; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments v-model:items="manyItemsWrap" overflow="wrap" :placeholder="commonPlaceholderEn" />
  </div>
</DemoBlock>

## Upload Function

### Basic Usage

The component has built-in upload flow. Click the upload button or drag files to trigger upload. The component will automatically:

1. Create file list item (status: `uploading`)
2. Emit `upload-change` event
3. Call custom upload function `httpRequest` (if provided)
4. Update status to `done` on success, emit `upload-success`
5. Update status to `error` on failure, emit `upload-error`

<DemoBlock title="Basic Usage" :ts-code="tsBasicUpload" :js-code="jsBasicUpload">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="uploadBasicItemsEn"
      :http-request="handleUploadEn"
      :before-upload="validateFile"
      placeholder="Click or drag files to upload"
    />
  </div>
</DemoBlock>

### Custom Upload

Use `httpRequest` prop to fully customize upload logic (custom headers, URL, FormData handling, etc.). The function receives `{ file: File }` parameter and must return a Promise.

<DemoBlock title="Custom Upload" :ts-code="tsCustomUpload" :js-code="jsCustomUpload">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="uploadCustomItemsEn"
      :http-request="customUploadEn"
      placeholder="Click or drag files to upload"
    />
  </div>
</DemoBlock>

### Monitor Upload Status via Events

<DemoBlock title="Event Monitoring" :ts-code="tsEventsUpload" :js-code="jsEventsUpload">
  <div style="width: 100%; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-attachments
      v-model:items="uploadEventsItemsEn"
      :http-request="eventsUploadRequestEn"
      @upload-change="onUploadChange"
      @upload-success="onUploadSuccess"
      @upload-error="onUploadError"
      @delete-card="onDeleteItemEn"
      placeholder="Click or drag files to upload"
    />
  </div>
</DemoBlock>

## API

### Props

| Property         | Description                                                  | Type                                                       | Default     |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------- | ----------- |
| items            | Attachment list                                              | `AttachmentItem[]`                                         | `[]`        |
| overflow         | Overflow mode                                                | `'wrap' \| 'scrollX' \| 'scrollY'`                         | `'scrollX'` |
| scrollMaxHeight  | Max height when overflow is scrollY (e.g. `260px`)           | `string`                                                   | -           |
| hideUpload       | Hide upload button                                           | `boolean`                                                  | `false`     |
| disabled         | Disabled                                                     | `boolean`                                                  | `false`     |
| maxCount         | Max file count                                               | `number`                                                   | -           |
| limit            | File count limit (same as maxCount)                          | `number`                                                   | -           |
| placeholder      | Placeholder (object, function, or string)                    | `PlaceholderType \| ((mode) => PlaceholderType) \| string` | -           |
| getDropContainer | Return the drop container element; default is component root | `() => HTMLElement`                                        | -           |
| beforeUpload     | Pre-upload validation. Return `false` to cancel              | `(file: File) => boolean \| Promise<boolean>`              | -           |
| httpRequest      | Custom upload request function                               | `(options: { file: File }) => Promise<void>`               | -           |
| uploadIconSize   | Upload button icon size                                      | `string`                                                   | `'24px'`    |
| dragTarget       | Drag target element                                          | `string \| HTMLElement`                                    | -           |
| listStyle        | List container style                                         | `Record<string, string>`                                   | `{}`        |
| themeOverrides   | Theme override variables                                     | `Record<string, unknown>`                                  | -           |

### AttachmentItem Extended Properties

In addition to FileCardListItem properties, attachment items support:

| Property | Description                           | Type                                            | Default |
| -------- | ------------------------------------- | ----------------------------------------------- | ------- |
| status   | File status                           | `'uploading' \| 'done' \| 'error' \| 'removed'` | -       |
| percent  | Upload progress (0-100)               | `number`                                        | -       |
| response | Response data after successful upload | `unknown`                                       | -       |
| error    | Error message                         | `string`                                        | -       |

### Events

| Event          | Description                    | Parameters                                                    |
| -------------- | ------------------------------ | ------------------------------------------------------------- |
| update:items   | Fired when list updates        | `(items: AttachmentItem[])`                                   |
| upload-change  | Fired after file select/drop   | `(file: File, fileList: AttachmentItem[])`                    |
| upload-success | Fired after successful upload  | `(response: unknown, file: File, fileList: AttachmentItem[])` |
| upload-error   | Fired after upload failure     | `(error: unknown, file: File, fileList: AttachmentItem[])`    |
| upload-drop    | Fired on drag drop             | `(files: File[])`                                             |
| delete-card    | Fired when item is deleted     | `(item: AttachmentItem, index: number)`                       |
| exceed         | Fired when exceeding max count | `({ files, maxCount })`                                       |

### Slots

| Slot          | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| default       | Entire component container content                                       |
| file-item     | Custom file card item, params: `{ item: AttachmentItem, index: number }` |
| upload-button | Custom upload button, params: `{ canUpload: boolean }`                   |
| drop-area     | Custom drop area content                                                 |
