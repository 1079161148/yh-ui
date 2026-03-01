import type { ExtractPropTypes, PropType } from 'vue'

export interface AiSuggestion {
  icon?: string
  title: string
  description?: string
  prompt?: string
}

export const aiWelcomeProps = {
  /**
   * 标题文本
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * 描述文本
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * 建议项列表
   */
  suggestions: {
    type: Array as PropType<AiSuggestion[]>,
    default: () => []
  },
  /**
   * 是否展示图标/Logo
   */
  showIcon: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义图标名称
   */
  icon: {
    type: String,
    default: 'sparkles'
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiWelcomeProps = ExtractPropTypes<typeof aiWelcomeProps>

export const aiWelcomeEmits = {
  /**
   * 点击建议项时触发
   */
  select: (suggestion: AiSuggestion) => !!suggestion
}

export type AiWelcomeEmits = typeof aiWelcomeEmits
