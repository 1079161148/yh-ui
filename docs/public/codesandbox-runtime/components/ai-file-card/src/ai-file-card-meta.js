const aiFileCardProps = {
  /** 文件名称 */
  name: {
    type: String,
    required: true
  },
  /** 文件大小（字节） */
  byte: {
    type: Number,
    default: void 0
  },
  /** 卡片尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 文件描述 */
  description: {
    type: String,
    default: void 0
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 文件类型 */
  type: {
    type: String,
    default: "file"
  },
  /** 图片或文件地址 */
  src: {
    type: String,
    default: void 0
  },
  /** 遮罩内容 */
  mask: {
    type: String,
    default: void 0
  },
  /** 自定义图标 */
  icon: {
    type: String,
    default: "default"
  },
  /** 图片属性 */
  imageProps: {
    type: Object,
    default: () => ({})
  },
  /** 视频属性 */
  videoProps: {
    type: Object,
    default: () => ({})
  },
  /** 音频属性 */
  audioProps: {
    type: Object,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiFileCardEmits = {
  click: () => true
};
export {
  aiFileCardEmits,
  aiFileCardProps
};
