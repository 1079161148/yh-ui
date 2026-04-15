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
export declare const aiEditorSenderProps: {
  modelValue: {
    type: StringConstructor
    default: string
  }
  placeholder: {
    type: StringConstructor
    default: string
  }
  disabled: {
    type: BooleanConstructor
    default: boolean
  }
  loading: {
    type: BooleanConstructor
    default: boolean
  }
  /**
   * 附件列表（仅展示用，逻辑需外部控制）
   */
  attachments: {
    type: PropType<AiEditorAttachmentItem[]>
    default: () => never[]
  }
  /**
   * 字数统计
   */
  showWordLimit: {
    type: BooleanConstructor
    default: boolean
  }
  /**
   * 最大字数
   */
  maxLength: {
    type: NumberConstructor
    default: undefined
  }
  /**
   * 默认行数
   */
  rows: {
    type: NumberConstructor
    default: number
  }
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: PropType<ComponentThemeVars>
    default: undefined
  }
  /**
   * 是否启用命令菜单
   */
  enableCommands: {
    type: BooleanConstructor
    default: boolean
  }
  /**
   * 命令触发字符
   */
  commandTrigger: {
    type: StringConstructor
    default: string
  }
  /**
   * 命令列表
   */
  commands: {
    type: PropType<AiCommandItem[]>
    default: () => never[]
  }
  /**
   * 命令面板位置
   */
  commandPanelPosition: {
    type: PropType<CommandPanelPosition>
    default: string
  }
  /**
   * 命令面板对齐方式
   */
  commandPanelAlign: {
    type: PropType<CommandPanelAlign>
    default: string
  }
  /**
   * 命令面板宽度
   */
  commandPanelWidth: {
    type: (StringConstructor | NumberConstructor)[]
    default: number
  }
  /**
   * 命令面板最大高度
   */
  commandPanelMaxHeight: {
    type: NumberConstructor
    default: number
  }
  /**
   * 是否显示命令描述
   */
  showCommandDescription: {
    type: BooleanConstructor
    default: boolean
  }
  /**
   * 是否显示命令图标
   */
  showCommandIcon: {
    type: BooleanConstructor
    default: boolean
  }
  /**
   * 命令搜索防抖延迟（毫秒）
   */
  commandSearchDelay: {
    type: NumberConstructor
    default: number
  }
  /**
   * 是否支持命令嵌套级联
   */
  enableCommandCascade: {
    type: BooleanConstructor
    default: boolean
  }
  /**
   * 级联面板偏移量
   */
  cascadeOffset: {
    type: NumberConstructor
    default: number
  }
}
export type AiEditorSenderProps = ExtractPropTypes<typeof aiEditorSenderProps>
export declare const aiEditorSenderEmits: {
  'update:modelValue': (_value: string) => boolean
  send: (value: string) => boolean
  change: (_value: string) => boolean
  'remove-attachment': (_index: number, _item: AiEditorAttachmentItem) => boolean
  clear: () => boolean
  'command-select': (_command: AiCommandItem, _parentCommand?: AiCommandItem) => boolean
  'command-search': (_keyword: string) => boolean
  'command-panel-show': () => boolean
  'command-panel-hide': () => boolean
  'command-cascade': (_command: AiCommandItem, _parentCommand: AiCommandItem) => boolean
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
