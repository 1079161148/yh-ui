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
   * @description 是否高亮显示
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
  copy: (code: string) => typeof code === 'string'
}

export type AiCodeBlockEmits = typeof aiCodeBlockEmits
