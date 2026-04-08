"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAiPersistence = useAiPersistence;
var _vue = require("vue");
var _storage = require("../storage/index.cjs");
function useAiPersistence(options = {}) {
  const {
    storage = new _storage.IndexedDBAdapter(),
    conversationKey = "ai-conversations",
    autoSave = true
  } = options;
  const conversations = (0, _vue.ref)([]);
  const currentConversationId = (0, _vue.ref)(null);
  const isLoading = (0, _vue.ref)(false);
  const isSaving = (0, _vue.ref)(false);
  const error = (0, _vue.ref)(null);
  const loadConversations = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await storage.get(conversationKey);
      conversations.value = data || [];
      if (conversations.value.length > 0) {
        const lastConversation = conversations.value[conversations.value.length - 1];
        currentConversationId.value = lastConversation.id;
      }
    } catch (e) {
      error.value = e instanceof Error ? e : new Error("Failed to load conversations");
    } finally {
      isLoading.value = false;
    }
  };
  const saveConversations = async () => {
    isSaving.value = true;
    error.value = null;
    try {
      await storage.set(conversationKey, conversations.value);
    } catch (e) {
      error.value = e instanceof Error ? e : new Error("Failed to save conversations");
    } finally {
      isSaving.value = false;
    }
  };
  const createConversation = (title = "New Conversation") => {
    const now = Date.now();
    const conversation = {
      id: `conv-${now}`,
      title,
      messages: [],
      createdAt: now,
      updatedAt: now
    };
    conversations.value.push(conversation);
    currentConversationId.value = conversation.id;
    if (autoSave) {
      saveConversations();
    }
    return conversation;
  };
  const deleteConversation = id => {
    const index = conversations.value.findIndex(c => c.id === id);
    if (index !== -1) {
      conversations.value.splice(index, 1);
      if (currentConversationId.value === id) {
        currentConversationId.value = conversations.value.length > 0 ? conversations.value[conversations.value.length - 1].id : null;
      }
      if (autoSave) {
        saveConversations();
      }
    }
  };
  const getCurrentConversation = () => {
    return conversations.value.find(c => c.id === currentConversationId.value);
  };
  const addMessage = message => {
    const conversation = getCurrentConversation();
    if (!conversation) return;
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: Date.now()
    };
    conversation.messages.push(newMessage);
    conversation.updatedAt = Date.now();
    if (autoSave) {
      saveConversations();
    }
    return newMessage;
  };
  const updateMessage = (messageId, updates) => {
    const conversation = getCurrentConversation();
    if (!conversation) return;
    const messageIndex = conversation.messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      conversation.messages[messageIndex] = {
        ...conversation.messages[messageIndex],
        ...updates
      };
      conversation.updatedAt = Date.now();
      if (autoSave) {
        saveConversations();
      }
    }
  };
  const clearCurrentConversation = () => {
    const conversation = getCurrentConversation();
    if (!conversation) return;
    conversation.messages = [];
    conversation.updatedAt = Date.now();
    if (autoSave) {
      saveConversations();
    }
  };
  const exportConversations = () => {
    return JSON.stringify(conversations.value, null, 2);
  };
  const importConversations = async json => {
    try {
      const imported = JSON.parse(json);
      if (!Array.isArray(imported)) {
        throw new Error("Invalid format: expected array");
      }
      conversations.value = imported;
      await saveConversations();
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error("Failed to import conversations");
      return false;
    }
  };
  const setCurrentConversation = id => {
    if (conversations.value.some(c => c.id === id)) {
      currentConversationId.value = id;
    }
  };
  (0, _vue.onMounted)(() => {
    loadConversations();
  });
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
  };
}