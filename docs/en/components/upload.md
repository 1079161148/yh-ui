<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { UploadFile, UploadRawFile, UploadInstance, UploadRequestOptions } from '@yh-ui/components'

const fileListStandard = ref([
  { name: 'yh-ui-manual.pdf', status: 'success', uid: 1, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { name: 'business-report.docx', status: 'success', uid: 3, url: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,UEsDBBQAAAAIA...' },
  { name: 'example-image.png', status: 'success', uid: 2, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' }
])

const fileListPicture = ref([
  { name: 'food.jpeg', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200', status: 'success', uid: 1 }
])

const fileListCard = ref([
  { name: 'nature.jpeg', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200', status: 'success', uid: 1 }
])

const fileListDrag = ref([])
const fileListDirectory = ref([])
const fileListManual = ref([])
const uploadManualRef = ref()
const fileListAdvanced = ref([])
const fileListIcons = ref([
  { name: 'Financial_Report.xlsx', status: 'success', uid: 1 },
  { name: 'Project_Spec.pdf', status: 'success', uid: 2 },
  { name: 'Requirement_Doc.docx', status: 'success', uid: 3 },
  { name: 'Demo_Video.mp4', status: 'success', uid: 4 },
  { name: 'BGM.mp3', status: 'success', uid: 5 },
  { name: 'readme.txt', status: 'success', uid: 6 },
  { name: 'Unknown_File.dat', status: 'success', uid: 7 }
])
const fileListAvatar = ref([
  { name: 'avatar.png', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200' }
])
const uploadAvatarRef = ref()
const fileListThumb = ref([
  { name: 'thumb-demo.jpg', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200' }
])
const fileListLimit = ref([])
const fileListOverwrite = ref([])
const uploadOverwriteRef = ref()

const fileListPos = ref([
  { name: 'mountain.jpg', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200' }
])

// --- Handlers ---
const handleAvatarExceed = (files: File[]) => {
  fileListAvatar.value = []
  uploadAvatarRef.value?.handleFiles(files)
}

const handleOverwriteExceed = (files: File[]) => {
  fileListOverwrite.value = []
  uploadOverwriteRef.value?.handleFiles(files)
}

const handleCustomRequest = (options: UploadRequestOptions) => {
  console.log('Custom Request Executed', options)
  options.onSuccess({ status: 'ok' })
}

const handleDownloadLog = (file: UploadFile) => {
  console.log('Download triggered:', file)
}

const handleThumbnailRequest = (file: UploadRawFile) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
  })
}

const handlePreviewItem = (file: UploadFile) => {
  alert('Previewing: ' + file.name)
}

const handleRemoveItem = (file: UploadFile) => {
  fileListAdvanced.value = fileListAdvanced.value.filter((f: UploadFile) => f.uid !== file.uid)
}

// Business: Image Compression
const beforeUploadCompress = (file: File) => {
  console.log('Original size:', file.size / 1024, 'KB')
  if (file.size > 2 * 1024 * 1024) {
    alert('File is too large, intercepted by beforeUpload')
    return false
  }
  return true
}

// Helper for JSON preview
const json = (val: unknown) => JSON.stringify(val, null, 2)

// --- Snippets ---
const tsBasic = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    multiple
  >
    <yh-button type="primary">Click to Upload</yh-button>
    <template #tip>
      <div class="yh-upload__tip">Only pdf/png files allowed, max 2MB</div>
    </template>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'yh-ui-design.pdf', status: 'success', uid: 1 },
  { name: 'logo.png', status: 'uploading', percentage: 65, uid: 2 }
])
</${_S}>`

const tsPicture = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture"
    accept="image/*"
  >
    <yh-button type="primary">Click to Upload</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { 
    name: 'food.jpeg', 
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200', 
    status: 'success', 
    uid: 1 
  }
])
</${_S}>`

const tsCard = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture-card"
    accept="image/*"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { 
    name: 'nature.jpeg', 
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200', 
    status: 'success', 
    uid: 1 
  }
])
</${_S}>`

const tsDrag = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    drag
    action="https://httpbin.org/post"
    multiple
    accept="image/*, .pdf"
  >
    <yh-icon name="upload" class="yh-upload__icon" :size="48" />
    <div class="yh-upload__text">Drop file here, or <em>click to upload</em></div>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])
</${_S}>`

const tsDirectory = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    directory
  >
    <yh-button type="primary">Upload Directory</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])
</${_S}>`

const tsManual = `<${_T}>
  <yh-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :auto-upload="false"
  >
    <template #trigger>
      <yh-button type="primary">Select Files</yh-button>
    </template>
    <yh-button 
      class="upload-submit-btn"
      type="success" 
      @click="submitUpload"
    >
      Upload to Server
    </yh-button>
    <template #tip>
      <div class="yh-upload__tip">Only pdf/png files allowed, max 2MB</div>
    </template>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance } from '@yh-ui/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([])

const submitUpload = () => {
  uploadRef.value?.submit()
}
</${_S}>

<${_St} scoped>
.upload-submit-btn {
  margin-left: 12px;
}
</${_St}>`

const tsCustomUpload = `<${_T}>
  <yh-upload
    action="#"
    :http-request="customUpload"
  >
    <yh-button type="primary">Custom Upload</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
const customUpload = (options) => {
  const { file, onProgress, onSuccess, onError } = options
  console.log('Starting custom upload...', file)
  
  // Simulate upload process
  let percent = 0
  const timer = setInterval(() => {
    percent += 20
    onProgress({ percent })
    if (percent >= 100) {
      clearInterval(timer)
      onSuccess({ message: 'Upload Success' })
    }
  }, 200)
}
</${_S}>`

const tsDownload = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    show-download
    @download="handleDownload"
  >
    <yh-button type="primary">Click to Upload</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'yh-ui-manual.pdf', status: 'success', uid: 1, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { name: 'business-report.docx', status: 'success', uid: 3, url: 'https://example.com/files/report.docx' },
  { name: 'example-image.png', status: 'success', uid: 2, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200' }
])

const handleDownload = (file) => {
  console.log('Downloading file:', file.name)
}
</${_S}>`

const tsAdvanced = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :before-upload="beforeUpload"
  >
    <yh-button type="primary">Click to Upload (Validation)</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    alert('Upload image must be JPG format!');
  }
  if (!isLt2M) {
    alert('Upload image size cannot exceed 2MB!');
  }
  return isJPG && isLt2M;
}
</${_S}>`

const tsThumb = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture"
    :thumbnail-request="generateThumb"
  >
    <yh-button type="primary">Custom Thumbnail</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])

const generateThumb = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}
</${_S}>`

const tsAvatar = `<${_T}>
  <yh-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture-card"
    :limit="1"
    @exceed="handleExceed"
  >
    <yh-icon v-if="fileList.length === 0" name="plus" :size="28" />
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance } from '@yh-ui/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([
  { name: 'avatar.png', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200' }
])

const handleExceed = (files) => {
  fileList.value = []
  uploadRef.value?.handleFiles(files)
}
</${_S}>`

const tsPositionDemo = `<${_T}>
  <div class="pos-demo">
    <yh-upload
      v-model:file-list="fileList"
      action="https://httpbin.org/post"
      list-type="picture-card"
      trigger-position="left"
      show-download
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'mountain.jpg', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200' }
])
</${_S}>`

const tsOverwrite = `<${_T}>
  <yh-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :limit="1"
    @exceed="handleExceed"
  >
    <yh-button type="primary">Select file to overwrite</yh-button>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance } from '@yh-ui/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([])

const handleExceed = (files) => {
  fileList.value = []
  uploadRef.value?.handleFiles(files)
}
</${_S}>`

const tsIconsDemo = `<${_T}>
  <div class="upload-icons-demo">
    <yh-upload v-model:file-list="fileList" action="https://httpbin.org/post">
      <yh-button type="primary">Auto Icon Matching</yh-button>
    </yh-upload>

    <yh-upload v-model:file-list="fileList" action="https://httpbin.org/post">
      <template #file-icon="{ file }">
        <yh-icon v-if="file.name.endsWith('.xlsx')" name="search" color="#67c23a" :size="20" />
        <yh-icon v-else-if="file.name.endsWith('.pdf')" name="star" color="#f56c6c" :size="20" />
        <yh-icon v-else name="attachment" :size="20" />
      </template>
      <yh-button type="success">Custom Icon via Slot</yh-button>
    </yh-upload>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'Financial_Report.xlsx', status: 'success', uid: 1 },
  { name: 'Project_Spec.pdf', status: 'success', uid: 2 }
])
</${_S}>

<${_St} scoped>
.upload-icons-demo {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</${_St}>`

const tsCustomSlot = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
  >
    <yh-button type="primary">Custom List Content</yh-button>
    <template #file="{ file }">
      <div class="custom-item">
        <div class="custom-info">
          <yh-icon name="attachment" :size="16" />
          <span class="custom-name">{{ file.name }}</span>
        </div>
        <div class="custom-actions">
           <yh-button type="primary" size="small" plain @click="handlePreview(file)">Preview</yh-button>
           <yh-button type="danger" size="small" plain @click="handleRemove(file)">Remove</yh-button>
        </div>
      </div>
    </template>
  </yh-upload>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'custom-item-demo.pdf', status: 'success', uid: 1 }
])

const handlePreview = (file) => {
  alert('Previewing file: ' + file.name)
}

const handleRemove = (file) => {
  fileList.value = fileList.value.filter(f => f.uid !== file.uid)
}
</${_S}>

<${_St} scoped>
.custom-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin-top: 10px;
  background: #fdfdfd;
}
.custom-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.custom-name {
  font-size: 14px;
  color: #606266;
}
.custom-actions {
  display: flex;
  gap: 8px;
}
</${_St}>`

const tsPreview = `<${_T}>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture-card"
    @preview="handlePreview"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { 
    name: 'nature.jpeg', 
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200', 
    status: 'success', 
    uid: 1 
  }
])

const handlePreview = (file) => {
  console.log('Preview clicked:', file)
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsPicture = toJs(tsPicture)
const jsCard = toJs(tsCard)
const jsDrag = toJs(tsDrag)
const jsDirectory = toJs(tsDirectory)
const jsManual = toJs(tsManual)
const jsCustomUpload = toJs(tsCustomUpload)
const jsDownload = toJs(tsDownload)
const jsAdvanced = toJs(tsAdvanced)
const jsThumb = toJs(tsThumb)
const jsAvatar = toJs(tsAvatar)
const jsPositionDemo = toJs(tsPositionDemo)
const jsOverwrite = toJs(tsOverwrite)
const jsIconsDemo = toJs(tsIconsDemo)
const jsCustomSlot = toJs(tsCustomSlot)
const jsPreview = toJs(tsPreview)
</script>

# Upload

Upload files by clicking or dragging.

## Basic Usage

The most common upload method, supporting multi-selection.

<DemoBlock :tsCode="tsBasic" :jsCode="jsBasic">
  <yh-upload
    v-model:file-list="fileListStandard"
    action="https://httpbin.org/post"
    multiple
  >
    <yh-button type="primary">Click to Upload</yh-button>
    <template #tip>
      <div class="yh-upload__tip">Only pdf/png files allowed, max 2MB</div>
    </template>
  </yh-upload>
  
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListStandard)"></pre>
  </div>
</DemoBlock>


## Photo Wall

Suitable for avatars or product images.

<DemoBlock :tsCode="tsCard" :jsCode="jsCard">
  <yh-upload
    v-model:file-list="fileListCard"
    action="https://httpbin.org/post"
    list-type="picture-card"
    accept="image/*"
  />
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListCard)"></pre>
  </div>
</DemoBlock>


## Drag & Drop

<DemoBlock :tsCode="tsDrag" :jsCode="jsDrag">
  <yh-upload
    v-model:file-list="fileListDrag"
    drag
    action="https://httpbin.org/post"
    multiple
    accept="image/*, .pdf"
  >
    <div class="dragger-content">
      <yh-icon name="upload" class="yh-upload__icon" :size="48" />
      <div class="yh-upload__text">Drop files here, or <em>click to upload</em></div>
    </div>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListDrag)"></pre>
  </div>
</DemoBlock>


## Directory Upload

Enable folder upload via the `directory` attribute. Once enabled, only folders can be selected; files within the folder will be flattened and uploaded sequentially.

<DemoBlock :tsCode="tsDirectory" :jsCode="jsDirectory">
  <yh-upload
    v-model:file-list="fileListDirectory"
    action="https://httpbin.org/post"
    directory
  >
    <yh-button type="primary">Upload Directory</yh-button>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListDirectory)"></pre>
  </div>
</DemoBlock>


## Manual Upload

Disable automatic upload by setting the `auto-upload` attribute to `false`, then manually trigger upload by calling the `submit` method of the component instance.

<DemoBlock :tsCode="tsManual" :jsCode="jsManual">
  <yh-upload
    ref="uploadManualRef"
    v-model:file-list="fileListManual"
    action="https://httpbin.org/post"
    :auto-upload="false"
  >
    <template #trigger>
      <yh-button type="primary">Select Files</yh-button>
    </template>
    <yh-button 
      style="margin-left: 12px" 
      type="success" 
      @click="uploadManualRef?.submit()"
    >
      Upload to Server
    </yh-button>
    <template #tip>
      <div class="yh-upload__tip">Only pdf/png files allowed, max 2MB</div>
    </template>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListManual)"></pre>
  </div>
</DemoBlock>


## Image List Mode

<DemoBlock :tsCode="tsPicture" :jsCode="jsPicture">
  <yh-upload
    v-model:file-list="fileListPicture"
    action="https://httpbin.org/post"
    list-type="picture"
    accept="image/*"
  >
    <yh-button type="primary">Click to Upload</yh-button>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListPicture)"></pre>
  </div>
</DemoBlock>

## Custom Upload

The `http-request` attribute allows you to completely customize the upload implementation logic, such as using your own axios instance or connecting to a specific cloud storage SDK.

<DemoBlock :tsCode="tsCustomUpload" :jsCode="jsCustomUpload">
  <yh-upload
    action="#"
    :http-request="handleCustomRequest"
  >
    <yh-button type="primary">Custom Upload Test</yh-button>
  </yh-upload>
</DemoBlock>

## Download & Custom Download

The download button can be displayed via the `show-download` attribute. Clicking the download button will trigger the `download` event.

> [!TIP]
> **About Download Functionality:** The component has built-in mandatory download logic based on Blob. However, please note that if the file is stored on a third-party server without Cross-Origin Resource Sharing (CORS) enabled, the browser may downgrade to "Open in new window preview" mode due to security policies. It is recommended to ensure that the static resource server has the `Access-Control-Allow-Origin` response header configured in production environments.

<DemoBlock :tsCode="tsDownload" :jsCode="jsDownload">
  <yh-upload
    v-model:file-list="fileListStandard"
    action="https://httpbin.org/post"
    show-download
    @download="handleDownloadLog"
  >
    <yh-button type="primary">Click to Upload</yh-button>
  </yh-upload>
</DemoBlock>

## Advanced Business: Validation & Compression

In actual business scenarios, we often need to check file size and type before uploading, or even compress images.

<DemoBlock :tsCode="tsAdvanced" :jsCode="jsAdvanced">
  <yh-upload
    v-model:file-list="fileListAdvanced"
    action="https://httpbin.org/post"
    :before-upload="beforeUploadCompress"
  >
    <yh-button type="primary">Click to Upload (Validation)</yh-button>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content" v-text="json(fileListAdvanced)"></pre>
  </div>
</DemoBlock>

## Custom Thumbnail

The `thumbnail-request` attribute gives you complete control over preview image generation logic. For example, performing quality compression on large images before displaying them, or returning different default placeholders based on file extensions.

<DemoBlock :tsCode="tsThumb" :jsCode="jsThumb">
  <yh-upload
    v-model:file-list="fileListThumb"
    action="https://httpbin.org/post"
    list-type="picture"
    :thumbnail-request="handleThumbnailRequest"
  >
    <yh-button type="primary">Custom Thumbnail</yh-button>
  </yh-upload>
</DemoBlock>

## Avatar Upload (Single Replacement)

A very practical case. Limit the upload quantity via `limit="1"` and use the `exceed` event to replace the old image with a new one directly for an "Avatar Upload" effect.

<DemoBlock :tsCode="tsAvatar" :jsCode="jsAvatar">
  <yh-upload
    ref="uploadAvatarRef"
    v-model:file-list="fileListAvatar"
    action="https://httpbin.org/post"
    list-type="picture-card"
    :limit="1"
    @exceed="handleAvatarExceed"
  >
    <yh-icon v-if="fileListAvatar.length === 0" name="plus" :size="28" />
  </yh-upload>
</DemoBlock>

## Photo Wall Position & Preview Download

The `trigger-position` attribute controls the position of the upload button relative to the list (`top` | `bottom` | `left` | `right`).
In `picture-card` mode, after enabling `show-download`, a download button will also appear when hovering over the preview image.

<DemoBlock :tsCode="tsPositionDemo" :jsCode="jsPositionDemo">
  <div class="demo-upload-vertical-20">
    <yh-upload
      v-model:file-list="fileListPos"
      action="https://httpbin.org/post"
      list-type="picture-card"
      trigger-position="left"
      show-download
    />
  </div>
</DemoBlock>

## Overwrite Previous File

By setting `limit="1"` and listening to the `exceed` event, you can achieve the effect of automatically replacing the previous file when a new file is selected.

<DemoBlock :tsCode="tsOverwrite" :jsCode="jsOverwrite">
  <yh-upload
    ref="uploadOverwriteRef"
    v-model:file-list="fileListOverwrite"
    action="https://httpbin.org/post"
    :limit="1"
    @exceed="handleOverwriteExceed"
  >
    <yh-button type="primary">Select file to overwrite</yh-button>
  </yh-upload>
</DemoBlock>

## File Type Icons

The component automatically matches corresponding icons based on file extensions (Word, Excel, PDF, video, audio, text, etc.). For unknown types, it displays an "Attachment" icon by default. You can also completely customize it via the `file-icon` slot.

<DemoBlock :tsCode="tsIconsDemo" :jsCode="jsIconsDemo">
  <div class="demo-upload-vertical-40">
    <yh-upload v-model:file-list="fileListIcons" action="https://httpbin.org/post">
      <yh-button type="primary">Auto Icon Matching</yh-button>
    </yh-upload>
    <yh-upload v-model:file-list="fileListIcons" action="https://httpbin.org/post">
      <template #file-icon="{ file }">
        <yh-icon v-if="file.name.endsWith('.xlsx')" name="search" color="#67c23a" :size="20" />
        <yh-icon v-else-if="file.name.endsWith('.pdf')" name="star" color="#f56c6c" :size="20" />
        <yh-icon v-else name="attachment" :size="20" />
      </template>
      <yh-button type="success">Custom Icon via Slot</yh-button>
    </yh-upload>
  </div>
</DemoBlock>

## Custom File List Slot

Use the `file` scoped slot to completely customize each item in the file list, satisfying more complex UI requirements.

<DemoBlock :tsCode="tsCustomSlot" :jsCode="jsCustomSlot">
  <yh-upload
    v-model:file-list="fileListAdvanced"
    action="https://httpbin.org/post"
  >
    <yh-button type="primary">Custom List Content</yh-button>
    <template #file="{ file }">
      <div class="custom-item">
        <div class="custom-info">
          <yh-icon name="attachment" :size="16" />
          <span class="custom-name">{{ file.name }}</span>
        </div>
        <div class="custom-actions">
           <yh-button type="primary" size="small" plain @click="handlePreviewItem(file)">Preview</yh-button>
           <yh-button type="danger" size="small" plain @click="handleRemoveItem(file)">Remove</yh-button>
        </div>
      </div>
    </template>
  </yh-upload>
</DemoBlock>

## File Preview Feature

By listening to the `preview` event, you can implement preview logic when clicking on a file. For image files, the component already has a built-in `viewerjs` preview engine.

<DemoBlock :tsCode="tsPreview" :jsCode="jsPreview">
  <yh-upload
    v-model:file-list="fileListCard"
    action="https://httpbin.org/post"
    list-type="picture-card"
    @preview="(file) => console.log('Preview image:', file)"
  />
</DemoBlock>


## Nuxt.js Usage Instructions

Since the `YhUpload` component internally uses browser-specific APIs such as `Viewer.js` and `FileReader`, please ensure it is placed within the `<ClientOnly>` component when using it in a Nuxt 3 (SSR) environment, or ensure that relevant interactions are only triggered during the client-side lifecycle (e.g., `onMounted`).

```vue
<template>
  <ClientOnly>
    <yh-upload action="/api/upload">
      <yh-button type="primary">Nuxt Upload File</yh-button>
    </yh-upload>
  </ClientOnly>
</template>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:file-list | Uploaded file list | `UploadFile[]` | `[]` |
| action | Upload target URL | `string` | - |
| method | Upload HTTP method | `string` | `'POST'` |
| headers | Set upload request headers | `Record<string, string>` | `{}` |
| data | Additional parameters with upload | `Record<string, unknown>` | `{}` |
| name | Upload file field name | `string` | `'file'` |
| multiple | Whether to support multi-selection | `boolean` | `false` |
| drag | Whether to enable drag-and-drop upload | `boolean` | `false` |
| accept | Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | `string` | - |
| showFileList | Whether to show the uploaded file list | `boolean` | `true` |
| limit | Maximum number of files allowed | `number` | - |
| autoUpload | Whether to upload immediately after selection | `boolean` | `true` |
| listType | File list display style | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| withCredentials | Support sending cookie credentials | `boolean` | `false` |
| httpRequest | Override default upload behavior | `(options: UploadRequestOptions) => void` | - |
| beforeUpload | Hook before file is uploaded | `(file: UploadRawFile) => boolean \| Promise<boolean \| Blob>` | - |
| beforeRemove | Hook before file is removed | `(file: UploadFile, fileList: UploadFile[]) => boolean \| Promise<boolean>` | - |
| disabled | Whether to disable upload | `boolean` | `false` |
| thumbnailRequest | Custom thumbnail generation logic | `(file: UploadRawFile) => Promise<string> \| string` | - |
| maxSize | File size limit (KB) | `number` | - |
| directory | Whether to enable folder upload. Flattened files within folders will be processed. | `boolean` | `false` |
| showDownload | Whether to show the download button | `boolean` | `false` |
| triggerPosition | Trigger position relative to the list | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| fileIcon | Custom file icon or icon generation function | `string \| ((file: UploadFile) => string)` | - |
| crossorigin | Native attribute [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) | `'anonymous' \| 'use-credentials' \| ''` | - |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| update:fileList | Triggered when the file list is updated | `(fileList: UploadFile[])` |
| change | Triggered when file status changes | `(file: UploadFile, fileList: UploadFile[])` |
| success | Triggered on successful upload | `(response: unknown, file: UploadFile, fileList: UploadFile[])` |
| error | Triggered on upload failure | `(error: Error, file: UploadFile, fileList: UploadFile[])` |
| progress | Triggered when upload progress changes | `(event: UploadProgressEvent, file: UploadFile, fileList: UploadFile[])` |
| remove | Triggered when a file is removed | `(file: UploadFile, fileList: UploadFile[])` |
| preview | Triggered on clicking file preview | `(file: UploadFile)` |
| download | Triggered on clicking file download | `(file: UploadFile)` |
| exceed | Triggered when selected files exceed limit | `(files: File[], fileList: UploadFile[])` |

### Slots

| Name | Description | Scope |
| --- | --- | --- |
| default | Content to trigger upload | - |
| trigger | Element to trigger selection (non-drag mode) | - |
| tip | Tip or description text | - |
| file | Custom file list item content | `{ file: UploadFile }` |
| file-icon | Custom file type icon | `{ file: UploadFile }` |

### Expose

| Method | Description | Parameters |
| --- | --- | --- |
| submit | Manually upload the pending file list | - |
| triggerInput | Manually evoke the file selection box | - |
| handleRemove | Manually remove a specific file | `(file: UploadFile)` |
| handlePreview | Manually trigger file preview | `(file: UploadFile)` |
| handleDownload | Manually trigger file download | `(file: UploadFile)` |
| handleFiles | Manually add and process file list | `(files: File[])` |

### Theme Variables (CSS Variables)

All color variables are connected to the global theme system and support dark mode automatically:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-upload-dragger-bg` | Drag area background color | `var(--yh-bg-color)` |
| `--yh-upload-dragger-border` | Drag area border color | `var(--yh-border-color-light)` |
| `--yh-upload-dragger-hover-border` | Drag area hover border color | `var(--yh-color-primary)` |
| `--yh-upload-item-bg` | List item background color | `var(--yh-fill-color-blank)` |
| `--yh-upload-item-hover-bg` | List item hover background color | `var(--yh-fill-color-light)` |
| `--yh-upload-text-color` | Text color | `var(--yh-text-color-regular)` |
| `--yh-upload-text-secondary` | Secondary text color | `var(--yh-text-color-secondary)` |
| `--yh-upload-progress-bg` | Progress bar background color | `var(--yh-color-primary)` |
| `--yh-upload-card-radius` | Photo wall card border radius | `var(--yh-radius-md)` |


<style scoped>
.yh-upload__dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.dragger-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.yh-upload__icon {
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #909399;
  pointer-events: none;
}

.yh-upload__dragger:hover .yh-upload__icon {
  color: #409eff;
  transform: translateY(-4px);
}

.yh-upload__text {
  margin-top: 16px;
  color: #606266;
  font-size: 14px;
  pointer-events: none;
}

.yh-upload__text em {
  color: #409eff;
  font-style: normal;
  font-weight: 500;
  margin-left: 4px;
  transition: text-decoration 0.3s;
}

.yh-upload__dragger:hover .yh-upload__text em {
  text-decoration: underline;
}

/* Button alignment optimization */
.yh-button--primary {
  margin: 0;
}

.yh-upload__trigger {
  display: flex !important;
  align-items: center;
  margin-bottom: 0;
  line-height: normal;
}

/* Data Preview Styling */
.data-preview {
  margin-top: 24px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
  background: #fafafa;
}

.data-preview__header {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 11px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-preview__content {
  padding: 16px;
  margin: 0;
  font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-size: 12px;
  color: #476582;
  overflow-x: auto;
}

.custom-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 10px;
  margin-top: 10px;
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.custom-item:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
  transform: translateY(-1px);
}

.custom-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.custom-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.custom-actions {
  display: flex;
  gap: 12px;
}

/* Resolve list edge alignment */
.yh-upload__list {
  padding-left: 0 !important;
  margin: 0 !important;
}

.yh-upload__download-btn:hover {
  color: #409eff !important;
}

.demo-upload-vertical-20 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-upload-vertical-40 {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Hover position fine-tuning */
.yh-upload--pos-left {
  gap: 20px;
}
</style>
