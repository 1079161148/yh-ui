/**
 * VitePress Theme Configuration
 *
 * Features:
 * - Custom glassmorphism theme
 * - Language switcher (zh-CN / en-US)
 * - Collapsible sidebar
 * - Back to top button
 * - Micro-animations
 */
import { App, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// 导入组件库主题变量
import '@yh-ui/theme/styles/index.scss'

// 自定义文档样式（先导入，优先级较低）
import './styles/index.scss'
import './styles/animations.scss'

// 导入组件样式（后导入，优先级较高，不会被文档样式覆盖）
import '@yh-ui/components/message/src/message.scss'
import '@yh-ui/components/notification/src/notification.scss'
import '@yh-ui/components/table/src/table.scss'
import '@yh-ui/components/icon/src/icon.scss'

// 导入 icon spin 动画样式（修复文档中 spin 属性不生效的问题）
import './styles/icon-spin.css'

// 导入 @yh-ui/icons 的 Icon 组件
import { Icon as YhIconify } from '@yh-ui/icons'

// 导入组件
import {
  YhButton,
  YhInput,
  YhCheckbox,
  YhCheckboxGroup,
  YhRadio,
  YhRadioGroup,
  YhRadioButton,
  YhTag,
  YhInputNumber,
  YhInputTag,
  YhIcon,
  YhForm,
  YhFormItem,
  YhFormSchema,
  YhRow,
  YhCol,
  YhDivider,
  YhRate,
  YhSwitch,
  YhAutocomplete,
  YhSelect,
  YhCascader,
  YhCascaderPanel,
  YhSlider,
  YhTimePicker,
  YhTimeSelect,
  YhDatePicker,
  YhTransfer,
  YhTransferPanel,
  YhTreeSelect,
  YhBadge,
  YhCard,
  YhOption,
  YhColorPicker,
  YhBreadcrumb,
  YhBreadcrumbItem,
  YhBackTop,
  YhAlert,
  YhSkeleton,
  YhSkeletonItem,
  YhProgress,
  YhTooltip,
  YhPopconfirm,
  YhPopover,
  YhDialog,
  YhDrawer,
  YhWatermark,
  YhUpload,
  YhMarquee,
  YhSpin,
  YhLoading,
  YhMessageBox,
  YhPagination,
  YhImage,
  YhImageViewer,
  YhDescriptions,
  YhDescriptionsItem,
  YhTabs,
  YhTabPane,
  YhSteps,
  YhStep,
  YhAffix,
  YhInfiniteScroll,
  YhDropdown,
  YhDropdownItem,
  YhDropdownMenu,
  YhMenu,
  YhMenuItem,
  YhMenuItemGroup,
  YhSubMenu,
  YhConfigProvider,
  YhWaterfall,
  YhTree,
  YhTreeNode,
  YhCalendar,
  YhCountdown,
  YhTable,
  YhTableColumn,
  YhSpace,
  YhAvatar,
  YhEmpty,
  // Typography
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink,
  // Container
  YhContainer,
  YhHeader,
  YhAside,
  YhMain,
  YhFooter,
  // Result
  YhResult,
  // Grid
  YhGrid,
  YhGridItem,
  YhMention,
  vInfiniteScroll,
  vYhLoading
} from '@yh-ui/components'

// 导入文档组件
import DemoBlock from './components/DemoBlock.vue'
import IconDemo from './components/IconDemo.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  // 使用自定义布局
  Layout: CustomLayout,
  enhanceApp({ app }: { app: App }) {
    // 注册全局组件用于文档演示
    app.component('YhButton', YhButton)
    app.component('yh-button', YhButton)
    app.component('YhInput', YhInput)
    app.component('yh-input', YhInput)
    app.component('YhCheckbox', YhCheckbox)
    app.component('yh-checkbox', YhCheckbox)
    app.component('YhCheckboxGroup', YhCheckboxGroup)
    app.component('yh-checkbox-group', YhCheckboxGroup)
    app.component('YhRadio', YhRadio)
    app.component('yh-radio', YhRadio)
    app.component('YhRadioGroup', YhRadioGroup)
    app.component('yh-radio-group', YhRadioGroup)
    app.component('YhRadioButton', YhRadioButton)
    app.component('yh-radio-button', YhRadioButton)
    app.component('YhTag', YhTag)
    app.component('yh-tag', YhTag)
    app.component('YhInputNumber', YhInputNumber)
    app.component('yh-input-number', YhInputNumber)
    app.component('YhInputTag', YhInputTag)
    app.component('yh-input-tag', YhInputTag)
    app.component('YhIcon', YhIcon)
    app.component('yh-icon', YhIcon)
    app.component('YhForm', YhForm)
    app.component('yh-form', YhForm)
    app.component('YhFormItem', YhFormItem)
    app.component('yh-form-item', YhFormItem)
    app.component('YhFormSchema', YhFormSchema)
    app.component('yh-form-schema', YhFormSchema)
    app.component('YhRow', YhRow)
    app.component('yh-row', YhRow)
    app.component('YhCol', YhCol)
    app.component('yh-col', YhCol)
    app.component('YhDivider', YhDivider)
    app.component('yh-divider', YhDivider)
    app.component('YhRate', YhRate)
    app.component('yh-rate', YhRate)
    app.component('YhSwitch', YhSwitch)
    app.component('yh-switch', YhSwitch)
    app.component('YhAutocomplete', YhAutocomplete)
    app.component('yh-autocomplete', YhAutocomplete)
    app.component('YhSelect', YhSelect)
    app.component('yh-select', YhSelect)
    app.component('YhCascader', YhCascader)
    app.component('yh-cascader', YhCascader)
    app.component('YhCascaderPanel', YhCascaderPanel)
    app.component('yh-cascader-panel', YhCascaderPanel)
    app.component('YhSlider', YhSlider)
    app.component('yh-slider', YhSlider)
    app.component('YhTimePicker', YhTimePicker)
    app.component('yh-time-picker', YhTimePicker)
    app.component('YhTimeSelect', YhTimeSelect)
    app.component('yh-time-select', YhTimeSelect)
    app.component('YhDatePicker', YhDatePicker)
    app.component('yh-date-picker', YhDatePicker)
    app.component('YhTransfer', YhTransfer)
    app.component('yh-transfer', YhTransfer)
    app.component('YhTransferPanel', YhTransferPanel)
    app.component('yh-transfer-panel', YhTransferPanel)
    app.component('YhTreeSelect', YhTreeSelect)
    app.component('yh-tree-select', YhTreeSelect)
    app.component('YhBadge', YhBadge)
    app.component('yh-badge', YhBadge)
    app.component('YhCard', YhCard)
    app.component('yh-card', YhCard)
    app.component('YhOption', YhOption)
    app.component('yh-option', YhOption)
    app.component('YhColorPicker', YhColorPicker)
    app.component('yh-color-picker', YhColorPicker)
    app.component('YhBreadcrumb', YhBreadcrumb)
    app.component('yh-breadcrumb', YhBreadcrumb)
    app.component('YhBreadcrumbItem', YhBreadcrumbItem)
    app.component('yh-breadcrumb-item', YhBreadcrumbItem)
    app.component('YhBackTop', YhBackTop)
    app.component('yh-back-top', YhBackTop)
    app.component('YhAlert', YhAlert)
    app.component('yh-alert', YhAlert)
    app.component('YhSkeleton', YhSkeleton)
    app.component('yh-skeleton', YhSkeleton)
    app.component('YhSkeletonItem', YhSkeletonItem)
    app.component('yh-skeleton-item', YhSkeletonItem)
    app.component('YhProgress', YhProgress)
    app.component('yh-progress', YhProgress)
    app.component('YhTooltip', YhTooltip)
    app.component('yh-tooltip', YhTooltip)
    app.component('YhPopconfirm', YhPopconfirm)
    app.component('yh-popconfirm', YhPopconfirm)
    app.component('YhPopover', YhPopover)
    app.component('yh-popover', YhPopover)
    app.component('YhDialog', YhDialog)
    app.component('yh-dialog', YhDialog)
    app.component('YhDrawer', YhDrawer)
    app.component('yh-drawer', YhDrawer)
    app.component('YhWatermark', YhWatermark)
    app.component('yh-watermark', YhWatermark)
    app.component('YhUpload', YhUpload)
    app.component('yh-upload', YhUpload)
    app.component('YhMarquee', YhMarquee)
    app.component('yh-marquee', YhMarquee)
    app.component('YhSpin', YhSpin)
    app.component('yh-spin', YhSpin)
    app.component('YhLoading', YhLoading as any)
    app.component('YhMessageBox', YhMessageBox as any)
    app.component('YhPagination', YhPagination)
    app.component('yh-pagination', YhPagination)
    app.component('YhImage', YhImage)
    app.component('yh-image', YhImage)
    app.component('YhImageViewer', YhImageViewer)
    app.component('yh-image-viewer', YhImageViewer)
    app.component('YhDescriptions', YhDescriptions)
    app.component('yh-descriptions', YhDescriptions)
    app.component('YhDescriptionsItem', YhDescriptionsItem)
    app.component('yh-descriptions-item', YhDescriptionsItem)
    app.component('YhConfigProvider', YhConfigProvider)
    app.component('yh-config-provider', YhConfigProvider)
    app.component('YhTabs', YhTabs)
    app.component('yh-tabs', YhTabs)
    app.component('YhTabPane', YhTabPane)
    app.component('yh-tab-pane', YhTabPane)
    app.component('YhSteps', YhSteps)
    app.component('yh-steps', YhSteps)
    app.component('YhStep', YhStep)
    app.component('yh-step', YhStep)

    // 新增组件
    app.component('YhAffix', YhAffix)
    app.component('yh-affix', YhAffix)
    app.component('YhInfiniteScroll', YhInfiniteScroll)
    app.component('yh-infinite-scroll', YhInfiniteScroll)
    app.component('YhDropdown', YhDropdown)
    app.component('yh-dropdown', YhDropdown)
    app.component('YhDropdownItem', YhDropdownItem)
    app.component('yh-dropdown-item', YhDropdownItem)
    app.component('YhDropdownMenu', YhDropdownMenu)
    app.component('yh-dropdown-menu', YhDropdownMenu)
    app.component('YhMenu', YhMenu)
    app.component('yh-menu', YhMenu)
    app.component('YhMenuItem', YhMenuItem)
    app.component('yh-menu-item', YhMenuItem)
    app.component('YhMenuItemGroup', YhMenuItemGroup)
    app.component('yh-menu-item-group', YhMenuItemGroup)
    app.component('YhSubMenu', YhSubMenu)
    app.component('yh-sub-menu', YhSubMenu)
    app.component('YhWaterfall', YhWaterfall)
    app.component('yh-waterfall', YhWaterfall)
    app.component('YhTree', YhTree)
    app.component('yh-tree', YhTree)
    app.component('YhTreeNode', YhTreeNode)
    app.component('yh-tree-node', YhTreeNode)
    app.component('YhCalendar', YhCalendar)
    app.component('yh-calendar', YhCalendar)
    app.component('YhCountdown', YhCountdown)
    app.component('yh-countdown', YhCountdown)
    app.component('YhTable', YhTable)
    app.component('yh-table', YhTable)
    app.component('YhTableColumn', YhTableColumn)
    app.component('yh-table-column', YhTableColumn)
    app.component('YhSpace', YhSpace)
    app.component('yh-space', YhSpace)
    app.component('YhAvatar', YhAvatar)
    app.component('yh-avatar', YhAvatar)
    app.component('YhEmpty', YhEmpty)
    app.component('yh-empty', YhEmpty)

    // Typography 排版
    app.component('YhTypographyTitle', YhTypographyTitle)
    app.component('yh-typography-title', YhTypographyTitle)
    app.component('YhTypographyText', YhTypographyText)
    app.component('yh-typography-text', YhTypographyText)
    app.component('YhTypographyParagraph', YhTypographyParagraph)
    app.component('yh-typography-paragraph', YhTypographyParagraph)
    app.component('YhTypographyLink', YhTypographyLink)
    app.component('yh-typography-link', YhTypographyLink)

    // Container 布局容器
    app.component('YhContainer', YhContainer)
    app.component('yh-container', YhContainer)
    app.component('YhHeader', YhHeader)
    app.component('yh-header', YhHeader)
    app.component('YhAside', YhAside)
    app.component('yh-aside', YhAside)
    app.component('YhMain', YhMain)
    app.component('yh-main', YhMain)
    app.component('YhFooter', YhFooter)
    app.component('yh-footer', YhFooter)

    // Result 结果
    app.component('YhResult', YhResult)
    app.component('yh-result', YhResult)

    // Grid 网格布局
    app.component('YhGrid', YhGrid)
    app.component('yh-grid', YhGrid)
    app.component('YhGridItem', YhGridItem)
    app.component('yh-grid-item', YhGridItem)

    // Mention 提及
    app.component('YhMention', YhMention)
    app.component('yh-mention', YhMention)

    // 注册指令
    app.directive('infinite-scroll', vInfiniteScroll)
    app.directive('yh-loading', vYhLoading)

    // 注册文档组件
    app.component('DemoBlock', DemoBlock)
    app.component('IconDemo', IconDemo)

    // 注册 @yh-ui/icons 的 Icon 组件
    app.component('Icon', YhIconify)
  }
} satisfies Theme
