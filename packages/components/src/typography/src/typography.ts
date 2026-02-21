/**
 * Typography 排版组件类型定义
 * @description 提供标题、段落、文本等排版元素
 */

/** 标题级别 */
export type TypographyTitleLevel = 1 | 2 | 3 | 4 | 5 | 6

/** 文本类型 */
export type TypographyType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'

/** Typography.Title 标题组件 Props */
export interface TypographyTitleProps {
  /**
   * @description 标题级别 h1-h6
   * @default 1
   */
  level?: TypographyTitleLevel

  /**
   * @description 文本类型
   */
  type?: TypographyType

  /**
   * @description 是否加粗
   * @default true
   */
  bold?: boolean

  /**
   * @description 是否显示删除线
   * @default false
   */
  delete?: boolean

  /**
   * @description 是否显示下划线
   * @default false
   */
  underline?: boolean

  /**
   * @description 是否斜体
   * @default false
   */
  italic?: boolean

  /**
   * @description 是否标记（高亮）
   * @default false
   */
  mark?: boolean

  /**
   * @description 是否代码风格
   * @default false
   */
  code?: boolean

  /**
   * @description 是否省略（单行截断）
   * @default false
   */
  ellipsis?: boolean

  /**
   * @description 自定义标签名
   */
  tag?: string

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Typography.Text 文本组件 Props */
export interface TypographyTextProps {
  /**
   * @description 文本类型
   */
  type?: TypographyType

  /**
   * @description 是否加粗
   * @default false
   */
  bold?: boolean

  /**
   * @description 是否显示删除线
   * @default false
   */
  delete?: boolean

  /**
   * @description 是否显示下划线
   * @default false
   */
  underline?: boolean

  /**
   * @description 是否斜体
   * @default false
   */
  italic?: boolean

  /**
   * @description 是否标记
   * @default false
   */
  mark?: boolean

  /**
   * @description 是否代码风格
   * @default false
   */
  code?: boolean

  /**
   * @description 是否键盘风格
   * @default false
   */
  keyboard?: boolean

  /**
   * @description 是否省略
   * @default false
   */
  ellipsis?: boolean

  /**
   * @description 字体大小
   */
  size?: 'small' | 'default' | 'large'

  /**
   * @description 自定义标签名
   * @default 'span'
   */
  tag?: string

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Typography.Paragraph 段落组件 Props */
export interface TypographyParagraphProps {
  /**
   * @description 文本类型
   */
  type?: TypographyType

  /**
   * @description 是否加粗
   * @default false
   */
  bold?: boolean

  /**
   * @description 是否显示删除线
   * @default false
   */
  delete?: boolean

  /**
   * @description 是否斜体
   * @default false
   */
  italic?: boolean

  /**
   * @description 是否标记
   * @default false
   */
  mark?: boolean

  /**
   * @description 段落对齐方式
   */
  align?: 'left' | 'center' | 'right' | 'justify'

  /**
   * @description 是否省略（多行截断）
   * @default false
   */
  ellipsis?: boolean | number

  /**
   * @description 段落间距大小
   */
  spacing?: 'compact' | 'default' | 'loose'

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Typography.Link 链接组件 Props */
export interface TypographyLinkProps {
  /**
   * @description 链接地址
   */
  href?: string

  /**
   * @description target 属性
   * @default '_self'
   */
  target?: '_blank' | '_self' | '_parent' | '_top'

  /**
   * @description 链接类型
   */
  type?: TypographyType

  /**
   * @description 是否显示下划线
   * @default false
   */
  underline?: boolean

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Slots */
export interface TypographySlots {
  default?: () => void
}
