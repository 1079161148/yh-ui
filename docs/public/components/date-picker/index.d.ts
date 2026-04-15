import DatePicker from './src/date-picker.vue'
export declare const YhDatePicker: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly modelValue: {
            readonly type: import('vue').PropType<
              import('./index.js').DateValue | import('./index.js').DateRangeValue
            >
            readonly default: null
          }
          readonly type: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerType>
            readonly default: 'date'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly readonly: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly clearable: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly size: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerSize>
            readonly default: 'default'
          }
          readonly placeholder: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly startPlaceholder: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly endPlaceholder: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly format: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly valueFormat: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly dateFormat: {
            readonly type: StringConstructor
            readonly default: 'YYYY-MM-DD'
          }
          readonly timeFormat: {
            readonly type: StringConstructor
            readonly default: 'HH:mm:ss'
          }
          readonly rangeSeparator: {
            readonly type: StringConstructor
            readonly default: '-'
          }
          readonly firstDayOfWeek: {
            readonly type: NumberConstructor
            readonly default: 7
          }
          readonly disabledDate: {
            readonly type: import('vue').PropType<(date: Date) => boolean>
            readonly default: undefined
          }
          readonly presets: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerPreset[]>
            readonly default: () => never[]
          }
          readonly presetPosition: {
            readonly type: import('vue').PropType<'left' | 'right' | 'top' | 'bottom'>
            readonly default: 'bottom'
          }
          readonly showFooter: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly status: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerStatus>
            readonly default: undefined
          }
          readonly orderOnConfirm: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly prefixIcon: {
            readonly type: import('vue').PropType<string | import('vue').Component>
            readonly default: ''
          }
          readonly clearIcon: {
            readonly type: import('vue').PropType<string | import('vue').Component>
            readonly default: ''
          }
          readonly defaultValue: {
            readonly type: import('vue').PropType<Date | Date[]>
            readonly default: undefined
          }
          readonly panelOnly: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly defaultTime: {
            readonly type: import('vue').PropType<Date | Date[]>
            readonly default: undefined
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly validateEvent: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly name: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly id: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly cellShape: {
            readonly type: import('vue').PropType<'round' | 'square'>
            readonly default: 'round'
          }
          readonly cellRender: {
            readonly type: import('vue').PropType<
              (date: Date) =>
                | string
                | {
                    text: string
                    className?: string
                  }
            >
            readonly default: undefined
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClear?: (() => any) | undefined
          onConfirm?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').DateValue, import('./index.js').DateValue]
                  | null
              ) => any)
            | undefined
          onFocus?: ((event: FocusEvent) => any) | undefined
          onChange?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').DateValue, import('./index.js').DateValue]
                  | null
              ) => any)
            | undefined
          onBlur?: ((event: FocusEvent) => any) | undefined
          'onUpdate:modelValue'?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').DateValue, import('./index.js').DateValue]
                  | null
              ) => any)
            | undefined
          'onVisible-change'?: ((visible: boolean) => any) | undefined
          'onPanel-change'?:
            | ((value: Date, mode: import('./index.js').PanelView) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {} & {
        clear: () => any
        confirm: (
          value:
            | string
            | number
            | Date
            | [import('./index.js').DateValue, import('./index.js').DateValue]
            | null
        ) => any
        focus: (event: FocusEvent) => any
        change: (
          value:
            | string
            | number
            | Date
            | [import('./index.js').DateValue, import('./index.js').DateValue]
            | null
        ) => any
        blur: (event: FocusEvent) => any
        'update:modelValue': (
          value:
            | string
            | number
            | Date
            | [import('./index.js').DateValue, import('./index.js').DateValue]
            | null
        ) => any
        'visible-change': (visible: boolean) => any
        'panel-change': (value: Date, mode: import('./index.js').PanelView) => any
      },
      import('vue').PublicProps,
      {
        readonly size: import('./index.js').DatePickerSize
        readonly name: string
        readonly id: string
        readonly placeholder: string
        readonly startPlaceholder: string
        readonly endPlaceholder: string
        readonly status: import('./index.js').DatePickerStatus
        readonly readonly: boolean
        readonly type: import('./index.js').DatePickerType
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue:
          | string
          | number
          | Date
          | [import('./index.js').DateValue, import('./index.js').DateValue]
          | null
        readonly clearable: boolean
        readonly prefixIcon: string | import('vue').Component
        readonly clearIcon: string | import('vue').Component
        readonly validateEvent: boolean
        readonly format: string
        readonly popperClass: string
        readonly teleported: boolean
        readonly valueFormat: string
        readonly rangeSeparator: string
        readonly defaultValue: Date | Date[]
        readonly showFooter: boolean
        readonly orderOnConfirm: boolean
        readonly disabledDate: (date: Date) => boolean
        readonly firstDayOfWeek: number
        readonly cellShape: 'round' | 'square'
        readonly cellRender: (date: Date) =>
          | string
          | {
              text: string
              className?: string
            }
        readonly dateFormat: string
        readonly timeFormat: string
        readonly presets: import('./index.js').DatePickerPreset[]
        readonly presetPosition: 'top' | 'left' | 'right' | 'bottom'
        readonly panelOnly: boolean
        readonly defaultTime: Date | Date[]
      },
      true,
      {},
      {},
      import('vue').GlobalComponents,
      import('vue').GlobalDirectives,
      string,
      {},
      any,
      import('vue').ComponentProvideOptions,
      {
        P: {}
        B: {}
        D: {}
        C: {}
        M: {}
        Defaults: {}
      },
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly modelValue: {
            readonly type: import('vue').PropType<
              import('./index.js').DateValue | import('./index.js').DateRangeValue
            >
            readonly default: null
          }
          readonly type: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerType>
            readonly default: 'date'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly readonly: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly clearable: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly size: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerSize>
            readonly default: 'default'
          }
          readonly placeholder: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly startPlaceholder: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly endPlaceholder: {
            readonly type: StringConstructor
            readonly default: undefined
          }
          readonly format: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly valueFormat: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly dateFormat: {
            readonly type: StringConstructor
            readonly default: 'YYYY-MM-DD'
          }
          readonly timeFormat: {
            readonly type: StringConstructor
            readonly default: 'HH:mm:ss'
          }
          readonly rangeSeparator: {
            readonly type: StringConstructor
            readonly default: '-'
          }
          readonly firstDayOfWeek: {
            readonly type: NumberConstructor
            readonly default: 7
          }
          readonly disabledDate: {
            readonly type: import('vue').PropType<(date: Date) => boolean>
            readonly default: undefined
          }
          readonly presets: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerPreset[]>
            readonly default: () => never[]
          }
          readonly presetPosition: {
            readonly type: import('vue').PropType<'left' | 'right' | 'top' | 'bottom'>
            readonly default: 'bottom'
          }
          readonly showFooter: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly status: {
            readonly type: import('vue').PropType<import('./index.js').DatePickerStatus>
            readonly default: undefined
          }
          readonly orderOnConfirm: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly prefixIcon: {
            readonly type: import('vue').PropType<string | import('vue').Component>
            readonly default: ''
          }
          readonly clearIcon: {
            readonly type: import('vue').PropType<string | import('vue').Component>
            readonly default: ''
          }
          readonly defaultValue: {
            readonly type: import('vue').PropType<Date | Date[]>
            readonly default: undefined
          }
          readonly panelOnly: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly defaultTime: {
            readonly type: import('vue').PropType<Date | Date[]>
            readonly default: undefined
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly validateEvent: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly name: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly id: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly cellShape: {
            readonly type: import('vue').PropType<'round' | 'square'>
            readonly default: 'round'
          }
          readonly cellRender: {
            readonly type: import('vue').PropType<
              (date: Date) =>
                | string
                | {
                    text: string
                    className?: string
                  }
            >
            readonly default: undefined
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onClear?: (() => any) | undefined
          onConfirm?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').DateValue, import('./index.js').DateValue]
                  | null
              ) => any)
            | undefined
          onFocus?: ((event: FocusEvent) => any) | undefined
          onChange?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').DateValue, import('./index.js').DateValue]
                  | null
              ) => any)
            | undefined
          onBlur?: ((event: FocusEvent) => any) | undefined
          'onUpdate:modelValue'?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').DateValue, import('./index.js').DateValue]
                  | null
              ) => any)
            | undefined
          'onVisible-change'?: ((visible: boolean) => any) | undefined
          'onPanel-change'?:
            | ((value: Date, mode: import('./index.js').PanelView) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly size: import('./index.js').DatePickerSize
        readonly name: string
        readonly id: string
        readonly placeholder: string
        readonly startPlaceholder: string
        readonly endPlaceholder: string
        readonly status: import('./index.js').DatePickerStatus
        readonly readonly: boolean
        readonly type: import('./index.js').DatePickerType
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly modelValue:
          | string
          | number
          | Date
          | [import('./index.js').DateValue, import('./index.js').DateValue]
          | null
        readonly clearable: boolean
        readonly prefixIcon: string | import('vue').Component
        readonly clearIcon: string | import('vue').Component
        readonly validateEvent: boolean
        readonly format: string
        readonly popperClass: string
        readonly teleported: boolean
        readonly valueFormat: string
        readonly rangeSeparator: string
        readonly defaultValue: Date | Date[]
        readonly showFooter: boolean
        readonly orderOnConfirm: boolean
        readonly disabledDate: (date: Date) => boolean
        readonly firstDayOfWeek: number
        readonly cellShape: 'round' | 'square'
        readonly cellRender: (date: Date) =>
          | string
          | {
              text: string
              className?: string
            }
        readonly dateFormat: string
        readonly timeFormat: string
        readonly presets: import('./index.js').DatePickerPreset[]
        readonly presetPosition: 'top' | 'left' | 'right' | 'bottom'
        readonly panelOnly: boolean
        readonly defaultTime: Date | Date[]
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly modelValue: {
          readonly type: import('vue').PropType<
            import('./index.js').DateValue | import('./index.js').DateRangeValue
          >
          readonly default: null
        }
        readonly type: {
          readonly type: import('vue').PropType<import('./index.js').DatePickerType>
          readonly default: 'date'
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly readonly: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly clearable: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly size: {
          readonly type: import('vue').PropType<import('./index.js').DatePickerSize>
          readonly default: 'default'
        }
        readonly placeholder: {
          readonly type: StringConstructor
          readonly default: undefined
        }
        readonly startPlaceholder: {
          readonly type: StringConstructor
          readonly default: undefined
        }
        readonly endPlaceholder: {
          readonly type: StringConstructor
          readonly default: undefined
        }
        readonly format: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly valueFormat: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly dateFormat: {
          readonly type: StringConstructor
          readonly default: 'YYYY-MM-DD'
        }
        readonly timeFormat: {
          readonly type: StringConstructor
          readonly default: 'HH:mm:ss'
        }
        readonly rangeSeparator: {
          readonly type: StringConstructor
          readonly default: '-'
        }
        readonly firstDayOfWeek: {
          readonly type: NumberConstructor
          readonly default: 7
        }
        readonly disabledDate: {
          readonly type: import('vue').PropType<(date: Date) => boolean>
          readonly default: undefined
        }
        readonly presets: {
          readonly type: import('vue').PropType<import('./index.js').DatePickerPreset[]>
          readonly default: () => never[]
        }
        readonly presetPosition: {
          readonly type: import('vue').PropType<'left' | 'right' | 'top' | 'bottom'>
          readonly default: 'bottom'
        }
        readonly showFooter: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly status: {
          readonly type: import('vue').PropType<import('./index.js').DatePickerStatus>
          readonly default: undefined
        }
        readonly orderOnConfirm: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly prefixIcon: {
          readonly type: import('vue').PropType<string | import('vue').Component>
          readonly default: ''
        }
        readonly clearIcon: {
          readonly type: import('vue').PropType<string | import('vue').Component>
          readonly default: ''
        }
        readonly defaultValue: {
          readonly type: import('vue').PropType<Date | Date[]>
          readonly default: undefined
        }
        readonly panelOnly: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly defaultTime: {
          readonly type: import('vue').PropType<Date | Date[]>
          readonly default: undefined
        }
        readonly popperClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly teleported: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly validateEvent: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly name: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly id: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly cellShape: {
          readonly type: import('vue').PropType<'round' | 'square'>
          readonly default: 'round'
        }
        readonly cellRender: {
          readonly type: import('vue').PropType<
            (date: Date) =>
              | string
              | {
                  text: string
                  className?: string
                }
          >
          readonly default: undefined
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onClear?: (() => any) | undefined
        onConfirm?:
          | ((
              value:
                | string
                | number
                | Date
                | [import('./index.js').DateValue, import('./index.js').DateValue]
                | null
            ) => any)
          | undefined
        onFocus?: ((event: FocusEvent) => any) | undefined
        onChange?:
          | ((
              value:
                | string
                | number
                | Date
                | [import('./index.js').DateValue, import('./index.js').DateValue]
                | null
            ) => any)
          | undefined
        onBlur?: ((event: FocusEvent) => any) | undefined
        'onUpdate:modelValue'?:
          | ((
              value:
                | string
                | number
                | Date
                | [import('./index.js').DateValue, import('./index.js').DateValue]
                | null
            ) => any)
          | undefined
        'onVisible-change'?: ((visible: boolean) => any) | undefined
        'onPanel-change'?: ((value: Date, mode: import('./index.js').PanelView) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {} & {
      clear: () => any
      confirm: (
        value:
          | string
          | number
          | Date
          | [import('./index.js').DateValue, import('./index.js').DateValue]
          | null
      ) => any
      focus: (event: FocusEvent) => any
      change: (
        value:
          | string
          | number
          | Date
          | [import('./index.js').DateValue, import('./index.js').DateValue]
          | null
      ) => any
      blur: (event: FocusEvent) => any
      'update:modelValue': (
        value:
          | string
          | number
          | Date
          | [import('./index.js').DateValue, import('./index.js').DateValue]
          | null
      ) => any
      'visible-change': (visible: boolean) => any
      'panel-change': (value: Date, mode: import('./index.js').PanelView) => any
    },
    string,
    {
      readonly size: import('./index.js').DatePickerSize
      readonly name: string
      readonly id: string
      readonly placeholder: string
      readonly startPlaceholder: string
      readonly endPlaceholder: string
      readonly status: import('./index.js').DatePickerStatus
      readonly readonly: boolean
      readonly type: import('./index.js').DatePickerType
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly modelValue:
        | string
        | number
        | Date
        | [import('./index.js').DateValue, import('./index.js').DateValue]
        | null
      readonly clearable: boolean
      readonly prefixIcon: string | import('vue').Component
      readonly clearIcon: string | import('vue').Component
      readonly validateEvent: boolean
      readonly format: string
      readonly popperClass: string
      readonly teleported: boolean
      readonly valueFormat: string
      readonly rangeSeparator: string
      readonly defaultValue: Date | Date[]
      readonly showFooter: boolean
      readonly orderOnConfirm: boolean
      readonly disabledDate: (date: Date) => boolean
      readonly firstDayOfWeek: number
      readonly cellShape: 'round' | 'square'
      readonly cellRender: (date: Date) =>
        | string
        | {
            text: string
            className?: string
          }
      readonly dateFormat: string
      readonly timeFormat: string
      readonly presets: import('./index.js').DatePickerPreset[]
      readonly presetPosition: 'top' | 'left' | 'right' | 'bottom'
      readonly panelOnly: boolean
      readonly defaultTime: Date | Date[]
    },
    {},
    string,
    {},
    import('vue').GlobalComponents,
    import('vue').GlobalDirectives,
    string,
    import('vue').ComponentProvideOptions
  > &
    import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps &
    (new () => {
      $slots: {
        'prefix-icon'?: (props: {}) => any
      } & {
        'clear-icon'?: (props: {}) => any
      } & {
        'date-cell'?: (props: { cell: import('./src/panel-utils.js').CalendarCell }) => any
      } & {
        extra?: (props: {}) => any
      } & {
        footer?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhDatePicker
export * from './src/date-picker'
export type DatePickerInstance = InstanceType<typeof DatePicker>
export type YhDatePickerInstance = DatePickerInstance
export type YhDatePickerProps = import('./src/date-picker').DatePickerProps
export type YhDatePickerEmits = import('./src/date-picker').DatePickerEmits
export type YhDatePickerSlots = import('./src/date-picker').DatePickerSlots
export type YhDatePickerPreset = import('./src/date-picker').DatePickerPreset
export type YhDatePickerValue = import('./src/date-picker').DateValue
export type YhDatePickerRangeValue = import('./src/date-picker').DateRangeValue
export type YhDatePickerPanelView = import('./src/date-picker').PanelView
