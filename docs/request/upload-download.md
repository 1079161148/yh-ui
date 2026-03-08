# 上传与下载

`@yh-ui/request` 支持文件上传与下载进度监听，可以轻松实现带进度条的文件传输功能。

## 基础配置

### 上传进度

通过 `onUploadProgress` 监听上传进度：

```typescript
const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await request.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent
      const percent = Math.round((loaded / total) * 100)
      console.log(`上传进度: ${percent}%`)
    }
  })
}
```

### 下载进度

通过 `onDownloadProgress` 监听下载进度：

```typescript
const handleDownload = async () => {
  const response = await request.get('/api/download/file', {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent
      const percent = Math.round((loaded / total) * 100)
      console.log(`下载进度: ${percent}%`)
    }
  })
}
```

## ProgressEvent 结构

```typescript
interface ProgressEvent {
  /** 已加载的字节数 */
  loaded: number
  /** 总字节数 */
  total: number
  /** 进度百分比 (0-100) */
  percent: number
  /** 已传输的字节数（与 loaded 相同） */
  transferred: number
  /** 传输速率 (bytes per second) */
  rate?: number
  /** 预计剩余时间 (毫秒) */
  estimated?: number
}
```

## 进度类型定义

```typescript
export type ProgressCallback = (event: ProgressEvent) => void

export interface RequestOptions<TRequest = unknown> {
  // ... 其他配置
  /** 上传进度回调 */
  onUploadProgress?: ProgressCallback
  /** 下载进度回调 */
  onDownloadProgress?: ProgressCallback
}
```

## 完整示例

### 文件上传带进度条

```typescript
import { ref } from 'vue'
import { request } from '@yh-ui/request'

interface UploadOptions {
  file: File
  onProgress?: (percent: number) => void
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

const uploadFile = async (options: UploadOptions) => {
  const { file, onProgress, onSuccess, onError } = options

  const formData = new FormData()
  formData.append('file', file)
  formData.append('filename', file.name)

  try {
    const response = await request.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        onProgress?.(percent)
      }
    })

    onSuccess?.(response.data)
  } catch (error) {
    onError?.(error as Error)
  }
}

// 使用
uploadFile({
  file: selectedFile,
  onProgress: (percent) => {
    console.log(`上传进度: ${percent}%`)
  },
  onSuccess: (data) => {
    console.log('上传成功:', data)
  },
  onError: (error) => {
    console.error('上传失败:', error)
  }
})
```

### 大文件分片上传

```typescript
import { request } from '@yh-ui/request'

interface ChunkUploadOptions {
  file: File
  chunkSize?: number
  onProgress?: (percent: number) => void
}

const uploadFileInChunks = async (options: ChunkUploadOptions) => {
  const { file, chunkSize = 1024 * 1024, onProgress } = options // 默认 1MB

  const totalChunks = Math.ceil(file.size / chunkSize)
  const uploadedChunks: number[] = []

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunk = file.slice(start, end)

    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('chunkIndex', String(i))
    formData.append('totalChunks', String(totalChunks))
    formData.append('filename', file.name)

    await request.post('/api/upload/chunk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        // 计算整体进度
        const chunkProgress = (i / totalChunks) * 100
        const currentChunkProgress =
          (progressEvent.loaded / progressEvent.total) * (1 / totalChunks) * 100
        const totalProgress = Math.round(chunkProgress + currentChunkProgress)
        onProgress?.(totalProgress)
      }
    })

    uploadedChunks.push(i)
  }

  // 通知服务器合并分片
  await request.post('/api/upload/merge', {
    filename: file.name,
    totalChunks
  })
}
```

### 文件下载带进度

```typescript
import { request } from '@yh-ui/request'

interface DownloadOptions {
  url: string
  filename?: string
  onProgress?: (percent: number) => void
  onProgress?: (event: ProgressEvent) => void
}

const downloadFile = async (options: DownloadOptions) => {
  const { url, filename, onProgress } = options

  const response = await request.get(url, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      const rate = Math.round(progressEvent.rate || 0)
      const estimated = progressEvent.estimated

      console.log(`下载进度: ${percent}% | 速率: ${(rate / 1024).toFixed(1)} KB/s`)
      if (estimated) {
        console.log(`预计剩余时间: ${(estimated / 1000).toFixed(1)} 秒`)
      }

      onProgress?.(progressEvent)
    }
  })

  // 处理下载完成
  const blob = new Blob([response.data])
  const downloadUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(downloadUrl)
}
```

### 批量上传

```typescript
import { request } from '@yh-ui/request'

interface BatchUploadOptions {
  files: File[]
  concurrent?: number
  onProgress?: (completed: number, total: number, percent: number) => void
}

const batchUpload = async (options: BatchUploadOptions) => {
  const { files, concurrent = 3, onProgress } = options

  let completed = 0
  const results: any[] = []

  // 使用信号量控制并发
  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await request.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          onProgress?.(completed, files.length, percent)
        }
      })

      results[index] = response.data
      completed++
      onProgress?.(completed, files.length, 100)
    } catch (error) {
      results[index] = { error }
    }
  }

  // 分批并发上传
  for (let i = 0; i < files.length; i += concurrent) {
    const batch = files.slice(i, i + concurrent)
    await Promise.all(batch.map((file, index) => uploadFile(file, i + index)))
  }

  return results
}
```

## 与 UI 组件结合

### 使用 Progress 组件

```vue
<template>
  <div class="upload-demo">
    <yh-button @click="triggerUpload"> 选择文件 </yh-button>

    <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />

    <div v-if="uploading" class="progress-wrapper">
      <yh-progress :percent="uploadProgress" :status="uploadStatus" />
      <span class="progress-text">{{ uploadProgress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '@yh-ui/request'
import { YhButton, YhProgress, YhMessage } from '@yh-ui/components'

const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref<'normal' | 'exception' | 'success'>('normal')

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploading.value = true
  uploadProgress.value = 0
  uploadStatus.value = 'normal'

  const formData = new FormData()
  formData.append('file', file)

  try {
    await request.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      }
    })

    uploadStatus.value = 'success'
    YhMessage.success('上传成功')
  } catch (error) {
    uploadStatus.value = 'exception'
    YhMessage.error('上传失败')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.upload-demo {
  padding: 20px;
}

.progress-wrapper {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-text {
  font-size: 14px;
  color: #666;
  min-width: 40px;
}
</style>
```

### 使用 Slider 组件自定义进度

```vue
<template>
  <div class="download-demo">
    <yh-button type="primary" :loading="downloading" @click="handleDownload"> 下载文件 </yh-button>

    <div v-if="downloading" class="download-info">
      <yh-slider v-model="downloadProgress" :show-tooltip="false" :disabled="true" />
      <span class="download-text"> {{ downloadProgress }}% | {{ formatSpeed(speed) }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '@yh-ui/request'
import { YhButton, YhSlider, YhMessage } from '@yh-ui/components'

const downloading = ref(false)
const downloadProgress = ref(0)
const speed = ref(0)

const formatSpeed = (bytesPerSecond: number) => {
  if (bytesPerSecond < 1024) return `${bytesPerSecond} B/s`
  if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(1)} KB/s`
  return `${(bytesPerSecond / 1024 / 1024).toFixed(1)} MB/s`
}

const handleDownload = async () => {
  downloading.value = true
  downloadProgress.value = 0

  try {
    const response = await request.get('/api/download/large-file', {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        downloadProgress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        speed.value = progressEvent.rate || 0
      }
    })

    // 处理下载完成
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'large-file.zip'
    link.click()
    window.URL.revokeObjectURL(url)

    YhMessage.success('下载完成')
  } catch (error) {
    YhMessage.error('下载失败')
  } finally {
    downloading.value = false
  }
}
</script>

<style scoped>
.download-demo {
  padding: 20px;
}

.download-info {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.download-text {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}
</style>
```

## 注意事项

### 1. 进度事件兼容性

不同适配器对进度事件的支持：

| 适配器          | 上传进度 | 下载进度 | 说明               |
| --------------- | -------- | -------- | ------------------ |
| FetchAdapter    | ✅       | ✅       | 现代浏览器支持最好 |
| XHRAdapter      | ✅       | ✅       | 旧版浏览器兼容     |
| NodeHttpAdapter | ✅       | ✅       | Node.js 环境       |

### 2. 大文件处理

对于超大文件（>100MB），建议：

- 使用分片上传
- 设置合适的 `chunkSize`
- 实现断点续传功能
- 考虑使用 Web Workers 处理上传

### 3. 进度计算

```typescript
// 计算进度的标准方式
const percent = Math.round((loaded / total) * 100)

// 处理 total 为 0 的情况
const percent = total > 0 ? Math.round((loaded / total) * 100) : 0
```

## 下一步

- [与 UI 组件集成](./integration) - 结合 YH-UI 组件实现完整的上传/下载功能
- [错误处理](./error) - 错误处理最佳实践
