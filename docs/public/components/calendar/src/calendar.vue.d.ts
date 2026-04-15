import type { Dayjs } from '../../dayjs'
import { type CalendarDateCell, type HolidayMap } from './calendar'
declare var __VLS_1: {
    date: string
  },
  __VLS_27: {
    data: {
      isSelected: boolean
      type: 'prev-month' | 'current-month' | 'next-month'
      day: string
      date: Date
      isToday: boolean
      isDisabled: boolean
      isWeekend: boolean
      isHoliday: boolean
      holidayName: string | undefined
      isWorkday: boolean
      isInRange: boolean | undefined
      isRangeStart: boolean | undefined
      isRangeEnd: boolean | undefined
    }
  },
  __VLS_29: {}
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any
} & {
  'date-cell'?: (props: typeof __VLS_27) => any
} & {
  footer?: (props: typeof __VLS_29) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly modelValue: {
      readonly type: import('vue').PropType<Date>
      readonly default: undefined
    }
    readonly defaultValue: {
      readonly type: import('vue').PropType<Date>
      readonly default: undefined
    }
    readonly mode: {
      readonly type: import('vue').PropType<import('./calendar').CalendarMode>
      readonly default: 'month'
    }
    readonly firstDayOfWeek: {
      readonly type: NumberConstructor
      readonly default: 7
      readonly validator: (val: number) => boolean
    }
    readonly minDate: {
      readonly type: import('vue').PropType<Date>
    }
    readonly maxDate: {
      readonly type: import('vue').PropType<Date>
    }
    readonly readonly: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly monthHeaderFormat: {
      readonly type: StringConstructor
      readonly default: undefined
    }
    readonly showHoliday: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly holidays: {
      readonly type: import('vue').PropType<HolidayMap>
      readonly default: () => {}
    }
    readonly showWeekNumber: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly fullscreen: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly selectionMode: {
      readonly type: import('vue').PropType<'single' | 'range' | 'multiple'>
      readonly default: 'single'
    }
    readonly rangeValue: {
      readonly type: import('vue').PropType<import('./calendar').CalendarRangeValue>
      readonly default: undefined
    }
    readonly multipleValue: {
      readonly type: import('vue').PropType<Date[]>
      readonly default: () => never[]
    }
    readonly disabledDate: {
      readonly type: import('vue').PropType<(date: Date) => boolean>
      readonly default: undefined
    }
    readonly cellClassName: {
      readonly type: import('vue').PropType<
        (date: Date) => string | string[] | Record<string, boolean>
      >
      readonly default: undefined
    }
    readonly showOtherMonths: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly highlightWeekends: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly size: {
      readonly type: import('vue').PropType<'small' | 'default' | 'large'>
      readonly default: 'default'
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').CalendarThemeVars>
      readonly default: undefined
    }
  }>,
  {
    displayDate: import('vue').Ref<Dayjs>
    selectedDate: import('vue').Ref<Dayjs | undefined>
    moveMonth: (delta: number) => void
    goToday: () => void
    selectDate: (cell: CalendarDateCell) => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    select: (date: Date, cell: CalendarDateCell) => void
    change: (value: Date) => void
    'update:modelValue': (value: Date) => void
    'panel-change': (date: Date, mode: import('./calendar').CalendarMode) => void
    'update:mode': (mode: import('./calendar').CalendarMode) => void
    'update:rangeValue': (value: import('./calendar').CalendarRangeValue) => void
    'update:multipleValue': (value: Date[]) => void
    'range-change': (value: import('./calendar').CalendarRangeValue) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly modelValue: {
        readonly type: import('vue').PropType<Date>
        readonly default: undefined
      }
      readonly defaultValue: {
        readonly type: import('vue').PropType<Date>
        readonly default: undefined
      }
      readonly mode: {
        readonly type: import('vue').PropType<import('./calendar').CalendarMode>
        readonly default: 'month'
      }
      readonly firstDayOfWeek: {
        readonly type: NumberConstructor
        readonly default: 7
        readonly validator: (val: number) => boolean
      }
      readonly minDate: {
        readonly type: import('vue').PropType<Date>
      }
      readonly maxDate: {
        readonly type: import('vue').PropType<Date>
      }
      readonly readonly: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly monthHeaderFormat: {
        readonly type: StringConstructor
        readonly default: undefined
      }
      readonly showHoliday: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly holidays: {
        readonly type: import('vue').PropType<HolidayMap>
        readonly default: () => {}
      }
      readonly showWeekNumber: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly fullscreen: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly selectionMode: {
        readonly type: import('vue').PropType<'single' | 'range' | 'multiple'>
        readonly default: 'single'
      }
      readonly rangeValue: {
        readonly type: import('vue').PropType<import('./calendar').CalendarRangeValue>
        readonly default: undefined
      }
      readonly multipleValue: {
        readonly type: import('vue').PropType<Date[]>
        readonly default: () => never[]
      }
      readonly disabledDate: {
        readonly type: import('vue').PropType<(date: Date) => boolean>
        readonly default: undefined
      }
      readonly cellClassName: {
        readonly type: import('vue').PropType<
          (date: Date) => string | string[] | Record<string, boolean>
        >
        readonly default: undefined
      }
      readonly showOtherMonths: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly highlightWeekends: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly size: {
        readonly type: import('vue').PropType<'small' | 'default' | 'large'>
        readonly default: 'default'
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').CalendarThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onSelect?: ((date: Date, cell: CalendarDateCell) => any) | undefined
      onChange?: ((value: Date) => any) | undefined
      'onUpdate:modelValue'?: ((value: Date) => any) | undefined
      'onPanel-change'?: ((date: Date, mode: import('./calendar').CalendarMode) => any) | undefined
      'onUpdate:mode'?: ((mode: import('./calendar').CalendarMode) => any) | undefined
      'onUpdate:rangeValue'?: ((value: import('./calendar').CalendarRangeValue) => any) | undefined
      'onUpdate:multipleValue'?: ((value: Date[]) => any) | undefined
      'onRange-change'?: ((value: import('./calendar').CalendarRangeValue) => any) | undefined
    }>,
  {
    readonly size: 'large' | 'default' | 'small'
    readonly mode: import('./calendar').CalendarMode
    readonly monthHeaderFormat: string
    readonly fullscreen: boolean
    readonly readonly: boolean
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').CalendarThemeVars
    readonly modelValue: Date
    readonly defaultValue: Date
    readonly selectionMode: 'range' | 'multiple' | 'single'
    readonly disabledDate: (date: Date) => boolean
    readonly firstDayOfWeek: number
    readonly showHoliday: boolean
    readonly holidays: HolidayMap
    readonly showWeekNumber: boolean
    readonly rangeValue: import('./calendar').CalendarRangeValue
    readonly multipleValue: Date[]
    readonly cellClassName: (date: Date) => string | string[] | Record<string, boolean>
    readonly showOtherMonths: boolean
    readonly highlightWeekends: boolean
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
