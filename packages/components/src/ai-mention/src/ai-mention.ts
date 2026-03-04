import type { ExtractPropTypes, PropType } from 'vue'
import type { MentionOption } from '../../mention'
import type { ComponentThemeVars } from '@yh-ui/theme'

export const aiMentionTypes = ['agent', 'document', 'table', 'knowledge'] as const
export type AiMentionType = (typeof aiMentionTypes)[number]

export interface AiMentionOption extends MentionOption {
  type?: AiMentionType
  icon?: string
}

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
    default: () => ['agent', 'document', 'table', 'knowledge']
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
  }
} as const

export type AiMentionProps = ExtractPropTypes<typeof aiMentionProps>

export const aiMentionEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  select: (option: AiMentionOption, trigger: string) => !!option && !!trigger,
  search: (keyword: string, trigger: string) => typeof keyword === 'string' && !!trigger,
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent
}

export type AiMentionEmits = typeof aiMentionEmits

export interface AiMentionExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null
  insertMention: (option: AiMentionOption, trigger?: string) => void
}
