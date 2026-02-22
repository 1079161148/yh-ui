/**
 * Mention Types & Props
 * @description 提及组件类型定义
 */
import type { VNodeChild, Component } from 'vue'

// ─── 基础类型 ─────────────────────────────────────────────────────────────────

export const mentionPlacements = ['top', 'bottom'] as const
export const mentionSizes = ['large', 'default', 'small'] as const
export const mentionSplits = ['@', '#', '$', '/', ':'] as const

export type MentionPlacement = (typeof mentionPlacements)[number]
export type MentionSize = (typeof mentionSizes)[number]

// ─── Option 数据结构 ──────────────────────────────────────────────────────────

/**
 * 提及选项
 */
export interface MentionOption {
  /**
   * 唯一标识
   */
  value: string
  /**
   * 显示标签（未设置时使用 value）
   */
  label?: string
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 头像 URL（用于展示用户头像）
   */
  avatar?: string
  /**
   * 附加描述文字
   */
  description?: string
  /**
   * 分组标识（相同 group 的选项会归到同一组）
   */
  group?: string
  /**
   * 扩展字段，方便自定义渲染
   */
  [key: string]: unknown
}

// ─── 触发位置 ─────────────────────────────────────────────────────────────────

/**
 * 触发光标位置信息
 */
export interface MentionTriggerPosition {
  /** 触发字符在输入值中的位置 */
  index: number
  /** 触发符号（如 @、# 等） */
  trigger: string
  /** 触发符号之后已输入的搜索词 */
  keyword: string
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MentionProps {
  /**
   * 绑定值
   */
  modelValue?: string

  /**
   * 提及选项列表
   */
  options?: MentionOption[]

  /**
   * 触发字符，支持多个
   * @default ['@']
   */
  triggers?: string[]

  /**
   * 输入框类型
   * @default 'input'
   */
  type?: 'input' | 'textarea'

  /**
   * 下拉框弹出方向
   * @default 'bottom'
   */
  placement?: MentionPlacement

  /**
   * 占位文本
   */
  placeholder?: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean

  /**
   * 尺寸
   * @default 'default'
   */
  size?: MentionSize

  /**
   * 最大输入长度
   */
  maxlength?: number

  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean

  /**
   * 是否显示字数统计
   * @default false
   */
  showWordLimit?: boolean

  /**
   * 前缀图标
   */
  prefixIcon?: string | Component

  /**
   * 后缀图标
   */
  suffixIcon?: string | Component

  /**
   * 最大选项显示数量（滚动选项列表）
   * @default 8
   */
  maxCount?: number

  /**
   * 过滤函数，返回 true 则保留该选项
   */
  filterOption?: ((keyword: string, option: MentionOption) => boolean) | false

  /**
   * 异步加载选项（返回 Promise 的 fetchSuggestions 回调）
   */
  loading?: boolean

  /**
   * 加载文字
   */
  loadingText?: string

  /**
   * 无数据文字
   */
  noDataText?: string

  /**
   * 下拉框挂载到 body
   * @default true
   */
  teleported?: boolean

  /**
   * 下拉 popper 的自定义 class
   */
  popperClass?: string

  /**
   * 选中后是否在 @ 后追加一个空格
   * @default true
   */
  split?: string

  /**
   * 是否整整提及值（而非仅 value）最终写入 modelValue
   * @default false
   */
  wholeWord?: boolean

  /**
   * 是否自动获取焦点
   * @default false
   */
  autofocus?: boolean

  /**
   * 原生 rows（textarea 有效）
   * @default 3
   */
  rows?: number

  /**
   * 自适应文本域高度
   */
  autosize?: boolean | { minRows?: number; maxRows?: number }

  /**
   * 防抖延迟（ms）
   * @default 100
   */
  debounce?: number

  /**
   * 是否在输入时触发表单校验
   * @default true
   */
  validateEvent?: boolean

  /**
   * 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

// ─── Emits ────────────────────────────────────────────────────────────────────

export interface MentionEmits {
  (e: 'update:modelValue', value: string): void
  /** 输入事件 */
  (e: 'input', value: string): void
  /** 改变事件（失焦时） */
  (e: 'change', value: string): void
  /** 聚焦 */
  (e: 'focus', event: FocusEvent): void
  /** 失焦 */
  (e: 'blur', event: FocusEvent): void
  /** 清空 */
  (e: 'clear'): void
  /** 触发搜索（光标进入 @ 词时） */
  (e: 'search', keyword: string, trigger: string): void
  /** 选中某项 */
  (e: 'select', option: MentionOption, trigger: string): void
  /** 下拉框打开 */
  (e: 'open'): void
  /** 下拉框关闭 */
  (e: 'close'): void
  /** 键盘事件 */
  (e: 'keydown', event: KeyboardEvent): void
}

// ─── Slots ────────────────────────────────────────────────────────────────────

export interface MentionSlots {
  /** 自定义选项渲染 */
  option?: (props: { option: MentionOption; keyword: string }) => VNodeChild
  /** 自定义标签（提及气泡） */
  label?: (props: { option: MentionOption }) => VNodeChild
  /** 自定义无数据内容 */
  empty?: () => VNodeChild
  /** 自定义加载内容 */
  loading?: () => VNodeChild
  /** 自定义前缀 */
  prefix?: () => VNodeChild
  /** 自定义后缀 */
  suffix?: () => VNodeChild
}

// ─── Expose ───────────────────────────────────────────────────────────────────

export interface MentionExpose {
  /** 输入框 DOM 引用 */
  ref: HTMLInputElement | HTMLTextAreaElement | undefined
  /** 包裹元素 DOM */
  wrapperRef: HTMLElement | undefined
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 清空输入 */
  clear: () => void
  /** 插入提及文本（编程式） */
  insertMention: (option: MentionOption, trigger?: string) => void
}
