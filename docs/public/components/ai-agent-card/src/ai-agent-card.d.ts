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
export declare const aiAgentCardProps: {
  /**
   * @description Agent 数据
   */
  readonly data: {
    readonly type: PropType<AgentData>
    readonly required: true
  }
  /**
   * @description 卡片布局：vertical（竖向）/ horizontal（横向）/ compact（紧凑）
   */
  readonly layout: {
    readonly type: PropType<'vertical' | 'horizontal' | 'compact'>
    readonly default: 'vertical'
  }
  /**
   * @description 是否显示操作按钮区域
   */
  readonly showActions: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * @description 是否显示统计信息
   */
  readonly showStats: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * @description 是否可收藏
   */
  readonly favoritable: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * @description 是否选中状态（商城/列表选择场景）
   */
  readonly selected: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * @description 加载骨架屏状态
   */
  readonly loading: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * @description 主题覆盖变量
   */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type AiAgentCardProps = ExtractPropTypes<typeof aiAgentCardProps>
export declare const aiAgentCardEmits: {
  /** 点击整个卡片 */
  click: (data: AgentData) => boolean
  /** 点击使用 / 调用按钮 */
  use: (data: AgentData) => boolean
  /** 收藏/取消收藏 */
  favorite: (data: AgentData, favorited: boolean) => boolean
  /** 分享 */
  share: (data: AgentData) => boolean
}
export type AiAgentCardEmits = typeof aiAgentCardEmits
export interface AiAgentCardSlots {
  avatar?: () => unknown
  actions?: (props: { data: AgentData; use: () => void }) => unknown
  default?: (props: { data: AgentData }) => unknown
}
