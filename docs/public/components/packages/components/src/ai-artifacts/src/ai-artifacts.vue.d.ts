import { type ArtifactVersion, type ArtifactEChartsOption } from './ai-artifacts'
import 'highlight.js/styles/atom-one-dark.css'
declare var __VLS_33: {
    data: ArtifactVersion | null
    title: string
  },
  __VLS_39: {
    data: ArtifactVersion | null
  }
type __VLS_Slots = {} & {
  chart?: (props: typeof __VLS_33) => any
} & {
  canvas?: (props: typeof __VLS_39) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    visible: {
      type: BooleanConstructor
      default: boolean
    }
    data: {
      type: import('vue').PropType<import('./ai-artifacts').ArtifactData>
    }
    width: {
      type: import('vue').PropType<string | number>
      default: string
    }
    fullscreen: {
      type: BooleanConstructor
      default: boolean
    }
    mode: {
      type: import('vue').PropType<'preview' | 'code' | 'inline'>
      default: string
    }
    themeOverrides: {
      type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      default: undefined
    }
    echartsOption: {
      type: import('vue').PropType<ArtifactEChartsOption>
      default: undefined
    }
    autoLoadECharts: {
      type: BooleanConstructor
      default: boolean
    }
    echartsTheme: {
      type: import('vue').PropType<'light' | 'dark' | 'default'>
      default: string
    }
    echartsDataZoom: {
      type: BooleanConstructor
      default: boolean
    }
    echartsToolbox: {
      type: BooleanConstructor
      default: boolean
    }
    chartHeight: {
      type: (StringConstructor | NumberConstructor)[]
      default: number
    }
    responsiveWidth: {
      type: BooleanConstructor
      default: boolean
    }
    chartLoadingText: {
      type: StringConstructor
      default: string
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    close: () => void
    'update:visible': (_val: boolean) => void
    'update:mode': (_val: 'code' | 'preview' | 'inline') => void
    'version-change': (_version: ArtifactVersion) => void
    'chart-click': (_params: unknown) => void
    'chart-ready': (_chart: unknown) => void
    'chart-error': (_error: Error) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      visible: {
        type: BooleanConstructor
        default: boolean
      }
      data: {
        type: import('vue').PropType<import('./ai-artifacts').ArtifactData>
      }
      width: {
        type: import('vue').PropType<string | number>
        default: string
      }
      fullscreen: {
        type: BooleanConstructor
        default: boolean
      }
      mode: {
        type: import('vue').PropType<'preview' | 'code' | 'inline'>
        default: string
      }
      themeOverrides: {
        type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        default: undefined
      }
      echartsOption: {
        type: import('vue').PropType<ArtifactEChartsOption>
        default: undefined
      }
      autoLoadECharts: {
        type: BooleanConstructor
        default: boolean
      }
      echartsTheme: {
        type: import('vue').PropType<'light' | 'dark' | 'default'>
        default: string
      }
      echartsDataZoom: {
        type: BooleanConstructor
        default: boolean
      }
      echartsToolbox: {
        type: BooleanConstructor
        default: boolean
      }
      chartHeight: {
        type: (StringConstructor | NumberConstructor)[]
        default: number
      }
      responsiveWidth: {
        type: BooleanConstructor
        default: boolean
      }
      chartLoadingText: {
        type: StringConstructor
        default: string
      }
    }>
  > &
    Readonly<{
      onClose?: (() => any) | undefined
      'onUpdate:visible'?: ((_val: boolean) => any) | undefined
      'onUpdate:mode'?: ((_val: 'code' | 'preview' | 'inline') => any) | undefined
      'onVersion-change'?: ((_version: ArtifactVersion) => any) | undefined
      'onChart-click'?: ((_params: unknown) => any) | undefined
      'onChart-ready'?: ((_chart: unknown) => any) | undefined
      'onChart-error'?: ((_error: Error) => any) | undefined
    }>,
  {
    mode: 'code' | 'preview' | 'inline'
    fullscreen: boolean
    width: string | number
    themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    visible: boolean
    echartsOption: ArtifactEChartsOption
    autoLoadECharts: boolean
    echartsTheme: 'default' | 'dark' | 'light'
    echartsDataZoom: boolean
    echartsToolbox: boolean
    chartHeight: string | number
    responsiveWidth: boolean
    chartLoadingText: string
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
