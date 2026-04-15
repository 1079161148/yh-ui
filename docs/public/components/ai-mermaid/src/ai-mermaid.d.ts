import type { ExtractPropTypes, PropType, SlotsType } from 'vue'
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
export declare const aiMermaidProps: {
  /** Mermaid 代码内容 */
  readonly code: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 顶部内容 */
  readonly header: {
    readonly type: PropType<string | Record<string, unknown>>
    readonly default: null
  }
  /** 样式类名 */
  readonly className: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 样式类名（语义化） */
  readonly classNames: {
    readonly type: PropType<Record<string, string>>
    readonly default: () => {}
  }
  /** 样式对象 */
  readonly styles: {
    readonly type: PropType<Record<string, string>>
    readonly default: () => {}
  }
  /** Mermaid 配置 */
  readonly config: {
    readonly type: PropType<MermaidConfig>
    readonly default: () => {}
  }
  /** 操作栏配置 */
  readonly actions: {
    readonly type: PropType<MermaidActions>
    readonly default: () => {
      enableZoom: boolean
      enableDownload: boolean
      enableCopy: boolean
    }
  }
  /** 渲染类型切换回调 */
  readonly onRenderTypeChange: {
    readonly type: PropType<(value: RenderType) => void>
    readonly default: undefined
  }
  /** 样式前缀 */
  readonly prefixCls: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 自定义样式 */
  readonly style: {
    readonly type: PropType<Record<string, string>>
    readonly default: () => {}
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<Record<string, unknown>>
    readonly default: undefined
  }
}
export type AiMermaidProps = ExtractPropTypes<typeof aiMermaidProps>
export declare const aiMermaidEmits: {
  'render-type-change': (_value: RenderType) => boolean
  error: (_error: Error) => boolean
  ready: () => boolean
}
export type AiMermaidEmits = typeof aiMermaidEmits
export interface AiMermaidSlots {
  header?: () => unknown
  extra?: () => unknown
}
export type AiMermaidSlotTypes = SlotsType<AiMermaidSlots>
