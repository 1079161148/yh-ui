import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  uid: number
  url?: string
  raw?: File
  response?: unknown
  error?: Error
}

export type UploadRawFile = File & { uid: number }

export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  file: File
  filename: string // field name
  name?: string // actual filename to send (with path if directory)
  data: Record<string, unknown>
  headers: Record<string, string>
  withCredentials: boolean
  onProgress: (evt: UploadProgressEvent) => void
  onSuccess: (res: unknown) => void
  onError: (err: Error) => void
}

export const uploadProps = {
  /** 文件列表 */
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => []
  },
  /** 接受上传的文件类型 */
  accept: {
    type: String,
    default: ''
  },
  /** 上传的地址 */
  action: {
    type: String,
    default: ''
  },
  /** 设置上传的请求方法 */
  method: {
    type: String,
    default: 'POST'
  },
  /** 设置上传的请求头部 */
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  /** 上传时附带的额外参数 */
  data: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 上传文件的字段名 */
  name: {
    type: String,
    default: 'file'
  },
  /** 是否支持多选文件 */
  multiple: Boolean,
  /** 是否启用拖拽上传 */
  drag: Boolean,
  /** 是否显示已上传文件列表 */
  showFileList: {
    type: Boolean,
    default: true
  },
  /** 限制上传数量 */
  limit: Number,
  /** 是否在选取文件后立即进行上传 */
  autoUpload: {
    type: Boolean,
    default: true
  },
  /** 文件列表类型 */
  listType: {
    type: String as PropType<'text' | 'picture' | 'picture-card'>,
    default: 'text'
  },
  /** 是否支持发送 cookie 凭证信息 */
  withCredentials: {
    type: Boolean,
    default: false
  },
  /** 覆盖默认的上传行为，可以自定义上传的实现 */
  httpRequest: {
    type: Function as PropType<(options: UploadRequestOptions) => Promise<unknown> | void>
  },
  /** 上传文件之前的钩子，参数为上传的文件， 若返回 false 或者 Promise 则停止上传 */
  beforeUpload: {
    type: Function as PropType<(file: UploadRawFile) => boolean | Promise<boolean | Blob>>
  },
  /** 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者 Promise 则停止删除 */
  beforeRemove: {
    type: Function as PropType<
      (file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>
    >
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 文件大小限制 (KB) */
  maxSize: Number,
  /** 自定义缩略图生成 */
  thumbnailRequest: {
    type: Function as PropType<(file: UploadRawFile) => Promise<string> | string>
  },
  /** 是否开启文件夹上传 */
  directory: Boolean,
  /** 是否显示下载按钮 */
  showDownload: Boolean,
  /** 上传触发器相对于文件列表的位置 */
  triggerPosition: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'top'
  },
  /** 自定义文件图标或图标生成函数 */
  fileIcon: [String, Function] as PropType<string | ((file: UploadFile) => string)>,
  /** 原生属性 crossorigin */
  crossorigin: {
    type: String as PropType<'' | 'anonymous' | 'use-credentials'>
  }
} as const

export const uploadEmits = {
  'update:fileList': (fileList: UploadFile[]) => Array.isArray(fileList),
  change: (file: UploadFile, fileList: UploadFile[]) => true,
  success: (response: unknown, file: UploadFile, fileList: UploadFile[]) => true,
  error: (error: Error, file: UploadFile, fileList: UploadFile[]) => true,
  progress: (evt: UploadProgressEvent, file: UploadFile, fileList: UploadFile[]) => true,
  remove: (file: UploadFile, fileList: UploadFile[]) => true,
  exceed: (files: File[], fileList: UploadFile[]) => true,
  preview: (file: UploadFile) => true,
  download: (file: UploadFile) => true
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits
