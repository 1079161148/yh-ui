import type { ExtractPropTypes, PropType } from 'vue'
export type AiPromptItem = {
  content: string
  icon?: string
  id?: string | number
  description?: string
}
export declare const aiPromptsProps: {
  /**
   * @description Data list for the prompts
   */
  items: {
    type: PropType<(AiPromptItem | string)[]>
    default: () => never[]
  }
  /**
   * @description Layout style for the prompts
   */
  layout: {
    type: PropType<'horizontal' | 'vertical' | 'waterfall'>
    default: string
  }
  /**
   * @description Title for the group
   */
  title: {
    type: StringConstructor
    default: string
  }
  /**
   * @description Theme overrides for the component
   */
  themeOverrides: {
    type: PropType<import('@yh-ui/theme').AiPromptsThemeVars>
    default: undefined
  }
}
export type AiPromptsProps = ExtractPropTypes<typeof aiPromptsProps>
export declare const aiPromptsEmits: {
  /**
   * @description Emit when an item is clicked
   */
  click: (item: AiPromptItem | string) => boolean
}
export type AiPromptsEmits = typeof aiPromptsEmits
export interface AiPromptsSlots {
  title?: () => unknown
  item?: (props: { item: AiPromptItem | string; index: number }) => unknown
  icon?: (props: { icon?: string }) => unknown
}
