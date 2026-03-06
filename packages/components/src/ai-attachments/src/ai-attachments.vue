<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import {
  aiAttachmentsProps,
  aiAttachmentsEmits,
  type AttachmentItem,
  type PlaceholderType
} from './ai-attachments'
import type { PresetFileIcons } from '../../ai-file-card'
import { YhAiFileCard } from '../../ai-file-card'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiAttachments'
})

const props = defineProps(aiAttachmentsProps)
const emit = defineEmits(aiAttachmentsEmits)

const ns = useNamespace('ai-attachments')
const { t } = useLocale()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-attachments',
  computed(() => props.themeOverrides)
)

// 内部文件列表
const internalItems = ref<AttachmentItem[]>([...props.items])

// 监听外部 items 变化
watch(
  () => props.items,
  (newItems) => {
    internalItems.value = [...newItems]
  },
  { deep: true }
)

// 将 placeholder 规范为 PlaceholderType（支持字符串简写）
const normalizePlaceholder = (raw: unknown): PlaceholderType => {
  if (typeof raw === 'function') {
    return (raw as (type: 'inline' | 'drop') => PlaceholderType)('inline')
  }
  if (typeof raw === 'string') {
    return { icon: 'upload', title: raw }
  }
  return (raw as PlaceholderType) || {}
}

// 计算占位符
const computedPlaceholder = computed((): PlaceholderType => {
  return normalizePlaceholder(props.placeholder)
})

// 计算拖拽占位符
const computedDropPlaceholder = computed((): PlaceholderType => {
  const placeholder = props.placeholder
  if (typeof placeholder === 'function') {
    return placeholder('drop')
  }
  if (typeof placeholder === 'string') {
    return { icon: 'upload', title: placeholder }
  }
  return (placeholder as PlaceholderType) || {}
})

// 是否可以继续上传
const canUpload = computed(() => {
  if (props.disabled) return false
  if (props.maxCount !== undefined && internalItems.value.length >= props.maxCount) {
    return false
  }
  return true
})

// 溢出模式类
const overflowClass = computed(() => {
  return ns.m(`overflow-${props.overflow}`)
})

// 根据文件名扩展名解析预设图标（用于 AiFileCard 展示）
const extensionIconMap: Record<string, PresetFileIcons> = {
  pdf: 'pdf',
  xlsx: 'excel',
  xls: 'excel',
  doc: 'word',
  docx: 'word',
  ppt: 'ppt',
  pptx: 'ppt',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  gif: 'image',
  webp: 'image',
  svg: 'image',
  mp4: 'video',
  webm: 'video',
  mp3: 'audio',
  wav: 'audio',
  zip: 'zip',
  md: 'markdown',
  txt: 'txt',
  java: 'java',
  js: 'javascript',
  ts: 'javascript',
  py: 'python'
}
function getItemIcon(item: AttachmentItem): PresetFileIcons | undefined {
  if (item.icon) return item.icon as PresetFileIcons
  const ext = (item.name || '').split('.').pop()?.toLowerCase()
  return ext ? extensionIconMap[ext] : undefined
}

// 文件输入引用
const fileInputRef = ref<HTMLInputElement | null>(null)

// 拖拽状态
const isDragging = ref(false)
// 记录 dragenter / dragleave 深度，避免在子元素之间移动时反复触发抖动
const dragCounter = ref(0)

// 处理文件选择
const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])

  if (files.length > 0) {
    await processFiles(files)
  }

  // 清空 input 以便再次选择相同文件
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// 处理拖拽
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  dragCounter.value += 1
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  dragCounter.value = Math.max(0, dragCounter.value - 1)
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  dragCounter.value = 0
  isDragging.value = false

  const files = Array.from(e.dataTransfer?.files || [])

  if (files.length > 0) {
    emit('upload-drop', files)
    await processFiles(files)
  }
}

// 处理文件上传
const processFiles = async (files: File[]) => {
  // 过滤文件夹
  const validFiles = files.filter((f) => f.type !== '')

  if (validFiles.length === 0) return

  // 检查 beforeUpload
  for (const file of validFiles) {
    if (props.beforeUpload) {
      const result = await props.beforeUpload(file)
      if (!result) continue
    }

    // 创建文件项
    const fileItem: AttachmentItem = {
      uid: Date.now() + Math.random(),
      name: file.name,
      byte: file.size,
      type: file.type.split('/')[0] || 'file',
      status: 'uploading',
      percent: 0
    }

    internalItems.value.push(fileItem)
    emit('upload-change', file, internalItems.value)

    // 如果有自定义上传函数
    if (props.httpRequest) {
      try {
        await props.httpRequest({ file })
        // 更新状态为成功
        const index = internalItems.value.findIndex((item) => item.uid === fileItem.uid)
        if (index !== -1) {
          internalItems.value[index] = {
            ...internalItems.value[index],
            status: 'done',
            percent: 100
          }
        }
        emit('upload-success', { success: true }, file, internalItems.value)
      } catch (error) {
        // 更新状态为失败
        const index = internalItems.value.findIndex((item) => item.uid === fileItem.uid)
        if (index !== -1) {
          internalItems.value[index] = {
            ...internalItems.value[index],
            status: 'error',
            error: String(error)
          }
        }
        emit('upload-error', error, file, internalItems.value)
      }
    }
  }

  emit('update:items', internalItems.value)
}

// 点击上传按钮
const triggerUpload = () => {
  if (!canUpload.value) return
  fileInputRef.value?.click()
}

// 删除文件
const handleDelete = (item: AttachmentItem, index: number) => {
  internalItems.value.splice(index, 1)
  emit('delete-card', item, index)
  emit('update:items', internalItems.value)
}

// 滚动处理
const listContainerRef = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (listContainerRef.value) {
    listContainerRef.value.scrollLeft -= 200
  }
}

const scrollRight = () => {
  if (listContainerRef.value) {
    listContainerRef.value.scrollLeft += 200
  }
}

// 计算是否显示滚动按钮（仅 scrollX 且超过 3 个时显示）
const showScrollButtons = computed(() => {
  if (props.overflow !== 'scrollX') {
    return false
  }
  return internalItems.value.length > 3
})
</script>

<template>
  <div
    :class="[ns.b(), overflowClass]"
    :style="[
      themeStyle,
      props.overflow === 'scrollY' && props.scrollMaxHeight
        ? { maxHeight: props.scrollMaxHeight }
        : {}
    ]"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <!-- 文件列表 -->
    <div
      v-if="internalItems.length > 0"
      ref="listContainerRef"
      :class="ns.e('list')"
      :style="listStyle"
    >
      <div
        v-for="(item, index) in internalItems"
        :key="item.uid || index"
        :class="[ns.e('item'), ns.is('error', item.status === 'error')]"
      >
        <slot name="file-item" :item="item" :index="index">
          <YhAiFileCard
            :name="item.name"
            :byte="item.byte"
            :type="item.type"
            :icon="getItemIcon(item)"
            :src="item.url || item.thumbUrl"
            :description="item.status === 'error' ? item.error : item.description"
            :loading="item.status === 'uploading'"
            size="small"
          >
            <template #default>
              <!-- 上传进度（进度条 + 百分比） -->
              <div v-if="item.status === 'uploading'" :class="ns.e('progress-wrap')">
                <span :class="ns.e('progress-text')">{{ item.percent ?? 0 }}%</span>
                <div :class="ns.e('progress')">
                  <div
                    :class="ns.e('progress-bar')"
                    :style="{ width: `${item.percent || 0}%` }"
                  ></div>
                </div>
              </div>
              <!-- 删除按钮 -->
              <button
                v-if="item.status !== 'uploading'"
                :class="ns.e('delete-btn')"
                @click.stop="handleDelete(item, index)"
              >
                <YhIcon name="close" />
              </button>
            </template>
          </YhAiFileCard>
        </slot>
      </div>
    </div>

    <!-- 上传按钮 / 占位符 -->
    <div
      v-if="!hideUpload && canUpload"
      :class="[ns.e('upload'), ns.is('dragging', isDragging)]"
      @click="triggerUpload"
    >
      <slot name="upload-button" :can-upload="canUpload">
        <div :class="ns.e('upload-content')">
          <YhIcon :name="computedPlaceholder.icon || 'upload'" :size="uploadIconSize" />
          <div :class="ns.e('upload-text')">
            <div :class="ns.e('upload-title')">
              {{ isDragging ? computedDropPlaceholder.title : computedPlaceholder.title }}
            </div>
            <div v-if="computedPlaceholder.description" :class="ns.e('upload-description')">
              {{ computedPlaceholder.description }}
            </div>
          </div>
        </div>
      </slot>
    </div>

    <!-- 拖拽遮罩 -->
    <div v-if="isDragging" :class="ns.e('drop-mask')">
      <slot name="drop-area">
        <div :class="ns.e('drop-content')">
          <YhIcon :name="computedDropPlaceholder.icon || 'upload'" :size="uploadIconSize" />
          <div :class="ns.e('drop-text')">
            {{ computedDropPlaceholder.title || t('ai.attachments.dropTip') }}
          </div>
        </div>
      </slot>
    </div>

    <!-- 滚动按钮 -->
    <button
      v-if="showScrollButtons"
      :class="[ns.e('scroll-btn'), ns.e('scroll-prev')]"
      @click="scrollLeft"
    >
      <YhIcon name="arrow-left" />
    </button>
    <button
      v-if="showScrollButtons"
      :class="[ns.e('scroll-btn'), ns.e('scroll-next')]"
      @click="scrollRight"
    >
      <YhIcon name="arrow-right" />
    </button>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInputRef"
      type="file"
      :class="ns.e('file-input')"
      multiple
      :disabled="disabled"
      @change="handleFileSelect"
    />
  </div>
</template>

<style lang="scss">
@use './ai-attachments.scss';
</style>
