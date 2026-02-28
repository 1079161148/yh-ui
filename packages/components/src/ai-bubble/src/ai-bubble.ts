export interface AiBubbleProps {
  /**
   * @description 气泡内容，支持Markdown
   */
  content?: string
  /**
   * @description 开启 markdown 解析
   */
  markdown?: boolean
  /**
   * @description 角色：用户或AI
   */
  role?: 'user' | 'assistant' | 'system'
  /**
   * @description 气泡位置：开始侧还是末尾端，默认跟据role定义，user在end，assistant在start
   */
  placement?: 'start' | 'end'
  /**
   * @description 气泡变体形制：圆角(round)或是方角(corner)
   */
  shape?: 'round' | 'corner'
  /**
   * @description 视觉变体
   */
  variant?: 'filled' | 'outlined' | 'borderless' | 'shadow'
  /**
   * @description 显示发送时间，如 '10:23 AM'
   */
  time?: string
  /**
   * @description 头像地址图片
   */
  avatar?: string
  /**
   * @description 是否在加载中
   */
  loading?: boolean
  /**
   * @description 打字机特效(仅assistant有效)
   */
  typing?: boolean
}
