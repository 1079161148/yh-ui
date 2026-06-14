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

## Interactive Transfer Progress Demo

In the testing sandbox below, you can simulate the **file upload** or **file download** process. It supports configuring the **file size** and **simulated speed limit**, and allows real-time operations like **Pause**, **Resume**, and **Cancel/Abort** (implemented under the hood using AbortController) during transmission. The console and progress panel will display the current transmission metrics and status changes in real-time.

<DemoBlock title="API Request Transfer Progress Sandbox (Upload and Download Progress and Abort)" :ts-code="tsUploadDownloadDemo" :js-code="toJs(tsUploadDownloadDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <!-- Mode Selection -->
      <div class="panel-item">
        <label>Transfer Mode (Mode):</label>
        <div class="mode-tabs">
          <button class="mode-tab" :class="{ active: mode === 'upload' }" @click="setMode('upload')" :disabled="status === 'running' || status === 'paused'">File Upload</button>
          <button class="mode-tab" :class="{ active: mode === 'download' }" @click="setMode('download')" :disabled="status === 'running' || status === 'paused'">File Download</button>
        </div>
      </div>
      <!-- File Size -->
      <div class="panel-item">
        <label>Virtual File Size (File Size): <span class="highlight-val">{{ fileSize }} MB</span></label>
        <div class="button-group">
          <yh-button v-for="size in [10, 50, 200]" :key="size" :type="fileSize === size ? 'primary' : 'default'" size="small" :disabled="status === 'running' || status === 'paused'" @click="fileSize = size">
            {{ size }} MB
          </yh-button>
        </div>
      </div>
      <!-- Speed Limit -->
      <div class="panel-item">
        <label>Simulated Speed Limit (Speed Limit): <span class="highlight-val">{{ formatSpeedLimit(speedLimit) }}</span></label>
        <div class="button-group">
          <yh-button v-for="spd in [512, 2048, 10240, -1]" :key="spd" :type="speedLimit === spd ? 'primary' : 'default'" size="small" @click="speedLimit = spd">
            {{ formatSpeedLimit(spd) }}
          </yh-button>
        </div>
      </div>
      <!-- Control Buttons -->
      <div class="action-buttons">
        <yh-button v-if="status === 'idle' || status === 'success' || status === 'aborted'" type="primary" @click="startTransfer">
          Start {{ mode === 'upload' ? 'Upload' : 'Download' }}
        </yh-button>
        <template v-else>
          <yh-button v-if="status === 'running'" type="warning" @click="pauseTransfer">Pause</yh-button>
          <yh-button v-if="status === 'paused'" type="success" @click="resumeTransfer">Resume</yh-button>
          <yh-button type="danger" @click="cancelTransfer">Cancel / Abort</yh-button>
        </template>
        <yh-button @click="clearLogs" :disabled="logs.length === 0">Clear Console</yh-button>
      </div>
    </div>
    <!-- Progress & Metrics Visualization -->
    <div class="visual-panel">
      <div class="visual-header">
        <span class="status-indicator" :class="statusClass"></span>
        <span style="font-weight:600; font-size:13px">{{ mode === 'upload' ? 'Upload Task Monitor' : 'Download Task Monitor' }}</span>
      </div>
      <div class="visual-body">
        <!-- Progress Bar -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :class="status" :style="{ width: progress + '%' }"></div>
        </div>
        <!-- Metrics Stats Grid -->
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-label">Status</span>
            <span class="stat-value" :class="statusClass">{{ statusText }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Progress</span>
            <span class="stat-value">{{ progress }}% ({{ formatSize(loadedBytes) }} / {{ formatSize(totalBytes) }})</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Speed</span>
            <span class="stat-value">{{ formatSpeed(transferRate) }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">ETA</span>
            <span class="stat-value">{{ formatTime(etaSeconds) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Terminal Stream Logs -->
  <div class="terminal-panel" style="margin-top: 16px;">
    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="title">Transfer Stream Logs (Progress Event Streams)</span>
    </div>
    <div class="terminal-body">
      <div v-if="logs.length === 0" class="empty-log">Click "Start Upload/Download" to observe progress callbacks...</div>
      <div v-for="(log, i) in logs" :key="i" class="log-line" :class="{ 'log-success': log.includes('✅') || log.includes('completed'), 'log-error': log.includes('❌') || log.includes('aborted'), 'log-info': log.includes('-->') || log.includes('⏳') || log.includes('⏸️') || log.includes('▶️') }">
        {{ log }}
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const mode = ref<'upload' | 'download'>('upload')
const fileSize = ref(50) // MB
const speedLimit = ref(2048) // KB/s
const progress = ref(0)
const loadedBytes = ref(0)
const transferRate = ref(0)
const etaSeconds = ref(0)
const status = ref<'idle' | 'running' | 'paused' | 'aborted' | 'success'>('idle')
const logs = ref<string[]>([])

const totalBytes = computed(() => fileSize.value * 1024 * 1024)

let timer: any = null
let lastTime = 0
let lastLoaded = 0

const statusClass = computed(() => {
  return {
    'status-idle': status.value === 'idle',
    'status-running': status.value === 'running',
    'status-paused': status.value === 'paused',
    'status-aborted': status.value === 'aborted',
    'status-success': status.value === 'success'
  }
})

const statusText = computed(() => {
  switch (status.value) {
    case 'idle': return 'Idle'
    case 'running': return mode.value === 'upload' ? 'Uploading' : 'Downloading'
    case 'paused': return 'Paused'
    case 'aborted': return 'Aborted'
    case 'success': return 'Completed'
    default: return ''
  }
})

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatSpeedLimit = (limit: number) => {
  if (limit === -1) return 'Unlimited'
  if (limit >= 1024) return (limit / 1024).toFixed(1) + ' MB/s'
  return limit + ' KB/s'
}

const formatSpeed = (bytesPerSec: number) => {
  if (status.value !== 'running') return '0 B/s'
  if (!(bytesPerSec >= 1024)) return `${bytesPerSec.toFixed(0)} B/s`
  if (!(bytesPerSec >= 1024 * 1024)) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`
  return `${(bytesPerSec / 1024 / 1024).toFixed(1)} MB/s`
}

const formatTime = (seconds: number) => {
  if (status.value !== 'running' || seconds === Infinity || !(seconds >= 0)) return '--'
  if (!(seconds >= 1)) return 'instant'
  return seconds.toFixed(1) + ' s'
}

const addLog = (msg: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.push(`[${time}] ${msg}`)
}

const setMode = (m: 'upload' | 'download') => {
  mode.value = m
  resetSimulation()
}

const resetSimulation = () => {
  clearInterval(timer)
  progress.value = 0
  loadedBytes.value = 0
  transferRate.value = 0
  etaSeconds.value = 0
  status.value = 'idle'
}

const startTransfer = () => {
  resetSimulation()
  status.value = 'running'
  
  const endpoint = mode.value === 'upload' ? '/api/upload' : '/api/download/file'
  addLog(`--> Initiating file ${mode.value === 'upload' ? 'upload' : 'download'}: POST ${endpoint} (Size: ${fileSize.value} MB)`)
  addLog(`⚙️ Configured speed limit: ${formatSpeedLimit(speedLimit.value)}`)

  lastTime = Date.now()
  lastLoaded = 0
  runTick()
}

const runTick = () => {
  timer = setInterval(() => {
    if (status.value !== 'running') return

    const now = Date.now()
    const duration = (now - lastTime) / 1000 // sec
    lastTime = now

    if (!(duration >= 0)) return

    let bytesToTransfer = 0
    if (speedLimit.value === -1) {
      bytesToTransfer = totalBytes.value - loadedBytes.value
    } else {
      bytesToTransfer = speedLimit.value * 1024 * duration
    }

    if (speedLimit.value !== -1) {
      bytesToTransfer *= (0.93 + Math.random() * 0.14)
    }

    loadedBytes.value = Math.min(totalBytes.value, loadedBytes.value + bytesToTransfer)
    progress.value = Math.round((loadedBytes.value / totalBytes.value) * 100)

    const actualDiff = loadedBytes.value - lastLoaded
    lastLoaded = loadedBytes.value

    transferRate.value = duration > 0 ? (actualDiff / duration) : 0
    etaSeconds.value = transferRate.value > 0 ? (totalBytes.value - loadedBytes.value) / transferRate.value : 0

    const prevPercent = Math.round(((loadedBytes.value - actualDiff) / totalBytes.value) * 100)
    const currentPercent = progress.value
    
    if (currentPercent >= 100) {
      progress.value = 100
      loadedBytes.value = totalBytes.value
      transferRate.value = 0
      etaSeconds.value = 0
      status.value = 'success'
      addLog(`⏳ Progress: 100% | Transferred: ${formatSize(totalBytes.value)} / ${formatSize(totalBytes.value)}`)
      addLog(`✅ Transmission completed! HTTP/1.1 200 OK (File transfer stream closed)`)
      clearInterval(timer)
    } else if (Math.floor(currentPercent / 10) > Math.floor(prevPercent / 10)) {
      addLog(`⏳ Progress: ${currentPercent}% | Transferred: ${formatSize(loadedBytes.value)} | Rate: ${formatSpeed(transferRate.value)} | ETA: ${formatTime(etaSeconds.value)}`)
    }
  }, 100)
}

const pauseTransfer = () => {
  if (status.value !== 'running') return
  status.value = 'paused'
  clearInterval(timer)
  addLog(`⏸️ Transmission paused (Connection paused)`)
}

const resumeTransfer = () => {
  if (status.value !== 'paused') return
  status.value = 'running'
  addLog(`▶️ Transmission resumed (Connection resumed)`)
  lastTime = Date.now()
  lastLoaded = loadedBytes.value
  runTick()
}

const cancelTransfer = () => {
  clearInterval(timer)
  status.value = 'aborted'
  transferRate.value = 0
  etaSeconds.value = 0
  addLog(`❌ [AbortController] Transmission aborted by user (Request aborted)`)
}

const clearLogs = () => {
  logs.value = []
}

onBeforeUnmount(() => {
  clearInterval(timer)
})

const tsUploadDownloadDemo = `<${_T}>
  <div style="display:flex; flex-direction:column; gap:12px">
    <div style="display:flex; gap:8px">
      <yh-button type="primary" @click="startUpload">Start Upload (Upload)</yh-button>
      <yh-button type="success" @click="startDownload">Start Download (Download)</yh-button>
      <yh-button type="danger" @click="cancelTransfer">Cancel Transmission (Cancel)</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import { createRequest } from '@yh-ui/request'

const request = createRequest()
let abortController: AbortController | null = null

const startUpload = async () => {
  abortController = new AbortController()
  const file = new File(['hello'], 'demo.txt')
  const formData = new FormData()
  formData.append('file', file)

  try {
    await request.post('/api/upload', formData, {
      signal: abortController.signal,
      onUploadProgress: (e) => {
        console.log(\`Upload progress: \${e.percent}%\`)
      }
    })
  } catch (err) {
    console.log('Transmission cancelled or failed', err)
  }
}

const startDownload = async () => {
  abortController = new AbortController()
  try {
    await request.get('/api/download/file', {
      signal: abortController.signal,
      responseType: 'blob',
      onDownloadProgress: (e) => {
        console.log(\`Download progress: \${e.percent}%\`)
      }
    })
  } catch (err) {
    console.log('Transmission cancelled or failed', err)
  }
}

const cancelTransfer = () => {
  if (abortController) {
    abortController.abort()
  }
}
</${_S}>`
</script>

<style>
.mode-tabs {
  display: flex;
  background: var(--vp-c-bg-mute, #eaeaea);
  border-radius: 6px;
  padding: 2px;
  width: fit-content;
}
.mode-tab {
  border: none;
  background: transparent;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}
.mode-tab:hover:not(:disabled) {
  color: var(--vp-c-text-1);
}
.mode-tab.active {
  background: var(--vp-c-bg);
  color: var(--yh-color-primary, #409eff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.mode-tab:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.visual-panel {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--yh-border-color-light, #ebeef5);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}
.visual-header {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--yh-border-color-light, #ebeef5);
  padding-bottom: 8px;
}
.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.status-idle { background: #909399; }
.status-running { background: #409eff; animation: blink-indicator 1.2s infinite alternate; }
.status-paused { background: #e6a23c; }
.status-aborted { background: #f56c6c; }
.status-success { background: #67c23a; }

@keyframes blink-indicator {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

.visual-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.progress-bar-container {
  width: 100%;
  height: 10px;
  background: var(--vp-c-bg-mute, #eaeaea);
  border-radius: 5px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  transition: width 0.1s linear;
}
.progress-bar-fill.idle { background: #909399; }
.progress-bar-fill.running { background: linear-gradient(90deg, #409eff, #3a8ee6); }
.progress-bar-fill.paused { background: #e6a23c; }
.progress-bar-fill.aborted { background: #f56c6c; }
.progress-bar-fill.success { background: #67c23a; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.stat-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--yh-border-color-light, #ebeef5);
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}
.stat-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.stat-value.status-idle { color: #909399; }
.stat-value.status-running { color: #409eff; }
.stat-value.status-paused { color: #e6a23c; }
.stat-value.status-aborted { color: #f56c6c; }
.stat-value.status-success { color: #67c23a; }
</style>

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
