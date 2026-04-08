"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aiConversationsProps = exports.aiConversationsEmits = void 0;
const aiConversationsProps = exports.aiConversationsProps = {
  /**
   * @description Data list for the conversation sidebar
   */
  data: {
    type: Array,
    default: () => []
  },
  /**
   * @description Currently selected conversation ID
   */
  activeId: {
    type: String,
    default: ""
  },
  /**
   * @description Show loading state
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description Theme overrides for the component
   */
  themeOverrides: {
    type: Object,
    default: void 0
  },
  /**
   * @description 是否按时间分组显示对话
   */
  grouped: {
    type: Boolean,
    default: true
  },
  // ========== 虚拟滚动相关属性 ==========
  /**
   * @description 是否启用虚拟滚动
   */
  virtualScroll: {
    type: Boolean,
    default: false
  },
  /**
   * @description 虚拟滚动容器高度
   */
  virtualScrollHeight: {
    type: Number,
    default: 400
  },
  /**
   * @description 虚拟滚动每项高度
   */
  virtualScrollItemHeight: {
    type: Number,
    default: 72
  },
  /**
   * @description 虚拟滚动 overscan 数量
   */
  virtualScrollOverscan: {
    type: Number,
    default: 3
  }
};
const aiConversationsEmits = exports.aiConversationsEmits = {
  /**
   * @description Emit when active item changes
   */
  "update:activeId": id => typeof id === "string",
  /**
   * @description User clicks the "Create New" or "Plus" button
   */
  create: () => true,
  /**
   * @description User deletes a conversation item
   */
  delete: conversation => typeof conversation === "object",
  /**
   * @description User edits a conversation title
   */
  edit: (conversation, newTitle) => typeof conversation === "object" && typeof newTitle === "string",
  /**
   * @description User clicks an item
   */
  click: conversation => typeof conversation === "object",
  /**
   * @description User pins/unpins a conversation
   */
  pin: (conversation, pinned) => typeof conversation === "object" && typeof pinned === "boolean"
};