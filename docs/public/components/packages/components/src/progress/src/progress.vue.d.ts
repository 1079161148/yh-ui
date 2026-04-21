declare var __VLS_1: {
    percentage: number
  },
  __VLS_3: {
    percentage: number
  },
  __VLS_5: {
    percentage: number
  }
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
} & {
  default?: (props: typeof __VLS_3) => any
} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly type: {
      readonly type: import('vue').PropType<import('./progress').ProgressType>
      readonly default: 'line'
    }
    readonly percentage: {
      readonly type: import('vue').PropType<number | number[]>
      readonly default: 0
    }
    readonly secondaryPercentage: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly status: {
      readonly type: import('vue').PropType<import('./progress').ProgressStatus>
    }
    readonly strokeWidth: {
      readonly type: NumberConstructor
      readonly default: 6
    }
    readonly textInside: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly width: {
      readonly type: NumberConstructor
      readonly default: 126
    }
    readonly showText: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly color: {
      readonly type: import('vue').PropType<
        string | ((p: number) => string) | string[] | Record<string, string>
      >
      readonly default: ''
    }
    readonly icon: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly animated: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly defineBackgroundColor: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly format: {
      readonly type: import('vue').PropType<(percentage: number) => string>
    }
    readonly strokeLinecap: {
      readonly type: import('vue').PropType<'butt' | 'round' | 'square'>
      readonly default: 'round'
    }
    readonly striped: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly stripedFlow: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly indeterminate: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly duration: {
      readonly type: NumberConstructor
      readonly default: 3
    }
    readonly steps: {
      readonly type: NumberConstructor
      readonly default: 0
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
      readonly type: {
        readonly type: import('vue').PropType<import('./progress').ProgressType>
        readonly default: 'line'
      }
      readonly percentage: {
        readonly type: import('vue').PropType<number | number[]>
        readonly default: 0
      }
      readonly secondaryPercentage: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly status: {
        readonly type: import('vue').PropType<import('./progress').ProgressStatus>
      }
      readonly strokeWidth: {
        readonly type: NumberConstructor
        readonly default: 6
      }
      readonly textInside: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly width: {
        readonly type: NumberConstructor
        readonly default: 126
      }
      readonly showText: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly color: {
        readonly type: import('vue').PropType<
          string | ((p: number) => string) | string[] | Record<string, string>
        >
        readonly default: ''
      }
      readonly icon: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly animated: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly defineBackgroundColor: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly format: {
        readonly type: import('vue').PropType<(percentage: number) => string>
      }
      readonly strokeLinecap: {
        readonly type: import('vue').PropType<'butt' | 'round' | 'square'>
        readonly default: 'round'
      }
      readonly striped: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly stripedFlow: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly indeterminate: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly duration: {
        readonly type: NumberConstructor
        readonly default: 3
      }
      readonly steps: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly steps: number
    readonly type: 'circle' | 'line' | 'dashboard'
    readonly width: number
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: string
    readonly color: string | string[] | Record<string, string> | ((p: number) => string)
    readonly strokeLinecap: 'round' | 'butt' | 'square'
    readonly strokeWidth: number
    readonly duration: number
    readonly indeterminate: boolean
    readonly showText: boolean
    readonly animated: boolean
    readonly percentage: number | number[]
    readonly secondaryPercentage: number
    readonly textInside: boolean
    readonly defineBackgroundColor: string
    readonly striped: boolean
    readonly stripedFlow: boolean
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
