export const categoryNavProps = {
  /** 分类数据 */
  categories: {
    type: Array,
    default: () => []
  },
  /** 当前激活的一级分类 ID（支持 v-model） */
  modelValue: {
    type: [String, Number],
    default: null
  },
  /** 当前激活的子分类 ID（支持 v-model:subValue） */
  subValue: {
    type: [String, Number],
    default: null
  },
  /** 左侧菜单宽度 */
  sideWidth: {
    type: String,
    default: "84px"
  },
  /** 是否展示全部标签 */
  showAll: {
    type: Boolean,
    default: true
  },
  /** 加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 右侧内容区的列数（用于子分类网格布局） */
  columns: {
    type: Number,
    default: 3
  },
  /** 子分类图片大小 px */
  subImageSize: {
    type: Number,
    default: 64
  },
  /** 是否开启右侧滚动锚定联动 */
  anchor: {
    type: Boolean,
    default: true
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
export const categoryNavEmits = {
  "update:modelValue": (id) => id !== void 0,
  "update:subValue": (id) => id !== void 0,
  /** 点击一级分类 */
  categoryClick: (item) => item !== void 0,
  /** 点击子分类 */
  subCategoryClick: (item, _parent) => item !== void 0
};
