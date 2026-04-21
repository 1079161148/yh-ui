import {
  type DateValue,
  type DateRangeValue,
  type PanelView,
  type DatePickerType
} from './date-picker'
declare var __VLS_1: {},
  __VLS_7: {},
  __VLS_29: {
    cell: import('./panel-utils').CalendarCell
  },
  __VLS_55: {},
  __VLS_57: {}
type __VLS_Slots = {} & {
  'prefix-icon'?: (props: typeof __VLS_1) => any
} & {
  'clear-icon'?: (props: typeof __VLS_7) => any
} & {
  'date-cell'?: (props: typeof __VLS_29) => any
} & {
  extra?: (props: typeof __VLS_55) => any
} & {
  footer?: (props: typeof __VLS_57) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly modelValue: {
      readonly type: import('vue').PropType<DateValue | DateRangeValue>
      readonly default: null
    }
    readonly type: {
      readonly type: import('vue').PropType<DatePickerType>
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
      readonly type: import('vue').PropType<import('./date-picker').DatePickerSize>
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
      readonly type: import('vue').PropType<import('./date-picker').DatePickerPreset[]>
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
      readonly type: import('vue').PropType<import('./date-picker').DatePickerStatus>
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
              className?: /**
               * YhDatePicker - 统一日期选择器
               * @description 融合日期、时间、范围、年、月、季度等多种模式于一体。采用业内最佳实践设计。
               */
              string
            }
      >
      readonly default: undefined
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
  {} & {
    clear: () => any
    confirm: (value: string | number | Date | [DateValue, DateValue] | null) => any
    focus: (event: FocusEvent) => any
    change: (value: string | number | Date | [DateValue, DateValue] | null) => any
    blur: (event: FocusEvent) => any
    'update:modelValue': (value: string | number | Date | [DateValue, DateValue] | null) => any
    'visible-change': (visible: boolean) => any
    'panel-change': (value: Date, mode: PanelView) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly modelValue: {
        readonly type: import('vue').PropType<DateValue | DateRangeValue>
        readonly default: null
      }
      readonly type: {
        readonly type: import('vue').PropType<DatePickerType>
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
        readonly type: import('vue').PropType<import('./date-picker').DatePickerSize>
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
        readonly type: import('vue').PropType<import('./date-picker').DatePickerPreset[]>
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
        readonly type: import('vue').PropType<import('./date-picker').DatePickerStatus>
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
                className?: /**
                 * YhDatePicker - 统一日期选择器
                 * @description 融合日期、时间、范围、年、月、季度等多种模式于一体。采用业内最佳实践设计。
                 */
                string
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
        | ((value: string | number | Date | [DateValue, DateValue] | null) => any)
        | undefined
      onFocus?: ((event: FocusEvent) => any) | undefined
      onChange?:
        | ((value: string | number | Date | [DateValue, DateValue] | null) => any)
        | undefined
      onBlur?: ((event: FocusEvent) => any) | undefined
      'onUpdate:modelValue'?:
        | ((value: string | number | Date | [DateValue, DateValue] | null) => any)
        | undefined
      'onVisible-change'?: ((visible: boolean) => any) | undefined
      'onPanel-change'?: ((value: Date, mode: PanelView) => any) | undefined
    }>,
  {
    readonly size: import('./date-picker').DatePickerSize
    readonly name: string
    readonly id: string
    readonly placeholder: string
    readonly startPlaceholder: string
    readonly endPlaceholder: string
    readonly status: import('./date-picker').DatePickerStatus
    readonly readonly: boolean
    readonly type: DatePickerType
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly modelValue: string | number | Date | [DateValue, DateValue] | null
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
          className?: /**
           * YhDatePicker - 统一日期选择器
           * @description 融合日期、时间、范围、年、月、季度等多种模式于一体。采用业内最佳实践设计。
           */
          string
        }
    readonly dateFormat: string
    readonly timeFormat: string
    readonly presets: import('./date-picker').DatePickerPreset[]
    readonly presetPosition: 'top' | 'left' | 'right' | 'bottom'
    readonly panelOnly: boolean
    readonly defaultTime: Date | Date[]
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
