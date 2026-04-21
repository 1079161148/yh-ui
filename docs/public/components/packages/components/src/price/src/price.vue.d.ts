declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}, __VLS_11: {}
type __VLS_Slots = {} & {
  tag?: (props: typeof __VLS_1) => any
} & {
  prefix?: (props: typeof __VLS_3) => any
} & {
  symbol?: (props: typeof __VLS_5) => any
} & {
  symbol?: (props: typeof __VLS_7) => any
} & {
  unit?: (props: typeof __VLS_9) => any
} & {
  suffix?: (props: typeof __VLS_11) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    value: {
      type: (StringConstructor | NumberConstructor)[]
      default: number
    }
    maxValue: {
      type: (StringConstructor | NumberConstructor)[]
      default: undefined
    }
    symbol: {
      type: StringConstructor
      default: string
    }
    symbolPosition: {
      type: import('vue').PropType<'before' | 'after'>
      default: string
    }
    precision: {
      type: NumberConstructor
      default: number
    }
    lineThrough: {
      type: BooleanConstructor
      default: boolean
    }
    size: {
      type: import('vue').PropType<'small' | 'default' | 'large' | string>
      default: string
    }
    split: {
      type: BooleanConstructor
      default: boolean
    }
    decimalScale: {
      type: NumberConstructor
      default: number
    }
    thousandth: {
      type: BooleanConstructor
      default: boolean
    }
    bold: {
      type: BooleanConstructor
      default: boolean
    }
    prefix: {
      type: StringConstructor
      default: string
    }
    suffix: {
      type: StringConstructor
      default: string
    }
    unit: {
      type: StringConstructor
      default: string
    }
    deleteValue: {
      type: (StringConstructor | NumberConstructor)[]
      default: undefined
    }
    deleteLabel: {
      type: StringConstructor
      default: string
    }
    tag: {
      type: StringConstructor
      default: string
    }
    tagType: {
      type: import('vue').PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
      default: string
    }
    approx: {
      type: BooleanConstructor
      default: boolean
    }
    animated: {
      type: BooleanConstructor
      default: boolean
    }
    gradient: {
      type: import('vue').PropType<boolean | string[]>
      default: boolean
    }
    themeOverrides: {
      type: import('vue').PropType<Record<string, string>>
      default: () => {}
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
      value: {
        type: (StringConstructor | NumberConstructor)[]
        default: number
      }
      maxValue: {
        type: (StringConstructor | NumberConstructor)[]
        default: undefined
      }
      symbol: {
        type: StringConstructor
        default: string
      }
      symbolPosition: {
        type: import('vue').PropType<'before' | 'after'>
        default: string
      }
      precision: {
        type: NumberConstructor
        default: number
      }
      lineThrough: {
        type: BooleanConstructor
        default: boolean
      }
      size: {
        type: import('vue').PropType<'small' | 'default' | 'large' | string>
        default: string
      }
      split: {
        type: BooleanConstructor
        default: boolean
      }
      decimalScale: {
        type: NumberConstructor
        default: number
      }
      thousandth: {
        type: BooleanConstructor
        default: boolean
      }
      bold: {
        type: BooleanConstructor
        default: boolean
      }
      prefix: {
        type: StringConstructor
        default: string
      }
      suffix: {
        type: StringConstructor
        default: string
      }
      unit: {
        type: StringConstructor
        default: string
      }
      deleteValue: {
        type: (StringConstructor | NumberConstructor)[]
        default: undefined
      }
      deleteLabel: {
        type: StringConstructor
        default: string
      }
      tag: {
        type: StringConstructor
        default: string
      }
      tagType: {
        type: import('vue').PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>
        default: string
      }
      approx: {
        type: BooleanConstructor
        default: boolean
      }
      animated: {
        type: BooleanConstructor
        default: boolean
      }
      gradient: {
        type: import('vue').PropType<boolean | string[]>
        default: boolean
      }
      themeOverrides: {
        type: import('vue').PropType<Record<string, string>>
        default: () => {}
      }
    }>
  > &
    Readonly<{}>,
  {
    symbol: string
    size: string
    split: boolean
    bold: boolean
    value: string | number
    tag: string
    suffix: string
    themeOverrides: Record<string, string>
    prefix: string
    precision: number
    tagType: 'success' | 'warning' | 'info' | 'primary' | 'danger'
    gradient: boolean | string[]
    animated: boolean
    maxValue: string | number
    symbolPosition: 'after' | 'before'
    lineThrough: boolean
    decimalScale: number
    thousandth: boolean
    unit: string
    deleteValue: string | number
    deleteLabel: string
    approx: boolean
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
