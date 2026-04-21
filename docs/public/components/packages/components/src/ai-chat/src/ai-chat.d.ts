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
export declare const aiChatProps: {
  /**
   * @description 消息列表
   */
  readonly messages: {
    readonly type: PropType<AiChatMessage[]>
    readonly default: () => never[]
  }
  /**
   * @description 是否全域加载中 (通常指整个对话框的加载态)
   */
  readonly loading: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * @description 默认建议提示词
   */
  readonly suggestions: {
    readonly type: PropType<string[]>
    readonly default: () => never[]
  }
  /**
   * @description 是否启用虚拟滚动 (大数据量时开启)
   */
  readonly virtualScroll: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * @description 虚拟滚动 - 容器高度
   */
  readonly virtualHeight: {
    readonly type: NumberConstructor
    readonly default: 400
  }
  /**
   * @description 虚拟滚动 - 每一项的预估高度
   */
  readonly estimatedItemHeight: {
    readonly type: NumberConstructor
    readonly default: 80
  }
  /**
   * @description 主题覆盖变量
   */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type AiChatProps = ExtractPropTypes<typeof aiChatProps>
export declare const aiChatEmits: {
  send: (message: string) => boolean
  'update:messages': (messages: AiChatMessage[]) => boolean
  clear: () => boolean
}
export type AiChatEmits = typeof aiChatEmits
export interface AiChatSlots {
  header?: () => unknown
  message?: (props: { message: AiChatMessage; index: number }) => unknown
  loading?: () => unknown
  sender?: () => unknown
}
