import type { ExtractPropTypes, PropType } from 'vue'

/** 思考状态类型 */
export type AiThoughtStatus = 'thinking' | 'loading' | 'success' | 'complete' | 'error' | 'none'

/** 每一个思考节点的详情数据 */
export interface AiThoughtItem {
  /** 节点标题 */
  title: string
  /** 详细内容 */
  content?: string
  /** 当前节点状态 */
  status?: AiThoughtStatus
  /** 是否展开内容（如果未指定，默认只有最后一个展开） */
  expanded?: boolean
  /** 覆盖默认图标名称 */
  icon?: string
  /** 详细内容的别名 */
  description?: string
}

export const aiThoughtChainProps = {
  /**
   * @description 思考标题 (单节点模式)
   */
  title: String,
  /**
   * @description 是否正在思考 (兼容旧版，新版推荐 status)
   */
  thinking: {
    type: Boolean,
    default: false
  },
  /**
   * @description 显示内容 (单节点模式)
   */
  content: String,
  /**
   * @description 当前总状态
   */
  status: {
    type: String as PropType<AiThoughtStatus>,
    default: 'none'
  },
  /**
   * @description 推理链节点列表，如果提供了 items，将启用多节点时间轴模式
   */
  items: {
    type: Array as PropType<AiThoughtItem[]>,
    default: () => []
  },
  /**
   * @description 当状态变为已完成时是否自动收起
   */
  autoCollapse: {
    type: Boolean,
    default: true
  },
  /**
   * @description 节点圆点大小
   */
  dotSize: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  /**
   * @description 节点连接线是否显示渐变
   */
  lineGradient: {
    type: Boolean,
    default: false
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiThoughtChainProps = ExtractPropTypes<typeof aiThoughtChainProps>

export const aiThoughtChainEmits = {
  'update:items': (items: AiThoughtItem[]) => Array.isArray(items)
}

export type AiThoughtChainEmits = typeof aiThoughtChainEmits
