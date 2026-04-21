import { type StorageAdapter } from '../storage'
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
export declare function useAiPersistence(options?: UseAiPersistenceOptions): {
  conversations: import('vue').Ref<
    {
      id: string
      title: string
      messages: {
        id: string
        role: 'user' | 'assistant' | 'system'
        content: string
        timestamp: number
        metadata?: Record<string, unknown> | undefined
      }[]
      createdAt: number
      updatedAt: number
    }[],
    | Conversation[]
    | {
        id: string
        title: string
        messages: {
          id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          timestamp: number
          metadata?: Record<string, unknown> | undefined
        }[]
        createdAt: number
        updatedAt: number
      }[]
  >
  currentConversationId: import('vue').Ref<string | null, string | null>
  isLoading: import('vue').Ref<boolean, boolean>
  isSaving: import('vue').Ref<boolean, boolean>
  error: import('vue').Ref<Error | null, Error | null>
  loadConversations: () => Promise<void>
  saveConversations: () => Promise<void>
  createConversation: (title?: string) => Conversation
  deleteConversation: (id: string) => void
  getCurrentConversation: () => Conversation | undefined
  addMessage: (
    message: Omit<ConversationMessage, 'id' | 'timestamp'>
  ) => ConversationMessage | undefined
  updateMessage: (messageId: string, updates: Partial<ConversationMessage>) => void
  clearCurrentConversation: () => void
  exportConversations: () => string
  importConversations: (json: string) => Promise<boolean>
  setCurrentConversation: (id: string) => void
}
