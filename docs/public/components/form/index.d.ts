import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import './src/form.css'
export * from './src/form'
export * from './src/form-item'
export * from './src/form-schema'
export declare const YhForm: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly model: {
            readonly type: import('vue').PropType<Record<string, unknown>>
            readonly required: true
          }
          readonly rules: {
            readonly type: import('vue').PropType<import('./index.js').FormRules>
            readonly default: () => {}
          }
          readonly labelWidth: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly labelPosition: {
            readonly type: import('vue').PropType<import('./index.js').LabelPosition>
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
            readonly type: import('vue').PropType<import('./index.js').ComponentSize>
            readonly default: 'default'
          }
          readonly statusIcon: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly layout: {
            readonly type: import('vue').PropType<import('./index.js').FormLayout>
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
      import('vue').PublicProps,
      {
        readonly size: import('./index.js').ComponentSize
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly labelWidth: string | number
        readonly layout: import('./index.js').FormLayout
        readonly rules: import('./index.js').FormRules
        readonly labelPosition: import('./index.js').LabelPosition
        readonly labelSuffix: string
        readonly showMessage: boolean
        readonly scrollToError: boolean
        readonly scrollIntoViewOptions: boolean | ScrollIntoViewOptions
        readonly scrollToErrorOffset: number
        readonly hideRequiredAsterisk: boolean
        readonly statusIcon: boolean
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
          readonly model: {
            readonly type: import('vue').PropType<Record<string, unknown>>
            readonly required: true
          }
          readonly rules: {
            readonly type: import('vue').PropType<import('./index.js').FormRules>
            readonly default: () => {}
          }
          readonly labelWidth: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly labelPosition: {
            readonly type: import('vue').PropType<import('./index.js').LabelPosition>
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
            readonly type: import('vue').PropType<import('./index.js').ComponentSize>
            readonly default: 'default'
          }
          readonly statusIcon: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly layout: {
            readonly type: import('vue').PropType<import('./index.js').FormLayout>
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
      {
        readonly size: import('./index.js').ComponentSize
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly labelWidth: string | number
        readonly layout: import('./index.js').FormLayout
        readonly rules: import('./index.js').FormRules
        readonly labelPosition: import('./index.js').LabelPosition
        readonly labelSuffix: string
        readonly showMessage: boolean
        readonly scrollToError: boolean
        readonly scrollIntoViewOptions: boolean | ScrollIntoViewOptions
        readonly scrollToErrorOffset: number
        readonly hideRequiredAsterisk: boolean
        readonly statusIcon: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly model: {
          readonly type: import('vue').PropType<Record<string, unknown>>
          readonly required: true
        }
        readonly rules: {
          readonly type: import('vue').PropType<import('./index.js').FormRules>
          readonly default: () => {}
        }
        readonly labelWidth: {
          readonly type: import('vue').PropType<string | number>
          readonly default: ''
        }
        readonly labelPosition: {
          readonly type: import('vue').PropType<import('./index.js').LabelPosition>
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
          readonly type: import('vue').PropType<import('./index.js').ComponentSize>
          readonly default: 'default'
        }
        readonly statusIcon: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly layout: {
          readonly type: import('vue').PropType<import('./index.js').FormLayout>
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
    {
      readonly size: import('./index.js').ComponentSize
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly labelWidth: string | number
      readonly layout: import('./index.js').FormLayout
      readonly rules: import('./index.js').FormRules
      readonly labelPosition: import('./index.js').LabelPosition
      readonly labelSuffix: string
      readonly showMessage: boolean
      readonly scrollToError: boolean
      readonly scrollIntoViewOptions: boolean | ScrollIntoViewOptions
      readonly scrollToErrorOffset: number
      readonly hideRequiredAsterisk: boolean
      readonly statusIcon: boolean
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
        default?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export declare const YhFormItem: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly prop: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly labelWidth: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly required: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly rules: {
            readonly type: import('vue').PropType<
              import('./index.js').FormRule | import('./index.js').FormRule[]
            >
            readonly default: () => never[]
          }
          readonly showMessage: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly size: {
            readonly type: import('vue').PropType<'large' | 'default' | 'small'>
            readonly default: ''
          }
          readonly validateTrigger: {
            readonly type: import('vue').PropType<string | string[]>
            readonly default: ''
          }
          readonly errorPosition: {
            readonly type: import('vue').PropType<'left' | 'center' | 'right'>
            readonly default: 'left'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly validateStatus: {
            readonly type: import('vue').PropType<import('./index.js').ValidateStatus>
            readonly default: ''
          }
          readonly error: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{}>,
      {
        validate: (trigger?: string, callback?: (isValid: boolean) => void) => Promise<boolean>
        resetField: () => void
        clearValidate: () => void
        validateStatus: import('vue').ComputedRef<import('./index.js').ValidateStatus>
        validateMessage: import('vue').ComputedRef<string>
        size: import('vue').ComputedRef<'large' | 'default' | 'small'>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      import('vue').PublicProps,
      {
        readonly label: string
        readonly size: 'large' | 'default' | 'small'
        readonly error: string
        readonly required: boolean
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly labelWidth: string | number
        readonly validateStatus: import('./index.js').ValidateStatus
        readonly rules: import('./index.js').FormRule | import('./index.js').FormRule[]
        readonly showMessage: boolean
        readonly prop: string
        readonly validateTrigger: string | string[]
        readonly errorPosition: 'center' | 'left' | 'right'
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
          readonly prop: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly label: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly labelWidth: {
            readonly type: import('vue').PropType<string | number>
            readonly default: ''
          }
          readonly required: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly rules: {
            readonly type: import('vue').PropType<
              import('./index.js').FormRule | import('./index.js').FormRule[]
            >
            readonly default: () => never[]
          }
          readonly showMessage: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly size: {
            readonly type: import('vue').PropType<'large' | 'default' | 'small'>
            readonly default: ''
          }
          readonly validateTrigger: {
            readonly type: import('vue').PropType<string | string[]>
            readonly default: ''
          }
          readonly errorPosition: {
            readonly type: import('vue').PropType<'left' | 'center' | 'right'>
            readonly default: 'left'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly validateStatus: {
            readonly type: import('vue').PropType<import('./index.js').ValidateStatus>
            readonly default: ''
          }
          readonly error: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{}>,
      {
        validate: (trigger?: string, callback?: (isValid: boolean) => void) => Promise<boolean>
        resetField: () => void
        clearValidate: () => void
        validateStatus: import('vue').ComputedRef<import('./index.js').ValidateStatus>
        validateMessage: import('vue').ComputedRef<string>
        size: import('vue').ComputedRef<'large' | 'default' | 'small'>
      },
      {},
      {},
      {},
      {
        readonly label: string
        readonly size: 'large' | 'default' | 'small'
        readonly error: string
        readonly required: boolean
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly labelWidth: string | number
        readonly validateStatus: import('./index.js').ValidateStatus
        readonly rules: import('./index.js').FormRule | import('./index.js').FormRule[]
        readonly showMessage: boolean
        readonly prop: string
        readonly validateTrigger: string | string[]
        readonly errorPosition: 'center' | 'left' | 'right'
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly prop: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly label: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly labelWidth: {
          readonly type: import('vue').PropType<string | number>
          readonly default: ''
        }
        readonly required: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly rules: {
          readonly type: import('vue').PropType<
            import('./index.js').FormRule | import('./index.js').FormRule[]
          >
          readonly default: () => never[]
        }
        readonly showMessage: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly size: {
          readonly type: import('vue').PropType<'large' | 'default' | 'small'>
          readonly default: ''
        }
        readonly validateTrigger: {
          readonly type: import('vue').PropType<string | string[]>
          readonly default: ''
        }
        readonly errorPosition: {
          readonly type: import('vue').PropType<'left' | 'center' | 'right'>
          readonly default: 'left'
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly validateStatus: {
          readonly type: import('vue').PropType<import('./index.js').ValidateStatus>
          readonly default: ''
        }
        readonly error: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{}>,
    {
      validate: (trigger?: string, callback?: (isValid: boolean) => void) => Promise<boolean>
      resetField: () => void
      clearValidate: () => void
      validateStatus: import('vue').ComputedRef<import('./index.js').ValidateStatus>
      validateMessage: import('vue').ComputedRef<string>
      size: import('vue').ComputedRef<'large' | 'default' | 'small'>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {},
    string,
    {
      readonly label: string
      readonly size: 'large' | 'default' | 'small'
      readonly error: string
      readonly required: boolean
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly labelWidth: string | number
      readonly validateStatus: import('./index.js').ValidateStatus
      readonly rules: import('./index.js').FormRule | import('./index.js').FormRule[]
      readonly showMessage: boolean
      readonly prop: string
      readonly validateTrigger: string | string[]
      readonly errorPosition: 'center' | 'left' | 'right'
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
        label?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export declare const YhFormSchema: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly modelValue: {
            readonly type: import('vue').PropType<Record<string, unknown>>
            readonly required: true
          }
          readonly schema: {
            readonly type: import('vue').PropType<import('./index.js').FormSchema>
            readonly required: true
            readonly default: () => never[]
          }
          readonly formProps: {
            readonly type: import('vue').PropType<Partial<import('./index.js').FormProps>>
            readonly default: () => {}
          }
          readonly gutter: {
            readonly type: NumberConstructor
            readonly default: 20
          }
        }>
      > &
        Readonly<{
          onSubmit?: ((val: Record<string, unknown>) => any) | undefined
          onChange?:
            | ((field: string, val: unknown, model: Record<string, unknown>) => any)
            | undefined
          'onUpdate:modelValue'?: ((val: Record<string, unknown>) => any) | undefined
          onValidate?:
            | ((isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any)
            | undefined
        }>,
      {
        validate: (
          fields?: string | string[],
          callback?: (isValid: boolean) => void
        ) => Promise<boolean> | undefined
        resetFields: (fields?: string | string[]) => void | undefined
        clearValidate: (fields?: string | string[]) => void | undefined
        scrollToField: (field: string) => void | undefined
        getModel: () => {
          [x: string]: unknown
        }
        setFieldValue: (field: string, val: unknown) => void
        formRef: import('vue').Ref<
          import('./src/form').FormInstance | undefined,
          import('./src/form').FormInstance | undefined
        >
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {} & {
        submit: (val: Record<string, unknown>) => any
        change: (field: string, val: unknown, model: Record<string, unknown>) => any
        'update:modelValue': (val: Record<string, unknown>) => any
        validate: (isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any
      },
      import('vue').PublicProps,
      {
        readonly schema: import('./index.js').FormSchema
        readonly formProps: Partial<import('./index.js').FormProps>
        readonly gutter: number
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
            readonly type: import('vue').PropType<Record<string, unknown>>
            readonly required: true
          }
          readonly schema: {
            readonly type: import('vue').PropType<import('./index.js').FormSchema>
            readonly required: true
            readonly default: () => never[]
          }
          readonly formProps: {
            readonly type: import('vue').PropType<Partial<import('./index.js').FormProps>>
            readonly default: () => {}
          }
          readonly gutter: {
            readonly type: NumberConstructor
            readonly default: 20
          }
        }>
      > &
        Readonly<{
          onSubmit?: ((val: Record<string, unknown>) => any) | undefined
          onChange?:
            | ((field: string, val: unknown, model: Record<string, unknown>) => any)
            | undefined
          'onUpdate:modelValue'?: ((val: Record<string, unknown>) => any) | undefined
          onValidate?:
            | ((isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any)
            | undefined
        }>,
      {
        validate: (
          fields?: string | string[],
          callback?: (isValid: boolean) => void
        ) => Promise<boolean> | undefined
        resetFields: (fields?: string | string[]) => void | undefined
        clearValidate: (fields?: string | string[]) => void | undefined
        scrollToField: (field: string) => void | undefined
        getModel: () => {
          [x: string]: unknown
        }
        setFieldValue: (field: string, val: unknown) => void
        formRef: import('vue').Ref<
          import('./src/form').FormInstance | undefined,
          import('./src/form').FormInstance | undefined
        >
      },
      {},
      {},
      {},
      {
        readonly schema: import('./index.js').FormSchema
        readonly formProps: Partial<import('./index.js').FormProps>
        readonly gutter: number
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly modelValue: {
          readonly type: import('vue').PropType<Record<string, unknown>>
          readonly required: true
        }
        readonly schema: {
          readonly type: import('vue').PropType<import('./index.js').FormSchema>
          readonly required: true
          readonly default: () => never[]
        }
        readonly formProps: {
          readonly type: import('vue').PropType<Partial<import('./index.js').FormProps>>
          readonly default: () => {}
        }
        readonly gutter: {
          readonly type: NumberConstructor
          readonly default: 20
        }
      }>
    > &
      Readonly<{
        onSubmit?: ((val: Record<string, unknown>) => any) | undefined
        onChange?:
          | ((field: string, val: unknown, model: Record<string, unknown>) => any)
          | undefined
        'onUpdate:modelValue'?: ((val: Record<string, unknown>) => any) | undefined
        onValidate?:
          | ((isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any)
          | undefined
      }>,
    {
      validate: (
        fields?: string | string[],
        callback?: (isValid: boolean) => void
      ) => Promise<boolean> | undefined
      resetFields: (fields?: string | string[]) => void | undefined
      clearValidate: (fields?: string | string[]) => void | undefined
      scrollToField: (field: string) => void | undefined
      getModel: () => {
        [x: string]: unknown
      }
      setFieldValue: (field: string, val: unknown) => void
      formRef: import('vue').Ref<
        import('./src/form').FormInstance | undefined,
        import('./src/form').FormInstance | undefined
      >
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {} & {
      submit: (val: Record<string, unknown>) => any
      change: (field: string, val: unknown, model: Record<string, unknown>) => any
      'update:modelValue': (val: Record<string, unknown>) => any
      validate: (isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any
    },
    string,
    {
      readonly schema: import('./index.js').FormSchema
      readonly formProps: Partial<import('./index.js').FormProps>
      readonly gutter: number
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
        [x: `label-${string}`]:
          | ((props: {
              model: Record<string, unknown>
              item: import('./index.js').FormSchemaItem
            }) => any)
          | undefined
      } & {
        [x: `field-${string}`]:
          | ((props: {
              model: Record<string, unknown>
              item: import('./index.js').FormSchemaItem
              handleUpdate: (field: string, val: unknown) => void
            }) => any)
          | undefined
      } & {
        [x: `field-${string}-${string}`]:
          | ((props: {
              row: Record<string, unknown>
              index: number
              item: import('./index.js').FormSchemaItem
            }) => any)
          | undefined
      } & {
        [x: `list-footer-${string}`]:
          | ((props: {
              model: Record<string, unknown>
              item: import('./index.js').FormSchemaItem
            }) => any)
          | undefined
      } & {
        [x: `label-${string}`]:
          | ((props: {
              model: Record<string, unknown>
              item: import('./index.js').FormSchemaItem
            }) => any)
          | undefined
      } & {
        [x: `field-${string}`]:
          | ((props: {
              model: Record<string, unknown>
              item: import('./index.js').FormSchemaItem
              handleUpdate: (field: string, val: unknown) => void
            }) => any)
          | undefined
      } & {
        footer?: (props: {
          model: Record<string, unknown>
          formRef: {
            validate: (
              props?:
                | string
                | string[]
                | ((isValid: boolean, invalidFields?: Record<string, unknown>) => void)
                | undefined,
              callback?:
                | ((isValid: boolean, invalidFields?: Record<string, unknown>) => void)
                | undefined
            ) => Promise<boolean> | undefined
            resetFields: (props?: string | string[] | undefined) => void | undefined
            clearValidate: (props?: string | string[] | undefined) => void | undefined
            scrollToField: (field: string) => void | undefined
          }
        }) => any
      }
    })
> &
  Record<string, unknown>
export default YhForm
export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
export type FormSchemaInstance = import('./src/form-schema').FormSchemaInstance
export type YhFormInstance = FormInstance
export type YhFormItemInstance = FormItemInstance
export type YhFormSchemaInstance = FormSchemaInstance
export type YhFormProps = import('./src/form').FormProps
export type YhFormItemProps = import('./src/form-item').FormItemProps
export type YhFormSchemaProps = import('./src/form-schema').FormSchemaProps
export type YhFormSchemaItem = import('./src/form-schema').FormSchemaItem
export type YhFormSchemaGroup = import('./src/form-schema').FormSchemaGroup
export type YhFormRule = import('./src/form').FormRule
export type YhFormRules = import('./src/form').FormRules
