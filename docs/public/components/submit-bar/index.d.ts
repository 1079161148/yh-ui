import SubmitBar from './src/submit-bar.vue'
export declare const YhSubmitBar: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          price: {
            type: NumberConstructor
            default: number
          }
          currency: {
            type: StringConstructor
            default: string
          }
          centUnit: {
            type: BooleanConstructor
            default: boolean
          }
          decimalLength: {
            type: NumberConstructor
            default: number
          }
          buttonText: {
            type: StringConstructor
            default: string
          }
          buttonType: {
            type: import('vue').PropType<import('./index.js').SubmitBarButtonType>
            default: string
          }
          disabled: {
            type: BooleanConstructor
            default: boolean
          }
          loading: {
            type: BooleanConstructor
            default: boolean
          }
          showCheckbox: {
            type: BooleanConstructor
            default: boolean
          }
          checked: {
            type: BooleanConstructor
            default: boolean
          }
          indeterminate: {
            type: BooleanConstructor
            default: boolean
          }
          label: {
            type: StringConstructor
            default: string
          }
          selectedCount: {
            type: NumberConstructor
            default: number
          }
          tip: {
            type: StringConstructor
            default: string
          }
          safeAreaInsetBottom: {
            type: BooleanConstructor
            default: boolean
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
        }>
      > &
        Readonly<{
          onSubmit?: ((e: MouseEvent) => any) | undefined
          'onUpdate:checked'?: ((val: boolean) => any) | undefined
          'onCheck-change'?: ((val: boolean) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        submit: (e: MouseEvent) => void
        'update:checked': (val: boolean) => void
        'check-change': (val: boolean) => void
      },
      import('vue').PublicProps,
      {
        label: string
        price: number
        loading: boolean
        tip: string
        disabled: boolean
        themeOverrides: Record<string, string>
        indeterminate: boolean
        checked: boolean
        showCheckbox: boolean
        currency: string
        centUnit: boolean
        decimalLength: number
        buttonText: string
        buttonType: import('./index.js').SubmitBarButtonType
        selectedCount: number
        safeAreaInsetBottom: boolean
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
          price: {
            type: NumberConstructor
            default: number
          }
          currency: {
            type: StringConstructor
            default: string
          }
          centUnit: {
            type: BooleanConstructor
            default: boolean
          }
          decimalLength: {
            type: NumberConstructor
            default: number
          }
          buttonText: {
            type: StringConstructor
            default: string
          }
          buttonType: {
            type: import('vue').PropType<import('./index.js').SubmitBarButtonType>
            default: string
          }
          disabled: {
            type: BooleanConstructor
            default: boolean
          }
          loading: {
            type: BooleanConstructor
            default: boolean
          }
          showCheckbox: {
            type: BooleanConstructor
            default: boolean
          }
          checked: {
            type: BooleanConstructor
            default: boolean
          }
          indeterminate: {
            type: BooleanConstructor
            default: boolean
          }
          label: {
            type: StringConstructor
            default: string
          }
          selectedCount: {
            type: NumberConstructor
            default: number
          }
          tip: {
            type: StringConstructor
            default: string
          }
          safeAreaInsetBottom: {
            type: BooleanConstructor
            default: boolean
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
        }>
      > &
        Readonly<{
          onSubmit?: ((e: MouseEvent) => any) | undefined
          'onUpdate:checked'?: ((val: boolean) => any) | undefined
          'onCheck-change'?: ((val: boolean) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        label: string
        price: number
        loading: boolean
        tip: string
        disabled: boolean
        themeOverrides: Record<string, string>
        indeterminate: boolean
        checked: boolean
        showCheckbox: boolean
        currency: string
        centUnit: boolean
        decimalLength: number
        buttonText: string
        buttonType: import('./index.js').SubmitBarButtonType
        selectedCount: number
        safeAreaInsetBottom: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        price: {
          type: NumberConstructor
          default: number
        }
        currency: {
          type: StringConstructor
          default: string
        }
        centUnit: {
          type: BooleanConstructor
          default: boolean
        }
        decimalLength: {
          type: NumberConstructor
          default: number
        }
        buttonText: {
          type: StringConstructor
          default: string
        }
        buttonType: {
          type: import('vue').PropType<import('./index.js').SubmitBarButtonType>
          default: string
        }
        disabled: {
          type: BooleanConstructor
          default: boolean
        }
        loading: {
          type: BooleanConstructor
          default: boolean
        }
        showCheckbox: {
          type: BooleanConstructor
          default: boolean
        }
        checked: {
          type: BooleanConstructor
          default: boolean
        }
        indeterminate: {
          type: BooleanConstructor
          default: boolean
        }
        label: {
          type: StringConstructor
          default: string
        }
        selectedCount: {
          type: NumberConstructor
          default: number
        }
        tip: {
          type: StringConstructor
          default: string
        }
        safeAreaInsetBottom: {
          type: BooleanConstructor
          default: boolean
        }
        themeOverrides: {
          type: import('vue').PropType<Record<string, string>>
          default: () => {}
        }
      }>
    > &
      Readonly<{
        onSubmit?: ((e: MouseEvent) => any) | undefined
        'onUpdate:checked'?: ((val: boolean) => any) | undefined
        'onCheck-change'?: ((val: boolean) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      submit: (e: MouseEvent) => void
      'update:checked': (val: boolean) => void
      'check-change': (val: boolean) => void
    },
    string,
    {
      label: string
      price: number
      loading: boolean
      tip: string
      disabled: boolean
      themeOverrides: Record<string, string>
      indeterminate: boolean
      checked: boolean
      showCheckbox: boolean
      currency: string
      centUnit: boolean
      decimalLength: number
      buttonText: string
      buttonType: import('./index.js').SubmitBarButtonType
      selectedCount: number
      safeAreaInsetBottom: boolean
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
        tip?: (props: {}) => any
      } & {
        left?: (props: {}) => any
      } & {
        price?: (props: {}) => any
      } & {
        right?: (props: {}) => any
      } & {
        button?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhSubmitBar
export * from './src/submit-bar'
export type SubmitBarInstance = InstanceType<typeof SubmitBar>
export type YhSubmitBarInstance = SubmitBarInstance
export type YhSubmitBarProps = import('./src/submit-bar').SubmitBarProps
export type YhSubmitBarEmits = import('./src/submit-bar').SubmitBarEmits
export type YhSubmitBarSlots = import('./src/submit-bar').SubmitBarSlots
export type YhSubmitBarButtonType = import('./src/submit-bar').SubmitBarButtonType
