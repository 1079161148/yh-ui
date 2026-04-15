import SkuSelector from './src/sku-selector.vue'
export declare const YhSkuSelector: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          specs: {
            type: import('vue').PropType<import('./index.js').SkuSpec[]>
            default: () => never[]
          }
          skus: {
            type: import('vue').PropType<import('./index.js').SkuItem[]>
            default: () => never[]
          }
          modelValue: {
            type: import('vue').PropType<Array<string | number>>
            default: () => never[]
          }
          checkStock: {
            type: BooleanConstructor
            default: boolean
          }
          disabled: {
            type: BooleanConstructor
            default: boolean
          }
          allowUnselect: {
            type: BooleanConstructor
            default: boolean
          }
          size: {
            type: import('vue').PropType<'small' | 'default' | 'large'>
            default: string
          }
          imageSize: {
            type: NumberConstructor
            default: number
          }
          showSelectedSummary: {
            type: BooleanConstructor
            default: boolean
          }
          summaryPrefix: {
            type: StringConstructor
            default: string
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
        }>
      > &
        Readonly<{
          onSelect?:
            | ((
                _spec: import('./index.js').SkuSpec,
                _value: import('./index.js').SkuSpecValue
              ) => any)
            | undefined
          onChange?:
            | ((
                _sku: import('./index.js').SkuItem | null,
                _selectedValues: (string | number)[]
              ) => any)
            | undefined
          'onUpdate:modelValue'?: ((value: (string | number)[]) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        select: (
          _spec: import('./index.js').SkuSpec,
          _value: import('./index.js').SkuSpecValue
        ) => void
        change: (
          _sku: import('./index.js').SkuItem | null,
          _selectedValues: (string | number)[]
        ) => void
        'update:modelValue': (value: (string | number)[]) => void
      },
      import('vue').PublicProps,
      {
        size: 'large' | 'default' | 'small'
        disabled: boolean
        themeOverrides: Record<string, string>
        modelValue: (string | number)[]
        imageSize: number
        specs: import('./index.js').SkuSpec[]
        skus: import('./index.js').SkuItem[]
        checkStock: boolean
        allowUnselect: boolean
        showSelectedSummary: boolean
        summaryPrefix: string
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
          specs: {
            type: import('vue').PropType<import('./index.js').SkuSpec[]>
            default: () => never[]
          }
          skus: {
            type: import('vue').PropType<import('./index.js').SkuItem[]>
            default: () => never[]
          }
          modelValue: {
            type: import('vue').PropType<Array<string | number>>
            default: () => never[]
          }
          checkStock: {
            type: BooleanConstructor
            default: boolean
          }
          disabled: {
            type: BooleanConstructor
            default: boolean
          }
          allowUnselect: {
            type: BooleanConstructor
            default: boolean
          }
          size: {
            type: import('vue').PropType<'small' | 'default' | 'large'>
            default: string
          }
          imageSize: {
            type: NumberConstructor
            default: number
          }
          showSelectedSummary: {
            type: BooleanConstructor
            default: boolean
          }
          summaryPrefix: {
            type: StringConstructor
            default: string
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
        }>
      > &
        Readonly<{
          onSelect?:
            | ((
                _spec: import('./index.js').SkuSpec,
                _value: import('./index.js').SkuSpecValue
              ) => any)
            | undefined
          onChange?:
            | ((
                _sku: import('./index.js').SkuItem | null,
                _selectedValues: (string | number)[]
              ) => any)
            | undefined
          'onUpdate:modelValue'?: ((value: (string | number)[]) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        size: 'large' | 'default' | 'small'
        disabled: boolean
        themeOverrides: Record<string, string>
        modelValue: (string | number)[]
        imageSize: number
        specs: import('./index.js').SkuSpec[]
        skus: import('./index.js').SkuItem[]
        checkStock: boolean
        allowUnselect: boolean
        showSelectedSummary: boolean
        summaryPrefix: string
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        specs: {
          type: import('vue').PropType<import('./index.js').SkuSpec[]>
          default: () => never[]
        }
        skus: {
          type: import('vue').PropType<import('./index.js').SkuItem[]>
          default: () => never[]
        }
        modelValue: {
          type: import('vue').PropType<Array<string | number>>
          default: () => never[]
        }
        checkStock: {
          type: BooleanConstructor
          default: boolean
        }
        disabled: {
          type: BooleanConstructor
          default: boolean
        }
        allowUnselect: {
          type: BooleanConstructor
          default: boolean
        }
        size: {
          type: import('vue').PropType<'small' | 'default' | 'large'>
          default: string
        }
        imageSize: {
          type: NumberConstructor
          default: number
        }
        showSelectedSummary: {
          type: BooleanConstructor
          default: boolean
        }
        summaryPrefix: {
          type: StringConstructor
          default: string
        }
        themeOverrides: {
          type: import('vue').PropType<Record<string, string>>
          default: () => {}
        }
      }>
    > &
      Readonly<{
        onSelect?:
          | ((
              _spec: import('./index.js').SkuSpec,
              _value: import('./index.js').SkuSpecValue
            ) => any)
          | undefined
        onChange?:
          | ((
              _sku: import('./index.js').SkuItem | null,
              _selectedValues: (string | number)[]
            ) => any)
          | undefined
        'onUpdate:modelValue'?: ((value: (string | number)[]) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      select: (
        _spec: import('./index.js').SkuSpec,
        _value: import('./index.js').SkuSpecValue
      ) => void
      change: (
        _sku: import('./index.js').SkuItem | null,
        _selectedValues: (string | number)[]
      ) => void
      'update:modelValue': (value: (string | number)[]) => void
    },
    string,
    {
      size: 'large' | 'default' | 'small'
      disabled: boolean
      themeOverrides: Record<string, string>
      modelValue: (string | number)[]
      imageSize: number
      specs: import('./index.js').SkuSpec[]
      skus: import('./index.js').SkuItem[]
      checkStock: boolean
      allowUnselect: boolean
      showSelectedSummary: boolean
      summaryPrefix: string
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
        summary?: (props: { summary: string; sku: import('@yh-ui/hooks').SkuItem | null }) => any
      } & {
        label?: (props: { spec: import('./index.js').SkuSpec }) => any
      } & {
        value?: (props: {
          value: import('./index.js').SkuSpecValue
          spec: import('./index.js').SkuSpec
          active: boolean
          disabled: boolean
        }) => any
      }
    })
> &
  Record<string, unknown>
export default YhSkuSelector
export * from './src/sku-selector'
export type SkuSelectorInstance = InstanceType<typeof SkuSelector>
export type YhSkuSelectorInstance = SkuSelectorInstance
export type YhSkuSelectorProps = import('./src/sku-selector').SkuSelectorProps
export type YhSkuSelectorEmits = import('./src/sku-selector').SkuSelectorEmits
export type YhSkuSelectorSlots = import('./src/sku-selector').SkuSelectorSlots
export type YhSkuSpec = import('./src/sku-selector').SkuSpec
export type YhSkuSpecValue = import('./src/sku-selector').SkuSpecValue
export type YhSkuItem = import('./src/sku-selector').SkuItem
