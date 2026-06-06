# Upload and Download

`@yh-ui/request` supports file upload and download progress monitoring, making it easy to implement file transfer with progress bars.

## Basic Configuration

### Upload Progress

Monitor upload progress via `onUploadProgress`:

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
      console.log(`Upload progress: ${percent}%`)
    }
  })
}
```

### Download Progress

Monitor download progress via `onDownloadProgress`:

```typescript
const handleDownload = async () => {
  const response = await request.get('/api/download/file', {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent
      const percent = Math.round((loaded / total) * 100)
      console.log(`Download progress: ${percent}%`)
    }
  })
}
```

## ProgressEvent Structure

```typescript
interface ProgressEvent {
  /** Number of bytes loaded */
  loaded: number
  /** Total number of bytes */
  total: number
  /** Progress percentage (0-100) */
  percent: number
  /** Number of bytes transferred (same as loaded) */
  transferred: number
  /** Transfer rate (bytes per second) */
  rate?: number
  /** Estimated remaining time (milliseconds) */
  estimated?: number
}
```

## Progress Type Definitions

```typescript
export type ProgressCallback = (event: ProgressEvent) => void

export interface RequestOptions<TRequest = unknown> {
  // ... other options
  /** Upload progress callback */
  onUploadProgress?: ProgressCallback
  /** Download progress callback */
  onDownloadProgress?: ProgressCallback
}
```

## Complete Examples

### File Upload with Progress Bar

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

// Usage
uploadFile({
  file: selectedFile,
  onProgress: (percent) => {
    console.log(`Upload progress: ${percent}%`)
  },
  onSuccess: (data) => {
    console.log('Upload success:', data)
  },
  onError: (error) => {
    console.error('Upload failed:', error)
  }
})
```

### Large File Chunk Upload

```typescript
import { request } from '@yh-ui/request'

interface ChunkUploadOptions {
  file: File
  chunkSize?: number
  onProgress?: (percent: number) => void
}

const uploadFileInChunks = async (options: ChunkUploadOptions) => {
  const { file, chunkSize = 1024 * 1024, onProgress } = options // Default 1MB

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
        // Calculate overall progress
        const chunkProgress = (i / totalChunks) * 100
        const currentChunkProgress =
          (progressEvent.loaded / progressEvent.total) * (1 / totalChunks) * 100
        const totalProgress = Math.round(chunkProgress + currentChunkProgress)
        onProgress?.(totalProgress)
      }
    })

    uploadedChunks.push(i)
  }

  // Notify server to merge chunks
  await request.post('/api/upload/merge', {
    filename: file.name,
    totalChunks
  })
}
```

### File Download with Progress

```typescript
import { request } from '@yh-ui/request'

interface DownloadOptions {
  url: string
  filename?: string
  onProgress?: (percent: number) => void
}

const downloadFile = async (options: DownloadOptions) => {
  const { url, filename, onProgress } = options

  const response = await request.get(url, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      const rate = Math.round(progressEvent.rate || 0)
      const estimated = progressEvent.estimated

      console.log(`Download progress: ${percent}% | Speed: ${(rate / 1024).toFixed(1)} KB/s`)
      if (estimated) {
        console.log(`Estimated time remaining: ${(estimated / 1000).toFixed(1)} seconds`)
      }

      onProgress?.(progressEvent)
    }
  })

  // Handle download completion
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

### Batch Upload

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

  // Use semaphore to control concurrency
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

  // Batch concurrent upload
  for (let i = 0; i < files.length; i += concurrent) {
    const batch = files.slice(i, i + concurrent)
    await Promise.all(batch.map((file, index) => uploadFile(file, i + index)))
  }

  return results
}
```

## Integration with UI Components

### Using Progress Component

```vue
<template>
  <div class="upload-demo">
    <yh-button @click="triggerUpload"> Select File </yh-button>

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
    YhMessage.success('Upload success')
  } catch (error) {
    uploadStatus.value = 'exception'
    YhMessage.error('Upload failed')
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

### Using Slider Component for Custom Progress

```vue
<template>
  <div class="download-demo">
    <yh-button type="primary" :loading="downloading" @click="handleDownload">
      Download File
    </yh-button>

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

    // Handle download completion
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'large-file.zip'
    link.click()
    window.URL.revokeObjectURL(url)

    YhMessage.success('Download complete')
  } catch (error) {
    YhMessage.error('Download failed')
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

## Notes

### 1. Progress Event Compatibility

Progress event support across different adapters:

| Adapter         | Upload Progress | Download Progress | Notes                           |
| --------------- | --------------- | ----------------- | ------------------------------- |
| FetchAdapter    | ✅              | ✅                | Best support in modern browsers |
| XHRAdapter      | ✅              | ✅                | Legacy browser compatibility    |
| NodeHttpAdapter | ✅              | ✅                | Node.js environment             |

### 2. Large File Handling

For very large files (>100MB), it is recommended to:

- Use chunked uploads
- Set appropriate `chunkSize`
- Implement resumable uploads
- Consider using Web Workers for uploads

### 3. Progress Calculation

```typescript
// Standard way to calculate progress
const percent = Math.round((loaded / total) * 100)

// Handle case when total is 0
const percent = total > 0 ? Math.round((loaded / total) * 100) : 0
```

## Next Steps

- [Integration with UI Components](./integration) - Implement complete upload/download with YH-UI components
- [Error Handling](./error) - Error handling best practices
