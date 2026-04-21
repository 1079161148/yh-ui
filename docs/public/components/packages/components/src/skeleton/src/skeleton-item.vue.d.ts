declare var __VLS_1: {}, __VLS_3: {}
type __VLS_Slots = {} & {
  image?: (props: typeof __VLS_1) => any
} & {
  image?: (props: typeof __VLS_3) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly variant: {
      readonly type: import('vue').PropType<import('./skeleton').SkeletonItemVariant>
      readonly default: 'text'
    }
    readonly width: {
      readonly type: import('vue').PropType<string | number>
    }
    readonly height: {
      readonly type: import('vue').PropType<string | number>
    }
    readonly animated: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly round: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly sharp: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly repeat: {
      readonly type: NumberConstructor
      readonly default: 1
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
  {},
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly variant: {
        readonly type: import('vue').PropType<import('./skeleton').SkeletonItemVariant>
        readonly default: 'text'
      }
      readonly width: {
        readonly type: import('vue').PropType<string | number>
      }
      readonly height: {
        readonly type: import('vue').PropType<string | number>
      }
      readonly animated: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly round: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly sharp: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly repeat: {
        readonly type: NumberConstructor
        readonly default: 1
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly repeat: number
    readonly round: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly variant: 'button' | 'caption' | 'h1' | 'h3' | 'image' | 'text' | 'circle' | 'rect'
    readonly animated: boolean
    readonly sharp: boolean
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
