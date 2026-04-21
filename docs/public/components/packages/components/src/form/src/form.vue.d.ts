declare var __VLS_1: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly model: {
      readonly type: import('vue').PropType<Record<string, unknown>>
      readonly required: true
    }
    readonly rules: {
      readonly type: import('vue').PropType<import('./form').FormRules>
      readonly default: () => {}
    }
    readonly labelWidth: {
      readonly type: import('vue').PropType<string | number>
      readonly default: ''
    }
    readonly labelPosition: {
      readonly type: import('vue').PropType<import('./form').LabelPosition>
      readonly default: 'right'
    }
    readonly labelSuffix: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly showMessage: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly scrollToError: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly scrollIntoViewOptions: {
      readonly type: import('vue').PropType<boolean | ScrollIntoViewOptions>
      readonly default: false
    }
    readonly scrollToErrorOffset: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly hideRequiredAsterisk: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly size: {
      readonly type: import('vue').PropType<import('./form').ComponentSize>
      readonly default: 'default'
    }
    readonly statusIcon: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly layout: {
      readonly type: import('vue').PropType<import('./form').FormLayout>
      readonly default: 'horizontal'
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {
    validate: (
      propsToValidateOrCb?:
        | string
        | string[]
        | ((isValid: boolean, invalidFields?: Record<string, unknown>) => void),
      callback?: (isValid: boolean, invalidFields?: Record<string, unknown>) => void
    ) => Promise<boolean>
    resetFields: (props?: string | string[]) => void
    clearValidate: (props?: string | string[]) => void
    scrollToField: (prop: string) => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    validate: (isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly model: {
        readonly type: import('vue').PropType<Record<string, unknown>>
        readonly required: true
      }
      readonly rules: {
        readonly type: import('vue').PropType<import('./form').FormRules>
        readonly default: () => {}
      }
      readonly labelWidth: {
        readonly type: import('vue').PropType<string | number>
        readonly default: ''
      }
      readonly labelPosition: {
        readonly type: import('vue').PropType<import('./form').LabelPosition>
        readonly default: 'right'
      }
      readonly labelSuffix: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly showMessage: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly scrollToError: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly scrollIntoViewOptions: {
        readonly type: import('vue').PropType<boolean | ScrollIntoViewOptions>
        readonly default: false
      }
      readonly scrollToErrorOffset: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly hideRequiredAsterisk: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly size: {
        readonly type: import('vue').PropType<import('./form').ComponentSize>
        readonly default: 'default'
      }
      readonly statusIcon: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly layout: {
        readonly type: import('vue').PropType<import('./form').FormLayout>
        readonly default: 'horizontal'
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onValidate?:
        | ((isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any)
        | undefined
    }>,
  {
    readonly size: import('./form').ComponentSize
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly labelWidth: string | number
    readonly layout: import('./form').FormLayout
    readonly rules: import('./form').FormRules
    readonly labelPosition: import('./form').LabelPosition
    readonly labelSuffix: string
    readonly showMessage: boolean
    readonly scrollToError: boolean
    readonly scrollIntoViewOptions: boolean | ScrollIntoViewOptions
    readonly scrollToErrorOffset: number
    readonly hideRequiredAsterisk: boolean
    readonly statusIcon: boolean
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
