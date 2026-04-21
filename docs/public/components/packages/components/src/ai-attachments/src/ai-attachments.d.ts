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
export declare const aiAttachmentsProps: {
  /** 附件列表 */
  readonly items: {
    readonly type: PropType<AttachmentItem[]>
    readonly default: () => never[]
  }
  /** 溢出布局模式 */
  readonly overflow: {
    readonly type: PropType<OverflowMode>
    readonly default: 'scrollX'
  }
  /** 列表容器样式 */
  readonly listStyle: {
    readonly type: PropType<Record<string, string>>
    readonly default: () => {}
  }
  /** scrollY 模式下容器最大高度（用于 demo 等需固定高度以展示纵向滚动） */
  readonly scrollMaxHeight: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 上传按钮图标尺寸（紧凑风格建议 24px） */
  readonly uploadIconSize: {
    readonly type: StringConstructor
    readonly default: '24px'
  }
  /** 拖拽目标元素 */
  readonly dragTarget: {
    readonly type: PropType<string | HTMLElement>
    readonly default: null
  }
  /** 是否隐藏上传按钮 */
  readonly hideUpload: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 文件数量限制 */
  readonly limit: {
    readonly type: NumberConstructor
    readonly default: undefined
  }
  /** 上传前校验 */
  readonly beforeUpload: {
    readonly type: PropType<(file: File) => boolean | Promise<boolean>>
    readonly default: undefined
  }
  /** 自定义上传请求 */
  readonly httpRequest: {
    readonly type: PropType<(options: { file: File }) => Promise<void>>
    readonly default: undefined
  }
  /** 是否禁用 */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 最大上传文件数量 */
  readonly maxCount: {
    readonly type: NumberConstructor
    readonly default: undefined
  }
  /** 拖拽容器获取函数 */
  readonly getDropContainer: {
    readonly type: PropType<() => HTMLElement>
    readonly default: undefined
  }
  /** 占位符配置（支持字符串简写，会转为 { title: string }） */
  readonly placeholder: {
    readonly type: PropType<
      PlaceholderType | ((type: 'inline' | 'drop') => PlaceholderType) | string
    >
    readonly default: () => {
      icon: string
      title: string
      description: string
    }
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<ComponentThemeVars>
    readonly default: undefined
  }
}
export type AiAttachmentsProps = ExtractPropTypes<typeof aiAttachmentsProps>
export declare const aiAttachmentsEmits: {
  'update:items': (_items: AttachmentItem[]) => boolean
  'upload-change': (_file: File, _fileList: AttachmentItem[]) => boolean
  'upload-success': (_response: unknown, _file: File, _fileList: AttachmentItem[]) => boolean
  'upload-error': (_error: unknown, _file: File, _fileList: AttachmentItem[]) => boolean
  'upload-drop': (_files: File[]) => boolean
  'delete-card': (_item: AttachmentItem, _index: number) => boolean
  exceed: (_options: { files: File[]; maxCount: number }) => boolean
}
export type AiAttachmentsEmits = typeof aiAttachmentsEmits
export interface AiAttachmentsSlots {
  'file-item'?: (props: { item: AttachmentItem; index: number }) => unknown
  'upload-button'?: (props: { canUpload: boolean }) => unknown
  'drop-area'?: () => unknown
}
export type AiAttachmentsSlotTypes = SlotsType<AiAttachmentsSlots>
