<script setup lang="ts">
import { ref, reactive } from 'vue'

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
  { name: '财务报表.xlsx', status: 'success', uid: 1 },
  { name: '项目规范.pdf', status: 'success', uid: 2 },
  { name: '需求文档.docx', status: 'success', uid: 3 },
  { name: '演示视频.mp4', status: 'success', uid: 4 },
  { name: '背景音乐.mp3', status: 'success', uid: 5 },
  { name: 'readme.txt', status: 'success', uid: 6 },
  { name: '未知文件.dat', status: 'success', uid: 7 }
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

// Business: Image Compression
const beforeUploadCompress = (file: File) => {
  console.log('Original size:', file.size / 1024, 'KB')
  // Basic check - in real app would use a library like browser-image-compression
  if (file.size > 2 * 1024 * 1024) {
    alert('文件太大，演示已通过 beforeUpload 拦截')
    return false
  }
  return true
}

const tsBasic = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    multiple
  >
    <yh-button type="primary">点击上传</yh-button>
    <template #tip>
      <div class="yh-upload__tip">只能上传 pdf/png 文件，且不超过 2MB</div>
    </template>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'yh-ui-design.pdf', status: 'success', uid: 1 },
  { name: 'logo.png', status: 'uploading', percentage: 65, uid: 2 }
])
<\/script>`

const tsPicture = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture"
    accept="image/*"
  >
    <yh-button type="primary">点击上传</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { 
    name: 'food.jpeg', 
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200', 
    status: 'success', 
    uid: 1 
  }
])
<\/script>`

const tsCard = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture-card"
    accept="image/*"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { 
    name: 'nature.jpeg', 
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200', 
    status: 'success', 
    uid: 1 
  }
])
<\/script>`

const tsDrag = `<template>
  <yh-upload
    v-model:file-list="fileList"
    drag
    action="https://httpbin.org/post"
    multiple
    accept="image/*, .pdf"
  >
    <yh-icon name="upload" class="yh-upload__icon" :size="48" />
    <div class="yh-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])
<\/script>`

const tsDirectory = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    directory
  >
    <yh-button type="primary">上传目录</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])
<\/script>`

const tsManual = `\x3Ctemplate>
  <yh-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :auto-upload="false"
  >
    <template #trigger>
      <yh-button type="primary">选取文件</yh-button>
    </template>
    <yh-button 
      style="margin-left: 12px" 
      type="success" 
      @click="submitUpload"
    >
      上传到服务器
    </yh-button>
    <template #tip>
      <div class="yh-upload__tip">只能上传 pdf/png 文件，且不超过 2MB</div>
    </template>
  </yh-upload>
\x3C/template>

\x3Cscript setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance } from '@yh-ui/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([])

const submitUpload = () => {
  uploadRef.value?.submit()
}
\x3C/script>`


const tsCustomUpload = `<template>
  <yh-upload
    action="#"
    :http-request="customUpload"
  >
    <yh-button type="primary">自定义上传</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
const customUpload = (options) => {
  const { file, onProgress, onSuccess, onError } = options
  console.log('开始自定义上传...', file)
  
  // 模拟上传过程
  let percent = 0
  const timer = setInterval(() => {
    percent += 20
    onProgress({ percent })
    if (percent >= 100) {
      clearInterval(timer)
      onSuccess({ message: '上传成功' })
    }
  }, 200)
}
<\/script>`

const tsDownload = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    show-download
    @download="handleDownload"
  >
    <yh-button type="primary">点击上传</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'yh-ui-manual.pdf', status: 'success', uid: 1, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { name: 'business-report.docx', status: 'success', uid: 3, url: 'https://example.com/files/report.docx' },
  { name: 'example-image.png', status: 'success', uid: 2, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200' }
])

const handleDownload = (file) => {
  console.log('正在下载文件：', file.name)
  // 你可以在这里执行自定义下载逻辑，如通过 API 下载
}
<\/script>`

const tsAdvanced = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :before-upload="beforeUpload"
  >
    <yh-button type="primary">点击上传 (校验测试)</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])

// 利用 beforeUpload 钩子进行拦截
const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    alert('上传图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    alert('上传图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
}
<\/script>`

const tsThumb = `<template>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture"
    :thumbnail-request="generateThumb"
  >
    <yh-button type="primary">自定义缩略图</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])

// 自定义缩略图生成逻辑（例如在前端进行裁剪或添加水印后再预览）
const generateThumb = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // 可以在这里对 Base64 进行处理，演示直接返回
      resolve(reader.result)
    }
  })
}
<\/script>`

const tsAvatar = `<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance } from '@yh-ui/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([
  { name: 'avatar.png', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200' }
])

// 当超出 1 个时，替换原有头像
const handleExceed = (files) => {
  fileList.value = []
  // 关键：清空后重新处理新选择的文件
  uploadRef.value?.handleFiles(files)
}
<\/script>`

const tsPositionDemo = `<template>
  <div class="pos-demo">
    <yh-upload
      v-model:file-list="fileList"
      action="https://httpbin.org/post"
      list-type="picture-card"
      trigger-position="left"
      show-download
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'mountain.jpg', status: 'success', uid: 1, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200' }
])
<\/script>`

const tsOverwrite = `<template>
  <yh-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :limit="1"
    @exceed="handleExceed"
  >
    <yh-button type="primary">选择新文件覆盖旧文件</yh-button>
  </yh-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance } from '@yh-ui/components'

const uploadRef = ref<UploadInstance>()
const fileList = ref([])

const handleExceed = (files) => {
  fileList.value = []
  uploadRef.value?.handleFiles(files)
}
<\/script>`

const tsIconsDemo = `\x3Ctemplate>
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <!-- 自动匹配模式 -->
    <yh-upload v-model:file-list="fileList" action="https://httpbin.org/post">
      <yh-button type="primary">自动图标匹配演示</yh-button>
    </yh-upload>

    <!-- 插槽自定义模式 -->
    <yh-upload v-model:file-list="fileList" action="https://httpbin.org/post">
      <template #file-icon="{ file }">
        <yh-icon v-if="file.name.endsWith('.xlsx')" name="search" color="#67c23a" :size="20" />
        <yh-icon v-else-if="file.name.endsWith('.pdf')" name="star" color="#f56c6c" :size="20" />
        <yh-icon v-else name="attachment" :size="20" />
      </template>
      <yh-button type="success">插槽自定义图标演示</yh-button>
    </yh-upload>
  </div>
\x3C/template>

\x3Cscript setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: '财务报表.xlsx', status: 'success', uid: 1 },
  { name: '项目规范.pdf', status: 'success', uid: 2 },
  { name: '需求文档.docx', status: 'success', uid: 3 },
  { name: '演示视频.mp4', status: 'success', uid: 4 },
  { name: '背景音乐.mp3', status: 'success', uid: 5 },
  { name: 'readme.txt', status: 'success', uid: 6 },
  { name: '未知文件.dat', status: 'success', uid: 7 }
])
\x3C/script>`

const tsCustomSlot = `\x3Ctemplate>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
  >
    <yh-button type="primary">自定义列表内容</yh-button>
    <template #file="{ file }">
      <div class="custom-item">
        <div class="custom-info">
          <yh-icon name="attachment" :size="16" />
          <span class="custom-name">{{ file.name }}</span>
        </div>
        <div class="custom-actions">
           <yh-button type="primary" size="small" plain @click="handlePreview(file)">预览</yh-button>
           <yh-button type="danger" size="small" plain @click="handleRemove(file)">移除</yh-button>
        </div>
      </div>
    </template>
  </yh-upload>
\x3C/template>

\x3Cscript setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  { name: 'custom-item-demo.pdf', status: 'success', uid: 1 }
])

const handlePreview = (file) => {
  alert('预览文件: ' + file.name)
}

const handleRemove = (file) => {
  fileList.value = fileList.value.filter(f => f.uid !== file.uid)
}
\x3C/script>

\x3Cstyle scoped>
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
\x3C/style>`

const tsPreview = `\x3Ctemplate>
  <yh-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture-card"
    @preview="handlePreview"
  />
\x3C/template>

\x3Cscript setup lang="ts">
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
  console.log('点击预览:', file)
  // 如果是图片且有 url，组件内部已集成 viewerjs 自动预览
}
\x3C/script>`



</script>

# Upload 上传

通过点击或者拖拽上传文件。

## 基础用法

最常规的上传方式，支持多选。

<DemoBlock :tsCode="tsBasic" :jsCode="tsBasic">
  <yh-upload
    v-model:file-list="fileListStandard"
    action="https://httpbin.org/post"
    multiple
  >
    <yh-button type="primary">点击上传</yh-button>
    <template #tip>
      <div class="yh-upload__tip">只能上传 pdf/png 文件，且不超过 2MB</div>
    </template>
  </yh-upload>
  
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content">{{ JSON.stringify(fileListStandard, null, 2) }}</pre>
  </div>
</DemoBlock>


## 照片墙模式

适用于头像或商品图上传。

<DemoBlock :tsCode="tsCard" :jsCode="tsCard">
  <yh-upload
    v-model:file-list="fileListCard"
    action="https://httpbin.org/post"
    list-type="picture-card"
    accept="image/*"
  />
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content">{{ JSON.stringify(fileListCard, null, 2) }}</pre>
  </div>
</DemoBlock>


## 拖拽上传

<DemoBlock :tsCode="tsDrag" :jsCode="tsDrag">
  <yh-upload
    v-model:file-list="fileListDrag"
    drag
    action="https://httpbin.org/post"
    multiple
    accept="image/*, .pdf"
  >
    <div class="dragger-content">
      <yh-icon name="upload" class="yh-upload__icon" :size="48" />
      <div class="yh-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
    </div>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content">{{ JSON.stringify(fileListDrag, null, 2) }}</pre>
  </div>
</DemoBlock>


## 上传目录

通过 `directory` 属性启用文件夹上传。开启后，只能选择文件夹；选择文件夹后，文件夹内的文件将被展开并依次上传。

<DemoBlock :tsCode="tsDirectory" :jsCode="tsDirectory">
  <yh-upload
    v-model:file-list="fileListDirectory"
    action="https://httpbin.org/post"
    directory
  >
    <yh-button type="primary">上传目录</yh-button>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content">{{ JSON.stringify(fileListDirectory, null, 2) }}</pre>
  </div>
</DemoBlock>


## 手动上传

通过设置 `auto-upload` 属性为 `false` 来关闭自动上传，然后通过调用组件实例的 `submit` 方法来手动触发上传。

<DemoBlock :tsCode="tsManual" :jsCode="tsManual">
  <yh-upload
    ref="uploadManualRef"
    v-model:file-list="fileListManual"
    action="https://httpbin.org/post"
    :auto-upload="false"
  >
    <template #trigger>
      <yh-button type="primary">选取文件</yh-button>
    </template>
    <yh-button 
      style="margin-left: 12px" 
      type="success" 
      @click="uploadManualRef?.submit()"
    >
      上传到服务器
    </yh-button>
    <template #tip>
      <div class="yh-upload__tip">只能上传 pdf/png 文件，且不超过 2MB</div>
    </template>
  </yh-upload>
  <div class="data-preview">
    <div class="data-preview__header">FileList Data</div>
    <pre class="data-preview__content">{{ JSON.stringify(fileListManual, null, 2) }}</pre>
  </div>
</DemoBlock>


## 图片列表模式

<DemoBlock :tsCode="tsPicture" :jsCode="tsPicture">
  <yh-upload
    v-model:file-list="fileListPicture"
    action="https://httpbin.org/post"
    list-type="picture"
    accept="image/*"
  >
    <yh-button type="primary">点击上传</yh-button>
  </yh-upload>
  <div style="margin-top: 20px; padding: 12px; background: rgba(0,0,0,0.04); border-radius: 8px;">
    <div style="font-size: 12px; color: #666; margin-bottom: 8px; font-weight: bold;">FileList Data:</div>
    <pre style="font-size: 12px; margin: 0;">{{ JSON.stringify(fileListPicture, null, 2) }}</pre>
  </div>
</DemoBlock>

## 自定义上传

通过 `http-request` 属性可以完全自定义上传的实现逻辑，如使用自己的 axios 实例或者对接特定的云存储 SDK。

<DemoBlock :tsCode="tsCustomUpload" :jsCode="tsCustomUpload">
  <yh-upload
    action="#"
    :http-request="(opt) => {
      console.log('Custom Request Executed', opt)
      opt.onSuccess({status: 'ok'})
    }"
  >
    <yh-button type="primary">自定义上传测试</yh-button>
  </yh-upload>
</DemoBlock>

## 下载与自定义下载

通过 `show-download` 属性可以显示下载按钮。点击下载按钮会触发 `download` 事件。

> [!TIP]
> **关于下载功能：** 组件内置了基于 Blob 的强制下载逻辑。但请注意，如果文件存储在第三方服务器且未开启跨域资源共享 (CORS)，浏览器出于安全策略可能会降级为“在新窗口打开预览”模式。建议在生产环境中确保静态资源服务器已配置 `Access-Control-Allow-Origin` 响应头。

<DemoBlock :tsCode="tsDownload" :jsCode="tsDownload">
  <yh-upload
    v-model:file-list="fileListStandard"
    action="https://httpbin.org/post"
    show-download
    @download="(file) => console.log('Download triggered:', file)"
  >
    <yh-button type="primary">点击上传</yh-button>
  </yh-upload>
</DemoBlock>

## 业务进阶：上传前校验与压缩

在实际业务中，我们通常需要在上传前检查文件大小、类型，甚至进行图片压缩。

<DemoBlock :tsCode="tsAdvanced" :jsCode="tsAdvanced">
  <yh-upload
    v-model:file-list="fileListAdvanced"
    action="https://httpbin.org/post"
    :before-upload="beforeUploadCompress"
  >
    <yh-button type="primary">点击上传 (校验测试)</yh-button>
  </yh-upload>
  <div style="margin-top: 20px; padding: 12px; background: rgba(0,0,0,0.04); border-radius: 8px;">
    <div style="font-size: 12px; color: #666; margin-bottom: 8px; font-weight: bold;">FileList Data:</div>
    <pre style="font-size: 12px; margin: 0;">{{ JSON.stringify(fileListAdvanced, null, 2) }}</pre>
  </div>
</DemoBlock>

## 自定义缩略图

通过 `thumbnail-request` 属性您可以完全控制预览图的生成逻辑。例如在前端对大图进行质量压缩后再展示，或者根据文件扩展名返回不同的默认占位图。

<DemoBlock :tsCode="tsThumb" :jsCode="tsThumb">
  <yh-upload
    v-model:file-list="fileListThumb"
    action="https://httpbin.org/post"
    list-type="picture"
    :thumbnail-request="(file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
      })
    }"
  >
    <yh-button type="primary">自定义缩略图</yh-button>
  </yh-upload>
</DemoBlock>

## 用户头像上传 (单图替换)

这是一个非常实用的案例。通过 `limit="1"` 限制上传数量，并结合 `exceed` 事件实现新图直接替换旧图的“头像上传”效果。

<DemoBlock :tsCode="tsAvatar" :jsCode="tsAvatar">
  <yh-upload
    ref="uploadAvatarRef"
    v-model:file-list="fileListAvatar"
    action="https://httpbin.org/post"
    list-type="picture-card"
    :limit="1"
    @exceed="(files) => {
       // 实现“替换模式”：清空旧列表，注入新文件
       fileListAvatar = []
       uploadAvatarRef?.handleFiles(files)
    }"
  >
    <yh-icon v-if="fileListAvatar.length === 0" name="plus" :size="28" />
  </yh-upload>
</DemoBlock>

## 照片墙位置与预览下载

通过 `trigger-position` 属性可以控制上传按钮相对于列表的位置（`top` \| `bottom` \| `left` \| `right`）。
同时，在 `picture-card` 模式下，开启 `show-download` 后，鼠标悬浮预览图中也会出现下载按钮。

<DemoBlock :tsCode="tsPositionDemo" :jsCode="tsPositionDemo">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-upload
      v-model:file-list="fileListPos"
      action="https://httpbin.org/post"
      list-type="picture-card"
      trigger-position="left"
      show-download
    />
  </div>
</DemoBlock>

## 覆盖前一个文件

通过设置 `limit="1"` 并监听 `exceed` 事件，可以实现在选择新文件时自动替换掉前一个文件的效果。

<DemoBlock :tsCode="tsOverwrite" :jsCode="tsOverwrite">
  <yh-upload
    ref="uploadOverwriteRef"
    v-model:file-list="fileListOverwrite"
    action="https://httpbin.org/post"
    :limit="1"
    @exceed="(files) => {
      fileListOverwrite = []
      uploadOverwriteRef?.handleFiles(files)
    }"
  >
    <yh-button type="primary">选择新文件覆盖旧文件</yh-button>
  </yh-upload>
</DemoBlock>

## 文件类型图标

组件会自动根据文件后缀名匹配对应的图标（Word、Excel、PDF、视频、音频、文本等）。对于未知类型，默认展示“附件”图标。您也可以通过 `file-icon` 插槽进行完全自定义。

<DemoBlock :tsCode="tsIconsDemo" :jsCode="tsIconsDemo">
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <yh-upload v-model:file-list="fileListIcons" action="https://httpbin.org/post">
      <yh-button type="primary">自动图标匹配演示</yh-button>
    </yh-upload>
    <yh-upload v-model:file-list="fileListIcons" action="https://httpbin.org/post">
      <template #file-icon="{ file }">
        <yh-icon v-if="file.name.endsWith('.xlsx')" name="search" color="#67c23a" :size="20" />
        <yh-icon v-else-if="file.name.endsWith('.pdf')" name="star" color="#f56c6c" :size="20" />
        <yh-icon v-else name="attachment" :size="20" />
      </template>
      <yh-button type="success">插槽自定义图标演示</yh-button>
    </yh-upload>
  </div>
</DemoBlock>

## 自定义文件列表插槽

使用 `file` 作用域插槽可以完全自定义文件列表的每一项，满足更复杂的 UI 需求。

<DemoBlock :tsCode="tsCustomSlot" :jsCode="tsCustomSlot">
  <yh-upload
    v-model:file-list="fileListAdvanced"
    action="https://httpbin.org/post"
  >
    <yh-button type="primary">自定义列表内容</yh-button>
    <template #file="{ file }">
      <div class="custom-item">
        <div class="custom-info">
          <yh-icon name="attachment" :size="16" />
          <span class="custom-name">{{ file.name }}</span>
        </div>
        <div class="custom-actions">
           <yh-button type="primary" size="small" plain @click="() => alert('预览：' + file.name)">预览</yh-button>
           <yh-button type="danger" size="small" plain @click="() => fileListAdvanced = fileListAdvanced.filter(f => f.uid !== file.uid)">移除</yh-button>
        </div>
      </div>
    </template>
  </yh-upload>
</DemoBlock>

## 文件预览功能

通过监听 `preview` 事件，您可以实现点击文件时的预览逻辑。对于图片文件，组件已经内置了 `viewerjs` 预览引擎。

<DemoBlock :tsCode="tsPreview" :jsCode="tsPreview">
  <yh-upload
    v-model:file-list="fileListCard"
    action="https://httpbin.org/post"
    list-type="picture-card"
    @preview="(file) => console.log('Preview image:', file)"
  />
</DemoBlock>


## Nuxt.js 使用说明

由于 `YhUpload` 组件内部使用了 `Viewer.js` 和 `FileReader` 等浏览器特有 API，在 Nuxt 3 (SSR) 环境中使用时，请务必将其放置在 `<ClientOnly>` 组件内，或者确保仅在客户端生命周期（如 `onMounted`）中触发相关交互。

```vue
<template>
  <ClientOnly>
    <yh-upload action="/api/upload">
      <yh-button type="primary">Nuxt 上传文件</yh-button>
    </yh-upload>
  </ClientOnly>
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:file-list | 已上传的文件列表 | `UploadFile[]` | `[]` |
| action | 上传的地址 | `string` | - |
| method | 上传的 HTTP 方法 | `string` | `'POST'` |
| headers | 设置上传的请求头部 | `Record<string, string>` | `{}` |
| data | 上传时附带的额外参数 | `Record<string, unknown>` | `{}` |
| name | 上传文件的字段名 | `string` | `'file'` |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| drag | 是否启用拖拽上传 | `boolean` | `false` |
| accept | 接受上传的 [文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | `string` | - |
| showFileList | 是否显示已上传文件列表 | `boolean` | `true` |
| limit | 限制上传数量 | `number` | - |
| autoUpload | 是否在选取文件后立即进行上传 | `boolean` | `true` |
| listType | 文件列表类型 | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| withCredentials | 支持发送 cookie 凭证信息 | `boolean` | `false` |
| httpRequest | 覆盖默认的上传行为 | `(options: UploadRequestOptions) => void` | - |
| beforeUpload | 上传文件之前的钩子 | `(file: UploadRawFile) => boolean \| Promise<boolean \| Blob>` | - |
| beforeRemove | 删除文件之前的钩子 | `(file: UploadFile, fileList: UploadFile[]) => boolean \| Promise<boolean>` | - |
| disabled | 是否禁用上传 | `boolean` | `false` |
| thumbnailRequest | 自定义缩略图生成逻辑 | `(file: UploadRawFile) => Promise<string> \| string` | - |
| maxSize | 文件大小限制 (KB) | `number` | - |
| directory | 是否开启文件夹上传。启用后，只能选择文件夹；文件夹内的文件将被扁平化处理。 | `boolean` | `false` |
| showDownload | 是否显示下载按钮 | `boolean` | `false` |
| triggerPosition | 触发器相对于列表的位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| fileIcon | 自定义文件图标或图标生成函数 | `string \| ((file: UploadFile) => string)` | - |
| crossorigin | 原生属性 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) | `'anonymous' \| 'use-credentials' \| ''` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:fileList | 当文件列表更新时触发 (支持 v-model) | `(fileList: UploadFile[])` |
| change | 文件状态改变时触发 | `(file: UploadFile, fileList: UploadFile[])` |
| success | 文件上传成功时触发 | `(response: unknown, file: UploadFile, fileList: UploadFile[])` |
| error | 文件上传失败时触发 | `(error: Error, file: UploadFile, fileList: UploadFile[])` |
| progress | 文件上传进度改变时触发 | `(event: UploadProgressEvent, file: UploadFile, fileList: UploadFile[])` |
| remove | 文件列表移除文件时触发 | `(file: UploadFile, fileList: UploadFile[])` |
| preview | 点击文件预览时触发 | `(file: UploadFile)` |
| download | 点击文件下载时触发 | `(file: UploadFile)` |
| exceed | 当选取文件超出限制数量时触发 | `(files: File[], fileList: UploadFile[])` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于放置触发上传的内容 | - |
| trigger | 触发上传的元素 (仅在非拖拽模式有效) | - |
| tip | 提示说明文字 | - |
| file | 自定义文件列表项内容 | `{ file: UploadFile }` |
| file-icon | 自定义文件类型图标 | `{ file: UploadFile }` |

### Expose

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit | 手动上传待上传文件列表 | - |
| triggerInput | 手动唤起文件选择框 | - |
| handleRemove | 手动移除指定文件 | `(file: UploadFile)` |
| handlePreview | 手动触发文件预览 | `(file: UploadFile)` |
| handleDownload | 手动触发文件下载 | `(file: UploadFile)` |
| handleFiles | 手动添加并处理文件列表 | `(files: File[])` |

### 主题变量 (CSS Variables)

所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-upload-dragger-bg` | 拖拽区域背景色 | `var(--yh-bg-color)` |
| `--yh-upload-dragger-border` | 拖拽区域边框颜色 | `var(--yh-border-color-light)` |
| `--yh-upload-dragger-hover-border` | 拖拽区域悬停边框颜色 | `var(--yh-color-primary)` |
| `--yh-upload-item-bg` | 列表项背景色 | `var(--yh-fill-color-blank)` |
| `--yh-upload-item-hover-bg` | 列表项悬停背景色 | `var(--yh-fill-color-light)` |
| `--yh-upload-text-color` | 文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-upload-text-secondary` | 次要文字颜色 | `var(--yh-text-color-secondary)` |
| `--yh-upload-progress-bg` | 进度条背景色 | `var(--yh-color-primary)` |
| `--yh-upload-card-radius` | 照片墙卡片圆角 | `var(--yh-radius-md)` |


<style scoped>
.yh-upload__dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.yh-upload__icon {
  display: inline-block;
  transition: color 0.3s ease;
  color: #909399;
  pointer-events: none;
}

.yh-upload__dragger:hover .yh-upload__icon {
  color: #409eff;
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

/* 按钮对齐优化 */
.yh-button--primary {
  margin: 0;
}

.yh-upload__trigger {
  display: flex !important;
  align-items: center;
  margin-bottom: 0;
  line-height: normal; /* 消除行高引起的亚像素偏移 */
}

/* 增强 Dragger 内部布局 */
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

/* 解决 list 边缘对齐 */
.yh-upload__list {
  padding-left: 0 !important;
  margin: 0 !important;
}

.yh-upload__download-btn:hover {
  color: #409eff !important;
}

/* 悬浮位置微调 */
.yh-upload--pos-left {
  gap: 20px;
}
</style>
