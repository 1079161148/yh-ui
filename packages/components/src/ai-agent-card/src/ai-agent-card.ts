import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Agent 能力标签
 */
export interface AgentCapability {
  /** 标签文字 */
  label: string
  /** 图标名（可选） */
  icon?: string
  /** 颜色类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

/**
 * Agent 统计数据
 */
export interface AgentStats {
  /** 调用次数 */
  uses?: number
  /** 用户评分（0-5） */
  rating?: number
  /** 评分人数 */
  reviewCount?: number
  /** 响应时间（ms） */
  responseTime?: number
}

/**
 * AiAgentCard 智能体名片数据结构
 */
export interface AgentData {
  /** 唯一标识 */
  id: string
  /** 头像 URL 或图标名 */
  avatar?: string
  /** 智能体名称 */
  name: string
  /** 副标题/模型名称 */
  model?: string
  /** 描述 */
  description?: string
  /** 能力标签列表 */
  capabilities?: AgentCapability[]
  /** 统计数据 */
  stats?: AgentStats
  /** 是否官方认证 */
  verified?: boolean
  /** 是否收藏 */
  favorited?: boolean
  /** 状态 */
  status?: 'online' | 'offline' | 'busy'
  /** 扩展字段 */
  [key: string]: unknown
}

export const aiAgentCardProps = {
  /**
   * @description Agent 数据
   */
  data: {
    type: Object as PropType<AgentData>,
    required: true as const
  },
  /**
   * @description 卡片布局：vertical（竖向）/ horizontal（横向）/ compact（紧凑）
   */
  layout: {
    type: String as PropType<'vertical' | 'horizontal' | 'compact'>,
    default: 'vertical'
  },
  /**
   * @description 是否显示操作按钮区域
   */
  showActions: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示统计信息
   */
  showStats: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否可收藏
   */
  favoritable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否选中状态（商城/列表选择场景）
   */
  selected: {
    type: Boolean,
    default: false
  },
  /**
   * @description 加载骨架屏状态
   */
  loading: {
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

export type AiAgentCardProps = ExtractPropTypes<typeof aiAgentCardProps>

export const aiAgentCardEmits = {
  /** 点击整个卡片 */
  click: (data: AgentData) => !!data,
  /** 点击使用 / 调用按钮 */
  use: (data: AgentData) => !!data,
  /** 收藏/取消收藏 */
  favorite: (data: AgentData, favorited: boolean) => !!data && typeof favorited === 'boolean',
  /** 分享 */
  share: (data: AgentData) => !!data
}

export type AiAgentCardEmits = typeof aiAgentCardEmits
