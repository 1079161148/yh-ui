---
title: AiFileCard
description: AiFileCard displays a single file in card form, with multiple types, sizes, and preset icons. Aligned with Ant Design X FileCard design.
---

# AiFileCard

Display a file in card form. Supports document/image/audio/video types, multiple sizes, loading state, and mask.

## When to use

Use when displaying a single file in conversation or input scenarios, e.g. attachment lists or file previews in message bubbles.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const loading = ref(true)

const basicItems = ref([
  { name: 'document.pdf', byte: 102400, type: 'file', src: '' },
  { name: 'report.xlsx', byte: 51200, type: 'file', src: '' },
  { name: 'preview.png', byte: 0, type: 'image', src: imageUrl },
  { name: 'very-long-filename-for-overflow-ellipsis-test.xlsx', byte: 204800, type: 'file', src: '' }
])
const imageItems = ref([{ name: 'preview.png', byte: 51200, type: 'image', src: imageUrl }])
const loadingItems = ref([
  { name: 'loading.png', type: 'image', src: imageUrl },
  { name: 'loading2.png', type: 'image', src: imageUrl }
])
const maskItems = ref([{ name: 'encrypted.pdf', byte: 102400, mask: 'Encrypted', type: 'file' }])
// Use v-for for 3+ items; with src, native <audio>/<video> are directly playable; delete works
const audioVideoItems = ref([
  { name: 'audio-file.mp3', byte: 1024, type: 'audio', icon: 'audio' as const, src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
  { name: 'video-file.mp4', byte: 1024, type: 'video', icon: 'video' as const, src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { name: 'audio-2.mp3', byte: 2048, type: 'audio', icon: 'audio' as const, src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
  { name: 'video-2.mp4', byte: 3072, type: 'video', icon: 'video' as const, src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }
])
const iconItems = ref([
  { name: 'default.pdf', byte: 102400, icon: 'default' as const },
  { name: 'doc.pdf', byte: 102400, icon: 'pdf' as const },
  { name: 'sheet.xlsx', byte: 51200, icon: 'excel' as const },
  { name: 'doc.docx', byte: 81920, icon: 'word' as const },
  { name: 'slides.pptx', byte: 307200, icon: 'ppt' as const },
  { name: 'image.png', byte: 51200, icon: 'image' as const },
  { name: 'readme.md', byte: 2048, icon: 'markdown' as const },
  { name: 'archive.zip', byte: 1024000, icon: 'zip' as const },
  { name: 'video.mp4', byte: 5120000, icon: 'video' as const },
  { name: 'audio.mp3', byte: 1024000, icon: 'audio' as const },
  { name: 'Main.java', byte: 4096, icon: 'java' as const },
  { name: 'index.js', byte: 2048, icon: 'javascript' as const },
  { name: 'main.py', byte: 1024, icon: 'python' as const },
  { name: 'note.txt', byte: 512, icon: 'txt' as const }
])

const removeAt = (arr: unknown[], index: number) => {
  arr.splice(index, 1)
}

const tsBasic = `<${_T}>
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :type="item.type" :src="item.src || undefined" size="small">
        <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
      </yh-ai-file-card>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const items = ref([
  { name: 'document.pdf', byte: 102400, type: 'file', src: '' },
  { name: 'report.xlsx', byte: 51200, type: 'file', src: '' },
  { name: 'preview.png', byte: 0, type: 'image', src: imageUrl },
  { name: 'very-long-filename-for-overflow-ellipsis-test.xlsx', byte: 204800, type: 'file', src: '' }
])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsSizes = `<${_T}>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-ai-file-card
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :size="item.size"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const items = [
  { name: 'small.pdf', size: 'small' },
  { name: 'default.pdf', size: 'default' },
  { name: 'large.pdf', size: 'large' }
]
</${_S}>`

const tsImage = `<${_T}>
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" type="image" :src="item.src" :byte="item.byte" size="small">
        <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
      </yh-ai-file-card>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const items = ref([{ name: 'preview.png', byte: 51200, src: imageUrl }])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsLoading = `<${_T}>
  <div class="file-card-demo-loading">
    <div class="file-card-demo-btns">
      <button @click="loading = true">Start Loading</button>
      <button @click="loading = false">Load Complete</button>
    </div>
    <div class="file-card-demo-grid">
      <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
        <yh-ai-file-card :name="item.name" type="image" :src="item.src" :loading="loading" size="small">
          <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
        </yh-ai-file-card>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const loading = ref(true)
const items = ref([
  { name: 'loading.png', src: imageUrl },
  { name: 'loading2.png', src: imageUrl }
])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsMask = `<${_T}>
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :mask="item.mask" size="small">
        <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
      </yh-ai-file-card>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const items = ref([{ name: 'encrypted.pdf', byte: 102400, mask: 'Encrypted' }])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsIcon = `<${_T}>
  <div class="file-card-demo-grid file-card-demo-icons">
    <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :icon="item.icon" size="small">
        <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
      </yh-ai-file-card>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { name: 'default.pdf', byte: 102400, icon: 'default' },
  { name: 'doc.pdf', byte: 102400, icon: 'pdf' },
  { name: 'sheet.xlsx', byte: 51200, icon: 'excel' },
  { name: 'doc.docx', byte: 81920, icon: 'word' },
  { name: 'slides.pptx', byte: 307200, icon: 'ppt' },
  { name: 'image.png', byte: 51200, icon: 'image' },
  { name: 'readme.md', byte: 2048, icon: 'markdown' },
  { name: 'archive.zip', byte: 1024000, icon: 'zip' },
  { name: 'video.mp4', byte: 5120000, icon: 'video' },
  { name: 'audio.mp3', byte: 1024000, icon: 'audio' },
  { name: 'Main.java', byte: 4096, icon: 'java' },
  { name: 'index.js', byte: 2048, icon: 'javascript' },
  { name: 'main.py', byte: 1024, icon: 'python' },
  { name: 'note.txt', byte: 512, icon: 'txt' }
])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsAudioVideo = `<${_T}>
  <div class="file-card-av-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="item.type === 'audio' ? 'file-card-av-audio-item' : 'file-card-av-video-item'"
    >
      <yh-ai-file-card
        :name="item.name"
        :byte="item.byte"
        :type="item.type"
        :icon="item.icon"
        :src="item.src"
        size="small"
      />
      <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { name: 'audio-file.mp3', byte: 1024, type: 'audio', icon: 'audio', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
  { name: 'video-file.mp4', byte: 1024, type: 'video', icon: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { name: 'audio-2.mp3', byte: 2048, type: 'audio', icon: 'audio', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
  { name: 'video-2.mp4', byte: 3072, type: 'video', icon: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }
])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsSizes = toJs(tsSizes)
const jsImage = toJs(tsImage)
const jsLoading = toJs(tsLoading)
const jsMask = toJs(tsMask)
const jsIcon = toJs(tsIcon)
const jsAudioVideo = toJs(tsAudioVideo)
</script>

## Basic usage

Provide required `name`; optional props include `byte`, `size`, `type`, `src`. Cards use uniform width and height; long filenames are truncated with ellipsis; hover to see full name.

<DemoBlock title="Basic usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in basicItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :type="item.type" :src="item.src || undefined" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(basicItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## Card size

Set `size` to `small`, `default`, or `large`.

<DemoBlock title="Card size" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; gap: 16px; flex-wrap: wrap; background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-file-card
      v-for="(item, index) in [
        { name: 'small.pdf', size: 'small' },
        { name: 'default.pdf', size: 'default' },
        { name: 'large.pdf', size: 'large' }
      ]"
      :key="index"
      :name="item.name"
      :size="item.size"
    />
  </div>
</DemoBlock>

## Image file

When `type="image"` and `src` is set, the card shows an image preview.

<DemoBlock title="Image file" :ts-code="tsImage" :js-code="jsImage">
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in imageItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" type="image" :src="item.src" :byte="item.byte" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(imageItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## Image loading

Use the `loading` prop to show a loading state; the image stays visible but blurred with a spinner overlay, then transitions to clear when loading completes. The example below uses buttons to toggle between loading and complete.

<DemoBlock title="Image loading" :ts-code="tsLoading" :js-code="jsLoading">
  <div class="file-card-demo-loading">
    <div class="file-card-demo-btns">
      <button @click="loading = true">Start Loading</button>
      <button @click="loading = false">Load Complete</button>
    </div>
    <div class="file-card-demo-grid">
      <div v-for="(item, index) in loadingItems" :key="index" class="file-card-demo-item">
        <yh-ai-file-card :name="item.name" type="image" :src="item.src" :loading="loading" size="small" />
        <button class="file-card-demo-delete" @click.stop="removeAt(loadingItems, index)"><YhIcon name="close" /></button>
      </div>
    </div>
  </div>
</DemoBlock>

## Using mask

Use `mask` to show overlay text (e.g. "Encrypted") on the card.

<DemoBlock title="Using mask" :ts-code="tsMask" :js-code="jsMask">
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in maskItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :mask="item.mask" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(maskItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## Preset icon types

Use the `icon` prop with preset icons. Supported types: `default`, `pdf`, `excel`, `word`, `ppt`, `image`, `markdown`, `zip`, `video`, `audio`, `java`, `javascript`, `python`, `txt`. You can also omit `icon` and rely on extension-based inference.

<DemoBlock title="Preset icon types" :ts-code="tsIcon" :js-code="jsIcon">
  <div class="file-card-demo-grid file-card-demo-icons">
    <div v-for="(item, index) in iconItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :icon="item.icon" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(iconItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## Audio / Video

Aligns with [Ant Design X FileCard](https://ant-design-x.antgroup.com/components/file-card?theme#file-card-demo-audio): uses browser native `<audio>` / `<video>`; when `src` is provided, media is **directly playable**. For 3+ items, use traversal (`v-for`); the delete button removes the item. Without `src`, the preset icon placeholder is shown. Use `audioProps` / `videoProps` to extend native playback.

<DemoBlock title="Audio / Video" :ts-code="tsAudioVideo" :js-code="jsAudioVideo">
  <!-- Single column: audio strips on top, video squares below, in order -->
  <div class="file-card-av-list">
    <div
      v-for="(item, index) in audioVideoItems"
      :key="index"
      :class="item.type === 'audio' ? 'file-card-av-audio-item' : 'file-card-av-video-item'"
    >
      <yh-ai-file-card
        :name="item.name"
        :byte="item.byte"
        :type="item.type"
        :icon="item.icon"
        :src="item.src"
        size="small"
      />
      <button class="file-card-demo-delete" @click.stop="removeAt(audioVideoItems, index)">
        <YhIcon name="close" />
      </button>
    </div>
  </div>
</DemoBlock>

## File list

Multiple file cards can be used with `AiAttachments` for list layout, overflow behavior, and delete. See [AiAttachments](/en/ai-components/ai-attachments).

<style scoped>
.file-card-demo-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  background: var(--yh-bg-color-page);
  padding: 16px;
}
.file-card-demo-item {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px;
}
.file-card-demo-item :deep(.yh-ai-file-card) {
  width: 100%;
  height: 100%;
  display: flex;
}
.file-card-demo-loading {
  background: var(--yh-bg-color-page);
  padding: 16px;
}
.file-card-demo-btns {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.file-card-demo-btns button {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid var(--yh-border-color);
  border-radius: 4px;
  background: var(--yh-bg-color);
  cursor: pointer;
}
.file-card-demo-btns button:hover {
  border-color: var(--yh-color-primary);
  color: var(--yh-color-primary);
}
.file-card-demo-item {
  position: relative;
}
.file-card-demo-delete {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  z-index: 10;
}
.file-card-demo-delete:hover {
  background: rgba(0, 0, 0, 0.7);
}
.file-card-demo-item:hover .file-card-demo-delete,
.file-card-av-audio-item:hover .file-card-demo-delete,
.file-card-av-video-item:hover .file-card-demo-delete {
  opacity: 1;
}
.file-card-demo-item .file-card-demo-delete,
.file-card-av-audio-item .file-card-demo-delete,
.file-card-av-video-item .file-card-demo-delete {
  opacity: 0;
  transition: opacity 0.2s;
}

/* ── Audio/Video single column layout ── */
.file-card-av-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--yh-bg-color-page);
  padding: 16px;
  max-width: 420px;
}
/* Audio: full-width horizontal strip */
.file-card-av-audio-item {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: visible;
}
.file-card-av-audio-item :deep(.yh-ai-file-card) {
  width: 100%;
}
/* Video: full-width preview card */
.file-card-av-video-item {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.file-card-av-video-item :deep(.yh-ai-file-card) {
  width: 100%;
}
</style>

## API

### FileCard Props

| Property       | Description                           | Type                                                | Default     |
| -------------- | ------------------------------------- | --------------------------------------------------- | ----------- |
| name           | File name (required)                  | `string`                                            | -           |
| byte           | File size in bytes                    | `number`                                            | -           |
| size           | Card size                             | `'small' \| 'default' \| 'large'`                   | `'default'` |
| type           | File type                             | `'file' \| 'image' \| 'audio' \| 'video' \| string` | `'file'`    |
| src            | Image or file URL                     | `string`                                            | -           |
| description    | Description                           | `string`                                            | -           |
| loading        | Loading state                         | `boolean`                                           | `false`     |
| mask           | Mask content                          | `string`                                            | -           |
| icon           | Preset icon                           | `PresetFileIcons`                                   | `'default'` |
| imageProps     | Image props (passed to img element)   | `Record<string, unknown>`                           | `{}`        |
| videoProps     | Video props (passed to video element) | `Record<string, unknown>`                           | `{}`        |
| audioProps     | Audio props (passed to audio element) | `Record<string, unknown>`                           | `{}`        |
| themeOverrides | Theme override variables              | `Record<string, unknown>`                           | -           |

### Slots

| Slot    | Description                                                                       |
| ------- | --------------------------------------------------------------------------------- |
| default | Extension content (e.g. delete button, progress bar when used with AiAttachments) |

### PresetFileIcons

Preset icon types:

- `default` - Default file icon
- `excel` - Excel file icon
- `image` - Image file icon
- `markdown` - Markdown file icon
- `pdf` - PDF file icon
- `ppt` - PowerPoint file icon
- `word` - Word file icon
- `zip` - Archive file icon
- `video` - Video file icon
- `audio` - Audio file icon
- `java` - Java file icon
- `javascript` - JavaScript file icon
- `python` - Python file icon
- `txt` - Text file icon

### FileCardListItem

List item interface extends FileCardProps with additional properties:

| Property | Description       | Type               |
| -------- | ----------------- | ------------------ |
| uid      | Unique identifier | `string \| number` |
| url      | File URL          | `string`           |
| thumbUrl | Thumbnail URL     | `string`           |

### Events

| Event | Description                                                                               |
| ----- | ----------------------------------------------------------------------------------------- |
| click | Fired when card is clicked (when not loading); for image type, clicking opens the preview |
