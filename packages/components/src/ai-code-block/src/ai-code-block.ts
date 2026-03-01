import type { ExtractPropTypes, PropType } from 'vue'

export const aiCodeBlockProps = {
  /**
   * @description 代码语言
   */
  language: {
    type: String,
    default: 'text'
  },
  /**
   * @description 代码内容
   */
  code: {
    type: String,
    default: ''
  },
  /**
   * @description 文件名称
   */
  filename: String,
  /**
   * @description 是否显示行号
   */
  showLineNumbers: {
    type: Boolean,
    default: false
  },
  /**
   * @description 高亮行号列表
   */
  highlightLines: {
    type: Array as PropType<number[]>,
    default: () => []
  },
  /**
   * @description 是否可折叠
   */
  collapsible: {
    type: Boolean,
    default: false
  },
  /**
   * @description 默认是否折叠
   */
  defaultCollapsed: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示运行按钮
   */
  showRun: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否高亮语法
   */
  highlight: {
    type: Boolean,
    default: true
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiCodeBlockProps = ExtractPropTypes<typeof aiCodeBlockProps>

export const aiCodeBlockEmits = {
  copy: (code: string) => typeof code === 'string',
  run: (code: string) => typeof code === 'string'
}

export type AiCodeBlockEmits = typeof aiCodeBlockEmits
