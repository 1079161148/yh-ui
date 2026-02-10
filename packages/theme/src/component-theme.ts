/**
 * YH-UI 组件级主题覆盖
 * @description 支持单个组件实例的主题定制，类似 Naive UI 的 themeOverrides
 */

import type { InjectionKey, PropType, ExtractPropTypes } from 'vue'
import { inject, provide, computed, unref, type MaybeRef } from 'vue'

// ==================== 类型定义 ====================

/** 组件主题变量 */
export interface ComponentThemeVars {
  // 通用变量
  textColor?: string
  bgColor?: string
  borderColor?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string

  // 状态变量
  hoverBgColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  activeBgColor?: string
  activeTextColor?: string
  activeBorderColor?: string
  disabledBgColor?: string
  disabledTextColor?: string
  disabledBorderColor?: string

  // 尺寸变量
  height?: string
  padding?: string
  gap?: string

  // 阴影与过渡
  boxShadow?: string
  transition?: string

  // 自定义变量
  [key: string]: string | undefined
}

/** 组件主题配置 */
export interface ComponentTheme<T extends ComponentThemeVars = ComponentThemeVars> {
  /** 组件类型名称 */
  name: string
  /** 主题变量 */
  vars: T
  /** 是否继承父级主题 */
  inherit?: boolean
}

/** 全局组件主题覆盖 */
export type GlobalComponentThemes = Partial<Record<string, ComponentThemeVars>>

// ==================== 注入 Key ====================

export const COMPONENT_THEME_KEY: InjectionKey<GlobalComponentThemes> = Symbol('component-theme')

// ==================== 组件主题 Props ====================

export const componentThemeProps = {
  /** 组件主题变量覆盖 */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  }
} as const

export type ComponentThemeProps = ExtractPropTypes<typeof componentThemeProps>

// ==================== 组件主题 Hook ====================

/**
 * 使用组件主题
 * @param componentName 组件名称
 * @param localOverrides 本地覆盖（props.themeOverrides）
 * @returns CSS 变量样式对象
 */
export function useComponentTheme(
  componentName: string,
  localOverrides?: MaybeRef<ComponentThemeVars | undefined>
) {
  // 获取全局组件主题
  const globalThemes = inject(COMPONENT_THEME_KEY, {})

  // 计算合并后的主题变量
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref(localOverrides) || {}

    return {
      ...globalVars,
      ...local
    }
  })

  // 生成 CSS 变量样式对象
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style: Record<string, string> = {}

    Object.entries(vars).forEach(([key, value]) => {
      if (value !== undefined) {
        // 转换 camelCase 为 kebab-case
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })

    return style
  })

  // 检查是否有自定义主题
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })

  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// ==================== 提供组件主题 ====================

/**
 * 提供全局组件主题
 * @param themes 组件主题配置
 */
export function provideComponentThemes(themes: GlobalComponentThemes) {
  provide(COMPONENT_THEME_KEY, themes)
}

// ==================== 预定义组件主题变量类型 ====================

/** Button 组件主题变量 */
export interface ButtonThemeVars extends ComponentThemeVars {
  primaryBgColor?: string
  primaryTextColor?: string
  primaryBorderColor?: string
  successBgColor?: string
  successTextColor?: string
  warningBgColor?: string
  warningTextColor?: string
  dangerBgColor?: string
  dangerTextColor?: string
  infoBgColor?: string
  infoTextColor?: string
  roundBorderRadius?: string
}

/** Input 组件主题变量 */
export interface InputThemeVars extends ComponentThemeVars {
  placeholderColor?: string
  focusBorderColor?: string
  focusShadow?: string
  prefixColor?: string
  suffixColor?: string
}

/** Select 组件主题变量 */
export interface SelectThemeVars extends ComponentThemeVars {
  optionHoverBgColor?: string
  optionSelectedBgColor?: string
  optionSelectedTextColor?: string
  dropdownBgColor?: string
  dropdownBorderColor?: string
  dropdownShadow?: string
}

/** Table 组件主题变量 */
export interface TableThemeVars extends ComponentThemeVars {
  headerBgColor?: string
  headerTextColor?: string
  rowHoverBgColor?: string
  rowStripeBgColor?: string
  rowSelectedBgColor?: string
  cellPadding?: string
  borderWidth?: string
}

/** Card 组件主题变量 */
export interface CardThemeVars extends ComponentThemeVars {
  headerBgColor?: string
  headerBorderColor?: string
  bodyPadding?: string
  footerBgColor?: string
}

/** Modal/Dialog 组件主题变量 */
export interface ModalThemeVars extends ComponentThemeVars {
  maskBgColor?: string
  headerPadding?: string
  bodyPadding?: string
  footerPadding?: string
  closeIconColor?: string
  closeIconHoverColor?: string
}

/** Menu 组件主题变量 */
export interface MenuThemeVars extends ComponentThemeVars {
  itemHoverBgColor?: string
  itemActiveBgColor?: string
  itemActiveTextColor?: string
  subMenuBgColor?: string
  groupTitleColor?: string
  iconSize?: string
  itemHeight?: string
}

/** Tooltip/Popover 组件主题变量 */
export interface TooltipThemeVars extends ComponentThemeVars {
  arrowSize?: string
  maxWidth?: string
  contentPadding?: string
}

/** Tag 组件主题变量 */
export interface TagThemeVars extends ComponentThemeVars {
  closeBtnColor?: string
  closeBtnHoverColor?: string
  defaultBgColor?: string
  primaryBgColor?: string
  successBgColor?: string
  warningBgColor?: string
  dangerBgColor?: string
  infoBgColor?: string
}

/** Alert 组件主题变量 */
export interface AlertThemeVars extends ComponentThemeVars {
  iconSize?: string
  titleFontSize?: string
  descriptionFontSize?: string
  closeBtnSize?: string
  successBgColor?: string
  warningBgColor?: string
  errorBgColor?: string
  infoBgColor?: string
}

/** Tabs 组件主题变量 */
export interface TabsThemeVars extends ComponentThemeVars {
  tabGap?: string
  tabPadding?: string
  tabActiveTextColor?: string
  tabActiveBorderColor?: string
  tabHoverTextColor?: string
  panePadding?: string
  inkBarHeight?: string
}

/** Form 组件主题变量 */
export interface FormThemeVars extends ComponentThemeVars {
  labelWidth?: string
  labelFontSize?: string
  labelColor?: string
  requiredMarkColor?: string
  errorColor?: string
  helpColor?: string
  itemMarginBottom?: string
}

// ==================== 导出所有组件主题类型 ====================

export interface AllComponentThemes {
  button?: ButtonThemeVars
  input?: InputThemeVars
  select?: SelectThemeVars
  table?: TableThemeVars
  card?: CardThemeVars
  modal?: ModalThemeVars
  dialog?: ModalThemeVars
  menu?: MenuThemeVars
  tooltip?: TooltipThemeVars
  popover?: TooltipThemeVars
  tag?: TagThemeVars
  alert?: AlertThemeVars
  tabs?: TabsThemeVars
  form?: FormThemeVars
  [key: string]: ComponentThemeVars | undefined
}

// ==================== 创建组件主题工具 ====================

/**
 * 创建组件主题配置
 * @param themes 组件主题配置
 * @returns 类型安全的组件主题配置
 */
export function createComponentThemes<T extends AllComponentThemes>(themes: T): T {
  return themes
}

/**
 * 合并组件主题
 * @param base 基础主题
 * @param overrides 覆盖主题
 * @returns 合并后的主题
 */
export function mergeComponentThemes(
  base: AllComponentThemes,
  overrides: AllComponentThemes
): AllComponentThemes {
  const result: AllComponentThemes = { ...base }

  Object.keys(overrides).forEach((key) => {
    const baseVars = result[key] || {}
    const overrideVars = overrides[key] || {}
    result[key] = { ...baseVars, ...overrideVars }
  })

  return result
}

