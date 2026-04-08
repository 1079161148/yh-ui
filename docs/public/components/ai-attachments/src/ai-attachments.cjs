"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aiAttachmentsProps = exports.aiAttachmentsEmits = void 0;
const aiAttachmentsProps = exports.aiAttachmentsProps = {
  /** 附件列表 */
  items: {
    type: Array,
    default: () => []
  },
  /** 溢出布局模式 */
  overflow: {
    type: String,
    default: "scrollX"
  },
  /** 列表容器样式 */
  listStyle: {
    type: Object,
    default: () => ({})
  },
  /** scrollY 模式下容器最大高度（用于 demo 等需固定高度以展示纵向滚动） */
  scrollMaxHeight: {
    type: String,
    default: void 0
  },
  /** 上传按钮图标尺寸（紧凑风格建议 24px） */
  uploadIconSize: {
    type: String,
    default: "24px"
  },
  /** 拖拽目标元素 */
  dragTarget: {
    type: [String, Object],
    default: null
  },
  /** 是否隐藏上传按钮 */
  hideUpload: {
    type: Boolean,
    default: false
  },
  /** 文件数量限制 */
  limit: {
    type: Number,
    default: void 0
  },
  /** 上传前校验 */
  beforeUpload: {
    type: Function,
    default: void 0
  },
  /** 自定义上传请求 */
  httpRequest: {
    type: Function,
    default: void 0
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 最大上传文件数量 */
  maxCount: {
    type: Number,
    default: void 0
  },
  /** 拖拽容器获取函数 */
  getDropContainer: {
    type: Function,
    default: void 0
  },
  /** 占位符配置（支持字符串简写，会转为 { title: string }） */
  placeholder: {
    type: [Object, Function, String],
    default: () => ({
      icon: "upload",
      title: "Click or Drop files here",
      description: "Support file type: image, video, audio, document, etc."
    })
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiAttachmentsEmits = exports.aiAttachmentsEmits = {
  "update:items": _items => true,
  "upload-change": (_file, _fileList) => true,
  "upload-success": (_response, _file, _fileList) => true,
  "upload-error": (_error, _file, _fileList) => true,
  "upload-drop": _files => true,
  "delete-card": (_item, _index) => true,
  exceed: _options => true
};