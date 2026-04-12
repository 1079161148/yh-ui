const aiArtifactsProps = {
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
    type: Object
  },
  /**
   * 侧边栏宽度
   */
  width: {
    type: [String, Number],
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
    type: String,
    default: 'preview'
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  },
  // ========== ECharts 相关属性 ==========
  /**
   * ECharts 图表配置（用于 chart/echarts 类型）
   */
  echartsOption: {
    type: Object,
    default: void 0
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
    type: String,
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
    default: '\u52A0\u8F7D\u56FE\u8868\u4E2D...'
  }
}
const aiArtifactsEmits = {
  'update:visible': (_val) => true,
  'update:mode': (_val) => true,
  'version-change': (_version) => true,
  'chart-click': (_params) => true,
  'chart-ready': (_chart) => true,
  'chart-error': (_error) => true,
  close: () => true
}
export { aiArtifactsEmits, aiArtifactsProps }
