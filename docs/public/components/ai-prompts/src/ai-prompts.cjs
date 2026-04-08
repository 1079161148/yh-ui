"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aiPromptsProps = exports.aiPromptsEmits = void 0;
const aiPromptsProps = exports.aiPromptsProps = {
  /**
   * @description Data list for the prompts
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * @description Layout style for the prompts
   */
  layout: {
    type: String,
    default: "horizontal"
  },
  /**
   * @description Title for the group
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description Theme overrides for the component
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiPromptsEmits = exports.aiPromptsEmits = {
  /**
   * @description Emit when an item is clicked
   */
  click: item => typeof item === "object" || typeof item === "string"
};