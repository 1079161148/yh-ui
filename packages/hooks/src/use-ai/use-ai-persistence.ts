import { ref, onMounted } from 'vue'
import { IndexedDBAdapter, type StorageAdapter } from '../storage'

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  metadata?: Record<string, unknown>
}

export interface Conversation {
  id: string
  title: string
  messages: ConversationMessage[]
  createdAt: number
  updatedAt: number
}

export interface UseAiPersistenceOptions {
  storage?: StorageAdapter
  conversationKey?: string
  autoSave?: boolean
}

export function useAiPersistence(options: UseAiPersistenceOptions = {}) {
  const {
    storage = new IndexedDBAdapter(),
    conversationKey = 'ai-conversations',
    autoSave = true
  } = options

  const conversations = ref<Conversation[]>([])
  const currentConversationId = ref<string | null>(null)
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<Error | null>(null)

  const loadConversations = async () => {
    isLoading.value = true
    error.value = null
    try {
      const data = await storage.get<Conversation[]>(conversationKey)
      conversations.value = data || []
      if (conversations.value.length > 0) {
        const lastConversation = conversations.value[conversations.value.length - 1]
        currentConversationId.value = lastConversation.id
      }
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to load conversations')
    } finally {
      isLoading.value = false
    }
  }

  const saveConversations = async () => {
    isSaving.value = true
    error.value = null
    try {
      await storage.set(conversationKey, conversations.value)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to save conversations')
    } finally {
      isSaving.value = false
    }
  }

  const createConversation = (title = 'New Conversation'): Conversation => {
    const now = Date.now()
    const conversation: Conversation = {
      id: `conv-${now}`,
      title,
      messages: [],
      createdAt: now,
      updatedAt: now
    }
    conversations.value.push(conversation)
    currentConversationId.value = conversation.id
    if (autoSave) {
      saveConversations()
    }
    return conversation
  }

  const deleteConversation = (id: string) => {
    const index = conversations.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      conversations.value.splice(index, 1)
      if (currentConversationId.value === id) {
        currentConversationId.value =
          conversations.value.length > 0
            ? conversations.value[conversations.value.length - 1].id
            : null
      }
      if (autoSave) {
        saveConversations()
      }
    }
  }

  const getCurrentConversation = (): Conversation | undefined => {
    return conversations.value.find((c) => c.id === currentConversationId.value)
  }

  const addMessage = (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => {
    const conversation = getCurrentConversation()
    if (!conversation) return

    const newMessage: ConversationMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: Date.now()
    }
    conversation.messages.push(newMessage)
    conversation.updatedAt = Date.now()
    if (autoSave) {
      saveConversations()
    }
    return newMessage
  }

  const updateMessage = (messageId: string, updates: Partial<ConversationMessage>) => {
    const conversation = getCurrentConversation()
    if (!conversation) return

    const messageIndex = conversation.messages.findIndex((m) => m.id === messageId)
    if (messageIndex !== -1) {
      conversation.messages[messageIndex] = {
        ...conversation.messages[messageIndex],
        ...updates
      }
      conversation.updatedAt = Date.now()
      if (autoSave) {
        saveConversations()
      }
    }
  }

  const clearCurrentConversation = () => {
    const conversation = getCurrentConversation()
    if (!conversation) return

    conversation.messages = []
    conversation.updatedAt = Date.now()
    if (autoSave) {
      saveConversations()
    }
  }

  const exportConversations = (): string => {
    return JSON.stringify(conversations.value, null, 2)
  }

  const importConversations = async (json: string) => {
    try {
      const imported = JSON.parse(json) as Conversation[]
      if (!Array.isArray(imported)) {
        throw new Error('Invalid format: expected array')
      }
      conversations.value = imported
      await saveConversations()
      return true
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to import conversations')
      return false
    }
  }

  const setCurrentConversation = (id: string) => {
    if (conversations.value.some((c) => c.id === id)) {
      currentConversationId.value = id
    }
  }

  onMounted(() => {
    loadConversations()
  })

  return {
    conversations,
    currentConversationId,
    isLoading,
    isSaving,
    error,
    loadConversations,
    saveConversations,
    createConversation,
    deleteConversation,
    getCurrentConversation,
    addMessage,
    updateMessage,
    clearCurrentConversation,
    exportConversations,
    importConversations,
    setCurrentConversation
  }
}
