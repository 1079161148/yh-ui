---
title: AiFileCard 文件卡片
description: AiFileCard 文件卡片组件，用卡片形式展示文件，支持多种类型、尺寸与预设图标，与 Ant Design X FileCard 功能设计一致。
---

# AiFileCard 文件卡片

用卡片的形式展示文件，支持文档/图片/音视频类型、多种尺寸、加载状态与遮罩。

## 何时使用

用于在对话或输入场景中展示单个文件，如附件列表、消息气泡中的文件预览。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const loading = ref(true)

// 各示例的列表数据（支持删除）
const basicItems = ref([
  { name: '需求文档.pdf', byte: 102400, type: 'file', src: '' },
  { name: '报表.xlsx', byte: 51200, type: 'file', src: '' },
  { name: '预览图.png', byte: 0, type: 'image', src: imageUrl },
  { name: '这是一份非常长的文件名用于测试溢出省略效果.xlsx', byte: 204800, type: 'file', src: '' }
])
const imageItems = ref([{ name: '预览图.png', byte: 51200, type: 'image', src: imageUrl }])
const loadingItems = ref([
  { name: 'loading.png', type: 'image', src: imageUrl },
  { name: 'loading2.png', type: 'image', src: imageUrl }
])
const maskItems = ref([{ name: '已加密.pdf', byte: 102400, mask: '已加密', type: 'file' }])
// 超过 2 个音视频时采用遍历展示；传入 src 时使用原生 <audio>/<video> 可直接播放；删除功能生效
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
      <yh-ai-file-card :name="item.name" :byte="item.byte" :type="item.type" :src="item.src || undefined" size="small" />
      <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const items = ref([
  { name: '需求文档.pdf', byte: 102400, type: 'file', src: '' },
  { name: '报表.xlsx', byte: 51200, type: 'file', src: '' },
  { name: '预览图.png', byte: 0, type: 'image', src: imageUrl },
  { name: '这是一份非常长的文件名用于测试溢出省略效果.xlsx', byte: 204800, type: 'file', src: '' }
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
      <yh-ai-file-card :name="item.name" type="image" :src="item.src" :byte="item.byte" size="small" />
      <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const imageUrl = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=120&auto=format&fit=crop'
const items = ref([{ name: '预览图.png', byte: 51200, src: imageUrl }])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsLoading = `<${_T}>
  <div class="file-card-demo-loading">
    <div class="file-card-demo-btns">
      <button @click="loading = true">开始加载</button>
      <button @click="loading = false">加载完成</button>
    </div>
    <div class="file-card-demo-grid">
      <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
        <yh-ai-file-card :name="item.name" type="image" :src="item.src" :loading="loading" size="small" />
        <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
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
      <yh-ai-file-card :name="item.name" :byte="item.byte" :mask="item.mask" size="small" />
      <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const items = ref([{ name: '已加密.pdf', byte: 102400, mask: '已加密' }])
const remove = (index: number) => { items.value.splice(index, 1) }
</${_S}>`

const tsIcon = `<${_T}>
  <div class="file-card-demo-grid file-card-demo-icons">
    <div v-for="(item, index) in items" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :icon="item.icon" size="small" />
      <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
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
      >
        <button class="file-card-demo-delete" @click.stop="remove(index)">×</button>
      </yh-ai-file-card>
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

## 基础用法

传入 `name`（必填），可选 `byte`、`size`、`type`、`src` 等。卡片统一宽高展示，长文件名自动省略，悬停可查看完整名称。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in basicItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :type="item.type" :src="item.src || undefined" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(basicItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## 卡片大小

通过 `size` 设置：`small`、`default`、`large`。

<DemoBlock title="卡片大小" :ts-code="tsSizes" :js-code="jsSizes">
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

## 图片文件

`type="image"` 且传入 `src` 时展示图片预览。

<DemoBlock title="图片文件" :ts-code="tsImage" :js-code="jsImage">
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in imageItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" type="image" :src="item.src" :byte="item.byte" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(imageItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## 图片加载

使用 `loading` 属性展示加载状态；加载中图片呈模糊并显示旋转图标，加载完成后由模糊过渡为清晰。下方示例通过按钮切换加载/完成状态。

<DemoBlock title="图片加载" :ts-code="tsLoading" :js-code="jsLoading">
  <div class="file-card-demo-loading">
    <div class="file-card-demo-btns">
      <button @click="loading = true">开始加载</button>
      <button @click="loading = false">加载完成</button>
    </div>
    <div class="file-card-demo-grid">
      <div v-for="(item, index) in loadingItems" :key="index" class="file-card-demo-item">
        <yh-ai-file-card :name="item.name" type="image" :src="item.src" :loading="loading" size="small" />
        <button class="file-card-demo-delete" @click.stop="removeAt(loadingItems, index)"><YhIcon name="close" /></button>
      </div>
    </div>
  </div>
</DemoBlock>

## 使用遮罩

通过 `mask` 在卡片上显示遮罩文案（如「已加密」）。

<DemoBlock title="使用遮罩" :ts-code="tsMask" :js-code="jsMask">
  <div class="file-card-demo-grid">
    <div v-for="(item, index) in maskItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :mask="item.mask" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(maskItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## 预设图标类型

通过 `icon` 使用预设图标，支持以下类型：`default`、`pdf`、`excel`、`word`、`ppt`、`image`、`markdown`、`zip`、`video`、`audio`、`java`、`javascript`、`python`、`txt`。也可不传 `icon`，由文件名扩展名自动推断。

<DemoBlock title="预设图标类型" :ts-code="tsIcon" :js-code="jsIcon">
  <div class="file-card-demo-grid file-card-demo-icons">
    <div v-for="(item, index) in iconItems" :key="index" class="file-card-demo-item">
      <yh-ai-file-card :name="item.name" :byte="item.byte" :icon="item.icon" size="small" />
      <button class="file-card-demo-delete" @click.stop="removeAt(iconItems, index)"><YhIcon name="close" /></button>
    </div>
  </div>
</DemoBlock>

## 音频 / 视频

与 [Ant Design X FileCard](https://ant-design-x.antgroup.com/components/file-card?theme#file-card-demo-audio) 一致，使用浏览器原生 `<audio>` / `<video>`，传入 `src` 时**可直接播放**。超过 2 个时采用遍历方式展示（`v-for`），悬停点击删除按钮可移除该项。无 `src` 时展示预设图标占位。可通过 `audioProps` / `videoProps` 扩展原生播放能力。

<DemoBlock title="音频 / 视频" :ts-code="tsAudioVideo" :js-code="jsAudioVideo">
  <!-- 单列竖排：音频横条 + 视频方形，顺序展示 -->
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

## 文件列表

多个文件卡片可与 `AiAttachments` 配合使用，由 `AiAttachments` 负责列表布局、溢出方式与删除，详见 [AiAttachments 附件](/ai-components/ai-attachments)。

<style scoped>
.file-card-demo-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  background: var(--yh-bg-color-page);
  padding: 16px;
}
.file-card-demo-item {
  position: relative;
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
/* 删除按钮（通用） */
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
  opacity: 0;
  transition: opacity 0.2s;
}
.file-card-demo-delete:hover {
  background: rgba(0, 0, 0, 0.7);
}
.file-card-demo-item:hover .file-card-demo-delete,
.file-card-av-audio-item:hover .file-card-demo-delete,
.file-card-av-video-item:hover .file-card-demo-delete {
  opacity: 1;
}

/* ── 音频/视频 单列竖排布局 ── */
.file-card-av-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--yh-bg-color-page);
  padding: 16px;
  max-width: 420px;
}
/* 音频项：横向播放条卡片，宽度撑满 */
.file-card-av-audio-item {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: visible;
}
.file-card-av-audio-item :deep(.yh-ai-file-card) {
  width: 100%;
}
/* 视频项：方形预览卡片，宽度撑满，高度自适应 */
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

| 属性           | 说明                          | 类型                                                | 默认值      |
| -------------- | ----------------------------- | --------------------------------------------------- | ----------- |
| name           | 文件名称（必填）              | `string`                                            | -           |
| byte           | 文件大小（字节）              | `number`                                            | -           |
| size           | 卡片大小                      | `'small' \| 'default' \| 'large'`                   | `'default'` |
| type           | 文件类型                      | `'file' \| 'image' \| 'audio' \| 'video' \| string` | `'file'`    |
| src            | 图片或文件地址                | `string`                                            | -           |
| description    | 文件描述                      | `string`                                            | -           |
| loading        | 是否加载中                    | `boolean`                                           | `false`     |
| mask           | 遮罩内容                      | `string`                                            | -           |
| icon           | 预设图标                      | `PresetFileIcons`                                   | `'default'` |
| imageProps     | 图片属性（透传给 img 元素）   | `Record<string, unknown>`                           | `{}`        |
| videoProps     | 视频属性（透传给 video 元素） | `Record<string, unknown>`                           | `{}`        |
| audioProps     | 音频属性（透传给 audio 元素） | `Record<string, unknown>`                           | `{}`        |
| themeOverrides | 主题覆盖变量                  | `Record<string, unknown>`                           | -           |

### Slots

| 插槽名  | 说明                                                                              |
| ------- | --------------------------------------------------------------------------------- |
| default | 扩展内容，用于挂载删除按钮、进度条等（如与 AiAttachments 配合时的删除与上传进度） |

### PresetFileIcons

预设图标类型：

- `default` - 默认文件图标
- `excel` - Excel 文件图标
- `image` - 图片文件图标
- `markdown` - Markdown 文件图标
- `pdf` - PDF 文件图标
- `ppt` - PowerPoint 文件图标
- `word` - Word 文件图标
- `zip` - 压缩文件图标
- `video` - 视频文件图标
- `audio` - 音频文件图标
- `java` - Java 文件图标
- `javascript` - JavaScript 文件图标
- `python` - Python 文件图标
- `txt` - 文本文件图标

### FileCardListItem

列表项接口继承自 FileCardProps，还扩展了以下属性：

| 属性     | 说明       | 类型               |
| -------- | ---------- | ------------------ |
| uid      | 唯一标识   | `string \| number` |
| url      | 文件 URL   | `string`           |
| thumbUrl | 缩略图 URL | `string`           |

### Events

| 事件名 | 说明                                                 |
| ------ | ---------------------------------------------------- |
| click  | 卡片点击时触发（非加载中时）；图片类型点击会打开预览 |
