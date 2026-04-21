import type { CSSProperties } from 'vue'
import type { SliderValueType } from './slider'
declare var __VLS_16: {
    value: number
  },
  __VLS_26: {
    value: number
  },
  __VLS_28: {
    mark: string
  },
  __VLS_30: {}
type __VLS_Slots = {} & {
  thumb?: (props: typeof __VLS_16) => any
} & {
  thumb?: (props: typeof __VLS_26) => any
} & {
  mark?: (props: typeof __VLS_28) => any
} & {
  default?: (props: typeof __VLS_30) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    modelValue: {
      type: import('vue').PropType<SliderValueType>
      default: number
    }
    min: {
      type: NumberConstructor
      default: number
    }
    max: {
      type: NumberConstructor
      default: number
    }
    step: {
      type: NumberConstructor
      default: number
    }
    showInput: {
      type: BooleanConstructor
      default: boolean
    }
    showInputControls: {
      type: BooleanConstructor
      default: boolean
    }
    size: {
      type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
      default: string
    }
    inputSize: {
      type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
      default: string
    }
    showStops: {
      type: BooleanConstructor
      default: boolean
    }
    showTooltip: {
      type: BooleanConstructor
      default: boolean
    }
    formatTooltip: {
      type: import('vue').PropType<(val: number) => string | number>
      default: undefined
    }
    disabled: {
      type: BooleanConstructor
      default: boolean
    }
    range: {
      type: BooleanConstructor
      default: boolean
    }
    vertical: {
      type: BooleanConstructor
      default: boolean
    }
    height: {
      type: StringConstructor
      default: string
    }
    label: {
      type: StringConstructor
      default: undefined
    }
    debounce: {
      type: NumberConstructor
      default: number
    }
    tooltipClass: {
      type: StringConstructor
      default: undefined
    }
    placement: {
      type: import('vue').PropType<
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'right'
        | 'right-start'
        | 'right-end'
      >
      default: string
    }
    marks: {
      type: import('vue').PropType<
        Record<
          number,
          | string
          | {
              style?: CSSProperties
              label: string
            }
        >
      >
      default: undefined
    }
    validateEvent: {
      type: BooleanConstructor
      default: boolean
    }
    rangeStartLabel: {
      type: StringConstructor
      default: undefined
    }
    rangeEndLabel: {
      type: StringConstructor
      default: undefined
    }
    buttonClass: {
      type: StringConstructor
      default: undefined
    }
    color: {
      type: StringConstructor
      default: undefined
    }
    themeOverrides: {
      type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      default: undefined
    }
  }>,
  {
    sliderRef: import('vue').Ref<HTMLElement | undefined>
    firstValue: import('vue').Ref<number>
    secondValue: import('vue').Ref<number>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    input: (_val: SliderValueType) => void
    change: (_val: SliderValueType) => void
    'update:modelValue': (_val: SliderValueType) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      modelValue: {
        type: import('vue').PropType<SliderValueType>
        default: number
      }
      min: {
        type: NumberConstructor
        default: number
      }
      max: {
        type: NumberConstructor
        default: number
      }
      step: {
        type: NumberConstructor
        default: number
      }
      showInput: {
        type: BooleanConstructor
        default: boolean
      }
      showInputControls: {
        type: BooleanConstructor
        default: boolean
      }
      size: {
        type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
        default: string
      }
      inputSize: {
        type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
        default: string
      }
      showStops: {
        type: BooleanConstructor
        default: boolean
      }
      showTooltip: {
        type: BooleanConstructor
        default: boolean
      }
      formatTooltip: {
        type: import('vue').PropType<(val: number) => string | number>
        default: undefined
      }
      disabled: {
        type: BooleanConstructor
        default: boolean
      }
      range: {
        type: BooleanConstructor
        default: boolean
      }
      vertical: {
        type: BooleanConstructor
        default: boolean
      }
      height: {
        type: StringConstructor
        default: string
      }
      label: {
        type: StringConstructor
        default: undefined
      }
      debounce: {
        type: NumberConstructor
        default: number
      }
      tooltipClass: {
        type: StringConstructor
        default: undefined
      }
      placement: {
        type: import('vue').PropType<
          | 'top'
          | 'top-start'
          | 'top-end'
          | 'bottom'
          | 'bottom-start'
          | 'bottom-end'
          | 'left'
          | 'left-start'
          | 'left-end'
          | 'right'
          | 'right-start'
          | 'right-end'
        >
        default: string
      }
      marks: {
        type: import('vue').PropType<
          Record<
            number,
            | string
            | {
                style?: CSSProperties
                label: string
              }
          >
        >
        default: undefined
      }
      validateEvent: {
        type: BooleanConstructor
        default: boolean
      }
      rangeStartLabel: {
        type: StringConstructor
        default: undefined
      }
      rangeEndLabel: {
        type: StringConstructor
        default: undefined
      }
      buttonClass: {
        type: StringConstructor
        default: undefined
      }
      color: {
        type: StringConstructor
        default: undefined
      }
      themeOverrides: {
        type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        default: undefined
      }
    }>
  > &
    Readonly<{
      onInput?: ((_val: SliderValueType) => any) | undefined
      onChange?: ((_val: SliderValueType) => any) | undefined
      'onUpdate:modelValue'?: ((_val: SliderValueType) => any) | undefined
    }>,
  {
    label: string
    size: '' | 'large' | 'default' | 'small'
    disabled: boolean
    height: string
    themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    color: string
    vertical: boolean
    modelValue: SliderValueType
    validateEvent: boolean
    range: boolean
    min: number
    max: number
    step: number
    showTooltip: boolean
    debounce: number
    placement:
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'left-start'
      | 'left-end'
      | 'right-start'
      | 'right-end'
    showInput: boolean
    showInputControls: boolean
    inputSize: '' | 'large' | 'default' | 'small'
    showStops: boolean
    formatTooltip: (val: number) => string | number
    tooltipClass: string
    marks: Record<
      number,
      | string
      | {
          style?: CSSProperties
          label: string
        }
    >
    rangeStartLabel: string
    rangeEndLabel: string
    buttonClass: string
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
