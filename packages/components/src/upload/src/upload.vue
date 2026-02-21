<template>
  <div :class="[ns.b(), ns.m(listType), ns.m(`pos-${triggerPosition}`), { [ns.is('disabled')]: disabled }]"
    :style="themeStyle">
    <!-- Hidden Input moved to top for better focus/click reliability in some browsers -->
    <input ref="inputRef" type="file" :class="ns.e('input')" :accept="accept" :multiple="multiple || directory"
      v-bind="directory ? { webkitdirectory: '', directory: '', mozdirectory: '' } : {}" style="display: none"
      @change="onInputChange" @click.stop />

    <div :class="ns.e('header')">
      <!-- Trigger Area -->
      <div v-if="drag" :class="[ns.e('dragger'), { [ns.is('dragover')]: dragOver }]" @drop.prevent="onDrop"
        @dragover.prevent="onDragOver" @dragenter.prevent="onDragOver" @dragleave.prevent="dragOver = false"
        @click="triggerInput">
        <slot name="trigger">
          <slot>
            <div :class="ns.e('content')">
              <yh-icon name="plus" :size="32" :class="ns.e('icon')" />
              <div :class="ns.e('text')" v-html="t('upload.tip')">
              </div>
            </div>
          </slot>
        </slot>
      </div>

      <template v-else>
        <!-- If trigger slot exists, it always gets the click handler -->
        <div v-if="$slots.trigger" :class="ns.e('trigger')" @click="triggerInput">
          <slot name="trigger" />
        </div>

        <!-- If picture-card and no trigger slot, use the plus button trigger -->
        <div v-else-if="listType === 'picture-card'" :class="ns.e('trigger')" @click="triggerInput">
          <div :class="ns.e('picture-card-plus')">
            <yh-icon name="plus" :size="28" />
          </div>
        </div>

        <!-- Default: the default slot is the trigger -->
        <div v-else :class="ns.e('trigger')" @click="triggerInput">
          <slot />
        </div>
      </template>

      <!-- Tip Slot -->
      <div v-if="$slots.tip" :class="ns.e('tip')">
        <slot name="tip" />
      </div>

      <!-- If trigger slot is used, the default slot can be used for other elements like submit buttons -->
      <div v-if="$slots.trigger" :class="ns.e('extra')">
        <slot />
      </div>
    </div>

    <!-- File List -->
    <transition-group v-if="showFileList" name="yh-list" tag="ul" :class="[ns.e('list'), ns.em('list', listType)]">
      <li v-for="file in fileList" :key="file.uid" :class="[ns.e('item'), ns.is(file.status)]">
        <slot name="file" :file="file">
          <!-- Picture Card Layout -->
          <template v-if="listType === 'picture-card'">
            <div :class="ns.e('thumbnail')">
              <img v-if="file.url" :src="file.url" :alt="file.name" :crossorigin="crossorigin" />
              <div :class="ns.e('actions')">
                <span @click.stop="handlePreview(file)">
                  <yh-icon name="eye" :size="18" />
                </span>
                <span v-if="showDownload" @click.stop="handleDownload(file)">
                  <yh-icon name="download" :size="18" />
                </span>
                <span v-if="!disabled" @click.stop="handleRemove(file)">
                  <yh-icon name="delete" :size="18" />
                </span>
              </div>
              <!-- Progress Bar overlay -->
              <div v-if="file.status === 'uploading'" :class="ns.e('progress-overlay')">
                <div :class="ns.e('progress-inner')" :style="{ width: (file.percentage || 0) + '%' }"></div>
              </div>
            </div>
          </template>

          <!-- Text/Picture Layout -->
          <template v-else>
            <div :class="ns.e('info')">
              <div v-if="listType === 'picture'" :class="ns.e('thumbnail-box')">
                <img v-if="file.url" :src="file.url" :class="ns.e('thumbnail-img')" :crossorigin="crossorigin" />
                <yh-icon v-else name="image" :size="24" :class="ns.e('thumbnail-icon')" />
              </div>
              <slot name="file-icon" :file="file">
                <yh-icon :name="getFileIcon(file)" :size="20" :class="ns.e('file-icon')" />
              </slot>

              <div :class="ns.e('details')">
                <div :class="ns.e('name')" @click="handlePreview(file)">
                  {{ file.name }}
                </div>
              </div>

              <div :class="ns.e('status-icon-wrapper')">
                <yh-icon v-if="file.status === 'success'" name="check" :size="14" :class="ns.e('status-icon')"
                  color="var(--yh-color-success)" />
                <yh-icon v-if="file.status === 'fail'" name="error" :size="14" :class="ns.e('status-icon')"
                  color="var(--yh-color-danger)" />

                <div v-if="!disabled" :class="ns.e('actions-inline')">
                  <yh-icon v-if="showDownload" name="download" :size="16" :class="ns.e('download-btn')"
                    @click.stop="handleDownload(file)" />
                  <yh-icon v-if="file.status === 'fail'" name="refresh" :size="16" :class="ns.e('retry-btn')"
                    @click.stop="startUpload(file)" />
                  <yh-icon name="delete" :size="16" :class="ns.e('delete-btn')" @click.stop="handleRemove(file)" />
                </div>
              </div>

              <!-- Full width bottom progress for non-card modes -->
              <div v-if="file.status === 'uploading'" :class="ns.e('bottom-progress')">
                <div :class="ns.e('bottom-progress-bar')" :style="{ width: (file.percentage || 0) + '%' }"></div>
              </div>
            </div>
          </template>
        </slot>
      </li>
    </transition-group>

  </div>
</template>

<script setup lang="ts">
import { ref, type CSSProperties, onBeforeUnmount, computed } from 'vue'
import { uploadProps, uploadEmits, type UploadFile, type UploadRawFile, type UploadRequestOptions, type UploadProgressEvent } from './upload'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { YhIcon } from '../../icon'
import Viewer from 'viewerjs'

defineOptions({
  name: 'YhUpload'
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)
const ns = useNamespace('upload')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('upload', computed(() => props.themeOverrides))

const inputRef = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)
let viewer: Viewer | null = null

/**
 * 触发选择文件
 */
const triggerInput = () => {
  if (props.disabled) return
  if (inputRef.value) {
    inputRef.value.value = ''
  }
  inputRef.value?.click()
}

/**
 * 获取文件对应的图标
 */
const getFileIcon = (file: UploadFile) => {
  // 1. 优先使用用户通过 prop 传入的自定义图标/函数
  if (props.fileIcon) {
    if (typeof props.fileIcon === 'function') {
      return props.fileIcon(file)
    }
    return props.fileIcon
  }

  // 2. 默认的自动匹配逻辑
  const fileName = file.name
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const map: Record<string, string> = {
    // 图片
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'webp': 'image',
    'svg': 'image',
    // 文档
    'pdf': 'file-pdf',
    'doc': 'file-word',
    'docx': 'file-word',
    'xls': 'file-excel',
    'xlsx': 'file-excel',
    'ppt': 'file-word',
    'pptx': 'file-word',
    'txt': 'file-txt',
    // 媒体
    'mp4': 'file-video',
    'mkv': 'file-video',
    'avi': 'file-video',
    'mov': 'file-video',
    'mp3': 'file-audio',
    'wav': 'file-audio',
    'flac': 'file-audio',
  }

  return map[ext] || 'attachment'
}

/**
 * 输入框变化
 */
const onInputChange = (e: Event) => {
  if (props.disabled) return
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  handleFiles(Array.from(files))
}

/**
 * 拖拽进入
 */
const onDragOver = (e: DragEvent) => {
  if (props.disabled || !props.drag) return
  dragOver.value = true
}

/**
 * 放置文件
 */
const onDrop = async (e: DragEvent) => {
  if (props.disabled || !props.drag) return
  dragOver.value = false

  const items = e.dataTransfer?.items
  if (!items) return

  const files: File[] = []

  // 递归读取 Entry
  const readEntry = async (entry: FileSystemEntry, path = '') => {
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry
      const file = await new Promise<File>((resolve) => fileEntry.file(resolve))
      if (path) {
        // 模拟 directory 模式下的 webkitRelativePath
        Object.defineProperty(file, 'webkitRelativePath', {
          value: `${path}${file.name}`,
          configurable: true
        })
      }
      files.push(file)
    } else if (entry.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry
      const reader = dirEntry.createReader()
      const entries = await new Promise<FileSystemEntry[]>((resolve) => reader.readEntries(resolve))
      for (const subEntry of entries) {
        await readEntry(subEntry, `${path}${entry.name}/`)
      }
    }
  }

  const entriesToRead: Promise<void>[] = []
  for (const item of Array.from(items)) {
    const entry = item.webkitGetAsEntry?.()
    if (entry) {
      entriesToRead.push(readEntry(entry))
    }
  }

  if (entriesToRead.length > 0) {
    await Promise.all(entriesToRead)
    handleFiles(files)
  } else {
    // Fallback if webkitGetAsEntry is not supported
    const rawFiles = e.dataTransfer?.files
    if (rawFiles) handleFiles(Array.from(rawFiles))
  }
}

/**
 * 校验文件是否匹配 accept 规则
 */
const attrAccept = (file: File, accept: string) => {
  if (!accept) return true
  const acceptList = accept.split(',').map(item => item.trim())
  if (acceptList.length === 0) return true

  const fileName = file.name
  const type = file.type

  return acceptList.some(item => {
    if (item.startsWith('.')) {
      return fileName.toLowerCase().endsWith(item.toLowerCase())
    } else if (item.endsWith('/*')) {
      const baseType = item.replace('/*', '')
      return type.startsWith(baseType)
    }
    return type === item
  })
}

/**
 * 处理选中的文件
 */
const handleFiles = async (files: File[]) => {
  // 总体限制校验
  if (props.limit && props.fileList.length + files.length > props.limit) {
    emit('exceed', files, props.fileList)
    return
  }

  const validFiles: UploadFile[] = []

  for (const file of files) {
    const rawFile = file as UploadRawFile

    // 1. Auto remove: format validation (by accept)
    if (props.accept && !attrAccept(rawFile, props.accept)) {
      console.warn(`[YhUpload] Auto Remove: File format does not match \"${props.accept}\" - ${rawFile.name}`)
      continue
    }

    // 2. Auto remove: size validation
    if (props.maxSize && rawFile.size / 1024 > props.maxSize) {
      console.warn(`[YhUpload] Auto Remove: File size exceeds limit - ${rawFile.name}`)
      continue
    }

    // 3. beforeUpload 钩子拦截
    if (props.beforeUpload) {
      try {
        const result = await props.beforeUpload(rawFile)
        if (result === false) continue
        if (result instanceof Blob) {
          // If the hook returns a new Blob/File, use it instead of the original
          const newRawFile = result as UploadRawFile
          if (!newRawFile.uid) newRawFile.uid = Date.now() + Math.random()
          // Assign to rawFile for subsequent logic
          Object.assign(rawFile, newRawFile)
          // We also need to handle the case where we just use the new object
        }
      } catch (err) {
        continue
      }
    }

    // 分配 UID
    if (!rawFile.uid) rawFile.uid = Date.now() + Math.random()

    const uploadFile: UploadFile = {
      name: props.directory && rawFile.webkitRelativePath ? rawFile.webkitRelativePath : rawFile.name,
      percentage: 0,
      status: 'ready',
      size: rawFile.size,
      uid: rawFile.uid,
      raw: rawFile
    }

    // 4. 智能缩略图：仅对真正的图片生成预览图
    if (props.listType.includes('picture')) {
      if (props.thumbnailRequest) {
        uploadFile.url = await props.thumbnailRequest(rawFile)
      } else if (rawFile.type && rawFile.type.startsWith('image/')) {
        uploadFile.url = URL.createObjectURL(rawFile)
      }
    }

    validFiles.push(uploadFile)
  }

  // 最终合并有效文件并触发更新
  if (validFiles.length > 0) {
    const newFileList = [...props.fileList, ...validFiles]
    emit('update:fileList', newFileList)

    validFiles.forEach(file => {
      emit('change', file, newFileList)
      if (props.autoUpload) {
        startUpload(file)
      }
    })
  }
}

/**
 * 开始上传流程
 */
const startUpload = async (file: UploadFile) => {
  file.status = 'uploading'

  const options: UploadRequestOptions = {
    action: props.action,
    method: props.method,
    file: file.raw!,
    filename: props.name,
    name: file.name,
    data: props.data,
    headers: props.headers,
    withCredentials: props.withCredentials,
    onProgress: (evt) => {
      file.percentage = evt.percent
      emit('progress', evt, file, props.fileList)
    },
    onSuccess: (res) => {
      file.status = 'success'
      file.response = res
      emit('success', res, file, props.fileList)
    },
    onError: (err) => {
      file.status = 'fail'
      file.error = err
      emit('error', err, file, props.fileList)
    }
  }

  if (props.httpRequest) {
    props.httpRequest(options)
    return
  }

  // 默认 XHR 上传实现
  ajaxUpload(options)
}

/**
 * 默认 AJAX 上传封装
 */
const ajaxUpload = (options: UploadRequestOptions) => {
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  if (options.data) {
    Object.keys(options.data).forEach(key => {
      formData.append(key, options.data[key] as string | Blob)
    })
  }
  formData.append(options.filename, options.file, options.name)

  xhr.upload.onprogress = (e) => {
    if (e.total > 0) {
      const percent = Math.round((e.loaded / e.total) * 100)
      options.onProgress({ ...e, percent } as UploadProgressEvent)
    }
  }

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = xhr.responseText
      try {
        response = JSON.parse(response)
      } catch (e) { }
      options.onSuccess(response)
    } else {
      options.onError(new Error(`Upload failed with status ${xhr.status}`))
    }
  }

  xhr.onerror = () => {
    options.onError(new Error('Network Error'))
  }

  xhr.open(options.method, options.action, true)

  if (options.withCredentials) {
    xhr.withCredentials = true
  }

  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key])
    })
  }

  xhr.send(formData)
}

/**
 * 处理移除
 */
const handleRemove = async (file: UploadFile) => {
  if (props.disabled) return

  if (props.beforeRemove) {
    const result = await props.beforeRemove(file, props.fileList)
    if (result === false) return
  }

  const newFileList = props.fileList.filter(f => f.uid !== file.uid)
  emit('update:fileList', newFileList)
  emit('remove', file, newFileList)

  if (file.url && file.url.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
}

/**
 * 处理预览
 */
const handlePreview = (file: UploadFile) => {
  emit('preview', file)

  // 仅对图片类型进行内置预览处理
  const isImage = file.url && (
    file.url.startsWith('blob:') ||
    file.url.startsWith('data:') ||
    /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name)
  )

  if (isImage) {
    const images = props.fileList
      .filter(f => f.url && (f.url.startsWith('blob:') || f.url.startsWith('data:') || /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(f.name)))
      .map(f => f.url!)

    if (images.length === 0) return

    const container = document.createElement('div')
    const imgList = images.map(src => `<img src="${src}" style="display:none">`).join('')
    container.innerHTML = imgList

    const initialIndex = images.indexOf(file.url!)

    if (viewer) viewer.destroy()

    viewer = new Viewer(container, {
      hidden: () => {
        viewer?.destroy()
        viewer = null
      },
      navbar: images.length > 1,
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        prev: images.length > 1 ? 4 : 0,
        play: {
          show: 4,
          size: 'large',
        },
        next: images.length > 1 ? 4 : 0,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
      },
    })

    viewer.view(initialIndex !== -1 ? initialIndex : 0)
    viewer.show()
  }
}

/**
 * 处理下载
 */
const handleDownload = async (file: UploadFile) => {
  emit('download', file)
  if (!file.url) return

  // 如果已经是本地 Blob 或者 Base64，直接触发下载
  if (file.url.startsWith('blob:') || file.url.startsWith('data:')) {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name || 'download'
    link.click()
    return
  }

  try {
    // 强制通过 Fetch 请求资源，并转为 Blob 对象
    const response = await fetch(file.url, {
      method: 'GET',
      mode: 'cors', // 必须开启 CORS 模式
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = file.name || 'download'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 释放 URL 内存
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
  } catch (err) {
    // Fallback: If fetch fails (usually server CORS), try opening in new window
    console.warn('[YhUpload] CORS download restricted, falling back to preview mode', err)
    const link = document.createElement('a')
    link.href = file.url
    link.target = '_blank'
    link.download = file.name || 'download'
    link.click()
  }
}

onBeforeUnmount(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
})

defineExpose({
  triggerInput,
  handleRemove,
  handlePreview,
  handleDownload,
  handleFiles,
  submit: () => {
    props.fileList.filter(f => f.status === 'ready').forEach(startUpload)
  }
})
</script>

<style lang="scss">
@use './upload.scss';
</style>
