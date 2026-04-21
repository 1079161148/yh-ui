import type { ImageMagnifierPosition } from './image-magnifier'
declare var __VLS_1: {},
  __VLS_3: {},
  __VLS_9: {},
  __VLS_11: {
    src: string
    alt: string
  }
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
} & {
  title?: (props: typeof __VLS_3) => any
} & {
  'close-icon'?: (props: typeof __VLS_9) => any
} & {
  fullscreen?: (props: typeof __VLS_11) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    src: {
      type: StringConstructor
      default: string
    }
    zoomSrc: {
      type: StringConstructor
      default: string
    }
    images: {
      type: import('vue').PropType<import('./image-magnifier').ImageMagnifierImage[]>
      default: () => never[]
    }
    modelValue: {
      type: NumberConstructor
      default: number
    }
    scale: {
      type: NumberConstructor
      default: number
    }
    wheelZoom: {
      type: BooleanConstructor
      default: boolean
    }
    minScale: {
      type: NumberConstructor
      default: number
    }
    maxScale: {
      type: NumberConstructor
      default: number
    }
    scaleStep: {
      type: NumberConstructor
      default: number
    }
    width: {
      type: (StringConstructor | NumberConstructor)[]
      default: string
    }
    height: {
      type: (StringConstructor | NumberConstructor)[]
      default: string
    }
    position: {
      type: import('vue').PropType<ImageMagnifierPosition | 'auto'>
      default: string
    }
    offset: {
      type: NumberConstructor
      default: number
    }
    maskShape: {
      type: import('vue').PropType<import('./image-magnifier').ImageMagnifierMaskShape>
      default: string
    }
    maskWidth: {
      type: NumberConstructor
      default: number
    }
    maskHeight: {
      type: NumberConstructor
      default: number
    }
    maskColor: {
      type: StringConstructor
      default: string
    }
    showMinimap: {
      type: BooleanConstructor
      default: boolean
    }
    border: {
      type: BooleanConstructor
      default: boolean
    }
    shadow: {
      type: BooleanConstructor
      default: boolean
    }
    title: {
      type: StringConstructor
      default: string
    }
    clickToFullscreen: {
      type: BooleanConstructor
      default: boolean
    }
    alt: {
      type: StringConstructor
      default: string
    }
    loadingColor: {
      type: StringConstructor
      default: string
    }
    themeOverrides: {
      type: import('vue').PropType<Record<string, string>>
      default: () => {}
    }
  }>,
  {
    visible: import('vue').Ref<boolean, boolean>
    currentScale: import('vue').Ref<number, number>
    currentIndex: import('vue').Ref<number, number>
    switchImage: (index: number) => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    'update:modelValue': (index: number) => void
    enter: () => void
    leave: () => void
    'zoom-start': () => void
    'zoom-end': () => void
    'scale-change': (scale: number) => void
    'image-change': (index: number) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      src: {
        type: StringConstructor
        default: string
      }
      zoomSrc: {
        type: StringConstructor
        default: string
      }
      images: {
        type: import('vue').PropType<import('./image-magnifier').ImageMagnifierImage[]>
        default: () => never[]
      }
      modelValue: {
        type: NumberConstructor
        default: number
      }
      scale: {
        type: NumberConstructor
        default: number
      }
      wheelZoom: {
        type: BooleanConstructor
        default: boolean
      }
      minScale: {
        type: NumberConstructor
        default: number
      }
      maxScale: {
        type: NumberConstructor
        default: number
      }
      scaleStep: {
        type: NumberConstructor
        default: number
      }
      width: {
        type: (StringConstructor | NumberConstructor)[]
        default: string
      }
      height: {
        type: (StringConstructor | NumberConstructor)[]
        default: string
      }
      position: {
        type: import('vue').PropType<ImageMagnifierPosition | 'auto'>
        default: string
      }
      offset: {
        type: NumberConstructor
        default: number
      }
      maskShape: {
        type: import('vue').PropType<import('./image-magnifier').ImageMagnifierMaskShape>
        default: string
      }
      maskWidth: {
        type: NumberConstructor
        default: number
      }
      maskHeight: {
        type: NumberConstructor
        default: number
      }
      maskColor: {
        type: StringConstructor
        default: string
      }
      showMinimap: {
        type: BooleanConstructor
        default: boolean
      }
      border: {
        type: BooleanConstructor
        default: boolean
      }
      shadow: {
        type: BooleanConstructor
        default: boolean
      }
      title: {
        type: StringConstructor
        default: string
      }
      clickToFullscreen: {
        type: BooleanConstructor
        default: boolean
      }
      alt: {
        type: StringConstructor
        default: string
      }
      loadingColor: {
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
      'onUpdate:modelValue'?: ((index: number) => any) | undefined
      onEnter?: (() => any) | undefined
      onLeave?: (() => any) | undefined
      'onZoom-start'?: (() => any) | undefined
      'onZoom-end'?: (() => any) | undefined
      'onScale-change'?: ((scale: number) => any) | undefined
      'onImage-change'?: ((index: number) => any) | undefined
    }>,
  {
    title: string
    width: string | number
    height: string | number
    themeOverrides: Record<string, string>
    modelValue: number
    position: 'auto' | ImageMagnifierPosition
    scale: number
    border: boolean
    offset: number
    shadow: boolean
    src: string
    alt: string
    images: import('./image-magnifier').ImageMagnifierImage[]
    zoomSrc: string
    wheelZoom: boolean
    minScale: number
    maxScale: number
    scaleStep: number
    maskShape: import('./image-magnifier').ImageMagnifierMaskShape
    maskWidth: number
    maskHeight: number
    maskColor: string
    showMinimap: boolean
    clickToFullscreen: boolean
    loadingColor: string
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
