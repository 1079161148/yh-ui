import { type ActionItem } from './ai-action-group'
declare var __VLS_13: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_13) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly items: {
      readonly type: import('vue').PropType<ActionItem[]>
      readonly default: () => never[]
    }
    readonly size: {
      readonly type: import('vue').PropType<'small' | 'default' | 'large'>
      readonly default: 'small'
    }
    readonly variant: {
      readonly type: import('vue').PropType<'text' | 'ghost' | 'outlined'>
      readonly default: 'text'
    }
    readonly direction: {
      readonly type: import('vue').PropType<'horizontal' | 'vertical'>
      readonly default: 'horizontal'
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    click: (key: string, _item: ActionItem) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly items: {
        readonly type: import('vue').PropType<ActionItem[]>
        readonly default: () => never[]
      }
      readonly size: {
        readonly type: import('vue').PropType<'small' | 'default' | 'large'>
        readonly default: 'small'
      }
      readonly variant: {
        readonly type: import('vue').PropType<'text' | 'ghost' | 'outlined'>
        readonly default: 'text'
      }
      readonly direction: {
        readonly type: import('vue').PropType<'horizontal' | 'vertical'>
        readonly default: 'horizontal'
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onClick?: ((key: string, _item: ActionItem) => any) | undefined
    }>,
  {
    readonly size: 'large' | 'default' | 'small'
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly variant: 'text' | 'outlined' | 'ghost'
    readonly direction: 'vertical' | 'horizontal'
    readonly items: ActionItem[]
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
