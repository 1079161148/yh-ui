declare var __VLS_1: {},
  __VLS_3: {
    total: number
    currentIndex: number
    to: (index: number) => void
  },
  __VLS_5: {
    total: number
    currentIndex: number
    to: (index: number) => void
    prev: () => number
    next: () => number
  },
  __VLS_7: {},
  __VLS_9: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
} & {
  dots?: (props: typeof __VLS_3) => any
} & {
  arrow?: (props: typeof __VLS_5) => any
} & {
  'prev-arrow'?: (props: typeof __VLS_7) => any
} & {
  'next-arrow'?: (props: typeof __VLS_9) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly currentIndex: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly defaultIndex: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly autoplay: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly interval: {
      readonly type: NumberConstructor
      readonly default: 3000
    }
    readonly loop: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly effect: {
      readonly type: import('vue').PropType<import('./carousel').CarouselEffect>
      readonly default: 'slide'
    }
    readonly direction: {
      readonly type: import('vue').PropType<import('./carousel').CarouselDirection>
      readonly default: 'horizontal'
    }
    readonly showArrow: {
      readonly type: import('vue').PropType<import('./carousel').CarouselArrow>
      readonly default: 'hover'
    }
    readonly showDots: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly dotTrigger: {
      readonly type: import('vue').PropType<import('./carousel').CarouselTrigger>
      readonly default: 'click'
    }
    readonly dotPlacement: {
      readonly type: import('vue').PropType<import('./carousel').CarouselDotPlacement>
      readonly default: 'bottom'
    }
    readonly dotType: {
      readonly type: import('vue').PropType<'dot' | 'line'>
      readonly default: 'dot'
    }
    readonly keyboard: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly pauseOnHover: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly draggable: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly mousewheel: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly spaceBetween: {
      readonly type: NumberConstructor
      readonly default: 0
    }
    readonly cardGutter: {
      readonly type: NumberConstructor
      readonly default: 20
    }
    readonly slidesPreView: {
      readonly type: import('vue').PropType<number | 'auto'>
      readonly default: 1
    }
    readonly duration: {
      readonly type: NumberConstructor
      readonly default: 500
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {
    prev: () => number
    next: () => number
    jump: (index: number) => void
    to: (index: number) => void
    getCurrentIndex: () => number
    currentIndex: import('vue').ShallowRef<number, number>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    change: (index: number, prevIndex: number) => void
    'update:currentIndex': (index: number) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly currentIndex: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly defaultIndex: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly autoplay: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly interval: {
        readonly type: NumberConstructor
        readonly default: 3000
      }
      readonly loop: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly effect: {
        readonly type: import('vue').PropType<import('./carousel').CarouselEffect>
        readonly default: 'slide'
      }
      readonly direction: {
        readonly type: import('vue').PropType<import('./carousel').CarouselDirection>
        readonly default: 'horizontal'
      }
      readonly showArrow: {
        readonly type: import('vue').PropType<import('./carousel').CarouselArrow>
        readonly default: 'hover'
      }
      readonly showDots: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly dotTrigger: {
        readonly type: import('vue').PropType<import('./carousel').CarouselTrigger>
        readonly default: 'click'
      }
      readonly dotPlacement: {
        readonly type: import('vue').PropType<import('./carousel').CarouselDotPlacement>
        readonly default: 'bottom'
      }
      readonly dotType: {
        readonly type: import('vue').PropType<'dot' | 'line'>
        readonly default: 'dot'
      }
      readonly keyboard: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly pauseOnHover: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly draggable: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly mousewheel: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly spaceBetween: {
        readonly type: NumberConstructor
        readonly default: 0
      }
      readonly cardGutter: {
        readonly type: NumberConstructor
        readonly default: 20
      }
      readonly slidesPreView: {
        readonly type: import('vue').PropType<number | 'auto'>
        readonly default: 1
      }
      readonly duration: {
        readonly type: NumberConstructor
        readonly default: 500
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onChange?: ((index: number, prevIndex: number) => any) | undefined
      'onUpdate:currentIndex'?: ((index: number) => any) | undefined
    }>,
  {
    readonly interval: number
    readonly effect: import('./carousel').CarouselEffect
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly direction: import('./carousel').CarouselDirection
    readonly draggable: boolean
    readonly duration: number
    readonly pauseOnHover: boolean
    readonly showArrow: import('./carousel').CarouselArrow
    readonly loop: boolean
    readonly keyboard: boolean
    readonly currentIndex: number
    readonly defaultIndex: number
    readonly autoplay: boolean
    readonly showDots: boolean
    readonly dotTrigger: import('./carousel').CarouselTrigger
    readonly dotPlacement: import('./carousel').CarouselDotPlacement
    readonly dotType: 'line' | 'dot'
    readonly mousewheel: boolean
    readonly spaceBetween: number
    readonly cardGutter: number
    readonly slidesPreView: number | 'auto'
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
