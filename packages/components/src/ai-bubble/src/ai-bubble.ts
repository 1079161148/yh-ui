import type { ExtractPropTypes, PropType } from 'vue'

export interface AiCitation {
  /**
   * 引用索引，对应文本中的 [1], [2] 等
   */
  id: string | number
  /**
   * 标题
   */
  title: string
  /**
   * 链接 URL
   */
  url?: string
  /**
   * 来源站点名称或域名
   */
  source?: string
  /**
   * 来源图标
   */
  icon?: string
}

export interface AiMultimodal {
  /**
   * 类型：图片、语音、文件（表格/PDF等）
   */
  type: 'image' | 'audio' | 'file' | 'video'
  /**
   * 资源标题或名称
   */
  title?: string
  /**
   * 资源链接
   */
  url: string
  /**
   * 资源大小描述
   */
  size?: string
  /**
   * 额外属性（如语音时长等）
   */
  extra?: Record<string, unknown>
}

export const aiBubbleProps = {
  /**
   * 气泡内容，支持 Markdown
   */
  content: {
    type: String,
    default: ''
  },
  /**
   * 是否开启 Markdown 解析
   */
  markdown: {
    type: Boolean,
    default: true
  },
  /**
   * 角色：用户、助手或系统
   */
  role: {
    type: String as PropType<'user' | 'assistant' | 'system'>,
    default: 'assistant'
  },
  /**
   * 气泡位置
   */
  placement: {
    type: String as PropType<'start' | 'end'>
  },
  /**
   * 气泡形状
   */
  shape: {
    type: String as PropType<'round' | 'corner'>,
    default: 'round'
  },
  /**
   * 视觉变体
   */
  variant: {
    type: String as PropType<'filled' | 'outlined' | 'borderless' | 'shadow'>,
    default: 'filled'
  },
  /**
   * 显示时间
   */
  time: String,
  /**
   * 头像地址
   */
  avatar: String,
  /**
   * 是否在加载中
   */
  loading: Boolean,
  /**
   * 打字机特效
   */
  typing: Boolean,
  /**
   * 引用来源列表 (Citations)
   */
  citations: {
    type: Array as PropType<AiCitation[]>,
    default: () => []
  },
  /**
   * 多模态内容 (图片、音频、文件等)
   */
  multimodal: {
    type: Array as PropType<AiMultimodal[]>,
    default: () => []
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiBubbleProps = ExtractPropTypes<typeof aiBubbleProps>
