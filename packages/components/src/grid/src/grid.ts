/**
 * Grid 网格布局组件类型定义
 * @description CSS Grid 布局组件，对比 Row/Col 的 Flex 布局，提供更强大的二维布局能力
 */

export interface GridProps {
  /**
   * @description 列数量
   * @default 12
   */
  cols?: number | string

  /**
   * @description 列间距
   * @default 0
   */
  colGap?: number | string

  /**
   * @description 行间距
   * @default 0
   */
  rowGap?: number | string

  /**
   * @description 间距（同时设置行列间距）
   * @default 0
   */
  gap?: number | string | [number | string, number | string]

  /**
   * @description 是否折叠（配合 GridItem suffix 使用）
   * @default false
   */
  collapsed?: boolean

  /**
   * @description 折叠后显示的行数
   * @default 1
   */
  collapsedRows?: number

  /**
   * @description 水平对齐方式
   */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'

  /**
   * @description 垂直对齐方式
   */
  alignItems?: 'start' | 'end' | 'center' | 'stretch'

  /**
   * @description 响应式断点
   */
  responsive?: 'self' | 'screen'

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface GridItemProps {
  /**
   * @description 跨列数
   * @default 1
   */
  span?: number

  /**
   * @description 偏移列数
   * @default 0
   */
  offset?: number

  /**
   * @description 是否为后缀元素（配合折叠使用）
   * @default false
   */
  suffix?: boolean

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface GridSlots {
  default?: () => void
}
