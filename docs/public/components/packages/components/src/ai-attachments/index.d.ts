import AiAttachments from './src/ai-attachments.vue'
export declare const YhAiAttachments: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').AttachmentItem[]>
            readonly default: () => never[]
          }
          readonly overflow: {
            readonly type: import('vue').PropType<import('./index.js').OverflowMode>
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
              | import('./index.js').PlaceholderType
              | ((type: 'inline' | 'drop') => import('./index.js').PlaceholderType)
              | string
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
          'onUpdate:items'?: ((_items: import('./index.js').AttachmentItem[]) => any) | undefined
          'onUpload-change'?:
            | ((_file: File, _fileList: import('./index.js').AttachmentItem[]) => any)
            | undefined
          'onUpload-success'?:
            | ((
                _response: unknown,
                _file: File,
                _fileList: import('./index.js').AttachmentItem[]
              ) => any)
            | undefined
          'onUpload-error'?:
            | ((
                _error: unknown,
                _file: File,
                _fileList: import('./index.js').AttachmentItem[]
              ) => any)
            | undefined
          'onUpload-drop'?: ((_files: File[]) => any) | undefined
          'onDelete-card'?:
            | ((_item: import('./index.js').AttachmentItem, _index: number) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        exceed: (_options: { files: File[]; maxCount: number }) => void
        'update:items': (_items: import('./index.js').AttachmentItem[]) => void
        'upload-change': (_file: File, _fileList: import('./index.js').AttachmentItem[]) => void
        'upload-success': (
          _response: unknown,
          _file: File,
          _fileList: import('./index.js').AttachmentItem[]
        ) => void
        'upload-error': (
          _error: unknown,
          _file: File,
          _fileList: import('./index.js').AttachmentItem[]
        ) => void
        'upload-drop': (_files: File[]) => void
        'delete-card': (_item: import('./index.js').AttachmentItem, _index: number) => void
      },
      import('vue').PublicProps,
      {
        readonly overflow: import('./index.js').OverflowMode
        readonly placeholder:
          | string
          | import('./index.js').PlaceholderType
          | ((type: 'inline' | 'drop') => import('./index.js').PlaceholderType)
        readonly limit: number
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly listStyle: Record<string, string>
        readonly items: import('./index.js').AttachmentItem[]
        readonly httpRequest: (options: { file: File }) => Promise<void>
        readonly beforeUpload: (file: File) => boolean | Promise<boolean>
        readonly maxCount: number
        readonly scrollMaxHeight: string
        readonly uploadIconSize: string
        readonly dragTarget: string | HTMLElement
        readonly hideUpload: boolean
        readonly getDropContainer: () => HTMLElement
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
          readonly items: {
            readonly type: import('vue').PropType<import('./index.js').AttachmentItem[]>
            readonly default: () => never[]
          }
          readonly overflow: {
            readonly type: import('vue').PropType<import('./index.js').OverflowMode>
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
              | import('./index.js').PlaceholderType
              | ((type: 'inline' | 'drop') => import('./index.js').PlaceholderType)
              | string
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
          'onUpdate:items'?: ((_items: import('./index.js').AttachmentItem[]) => any) | undefined
          'onUpload-change'?:
            | ((_file: File, _fileList: import('./index.js').AttachmentItem[]) => any)
            | undefined
          'onUpload-success'?:
            | ((
                _response: unknown,
                _file: File,
                _fileList: import('./index.js').AttachmentItem[]
              ) => any)
            | undefined
          'onUpload-error'?:
            | ((
                _error: unknown,
                _file: File,
                _fileList: import('./index.js').AttachmentItem[]
              ) => any)
            | undefined
          'onUpload-drop'?: ((_files: File[]) => any) | undefined
          'onDelete-card'?:
            | ((_item: import('./index.js').AttachmentItem, _index: number) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        readonly overflow: import('./index.js').OverflowMode
        readonly placeholder:
          | string
          | import('./index.js').PlaceholderType
          | ((type: 'inline' | 'drop') => import('./index.js').PlaceholderType)
        readonly limit: number
        readonly disabled: boolean
        readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
        readonly listStyle: Record<string, string>
        readonly items: import('./index.js').AttachmentItem[]
        readonly httpRequest: (options: { file: File }) => Promise<void>
        readonly beforeUpload: (file: File) => boolean | Promise<boolean>
        readonly maxCount: number
        readonly scrollMaxHeight: string
        readonly uploadIconSize: string
        readonly dragTarget: string | HTMLElement
        readonly hideUpload: boolean
        readonly getDropContainer: () => HTMLElement
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        readonly items: {
          readonly type: import('vue').PropType<import('./index.js').AttachmentItem[]>
          readonly default: () => never[]
        }
        readonly overflow: {
          readonly type: import('vue').PropType<import('./index.js').OverflowMode>
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
            | import('./index.js').PlaceholderType
            | ((type: 'inline' | 'drop') => import('./index.js').PlaceholderType)
            | string
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
        'onUpdate:items'?: ((_items: import('./index.js').AttachmentItem[]) => any) | undefined
        'onUpload-change'?:
          | ((_file: File, _fileList: import('./index.js').AttachmentItem[]) => any)
          | undefined
        'onUpload-success'?:
          | ((
              _response: unknown,
              _file: File,
              _fileList: import('./index.js').AttachmentItem[]
            ) => any)
          | undefined
        'onUpload-error'?:
          | ((
              _error: unknown,
              _file: File,
              _fileList: import('./index.js').AttachmentItem[]
            ) => any)
          | undefined
        'onUpload-drop'?: ((_files: File[]) => any) | undefined
        'onDelete-card'?:
          | ((_item: import('./index.js').AttachmentItem, _index: number) => any)
          | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      exceed: (_options: { files: File[]; maxCount: number }) => void
      'update:items': (_items: import('./index.js').AttachmentItem[]) => void
      'upload-change': (_file: File, _fileList: import('./index.js').AttachmentItem[]) => void
      'upload-success': (
        _response: unknown,
        _file: File,
        _fileList: import('./index.js').AttachmentItem[]
      ) => void
      'upload-error': (
        _error: unknown,
        _file: File,
        _fileList: import('./index.js').AttachmentItem[]
      ) => void
      'upload-drop': (_files: File[]) => void
      'delete-card': (_item: import('./index.js').AttachmentItem, _index: number) => void
    },
    string,
    {
      readonly overflow: import('./index.js').OverflowMode
      readonly placeholder:
        | string
        | import('./index.js').PlaceholderType
        | ((type: 'inline' | 'drop') => import('./index.js').PlaceholderType)
      readonly limit: number
      readonly disabled: boolean
      readonly themeOverrides: import('@yh-ui/theme').ComponentThemeVars
      readonly listStyle: Record<string, string>
      readonly items: import('./index.js').AttachmentItem[]
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
        'file-item'?: (props: {
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
            size?: import('../index.js').FileCardSize | undefined
            description?: string | undefined
            loading?: boolean | undefined
            type?: import('../index.js').FileCardType | undefined
            src?: string | undefined
            mask?: string | undefined
            icon?: import('../index.js').PresetFileIcons | undefined
            imageProps?: Record<string, unknown> | undefined
            videoProps?: Record<string, unknown> | undefined
            audioProps?: Record<string, unknown> | undefined
            onClick?: (() => void) | undefined
          }
          index: number
        }) => any
      } & {
        'upload-button'?: (props: { canUpload: boolean }) => any
      } & {
        'drop-area'?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhAiAttachments
export * from './src/ai-attachments'
export type AiAttachmentsInstance = InstanceType<typeof AiAttachments>
export type YhAiAttachmentsInstance = AiAttachmentsInstance
export type YhAiAttachmentsProps = import('./src/ai-attachments').AiAttachmentsProps
export type YhAiAttachmentsEmits = import('./src/ai-attachments').AiAttachmentsEmits
export type YhAiAttachmentsSlots = import('./src/ai-attachments').AiAttachmentsSlots
export type YhOverflowMode = import('./src/ai-attachments').OverflowMode
export type YhAttachmentItem = import('./src/ai-attachments').AttachmentItem
export type YhPlaceholderType = import('./src/ai-attachments').PlaceholderType
