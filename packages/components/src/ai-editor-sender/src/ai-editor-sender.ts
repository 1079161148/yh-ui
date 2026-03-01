import type { ExtractPropTypes, PropType } from 'vue'

export interface AttachmentItem {
  name: string
  url?: string
  status?: 'uploading' | 'success' | 'error'
  percentage?: number
  [key: string]: unknown
}

export const aiEditorSenderProps = {
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Type a message...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 附件列表（仅展示用，逻辑需外部控制）
   */
  attachments: {
    type: Array as PropType<AttachmentItem[]>,
    default: () => []
  },
  /**
   * 字数统计
   */
  showWordLimit: {
    type: Boolean,
    default: true
  },
  /**
   * 最大字数
   */
  maxLength: {
    type: Number,
    default: undefined
  },
  /**
   * 默认行数
   */
  rows: {
    type: Number,
    default: 1
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiEditorSenderProps = ExtractPropTypes<typeof aiEditorSenderProps>

export const aiEditorSenderEmits = {
  'update:modelValue': (_value: string) => true,
  send: (value: string) => !!value,
  change: (_value: string) => true,
  'remove-attachment': (_index: number, _item: AttachmentItem) => true,
  clear: () => true
}

export type AiEditorSenderEmits = typeof aiEditorSenderEmits
