/**
 * AiChat Types & Props
 */

export interface AiChatProps {
  /**
   * @description 消息列表
   */
  messages?: Array<{
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    status?: 'loading' | 'success' | 'error'
    [key: string]: unknown
  }>
  /**
   * @description 是否加载中
   */
  loading?: boolean
  /**
   * @description 默认建议提示词
   */
  suggestions?: string[]
}

export interface AiChatEmits {
  (e: 'send', message: string): void
  (e: 'update:messages', messages: Exclude<AiChatProps['messages'], undefined>): void
  (e: 'clear'): void
}
