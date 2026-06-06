import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'

export interface AiEditorAttachmentItem {
  name: string
  url?: string
  status?: 'uploading' | 'success' | 'error'
  percentage?: number
  [key: string]: unknown
}

/** 命令菜单项 */
export interface AiCommandItem {
  /** 唯一标识 */
  id: string
  /** 显示文本 */
  label: string
  /** 命令关键词（输入时触发） */
  keywords?: string[]
  /** 图标 */
  icon?: string
  /** 描述 */
  description?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 子命令（支持级联） */
  children?: AiCommandItem[]
  /** 层级深度 */
  level?: number
  /** 自定义数据 */
  data?: Record<string, unknown>
}

/** 命令面板位置 */
export type CommandPanelPosition = 'top' | 'bottom'

/** 命令面板对齐方式 */
export type CommandPanelAlign = 'start' | 'center' | 'end'

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
    type: Array as PropType<AiEditorAttachmentItem[]>,
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
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  },
  // ========== 命令菜单相关属性 ==========

  /**
   * 是否启用命令菜单
   */
  enableCommands: {
    type: Boolean,
    default: true
  },
  /**
   * 命令触发字符
   */
  commandTrigger: {
    type: String,
    default: '/'
  },
  /**
   * 命令列表
   */
  commands: {
    type: Array as PropType<AiCommandItem[]>,
    default: () => []
  },
  /**
   * 命令面板位置
   */
  commandPanelPosition: {
    type: String as PropType<CommandPanelPosition>,
    default: 'bottom'
  },
  /**
   * 命令面板对齐方式
   */
  commandPanelAlign: {
    type: String as PropType<CommandPanelAlign>,
    default: 'start'
  },
  /**
   * 命令面板宽度
   */
  commandPanelWidth: {
    type: [String, Number],
    default: 320
  },
  /**
   * 命令面板最大高度
   */
  commandPanelMaxHeight: {
    type: Number,
    default: 400
  },
  /**
   * 是否显示命令描述
   */
  showCommandDescription: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示命令图标
   */
  showCommandIcon: {
    type: Boolean,
    default: true
  },
  /**
   * 命令搜索防抖延迟（毫秒）
   */
  commandSearchDelay: {
    type: Number,
    default: 150
  },
  /**
   * 是否支持命令嵌套级联
   */
  enableCommandCascade: {
    type: Boolean,
    default: true
  },
  /**
   * 级联面板偏移量
   */
  cascadeOffset: {
    type: Number,
    default: 4
  }
}

export type AiEditorSenderProps = ExtractPropTypes<typeof aiEditorSenderProps>

export const aiEditorSenderEmits = {
  'update:modelValue': (_value: string) => true,
  send: (value: string) => !!value,
  change: (_value: string) => true,
  'remove-attachment': (_index: number, _item: AiEditorAttachmentItem) => true,
  clear: () => true,
  // 命令菜单事件
  'command-select': (_command: AiCommandItem, _parentCommand?: AiCommandItem) => true,
  'command-search': (_keyword: string) => true,
  'command-panel-show': () => true,
  'command-panel-hide': () => true,
  'command-cascade': (_command: AiCommandItem, _parentCommand: AiCommandItem) => true
}

export type AiEditorSenderEmits = typeof aiEditorSenderEmits

export interface AiEditorSenderSlots {
  header?: () => unknown
  toolbar?: () => unknown
  actions?: () => unknown
  submit?: (props: { submit: () => void; disabled: boolean; loading: boolean }) => unknown
}

export interface AiEditorSenderExpose {
  focus: () => void
  blur: () => void
  clear: () => void
}
