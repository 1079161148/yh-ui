import type { ExtractPropTypes, PropType } from 'vue'

/** 预设图标类型 */
export type PresetFileIcons =
  | 'default' // 默认文件图标
  | 'excel' // Excel 文件图标
  | 'image' // 图片文件图标
  | 'markdown' // Markdown 文件图标
  | 'pdf' // PDF 文件图标
  | 'ppt' // PowerPoint 文件图标
  | 'word' // Word 文件图标
  | 'zip' // 压缩文件图标
  | 'video' // 视频文件图标
  | 'audio' // 音频文件图标
  | 'java' // Java 文件图标
  | 'javascript' // JavaScript 文件图标
  | 'python' // Python 文件图标
  | 'txt' // 文本文件图标

/** 文件类型 */
export type FileCardType = 'file' | 'image' | 'audio' | 'video' | string

/** 文件卡片尺寸 */
export type FileCardSize = 'small' | 'default' | 'large'

/** 文件卡片属性 */
export interface FileCardProps {
  /**
   * 文件名称
   */
  name: string
  /**
   * 文件大小（字节）
   */
  byte?: number
  /**
   * 卡片尺寸
   */
  size?: FileCardSize
  /**
   * 文件描述
   */
  description?: string
  /**
   * 是否处于加载状态
   */
  loading?: boolean
  /**
   * 文件类型
   */
  type?: FileCardType
  /**
   * 图片或文件地址
   */
  src?: string
  /**
   * 遮罩内容
   */
  mask?: string
  /**
   * 自定义图标
   */
  icon?: PresetFileIcons
  /**
   * 图片属性配置
   */
  imageProps?: Record<string, unknown>
  /**
   * 视频属性配置
   */
  videoProps?: Record<string, unknown>
  /**
   * 音频属性配置
   */
  audioProps?: Record<string, unknown>
  /**
   * 点击事件回调
   */
  onClick?: () => void
}

/** 列表项属性 */
export interface FileCardListItem extends FileCardProps {
  /**
   * 唯一标识
   */
  uid?: string | number
  /**
   * 文件 URL
   */
  url?: string
  /**
   * 缩略图 URL
   */
  thumbUrl?: string
}

/** 文件卡片列表属性 */
export interface FileCardListProps {
  /**
   * 文件列表数据
   */
  items?: FileCardListItem[]
  /**
   * 卡片尺寸
   */
  size?: FileCardSize
  /**
   * 是否可删除
   */
  removable?: boolean | ((item: FileCardListItem) => boolean)
  /**
   * 删除事件回调
   */
  onRemove?: (item: FileCardListItem) => void
  /**
   * 扩展内容
   */
  extension?: string
  /**
   * 超出展示方式
   */
  overflow?: 'wrap' | 'scrollX' | 'scrollY'
}

// Props
export const aiFileCardProps = {
  /** 文件名称 */
  name: {
    type: String,
    required: true
  },
  /** 文件大小（字节） */
  byte: {
    type: Number,
    default: undefined
  },
  /** 卡片尺寸 */
  size: {
    type: String as PropType<FileCardSize>,
    default: 'default'
  },
  /** 文件描述 */
  description: {
    type: String,
    default: undefined
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 文件类型 */
  type: {
    type: String as PropType<FileCardType>,
    default: 'file'
  },
  /** 图片或文件地址 */
  src: {
    type: String,
    default: undefined
  },
  /** 遮罩内容 */
  mask: {
    type: String,
    default: undefined
  },
  /** 自定义图标 */
  icon: {
    type: String as PropType<PresetFileIcons>,
    default: 'default'
  },
  /** 图片属性 */
  imageProps: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 视频属性 */
  videoProps: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 音频属性 */
  audioProps: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<Record<string, unknown>>,
    default: undefined
  }
} as const

export type AiFileCardProps = ExtractPropTypes<typeof aiFileCardProps>

// Emits
export const aiFileCardEmits = {
  click: () => true
}

export type AiFileCardEmits = typeof aiFileCardEmits
