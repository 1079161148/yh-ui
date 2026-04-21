import { type AiPromptItem } from './ai-prompts'
declare var __VLS_1: {},
  __VLS_3: {
    item: string | AiPromptItem
    index: number
  },
  __VLS_5: {
    icon: string
  }
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any
} & {
  item?: (props: typeof __VLS_3) => any
} & {
  icon?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    items: {
      type: import('vue').PropType<(AiPromptItem | string)[]>
      default: () => never[]
    }
    layout: {
      type: import('vue').PropType<'horizontal' | 'vertical' | 'waterfall'>
      default: string
    }
    title: {
      type: StringConstructor
      default: string
    }
    themeOverrides: {
      type: import('vue').PropType<import('@yh-ui/theme').AiPromptsThemeVars>
      default: undefined
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    click: (item: string | AiPromptItem) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      items: {
        type: import('vue').PropType<(AiPromptItem | string)[]>
        default: () => never[]
      }
      layout: {
        type: import('vue').PropType<'horizontal' | 'vertical' | 'waterfall'>
        default: string
      }
      title: {
        type: StringConstructor
        default: string
      }
      themeOverrides: {
        type: import('vue').PropType<import('@yh-ui/theme').AiPromptsThemeVars>
        default: undefined
      }
    }>
  > &
    Readonly<{
      onClick?: ((item: string | AiPromptItem) => any) | undefined
    }>,
  {
    title: string
    themeOverrides: import('@yh-ui/theme').AiPromptsThemeVars
    layout: 'waterfall' | 'vertical' | 'horizontal'
    items: (string | AiPromptItem)[]
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  true,
  {},
  any
>
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>
export default _default
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
