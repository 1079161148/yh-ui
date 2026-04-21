declare var __VLS_5: {}, __VLS_11: {}, __VLS_13: {}, __VLS_15: {}, __VLS_17: {}, __VLS_19: {}
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_5) => any
} & {
  title?: (props: typeof __VLS_11) => any
} & {
  default?: (props: typeof __VLS_13) => any
} & {
  default?: (props: typeof __VLS_15) => any
} & {
  action?: (props: typeof __VLS_17) => any
} & {
  close?: (props: typeof __VLS_19) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly title: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly description: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly type: {
      readonly type: import('vue').PropType<import('./alert').AlertType>
      readonly default: 'info'
      readonly validator: (val: string) => boolean
    }
    readonly effect: {
      readonly type: import('vue').PropType<import('./alert').AlertEffect>
      readonly default: 'light'
      readonly validator: (val: string) => boolean
    }
    readonly closable: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly closeText: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly closeIcon: {
      readonly type: import('vue').PropType<string | import('vue').Component>
      readonly default: ''
    }
    readonly showIcon: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly icon: {
      readonly type: import('vue').PropType<string | import('vue').Component>
      readonly default: ''
    }
    readonly center: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly scrollable: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly scrollSpeed: {
      readonly type: NumberConstructor
      readonly default: 15
    }
    readonly pauseOnHover: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly duration: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly showProgress: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    close: (evt: MouseEvent) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly title: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly description: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly type: {
        readonly type: import('vue').PropType<import('./alert').AlertType>
        readonly default: 'info'
        readonly validator: (val: string) => boolean
      }
      readonly effect: {
        readonly type: import('vue').PropType<import('./alert').AlertEffect>
        readonly default: 'light'
        readonly validator: (val: string) => boolean
      }
      readonly closable: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly closeText: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly closeIcon: {
        readonly type: import('vue').PropType<string | import('vue').Component>
        readonly default: ''
      }
      readonly showIcon: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly icon: {
        readonly type: import('vue').PropType<string | import('vue').Component>
        readonly default: ''
      }
      readonly center: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly scrollable: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly scrollSpeed: {
        readonly type: NumberConstructor
        readonly default: 15
      }
      readonly pauseOnHover: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly duration: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly showProgress: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onClose?: ((evt: MouseEvent) => any) | undefined
    }>,
  {
    readonly title: string
    readonly description: string
    readonly effect: 'dark' | 'light' | 'outline' | 'glass'
    readonly type: 'error' | 'success' | 'warning' | 'info'
    readonly center: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly icon: string | import('vue').Component
    readonly closable: boolean
    readonly duration: number
    readonly showProgress: boolean
    readonly closeText: string
    readonly closeIcon: string | import('vue').Component
    readonly showIcon: boolean
    readonly scrollable: boolean
    readonly scrollSpeed: number
    readonly pauseOnHover: boolean
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
