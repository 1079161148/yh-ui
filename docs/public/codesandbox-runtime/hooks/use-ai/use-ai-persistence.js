var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { ref, onMounted } from "vue";
import { IndexedDBAdapter } from "../storage/index.js";
function useAiPersistence(options = {}) {
  const {
    storage = new IndexedDBAdapter(),
    conversationKey = "ai-conversations",
    autoSave = true
  } = options;
  const conversations = ref([]);
  const currentConversationId = ref(null);
  const isLoading = ref(false);
  const isSaving = ref(false);
  const error = ref(null);
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
  const deleteConversation = (id) => {
    const index = conversations.value.findIndex((c) => c.id === id);
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
    return conversations.value.find((c) => c.id === currentConversationId.value);
  };
  const addMessage = (message) => {
    const conversation = getCurrentConversation();
    if (!conversation) return;
    const newMessage = __spreadProps(__spreadValues({}, message), {
      id: `msg-${Date.now()}`,
      timestamp: Date.now()
    });
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
    const messageIndex = conversation.messages.findIndex((m) => m.id === messageId);
    if (messageIndex !== -1) {
      conversation.messages[messageIndex] = __spreadValues(__spreadValues({}, conversation.messages[messageIndex]), updates);
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
  const importConversations = async (json) => {
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
  const setCurrentConversation = (id) => {
    if (conversations.value.some((c) => c.id === id)) {
      currentConversationId.value = id;
    }
  };
  onMounted(() => {
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
export {
  useAiPersistence
};
