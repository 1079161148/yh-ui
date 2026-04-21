/**
 * YH-UI 组件级主题覆盖
 * @description 支持单个组件实例的主题定制，类似 Naive UI 的 themeOverrides
 */
import type { InjectionKey, PropType, ExtractPropTypes } from 'vue'
import { type MaybeRef } from 'vue'
/** 组件主题变量 */
export interface ComponentThemeVars {
  textColor?: string
  bgColor?: string
  borderColor?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  hoverBgColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  activeBgColor?: string
  activeTextColor?: string
  activeBorderColor?: string
  disabledBgColor?: string
  disabledTextColor?: string
  disabledBorderColor?: string
  height?: string
  padding?: string
  gap?: string
  boxShadow?: string
  transition?: string
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
export declare const COMPONENT_THEME_KEY: InjectionKey<GlobalComponentThemes>
export declare const componentThemeProps: {
  /** 组件主题变量覆盖 */
  readonly themeOverrides: {
    readonly type: PropType<ComponentThemeVars>
    readonly default: undefined
  }
}
export type ComponentThemeProps = ExtractPropTypes<typeof componentThemeProps>
/**
 * 使用组件主题
 * @param componentName 组件名称
 * @param localOverrides 本地覆盖（props.themeOverrides）
 * @returns CSS 变量样式对象
 */
export declare function useComponentTheme(
  componentName: string,
  localOverrides?: MaybeRef<ComponentThemeVars | undefined>
): {
  themeVars: import('vue').ComputedRef<{
    [x: string]: string | undefined
    textColor?: string
    bgColor?: string
    borderColor?: string
    borderRadius?: string
    fontSize?: string
    fontWeight?: string
    hoverBgColor?: string
    hoverTextColor?: string
    hoverBorderColor?: string
    activeBgColor?: string
    activeTextColor?: string
    activeBorderColor?: string
    disabledBgColor?: string
    disabledTextColor?: string
    disabledBorderColor?: string
    height?: string
    padding?: string
    gap?: string
    boxShadow?: string
    transition?: string
  }>
  themeStyle: import('vue').ComputedRef<Record<string, string>>
  hasCustomTheme: import('vue').ComputedRef<boolean>
}
/**
 * 提供全局组件主题
 * @param themes 组件主题配置
 */
export declare function provideComponentThemes(themes: GlobalComponentThemes): void
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
/** Calendar 组件主题变量 */
export interface CalendarThemeVars extends ComponentThemeVars {
  headerBgColor?: string
  headerTextColor?: string
  titleFontSize?: string
  dayFontSize?: string
  dayTextColor?: string
  dayHoverBgColor?: string
  daySelectedBgColor?: string
  daySelectedTextColor?: string
  todayTextColor?: string
  weekendTextColor?: string
}
/** Tree 组件主题变量 */
export interface TreeThemeVars extends ComponentThemeVars {
  nodeHoverBgColor?: string
  nodeSelectedBgColor?: string
  nodeSelectedTextColor?: string
  nodeHeight?: string
  indentSize?: string
  labelFontSize?: string
  labelTextColor?: string
  expandIconColor?: string
  expandIconHoverColor?: string
}
/** Mention 组件主题变量 */
export interface MentionThemeVars extends ComponentThemeVars {
  optionHoverBgColor?: string
  optionActiveTextColor?: string
}
/** AiConversations 组件主题变量 */
export interface AiConversationsThemeVars extends ComponentThemeVars {
  headerPadding?: string
  itemPadding?: string
  activeBgColor?: string
  activeTextColor?: string
  hoverBgColor?: string
  titleFontSize?: string
  timeFontSize?: string
}
/** AiPrompts 组件主题变量 */
export interface AiPromptsThemeVars extends ComponentThemeVars {
  headerFontSize?: string
  itemMinHeight?: string
  iconSize?: string
  itemHoverBgColor?: string
  itemActiveBorderColor?: string
}
/** AiChat 组件主题变量 */
export interface AiChatThemeVars extends ComponentThemeVars {
  chatPadding?: string
  messageGap?: string
}
/** AiBubble 组件主题变量 */
export interface AiBubbleThemeVars extends ComponentThemeVars {
  userBgColor?: string
  userTextColor?: string
  assistantBgColor?: string
  assistantTextColor?: string
  avatarSize?: string
}
/** AiSender 组件主题变量 */
export interface AiSenderThemeVars extends ComponentThemeVars {
  inputBgColor?: string
  focusBorderColor?: string
}
/** AiCodeEditor 组件主题变量 */
export interface AiCodeEditorThemeVars extends ComponentThemeVars {
  editorHeight?: string
}
/** AiCodeRunner 组件主题变量 */
export interface AiCodeRunnerThemeVars extends ComponentThemeVars {
  terminalHeight?: string
  terminalBgColor?: string
  terminalTextColor?: string
}
/** AiFileCard 组件主题变量 */
export interface AiFileCardThemeVars extends ComponentThemeVars {
  iconColor?: string
  imageRadius?: string
}
/** AiAttachments 组件主题变量 */
export interface AiAttachmentsThemeVars extends ComponentThemeVars {
  uploadBorderColor?: string
  uploadHoverBorderColor?: string
  progressColor?: string
}
/** AiMermaid 组件主题变量 */
export interface AiMermaidThemeVars extends ComponentThemeVars {
  headerBgColor?: string
  headerTextColor?: string
  codeBlockBgColor?: string
  codeBlockTextColor?: string
}
/** Carousel 组件主题变量 */
export interface CarouselThemeVars extends ComponentThemeVars {
  dotColor?: string
  dotActiveColor?: string
  dotSize?: string
  dotActiveWidth?: string
  arrowBg?: string
  arrowHoverBg?: string
  arrowColor?: string
  arrowSize?: string
}
/** Scrollbar 组件主题变量 */
export interface ScrollbarThemeVars extends ComponentThemeVars {
  width?: string
  thumbColor?: string
  thumbHoverColor?: string
  trackColor?: string
  thumbRadius?: string
}
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
  calendar?: CalendarThemeVars
  tree?: TreeThemeVars
  mention?: MentionThemeVars
  aiChat?: AiChatThemeVars
  aiBubble?: AiBubbleThemeVars
  aiSender?: AiSenderThemeVars
  aiCodeEditor?: AiCodeEditorThemeVars
  aiCodeRunner?: AiCodeRunnerThemeVars
  aiConversations?: AiConversationsThemeVars
  aiPrompts?: AiPromptsThemeVars
  aiFileCard?: AiFileCardThemeVars
  aiAttachments?: AiAttachmentsThemeVars
  aiMermaid?: AiMermaidThemeVars
  carousel?: CarouselThemeVars
  scrollbar?: ScrollbarThemeVars
  [key: string]: ComponentThemeVars | undefined
}
/**
 * 创建组件主题配置
 * @param themes 组件主题配置
 * @returns 类型安全的组件主题配置
 */
export declare function createComponentThemes<T extends AllComponentThemes>(themes: T): T
/**
 * 合并组件主题
 * @param base 基础主题
 * @param overrides 覆盖主题
 * @returns 合并后的主题
 */
export declare function mergeComponentThemes(
  base: AllComponentThemes,
  overrides: AllComponentThemes
): AllComponentThemes
