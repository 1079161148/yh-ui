import type { ExtractPropTypes, PropType, SlotsType } from 'vue'

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
  /**
   * 摘要内容
   */
  abstract?: string
  /**
   * 发布时间
   */
  publishTime?: string
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
  /**
   * 图片预览配置
   */
  preview?: {
    enable?: boolean
    lazy?: boolean
    fallback?: string
  }
}

/**
 * 代码块操作配置
 */
export interface AiCodeBlockOptions {
  /**
   * 启用复制按钮
   */
  copyable?: boolean
  /**
   * 启用语言标签
   */
  languageTag?: boolean
  /**
   * 启用行号
   */
  lineNumbers?: boolean
  /**
   * 启用代码编辑（弹窗）
   */
  editable?: boolean
  /**
   * 启用代码运行（JavaScript）
   */
  runnable?: boolean
  /**
   * 启用 AI 解释
   */
  explainable?: boolean
  /**
   * 运行时环境：浏览器内联 or WebContainer 沙箱
   */
  runtime?: 'browser' | 'webcontainer'
  /**
   * 折叠代码块
   */
  collapsible?: boolean
  /**
   * 折叠行数阈值
   */
  collapseLinesThreshold?: number
}

/**
 * Mermaid 图表配置
 */
export interface AiMermaidConfig {
  /**
   * 主题
   */
  theme?: 'default' | 'dark' | 'neutral' | 'base'
  /**
   * 主题变量
   */
  themeVariables?: Record<string, string>
  /**
   *  flowchart 方向
   */
  flowchart?: {
    curve?: 'basis' | 'linear' | 'cardinal'
    padding?: number
  }
  /**
   * 序列图配置
   */
  sequence?: {
    actorMargin?: number
    boxMargin?: number
    boxTextMargin?: number
    noteMargin?: number
    messageMargin?: number
  }
}

/**
 * 结构化表格数据
 */
export interface AiStructuredTableData {
  headers: string[]
  rows: string[][]
}

/**
 * LaTeX 公式配置
 */
export interface AiLatexOptions {
  /**
   * 启用 LaTeX 渲染
   */
  enabled?: boolean
  /**
   * 行内公式分隔符
   */
  inlineDelimiters?: [string, string]
  /**
   * 块级公式分隔符
   */
  blockDelimiters?: [string, string]
  /**
   * KaTeX 配置
   */
  katexOptions?: Record<string, unknown>
}

/**
 * 文件预览配置
 */
export interface AiFilePreviewOptions {
  /**
   * PDF 预览配置
   */
  pdf?: {
    enable?: boolean
    pageScale?: 'auto' | 'actual' | 'page-fit' | 'page-width'
    showToolbar?: boolean
    showNavigation?: boolean
  }
  /**
   * Excel 预览配置
   */
  excel?: {
    enable?: boolean
    sheetName?: string
    maxRows?: number
  }
  /**
   * 图片预览配置
   */
  image?: {
    enable?: boolean
    lazy?: boolean
    previewable?: boolean
    zoomable?: boolean
  }
  /**
   * 视频预览配置
   */
  video?: {
    enable?: boolean
    autoplay?: boolean
    controls?: boolean
  }
}

/**
 * 结构化数据配置
 */
export interface AiStructuredData {
  /**
   * 数据类型
   */
  type: 'json' | 'table' | 'chart' | 'mindmap' | 'thought-chain'
  /**
   * 数据内容
   */
  data: unknown
  /**
   * 配置选项
   */
  options?: Record<string, unknown>
}

/**
 * Markdown 配置
 */
export interface AiMarkdownOptions {
  /**
   * 代码块配置
   */
  codeBlock?: AiCodeBlockOptions
  /**
   * Mermaid 配置
   */
  mermaid?: AiMermaidConfig | boolean
  /**
   * LaTeX 配置
   */
  latex?: AiLatexOptions | boolean
  /**
   * 文件预览配置
   */
  filePreview?: AiFilePreviewOptions | boolean
  /**
   * 自动链接
   */
  linkify?: boolean
  /**
   * HTML 标签
   */
  html?: boolean
  /**
   * 排版美化
   */
  typographer?: boolean
  /**
   * 允许的协议
   */
  allowedProtocols?: string[]
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
   * 启用流式增量渲染（逐字/逐句/逐段显示）
   */
  streaming: {
    type: Boolean,
    default: false
  },
  /**
   * 流式渲染模式：逐词 | 逐句 | 逐段
   */
  streamMode: {
    type: String as PropType<'word' | 'sentence' | 'paragraph'>,
    default: 'word'
  },
  /**
   * 流式渲染速度（每次渲染的字符数，仅 word 模式有效）
   */
  streamSpeed: {
    type: Number,
    default: 1
  },
  /**
   * 流式渲染间隔（毫秒）
   */
  streamInterval: {
    type: Number,
    default: 20
  },
  /**
   * 流式渲染完成回调
   */
  onStreamComplete: {
    type: Function as PropType<() => void>
  },
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
   * Markdown 配置选项
   */
  markdownOptions: {
    type: Object as PropType<AiMarkdownOptions>,
    default: () => ({})
  },
  /**
   * 结构化数据（JSON/表格/图表）
   */
  structuredData: {
    type: Object as PropType<AiStructuredData>
  },
  /**
   * 代码解释回调（用于 AI 解释功能）
   */
  onExplainCode: {
    type: Function as PropType<(code: string, language: string) => Promise<string>>
  },
  /**
   * 代码运行回调
   */
  onRunCode: {
    type: Function as PropType<
      (code: string, language: string) => Promise<{ output: string; error?: string }>
    >
  },
  /**
   * 引用点击回调
   */
  onCitationClick: {
    type: Function as PropType<(citation: AiCitation) => void>
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  },
  // ========== Python 沙盒相关属性 ==========

  /**
   * 是否启用 Python 代码运行支持
   */
  enablePythonRuntime: {
    type: Boolean,
    default: false
  },
  /**
   * Python 运行时类型：'browser' (Pyodide) | 'remote' (远程 API)
   */
  pythonRuntime: {
    type: String as PropType<'browser' | 'remote'>,
    default: 'browser'
  },
  /**
   * 远程 Python API 地址（当 pythonRuntime 为 remote 时使用）
   */
  pythonApiUrl: {
    type: String,
    default: ''
  },
  /**
   * Pyodide CDN 地址
   */
  pyodideUrl: {
    type: String,
    default: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
  },
  // ========== XSS 防护相关属性 ==========

  /**
   * 是否启用内置 XSS 防护
   */
  enableSanitizer: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义 HTML 清理函数
   */
  sanitizer: {
    type: Function as PropType<(html: string) => string>,
    default: undefined
  },
  /**
   * 允许的标签白名单
   */
  allowedTags: {
    type: Array as PropType<string[]>,
    default: () => [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'hr',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'em',
      'strong',
      'a',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'span',
      'div',
      'figure',
      'figcaption'
    ]
  },
  /**
   * 允许的属性白名单
   */
  allowedAttributes: {
    type: Array as PropType<string[]>,
    default: () => [
      'href',
      'src',
      'alt',
      'title',
      'class',
      'id',
      'target',
      'rel',
      'width',
      'height',
      'style'
    ]
  },
  /**
   * 允许的协议白名单
   */
  allowedSchemes: {
    type: Array as PropType<string[]>,
    default: () => ['http', 'https', 'mailto', 'tel']
  }
}

export type AiBubbleProps = ExtractPropTypes<typeof aiBubbleProps>

export interface AiBubbleSlots {
  avatar?: () => unknown
  header?: () => unknown
  default?: () => unknown
  footer?: () => unknown
}

export type AiBubbleSlotTypes = SlotsType<AiBubbleSlots>
