import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useAiPersistence, type UseAiPersistenceOptions } from '../use-ai-persistence'

// Mock StorageAdapter
class MockStorage {
  data: any = {}
  get = vi.fn(async (key: string) => this.data[key])
  set = vi.fn(async (key: string, val: any) => {
    this.data[key] = val
  })
  remove = vi.fn(async (key: string) => {
    delete this.data[key]
  })
  clear = vi.fn(async () => {
    this.data = {}
  })
}

// Helper to test hook
async function mountAiPersistence(options: UseAiPersistenceOptions = {}) {
  let result: any
  mount(
    defineComponent({
      setup() {
        result = useAiPersistence(options)
        return () => null
      }
    })
  )
  // Wait for onMounted loadConversations to finish
  await vi.waitFor(() => result.isLoading.value === false)
  return result
}

describe('useAiPersistence', () => {
  let mockStorage: MockStorage

  beforeEach(() => {
    mockStorage = new MockStorage()
  })

  it('should initialize and load conversations', async () => {
    mockStorage.data['ai-conversations'] = [
      { id: '1', title: 'Conv 1', messages: [], createdAt: 123, updatedAt: 123 }
    ]
    const { conversations, isLoading, loadConversations } = await mountAiPersistence({
      storage: mockStorage as any,
      autoSave: false
    })

    await loadConversations()
    expect(conversations.value.length).toBe(1)
    expect(conversations.value[0].title).toBe('Conv 1')
    expect(isLoading.value).toBe(false)
  })

  it('should create a new conversation', async () => {
    const { conversations, currentConversationId, createConversation } = await mountAiPersistence({
      storage: mockStorage as any,
      autoSave: false
    })

    const conv = createConversation('New one')
    await nextTick()
    expect(conversations.value.length).toBe(1)
    expect(conversations.value[0].title).toBe('New one')
    expect(currentConversationId.value).toBe(conv.id)
  })

  it('should delete conversation and update currentId', async () => {
    const { conversations, currentConversationId, createConversation, deleteConversation } =
      await mountAiPersistence({
        storage: mockStorage as any,
        autoSave: false
      })

    const c1 = createConversation('C1')
    const c2 = createConversation('C2')
    await nextTick()
    expect(currentConversationId.value).toBe(c2.id)

    deleteConversation(c2.id)
    await nextTick()
    expect(conversations.value.length).toBe(1)
    expect(currentConversationId.value).toBe(c1.id)

    deleteConversation(c1.id)
    await nextTick()
    expect(conversations.value.length).toBe(0)
    expect(currentConversationId.value).toBeNull()
  })

  it('should add and update messages', async () => {
    const { createConversation, addMessage, updateMessage, getCurrentConversation } =
      await mountAiPersistence({
        storage: mockStorage as any,
        autoSave: false
      })

    createConversation('Test')
    await nextTick()
    const msg = addMessage({ role: 'user', content: 'hello' })
    await nextTick()
    expect(msg?.content).toBe('hello')

    const conv = getCurrentConversation()
    expect(conv?.messages.length).toBe(1)

    updateMessage(msg!.id, { content: 'hi' })
    await nextTick()
    expect(conv?.messages[0].content).toBe('hi')
  })

  it('should clear current conversation messages', async () => {
    const { createConversation, addMessage, clearCurrentConversation, getCurrentConversation } =
      await mountAiPersistence({
        storage: mockStorage as any,
        autoSave: false
      })

    createConversation('Test')
    await nextTick()
    addMessage({ role: 'user', content: 'hello' })
    await nextTick()
    expect(getCurrentConversation()?.messages.length).toBe(1)

    clearCurrentConversation()
    await nextTick()
    expect(getCurrentConversation()?.messages.length).toBe(0)
  })

  it('should export and import conversations', async () => {
    const { createConversation, exportConversations, importConversations, conversations } =
      await mountAiPersistence({
        storage: mockStorage as any,
        autoSave: false
      })

    createConversation('To Export')
    await nextTick()
    const json = exportConversations()
    expect(json).toContain('To Export')

    conversations.value = []
    await nextTick()

    const result = await importConversations(json)
    expect(result).toBe(true)
    await nextTick()

    expect(conversations.value.length).toBe(1)
    expect(conversations.value[0].title).toBe('To Export')

    const invalidResult = await importConversations('invalid json')
    expect(invalidResult).toBe(false)

    const notArrayResult = await importConversations('{"not": "an array"}')
    expect(notArrayResult).toBe(false)
  })

  it('should auto-save when enabled', async () => {
    const { createConversation, addMessage } = await mountAiPersistence({
      storage: mockStorage as any,
      autoSave: true
    })

    createConversation('Auto')
    await nextTick()
    expect(mockStorage.set).toHaveBeenCalled()

    addMessage({ role: 'user', content: 'hi' })
    await nextTick()
    expect(mockStorage.set).toHaveBeenCalledTimes(2) // 1 from create, 1 from addMessage
  })

  it('should handle load error', async () => {
    const err = new Error('load failed')
    mockStorage.get.mockRejectedValue(err)
    const { error, loadConversations } = await mountAiPersistence({
      storage: mockStorage as any
    })

    await loadConversations()
    expect(error.value).toBe(err)
  })

  it('should handle set current conversation', async () => {
    const { createConversation, currentConversationId, setCurrentConversation } =
      await mountAiPersistence({
        storage: mockStorage as any,
        autoSave: false
      })

    const c1 = createConversation('C1')
    const c2 = createConversation('C2')
    await nextTick()

    setCurrentConversation(c1.id)
    await nextTick()
    expect(currentConversationId.value).toBe(c1.id)

    setCurrentConversation('non-existent')
    await nextTick()
    expect(currentConversationId.value).toBe(c1.id)
  })
})
