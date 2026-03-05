import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'

export type ArtifactType =
  | 'code'
  | 'html'
  | 'markdown'
  | 'react'
  | 'vue'
  | 'diagram'
  | 'chart'
  | 'sandbox'
  | 'canvas'
  /** 交互式图表 - 使用 ECharts */
  | 'echarts'

export interface ArtifactVersion {
  /**
   * 版本号或标识
   */
  version: number | string
  /**
   * 内容源码
   */
  content: string
  /**
   * 该版本的更新说明
   */
  description?: string
  /**
   * 时间戳
   */
  timestamp?: string | number
}

/** ECharts 图表配置 */
export interface ArtifactEChartsOption {
  /** 图表类型 */
  chartType:
    | 'line'
    | 'bar'
    | 'pie'
    | 'scatter'
    | 'gauge'
    | 'radar'
    | 'funnel'
    | 'treemap'
    | 'sunburst'
    | 'heatmap'
    | 'candlestick'
    | 'boxplot'
    | 'sankey'
    | 'themeRiver'
    | 'graph'
    | 'custom'
  /** ECharts 配置项 */
  option: Record<string, unknown>
  /** 主题 */
  theme?: 'light' | 'dark' | 'default'
  /** 是否启用数据缩放 */
  dataZoom?: boolean
  /** 是否显示工具栏 */
  toolbox?: boolean
  /** 是否可交互 */
  interactive?: boolean
}

export interface ArtifactData {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 文件名或标题
   */
  title: string
  /**
   * 类型
   */
  type: ArtifactType
  /**
   * 当前选中的版本号
   */
  currentVersion?: number | string
  /**
   * 版本历史
   */
  versions: ArtifactVersion[]
  /**
   * ECharts 配置（仅 chart/echarts 类型使用）
   */
  echartsOption?: ArtifactEChartsOption
}

export const aiArtifactsProps = {
  /**
   * 是否显示侧边栏
   */
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * 正在展示的 Artifact 数据
   */
  data: {
    type: Object as PropType<ArtifactData>
  },
  /**
   * 侧边栏宽度
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '50%'
  },
  /**
   * 是否全屏展示
   */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * 渲染模式：preview (预览) | code (源码) | inline (行内/嵌入)
   */
  mode: {
    type: String as PropType<'preview' | 'code' | 'inline'>,
    default: 'preview'
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  },
  // ========== ECharts 相关属性 ==========

  /**
   * ECharts 图表配置（用于 chart/echarts 类型）
   */
  echartsOption: {
    type: Object as PropType<ArtifactEChartsOption>,
    default: undefined
  },
  /**
   * 是否自动加载 ECharts 库
   */
  autoLoadECharts: {
    type: Boolean,
    default: true
  },
  /**
   * ECharts 主题
   */
  echartsTheme: {
    type: String as PropType<'light' | 'dark' | 'default'>,
    default: 'light'
  },
  /**
   * 是否启用数据缩放
   */
  echartsDataZoom: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示工具栏
   */
  echartsToolbox: {
    type: Boolean,
    default: true
  },
  /**
   * 图表高度
   */
  chartHeight: {
    type: [String, Number],
    default: 400
  },
  /**
   * 是否响应式宽度
   */
  responsiveWidth: {
    type: Boolean,
    default: true
  },
  /**
   * 加载时显示的占位符
   */
  chartLoadingText: {
    type: String,
    default: '加载图表中...'
  }
}

export type AiArtifactsProps = ExtractPropTypes<typeof aiArtifactsProps>

export const aiArtifactsEmits = {
  'update:visible': (_val: boolean) => true,
  'update:mode': (_val: 'preview' | 'code' | 'inline') => true,
  'version-change': (_version: ArtifactVersion) => true,
  'chart-click': (_params: unknown) => true,
  'chart-ready': (_chart: unknown) => true,
  'chart-error': (_error: Error) => true,
  close: () => true
}

export type AiArtifactsEmits = typeof aiArtifactsEmits
