import type { ExtractPropTypes, PropType } from 'vue'

export type AiThinkingStatus = 'start' | 'thinking' | 'end' | 'error'

export const aiThinkingProps = {
  /**
   * @description 思考状态
   */
  status: {
    type: String as PropType<AiThinkingStatus>,
    default: 'thinking'
  },
  /**
   * @description 思考标题
   */
  title: String,
  /**
   * @description 思考详情内容
   */
  content: String,
  /**
   * @description 是否展开详情 (v-model)
   */
  modelValue: Boolean,
  /**
   * @description 完成后是否自动收起
   */
  autoCollapse: {
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

export type AiThinkingProps = ExtractPropTypes<typeof aiThinkingProps>

export const aiThinkingEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean'
}

export type AiThinkingEmits = typeof aiThinkingEmits
