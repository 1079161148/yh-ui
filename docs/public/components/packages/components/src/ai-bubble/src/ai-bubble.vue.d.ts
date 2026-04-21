import { type AiMarkdownOptions } from './ai-bubble'
import 'highlight.js/styles/atom-one-dark.css'
declare var __VLS_1: {}, __VLS_15: {}, __VLS_17: {}, __VLS_59: {}
type __VLS_Slots = {} & {
  avatar?: (props: typeof __VLS_1) => any
} & {
  header?: (props: typeof __VLS_15) => any
} & {
  default?: (props: typeof __VLS_17) => any
} & {
  footer?: (props: typeof __VLS_59) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    content: {
      type: StringConstructor
      default: string
    }
    markdown: {
      type: BooleanConstructor
      default: boolean
    }
    role: {
      type: import('vue').PropType<'user' | 'assistant' | 'system'>
      default: string
    }
    placement: {
      type: import('vue').PropType<'start' | 'end'>
    }
    shape: {
      type: import('vue').PropType<'round' | 'corner'>
      default: string
    }
    variant: {
      type: import('vue').PropType<'filled' | 'outlined' | 'borderless' | 'shadow'>
      default: string
    }
    time: StringConstructor
    avatar: StringConstructor
    loading: BooleanConstructor
    typing: BooleanConstructor
    streaming: {
      type: BooleanConstructor
      default: boolean
    }
    streamMode: {
      type: import('vue').PropType<'word' | 'sentence' | 'paragraph'>
      default: string
    }
    streamSpeed: {
      type: NumberConstructor
      default: number
    }
    streamInterval: {
      type: NumberConstructor
      default: number
    }
    onStreamComplete: {
      type: import('vue').PropType<() => void>
    }
    citations: {
      type: import('vue').PropType<import('./ai-bubble').AiCitation[]>
      default: () => never[]
    }
    multimodal: {
      type: import('vue').PropType<import('./ai-bubble').AiMultimodal[]>
      default: () => never[]
    }
    markdownOptions: {
      type: import('vue').PropType<AiMarkdownOptions>
      default: () => {}
    }
    structuredData: {
      type: import('vue').PropType<import('./ai-bubble').AiStructuredData>
    }
    onExplainCode: {
      type: import('vue').PropType<(code: string, language: string) => Promise<string>>
    }
    onRunCode: {
      type: import('vue').PropType<
        (
          code: string,
          language: string
        ) => Promise<{
          output: string
          error?: string
        }>
      >
    }
    onCitationClick: {
      type: import('vue').PropType<(citation: import('./ai-bubble').AiCitation) => void>
    }
    themeOverrides: {
      type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      default: undefined
    }
    enablePythonRuntime: {
      type: BooleanConstructor
      default: boolean
    }
    pythonRuntime: {
      type: import('vue').PropType<'browser' | 'remote'>
      default: string
    }
    pythonApiUrl: {
      type: StringConstructor
      default: string
    }
    pyodideUrl: {
      type: StringConstructor
      default: string
    }
    enableSanitizer: {
      type: BooleanConstructor
      default: boolean
    }
    sanitizer: {
      type: import('vue').PropType<(html: string) => string>
      default: undefined
    }
    allowedTags: {
      type: import('vue').PropType<string[]>
      default: () => string[]
    }
    allowedAttributes: {
      type: import('vue').PropType<string[]>
      default: () => string[]
    }
    allowedSchemes: {
      type: import('vue').PropType<string[]>
      default: () => string[]
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      content: {
        type: StringConstructor
        default: string
      }
      markdown: {
        type: BooleanConstructor
        default: boolean
      }
      role: {
        type: import('vue').PropType<'user' | 'assistant' | 'system'>
        default: string
      }
      placement: {
        type: import('vue').PropType<'start' | 'end'>
      }
      shape: {
        type: import('vue').PropType<'round' | 'corner'>
        default: string
      }
      variant: {
        type: import('vue').PropType<'filled' | 'outlined' | 'borderless' | 'shadow'>
        default: string
      }
      time: StringConstructor
      avatar: StringConstructor
      loading: BooleanConstructor
      typing: BooleanConstructor
      streaming: {
        type: BooleanConstructor
        default: boolean
      }
      streamMode: {
        type: import('vue').PropType<'word' | 'sentence' | 'paragraph'>
        default: string
      }
      streamSpeed: {
        type: NumberConstructor
        default: number
      }
      streamInterval: {
        type: NumberConstructor
        default: number
      }
      onStreamComplete: {
        type: import('vue').PropType<() => void>
      }
      citations: {
        type: import('vue').PropType<import('./ai-bubble').AiCitation[]>
        default: () => never[]
      }
      multimodal: {
        type: import('vue').PropType<import('./ai-bubble').AiMultimodal[]>
        default: () => never[]
      }
      markdownOptions: {
        type: import('vue').PropType<AiMarkdownOptions>
        default: () => {}
      }
      structuredData: {
        type: import('vue').PropType<import('./ai-bubble').AiStructuredData>
      }
      onExplainCode: {
        type: import('vue').PropType<(code: string, language: string) => Promise<string>>
      }
      onRunCode: {
        type: import('vue').PropType<
          (
            code: string,
            language: string
          ) => Promise<{
            output: string
            error?: string
          }>
        >
      }
      onCitationClick: {
        type: import('vue').PropType<(citation: import('./ai-bubble').AiCitation) => void>
      }
      themeOverrides: {
        type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        default: undefined
      }
      enablePythonRuntime: {
        type: BooleanConstructor
        default: boolean
      }
      pythonRuntime: {
        type: import('vue').PropType<'browser' | 'remote'>
        default: string
      }
      pythonApiUrl: {
        type: StringConstructor
        default: string
      }
      pyodideUrl: {
        type: StringConstructor
        default: string
      }
      enableSanitizer: {
        type: BooleanConstructor
        default: boolean
      }
      sanitizer: {
        type: import('vue').PropType<(html: string) => string>
        default: undefined
      }
      allowedTags: {
        type: import('vue').PropType<string[]>
        default: () => string[]
      }
      allowedAttributes: {
        type: import('vue').PropType<string[]>
        default: () => string[]
      }
      allowedSchemes: {
        type: import('vue').PropType<string[]>
        default: () => string[]
      }
    }>
  > &
    Readonly<{}>,
  {
    loading: boolean
    citations: import('./ai-bubble').AiCitation[]
    role: 'user' | 'assistant' | 'system'
    content: string
    themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    variant: 'filled' | 'borderless' | 'shadow' | 'outlined'
    shape: 'round' | 'corner'
    markdown: boolean
    typing: boolean
    streaming: boolean
    streamMode: 'paragraph' | 'word' | 'sentence'
    streamSpeed: number
    streamInterval: number
    multimodal: import('./ai-bubble').AiMultimodal[]
    markdownOptions: AiMarkdownOptions
    enablePythonRuntime: boolean
    pythonRuntime: 'remote' | 'browser'
    pythonApiUrl: string
    pyodideUrl: string
    enableSanitizer: boolean
    sanitizer: (html: string) => string
    allowedTags: string[]
    allowedAttributes: string[]
    allowedSchemes: string[]
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
