/**
 * Container 布局容器组件类型定义
 * @description 用于布局的容器组件，方便搭建页面基本结构
 */

/** Container 容器 Props */
export interface ContainerProps {
  /**
   * @description 子元素的排列方向
   * @default 自动检测：包含 Header/Footer 时为 vertical，否则为 horizontal
   */
  direction?: 'horizontal' | 'vertical'

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Header 头部 Props */
export interface HeaderProps {
  /**
   * @description 头部高度
   * @default '60px'
   */
  height?: string

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Aside 侧边栏 Props */
export interface AsideProps {
  /**
   * @description 侧边栏宽度
   * @default '200px'
   */
  width?: string

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Main 主内容区 Props */
export interface MainProps {
  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Footer 底部 Props */
export interface FooterProps {
  /**
   * @description 底部高度
   * @default '60px'
   */
  height?: string

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/** Slots */
export interface ContainerSlots {
  default?: () => void
}
