import type { StepsStatus } from './steps'
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}
type __VLS_Slots = {} & {
  time?: (props: typeof __VLS_1) => any
} & {
  icon?: (props: typeof __VLS_3) => any
} & {
  title?: (props: typeof __VLS_5) => any
} & {
  description?: (props: typeof __VLS_7) => any
} & {
  default?: (props: typeof __VLS_9) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly title: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly description: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly icon: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly status: {
      readonly type: import('vue').PropType<StepsStatus>
      readonly default: ''
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly time: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly progress: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly lazy: {
      readonly type: BooleanConstructor
      readonly default: false
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
      readonly title: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly description: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly icon: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly status: {
        readonly type: import('vue').PropType<StepsStatus>
        readonly default: ''
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly time: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly progress: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly lazy: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly progress: number
    readonly time: string
    readonly title: string
    readonly description: string
    readonly status: 'error' | 'success' | 'finish' | 'process' | 'wait'
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: string
    readonly lazy: boolean
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
