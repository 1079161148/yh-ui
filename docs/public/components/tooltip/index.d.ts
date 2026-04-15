import Tooltip from './src/tooltip.vue'
export declare const YhTooltip: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly content: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('./index.js').TooltipPlacement>
            readonly default: 'top'
          }
          readonly trigger: {
            readonly type: import('vue').PropType<
              import('./index.js').TooltipTrigger | import('./index.js').TooltipTrigger[]
            >
            readonly default: 'hover'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showAfter: {
            readonly type: NumberConstructor
            readonly default: 0
          }
          readonly hideAfter: {
            readonly type: NumberConstructor
            readonly default: 200
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly showArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly interactive: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly visible: {
            readonly type: BooleanConstructor
            readonly default: null
          }
          readonly effect: {
            readonly type: StringConstructor
            readonly default: 'dark'
          }
          readonly followCursor: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly zIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly transition: {
            readonly type: StringConstructor
            readonly default: 'yh-tooltip-fade'
          }
          readonly persistent: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly rawContent: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly width: {
            readonly type: import('vue').PropType<string | number>
            readonly default: 'auto'
          }
          readonly maxHeight: {
            readonly type: import('vue').PropType<string | number>
            readonly default: 'none'
          }
          readonly scrollable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly contentClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly contentStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly arrowClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly arrowStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly arrowWrapperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly arrowWrapperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onHide?: (() => any) | undefined
          onShow?: (() => any) | undefined
          'onUpdate:visible'?: ((visible: boolean) => any) | undefined
        }>,
      {
        updatePosition: () => Promise<void>
        visible: import('vue').Ref<boolean, boolean>
        triggerRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>
        popperRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        hide: () => void
        show: () => void
        'update:visible': (visible: boolean) => void
      },
      import('vue').PublicProps,
      {
        readonly trigger:
          | 'hover'
          | 'focus'
          | 'click'
          | 'contextmenu'
          | 'manual'
          | ('hover' | 'focus' | 'click' | 'contextmenu' | 'manual')[]
        readonly effect: string
        readonly content: string
        readonly transition: string
        readonly disabled: boolean
        readonly width: string | number
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly maxHeight: string | number
        readonly zIndex: number
        readonly offset: [number, number]
        readonly visible: boolean
        readonly placement:
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
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').StyleValue
        readonly scrollable: boolean
        readonly showAfter: number
        readonly hideAfter: number
        readonly showArrow: boolean
        readonly interactive: boolean
        readonly followCursor: boolean
        readonly persistent: boolean
        readonly rawContent: boolean
        readonly contentClass: string
        readonly contentStyle: import('vue').StyleValue
        readonly arrowClass: string
        readonly arrowStyle: import('vue').StyleValue
        readonly arrowWrapperClass: string
        readonly arrowWrapperStyle: import('vue').StyleValue
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
          readonly content: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly placement: {
            readonly type: import('vue').PropType<import('./index.js').TooltipPlacement>
            readonly default: 'top'
          }
          readonly trigger: {
            readonly type: import('vue').PropType<
              import('./index.js').TooltipTrigger | import('./index.js').TooltipTrigger[]
            >
            readonly default: 'hover'
          }
          readonly disabled: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly showAfter: {
            readonly type: NumberConstructor
            readonly default: 0
          }
          readonly hideAfter: {
            readonly type: NumberConstructor
            readonly default: 200
          }
          readonly offset: {
            readonly type: import('vue').PropType<[number, number]>
            readonly default: () => number[]
          }
          readonly showArrow: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly interactive: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly visible: {
            readonly type: BooleanConstructor
            readonly default: null
          }
          readonly effect: {
            readonly type: StringConstructor
            readonly default: 'dark'
          }
          readonly followCursor: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly popperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly teleported: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly zIndex: {
            readonly type: NumberConstructor
            readonly default: 2000
          }
          readonly transition: {
            readonly type: StringConstructor
            readonly default: 'yh-tooltip-fade'
          }
          readonly persistent: {
            readonly type: BooleanConstructor
            readonly default: true
          }
          readonly rawContent: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly width: {
            readonly type: import('vue').PropType<string | number>
            readonly default: 'auto'
          }
          readonly maxHeight: {
            readonly type: import('vue').PropType<string | number>
            readonly default: 'none'
          }
          readonly scrollable: {
            readonly type: BooleanConstructor
            readonly default: false
          }
          readonly contentClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly contentStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly arrowClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly arrowStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly popperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly arrowWrapperClass: {
            readonly type: StringConstructor
            readonly default: ''
          }
          readonly arrowWrapperStyle: {
            readonly type: import('vue').PropType<import('vue').StyleValue>
            readonly default: () => {}
          }
          readonly themeOverrides: {
            readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
            readonly default: undefined
          }
        }>
      > &
        Readonly<{
          onHide?: (() => any) | undefined
          onShow?: (() => any) | undefined
          'onUpdate:visible'?: ((visible: boolean) => any) | undefined
        }>,
      {
        updatePosition: () => Promise<void>
        visible: import('vue').Ref<boolean, boolean>
        triggerRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>
        popperRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>
      },
      {},
      {},
      {},
      {
        readonly trigger:
          | 'hover'
          | 'focus'
          | 'click'
          | 'contextmenu'
          | 'manual'
          | ('hover' | 'focus' | 'click' | 'contextmenu' | 'manual')[]
        readonly effect: string
        readonly content: string
        readonly transition: string
        readonly disabled: boolean
        readonly width: string | number
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly maxHeight: string | number
        readonly zIndex: number
        readonly offset: [number, number]
        readonly visible: boolean
        readonly placement:
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
        readonly popperClass: string
        readonly teleported: boolean
        readonly popperStyle: import('vue').StyleValue
        readonly scrollable: boolean
        readonly showAfter: number
        readonly hideAfter: number
        readonly showArrow: boolean
        readonly interactive: boolean
        readonly followCursor: boolean
        readonly persistent: boolean
        readonly rawContent: boolean
        readonly contentClass: string
        readonly contentStyle: import('vue').StyleValue
        readonly arrowClass: string
        readonly arrowStyle: import('vue').StyleValue
        readonly arrowWrapperClass: string
        readonly arrowWrapperStyle: import('vue').StyleValue
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly content: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly placement: {
          readonly type: import('vue').PropType<import('./index.js').TooltipPlacement>
          readonly default: 'top'
        }
        readonly trigger: {
          readonly type: import('vue').PropType<
            import('./index.js').TooltipTrigger | import('./index.js').TooltipTrigger[]
          >
          readonly default: 'hover'
        }
        readonly disabled: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly showAfter: {
          readonly type: NumberConstructor
          readonly default: 0
        }
        readonly hideAfter: {
          readonly type: NumberConstructor
          readonly default: 200
        }
        readonly offset: {
          readonly type: import('vue').PropType<[number, number]>
          readonly default: () => number[]
        }
        readonly showArrow: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly interactive: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly visible: {
          readonly type: BooleanConstructor
          readonly default: null
        }
        readonly effect: {
          readonly type: StringConstructor
          readonly default: 'dark'
        }
        readonly followCursor: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly popperClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly teleported: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly zIndex: {
          readonly type: NumberConstructor
          readonly default: 2000
        }
        readonly transition: {
          readonly type: StringConstructor
          readonly default: 'yh-tooltip-fade'
        }
        readonly persistent: {
          readonly type: BooleanConstructor
          readonly default: true
        }
        readonly rawContent: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly width: {
          readonly type: import('vue').PropType<string | number>
          readonly default: 'auto'
        }
        readonly maxHeight: {
          readonly type: import('vue').PropType<string | number>
          readonly default: 'none'
        }
        readonly scrollable: {
          readonly type: BooleanConstructor
          readonly default: false
        }
        readonly contentClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly contentStyle: {
          readonly type: import('vue').PropType<import('vue').StyleValue>
          readonly default: () => {}
        }
        readonly arrowClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly arrowStyle: {
          readonly type: import('vue').PropType<import('vue').StyleValue>
          readonly default: () => {}
        }
        readonly popperStyle: {
          readonly type: import('vue').PropType<import('vue').StyleValue>
          readonly default: () => {}
        }
        readonly arrowWrapperClass: {
          readonly type: StringConstructor
          readonly default: ''
        }
        readonly arrowWrapperStyle: {
          readonly type: import('vue').PropType<import('vue').StyleValue>
          readonly default: () => {}
        }
        readonly themeOverrides: {
          readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
          readonly default: undefined
        }
      }>
    > &
      Readonly<{
        onHide?: (() => any) | undefined
        onShow?: (() => any) | undefined
        'onUpdate:visible'?: ((visible: boolean) => any) | undefined
      }>,
    {
      updatePosition: () => Promise<void>
      visible: import('vue').Ref<boolean, boolean>
      triggerRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>
      popperRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      hide: () => void
      show: () => void
      'update:visible': (visible: boolean) => void
    },
    string,
    {
      readonly trigger:
        | 'hover'
        | 'focus'
        | 'click'
        | 'contextmenu'
        | 'manual'
        | ('hover' | 'focus' | 'click' | 'contextmenu' | 'manual')[]
      readonly effect: string
      readonly content: string
      readonly transition: string
      readonly disabled: boolean
      readonly width: string | number
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly maxHeight: string | number
      readonly zIndex: number
      readonly offset: [number, number]
      readonly visible: boolean
      readonly placement:
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
      readonly popperClass: string
      readonly teleported: boolean
      readonly popperStyle: import('vue').StyleValue
      readonly scrollable: boolean
      readonly showAfter: number
      readonly hideAfter: number
      readonly showArrow: boolean
      readonly interactive: boolean
      readonly followCursor: boolean
      readonly persistent: boolean
      readonly rawContent: boolean
      readonly contentClass: string
      readonly contentStyle: import('vue').StyleValue
      readonly arrowClass: string
      readonly arrowStyle: import('vue').StyleValue
      readonly arrowWrapperClass: string
      readonly arrowWrapperStyle: import('vue').StyleValue
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
      } & {
        content?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhTooltip
export * from './src/tooltip'
export type TooltipInstance = InstanceType<typeof Tooltip>
export type YhTooltipInstance = TooltipInstance
export type YhTooltipProps = import('./src/tooltip').TooltipProps
export type YhTooltipEmits = import('./src/tooltip').TooltipEmits
export type YhTooltipSlots = import('./src/tooltip').TooltipSlots
export type YhTooltipExpose = import('./src/tooltip').TooltipExpose
export type YhTooltipPlacement = import('./src/tooltip').TooltipPlacement
export type YhTooltipTrigger = import('./src/tooltip').TooltipTrigger
