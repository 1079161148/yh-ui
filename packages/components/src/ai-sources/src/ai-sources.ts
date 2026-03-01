import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 知识库引用来源项
 */
export interface AiSourceItem {
  /** 唯一标识 */
  id: string | number
  /** 来源标题 */
  title: string
  /** 来源 URL */
  url?: string
  /** 来源网站/文档名 */
  source?: string
  /** 图标 */
  icon?: string
  /** 匹配相关度（0-1，越高越相关） */
  score?: number
  /** 摘要/引用片段 */
  excerpt?: string
  /** 文件类型：网页、PDF、Word 等 */
  fileType?: 'web' | 'pdf' | 'doc' | 'xlsx' | 'ppt' | 'txt' | 'code' | string
  /** 扩展字段 */
  [key: string]: unknown
}

export const aiSourcesProps = {
  /**
   * @description 引用来源列表
   */
  sources: {
    type: Array as PropType<AiSourceItem[]>,
    default: () => []
  },
  /**
   * @description 展示模式
   * - 'inline': 内联气泡（紧凑，嵌入回复内）
   * - 'card': 卡片列表（展开式详细）
   * - 'badge': 仅角标数字（点击弹出抽屉）
   */
  mode: {
    type: String as PropType<'inline' | 'card' | 'badge'>,
    default: 'inline'
  },
  /**
   * @description 最多显示的卡片数（超出折叠）
   */
  maxVisible: {
    type: Number,
    default: 5
  },
  /**
   * @description 是否显示相关度分数
   */
  showScore: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示文件类型图标
   */
  showFileType: {
    type: Boolean,
    default: true
  },
  /**
   * @description 主题覆盖
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiSourcesProps = ExtractPropTypes<typeof aiSourcesProps>

export const aiSourcesEmits = {
  /** 点击来源项 */
  click: (source: AiSourceItem) => !!source,
  /** 点击查看原文 */
  open: (source: AiSourceItem) => !!source
}

export type AiSourcesEmits = typeof aiSourcesEmits
