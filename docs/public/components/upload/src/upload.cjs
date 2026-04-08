"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadProps = exports.uploadEmits = void 0;
const uploadProps = exports.uploadProps = {
  /** 文件列表 */
  fileList: {
    type: Array,
    default: () => []
  },
  /** 接受上传的文件类型 */
  accept: {
    type: String,
    default: ""
  },
  /** 上传的地址 */
  action: {
    type: String,
    default: ""
  },
  /** 设置上传的请求方法 */
  method: {
    type: String,
    default: "POST"
  },
  /** 设置上传的请求头部 */
  headers: {
    type: Object,
    default: () => ({})
  },
  /** 上传时附带的额外参数 */
  data: {
    type: Object,
    default: () => ({})
  },
  /** 上传文件的字段名 */
  name: {
    type: String,
    default: "file"
  },
  /** 是否支持多选文件 */
  multiple: Boolean,
  /** 是否启用拖拽上传 */
  drag: Boolean,
  /** 是否显示已上传文件列表 */
  showFileList: {
    type: Boolean,
    default: true
  },
  /** 限制上传数量 */
  limit: Number,
  /** 是否在选取文件后立即进行上传 */
  autoUpload: {
    type: Boolean,
    default: true
  },
  /** 文件列表类型 */
  listType: {
    type: String,
    default: "text"
  },
  /** 是否支持发送 cookie 凭证信息 */
  withCredentials: {
    type: Boolean,
    default: false
  },
  /** 覆盖默认的上传行为，可以自定义上传的实现 */
  httpRequest: {
    type: Function
  },
  /** 上传文件之前的钩子，参数为上传的文件， 若返回 false 或者 Promise 则停止上传 */
  beforeUpload: {
    type: Function
  },
  /** 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者 Promise 则停止删除 */
  beforeRemove: {
    type: Function
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 文件大小限制 (KB) */
  maxSize: Number,
  /** 自定义缩略图生成 */
  thumbnailRequest: {
    type: Function
  },
  /** 是否开启文件夹上传 */
  directory: Boolean,
  /** 是否显示下载按钮 */
  showDownload: Boolean,
  /** 上传触发器相对于文件列表的位置 */
  triggerPosition: {
    type: String,
    default: "top"
  },
  /** 自定义文件图标或图标生成函数 */
  fileIcon: [String, Function],
  /** 原生属性 crossorigin */
  crossorigin: {
    type: String
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const uploadEmits = exports.uploadEmits = {
  "update:fileList": fileList => Array.isArray(fileList),
  change: (_file, _fileList) => true,
  success: (_response, _file, _fileList) => true,
  error: (_error, _file, _fileList) => true,
  progress: (_evt, _file, _fileList) => true,
  remove: (_file, _fileList) => true,
  exceed: (_files, _fileList) => true,
  preview: _file => true,
  download: _file => true
};