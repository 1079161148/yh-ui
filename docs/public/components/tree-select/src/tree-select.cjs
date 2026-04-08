"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.treeSelectProps = exports.treeSelectEmits = void 0;
const treeSelectProps = exports.treeSelectProps = {
  // 基础属性
  modelValue: {
    type: [String, Number, Array],
    default: void 0
  },
  data: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({
      label: "label",
      value: "value",
      children: "children",
      disabled: "disabled",
      isLeaf: "isLeaf"
    })
  },
  placeholder: {
    type: String,
    default: void 0
  },
  // Select 相关属性
  multiple: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  size: {
    type: String,
    default: "default"
  },
  filterable: Boolean,
  filterNodeMethod: Function,
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  teleported: {
    type: Boolean,
    default: true
  },
  popperClass: {
    type: String,
    default: ""
  },
  status: String,
  // Tree 相关属性
  nodeKey: {
    type: String,
    default: void 0
  },
  showCheckbox: Boolean,
  checkStrictly: Boolean,
  checkOnClickNode: Boolean,
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  defaultExpandAll: Boolean,
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  },
  accordion: Boolean,
  indent: {
    type: Number,
    default: 16
  },
  lazy: Boolean,
  load: Function,
  // 增强属性
  virtual: {
    type: Boolean,
    default: false
  },
  height: {
    type: [String, Number],
    default: 274
  },
  itemSize: {
    type: Number,
    default: 34
  },
  emptyText: {
    type: String,
    default: void 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const treeSelectEmits = exports.treeSelectEmits = {
  "update:modelValue": _value => true,
  change: _value => true,
  clear: () => true,
  "visible-change": _visible => true,
  "node-click": (_data, _node, _e) => true,
  "check-change": (_data, _checked, _indeterminate) => true,
  check: (_data, _info) => true
};