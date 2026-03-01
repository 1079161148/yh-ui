import type { ExtractPropTypes, PropType } from 'vue'

/**
 * AI 聊天消息结构
 */
export interface AiChatMessage {
  /** 唯一标识 */
  id: string
  /** 角色: 用户、助手或系统 */
  role: 'user' | 'assistant' | 'system'
  /** 消息内容 */
  content: string
  /** 状态: 加载中、成功、错误、生成中、已停止 */
  status?: 'loading' | 'success' | 'error' | 'generating' | 'stopped'
  /** 发送时间描述 */
  time?: string
  /** 消息发送时间戳 */
  createAt?: number
  /** 其他扩展属性 */
  [key: string]: unknown
}

export const aiChatProps = {
  /**
   * @description 消息列表
   */
  messages: {
    type: Array as PropType<AiChatMessage[]>,
    default: () => []
  },
  /**
   * @description 是否全域加载中 (通常指整个对话框的加载态)
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 默认建议提示词
   */
  suggestions: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiChatProps = ExtractPropTypes<typeof aiChatProps>

export const aiChatEmits = {
  send: (message: string) => typeof message === 'string',
  'update:messages': (messages: AiChatMessage[]) => Array.isArray(messages),
  clear: () => true
}

export type AiChatEmits = typeof aiChatEmits
