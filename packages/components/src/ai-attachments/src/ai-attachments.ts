import type { ExtractPropTypes, PropType, SlotsType } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'
import type { FileCardListItem } from '../../ai-file-card'

/** 溢出布局模式 */
export type OverflowMode = 'wrap' | 'scrollX' | 'scrollY'

/** 附件项属性 */
export interface AttachmentItem extends FileCardListItem {
  /**
   * 文件状态
   */
  status?: 'uploading' | 'done' | 'error' | 'removed'
  /**
   * 上传进度
   */
  percent?: number
  /**
   * 响应数据
   */
  response?: unknown
  /**
   * 错误信息
   */
  error?: string
}

/** 占位符类型 */
export interface PlaceholderType {
  icon?: string
  title?: string
  description?: string
}

// Props
export const aiAttachmentsProps = {
  /** 附件列表 */
  items: {
    type: Array as PropType<AttachmentItem[]>,
    default: () => []
  },
  /** 溢出布局模式 */
  overflow: {
    type: String as PropType<OverflowMode>,
    default: 'scrollX'
  },
  /** 列表容器样式 */
  listStyle: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  /** scrollY 模式下容器最大高度（用于 demo 等需固定高度以展示纵向滚动） */
  scrollMaxHeight: {
    type: String,
    default: undefined
  },
  /** 上传按钮图标尺寸（紧凑风格建议 24px） */
  uploadIconSize: {
    type: String,
    default: '24px'
  },
  /** 拖拽目标元素 */
  dragTarget: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: null
  },
  /** 是否隐藏上传按钮 */
  hideUpload: {
    type: Boolean,
    default: false
  },
  /** 文件数量限制 */
  limit: {
    type: Number,
    default: undefined
  },
  /** 上传前校验 */
  beforeUpload: {
    type: Function as PropType<(file: File) => boolean | Promise<boolean>>,
    default: undefined
  },
  /** 自定义上传请求 */
  httpRequest: {
    type: Function as PropType<(options: { file: File }) => Promise<void>>,
    default: undefined
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 最大上传文件数量 */
  maxCount: {
    type: Number,
    default: undefined
  },
  /** 拖拽容器获取函数 */
  getDropContainer: {
    type: Function as PropType<() => HTMLElement>,
    default: undefined
  },
  /** 占位符配置（支持字符串简写，会转为 { title: string }） */
  placeholder: {
    type: [Object, Function, String] as PropType<
      PlaceholderType | ((type: 'inline' | 'drop') => PlaceholderType) | string
    >,
    default: () => ({
      icon: 'upload',
      title: 'Click or Drop files here',
      description: 'Support file type: image, video, audio, document, etc.'
    })
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiAttachmentsProps = ExtractPropTypes<typeof aiAttachmentsProps>

// Emits
export const aiAttachmentsEmits = {
  'update:items': (_items: AttachmentItem[]) => true,
  'upload-change': (_file: File, _fileList: AttachmentItem[]) => true,
  'upload-success': (_response: unknown, _file: File, _fileList: AttachmentItem[]) => true,
  'upload-error': (_error: unknown, _file: File, _fileList: AttachmentItem[]) => true,
  'upload-drop': (_files: File[]) => true,
  'delete-card': (_item: AttachmentItem, _index: number) => true,
  exceed: (_options: { files: File[]; maxCount: number }) => true
}

export type AiAttachmentsEmits = typeof aiAttachmentsEmits

export interface AiAttachmentsSlots {
  'file-item'?: (props: { item: AttachmentItem; index: number }) => unknown
  'upload-button'?: (props: { canUpload: boolean }) => unknown
  'drop-area'?: () => unknown
}

export type AiAttachmentsSlotTypes = SlotsType<AiAttachmentsSlots>
