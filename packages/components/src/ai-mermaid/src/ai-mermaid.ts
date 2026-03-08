import type { ExtractPropTypes, PropType } from 'vue'

/** Mermaid 配置 */
export interface MermaidConfig {
  /** 主题 */
  theme?: 'default' | 'dark' | 'neutral' | 'base'
  /** 主题变量 */
  themeVariables?: Record<string, string | number>
  /** 字体家族 */
  fontFamily?: string
  /** 序列图配置 */
  sequence?: {
    actorMargin?: number
    boxMargin?: number
    boxTextMargin?: number
    noteMargin?: number
    messageMargin?: number
  }
  /** 流程图配置 */
  flowchart?: {
    curve?: 'basis' | 'linear' | 'cardinal'
    padding?: number
    nodeSpacing?: number
    rankSpacing?: number
  }
  /** 其他 Mermaid 配置 */
  [key: string]: unknown
}

/** 操作栏配置 */
export interface MermaidActions {
  /** 是否启用缩放 */
  enableZoom?: boolean
  /** 是否启用下载 */
  enableDownload?: boolean
  /** 是否启用复制 */
  enableCopy?: boolean
  /** 自定义操作 */
  customActions?: Array<{
    key: string
    label: string
    icon?: string
    onClick?: () => void
  }>
}

/** 渲染类型 */
export type RenderType = 'image' | 'code'

// Props
export const aiMermaidProps = {
  /** Mermaid 代码内容 */
  code: {
    type: String,
    default: ''
  },
  /** 顶部内容 */
  header: {
    type: [Object, String] as PropType<unknown>,
    default: null
  },
  /** 样式类名 */
  className: {
    type: String,
    default: ''
  },
  /** 样式类名（语义化） */
  classNames: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  /** 样式对象 */
  styles: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  /** Mermaid 配置 */
  config: {
    type: Object as PropType<MermaidConfig>,
    default: () => ({})
  },
  /** 操作栏配置 */
  actions: {
    type: Object as PropType<MermaidActions>,
    default: () => ({
      enableZoom: true,
      enableDownload: true,
      enableCopy: true
    })
  },
  /** 渲染类型切换回调 */
  onRenderTypeChange: {
    type: Function as PropType<(value: RenderType) => void>,
    default: undefined
  },
  /** 样式前缀 */
  prefixCls: {
    type: String,
    default: ''
  },
  /** 自定义样式 */
  style: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<Record<string, unknown>>,
    default: undefined
  }
} as const

export type AiMermaidProps = ExtractPropTypes<typeof aiMermaidProps>

// Emits
export const aiMermaidEmits = {
  'render-type-change': (_value: RenderType) => true,
  error: (_error: Error) => true,
  ready: () => true
}

export type AiMermaidEmits = typeof aiMermaidEmits
