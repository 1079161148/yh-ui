declare var __VLS_1: {
  index: number
  width: string
  activeColor: string
  voidColor: string
}
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly modelValue: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly max: {
      readonly type: NumberConstructor
      readonly default: 5
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly allowHalf: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly icon: {
      readonly type: import('vue').PropType<string | import('vue').Component>
      readonly default: ''
    }
    readonly voidIcon: {
      readonly type: import('vue').PropType<string | import('vue').Component>
      readonly default: ''
    }
    readonly disabledVoidIcon: {
      readonly type: import('vue').PropType<string | import('vue').Component>
      readonly default: ''
    }
    readonly colors: {
      readonly type: import('vue').PropType<string[] | Record<number, string> | string>
      readonly default: '#F7BA2A'
    }
    readonly voidColor: {
      readonly type: StringConstructor
      readonly default: '#C6D1DE'
    }
    readonly disabledVoidColor: {
      readonly type: StringConstructor
      readonly default: '#EFF2F7'
    }
    readonly showScore: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly showText: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly textColor: {
      readonly type: StringConstructor
      readonly default: '#1f2d3d'
    }
    readonly texts: {
      readonly type: import('vue').PropType<string[]>
      readonly default: () => never[]
    }
    readonly scoreTemplate: {
      readonly type: StringConstructor
      readonly default: '{value}'
    }
    readonly size: {
      readonly type: import('vue').PropType<import('./rate').RateSize>
      readonly default: 'default'
    }
    readonly clearable: {
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
  {
    change: (value: number) => void
    'update:modelValue': (value: number) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly modelValue: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly max: {
        readonly type: NumberConstructor
        readonly default: 5
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly allowHalf: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly icon: {
        readonly type: import('vue').PropType<string | import('vue').Component>
        readonly default: ''
      }
      readonly voidIcon: {
        readonly type: import('vue').PropType<string | import('vue').Component>
        readonly default: ''
      }
      readonly disabledVoidIcon: {
        readonly type: import('vue').PropType<string | import('vue').Component>
        readonly default: ''
      }
      readonly colors: {
        readonly type: import('vue').PropType<string[] | Record<number, string> | string>
        readonly default: '#F7BA2A'
      }
      readonly voidColor: {
        readonly type: StringConstructor
        readonly default: '#C6D1DE'
      }
      readonly disabledVoidColor: {
        readonly type: StringConstructor
        readonly default: '#EFF2F7'
      }
      readonly showScore: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly showText: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly textColor: {
        readonly type: StringConstructor
        readonly default: '#1f2d3d'
      }
      readonly texts: {
        readonly type: import('vue').PropType<string[]>
        readonly default: () => never[]
      }
      readonly scoreTemplate: {
        readonly type: StringConstructor
        readonly default: '{value}'
      }
      readonly size: {
        readonly type: import('vue').PropType<import('./rate').RateSize>
        readonly default: 'default'
      }
      readonly clearable: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onChange?: ((value: number) => any) | undefined
      'onUpdate:modelValue'?: ((value: number) => any) | undefined
    }>,
  {
    readonly size: import('./rate').RateSize
    readonly disabled: boolean
    readonly colors: string | string[] | Record<number, string>
    readonly textColor: string
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: string | import('vue').Component
    readonly modelValue: number
    readonly clearable: boolean
    readonly max: number
    readonly allowHalf: boolean
    readonly voidIcon: string | import('vue').Component
    readonly disabledVoidIcon: string | import('vue').Component
    readonly voidColor: string
    readonly disabledVoidColor: string
    readonly showScore: boolean
    readonly showText: boolean
    readonly texts: string[]
    readonly scoreTemplate: string
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
