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

## 交互式传输进度演示

在下方的测试沙盒中，您可以模拟**文件上传**或**文件下载**流程。支持自定义配置**文件大小**和**模拟网速限额**，并可在传输过程中实时进行**暂停**、**恢复**以及**取消/中止**（底层基于 AbortController 拦截）操作。控制台与进度面板将实时展现当前的传输指标和状态变化。

<DemoBlock title="API 请求传输进度沙盒 (上传与下载进度监听与中止)" :ts-code="tsUploadDownloadDemo" :js-code="toJs(tsUploadDownloadDemo)">
  <div class="interactive-demo-container">
    <div class="control-panel">
      <!-- 模式选择 -->
      <div class="panel-item">
        <label>传输模式 (Mode):</label>
        <div class="mode-tabs">
          <button class="mode-tab" :class="{ active: mode === 'upload' }" @click="setMode('upload')" :disabled="status === 'running' || status === 'paused'">文件上传</button>
          <button class="mode-tab" :class="{ active: mode === 'download' }" @click="setMode('download')" :disabled="status === 'running' || status === 'paused'">文件下载</button>
        </div>
      </div>
      <!-- 文件大小 -->
      <div class="panel-item">
        <label>虚拟文件大小 (File Size): <span class="highlight-val">{{ fileSize }} MB</span></label>
        <div class="button-group">
          <yh-button v-for="size in [10, 50, 200]" :key="size" :type="fileSize === size ? 'primary' : 'default'" size="small" :disabled="status === 'running' || status === 'paused'" @click="fileSize = size">
            {{ size }} MB
          </yh-button>
        </div>
      </div>
      <!-- 网速限制 -->
      <div class="panel-item">
        <label>模拟网速限制 (Speed Limit): <span class="highlight-val">{{ formatSpeedLimit(speedLimit) }}</span></label>
        <div class="button-group">
          <yh-button v-for="spd in [512, 2048, 10240, -1]" :key="spd" :type="speedLimit === spd ? 'primary' : 'default'" size="small" @click="speedLimit = spd">
            {{ formatSpeedLimit(spd) }}
          </yh-button>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <yh-button v-if="status === 'idle' || status === 'success' || status === 'aborted'" type="primary" @click="startTransfer">
          开始{{ mode === 'upload' ? '上传' : '下载' }}
        </yh-button>
        <template v-else>
          <yh-button v-if="status === 'running'" type="warning" @click="pauseTransfer">暂停</yh-button>
          <yh-button v-if="status === 'paused'" type="success" @click="resumeTransfer">恢复</yh-button>
          <yh-button type="danger" @click="cancelTransfer">取消 / 中止</yh-button>
        </template>
        <yh-button @click="clearLogs" :disabled="logs.length === 0">清空控制台</yh-button>
      </div>
    </div>
    <!-- 进度与指标可视化 -->
    <div class="visual-panel">
      <div class="visual-header">
        <span class="status-indicator" :class="statusClass"></span>
        <span style="font-weight:600; font-size:13px">{{ mode === 'upload' ? '上传任务监控' : '下载任务监控' }}</span>
      </div>
      <div class="visual-body">
        <!-- 进度条 -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :class="status" :style="{ width: progress + '%' }"></div>
        </div>
        <!-- 数据指标表格 -->
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-label">当前状态</span>
            <span class="stat-value" :class="statusClass">{{ statusText }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">传输进度</span>
            <span class="stat-value">{{ progress }}% ({{ formatSize(loadedBytes) }} / {{ formatSize(totalBytes) }})</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">当前速率</span>
            <span class="stat-value">{{ formatSpeed(transferRate) }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">剩余时间</span>
            <span class="stat-value">{{ formatTime(etaSeconds) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 终端报文输出 -->
  <div class="terminal-panel" style="margin-top: 16px;">
    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="title">传输数据报文监听 (Progress Event Streams)</span>
    </div>
    <div class="terminal-body">
      <div v-if="logs.length === 0" class="empty-log">请点击“开始上传/下载”观察进度回调报文...</div>
      <div v-for="(log, i) in logs" :key="i" class="log-line" :class="{ 'log-success': log.includes('✅') || log.includes('完成'), 'log-error': log.includes('❌') || log.includes('中断') || log.includes('取消'), 'log-info': log.includes('-->') || log.includes('⏳') || log.includes('⏸️') || log.includes('▶️') }">
        {{ log }}
      </div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
    case 'idle': return '待机 (Idle)'
    case 'running': return mode.value === 'upload' ? '正在上传 (Uploading)' : '正在下载 (Downloading)'
    case 'paused': return '已暂停 (Paused)'
    case 'aborted': return '已取消 (Aborted)'
    case 'success': return '已完成 (Finished)'
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
  if (limit === -1) return '无限制'
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
  if (!(seconds >= 1)) return '即刻'
  return seconds.toFixed(1) + ' 秒'
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
  addLog(`--> 发起文件${mode.value === 'upload' ? '上传' : '下载'}: POST ${endpoint} (大小: ${fileSize.value} MB)`)
  addLog(`⚙️ 配置网速上限: ${formatSpeedLimit(speedLimit.value)}`)

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

    if (duration <= 0) return

    let bytesToTransfer = 0
    if (speedLimit.value === -1) {
      // 瞬间传输完
      bytesToTransfer = totalBytes.value - loadedBytes.value
    } else {
      bytesToTransfer = speedLimit.value * 1024 * duration
    }

    // 添加一些微弱波动使之真实
    if (speedLimit.value !== -1) {
      bytesToTransfer *= (0.93 + Math.random() * 0.14)
    }

    loadedBytes.value = Math.min(totalBytes.value, loadedBytes.value + bytesToTransfer)
    progress.value = Math.round((loadedBytes.value / totalBytes.value) * 100)

    const actualDiff = loadedBytes.value - lastLoaded
    lastLoaded = loadedBytes.value

    transferRate.value = duration > 0 ? (actualDiff / duration) : 0
    etaSeconds.value = transferRate.value > 0 ? (totalBytes.value - loadedBytes.value) / transferRate.value : 0

    // 每 10% 进度打印一次日志，或者达到 100% 打印
    const prevPercent = Math.round(((loadedBytes.value - actualDiff) / totalBytes.value) * 100)
    const currentPercent = progress.value
    
    if (currentPercent >= 100) {
      progress.value = 100
      loadedBytes.value = totalBytes.value
      transferRate.value = 0
      etaSeconds.value = 0
      status.value = 'success'
      addLog(`⏳ 进度: 100% | 已传输: ${formatSize(totalBytes.value)} / ${formatSize(totalBytes.value)}`)
      addLog(`✅ 传输完成！HTTP/1.1 200 OK (文件传输流关闭)`)
      clearInterval(timer)
    } else if (Math.floor(currentPercent / 10) > Math.floor(prevPercent / 10)) {
      addLog(`⏳ 进度: ${currentPercent}% | 已传输: ${formatSize(loadedBytes.value)} | 速率: ${formatSpeed(transferRate.value)} | 剩余: ${formatTime(etaSeconds.value)}`)
    }
  }, 100)
}

const pauseTransfer = () => {
  if (status.value !== 'running') return
  status.value = 'paused'
  clearInterval(timer)
  addLog(`⏸️ 传输暂停 (Connection paused)`)
}

const resumeTransfer = () => {
  if (status.value !== 'paused') return
  status.value = 'running'
  addLog(`▶️ 传输恢复 (Connection resumed)`)
  lastTime = Date.now()
  lastLoaded = loadedBytes.value
  runTick()
}

const cancelTransfer = () => {
  clearInterval(timer)
  status.value = 'aborted'
  transferRate.value = 0
  etaSeconds.value = 0
  addLog(`❌ [AbortController] 传输已由用户主动取消 / 中止 (Request aborted)`)
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
      <yh-button type="primary" @click="startUpload">开始上传 (Upload)</yh-button>
      <yh-button type="success" @click="startDownload">开始下载 (Download)</yh-button>
      <yh-button type="danger" @click="cancelTransfer">取消传输 (Cancel)</yh-button>
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
        console.log(\`上传进度: \${e.percent}%\`)
      }
    })
  } catch (err) {
    console.log('传输已取消或失败', err)
  }
}

const startDownload = async () => {
  abortController = new AbortController()
  try {
    await request.get('/api/download/file', {
      signal: abortController.signal,
      responseType: 'blob',
      onDownloadProgress: (e) => {
        console.log(\`下载进度: \${e.percent}%\`)
      }
    })
  } catch (err) {
    console.log('传输已取消或失败', err)
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
