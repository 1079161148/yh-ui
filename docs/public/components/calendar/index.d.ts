import Calendar from './src/calendar.vue'
export declare const YhCalendar: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
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
            readonly type: import('vue').PropType<import('./index.js').CalendarMode>
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
            readonly type: import('vue').PropType<import('./index.js').HolidayMap>
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
            readonly type: import('vue').PropType<import('./index.js').CalendarRangeValue>
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
          onSelect?: ((date: Date, cell: import('./index.js').CalendarDateCell) => any) | undefined
          onChange?: ((value: Date) => any) | undefined
          'onUpdate:modelValue'?: ((value: Date) => any) | undefined
          'onPanel-change'?:
            | ((date: Date, mode: import('./index.js').CalendarMode) => any)
            | undefined
          'onUpdate:mode'?: ((mode: import('./index.js').CalendarMode) => any) | undefined
          'onUpdate:rangeValue'?:
            | ((value: import('./index.js').CalendarRangeValue) => any)
            | undefined
          'onUpdate:multipleValue'?: ((value: Date[]) => any) | undefined
          'onRange-change'?: ((value: import('./index.js').CalendarRangeValue) => any) | undefined
        }>,
      {
        displayDate: import('vue').Ref<import('dayjs').Dayjs>
        selectedDate: import('vue').Ref<import('dayjs').Dayjs | undefined>
        moveMonth: (delta: number) => void
        goToday: () => void
        selectDate: (cell: import('./index.js').CalendarDateCell) => void
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        select: (date: Date, cell: import('./index.js').CalendarDateCell) => void
        change: (value: Date) => void
        'update:modelValue': (value: Date) => void
        'panel-change': (date: Date, mode: import('./index.js').CalendarMode) => void
        'update:mode': (mode: import('./index.js').CalendarMode) => void
        'update:rangeValue': (value: import('./index.js').CalendarRangeValue) => void
        'update:multipleValue': (value: Date[]) => void
        'range-change': (value: import('./index.js').CalendarRangeValue) => void
      },
      import('vue').PublicProps,
      {
        readonly size: 'large' | 'default' | 'small'
        readonly mode: import('./index.js').CalendarMode
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
        readonly holidays: import('./index.js').HolidayMap
        readonly showWeekNumber: boolean
        readonly rangeValue: import('./index.js').CalendarRangeValue
        readonly multipleValue: Date[]
        readonly cellClassName: (date: Date) => string | string[] | Record<string, boolean>
        readonly showOtherMonths: boolean
        readonly highlightWeekends: boolean
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
            readonly type: import('vue').PropType<Date>
            readonly default: undefined
          }
          readonly defaultValue: {
            readonly type: import('vue').PropType<Date>
            readonly default: undefined
          }
          readonly mode: {
            readonly type: import('vue').PropType<import('./index.js').CalendarMode>
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
            readonly type: import('vue').PropType<import('./index.js').HolidayMap>
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
            readonly type: import('vue').PropType<import('./index.js').CalendarRangeValue>
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
          onSelect?: ((date: Date, cell: import('./index.js').CalendarDateCell) => any) | undefined
          onChange?: ((value: Date) => any) | undefined
          'onUpdate:modelValue'?: ((value: Date) => any) | undefined
          'onPanel-change'?:
            | ((date: Date, mode: import('./index.js').CalendarMode) => any)
            | undefined
          'onUpdate:mode'?: ((mode: import('./index.js').CalendarMode) => any) | undefined
          'onUpdate:rangeValue'?:
            | ((value: import('./index.js').CalendarRangeValue) => any)
            | undefined
          'onUpdate:multipleValue'?: ((value: Date[]) => any) | undefined
          'onRange-change'?: ((value: import('./index.js').CalendarRangeValue) => any) | undefined
        }>,
      {
        displayDate: import('vue').Ref<import('dayjs').Dayjs>
        selectedDate: import('vue').Ref<import('dayjs').Dayjs | undefined>
        moveMonth: (delta: number) => void
        goToday: () => void
        selectDate: (cell: import('./index.js').CalendarDateCell) => void
      },
      {},
      {},
      {},
      {
        readonly size: 'large' | 'default' | 'small'
        readonly mode: import('./index.js').CalendarMode
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
        readonly holidays: import('./index.js').HolidayMap
        readonly showWeekNumber: boolean
        readonly rangeValue: import('./index.js').CalendarRangeValue
        readonly multipleValue: Date[]
        readonly cellClassName: (date: Date) => string | string[] | Record<string, boolean>
        readonly showOtherMonths: boolean
        readonly highlightWeekends: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
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
          readonly type: import('vue').PropType<import('./index.js').CalendarMode>
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
          readonly type: import('vue').PropType<import('./index.js').HolidayMap>
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
          readonly type: import('vue').PropType<import('./index.js').CalendarRangeValue>
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
        onSelect?: ((date: Date, cell: import('./index.js').CalendarDateCell) => any) | undefined
        onChange?: ((value: Date) => any) | undefined
        'onUpdate:modelValue'?: ((value: Date) => any) | undefined
        'onPanel-change'?:
          | ((date: Date, mode: import('./index.js').CalendarMode) => any)
          | undefined
        'onUpdate:mode'?: ((mode: import('./index.js').CalendarMode) => any) | undefined
        'onUpdate:rangeValue'?:
          | ((value: import('./index.js').CalendarRangeValue) => any)
          | undefined
        'onUpdate:multipleValue'?: ((value: Date[]) => any) | undefined
        'onRange-change'?: ((value: import('./index.js').CalendarRangeValue) => any) | undefined
      }>,
    {
      displayDate: import('vue').Ref<import('dayjs').Dayjs>
      selectedDate: import('vue').Ref<import('dayjs').Dayjs | undefined>
      moveMonth: (delta: number) => void
      goToday: () => void
      selectDate: (cell: import('./index.js').CalendarDateCell) => void
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      select: (date: Date, cell: import('./index.js').CalendarDateCell) => void
      change: (value: Date) => void
      'update:modelValue': (value: Date) => void
      'panel-change': (date: Date, mode: import('./index.js').CalendarMode) => void
      'update:mode': (mode: import('./index.js').CalendarMode) => void
      'update:rangeValue': (value: import('./index.js').CalendarRangeValue) => void
      'update:multipleValue': (value: Date[]) => void
      'range-change': (value: import('./index.js').CalendarRangeValue) => void
    },
    string,
    {
      readonly size: 'large' | 'default' | 'small'
      readonly mode: import('./index.js').CalendarMode
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
      readonly holidays: import('./index.js').HolidayMap
      readonly showWeekNumber: boolean
      readonly rangeValue: import('./index.js').CalendarRangeValue
      readonly multipleValue: Date[]
      readonly cellClassName: (date: Date) => string | string[] | Record<string, boolean>
      readonly showOtherMonths: boolean
      readonly highlightWeekends: boolean
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
        header?: (props: { date: string }) => any
      } & {
        'date-cell'?: (props: {
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
        }) => any
      } & {
        footer?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhCalendar
export * from './src/calendar'
export type CalendarInstance = InstanceType<typeof Calendar>
export type YhCalendarInstance = CalendarInstance
export type YhCalendarProps = import('./src/calendar').CalendarProps
export type YhCalendarEmits = import('./src/calendar').CalendarEmits
export type YhCalendarSlots = import('./src/calendar').CalendarSlots
export type YhCalendarExpose = import('./src/calendar').CalendarExpose
export type YhCalendarDateCell = import('./src/calendar').CalendarDateCell
export type YhCalendarHolidayInfo = import('./src/calendar').HolidayInfo
export type YhCalendarHolidayMap = import('./src/calendar').HolidayMap
export type YhCalendarRangeValue = import('./src/calendar').CalendarRangeValue
export type YhCalendarMode = import('./src/calendar').CalendarMode
