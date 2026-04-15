import type { ExtractPropTypes, PropType } from 'vue'
import type { MentionOption } from '../../mention'
import type { ComponentThemeVars } from '@yh-ui/theme'

export const aiMentionTypes = ['agent', 'document', 'table', 'knowledge', 'file'] as const
export type AiMentionType = (typeof aiMentionTypes)[number]

export interface AiMentionOption extends MentionOption {
  type?: AiMentionType
  icon?: string
  description?: string
  /** 文件/文档路径 */
  path?: string
  /** 文件大小 */
  size?: number
  /** 最后修改时间 */
  modifiedAt?: number
  /** 子节点（用于文件树） */
  children?: AiMentionOption[]
  /** 是否为文件夹 */
  isFolder?: boolean
  /** 是否展开 */
  expanded?: boolean
}

/** 文件树节点 */
export interface AiMentionFileNode {
  key: string
  label: string
  isFolder: boolean
  path: string
  children?: AiMentionFileNode[]
  disabled?: boolean
  icon?: string
  size?: number
  modifiedAt?: number
}

/** 文件树加载函数 */
export type AiMentionFileLoader = (
  keyword: string,
  type: 'document' | 'table' | 'file' | 'knowledge'
) => Promise<AiMentionFileNode[]>

export const aiMentionProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * AI 提及类型，支持多种类型过滤
   */
  types: {
    type: Array as PropType<AiMentionType[]>,
    default: () => ['agent', 'document', 'table', 'knowledge', 'file']
  },
  /**
   * 选项列表
   */
  options: {
    type: Array as PropType<AiMentionOption[]>,
    default: () => []
  },
  /**
   * 触发字符
   */
  triggers: {
    type: Array as PropType<string[]>,
    default: () => ['@']
  },
  /**
   * 是否在输入框中
   */
  type: {
    type: String as PropType<'input' | 'textarea'>,
    default: 'textarea'
  },
  /**
   * 占位符
   */
  placeholder: String,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 尺寸
   */
  size: String as PropType<'large' | 'default' | 'small'>,
  /**
   * 最大长度
   */
  maxLength: Number,
  /**
   * 文本域行数
   */
  rows: {
    type: Number,
    default: 3
  },
  /**
   * 是否正在加载
   */
  loading: Boolean,
  /**
   * 主题覆盖
   */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: () => ({})
  },
  /**
   * 选项过滤
   */
  filterOption: {
    type: [Function, Boolean] as PropType<
      ((keyword: string, option: MentionOption) => boolean) | false
    >,
    default: undefined
  },
  /**
   * 是否启用文件树选择器（@文档/@表格/@文件）
   */
  enableFileTree: {
    type: Boolean,
    default: true
  },
  /**
   * 文件树数据加载函数
   * 当用户触发 @文档/@表格/@文件 时调用
   */
  fileLoader: {
    type: [Function, Object] as PropType<AiMentionFileLoader>,
    default: undefined
  },
  /**
   * 文件树根路径
   */
  fileRoot: {
    type: String,
    default: '/'
  },
  /**
   * 文件树展开层级
   */
  fileTreeExpandedLevel: {
    type: Number,
    default: 2
  },
  /**
   * 是否显示文件图标
   */
  showFileIcon: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示文件大小
   */
  showFileSize: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示最后修改时间
   */
  showModifiedTime: {
    type: Boolean,
    default: true
  },
  /**
   * 文件大小格式化函数
   */
  formatFileSize: {
    type: Function as PropType<(size: number) => string>,
    default: (size: number) => {
      if (size < 1024) return size + ' B'
      if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
      if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + ' MB'
      return (size / 1024 / 1024 / 1024).toFixed(1) + ' GB'
    }
  },
  /**
   * 搜索防抖延迟（毫秒）
   */
  searchDebounce: {
    type: Number,
    default: 300
  }
} as const

export type AiMentionProps = ExtractPropTypes<typeof aiMentionProps>

export const aiMentionEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  select: (option: AiMentionOption, trigger: string) => !!option && !!trigger,
  search: (keyword: string, trigger: string) => typeof keyword === 'string' && !!trigger,
  'file-load': (_type: 'document' | 'table' | 'file' | 'knowledge', _nodes: AiMentionFileNode[]) =>
    true,
  'file-select': (node: AiMentionFileNode, option: AiMentionOption) => !!node && !!option,
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent
}

export type AiMentionEmits = typeof aiMentionEmits

export interface AiMentionSlots {
  [name: string]: ((props?: Record<string, unknown>) => unknown) | undefined
}

export interface AiMentionExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null
  insertMention: (option: AiMentionOption, trigger?: string) => void
  /** 刷新文件树 */
  refreshFileTree: () => void
  /** 展开/折叠文件夹 */
  toggleFolder: (key: string) => void
}
