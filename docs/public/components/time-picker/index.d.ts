import TimePicker from './src/time-picker.vue'
export declare const YhTimePicker: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<import('./index.js').TimePickerProps> &
        Readonly<{
          onClear?: (() => any) | undefined
          onConfirm?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').TimeValue, import('./index.js').TimeValue]
                  | null
              ) => any)
            | undefined
          onCancel?: (() => any) | undefined
          onFocus?: ((event: FocusEvent) => any) | undefined
          onChange?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').TimeValue, import('./index.js').TimeValue]
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
                  | [import('./index.js').TimeValue, import('./index.js').TimeValue]
                  | null
              ) => any)
            | undefined
          'onVisible-change'?: ((visible: boolean) => any) | undefined
        }>,
      {
        focus: () => void
        blur: () => void
        open: () => void
        close: () => void
        inputRef: import('vue').Ref<HTMLInputElement | undefined>
      },
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
            | [import('./index.js').TimeValue, import('./index.js').TimeValue]
            | null
        ) => any
        cancel: () => any
        focus: (event: FocusEvent) => any
        change: (
          value:
            | string
            | number
            | Date
            | [import('./index.js').TimeValue, import('./index.js').TimeValue]
            | null
        ) => any
        blur: (event: FocusEvent) => any
        'update:modelValue': (
          value:
            | string
            | number
            | Date
            | [import('./index.js').TimeValue, import('./index.js').TimeValue]
            | null
        ) => any
        'visible-change': (visible: boolean) => any
      },
      import('vue').PublicProps,
      {
        size: import('./index.js').TimePickerSize
        placeholder: string
        startPlaceholder: string
        endPlaceholder: string
        disabled: boolean
        clearable: boolean
        tabindex: number | string
        validateEvent: boolean
        editable: boolean
        format: string
        teleported: boolean
        showSeconds: boolean
        arrowControl: boolean
        hourStep: number
        minuteStep: number
        secondStep: number
        use12Hours: boolean
        isRange: boolean
        popperOffset: number
        rangeSeparator: string
        hideOnBlur: boolean
        confirmText: string
        cancelText: string
        nowText: string
        showFooter: boolean
        showNow: boolean
        orderOnConfirm: boolean
      },
      false,
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
      Readonly<import('./index.js').TimePickerProps> &
        Readonly<{
          onClear?: (() => any) | undefined
          onConfirm?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').TimeValue, import('./index.js').TimeValue]
                  | null
              ) => any)
            | undefined
          onCancel?: (() => any) | undefined
          onFocus?: ((event: FocusEvent) => any) | undefined
          onChange?:
            | ((
                value:
                  | string
                  | number
                  | Date
                  | [import('./index.js').TimeValue, import('./index.js').TimeValue]
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
                  | [import('./index.js').TimeValue, import('./index.js').TimeValue]
                  | null
              ) => any)
            | undefined
          'onVisible-change'?: ((visible: boolean) => any) | undefined
        }>,
      {
        focus: () => void
        blur: () => void
        open: () => void
        close: () => void
        inputRef: import('vue').Ref<HTMLInputElement | undefined>
      },
      {},
      {},
      {},
      {
        size: import('./index.js').TimePickerSize
        placeholder: string
        startPlaceholder: string
        endPlaceholder: string
        disabled: boolean
        clearable: boolean
        tabindex: number | string
        validateEvent: boolean
        editable: boolean
        format: string
        teleported: boolean
        showSeconds: boolean
        arrowControl: boolean
        hourStep: number
        minuteStep: number
        secondStep: number
        use12Hours: boolean
        isRange: boolean
        popperOffset: number
        rangeSeparator: string
        hideOnBlur: boolean
        confirmText: string
        cancelText: string
        nowText: string
        showFooter: boolean
        showNow: boolean
        orderOnConfirm: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<import('./index.js').TimePickerProps> &
      Readonly<{
        onClear?: (() => any) | undefined
        onConfirm?:
          | ((
              value:
                | string
                | number
                | Date
                | [import('./index.js').TimeValue, import('./index.js').TimeValue]
                | null
            ) => any)
          | undefined
        onCancel?: (() => any) | undefined
        onFocus?: ((event: FocusEvent) => any) | undefined
        onChange?:
          | ((
              value:
                | string
                | number
                | Date
                | [import('./index.js').TimeValue, import('./index.js').TimeValue]
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
                | [import('./index.js').TimeValue, import('./index.js').TimeValue]
                | null
            ) => any)
          | undefined
        'onVisible-change'?: ((visible: boolean) => any) | undefined
      }>,
    {
      focus: () => void
      blur: () => void
      open: () => void
      close: () => void
      inputRef: import('vue').Ref<HTMLInputElement | undefined>
    },
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
          | [import('./index.js').TimeValue, import('./index.js').TimeValue]
          | null
      ) => any
      cancel: () => any
      focus: (event: FocusEvent) => any
      change: (
        value:
          | string
          | number
          | Date
          | [import('./index.js').TimeValue, import('./index.js').TimeValue]
          | null
      ) => any
      blur: (event: FocusEvent) => any
      'update:modelValue': (
        value:
          | string
          | number
          | Date
          | [import('./index.js').TimeValue, import('./index.js').TimeValue]
          | null
      ) => any
      'visible-change': (visible: boolean) => any
    },
    string,
    {
      size: import('./index.js').TimePickerSize
      placeholder: string
      startPlaceholder: string
      endPlaceholder: string
      disabled: boolean
      clearable: boolean
      tabindex: number | string
      validateEvent: boolean
      editable: boolean
      format: string
      teleported: boolean
      showSeconds: boolean
      arrowControl: boolean
      hourStep: number
      minuteStep: number
      secondStep: number
      use12Hours: boolean
      isRange: boolean
      popperOffset: number
      rangeSeparator: string
      hideOnBlur: boolean
      confirmText: string
      cancelText: string
      nowText: string
      showFooter: boolean
      showNow: boolean
      orderOnConfirm: boolean
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
        prefix?: (props: {}) => any
      } & {
        rangeSeparator?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhTimePicker
export * from './src/time-picker'
export type TimePickerInstance = InstanceType<typeof TimePicker>
export type YhTimePickerInstance = TimePickerInstance
export type YhTimePickerProps = import('./src/time-picker').TimePickerProps
export type YhTimePickerEmits = import('./src/time-picker').TimePickerEmits
export type YhTimePickerSlots = import('./src/time-picker').TimePickerSlots
export type YhTimePickerExpose = import('./src/time-picker').TimePickerExpose
export type YhTimePickerSize = import('./src/time-picker').TimePickerSize
export type YhTimePickerValue = import('./src/time-picker').TimeValue
export type YhTimePickerRangeValue = import('./src/time-picker').TimeRangeValue
export type YhTimePickerDisabledTimeConfig = import('./src/time-picker').DisabledTimeConfig
export type YhTimePickerState = import('./src/time-picker').TimeState
