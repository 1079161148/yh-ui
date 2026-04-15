import Switch from './src/switch.vue'
export declare const YhSwitch: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          modelValue: {
            type: import('vue').PropType<import('./index.js').SwitchValueType>
            default: boolean
          }
          disabled: {
            type: BooleanConstructor
            default: boolean
          }
          loading: {
            type: BooleanConstructor
            default: boolean
          }
          size: {
            type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
            default: string
          }
          width: {
            type: import('vue').PropType<string | number>
            default: string
          }
          inlinePrompt: {
            type: BooleanConstructor
            default: boolean
          }
          activeIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          inactiveIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          activeActionIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          inactiveActionIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          activeText: {
            type: StringConstructor
            default: string
          }
          inactiveText: {
            type: StringConstructor
            default: string
          }
          activeValue: {
            type: import('vue').PropType<import('./index.js').SwitchValueType>
            default: boolean
          }
          inactiveValue: {
            type: import('vue').PropType<import('./index.js').SwitchValueType>
            default: boolean
          }
          name: {
            type: StringConstructor
            default: string
          }
          validateEvent: {
            type: BooleanConstructor
            default: boolean
          }
          beforeChange: {
            type: import('vue').PropType<() => Promise<boolean> | boolean>
            default: undefined
          }
          id: {
            type: StringConstructor
            default: undefined
          }
          tabindex: {
            type: import('vue').PropType<string | number>
            default: undefined
          }
          ariaLabel: {
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
          onChange?: ((_val: import('./index.js').SwitchValueType) => any) | undefined
          'onUpdate:modelValue'?: ((_val: import('./index.js').SwitchValueType) => any) | undefined
        }>,
      {
        focus: () => void
        checked: import('vue').ComputedRef<boolean>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        change: (_val: import('./index.js').SwitchValueType) => void
        'update:modelValue': (_val: import('./index.js').SwitchValueType) => void
      },
      import('vue').PublicProps,
      {
        size: '' | 'large' | 'default' | 'small'
        name: string
        id: string
        loading: boolean
        disabled: boolean
        width: string | number
        themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        modelValue: import('./index.js').SwitchValueType
        tabindex: string | number
        ariaLabel: string
        validateEvent: boolean
        inlinePrompt: boolean
        activeIcon: string | import('vue').Component
        inactiveIcon: string | import('vue').Component
        activeActionIcon: string | import('vue').Component
        inactiveActionIcon: string | import('vue').Component
        activeText: string
        inactiveText: string
        activeValue: import('./index.js').SwitchValueType
        inactiveValue: import('./index.js').SwitchValueType
        beforeChange: () => Promise<boolean> | boolean
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
          modelValue: {
            type: import('vue').PropType<import('./index.js').SwitchValueType>
            default: boolean
          }
          disabled: {
            type: BooleanConstructor
            default: boolean
          }
          loading: {
            type: BooleanConstructor
            default: boolean
          }
          size: {
            type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
            default: string
          }
          width: {
            type: import('vue').PropType<string | number>
            default: string
          }
          inlinePrompt: {
            type: BooleanConstructor
            default: boolean
          }
          activeIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          inactiveIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          activeActionIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          inactiveActionIcon: {
            type: import('vue').PropType<string | import('vue').Component>
            default: undefined
          }
          activeText: {
            type: StringConstructor
            default: string
          }
          inactiveText: {
            type: StringConstructor
            default: string
          }
          activeValue: {
            type: import('vue').PropType<import('./index.js').SwitchValueType>
            default: boolean
          }
          inactiveValue: {
            type: import('vue').PropType<import('./index.js').SwitchValueType>
            default: boolean
          }
          name: {
            type: StringConstructor
            default: string
          }
          validateEvent: {
            type: BooleanConstructor
            default: boolean
          }
          beforeChange: {
            type: import('vue').PropType<() => Promise<boolean> | boolean>
            default: undefined
          }
          id: {
            type: StringConstructor
            default: undefined
          }
          tabindex: {
            type: import('vue').PropType<string | number>
            default: undefined
          }
          ariaLabel: {
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
          onChange?: ((_val: import('./index.js').SwitchValueType) => any) | undefined
          'onUpdate:modelValue'?: ((_val: import('./index.js').SwitchValueType) => any) | undefined
        }>,
      {
        focus: () => void
        checked: import('vue').ComputedRef<boolean>
      },
      {},
      {},
      {},
      {
        size: '' | 'large' | 'default' | 'small'
        name: string
        id: string
        loading: boolean
        disabled: boolean
        width: string | number
        themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        modelValue: import('./index.js').SwitchValueType
        tabindex: string | number
        ariaLabel: string
        validateEvent: boolean
        inlinePrompt: boolean
        activeIcon: string | import('vue').Component
        inactiveIcon: string | import('vue').Component
        activeActionIcon: string | import('vue').Component
        inactiveActionIcon: string | import('vue').Component
        activeText: string
        inactiveText: string
        activeValue: import('./index.js').SwitchValueType
        inactiveValue: import('./index.js').SwitchValueType
        beforeChange: () => Promise<boolean> | boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        modelValue: {
          type: import('vue').PropType<import('./index.js').SwitchValueType>
          default: boolean
        }
        disabled: {
          type: BooleanConstructor
          default: boolean
        }
        loading: {
          type: BooleanConstructor
          default: boolean
        }
        size: {
          type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
          default: string
        }
        width: {
          type: import('vue').PropType<string | number>
          default: string
        }
        inlinePrompt: {
          type: BooleanConstructor
          default: boolean
        }
        activeIcon: {
          type: import('vue').PropType<string | import('vue').Component>
          default: undefined
        }
        inactiveIcon: {
          type: import('vue').PropType<string | import('vue').Component>
          default: undefined
        }
        activeActionIcon: {
          type: import('vue').PropType<string | import('vue').Component>
          default: undefined
        }
        inactiveActionIcon: {
          type: import('vue').PropType<string | import('vue').Component>
          default: undefined
        }
        activeText: {
          type: StringConstructor
          default: string
        }
        inactiveText: {
          type: StringConstructor
          default: string
        }
        activeValue: {
          type: import('vue').PropType<import('./index.js').SwitchValueType>
          default: boolean
        }
        inactiveValue: {
          type: import('vue').PropType<import('./index.js').SwitchValueType>
          default: boolean
        }
        name: {
          type: StringConstructor
          default: string
        }
        validateEvent: {
          type: BooleanConstructor
          default: boolean
        }
        beforeChange: {
          type: import('vue').PropType<() => Promise<boolean> | boolean>
          default: undefined
        }
        id: {
          type: StringConstructor
          default: undefined
        }
        tabindex: {
          type: import('vue').PropType<string | number>
          default: undefined
        }
        ariaLabel: {
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
        onChange?: ((_val: import('./index.js').SwitchValueType) => any) | undefined
        'onUpdate:modelValue'?: ((_val: import('./index.js').SwitchValueType) => any) | undefined
      }>,
    {
      focus: () => void
      checked: import('vue').ComputedRef<boolean>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      change: (_val: import('./index.js').SwitchValueType) => void
      'update:modelValue': (_val: import('./index.js').SwitchValueType) => void
    },
    string,
    {
      size: '' | 'large' | 'default' | 'small'
      name: string
      id: string
      loading: boolean
      disabled: boolean
      width: string | number
      themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      modelValue: import('./index.js').SwitchValueType
      tabindex: string | number
      ariaLabel: string
      validateEvent: boolean
      inlinePrompt: boolean
      activeIcon: string | import('vue').Component
      inactiveIcon: string | import('vue').Component
      activeActionIcon: string | import('vue').Component
      inactiveActionIcon: string | import('vue').Component
      activeText: string
      inactiveText: string
      activeValue: import('./index.js').SwitchValueType
      inactiveValue: import('./index.js').SwitchValueType
      beforeChange: () => Promise<boolean> | boolean
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
        inactive?: (props: {}) => any
      } & {
        active?: (props: {}) => any
      } & {
        inactive?: (props: {}) => any
      } & {
        'active-action'?: (props: {}) => any
      } & {
        'inactive-action'?: (props: {}) => any
      } & {
        active?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhSwitch
export * from './src/switch'
export type SwitchInstance = InstanceType<typeof Switch>
export type YhSwitchInstance = SwitchInstance
export type YhSwitchProps = import('./src/switch').SwitchProps
export type YhSwitchEmits = import('./src/switch').SwitchEmits
export type YhSwitchSlots = import('./src/switch').SwitchSlots
export type YhSwitchExpose = import('./src/switch').SwitchExpose
