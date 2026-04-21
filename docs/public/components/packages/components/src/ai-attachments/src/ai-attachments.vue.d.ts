import { type AttachmentItem, type PlaceholderType } from './ai-attachments'
import type { PresetFileIcons } from '../../ai-file-card'
declare var __VLS_1: {
    item: {
      status?: 'uploading' | 'done' | 'error' | 'removed' | undefined
      percent?: number | undefined
      response?: unknown
      error?: string | undefined
      uid?: string | number | undefined
      url?: string | undefined
      thumbUrl?: string | undefined
      name: string
      byte?: number | undefined
      size?: import('../..').FileCardSize | undefined
      description?: string | undefined
      loading?: boolean | undefined
      type?: import('../..').FileCardType | undefined
      src?: string | undefined
      mask?: string | undefined
      icon?: PresetFileIcons | undefined
      imageProps?: Record<string, unknown> | undefined
      videoProps?: Record<string, unknown> | undefined
      audioProps?: Record<string, unknown> | undefined
      onClick?: (() => void) | undefined
    }
    index: number
  },
  __VLS_11: {
    canUpload: boolean
  },
  __VLS_17: {}
type __VLS_Slots = {} & {
  'file-item'?: (props: typeof __VLS_1) => any
} & {
  'upload-button'?: (props: typeof __VLS_11) => any
} & {
  'drop-area'?: (props: typeof __VLS_17) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly items: {
      readonly type: import('vue').PropType<AttachmentItem[]>
      readonly default: () => never[]
    }
    readonly overflow: {
      readonly type: import('vue').PropType<import('./ai-attachments').OverflowMode>
      readonly default: 'scrollX'
    }
    readonly listStyle: {
      readonly type: import('vue').PropType<Record<string, string>>
      readonly default: () => {}
    }
    readonly scrollMaxHeight: {
      readonly type: StringConstructor
      readonly default: undefined
    }
    readonly uploadIconSize: {
      readonly type: StringConstructor
      readonly default: '24px'
    }
    readonly dragTarget: {
      readonly type: import('vue').PropType<string | HTMLElement>
      readonly default: null
    }
    readonly hideUpload: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly limit: {
      readonly type: NumberConstructor
      readonly default: undefined
    }
    readonly beforeUpload: {
      readonly type: import('vue').PropType<(file: File) => boolean | Promise<boolean>>
      readonly default: undefined
    }
    readonly httpRequest: {
      readonly type: import('vue').PropType<(options: { file: File }) => Promise<void>>
      readonly default: undefined
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly maxCount: {
      readonly type: NumberConstructor
      readonly default: undefined
    }
    readonly getDropContainer: {
      readonly type: import('vue').PropType<() => HTMLElement>
      readonly default: undefined
    }
    readonly placeholder: {
      readonly type: import('vue').PropType<
        PlaceholderType | ((type: 'inline' | 'drop') => PlaceholderType) | string
      >
      readonly default: () => {
        icon: string
        title: string
        description: string
      }
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
    exceed: (_options: { files: File[]; maxCount: number }) => void
    'update:items': (_items: AttachmentItem[]) => void
    'upload-change': (_file: File, _fileList: AttachmentItem[]) => void
    'upload-success': (_response: unknown, _file: File, _fileList: AttachmentItem[]) => void
    'upload-error': (_error: unknown, _file: File, _fileList: AttachmentItem[]) => void
    'upload-drop': (_files: File[]) => void
    'delete-card': (_item: AttachmentItem, _index: number) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly items: {
        readonly type: import('vue').PropType<AttachmentItem[]>
        readonly default: () => never[]
      }
      readonly overflow: {
        readonly type: import('vue').PropType<import('./ai-attachments').OverflowMode>
        readonly default: 'scrollX'
      }
      readonly listStyle: {
        readonly type: import('vue').PropType<Record<string, string>>
        readonly default: () => {}
      }
      readonly scrollMaxHeight: {
        readonly type: StringConstructor
        readonly default: undefined
      }
      readonly uploadIconSize: {
        readonly type: StringConstructor
        readonly default: '24px'
      }
      readonly dragTarget: {
        readonly type: import('vue').PropType<string | HTMLElement>
        readonly default: null
      }
      readonly hideUpload: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly limit: {
        readonly type: NumberConstructor
        readonly default: undefined
      }
      readonly beforeUpload: {
        readonly type: import('vue').PropType<(file: File) => boolean | Promise<boolean>>
        readonly default: undefined
      }
      readonly httpRequest: {
        readonly type: import('vue').PropType<(options: { file: File }) => Promise<void>>
        readonly default: undefined
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly maxCount: {
        readonly type: NumberConstructor
        readonly default: undefined
      }
      readonly getDropContainer: {
        readonly type: import('vue').PropType<() => HTMLElement>
        readonly default: undefined
      }
      readonly placeholder: {
        readonly type: import('vue').PropType<
          PlaceholderType | ((type: 'inline' | 'drop') => PlaceholderType) | string
        >
        readonly default: () => {
          icon: string
          title: string
          description: string
        }
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{
      onExceed?: ((_options: { files: File[]; maxCount: number }) => any) | undefined
      'onUpdate:items'?: ((_items: AttachmentItem[]) => any) | undefined
      'onUpload-change'?: ((_file: File, _fileList: AttachmentItem[]) => any) | undefined
      'onUpload-success'?:
        | ((_response: unknown, _file: File, _fileList: AttachmentItem[]) => any)
        | undefined
      'onUpload-error'?:
        | ((_error: unknown, _file: File, _fileList: AttachmentItem[]) => any)
        | undefined
      'onUpload-drop'?: ((_files: File[]) => any) | undefined
      'onDelete-card'?: ((_item: AttachmentItem, _index: number) => any) | undefined
    }>,
  {
    readonly overflow: import('./ai-attachments').OverflowMode
    readonly placeholder: string | PlaceholderType | ((type: 'inline' | 'drop') => PlaceholderType)
    readonly limit: number
    readonly disabled: boolean
    readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
    readonly listStyle: Record<string, string>
    readonly items: AttachmentItem[]
    readonly httpRequest: (options: { file: File }) => Promise<void>
    readonly beforeUpload: (file: File) => boolean | Promise<boolean>
    readonly maxCount: number
    readonly scrollMaxHeight: string
    readonly uploadIconSize: string
    readonly dragTarget: string | HTMLElement
    readonly hideUpload: boolean
    readonly getDropContainer: () => HTMLElement
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
