import type { ExtractPropTypes, PropType } from 'vue'

export type AiPromptItem = {
  content: string
  icon?: string
  id?: string | number
  description?: string
}

export const aiPromptsProps = {
  /**
   * @description Data list for the prompts
   */
  items: {
    type: Array as PropType<(AiPromptItem | string)[]>,
    default: () => []
  },
  /**
   * @description Layout style for the prompts
   */
  layout: {
    type: String as PropType<'horizontal' | 'vertical' | 'waterfall'>,
    default: 'horizontal'
  },
  /**
   * @description Title for the group
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * @description Theme overrides for the component
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').AiPromptsThemeVars>,
    default: undefined
  }
}

export type AiPromptsProps = ExtractPropTypes<typeof aiPromptsProps>

export const aiPromptsEmits = {
  /**
   * @description Emit when an item is clicked
   */
  click: (item: AiPromptItem | string) => typeof item === 'object' || typeof item === 'string'
}

export type AiPromptsEmits = typeof aiPromptsEmits
