import type { ExtractPropTypes, PropType } from 'vue'

export interface AiCommand {
  /**
   * 命令关键字，如 'summary'
   */
  key: string
  /**
   * 显示名称
   */
  label: string
  /**
   * 图标
   */
  icon?: string
  /**
   * 提示文本
   */
  description?: string
  /**
   * 命令执行时填充的文本，如果不传则使用 /key
   */
  prompt?: string
}

export interface AiAttachment {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 文件名
   */
  name: string
  /**
   * 文件类型
   */
  type: string
  /**
   * 预览图或 URL
   */
  url?: string
  /**
   * 文件大小（字节）
   */
  size?: number
  /**
   * 状态：上传中、成功、失败
   */
  status?: 'uploading' | 'success' | 'error'
  /**
   * 上传进度 (0-100)
   */
  progress?: number
}

export const aiSenderProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: 'Send a message...'
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示清空按钮
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * 最大长度
   */
  maxLength: Number,
  /**
   * 是否显示字数限制
   */
  showWordLimit: {
    type: Boolean,
    default: false
  },
  /**
   * 快捷命令列表
   */
  commands: {
    type: Array as PropType<AiCommand[]>,
    default: () => []
  },
  /**
   * 已选附件列表
   */
  attachments: {
    type: Array as PropType<AiAttachment[]>,
    default: () => []
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiSenderProps = ExtractPropTypes<typeof aiSenderProps>

export const aiSenderEmits = {
  'update:modelValue': (_val: string) => true,
  send: (_val: string) => true,
  change: (_val: string) => true,
  clear: () => true,
  focus: (_e: FocusEvent) => true,
  blur: (_e: FocusEvent) => true,
  /**
   * 快捷命令选中时触发
   */
  command: (_command: AiCommand) => true,
  /**
   * 附件移除时触发
   */
  'remove-attachment': (_attachment: AiAttachment) => true
}

export type AiSenderEmits = typeof aiSenderEmits
