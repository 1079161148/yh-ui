import { ref } from 'vue'

export interface AiConversation {
  id: string
  title: string
  /**
   * 最近更新时间
   */
  updatedAt: number
  /**
   * 对话预览/最后一条消息内容
   */
  excerpt?: string
  /**
   * 自定义数据（例如知识库 ID 等业务数据）
   */
  meta?: Record<string, unknown>
}

export interface UseAiConversationsOptions {
  /** 初始化数据（或从后端的直出） */
  initialConversations?: AiConversation[]
  /**
   * 自定义生成 ID 的函数
   */
  idGenerator?: () => string
}

/**
 * Headless Hook: 用于管理侧边栏的对话会话（类似 ChatGPT 的会话列表）
 */
export function useAiConversations(options: UseAiConversationsOptions = {}) {
  const conversations = ref<AiConversation[]>(options.initialConversations || [])

  const defaultIdGen = () => Math.random().toString(36).substring(2, 9)
  const generateId = options.idGenerator || defaultIdGen

  /**
   * 添加新会话
   */
  const createConversation = (title: string, meta?: Record<string, unknown>) => {
    const newConv: AiConversation = {
      id: generateId(),
      title,
      updatedAt: Date.now(),
      meta
    }
    // 插在数组头
    conversations.value.unshift(newConv)
    return newConv
  }

  /**
   * 删除会话
   */
  const removeConversation = (id: string) => {
    const idx = conversations.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      conversations.value.splice(idx, 1)
    }
  }

  /**
   * 清空所有
   */
  const clear = () => {
    conversations.value = []
  }

  /**
   * 更新某个会话属性（改标题、更新简述）
   */
  const updateConversation = (id: string, updates: Partial<AiConversation>) => {
    const idx = conversations.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      conversations.value[idx] = { ...conversations.value[idx], ...updates, updatedAt: Date.now() }
    }
  }

  return {
    conversations,
    createConversation,
    removeConversation,
    clear,
    updateConversation
  }
}
