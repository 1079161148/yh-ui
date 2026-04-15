import type { ExtractPropTypes, PropType, SlotsType } from 'vue'
/** 预设图标类型 */
export type PresetFileIcons =
  | 'default'
  | 'excel'
  | 'image'
  | 'markdown'
  | 'pdf'
  | 'ppt'
  | 'word'
  | 'zip'
  | 'video'
  | 'audio'
  | 'java'
  | 'javascript'
  | 'python'
  | 'txt'
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
export declare const aiFileCardProps: {
  /** 文件名称 */
  readonly name: {
    readonly type: StringConstructor
    readonly required: true
  }
  /** 文件大小（字节） */
  readonly byte: {
    readonly type: NumberConstructor
    readonly default: undefined
  }
  /** 卡片尺寸 */
  readonly size: {
    readonly type: PropType<FileCardSize>
    readonly default: 'default'
  }
  /** 文件描述 */
  readonly description: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 是否加载中 */
  readonly loading: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 文件类型 */
  readonly type: {
    readonly type: PropType<FileCardType>
    readonly default: 'file'
  }
  /** 图片或文件地址 */
  readonly src: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 遮罩内容 */
  readonly mask: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 自定义图标 */
  readonly icon: {
    readonly type: PropType<PresetFileIcons>
    readonly default: 'default'
  }
  /** 图片属性 */
  readonly imageProps: {
    readonly type: PropType<Record<string, unknown>>
    readonly default: () => {}
  }
  /** 视频属性 */
  readonly videoProps: {
    readonly type: PropType<Record<string, unknown>>
    readonly default: () => {}
  }
  /** 音频属性 */
  readonly audioProps: {
    readonly type: PropType<Record<string, unknown>>
    readonly default: () => {}
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<Record<string, unknown>>
    readonly default: undefined
  }
}
export type AiFileCardProps = ExtractPropTypes<typeof aiFileCardProps>
export declare const aiFileCardEmits: {
  click: () => boolean
}
export type AiFileCardEmits = typeof aiFileCardEmits
export interface AiFileCardSlots {
  default?: () => unknown
}
export type AiFileCardSlotTypes = SlotsType<AiFileCardSlots>
